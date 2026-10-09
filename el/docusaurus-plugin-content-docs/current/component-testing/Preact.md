---
id: preact
title: Preact
description: "Ρυθμίστε τον browser runner του WebdriverIO για ένα έργο Preact με το preset preact και γράψτε δοκιμές components με το Testing Library."
---

Το [Preact](https://preactjs.com/) είναι μια γρήγορη εναλλακτική λύση του React, μεγέθους 3kB, με το ίδιο σύγχρονο API. Μπορείτε να δοκιμάσετε components του Preact απευθείας σε έναν πραγματικό browser χρησιμοποιώντας το WebdriverIO και τον [browser runner](/docs/runner#browser-runner) του.

## Ρύθμιση

Για να ρυθμίσετε το WebdriverIO στο έργο σας Preact, ακολουθήστε τις [οδηγίες](/docs/component-testing#set-up) στην τεκμηρίωσή μας για τις δοκιμές components. Βεβαιωθείτε ότι έχετε επιλέξει το `preact` ως preset στις επιλογές του runner σας, π.χ.:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'preact'
    }],
    // ...
}
```

:::info

Αν χρησιμοποιείτε ήδη το [Vite](https://vitejs.dev/) ως development server, μπορείτε επίσης απλώς να επαναχρησιμοποιήσετε τη διαμόρφωσή σας από το `vite.config.ts` μέσα στη διαμόρφωση του WebdriverIO. Για περισσότερες πληροφορίες, δείτε το `viteConfig` στις [επιλογές του runner](/docs/runner#runner-options).

:::

Το preset του Preact απαιτεί να είναι εγκατεστημένο το `@preact/preset-vite`. Επίσης, συνιστούμε τη χρήση του [Testing Library](https://testing-library.com/) για την απόδοση (rendering) του component στη σελίδα δοκιμής. Επομένως, θα χρειαστεί να εγκαταστήσετε τις ακόλουθες επιπλέον εξαρτήσεις:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

Στη συνέχεια, μπορείτε να ξεκινήσετε τις δοκιμές εκτελώντας:

```sh
npx wdio run ./wdio.conf.js
```

## Συγγραφή Δοκιμών

Δεδομένου ότι έχετε το ακόλουθο component του Preact:

```tsx title="./components/Component.jsx"
import { h } from 'preact'
import { useState } from 'preact/hooks'

interface Props {
    initialCount: number
}

export function Counter({ initialCount }: Props) {
    const [count, setCount] = useState(initialCount)
    const increment = () => setCount(count + 1)

    return (
        <div>
            Current value: {count}
            <button onClick={increment}>Increment</button>
        </div>
    )
}

```

Στη δοκιμή σας, χρησιμοποιήστε τη μέθοδο `render` από το `@testing-library/preact` για να προσαρτήσετε το component στη σελίδα δοκιμής. Για την αλληλεπίδραση με το component, συνιστούμε τη χρήση εντολών του WebdriverIO, καθώς συμπεριφέρονται πιο κοντά σε πραγματικές αλληλεπιδράσεις χρήστη, π.χ.:

```ts title="app.test.tsx"
import { expect } from 'expect'
import { render, screen } from '@testing-library/preact'

import { Counter } from './components/PreactComponent.js'

describe('Preact Component Testing', () => {
    it('should increment after "Increment" button is clicked', async () => {
        const component = await $(render(<Counter initialCount={5} />))
        await expect(component).toHaveText(expect.stringContaining('Current value: 5'))

        const incrElem = await $(screen.getByText('Increment'))
        await incrElem.click()
        await expect(component).toHaveText(expect.stringContaining('Current value: 6'))
    })
})
```

Μπορείτε να βρείτε ένα πλήρες παράδειγμα σουίτας δοκιμών components του WebdriverIO για το Preact στο [αποθετήριο παραδειγμάτων](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite) μας.