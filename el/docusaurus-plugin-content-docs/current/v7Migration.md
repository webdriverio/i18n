---
id: v7-migration
title: Από την v6 στην v7
description: "Αναβαθμίστε ένα έργο WebdriverIO από την v6 στην v7 ενημερώνοντας τις εξαρτήσεις, μετασχηματίζοντας το αρχείο ρυθμίσεων και ενημερώνοντας τους ορισμούς βημάτων του Cucumber."
---

Αυτός ο οδηγός απευθύνεται σε όσους χρησιμοποιούν ακόμη την `v6` του WebdriverIO και θέλουν να μεταβούν στην `v7`. Όπως αναφέρθηκε στην [ανάρτηση του blog για την κυκλοφορία](https://webdriver.io/blog/2021/02/09/webdriverio-v7-released), οι αλλαγές είναι κυρίως εσωτερικές και η αναβάθμιση θα πρέπει να είναι μια απλή διαδικασία.

:::info

Αν χρησιμοποιείτε το WebdriverIO `v5` ή παλαιότερη έκδοση, αναβαθμίστε πρώτα στην `v6`. Δείτε τον [οδηγό μετάβασης στην v6](v6-migration).

:::

Παρόλο που θα θέλαμε πολύ να έχουμε μια πλήρως αυτοματοποιημένη διαδικασία για αυτό, η πραγματικότητα είναι διαφορετική. Ο καθένας έχει διαφορετική διαμόρφωση. Κάθε βήμα θα πρέπει να θεωρείται περισσότερο ως καθοδήγηση και λιγότερο ως οδηγία βήμα προς βήμα. Αν αντιμετωπίσετε προβλήματα με τη μετάβαση, μη διστάσετε να [επικοινωνήσετε μαζί μας](https://github.com/webdriverio/codemod/discussions/new).

## Ρύθμιση

Όπως και σε άλλες μεταβάσεις, μπορούμε να χρησιμοποιήσουμε το [codemod](https://github.com/webdriverio/codemod) του WebdriverIO. Για αυτόν τον οδηγό χρησιμοποιούμε ένα [boilerplate έργο](https://github.com/WarleyGabriel/demo-webdriverio-cucumber) που υποβλήθηκε από ένα μέλος της κοινότητας και το μεταφέρουμε πλήρως από την `v6` στην `v7`.

Για να εγκαταστήσετε το codemod, εκτελέστε:

```sh
npm install jscodeshift @wdio/codemod
```

#### Commits:

- _install codemod deps_ [[6ec9e52]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/6ec9e52038f7e8cb1221753b67040b0f23a8f61a)

## Αναβάθμιση των εξαρτήσεων του WebdriverIO

Δεδομένου ότι όλες οι εκδόσεις του WebdriverIO είναι στενά συνδεδεμένες μεταξύ τους, είναι καλύτερο να αναβαθμίζετε πάντα σε ένα συγκεκριμένο tag, π.χ. `latest`. Για να το κάνουμε αυτό, αντιγράφουμε όλες τις εξαρτήσεις που σχετίζονται με το WebdriverIO από το `package.json` μας και τις επανεγκαθιστούμε μέσω:

```sh
npm i --save-dev @wdio/allure-reporter@7 @wdio/cli@7 @wdio/cucumber-framework@7 @wdio/local-runner@7 @wdio/spec-reporter@7 @wdio/sync@7 wdio-chromedriver-service@7 wdio-timeline-reporter@7 webdriverio@7
```

Συνήθως οι εξαρτήσεις του WebdriverIO αποτελούν μέρος των dev dependencies, αν και αυτό μπορεί να διαφέρει ανάλογα με το έργο σας. Μετά από αυτό, τα `package.json` και `package-lock.json` σας θα πρέπει να έχουν ενημερωθεί. __Σημείωση:__ αυτές είναι οι εξαρτήσεις που χρησιμοποιούνται από το [παράδειγμα έργου](https://github.com/WarleyGabriel/demo-webdriverio-cucumber), οι δικές σας μπορεί να διαφέρουν.

#### Commits:

- _updated dependencies_ [[7097ab6]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/7097ab6297ef9f37ead0a9c2ce9fce8d0765458d)

## Μετασχηματισμός του αρχείου ρυθμίσεων

Ένα καλό πρώτο βήμα είναι να ξεκινήσετε με το αρχείο ρυθμίσεων. Στο WebdriverIO `v7` δεν απαιτείται πλέον η χειροκίνητη καταχώριση κανενός compiler. Στην πραγματικότητα, πρέπει να αφαιρεθούν. Αυτό μπορεί να γίνει πλήρως αυτόματα με το codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./wdio.conf.js
```

:::caution

Το codemod δεν υποστηρίζει ακόμη έργα TypeScript. Δείτε το [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Εργαζόμαστε για να υλοποιήσουμε σύντομα την υποστήριξή τους. Αν χρησιμοποιείτε TypeScript, συμμετέχετε κι εσείς!

:::

#### Commits:

- _transpile config file_ [[6015534]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/60155346a386380d8a77ae6d1107483043a43994)

## Ενημέρωση των ορισμών βημάτων

Αν χρησιμοποιείτε Jasmine ή Mocha, έχετε τελειώσει εδώ. Το τελευταίο βήμα είναι να ενημερώσετε τα imports του Cucumber.js από `cucumber` σε `@cucumber/cucumber`. Αυτό μπορεί επίσης να γίνει αυτόματα μέσω του codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v7 ./src/e2e/*
```

Αυτό ήταν! Δεν χρειάζονται άλλες αλλαγές 🎉

#### Commits:

- _transpile step definitions_ [[8c97b90]](https://github.com/WarleyGabriel/demo-webdriverio-cucumber/pull/11/commits/8c97b90a8b9197c62dffe4e2954f7dad814753cc)

## Συμπέρασμα

Ελπίζουμε ότι αυτός ο οδηγός σας καθοδηγεί λίγο στη διαδικασία μετάβασης στο WebdriverIO `v7`. Η κοινότητα συνεχίζει να βελτιώνει το codemod, ενώ το δοκιμάζει με διάφορες ομάδες σε διάφορους οργανισμούς. Μη διστάσετε να [ανοίξετε ένα issue](https://github.com/webdriverio/codemod/issues/new) αν έχετε σχόλια ή να [ξεκινήσετε μια συζήτηση](https://github.com/webdriverio/codemod/discussions/new) αν δυσκολεύεστε κατά τη διαδικασία μετάβασης.