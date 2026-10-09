---
id: solid
title: SolidJS
description: "Richten Sie den WebdriverIO Browser-Runner für ein SolidJS-Projekt mit dem solid-Preset ein und schreiben Sie Komponententests, die in die Seite gerendert werden."
---

[SolidJS](https://www.solidjs.com/) ist ein Framework zum Erstellen von Benutzeroberflächen mit einfacher und performanter Reaktivität. Sie können SolidJS-Komponenten direkt in einem echten Browser mit WebdriverIO und dessen [Browser-Runner](/docs/runner#browser-runner) testen.

## Einrichtung

Um WebdriverIO in Ihrem SolidJS-Projekt einzurichten, folgen Sie den [Anweisungen](/docs/component-testing#set-up) in unserer Dokumentation zum Komponententesten. Stellen Sie sicher, dass Sie `solid` als Preset in Ihren Runner-Optionen auswählen, z. B.:

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

Wenn Sie bereits [Vite](https://vitejs.dev/) als Entwicklungsserver verwenden, können Sie auch einfach Ihre Konfiguration aus `vite.config.ts` in Ihrer WebdriverIO-Konfiguration wiederverwenden. Weitere Informationen finden Sie unter `viteConfig` in den [Runner-Optionen](/docs/runner#runner-options).

:::

Das SolidJS-Preset erfordert, dass `vite-plugin-solid` installiert ist:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

Anschließend können Sie die Tests starten, indem Sie Folgendes ausführen:

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

Verwenden Sie in Ihrem Test die `render`-Methode aus `solid-js/web`, um die Komponente an die Testseite anzuhängen. Für die Interaktion mit der Komponente empfehlen wir die Verwendung von WebdriverIO-Befehlen, da diese sich näher an echten Benutzerinteraktionen verhalten, z. B.:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * stellt sicher, dass wir die Komponente für jeden Test in einem
     * neuen Root-Container rendern
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

Ein vollständiges Beispiel einer WebdriverIO-Komponententest-Suite für SolidJS finden Sie in unserem [Beispiel-Repository](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite).