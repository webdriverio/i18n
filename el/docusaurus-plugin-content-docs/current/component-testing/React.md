---
id: react
title: React
description: "Ρυθμίστε τον browser runner του WebdriverIO για ένα έργο React με το preset react και γράψτε δοκιμές components με το Testing Library."
---

Το [React](https://reactjs.org/) κάνει τη δημιουργία διαδραστικών UI ανώδυνη. Σχεδιάστε απλές προβολές για κάθε κατάσταση της εφαρμογής σας και το React θα ενημερώνει και θα αποδίδει αποτελεσματικά ακριβώς τα σωστά components όταν αλλάζουν τα δεδομένα σας. Μπορείτε να δοκιμάσετε τα React components απευθείας σε έναν πραγματικό browser χρησιμοποιώντας το WebdriverIO και τον [browser runner](/docs/runner#browser-runner) του.

## Ρύθμιση

Για να ρυθμίσετε το WebdriverIO στο έργο React σας, ακολουθήστε τις [οδηγίες](/docs/component-testing#set-up) στην τεκμηρίωση για τις δοκιμές components. Βεβαιωθείτε ότι έχετε επιλέξει το `react` ως preset στις επιλογές του runner, π.χ.:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'react'
    }],
    // ...
}
```

:::info

Αν χρησιμοποιείτε ήδη το [Vite](https://vitejs.dev/) ως development server, μπορείτε επίσης απλώς να επαναχρησιμοποιήσετε τη διαμόρφωσή σας από το `vite.config.ts` μέσα στη διαμόρφωση του WebdriverIO. Για περισσότερες πληροφορίες, δείτε το `viteConfig` στις [επιλογές του runner](/docs/runner#runner-options).

:::

Το preset του React απαιτεί να είναι εγκατεστημένο το `@vitejs/plugin-react`. Επίσης, συνιστούμε τη χρήση του [Testing Library](https://testing-library.com/) για την απόδοση του component στη σελίδα δοκιμής. Επομένως, θα χρειαστεί να εγκαταστήσετε τις ακόλουθες πρόσθετες εξαρτήσεις:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

Στη συνέχεια, μπορείτε να ξεκινήσετε τις δοκιμές εκτελώντας:

```sh
npx wdio run ./wdio.conf.js
```

## Συγγραφή Δοκιμών

Δεδομένου ότι έχετε το ακόλουθο React component:

```tsx title="./components/Component.jsx"
import React, { useState } from 'react'

function App() {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme}
    </button>
}

export default App
```

Στη δοκιμή σας χρησιμοποιήστε τη μέθοδο `render` από το `@testing-library/react` για να προσαρτήσετε το component στη σελίδα δοκιμής. Για να αλληλεπιδράσετε με το component, συνιστούμε να χρησιμοποιείτε εντολές του WebdriverIO, καθώς συμπεριφέρονται πιο κοντά σε πραγματικές αλληλεπιδράσεις χρήστη, π.χ.:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import App from './components/Component.jsx'

describe('React Component Testing', () => {
    it('Test theme button toggle', async () => {
        render(<App />)
        const buttonEl = screen.getByText(/Current theme/i)

        await $(buttonEl).click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

Μπορείτε να βρείτε ένα πλήρες παράδειγμα σουίτας δοκιμών components του WebdriverIO για το React στο [αποθετήριο παραδειγμάτων](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite) μας.