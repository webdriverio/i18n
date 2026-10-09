---
id: driverbinaries
title: Εκτελέσιμα Αρχεία Drivers
description: "Αφήστε το WebdriverIO να κατεβάζει και να διαχειρίζεται αυτόματα τους drivers των browsers ή ρυθμίστε χειροκίνητα τους Chromedriver, Geckodriver, Edgedriver και Safaridriver."
---

Για να εκτελέσετε αυτοματοποίηση βασισμένη στο πρωτόκολλο WebDriver, χρειάζεται να έχετε ρυθμίσει drivers για τους browsers, οι οποίοι μεταφράζουν τις εντολές αυτοματοποίησης και μπορούν να τις εκτελέσουν στον browser.

## Αυτοματοποιημένη ρύθμιση

Με το WebdriverIO `v8.14` και νεότερες εκδόσεις, δεν υπάρχει πλέον ανάγκη να κατεβάσετε και να ρυθμίσετε χειροκίνητα κανέναν driver browser, καθώς αυτό το αναλαμβάνει το WebdriverIO. Το μόνο που χρειάζεται να κάνετε είναι να ορίσετε τον browser που θέλετε να δοκιμάσετε και το WebdriverIO θα κάνει τα υπόλοιπα.

Σε ARM64, δείτε το [Chromedriver σε ARM64](arm64-chromedriver) για το πώς λειτουργεί η ρύθμιση του driver σε macOS, Windows και Linux, καθώς και τι να κάνετε όταν δεν μπορεί να ρυθμιστεί αυτόματα.

### Προσαρμογή του επιπέδου αυτοματοποίησης

Το WebdriverIO διαθέτει τρία επίπεδα αυτοματοποίησης:

