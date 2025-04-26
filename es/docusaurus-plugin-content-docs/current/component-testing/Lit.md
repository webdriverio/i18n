---
id: lit
title: Lit
---

Lit es una biblioteca simple para construir componentes web rápidos y ligeros. Probar componentes web de Lit con WebdriverIO es muy fácil gracias a los [selectores de Shadow DOM](/docs/selectors#deep-selectors) de WebdriverIO que te permiten consultar elementos anidados en shadow roots con un solo comando.

## Configuración

Para configurar WebdriverIO dentro de tu proyecto Lit, sigue las [instrucciones](/docs/component-testing#set-up) en nuestra documentación de pruebas de componentes. Para Lit no necesitas un preset ya que los componentes web de Lit no necesitan ejecutarse a través de un compilador, son mejoras puras de componentes web.

Una vez configurado, puedes iniciar las pruebas ejecutando:

```sh
npx wdio run ./wdio.conf.js
```

## Escribiendo Pruebas

Dado que tienes el siguiente componente Lit:

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

Para probar el componente, debes renderizarlo en la página de prueba antes de que comience la prueba y asegurarte de que se limpie después:

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

Puedes encontrar un ejemplo completo de una suite de pruebas de componentes WebdriverIO para Lit en nuestro [repositorio de ejemplos](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite).