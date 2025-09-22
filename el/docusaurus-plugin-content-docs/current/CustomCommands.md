---
id: customcommands
title: Προσαρμοσμένες Εντολές
---

Εάν θέλετε να επεκτείνετε το αντικείμενο `browser` με το δικό σας σύνολο εντολών, η μέθοδος του browser `addCommand` είναι εδώ για εσάς. Μπορείτε να γράψετε την εντολή σας με ασύγχρονο τρόπο, όπως ακριβώς στις προδιαγραφές σας.

## Παράμετροι

### Όνομα Εντολής

Ένα όνομα που ορίζει την εντολή και θα προσαρτηθεί στο πεδίο εφαρμογής του browser ή του στοιχείου.

Τύπος: `String`

### Προσαρμοσμένη Συνάρτηση

Μια συνάρτηση που εκτελείται όταν καλείται η εντολή. Το πεδίο εφαρμογής `this` είναι είτε [`WebdriverIO.Browser`](/docs/api/browser) είτε [`WebdriverIO.Element`](/docs/api/element) ανάλογα με το αν η εντολή προσαρτάται στο πεδίο εφαρμογής του browser ή του στοιχείου.

Τύπος: `Function`

### Επιλογές

Αντικείμενο με επιλογές διαμόρφωσης που τροποποιούν τη συμπεριφορά της προσαρμοσμένης εντολής

#### Πεδίο Εφαρμογής Στόχου

Σημαία για να αποφασιστεί εάν θα προσαρτηθεί η εντολή στο πεδίο εφαρμογής του browser ή του στοιχείου. Εάν οριστεί ως `true`, η εντολή θα είναι εντολή στοιχείου.

Όνομα Επιλογής: `attachToElement`
Τύπος: `Boolean`<br />
Προεπιλογή: `false`

#### Απενεργοποίηση implicitWait

Σημαία για να αποφασιστεί αν θα αναμένεται σιωπηρά το στοιχείο να υπάρχει πριν από την κλήση της προσαρμοσμένης εντολής.

Όνομα Επιλογής: `disableElementImplicitWait`
Τύπος: `Boolean`<br />
Προεπιλογή: `false`

## Παραδείγματα

