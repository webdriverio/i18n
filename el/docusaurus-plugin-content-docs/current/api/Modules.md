---
id: modules
title: Ενότητες
---

Το WebdriverIO δημοσιεύει διάφορες ενότητες (modules) στο NPM και σε άλλα μητρώα, τις οποίες μπορείτε να χρησιμοποιήσετε για να δημιουργήσετε το δικό σας πλαίσιο αυτοματοποίησης. Δείτε περισσότερη τεκμηρίωση σχετικά με τους τύπους εγκατάστασης του WebdriverIO [εδώ](/docs/setuptypes).

## `webdriver` και `devtools`

Τα πακέτα πρωτοκόλλου ([`webdriver`](https://www.npmjs.com/package/webdriver) και [`devtools`](https://www.npmjs.com/package/devtools)) εκθέτουν μια κλάση με τις ακόλουθες στατικές συναρτήσεις, οι οποίες σας επιτρέπουν να ξεκινήσετε συνεδρίες:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

Ξεκινά μια νέα συνεδρία με συγκεκριμένες δυνατότητες (capabilities). Με βάση την απόκριση της συνεδρίας, θα παρέχονται εντολές από διαφορετικά πρωτόκολλα.

##### Παράμετροι

- `options`: [Επιλογές WebDriver](/docs/configuration#webdriver-options)
- `modifier`: συνάρτηση που επιτρέπει την τροποποίηση του στιγμιότυπου του client πριν επιστραφεί
- `userPrototype`: αντικείμενο ιδιοτήτων που επιτρέπει την επέκταση του prototype του στιγμιότυπου
- `customCommandWrapper`: συνάρτηση που επιτρέπει την περιτύλιξη λειτουργικότητας γύρω από κλήσεις συναρτήσεων

##### Επιστρέφει

- Αντικείμενο [Browser](/docs/api/browser)

##### Παράδειγμα

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

Συνδέεται σε μια εκτελούμενη συνεδρία WebDriver ή DevTools.

##### Παράμετροι

- `attachInstance`: στιγμιότυπο στο οποίο θα συνδεθεί μια συνεδρία ή τουλάχιστον ένα αντικείμενο με την ιδιότητα `sessionId` (π.χ. `{ sessionId: 'xxx' }`)
- `modifier`: συνάρτηση που επιτρέπει την τροποποίηση του στιγμιότυπου του client πριν επιστραφεί
- `userPrototype`: αντικείμενο ιδιοτήτων που επιτρέπει την επέκταση του prototype του στιγμιότυπου
- `customCommandWrapper`: συνάρτηση που επιτρέπει την περιτύλιξη λειτουργικότητας γύρω από κλήσεις συναρτήσεων

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

Όπως και με τα πακέτα πρωτοκόλλου (`webdriver` και `devtools`), μπορείτε επίσης να χρησιμοποιήσετε τα APIs του πακέτου WebdriverIO για τη διαχείριση συνεδριών. Τα APIs μπορούν να εισαχθούν χρησιμοποιώντας `import { remote, attach, multiRemote } from 'webdriverio` και περιλαμβάνουν την ακόλουθη λειτουργικότητα:

#### `remote(options, modifier)`

Ξεκινά μια συνεδρία WebdriverIO. Το στιγμιότυπο περιέχει όλες τις εντολές του πακέτου πρωτοκόλλου, αλλά με επιπλέον συναρτήσεις υψηλότερης τάξης, δείτε την [τεκμηρίωση API](/docs/api).

##### Παράμετροι

- `options`: [Επιλογές WebdriverIO](/docs/configuration#webdriverio)
- `modifier`: συνάρτηση που επιτρέπει την τροποποίηση του στιγμιότυπου του client πριν επιστραφεί

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

Συνδέεται σε μια εκτελούμενη συνεδρία WebdriverIO.

##### Παράμετροι

- `attachOptions`: στιγμιότυπο στο οποίο θα συνδεθεί μια συνεδρία ή τουλάχιστον ένα αντικείμενο με την ιδιότητα `sessionId` (π.χ. `{ sessionId: 'xxx' }`)

##### Επιστρέφει

- Αντικείμενο [Browser](/docs/api/browser)

##### Παράδειγμα

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiRemote(multiRemoteOptions)`

Εκκινεί ένα στιγμιότυπο multi-remote, το οποίο σας επιτρέπει να ελέγχετε πολλαπλές συνεδρίες μέσα σε ένα μόνο στιγμιότυπο. Δείτε τα [παραδείγματα multi-remote](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) για συγκεκριμένες περιπτώσεις χρήσης.

##### Παράμετροι

- `multiRemoteOptions`: ένα αντικείμενο με κλειδιά που αντιπροσωπεύουν το όνομα του προγράμματος περιήγησης και τις αντίστοιχες [Επιλογές WebdriverIO](/docs/configuration#webdriverio).

##### Επιστρέφει

- Αντικείμενο [Browser](/docs/api/browser)

##### Παράδειγμα

```js
import { multiRemote } from 'webdriverio'

const matrix = await multiRemote({
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
// επιστρέφει ['Google', 'JSON']
```

#### `Key`

Ένα αντικείμενο που περιέχει σταθερές ειδικών χαρακτήρων για χρήση με την εντολή [`browser.keys`](/docs/api/browser/keys). Αυτές οι σταθερές αντιπροσωπεύουν ειδικά πλήκτρα που μπορούν να σταλούν στο πρόγραμμα περιήγησης, όπως τα `Enter`, `Tab`, `Escape`, τα πλήκτρα βέλους, τα πλήκτρα λειτουργιών και άλλα.

##### Παράδειγμα

```js
import { Key } from 'webdriverio'

// Πάτημα του πλήκτρου Enter
await browser.keys(Key.Enter)

// Χρήση του Ctrl+A για επιλογή όλων (λειτουργεί σε όλες τις πλατφόρμες)
await browser.keys([Key.Ctrl, 'a'])

// Πλοήγηση με τα πλήκτρα βέλους
await browser.keys([Key.ArrowDown, Key.ArrowDown, Key.Enter])
```

##### Διαθέσιμα Πλήκτρα

Τα ακόλουθα ειδικά πλήκτρα είναι διαθέσιμα μέσω του αντικειμένου `Key`:

**Πλήκτρα Τροποποίησης:**

| Σταθερά | Περιγραφή |
|----------|-------------|
| `Key.Ctrl` | Πλήκτρο control για όλες τις πλατφόρμες (Command σε Mac, Control σε Windows/Linux) |
| `Key.Control` | Πλήκτρο Control |
| `Key.Shift` | Πλήκτρο Shift |
| `Key.Alt` | Πλήκτρο Alt |
| `Key.Command` | Πλήκτρο Command (Mac) |
| `Key.NULL` | Πλήκτρο Null/απελευθέρωσης — απελευθερώνει όλα τα πλήκτρα τροποποίησης που είναι πατημένα |

**Πλήκτρα Πλοήγησης:**

| Σταθερά | Περιγραφή |
|----------|-------------|
| `Key.Cancel` | Πλήκτρο Cancel |
| `Key.Help` | Πλήκτρο Help |
| `Key.Backspace` | Πλήκτρο Backspace |
| `Key.Tab` | Πλήκτρο Tab |
| `Key.Clear` | Πλήκτρο Clear |
| `Key.Return` | Πλήκτρο Return |
| `Key.Enter` | Πλήκτρο Enter |
| `Key.Pause` | Πλήκτρο Pause |
| `Key.Escape` | Πλήκτρο Escape |
| `Key.Space` | Πλήκτρο Space |
| `Key.PageUp` | Πλήκτρο Page Up |
| `Key.PageDown` | Πλήκτρο Page Down |
| `Key.End` | Πλήκτρο End |
| `Key.Home` | Πλήκτρο Home |
| `Key.ArrowLeft` | Πλήκτρο Αριστερού Βέλους |
| `Key.ArrowUp` | Πλήκτρο Πάνω Βέλους |
| `Key.ArrowRight` | Πλήκτρο Δεξιού Βέλους |
| `Key.ArrowDown` | Πλήκτρο Κάτω Βέλους |
| `Key.Insert` | Πλήκτρο Insert |
| `Key.Delete` | Πλήκτρο Delete |

**Πλήκτρα Χαρακτήρων:**

| Σταθερά | Περιγραφή |
|----------|-------------|
| `Key.Semicolon` | Πλήκτρο Ελληνικού Ερωτηματικού (;) |
| `Key.Equals` | Πλήκτρο Ίσον |

**Πλήκτρα Αριθμητικού Πληκτρολογίου:**

| Σταθερά | Περιγραφή |
|----------|-------------|
| `Key.Numpad0` - `Key.Numpad9` | Αριθμητικό πληκτρολόγιο 0-9 |
| `Key.Multiply` | Πολλαπλασιασμός αριθμητικού πληκτρολογίου |
| `Key.Add` | Πρόσθεση αριθμητικού πληκτρολογίου |
| `Key.Separator` | Διαχωριστικό αριθμητικού πληκτρολογίου |
| `Key.Subtract` | Αφαίρεση αριθμητικού πληκτρολογίου |
| `Key.Decimal` | Υποδιαστολή αριθμητικού πληκτρολογίου |
| `Key.Divide` | Διαίρεση αριθμητικού πληκτρολογίου |

**Πλήκτρα Λειτουργιών:**

| Σταθερά | Περιγραφή |
|----------|-------------|
| `Key.F1` - `Key.F12` | Πλήκτρα λειτουργιών F1 έως F12 |

**Άλλα Πλήκτρα:**

| Σταθερά | Περιγραφή |
|----------|-------------|
| `Key.ZenkakuHankaku` | Πλήκτρο Zenkaku/Hankaku (Ιαπωνικά) |

:::info Πλήκτρα Τροποποίησης για Όλες τις Πλατφόρμες

Η σταθερά `Key.Ctrl` παρέχει έναν βολικό τρόπο χρήσης του πλήκτρου τροποποίησης "control" σε διαφορετικά λειτουργικά συστήματα. Στο macOS αντιστοιχεί στο πλήκτρο `Command`, ενώ σε Windows και Linux αντιστοιχεί στο πλήκτρο `Control`. Αυτό είναι χρήσιμο όταν γράφετε τεστ που πρέπει να λειτουργούν σε πολλαπλές πλατφόρμες, π.χ. για λειτουργίες επιλογής όλων (`Ctrl+A`), αντιγραφής (`Ctrl+C`) ή επικόλλησης (`Ctrl+V`).

:::

## `@wdio/cli`

Αντί να καλέσετε την εντολή `wdio`, μπορείτε επίσης να συμπεριλάβετε τον test runner ως ενότητα και να τον εκτελέσετε σε οποιοδήποτε περιβάλλον. Για αυτό, θα χρειαστεί να κάνετε require το πακέτο `@wdio/cli` ως ενότητα, ως εξής:

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

Ο constructor της κλάσης `Launcher` αναμένει το URL του αρχείου ρυθμίσεων και ένα αντικείμενο `opts` με ρυθμίσεις που θα αντικαταστήσουν αυτές του αρχείου ρυθμίσεων.

##### Παράμετροι

- `configPath`: διαδρομή προς το `wdio.conf.js` που θα εκτελεστεί
- `opts`: ορίσματα ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) για την αντικατάσταση τιμών από το αρχείο ρυθμίσεων

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

Η εντολή `run` επιστρέφει ένα [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Αυτό επιλύεται (resolved) αν τα τεστ εκτελέστηκαν επιτυχώς ή απέτυχαν, και απορρίπτεται (rejected) αν ο launcher δεν μπόρεσε να ξεκινήσει την εκτέλεση των τεστ.

## `@wdio/browser-runner`

Όταν εκτελείτε unit ή component τεστ χρησιμοποιώντας τον [browser runner](/docs/runner#browser-runner) του WebdriverIO, μπορείτε να εισάγετε βοηθητικά εργαλεία mocking για τα τεστ σας, π.χ.:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

Οι ακόλουθες ονομασμένες εξαγωγές (named exports) είναι διαθέσιμες:

#### `fn`

Συνάρτηση mock, δείτε περισσότερα στην επίσημη [τεκμηρίωση του Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `spyOn`

Συνάρτηση spy, δείτε περισσότερα στην επίσημη [τεκμηρίωση του Vitest](https://vitest.dev/api/mock.html#mock-functions).

#### `mock`

Μέθοδος για mocking ενός αρχείου ή μιας ενότητας εξάρτησης.

##### Παράμετροι

- `moduleName`: είτε μια σχετική διαδρομή προς το αρχείο που θα γίνει mock είτε ένα όνομα ενότητας.
- `factory`: συνάρτηση που επιστρέφει την τιμή mock (προαιρετικό)

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

Αναιρεί το mock μιας εξάρτησης που ορίζεται στον κατάλογο χειροκίνητων mock (`__mocks__`).

##### Παράμετροι

- `moduleName`: όνομα της ενότητας της οποίας θα αναιρεθεί το mock.

##### Παράδειγμα

```js
unmock('lodash')
```