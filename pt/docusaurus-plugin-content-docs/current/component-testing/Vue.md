---
id: vue
title: Vue.js
---

[Vue.js](https://vuejs.org/) é um framework acessível, performático e versátil para construir interfaces de usuário web. Você pode testar componentes Vue.js diretamente em um navegador real usando WebdriverIO e seu [browser runner](/docs/runner#browser-runner).

## Configuração

Para configurar o WebdriverIO em seu projeto Vue.js, siga as [instruções](/docs/component-testing#set-up) em nossa documentação de teste de componentes. Certifique-se de selecionar `vue` como preset dentro das opções do runner, por exemplo:

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

Se você já estiver usando o [Vite](https://vitejs.dev/) como servidor de desenvolvimento, você também pode reutilizar sua configuração em `vite.config.ts` dentro da sua configuração WebdriverIO. Para mais informações, consulte `viteConfig` nas [opções do runner](/docs/runner#runner-options).

:::

O preset do Vue requer que `@vitejs/plugin-vue` esteja instalado. Também recomendamos o uso da [Testing Library](https://testing-library.com/) para renderizar o componente na página de teste. Portanto, você precisará instalar as seguintes dependências adicionais:

```sh npm2yarn
npm install --save-dev @testing-library/vue @vitejs/plugin-vue
```

Você pode então iniciar os testes executando:

```sh
npx wdio run ./wdio.conf.js
```

## Escrevendo Testes

Suponha que você tenha o seguinte componente Vue.js:

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

No seu teste, renderize o componente no DOM e execute asserções nele. Recomendamos usar [`@vue/test-utils`](https://test-utils.vuejs.org/) ou [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) para anexar o componente à página de teste. Para interagir com o componente, use os comandos do WebdriverIO, pois eles se comportam de maneira mais próxima às interações reais do usuário, por exemplo:


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

Você pode encontrar um exemplo completo de uma suíte de testes de componentes WebdriverIO para Vue.js em nosso [repositório de exemplos](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite).

## Testando Componentes Assíncronos no Vue3

Se você estiver usando Vue v3 e testando [componentes assíncronos](https://vuejs.org/guide/built-ins/suspense.html#async-setup) como o seguinte:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Recomendamos usar [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) e um pequeno wrapper de suspense para renderizar o componente. Infelizmente, [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) ainda não tem suporte para isso. Crie um arquivo `helper.ts` com o seguinte conteúdo:

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

Então importe e teste o componente da seguinte forma:

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

## Testando Componentes Vue no Nuxt

Se você estiver usando o framework web [Nuxt](https://nuxt.com/), o WebdriverIO ativará automaticamente o recurso de [auto-importação](https://nuxt.com/docs/guide/concepts/auto-imports) e facilitará o teste de seus componentes Vue e páginas Nuxt. No entanto, qualquer [módulo Nuxt](https://nuxt.com/modules) que você defina em sua configuração e que requer contexto da aplicação Nuxt não pode ser suportado.

__Razões para isso:__
- WebdriverIO não pode iniciar uma aplicação Nuxt somente em um ambiente de navegador
- Ter testes de componentes que dependem muito do ambiente Nuxt cria complexidade e recomendamos executar esses testes como testes e2e

:::info

O WebdriverIO também fornece um serviço para executar testes e2e em aplicações Nuxt, consulte [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) para obter informações.

:::

### Mockando composables internos

Caso seu componente use um composable nativo do Nuxt, como [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), o WebdriverIO automaticamente simulará essas funções e permitirá que você modifique seu comportamento ou faça asserções contra elas, por exemplo:

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

### Lidando com composables de terceiros

Todos os [módulos de terceiros](https://nuxt.com/modules) que podem potencializar seu projeto Nuxt não podem ser automaticamente simulados. Nesses casos, você precisa simulá-los manualmente, por exemplo, se sua aplicação usa o módulo plugin [Supabase](https://nuxt.com/modules/supabase):

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

e você cria uma instância do Supabase em algum lugar em seus composables, por exemplo:

```ts
const superbase = useSupabaseClient()
```

o teste falhará devido a:

```
ReferenceError: useSupabaseClient is not defined
```

Aqui, recomendamos simular todo o módulo que usa a função `useSupabaseClient` ou criar uma variável global que simule essa função, por exemplo:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```