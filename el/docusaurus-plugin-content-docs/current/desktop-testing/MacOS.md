---
id: macos
title: MacOS
description: "Αυτοματοποιήστε εγγενείς εφαρμογές macOS με το WebdriverIO χρησιμοποιώντας το Appium και τον Mac2 driver, ξεκινώντας από τον οδηγό ρύθμισης του έργου."
---

Το WebdriverIO μπορεί να αυτοματοποιήσει οποιαδήποτε εφαρμογή MacOS χρησιμοποιώντας το [Appium](https://appium.io/). Το μόνο που χρειάζεστε είναι να έχετε εγκατεστημένο το [XCode](https://developer.apple.com/xcode/) στο σύστημά σας, το Appium και τον [Mac2 Driver](https://github.com/appium/appium-mac2-driver) εγκατεστημένα ως εξαρτήσεις και να έχετε ορίσει τα σωστά capabilities.

## Ξεκινώντας

Για να δημιουργήσετε ένα νέο έργο WebdriverIO, εκτελέστε:

```sh
npm create wdio@latest ./
```

Ένας οδηγός εγκατάστασης θα σας καθοδηγήσει στη διαδικασία. Βεβαιωθείτε ότι επιλέγετε _"Desktop Testing - of MacOS Applications"_ όταν σας ρωτήσει τι είδους δοκιμές θέλετε να κάνετε. Στη συνέχεια, απλώς διατηρήστε τις προεπιλογές ή τροποποιήστε τις σύμφωνα με τις προτιμήσεις σας.

Ο οδηγός διαμόρφωσης θα εγκαταστήσει όλα τα απαιτούμενα πακέτα Appium και θα δημιουργήσει ένα αρχείο `wdio.conf.js` ή `wdio.conf.ts` με την απαραίτητη διαμόρφωση για δοκιμές σε MacOS. Αν συμφωνήσατε στην αυτόματη δημιουργία κάποιων αρχείων δοκιμών, μπορείτε να εκτελέσετε την πρώτη σας δοκιμή μέσω `npm run wdio`.

<CreateMacOSProjectAnimation />

Αυτό ήταν 🎉

## Παράδειγμα

Έτσι μπορεί να μοιάζει μια απλή δοκιμή που ανοίγει την εφαρμογή Αριθμομηχανή, κάνει έναν υπολογισμό και επαληθεύει το αποτέλεσμά του:

```js
describe('My Login application', () => {
    it('should set a text to a text view', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    });
})
```

__Σημείωση:__ η εφαρμογή αριθμομηχανής άνοιξε αυτόματα στην αρχή της συνεδρίας επειδή το `'appium:bundleId': 'com.apple.calculator'` ορίστηκε ως επιλογή capability. Μπορείτε να αλλάξετε εφαρμογές οποιαδήποτε στιγμή κατά τη διάρκεια της συνεδρίας.

## Περισσότερες Πληροφορίες

Για πληροφορίες σχετικά με τις ιδιαιτερότητες των δοκιμών σε MacOS, σας συνιστούμε να ρίξετε μια ματιά στο έργο [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).