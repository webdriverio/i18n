---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/) ist ein zugängliches, leistungsstarkes und vielseitiges Framework zum Erstellen von Web-Benutzeroberflächen. Sie können Vue.js-Komponenten direkt in einem echten Browser mit WebdriverIO und seinem [Browser-Runner](/docs/runner#browser-runner) testen.

## Setup

Um WebdriverIO in Ihrem Vue.js-Projekt einzurichten, folgen Sie den [Anweisungen](/docs/component-testing#set-up) in unserer Komponententest-Dokumentation. Stellen Sie sicher, dass Sie `vue` als Voreinstellung in Ihren Runner-Optionen auswählen, z.B.:

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

Wenn Sie bereits [Vite](https://vitejs.dev/) als Entwicklungsserver verwenden, können Sie Ihre Konfiguration in `vite.config.ts` auch einfach in Ihrer WebdriverIO-Konfiguration wiederverwenden. Weitere Informationen finden Sie unter `viteConfig` in den [Runner-Optionen](/docs/runner#runner-options).

:::

Die Vue-Voreinstellung erfordert, dass `@vitejs/plugin-vue` installiert ist. Außerdem empfehlen wir die Verwendung von [Testing Library](https://testing-library.com/) zum Rendern der Komponente auf der Testseite. Dafür müssen Sie die folgenden zusätzlichen Abhängigkeiten installieren:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

Sie können dann die Tests starten, indem Sie Folgendes ausführen:

```sh
npx wdio run ./wdio.conf.js
```

## Tests schreiben

Angenommen, Sie haben die folgende Vue.js-Komponente:

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

Rendern Sie in Ihrem Test die Komponente in das DOM und führen Sie Assertions darauf aus. Wir empfehlen, entweder [`@vue/test-utils`](https://test-utils.vuejs.org/) oder [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) zu verwenden, um die Komponente an die Testseite anzuhängen. Verwenden Sie WebdriverIO-Befehle, um mit der Komponente zu interagieren, da sie sich näher an tatsächlichen Benutzerinteraktionen orientieren, z.B.:


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

Ein vollständiges Beispiel einer WebdriverIO-Komponententestsuite für Vue.js finden Sie in unserem [Beispiel-Repository](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite).

## Testen von asynchronen Komponenten in Vue3

Wenn Sie Vue v3 verwenden und [asynchrone Komponenten](https://vuejs.org/guide/built-ins/suspense.html#async-setup) wie die folgende testen:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Wir empfehlen, [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) und einen kleinen Suspense-Wrapper zu verwenden, um die Komponente zu rendern. Leider hat [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) dafür noch keine Unterstützung. Erstellen Sie eine `helper.ts`-Datei mit folgendem Inhalt:

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

Importieren und testen Sie die Komponente dann wie folgt:

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

## Testen von Vue-Komponenten in Nuxt

Wenn Sie das Web-Framework [Nuxt](https://nuxt.com/) verwenden, aktiviert WebdriverIO automatisch die [Auto-Import](https://nuxt.com/docs/guide/concepts/auto-imports)-Funktion und erleichtert das Testen Ihrer Vue-Komponenten und Nuxt-Seiten. Allerdings können [Nuxt-Module](https://nuxt.com/modules), die Sie möglicherweise in Ihrer Konfiguration definieren und die Kontext zur Nuxt-Anwendung benötigen, nicht unterstützt werden.

__Gründe dafür sind:__
- WebdriverIO kann eine Nuxt-Anwendung nicht ausschließlich in einer Browser-Umgebung initiieren
- Wenn Komponententests zu stark von der Nuxt-Umgebung abhängen, entsteht Komplexität, und wir empfehlen, diese Tests als E2E-Tests auszuführen

:::info

WebdriverIO bietet auch einen Service zum Ausführen von E2E-Tests auf Nuxt-Anwendungen, siehe [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) für weitere Informationen.

:::

### Mocken von eingebauten Composables

Falls Ihre Komponente ein natives Nuxt-Composable verwendet, z.B. [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), wird WebdriverIO diese Funktionen automatisch mocken und ermöglicht es Ihnen, ihr Verhalten zu ändern oder gegen sie zu testen, z.B.:

```ts
import { mocked } from '@wdio/browser-runner'

// z.B. verwendet Ihre Komponente `useNuxtData` auf folgende Weise
// `const { data: posts } = useNuxtData('posts')`
// in Ihrem Test können Sie dagegen testen
expect(useNuxtData).toBeCalledWith('posts')
// und ihr Verhalten ändern
mocked(useNuxtData).mockReturnValue({
    data: [...]
})
```

### Umgang mit Composables von Drittanbietern

Alle [Module von Drittanbietern](https://nuxt.com/modules), die Ihr Nuxt-Projekt verbessern können, werden nicht automatisch gemockt. In diesen Fällen müssen Sie sie manuell mocken, z.B. wenn Ihre Anwendung das [Supabase](https://nuxt.com/modules/supabase)-Modul-Plugin verwendet:

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

und Sie irgendwo in Ihren Composables eine Instanz von Supabase erstellen, z.B.:

```ts
const superbase = useSupabaseClient()
```

wird der Test aufgrund von folgendem fehlschlagen:

```
ReferenceError: useSupabaseClient is not defined
```

Hier empfehlen wir, entweder das gesamte Modul, das die Funktion `useSupabaseClient` verwendet, zu mocken oder eine globale Variable zu erstellen, die diese Funktion mockt, z.B.:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```