---
id: stencil
title: Stencil
---

[Stencil](https://stenciljs.com/) είναι μια βιβλιοθήκη για την κατασκευή επαναχρησιμοποιήσιμων, κλιμακούμενων βιβλιοθηκών συστατικών. Μπορείτε να δοκιμάσετε τα συστατικά Stencil απευθείας σε ένα πραγματικό πρόγραμμα περιήγησης χρησιμοποιώντας το WebdriverIO και το [browser runner](/docs/runner#browser-runner).

## Εγκατάσταση

Για να ρυθμίσετε το WebdriverIO μέσα στο project Stencil σας, ακολουθήστε τις [οδηγίες](/docs/component-testing#set-up) στα έγγραφα τεκμηρίωσης των δοκιμών συστατικών μας. Βεβαιωθείτε ότι έχετε επιλέξει `stencil` ως προεπιλογή στις επιλογές του runner σας, π.χ.:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'stencil'
    }],
    // ...
}
```

:::info

Σε περίπτωση που χρησιμοποιείτε το Stencil με ένα framework όπως το React ή το Vue, θα πρέπει να διατηρήσετε την προεπιλογή για αυτά τα frameworks.

:::

Στη συνέχεια, μπορείτε να ξεκινήσετε τις δοκιμές εκτελώντας:

```sh
npx wdio run ./wdio.conf.ts
```

## Γράφοντας Δοκιμές

Δεδομένου ότι έχετε τα ακόλουθα συστατικά Stencil:

```tsx title="./components/Component.tsx"
import { Component, Prop, h } from '@stencil/core'

@Component({
    tag: 'my-name',
    shadow: true
})
export class MyName {
    @Prop() name: string

    normalize(name: string): string {
        if (name) {
            return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
        }
        return ''
    }

    render() {
        return (
            <div class="text">
                <p>Hello! My name is {this.normalize(this.name)}.</p>
            </div>
        )
    }
}
```

### `render`

Στις δοκιμές σας χρησιμοποιήστε τη μέθοδο `render` από το `@wdio/browser-runner/stencil` για να προσαρτήσετε το συστατικό στη σελίδα δοκιμής. Για να αλληλεπιδράσετε με το συστατικό, συνιστούμε να χρησιμοποιείτε εντολές WebdriverIO καθώς συμπεριφέρονται πιο κοντά στις πραγματικές αλληλεπιδράσεις χρηστών, π.χ.:

```tsx title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from '@wdio/browser-runner/stencil'

import MyNameComponent from './components/Component.tsx'

describe('Stencil Component Testing', () => {
    it('should render component correctly', async () => {
        await render({
            components: [MyNameComponent],
            template: () => (
                <my-name name={'stencil'}></my-name>
            )
        })
        await expect($('.text')).toHaveText('Hello! My name is Stencil.')
    })
})
```

#### Επιλογές Render

Η μέθοδος `render` παρέχει τις ακόλουθες επιλογές:

##### `components`

Ένας πίνακας συστατικών για δοκιμή. Οι κλάσεις συστατικών μπορούν να εισαχθούν στο αρχείο προδιαγραφών, στη συνέχεια η αναφορά τους θα πρέπει να προστεθεί στον πίνακα `component` για να χρησιμοποιηθεί σε όλη τη δοκιμή.

__Τύπος:__ `CustomElementConstructor[]`<br />
__Προεπιλογή:__ `[]`

##### `flushQueue`

Εάν είναι `false`, μην καθαρίζετε την ουρά απόδοσης κατά την αρχική ρύθμιση της δοκιμής.

__Τύπος:__ `boolean`<br />
__Προεπιλογή:__ `true`

##### `template`

Το αρχικό JSX που χρησιμοποιείται για τη δημιουργία της δοκιμής. Χρησιμοποιήστε το `template` όταν θέλετε να αρχικοποιήσετε ένα συστατικό χρησιμοποιώντας τις ιδιότητές του, αντί για τα χαρακτηριστικά HTML του. Θα αποδώσει το καθορισμένο πρότυπο (JSX) στο `document.body`.

__Τύπος:__ `JSX.Template`

##### `html`

Το αρχικό HTML που χρησιμοποιείται για τη δημιουργία της δοκιμής. Αυτό μπορεί να είναι χρήσιμο για την κατασκευή μιας συλλογής συστατικών που λειτουργούν μαζί και την εκχώρηση χαρακτηριστικών HTML.

__Τύπος:__ `string`

##### `language`

Ορίζει το προσομοιωμένο χαρακτηριστικό `lang` στο `<html>`.

__Τύπος:__ `string`

##### `autoApplyChanges`

Από προεπιλογή, οποιεσδήποτε αλλαγές στις ιδιότητες και τα χαρακτηριστικά των συστατικών πρέπει να έχουν `env.waitForChanges()` για να δοκιμάσουν τις ενημερώσεις. Ως επιλογή, το `autoApplyChanges` καθαρίζει συνεχώς την ουρά στο παρασκήνιο.

__Τύπος:__ `boolean`<br />
__Προεπιλογή:__ `false`

##### `attachStyles`

Από προεπιλογή, τα στυλ δεν επισυνάπτονται στο DOM και δεν αντικατοπτρίζονται στο σειριοποιημένο HTML. Η ρύθμιση αυτής της επιλογής σε `true` θα συμπεριλάβει τα στυλ του συστατικού στην έξοδο που μπορεί να σειριοποιηθεί.

__Τύπος:__ `boolean`<br />
__Προεπιλογή:__ `false`

#### Περιβάλλον Render

Η μέθοδος `render` επιστρέφει ένα αντικείμενο περιβάλλοντος που παρέχει ορισμένους βοηθούς χρησιμότητας για τη διαχείριση του περιβάλλοντος του συστατικού.

##### `flushAll`

Αφού γίνουν αλλαγές σε ένα συστατικό, όπως μια ενημέρωση σε μια ιδιότητα ή χαρακτηριστικό, η σελίδα δοκιμής δεν εφαρμόζει αυτόματα τις αλλαγές. Για να περιμένετε και να εφαρμόσετε την ενημέρωση, καλέστε `await flushAll()`

__Τύπος:__ `() => void`

##### `unmount`

Αφαιρεί το στοιχείο container από το DOM.

__Τύπος:__ `() => void`

##### `styles`

Όλα τα στυλ που ορίζονται από τα συστατικά.

__Τύπος:__ `Record<string, string>`

##### `container`

Το στοιχείο container στο οποίο αποδίδεται το πρότυπο.

__Τύπος:__ `HTMLElement`

##### `$container`

Το στοιχείο container ως στοιχείο WebdriverIO.

__Τύπος:__ `WebdriverIO.Element`

##### `root`

Το βασικό συστατικό του προτύπου.

__Τύπος:__ `HTMLElement`

##### `$root`

Το βασικό συστατικό ως στοιχείο WebdriverIO.

__Τύπος:__ `WebdriverIO.Element`

### `waitForChanges`

Βοηθητική μέθοδος για να περιμένετε μέχρι το συστατικό να είναι έτοιμο.

```ts
import { render, waitForChanges } from '@wdio/browser-runner/stencil'
import { MyComponent } from './component.tsx'

const page = render({
    components: [MyComponent],
    html: '<my-component></my-component>'
})

expect(page.root.querySelector('div')).not.toBeDefined()
await waitForChanges()
expect(page.root.querySelector('div')).toBeDefined()
```

## Ενημερώσεις Στοιχείων

Εάν ορίσετε ιδιότητες ή καταστάσεις στο συστατικό Stencil σας, πρέπει να διαχειριστείτε πότε αυτές οι αλλαγές θα πρέπει να εφαρμοστούν στο συστατικό για να αποδοθεί ξανά.


## Παραδείγματα

Μπορείτε να βρείτε ένα πλήρες παράδειγμα μιας σουίτας δοκιμών συστατικών WebdriverIO για το Stencil στο [αποθετήριο παραδειγμάτων](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter) μας.