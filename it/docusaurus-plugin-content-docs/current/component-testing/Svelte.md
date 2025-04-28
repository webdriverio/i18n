---
id: svelte
title: Svelte
---

[Svelte](https://svelte.dev/) è un approccio radicalmente nuovo alla costruzione di interfacce utente. Mentre i framework tradizionali come React e Vue svolgono la maggior parte del loro lavoro nel browser, Svelte sposta quel lavoro in una fase di compilazione che avviene quando costruisci la tua app. Puoi testare i componenti Svelte direttamente in un browser reale utilizzando WebdriverIO e il suo [browser runner](/docs/runner#browser-runner).

## Setup

Per configurare WebdriverIO all'interno del tuo progetto Svelte, segui le [istruzioni](/docs/component-testing#set-up) nei nostri documenti di test dei componenti. Assicurati di selezionare `svelte` come preset nelle tue opzioni di runner, ad esempio:

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

Se stai già utilizzando [Vite](https://vitejs.dev/) come server di sviluppo, puoi anche riutilizzare la tua configurazione in `vite.config.ts` all'interno della tua configurazione WebdriverIO. Per maggiori informazioni, vedi `viteConfig` nelle [opzioni runner](/docs/runner#runner-options).

:::

Il preset Svelte richiede che `@sveltejs/vite-plugin-svelte` sia installato. Inoltre, consigliamo di utilizzare [Testing Library](https://testing-library.com/) per renderizzare il componente nella pagina di test. Pertanto, dovrai installare le seguenti dipendenze aggiuntive:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

Quindi puoi avviare i test eseguendo:

```sh
npx wdio run ./wdio.conf.js
```

## Scrittura dei Test

Dato che hai il seguente componente Svelte:

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

Nel tuo test utilizza il metodo `render` da `@testing-library/svelte` per collegare il componente alla pagina di test. Per interagire con il componente consigliamo di utilizzare i comandi WebdriverIO poiché si comportano in modo più simile alle interazioni utente reali, ad esempio:

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

Puoi trovare un esempio completo di una suite di test di componenti WebdriverIO per Svelte nel nostro [repository di esempi](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite).