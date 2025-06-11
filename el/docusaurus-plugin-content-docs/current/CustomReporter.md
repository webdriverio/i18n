---
id: customreporter
title: Προσαρμοσμένος Reporter
---

Μπορείτε να γράψετε τον δικό σας προσαρμοσμένο reporter για τον WDIO test runner που είναι προσαρμοσμένος στις ανάγκες σας. Και είναι εύκολο!

Το μόνο που χρειάζεται να κάνετε είναι να δημιουργήσετε ένα node module που κληρονομεί από το πακέτο `@wdio/reporter`, ώστε να μπορεί να λαμβάνει μηνύματα από το τεστ.

Η βασική ρύθμιση θα πρέπει να μοιάζει με:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * make reporter to write to the output stream by default
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


Το αρχείο `wdio.conf.js` σας θα πρέπει να μοιάζει με αυτό:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * use imported reporter class
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * use absolute path to reporter
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

Μπορείτε επίσης να δημοσιεύσετε τον reporter στο NPM ώστε να μπορεί να τον χρησιμοποιήσει ο καθένας. Ονομάστε το πακέτο όπως και άλλους reporters `wdio-<reportername>-reporter`, και προσθέστε ετικέτες με λέξεις-κλειδιά όπως `wdio` ή `wdio-reporter`.

## Χειριστής Συμβάντων

Μπορείτε να καταχωρήσετε έναν χειριστή συμβάντων για διάφορα συμβάντα που ενεργοποιούνται κατά τη διάρκεια των δοκιμών. Όλοι οι ακόλουθοι χειριστές θα λαμβάνουν ωφέλιμα φορτία με χρήσιμες πληροφορίες σχετικά με την τρέχουσα κατάσταση και την πρόοδο.

Η δομή αυτών των αντικειμένων φορτίου εξαρτάται από το συμβάν και είναι ενοποιημένη σε όλα τα πλαίσια (Mocha, Jasmine και Cucumber). Μόλις υλοποιήσετε έναν προσαρμοσμένο reporter, θα πρέπει να λειτουργεί για όλα τα πλαίσια.

Η ακόλουθη λίστα περιέχει όλες τις πιθανές μεθόδους που μπορείτε να προσθέσετε στην κλάση του reporter σας:

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

Τα ονόματα των μεθόδων είναι αρκετά επεξηγηματικά.

Για να εκτυπώσετε κάτι σε ένα συγκεκριμένο συμβάν, χρησιμοποιήστε τη μέθοδο `this.write(...)`, η οποία παρέχεται από τη γονική κλάση `WDIOReporter`. Είτε στέλνει το περιεχόμενο στο `stdout` είτε σε ένα αρχείο καταγραφής (ανάλογα με τις επιλογές του reporter).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Σημειώστε ότι δεν μπορείτε να καθυστερήσετε την εκτέλεση του τεστ με κανέναν τρόπο.

Όλοι οι χειριστές συμβάντων θα πρέπει να εκτελούν συγχρονισμένες ρουτίνες (ή θα αντιμετωπίσετε συνθήκες ανταγωνισμού).

Βεβαιωθείτε ότι έχετε ελέγξει την [ενότητα παραδειγμάτων](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) όπου μπορείτε να βρείτε ένα παράδειγμα προσαρμοσμένου reporter που εκτυπώνει το όνομα του συμβάντος για κάθε συμβάν.

Εάν έχετε υλοποιήσει έναν προσαρμοσμένο reporter που θα μπορούσε να είναι χρήσιμος για την κοινότητα, μη διστάσετε να κάνετε ένα Pull Request ώστε να κάνουμε τον reporter διαθέσιμο στο κοινό!

Επίσης, εάν εκτελείτε το WDIO testrunner μέσω του interface `Launcher`, δεν μπορείτε να εφαρμόσετε έναν προσαρμοσμένο reporter ως συνάρτηση ως εξής:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // this will NOT work, because CustomReporter is not serializable
    reporters: ['dot', CustomReporter]
})
```

## Αναμονή Μέχρι `isSynchronised`

Εάν ο reporter σας πρέπει να εκτελέσει ασύγχρονες λειτουργίες για να αναφέρει τα δεδομένα (π.χ. αποστολή αρχείων καταγραφής ή άλλων στοιχείων) μπορείτε να αντικαταστήσετε τη μέθοδο `isSynchronised` στον προσαρμοσμένο reporter σας για να επιτρέψετε στον WebdriverIO runner να περιμένει μέχρι να έχετε υπολογίσει τα πάντα. Ένα παράδειγμα αυτού μπορεί να φανεί στον [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * overwrite isSynchronised method
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * sync log files
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
             * remove transferred logs from log bucket
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

Με αυτόν τον τρόπο ο runner θα περιμένει μέχρι να αποσταλούν όλες οι πληροφορίες καταγραφής.

## Δημοσίευση Reporter στο NPM

Για να γίνουν οι reporters πιο εύκολοι στη χρήση και την ανακάλυψη από την κοινότητα WebdriverIO, ακολουθήστε αυτές τις συστάσεις:

* Οι υπηρεσίες θα πρέπει να χρησιμοποιούν αυτή τη σύμβαση ονομασίας: `wdio-*-reporter`
* Χρησιμοποιήστε λέξεις-κλειδιά NPM: `wdio-plugin`, `wdio-reporter`
* Η καταχώρηση `main` θα πρέπει να `export` μια περίπτωση του reporter
* Παράδειγμα reporter: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Ακολουθώντας το συνιστώμενο μοτίβο ονομασίας, οι υπηρεσίες μπορούν να προστεθούν με το όνομά τους:

```js
// Add wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Προσθήκη Δημοσιευμένης Υπηρεσίας στο WDIO CLI και στα Έγγραφα

Εκτιμούμε πραγματικά κάθε νέο πρόσθετο που θα μπορούσε να βοηθήσει άλλους ανθρώπους να εκτελέσουν καλύτερα τεστ! Εάν έχετε δημιουργήσει ένα τέτοιο πρόσθετο, εξετάστε το ενδεχόμενο να το προσθέσετε στο CLI και στα έγγραφά μας για να είναι πιο εύκολο να βρεθεί.

Κάντε ένα pull request με τις ακόλουθες αλλαγές:

- προσθέστε την υπηρεσία σας στη λίστα των [υποστηριζόμενων reporters](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) στη μονάδα CLI
- ενισχύστε τη [λίστα reporters](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/reporters.json) για να προσθέσετε τα έγγραφά σας στην επίσημη σελίδα Webdriver.io