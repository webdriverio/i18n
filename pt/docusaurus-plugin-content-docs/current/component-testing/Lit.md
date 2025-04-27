---
id: lit
title: Lit
---

Lit é uma biblioteca simples para construir componentes web rápidos e leves. Testar componentes web Lit com WebdriverIO é muito fácil graças aos [seletores de shadow DOM](/docs/selectors#deep-selectors) do WebdriverIO, que permitem consultar elementos aninhados em shadow roots com apenas um único comando.

## Configuração

Para configurar o WebdriverIO em seu projeto Lit, siga as [instruções](/docs/component-testing#set-up) em nossa documentação de testes de componentes. Para o Lit, você não precisa de um preset, pois os componentes web Lit não precisam passar por um compilador, eles são aprimoramentos puros de web components.

Uma vez configurado, você pode iniciar os testes executando:

```sh
npx wdio run ./wdio.conf.js
```

## Escrevendo Testes

Dado que você tem o seguinte componente Lit:

```ts title="./components/Component.ts"
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    @property()
    name?: string = 'World'

    // Render the UI as a function of component state
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

Para testar o componente, você precisa renderizá-lo na página de teste antes do início do teste e garantir que ele seja limpo posteriormente:

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// import Lit component
import './components/Component.ts'

describe('Lit Component testing', () => {
    let elem: HTMLElement

    beforeEach(() => {
        elem = document.createElement('simple-greeting')
    })

    it('should render component', async () => {
        elem.setAttribute('name', 'WebdriverIO')
        document.body.appendChild(elem)

        await waitFor(() => {
            expect(elem.shadowRoot.textContent).toBe('Hello, WebdriverIO!')
        })
    })

    afterEach(() => {
        elem.remove()
    })
})
```

Você pode encontrar um exemplo completo de uma suíte de testes de componentes WebdriverIO para Lit em nosso [repositório de exemplos](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite).