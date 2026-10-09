---
id: lit
title: Lit
description: "Konfigurera WebdriverIO:s webbläsarkörare för Lit-webbkomponenter och skriv tester som söker efter element inuti nästlade shadow roots."
---

Lit är ett enkelt bibliotek för att bygga snabba, lätta webbkomponenter. Att testa Lit-webbkomponenter med WebdriverIO är väldigt enkelt tack vare WebdriverIO:s [shadow DOM-selektorer](/docs/selectors#deep-selectors) – du kan söka efter nästlade element i shadow roots med bara ett enda kommando.

## Setup

För att konfigurera WebdriverIO i ditt Lit-projekt, följ [instruktionerna](/docs/component-testing#set-up) i vår dokumentation om komponenttestning. För Lit behöver du ingen förinställning (preset) eftersom Lit-webbkomponenter inte behöver köras genom en kompilator; de är rena förbättringar av webbkomponenter.

När allt är konfigurerat kan du starta testerna genom att köra:

```sh
npx wdio run ./wdio.conf.js
```

## Skriva tester

Anta att du har följande Lit-komponent:

```ts title="./components/Component.ts"
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    @property()
    name?: string = 'World'

    // Rendera gränssnittet som en funktion av komponentens tillstånd
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

För att testa komponenten måste du rendera den på testsidan innan testet startar och se till att den städas bort efteråt:

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// importera Lit-komponent
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

Du hittar ett fullständigt exempel på en WebdriverIO-testsvit för komponenttestning av Lit i vårt [exempelrepository](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite).