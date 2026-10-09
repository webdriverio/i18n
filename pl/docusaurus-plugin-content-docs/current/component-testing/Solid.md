---
id: solid
title: SolidJS
description: "Skonfiguruj browser runner WebdriverIO dla projektu SolidJS z presetem solid i pisz testy komponentów, które renderują się na stronie."
---

[SolidJS](https://www.solidjs.com/) to framework do budowania interfejsów użytkownika z prostą i wydajną reaktywnością. Możesz testować komponenty SolidJS bezpośrednio w prawdziwej przeglądarce, używając WebdriverIO i jego [browser runnera](/docs/runner#browser-runner).

## Konfiguracja

Aby skonfigurować WebdriverIO w swoim projekcie SolidJS, postępuj zgodnie z [instrukcjami](/docs/component-testing#set-up) w naszej dokumentacji testowania komponentów. Upewnij się, że wybrałeś `solid` jako preset w opcjach runnera, np.:

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

Jeśli już używasz [Vite](https://vitejs.dev/) jako serwera deweloperskiego, możesz po prostu ponownie wykorzystać swoją konfigurację z `vite.config.ts` w konfiguracji WebdriverIO. Więcej informacji znajdziesz w opisie `viteConfig` w [opcjach runnera](/docs/runner#runner-options).

:::

Preset SolidJS wymaga zainstalowania `vite-plugin-solid`:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

Następnie możesz uruchomić testy, wykonując:

```sh
npx wdio run ./wdio.conf.js
```

## Pisanie testów

Załóżmy, że masz następujący komponent SolidJS:

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

W swoim teście użyj metody `render` z `solid-js/web`, aby dołączyć komponent do strony testowej. Do interakcji z komponentem zalecamy używanie poleceń WebdriverIO, ponieważ zachowują się one bardziej podobnie do rzeczywistych interakcji użytkownika, np.:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * upewnij się, że komponent jest renderowany dla każdego testu
     * w nowym kontenerze głównym
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

Pełny przykład zestawu testów komponentów WebdriverIO dla SolidJS znajdziesz w naszym [repozytorium przykładów](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite).