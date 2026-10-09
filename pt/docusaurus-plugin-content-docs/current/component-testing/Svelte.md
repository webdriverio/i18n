---
id: svelte
title: Svelte
description: "Configure o browser runner do WebdriverIO para um projeto Svelte com o preset svelte e escreva testes de componentes com a Testing Library."
---

[Svelte](https://svelte.dev/) é uma nova abordagem radical para construir interfaces de usuário. Enquanto frameworks tradicionais como React e Vue fazem a maior parte do seu trabalho no navegador, o Svelte transfere esse trabalho para uma etapa de compilação que acontece quando você constrói sua aplicação. Você pode testar componentes Svelte diretamente em um navegador real usando o WebdriverIO e seu [browser runner](/docs/runner#browser-runner).

## Configuração

Para configurar o WebdriverIO dentro do seu projeto Svelte, siga as [instruções](/docs/component-testing#set-up) em nossa documentação de testes de componentes. Certifique-se de selecionar `svelte` como preset nas opções do seu runner, por exemplo:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

:::info

Se você já estiver usando o [Vite](https://vitejs.dev/) como servidor de desenvolvimento, também pode simplesmente reutilizar sua configuração do `vite.config.ts` dentro da sua configuração do WebdriverIO. Para mais informações, consulte `viteConfig` nas [opções do runner](/docs/runner#runner-options).

:::

O preset do Svelte requer que o `@sveltejs/vite-plugin-svelte` esteja instalado. Também recomendamos usar a [Testing Library](https://testing-library.com/) para renderizar o componente na página de teste. Portanto, você precisará instalar as seguintes dependências adicionais:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

Você pode então iniciar os testes executando:

```sh
npx wdio run ./wdio.conf.js
```

## Escrevendo Testes

Supondo que você tenha o seguinte componente Svelte:

```html title="./components/Component.svelte"
<script>
    export let name

    let buttonText = 'Button'

    function handleClick() {
      buttonText = 'Button Clicked'
    }
</script>

<h1>Hello {name}!</h1>
<button on:click="{handleClick}">{buttonText}</button>
```

No seu teste, use o método `render` do `@testing-library/svelte` para anexar o componente à página de teste. Para interagir com o componente, recomendamos usar os comandos do WebdriverIO, pois eles se comportam de forma mais próxima às interações reais do usuário, por exemplo:

```ts title="svelte.test.js"
import expect from 'expect'

import { render, fireEvent, screen } from '@testing-library/svelte'
import '@testing-library/jest-dom'

import Component from './components/Component.svelte'

describe('Svelte Component Testing', () => {
    it('changes button text on click', async () => {
        render(Component, { name: 'World' })
        const button = await $('button')
        await expect(button).toHaveText('Button')
        await button.click()
        await expect(button).toHaveText('Button Clicked')
    })
})
```

Você pode encontrar um exemplo completo de uma suíte de testes de componentes do WebdriverIO para Svelte em nosso [repositório de exemplos](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite).