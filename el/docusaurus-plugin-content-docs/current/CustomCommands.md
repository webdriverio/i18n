---
id: customcommands
title: Προσαρμοσμένες Εντολές
description: "Προσθέστε τις δικές σας εντολές browser και element με το addCommand, αντικαταστήστε υπάρχουσες εντολές και επεκτείνετε τους ορισμούς τύπων TypeScript."
---

Αν θέλετε να επεκτείνετε το instance του `browser` με το δικό σας σύνολο εντολών, η μέθοδος `addCommand` του browser είναι εδώ για εσάς. Μπορείτε να γράψετε την εντολή σας με ασύγχρονο τρόπο, ακριβώς όπως και στα specs σας.

## Παράμετροι

### Όνομα Εντολής

<Option type="String">

Ένα όνομα που ορίζει την εντολή και θα προσαρτηθεί στο scope του browser ή του element.

</Option>

### Προσαρμοσμένη Συνάρτηση

<Option type="Function">

Μια συνάρτηση που εκτελείται όταν καλείται η εντολή. Το scope `this` είναι [`WebdriverIO.Browser`](/docs/api/browser), [`WebdriverIO.Element`](/docs/api/element) ή `WebdriverIO.BrowsingContext`, ανάλογα με το αν η εντολή προσαρτάται στον browser, στα elements ή στα browsing contexts.

</Option>

### Επιλογές

Αντικείμενο με επιλογές ρύθμισης που τροποποιούν τη συμπεριφορά της προσαρμοσμένης εντολής

#### Scope Στόχου

<Option type="Boolean" default="false" name="attachToElement">

Σημαία για να αποφασίσετε αν η εντολή θα προσαρτηθεί στο scope του browser ή του element. Αν οριστεί σε `true`, η εντολή θα είναι εντολή element.

</Option>

<Option type="Boolean" default="false" name="attachToBrowsingContext">

Σημαία για την προσάρτηση της εντολής σε κάθε browsing context: τις καρτέλες, τα παράθυρα και τα frames που επιστρέφουν τα `browser.url()`, `browser.newWindow()`, `browser.browsingContexts()` και `context.frame()` σε μια συνεδρία WebDriver BiDi. Δεν μπορεί να συνδυαστεί με το `attachToElement`. Δείτε [Browsing contexts](#browsing-contexts).

</Option>

#### Απενεργοποίηση implicitWait

<Option type="Boolean" default="false" name="disableElementImplicitWait">

Σημαία για να αποφασίσετε αν θα γίνεται έμμεση αναμονή μέχρι να υπάρξει το element πριν από την κλήση της προσαρμοσμένης εντολής.

</Option>

## Παραδείγματα

Αυτό το παράδειγμα δείχνει πώς να προσθέσετε μια νέα εντολή που επιστρέφει το τρέχον URL και τον τίτλο ως ένα αποτέλεσμα. Το scope (`this`) είναι ένα αντικείμενο [`WebdriverIO.Browser`](/docs/api/browser).

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // το `this` αναφέρεται στο scope του `browser`
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

Επιπλέον, μπορείτε να επεκτείνετε το instance του element με το δικό σας σύνολο εντολών, ορίζοντας το `attachToElement` σε `true`. Το scope (`this`) σε αυτή την περίπτωση είναι ένα αντικείμενο [`WebdriverIO.Element`](/docs/api/element).

```js
browser.addCommand("waitAndClick", async function () {
    // το `this` είναι η τιμή επιστροφής του $(selector)
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

Από προεπιλογή, οι προσαρμοσμένες εντολές element περιμένουν να υπάρξει το element πριν καλέσουν την προσαρμοσμένη εντολή. Παρόλο που τις περισσότερες φορές αυτό είναι επιθυμητό, αν δεν είναι, μπορεί να απενεργοποιηθεί με το `disableImplicitWait`:

```js
browser.addCommand("waitAndClick", async function () {
    // το `this` είναι η τιμή επιστροφής του $(selector)
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```

Οι προσαρμοσμένες εντολές σας δίνουν τη δυνατότητα να ομαδοποιήσετε μια συγκεκριμένη ακολουθία εντολών που χρησιμοποιείτε συχνά σε μία μόνο κλήση. Μπορείτε να ορίσετε προσαρμοσμένες εντολές σε οποιοδήποτε σημείο της σουίτας δοκιμών σας· απλώς βεβαιωθείτε ότι η εντολή έχει οριστεί *πριν* από την πρώτη χρήση της. (Το hook `before` στο `wdio.conf.js` σας είναι ένα καλό σημείο για να τις δημιουργήσετε.)

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

__Σημείωση:__ Αν καταχωρήσετε μια προσαρμοσμένη εντολή στο scope του `browser`, η εντολή δεν θα είναι προσβάσιμη από τα elements. Αντίστοιχα, αν καταχωρήσετε μια εντολή στο scope του element, δεν θα είναι προσβάσιμη στο scope του `browser`:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // εμφανίζει "function"
console.log(typeof elem.myCustomBrowserCommand()) // εμφανίζει "undefined"

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // εμφανίζει "undefined"
console.log(await elem2.myCustomElementCommand('foobar')) // εμφανίζει "1"

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // εμφανίζει "undefined"
console.log(await elem3.myCustomElementCommand2('foobar')) // εμφανίζει "2"
```

__Σημείωση:__ Αν χρειάζεται να αλυσιδώσετε (chain) μια προσαρμοσμένη εντολή, η εντολή θα πρέπει να τελειώνει με `$`,

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

Προσέξτε να μην υπερφορτώσετε το scope του `browser` με πάρα πολλές προσαρμοσμένες εντολές.

Συνιστούμε να ορίζετε την προσαρμοσμένη λογική σε [page objects](pageobjects), ώστε να είναι δεσμευμένη σε μια συγκεκριμένη σελίδα.

### Browsing contexts {#browsing-contexts}

Σε μια συνεδρία WebDriver BiDi, μια καρτέλα, ένα παράθυρο και ένα frame είναι το καθένα ένα `WebdriverIO.BrowsingContext`. Ορίστε το `attachToBrowsingContext` σε `true` για να προσθέσετε μια εντολή σε όλα αυτά. Το scope (`this`) είναι το context στο οποίο κλήθηκε η εντολή, και το `this.browser` είναι ο browser στον οποίο ανήκει:

```js
browser.addCommand('heading', async function () {
    // το `this` είναι η καρτέλα, το παράθυρο ή το frame
    return this.$('h1').getText()
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
console.log(await page.heading())

const frame = await page.frame('iframe')
console.log(await frame.heading())
```

Η εντολή είναι διαθέσιμη στα contexts που υπάρχουν ήδη και σε κάθε context που δημιουργείται αργότερα, συμπεριλαμβανομένων των frames από άλλο origin. Μια εντολή που έχει νόημα μόνο για μια καρτέλα ή ένα παράθυρο μπορεί να ελέγξει το `this.isFrame`.

Τα `addCommand` και `overwriteCommand` πάνω στο ίδιο το browsing context προκαλούν σφάλμα. Καταχωρήστε την εντολή στον browser.

### Multi-remote

Το `addCommand` λειτουργεί με παρόμοιο τρόπο για το multi-remote, με τη διαφορά ότι η νέα εντολή θα μεταδοθεί προς τα κάτω στα θυγατρικά instances. Πρέπει να είστε προσεκτικοί όταν χρησιμοποιείτε το αντικείμενο `this`, καθώς ο multi-remote `browser` και τα θυγατρικά του instances έχουν διαφορετικό `this`.

Αυτό το παράδειγμα δείχνει πώς να προσθέσετε μια νέα εντολή για multi-remote.

```js
import { multiRemoteBrowser } from '@wdio/globals'

multiRemoteBrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // το `this` αναφέρεται σε:
    //      - scope του MultiRemoteBrowser για τον browser
    //      - scope του Browser για τα instances
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiRemoteBrowser.getUrlAndTitle()
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

multiRemoteBrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## Επέκταση Ορισμών Τύπων

Με το TypeScript, είναι εύκολο να επεκτείνετε τα interfaces του WebdriverIO. Προσθέστε τύπους στις προσαρμοσμένες εντολές σας ως εξής:

1. Δημιουργήστε ένα αρχείο ορισμού τύπων (π.χ. `./src/types/wdio.d.ts`)
2. α. Αν χρησιμοποιείτε αρχείο ορισμού τύπων σε στυλ module (με χρήση import/export και `declare global WebdriverIO` στο αρχείο ορισμού τύπων), βεβαιωθείτε ότι έχετε συμπεριλάβει τη διαδρομή του αρχείου στην ιδιότητα `include` του `tsconfig.json`.

   β. Αν χρησιμοποιείτε αρχεία ορισμού τύπων σε στυλ ambient (χωρίς import/export στα αρχεία ορισμού τύπων και με `declare namespace WebdriverIO` για τις προσαρμοσμένες εντολές), βεβαιωθείτε ότι το `tsconfig.json` *δεν* περιέχει καμία ενότητα `include`, καθώς αυτό θα έχει ως αποτέλεσμα όλα τα αρχεία ορισμού τύπων που δεν αναφέρονται στην ενότητα `include` να μην αναγνωρίζονται από το TypeScript.

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

3. Προσθέστε ορισμούς για τις εντολές σας ανάλογα με τον τρόπο εκτέλεσής σας.

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

        interface BrowsingContext {
            contextCustomCommand: (arg: any) => Promise<string>
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

    interface BrowsingContext {
        contextCustomCommand: (arg: any) => Promise<string>
    }
}
```

</TabItem>
</Tabs>

## Ενσωμάτωση Βιβλιοθηκών Τρίτων

Αν χρησιμοποιείτε εξωτερικές βιβλιοθήκες (π.χ. για κλήσεις σε βάση δεδομένων) που υποστηρίζουν promises, μια καλή προσέγγιση για την ενσωμάτωσή τους είναι να περιτυλίξετε ορισμένες μεθόδους του API με μια προσαρμοσμένη εντολή.

Όταν επιστρέφετε το promise, το WebdriverIO διασφαλίζει ότι δεν συνεχίζει με την επόμενη εντολή μέχρι να επιλυθεί το promise. Αν το promise απορριφθεί, η εντολή θα προκαλέσει σφάλμα.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

Στη συνέχεια, απλώς χρησιμοποιήστε την στα WDIO test specs σας:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // επιστρέφει το σώμα της απόκρισης
})
```

**Σημείωση:** Το αποτέλεσμα της προσαρμοσμένης εντολής σας είναι το αποτέλεσμα του promise που επιστρέφετε.

## Αντικατάσταση Εντολών

Μπορείτε επίσης να αντικαταστήσετε εγγενείς εντολές με το `overwriteCommand`.

Δεν συνιστάται να το κάνετε αυτό, επειδή μπορεί να οδηγήσει σε απρόβλεπτη συμπεριφορά του framework!

Η γενική προσέγγιση είναι παρόμοια με το `addCommand`, με τη μόνη διαφορά ότι το πρώτο όρισμα στη συνάρτηση της εντολής είναι η αρχική συνάρτηση που πρόκειται να αντικαταστήσετε. Δείτε μερικά παραδείγματα παρακάτω.

### Αντικατάσταση Εντολών Browser

```js
/**
 * Εκτύπωση των χιλιοστών του δευτερολέπτου πριν από την παύση και επιστροφή της τιμής τους.
 *
 * @param pause - όνομα της εντολής που θα αντικατασταθεί
 * @param this of func - το αρχικό instance του browser στο οποίο κλήθηκε η συνάρτηση
 * @param originalPauseFunction of func - η αρχική συνάρτηση pause
 * @param ms of func - οι πραγματικές παράμετροι που μεταβιβάστηκαν
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// στη συνέχεια χρησιμοποιήστε την όπως πριν
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### Αντικατάσταση Εντολών Element

Η αντικατάσταση εντολών σε επίπεδο element είναι σχεδόν ίδια. Ορίστε το `attachToElement` σε `true`:

```js
/**
 * Προσπάθεια κύλισης στο element αν δεν είναι δυνατό το κλικ σε αυτό.
 * Περάστε { force: true } για κλικ μέσω JS ακόμη και αν το element δεν είναι ορατό ή δεν επιδέχεται κλικ.
 * Δείχνει ότι ο τύπος ορίσματος της αρχικής συνάρτησης μπορεί να διατηρηθεί με `options?: ClickOptions`
 *
 * @param this of func - το element στο οποίο κλήθηκε η αρχική συνάρτηση
 * @param originalClickFunction of func - η αρχική συνάρτηση pause
 * @param options of func - οι πραγματικές παράμετροι που μεταβιβάστηκαν
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

                    // κύλιση στο element και νέο κλικ
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // κλικ μέσω js
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // Μην ξεχάσετε να την προσαρτήσετε στο element
)

// στη συνέχεια χρησιμοποιήστε την όπως πριν
const elem = await $('body')
await elem.click()

// ή περάστε παραμέτρους
await elem.click({ force: true })
```

### Αντικατάσταση Εντολών Browsing Context

Ορίστε το `attachToBrowsingContext` σε `true` για να αντικαταστήσετε μια ενσωματωμένη ή προσαρμοσμένη εντολή κάθε καρτέλας, παραθύρου και frame. Η αρχική εντολή είναι δεσμευμένη στο context στο οποίο κλήθηκε:

```js
browser.overwriteCommand('getTitle', async function (this, originalGetTitle) {
    const title = await originalGetTitle()
    return this.isFrame ? `frame: ${title}` : title
}, { attachToBrowsingContext: true })

const page = await browser.url('https://webdriver.io')
const frame = await page.frame('iframe')
console.log(await frame.getTitle()) // "frame: ..."
```

## Προσθήκη Περισσότερων Εντολών WebDriver

Αν χρησιμοποιείτε το πρωτόκολλο WebDriver και εκτελείτε δοκιμές σε μια πλατφόρμα που υποστηρίζει πρόσθετες εντολές οι οποίες δεν ορίζονται σε κανέναν από τους ορισμούς πρωτοκόλλων στο [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols), μπορείτε να τις προσθέσετε χειροκίνητα μέσω του interface `addCommand`. Το πακέτο `webdriver` προσφέρει ένα command wrapper που επιτρέπει την καταχώρηση αυτών των νέων endpoints με τον ίδιο τρόπο όπως και οι άλλες εντολές, παρέχοντας τους ίδιους ελέγχους παραμέτρων και τον ίδιο χειρισμό σφαλμάτων. Για να καταχωρήσετε αυτό το νέο endpoint, κάντε import το command wrapper και καταχωρήστε μια νέα εντολή με αυτό ως εξής:

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
// κλήση της εντολής χωρίς την απαιτούμενη παράμετρο url και το payload
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

Η σωστή κλήση της εντολής, π.χ. `browser.myNewCommand('foo', 'bar')`, πραγματοποιεί σωστά ένα αίτημα WebDriver προς π.χ. `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo` με ένα payload όπως `{ foo: 'bar' }`.

:::note
Η παράμετρος url `:sessionId` θα αντικατασταθεί αυτόματα με το session id της συνεδρίας WebDriver. Μπορούν να εφαρμοστούν και άλλες παράμετροι url, αλλά πρέπει να οριστούν μέσα στο `variables`.
:::

Δείτε παραδείγματα για το πώς μπορούν να οριστούν οι εντολές πρωτοκόλλου στο πακέτο [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols).