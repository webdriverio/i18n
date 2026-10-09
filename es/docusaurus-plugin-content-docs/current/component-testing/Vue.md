---
id: vue
title: Vue.js
description: "Configura el browser runner de WebdriverIO para Vue.js, escribe pruebas de componentes con Testing Library y prueba componentes asíncronos y aplicaciones Nuxt."
---

[Vue.js](https://vuejs.org/) es un framework accesible, eficiente y versátil para construir interfaces de usuario web. Puedes probar componentes de Vue.js directamente en un navegador real usando WebdriverIO y su [browser runner](/docs/runner#browser-runner).

## Configuración

Para configurar WebdriverIO dentro de tu proyecto Vue.js, sigue las [instrucciones](/docs/component-testing#set-up) en nuestra documentación de pruebas de componentes. Asegúrate de seleccionar `vue` como preset dentro de las opciones de tu runner, por ejemplo:

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

Si ya estás usando [Vite](https://vitejs.dev/) como servidor de desarrollo, también puedes simplemente reutilizar tu configuración de `vite.config.ts` dentro de tu configuración de WebdriverIO. Para más información, consulta `viteConfig` en las [opciones del runner](/docs/runner#runner-options).

:::

El preset de Vue requiere que `@vitejs/plugin-vue` esté instalado. Además, recomendamos usar [Testing Library](https://testing-library.com/) para renderizar el componente en la página de prueba. Por lo tanto, necesitarás instalar las siguientes dependencias adicionales:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

Luego puedes iniciar las pruebas ejecutando:

```sh
npx wdio run ./wdio.conf.js
```

## Escribir pruebas

Dado que tienes el siguiente componente de Vue.js:

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

En tu prueba, renderiza el componente en el DOM y ejecuta aserciones sobre él. Recomendamos usar [`@vue/test-utils`](https://test-utils.vuejs.org/) o [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) para adjuntar el componente a la página de prueba. Para interactuar con el componente, usa los comandos de WebdriverIO, ya que se comportan de forma más cercana a las interacciones reales del usuario, por ejemplo:


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
        // El método render devuelve una colección de utilidades para consultar tu componente.
        const wrapper = mount(Component, { attachTo: document.body })
        expect(wrapper.text()).toContain('Times clicked: 0')

        const button = await $('aria/increment')

        // Despacha un evento de clic nativo a nuestro elemento botón.
        await button.click()
        await button.click()

        expect(wrapper.text()).toContain('Times clicked: 2')
        await expect($('p=Times clicked: 2')).toExist() // la misma aserción con WebdriverIO
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
        // El método render devuelve una colección de utilidades para consultar tu componente.
        const { getByText } = render(Component)

        // getByText devuelve el primer nodo que coincide con el texto proporcionado, y
        // lanza un error si ningún elemento coincide o si se encuentra más de una coincidencia.
        getByText('Times clicked: 0')

        const button = await $(getByText('increment'))

        // Despacha un evento de clic nativo a nuestro elemento botón.
        await button.click()
        await button.click()

        getByText('Times clicked: 2') // aserción con Testing Library
        await expect($('p=Times clicked: 2')).toExist() // aserción con WebdriverIO
    })
})
```

</TabItem>
</Tabs>

Puedes encontrar un ejemplo completo de una suite de pruebas de componentes de WebdriverIO para Vue.js en nuestro [repositorio de ejemplos](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite).

## Probar componentes asíncronos en Vue3

Si estás usando Vue v3 y estás probando [componentes asíncronos](https://vuejs.org/guide/built-ins/suspense.html#async-setup) como el siguiente:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Recomendamos usar [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) y un pequeño wrapper de suspense para que el componente se renderice. Lamentablemente, [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) aún no tiene soporte para esto. Crea un archivo `helper.ts` con el siguiente contenido:

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

## Probar componentes de Vue en Nuxt

Si estás usando el framework web [Nuxt](https://nuxt.com/), WebdriverIO habilitará automáticamente la función de [auto-import](https://nuxt.com/docs/guide/concepts/auto-imports) y facilitará la prueba de tus componentes de Vue y páginas de Nuxt. Sin embargo, no se pueden soportar los [módulos de Nuxt](https://nuxt.com/modules) que definas en tu configuración y que requieran contexto de la aplicación Nuxt.

__Las razones son:__
- WebdriverIO no puede iniciar una aplicación Nuxt únicamente en un entorno de navegador
- Hacer que las pruebas de componentes dependan demasiado del entorno de Nuxt genera complejidad, y recomendamos ejecutar estas pruebas como pruebas e2e

:::info

WebdriverIO también proporciona un servicio para ejecutar pruebas e2e en aplicaciones Nuxt; consulta [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) para más información.

:::

### Mockear composables integrados

En caso de que tu componente use un composable nativo de Nuxt, por ejemplo [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), WebdriverIO mockeará automáticamente estas funciones y te permitirá modificar su comportamiento o hacer aserciones sobre ellas, por ejemplo:

```ts
import { mocked } from '@wdio/browser-runner'

// p. ej., tu componente llama a `useNuxtData` de la siguiente manera
// `const { data: posts } = useNuxtData('posts')`
// en tu prueba puedes hacer aserciones sobre ello
expect(useNuxtData).toBeCalledWith('posts')
// y cambiar su comportamiento
mocked(useNuxtData).mockReturnValue({
    data: [...]
})
```

### Manejar composables de terceros

Todos los [módulos de terceros](https://nuxt.com/modules) que pueden potenciar tu proyecto Nuxt no pueden mockearse automáticamente. En esos casos necesitas mockearlos manualmente, por ejemplo, si tu aplicación usa el plugin del módulo [Supabase](https://nuxt.com/modules/supabase):

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

Aquí recomendamos mockear todo el módulo que usa la función `useSupabaseClient` o crear una variable global que mockee esta función, por ejemplo:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```