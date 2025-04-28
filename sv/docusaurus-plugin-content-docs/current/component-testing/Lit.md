---
id: lit
title: Lit
---

Lit är ett enkelt bibliotek för att bygga snabba, lätta webbkomponenter. Att testa Lit-webbkomponenter med WebdriverIO är mycket enkelt tack vare WebdriverIOs [shadow DOM-väljare](/docs/selectors#deep-selectors) som gör att du kan söka i skuggrotens kapslade element med bara ett enda kommando.

## Inställning

För att ställa in WebdriverIO i ditt Lit-projekt, följ [instruktionerna](/docs/component-testing#set-up) i våra komponenttestdokument. För Lit behöver du inte en förinställning eftersom Lit-webbkomponenter inte behöver köras genom en kompilator, de är rena webbkomponentförbättringar.

När inställningen är klar kan du starta testerna genom att köra:

```sh
npx wdio run ./wdio.conf.js
```

## Skriva tester

Givet att du har följande Lit-komponent:

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

För att testa komponenten måste du rendera den på testsidan innan testet startar och se till att den städas upp efteråt:

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

Du kan hitta ett fullständigt exempel på en WebdriverIO-komponenttestsvit för Lit i vårt [exempelförvar](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite).