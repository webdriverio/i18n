---
id: capabilities
title: Δυνατότητες
---

Μια δυνατότητα (capability) είναι ένας ορισμός για μια απομακρυσμένη διεπαφή. Βοηθά το WebdriverIO να κατανοήσει σε ποιο περιβάλλον περιήγησης ή κινητής συσκευής θέλετε να εκτελέσετε τις δοκιμές σας. Οι δυνατότητες είναι λιγότερο κρίσιμες όταν αναπτύσσετε δοκιμές τοπικά καθώς τις εκτελείτε σε μια απομακρυσμένη διεπαφή τις περισσότερες φορές, αλλά γίνονται πιο σημαντικές όταν εκτελείτε ένα μεγάλο σύνολο δοκιμών ενσωμάτωσης σε CI/CD.

:::info

Η μορφή ενός αντικειμένου δυνατότητας καθορίζεται καλά από την [προδιαγραφή WebDriver](https://w3c.github.io/webdriver/#capabilities). Ο testrunner του WebdriverIO θα αποτύχει νωρίς εάν οι δυνατότητες που ορίζονται από τον χρήστη δεν συμμορφώνονται με αυτή την προδιαγραφή.

:::

## Προσαρμοσμένες Δυνατότητες

Ενώ ο αριθμός των καθορισμένων δυνατοτήτων είναι πολύ χαμηλός, ο καθένας μπορεί να παρέχει και να αποδεχτεί προσαρμοσμένες δυνατότητες που είναι συγκεκριμένες για τον οδηγό αυτοματισμού ή την απομακρυσμένη διεπαφή:

### Επεκτάσεις Δυνατοτήτων Συγκεκριμένες για Πρόγραμμα Περιήγησης

- `goog:chromeOptions`: Επεκτάσεις [Chromedriver](https://chromedriver.chromium.org/capabilities), εφαρμόζονται μόνο για δοκιμές στο Chrome
- `moz:firefoxOptions`: Επεκτάσεις [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), εφαρμόζονται μόνο για δοκιμές στο Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) για τον καθορισμό του περιβάλλοντος όταν χρησιμοποιείτε το EdgeDriver για δοκιμές στο Chromium Edge

### Επεκτάσεις Δυνατοτήτων Παρόχων Cloud

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- και πολλά άλλα...

### Επεκτάσεις Δυνατοτήτων Μηχανών Αυτοματισμού

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- και πολλά άλλα...

### Δυνατότητες WebdriverIO για τη διαχείριση επιλογών οδηγού περιηγητή

Το WebdriverIO διαχειρίζεται την εγκατάσταση και εκτέλεση οδηγών περιήγησης για εσάς. Το WebdriverIO χρησιμοποιεί μια προσαρμοσμένη δυνατότητα που σας επιτρέπει να περάσετε παραμέτρους στον οδηγό.

#### `wdio:chromedriverOptions`

Συγκεκριμένες επιλογές που περνούν στο Chromedriver κατά την εκκίνησή του.

#### `wdio:geckodriverOptions`

Συγκεκριμένες επιλογές που περνούν στο Geckodriver κατά την εκκίνησή του.

#### `wdio:edgedriverOptions`

Συγκεκριμένες επιλογές που περνούν στο Edgedriver κατά την εκκίνησή του.

#### `wdio:safaridriverOptions`

Συγκεκριμένες επιλογές που περνούν στο Safari κατά την εκκίνησή του.

#### `wdio:maxInstances`

Μέγιστος αριθμός συνολικών παράλληλων εργαζομένων για το συγκεκριμένο πρόγραμμα περιήγησης/δυνατότητα. Έχει προτεραιότητα έναντι των [maxInstances](#configuration#maxInstances) και [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Τύπος: `number`

#### `wdio:specs`

Καθορίστε specs για την εκτέλεση δοκιμών για αυτό το πρόγραμμα περιήγησης/δυνατότητα. Το ίδιο με την [κανονική επιλογή ρύθμισης `specs`](configuration#specs), αλλά συγκεκριμένη για το πρόγραμμα περιήγησης/δυνατότητα. Έχει προτεραιότητα έναντι των `specs`.

Τύπος: `(String | String[])[]`

#### `wdio:exclude`

Εξαιρέστε specs από την εκτέλεση δοκιμών για αυτό το πρόγραμμα περιήγησης/δυνατότητα. Το ίδιο με την [κανονική επιλογή ρύθμισης `exclude`](configuration#exclude), αλλά συγκεκριμένη για το πρόγραμμα περιήγησης/δυνατότητα. Εφαρμόζει εξαιρέσεις μετά την εφαρμογή της γενικής επιλογής ρύθμισης `exclude`.

Τύπος: `String[]`

#### `wdio:enforceWebDriverClassic`

Από προεπιλογή, το WebdriverIO προσπαθεί να δημιουργήσει μια συνεδρία WebDriver Bidi. Εάν δεν προτιμάτε αυτή τη συμπεριφορά, μπορείτε να ορίσετε αυτή τη σημαία για να την απενεργοποιήσετε.

Τύπος: `boolean`

#### Κοινές Επιλογές Οδηγού

Ενώ όλοι οι οδηγοί προσφέρουν διαφορετικές παραμέτρους για ρύθμιση, υπάρχουν κάποιες κοινές που το WebdriverIO καταλαβαίνει και χρησιμοποιεί για τη ρύθμιση του οδηγού ή του προγράμματος περιήγησής σας:

##### `cacheDir`

Η διαδρομή προς τη ρίζα του καταλόγου προσωρινής αποθήκευσης. Αυτός ο κατάλογος χρησιμοποιείται για την αποθήκευση όλων των οδηγών που κατεβαίνουν κατά την προσπάθεια έναρξης μιας συνεδρίας.

Τύπος: `string`<br />
Προεπιλογή: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Διαδρομή προς ένα προσαρμοσμένο εκτελέσιμο οδηγού. Εάν οριστεί, το WebdriverIO δεν θα προσπαθήσει να κατεβάσει έναν οδηγό αλλά θα χρησιμοποιήσει αυτόν που παρέχεται από αυτή τη διαδρομή. Βεβαιωθείτε ότι ο οδηγός είναι συμβατός με το πρόγραμμα περιήγησης που χρησιμοποιείτε.

Μπορείτε να παρέχετε αυτή τη διαδρομή μέσω των μεταβλητών περιβάλλοντος `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` ή `EDGEDRIVER_PATH`.

Τύπος: `string`

:::caution

Εάν το `binary` του οδηγού έχει οριστεί, το WebdriverIO δεν θα προσπαθήσει να κατεβάσει έναν οδηγό αλλά θα χρησιμοποιήσει αυτόν που παρέχεται από αυτή τη διαδρομή. Βεβαιωθείτε ότι ο οδηγός είναι συμβατός με το πρόγραμμα περιήγησης που χρησιμοποιείτε.

:::

#### Επιλογές Οδηγού Συγκεκριμένες για Πρόγραμμα Περιήγησης

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
Πρόθεμα βασικής διαδρομής URL για εντολές, π.χ. `wd/url`.

Παράδειγμα: `/`

Τύπος: `string`

##### logPath
Εγγραφή αρχείου καταγραφής διακομιστή σε αρχείο αντί για stderr, αυξάνει το επίπεδο καταγραφής σε `INFO`

Τύπος: `string`

##### logLevel
Ορισμός επιπέδου καταγραφής. Πιθανές επιλογές `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Τύπος: `string`

##### verbose
Αναλυτική καταγραφή (ισοδύναμη με `--log-level=ALL`)

Τύπος: `boolean`

##### silent
Καμία καταγραφή (ισοδύναμη με `--log-level=OFF`)

Τύπος: `boolean`

##### appendLog
Προσθήκη στο αρχείο καταγραφής αντί για επανεγγραφή.

Τύπος: `boolean`

##### replayable
Αναλυτική καταγραφή χωρίς περικοπή μεγάλων συμβολοσειρών ώστε το αρχείο καταγραφής να μπορεί να αναπαραχθεί (πειραματικό).

Τύπος: `boolean`

##### readableTimestamp
Προσθήκη αναγνώσιμων χρονοσφραγίδων στο αρχείο καταγραφής.

Τύπος: `boolean`

##### enableChromeLogs
Εμφάνιση αρχείων καταγραφής από το πρόγραμμα περιήγησης (παρακάμπτει άλλες επιλογές καταγραφής).

Τύπος: `boolean`

##### bidiMapperPath
Διαδρομή προσαρμοσμένου bidi mapper.

Τύπος: `string`

##### allowedIps
Επιτρεπόμενη λίστα απομακρυσμένων διευθύνσεων IP διαχωρισμένων με κόμμα που επιτρέπεται να συνδέονται στο EdgeDriver.

Τύπος: `string[]`<br />
Προεπιλογή: `['']`

##### allowedOrigins
Επιτρεπόμενη λίστα προελεύσεων αιτημάτων διαχωρισμένων με κόμμα που επιτρέπεται να συνδέονται στο EdgeDriver. Η χρήση του `*` για να επιτρέψετε οποιαδήποτε προέλευση υπολογιστή είναι επικίνδυνη!

Τύπος: `string[]`<br />
Προεπιλογή: `['*']`

##### spawnOpts
Επιλογές που θα περάσουν στη διεργασία του οδηγού.

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

Αυτή είναι μια λίστα παραδειγμάτων που δείχνουν ποιες δυνατότητες πρέπει να εφαρμοστούν για την επίτευξη μιας συγκεκριμένης περίπτωσης χρήσης.

### Εκτέλεση Προγράμματος Περιήγησης σε Λειτουργία Headless

Η εκτέλεση ενός προγράμματος περιήγησης σε λειτουργία headless σημαίνει την εκτέλεση ενός προγράμματος περιήγησης χωρίς παράθυρο ή διεπαφή χρήστη. Αυτό χρησιμοποιείται κυρίως σε περιβάλλοντα CI/CD όπου δεν χρησιμοποιείται οθόνη. Για να εκτελέσετε ένα πρόγραμμα περιήγησης σε λειτουργία headless, εφαρμόστε τις ακόλουθες δυνατότητες:

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
    browserName: 'chrome',   // or 'chromium'
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

Φαίνεται ότι το Safari [δεν υποστηρίζει](https://discussions.apple.com/thread/251837694) την εκτέλεση σε λειτουργία headless.

</TabItem>
</Tabs>

### Αυτοματισμός Διαφορετικών Καναλιών Προγράμματος Περιήγησης

Αν θέλετε να δοκιμάσετε μια έκδοση προγράμματος περιήγησης που δεν έχει κυκλοφορήσει ακόμα ως σταθερή, π.χ. Chrome Canary, μπορείτε να το κάνετε ορίζοντας δυνατότητες και παραπέμποντας στο πρόγραμμα περιήγησης που θέλετε να ξεκινήσετε, π.χ.:

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

Κατά τη δοκιμή στο Chrome, το WebdriverIO θα κατεβάσει αυτόματα την επιθυμητή έκδοση προγράμματος περιήγησης και οδηγό για εσάς με βάση το καθορισμένο `browserVersion`, π.χ.:

```ts
{
    browserName: 'chrome', // or 'chromium'
    browserVersion: '116' // or '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' or 'latest' (same as 'canary')
}
```

Εάν θέλετε να δοκιμάσετε ένα πρόγραμμα περιήγησης που έχετε κατεβάσει χειροκίνητα, μπορείτε να παρέχετε μια διαδρομή στο εκτελέσιμο του προγράμματος περιήγησης μέσω:

```ts
{
    browserName: 'chrome',  // or 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Επιπλέον, εάν θέλετε να χρησιμοποιήσετε έναν οδηγό που έχετε κατεβάσει χειροκίνητα, μπορείτε να παρέχετε μια διαδρομή στο εκτελέσιμο του οδηγού μέσω:

```ts
{
    browserName: 'chrome', // or 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Κατά τη δοκιμή στο Firefox, το WebdriverIO θα κατεβάσει αυτόματα την επιθυμητή έκδοση προγράμματος περιήγησης και οδηγό για εσάς με βάση το καθορισμένο `browserVersion`, π.χ.:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // or 'latest'
}
```

Εάν θέλετε να δοκιμάσετε μια έκδοση που έχετε κατεβάσει χειροκίνητα, μπορείτε να παρέχετε μια διαδρομή στο εκτελέσιμο του προγράμματος περιήγησης μέσω:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Επιπλέον, εάν θέλετε να χρησιμοποιήσετε έναν οδηγό που έχετε κατεβάσει χειροκίνητα, μπορείτε να παρέχετε μια διαδρομή στο εκτελέσιμο του οδηγού μέσω:

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

Κατά τη δοκιμή στο Microsoft Edge, βεβαιωθείτε ότι έχετε εγκαταστήσει την επιθυμητή έκδοση του προγράμματος περιήγησης στο μηχάνημά σας. Μπορείτε να κατευθύνετε το WebdriverIO στο πρόγραμμα περιήγησης που θα εκτελεστεί μέσω:

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
    browserVersion: '109' // or '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Επιπλέον, εάν θέλετε να χρησιμοποιήσετε έναν οδηγό που έχετε κατεβάσει χειροκίνητα, μπορείτε να παρέχετε μια διαδρομή στο εκτελέσιμο του οδηγού μέσω:

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

Κατά τη δοκιμή στο Safari, βεβαιωθείτε ότι έχετε εγκαταστήσει το [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) στο μηχάνημά σας. Μπορείτε να κατευθύνετε το WebdriverIO σε αυτή την έκδοση μέσω:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Επέκταση Προσαρμοσμένων Δυνατοτήτων

Εάν θέλετε να ορίσετε το δικό σας σύνολο δυνατοτήτων για π.χ. αποθήκευση αυθαίρετων δεδομένων που θα χρησιμοποιηθούν στις δοκιμές για αυτή τη συγκεκριμένη δυνατότητα, μπορείτε να το κάνετε ορίζοντας:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // custom configurations
        }
    }]
}
```

Συνιστάται να ακολουθείτε το [πρωτόκολλο W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) όσον αφορά την ονομασία δυνατοτήτων, το οποίο απαιτεί χαρακτήρα `:` (άνω και κάτω τελεία), υποδηλώνοντας ένα συγκεκριμένο χώρο ονομάτων υλοποίησης. Μέσα στις δοκιμές σας μπορείτε να έχετε πρόσβαση στην προσαρμοσμένη δυνατότητά σας μέσω, π.χ.:

```ts
browser.capabilities['custom:caps']
```

Για να διασφαλίσετε την ασφάλεια τύπων, μπορείτε να επεκτείνετε τη διεπαφή δυνατοτήτων του WebdriverIO μέσω:

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