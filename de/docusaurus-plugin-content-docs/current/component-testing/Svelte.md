---
id: svelte
title: Svelte
---

[Svelte](https://svelte.dev/) ist ein radikal neuer Ansatz zum Erstellen von Benutzeroberflächen. Während traditionelle Frameworks wie React und Vue den Großteil ihrer Arbeit im Browser erledigen, verlagert Svelte diese Arbeit in einen Kompilierungsschritt, der beim Erstellen Ihrer App stattfindet. Sie können Svelte-Komponenten direkt in einem echten Browser mit WebdriverIO und seinem [Browser-Runner](/docs/runner#browser-runner) testen.

## Setup

Um WebdriverIO in Ihrem Svelte-Projekt einzurichten, folgen Sie den [Anweisungen](/docs/component-testing#set-up) in unserer Komponententest-Dokumentation. Stellen Sie sicher, dass Sie `svelte` als Preset in Ihren Runner-Optionen auswählen, z.B.:

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

Wenn Sie bereits [Vite](https://vitejs.dev/) als Entwicklungsserver verwenden, können Sie Ihre Konfiguration in `vite.config.ts` auch innerhalb Ihrer WebdriverIO-Konfiguration wiederverwenden. Weitere Informationen finden Sie unter `viteConfig` in den [Runner-Optionen](/docs/runner#runner-options).

:::

Das Svelte-Preset erfordert, dass `@sveltejs/vite-plugin-svelte` installiert ist. Außerdem empfehlen wir die Verwendung von [Testing Library](https://testing-library.com/) zum Rendern der Komponente in der Testseite. Dafür müssen Sie die folgenden zusätzlichen Abhängigkeiten installieren:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

Sie können dann die Tests starten, indem Sie Folgendes ausführen:

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

Verwenden Sie in Ihrem Test die `render`-Methode von `@testing-library/svelte`, um die Komponente an die Testseite anzuhängen. Um mit der Komponente zu interagieren, empfehlen wir die Verwendung von WebdriverIO-Befehlen, da diese den tatsächlichen Benutzerinteraktionen näher kommen, z.B.:

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