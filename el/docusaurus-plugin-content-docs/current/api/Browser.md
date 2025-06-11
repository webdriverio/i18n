---
id: browser
title: Το Αντικείμενο Browser
---

__Extends:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

Το αντικείμενο browser είναι η περίπτωση συνεδρίας που χρησιμοποιείτε για να ελέγξετε τον browser ή την κινητή συσκευή. Εάν χρησιμοποιείτε τον δοκιμαστή WDIO, μπορείτε να αποκτήσετε πρόσβαση στο στιγμιότυπο WebDriver μέσω του καθολικού αντικειμένου `browser` ή `driver` ή να το εισάγετε χρησιμοποιώντας το [`@wdio/globals`](/docs/api/globals). Εάν χρησιμοποιείτε το WebdriverIO σε αυτόνομη λειτουργία, το αντικείμενο browser επιστρέφεται από τη μέθοδο [`remote`](/docs/api/modules#remoteoptions-modifier).

Η συνεδρία αρχικοποιείται από τον δοκιμαστή. Το ίδιο ισχύει και για τον τερματισμό της συνεδρίας. Αυτό γίνεται επίσης από τη διαδικασία του δοκιμαστή.

## Ιδιότητες

Ένα αντικείμενο browser έχει τις ακόλουθες ιδιότητες:

| Όνομα | Τύπος | Λεπτομέρειες |
| ---- | ---- | ------- |
| `capabilities` | `Object` | Εκχωρημένες δυνατότητες από τον απομακρυσμένο διακομιστή.<br /><b>Παράδειγμα:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | Δυνατότητες που ζητήθηκαν από τον απομακρυσμένο διακομιστή.<br /><b>Παράδειγμα:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | Αναγνωριστικό συνεδρίας που εκχωρήθηκε από τον απομακρυσμένο διακομιστή. |
| `options` | `Object` | Επιλογές WebdriverIO [options](/docs/configuration) ανάλογα με το πώς δημιουργήθηκε το αντικείμενο browser. Δείτε περισσότερα [τύπους ρύθμισης](/docs/setuptypes). |
| `commandList` | `String[]` | Μια λίστα εντολών που έχουν καταχωρηθεί στο στιγμιότυπο του browser |
| `isW3C` | `Boolean` | Υποδεικνύει αν αυτή είναι μια συνεδρία W3C |
| `isChrome` | `Boolean` | Υποδεικνύει αν αυτό είναι στιγμιότυπο Chrome |
| `isFirefox` | `Boolean` | Υποδεικνύει αν αυτό είναι στιγμιότυπο Firefox |
| `isBidi` | `Boolean` | Υποδεικνύει αν αυτή η συνεδρία χρησιμοποιεί Bidi |
| `isSauce` | `Boolean` | Υποδεικνύει αν αυτή η συνεδρία εκτελείται στο Sauce Labs |
| `isMacApp` | `Boolean` | Υποδεικνύει αν αυτή η συνεδρία εκτελείται για μια εφαρμογή Mac |
| `isWindowsApp` | `Boolean` | Υποδεικνύει αν αυτή η συνεδρία εκτελείται για μια εφαρμογή Windows |
| `isMobile` | `Boolean` | Υποδεικνύει μια συνεδρία κινητού. Δείτε περισσότερα στις [Σημαίες Κινητών](#mobile-flags). |
| `isIOS` | `Boolean` | Υποδεικνύει μια συνεδρία iOS. Δείτε περισσότερα στις [Σημαίες Κινητών](#mobile-flags). |
| `isAndroid` | `Boolean` | Υποδεικνύει μια συνεδρία Android. Δείτε περισσότερα στις [Σημαίες Κινητών](#mobile-flags). |
| `isNativeContext` | `Boolean`  | Υποδεικνύει εάν το κινητό βρίσκεται στο πλαίσιο `NATIVE_APP`. Δείτε περισσότερα στις [Σημαίες Κινητών](#mobile-flags). |
| `mobileContext` | `string`  | Αυτό θα παρέχει το **τρέχον** πλαίσιο στο οποίο βρίσκεται ο οδηγός, για παράδειγμα `NATIVE_APP`, `WEBVIEW_<packageName>` για Android ή `WEBVIEW_<pid>` για iOS. Θα αποθηκεύσει ένα επιπλέον WebDriver σε `driver.getContext()`. Δείτε περισσότερα στις [Σημαίες Κινητών](#mobile-flags). |


## Μέθοδοι

Με βάση το backend αυτοματισμού που χρησιμοποιείται για τη συνεδρία σας, το WebdriverIO προσδιορίζει ποιες [Εντολές Πρωτοκόλλου](/docs/api/protocols) θα επισυναφθούν στο [αντικείμενο browser](/docs/api/browser). Για παράδειγμα, εάν εκτελέσετε μια αυτοματοποιημένη συνεδρία στο Chrome, θα έχετε πρόσβαση σε συγκεκριμένες εντολές Chromium όπως το [`elementHover`](/docs/api/chromium#elementhover) αλλά όχι σε καμία από τις [εντολές Appium](/docs/api/appium).

Επιπλέον, το WebdriverIO παρέχει ένα σύνολο βολικών μεθόδων που συνιστώνται για χρήση, για αλληλεπίδραση με το [browser](/docs/api/browser) ή [στοιχεία](/docs/api/element) στη σελίδα.

Επιπροσθέτως, οι ακόλουθες εντολές είναι διαθέσιμες:

| Όνομα | Παράμετροι | Λεπτομέρειες |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (Τύπος: `String`)<br />- `fn` (Τύπος: `Function`)<br />- `attachToElement` (Τύπος: `boolean`) | Επιτρέπει τον ορισμό προσαρμοσμένων εντολών που μπορούν να κληθούν από το αντικείμενο browser για σκοπούς σύνθεσης. Διαβάστε περισσότερα στον οδηγό [Προσαρμοσμένες Εντολές](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (Τύπος: `String`)<br />- `fn` (Τύπος: `Function`)<br />- `attachToElement` (Τύπος: `boolean`) | Επιτρέπει την αντικατάσταση οποιασδήποτε εντολής του browser με προσαρμοσμένη λειτουργικότητα. Χρησιμοποιήστε προσεκτικά καθώς μπορεί να μπερδέψει τους χρήστες του πλαισίου. Διαβάστε περισσότερα στον οδηγό [Προσαρμοσμένες Εντολές](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (Τύπος: `String`)<br />- `fn` (Τύπος: `Function`) | Επιτρέπει τον ορισμό μιας προσαρμοσμένης στρατηγικής επιλογέα, διαβάστε περισσότερα στον οδηγό [Επιλογείς](/docs/selectors#custom-selector-strategies). |

## Παρατηρήσεις

### Σημαίες Κινητών

Εάν χρειάζεται να τροποποιήσετε τη δοκιμή σας με βάση το αν η συνεδρία σας εκτελείται σε κινητή συσκευή ή όχι, μπορείτε να αποκτήσετε πρόσβαση στις σημαίες κινητών για έλεγχο.

Για παράδειγμα, δεδομένης αυτής της διαμόρφωσης:

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

Μπορείτε να αποκτήσετε πρόσβαση σε αυτές τις σημαίες στη δοκιμή σας ως εξής:

```js
// Note: `driver` is the equivalent to the `browser` object but semantically more correct
// you can choose which global variable you want to use
console.log(driver.isMobile) // outputs: true
console.log(driver.isIOS) // outputs: true
console.log(driver.isAndroid) // outputs: false
```

Αυτό μπορεί να είναι χρήσιμο εάν, για παράδειγμα, θέλετε να ορίσετε επιλογείς στα [αντικείμενα σελίδας](../pageobjects) σας με βάση τον τύπο της συσκευής, όπως αυτό:

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

Μπορείτε επίσης να χρησιμοποιήσετε αυτές τις σημαίες για να εκτελέσετε μόνο συγκεκριμένες δοκιμές για συγκεκριμένους τύπους συσκευών:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // only run test with Android devices
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### Συμβάντα
Το αντικείμενο browser είναι ένας EventEmitter και διάφορα συμβάντα εκπέμπονται για τις περιπτώσεις χρήσης σας.

Ακολουθεί μια λίστα συμβάντων. Να έχετε υπόψη ότι αυτή δεν είναι η πλήρης λίστα των διαθέσιμων συμβάντων ακόμα.
Μη διστάσετε να συνεισφέρετε στην ενημέρωση του εγγράφου προσθέτοντας περιγραφές περισσότερων συμβάντων εδώ.

#### `command`

Αυτό το συμβάν εκπέμπεται κάθε φορά που το WebdriverIO στέλνει μια εντολή WebDriver Classic. Περιέχει τις ακόλουθες πληροφορίες:

- `command`: το όνομα της εντολής, π.χ. `navigateTo`
- `method`: η μέθοδος HTTP που χρησιμοποιείται για την αποστολή του αιτήματος εντολής, π.χ. `POST`
- `endpoint`: το τελικό σημείο της εντολής, π.χ. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: το ωφέλιμο φορτίο της εντολής, π.χ. `{ url: 'https://webdriver.io' }`

#### `result`

Αυτό το συμβάν εκπέμπεται κάθε φορά που το WebdriverIO λαμβάνει ένα αποτέλεσμα μιας εντολής WebDriver Classic. Περιέχει τις ίδιες πληροφορίες με το συμβάν `command` με την προσθήκη των ακόλουθων πληροφοριών:

- `result`: το αποτέλεσμα της εντολής

#### `bidiCommand`

Αυτό το συμβάν εκπέμπεται κάθε φορά που το WebdriverIO στέλνει μια εντολή WebDriver Bidi στον οδηγό του browser. Περιέχει πληροφορίες σχετικά με:

- `method`: Μέθοδος εντολής WebDriver Bidi
- `params`: σχετική παράμετρος εντολής (βλ. [API](/docs/api/webdriverBidi))

#### `bidiResult`

Σε περίπτωση επιτυχούς εκτέλεσης εντολής, το ωφέλιμο φορτίο του συμβάντος θα είναι:

- `type`: `success`
- `id`: το αναγνωριστικό της εντολής
- `result`: το αποτέλεσμα της εντολής (βλ. [API](/docs/api/webdriverBidi))

Σε περίπτωση σφάλματος εντολής, το ωφέλιμο φορτίο του συμβάντος θα είναι:

- `type`: `error`
- `id`: το αναγνωριστικό της εντολής
- `error`: ο κωδικός σφάλματος, π.χ. `invalid argument`
- `message`: λεπτομέρειες σχετικά με το σφάλμα
- `stacktrace`: ίχνος στοίβας

#### `request.start`
Αυτό το συμβάν ενεργοποιείται πριν σταλεί ένα αίτημα WebDriver στον οδηγό. Περιέχει πληροφορίες σχετικά με το αίτημα και το ωφέλιμο φορτίο του.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
Αυτό το συμβάν ενεργοποιείται μόλις το αίτημα προς τον οδηγό λάβει απάντηση. Το αντικείμενο συμβάντος περιέχει είτε το σώμα της απάντησης ως αποτέλεσμα είτε ένα σφάλμα εάν η εντολή WebDriver απέτυχε.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
Το συμβάν επανάληψης μπορεί να σας ειδοποιήσει όταν το WebdriverIO προσπαθεί να επαναλάβει την εκτέλεση της εντολής, π.χ. λόγω προβλήματος δικτύου. Περιέχει πληροφορίες σχετικά με το σφάλμα που προκάλεσε την επανάληψη και τον αριθμό των επαναλήψεων που έχουν ήδη γίνει.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
Αυτό είναι ένα συμβάν για τη μέτρηση λειτουργιών επιπέδου WebDriver. Κάθε φορά που το WebdriverIO στέλνει ένα αίτημα στο backend WebDriver, αυτό το συμβάν θα εκπέμπεται με ορισμένες χρήσιμες πληροφορίες:

- `durationMillisecond`: Χρονική διάρκεια του αιτήματος σε χιλιοστά του δευτερολέπτου.
- `error`: Αντικείμενο σφάλματος εάν το αίτημα απέτυχε.
- `request`: Αντικείμενο αιτήματος. Μπορείτε να βρείτε url, μέθοδο, κεφαλίδες κλπ.
- `retryCount`: Εάν είναι `0`, το αίτημα ήταν η πρώτη προσπάθεια. Θα αυξάνεται όταν το WebDriverIO επαναλαμβάνει τη διαδικασία εσωτερικά.
- `success`: Boolean για να αναπαραστήσει εάν το αίτημα πέτυχε ή όχι. Εάν είναι `false`, η ιδιότητα `error` θα παρέχεται επίσης.

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

Μπορείτε να ορίσετε προσαρμοσμένες εντολές στο πεδίο του browser για να αφαιρέσετε τις ροές εργασίας που χρησιμοποιούνται συχνά. Ελέγξτε τον οδηγό μας σχετικά με τις [Προσαρμοσμένες Εντολές](/docs/customcommands#adding-custom-commands) για περισσότερες πληροφορίες.