Αυτό το παράδειγμα δείχνει πώς να προσθέσετε μια νέα εντολή που επιστρέφει το τρέχον URL και τίτλο ως ένα αποτέλεσμα. Το πεδίο εφαρμογής (`this`) είναι ένα αντικείμενο [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this` αναφέρεται στο πεδίο εφαρμογής του `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Επιπλέον, μπορείτε να επεκτείνετε το στιγμιότυπο στοιχείου με το δικό σας σύνολο εντολών, περνώντας `true` ως τελικό όρισμα. Το πεδίο εφαρμογής (`this`) σε αυτή την περίπτωση είναι ένα αντικείμενο [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // `this` είναι η τιμή επιστροφής του $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Από προεπιλογή, οι προσαρμοσμένες εντολές στοιχείων περιμένουν να υπάρχει το στοιχείο πριν καλέσουν την προσαρμοσμένη εντολή. Παρόλο που τις περισσότερες φορές αυτό είναι επιθυμητό, αν όχι, μπορεί να απενεργοποιηθεί με το `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // `this` είναι η τιμή επιστροφής του $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


Οι προσαρμοσμένες εντολές σάς δίνουν την ευκαιρία να ομαδοποιήσετε μια συγκεκριμένη ακολουθία εντολών που χρησιμοποιείτε συχνά ως μία κλήση. Μπορείτε να ορίσετε προσαρμοσμένες εντολές σε οποιοδήποτε σημείο της σουίτας δοκιμών σας· απλώς βεβαιωθείτε ότι η εντολή ορίζεται *πριν* από την πρώτη της χρήση. (Το hook `before` στο αρχείο `wdio.conf.js` είναι ένα καλό σημείο για να τις δημιουργήσετε.)

Μόλις οριστούν, μπορείτε να τις χρησιμοποιήσετε ως εξής:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__Σημείωση:__ Αν εγγράψετε μια προσαρμοσμένη εντολή στο πεδίο εφαρμογής του `browser`, η εντολή δεν θα είναι προσβάσιμη για στοιχεία. Ομοίως, αν εγγράψετε μια εντολή στο πεδίο εφαρμογής του στοιχείου, δεν θα είναι προσβάσιμη στο πεδίο εφαρμογής του `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // εξάγει "function"
console.log(typeof elem.myCustomBrowserCommand()) // εξάγει "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // εξάγει "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // εξάγει "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // εξάγει "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // εξάγει "2"
```

__Σημείωση:__ Αν χρειάζεται να αλυσιδώσετε μια προσαρμοσμένη εντολή, η εντολή πρέπει να τελειώνει με `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Προσέξτε να μην υπερφορτώσετε το πεδίο εφαρμογής του `browser` με πάρα πολλές προσαρμοσμένες εντολές.

Συνιστούμε τον ορισμό προσαρμοσμένης λογικής σε [αντικείμενα σελίδας](pageobjects), ώστε να συνδέονται με μια συγκεκριμένη σελίδα.

### Multiremote

Η `addCommand` λειτουργεί με παρόμοιο τρόπο για το multiremote, εκτός από το ότι η νέα εντολή θα διαδοθεί στα στιγμιότυπα των παιδιών. Πρέπει να είστε προσεκτικοί όταν χρησιμοποιείτε το αντικείμενο `this` καθώς το multiremote `browser` και τα στιγμιότυπα των παιδιών του έχουν διαφορετικό `this`.

Αυτό το παράδειγμα δείχνει πώς να προσθέσετε μια νέα εντολή για το multiremote.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` αναφέρεται σε:
    //      - Πεδίο εφαρμογής MultiRemoteBrowser για browser
    //      - Πεδίο εφαρμογής Browser για στιγμιότυπα
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiremotebrowser.getUrlAndTitle()
/*
{
    url: [ 'https://webdriver.io/', 'https://webdriver.io/' ],
    title: [
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO'
    ],
    customVar: undefined
}
*/

multiremotebrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## Επεκτείνετε τους Ορισμούς Τύπων

Με την TypeScript, είναι εύκολο να επεκτείνετε τις διεπαφές του WebdriverIO. Προσθέστε τύπους στις προσαρμοσμένες εντολές σας ως εξής:

1. Δημιουργήστε ένα αρχείο ορισμού τύπου (π.χ., `./src/types/wdio.d.ts`)
2. α. Αν χρησιμοποιείτε αρχείο ορισμού τύπου στυλ μονάδας (χρησιμοποιώντας import/export και `declare global WebdriverIO` στο αρχείο ορισμού τύπου), βεβαιωθείτε ότι συμπεριλαμβάνετε τη διαδρομή του αρχείου στην ιδιότητα `include` του `tsconfig.json`.

   β. Αν χρησιμοποιείτε αρχεία ορισμού τύπου περιβάλλοντος (χωρίς import/export στα αρχεία ορισμού τύπου και με `declare namespace WebdriverIO` για προσαρμοσμένες εντολές), βεβαιωθείτε ότι το `tsconfig.json` *δεν* περιέχει καμία ενότητα `include`, καθώς αυτό θα προκαλέσει όλα τα αρχεία ορισμού τύπου που δεν αναφέρονται στην ενότητα `include` να μην αναγνωρίζονται από την TypeScript.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions (no tsconfig include)', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```json title="tsconfig.json"
{
    "compilerOptions": { ... },
    "include": [
        "./test/**/*.ts",
        "./src/types/**/*.ts"
    ]
}
```

</TabItem>
<TabItem value="ambient">

```json title="tsconfig.json"
{
    "compilerOptions": { ... }
}
```

</TabItem>
</Tabs>

3. Προσθέστε ορισμούς για τις εντολές σας σύμφωνα με τη λειτουργία εκτέλεσης.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```typescript
declare global {
    namespace WebdriverIO {
        interface Browser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface MultiRemoteBrowser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface Element {
            elementCustomCommand: (arg: any) => Promise<number>
        }
    }
}
```

</TabItem>
<TabItem value="ambient">

```typescript
declare namespace WebdriverIO {
    interface Browser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface MultiRemoteBrowser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface Element {
        elementCustomCommand: (arg: any) => Promise<number>
    }
}
```

</TabItem>
</Tabs>

## Ενσωματώστε Βιβλιοθήκες Τρίτων

Εάν χρησιμοποιείτε εξωτερικές βιβλιοθήκες (π.χ., για κλήσεις βάσεων δεδομένων) που υποστηρίζουν υποσχέσεις (promises), μια καλή προσέγγιση για την ενσωμάτωσή τους είναι να τυλίξετε συγκεκριμένες μεθόδους API με μια προσαρμοσμένη εντολή.

Όταν επιστρέφετε την υπόσχεση, το WebdriverIO διασφαλίζει ότι δεν συνεχίζει με την επόμενη εντολή μέχρι να επιλυθεί η υπόσχεση. Εάν η υπόσχεση απορριφθεί, η εντολή θα ρίξει ένα σφάλμα.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Στη συνέχεια, χρησιμοποιήστε το στις προδιαγραφές δοκιμών WDIO σας:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // επιστρέφει το σώμα της απόκρισης
})
```

**Σημείωση:** Το αποτέλεσμα της προσαρμοσμένης εντολής σας είναι το αποτέλεσμα της υπόσχεσης που επιστρέφετε.

## Αντικατάσταση Εντολών

Μπορείτε επίσης να αντικαταστήσετε εγγενείς εντολές με το `overwriteCommand`.

Δεν συνιστάται να το κάνετε αυτό, επειδή μπορεί να οδηγήσει σε απρόβλεπτη συμπεριφορά του πλαισίου!

Η συνολική προσέγγιση είναι παρόμοια με το `addCommand`, η μόνη διαφορά είναι ότι το πρώτο όρισμα στη συνάρτηση εντολής είναι η αρχική συνάρτηση που πρόκειται να αντικαταστήσετε. Παρακαλώ δείτε κάποια παραδείγματα παρακάτω.

### Αντικατάσταση Εντολών Browser

```js
/**
 * Εκτυπώστε χιλιοστά δευτερολέπτου πριν από την παύση και επιστρέψτε την τιμή της.
 * 
 * @param pause - όνομα της εντολής που θα αντικατασταθεί
 * @param this of func - το αρχικό στιγμιότυπο του browser στο οποίο κλήθηκε η συνάρτηση
 * @param originalPauseFunction of func - η αρχική συνάρτηση παύσης
 * @param ms of func - οι πραγματικές παράμετροι που πέρασαν
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// στη συνέχεια χρησιμοποιήστε το όπως πριν
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Αντικατάσταση Εντολών Στοιχείου

Η αντικατάσταση εντολών σε επίπεδο στοιχείου είναι σχεδόν ίδια. Απλώς περάστε `true` ως τρίτο όρισμα στο `overwriteCommand`:

```js
/**
 * Προσπαθήστε να κυλίσετε στο στοιχείο εάν δεν είναι κλικάρισμο.
 * Περάστε { force: true } για κλικ με JS ακόμη και αν το στοιχείο δεν είναι ορατό ή κλικάρισμο.
 * Δείξτε ότι ο τύπος ορίσματος της αρχικής συνάρτησης μπορεί να διατηρηθεί με `options?: ClickOptions`
 *
 * @param this of func - το στοιχείο στο οποίο κλήθηκε η αρχική συνάρτηση
 * @param originalClickFunction of func - η αρχική συνάρτηση παύσης
 * @param options of func - οι πραγματικές παράμετροι που πέρασαν
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // προσπάθεια για κλικ
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // κύλιση στο στοιχείο και κλικ ξανά
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // κλικ με js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Μην ξεχάσετε να το προσαρτήσετε στο στοιχείο
)

// στη συνέχεια χρησιμοποιήστε το όπως πριν
const elem = await $('body')
await elem.click()

// ή περάστε παραμέτρους
await elem.click({ force: true })
```

## Προσθήκη Περισσότερων Εντολών WebDriver

Εάν χρησιμοποιείτε το πρωτόκολλο WebDriver και εκτελείτε δοκιμές σε μια πλατφόρμα που υποστηρίζει πρόσθετες εντολές που δεν ορίζονται από καμία από τις ορισμούς πρωτοκόλλου στο [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), μπορείτε να τις προσθέσετε χειροκίνητα μέσω του περιβάλλοντος `addCommand`. Το πακέτο `webdriver` προσφέρει ένα περιτύλιγμα εντολών που επιτρέπει την εγγραφή αυτών των νέων τελικών σημείων με τον ίδιο τρόπο όπως άλλες εντολές, παρέχοντας τους ίδιους ελέγχους παραμέτρων και χειρισμό σφαλμάτων. Για να καταχωρίσετε αυτό το νέο τελικό σημείο, εισαγάγετε το περιτύλιγμα εντολών και καταχωρίστε μια νέα εντολή με αυτό ως εξής:

```js
import { command } from 'webdriver'

browser.addCommand('myNewCommand', command('POST', '/session/:sessionId/foobar/:someId', {
    command: 'myNewCommand',
    description: 'a new WebDriver command',
    ref: 'https://vendor.com/commands/#myNewCommand',
    variables: [{
        name: 'someId',
        description: 'some id to something'
    }],
    parameters: [{
        name: 'foo',
        type: 'string',
        description: 'a valid parameter',
        required: true
    }]
}))
```

Η κλήση αυτής της εντολής με μη έγκυρες παραμέτρους οδηγεί στον ίδιο χειρισμό σφαλμάτων με τις προκαθορισμένες εντολές πρωτοκόλλου, π.χ.:

```js
// κλήση εντολής χωρίς την απαιτούμενη παράμετρο url και ωφέλιμο φορτίο
await browser.myNewCommand()

/**
 * καταλήγει στο ακόλουθο σφάλμα:
 * Error: Wrong parameters applied for myNewCommand
 * Usage: myNewCommand(someId, foo)
 *
 * Property Description:
 *   "someId" (string): some id to something
 *   "foo" (string): a valid parameter
 *
 * For more info see https://my-api.com
 *    at Browser.protocolCommand (...)
 *    ...
 */
```

Καλώντας την εντολή σωστά, π.χ. `browser.myNewCommand('foo', 'bar')`, κάνει σωστά ένα αίτημα WebDriver σε π.χ. `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` με ένα ωφέλιμο φορτίο όπως `{ foo: 'bar' }`.

:::note
Η παράμετρος url `:sessionId` θα αντικατασταθεί αυτόματα με το αναγνωριστικό συνεδρίας της συνεδρίας WebDriver. Άλλες παράμετροι url μπορούν να εφαρμοστούν αλλά πρέπει να οριστούν εντός του `variables`.
:::

Δείτε παραδείγματα για το πώς μπορούν να οριστούν εντολές πρωτοκόλλου στο πακέτο [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).