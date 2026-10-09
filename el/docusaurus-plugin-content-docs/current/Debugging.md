---
id: debugging
title: Αποσφαλμάτωση
description: "Αποσφαλμάτωση δοκιμών WebdriverIO με το browser.debug, σημεία διακοπής στο VS Code ή στο WebStorm, στρατηγικές για ασταθείς δοκιμές, καθώς και δημιουργία προφίλ CPU και heap."
---

Η αποσφαλμάτωση είναι σημαντικά πιο δύσκολη όταν πολλές διεργασίες εκκινούν δεκάδες δοκιμές σε πολλαπλά προγράμματα περιήγησης.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Για αρχή, είναι εξαιρετικά χρήσιμο να περιορίσετε τον παραλληλισμό ορίζοντας το `maxInstances` σε `1` και στοχεύοντας μόνο εκείνα τα specs και προγράμματα περιήγησης που χρειάζονται αποσφαλμάτωση.

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

## Η εντολή Debug

Σε πολλές περιπτώσεις, μπορείτε να χρησιμοποιήσετε το [`browser.debug()`](/docs/api/browser/debug) για να παύσετε τη δοκιμή σας και να επιθεωρήσετε το πρόγραμμα περιήγησης.

Η διεπαφή γραμμής εντολών σας θα μεταβεί επίσης σε λειτουργία REPL. Αυτή η λειτουργία σάς επιτρέπει να πειραματιστείτε με εντολές και στοιχεία της σελίδας. Σε λειτουργία REPL, μπορείτε να έχετε πρόσβαση στο αντικείμενο `browser`&mdash;ή στις συναρτήσεις `$` και `$$`&mdash;όπως ακριβώς και στις δοκιμές σας.

Όταν χρησιμοποιείτε το `browser.debug()`, πιθανότατα θα χρειαστεί να αυξήσετε το χρονικό όριο του test runner, ώστε να μην αποτύχει η δοκιμή επειδή διαρκεί πολύ. Για παράδειγμα:

Στο `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Δείτε τα [χρονικά όρια](timeouts) για περισσότερες πληροφορίες σχετικά με το πώς να το κάνετε αυτό με άλλα frameworks.

Για να συνεχίσετε με τις δοκιμές μετά την αποσφαλμάτωση, χρησιμοποιήστε στο shell τη συντόμευση `^C` ή την εντολή `.exit`.

### Παύση για έναν coding agent (`--debug=agent`)

Το `wdio run --debug=agent` αυξάνει το χρονικό όριο του framework στις 24 ώρες και παύει τον worker όταν ένα spec καλεί το `await browser.debug()` ή όταν μια δοκιμή αποτυγχάνει. Η εκτέλεση εμφανίζει μια γραμμή όπως:

```text
Paused in cart.e2e.ts › adds a blue t-shirt. Inspect with `wdio session -s debug-0-0 snapshot`, continue with `wdio session -s debug-0-0 resume`.
```

Επιθεωρήστε το πρόγραμμα περιήγησης σε παύση με το [`wdio session`](/docs/session/debug) (`snapshot`, `exec`, …) και, στη συνέχεια, εκτελέστε `wdio session -s debug-0-0 resume` για να συνεχίσετε. Το `wdio session -s debug-0-0 close` αποτυγχάνει τη δοκιμή σε παύση με το μήνυμα `Session closed from wdio session`. Το όνομα της συνεδρίας είναι `debug-<cid>` (`debug-0-0` για τον πρώτο worker). Η υπόλοιπη ροή εργασιών περιγράφεται στην ενότητα [WebdriverIO Session](/docs/session).
## Δυναμική διαμόρφωση

Σημειώστε ότι το `wdio.conf.js` μπορεί να περιέχει Javascript. Επειδή πιθανότατα δεν θέλετε να αλλάξετε μόνιμα την τιμή του χρονικού ορίου σε 1 ημέρα, είναι συχνά χρήσιμο να αλλάζετε αυτές τις ρυθμίσεις από τη γραμμή εντολών χρησιμοποιώντας μια μεταβλητή περιβάλλοντος.

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

Στη συνέχεια, μπορείτε να προτάξετε τη σημαία `debug` στην εντολή `wdio`:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...και να αποσφαλματώσετε το αρχείο spec σας με τα DevTools!

## Αποσφαλμάτωση με το Visual Studio Code (VSCode)

Αν θέλετε να αποσφαλματώσετε τις δοκιμές σας με σημεία διακοπής στην πιο πρόσφατη έκδοση του VSCode, έχετε δύο επιλογές για την εκκίνηση του debugger, από τις οποίες η επιλογή 1 είναι η ευκολότερη μέθοδος:
 1. αυτόματη σύνδεση του debugger
 2. σύνδεση του debugger μέσω αρχείου διαμόρφωσης

### VSCode Toggle Auto Attach

Μπορείτε να συνδέσετε αυτόματα τον debugger ακολουθώντας αυτά τα βήματα στο VSCode:
 - Πατήστε CMD + Shift + P (Linux και Macos) ή CTRL + Shift + P (Windows)
 - Πληκτρολογήστε "attach" στο πεδίο εισαγωγής
 - Επιλέξτε "Debug: Toggle Auto Attach"
 - Επιλέξτε "Only With Flag"

 Αυτό είναι όλο! Τώρα, όταν εκτελείτε τις δοκιμές σας (θυμηθείτε ότι θα χρειαστεί να έχετε ορίσει τη σημαία --inspect στη διαμόρφωσή σας, όπως φαίνεται παραπάνω), θα ξεκινήσει αυτόματα ο debugger και θα σταματήσει στο πρώτο σημείο διακοπής που θα συναντήσει.

### Αρχείο διαμόρφωσης VSCode

Είναι δυνατή η εκτέλεση όλων ή επιλεγμένων αρχείων spec. Οι διαμορφώσεις αποσφαλμάτωσης πρέπει να προστεθούν στο `.vscode/launch.json`. Για να αποσφαλματώσετε ένα επιλεγμένο spec, προσθέστε την ακόλουθη διαμόρφωση:
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

Για να εκτελέσετε όλα τα αρχεία spec, αφαιρέστε το `"--spec", "${file}"` από το `"args"`

Παράδειγμα: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

Επιπλέον πληροφορίες: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Δυναμικό Repl με το Atom

Αν είστε [Atom](https://atom.io/) hacker, μπορείτε να δοκιμάσετε το [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) του [@kurtharriger](https://github.com/kurtharriger), το οποίο είναι ένα δυναμικό repl που σας επιτρέπει να εκτελείτε μεμονωμένες γραμμές κώδικα στο Atom. Παρακολουθήστε [αυτό](https://www.youtube.com/watch?v=kdM05ChhLQE) το βίντεο στο YouTube για να δείτε μια επίδειξη.

## Αποσφαλμάτωση με το WebStorm / Intellij
Μπορείτε να δημιουργήσετε μια διαμόρφωση αποσφαλμάτωσης node.js όπως αυτή:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Παρακολουθήστε αυτό το [βίντεο στο YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8) για περισσότερες πληροφορίες σχετικά με τον τρόπο δημιουργίας μιας διαμόρφωσης.

## Αποσφαλμάτωση ασταθών δοκιμών

Οι ασταθείς (flaky) δοκιμές μπορεί να είναι πραγματικά δύσκολο να αποσφαλματωθούν, οπότε ακολουθούν μερικές συμβουλές για το πώς μπορείτε να προσπαθήσετε να αναπαράγετε τοπικά το ασταθές αποτέλεσμα που λάβατε στο CI σας.

### Δίκτυο
Για να αποσφαλματώσετε αστάθεια που σχετίζεται με το δίκτυο, χρησιμοποιήστε την εντολή [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Ταχύτητα απόδοσης (rendering)
Για να αποσφαλματώσετε αστάθεια που σχετίζεται με την ταχύτητα της συσκευής, χρησιμοποιήστε την εντολή [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Αυτό θα κάνει τις σελίδες σας να αποδίδονται πιο αργά, κάτι που μπορεί να προκληθεί από πολλούς παράγοντες, όπως η εκτέλεση πολλαπλών διεργασιών στο CI σας, που ενδέχεται να επιβραδύνει τις δοκιμές σας.
```js
await browser.throttleCPU(4)
```

### Ταχύτητα εκτέλεσης δοκιμών

Αν οι δοκιμές σας δεν φαίνεται να επηρεάζονται, είναι πιθανό το WebdriverIO να είναι ταχύτερο από την ενημέρωση του frontend framework / προγράμματος περιήγησης. Αυτό συμβαίνει όταν χρησιμοποιούνται σύγχρονοι έλεγχοι (assertions), καθώς το WebdriverIO δεν έχει πλέον τη δυνατότητα να επαναλάβει αυτούς τους ελέγχους. Μερικά παραδείγματα κώδικα που μπορεί να αποτύχει εξαιτίας αυτού:
```js
expect(elementList.length).toEqual(7) // list might not be populated at the time of the assertion
expect(await elem.getText()).toEqual('this button was clicked 3 times') // text might not be updated yet at the time of assertion resulting in an error ("this button was clicked 2 times" does not match the expected "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // might not be displayed yet
```
Για να επιλυθεί αυτό το πρόβλημα, θα πρέπει να χρησιμοποιούνται ασύγχρονοι έλεγχοι. Τα παραπάνω παραδείγματα θα έμοιαζαν έτσι:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Χρησιμοποιώντας αυτούς τους ελέγχους, το WebdriverIO θα περιμένει αυτόματα μέχρι να ικανοποιηθεί η συνθήκη. Κατά τον έλεγχο κειμένου, αυτό σημαίνει ότι το στοιχείο πρέπει να υπάρχει και το κείμενο να είναι ίσο με την αναμενόμενη τιμή.
Αναφερόμαστε σε αυτό αναλυτικότερα στον [Οδηγό Βέλτιστων Πρακτικών](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).

## Δημιουργία προφίλ απόδοσης

Το WebdriverIO σάς επιτρέπει να καταγράφετε προφίλ απόδοσης των δοκιμών σας για να εντοπίζετε σημεία συμφόρησης στην εκτέλεση των δοκιμών ή διαρροές μνήμης. Αυτό χρησιμοποιεί τις εγγενείς δυνατότητες δημιουργίας προφίλ του Node.js.

### Δημιουργία προφίλ CPU

Για να καταγράψετε ένα προφίλ CPU, μπορείτε να χρησιμοποιήσετε τη σημαία CLI `--cpu-prof` ή να ορίσετε `cpuProf: true` στη διαμόρφωσή σας.

```bash
npx wdio run wdio.conf.js --cpu-prof
```

Αυτό θα δημιουργήσει ένα αρχείο `.cpuprofile` στον κατάλογο `./profiles` (προεπιλογή) για κάθε διεργασία worker. Μπορείτε να φορτώσετε αυτό το αρχείο στο **Chrome DevTools > Performance > Load Profile** για να αναλύσετε την εκτέλεση.

### Δημιουργία προφίλ Heap

Για να καταγράψετε ένα προφίλ Heap, χρησιμοποιήστε τη σημαία CLI `--heap-prof` ή ορίστε `heapProf: true` στη διαμόρφωσή σας.

```bash
npx wdio run wdio.conf.js --heap-prof
```

Αυτό δημιουργεί ένα αρχείο `.heapprofile` στον κατάλογο `./profiles` (χρησιμοποιεί sampling heap profiler). Μπορείτε να το φορτώσετε στο **Chrome DevTools > Memory > Load** για να αναλύσετε τη χρήση μνήμης.

### Μετρικές χρονισμού

Όταν η δημιουργία προφίλ είναι ενεργοποιημένη, το WebdriverIO καταγράφει επίσης αυτόματα μετρικές χρονισμού για τις φάσεις προετοιμασίας (setup), εκτέλεσης (execution) και τερματισμού (teardown) της δοκιμής σας, βοηθώντας σας να κατανοήσετε πού δαπανάται ο χρόνος.

```
📊 Performance Metrics:
────────────────────────────────────────
  Setup:     1.25s
  Execution: 3.42s
  Teardown:  0.15s
```