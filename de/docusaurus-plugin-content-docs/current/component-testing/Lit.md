---
id: lit
title: Lit
---

Lit ist eine einfache Bibliothek zum Erstellen schneller, leichtgewichtiger Webkomponenten. Das Testen von Lit-Webkomponenten mit WebdriverIO ist dank WebdriverIOs [Shadow-DOM-Selektoren](/docs/selectors#deep-selectors) sehr einfach. Sie können in verschachtelten Elementen im Shadow-Root mit nur einem einzigen Befehl abfragen.

## Setup

Um WebdriverIO in Ihrem Lit-Projekt einzurichten, folgen Sie den [Anweisungen](/docs/component-testing#set-up) in unserer Komponententest-Dokumentation. Für Lit benötigen Sie kein Preset, da Lit-Webkomponenten nicht durch einen Compiler laufen müssen, sie sind reine Webkomponenten-Erweiterungen.

Nach der Einrichtung können Sie die Tests starten, indem Sie Folgendes ausführen:

```sh
npx wdio run ./wdio.conf.js
```

## Tests schreiben

Angenommen, Sie haben die folgende Lit-Komponente:

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

Um die Komponente zu testen, müssen Sie sie vor dem Teststart in die Testseite rendern und sicherstellen, dass sie anschließend bereinigt wird:

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

Ein vollständiges Beispiel einer WebdriverIO-Komponententestsuite für Lit finden Sie in unserem [Beispiel-Repository](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite).