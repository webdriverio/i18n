---
id: lit
title: Lit
---

Lit è una semplice libreria per costruire componenti web veloci e leggeri. Testare i componenti web Lit con WebdriverIO è molto semplice grazie ai [selettori shadow DOM](/docs/selectors#deep-selectors) di WebdriverIO che permettono di interrogare elementi annidati nelle shadow root con un singolo comando.

## Setup

Per configurare WebdriverIO all'interno del tuo progetto Lit, segui le [istruzioni](/docs/component-testing#set-up) nella nostra documentazione sui test dei componenti. Per Lit non hai bisogno di un preset poiché i componenti web Lit non necessitano di essere elaborati da un compilatore, sono miglioramenti puri di web component.

Una volta configurato, puoi avviare i test eseguendo:

```sh
npx wdio run ./wdio.conf.js
```

## Scrittura dei Test

Dato che hai il seguente componente Lit:

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

Per testare il componente devi renderizzarlo nella pagina di test prima dell'inizio del test e assicurarti che venga pulito successivamente:

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

Puoi trovare un esempio completo di una suite di test di componenti WebdriverIO per Lit nel nostro [repository di esempio](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite).