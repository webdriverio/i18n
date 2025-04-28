---
id: solid
title: SolidJS
---

[SolidJS](https://www.solidjs.com/) är ett ramverk för att bygga användargränssnitt med enkel och prestandaoptimerad reaktivitet. Du kan testa SolidJS-komponenter direkt i en riktig webbläsare med hjälp av WebdriverIO och dess [webbläsarkörning](/docs/runner#browser-runner).

## Installation

För att installera WebdriverIO i ditt SolidJS-projekt, följ [instruktionerna](/docs/component-testing#set-up) i vår komponenttestningsdokumentation. Se till att välja `solid` som förinställning i dina körningsalternativ, t.ex.:

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

Om du redan använder [Vite](https://vitejs.dev/) som utvecklingsserver kan du också återanvända din konfiguration i `vite.config.ts` inom din WebdriverIO-konfiguration. För mer information, se `viteConfig` i [körningsalternativ](/docs/runner#runner-options).

:::

SolidJS-förinställningen kräver att `vite-plugin-solid` är installerad:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

Du kan sedan starta testerna genom att köra:

```sh
npx wdio run ./wdio.conf.js
```

## Skriva tester

Givet att du har följande SolidJS-komponent:

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

I ditt test använder du metoden `render` från `solid-js/web` för att fästa komponenten till testsidan. För att interagera med komponenten rekommenderar vi att du använder WebdriverIO-kommandon eftersom de beter sig mer likt faktiska användarinteraktioner, t.ex.:

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

Du hittar ett fullständigt exempel på en WebdriverIO-komponenttestsvit för SolidJS i vår [exempelrepositorium](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite).