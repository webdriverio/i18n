---
id: browser
title: Το Αντικείμενο Browser
---

__Επεκτείνει:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

Το αντικείμενο browser είναι η παρουσία συνεδρίας (session instance) που χρησιμοποιείτε για να ελέγχετε το πρόγραμμα περιήγησης ή την κινητή συσκευή. Αν χρησιμοποιείτε τον WDIO test runner, μπορείτε να αποκτήσετε πρόσβαση στην παρουσία WebDriver μέσω του καθολικού αντικειμένου `browser` ή `driver` ή να την εισαγάγετε χρησιμοποιώντας το [`@wdio/globals`](/docs/api/globals). Αν χρησιμοποιείτε το WebdriverIO σε αυτόνομη λειτουργία (standalone mode), το αντικείμενο browser επιστρέφεται από τη μέθοδο [`remote`](/docs/api/modules#remoteoptions-modifier).

Η συνεδρία αρχικοποιείται από τον test runner. Το ίδιο ισχύει και για τον τερματισμό της συνεδρίας. Αυτό γίνεται επίσης από τη διεργασία του test runner.

## Ιδιότητες

Ένα αντικείμενο browser έχει τις ακόλουθες ιδιότητες:

| Όνομα | Τύπος | Λεπτομέρειες |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Capabilities που έχουν ανατεθεί από τον απομακρυσμένο διακομιστή.<br /><b>Παράδειγμα:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Capabilities που ζητήθηκαν από τον απομακρυσμένο διακομιστή.<br /><b>Παράδειγμα:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | Αναγνωριστικό συνεδρίας που ανατέθηκε από τον απομακρυσμένο διακομιστή. |
| `options` | `Object` | [Επιλογές](/docs/configuration) του WebdriverIO ανάλογα με τον τρόπο δημιουργίας του αντικειμένου browser. Δείτε περισσότερα για τους [τύπους ρύθμισης](/docs/setuptypes). |
| `commandList` | `String[]` | Μια λίστα εντολών που έχουν καταχωρηθεί στην παρουσία του browser |
| `isChrome` | `Boolean` | Υποδεικνύει αν πρόκειται για παρουσία Chrome |
| `isFirefox` | `Boolean` | Υποδεικνύει αν πρόκειται για παρουσία Firefox |
| `isBidi` | `Boolean` | Υποδεικνύει αν αυτή η συνεδρία χρησιμοποιεί Bidi |
| `isSauce` | `Boolean` | Υποδεικνύει αν αυτή η συνεδρία εκτελείται στο Sauce Labs |
| `isMacApp` | `Boolean` | Υποδεικνύει αν αυτή η συνεδρία εκτελείται για μια εγγενή εφαρμογή Mac |
| `isWindowsApp` | `Boolean` | Υποδεικνύει αν αυτή η συνεδρία εκτελείται για μια εγγενή εφαρμογή Windows |
| `isMobile` | `Boolean` | Υποδεικνύει μια συνεδρία κινητής συσκευής. Δείτε περισσότερα στην ενότητα [Σημαίες Κινητών](#mobile-flags). |
| `isIOS` | `Boolean` | Υποδεικνύει μια συνεδρία iOS. Δείτε περισσότερα στην ενότητα [Σημαίες Κινητών](#mobile-flags). |
| `isAndroid` | `Boolean` | Υποδεικνύει μια συνεδρία Android. Δείτε περισσότερα στην ενότητα [Σημαίες Κινητών](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Υποδεικνύει αν η κινητή συσκευή βρίσκεται στο context `NATIVE_APP`. Δείτε περισσότερα στην ενότητα [Σημαίες Κινητών](#mobile-flags). |
| `mobileContext` | `string`  | Παρέχει το **τρέχον** context στο οποίο βρίσκεται ο driver, για παράδειγμα `NATIVE_APP`, `WEBVIEW_<packageName>` για Android ή `WEBVIEW_<pid>` για iOS. Εξοικονομεί μια επιπλέον κλήση WebDriver στο `driver.getContext()`. Δείτε περισσότερα στην ενότητα [Σημαίες Κινητών](#mobile-flags). |


## Μέθοδοι

Με βάση το backend αυτοματοποίησης που χρησιμοποιείται για τη συνεδρία σας, το WebdriverIO προσδιορίζει ποιες [Εντολές Πρωτοκόλλου](/docs/api/protocols) θα προσαρτηθούν στο [αντικείμενο browser](/docs/api/browser). Για παράδειγμα, αν εκτελείτε μια αυτοματοποιημένη συνεδρία στο Chrome, θα έχετε πρόσβαση σε εντολές ειδικές για το Chromium, όπως η [`elementHover`](/docs/api/chromium#elementhover), αλλά όχι σε καμία από τις [εντολές Appium](/docs/api/appium).

Επιπλέον, το WebdriverIO παρέχει ένα σύνολο βολικών μεθόδων που συνιστάται να χρησιμοποιούνται για την αλληλεπίδραση με τον [browser](/docs/api/browser) ή τα [στοιχεία](/docs/api/element) της σελίδας.

Επιπρόσθετα, είναι διαθέσιμες οι ακόλουθες εντολές:

| Όνομα | Παράμετροι | Λεπτομέρειες |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Τύπος: `String`)<br />- `fn` (Τύπος: `Function`)<br />- `attachToElement` (Τύπος: `boolean`) | Επιτρέπει τον ορισμό προσαρμοσμένων εντολών που μπορούν να κληθούν από το αντικείμενο browser για σκοπούς σύνθεσης. Διαβάστε περισσότερα στον οδηγό [Προσαρμοσμένες Εντολές](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Τύπος: `String`)<br />- `fn` (Τύπος: `Function`)<br />- `attachToElement` (Τύπος: `boolean`) | Επιτρέπει την αντικατάσταση οποιασδήποτε εντολής του browser με προσαρμοσμένη λειτουργικότητα. Χρησιμοποιήστε την με προσοχή, καθώς μπορεί να μπερδέψει τους χρήστες του framework. Διαβάστε περισσότερα στον οδηγό [Προσαρμοσμένες Εντολές](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Τύπος: `String`)<br />- `fn` (Τύπος: `Function`) | Επιτρέπει τον ορισμό μιας προσαρμοσμένης στρατηγικής επιλογέα (selector), διαβάστε περισσότερα στον οδηγό [Επιλογείς](/docs/selectors#custom-selector-strategies). |

## Παρατηρήσεις

### Σημαίες Κινητών

Αν χρειάζεται να τροποποιήσετε το τεστ σας ανάλογα με το αν η συνεδρία σας εκτελείται σε κινητή συσκευή ή όχι, μπορείτε να ελέγξετε τις σημαίες κινητών.

Για παράδειγμα, με δεδομένη αυτή τη ρύθμιση:

```js
// wdio.conf.js
export const config = {
    // ...
    capabilities: \\{
        platformName: 'iOS',
        app: 'net.company.SafariLauncher',
        udid: '123123123123abc',
        deviceName: 'iPhone',
        // ...
    }
    // ...
}
```

Μπορείτε να αποκτήσετε πρόσβαση σε αυτές τις σημαίες στο τεστ σας ως εξής:

```js
// Σημείωση: το `driver` είναι ισοδύναμο με το αντικείμενο `browser` αλλά σημασιολογικά πιο σωστό
// μπορείτε να επιλέξετε ποια καθολική μεταβλητή θέλετε να χρησιμοποιήσετε
console.log(driver.isMobile) // εξάγει: true
console.log(driver.isIOS) // εξάγει: true
console.log(driver.isAndroid) // εξάγει: false
```

Αυτό μπορεί να είναι χρήσιμο αν, για παράδειγμα, θέλετε να ορίσετε επιλογείς στα [page objects](../pageobjects) σας με βάση τον τύπο της συσκευής, ως εξής:

```js
// mypageobject.page.js
import Page from './page'

class LoginPage extends Page {
    // ...
    get username() {
        const selectorAndroid = 'new UiSelector().text("Cancel").className("android.widget.Button")'
        const selectorIOS = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
        const selectorType = driver.isAndroid ? 'android' : 'ios'
        const selector = driver.isAndroid ? selectorAndroid : selectorIOS
        return $(`${selectorType}=${selector}`)
    }
    // ...
}
```

Μπορείτε επίσης να χρησιμοποιήσετε αυτές τις σημαίες για να εκτελέσετε μόνο ορισμένα τεστ για ορισμένους τύπους συσκευών:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // εκτέλεση του τεστ μόνο σε συσκευές Android
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### Συμβάντα
Το αντικείμενο browser είναι ένας EventEmitter και εκπέμπονται ορισμένα συμβάντα για τις περιπτώσεις χρήσης σας.

Ακολουθεί μια λίστα συμβάντων. Λάβετε υπόψη ότι αυτή δεν είναι ακόμη η πλήρης λίστα των διαθέσιμων συμβάντων.
Μη διστάσετε να συνεισφέρετε στην ενημέρωση του εγγράφου προσθέτοντας εδώ περιγραφές περισσότερων συμβάντων.

#### `command`

Αυτό το συμβάν εκπέμπεται κάθε φορά που το WebdriverIO στέλνει μια εντολή WebDriver Classic. Περιέχει τις ακόλουθες πληροφορίες:

- `command`: το όνομα της εντολής, π.χ. `navigateTo`
- `method`: η μέθοδος HTTP που χρησιμοποιείται για την αποστολή του αιτήματος της εντολής, π.χ. `POST`
- `endpoint`: το endpoint της εντολής, π.χ. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: το payload της εντολής, π.χ. `{ url: 'https://webdriver.io' }`

#### `result`

Αυτό το συμβάν εκπέμπεται κάθε φορά που το WebdriverIO λαμβάνει το αποτέλεσμα μιας εντολής WebDriver Classic. Περιέχει τις ίδιες πληροφορίες με το συμβάν `command`, με την προσθήκη της ακόλουθης πληροφορίας:

- `result`: το αποτέλεσμα της εντολής

#### `bidiCommand`

Αυτό το συμβάν εκπέμπεται κάθε φορά που το WebdriverIO στέλνει μια εντολή WebDriver Bidi στον driver του προγράμματος περιήγησης. Περιέχει πληροφορίες σχετικά με:

- `method`: τη μέθοδο της εντολής WebDriver Bidi
- `params`: τη σχετική παράμετρο της εντολής (δείτε το [API](/docs/api/webdriverBidi))

#### `bidiResult`

Σε περίπτωση επιτυχούς εκτέλεσης της εντολής, το payload του συμβάντος θα είναι:

- `type`: `success`
- `id`: το αναγνωριστικό της εντολής
- `result`: το αποτέλεσμα της εντολής (δείτε το [API](/docs/api/webdriverBidi))

Σε περίπτωση σφάλματος εντολής, το payload του συμβάντος θα είναι:

- `type`: `error`
- `id`: το αναγνωριστικό της εντολής
- `error`: ο κωδικός σφάλματος, π.χ. `invalid argument`
- `message`: λεπτομέρειες σχετικά με το σφάλμα
- `stacktrace`: ένα stack trace

#### `request.start`
Αυτό το συμβάν ενεργοποιείται πριν σταλεί ένα αίτημα WebDriver στον driver. Περιέχει πληροφορίες σχετικά με το αίτημα και το payload του.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Αυτό το συμβάν ενεργοποιείται μόλις το αίτημα προς τον driver λάβει απάντηση. Το αντικείμενο του συμβάντος περιέχει είτε το σώμα της απάντησης ως αποτέλεσμα είτε ένα σφάλμα, αν η εντολή WebDriver απέτυχε.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
Το συμβάν επανάληψης μπορεί να σας ειδοποιήσει όταν το WebdriverIO επιχειρεί να επαναλάβει την εκτέλεση της εντολής, π.χ. λόγω προβλήματος δικτύου. Περιέχει πληροφορίες σχετικά με το σφάλμα που προκάλεσε την επανάληψη και τον αριθμό των επαναλήψεων που έχουν ήδη γίνει.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Αυτό είναι ένα συμβάν για τη μέτρηση λειτουργιών σε επίπεδο WebDriver. Κάθε φορά που το WebdriverIO στέλνει ένα αίτημα στο backend του WebDriver, αυτό το συμβάν εκπέμπεται με ορισμένες χρήσιμες πληροφορίες:

- `durationMillisecond`: Η χρονική διάρκεια του αιτήματος σε χιλιοστά του δευτερολέπτου.
- `error`: Αντικείμενο σφάλματος, αν το αίτημα απέτυχε.
- `request`: Αντικείμενο αιτήματος. Μπορείτε να βρείτε το url, τη μέθοδο, τις κεφαλίδες κ.λπ.
- `retryCount`: Αν είναι `0`, το αίτημα ήταν η πρώτη προσπάθεια. Θα αυξάνεται όταν το WebDriverIO επαναλαμβάνει την προσπάθεια στο παρασκήνιο.
- `success`: Boolean που υποδεικνύει αν το αίτημα ήταν επιτυχές ή όχι. Αν είναι `false`, θα παρέχεται επίσης η ιδιότητα `error`.

Ένα παράδειγμα συμβάντος:
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### Προσαρμοσμένες Εντολές

Μπορείτε να ορίσετε προσαρμοσμένες εντολές στο εύρος του browser για να αφαιρέσετε την πολυπλοκότητα ροών εργασίας που χρησιμοποιούνται συχνά. Δείτε τον οδηγό μας για τις [Προσαρμοσμένες Εντολές](/docs/customcommands#adding-custom-commands) για περισσότερες πληροφορίες.