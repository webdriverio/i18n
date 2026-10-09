---
id: lit
title: Lit
description: "Richten Sie den WebdriverIO Browser-Runner für Lit-Webkomponenten ein und schreiben Sie Tests, die Elemente innerhalb verschachtelter Shadow Roots abfragen."
---

Lit ist eine einfache Bibliothek zum Erstellen schneller, leichtgewichtiger Webkomponenten. Das Testen von Lit-Webkomponenten mit WebdriverIO ist dank der [Shadow-DOM-Selektoren](/docs/selectors#deep-selectors) von WebdriverIO sehr einfach: Sie können in Shadow Roots verschachtelte Elemente mit nur einem einzigen Befehl abfragen.

## Einrichtung

Um WebdriverIO in Ihrem Lit-Projekt einzurichten, folgen Sie den [Anweisungen](/docs/component-testing#set-up) in unserer Dokumentation zum Komponententesten. Für Lit benötigen Sie kein Preset, da Lit-Webkomponenten nicht durch einen Compiler laufen müssen; sie sind reine Erweiterungen von Webkomponenten.

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

    // Die UI als Funktion des Komponentenzustands rendern
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

Um die Komponente zu testen, müssen Sie sie vor dem Start des Tests in die Testseite rendern und sicherstellen, dass sie anschließend wieder entfernt wird:

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// Lit-Komponente importieren
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

Ein vollständiges Beispiel einer WebdriverIO-Komponententest-Suite für Lit finden Sie in unserem [Beispiel-Repository](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite).