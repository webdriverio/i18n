---
id: macos
title: MacOS
---

Το WebdriverIO μπορεί να αυτοματοποιήσει οποιαδήποτε εφαρμογή MacOS χρησιμοποιώντας το [Appium](https://appium.io/). Το μόνο που χρειάζεστε είναι το [XCode](https://developer.apple.com/xcode/) εγκατεστημένο στο σύστημά σας, το Appium και τον [Mac2 Driver](https://github.com/appium/appium-mac2-driver) εγκατεστημένα ως εξαρτήσεις και τις σωστές δυνατότητες ρυθμισμένες.

## Ξεκινώντας

Για να ξεκινήσετε ένα νέο έργο WebdriverIO, εκτελέστε:

```sh
npm create wdio@latest ./
```

Ένας οδηγός εγκατάστασης θα σας καθοδηγήσει στη διαδικασία. Βεβαιωθείτε ότι επιλέγετε _"Desktop Testing - of MacOS Applications"_ όταν σας ρωτήσει τι είδους δοκιμές θέλετε να κάνετε. Στη συνέχεια, απλά διατηρήστε τις προεπιλογές ή τροποποιήστε με βάση τις προτιμήσεις σας.

Ο οδηγός διαμόρφωσης θα εγκαταστήσει όλα τα απαιτούμενα πακέτα Appium και θα δημιουργήσει ένα `wdio.conf.js` ή `wdio.conf.ts` με την απαραίτητη διαμόρφωση για δοκιμές στο MacOS. Εάν συμφωνήσατε να δημιουργηθούν αυτόματα κάποια αρχεία δοκιμών, μπορείτε να εκτελέσετε την πρώτη σας δοκιμή μέσω του `npm run wdio`.

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

__Σημείωση:__ η εφαρμογή αριθμομηχανής άνοιξε αυτόματα στην αρχή της συνεδρίας επειδή το `'appium:bundleId': 'com.apple.calculator'` ορίστηκε ως επιλογή δυνατότητας. Μπορείτε να αλλάξετε εφαρμογές κατά τη διάρκεια της συνεδρίας ανά πάσα στιγμή.

## Περισσότερες Πληροφορίες

Για πληροφορίες σχετικά με τις ιδιαιτερότητες των δοκιμών στο MacOS, συνιστούμε να ελέγξετε το έργο [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).