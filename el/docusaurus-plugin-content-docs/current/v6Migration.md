---
id: v6-migration
title: Από v5 σε v6
description: "Αναβαθμίστε ένα έργο WebdriverIO από v5 σε v6 ενημερώνοντας τις εξαρτήσεις, μετασχηματίζοντας το αρχείο διαμόρφωσης και ενημερώνοντας τα specs και τα page objects."
---

Αυτός ο οδηγός απευθύνεται σε όσους χρησιμοποιούν ακόμα την `v5` του WebdriverIO και θέλουν να μεταβούν στην `v6` ή στην πιο πρόσφατη έκδοση του WebdriverIO. Όπως αναφέρθηκε στην [ανάρτηση ιστολογίου για την κυκλοφορία](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released), οι αλλαγές αυτής της αναβάθμισης έκδοσης μπορούν να συνοψιστούν ως εξής:

- ενοποιήσαμε τις παραμέτρους για ορισμένες εντολές (π.χ. `newWindow`, `react$`, `react$$`, `waitUntil`, `dragAndDrop`, `moveTo`, `waitForDisplayed`, `waitForEnabled`, `waitForExist`) και μεταφέραμε όλες τις προαιρετικές παραμέτρους σε ένα ενιαίο αντικείμενο, π.χ.

    ```js
    // v5
    browser.newWindow(
        'https://webdriver.io',
        'WebdriverIO window',
        'width=420,height=230,resizable,scrollbars=yes,status=1'
    )
    // v6
    browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1'
    })
    ```

- οι ρυθμίσεις των services μεταφέρθηκαν στη λίστα των services, π.χ.

    ```js
    // v5
    exports.config = {
        services: ['sauce'],
        sauceConnect: true,
        sauceConnectOpts: { foo: 'bar' },
    }
    // v6
    exports.config = {
        services: [['sauce', {
            sauceConnect: true,
            sauceConnectOpts: { foo: 'bar' }
        }]],
    }
    ```

- ορισμένες επιλογές των services μετονομάστηκαν για λόγους απλούστευσης
- μετονομάσαμε την εντολή `launchApp` σε `launchChromeApp` για συνεδρίες Chrome WebDriver

:::info

Αν χρησιμοποιείτε WebdriverIO `v4` ή παλαιότερη, παρακαλούμε αναβαθμίστε πρώτα σε `v5`.

:::

Παρόλο που θα θέλαμε πολύ να έχουμε μια πλήρως αυτοματοποιημένη διαδικασία για αυτό, η πραγματικότητα είναι διαφορετική. Ο καθένας έχει διαφορετική διαμόρφωση. Κάθε βήμα θα πρέπει να θεωρείται περισσότερο ως καθοδήγηση και λιγότερο ως οδηγία βήμα προς βήμα. Αν αντιμετωπίσετε προβλήματα με τη μετάβαση, μη διστάσετε να [επικοινωνήσετε μαζί μας](https://github.com/webdriverio/codemod/discussions/new).

## Ρύθμιση

Όπως και σε άλλες μεταβάσεις, μπορούμε να χρησιμοποιήσουμε το [codemod](https://github.com/webdriverio/codemod) του WebdriverIO. Για να εγκαταστήσετε το codemod, εκτελέστε:

```sh
npm install jscodeshift @wdio/codemod
```

## Αναβάθμιση Εξαρτήσεων WebdriverIO

Δεδομένου ότι όλες οι εκδόσεις του WebdriverIO είναι στενά συνδεδεμένες μεταξύ τους, είναι καλύτερο να αναβαθμίζετε πάντα σε ένα συγκεκριμένο tag, π.χ. `6.12.0`. Αν αποφασίσετε να αναβαθμίσετε απευθείας από `v5` σε `v7`, μπορείτε να παραλείψετε το tag και να εγκαταστήσετε τις πιο πρόσφατες εκδόσεις όλων των πακέτων. Για να το κάνουμε αυτό, αντιγράφουμε όλες τις εξαρτήσεις που σχετίζονται με το WebdriverIO από το `package.json` μας και τις επανεγκαθιστούμε μέσω:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

Συνήθως οι εξαρτήσεις του WebdriverIO αποτελούν μέρος των dev dependencies, αν και αυτό μπορεί να διαφέρει ανάλογα με το έργο σας. Μετά από αυτό, τα `package.json` και `package-lock.json` σας θα πρέπει να έχουν ενημερωθεί. __Σημείωση:__ αυτές είναι ενδεικτικές εξαρτήσεις, οι δικές σας μπορεί να διαφέρουν. Βεβαιωθείτε ότι βρίσκετε την πιο πρόσφατη έκδοση v6 εκτελώντας, π.χ.:

```sh
npm show webdriverio versions
```

Προσπαθήστε να εγκαταστήσετε την πιο πρόσφατη διαθέσιμη έκδοση 6 για όλα τα βασικά πακέτα του WebdriverIO. Για τα πακέτα της κοινότητας αυτό μπορεί να διαφέρει από πακέτο σε πακέτο. Εδώ συνιστούμε να ελέγξετε το changelog για πληροφορίες σχετικά με το ποια έκδοση εξακολουθεί να είναι συμβατή με την v6.

## Μετασχηματισμός Αρχείου Διαμόρφωσης

Ένα καλό πρώτο βήμα είναι να ξεκινήσετε με το αρχείο διαμόρφωσης. Όλες οι αλλαγές που σπάνε τη συμβατότητα μπορούν να επιλυθούν πλήρως αυτόματα με τη χρήση του codemod:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

Το codemod δεν υποστηρίζει ακόμα έργα TypeScript. Δείτε το [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10). Εργαζόμαστε για να υλοποιήσουμε σύντομα την υποστήριξή τους. Αν χρησιμοποιείτε TypeScript, παρακαλούμε συμμετάσχετε!

:::

## Ενημέρωση Αρχείων Spec και Page Objects

Για να ενημερώσετε όλες τις αλλαγές στις εντολές, εκτελέστε το codemod σε όλα τα αρχεία e2e σας που περιέχουν εντολές WebdriverIO, π.χ.:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

Αυτό ήταν! Δεν χρειάζονται άλλες αλλαγές 🎉

## Συμπέρασμα

Ελπίζουμε ότι αυτός ο οδηγός σας καθοδηγεί λίγο στη διαδικασία μετάβασης στο WebdriverIO `v6`. Συνιστούμε ανεπιφύλακτα να συνεχίσετε την αναβάθμιση στην πιο πρόσφατη έκδοση, δεδομένου ότι η ενημέρωση στην `v7` είναι απλή, καθώς δεν υπάρχουν σχεδόν καθόλου αλλαγές που σπάνε τη συμβατότητα. Παρακαλούμε δείτε τον οδηγό μετάβασης [για αναβάθμιση στην v7](v7-migration).

Η κοινότητα συνεχίζει να βελτιώνει το codemod δοκιμάζοντάς το με διάφορες ομάδες σε διάφορους οργανισμούς. Μη διστάσετε να [ανοίξετε ένα issue](https://github.com/webdriverio/codemod/issues/new) αν έχετε σχόλια ή να [ξεκινήσετε μια συζήτηση](https://github.com/webdriverio/codemod/discussions/new) αν δυσκολεύεστε κατά τη διαδικασία μετάβασης.