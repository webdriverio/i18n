---
id: preact
title: Preact
---

[Preact](https://preactjs.com/) είναι μια γρήγορη εναλλακτική 3kB του React με το ίδιο σύγχρονο API. Μπορείτε να δοκιμάσετε τα συστατικά Preact απευθείας σε ένα πραγματικό πρόγραμμα περιήγησης χρησιμοποιώντας το WebdriverIO και το [browser runner](/docs/runner#browser-runner).

## Ρύθμιση

Για να ρυθμίσετε το WebdriverIO στο έργο Preact σας, ακολουθήστε τις [οδηγίες](/docs/component-testing#set-up) στα έγγραφα δοκιμών των συστατικών μας. Βεβαιωθείτε ότι έχετε επιλέξει `preact` ως προεπιλογή στις επιλογές του runner σας, π.χ.:

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

Αν χρησιμοποιείτε ήδη το [Vite](https://vitejs.dev/) ως διακομιστή ανάπτυξης, μπορείτε επίσης να επαναχρησιμοποιήσετε τη διαμόρφωσή σας στο `vite.config.ts` μέσα στη διαμόρφωση WebdriverIO. Για περισσότερες πληροφορίες, δείτε το `viteConfig` στις [επιλογές runner](/docs/runner#runner-options).

:::

Η προεπιλογή Preact απαιτεί την εγκατάσταση του `@preact/preset-vite`. Επίσης, συνιστούμε τη χρήση του [Testing Library](https://testing-library.com/) για την απόδοση του συστατικού στη σελίδα δοκιμής. Για αυτό, θα χρειαστεί να εγκαταστήσετε τις ακόλουθες πρόσθετες εξαρτήσεις:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

Στη συνέχεια, μπορείτε να ξεκινήσετε τις δοκιμές εκτελώντας:

```sh
npx wdio run ./wdio.conf.js
```

## Γράφοντας Δοκιμές

Δεδομένου ότι έχετε το ακόλουθο συστατικό Preact:

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

Στη δοκιμή σας, χρησιμοποιήστε τη μέθοδο `render` από το `@testing-library/preact` για να επισυνάψετε το συστατικό στη σελίδα δοκιμής. Για να αλληλεπιδράσετε με το συστατικό, συνιστούμε να χρησιμοποιήσετε εντολές WebdriverIO καθώς συμπεριφέρονται πιο κοντά στις πραγματικές αλληλεπιδράσεις χρηστών, π.χ.:

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

Μπορείτε να βρείτε ένα πλήρες παράδειγμα μιας σουίτας δοκιμών συστατικών WebdriverIO για Preact στο [αποθετήριο παραδειγμάτων](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite) μας.