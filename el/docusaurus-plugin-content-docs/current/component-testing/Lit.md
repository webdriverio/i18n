---
id: lit
title: Lit
---

Το Lit είναι μια απλή βιβλιοθήκη για τη δημιουργία γρήγορων, ελαφριών web components. Η δοκιμή των web components του Lit με το WebdriverIO είναι πολύ εύκολη χάρη στους [επιλογείς shadow DOM](/docs/selectors#deep-selectors) του WebdriverIO που σας επιτρέπουν να εκτελείτε ερωτήματα σε ένθετα στοιχεία shadow roots με μια μόνο εντολή.

## Εγκατάσταση

Για να ρυθμίσετε το WebdriverIO στο έργο Lit σας, ακολουθήστε τις [οδηγίες](/docs/component-testing#set-up) στα έγγραφα τεκμηρίωσης δοκιμών των components μας. Για το Lit δεν χρειάζεστε προρύθμιση καθώς τα web components του Lit δεν χρειάζεται να περάσουν από compiler, είναι αμιγείς βελτιώσεις web components.

Μόλις ολοκληρωθεί η ρύθμιση, μπορείτε να ξεκινήσετε τις δοκιμές εκτελώντας:

```sh
npx wdio run ./wdio.conf.js
```

## Γράφοντας Δοκιμές

Δεδομένου ότι έχετε το ακόλουθο component Lit:

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

Για να δοκιμάσετε το component πρέπει να το αποδώσετε στη σελίδα δοκιμής πριν ξεκινήσει η δοκιμή και να διασφαλίσετε ότι καθαρίζεται μετά:

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

Μπορείτε να βρείτε ένα πλήρες παράδειγμα σουίτας δοκιμών component του WebdriverIO για το Lit στο [αποθετήριο παραδειγμάτων](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite) μας.