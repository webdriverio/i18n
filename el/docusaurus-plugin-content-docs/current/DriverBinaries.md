---
id: driverbinaries
title: Οδηγοί Προγραμμάτων Περιήγησης
---

Για να εκτελέσετε αυτοματισμούς που βασίζονται στο πρωτόκολλο WebDriver χρειάζεστε οδηγούς προγραμμάτων περιήγησης που μεταφράζουν τις εντολές αυτοματισμού και μπορούν να τις εκτελέσουν στο πρόγραμμα περιήγησης.

## Αυτοματοποιημένη εγκατάσταση

Με το WebdriverIO `v8.14` και νεότερο, δεν χρειάζεται πλέον να κατεβάζετε και να ρυθμίζετε χειροκίνητα τους οδηγούς προγραμμάτων περιήγησης, καθώς αυτό χειρίζεται το WebdriverIO. Το μόνο που χρειάζεται να κάνετε είναι να καθορίσετε το πρόγραμμα περιήγησης που θέλετε να δοκιμάσετε και το WebdriverIO θα κάνει τα υπόλοιπα.

### Προσαρμογή του επιπέδου αυτοματισμού

Το WebdriverIO διαθέτει τρία επίπεδα αυτοματισμού:

**1. Λήψη και εγκατάσταση του προγράμματος περιήγησης χρησιμοποιώντας το [@puppeteer/browsers](https://www.npmjs.com/package/@puppeteer/browsers).**

Εάν καθορίσετε έναν συνδυασμό `browserName`/`browserVersion` στις [δυνατότητες](configuration#capabilities-1), το WebdriverIO θα κατεβάσει και θα εγκαταστήσει τον ζητούμενο συνδυασμό, ανεξάρτητα από το αν υπάρχει ήδη εγκατάσταση στο μηχάνημα. Εάν παραλείψετε το `browserVersion`, το WebdriverIO θα προσπαθήσει πρώτα να εντοπίσει και να χρησιμοποιήσει μια υπάρχουσα εγκατάσταση με το [locate-app](https://www.npmjs.com/package/locate-app), διαφορετικά θα κατεβάσει και θα εγκαταστήσει την τρέχουσα σταθερή έκδοση του προγράμματος περιήγησης. Για περισσότερες λεπτομέρειες σχετικά με το `browserVersion`, δείτε [εδώ](capabilities#automate-different-browser-channels).

:::caution

Η αυτοματοποιημένη εγκατάσταση προγράμματος περιήγησης δεν υποστηρίζει το Microsoft Edge. Επί του παρόντος, υποστηρίζονται μόνο τα Chrome, Chromium και Firefox.

:::

Εάν έχετε εγκαταστήσει ένα πρόγραμμα περιήγησης σε μια τοποθεσία που δεν μπορεί να εντοπιστεί αυτόματα από το WebdriverIO, μπορείτε να καθορίσετε το εκτελέσιμο του προγράμματος περιήγησης, το οποίο θα απενεργοποιήσει την αυτόματη λήψη και εγκατάσταση.

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

**2. Λήψη και εγκατάσταση του οδηγού χρησιμοποιώντας [Chromedriver](https://www.npmjs.com/package/chromedriver), [Edgedriver](https://www.npmjs.com/package/edgedriver) ή [Geckodriver](https://www.npmjs.com/package/geckodriver).**

Το WebdriverIO θα το κάνει πάντα αυτό, εκτός αν καθοριστεί το [binary](capabilities#binary) του οδηγού στη διαμόρφωση:

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

:::info

Το WebdriverIO δεν θα κατεβάσει αυτόματα τον οδηγό Safari καθώς είναι ήδη εγκατεστημένος στο macOS.

:::

:::caution

Αποφύγετε να καθορίζετε ένα `binary` για το πρόγραμμα περιήγησης και να παραλείπετε το αντίστοιχο `binary` του οδηγού ή το αντίστροφο. Εάν καθορίζεται μόνο μία από τις τιμές `binary`, το WebdriverIO θα προσπαθήσει να χρησιμοποιήσει ή να κατεβάσει ένα συμβατό πρόγραμμα περιήγησης/οδηγό. Ωστόσο, σε ορισμένα σενάρια αυτό μπορεί να οδηγήσει σε μη συμβατό συνδυασμό. Επομένως, συνιστάται να καθορίζετε πάντα και τα δύο για να αποφύγετε προβλήματα που προκαλούνται από ασυμβατότητες εκδόσεων.

:::

**3. Εκκίνηση/διακοπή του οδηγού.**

Από προεπιλογή, το WebdriverIO θα εκκινεί και θα διακόπτει αυτόματα τον οδηγό χρησιμοποιώντας μια αυθαίρετη αχρησιμοποίητη θύρα. Ο καθορισμός οποιασδήποτε από τις ακόλουθες ρυθμίσεις θα απενεργοποιήσει αυτή τη λειτουργία, πράγμα που σημαίνει ότι θα πρέπει να εκκινείτε και να διακόπτετε χειροκίνητα τον οδηγό:

- Οποιαδήποτε τιμή για το [port](configuration#port).
- Οποιαδήποτε τιμή διαφορετική από την προεπιλογή για τα [protocol](configuration#protocol), [hostname](configuration#hostname), [path](configuration#path).
- Οποιαδήποτε τιμή τόσο για το [user](configuration#user) όσο και για το [key](configuration#key).

## Χειροκίνητη εγκατάσταση

Τα παρακάτω περιγράφουν πώς μπορείτε να ρυθμίσετε κάθε οδηγό ξεχωριστά. Μπορείτε να βρείτε μια λίστα με όλους τους οδηγούς στο README του [`awesome-selenium`](https://github.com/christian-bromann/awesome-selenium#driver).

:::tip

Εάν ψάχνετε να ρυθμίσετε κινητές και άλλες πλατφόρμες UI, δείτε τον οδηγό [Appium Setup](appium).

:::

### Chromedriver

Για να αυτοματοποιήσετε το Chrome, μπορείτε να κατεβάσετε το Chromedriver απευθείας από τον [ιστότοπο του έργου](http://chromedriver.chromium.org/downloads) ή μέσω του πακέτου NPM:

```bash npm2yarn
npm install -g chromedriver
```

Στη συνέχεια, μπορείτε να το ξεκινήσετε μέσω:

```sh
chromedriver --port=4444 --verbose
```

### Geckodriver

Για να αυτοματοποιήσετε το Firefox, κατεβάστε την πιο πρόσφατη έκδοση του `geckodriver` για το περιβάλλον σας και αποσυμπιέστε το στον κατάλογο του έργου σας:

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
# Run as privileged session. Right-click and set 'Run as Administrator'
# Use geckodriver-v0.24.0-win32.zip for 32 bit Windows
$url = "https://github.com/mozilla/geckodriver/releases/download/v0.24.0/geckodriver-v0.24.0-win64.zip"
$output = "geckodriver.zip" # will drop into current directory unless defined otherwise
$unzipped_file = "geckodriver" # will unzip to this folder name

# By default, Powershell uses TLS 1.0 the site security requires TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Downloads Geckodriver
Invoke-WebRequest -Uri $url -OutFile $output

# Unzip Geckodriver
Expand-Archive $output -DestinationPath $unzipped_file
cd $unzipped_file

# Globally Set Geckodriver to PATH
[System.Environment]::SetEnvironmentVariable("PATH", "$Env:Path;$pwd\geckodriver.exe", [System.EnvironmentVariableTarget]::Machine)
```

</TabItem>
</Tabs>

**Σημείωση:** Άλλες εκδόσεις του `geckodriver` είναι διαθέσιμες [εδώ](https://github.com/mozilla/geckodriver/releases). Μετά τη λήψη μπορείτε να ξεκινήσετε τον οδηγό μέσω:

```sh
/path/to/binary/geckodriver --port 4444
```

### Edgedriver

Μπορείτε να κατεβάσετε τον οδηγό για το Microsoft Edge στον [ιστότοπο του έργου](https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/) ή ως πακέτο NPM μέσω:

```sh
npm install -g edgedriver
edgedriver --version # prints: Microsoft Edge WebDriver 115.0.1901.203 (a5a2b1779bcfe71f081bc9104cca968d420a89ac)
```

### Safaridriver

Το Safaridriver είναι προεγκατεστημένο στο MacOS σας και μπορεί να ξεκινήσει απευθείας μέσω:

```sh
safaridriver -p 4444
```