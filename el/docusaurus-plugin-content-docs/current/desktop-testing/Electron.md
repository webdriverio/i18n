---
id: electron
title: Electron
---

Το Electron είναι ένα πλαίσιο για την ανάπτυξη εφαρμογών επιτραπέζιων υπολογιστών χρησιμοποιώντας JavaScript, HTML και CSS. Ενσωματώνοντας το Chromium και το Node.js στο εκτελέσιμό του, το Electron σας επιτρέπει να διατηρείτε μια βάση κώδικα JavaScript και να δημιουργείτε εφαρμογές για διάφορες πλατφόρμες που λειτουργούν σε Windows, macOS και Linux — χωρίς να απαιτείται εμπειρία στην ανάπτυξη εφαρμογών για συγκεκριμένες πλατφόρμες.

Το WebdriverIO παρέχει μια ολοκληρωμένη υπηρεσία που απλοποιεί την αλληλεπίδραση με την εφαρμογή Electron σας και καθιστά τον έλεγχό της πολύ απλό. Τα πλεονεκτήματα της χρήσης του WebdriverIO για τον έλεγχο εφαρμογών Electron είναι:

- 🚗 αυτόματη ρύθμιση του απαιτούμενου Chromedriver
- 📦 αυτόματος εντοπισμός της διαδρομής της εφαρμογής Electron σας - υποστηρίζει [Electron Forge](https://www.electronforge.io/) και [Electron Builder](https://www.electron.build/)
- 🧩 πρόσβαση στα API του Electron μέσα στους ελέγχους σας
- 🕵️ δημιουργία mockups των API του Electron μέσω ενός API παρόμοιου με το Vitest

Χρειάζεστε μόνο μερικά απλά βήματα για να ξεκινήσετε. Παρακολουθήστε αυτό το απλό βήμα προς βήμα εκπαιδευτικό βίντεο για αρχάριους από το κανάλι [WebdriverIO YouTube](https://www.youtube.com/@webdriverio):

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

Ή ακολουθήστε τον οδηγό στην επόμενη ενότητα.

## Ξεκινώντας

Για να ξεκινήσετε ένα νέο έργο WebdriverIO, εκτελέστε:

```sh
npm create wdio@latest ./
```

Ένας οδηγός εγκατάστασης θα σας καθοδηγήσει στη διαδικασία. Βεβαιωθείτε ότι επιλέγετε _"Desktop Testing - of Electron Applications"_ όταν σας ρωτά τι είδους δοκιμές θέλετε να κάνετε. Στη συνέχεια, δώστε τη διαδρομή προς τη μεταγλωττισμένη εφαρμογή Electron, π.χ. `./dist`, έπειτα απλώς διατηρήστε τις προεπιλογές ή τροποποιήστε τις με βάση τις προτιμήσεις σας.

Ο οδηγός διαμόρφωσης θα εγκαταστήσει όλα τα απαιτούμενα πακέτα και θα δημιουργήσει ένα `wdio.conf.js` ή `wdio.conf.ts` με την απαραίτητη διαμόρφωση για τον έλεγχο της εφαρμογής σας. Αν συμφωνείτε να δημιουργηθούν αυτόματα κάποια αρχεία δοκιμών, μπορείτε να εκτελέσετε την πρώτη σας δοκιμή μέσω `npm run wdio`.

## Χειροκίνητη Ρύθμιση

Αν χρησιμοποιείτε ήδη το WebdriverIO στο έργο σας, μπορείτε να παραλείψετε τον οδηγό εγκατάστασης και απλά να προσθέσετε τις ακόλουθες εξαρτήσεις:

```sh
npm install --save-dev wdio-electron-service
```

Στη συνέχεια, μπορείτε να χρησιμοποιήσετε την ακόλουθη διαμόρφωση:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['electron', {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: [/** ... */],
    }]]
}
```

Αυτό είναι όλο 🎉

Μάθετε περισσότερα σχετικά με το [πώς να διαμορφώσετε την Υπηρεσία Electron](/docs/desktop-testing/electron/configuration), [πώς να δημιουργήσετε mockups των API του Electron](/docs/desktop-testing/electron/mocking) και [πώς να αποκτήσετε πρόσβαση στα API του Electron](/docs/desktop-testing/electron/api).