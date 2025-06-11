---
id: repl
title: Διεπαφή REPL
---

Με την `v4.5.0`, το WebdriverIO εισήγαγε μια διεπαφή [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) που σας βοηθά όχι μόνο να μάθετε το API του πλαισίου, αλλά και να αποσφαλματώσετε και να επιθεωρήσετε τις δοκιμές σας. Μπορεί να χρησιμοποιηθεί με πολλούς τρόπους.

Πρώτα μπορείτε να το χρησιμοποιήσετε ως εντολή CLI εγκαθιστώντας το `npm install -g @wdio/cli` και να δημιουργήσετε μια συνεδρία WebDriver από τη γραμμή εντολών, π.χ.

```sh
wdio repl chrome
```

Αυτό θα ανοίξει ένα πρόγραμμα περιήγησης Chrome που μπορείτε να ελέγξετε με τη διεπαφή REPL. Βεβαιωθείτε ότι έχετε ένα πρόγραμμα οδήγησης προγράμματος περιήγησης που εκτελείται στη θύρα `4444` για να ξεκινήσετε τη συνεδρία. Εάν έχετε λογαριασμό [Sauce Labs](https://saucelabs.com) (ή άλλου παρόχου cloud), μπορείτε επίσης να εκτελέσετε απευθείας το πρόγραμμα περιήγησης στη γραμμή εντολών σας στο cloud μέσω:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Εάν το πρόγραμμα οδήγησης εκτελείται σε διαφορετική θύρα π.χ.: 9515, μπορεί να περαστεί με το όρισμα γραμμής εντολών --port ή το συνώνυμο -p

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Το Repl θα μπορούσε επίσης να εκτελεστεί χρησιμοποιώντας τις δυνατότητες από το αρχείο διαμόρφωσης webdriverIO. Το Wdio υποστηρίζει αντικείμενο δυνατοτήτων ή λίστα ή αντικείμενο δυνατοτήτων multiremote.

Εάν το αρχείο διαμόρφωσης χρησιμοποιεί αντικείμενο δυνατοτήτων, τότε απλώς περάστε τη διαδρομή προς το αρχείο διαμόρφωσης, διαφορετικά εάν είναι μια δυνατότητα multiremote, καθορίστε ποια δυνατότητα να χρησιμοποιήσετε από τη λίστα ή το multiremote χρησιμοποιώντας το όρισμα θέσης. Σημείωση: για τη λίστα θεωρούμε ευρετήριο με βάση το μηδέν.

### Παράδειγμα

WebdriverIO με πίνακα δυνατοτήτων:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // browser version
        platformName: 'Windows 10' // OS platform
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

WebdriverIO με αντικείμενο δυνατοτήτων [multiremote](https://webdriver.io/docs/multiremote/):

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

Ή αν θέλετε να εκτελέσετε τοπικές δοκιμές σε κινητά χρησιμοποιώντας το Appium:

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

Αυτό θα ανοίξει μια συνεδρία Chrome/Safari στη συνδεδεμένη συσκευή/προσομοιωτή. Βεβαιωθείτε ότι το Appium εκτελείται στη θύρα `4444` για να ξεκινήσετε τη συνεδρία.

```sh
wdio repl './path/to/your_app.apk'
```

Αυτό θα ανοίξει μια συνεδρία εφαρμογής στη συνδεδεμένη συσκευή/προσομοιωτή. Βεβαιωθείτε ότι το Appium εκτελείται στη θύρα `4444` για να ξεκινήσετε τη συνεδρία.

Οι δυνατότητες για συσκευή iOS μπορούν να περάσουν με ορίσματα:

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

Μπορείτε να εφαρμόσετε οποιεσδήποτε επιλογές (δείτε `wdio repl --help`) διαθέσιμες για τη συνεδρία REPL.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

Ένας άλλος τρόπος να χρησιμοποιήσετε το REPL είναι μέσα στις δοκιμές σας μέσω της εντολής [`debug`](/docs/api/browser/debug). Αυτό θα σταματήσει το πρόγραμμα περιήγησης όταν κληθεί και σας επιτρέπει να μεταβείτε στην εφαρμογή (π.χ. στα εργαλεία ανάπτυξης) ή να ελέγξετε το πρόγραμμα περιήγησης από τη γραμμή εντολών. Αυτό είναι χρήσιμο όταν ορισμένες εντολές δεν ενεργοποιούν μια συγκεκριμένη ενέργεια όπως αναμένεται. Με το REPL, μπορείτε στη συνέχεια να δοκιμάσετε τις εντολές για να δείτε ποιες λειτουργούν πιο αξιόπιστα.