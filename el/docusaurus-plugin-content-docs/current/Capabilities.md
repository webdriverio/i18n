---
id: capabilities
title: Δυνατότητες
---

Μια δυνατότητα (capability) είναι ένας ορισμός για μια απομακρυσμένη διεπαφή. Βοηθά το WebdriverIO να κατανοήσει σε ποιο περιβάλλον προγράμματος περιήγησης ή κινητής συσκευής θέλετε να εκτελέσετε τις δοκιμές σας. Οι δυνατότητες είναι λιγότερο κρίσιμες κατά την ανάπτυξη δοκιμών τοπικά, καθώς τις εκτελείτε σε μία απομακρυσμένη διεπαφή τις περισσότερες φορές, αλλά γίνονται πιο σημαντικές όταν εκτελείτε ένα μεγάλο σύνολο δοκιμών ενσωμάτωσης σε CI/CD.

:::info

Η μορφή ενός αντικειμένου δυνατοτήτων καθορίζεται σαφώς από την [προδιαγραφή WebDriver](https://w3c.github.io/webdriver/#capabilities). Ο εκτελεστής δοκιμών του WebdriverIO θα αποτύχει νωρίς εάν οι δυνατότητες που καθορίζονται από τον χρήστη δεν συμμορφώνονται με αυτή την προδιαγραφή.

:::

## Προσαρμοσμένες Δυνατότητες

Ενώ ο αριθμός των καθορισμένων δυνατοτήτων είναι πολύ χαμηλός, ο καθένας μπορεί να παρέχει και να αποδέχεται προσαρμοσμένες δυνατότητες που είναι συγκεκριμένες για το πρόγραμμα οδήγησης αυτοματισμού ή την απομακρυσμένη διεπαφή:

### Επεκτάσεις Δυνατοτήτων Συγκεκριμένες για Προγράμματα Περιήγησης

- `goog:chromeOptions`: Επεκτάσεις [Chromedriver](https://chromedriver.chromium.org/capabilities), εφαρμόζονται μόνο για δοκιμές στο Chrome
- `moz:firefoxOptions`: Επεκτάσεις [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), εφαρμόζονται μόνο για δοκιμές στο Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) για τον καθορισμό του περιβάλλοντος κατά τη χρήση του EdgeDriver για δοκιμές στο Chromium Edge

### Επεκτάσεις Δυνατοτήτων Παρόχων Cloud

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- και πολλά άλλα...

### Επεκτάσεις Δυνατοτήτων Μηχανών Αυτοματισμού

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- και πολλά άλλα...

### Δυνατότητες WebdriverIO για τη διαχείριση επιλογών προγράμματος οδήγησης προγράμματος περιήγησης

Το WebdriverIO διαχειρίζεται την εγκατάσταση και εκτέλεση προγραμμάτων οδήγησης προγράμματος περιήγησης για εσάς. Το WebdriverIO χρησιμοποιεί μια προσαρμοσμένη δυνατότητα που σας επιτρέπει να περάσετε παραμέτρους στο πρόγραμμα οδήγησης.

#### `wdio:chromedriverOptions`

Συγκεκριμένες επιλογές που περνούν στο Chromedriver κατά την εκκίνησή του.

#### `wdio:geckodriverOptions`

Συγκεκριμένες επιλογές που περνούν στο Geckodriver κατά την εκκίνησή του.

#### `wdio:edgedriverOptions`

Συγκεκριμένες επιλογές που περνούν στο Edgedriver κατά την εκκίνησή του.

#### `wdio:safaridriverOptions`

Συγκεκριμένες επιλογές που περνούν στο Safari κατά την εκκίνησή του.

#### `wdio:maxInstances`

Μέγιστος αριθμός συνολικών παράλληλων εργατών που εκτελούνται για το συγκεκριμένο πρόγραμμα περιήγησης/δυνατότητα. Έχει προτεραιότητα έναντι των [maxInstances](#configuration#maxInstances) και [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Τύπος: `number`

#### `wdio:specs`

Ορίζει προδιαγραφές για την εκτέλεση δοκιμών για αυτό το πρόγραμμα περιήγησης/δυνατότητα. Το ίδιο με την [κανονική επιλογή διαμόρφωσης `specs`](configuration#specs), αλλά συγκεκριμένη για το πρόγραμμα περιήγησης/δυνατότητα. Έχει προτεραιότητα έναντι των `specs`.

Τύπος: `(String | String[])[]`

#### `wdio:exclude`

Εξαιρεί προδιαγραφές από την εκτέλεση δοκιμών για αυτό το πρόγραμμα περιήγησης/δυνατότητα. Το ίδιο με την [κανονική επιλογή διαμόρφωσης `exclude`](configuration#exclude), αλλά συγκεκριμένη για το πρόγραμμα περιήγησης/δυνατότητα. Εφαρμόζεται μετά την εφαρμογή της επιλογής διαμόρφωσης `exclude`.

Τύπος: `String[]`

#### `wdio:enforceWebDriverClassic`

Από προεπιλογή, το WebdriverIO προσπαθεί να δημιουργήσει μια συνεδρία WebDriver Bidi. Εάν δεν προτιμάτε αυτό, μπορείτε να ορίσετε αυτήν τη σημαία για να απενεργοποιήσετε αυτή τη συμπεριφορά.

Τύπος: `boolean`

#### Κοινές Επιλογές Προγράμματος Οδήγησης

Ενώ όλα τα προγράμματα οδήγησης προσφέρουν διαφορετικές παραμέτρους για διαμόρφωση, υπάρχουν ορισμένες κοινές που κατανοεί το WebdriverIO και χρησιμοποιεί για τη ρύθμιση του προγράμματος οδήγησης ή του προγράμματος περιήγησής σας:

##### `cacheDir`

Η διαδρομή προς τη ρίζα του καταλόγου προσωρινής μνήμης. Αυτός ο κατάλογος χρησιμοποιείται για την αποθήκευση όλων των προγραμμάτων οδήγησης που λαμβάνονται κατά την προσπάθεια έναρξης μιας συνεδρίας.

Τύπος: `string`<br />
Προεπιλογή: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Διαδρομή προς ένα προσαρμοσμένο δυαδικό πρόγραμμα οδήγησης. Εάν οριστεί, το WebdriverIO δεν θα επιχειρήσει να κατεβάσει ένα πρόγραμμα οδήγησης αλλά θα χρησιμοποιήσει αυτό που παρέχεται από αυτή τη διαδρομή. Βεβαιωθείτε ότι το πρόγραμμα οδήγησης είναι συμβατό με το πρόγραμμα περιήγησης που χρησιμοποιείτε.

Μπορείτε να παρέχετε αυτή τη διαδρομή μέσω των μεταβλητών περιβάλλοντος `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` ή `EDGEDRIVER_PATH`.

Τύπος: `string`

:::caution

Εάν έχει οριστεί το `binary` του προγράμματος οδήγησης, το WebdriverIO δεν θα επιχειρήσει να κατεβάσει ένα πρόγραμμα οδήγησης αλλά θα χρησιμοποιήσει αυτό που παρέχεται από αυτή τη διαδρομή. Βεβαιωθείτε ότι το πρόγραμμα οδήγησης είναι συμβατό με το πρόγραμμα περιήγησης που χρησιμοποιείτε.

:::

#### Επιλογές Προγράμματος Οδήγησης Συγκεκριμένες για Προγράμματα Περιήγησης

Για να διαδώσετε επιλογές στο πρόγραμμα οδήγησης, μπορείτε να χρησιμοποιήσετε τις ακόλουθες προσαρμοσμένες δυνατότητες:

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
Η θύρα στην οποία πρέπει να εκτελείται ο οδηγός ADB.

Παράδειγμα: `9515`

Τύπος: `number`

##### urlBase
Πρόθεμα διαδρομής βάσης URL για εντολές, π.χ. `wd/url`.

Παράδειγμα: `/`

Τύπος: `string`

##### logPath
Εγγραφή του αρχείου καταγραφής διακομιστή σε αρχείο αντί για stderr, αυξάνει το επίπεδο καταγραφής σε `INFO`

Τύπος: `string`

##### logLevel
Ορισμός επιπέδου καταγραφής. Πιθανές επιλογές `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Τύπος: `string`

##### verbose
Καταγραφή με λεπτομέρειες (ισοδύναμο με `--log-level=ALL`)

Τύπος: `boolean`

##### silent
Καμία καταγραφή (ισοδύναμο με `--log-level=OFF`)

Τύπος: `boolean`

##### appendLog
Προσάρτηση στο αρχείο καταγραφής αντί για επανεγγραφή.

Τύπος: `boolean`

##### replayable
Καταγραφή με λεπτομέρειες και μη περικοπή μεγάλων συμβολοσειρών ώστε το αρχείο καταγραφής να μπορεί να αναπαραχθεί (πειραματικό).

Τύπος: `boolean`

##### readableTimestamp
Προσθήκη αναγνώσιμων χρονοσφραγίδων στο αρχείο καταγραφής.

Τύπος: `boolean`

##### enableChromeLogs
Εμφάνιση αρχείων καταγραφής από το πρόγραμμα περιήγησης (παρακάμπτει άλλες επιλογές καταγραφής).

Τύπος: `boolean`

##### bidiMapperPath
Προσαρμοσμένη διαδρομή χαρτογράφησης bidi.

Τύπος: `string`

##### allowedIps
Λίστα επιτρεπόμενων απομακρυσμένων διευθύνσεων IP, διαχωρισμένων με κόμμα, οι οποίες επιτρέπεται να συνδεθούν στο EdgeDriver.

Τύπος: `string[]`<br />
Προεπιλογή: `['']`

##### allowedOrigins
Λίστα επιτρεπόμενων προελεύσεων αιτημάτων, διαχωρισμένων με κόμμα, οι οποίες επιτρέπεται να συνδεθούν στο EdgeDriver. Η χρήση του `*` για να επιτρέψετε οποιαδήποτε προέλευση κεντρικού υπολογιστή είναι επικίνδυνη!

Τύπος: `string[]`<br />
Προεπιλογή: `['*']`

##### spawnOpts
Επιλογές που πρέπει να περάσουν στη διαδικασία του προγράμματος οδήγησης.

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

### Εκτέλεση Προγράμματος Περιήγησης Χωρίς Περιβάλλον Εργασίας

Η εκτέλεση ενός προγράμματος περιήγησης χωρίς περιβάλλον εργασίας (headless) σημαίνει την εκτέλεση μιας παρουσίας προγράμματος περιήγησης χωρίς παράθυρο ή διεπαφή χρήστη. Αυτό χρησιμοποιείται κυρίως σε περιβάλλοντα CI/CD όπου δεν χρησιμοποιείται οθόνη. Για να εκτελέσετε ένα πρόγραμμα περιήγησης σε λειτουργία χωρίς περιβάλλον εργασίας, εφαρμόστε τις ακόλουθες δυνατότητες:

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

Φαίνεται ότι το Safari [δεν υποστηρίζει](https://discussions.apple.com/thread/251837694) την εκτέλεση σε λειτουργία χωρίς περιβάλλον εργασίας.

</TabItem>
</Tabs>

### Αυτοματισμός Διαφορετικών Καναλιών Προγράμματος Περιήγησης

Εάν θέλετε να δοκιμάσετε μια έκδοση προγράμματος περιήγησης που δεν έχει κυκλοφορήσει ακόμα ως σταθερή, π.χ. Chrome Canary, μπορείτε να το κάνετε ρυθμίζοντας δυνατότητες και δείχνοντας στο πρόγραμμα περιήγησης που θέλετε να ξεκινήσετε, π.χ.:

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

Κατά τη δοκιμή στο Chrome, το WebdriverIO θα κατεβάσει αυτόματα την επιθυμητή έκδοση προγράμματος περιήγησης και προγράμματος οδήγησης για εσάς με βάση το καθορισμένο `browserVersion`, π.χ.:

```ts
{
    browserName: 'chrome', // or 'chromium'
    browserVersion: '116' // or '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' or 'latest' (same as 'canary')
}
```

Εάν θέλετε να δοκιμάσετε ένα πρόγραμμα περιήγησης που έχετε κατεβάσει χειροκίνητα, μπορείτε να παράσχετε μια διαδρομή προς το πρόγραμμα περιήγησης μέσω:

```ts
{
    browserName: 'chrome',  // or 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Επιπλέον, εάν θέλετε να χρησιμοποιήσετε ένα πρόγραμμα οδήγησης που έχετε κατεβάσει χειροκίνητα, μπορείτε να παράσχετε μια διαδρομή προς το πρόγραμμα οδήγησης μέσω:

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

Κατά τη δοκιμή στο Firefox, το WebdriverIO θα κατεβάσει αυτόματα την επιθυμητή έκδοση προγράμματος περιήγησης και προγράμματος οδήγησης για εσάς με βάση το καθορισμένο `browserVersion`, π.χ.:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // or 'latest'
}
```

Εάν θέλετε να δοκιμάσετε μια έκδοση που έχετε κατεβάσει χειροκίνητα, μπορείτε να παράσχετε μια διαδρομή προς το πρόγραμμα περιήγησης μέσω:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Επιπλέον, εάν θέλετε να χρησιμοποιήσετε ένα πρόγραμμα οδήγησης που έχετε κατεβάσει χειροκίνητα, μπορείτε να παράσχετε μια διαδρομή προς το πρόγραμμα οδήγησης μέσω:

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

Κατά τη δοκιμή στο Microsoft Edge, βεβαιωθείτε ότι έχετε εγκαταστήσει την επιθυμητή έκδοση προγράμματος περιήγησης στο μηχάνημά σας. Μπορείτε να κατευθύνετε το WebdriverIO στο πρόγραμμα περιήγησης για εκτέλεση μέσω:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

Το WebdriverIO θα κατεβάσει αυτόματα την επιθυμητή έκδοση προγράμματος οδήγησης για εσάς με βάση το καθορισμένο `browserVersion`, π.χ.:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // or '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Επιπλέον, εάν θέλετε να χρησιμοποιήσετε ένα πρόγραμμα οδήγησης που έχετε κατεβάσει χειροκίνητα, μπορείτε να παράσχετε μια διαδρομή προς το πρόγραμμα οδήγησης μέσω:

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

Κατά τη δοκιμή στο Safari, βεβαιωθείτε ότι έχετε εγκαταστήσει το [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) στο μηχάνημά σας. Μπορείτε να κατευθύνετε το WebdriverIO σε αυτήν την έκδοση μέσω:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Επέκταση Προσαρμοσμένων Δυνατοτήτων

Εάν θέλετε να ορίσετε το δικό σας σύνολο δυνατοτήτων για να π.χ. αποθηκεύσετε αυθαίρετα δεδομένα που θα χρησιμοποιηθούν στις δοκιμές για αυτή τη συγκεκριμένη δυνατότητα, μπορείτε να το κάνετε ορίζοντας π.χ.:

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

Συνιστάται να ακολουθείτε το [πρωτόκολλο W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) όσον αφορά την ονομασία δυνατοτήτων, το οποίο απαιτεί ένα χαρακτήρα `:` (άνω και κάτω τελεία), που υποδηλώνει έναν χώρο ονομάτων συγκεκριμένο για την υλοποίηση. Μέσα στις δοκιμές σας μπορείτε να έχετε πρόσβαση στην προσαρμοσμένη δυνατότητά σας μέσω, π.χ.:

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