---
id: react
title: React
---

[React](https://reactjs.org/) rende indolore la creazione di interfacce utente interattive. Progetta viste semplici per ogni stato nella tua applicazione, e React aggiornerà e renderizzerà in modo efficiente solo i componenti giusti quando i tuoi dati cambiano. Puoi testare i componenti React direttamente in un browser reale utilizzando WebdriverIO e il suo [browser runner](/docs/runner#browser-runner).

## Setup

Per configurare WebdriverIO all'interno del tuo progetto React, segui le [istruzioni](/docs/component-testing#set-up) nella nostra documentazione di test dei componenti. Assicurati di selezionare `react` come preset nelle tue opzioni di runner, ad esempio:

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

Se stai già utilizzando [Vite](https://vitejs.dev/) come server di sviluppo, puoi anche riutilizzare la tua configurazione in `vite.config.ts` all'interno della tua configurazione WebdriverIO. Per maggiori informazioni, vedi `viteConfig` nelle [opzioni runner](/docs/runner#runner-options).

:::

Il preset React richiede che `@vitejs/plugin-react` sia installato. Inoltre, consigliamo di utilizzare [Testing Library](https://testing-library.com/) per renderizzare il componente nella pagina di test. Pertanto, dovrai installare le seguenti dipendenze aggiuntive:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

Puoi quindi avviare i test eseguendo:

```sh
npx wdio run ./wdio.conf.js
```

## Scrittura dei Test

Dato che hai il seguente componente React:

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

Nel tuo test, utilizza il metodo `render` da `@testing-library/react` per collegare il componente alla pagina di test. Per interagire con il componente, consigliamo di utilizzare i comandi WebdriverIO poiché si comportano in modo più simile alle interazioni reali dell'utente, ad esempio:

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

Puoi trovare un esempio completo di una suite di test dei componenti WebdriverIO per React nel nostro [repository di esempi](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite).