---
id: debugging
title: Αποσφαλμάτωση
---

Η αποσφαλμάτωση είναι σημαντικά πιο δύσκολη όταν αρκετές διεργασίες δημιουργούν δεκάδες δοκιμές σε πολλαπλούς περιηγητές.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Για αρχή, είναι εξαιρετικά χρήσιμο να περιορίσετε τον παραλληλισμό ορίζοντας το `maxInstances` σε `1`, και στοχεύοντας μόνο εκείνες τις προδιαγραφές και τους περιηγητές που χρειάζονται αποσφαλμάτωση.

Στο `wdio.conf`:

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## Η Εντολή Debug

Σε πολλές περιπτώσεις, μπορείτε να χρησιμοποιήσετε το [`browser.debug()`](/docs/api/browser/debug) για να παύσετε τη δοκιμή σας και να επιθεωρήσετε τον περιηγητή.

Η διεπαφή γραμμής εντολών σας θα μεταβεί επίσης σε λειτουργία REPL. Αυτή η λειτουργία σάς επιτρέπει να πειραματιστείτε με εντολές και στοιχεία στη σελίδα. Στη λειτουργία REPL, μπορείτε να έχετε πρόσβαση στο αντικείμενο `browser`&mdash;ή στις συναρτήσεις `$` και `$$`&mdash;όπως μπορείτε στις δοκιμές σας.

Όταν χρησιμοποιείτε το `browser.debug()`, πιθανότατα θα χρειαστεί να αυξήσετε το χρονικό όριο του test runner για να αποτρέψετε την αποτυχία της δοκιμής λόγω υπέρβασης χρόνου. Για παράδειγμα:

Στο `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Δείτε [timeouts](timeouts) για περισσότερες πληροφορίες σχετικά με το πώς να το κάνετε αυτό χρησιμοποιώντας άλλα πλαίσια.

Για να συνεχίσετε με τις δοκιμές μετά την αποσφαλμάτωση, στο κέλυφος χρησιμοποιήστε τη συντόμευση `^C` ή την εντολή `.exit`.

## Δυναμική διαμόρφωση

Σημειώστε ότι το `wdio.conf.js` μπορεί να περιέχει Javascript. Επειδή πιθανότατα δεν θέλετε να αλλάξετε μόνιμα την τιμή του χρονικού ορίου σας σε 1 ημέρα, μπορεί συχνά να είναι χρήσιμο να αλλάξετε αυτές τις ρυθμίσεις από τη γραμμή εντολών χρησιμοποιώντας μια μεταβλητή περιβάλλοντος.

Χρησιμοποιώντας αυτή την τεχνική, μπορείτε να αλλάξετε δυναμικά τη διαμόρφωση:

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

Μπορείτε στη συνέχεια να προσθέσετε ως πρόθεμα την εντολή `wdio` με τη σημαία `debug`:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...και να κάνετε αποσφαλμάτωση του αρχείου προδιαγραφών σας με το DevTools!

## Αποσφαλμάτωση με το Visual Studio Code (VSCode)

Εάν θέλετε να κάνετε αποσφαλμάτωση στις δοκιμές σας με σημεία διακοπής στο τελευταίο VSCode, έχετε δύο επιλογές για την εκκίνηση του debugger, από τις οποίες η επιλογή 1 είναι η ευκολότερη μέθοδος:
 1. αυτόματη σύνδεση του debugger
 2. σύνδεση του debugger χρησιμοποιώντας ένα αρχείο διαμόρφωσης

### VSCode Toggle Auto Attach

Μπορείτε να συνδέσετε αυτόματα τον debugger ακολουθώντας αυτά τα βήματα στο VSCode:
 - Πατήστε CMD + Shift + P (Linux και Macos) ή CTRL + Shift + P (Windows)
 - Πληκτρολογήστε "attach" στο πεδίο εισαγωγής
 - Επιλέξτε "Debug: Toggle Auto Attach"
 - Επιλέξτε "Only With Flag"

 Αυτό είναι! Τώρα όταν τρέχετε τις δοκιμές σας (θυμηθείτε ότι θα χρειαστείτε τη σημαία --inspect να οριστεί στη διαμόρφωσή σας όπως δείχθηκε νωρίτερα) θα ξεκινήσει αυτόματα ο debugger και θα σταματήσει στο πρώτο σημείο διακοπής που θα συναντήσει.

### Αρχείο διαμόρφωσης VSCode

Είναι δυνατόν να εκτελέσετε όλα ή επιλεγμένα αρχεία προδιαγραφών. Οι διαμορφώσεις αποσφαλμάτωσης πρέπει να προστεθούν στο `.vscode/launch.json`, για να κάνετε αποσφαλμάτωση σε επιλεγμένες προδιαγραφές προσθέστε την ακόλουθη διαμόρφωση:
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

Για να εκτελέσετε όλα τα αρχεία προδιαγραφών, αφαιρέστε το `"--spec", "${file}"` από το `"args"`

Παράδειγμα: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

Πρόσθετες πληροφορίες: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Δυναμικό Repl με το Atom

Εάν είστε [Atom](https://atom.io/) hacker μπορείτε να δοκιμάσετε το [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) από τον [@kurtharriger](https://github.com/kurtharriger) που είναι ένα δυναμικό repl που σας επιτρέπει να εκτελείτε μεμονωμένες γραμμές κώδικα στο Atom. Παρακολουθήστε [αυτό](https://www.youtube.com/watch?v=kdM05ChhLQE) το βίντεο στο YouTube για να δείτε μια επίδειξη.

## Αποσφαλμάτωση με WebStorm / Intellij
Μπορείτε να δημιουργήσετε μια διαμόρφωση αποσφαλμάτωσης node.js όπως αυτή:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Παρακολουθήστε αυτό το [βίντεο YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8) για περισσότερες πληροφορίες σχετικά με τον τρόπο δημιουργίας μιας διαμόρφωσης.

## Αποσφαλμάτωση ασταθών δοκιμών

Οι ασταθείς δοκιμές μπορεί να είναι πραγματικά δύσκολο να αποσφαλματωθούν, οπότε εδώ είναι μερικές συμβουλές για το πώς μπορείτε να προσπαθήσετε να αναπαράγετε τοπικά το ασταθές αποτέλεσμα που πήρατε στο CI σας.

### Δίκτυο
Για αποσφαλμάτωση ασταθειών που σχετίζονται με το δίκτυο, χρησιμοποιήστε την εντολή [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Ταχύτητα απόδοσης
Για αποσφαλμάτωση ασταθειών που σχετίζονται με την ταχύτητα της συσκευής, χρησιμοποιήστε την εντολή [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Αυτό θα προκαλέσει πιο αργή απόδοση των σελίδων σας, κάτι που μπορεί να προκληθεί από πολλά πράγματα όπως η εκτέλεση πολλαπλών διεργασιών στο CI σας που θα μπορούσαν να επιβραδύνουν τις δοκιμές σας.
```js
await browser.throttleCPU(4)
```

### Ταχύτητα εκτέλεσης δοκιμών

Αν οι δοκιμές σας δεν φαίνεται να επηρεάζονται, είναι πιθανό το WebdriverIO να είναι ταχύτερο από την ενημέρωση του frontend framework / περιηγητή. Αυτό συμβαίνει όταν χρησιμοποιούνται σύγχρονοι ισχυρισμοί (assertions) καθώς το WebdriverIO δεν έχει τη δυνατότητα να επαναλάβει αυτούς τους ισχυρισμούς. Μερικά παραδείγματα κώδικα που μπορεί να αποτύχουν λόγω αυτού:
```js
expect(elementList.length).toEqual(7) // η λίστα μπορεί να μην έχει συμπληρωθεί τη στιγμή του ισχυρισμού
expect(await elem.getText()).toEqual('this button was clicked 3 times') // το κείμενο μπορεί να μην έχει ενημερωθεί ακόμα τη στιγμή του ισχυρισμού με αποτέλεσμα σφάλμα ("this button was clicked 2 times" δεν ταιριάζει με το αναμενόμενο "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // μπορεί να μην εμφανίζεται ακόμα
```
Για την επίλυση αυτού του προβλήματος, θα πρέπει να χρησιμοποιηθούν ασύγχρονοι ισχυρισμοί. Τα παραπάνω παραδείγματα θα μοιάζουν έτσι:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Χρησιμοποιώντας αυτούς τους ισχυρισμούς, το WebdriverIO θα περιμένει αυτόματα μέχρι η συνθήκη να ταιριάζει. Όταν ισχυρίζεστε κείμενο, αυτό σημαίνει ότι το στοιχείο πρέπει να υπάρχει και το κείμενο πρέπει να είναι ίσο με την αναμενόμενη τιμή.
Μιλάμε περισσότερο για αυτό στον [Οδηγό Βέλτιστων Πρακτικών](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).