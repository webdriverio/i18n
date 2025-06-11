---
id: modules
title: Ενότητες
---

Το WebdriverIO δημοσιεύει διάφορες ενότητες στο NPM και άλλα μητρώα που μπορείτε να χρησιμοποιήσετε για να δημιουργήσετε το δικό σας πλαίσιο αυτοματισμού. Δείτε περισσότερη τεκμηρίωση για τους τύπους ρύθμισης του WebdriverIO [εδώ](/docs/setuptypes).

## `webdriver` και `devtools`

Τα πακέτα πρωτοκόλλου ([`webdriver`](https://www.npmjs.com/package/webdriver) και [`devtools`](https://www.npmjs.com/package/devtools)) εκθέτουν μια κλάση με τις ακόλουθες στατικές συναρτήσεις που σας επιτρέπουν να ξεκινήσετε συνεδρίες:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Ξεκινά μια νέα συνεδρία με συγκεκριμένες δυνατότητες. Με βάση την απόκριση της συνεδρίας, παρέχονται εντολές από διαφορετικά πρωτόκολλα.

##### Παράμετροι

- `options`: [Επιλογές WebDriver](/docs/configuration#webdriver-options)
- `modifier`: συνάρτηση που επιτρέπει την τροποποίηση του στιγμιοτύπου πελάτη πριν επιστραφεί
- `userPrototype`: αντικείμενο ιδιοτήτων που επιτρέπει την επέκταση του πρωτοτύπου του στιγμιοτύπου
- `customCommandWrapper`: συνάρτηση που επιτρέπει το τύλιγμα λειτουργικότητας γύρω από κλήσεις συναρτήσεων

##### Επιστρέφει

- Αντικείμενο [Browser](/docs/api/browser)

##### Παράδειγμα

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Προσαρτάται σε μια τρέχουσα συνεδρία WebDriver ή DevTools.

##### Παράμετροι

- `attachInstance`: στιγμιότυπο για προσάρτηση συνεδρίας ή τουλάχιστον ένα αντικείμενο με την ιδιότητα `sessionId` (π.χ. `{ sessionId: 'xxx' }`)
- `modifier`: συνάρτηση που επιτρέπει την τροποποίηση του στιγμιοτύπου πελάτη πριν επιστραφεί
- `userPrototype`: αντικείμενο ιδιοτήτων που επιτρέπει την επέκταση του πρωτοτύπου του στιγμιοτύπου
- `customCommandWrapper`: συνάρτηση που επιτρέπει το τύλιγμα λειτουργικότητας γύρω από κλήσεις συναρτήσεων

##### Επιστρέφει

- Αντικείμενο [Browser](/docs/api/browser)

##### Παράδειγμα

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

Επαναφορτώνει μια συνεδρία με βάση το παρεχόμενο στιγμιότυπο.

##### Παράμετροι

- `instance`: στιγμιότυπο πακέτου προς επαναφόρτωση

##### Παράδειγμα

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

Παρόμοια με τα πακέτα πρωτοκόλλου (`webdriver` και `devtools`), μπορείτε επίσης να χρησιμοποιήσετε τα APIs του πακέτου WebdriverIO για τη διαχείριση συνεδριών. Τα APIs μπορούν να εισαχθούν χρησιμοποιώντας το `import { remote, attach, multiremote } from 'webdriverio'` και περιέχουν την ακόλουθη λειτουργικότητα:

#### `remote(options, modifier)`

Ξεκινά μια συνεδρία WebdriverIO. Το στιγμιότυπο περιέχει όλες τις εντολές όπως το πακέτο πρωτοκόλλου αλλά με πρόσθετες συναρτήσεις υψηλότερης τάξης, δείτε [API docs](/docs/api).

##### Παράμετροι

- `options`: [Επιλογές WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: συνάρτηση που επιτρέπει την τροποποίηση του στιγμιοτύπου πελάτη πριν επιστραφεί

##### Επιστρέφει

- Αντικείμενο [Browser](/docs/api/browser)

##### Παράδειγμα

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

Προσαρτάται σε μια τρέχουσα συνεδρία WebdriverIO.

##### Παράμετροι

- `attachOptions`: στιγμιότυπο για προσάρτηση συνεδρίας ή τουλάχιστον ένα αντικείμενο με την ιδιότητα `sessionId` (π.χ. `{ sessionId: 'xxx' }`)

##### Επιστρέφει

- Αντικείμενο [Browser](/docs/api/browser)

##### Παράδειγμα

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

Ξεκινά ένα στιγμιότυπο multiremote που σας επιτρέπει να ελέγχετε πολλαπλές συνεδρίες μέσα σε ένα μόνο στιγμιότυπο. Ελέγξτε τα [παραδείγματα multiremote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) για συγκεκριμένες περιπτώσεις χρήσης.

##### Παράμετροι

- `multiremoteOptions`: ένα αντικείμενο με κλειδιά που αντιπροσωπεύουν το όνομα του προγράμματος περιήγησης και τις [Επιλογές WebdriverIO](/docs/configuration#webdriverio) τους.

##### Επιστρέφει

- Αντικείμενο [Browser](/docs/api/browser)

##### Παράδειγμα

```js
import { multiremote } from 'webdriverio'

const matrix = await multiremote({
    myChromeBrowser: {
        capabilities: { browserName: 'chrome' }
    },
    myFirefoxBrowser: {
        capabilities: { browserName: 'firefox' }
    }
})
await matrix.url('http://json.org')
await matrix.getInstance('browserA').url('https://google.com')

console.log(await matrix.getTitle())
// returns ['Google', 'JSON']
```

## `@wdio/cli`

Αντί να καλείτε την εντολή `wdio`, μπορείτε επίσης να συμπεριλάβετε τον test runner ως ενότητα και να τον εκτελέσετε σε ένα αυθαίρετο περιβάλλον. Για αυτό, θα χρειαστεί να απαιτήσετε το πακέτο `@wdio/cli` ως ενότητα, ως εξής:

<Tabs
  defaultValue="esm"
  values={[
    {label: 'EcmaScript Modules', value: 'esm'},
    {label: 'CommonJS', value: 'cjs'}
  ]
}>
<TabItem value="esm">

```js
import Launcher from '@wdio/cli'
```

</TabItem>
<TabItem value="cjs">

```js
const Launcher = require('@wdio/cli').default
```

</TabItem>
</Tabs>

Μετά από αυτό, δημιουργήστε ένα στιγμιότυπο του launcher και εκτελέστε το τεστ.

#### `Launcher(configPath, opts)`

Ο κατασκευαστής κλάσης `Launcher` αναμένει το URL για το αρχείο ρυθμίσεων και ένα αντικείμενο `opts` με ρυθμίσεις που θα αντικαταστήσουν αυτές στη ρύθμιση.

##### Παράμετροι

- `configPath`: διαδρομή προς το `wdio.conf.js` για εκτέλεση
- `opts`: επιχειρήματα ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) για να αντικαταστήσουν τιμές από το αρχείο ρυθμίσεων

##### Παράδειγμα

```js
const wdio = new Launcher(
    '/path/to/my/wdio.conf.js',
    { spec: '/path/to/a/single/spec.e2e.js' }
)

wdio.run().then((exitCode) => {
    process.exit(exitCode)
}, (error) => {
    console.error('Launcher failed to start the test', error.stacktrace)
    process.exit(1)
})
```

Η εντολή `run` επιστρέφει μια [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Επιλύεται αν οι δοκιμές εκτελέστηκαν με επιτυχία ή απέτυχαν, και απορρίπτεται αν ο launcher δεν μπόρεσε να ξεκινήσει την εκτέλεση των δοκιμών.

## `@wdio/browser-runner`

Όταν εκτελείτε δοκιμές μονάδας ή στοιχείων χρησιμοποιώντας τον [browser runner](/docs/runner#browser-runner) του WebdriverIO, μπορείτε να εισάγετε βοηθητικά προγράμματα προσομοίωσης για τις δοκιμές σας, π.χ.:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Οι ακόλουθες ονομαστικές εξαγωγές είναι διαθέσιμες:

#### `fn`

Συνάρτηση προσομοίωσης, δείτε περισσότερα στα επίσημα [έγγραφα Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Συνάρτηση κατασκοπείας, δείτε περισσότερα στα επίσημα [έγγραφα Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Μέθοδος για τη δημιουργία προσομοίωσης αρχείου ή μονάδας εξάρτησης.

##### Παράμετροι

- `moduleName`: είτε μια σχετική διαδρομή προς το αρχείο που θα προσομοιωθεί είτε ένα όνομα μονάδας.
- `factory`: συνάρτηση για την επιστροφή της προσομοιωμένης τιμής (προαιρετικό)

##### Παράδειγμα

```js
mock('../src/constants.ts', () => ({
    SOME_DEFAULT: 'mocked out'
}))

mock('lodash', (origModuleFactory) => {
    const origModule = await origModuleFactory()
    return {
        ...origModule,
        pick: fn()
    }
})
```

#### `unmock`

Αναιρέστε την προσομοίωση εξάρτησης που ορίζεται μέσα στον κατάλογο χειροκίνητης προσομοίωσης (`__mocks__`).

##### Παράμετροι

- `moduleName`: όνομα της μονάδας για την οποία θα αναιρεθεί η προσομοίωση.

##### Παράδειγμα

```js
unmock('lodash')
```