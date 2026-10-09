---
id: lit
title: Lit
description: "Ρυθμίστε τον browser runner του WebdriverIO για web components του Lit και γράψτε tests που αναζητούν στοιχεία μέσα σε ένθετα shadow roots."
---

Το Lit είναι μια απλή βιβλιοθήκη για τη δημιουργία γρήγορων, ελαφριών web components. Ο έλεγχος των web components του Lit με το WebdriverIO είναι πολύ εύκολος χάρη στους [επιλογείς shadow DOM](/docs/selectors#deep-selectors) του WebdriverIO, με τους οποίους μπορείτε να αναζητήσετε ένθετα στοιχεία σε shadow roots με μία μόνο εντολή.

## Ρύθμιση

Για να ρυθμίσετε το WebdriverIO στο έργο σας Lit, ακολουθήστε τις [οδηγίες](/docs/component-testing#set-up) στην τεκμηρίωση για τον έλεγχο components. Για το Lit δεν χρειάζεστε preset, καθώς τα web components του Lit δεν χρειάζεται να περάσουν από compiler, αφού είναι καθαρές βελτιώσεις web components.

Μόλις ολοκληρωθεί η ρύθμιση, μπορείτε να ξεκινήσετε τα tests εκτελώντας:

```sh
npx wdio run ./wdio.conf.js
```

## Συγγραφή Tests

Δεδομένου ότι έχετε το ακόλουθο component του Lit:

```ts title="./components/Component.ts"
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    @property()
    name?: string = 'World'

    // Απόδοση του UI ως συνάρτηση της κατάστασης του component
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

Για να ελέγξετε το component, πρέπει να το αποδώσετε στη σελίδα του test πριν ξεκινήσει το test και να διασφαλίσετε ότι θα καθαριστεί στη συνέχεια:

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// εισαγωγή του component του Lit
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

Μπορείτε να βρείτε ένα πλήρες παράδειγμα σουίτας tests components του WebdriverIO για το Lit στο [αποθετήριο παραδειγμάτων](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite) μας.