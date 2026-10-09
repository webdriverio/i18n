---
id: stencil
title: Stencil
description: "Ρυθμίστε τον browser runner του WebdriverIO για components του Stencil, αποδώστε τα με τη βοηθητική συνάρτηση render και περιμένετε τις ενημερώσεις των στοιχείων."
---

Το [Stencil](https://stenciljs.com/) είναι μια βιβλιοθήκη για τη δημιουργία επαναχρησιμοποιήσιμων, κλιμακούμενων βιβλιοθηκών components. Μπορείτε να ελέγξετε components του Stencil απευθείας σε έναν πραγματικό browser χρησιμοποιώντας το WebdriverIO και τον [browser runner](/docs/runner#browser-runner) του.

## Ρύθμιση

Για να ρυθμίσετε το WebdriverIO μέσα στο Stencil project σας, ακολουθήστε τις [οδηγίες](/docs/component-testing#set-up) στην τεκμηρίωσή μας για τον έλεγχο components. Βεβαιωθείτε ότι έχετε επιλέξει το `stencil` ως preset στις επιλογές του runner σας, π.χ.:

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

Σε περίπτωση που χρησιμοποιείτε το Stencil με ένα framework όπως το React ή το Vue, θα πρέπει να διατηρήσετε το preset για αυτά τα frameworks.

:::

Στη συνέχεια, μπορείτε να ξεκινήσετε τα τεστ εκτελώντας:

```sh
npx wdio run ./wdio.conf.ts
```

## Συγγραφή Τεστ

Δεδομένου ότι έχετε τα ακόλουθα components του Stencil:

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

Στο τεστ σας χρησιμοποιήστε τη μέθοδο `render` από το `@wdio/browser-runner/stencil` για να προσαρτήσετε το component στη σελίδα του τεστ. Για να αλληλεπιδράσετε με το component, συνιστούμε τη χρήση εντολών του WebdriverIO, καθώς συμπεριφέρονται πιο κοντά σε πραγματικές αλληλεπιδράσεις χρήστη, π.χ.:

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

Ένας πίνακας από components προς έλεγχο. Οι κλάσεις των components μπορούν να εισαχθούν στο αρχείο spec και στη συνέχεια η αναφορά τους πρέπει να προστεθεί στον πίνακα `component` ώστε να χρησιμοποιηθούν σε όλο το τεστ.

__Τύπος:__ `CustomElementConstructor[]`<br />
__Προεπιλογή:__ `[]`

##### `flushQueue`

Αν είναι `false`, η ουρά απόδοσης δεν εκκαθαρίζεται κατά την αρχική ρύθμιση του τεστ.

__Τύπος:__ `boolean`<br />
__Προεπιλογή:__ `true`

##### `template`

Το αρχικό JSX που χρησιμοποιείται για τη δημιουργία του τεστ. Χρησιμοποιήστε το `template` όταν θέλετε να αρχικοποιήσετε ένα component χρησιμοποιώντας τις ιδιότητές του, αντί για τα HTML attributes του. Θα αποδώσει το καθορισμένο template (JSX) μέσα στο `document.body`.

__Τύπος:__ `JSX.Template`

##### `html`

Το αρχικό HTML που χρησιμοποιείται για τη δημιουργία του τεστ. Αυτό μπορεί να είναι χρήσιμο για την κατασκευή μιας συλλογής από components που λειτουργούν μαζί, καθώς και για την ανάθεση HTML attributes.

__Τύπος:__ `string`

##### `language`

Ορίζει το προσομοιωμένο attribute `lang` στο `<html>`.

__Τύπος:__ `string`

##### `autoApplyChanges`

Από προεπιλογή, για οποιεσδήποτε αλλαγές στις ιδιότητες και τα attributes ενός component πρέπει να κληθεί το `env.waitForChanges()` ώστε να ελεγχθούν οι ενημερώσεις. Εναλλακτικά, το `autoApplyChanges` εκκαθαρίζει συνεχώς την ουρά στο παρασκήνιο.

__Τύπος:__ `boolean`<br />
__Προεπιλογή:__ `false`

##### `attachStyles`

Από προεπιλογή, τα styles δεν προσαρτώνται στο DOM και δεν αντικατοπτρίζονται στο σειριοποιημένο HTML. Ορίζοντας αυτή την επιλογή σε `true`, τα styles του component θα συμπεριληφθούν στη σειριοποιήσιμη έξοδο.

__Τύπος:__ `boolean`<br />
__Προεπιλογή:__ `false`

#### Περιβάλλον Render

Η μέθοδος `render` επιστρέφει ένα αντικείμενο περιβάλλοντος που παρέχει ορισμένες βοηθητικές λειτουργίες για τη διαχείριση του περιβάλλοντος του component.

##### `flushAll`

Αφού γίνουν αλλαγές σε ένα component, όπως μια ενημέρωση σε μια ιδιότητα ή ένα attribute, η σελίδα του τεστ δεν εφαρμόζει αυτόματα τις αλλαγές. Για να περιμένετε και να εφαρμόσετε την ενημέρωση, καλέστε το `await flushAll()`

__Τύπος:__ `() => void`

##### `unmount`

Αφαιρεί το στοιχείο container από το DOM.

__Τύπος:__ `() => void`

##### `styles`

Όλα τα styles που ορίζονται από τα components.

__Τύπος:__ `Record<string, string>`

##### `container`

Το στοιχείο container μέσα στο οποίο αποδίδεται το template.

__Τύπος:__ `HTMLElement`

##### `$container`

Το στοιχείο container ως στοιχείο του WebdriverIO.

__Τύπος:__ `WebdriverIO.Element`

##### `root`

Το ριζικό component του template.

__Τύπος:__ `HTMLElement`

##### `$root`

Το ριζικό component ως στοιχείο του WebdriverIO.

__Τύπος:__ `WebdriverIO.Element`

### `waitForChanges`

Βοηθητική μέθοδος για την αναμονή μέχρι το component να είναι έτοιμο.

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

Αν ορίσετε ιδιότητες ή καταστάσεις στο component του Stencil, πρέπει να διαχειριστείτε το πότε αυτές οι αλλαγές θα εφαρμοστούν στο component ώστε να αποδοθεί εκ νέου.


## Παραδείγματα

Μπορείτε να βρείτε ένα πλήρες παράδειγμα μιας σουίτας τεστ components του WebdriverIO για το Stencil στο [αποθετήριο παραδειγμάτων](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter) μας.