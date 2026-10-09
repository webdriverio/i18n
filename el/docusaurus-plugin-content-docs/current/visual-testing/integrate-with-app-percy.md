---
id: integrate-with-app-percy
title: Για Εφαρμογές Κινητών
description: "Ενσωματώστε τα τεστ εφαρμογών κινητών του WebdriverIO με το BrowserStack App Percy για οπτικό έλεγχο, ξεκινώντας με τη ρύθμιση του PERCY_TOKEN."
---

## Ενσωματώστε τα τεστ WebdriverIO με το App Percy

Πριν από την ενσωμάτωση, μπορείτε να εξερευνήσετε το [εκπαιδευτικό υλικό δείγματος build του App Percy για το WebdriverIO](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).
Ενσωματώστε τη σουίτα τεστ σας με το BrowserStack App Percy. Ακολουθεί μια επισκόπηση των βημάτων ενσωμάτωσης:

### Βήμα 1: Δημιουργήστε ένα νέο έργο εφαρμογής στον πίνακα ελέγχου του Percy

[Συνδεθείτε](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) στο Percy και [δημιουργήστε ένα νέο έργο τύπου εφαρμογής](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). Αφού δημιουργήσετε το έργο, θα εμφανιστεί μια μεταβλητή περιβάλλοντος `PERCY_TOKEN`. Το Percy θα χρησιμοποιήσει το `PERCY_TOKEN` για να γνωρίζει σε ποιον οργανισμό και σε ποιο έργο θα ανεβάσει τα στιγμιότυπα οθόνης. Θα χρειαστείτε αυτό το `PERCY_TOKEN` στα επόμενα βήματα.

### Βήμα 2: Ορίστε το token του έργου ως μεταβλητή περιβάλλοντος

Εκτελέστε την παρακάτω εντολή για να ορίσετε το PERCY_TOKEN ως μεταβλητή περιβάλλοντος:

```sh
export PERCY_TOKEN="<your token here>"   // macOS ή Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### Βήμα 3: Εγκαταστήστε τα πακέτα του Percy

Εγκαταστήστε τα στοιχεία που απαιτούνται για τη δημιουργία του περιβάλλοντος ενσωμάτωσης για τη σουίτα τεστ σας.
Για να εγκαταστήσετε τις εξαρτήσεις, εκτελέστε την ακόλουθη εντολή:

```sh
npm install --save-dev @percy/cli
```

### Βήμα 4: Εγκαταστήστε τις εξαρτήσεις

Εγκαταστήστε το Percy Appium app

```sh
npm install --save-dev @percy/appium-app
```

### Βήμα 5: Ενημερώστε το script των τεστ
Βεβαιωθείτε ότι κάνετε import το @percy/appium-app στον κώδικά σας.

Παρακάτω υπάρχει ένα παράδειγμα τεστ που χρησιμοποιεί τη συνάρτηση percyScreenshot. Χρησιμοποιήστε αυτή τη συνάρτηση όπου χρειάζεται να τραβήξετε ένα στιγμιότυπο οθόνης.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
Περνάμε τα απαιτούμενα ορίσματα στη μέθοδο percyScreenshot.

Τα ορίσματα της μεθόδου στιγμιότυπου οθόνης είναι:

```sh
percyScreenshot(driver, name[, options])
```
### Βήμα 6: Εκτελέστε το script των τεστ

Εκτελέστε τα τεστ σας χρησιμοποιώντας το `percy app:exec`.

Αν δεν μπορείτε να χρησιμοποιήσετε την εντολή percy app:exec ή προτιμάτε να εκτελείτε τα τεστ σας μέσω των επιλογών εκτέλεσης του IDE, μπορείτε να χρησιμοποιήσετε τις εντολές percy app:exec:start και percy app:exec:stop. Για να μάθετε περισσότερα, επισκεφθείτε τη σελίδα [Run Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

```sh
$ percy app:exec -- appium test command
```
Αυτή η εντολή εκκινεί το Percy, δημιουργεί ένα νέο build του Percy, τραβάει στιγμιότυπα και τα ανεβάζει στο έργο σας, και τερματίζει το Percy:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## Επισκεφθείτε τις ακόλουθες σελίδες για περισσότερες λεπτομέρειες:
- [Ενσωματώστε τα τεστ WebdriverIO με το Percy](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Σελίδα μεταβλητών περιβάλλοντος](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [Ενσωμάτωση μέσω του BrowserStack SDK](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) αν χρησιμοποιείτε το BrowserStack Automate.


| Πόρος                                                                                                                                                            | Περιγραφή                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [Επίσημη τεκμηρίωση](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | Τεκμηρίωση WebdriverIO του App Percy |
| [Δείγμα build - Εκπαιδευτικό υλικό](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | Εκπαιδευτικό υλικό WebdriverIO του App Percy      |
| [Επίσημο βίντεο](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Οπτικός έλεγχος με το App Percy         |
| [Blog](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Γνωρίστε το App Percy: πλατφόρμα αυτοματοποιημένου οπτικού ελέγχου με τεχνητή νοημοσύνη για native εφαρμογές    |