**1. Λήψη και εγκατάσταση του browser με χρήση του [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Αν ορίσετε έναν συνδυασμό `browserName`/`browserVersion` στη διαμόρφωση των [capabilities](configuration#capabilities-1), το WebdriverIO θα κατεβάσει και θα εγκαταστήσει τον ζητούμενο συνδυασμό, ανεξάρτητα από το αν υπάρχει ήδη εγκατάσταση στο μηχάνημα. Αν παραλείψετε το `browserVersion`, το WebdriverIO θα προσπαθήσει πρώτα να εντοπίσει και να χρησιμοποιήσει μια υπάρχουσα εγκατάσταση με το [locate-app](https://www.npmjs.com/package/locate-app), διαφορετικά θα κατεβάσει και θα εγκαταστήσει την τρέχουσα σταθερή έκδοση του browser. Για περισσότερες λεπτομέρειες σχετικά με το `browserVersion`, δείτε [εδώ](capabilities#automate-different-browser-channels).

:::caution

Η αυτοματοποιημένη ρύθμιση browser δεν υποστηρίζει τον Microsoft Edge. Προς το παρόν, υποστηρίζονται μόνο οι Chrome, Chromium και Firefox.

:::

Αν έχετε εγκατάσταση browser σε τοποθεσία που δεν μπορεί να εντοπιστεί αυτόματα από το WebdriverIO, μπορείτε να ορίσετε το εκτελέσιμο αρχείο του browser, κάτι που θα απενεργοποιήσει την αυτοματοποιημένη λήψη και εγκατάσταση.

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // ή 'firefox' ή 'chromium'
            'goog:chromeOptions': { // ή 'moz:firefoxOptions' ή 'wdio:chromedriverOptions'
                binary: '/path/to/chrome'
            },
        }
    ]
}
```

**2. Λήψη και εγκατάσταση του driver: Chromedriver από το [Chrome for Testing](https://googlechromelabs.github.io/chrome-for-testing/), Edgedriver και Geckodriver με τα πακέτα [edgedriver](https://www.npmjs.com/package/edgedriver) και [geckodriver](https://www.npmjs.com/package/geckodriver).**

Το WebdriverIO θα το κάνει πάντα αυτό, εκτός αν έχει οριστεί το [binary](capabilities#binary) του driver στη διαμόρφωση:

```ts
{
    capabilities: [
        {
            browserName: 'chrome', // ή 'firefox', 'msedge', 'safari', 'chromium'
            'wdio:chromedriverOptions': { // ή 'wdio:geckodriverOptions', 'wdio:edgedriverOptions'
                binary: '/path/to/chromedriver' // ή 'geckodriver', 'msedgedriver'
            }
        }
    ]
}
```

Το WebdriverIO κατεβάζει από προεπιλογή το Chromedriver από το Chrome for Testing, αλλά σε ορισμένες περιπτώσεις θα χρησιμοποιήσει μια [έκδοση του Electron](https://github.com/electron/electron/releases):

- Έχει οριστεί το [`wdio:electronVersion`](capabilities#wdioelectronversion), για μια εφαρμογή Electron. Χρησιμοποιεί αυτήν την έκδοση, εκτός αν έχουν οριστεί και το `browserVersion` και το `CHROMEDRIVER_CDNURL`.
- Ο Chrome είναι παλαιότερος από την `153.0.8001.0` σε Linux ARM64, όπου το Chrome for Testing δεν διαθέτει builds του Chromedriver (δείτε το [Chromedriver σε ARM64](arm64-chromedriver)). Χρησιμοποιεί την τελευταία έκδοση με την ίδια κύρια έκδοση Chromium.
- Η λήψη από το Chrome for Testing αποτυγχάνει, για παράδειγμα κατά τη διάρκεια διακοπής λειτουργίας, και το `CHROMEDRIVER_CDNURL` δεν έχει οριστεί. Χρησιμοποιεί την τελευταία έκδοση με την ίδια κύρια έκδοση Chromium.

:::info

Το WebdriverIO δεν θα κατεβάσει αυτόματα τον Safari driver, καθώς είναι ήδη εγκατεστημένος στο macOS.

:::

:::info Firefox / Geckodriver

Ο Firefox χρησιμοποιεί διαφορετικό σχήμα αρίθμησης εκδόσεων για τον browser (π.χ. `stable_151.0.1`) από το [Geckodriver](https://github.com/mozilla/geckodriver/releases) (π.χ. `0.36.0`), επομένως το `browserVersion` **δεν** χρησιμοποιείται για την επιλογή της έκδοσης του driver. Από προεπιλογή, το WebdriverIO κατεβάζει την τελευταία έκδοση του Geckodriver. Για να καθορίσετε μια συγκεκριμένη έκδοση driver, ορίστε το `geckoDriverVersion` στο `wdio:geckodriverOptions`:

```ts
{
    capabilities: [
        {
            browserName: 'firefox',
            browserVersion: 'stable_151.0.1',
            'wdio:geckodriverOptions': {
                geckoDriverVersion: '0.36.0'
            }
        }
    ]
}
```

:::

:::caution

Αποφύγετε να ορίζετε ένα `binary` για τον browser και να παραλείπετε το αντίστοιχο `binary` του driver ή το αντίστροφο. Αν οριστεί μόνο μία από τις τιμές `binary`, το WebdriverIO θα προσπαθήσει να χρησιμοποιήσει ή να κατεβάσει έναν browser/driver συμβατό με αυτήν. Ωστόσο, σε ορισμένα σενάρια αυτό μπορεί να οδηγήσει σε μη συμβατό συνδυασμό. Επομένως, συνιστάται να ορίζετε πάντα και τα δύο, ώστε να αποφεύγετε προβλήματα που προκαλούνται από ασυμβατότητες εκδόσεων.

:::

**3. Εκκίνηση/τερματισμός του driver.**

Από προεπιλογή, το WebdriverIO θα εκκινεί και θα τερματίζει αυτόματα τον driver χρησιμοποιώντας μια τυχαία αχρησιμοποίητη θύρα. Ο ορισμός οποιασδήποτε από τις παρακάτω ρυθμίσεις θα απενεργοποιήσει αυτήν τη λειτουργία, που σημαίνει ότι θα πρέπει να εκκινείτε και να τερματίζετε τον driver χειροκίνητα:

- Οποιαδήποτε τιμή για το [port](configuration#port).
- Οποιαδήποτε τιμή διαφορετική από την προεπιλεγμένη για τα [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Οποιαδήποτε τιμή και για τα δύο [user](configuration#user) και [key](configuration#key).

## Χειροκίνητη ρύθμιση

Στη συνέχεια περιγράφεται πώς μπορείτε να ρυθμίσετε ακόμα κάθε driver ξεχωριστά. Μπορείτε να βρείτε μια λίστα με όλους τους drivers στο README του [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Αν θέλετε να ρυθμίσετε πλατφόρμες κινητών και άλλες πλατφόρμες UI, ρίξτε μια ματιά στον οδηγό μας [Ρύθμιση Appium](appium).

:::

### Chromedriver

Για να αυτοματοποιήσετε τον Chrome, μπορείτε να κατεβάσετε το Chromedriver απευθείας από τον [ιστότοπο του έργου](http://chromedriver.chromium.org/downloads) ή μέσω του πακέτου NPM:

```bash npm2yarn
npm install -g chromedriver
```

Στη συνέχεια μπορείτε να το εκκινήσετε μέσω:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Για να αυτοματοποιήσετε τον Firefox, κατεβάστε την τελευταία έκδοση του `geckodriver` για το περιβάλλον σας και αποσυμπιέστε τη στον κατάλογο του έργου σας:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Curl', value: 'curl'},
    {label: 'Brew', value: 'brew'},
    {label: 'Windows (64 bit / Chocolatey)', value: 'chocolatey'},
    {label: 'Windows (64 bit / Powershell) DevTools', value: 'powershell'},
  ]
}>
<TabItem value="npm">

```bash npm2yarn
npm install geckodriver
```

</TabItem>
<TabItem value="curl">

Linux:

```sh
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-linux64.tar.gz | tar xz
```

MacOS (64 bit):

```sh
curl -L https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-macos.tar.gz | tar xz
```

</TabItem>
<TabItem value="brew">

```sh
brew install geckodriver
```

</TabItem>
<TabItem value="chocolatey">

```sh
choco install selenium-gecko-driver
```

</TabItem>
<TabItem value="powershell">

```sh
# Εκτελέστε ως προνομιούχα συνεδρία. Κάντε δεξί κλικ και επιλέξτε 'Run as Administrator'
# Χρησιμοποιήστε το geckodriver-v0.24.0-win32.zip για Windows 32 bit
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # θα τοποθετηθεί στον τρέχοντα κατάλογο εκτός αν οριστεί διαφορετικά
$unzipped_file = "geckodriver" # θα αποσυμπιεστεί σε φάκελο με αυτό το όνομα

# Από προεπιλογή, το Powershell χρησιμοποιεί TLS 1.0, ενώ η ασφάλεια του ιστότοπου απαιτεί TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Λήψη του Geckodriver
Invoke-WebRequest -Uri $url -OutFile $output

# Αποσυμπίεση του Geckodriver
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Καθολική προσθήκη του Geckodriver στο PATH
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**Σημείωση:** Άλλες εκδόσεις του `geckodriver` είναι διαθέσιμες [εδώ](https://github.com/mozilla/geckodriver/releases). Μετά τη λήψη, μπορείτε να εκκινήσετε τον driver μέσω:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Μπορείτε να κατεβάσετε τον driver για τον Microsoft Edge από τον [ιστότοπο του έργου](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) ή ως πακέτο NPM μέσω:

```sh
npm install -g edgedriver
edgedriver --version # εμφανίζει: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Το Safaridriver είναι προεγκατεστημένο στο MacOS σας και μπορεί να εκκινηθεί απευθείας μέσω:

```sh
safaridriver -p 4444
```