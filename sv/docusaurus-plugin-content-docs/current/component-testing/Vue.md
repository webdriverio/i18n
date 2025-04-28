---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/) är ett lättillgängligt, högpresterande och mångsidigt ramverk för att bygga webb-användargränssnitt. Du kan testa Vue.js-komponenter direkt i en riktig webbläsare med hjälp av WebdriverIO och dess [browser runner](/docs/runner#browser-runner).

## Installation

För att installera WebdriverIO i ditt Vue.js-projekt, följ [instruktionerna](/docs/component-testing#set-up) i vår komponenttestningsdokumentation. Se till att välja `vue` som förinställning inom dina runner-alternativ, t.ex:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'vue'
    }],
    // ...
}
```

:::info

Om du redan använder [Vite](https://vitejs.dev/) som utvecklingsserver kan du också återanvända din konfiguration i `vite.config.ts` inom din WebdriverIO-konfiguration. För mer information, se `viteConfig` i [runner-alternativ](/docs/runner#runner-options).

:::

Vue-förinställningen kräver att `@vitejs/plugin-vue` är installerat. Vi rekommenderar också att använda [Testing Library](https://testing-library.com/) för att rendera komponenten på testsidan. Därför behöver du installera följande ytterligare beroenden:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

Du kan sedan starta testerna genom att köra:

```sh
npx wdio run ./wdio.conf.js
```

## Skriva tester

Givet att du har följande Vue.js-komponent:

```tsx title="./components/Component.vue"
<template>
    <div>
        <p>Times clicked: {{ count }}</p>
        <button @click="increment">increment</button>
    </div>
</template>

<script>
export default {
    data: () => ({
        count: 0,
    }),

    methods: {
        increment() {
            this.count++
        },
    },
}
</script>
```

I ditt test renderar du komponenten till DOM och kör påståenden på den. Vi rekommenderar att du antingen använder [`@vue/test-utils`](https://test-utils.vuejs.org/) eller [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) för att fästa komponenten till testsidan. För att interagera med komponenten, använd WebdriverIO-kommandon eftersom de beter sig mer likt faktiska användarinteraktioner, t.ex.:


<Tabs
  defaultValue="utils"
  values={[
    {label: '@vue/test-utils', value: 'utils'},
    {label: '@testing-library/vue', value: 'testinglib'}
 ]
}>
<TabItem value="utils">

```ts title="vue.test.js"
import { $, expect } from '@wdio/globals'
import { mount } from '@vue/test-utils'
import Component from './components/Component.vue'

describe('Vue Component Testing', () => {
    it('increments value on click', async () => {
        // The render method returns a collection of utilities to query your component.
        const wrapper = mount(Component, { attachTo: document.body })
        expect(wrapper.text()).toContain('Times clicked: 0')

        const button = await $('aria/increment')

        // Dispatch a native click event to our button element.
        await button.click()
        await button.click()

        expect(wrapper.text()).toContain('Times clicked: 2')
        await expect($('p=Times clicked: 2')).toExist() // same assertion with WebdriverIO
    })
})
```

</TabItem>
<TabItem value="testinglib">

```ts title="vue.test.js"
import { $, expect } from '@wdio/globals'
import { render } from '@testing-library/vue'
import Component from './components/Component.vue'

describe('Vue Component Testing', () => {
    it('increments value on click', async () => {
        // The render method returns a collection of utilities to query your component.
        const { getByText } = render(Component)

        // getByText returns the first matching node for the provided text, and
        // throws an error if no elements match or if more than one match is found.
        getByText('Times clicked: 0')

        const button = await $(getByText('increment'))

        // Dispatch a native click event to our button element.
        await button.click()
        await button.click()

        getByText('Times clicked: 2') // assert with Testing Library
        await expect($('p=Times clicked: 2')).toExist() // assert with WebdriverIO
    })
})
```

</TabItem>
</Tabs>

Du hittar ett komplett exempel på en WebdriverIO-komponenttestsvit för Vue.js i vårt [exempelrepository](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite).

## Testa asynkrona komponenter i Vue3

Om du använder Vue v3 och testar [asynkrona komponenter](https://vuejs.org/guide/built-ins/suspense.html#async-setup) som följande:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Vi rekommenderar att använda [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) och en liten suspense-wrapper för att få komponenten renderad. Tyvärr har [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) ännu inget stöd för detta. Skapa en fil `helper.ts` med följande innehåll:

```ts
import { mount, type VueWrapper as VueWrapperImport } from '@vue/test-utils'
import { Suspense } from 'vue'

