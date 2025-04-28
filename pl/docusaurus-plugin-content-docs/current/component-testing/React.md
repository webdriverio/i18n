---
id: react
title: React
---

[React](https://reactjs.org/) sprawia, że tworzenie interaktywnych interfejsów użytkownika jest bezbolesne. Projektuj proste widoki dla każdego stanu w twojej aplikacji, a React będzie efektywnie aktualizować i renderować odpowiednie komponenty, gdy twoje dane się zmienią. Możesz testować komponenty React bezpośrednio w rzeczywistej przeglądarce używając WebdriverIO i jego [przeglądarki testowej](/docs/runner#browser-runner).

## Konfiguracja

Aby skonfigurować WebdriverIO w twoim projekcie React, postępuj zgodnie z [instrukcjami](/docs/component-testing#set-up) w naszej dokumentacji testowania komponentów. Upewnij się, że wybrałeś `react` jako preset w opcjach runnera, np.:

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

Jeśli już używasz [Vite](https://vitejs.dev/) jako serwera deweloperskiego, możesz również wykorzystać swoją konfigurację z `vite.config.ts` w konfiguracji WebdriverIO. Więcej informacji znajdziesz w sekcji `viteConfig` w [opcjach runnera](/docs/runner#runner-options).

:::

Preset React wymaga zainstalowania `@vitejs/plugin-react`. Zalecamy również używanie [Testing Library](https://testing-library.com/) do renderowania komponentu na stronie testowej. W związku z tym będziesz musiał zainstalować następujące dodatkowe zależności:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

Następnie możesz uruchomić testy wykonując:

```sh
npx wdio run ./wdio.conf.js
```

## Pisanie testów

Załóżmy, że masz następujący komponent React:

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

W swoim teście użyj metody `render` z `@testing-library/react`, aby dołączyć komponent do strony testowej. Do interakcji z komponentem zalecamy używanie poleceń WebdriverIO, ponieważ zachowują się one bardziej podobnie do rzeczywistych interakcji użytkownika, np.:

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

Pełny przykład zestawu testów komponentów WebdriverIO dla React można znaleźć w naszym [repozytorium przykładów](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite).