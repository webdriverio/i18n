---
id: react
title: React
description: "Konfigurera WebdriverIO:s webbläsarrunner för ett React-projekt med react-förinställningen och skriv komponenttester med Testing Library."
---

[React](https://reactjs.org/) gör det smärtfritt att skapa interaktiva användargränssnitt. Designa enkla vyer för varje tillstånd i din applikation, så kommer React effektivt att uppdatera och rendera precis rätt komponenter när din data ändras. Du kan testa React-komponenter direkt i en riktig webbläsare med WebdriverIO och dess [webbläsarrunner](/docs/runner#browser-runner).

## Installation

För att konfigurera WebdriverIO i ditt React-projekt, följ [instruktionerna](/docs/component-testing#set-up) i vår dokumentation för komponenttestning. Se till att välja `react` som förinställning (preset) i dina runner-alternativ, t.ex.:

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

Om du redan använder [Vite](https://vitejs.dev/) som utvecklingsserver kan du också helt enkelt återanvända din konfiguration i `vite.config.ts` i din WebdriverIO-konfiguration. För mer information, se `viteConfig` i [runner-alternativ](/docs/runner#runner-options).

:::

React-förinställningen kräver att `@vitejs/plugin-react` är installerat. Vi rekommenderar också att du använder [Testing Library](https://testing-library.com/) för att rendera komponenten på testsidan. Därför behöver du installera följande ytterligare beroenden:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

Du kan sedan starta testerna genom att köra:

```sh
npx wdio run ./wdio.conf.js
```

## Skriva tester

Anta att du har följande React-komponent:

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

I ditt test använder du metoden `render` från `@testing-library/react` för att fästa komponenten på testsidan. För att interagera med komponenten rekommenderar vi att du använder WebdriverIO-kommandon eftersom de beter sig mer som verkliga användarinteraktioner, t.ex.:

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

Du hittar ett fullständigt exempel på en WebdriverIO-testsvit för komponenttestning av React i vårt [exempelrepository](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite).