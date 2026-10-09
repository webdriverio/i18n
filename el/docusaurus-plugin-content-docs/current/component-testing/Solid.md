---
id: solid
title: SolidJS
description: "Ρυθμίστε τον browser runner του WebdriverIO για ένα έργο SolidJS με το preset solid και γράψτε δοκιμές components που αποδίδονται στη σελίδα."
---

Το [SolidJS](https://www.solidjs.com/) είναι ένα framework για τη δημιουργία διεπαφών χρήστη με απλή και αποδοτική αντιδραστικότητα. Μπορείτε να δοκιμάσετε components του SolidJS απευθείας σε έναν πραγματικό browser χρησιμοποιώντας το WebdriverIO και τον [browser runner](/docs/runner#browser-runner) του.

## Ρύθμιση

Για να ρυθμίσετε το WebdriverIO στο έργο SolidJS σας, ακολουθήστε τις [οδηγίες](/docs/component-testing#set-up) στην τεκμηρίωση για τις δοκιμές components. Βεβαιωθείτε ότι έχετε επιλέξει το `solid` ως preset στις επιλογές του runner σας, π.χ.:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'solid'
    }],
    // ...
}
```

:::info

Αν χρησιμοποιείτε ήδη το [Vite](https://vitejs.dev/) ως development server, μπορείτε επίσης απλώς να επαναχρησιμοποιήσετε τη διαμόρφωσή σας από το `vite.config.ts` μέσα στη διαμόρφωση του WebdriverIO. Για περισσότερες πληροφορίες, δείτε το `viteConfig` στις [επιλογές του runner](/docs/runner#runner-options).

:::

Το preset του SolidJS απαιτεί την εγκατάσταση του `vite-plugin-solid`:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

Στη συνέχεια, μπορείτε να ξεκινήσετε τις δοκιμές εκτελώντας:

```sh
npx wdio run ./wdio.conf.js
```

## Συγγραφή Δοκιμών

Δεδομένου ότι έχετε το ακόλουθο component του SolidJS:

```html title="./components/Component.tsx"
import { createSignal } from 'solid-js'

function App() {
    const [theme, setTheme] = createSignal('light')

    const toggleTheme = () => {
        const nextTheme = theme() === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme()}
    </button>
}

export default App
```

Στη δοκιμή σας, χρησιμοποιήστε τη μέθοδο `render` από το `solid-js/web` για να προσαρτήσετε το component στη σελίδα δοκιμής. Για να αλληλεπιδράσετε με το component, συνιστούμε να χρησιμοποιείτε εντολές του WebdriverIO, καθώς συμπεριφέρονται πιο κοντά σε πραγματικές αλληλεπιδράσεις χρηστών, π.χ.:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * διασφαλίζουμε ότι αποδίδουμε το component για κάθε δοκιμή σε έναν
     * νέο root container
     */
    let root: Element
    beforeEach(() => {
        if (root) {
            root.remove()
        }

        root = document.createElement('div')
        document.body.appendChild(root)
    })

    it('Test theme button toggle', async () => {
        render(<App />, root)
        const buttonEl = await $('button')

        await buttonEl.click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

Μπορείτε να βρείτε ένα πλήρες παράδειγμα σουίτας δοκιμών components του WebdriverIO για το SolidJS στο [αποθετήριο παραδειγμάτων](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite) μας.