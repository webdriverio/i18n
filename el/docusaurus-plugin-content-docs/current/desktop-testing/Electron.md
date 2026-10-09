---
id: electron
title: Electron
description: "Δοκιμάστε εφαρμογές Electron με την υπηρεσία Electron του WebdriverIO, η οποία ρυθμίζει το Chromedriver, εντοπίζει το εκτελέσιμο αρχείο της εφαρμογής σας και σας επιτρέπει να κάνετε mock τα Electron APIs."
---

Το Electron είναι ένα framework για τη δημιουργία εφαρμογών επιφάνειας εργασίας χρησιμοποιώντας JavaScript, HTML και CSS. Ενσωματώνοντας το Chromium και το Node.js στο εκτελέσιμο αρχείο του, το Electron σας επιτρέπει να διατηρείτε μία ενιαία βάση κώδικα JavaScript και να δημιουργείτε εφαρμογές πολλαπλών πλατφορμών που λειτουργούν σε Windows, macOS και Linux — χωρίς να απαιτείται εμπειρία σε native ανάπτυξη.

Το WebdriverIO παρέχει μια ενσωματωμένη υπηρεσία που απλοποιεί την αλληλεπίδραση με την εφαρμογή Electron σας και κάνει τη δοκιμή της πολύ απλή. Τα πλεονεκτήματα της χρήσης του WebdriverIO για τη δοκιμή εφαρμογών Electron είναι:

- 🚗 αυτόματη ρύθμιση του απαιτούμενου Chromedriver
- 📦 αυτόματος εντοπισμός της διαδρομής της εφαρμογής Electron σας - υποστηρίζει [Electron Forge](https://www.electronforge.io/) και [Electron Builder](https://www.electron.build/)
- 🧩 πρόσβαση στα Electron APIs μέσα από τα tests σας
- 🕵️ mocking των Electron APIs μέσω ενός API παρόμοιου με το Vitest

Χρειάζεστε μόνο λίγα απλά βήματα για να ξεκινήσετε. Παρακολουθήστε αυτό το απλό βίντεο εκμάθησης βήμα προς βήμα από το κανάλι [WebdriverIO YouTube](https://www.youtube.com/@webdriverio):

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

Ή ακολουθήστε τον οδηγό στην παρακάτω ενότητα.

## Ξεκινώντας

Για να ξεκινήσετε ένα νέο έργο WebdriverIO, εκτελέστε:

```sh
npm create wdio@latest ./
```

Ένας οδηγός εγκατάστασης θα σας καθοδηγήσει στη διαδικασία. Όταν ερωτηθείτε τι τύπο δοκιμών θέλετε να κάνετε, επιλέξτε _"Desktop Testing - of Electron, Tauri, or macOS Applications"_ και στη συνέχεια επιλέξτε _Electron_ στην ερώτηση για το framework. Έπειτα δώστε τη διαδρομή προς τη μεταγλωττισμένη εφαρμογή Electron σας, π.χ. `./dist`, και στη συνέχεια απλώς διατηρήστε τις προεπιλογές ή τροποποιήστε τις σύμφωνα με τις προτιμήσεις σας.

Ο οδηγός διαμόρφωσης θα εγκαταστήσει όλα τα απαιτούμενα πακέτα και θα δημιουργήσει ένα `wdio.conf.js` ή `wdio.conf.ts` με την απαραίτητη διαμόρφωση για τη δοκιμή της εφαρμογής σας. Αν συμφωνήσετε στην αυτόματη δημιουργία κάποιων αρχείων test, μπορείτε να εκτελέσετε το πρώτο σας test μέσω `npm run wdio`.

## Χειροκίνητη Ρύθμιση

Αν χρησιμοποιείτε ήδη το WebdriverIO στο έργο σας, μπορείτε να παραλείψετε τον οδηγό εγκατάστασης και απλώς να προσθέσετε τις ακόλουθες εξαρτήσεις:

```sh
npm install --save-dev @wdio/electron-service
```

Στη συνέχεια μπορείτε να χρησιμοποιήσετε την ακόλουθη διαμόρφωση:

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

Αυτό ήταν 🎉

Μάθετε περισσότερα σχετικά με το [πώς να διαμορφώσετε την υπηρεσία Electron](/docs/desktop-testing/electron/configuration), [πώς να κάνετε mock τα Electron APIs](/docs/desktop-testing/electron/api-reference) και [πώς να αποκτήσετε πρόσβαση στα Electron APIs](/docs/desktop-testing/electron/api).