export type VueWrapper = VueWrapperImport<any>
const scheduler = typeof setImmediate === 'function' ? setImmediate : setTimeout

export function flushPromises(): Promise<void> {
  return new Promise((resolve) => {
    scheduler(resolve, 0)
  })
}

export function wrapInSuspense(
  component: ReturnType<typeof defineComponent>,
  { props }: { props: object },
): ReturnType<typeof defineComponent> {
  return defineComponent({
    render() {
      return h(
        'div',
        { id: 'root' },
        h(Suspense, null, {
          default() {
            return h(component, props)
          },
          fallback: h('div', 'fallback'),
        }),
      )
    },
  })
}

export function renderAsyncComponent(vueComponent: ReturnType<typeof defineComponent>, props: object): VueWrapper{
    const component = wrapInSuspense(vueComponent, { props })
    return mount(component, { attachTo: document.body })
}
```

Importera sedan och testa komponenten enligt följande:

```ts
import { $, expect } from '@wdio/globals'

import { renderAsyncComponent, flushPromises, type VueWrapper } from './helpers.js'
import AsyncComponent from '/components/SomeAsyncComponent.vue'

describe('Testing Async Components', () => {
    let wrapper: VueWrapper

    it('should display component correctly', async () => {
        const props = {}
        wrapper = renderAsyncComponent(AsyncComponent, { props })
        await flushPromises()
        await expect($('...')).toBePresent()
    })

    afterEach(() => {
        wrapper.unmount()
    })
})
```

## Testa Vue-komponenter i Nuxt

Om du använder webbramverket [Nuxt](https://nuxt.com/), kommer WebdriverIO automatiskt att aktivera funktionen [auto-import](https://nuxt.com/docs/guide/concepts/auto-imports) och gör det enkelt att testa dina Vue-komponenter och Nuxt-sidor. Dock kan inte [Nuxt-moduler](https://nuxt.com/modules) som du definierar i din konfiguration och som kräver sammanhang till Nuxt-applikationen stödjas.

__Anledningarna till detta är:__
- WebdriverIO kan inte initiera en Nuxt-applikation enbart i en webbläsarmiljö
- Att ha komponenttester som är för beroende av Nuxt-miljön skapar komplexitet och vi rekommenderar att köra dessa tester som e2e-tester

:::info

WebdriverIO tillhandahåller också en tjänst för att köra e2e-tester på Nuxt-applikationer, se [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) för information.

:::

### Mocka inbyggda composables

Om din komponent använder en inbyggd Nuxt-composable, t.ex. [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), kommer WebdriverIO automatiskt att mocka dessa funktioner och låter dig modifiera deras beteende eller testa dem, t.ex.:

```ts
import { mocked } from '@wdio/browser-runner'

// t.ex. din komponent använder anrop till `useNuxtData` på följande sätt
// `const { data: posts } = useNuxtData('posts')`
// i ditt test kan du kontrollera det
expect(useNuxtData).toBeCalledWith('posts')
// och ändra deras beteende
mocked(useNuxtData).mockReturnValue({
    data: [...]
})
```

### Hantera composables från tredje part

Alla [moduler från tredje part](https://nuxt.com/modules) som kan förbättra ditt Nuxt-projekt kan inte automatiskt mockas. I dessa fall måste du manuellt mocka dem, t.ex. om din applikation använder modulen [Supabase](https://nuxt.com/modules/supabase):

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

och du skapar en instans av Supabase någonstans i dina composables, t.ex.:

```ts
const superbase = useSupabaseClient()
```

kommer testet att misslyckas på grund av:

```
ReferenceError: useSupabaseClient is not defined
```

Här rekommenderar vi att antingen mocka hela modulen som använder funktionen `useSupabaseClient` eller skapa en global variabel som mockar denna funktion, t.ex.:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```