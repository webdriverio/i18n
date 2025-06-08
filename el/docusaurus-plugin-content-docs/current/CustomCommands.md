---
id: customcommands
title: Προσαρμοσμένες Εντολές
---

Εάν θέλετε να επεκτείνετε το αντικείμενο `browser` με το δικό σας σύνολο εντολών, η μέθοδος του προγράμματος περιήγησης `addCommand` είναι εδώ για εσάς. Μπορείτε να γράψετε την εντολή σας με ασύγχρονο τρόπο, όπως ακριβώς και στις προδιαγραφές σας.

## Παράμετροι

### Όνομα Εντολής

Ένα όνομα που ορίζει την εντολή και θα προσαρτηθεί στο πεδίο εφαρμογής του προγράμματος περιήγησης ή του στοιχείου.

Τύπος: `String`

### Προσαρμοσμένη Συνάρτηση

Μια συνάρτηση που εκτελείται όταν καλείται η εντολή. Το πεδίο εφαρμογής `this` είναι είτε [`WebdriverIO.Browser`](/docs/api/browser) είτε [`WebdriverIO.Element`](/docs/api/element) ανάλογα με το αν η εντολή προσαρτάται στο πεδίο εφαρμογής του προγράμματος περιήγησης ή του στοιχείου.

Τύπος: `Function`

### Στόχος Πεδίου Εφαρμογής

Σημαία για να αποφασιστεί εάν θα προσαρτηθεί η εντολή στο πεδίο εφαρμογής του προγράμματος περιήγησης ή του στοιχείου. Εάν οριστεί σε `true`, η εντολή θα είναι μια εντολή στοιχείου.

Τύπος: `Boolean`<br />
Προεπιλογή: `false`

## Παραδείγματα

Αυτό το παράδειγμα δείχνει πώς να προσθέσετε μια νέα εντολή που επιστρέφει το τρέχον URL και τίτλο ως ένα αποτέλεσμα. Το πεδίο εφαρμογής (`this`) είναι ένα αντικείμενο [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // Το `this` αναφέρεται στο πεδίο εφαρμογής του `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Επιπλέον, μπορείτε να επεκτείνετε το αντικείμενο στοιχείου με το δικό σας σύνολο εντολών, περνώντας `true` ως το τελικό όρισμα. Το πεδίο εφαρμογής (`this`) σε αυτήν την περίπτωση είναι ένα αντικείμενο [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // Το `this` είναι η τιμή επιστροφής του $(selector)
    await this.waitForDisplayed()
    await this.click()
}, true)
```

Οι προσαρμοσμένες εντολές σας δίνουν την ευκαιρία να ομαδοποιήσετε μια συγκεκριμένη ακολουθία εντολών που χρησιμοποιείτε συχνά ως μία μόνο κλήση. Μπορείτε να ορίσετε προσαρμοσμένες εντολές σε οποιοδήποτε σημείο στη σουίτα δοκιμών σας. Απλώς βεβαιωθείτε ότι η εντολή ορίζεται *πριν* από την πρώτη της χρήση. (Το hook `before` στο αρχείο `wdio.conf.js` σας είναι ένα καλό μέρος για να τις δημιουργήσετε.)

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

__Σημείωση:__ Αν καταχωρήσετε μια προσαρμοσμένη εντολή στο πεδίο εφαρμογής του `browser`, η εντολή δεν θα είναι προσβάσιμη για τα στοιχεία. Ομοίως, αν καταχωρήσετε μια εντολή στο πεδίο εφαρμογής του στοιχείου, δεν θα είναι προσβάσιμη στο πεδίο εφαρμογής του `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // εμφανίζει "function"
console.log(typeof elem.myCustomBrowserCommand()) // εμφανίζει "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, true)
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // εμφανίζει "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // εμφανίζει "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // εμφανίζει "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // εμφανίζει "2"
```

__Σημείωση:__ Αν χρειάζεται να αλυσιδώσετε μια προσαρμοσμένη εντολή, η εντολή πρέπει να τελειώνει με `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

Προσέξτε να μην υπερφορτώσετε το πεδίο εφαρμογής του `browser` με πάρα πολλές προσαρμοσμένες εντολές.

Συνιστούμε να ορίζετε προσαρμοσμένη λογική σε [page objects](pageobjects), ώστε να είναι συνδεδεμένη με μια συγκεκριμένη σελίδα.

### Multiremote

Το `addCommand` λειτουργεί με παρόμοιο τρόπο για το multiremote, εκτός από το ότι η νέα εντολή θα διαδοθεί στα παιδιά. Πρέπει να είστε προσεκτικοί όταν χρησιμοποιείτε το αντικείμενο `this` δεδομένου ότι το multiremote `browser` και τα παιδιά του έχουν διαφορετικό `this`.

Αυτό το παράδειγμα δείχνει πώς να προσθέσετε μια νέα εντολή για multiremote.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this` αναφέρεται σε:
    //      - MultiRemoteBrowser scope για το browser
    //      - Browser scope για τα instances
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

## Επέκταση Ορισμών Τύπων

Με την TypeScript, είναι εύκολο να επεκτείνετε τις διεπαφές του WebdriverIO. Προσθέστε τύπους στις προσαρμοσμένες εντολές σας ως εξής:

1. Δημιουργήστε ένα αρχείο ορισμού τύπου (π.χ., `./src/types/wdio.d.ts`)
2. α. Αν χρησιμοποιείτε αρχείο ορισμού τύπου σε στυλ module (χρησιμοποιώντας import/export και `declare global WebdriverIO` στο αρχείο ορισμού τύπου), βεβαιωθείτε ότι συμπεριλαμβάνετε τη διαδρομή του αρχείου στην ιδιότητα `include` του `tsconfig.json`.

   β. Αν χρησιμοποιείτε αρχεία ορισμού τύπου σε στυλ ambient (χωρίς import/export στα αρχεία ορισμού τύπου και με `declare namespace WebdriverIO` για προσαρμοσμένες εντολές), βεβαιωθείτε ότι το `tsconfig.json` *δεν* περιέχει καμία ενότητα `include`, καθώς αυτό θα προκαλέσει την μη αναγνώριση από την typescript όλων των αρχείων ορισμού τύπου που δεν αναφέρονται στην ενότητα `include`.

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

## Ενσωμάτωση Βιβλιοθηκών Τρίτων

Αν χρησιμοποιείτε εξωτερικές βιβλιοθήκες (π.χ., για κλήσεις βάσης δεδομένων) που υποστηρίζουν υποσχέσεις (promises), μια καλή προσέγγιση για να τις ενσωματώσετε είναι να περιτυλίξετε συγκεκριμένες μεθόδους API με μια προσαρμοσμένη εντολή.

Όταν επιστρέφετε την υπόσχεση, το WebdriverIO διασφαλίζει ότι δεν συνεχίζει με την επόμενη εντολή μέχρι να επιλυθεί η υπόσχεση. Εάν η υπόσχεση απορριφθεί, η εντολή θα ρίξει ένα σφάλμα.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Στη συνέχεια, απλά χρησιμοποιήστε το στις προδιαγραφές δοκιμών WDIO:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // επιστρέφει το σώμα της απάντησης
})
```

**Σημείωση:** Το αποτέλεσμα της προσαρμοσμένης εντολής σας είναι το αποτέλεσμα της υπόσχεσης που επιστρέφετε.

## Αντικατάσταση Εντολών

Μπορείτε επίσης να αντικαταστήσετε εγγενείς εντολές με το `overwriteCommand`.

Δεν συνιστάται να το κάνετε αυτό, επειδή μπορεί να οδηγήσει σε απρόβλεπτη συμπεριφορά του πλαισίου!

Η συνολική προσέγγιση είναι παρόμοια με το `addCommand`, η μόνη διαφορά είναι ότι το πρώτο όρισμα στη συνάρτηση εντολής είναι η αρχική συνάρτηση που πρόκειται να αντικαταστήσετε. Παρακαλώ δείτε μερικά παραδείγματα παρακάτω.

### Αντικατάσταση Εντολών του Browser

```js
/**
 * Εκτύπωση χιλιοστών του δευτερολέπτου πριν από την παύση και επιστροφή της τιμής της.
 */
// 'pause'            - όνομα της εντολής που θα αντικατασταθεί
// origPauseFunction  - αρχική συνάρτηση παύσης
browser.overwriteCommand('pause', async (origPauseFunction, ms) => {
    console.log(`sleeping for ${ms}`)
    await origPauseFunction(ms)
    return ms
})

// στη συνέχεια χρησιμοποιήστε το όπως πριν
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Αντικατάσταση Εντολών Στοιχείου

Η αντικατάσταση εντολών σε επίπεδο στοιχείου είναι σχεδόν η ίδια. Απλά περάστε `true` ως το τρίτο όρισμα στο `overwriteCommand`:

```js
/**
 * Προσπαθήστε να μετακινηθείτε στο στοιχείο αν δεν είναι κλικ.
 * Περάστε { force: true } για να κάνετε κλικ με JS ακόμα κι αν το στοιχείο δεν είναι ορατό ή κλικ.
 */
// 'click'            - όνομα της εντολής που θα αντικατασταθεί
// origClickFunction  - αρχική συνάρτηση κλικ
browser.overwriteCommand('click', async function (origClickFunction, { force = false } = {}) {
    if (!force) {
        try {
            // προσπάθεια για κλικ
            await origClickFunction()
            return null
        } catch (err) {
            if (err.message.includes('not clickable at point')) {
                console.warn('WARN: Element', this.selector, 'is not clickable.',
                    'Scrolling to it before clicking again.')

                // μετακίνηση στο στοιχείο και κλικ ξανά
                await this.scrollIntoView()
                return origClickFunction()
            }
            throw err
        }
    }

    // κλικ με js
    console.warn('WARN: Using force click for', this.selector)
    await browser.execute((el) => {
        el.click()
    }, this)
}, true) // μην ξεχάσετε να περάσετε `true` ως 3ο όρισμα

// στη συνέχεια χρησιμοποιήστε το όπως πριν
const elem = await $('body')
await elem.click()

// ή περάστε παραμέτρους
await elem.click({ force: true })
```

## Προσθήκη Περισσότερων Εντολών WebDriver

Εάν χρησιμοποιείτε το πρωτόκολλο WebDriver και εκτελείτε δοκιμές σε μια πλατφόρμα που υποστηρίζει πρόσθετες εντολές που δεν ορίζονται από κανέναν από τους ορισμούς πρωτοκόλλου στο [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), μπορείτε να τις προσθέσετε χειροκίνητα μέσω της διεπαφής `addCommand`. Το πακέτο `webdriver` προσφέρει ένα περιτύλιγμα εντολής που σας επιτρέπει να καταχωρήσετε αυτά τα νέα τελικά σημεία με τον ίδιο τρόπο όπως και άλλες εντολές, παρέχοντας τους ίδιους ελέγχους παραμέτρων και χειρισμό σφαλμάτων. Για να καταχωρήσετε αυτό το νέο τελικό σημείο, εισαγάγετε το περιτύλιγμα εντολής και καταχωρήστε μια νέα εντολή με αυτό ως εξής:

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

Η κλήση αυτής της εντολής με μη έγκυρες παραμέτρους οδηγεί στον ίδιο χειρισμό σφαλμάτων όπως οι προκαθορισμένες εντολές πρωτοκόλλου, π.χ.:

```js
// κλήση εντολής χωρίς την απαιτούμενη παράμετρο url και ωφέλιμο φορτίο
await browser.myNewCommand()

/**
 * οδηγεί στο ακόλουθο σφάλμα:
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

Η σωστή κλήση της εντολής, π.χ. `browser.myNewCommand('foo', 'bar')`, κάνει σωστά ένα αίτημα WebDriver στο π.χ. `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` με ωφέλιμο φορτίο όπως `{ foo: 'bar' }`.

:::note
Η παράμετρος url `:sessionId` θα αντικατασταθεί αυτόματα με το αναγνωριστικό συνεδρίας της συνεδρίας WebDriver. Άλλες παραμέτρους url μπορούν να εφαρμοστούν αλλά πρέπει να οριστούν μέσα στο `variables`.
:::

Δείτε παραδείγματα για το πώς μπορούν να οριστούν οι εντολές πρωτοκόλλου στο πακέτο [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).