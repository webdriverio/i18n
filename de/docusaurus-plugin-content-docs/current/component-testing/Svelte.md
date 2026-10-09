---
id: svelte
title: Svelte
description: "Richten Sie den WebdriverIO Browser-Runner für ein Svelte-Projekt mit dem Svelte-Preset ein und schreiben Sie Komponententests mit Testing Library."
---

[Svelte](https://svelte.dev/) ist ein radikal neuer Ansatz zur Erstellung von Benutzeroberflächen. Während traditionelle Frameworks wie React und Vue den Großteil ihrer Arbeit im Browser erledigen, verlagert Svelte diese Arbeit in einen Kompilierungsschritt, der beim Erstellen Ihrer App stattfindet. Sie können Svelte-Komponenten direkt in einem echten Browser mit WebdriverIO und seinem [Browser-Runner](/docs/runner#browser-runner) testen.

## Einrichtung

Um WebdriverIO in Ihrem Svelte-Projekt einzurichten, folgen Sie den [Anweisungen](/docs/component-testing#set-up) in unserer Dokumentation zum Komponententesten. Stellen Sie sicher, dass Sie `svelte` als Preset in Ihren Runner-Optionen auswählen, z. B.:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

:::info

Wenn Sie bereits [Vite](https://vitejs.dev/) als Entwicklungsserver verwenden, können Sie auch einfach Ihre Konfiguration aus `vite.config.ts` in Ihrer WebdriverIO-Konfiguration wiederverwenden. Weitere Informationen finden Sie unter `viteConfig` in den [Runner-Optionen](/docs/runner#runner-options).

:::

Das Svelte-Preset erfordert die Installation von `@sveltejs/vite-plugin-svelte`. Außerdem empfehlen wir die Verwendung von [Testing Library](https://testing-library.com/), um die Komponente in die Testseite zu rendern. Daher müssen Sie die folgenden zusätzlichen Abhängigkeiten installieren:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

Anschließend können Sie die Tests starten, indem Sie Folgendes ausführen:

```sh
npx wdio run ./wdio.conf.js
```

## Tests schreiben

Angenommen, Sie haben die folgende Svelte-Komponente:

```html title="./components/Component.svelte"
<script>
    export let name

    let buttonText = 'Button'

    function handleClick() {
      buttonText = 'Button Clicked'
    }
</script>

<h1>Hello {name}!</h1>
<button on:click="{handleClick}">{buttonText}</button>
```

Verwenden Sie in Ihrem Test die Methode `render` aus `@testing-library/svelte`, um die Komponente an die Testseite anzuhängen. Für die Interaktion mit der Komponente empfehlen wir die Verwendung von WebdriverIO-Befehlen, da diese sich näher an tatsächlichen Benutzerinteraktionen verhalten, z. B.:

```ts title="svelte.test.js"
import expect from 'expect'

import { render, fireEvent, screen } from '@testing-library/svelte'
import '@testing-library/jest-dom'

import Component from './components/Component.svelte'

describe('Svelte Component Testing', () => {
    it('changes button text on click', async () => {
        render(Component, { name: 'World' })
        const button = await $('button')
        await expect(button).toHaveText('Button')
        await button.click()
        await expect(button).toHaveText('Button Clicked')
    })
})
```

Ein vollständiges Beispiel einer WebdriverIO-Komponententestsuite für Svelte finden Sie in unserem [Beispiel-Repository](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite).