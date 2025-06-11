---
id: svelte
title: Svelte
---

Το [Svelte](https://svelte.dev/) είναι μια ριζικά νέα προσέγγιση στην κατασκευή διεπαφών χρήστη. Ενώ τα παραδοσιακά frameworks όπως το React και το Vue κάνουν το μεγαλύτερο μέρος της δουλειάς τους στο πρόγραμμα περιήγησης, το Svelte μεταφέρει αυτή τη δουλειά σε ένα βήμα μεταγλώττισης που συμβαίνει όταν δημιουργείτε την εφαρμογή σας. Μπορείτε να δοκιμάσετε τα components του Svelte απευθείας σε ένα πραγματικό πρόγραμμα περιήγησης χρησιμοποιώντας το WebdriverIO και το [browser runner](/docs/runner#browser-runner) του.

## Setup

Για να ρυθμίσετε το WebdriverIO μέσα στο project του Svelte σας, ακολουθήστε τις [οδηγίες](/docs/component-testing#set-up) στα έγγραφα για component testing. Βεβαιωθείτε ότι έχετε επιλέξει `svelte` ως preset στις επιλογές του runner σας, π.χ.:

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

Αν χρησιμοποιείτε ήδη το [Vite](https://vitejs.dev/) ως διακομιστή ανάπτυξης, μπορείτε επίσης να επαναχρησιμοποιήσετε τη διαμόρφωσή σας στο `vite.config.ts` μέσα στη διαμόρφωση του WebdriverIO. Για περισσότερες πληροφορίες, δείτε το `viteConfig` στις [επιλογές runner](/docs/runner#runner-options).

:::

Το preset του Svelte απαιτεί την εγκατάσταση του `@sveltejs/vite-plugin-svelte`. Επίσης, συνιστούμε τη χρήση του [Testing Library](https://testing-library.com/) για την απεικόνιση του component στη σελίδα δοκιμής. Για αυτό θα χρειαστεί να εγκαταστήσετε τις ακόλουθες πρόσθετες εξαρτήσεις:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

Στη συνέχεια, μπορείτε να ξεκινήσετε τις δοκιμές εκτελώντας:

```sh
npx wdio run ./wdio.conf.js
```

## Writing Tests

Δεδομένου ότι έχετε το ακόλουθο component Svelte:

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

Στη δοκιμή σας, χρησιμοποιήστε τη μέθοδο `render` από το `@testing-library/svelte` για να επισυνάψετε το component στη σελίδα δοκιμής. Για να αλληλεπιδράσετε με το component, συνιστούμε να χρησιμοποιήσετε εντολές WebdriverIO καθώς συμπεριφέρονται πιο κοντά στις πραγματικές αλληλεπιδράσεις χρηστών, π.χ.:

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

Μπορείτε να βρείτε ένα πλήρες παράδειγμα μιας σουίτας δοκιμών component WebdriverIO για το Svelte στο [αποθετήριο παραδειγμάτων](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite) μας.