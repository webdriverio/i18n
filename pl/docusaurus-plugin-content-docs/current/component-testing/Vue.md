---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/) to przyjazny, wydajny i wszechstronny framework do tworzenia interfejsów użytkownika dla stron internetowych. Możesz testować komponenty Vue.js bezpośrednio w prawdziwej przeglądarce za pomocą WebdriverIO i jego [przeglądarkoego runnera](/docs/runner#browser-runner).

## Konfiguracja

Aby skonfigurować WebdriverIO w projekcie Vue.js, postępuj zgodnie z [instrukcjami](/docs/component-testing#set-up) w naszej dokumentacji testowania komponentów. Upewnij się, że wybrałeś `vue` jako preset w opcjach runnera, np.:

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

Jeśli już używasz [Vite](https://vitejs.dev/) jako serwera deweloperskiego, możesz również po prostu wykorzystać swoją konfigurację z `vite.config.ts` w konfiguracji WebdriverIO. Aby uzyskać więcej informacji, zobacz `viteConfig` w [opcjach runnera](/docs/runner#runner-options).

:::

Preset Vue wymaga zainstalowania `@vitejs/plugin-vue`. Zalecamy również używanie [Testing Library](https://testing-library.com/) do renderowania komponentu na stronie testowej. W związku z tym będziesz musiał zainstalować następujące dodatkowe zależności:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

Następnie możesz uruchomić testy, wykonując:

```sh
npx wdio run ./wdio.conf.js
```

## Pisanie testów

Załóżmy, że masz następujący komponent Vue.js:

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

W swoim teście renderuj komponent do DOM i wykonuj na nim asercje. Zalecamy użycie [`@vue/test-utils`](https://test-utils.vuejs.org/) lub [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) do dołączenia komponentu do strony testowej. Do interakcji z komponentem używaj komend WebdriverIO, ponieważ zachowują się one bardziej podobnie do rzeczywistych interakcji użytkownika, np.:


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

Pełny przykład zestawu testów komponentów WebdriverIO dla Vue.js znajdziesz w naszym [repozytorium przykładów](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite).

## Testowanie komponentów asynchronicznych w Vue3

Jeśli używasz Vue v3 i testujesz [komponenty asynchroniczne](https://vuejs.org/guide/built-ins/suspense.html#async-setup) takie jak poniższy:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Zalecamy użycie [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) i małego wrappera suspense, aby wyrenderować komponent. Niestety [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) nie ma jeszcze wsparcia dla tego. Utwórz plik `helper.ts` o następującej zawartości:

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

Następnie zaimportuj i przetestuj komponent w następujący sposób:

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

## Testowanie komponentów Vue w Nuxt

Jeśli używasz frameworka internetowego [Nuxt](https://nuxt.com/), WebdriverIO automatycznie włączy funkcję [auto-import](https://nuxt.com/docs/guide/concepts/auto-imports) i ułatwi testowanie komponentów Vue oraz stron Nuxt. Jednak wszelkie [moduły Nuxt](https://nuxt.com/modules), które możesz zdefiniować w swojej konfiguracji i które wymagają kontekstu aplikacji Nuxt, nie mogą być obsługiwane.

__Powody tego są następujące:__
- WebdriverIO nie może zainicjować aplikacji Nuxt wyłącznie w środowisku przeglądarki
- Zbyt duża zależność testów komponentów od środowiska Nuxt tworzy złożoność i zalecamy uruchamianie tych testów jako testów e2e

:::info

WebdriverIO dostarcza również usługę do uruchamiania testów e2e na aplikacjach Nuxt. Zobacz [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) dla informacji.

:::

### Mockowanie wbudowanych composables

W przypadku, gdy Twój komponent używa natywnego composable Nuxt, np. [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), WebdriverIO automatycznie zamockuje te funkcje i pozwoli Ci modyfikować ich zachowanie lub wykonywać na nich asercje, np.:

```ts
import { mocked } from '@wdio/browser-runner'

// e.g. your component uses calls `useNuxtData` the following way
// `const { data: posts } = useNuxtData('posts')`
// in your test you can assert against it
expect(useNuxtData).toBeCalledWith('posts')
// and change their behavior
mocked(useNuxtData).mockReturnValue({
    data: [...]
})
```

### Obsługa composables innych firm

Wszystkie [moduły innych firm](https://nuxt.com/modules), które mogą usprawnić Twój projekt Nuxt, nie mogą być automatycznie mockowane. W takich przypadkach musisz je ręcznie mockować, np. załóżmy, że Twoja aplikacja używa pluginu modułu [Supabase](https://nuxt.com/modules/supabase):

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

i tworzysz instancję Supabase gdzieś w swoich composables, np.:

```ts
const superbase = useSupabaseClient()
```

test nie powiedzie się z powodu:

```
ReferenceError: useSupabaseClient is not defined
```

W tym przypadku zalecamy albo mockowanie całego modułu, który używa funkcji `useSupabaseClient`, albo utworzenie zmiennej globalnej, która mockuje tę funkcję, np.:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```