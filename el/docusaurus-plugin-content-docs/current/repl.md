---
id: repl
title: Διεπαφή REPL
description: "Χρησιμοποιήστε το WebdriverIO REPL για να δοκιμάσετε εντολές και να κάνετε αποσφαλμάτωση τεστ διαδραστικά από τη γραμμή εντολών ή μέσα από ένα τεστ που εκτελείται."
---

Με την `v4.5.0`, το WebdriverIO εισήγαγε μια διεπαφή [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) που σας βοηθά όχι μόνο να μάθετε το API του framework, αλλά και να κάνετε αποσφαλμάτωση και να επιθεωρήσετε τα τεστ σας. Μπορεί να χρησιμοποιηθεί με πολλούς τρόπους.

Πρώτον, μπορείτε να τη χρησιμοποιήσετε ως εντολή CLI εγκαθιστώντας το `npm install -g @wdio/cli` και να ξεκινήσετε μια συνεδρία WebDriver από τη γραμμή εντολών, π.χ.

```sh
wdio repl chrome
```

Αυτό θα ανοίξει έναν browser Chrome τον οποίο μπορείτε να ελέγχετε με τη διεπαφή REPL. Βεβαιωθείτε ότι έχετε έναν browser driver που εκτελείται στη θύρα `4444` για να ξεκινήσει η συνεδρία. Αν έχετε λογαριασμό [Sauce Labs](https://saucelabs.com) (ή άλλου παρόχου cloud), μπορείτε επίσης να εκτελέσετε απευθείας τον browser από τη γραμμή εντολών σας στο cloud μέσω:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Αν ο driver εκτελείται σε διαφορετική θύρα, π.χ. 9515, αυτή μπορεί να δοθεί με το όρισμα γραμμής εντολών --port ή το ψευδώνυμο -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Το REPL μπορεί επίσης να εκτελεστεί χρησιμοποιώντας τα capabilities από το αρχείο ρυθμίσεων του WebdriverIO. Το Wdio υποστηρίζει αντικείμενο capabilities, ή λίστα ή αντικείμενο capabilities multi-remote.

Αν το αρχείο ρυθμίσεων χρησιμοποιεί αντικείμενο capabilities, τότε απλώς δώστε τη διαδρομή προς το αρχείο ρυθμίσεων, διαφορετικά, αν πρόκειται για capability multi-remote, καθορίστε ποιο capability θα χρησιμοποιηθεί από τη λίστα ή το multi-remote χρησιμοποιώντας το θεσιακό όρισμα. Σημείωση: για τη λίστα θεωρούμε δείκτη με αρίθμηση από το μηδέν.

### Παράδειγμα

WebdriverIO με πίνακα capabilities:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // επιλογές: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // έκδοση browser
        platformName: 'Windows 10' // πλατφόρμα λειτουργικού συστήματος
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

WebdriverIO με αντικείμενο capabilities [multi-remote](https://webdriver.io/docs/multiremote/):

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
}
```

```sh
wdio repl "./path/to/wdio.config.js" "myChromeBrowser" -p 9515
```

Ή αν θέλετε να εκτελέσετε τοπικά τεστ σε κινητές συσκευές χρησιμοποιώντας το Appium:

<Tabs
  defaultValue="android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'}
  ]
}>
<TabItem value="android">

```sh
wdio repl android
```

</TabItem>
<TabItem value="ios">

```sh
wdio repl ios
```

</TabItem>
</Tabs>

Αυτό θα ανοίξει μια συνεδρία Chrome/Safari στη συνδεδεμένη συσκευή/emulator/simulator. Βεβαιωθείτε ότι το Appium εκτελείται στη θύρα `4444` για να ξεκινήσει η συνεδρία.

```sh
wdio repl './path/to/your_app.apk'
```

Αυτό θα ανοίξει μια συνεδρία εφαρμογής στη συνδεδεμένη συσκευή/emulator/simulator. Βεβαιωθείτε ότι το Appium εκτελείται στη θύρα `4444` για να ξεκινήσει η συνεδρία.

Τα capabilities για συσκευή iOS μπορούν να δοθούν με ορίσματα:

* `-v`      - `platformVersion`: έκδοση της πλατφόρμας Android/iOS
* `-d`      - `deviceName`: όνομα της κινητής συσκευής
* `-u`      - `udid`: udid για πραγματικές συσκευές

Χρήση:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Long Parameter Names', value: 'long'},
    {label: 'Short Parameter Names', value: 'short'}
  ]
}>
<TabItem value="long">

```sh
wdio repl ios --platformVersion 11.3 --deviceName 'iPhone 7' --udid 123432abc
```

</TabItem>
<TabItem value="short">

```sh
wdio repl ios -v 11.3 -d 'iPhone 7' -u 123432abc
```

</TabItem>
</Tabs>

Μπορείτε να εφαρμόσετε οποιεσδήποτε επιλογές (δείτε `wdio repl --help`) είναι διαθέσιμες για τη συνεδρία REPL σας.

### Σύνδεση σε ένα `wdio session`

Το `wdio repl --session <name>` (ψευδώνυμο `-s`) δεν ξεκινά browser. Συνδέει το REPL σε μια συνεδρία που έχει ήδη ανοίξει το [`wdio session`](/docs/session), και η αποσύνδεση αφήνει αυτή τη συνεδρία να συνεχίζει να εκτελείται. Η παύση μιας εκτέλεσης τεστ καλύπτεται στο [Αποσφαλμάτωση ενός τεστ με συνεδρία](/docs/session/debug):

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

Στο REPL, κάθε γραμμή εκτελείται ως `wdio session exec`. Το `.exit` εμφανίζει `Detached from "default" (still running)`.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Ένας άλλος τρόπος χρήσης του REPL είναι μέσα στα τεστ σας μέσω της εντολής [`debug`](/docs/api/browser/debug). Αυτή θα σταματήσει τον browser όταν καλείται, και σας επιτρέπει να μεταβείτε στην εφαρμογή (π.χ. στα dev tools) ή να ελέγξετε τον browser από τη γραμμή εντολών. Αυτό είναι χρήσιμο όταν κάποιες εντολές δεν ενεργοποιούν μια συγκεκριμένη ενέργεια όπως αναμένεται. Με το REPL, μπορείτε στη συνέχεια να δοκιμάσετε τις εντολές για να δείτε ποιες λειτουργούν πιο αξιόπιστα.