---
id: solid
title: SolidJS
---

[SolidJS](https://www.solidjs.com/) ist ein Framework zum Erstellen von Benutzeroberflächen mit einfacher und leistungsstarker Reaktivität. Sie können SolidJS-Komponenten direkt in einem echten Browser mit WebdriverIO und seinem [Browser-Runner](/docs/runner#browser-runner) testen.

## Setup

Um WebdriverIO in Ihrem SolidJS-Projekt einzurichten, folgen Sie den [Anweisungen](/docs/component-testing#set-up) in unserer Komponententest-Dokumentation. Stellen Sie sicher, dass Sie `solid` als Preset in Ihren Runner-Optionen auswählen, z.B.:

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

Wenn Sie bereits [Vite](https://vitejs.dev/) als Entwicklungsserver verwenden, können Sie Ihre Konfiguration in `vite.config.ts` auch innerhalb Ihrer WebdriverIO-Konfiguration wiederverwenden. Weitere Informationen finden Sie unter `viteConfig` in den [Runner-Optionen](/docs/runner#runner-options).

:::

Das SolidJS-Preset erfordert, dass `vite-plugin-solid` installiert ist:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

Sie können dann die Tests starten, indem Sie Folgendes ausführen:

```sh
npx wdio run ./wdio.conf.js
```

## Tests schreiben

Angenommen, Sie haben die folgende SolidJS-Komponente:

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

Verwenden Sie in Ihrem Test die `render`-Methode von `solid-js/web`, um die Komponente an die Testseite anzuhängen. Um mit der Komponente zu interagieren, empfehlen wir die Verwendung von WebdriverIO-Befehlen, da diese den tatsächlichen Benutzerinteraktionen näher kommen, z.B.:

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

Ein vollständiges Beispiel einer WebdriverIO-Komponententestsuite für SolidJS finden Sie in unserem [Beispiel-Repository](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite).