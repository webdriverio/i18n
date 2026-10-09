---
id: svelte
title: Svelte
description: "Konfigurera WebdriverIO:s webbläsarkörare för ett Svelte-projekt med svelte-förinställningen och skriv komponenttester med Testing Library."
---

[Svelte](https://svelte.dev/) är ett radikalt nytt sätt att bygga användargränssnitt. Medan traditionella ramverk som React och Vue utför huvuddelen av sitt arbete i webbläsaren, flyttar Svelte det arbetet till ett kompileringssteg som sker när du bygger din app. Du kan testa Svelte-komponenter direkt i en riktig webbläsare med WebdriverIO och dess [webbläsarkörare](/docs/runner#browser-runner).

## Installation

För att konfigurera WebdriverIO i ditt Svelte-projekt, följ [instruktionerna](/docs/component-testing#set-up) i vår dokumentation om komponenttestning. Se till att välja `svelte` som förinställning i dina runner-alternativ, t.ex.:

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

Om du redan använder [Vite](https://vitejs.dev/) som utvecklingsserver kan du också helt enkelt återanvända din konfiguration i `vite.config.ts` i din WebdriverIO-konfiguration. För mer information, se `viteConfig` i [runner-alternativ](/docs/runner#runner-options).

:::

Svelte-förinställningen kräver att `@sveltejs/vite-plugin-svelte` är installerat. Vi rekommenderar också att du använder [Testing Library](https://testing-library.com/) för att rendera komponenten på testsidan. Därför behöver du installera följande ytterligare beroenden:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

Du kan sedan starta testerna genom att köra:

```sh
npx wdio run ./wdio.conf.js
```

## Skriva tester

Anta att du har följande Svelte-komponent:

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

I ditt test, använd metoden `render` från `@testing-library/svelte` för att fästa komponenten på testsidan. För att interagera med komponenten rekommenderar vi att du använder WebdriverIO-kommandon eftersom de beter sig mer likt faktiska användarinteraktioner, t.ex.:

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

Du hittar ett fullständigt exempel på en WebdriverIO-testsvit för komponenttestning av Svelte i vårt [exempelrepository](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite).