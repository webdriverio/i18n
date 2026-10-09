---
id: lit
title: Lit
description: "Configura il browser runner di WebdriverIO per i web component Lit e scrivi test che interrogano elementi all'interno di shadow root annidate."
---

Lit è una semplice libreria per creare web component veloci e leggeri. Testare i web component Lit con WebdriverIO è molto facile grazie ai [selettori shadow DOM](/docs/selectors#deep-selectors) di WebdriverIO, con cui puoi interrogare gli elementi annidati nelle shadow root con un unico comando.

## Setup

Per configurare WebdriverIO all'interno del tuo progetto Lit, segui le [istruzioni](/docs/component-testing#set-up) nella nostra documentazione sul component testing. Per Lit non hai bisogno di un preset, poiché i web component Lit non devono passare attraverso un compilatore: sono puri miglioramenti dei web component.

Una volta completata la configurazione, puoi avviare i test eseguendo:

```sh
npx wdio run ./wdio.conf.js
```

## Scrivere Test

Supponendo di avere il seguente componente Lit:

```ts title="./components/Component.ts"
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    @property()
    name?: string = 'World'

    // Renderizza la UI in funzione dello stato del componente
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

Per testare il componente devi renderizzarlo nella pagina di test prima che il test inizi e assicurarti che venga rimosso al termine:

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// importa il componente Lit
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

Puoi trovare un esempio completo di una suite di test dei componenti WebdriverIO per Lit nel nostro [repository di esempi](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite).