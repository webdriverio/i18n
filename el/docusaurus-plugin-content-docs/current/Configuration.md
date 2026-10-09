---
id: configuration
title: Διαμόρφωση
description: "Βρείτε κάθε επιλογή διαμόρφωσης για το WebDriver, το αυτόνομο WebdriverIO και το WDIO testrunner, συμπεριλαμβανομένων όλων των hooks του testrunner."
---

Ανάλογα με τον [τύπο εγκατάστασης](/docs/setuptypes) (π.χ. χρήση των raw protocol bindings, του WebdriverIO ως αυτόνομου πακέτου ή του WDIO testrunner), υπάρχει διαφορετικό σύνολο επιλογών για τον έλεγχο του περιβάλλοντος.

## Επιλογές WebDriver

Οι ακόλουθες επιλογές ορίζονται όταν χρησιμοποιείτε το πακέτο πρωτοκόλλου [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

<Option type="String" default="http">

Πρωτόκολλο που χρησιμοποιείται για την επικοινωνία με τον driver server.

</Option>

### hostname

<Option type="String" default="0.0.0.0">

Host του driver server σας.

</Option>

### port

<Option type="Number" default="undefined">

Η θύρα στην οποία βρίσκεται ο driver server σας.

</Option>

### path

<Option type="String" default="/">

Διαδρομή προς το endpoint του driver server.

</Option>

### queryParams

<Option type="Object" default="undefined">

Παράμετροι ερωτήματος (query parameters) που μεταβιβάζονται στον driver server.

</Option>

### user

<Option type="String" default="undefined">

Το όνομα χρήστη της υπηρεσίας cloud σας (λειτουργεί μόνο για λογαριασμούς [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) ή [TestMu AI](https://www.testmuai.com/)). Αν οριστεί, το WebdriverIO θα ρυθμίσει αυτόματα τις επιλογές σύνδεσης για εσάς. Αν δεν χρησιμοποιείτε πάροχο cloud, μπορεί να χρησιμοποιηθεί για την πιστοποίηση οποιουδήποτε άλλου WebDriver backend.

</Option>

### key

<Option type="String" default="undefined">

Το access key ή secret key της υπηρεσίας cloud σας (λειτουργεί μόνο για λογαριασμούς [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) ή [TestMu AI](https://www.testmuai.com/)). Αν οριστεί, το WebdriverIO θα ρυθμίσει αυτόματα τις επιλογές σύνδεσης για εσάς. Αν δεν χρησιμοποιείτε πάροχο cloud, μπορεί να χρησιμοποιηθεί για την πιστοποίηση οποιουδήποτε άλλου WebDriver backend.

</Option>

### capabilities

<Option type="Object" default="null">

Ορίζει τις capabilities που θέλετε να εκτελέσετε στο WebDriver session σας. Δείτε το [WebDriver Protocol](https://w3c.github.io/webdriver/#capabilities) για περισσότερες λεπτομέρειες.

Εκτός από τις capabilities που βασίζονται στο WebDriver, μπορείτε να εφαρμόσετε επιλογές ειδικές για browser και vendor, που επιτρέπουν βαθύτερη διαμόρφωση του απομακρυσμένου browser ή της συσκευής. Αυτές τεκμηριώνονται στα αντίστοιχα docs των vendors, π.χ.:

- `goog:chromeOptions`: για [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: για [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: για [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: για [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: για [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: για [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Επιπλέον, ένα χρήσιμο εργαλείο είναι το [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) της Sauce Labs, το οποίο σας βοηθά να δημιουργήσετε αυτό το αντικείμενο επιλέγοντας με κλικ τις επιθυμητές capabilities.

</Option>
**Παράδειγμα:**

```js
{
    browserName: 'chrome', // επιλογές: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // έκδοση browser
    platformName: 'Windows 10' // πλατφόρμα λειτουργικού συστήματος
}
```

Αν εκτελείτε web ή native tests σε κινητές συσκευές, οι `capabilities` διαφέρουν από το πρωτόκολλο WebDriver. Δείτε τα [Appium Docs](https://appium.io/docs/en/latest/guides/caps/) για περισσότερες λεπτομέρειες.

### logLevel

<Option type="String" default="info" values="trace | debug | info | warn | error | silent">

Επίπεδο λεπτομέρειας καταγραφής (logging).

</Option>

### outputDir

<Option type="String" default="null">

Κατάλογος για την αποθήκευση όλων των αρχείων log του testrunner (συμπεριλαμβανομένων των logs των reporters και των logs του `wdio`). Αν δεν οριστεί, όλα τα logs μεταδίδονται στο `stdout`. Επειδή οι περισσότεροι reporters είναι φτιαγμένοι να καταγράφουν στο `stdout`, συνιστάται να χρησιμοποιείτε αυτή την επιλογή μόνο για συγκεκριμένους reporters όπου έχει περισσότερο νόημα η αναφορά να αποθηκεύεται σε αρχείο (όπως ο reporter `junit`, για παράδειγμα).

Κατά την εκτέλεση σε αυτόνομη λειτουργία, το μόνο log που δημιουργείται από το WebdriverIO είναι το log του `wdio`.

</Option>

### connectionRetryTimeout

<Option type="Number" default="120000">

Χρονικό όριο για οποιοδήποτε αίτημα WebDriver προς έναν driver ή grid.

</Option>

### connectionRetryCount

<Option type="Number" default="3">

Μέγιστος αριθμός επαναλήψεων αιτημάτων προς τον Selenium server.

</Option>

### bidiResponseTimeout

<Option type="Number" default="180000">

Χρονικό όριο (σε ms) για τη λήψη απάντησης από τον browser σε μια εντολή WebDriver Bidi. Αυξήστε το αν εκτελείτε εντολές, π.χ. [`execute`](/docs/api/browser/execute), που εύλογα χρειάζονται περισσότερο χρόνο από τον προεπιλεγμένο για να ολοκληρωθούν, διαφορετικά το WebdriverIO σταματά να περιμένει πριν τελειώσει ο browser.

</Option>

### agent

<Option type="Object" default={`{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}`}>

Σας επιτρέπει να χρησιμοποιήσετε έναν προσαρμοσμένο` http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) για την πραγματοποίηση αιτημάτων.

</Option>

### headers

<Option type="Object" default={`{}`}>

Καθορίστε προσαρμοσμένα `headers` που θα περνούν σε κάθε αίτημα WebDriver. Αν το Selenium Grid σας απαιτεί Basic Authentication, συνιστούμε να περάσετε ένα header `Authorization` μέσω αυτής της επιλογής για να πιστοποιήσετε τα αιτήματα WebDriver σας, π.χ.:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Ανάγνωση του ονόματος χρήστη και του κωδικού πρόσβασης από μεταβλητές περιβάλλοντος
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Συνδυασμός του ονόματος χρήστη και του κωδικού πρόσβασης με διαχωριστικό άνω και κάτω τελεία
const credentials = `${username}:${password}`;
// Κωδικοποίηση των διαπιστευτηρίων με Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

</Option>

### transformRequest

<Option type="(RequestOptions) => RequestOptions" default="none">

Συνάρτηση που παρεμβαίνει στις [επιλογές αιτήματος HTTP](https://github.com/sindresorhus/got#options) πριν πραγματοποιηθεί ένα αίτημα WebDriver

</Option>

### transformResponse

<Option type="(Response, RequestOptions) => Response" default="none">

Συνάρτηση που παρεμβαίνει στα αντικείμενα απάντησης HTTP αφού φτάσει μια απάντηση WebDriver. Στη συνάρτηση περνά το αρχικό αντικείμενο απάντησης ως πρώτο όρισμα και τα αντίστοιχα `RequestOptions` ως δεύτερο όρισμα.

</Option>

### strictSSL

<Option type="Boolean" default="true">

Αν απαιτείται ή όχι το πιστοποιητικό SSL να είναι έγκυρο.
Μπορεί να οριστεί μέσω μεταβλητών περιβάλλοντος ως `STRICT_SSL` ή `strict_ssl`.

</Option>

### enableDirectConnect

<Option type="Boolean" default="true">

Αν θα ενεργοποιηθεί η [λειτουργία άμεσης σύνδεσης του Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Δεν κάνει τίποτα αν η απάντηση δεν περιείχε τα κατάλληλα κλειδιά ενώ η σημαία είναι ενεργοποιημένη.

</Option>

### cacheDir

<Option type="String" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

Η διαδρομή προς τη ρίζα του καταλόγου cache. Αυτός ο κατάλογος χρησιμοποιείται για την αποθήκευση όλων των drivers που κατεβαίνουν κατά την προσπάθεια έναρξης ενός session.

</Option>

### maskingPatterns

<Option type="String" default="undefined">

Για πιο ασφαλή καταγραφή, οι κανονικές εκφράσεις που ορίζονται με το `maskingPatterns` μπορούν να αποκρύψουν ευαίσθητες πληροφορίες από το log.
 - Η μορφή του string είναι μια κανονική έκφραση με ή χωρίς flags (π.χ. `/.../i`) και διαχωρισμένη με κόμμα για πολλαπλές κανονικές εκφράσεις.
 - Για περισσότερες λεπτομέρειες σχετικά με τα masking patterns, δείτε την [ενότητα Masking Patterns στο README του WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

</Option>
**Παράδειγμα:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

## WebdriverIO

Οι ακόλουθες επιλογές (συμπεριλαμβανομένων όσων αναφέρθηκαν παραπάνω) μπορούν να χρησιμοποιηθούν με το WebdriverIO σε αυτόνομη λειτουργία:

### automationProtocol

<Option type="String" default="webdriver">

Ορίστε το πρωτόκολλο που θέλετε να χρησιμοποιήσετε για τον αυτοματισμό του browser σας. Προς το παρόν υποστηρίζεται μόνο το [`webdriver`](https://www.npmjs.com/package/webdriver), καθώς είναι η κύρια τεχνολογία αυτοματισμού browser που χρησιμοποιεί το WebdriverIO.

Αν θέλετε να αυτοματοποιήσετε τον browser χρησιμοποιώντας διαφορετική τεχνολογία αυτοματισμού, ορίστε αυτή την ιδιότητα σε μια διαδρομή που οδηγεί σε ένα module που συμμορφώνεται με την ακόλουθη διεπαφή:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Ξεκινά ένα session αυτοματισμού και επιστρέφει ένα WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * με τις αντίστοιχες εντολές αυτοματισμού. Δείτε το πακέτο [webdriver](https://www.npmjs.com/package/webdriver)
     * ως υλοποίηση αναφοράς
     *
     * @param {Capabilities.RemoteConfig} options επιλογές WebdriverIO
     * @param {Function} hook που επιτρέπει την τροποποίηση του client πριν απελευθερωθεί από τη συνάρτηση
     * @param {PropertyDescriptorMap} userPrototype επιτρέπει στον χρήστη να προσθέσει προσαρμοσμένες εντολές πρωτοκόλλου
     * @param {Function} customCommandWrapper επιτρέπει την τροποποίηση της εκτέλεσης εντολών
     * @returns ένα instance client συμβατό με το WebdriverIO
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * επιτρέπει στον χρήστη να συνδεθεί σε υπάρχοντα sessions
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Αλλάζει το session id του instance και τις capabilities του browser για το νέο session
     * απευθείας μέσα στο αντικείμενο browser που περνιέται
     *
     * @optional
     * @param   {object} instance  το αντικείμενο που λαμβάνουμε από ένα νέο browser session.
     * @returns {string}           το νέο session id του browser
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

</Option>

### baseUrl

<Option type="String" default="null">

Συντομεύστε τις κλήσεις της εντολής `url` ορίζοντας ένα βασικό URL.
- Αν η παράμετρος `url` ξεκινά με `/`, τότε το `baseUrl` προστίθεται στην αρχή (εκτός από τη διαδρομή του `baseUrl`, αν έχει).
- Αν η παράμετρος `url` ξεκινά χωρίς scheme ή `/` (όπως `some/path`), τότε ολόκληρο το `baseUrl` προστίθεται απευθείας στην αρχή.

</Option>

### waitforTimeout

<Option type="Number" default="5000">

Προεπιλεγμένο χρονικό όριο για όλες τις εντολές `waitFor*`. (Προσέξτε το πεζό `f` στο όνομα της επιλογής.) Αυτό το χρονικό όριο επηρεάζει __μόνο__ τις εντολές που ξεκινούν με `waitFor*` και τον προεπιλεγμένο χρόνο αναμονής τους.

Για να αυξήσετε το χρονικό όριο για ένα _test_, ανατρέξτε στα docs του framework.

</Option>

### waitforInterval

<Option type="Number" default="100">

Προεπιλεγμένο διάστημα για όλες τις εντολές `waitFor*` για να ελέγχουν αν μια αναμενόμενη κατάσταση (π.χ. ορατότητα) έχει αλλάξει.

</Option>

### strictSelectors

<Option type="Boolean" default="true">

Κάνει την εντολή [`$`](/docs/api/browser/$) να πετάει ένα `StrictSelectorError` όταν ο δοσμένος selector αντιστοιχεί σε περισσότερα από ένα στοιχεία, αντί να χρησιμοποιεί σιωπηλά την πρώτη αντιστοιχία. Το `$$` δεν επηρεάζεται.

Μπορείτε να το απενεργοποιήσετε για ένα μεμονωμένο ερώτημα περνώντας `{ strict: false }` ως δεύτερο όρισμα, π.χ. `$('button', { strict: false })`.

Δείτε τον οδηγό [Selectors](/docs/selectors#strict-mode) για λεπτομέρειες.

</Option>

### maxSpyCollectedBodySize

<Option type="Number" default="10485760 (10MB)">

Μέγιστο μέγεθος του σώματος απάντησης (σε bytes) που μπορεί να επιστραφεί κατά τη χρήση της εντολής [`mock`](/docs/api/browser/mock). Χρησιμοποιήστε `0` για να απενεργοποιήσετε τη συλλογή δεδομένων του παρακολουθούμενου payload.

</Option>

### region

<Option type="String" default="us" values="us | eu | us-west-1 | eu-central-1 | us-east-4 | asia-south-2 | staging">

Αν εκτελείτε στη Sauce Labs, μπορείτε να επιλέξετε να εκτελέσετε τα tests σε διαφορετικά data centers.
Χρησιμοποιήστε τα σύντομα ονόματα περιοχών `us` (προεπιλογή, αντιστοιχεί στο `us-west-1`) ή `eu` (αντιστοιχεί στο `eu-central-1`), ή απευθείας τα πλήρη ονόματα περιοχών.

__Σημείωση:__ Αυτό έχει αποτέλεσμα μόνο αν παρέχετε επιλογές `user` και `key` που συνδέονται με τον λογαριασμό σας στη Sauce Labs.

</Option>
*(μόνο για vm και/ή em/simulators, εκτός από τα `us-east-4` και `asia-south-2` που φιλοξενούν μόνο πραγματικές συσκευές)*

## Επιλογές Testrunner

Οι ακόλουθες επιλογές (συμπεριλαμβανομένων όσων αναφέρθηκαν παραπάνω) ορίζονται μόνο για την εκτέλεση του WebdriverIO με το WDIO testrunner:

### specs

<Option type="(String | String[])[]" default="[]">

Ορίστε τα specs για την εκτέλεση των tests. Μπορείτε είτε να καθορίσετε ένα glob pattern για να ταιριάξει πολλά αρχεία ταυτόχρονα, είτε να τυλίξετε ένα glob ή ένα σύνολο διαδρομών σε έναν πίνακα για να εκτελεστούν μέσα σε μία μόνο διεργασία worker. Όλες οι διαδρομές θεωρούνται σχετικές ως προς τη διαδρομή του αρχείου διαμόρφωσης.

</Option>

### exclude

<Option type="String[]" default="[]">

Εξαιρέστε specs από την εκτέλεση των tests. Όλες οι διαδρομές θεωρούνται σχετικές ως προς τη διαδρομή του αρχείου διαμόρφωσης.

</Option>

### suites

<Option type="Object" default={`{}`}>

Ένα αντικείμενο που περιγράφει διάφορα suites, τα οποία μπορείτε στη συνέχεια να καθορίσετε με την επιλογή `--suite` στο CLI του `wdio`.

</Option>

### capabilities

<Option type="Object|Object[]" default={`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`}>

Ίδιο με την ενότητα `capabilities` που περιγράφηκε παραπάνω, με τη διαφορά ότι υπάρχει η δυνατότητα να καθορίσετε είτε ένα αντικείμενο [multi-remote](/docs/multiremote), είτε πολλαπλά WebDriver sessions σε έναν πίνακα για παράλληλη εκτέλεση.

Μπορείτε να εφαρμόσετε τις ίδιες capabilities ειδικές για vendor και browser όπως ορίστηκαν [παραπάνω](/docs/configuration#capabilities).

</Option>

### maxInstances

<Option type="Number" default="100">

Μέγιστος συνολικός αριθμός workers που εκτελούνται παράλληλα.

__Σημείωση:__ μπορεί να είναι ένας αριθμός τόσο μεγάλος όσο `100`, όταν τα tests εκτελούνται σε εξωτερικούς vendors, όπως τα μηχανήματα της Sauce Labs. Εκεί, τα tests δεν εκτελούνται σε ένα μόνο μηχάνημα, αλλά σε πολλαπλά VMs. Αν τα tests πρόκειται να εκτελεστούν σε τοπικό μηχάνημα ανάπτυξης, χρησιμοποιήστε έναν πιο λογικό αριθμό, όπως `3`, `4` ή `5`. Ουσιαστικά, αυτός είναι ο αριθμός των browsers που θα ξεκινήσουν ταυτόχρονα και θα εκτελούν τα tests σας την ίδια στιγμή, οπότε εξαρτάται από το πόση RAM διαθέτει το μηχάνημά σας και από το πόσες άλλες εφαρμογές εκτελούνται σε αυτό.

Μπορείτε επίσης να εφαρμόσετε το `maxInstances` μέσα στα αντικείμενα capabilities χρησιμοποιώντας την capability `wdio:maxInstances`. Αυτό θα περιορίσει τον αριθμό των παράλληλων sessions για τη συγκεκριμένη capability.

</Option>

### maxInstancesPerCapability

<Option type="Number" default="100">

Μέγιστος συνολικός αριθμός workers που εκτελούνται παράλληλα ανά capability.

</Option>

### injectGlobals

<Option type="Boolean" default="true">

Εισάγει τα globals του WebdriverIO (π.χ. `browser`, `$` και `$$`) στο global περιβάλλον.
Αν το ορίσετε σε `false`, θα πρέπει να κάνετε import από το `@wdio/globals`, π.χ.:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Σημείωση: Το WebdriverIO δεν χειρίζεται την εισαγωγή globals ειδικών για το test framework.

</Option>

### bail

<Option type="Number" default="0 (don't bail; run all tests)">

Αν θέλετε η εκτέλεση των tests να σταματήσει μετά από συγκεκριμένο αριθμό αποτυχιών, χρησιμοποιήστε το `bail`.
(Η προεπιλογή είναι `0`, που εκτελεί όλα τα tests σε κάθε περίπτωση.) **Σημείωση:** Ως test σε αυτό το πλαίσιο νοούνται όλα τα tests μέσα σε ένα μόνο αρχείο spec (όταν χρησιμοποιείτε Mocha ή Jasmine) ή όλα τα βήματα μέσα σε ένα αρχείο feature (όταν χρησιμοποιείτε Cucumber). Αν θέλετε να ελέγξετε τη συμπεριφορά bail μέσα στα tests ενός μόνο αρχείου test, ρίξτε μια ματιά στις διαθέσιμες επιλογές του [framework](frameworks).

</Option>

### specFileRetries

<Option type="Number" default="0">

Ο αριθμός των φορών που θα επαναληφθεί ένα ολόκληρο αρχείο spec όταν αποτυγχάνει στο σύνολό του.

</Option>

### specFileRetriesDelay

<Option type="Number" default="0">

Καθυστέρηση σε δευτερόλεπτα μεταξύ των προσπαθειών επανάληψης του αρχείου spec

</Option>

### specFileRetriesDeferred

<Option type="Boolean" default="true">

Αν τα αρχεία spec που επαναλαμβάνονται θα πρέπει να επαναληφθούν αμέσως ή να μετατεθούν στο τέλος της ουράς.

</Option>

### groupLogsByTestSpec

<Option type="Boolean" default="false">

Επιλέξτε την προβολή εξόδου των logs.

Αν οριστεί σε `false`, τα logs από διαφορετικά αρχεία test θα εμφανίζονται σε πραγματικό χρόνο. Λάβετε υπόψη ότι αυτό μπορεί να οδηγήσει σε ανάμειξη των εξόδων log από διαφορετικά αρχεία κατά την παράλληλη εκτέλεση.

Αν οριστεί σε `true`, οι έξοδοι log θα ομαδοποιούνται ανά Test Spec και θα εμφανίζονται μόνο όταν ολοκληρωθεί το Test Spec.

Από προεπιλογή, έχει οριστεί σε `false`, ώστε τα logs να εμφανίζονται σε πραγματικό χρόνο.

</Option>

### autoAssertOnTestEnd

<Option type="Boolean" default="true">

Ελέγχει αν το WebdriverIO επαληθεύει αυτόματα όλα τα soft assertions στο τέλος κάθε test. Όταν οριστεί σε `true`, τυχόν συσσωρευμένα soft assertions θα ελέγχονται αυτόματα και θα προκαλούν αποτυχία του test αν κάποιο assertion απέτυχε. Όταν οριστεί σε `false`, πρέπει να καλέσετε χειροκίνητα τη μέθοδο assert για να ελέγξετε τα soft assertions.

</Option>

### services

<Option type="String[]|Object[]" default="[]">

Τα services αναλαμβάνουν μια συγκεκριμένη εργασία με την οποία δεν θέλετε να ασχοληθείτε. Βελτιώνουν τη ρύθμιση των tests σας σχεδόν χωρίς καμία προσπάθεια.

</Option>

### framework

<Option type="String" default="mocha" values="mocha | jasmine | cucumber">

Ορίζει το test framework που θα χρησιμοποιηθεί από το WDIO testrunner.

</Option>

### mochaOpts, jasmineOpts and cucumberOpts

<Option type="Object" default={`{ timeout: 10000 }`}>

Ειδικές επιλογές σχετικές με το framework. Δείτε την τεκμηρίωση του framework adapter για τις διαθέσιμες επιλογές. Διαβάστε περισσότερα σχετικά στα [Frameworks](frameworks).

</Option>

### cucumberFeaturesWithLineNumbers

<Option type="String[]" default="[]">

Λίστα με cucumber features με αριθμούς γραμμών (όταν [χρησιμοποιείτε το cucumber framework](./Frameworks.md#using-cucumber)).

</Option>

### reporters

<Option type="String[]|Object[]" default="[]">

Λίστα με τους reporters που θα χρησιμοποιηθούν. Ένας reporter μπορεί να είναι είτε ένα string, είτε ένας πίνακας της μορφής
`['reporterName', { /* reporter options */}]` όπου το πρώτο στοιχείο είναι ένα string με το όνομα του reporter και το δεύτερο στοιχείο ένα αντικείμενο με τις επιλογές του reporter.

</Option>
Παράδειγμα:

```js
reporters: [
    'dot',
    'spec'
    ['junit', {
        outputDir: `${__dirname}/reports`,
        otherOption: 'foobar'
    }]
]
```

### reporterSyncInterval

<Option type="Number" default="100 (ms)">

Καθορίζει σε ποιο διάστημα οι reporters θα ελέγχουν αν είναι συγχρονισμένοι, εφόσον αναφέρουν τα logs τους ασύγχρονα (π.χ. αν τα logs μεταδίδονται σε έναν τρίτο vendor).

</Option>

### reporterSyncTimeout

<Option type="Number" default="5000 (ms)">

Καθορίζει τον μέγιστο χρόνο που έχουν οι reporters για να ολοκληρώσουν το ανέβασμα όλων των logs τους, πριν ο testrunner πετάξει σφάλμα.

</Option>

### execArgv

<Option type="String[]" default="null">

Ορίσματα Node που καθορίζονται κατά την εκκίνηση child processes.

</Option>

### cpuProf

<Option type="Boolean" default="false">

Ενεργοποίηση CPU profiling για τη διεργασία worker. Το profile θα δημιουργηθεί αυτόματα όταν τερματιστεί η διεργασία worker.

</Option>

### heapProf

<Option type="Boolean" default="false">

Ενεργοποίηση Heap profiling για τη διεργασία worker. Το snapshot θα δημιουργηθεί αυτόματα όταν τερματιστεί η διεργασία worker (χρησιμοποιεί sampling heap profiler).

</Option>

### profileOutputDir

<Option type="String" default="./profiles">

Κατάλογος όπου θα αποθηκευτούν τα CPU profiles (`.cpuprofile`) και τα Heap profiles (`.heapprofile`).

</Option>

### filesToWatch

<Option type="String[]" default="[]">

Μια λίστα από string patterns με υποστήριξη glob που λένε στον testrunner να παρακολουθεί επιπλέον και άλλα αρχεία, π.χ. αρχεία της εφαρμογής, όταν εκτελείται με τη σημαία `--watch`. Από προεπιλογή, ο testrunner παρακολουθεί ήδη όλα τα αρχεία spec.

</Option>

### updateSnapshots

<Option type="'new' | 'all' | 'none'" default="none if not provided and tests run in CI, new if not provided, otherwise what's been provided">

Ορίστε σε true αν θέλετε να ενημερώσετε τα snapshots σας. Ιδανικά χρησιμοποιείται ως μέρος μιας παραμέτρου CLI, π.χ. `wdio run wdio.conf.js --s`.

</Option>

### resolveSnapshotPath

<Option type="(testPath: string, snapExtension: string) => string" default="stores snapshot files in __snapshots__ directory next to test file">

Αντικαθιστά την προεπιλεγμένη διαδρομή των snapshots. Για παράδειγμα, για να αποθηκεύονται τα snapshots δίπλα στα αρχεία test.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

</Option>

### tsConfigPath

<Option type="String" default="null">

Το WDIO χρησιμοποιεί το `tsx` για τη μεταγλώττιση αρχείων TypeScript. Το TSConfig σας εντοπίζεται αυτόματα από τον τρέχοντα κατάλογο εργασίας, αλλά μπορείτε να καθορίσετε μια προσαρμοσμένη διαδρομή εδώ ή ορίζοντας τη μεταβλητή περιβάλλοντος TSX_TSCONFIG_PATH.

Δείτε τα docs του `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

</Option>

### displayServerEnabled

<Option type="Boolean" default="true">

Εκκινεί μια εικονική οθόνη για την εκτέλεση σε Linux όταν δεν έχει οριστεί ούτε το `DISPLAY` ούτε το `WAYLAND_DISPLAY`. Ορίστε το σε `false` όταν εκτελείτε σε headless λειτουργία ή μόνο σε υπηρεσία cloud ή απομακρυσμένο grid. Ελέγχει μόνο το αν θα ξεκινήσει ένας display server: όταν έχει οριστεί μόνο το `WAYLAND_DISPLAY`, ο testrunner εξακολουθεί να ορίζει τα `XDG_SESSION_TYPE`, `GDK_BACKEND` και `ELECTRON_OZONE_PLATFORM_HINT` σε `wayland` για την εκτέλεση. Δείτε [Headless & Display Servers](/docs/headless-and-display-servers).

</Option>

### displayServer

<Option type="String" default="auto" values="auto | wayland | xvfb">

Ποιος display server θα ξεκινήσει. Το `auto` δοκιμάζει το Weston και καταφεύγει στο Xvfb όταν το Weston λείπει ή αποτυγχάνει να ξεκινήσει. Τα `wayland` και `xvfb` δοκιμάζουν μόνο τον αντίστοιχο server.

</Option>

### displayServerAutoInstall

<Option type="Boolean" default="false">

Εγκαθιστά έναν display server που λείπει μέσω του διαχειριστή πακέτων του συστήματος, όταν κανένας εγκατεστημένος δεν ξεκινά.

</Option>

### displayServerAutoInstallMode

<Option type="String" default="sudo" values="root | sudo">

Πώς εκτελείται η ενσωματωμένη εγκατάσταση: το `root` εγκαθιστά μόνο όταν εκτελείται ως root, το `sudo` χρησιμοποιεί μη διαδραστικό `sudo -n` όταν δεν εκτελείται ως root, ή εγκαθιστά χωρίς αυτό όταν το `sudo` δεν είναι εγκατεστημένο.

</Option>

### displayServerAutoInstallCommand

<Option type="String | String[]">

Μια εντολή που εκτελείται αντί για την ενσωματωμένη εγκατάσταση, ως έχει και χωρίς `sudo`. Εκτελείται μόνο με `displayServerAutoInstall: true`. Ένα string εκτελείται σε shell, ενώ ένας πίνακας εκτελείται χωρίς shell. Με το `auto`, εκτελείται πρώτα για το Weston, και ξανά για το Xvfb μόνο αν το Weston εξακολουθεί να μην είναι διαθέσιμο ή αποτυγχάνει να ξεκινήσει, και το Xvfb εξακολουθεί να λείπει. Ορίστε το `displayServer` στον server που εγκαθιστά η εντολή για να παραλειφθεί η προσπάθεια για τον άλλο server.

</Option>

### displayServerWidth

<Option type="Number" default="1920">

Πλάτος οθόνης της εικονικής οθόνης σε pixels.

</Option>

### displayServerHeight

<Option type="Number" default="1080">

Ύψος οθόνης της εικονικής οθόνης σε pixels.

</Option>

### displayServerDepth

<Option type="Number" default="24">

Βάθος χρώματος της εικονικής οθόνης. Μόνο για Xvfb.

</Option>

## Hooks

Ο WDIO testrunner σας επιτρέπει να ορίσετε hooks που ενεργοποιούνται σε συγκεκριμένες χρονικές στιγμές του κύκλου ζωής των tests. Αυτό επιτρέπει προσαρμοσμένες ενέργειες (π.χ. λήψη στιγμιότυπου οθόνης αν ένα test αποτύχει).

Κάθε hook δέχεται ως παράμετρο συγκεκριμένες πληροφορίες σχετικά με τον κύκλο ζωής (π.χ. πληροφορίες για το test suite ή το test). Διαβάστε περισσότερα για όλες τις ιδιότητες των hooks στο [παράδειγμα διαμόρφωσής μας](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Σημείωση:** Ορισμένα hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` και `onComplete`) εκτελούνται σε διαφορετική διεργασία και επομένως δεν μπορούν να μοιραστούν global δεδομένα με τα άλλα hooks που βρίσκονται στη διεργασία worker.

### onPrepare

Εκτελείται μία φορά πριν ξεκινήσουν όλοι οι workers.

Παράμετροι:

- `config` (`object`): αντικείμενο διαμόρφωσης του WebdriverIO
- `param` (`object[]`): λίστα με λεπτομέρειες των capabilities

### onWorkerStart

Εκτελείται πριν δημιουργηθεί μια διεργασία worker και μπορεί να χρησιμοποιηθεί για την αρχικοποίηση συγκεκριμένου service για αυτόν τον worker, καθώς και για την ασύγχρονη τροποποίηση των περιβαλλόντων εκτέλεσης.

Παράμετροι:

- `cid` (`string`): id της capability (π.χ. 0-0)
- `caps` (`object`): περιέχει τις capabilities για το session που θα δημιουργηθεί στον worker
- `specs` (`string[]`): specs που θα εκτελεστούν στη διεργασία worker
- `args` (`object`): αντικείμενο που θα συγχωνευθεί με την κύρια διαμόρφωση μόλις αρχικοποιηθεί ο worker
- `execArgv` (`string[]`): λίστα με ορίσματα string που περνούν στη διεργασία worker

### onWorkerEnd

Εκτελείται αμέσως μετά τον τερματισμό μιας διεργασίας worker.

Παράμετροι:

- `cid` (`string`): id της capability (π.χ. 0-0)
- `exitCode` (`number`): 0 - επιτυχία, 1 - αποτυχία. Ένας worker που τερματίστηκε από σήμα αναφέρει αντί αυτού `128` + τον αριθμό του σήματος, π.χ. `139` για ένα `SIGSEGV`
- `specs` (`string[]`): specs που θα εκτελεστούν στη διεργασία worker
- `retries` (`number`): αριθμός επαναλήψεων σε επίπεδο spec που χρησιμοποιήθηκαν, όπως ορίζεται στο [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis)
- `signal` (`string`): το σήμα που τερμάτισε τον worker, π.χ. `SIGSEGV`, ή `null` αν τερματίστηκε από μόνος του

### beforeSession

Εκτελείται ακριβώς πριν από την αρχικοποίηση του webdriver session και του test framework. Σας επιτρέπει να τροποποιήσετε διαμορφώσεις ανάλογα με την capability ή το spec.

Παράμετροι:

- `config` (`object`): αντικείμενο διαμόρφωσης του WebdriverIO
- `caps` (`object`): περιέχει τις capabilities για το session που θα δημιουργηθεί στον worker
- `specs` (`string[]`): specs που θα εκτελεστούν στη διεργασία worker

### before

Εκτελείται πριν ξεκινήσει η εκτέλεση των tests. Σε αυτό το σημείο έχετε πρόσβαση σε όλες τις global μεταβλητές, όπως το `browser`. Είναι το ιδανικό σημείο για να ορίσετε προσαρμοσμένες εντολές.

Παράμετροι:

- `caps` (`object`): περιέχει τις capabilities για το session που θα δημιουργηθεί στον worker
- `specs` (`string[]`): specs που θα εκτελεστούν στη διεργασία worker
- `browser` (`object`): instance του δημιουργημένου session browser/συσκευής

### beforeSuite

Hook που εκτελείται πριν ξεκινήσει το suite (μόνο σε Mocha/Jasmine)

Παράμετροι:

- `suite` (`object`): λεπτομέρειες του suite

### beforeHook

Hook που εκτελείται *πριν* ξεκινήσει ένα hook μέσα στο suite (π.χ. εκτελείται πριν από την κλήση του beforeEach στη Mocha)

Παράμετροι:

- `test` (`object`): λεπτομέρειες του test
- `context` (`object`): context του test (αντιπροσωπεύει το αντικείμενο World στο Cucumber)

### afterHook

Hook που εκτελείται *αφού* τελειώσει ένα hook μέσα στο suite (π.χ. εκτελείται μετά την κλήση του afterEach στη Mocha)

Παράμετροι:

- `test` (`object`): λεπτομέρειες του test
- `context` (`object`): context του test (αντιπροσωπεύει το αντικείμενο World στο Cucumber)
- `result` (`object`): αποτέλεσμα του hook (περιέχει τις ιδιότητες `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Συνάρτηση που εκτελείται πριν από ένα test (μόνο σε Mocha/Jasmine).

Παράμετροι:

- `test` (`object`): λεπτομέρειες του test
- `context` (`object`): αντικείμενο scope με το οποίο εκτελέστηκε το test

### beforeCommand

Εκτελείται πριν εκτελεστεί μια εντολή του WebdriverIO.

Παράμετροι:

- `commandName` (`string`): όνομα της εντολής
- `args` (`*`): ορίσματα που θα λάμβανε η εντολή

### afterCommand

Εκτελείται αφού εκτελεστεί μια εντολή του WebdriverIO.

Παράμετροι:

- `commandName` (`string`): όνομα της εντολής
- `args` (`*`): ορίσματα που θα λάμβανε η εντολή
- `result` (`*`): αποτέλεσμα της εντολής
- `error` (`Error`): αντικείμενο σφάλματος, εφόσον υπάρχει

### afterTest

Συνάρτηση που εκτελείται αφού τελειώσει ένα test (σε Mocha/Jasmine).

Παράμετροι:

- `test` (`object`): λεπτομέρειες του test
- `context` (`object`): αντικείμενο scope με το οποίο εκτελέστηκε το test
- `result.error` (`Error`): αντικείμενο σφάλματος σε περίπτωση που το test αποτύχει, διαφορετικά `undefined`
- `result.result` (`Any`): αντικείμενο επιστροφής της συνάρτησης test
- `result.duration` (`Number`): διάρκεια του test
- `result.passed` (`Boolean`): true αν το test πέρασε, διαφορετικά false
- `result.retries` (`Object`): πληροφορίες σχετικά με τις επαναλήψεις μεμονωμένων tests, όπως ορίζονται για [Mocha και Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) καθώς και για [Cucumber](./Retry.md#rerunning-in-cucumber), π.χ. `{ attempts: 0, limit: 0 }`, δείτε
- `result` (`object`): αποτέλεσμα του hook (περιέχει τις ιδιότητες `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook που εκτελείται αφού τελειώσει το suite (μόνο σε Mocha/Jasmine)

Παράμετροι:

- `suite` (`object`): λεπτομέρειες του suite

### after

Εκτελείται αφού ολοκληρωθούν όλα τα tests. Εξακολουθείτε να έχετε πρόσβαση σε όλες τις global μεταβλητές από το test.

Παράμετροι:

- `result` (`number`): 0 - το test πέρασε, 1 - το test απέτυχε
- `caps` (`object`): περιέχει τις capabilities για το session που θα δημιουργηθεί στον worker
- `specs` (`string[]`): specs που θα εκτελεστούν στη διεργασία worker

### afterSession

Εκτελείται αμέσως μετά τον τερματισμό του webdriver session.

Παράμετροι:

- `config` (`object`): αντικείμενο διαμόρφωσης του WebdriverIO
- `caps` (`object`): περιέχει τις capabilities για το session που θα δημιουργηθεί στον worker
- `specs` (`string[]`): specs που θα εκτελεστούν στη διεργασία worker

### onComplete

Εκτελείται αφού τερματιστούν όλοι οι workers και η διεργασία είναι έτοιμη να τερματιστεί. Ένα σφάλμα που πετιέται στο hook onComplete θα έχει ως αποτέλεσμα την αποτυχία της εκτέλεσης των tests.

Παράμετροι:

- `exitCode` (`number`): 0 - επιτυχία, 1 - αποτυχία
- `config` (`object`): αντικείμενο διαμόρφωσης του WebdriverIO
- `caps` (`object`): περιέχει τις capabilities για το session που θα δημιουργηθεί στον worker
- `result` (`object`): αντικείμενο αποτελεσμάτων που περιέχει τα αποτελέσματα των tests

### onReload

Εκτελείται όταν γίνεται ανανέωση.

Παράμετροι:

- `oldSessionId` (`string`): session ID του παλιού session
- `newSessionId` (`string`): session ID του νέου session

### beforeFeature

Εκτελείται πριν από ένα Cucumber Feature.

Παράμετροι:

- `uri` (`string`): διαδρομή προς το αρχείο feature
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): αντικείμενο Cucumber feature

### afterFeature

Εκτελείται μετά από ένα Cucumber Feature.

Παράμετροι:

- `uri` (`string`): διαδρομή προς το αρχείο feature
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): αντικείμενο Cucumber feature

### beforeScenario

Εκτελείται πριν από ένα Cucumber Scenario.

Παράμετροι:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): αντικείμενο world που περιέχει πληροφορίες για το pickle και το βήμα του test
- `context` (`object`): αντικείμενο Cucumber World

### afterScenario

Εκτελείται μετά από ένα Cucumber Scenario.

Παράμετροι:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): αντικείμενο world που περιέχει πληροφορίες για το pickle και το βήμα του test
- `result` (`object`): αντικείμενο αποτελεσμάτων που περιέχει τα αποτελέσματα του scenario
- `result.passed` (`boolean`): true αν το scenario πέρασε
- `result.error` (`string`): error stack αν το scenario απέτυχε
- `result.duration` (`number`): διάρκεια του scenario σε χιλιοστά του δευτερολέπτου
- `context` (`object`): αντικείμενο Cucumber World

### beforeStep

Εκτελείται πριν από ένα Cucumber Step.

Παράμετροι:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): αντικείμενο Cucumber step
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): αντικείμενο Cucumber scenario
- `context` (`object`): αντικείμενο Cucumber World

### afterStep

Εκτελείται μετά από ένα Cucumber Step.

Παράμετροι:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): αντικείμενο Cucumber step
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): αντικείμενο Cucumber scenario
- `result`: (`object`): αντικείμενο αποτελεσμάτων που περιέχει τα αποτελέσματα του step
- `result.passed` (`boolean`): true αν το scenario πέρασε
- `result.error` (`string`): error stack αν το scenario απέτυχε
- `result.duration` (`number`): διάρκεια του scenario σε χιλιοστά του δευτερολέπτου
- `context` (`object`): αντικείμενο Cucumber World

### beforeAssertion

Hook που εκτελείται πριν πραγματοποιηθεί ένα assertion του WebdriverIO.

Παράμετροι:

- `params`: πληροφορίες του assertion
- `params.matcherName` (`string`): όνομα του matcher που κάλεσε το test (π.χ. `toHaveTitle`). Για ένα alias, είναι το όνομα του alias (π.χ. `toBeExisting`, όχι `toExist`).
- `params.expectedValue`: τιμή που περνιέται στον matcher
- `params.options`: επιλογές του assertion

### afterAssertion

Hook που εκτελείται αφού πραγματοποιηθεί ένα assertion του WebdriverIO.

Παράμετροι:

- `params`: πληροφορίες του assertion
- `params.matcherName` (`string`): όνομα του matcher που κάλεσε το test (π.χ. `toHaveTitle`). Για ένα alias, είναι το όνομα του alias (π.χ. `toBeExisting`, όχι `toExist`).
- `params.expectedValue`: τιμή που περνιέται στον matcher
- `params.options`: επιλογές του assertion
- `params.result` (`object`): αποτέλεσμα του matcher, με `pass` (`boolean`) και `message()`. Το `pass` είναι `true` όταν η τιμή ταιριάζει με την αναμενόμενη τιμή, ακόμη και με `.not`: με `.not`, το assertion περνά όταν το `pass` είναι `false`.