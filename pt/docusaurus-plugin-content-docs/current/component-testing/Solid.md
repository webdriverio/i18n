---
id: solid
title: SolidJS
description: "Configure o browser runner do WebdriverIO para um projeto SolidJS com o preset solid e escreva testes de componentes que renderizam na página."
---

[SolidJS](https://www.solidjs.com/) é um framework para construir interfaces de usuário com reatividade simples e performática. Você pode testar componentes SolidJS diretamente em um navegador real usando o WebdriverIO e seu [browser runner](/docs/runner#browser-runner).

## Configuração

Para configurar o WebdriverIO em seu projeto SolidJS, siga as [instruções](/docs/component-testing#set-up) em nossa documentação de testes de componentes. Certifique-se de selecionar `solid` como preset nas opções do seu runner, por exemplo:

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

Se você já estiver usando o [Vite](https://vitejs.dev/) como servidor de desenvolvimento, também pode simplesmente reutilizar sua configuração do `vite.config.ts` dentro da sua configuração do WebdriverIO. Para mais informações, consulte `viteConfig` nas [opções do runner](/docs/runner#runner-options).

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

No seu teste, use o método `render` de `solid-js/web` para anexar o componente à página de teste. Para interagir com o componente, recomendamos usar comandos do WebdriverIO, pois eles se comportam de forma mais próxima às interações reais do usuário, por exemplo:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * garante que renderizamos o componente para cada teste em um
     * novo contêiner raiz
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

Você pode encontrar um exemplo completo de uma suíte de testes de componentes do WebdriverIO para SolidJS em nosso [repositório de exemplos](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite).