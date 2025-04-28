---
id: svelte
title: Svelte
---

[Svelte](https://svelte.dev/) to radykalnie nowe podejście do budowania interfejsów użytkownika. Podczas gdy tradycyjne frameworki, takie jak React i Vue, wykonują większość swojej pracy w przeglądarce, Svelte przenosi tę pracę do etapu kompilacji, który odbywa się podczas budowania aplikacji. Możesz testować komponenty Svelte bezpośrednio w prawdziwej przeglądarce za pomocą WebdriverIO i jego [browser runnera](/docs/runner#browser-runner).

## Konfiguracja

Aby skonfigurować WebdriverIO w swoim projekcie Svelte, postępuj zgodnie z [instrukcjami](/docs/component-testing#set-up) w naszej dokumentacji testowania komponentów. Upewnij się, że wybierzesz `svelte` jako preset w opcjach runnera, np.:

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

Jeśli już używasz [Vite](https://vitejs.dev/) jako serwera deweloperskiego, możesz również ponownie wykorzystać swoją konfigurację z `vite.config.ts` w konfiguracji WebdriverIO. Aby uzyskać więcej informacji, zobacz `viteConfig` w [opcjach runnera](/docs/runner#runner-options).

:::

Preset Svelte wymaga zainstalowania `@sveltejs/vite-plugin-svelte`. Zalecamy również używanie [Testing Library](https://testing-library.com/) do renderowania komponentu na stronie testowej. W tym celu musisz zainstalować następujące dodatkowe zależności:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

Następnie możesz uruchomić testy, wykonując:

```sh
npx wdio run ./wdio.conf.js
```

## Pisanie testów

Załóżmy, że masz następujący komponent Svelte:

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

W teście użyj metody `render` z `@testing-library/svelte`, aby dołączyć komponent do strony testowej. Do interakcji z komponentem zalecamy używanie poleceń WebdriverIO, ponieważ zachowują się bardziej podobnie do rzeczywistych interakcji użytkownika, np.:

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

Pełny przykład zestawu testów komponentów WebdriverIO dla Svelte można znaleźć w naszym [repozytorium przykładów](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite).