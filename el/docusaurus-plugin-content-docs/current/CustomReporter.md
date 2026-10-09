---
id: customreporter
title: Προσαρμοσμένος Reporter
description: "Δημιουργήστε έναν προσαρμοσμένο reporter για το WDIO testrunner βασισμένο στο @wdio/reporter, χειριστείτε τα συμβάντα του runner και δημοσιεύστε τον στο NPM."
---

Μπορείτε να γράψετε τον δικό σας προσαρμοσμένο reporter για το WDIO test runner, ειδικά προσαρμοσμένο στις ανάγκες σας. Και είναι εύκολο!

Το μόνο που χρειάζεται να κάνετε είναι να δημιουργήσετε ένα node module που κληρονομεί από το πακέτο `@wdio/reporter`, ώστε να μπορεί να λαμβάνει μηνύματα από το τεστ.

Η βασική ρύθμιση θα πρέπει να μοιάζει κάπως έτσι:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * κάνει τον reporter να γράφει στη ροή εξόδου από προεπιλογή
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Για να χρησιμοποιήσετε αυτόν τον reporter, το μόνο που χρειάζεται να κάνετε είναι να τον αναθέσετε στην ιδιότητα `reporter` στη διαμόρφωσή σας.


Το αρχείο σας `wdio.conf.js` θα πρέπει να μοιάζει κάπως έτσι:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * χρήση της εισαγόμενης κλάσης reporter
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * χρήση απόλυτης διαδρομής προς τον reporter
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

Μπορείτε επίσης να δημοσιεύσετε τον reporter στο NPM ώστε να μπορεί να τον χρησιμοποιήσει ο καθένας. Ονομάστε το πακέτο όπως και τους άλλους reporters `wdio-<reportername>-reporter`, και προσθέστε του λέξεις-κλειδιά όπως `wdio` ή `wdio-reporter`.

## Χειριστής Συμβάντων

Μπορείτε να καταχωρήσετε έναν χειριστή συμβάντων για διάφορα συμβάντα που ενεργοποιούνται κατά τη διάρκεια των τεστ. Όλοι οι παρακάτω χειριστές θα λαμβάνουν payloads με χρήσιμες πληροφορίες σχετικά με την τρέχουσα κατάσταση και πρόοδο.

Η δομή αυτών των αντικειμένων payload εξαρτάται από το συμβάν και είναι ενοποιημένη σε όλα τα frameworks (Mocha, Jasmine και Cucumber). Μόλις υλοποιήσετε έναν προσαρμοσμένο reporter, θα πρέπει να λειτουργεί για όλα τα frameworks.

Η παρακάτω λίστα περιέχει όλες τις πιθανές μεθόδους που μπορείτε να προσθέσετε στην κλάση του reporter σας:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onRunnerStart() {}
    onBeforeCommand() {}
    onAfterCommand() {}
    onSuiteStart() {}
    onHookStart() {}
    onHookEnd() {}
    onTestStart() {}
    onTestPass() {}
    onTestFail() {}
    onTestSkip() {}
    onTestEnd() {}
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

Τα ονόματα των μεθόδων είναι αρκετά αυτονόητα.

Για να εκτυπώσετε κάτι σε ένα συγκεκριμένο συμβάν, χρησιμοποιήστε τη μέθοδο `this.write(...)`, η οποία παρέχεται από τη γονική κλάση `WDIOReporter`. Αυτή είτε μεταδίδει το περιεχόμενο στο `stdout`, είτε σε ένα αρχείο καταγραφής (ανάλογα με τις επιλογές του reporter).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Σημειώστε ότι δεν μπορείτε να καθυστερήσετε την εκτέλεση του τεστ με κανέναν τρόπο.

Όλοι οι χειριστές συμβάντων θα πρέπει να εκτελούν σύγχρονες ρουτίνες (διαφορετικά θα αντιμετωπίσετε race conditions).

Φροντίστε να δείτε την [ενότητα παραδειγμάτων](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) όπου μπορείτε να βρείτε ένα παράδειγμα προσαρμοσμένου reporter που εκτυπώνει το όνομα του συμβάντος για κάθε συμβάν.

Αν έχετε υλοποιήσει έναν προσαρμοσμένο reporter που θα μπορούσε να είναι χρήσιμος για την κοινότητα, μη διστάσετε να κάνετε ένα Pull Request ώστε να μπορέσουμε να κάνουμε τον reporter διαθέσιμο στο κοινό!

Επίσης, αν εκτελείτε το WDIO testrunner μέσω της διεπαφής `Launcher`, δεν μπορείτε να εφαρμόσετε έναν προσαρμοσμένο reporter ως συνάρτηση ως εξής:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // αυτό ΔΕΝ θα λειτουργήσει, επειδή το CustomReporter δεν είναι σειριοποιήσιμο
    reporters: ['dot', CustomReporter]
})
```

## Αναμονή Μέχρι το `isSynchronised`

Αν ο reporter σας πρέπει να εκτελέσει ασύγχρονες λειτουργίες για να αναφέρει τα δεδομένα (π.χ. μεταφόρτωση αρχείων καταγραφής ή άλλων πόρων), μπορείτε να αντικαταστήσετε τη μέθοδο `isSynchronised` στον προσαρμοσμένο reporter σας ώστε ο runner του WebdriverIO να περιμένει μέχρι να έχετε υπολογίσει τα πάντα. Ένα παράδειγμα αυτού μπορείτε να δείτε στο [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * αντικατάσταση της μεθόδου isSynchronised
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * συγχρονισμός αρχείων καταγραφής
     */
    sync () {
        // ...
        request({
            method: 'POST',
            uri: this.options.sourceAddress,
            body: logLines
        }, (err, resp) => {
            // ...
            /**
             * αφαίρεση των μεταφερθέντων logs από τον κάδο καταγραφής
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

Με αυτόν τον τρόπο ο runner θα περιμένει μέχρι να μεταφορτωθούν όλες οι πληροφορίες καταγραφής.

## Δημοσίευση του Reporter στο NPM

Για να γίνει ο reporter πιο εύκολος στη χρήση και στην ανακάλυψη από την κοινότητα του WebdriverIO, ακολουθήστε τις παρακάτω συστάσεις:

* Οι υπηρεσίες θα πρέπει να χρησιμοποιούν αυτή τη σύμβαση ονοματοδοσίας: `wdio-*-reporter`
* Χρησιμοποιήστε τις λέξεις-κλειδιά NPM: `wdio-plugin`, `wdio-reporter`
* Η καταχώρηση `main` θα πρέπει να κάνει `export` ένα instance του reporter
* Παράδειγμα reporter: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Η τήρηση του προτεινόμενου μοτίβου ονοματοδοσίας επιτρέπει την προσθήκη υπηρεσιών με βάση το όνομα:

```js
// Προσθήκη του wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Προσθήκη της Δημοσιευμένης Υπηρεσίας στο WDIO CLI και στην Τεκμηρίωση

Εκτιμούμε πραγματικά κάθε νέο plugin που θα μπορούσε να βοηθήσει άλλους ανθρώπους να εκτελούν καλύτερα τεστ! Αν έχετε δημιουργήσει ένα τέτοιο plugin, σκεφτείτε να το προσθέσετε στο CLI και στην τεκμηρίωσή μας ώστε να είναι πιο εύκολο να βρεθεί.

Παρακαλούμε ανοίξτε ένα pull request με τις ακόλουθες αλλαγές:

- προσθέστε την υπηρεσία σας στη λίστα των [υποστηριζόμενων reporters](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) στο module του CLI
- επεκτείνετε τη [λίστα reporters](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json) για να προσθέσετε την τεκμηρίωσή σας στην επίσημη σελίδα του Webdriver.io