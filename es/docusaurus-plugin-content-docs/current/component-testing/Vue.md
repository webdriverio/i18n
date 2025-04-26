---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/) es un framework accesible, eficiente y versátil para construir interfaces de usuario web. Puedes probar componentes de Vue.js directamente en un navegador real usando WebdriverIO y su [ejecutor de navegador](/docs/runner#browser-runner).

## Configuración

Para configurar WebdriverIO dentro de tu proyecto Vue.js, sigue las [instrucciones](/docs/component-testing#set-up) en nuestra documentación de pruebas de componentes. Asegúrate de seleccionar `vue` como preset dentro de tus opciones de ejecutor, por ejemplo:

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

Si ya estás utilizando [Vite](https://vitejs.dev/) como servidor de desarrollo, también puedes reutilizar tu configuración en `vite.config.ts` dentro de tu configuración de WebdriverIO. Para más información, consulta `viteConfig` en [opciones del ejecutor](/docs/runner#runner-options).

:::

El preset de Vue requiere que `@vitejs/plugin-vue` esté instalado. También recomendamos usar [Testing Library](https://testing-library.com/) para renderizar el componente en la página de prueba. Por lo tanto, necesitarás instalar las siguientes dependencias adicionales:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

Luego puedes iniciar las pruebas ejecutando:

```sh
npx wdio run ./wdio.conf.js
```

## Escribiendo Pruebas

Dado que tienes el siguiente componente Vue.js:

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

En tu prueba, renderiza el componente en el DOM y ejecuta aserciones sobre él. Recomendamos usar [`@vue/test-utils`](https://test-utils.vuejs.org/) o [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) para adjuntar el componente a la página de prueba. Para interactuar con el componente, utiliza los comandos de WebdriverIO ya que se comportan de manera más cercana a las interacciones reales del usuario, por ejemplo:


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

Puedes encontrar un ejemplo completo de un conjunto de pruebas de componentes WebdriverIO para Vue.js en nuestro [repositorio de ejemplos](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite).

## Probando Componentes Asincrónicos en Vue3

Si estás usando Vue v3 y estás probando [componentes asincrónicos](https://vuejs.org/guide/built-ins/suspense.html#async-setup) como el siguiente:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Recomendamos usar [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) y un pequeño wrapper de suspense para renderizar el componente. Desafortunadamente, [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) aún no tiene soporte para esto. Crea un archivo `helper.ts` con el siguiente contenido:

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

Luego importa y prueba el componente de la siguiente manera:

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

## Probando Componentes Vue en Nuxt

Si estás usando el framework web [Nuxt](https://nuxt.com/), WebdriverIO habilitará automáticamente la función de [auto-importación](https://nuxt.com/docs/guide/concepts/auto-imports) y facilita la prueba de tus componentes Vue y páginas Nuxt. Sin embargo, cualquier [módulo de Nuxt](https://nuxt.com/modules) que puedas definir en tu configuración y que requiera contexto de la aplicación Nuxt no puede ser soportado.

__Las razones para esto son:__
- WebdriverIO no puede iniciar una aplicación Nuxt únicamente en un entorno de navegador
- Hacer que las pruebas de componentes dependan demasiado del entorno Nuxt crea complejidad y recomendamos ejecutar estas pruebas como pruebas e2e

:::info

WebdriverIO también proporciona un servicio para ejecutar pruebas e2e en aplicaciones Nuxt, consulta [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) para más información.

:::

### Simulando composables incorporados

En caso de que tu componente use un composable nativo de Nuxt, por ejemplo [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), WebdriverIO automáticamente simulará estas funciones y te permitirá modificar su comportamiento o hacer aserciones contra ellas, por ejemplo:

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

### Manejando composables de terceros

Todos los [módulos de terceros](https://nuxt.com/modules) que pueden potenciar tu proyecto Nuxt no pueden ser simulados automáticamente. En esos casos, necesitas simularlos manualmente, por ejemplo, si tu aplicación usa el plugin del módulo [Supabase](https://nuxt.com/modules/supabase):

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

y creas una instancia de Supabase en algún lugar de tus composables, por ejemplo:

```ts
const superbase = useSupabaseClient()
```

la prueba fallará debido a:

```
ReferenceError: useSupabaseClient is not defined
```

Aquí, recomendamos simular todo el módulo que usa la función `useSupabaseClient` o crear una variable global que simule esta función, por ejemplo:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```