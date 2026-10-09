---
id: capabilities
title: Δυνατότητες (Capabilities)
description: "Ορίστε capabilities για να επιλέξετε το περιβάλλον browser ή κινητής συσκευής στο οποίο εκτελούνται τα tests σας, συμπεριλαμβανομένων προσαρμοσμένων capabilities παρόχων και ειδικών περιπτώσεων χρήσης."
---

Ένα capability είναι ένας ορισμός για μια απομακρυσμένη διεπαφή. Βοηθά το WebdriverIO να καταλάβει σε ποιο περιβάλλον browser ή κινητής συσκευής θέλετε να εκτελέσετε τα tests σας. Τα capabilities είναι λιγότερο κρίσιμα όταν αναπτύσσετε tests τοπικά, καθώς τις περισσότερες φορές τα εκτελείτε σε μία απομακρυσμένη διεπαφή, αλλά γίνονται πιο σημαντικά όταν εκτελείτε ένα μεγάλο σύνολο integration tests σε CI/CD.

:::info

Η μορφή ενός αντικειμένου capability ορίζεται σαφώς από την [προδιαγραφή WebDriver](https://w3c.github.io/webdriver/#capabilities). Ο testrunner του WebdriverIO θα αποτύχει νωρίς αν τα capabilities που έχει ορίσει ο χρήστης δεν συμμορφώνονται με αυτή την προδιαγραφή.

:::

## Προσαρμοσμένα Capabilities

Ενώ ο αριθμός των σταθερά ορισμένων capabilities είναι πολύ μικρός, οποιοσδήποτε μπορεί να παρέχει και να αποδέχεται προσαρμοσμένα capabilities που είναι ειδικά για τον automation driver ή την απομακρυσμένη διεπαφή:

### Επεκτάσεις Capabilities Ειδικές για Browser

- `goog:chromeOptions`: Επεκτάσεις του [Chromedriver](https://chromedriver.chromium.org/capabilities), εφαρμόσιμες μόνο για testing στον Chrome
- `moz:firefoxOptions`: Επεκτάσεις του [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), εφαρμόσιμες μόνο για testing στον Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) για τον καθορισμό του περιβάλλοντος κατά τη χρήση του EdgeDriver για testing στον Chromium Edge

### Επεκτάσεις Capabilities Παρόχων Cloud

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- και πολλά άλλα...

### Επεκτάσεις Capabilities Μηχανών Αυτοματοποίησης

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- και πολλά άλλα...

### Capabilities του WebdriverIO για τη διαχείριση επιλογών του browser driver

Το WebdriverIO διαχειρίζεται για εσάς την εγκατάσταση και την εκτέλεση του browser driver. Το WebdriverIO χρησιμοποιεί ένα προσαρμοσμένο capability που σας επιτρέπει να περάσετε παραμέτρους στον driver.

#### `wdio:chromedriverOptions`

Συγκεκριμένες επιλογές που περνούν στον Chromedriver κατά την εκκίνησή του.

#### `wdio:geckodriverOptions`

Συγκεκριμένες επιλογές που περνούν στον Geckodriver κατά την εκκίνησή του.

#### `wdio:edgedriverOptions`

Συγκεκριμένες επιλογές που περνούν στον Edgedriver κατά την εκκίνησή του.

#### `wdio:safaridriverOptions`

Συγκεκριμένες επιλογές που περνούν στον Safari κατά την εκκίνησή του.

#### `wdio:maxInstances`

<Option type="number">

Μέγιστος αριθμός συνολικών workers που εκτελούνται παράλληλα για το συγκεκριμένο browser/capability. Έχει προτεραιότητα έναντι των [maxInstances](#configuration#maxInstances) και [maxInstancesPerCapability](configuration/#maxinstancespercapability).

</Option>

#### `wdio:specs`

<Option type="(String | String[])[]">

Ορίστε specs για εκτέλεση tests για αυτό το browser/capability. Ίδιο με την [κανονική επιλογή διαμόρφωσης `specs`](configuration#specs), αλλά ειδικό για το browser/capability. Έχει προτεραιότητα έναντι του `specs`.

</Option>

#### `wdio:exclude`

<Option type="String[]">

Εξαιρέστε specs από την εκτέλεση tests για αυτό το browser/capability. Ίδιο με την [κανονική επιλογή διαμόρφωσης `exclude`](configuration#exclude), αλλά ειδικό για το browser/capability. Η εξαίρεση εφαρμόζεται μετά την εφαρμογή της καθολικής επιλογής διαμόρφωσης `exclude`.

</Option>

#### `wdio:enforceWebDriverClassic`

<Option type="boolean">

Από προεπιλογή, το WebdriverIO προσπαθεί να δημιουργήσει ένα WebDriver Bidi session. Αν δεν το προτιμάτε, μπορείτε να ορίσετε αυτό το flag για να απενεργοποιήσετε αυτή τη συμπεριφορά.

</Option>

#### `wdio:electronVersion`

<Option type="string">

Κατεβάζει τον Chromedriver που συνοδεύει αυτή την έκδοση του Electron αντί για εκείνον από το Chrome for Testing, για testing μιας εφαρμογής Electron που έχει οριστεί ως `goog:chromeOptions.binary`. Αν έχει οριστεί επίσης το `browserVersion`, το WebdriverIO χρησιμοποιεί αντ' αυτού τον Chromedriver για εκείνη την έκδοση όταν η έκδοση του Electron δεν μπορεί να ληφθεί ή όταν έχει οριστεί το `CHROMEDRIVER_CDNURL`. Οι nightly εκδόσεις προέρχονται από το [electron/nightlies](https://github.com/electron/nightlies/releases). Το Electron service το ορίζει για εσάς με βάση την έκδοση Electron της εφαρμογής.

```ts
{
    browserName: 'chrome',
    'wdio:electronVersion': '33.2.1',
    // ένα BiDi session αντικαθιστά το παράθυρο της εφαρμογής με `data:,`
    'wdio:enforceWebDriverClassic': true,
    'goog:chromeOptions': {
        binary: './out/my-app-darwin-arm64/my-app.app/Contents/MacOS/my-app'
    }
}
```

</Option>

#### Κοινές Επιλογές Driver

Ενώ όλοι οι drivers προσφέρουν διαφορετικές παραμέτρους διαμόρφωσης, υπάρχουν ορισμένες κοινές που το WebdriverIO κατανοεί και χρησιμοποιεί για τη ρύθμιση του driver ή του browser σας:

##### `cacheDir`

<Option type="string" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

Η διαδρομή προς τη ρίζα του καταλόγου cache. Αυτός ο κατάλογος χρησιμοποιείται για την αποθήκευση όλων των drivers που λαμβάνονται κατά την προσπάθεια εκκίνησης ενός session.

</Option>

##### `binary`

<Option type="string">

Διαδρομή προς ένα προσαρμοσμένο binary του driver. Αν οριστεί, το WebdriverIO δεν θα προσπαθήσει να κατεβάσει driver αλλά θα χρησιμοποιήσει αυτόν που παρέχεται από αυτή τη διαδρομή. Βεβαιωθείτε ότι ο driver είναι συμβατός με τον browser που χρησιμοποιείτε.

Μπορείτε να παρέχετε αυτή τη διαδρομή μέσω των μεταβλητών περιβάλλοντος `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` ή `EDGEDRIVER_PATH`.

</Option>
:::caution

Αν έχει οριστεί το `binary` του driver, το WebdriverIO δεν θα προσπαθήσει να κατεβάσει driver αλλά θα χρησιμοποιήσει αυτόν που παρέχεται από αυτή τη διαδρομή. Βεβαιωθείτε ότι ο driver είναι συμβατός με τον browser που χρησιμοποιείτε.

:::

#### Προσαρμοσμένος Host Λήψης Driver

Αν τα δημόσια CDN των drivers δεν είναι προσβάσιμα από το περιβάλλον σας, π.χ. επειδή εκτελείτε τα tests σας πίσω από έναν εταιρικό proxy ή διατηρείτε αντίγραφα (mirror) των drivers σε ένα εσωτερικό artifact registry, μπορείτε να κατευθύνετε τη λήψη σε έναν προσαρμοσμένο host χρησιμοποιώντας τις ακόλουθες μεταβλητές περιβάλλοντος:

- Chrome: `CHROMEDRIVER_CDNURL`, προεπιλογή `https://storage.googleapis.com/chrome-for-testing-public`
- Microsoft Edge: `EDGEDRIVER_CDNURL`, προεπιλογή `https://msedgedriver.microsoft.com`

Το mirror αναμένεται να διαθέτει τα αρχεία των drivers στις ίδιες διαδρομές με το αρχικό CDN, π.χ. για τον Chrome:

```sh
CHROMEDRIVER_CDNURL=https://artifactory.company.com/chrome-for-testing npx wdio run wdio.conf.js
```

το οποίο αντιστοιχίζει τον driver στο `https://artifactory.company.com/chrome-for-testing/<buildId>/<platform>/chromedriver-<platform>.zip`, όπου το `<platform>` είναι ένα από τα `linux64`, `linux-arm64`, `mac-x64`, `mac-arm64`, `win32` ή `win64`, π.χ. `.../140.0.7339.207/mac-arm64/chromedriver-mac-arm64.zip`.

:::info Πλήρως offline περιβάλλοντα

Αυτές οι μεταβλητές ανακατευθύνουν μόνο τη λήψη του driver. Για να αποτρέψετε εντελώς το WebdriverIO από το να προσεγγίσει το δημόσιο διαδίκτυο, πρέπει να πληρούνται τέσσερις επιπλέον προϋποθέσεις:

- **Ένας browser πρέπει να είναι διαθέσιμος τοπικά.** Αν το WebdriverIO δεν μπορεί να βρει εγκατεστημένο Chrome ή Firefox, κατεβάζει και τον browser, και αυτή η λήψη δεν λαμβάνει υπόψη αυτές τις μεταβλητές. Είτε εγκαταστήστε τον browser στο μηχάνημα είτε κατευθύνετε το WebdriverIO σε αυτόν μέσω του `goog:chromeOptions.binary` / `moz:firefoxOptions.binary`.
- **Χρησιμοποιήστε πλήρη αριθμό έκδοσης.** Αν το `browserVersion` παραλειφθεί, το WebdriverIO διαβάζει την ακριβή έκδοση από τον τοπικό browser και δεν απαιτείται αναζήτηση έκδοσης. Αν το ορίσετε, χρησιμοποιήστε την πλήρη τετραμερή έκδοση, π.χ. `140.0.7339.207`. Ένα κανάλι κυκλοφορίας (`stable`), ένα milestone (`140`) ή μια μερική έκδοση (`140.0.7339`) απαιτεί αναζήτηση έκδοσης σε ένα δημόσιο endpoint της Google που δεν μπορεί να ανακατευθυνθεί.
- **Ο Chromedriver πρέπει να προέρχεται από το Chrome for Testing.** Για Chrome παλαιότερο από `153.0.8001.0` σε Linux ARM64, καθώς και με `wdio:electronVersion` χωρίς `browserVersion`, ο Chromedriver λαμβάνεται από τα GitHub releases του Electron, τα οποία αυτές οι μεταβλητές δεν ανακατευθύνουν.
- **Βεβαιωθείτε ότι το mirror διαθέτει πράγματι την έκδοση που χρειάζεστε.** Αν ο driver δεν μπορεί να ληφθεί από τον host σας — επειδή η έκδοση δεν υπάρχει στο mirror, αλλά εξίσου επειδή το url είναι λάθος ή τα διαπιστευτήρια απορρίφθηκαν — το WebdriverIO καταγράφει μια προειδοποίηση και στη συνέχεια αναζητά την πλησιέστερη γνωστή λειτουργική έκδοση, κάτι που ξανά απευθύνεται στο δημόσιο endpoint. Ελέγξτε την προειδοποίηση για τον host που δοκιμάστηκε, αν μια εκτέλεση προσεγγίσει απροσδόκητα το διαδίκτυο ή επιλέξει μια έκδοση που δεν ζητήσατε.

:::

#### Επιλογές Driver Ειδικές για Browser

Για να μεταβιβάσετε επιλογές στον driver μπορείτε να χρησιμοποιήσετε τα ακόλουθα προσαρμοσμένα capabilities:

- Chrome ή Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Egde: `wdio:edgedriverOptions`
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

<Option type="number">

Η θύρα στην οποία πρέπει να εκτελείται ο ADB driver.

Παράδειγμα: `9515`

</Option>

##### urlBase

<Option type="string">

Πρόθεμα βασικής διαδρομής URL για εντολές, π.χ. `wd/url`.

Παράδειγμα: `/`

</Option>

##### logPath

<Option type="string">

Εγγραφή του server log σε αρχείο αντί για stderr, αυξάνει το επίπεδο καταγραφής σε `INFO`

</Option>

##### logLevel

<Option type="string">

Ορισμός επιπέδου καταγραφής. Πιθανές επιλογές `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

</Option>

##### verbose

<Option type="boolean">

Αναλυτική καταγραφή (ισοδύναμο με `--log-level=ALL`)

</Option>

##### silent

<Option type="boolean">

Καμία καταγραφή (ισοδύναμο με `--log-level=OFF`)

</Option>

##### appendLog

<Option type="boolean">

Προσάρτηση στο αρχείο καταγραφής αντί για επανεγγραφή.

</Option>

##### replayable

<Option type="boolean">

Αναλυτική καταγραφή χωρίς περικοπή μεγάλων strings, ώστε η καταγραφή να μπορεί να αναπαραχθεί (πειραματικό).

</Option>

##### readableTimestamp

<Option type="boolean">

Προσθήκη αναγνώσιμων χρονοσημάνσεων στην καταγραφή.

</Option>

##### enableChromeLogs

<Option type="boolean">

Εμφάνιση logs από τον browser (παρακάμπτει άλλες επιλογές καταγραφής).

</Option>

##### bidiMapperPath

<Option type="string">

Προσαρμοσμένη διαδρομή bidi mapper.

</Option>

##### allowedIps

<Option type="string[]" default="['']">

Λίστα επιτρεπόμενων απομακρυσμένων διευθύνσεων IP, διαχωρισμένων με κόμμα, που επιτρέπεται να συνδεθούν στον EdgeDriver.

</Option>

##### allowedOrigins

<Option type="string[]" default="['*']">

Λίστα επιτρεπόμενων προελεύσεων αιτημάτων, διαχωρισμένων με κόμμα, που επιτρέπεται να συνδεθούν στον EdgeDriver. Η χρήση του `*` για να επιτρέψετε οποιαδήποτε προέλευση host είναι επικίνδυνη!

</Option>

##### spawnOpts

<Option type="SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>" default="undefined">

Επιλογές που μεταβιβάζονται στη διεργασία του driver.

</Option>
</TabItem>
<TabItem value="firefox">

Δείτε όλες τις επιλογές του Geckodriver στο επίσημο [πακέτο του driver](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Δείτε όλες τις επιλογές του Edgedriver στο επίσημο [πακέτο του driver](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Δείτε όλες τις επιλογές του Safaridriver στο επίσημο [πακέτο του driver](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Ειδικά Capabilities για Συγκεκριμένες Περιπτώσεις Χρήσης

Αυτή είναι μια λίστα παραδειγμάτων που δείχνουν ποια capabilities πρέπει να εφαρμοστούν για να επιτευχθεί μια συγκεκριμένη περίπτωση χρήσης.

### Εκτέλεση Browser σε Headless Λειτουργία

Η εκτέλεση ενός headless browser σημαίνει την εκτέλεση ενός στιγμιότυπου browser χωρίς παράθυρο ή UI. Αυτό χρησιμοποιείται κυρίως σε περιβάλλοντα CI/CD όπου δεν χρησιμοποιείται οθόνη. Για να εκτελέσετε έναν browser σε headless λειτουργία, εφαρμόστε τα ακόλουθα capabilities:

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

Φαίνεται ότι ο Safari [δεν υποστηρίζει](https://discussions.apple.com/thread/251837694) την εκτέλεση σε headless λειτουργία.

</TabItem>
</Tabs>

### Αυτοματοποίηση Διαφορετικών Καναλιών Browser

Αν θέλετε να κάνετε testing σε μια έκδοση browser που δεν έχει ακόμη κυκλοφορήσει ως stable, π.χ. Chrome Canary, μπορείτε να το κάνετε ορίζοντας capabilities και δείχνοντας τον browser που θέλετε να εκκινήσετε, π.χ.:

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

Κατά το testing στον Chrome, το WebdriverIO θα κατεβάσει αυτόματα για εσάς την επιθυμητή έκδοση browser και driver με βάση το ορισμένο `browserVersion`, π.χ.:

```ts
{
    browserName: 'chrome', // ή 'chromium'
    browserVersion: '116' // ή '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' ή 'latest' (ίδιο με 'canary')
}
```

Αν θέλετε να κάνετε testing σε έναν browser που έχετε κατεβάσει χειροκίνητα, μπορείτε να παρέχετε μια διαδρομή binary προς τον browser μέσω:

```ts
{
    browserName: 'chrome',  // ή 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Επιπλέον, αν θέλετε να χρησιμοποιήσετε έναν driver που έχετε κατεβάσει χειροκίνητα, μπορείτε να παρέχετε μια διαδρομή binary προς τον driver μέσω:

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

Κατά το testing στον Firefox, το WebdriverIO θα κατεβάσει αυτόματα για εσάς την επιθυμητή έκδοση browser και driver με βάση το ορισμένο `browserVersion`, π.χ.:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // ή 'latest'
}
```

Αν θέλετε να κάνετε testing σε μια έκδοση που έχετε κατεβάσει χειροκίνητα, μπορείτε να παρέχετε μια διαδρομή binary προς τον browser μέσω:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Επιπλέον, αν θέλετε να χρησιμοποιήσετε έναν driver που έχετε κατεβάσει χειροκίνητα, μπορείτε να παρέχετε μια διαδρομή binary προς τον driver μέσω:

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

Κατά το testing στον Microsoft Edge, βεβαιωθείτε ότι έχετε εγκατεστημένη την επιθυμητή έκδοση browser στο μηχάνημά σας. Μπορείτε να κατευθύνετε το WebdriverIO στον browser που θα εκτελεστεί μέσω:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

Το WebdriverIO θα κατεβάσει αυτόματα για εσάς την επιθυμητή έκδοση driver με βάση το ορισμένο `browserVersion`, π.χ.:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // ή '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Επιπλέον, αν θέλετε να χρησιμοποιήσετε έναν driver που έχετε κατεβάσει χειροκίνητα, μπορείτε να παρέχετε μια διαδρομή binary προς τον driver μέσω:

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

Κατά το testing στον Safari, βεβαιωθείτε ότι έχετε εγκατεστημένο το [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) στο μηχάνημά σας. Μπορείτε να κατευθύνετε το WebdriverIO σε αυτή την έκδοση μέσω:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Επέκταση Προσαρμοσμένων Capabilities

Αν θέλετε να ορίσετε το δικό σας σύνολο capabilities ώστε, π.χ., να αποθηκεύσετε αυθαίρετα δεδομένα που θα χρησιμοποιηθούν στα tests για το συγκεκριμένο capability, μπορείτε να το κάνετε ορίζοντας, π.χ.:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // προσαρμοσμένες διαμορφώσεις
        }
    }]
}
```

Συνιστάται να ακολουθείτε το [πρωτόκολλο W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) όσον αφορά την ονομασία των capabilities, το οποίο απαιτεί έναν χαρακτήρα `:` (άνω και κάτω τελεία), που υποδηλώνει ένα namespace ειδικό για την υλοποίηση. Μέσα στα tests σας μπορείτε να αποκτήσετε πρόσβαση στο προσαρμοσμένο capability σας μέσω, π.χ.:

```ts
browser.capabilities['custom:caps']
```

Για να διασφαλίσετε την ασφάλεια τύπων (type safety) μπορείτε να επεκτείνετε το interface capability του WebdriverIO μέσω:

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