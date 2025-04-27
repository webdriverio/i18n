---
id: solid
title: SolidJS
---

[SolidJS](https://www.solidjs.com/) é um framework para construir interfaces de usuário com reatividade simples e performática. Você pode testar componentes SolidJS diretamente em um navegador real usando WebdriverIO e seu [browser runner](/docs/runner#browser-runner).

## Configuração

Para configurar o WebdriverIO em seu projeto SolidJS, siga as [instruções](/docs/component-testing#set-up) em nossa documentação de teste de componentes. Certifique-se de selecionar `solid` como preset dentro das suas opções de runner, por exemplo:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'solid'
    }],
    // ...
}
```

:::info

Se você já está usando [Vite](https://vitejs.dev/) como servidor de desenvolvimento, você também pode reutilizar sua configuração em `vite.config.ts` dentro da sua configuração WebdriverIO. Para mais informações, consulte `viteConfig` nas [opções do runner](/docs/runner#runner-options).

:::

O preset do SolidJS requer que o `vite-plugin-solid` esteja instalado:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

Você pode então iniciar os testes executando:

```sh
npx wdio run ./wdio.conf.js
```

## Escrevendo Testes

Considerando que você tenha o seguinte componente SolidJS:

```html title="./components/Component.tsx"
import { createSignal } from 'solid-js'

function App() {
    const [theme, setTheme] = createSignal('light')

    const toggleTheme = () => {
        const nextTheme = theme() === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme()}
    </button>
}

export default App
```

No seu teste, use o método `render` de `solid-js/web` para anexar o componente à página de teste. Para interagir com o componente, recomendamos utilizar os comandos do WebdriverIO, pois eles se comportam de forma mais próxima às interações reais do usuário, por exemplo:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * ensure we render the component for every test in a
     * new root container
     */
    let root: Element
    beforeEach(() => {
        if (root) {
            root.remove()
        }

        root = document.createElement('div')
        document.body.appendChild(root)
    })

    it('Test theme button toggle', async () => {
        render(<App />, root)
        const buttonEl = await $('button')

        await buttonEl.click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

Você pode encontrar um exemplo completo de uma suíte de testes de componentes WebdriverIO para SolidJS em nosso [repositório de exemplos](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite).