---
id: capabilities
title: Δυνατότητες
---

Μια δυνατότητα (capability) είναι ένας ορισμός για ένα απομακρυσμένο περιβάλλον. Βοηθά το WebdriverIO να κατανοήσει σε ποιο περιβάλλον περιήγησης ή κινητής συσκευής θέλετε να εκτελέσετε τις δοκιμές σας. Οι δυνατότητες είναι λιγότερο κρίσιμες κατά την ανάπτυξη δοκιμών τοπικά, καθώς τις εκτελείτε σε ένα απομακρυσμένο περιβάλλον τις περισσότερες φορές, αλλά γίνονται πιο σημαντικές όταν εκτελείτε ένα μεγάλο σύνολο δοκιμών ολοκλήρωσης σε CI/CD.

:::info

Η μορφή ενός αντικειμένου δυνατοτήτων είναι καλά καθορισμένη από τις [προδιαγραφές WebDriver](https://w3c.github.io/webdriver/#capabilities). Ο testrunner του WebdriverIO θα αποτύχει νωρίς εάν οι δυνατότητες που ορίζονται από τον χρήστη δεν συμμορφώνονται με αυτήν την προδιαγραφή.

:::

## Προσαρμοσμένες Δυνατότητες

Ενώ ο αριθμός των καθορισμένων δυνατοτήτων είναι πολύ μικρός, ο καθένας μπορεί να παρέχει και να αποδεχτεί προσαρμοσμένες δυνατότητες που είναι συγκεκριμένες για το πρόγραμμα οδήγησης αυτοματισμού ή το απομακρυσμένο περιβάλλον:

### Επεκτάσεις Δυνατοτήτων Συγκεκριμένων για τον Περιηγητή

- `goog:chromeOptions`: Επεκτάσεις [Chromedriver](https://chromedriver.chromium.org/capabilities), εφαρμόζονται μόνο για δοκιμές στο Chrome
- `moz:firefoxOptions`: Επεκτάσεις [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), εφαρμόζονται μόνο για δοκιμές στο Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) για τον καθορισμό του περιβάλλοντος όταν χρησιμοποιείτε το EdgeDriver για δοκιμές στο Chromium Edge

### Επεκτάσεις Δυνατοτήτων Παρόχων Cloud

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- και πολλά άλλα...

### Επεκτάσεις Δυνατοτήτων Μηχανής Αυτοματισμού

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- και πολλά άλλα...

### Δυνατότητες WebdriverIO για τη διαχείριση επιλογών οδηγού περιηγητή

Το WebdriverIO διαχειρίζεται την εγκατάσταση και εκτέλεση του οδηγού περιηγητή για εσάς. Το WebdriverIO χρησιμοποιεί μια προσαρμοσμένη δυνατότητα που σας επιτρέπει να περάσετε παραμέτρους στον οδηγό.

#### `wdio:chromedriverOptions`

Συγκεκριμένες επιλογές που περνούν στο Chromedriver κατά την εκκίνησή του.

#### `wdio:geckodriverOptions`

Συγκεκριμένες επιλογές που περνούν στο Geckodriver κατά την εκκίνησή του.

#### `wdio:edgedriverOptions`

Συγκεκριμένες επιλογές που περνούν στο Edgedriver κατά την εκκίνησή του.

#### `wdio:safaridriverOptions`

Συγκεκριμένες επιλογές που περνούν στο Safari κατά την εκκίνησή του.

#### `wdio:maxInstances`

Μέγιστος αριθμός συνολικών παράλληλων εργαζομένων για τον συγκεκριμένο περιηγητή/δυνατότητα. Έχει προτεραιότητα έναντι των [maxInstances](#configuration#maxInstances) και [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Τύπος: `number`

#### `wdio:specs`

Καθορίζει τις προδιαγραφές για την εκτέλεση δοκιμών για αυτόν τον περιηγητή/δυνατότητα. Ίδιο με την [κανονική επιλογή διαμόρφωσης `specs`](configuration#specs), αλλά συγκεκριμένη για τον περιηγητή/δυνατότητα. Έχει προτεραιότητα έναντι του `specs`.

Τύπος: `(String | String[])[]`

#### `wdio:exclude`

Εξαιρεί προδιαγραφές από την εκτέλεση δοκιμών για αυτόν τον περιηγητή/δυνατότητα. Ίδιο με την [κανονική επιλογή διαμόρφωσης `exclude`](configuration#exclude), αλλά συγκεκριμένη για τον περιηγητή/δυνατότητα. Έχει προτεραιότητα έναντι του `exclude`.

Τύπος: `String[]`

#### `wdio:enforceWebDriverClassic`

Από προεπιλογή, το WebdriverIO προσπαθεί να δημιουργήσει μια συνεδρία WebDriver Bidi. Αν δεν προτιμάτε αυτή τη συμπεριφορά, μπορείτε να ορίσετε αυτή τη σημαία για να την απενεργοποιήσετε.

Τύπος: `boolean`

#### Κοινές Επιλογές Οδηγού

Ενώ όλοι οι οδηγοί προσφέρουν διαφορετικές παραμέτρους για διαμόρφωση, υπάρχουν κάποιες κοινές που το WebdriverIO κατανοεί και χρησιμοποιεί για τη ρύθμιση του οδηγού ή του περιηγητή σας:

##### `cacheDir`

Η διαδρομή προς τη ρίζα του καταλόγου προσωρινής αποθήκευσης. Αυτός ο κατάλογος χρησιμοποιείται για την αποθήκευση όλων των οδηγών που κατεβαίνουν κατά την προσπάθεια έναρξης μιας συνεδρίας.

Τύπος: `string`<br />
Προεπιλογή: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Διαδρομή προς ένα προσαρμοσμένο δυαδικό αρχείο οδηγού. Εάν οριστεί, το WebdriverIO δεν θα προσπαθήσει να κατεβάσει έναν οδηγό αλλά θα χρησιμοποιήσει αυτόν που παρέχεται από αυτή τη διαδρομή. Βεβαιωθείτε ότι ο οδηγός είναι συμβατός με τον περιηγητή που χρησιμοποιείτε.

Μπορείτε να παρέχετε αυτή τη διαδρομή μέσω των μεταβλητών περιβάλλοντος `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` ή `EDGEDRIVER_PATH`.

Τύπος: `string`

:::caution

Εάν το `binary` του οδηγού είναι ορισμένο, το WebdriverIO δεν θα προσπαθήσει να κατεβάσει έναν οδηγό αλλά θα χρησιμοποιήσει αυτόν που παρέχεται από αυτή τη διαδρομή. Βεβαιωθείτε ότι ο οδηγός είναι συμβατός με τον περιηγητή που χρησιμοποιείτε.

:::

#### Επιλογές Οδηγού Συγκεκριμένες για τον Περιηγητή

Για να διαδώσετε επιλογές στον οδηγό, μπορείτε να χρησιμοποιήσετε τις ακόλουθες προσαρμοσμένες δυνατότητες:

- Chrome ή Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Edge: `wdio:edgedriverOptions`
- Safari: `wdio:safaridriverOptions`

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'wdio:chromedriverOptions', value: 'chrome'},
    {label: 'wdio:geckodriverOptions', value: 'firefox'},
    {label: 'wdio:edgedriverOptions', value: 'msedge'},
    {label: 'wdio:safaridriverOptions', value: 'safari'},
  ]
}>
<TabItem value="chrome">

##### adbPort
Η θύρα στην οποία θα πρέπει να εκτελείται ο οδηγός ADB.

Παράδειγμα: `9515`

Τύπος: `number`

##### urlBase
Πρόθεμα διαδρομής βάσης URL για εντολές, π.χ. `wd/url`.

Παράδειγμα: `/`

Τύπος: `string`

##### logPath
Εγγραφή αρχείου καταγραφής διακομιστή σε αρχείο αντί για stderr, αυξάνει το επίπεδο καταγραφής σε `INFO`

Τύπος: `string`

##### logLevel
Ορισμός επιπέδου καταγραφής. Πιθανές επιλογές `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Τύπος: `string`

##### verbose
Λεπτομερής καταγραφή (ισοδύναμο με `--log-level=ALL`)

Τύπος: `boolean`

##### silent
Καμία καταγραφή (ισοδύναμο με `--log-level=OFF`)

Τύπος: `boolean`

##### appendLog
Προσθήκη στο αρχείο καταγραφής αντί για επανεγγραφή.

Τύπος: `boolean`

##### replayable
Λεπτομερής καταγραφή και μη περικοπή μεγάλων συμβολοσειρών ώστε το αρχείο καταγραφής να μπορεί να επαναληφθεί (πειραματικό).

Τύπος: `boolean`

##### readableTimestamp
Προσθήκη αναγνώσιμων χρονικών σημάνσεων στην καταγραφή.

Τύπος: `boolean`

##### enableChromeLogs
Εμφάνιση αρχείων καταγραφής από τον περιηγητή (παρακάμπτει άλλες επιλογές καταγραφής).

Τύπος: `boolean`

##### bidiMapperPath
Προσαρμοσμένη διαδρομή bidi mapper.

Τύπος: `string`

##### allowedIps
Λίστα επιτρεπόμενων απομακρυσμένων διευθύνσεων IP που επιτρέπεται να συνδεθούν στο EdgeDriver, διαχωρισμένη με κόμματα.

Τύπος: `string[]`<br />
Προεπιλογή: `['']`

##### allowedOrigins
Λίστα επιτρεπόμενων προελεύσεων αιτημάτων που επιτρέπεται να συνδεθούν στο EdgeDriver, διαχωρισμένη με κόμματα. Η χρήση του `*` για να επιτρέψετε οποιαδήποτε προέλευση είναι επικίνδυνη!

Τύπος: `string[]`<br />
Προεπιλογή: `['*']`

##### spawnOpts
Επιλογές που θα περαστούν στη διαδικασία του οδηγού.

Τύπος: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
Προεπιλογή: `undefined`

</TabItem>
<TabItem value="firefox">

Δείτε όλες τις επιλογές Geckodriver στο επίσημο [πακέτο οδηγού](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Δείτε όλες τις επιλογές Edgedriver στο επίσημο [πακέτο οδηγού](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Δείτε όλες τις επιλογές Safaridriver στο επίσημο [πακέτο οδηγού](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Ειδικές Δυνατότητες για Συγκεκριμένες Περιπτώσεις Χρήσης

Αυτή είναι μια λίστα παραδειγμάτων που δείχνουν ποιες δυνατότητες πρέπει να εφαρμοστούν για την επίτευξη συγκεκριμένης περίπτωσης χρήσης.

### Εκτέλεση Περιηγητή σε Headless Mode

Η εκτέλεση ενός περιηγητή σε headless mode σημαίνει την εκτέλεση μιας παρουσίας περιηγητή χωρίς παράθυρο ή UI. Αυτό χρησιμοποιείται κυρίως σε περιβάλλοντα CI/CD όπου δεν χρησιμοποιείται οθόνη. Για να εκτελέσετε έναν περιηγητή σε headless mode, εφαρμόστε τις ακόλουθες δυνατότητες:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

```ts
{
    browserName: 'chrome',   // ή 'chromium'
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
}
```

</TabItem>
<TabItem value="firefox">

```ts
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless']
    }
```

</TabItem>
<TabItem value="msedge">

```ts
    browserName: 'msedge',
    'ms:edgeOptions': {
        args: ['--headless']
    }
```

</TabItem>
<TabItem value="safari">

Φαίνεται ότι το Safari [δεν υποστηρίζει](https://discussions.apple.com/thread/251837694) την εκτέλεση σε headless mode.

</TabItem>
</Tabs>

### Αυτοματισμός Διαφορετικών Καναλιών Περιηγητή

Αν θέλετε να δοκιμάσετε μια έκδοση περιηγητή που δεν έχει κυκλοφορήσει ακόμα ως σταθερή, π.χ. Chrome Canary, μπορείτε να το κάνετε ορίζοντας δυνατότητες και υποδεικνύοντας τον περιηγητή που θέλετε να ξεκινήσετε, π.χ.:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

Κατά τη δοκιμή στο Chrome, το WebdriverIO θα κατεβάσει αυτόματα την επιθυμητή έκδοση περιηγητή και οδηγού για εσάς με βάση το καθορισμένο `browserVersion`, π.χ.:

```ts
{
    browserName: 'chrome', // ή 'chromium'
    browserVersion: '116' // ή '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' ή 'latest' (το ίδιο με 'canary')
}
```

Αν θέλετε να δοκιμάσετε έναν περιηγητή που έχετε κατεβάσει χειροκίνητα, μπορείτε να παρέχετε μια διαδρομή προς το δυαδικό αρχείο του περιηγητή μέσω:

```ts
{
    browserName: 'chrome',  // ή 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Επιπλέον, αν θέλετε να χρησιμοποιήσετε έναν οδηγό που έχετε κατεβάσει χειροκίνητα, μπορείτε να παρέχετε μια διαδρομή προς το δυαδικό αρχείο του οδηγού μέσω:

```ts
{
    browserName: 'chrome', // ή 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Κατά τη δοκιμή στο Firefox, το WebdriverIO θα κατεβάσει αυτόματα την επιθυμητή έκδοση περιηγητή και οδηγού για εσάς με βάση το καθορισμένο `browserVersion`, π.χ.:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // ή 'latest'
}
```

Αν θέλετε να δοκιμάσετε μια έκδοση που έχετε κατεβάσει χειροκίνητα, μπορείτε να παρέχετε μια διαδρομή προς το δυαδικό αρχείο του περιηγητή μέσω:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Επιπλέον, αν θέλετε να χρησιμοποιήσετε έναν οδηγό που έχετε κατεβάσει χειροκίνητα, μπορείτε να παρέχετε μια διαδρομή προς το δυαδικό αρχείο του οδηγού μέσω:

```ts
{
    browserName: 'firefox',
    'wdio:geckodriverOptions': {
        binary: '/path/to/geckodriver'
    }
}
```

</TabItem>
<TabItem value="msedge">

Κατά τη δοκιμή στο Microsoft Edge, βεβαιωθείτε ότι έχετε εγκαταστήσει την επιθυμητή έκδοση περιηγητή στο μηχάνημά σας. Μπορείτε να υποδείξετε στο WebdriverIO τον περιηγητή που θα εκτελεστεί μέσω:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

Το WebdriverIO θα κατεβάσει αυτόματα την επιθυμητή έκδοση οδηγού για εσάς με βάση το καθορισμένο `browserVersion`, π.χ.:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // ή '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Επιπλέον, αν θέλετε να χρησιμοποιήσετε έναν οδηγό που έχετε κατεβάσει χειροκίνητα, μπορείτε να παρέχετε μια διαδρομή προς το δυαδικό αρχείο του οδηγού μέσω:

```ts
{
    browserName: 'msedge',
    'wdio:edgedriverOptions': {
        binary: '/path/to/msedgedriver'
    }
}
```

</TabItem>
<TabItem value="safari">

Κατά τη δοκιμή στο Safari, βεβαιωθείτε ότι έχετε εγκαταστήσει το [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) στο μηχάνημά σας. Μπορείτε να υποδείξετε στο WebdriverIO αυτήν την έκδοση μέσω:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Επέκταση Προσαρμοσμένων Δυνατοτήτων

Αν θέλετε να ορίσετε το δικό σας σύνολο δυνατοτήτων, για παράδειγμα, για να αποθηκεύσετε αυθαίρετα δεδομένα που θα χρησιμοποιηθούν στις δοκιμές για αυτή τη συγκεκριμένη δυνατότητα, μπορείτε να το κάνετε π.χ. ορίζοντας:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // προσαρμοσμένες ρυθμίσεις
        }
    }]
}
```

Συνιστάται να ακολουθείτε το [πρωτόκολλο W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) όσον αφορά την ονομασία των δυνατοτήτων, το οποίο απαιτεί έναν χαρακτήρα `:` (άνω και κάτω τελεία), δηλώνοντας έναν χώρο ονομάτων συγκεκριμένο για την υλοποίηση. Στις δοκιμές σας μπορείτε να έχετε πρόσβαση στην προσαρμοσμένη δυνατότητά σας μέσω, π.χ.:

```ts
browser.capabilities['custom:caps']
```

Για να εξασφαλίσετε την ασφάλεια τύπων, μπορείτε να επεκτείνετε τη διεπαφή δυνατοτήτων του WebdriverIO μέσω:

```ts
declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:caps': {
                // ...
            }
        }
    }
}
```