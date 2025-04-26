---
id: react
title: React
---

[React](https://reactjs.org/) macht es schmerzlos, interaktive Benutzeroberflächen zu erstellen. Entwerfen Sie einfache Ansichten für jeden Zustand in Ihrer Anwendung, und React wird effizient nur die richtigen Komponenten aktualisieren und rendern, wenn sich Ihre Daten ändern. Sie können React-Komponenten direkt in einem echten Browser mit WebdriverIO und seinem [Browser-Runner](/docs/runner#browser-runner) testen.

## Setup

Um WebdriverIO in Ihrem React-Projekt einzurichten, folgen Sie den [Anweisungen](/docs/component-testing#set-up) in unserer Komponententest-Dokumentation. Stellen Sie sicher, dass Sie `react` als Preset in Ihren Runner-Optionen auswählen, z.B.:

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

Wenn Sie bereits [Vite](https://vitejs.dev/) als Entwicklungsserver verwenden, können Sie Ihre Konfiguration in `vite.config.ts` auch einfach in Ihrer WebdriverIO-Konfiguration wiederverwenden. Weitere Informationen finden Sie unter `viteConfig` in den [Runner-Optionen](/docs/runner#runner-options).

:::

Das React-Preset erfordert, dass `@vitejs/plugin-react` installiert ist. Außerdem empfehlen wir die Verwendung von [Testing Library](https://testing-library.com/) zum Rendern der Komponente auf der Testseite. Dafür müssen Sie die folgenden zusätzlichen Abhängigkeiten installieren:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

Sie können dann die Tests starten, indem Sie Folgendes ausführen:

```sh
npx wdio run ./wdio.conf.js
```

## Tests schreiben

Angenommen, Sie haben die folgende React-Komponente:

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

Verwenden Sie in Ihrem Test die `render`-Methode von `@testing-library/react`, um die Komponente an die Testseite anzuhängen. Um mit der Komponente zu interagieren, empfehlen wir die Verwendung von WebdriverIO-Befehlen, da sie sich näher an tatsächlichen Benutzerinteraktionen orientieren, z.B.:

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

Ein vollständiges Beispiel einer WebdriverIO-Komponententestsuite für React finden Sie in unserem [Beispiel-Repository](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite).