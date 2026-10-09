---
id: svelte
title: Svelte
description: "Ρυθμίστε τον browser runner του WebdriverIO για ένα έργο Svelte με το preset svelte και γράψτε δοκιμές components με το Testing Library."
---

Το [Svelte](https://svelte.dev/) είναι μια ριζικά νέα προσέγγιση στη δημιουργία διεπαφών χρήστη. Ενώ τα παραδοσιακά frameworks όπως το React και το Vue κάνουν το μεγαλύτερο μέρος της δουλειάς τους στον browser, το Svelte μεταφέρει αυτή τη δουλειά σε ένα βήμα μεταγλώττισης που πραγματοποιείται όταν κάνετε build την εφαρμογή σας. Μπορείτε να δοκιμάσετε τα Svelte components απευθείας σε έναν πραγματικό browser χρησιμοποιώντας το WebdriverIO και τον [browser runner](/docs/runner#browser-runner) του.

## Ρύθμιση

Για να ρυθμίσετε το WebdriverIO στο έργο Svelte σας, ακολουθήστε τις [οδηγίες](/docs/component-testing#set-up) στην τεκμηρίωση για τις δοκιμές components. Βεβαιωθείτε ότι έχετε επιλέξει `svelte` ως preset στις επιλογές του runner, π.χ.:

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

Αν χρησιμοποιείτε ήδη το [Vite](https://vitejs.dev/) ως development server, μπορείτε επίσης απλώς να επαναχρησιμοποιήσετε τη διαμόρφωσή σας από το `vite.config.ts` μέσα στη διαμόρφωση του WebdriverIO. Για περισσότερες πληροφορίες, δείτε το `viteConfig` στις [επιλογές του runner](/docs/runner#runner-options).

:::

Το preset του Svelte απαιτεί να είναι εγκατεστημένο το `@sveltejs/vite-plugin-svelte`. Επίσης, συνιστούμε τη χρήση του [Testing Library](https://testing-library.com/) για την απόδοση (render) του component στη σελίδα δοκιμής. Επομένως, θα χρειαστεί να εγκαταστήσετε τις ακόλουθες πρόσθετες εξαρτήσεις:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

Στη συνέχεια, μπορείτε να ξεκινήσετε τις δοκιμές εκτελώντας:

```sh
npx wdio run ./wdio.conf.js
```

## Συγγραφή Δοκιμών

Δεδομένου ότι έχετε το ακόλουθο Svelte component:

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

Στη δοκιμή σας χρησιμοποιήστε τη μέθοδο `render` από το `@testing-library/svelte` για να προσαρτήσετε το component στη σελίδα δοκιμής. Για να αλληλεπιδράσετε με το component, συνιστούμε τη χρήση εντολών του WebdriverIO, καθώς συμπεριφέρονται πιο κοντά στις πραγματικές αλληλεπιδράσεις του χρήστη, π.χ.:

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

Μπορείτε να βρείτε ένα πλήρες παράδειγμα σουίτας δοκιμών components του WebdriverIO για το Svelte στο [αποθετήριο παραδειγμάτων](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite) μας.