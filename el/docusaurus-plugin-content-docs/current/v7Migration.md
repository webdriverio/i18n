---
id: v7-migration
title: Από το v6 στο v7
---

Αυτό το σεμινάριο απευθύνεται σε άτομα που εξακολουθούν να χρησιμοποιούν την έκδοση `v6` του WebdriverIO και θέλουν να μεταβούν στην έκδοση `v7`. Όπως αναφέρεται στην [ανάρτηση του ιστολογίου για την κυκλοφορία](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released), οι αλλαγές είναι κυρίως εσωτερικές και η αναβάθμιση θα πρέπει να είναι μια απλή διαδικασία.

:::info

Εάν χρησιμοποιείτε το WebdriverIO `v5` ή παλαιότερη έκδοση, παρακαλούμε αναβαθμίστε πρώτα στην έκδοση `v6`. Ανατρέξτε στον [οδηγό μετάβασης στο v6](v6-migration).

:::

Παρόλο που θα θέλαμε να έχουμε μια πλήρως αυτοματοποιημένη διαδικασία για αυτό, η πραγματικότητα είναι διαφορετική. Ο καθένας έχει διαφορετική εγκατάσταση. Κάθε βήμα θα πρέπει να αντιμετωπίζεται ως καθοδήγηση και λιγότερο ως οδηγίες βήμα προς βήμα. Εάν αντιμετωπίζετε προβλήματα με τη μετάβαση, μη διστάσετε να [επικοινωνήσετε μαζί μας](https://github.com/webdriverio/codemod/discussions/new).

## Εγκατάσταση

Παρόμοια με άλλες μεταβάσεις, μπορούμε να χρησιμοποιήσουμε το [codemod](https://github.com/webdriverio/codemod) του WebdriverIO. Για αυτό το σεμινάριο, χρησιμοποιούμε ένα [έτοιμο έργο](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) που υποβλήθηκε από ένα μέλος της κοινότητας και το μεταφέρουμε πλήρως από την έκδοση `v6` στην έκδοση `v7`.

Για να εγκαταστήσετε το codemod, εκτελέστε:

```sh
npm install jscodeshift @wdio/codemod
```

#### Commits:

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## Αναβάθμιση των Εξαρτήσεων του WebdriverIO

Δεδομένου ότι όλες οι εκδόσεις του WebdriverIO είναι συνδεδεμένες μεταξύ τους, είναι καλύτερο να αναβαθμίζετε πάντα σε μια συγκεκριμένη ετικέτα, π.χ. `latest`. Για να το κάνετε αυτό, αντιγράψτε όλες τις σχετικές εξαρτήσεις του WebdriverIO από το `package.json` και επανεγκαταστήστε τις μέσω:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

Συνήθως οι εξαρτήσεις του WebdriverIO αποτελούν μέρος των εξαρτήσεων ανάπτυξης, αν και αυτό μπορεί να διαφέρει ανάλογα με το έργο σας. Μετά από αυτό, τα αρχεία `package.json` και `package-lock.json` θα πρέπει να ενημερωθούν. __Σημείωση:__ αυτές είναι οι εξαρτήσεις που χρησιμοποιούνται από το [παράδειγμα έργου](https://github.com/WarleyGabriel/demo-webdriverio-cucumber), οι δικές σας μπορεί να διαφέρουν.

#### Commits:

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## Μετατροπή του Αρχείου Διαμόρφωσης

Ένα καλό πρώτο βήμα είναι να ξεκινήσετε με το αρχείο διαμόρφωσης. Στο WebdriverIO `v7` δεν χρειάζεται πλέον να καταχωρούμε χειροκίνητα οποιουσδήποτε μεταγλωττιστές. Στην πραγματικότητα, πρέπει να αφαιρεθούν. Αυτό μπορεί να γίνει με το codemod εντελώς αυτόματα:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

Το codemod δεν υποστηρίζει ακόμα έργα TypeScript. Δείτε το [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Εργαζόμαστε για την υλοποίηση υποστήριξης σύντομα. Εάν χρησιμοποιείτε TypeScript, παρακαλούμε συμμετέχετε!

:::

#### Commits:

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## Ενημέρωση των Ορισμών Βημάτων

Εάν χρησιμοποιείτε Jasmine ή Mocha, έχετε τελειώσει εδώ. Το τελευταίο βήμα είναι να ενημερώσετε τις εισαγωγές του Cucumber.js από `cucumber` σε `@cucumber/cucumber`. Αυτό μπορεί επίσης να γίνει μέσω του codemod αυτόματα:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

Αυτό ήταν! Δεν χρειάζονται άλλες αλλαγές 🎉

#### Commits:

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## Συμπέρασμα

Ελπίζουμε ότι αυτό το σεμινάριο σας καθοδηγεί λίγο μέσω της διαδικασίας μετάβασης στο WebdriverIO `v7`. Η κοινότητα συνεχίζει να βελτιώνει το codemod δοκιμάζοντάς το με διάφορες ομάδες σε διάφορους οργανισμούς. Μη διστάσετε να [υποβάλετε ένα ζήτημα](https://github.com/webdriverio/codemod/issues/new) εάν έχετε σχόλια ή να [ξεκινήσετε μια συζήτηση](https://github.com/webdriverio/codemod/discussions/new) εάν αντιμετωπίζετε δυσκολίες κατά τη διαδικασία μετάβασης.