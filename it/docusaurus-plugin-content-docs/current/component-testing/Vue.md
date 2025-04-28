---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/) è un framework accessibile, performante e versatile per la creazione di interfacce utente web. Puoi testare i componenti Vue.js direttamente in un browser reale utilizzando WebdriverIO e il suo [browser runner](/docs/runner#browser-runner).

## Setup

Per configurare WebdriverIO all'interno del tuo progetto Vue.js, segui le [istruzioni](/docs/component-testing#set-up) nella documentazione dei test dei componenti. Assicurati di selezionare `vue` come preset nelle opzioni del runner, ad esempio:

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

Se stai già utilizzando [Vite](https://vitejs.dev/) come server di sviluppo, puoi anche riutilizzare la tua configurazione in `vite.config.ts` all'interno della tua configurazione WebdriverIO. Per maggiori informazioni, consulta `viteConfig` nelle [opzioni del runner](/docs/runner#runner-options).

:::

Il preset Vue richiede l'installazione di `@vitejs/plugin-vue`. Inoltre, consigliamo di utilizzare [Testing Library](https://testing-library.com/) per renderizzare il componente nella pagina di test. Pertanto, dovrai installare le seguenti dipendenze aggiuntive:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

Puoi quindi avviare i test eseguendo:

```sh
npx wdio run ./wdio.conf.js
```

## Scrittura dei Test

Dato che hai il seguente componente Vue.js:

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

Nel tuo test, renderizza il componente nel DOM ed esegui asserzioni su di esso. Consigliamo di utilizzare [`@vue/test-utils`](https://test-utils.vuejs.org/) o [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) per collegare il componente alla pagina di test. Per interagire con il componente, utilizza i comandi WebdriverIO poiché si comportano più simili alle interazioni reali dell'utente, ad esempio:


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

Puoi trovare un esempio completo di una suite di test dei componenti WebdriverIO per Vue.js nel nostro [repository di esempi](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite).

## Test di Componenti Asincroni in Vue3

Se stai utilizzando Vue v3 e stai testando [componenti asincroni](https://vuejs.org/guide/built-ins/suspense.html#async-setup) come il seguente:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Consigliamo di utilizzare [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) e un piccolo wrapper suspense per renderizzare il componente. Sfortunatamente [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) non ha ancora supporto per questo. Crea un file `helper.ts` con il seguente contenuto:

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

Quindi importa e testa il componente come segue:

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

## Test dei Componenti Vue in Nuxt

Se stai utilizzando il framework web [Nuxt](https://nuxt.com/), WebdriverIO abiliterà automaticamente la funzionalità di [auto-import](https://nuxt.com/docs/guide/concepts/auto-imports) e renderà semplice il test dei tuoi componenti Vue e delle pagine Nuxt. Tuttavia, qualsiasi [modulo Nuxt](https://nuxt.com/modules) che potresti definire nella tua configurazione e che richiede il contesto dell'applicazione Nuxt non può essere supportato.

__I motivi per questo sono:__
- WebdriverIO non può iniziare un'applicazione Nuxt solamente in un ambiente browser
- Avere test dei componenti che dipendono troppo dall'ambiente Nuxt crea complessità e consigliamo di eseguire questi test come test e2e

:::info

WebdriverIO fornisce anche un servizio per eseguire test e2e su applicazioni Nuxt, vedi [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) per informazioni.

:::

### Mockare i composables integrati

Nel caso in cui il tuo componente utilizzi un composable nativo di Nuxt, ad esempio [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), WebdriverIO simulerà automaticamente queste funzioni e ti permetterà di modificare il loro comportamento o fare asserzioni su di esse, ad esempio:

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

### Gestione dei composables di terze parti

Tutti i [moduli di terze parti](https://nuxt.com/modules) che possono potenziare il tuo progetto Nuxt non possono essere automaticamente simulati. In questi casi devi simularli manualmente, ad esempio se la tua applicazione utilizza il plugin del modulo [Supabase](https://nuxt.com/modules/supabase):

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

e crei un'istanza di Supabase da qualche parte nei tuoi composable, ad esempio:

```ts
const superbase = useSupabaseClient()
```

il test fallirà a causa di:

```
ReferenceError: useSupabaseClient is not defined
```

In questo caso, consigliamo di simulare l'intero modulo che utilizza la funzione `useSupabaseClient` o di creare una variabile globale che simuli questa funzione, ad esempio:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```