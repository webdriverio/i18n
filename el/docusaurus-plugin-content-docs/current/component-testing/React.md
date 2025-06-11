---
id: react
title: React
---

[React](https://reactjs.org/) κάνει εύκολη τη δημιουργία διαδραστικών διεπαφών χρήστη. Σχεδιάστε απλές προβολές για κάθε κατάσταση στην εφαρμογή σας, και το React θα ενημερώνει και θα αποδίδει αποτελεσματικά μόνο τα σωστά στοιχεία όταν αλλάζουν τα δεδομένα σας. Μπορείτε να δοκιμάσετε τα στοιχεία React απευθείας σε ένα πραγματικό πρόγραμμα περιήγησης χρησιμοποιώντας το WebdriverIO και το [browser runner](/docs/runner#browser-runner).

## Εγκατάσταση

Για να ρυθμίσετε το WebdriverIO στο έργο React σας, ακολουθήστε τις [οδηγίες](/docs/component-testing#set-up) στα έγγραφα δοκιμών των στοιχείων μας. Βεβαιωθείτε ότι έχετε επιλέξει `react` ως προκαθορισμένη ρύθμιση στις επιλογές του runner σας, π.χ.:

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

Αν χρησιμοποιείτε ήδη το [Vite](https://vitejs.dev/) ως διακομιστή ανάπτυξης, μπορείτε επίσης να επαναχρησιμοποιήσετε τη διαμόρφωσή σας στο `vite.config.ts` μέσα στη διαμόρφωση WebdriverIO. Για περισσότερες πληροφορίες, δείτε το `viteConfig` στις [επιλογές runner](/docs/runner#runner-options).

:::

Η προκαθορισμένη ρύθμιση React απαιτεί την εγκατάσταση του `@vitejs/plugin-react`. Επίσης, συνιστούμε τη χρήση του [Testing Library](https://testing-library.com/) για την απόδοση του στοιχείου στη σελίδα δοκιμών. Για αυτό θα χρειαστεί να εγκαταστήσετε τις ακόλουθες πρόσθετες εξαρτήσεις:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

Στη συνέχεια, μπορείτε να ξεκινήσετε τις δοκιμές εκτελώντας:

```sh
npx wdio run ./wdio.conf.js
```

## Γράφοντας Δοκιμές

Δεδομένου ότι έχετε το ακόλουθο στοιχείο React:

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

Στη δοκιμή σας, χρησιμοποιήστε τη μέθοδο `render` από το `@testing-library/react` για να συνδέσετε το στοιχείο στη σελίδα δοκιμών. Για αλληλεπίδραση με το στοιχείο, συνιστούμε να χρησιμοποιήσετε εντολές WebdriverIO καθώς συμπεριφέρονται πιο κοντά στις πραγματικές αλληλεπιδράσεις χρήστη, π.χ.:

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

Μπορείτε να βρείτε ένα πλήρες παράδειγμα σουίτας δοκιμών στοιχείων WebdriverIO για React στο [αποθετήριο παραδειγμάτων](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite) μας.