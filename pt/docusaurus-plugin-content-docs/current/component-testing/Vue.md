---
id: vue
title: Vue.js
description: "Configure o browser runner do WebdriverIO para Vue.js, escreva testes de componentes com o Testing Library e teste componentes assíncronos e aplicações Nuxt."
---

[Vue.js](https://vuejs.org/) é um framework acessível, performático e versátil para construir interfaces de usuário web. Você pode testar componentes Vue.js diretamente em um navegador real usando o WebdriverIO e seu [browser runner](/docs/runner#browser-runner).

## Configuração

Para configurar o WebdriverIO no seu projeto Vue.js, siga as [instruções](/docs/component-testing#set-up) na nossa documentação de testes de componentes. Certifique-se de selecionar `vue` como preset nas opções do seu runner, por exemplo:

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

Se você já estiver usando o [Vite](https://vitejs.dev/) como servidor de desenvolvimento, você também pode simplesmente reutilizar sua configuração do `vite.config.ts` dentro da sua configuração do WebdriverIO. Para mais informações, consulte `viteConfig` nas [opções do runner](/docs/runner#runner-options).

:::

O preset do Vue requer que o `@vitejs/plugin-vue` esteja instalado. Também recomendamos usar o [Testing Library](https://testing-library.com/) para renderizar o componente na página de teste. Para isso, você precisará instalar as seguintes dependências adicionais:

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

No seu teste, renderize o componente no DOM e execute asserções sobre ele. Recomendamos usar [`@vue/test-utils`](https://test-utils.vuejs.org/) ou [`@testing-library/vue`](https://testing-library.com/docs/vue-testing-library/intro/) para anexar o componente à página de teste. Para interagir com o componente, use os comandos do WebdriverIO, pois eles se comportam de forma mais próxima às interações reais do usuário, por exemplo:


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
        // O método render retorna uma coleção de utilitários para consultar seu componente.
        const wrapper = mount(Component, { attachTo: document.body })
        expect(wrapper.text()).toContain('Times clicked: 0')

        const button = await $('aria/increment')

        // Dispara um evento de clique nativo no nosso elemento de botão.
        await button.click()
        await button.click()

        expect(wrapper.text()).toContain('Times clicked: 2')
        await expect($('p=Times clicked: 2')).toExist() // mesma asserção com WebdriverIO
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
        // O método render retorna uma coleção de utilitários para consultar seu componente.
        const { getByText } = render(Component)

        // getByText retorna o primeiro nó correspondente ao texto fornecido e
        // lança um erro se nenhum elemento corresponder ou se mais de um for encontrado.
        getByText('Times clicked: 0')

        const button = await $(getByText('increment'))

        // Dispara um evento de clique nativo no nosso elemento de botão.
        await button.click()
        await button.click()

        getByText('Times clicked: 2') // asserção com Testing Library
        await expect($('p=Times clicked: 2')).toExist() // asserção com WebdriverIO
    })
})
```

</TabItem>
</Tabs>

Você pode encontrar um exemplo completo de uma suíte de testes de componentes WebdriverIO para Vue.js no nosso [repositório de exemplos](https://github.com/webdriverio/component-testing-examples/tree/main/vue-typescript-vite).

## Testando Componentes Assíncronos no Vue3

Se você estiver usando o Vue v3 e testando [componentes assíncronos](https://vuejs.org/guide/built-ins/suspense.html#async-setup) como o seguinte:

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

Recomendamos usar o [`@vue/test-utils`](https://www.npmjs.com/package/@vue/test-utils) e um pequeno wrapper de suspense para renderizar o componente. Infelizmente, o [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library/issues/230) ainda não oferece suporte a isso. Crie um arquivo `helper.ts` com o seguinte conteúdo:

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

Em seguida, importe e teste o componente da seguinte forma:

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

Se você estiver usando o framework web [Nuxt](https://nuxt.com/), o WebdriverIO habilitará automaticamente o recurso de [auto-import](https://nuxt.com/docs/guide/concepts/auto-imports) e tornará fácil testar seus componentes Vue e páginas Nuxt. No entanto, quaisquer [módulos Nuxt](https://nuxt.com/modules) que você possa definir na sua configuração e que exijam contexto da aplicação Nuxt não podem ser suportados.

__Os motivos para isso são:__
- O WebdriverIO não consegue iniciar uma aplicação Nuxt apenas em um ambiente de navegador
- Fazer com que os testes de componentes dependam demais do ambiente Nuxt gera complexidade, e recomendamos executar esses testes como testes e2e

:::info

O WebdriverIO também fornece um serviço para executar testes e2e em aplicações Nuxt; consulte [`webdriverio-community/wdio-nuxt-service`](https://github.com/webdriverio-community/wdio-nuxt-service) para mais informações.

:::

### Mockando composables nativos

Caso seu componente use um composable nativo do Nuxt, por exemplo [`useNuxtData`](https://nuxt.com/docs/api/composables/use-nuxt-data), o WebdriverIO irá mockar automaticamente essas funções e permitirá que você modifique seu comportamento ou faça asserções sobre elas, por exemplo:

```ts
import { mocked } from '@wdio/browser-runner'

// por exemplo, seu componente chama `useNuxtData` da seguinte forma
// `const { data: posts } = useNuxtData('posts')`
// no seu teste você pode fazer asserções sobre ele
expect(useNuxtData).toBeCalledWith('posts')
// e alterar seu comportamento
mocked(useNuxtData).mockReturnValue({
    data: [...]
})
```

### Lidando com composables de terceiros

Todos os [módulos de terceiros](https://nuxt.com/modules) que podem turbinar seu projeto Nuxt não podem ser mockados automaticamente. Nesses casos, você precisa mocká-los manualmente, por exemplo, considerando que sua aplicação usa o plugin do módulo [Supabase](https://nuxt.com/modules/supabase):

```js title=""
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/supabase",
    // ...
  ],
  // ...
});
```

e você cria uma instância do Supabase em algum lugar dos seus composables, por exemplo:

```ts
const superbase = useSupabaseClient()
```

o teste falhará devido a:

```
ReferenceError: useSupabaseClient is not defined
```

Aqui, recomendamos mockar todo o módulo que usa a função `useSupabaseClient` ou criar uma variável global que mocka essa função, por exemplo:

```ts
import { fn } from '@wdio/browser-runner'
globalThis.useSupabaseClient = fn().mockReturnValue({})
```