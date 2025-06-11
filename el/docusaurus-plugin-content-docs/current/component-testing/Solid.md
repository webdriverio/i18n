---
id: solid
title: SolidJS
---

[SolidJS](https://www.solidjs.com/) είναι ένα πλαίσιο για τη δημιουργία διεπαφών χρήστη με απλή και αποδοτική αντιδραστικότητα. Μπορείτε να δοκιμάσετε τα συστατικά SolidJS απευθείας σε ένα πραγματικό πρόγραμμα περιήγησης χρησιμοποιώντας το WebdriverIO και το [browser runner](/docs/runner#browser-runner).

## Εγκατάσταση

Για να ρυθμίσετε το WebdriverIO στο έργο σας SolidJS, ακολουθήστε τις [οδηγίες](/docs/component-testing#set-up) στα έγγραφα δοκιμών συστατικών μας. Βεβαιωθείτε ότι έχετε επιλέξει `solid` ως προεπιλογή στις επιλογές του runner σας, π.χ.:

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

Αν χρησιμοποιείτε ήδη το [Vite](https://vitejs.dev/) ως διακομιστή ανάπτυξης, μπορείτε επίσης απλά να επαναχρησιμοποιήσετε τη διαμόρφωσή σας στο `vite.config.ts` μέσα στη διαμόρφωση του WebdriverIO. Για περισσότερες πληροφορίες, δείτε το `viteConfig` στις [επιλογές runner](/docs/runner#runner-options).

:::

Η προεπιλογή SolidJS απαιτεί την εγκατάσταση του `vite-plugin-solid`:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

Μπορείτε στη συνέχεια να ξεκινήσετε τις δοκιμές εκτελώντας:

```sh
npx wdio run ./wdio.conf.js
```

## Γράφοντας δοκιμές

Δεδομένου ότι έχετε το ακόλουθο συστατικό SolidJS:

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

Στη δοκιμή σας, χρησιμοποιήστε τη μέθοδο `render` από το `solid-js/web` για να συνδέσετε το συστατικό στη σελίδα δοκιμής. Για να αλληλεπιδράσετε με το συστατικό, προτείνουμε να χρησιμοποιήσετε εντολές WebdriverIO καθώς συμπεριφέρονται πιο κοντά στις πραγματικές αλληλεπιδράσεις χρήστη, π.χ.:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * ensure we render the component for every test in a
     * new root container
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

Μπορείτε να βρείτε ένα πλήρες παράδειγμα μιας σουίτας δοκιμών συστατικών WebdriverIO για το SolidJS στο [αποθετήριο παραδειγμάτων](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite) μας.