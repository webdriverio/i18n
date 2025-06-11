---
id: organizingsuites
title: Οργάνωση Σουίτας Δοκιμών
---

As projects grow, inevitably more and more integration tests are added. This increases build time and slows productivity.

To prevent this, you should run your tests in parallel. WebdriverIO already tests each spec (or _feature file_ in Cucumber) in parallel within a single session. In general, try to test only a single feature per spec file. Try to not have too many or too few tests in one file. (However, there is no golden rule here.)

Once your tests have several spec files, you should start running your tests concurrently. To do so, adjust the `maxInstances` property in your config file. WebdriverIO allows you to run your tests with maximum concurrency—meaning that no matter how many files and tests you have, they can all run in parallel.  (This is still subject to certain limits, like your computer's CPU, concurrency restrictions, etc.)

> Ας πούμε ότι έχετε 3 διαφορετικές δυνατότητες (Chrome, Firefox και Safari) και έχετε ορίσει το `maxInstances` σε `1`. Ο εκτελεστής δοκιμών WDIO θα δημιουργήσει 3 διεργασίες. Επομένως, αν έχετε 10 αρχεία spec και ορίσετε το `maxInstances` σε `10`, _όλα_ τα αρχεία spec θα δοκιμαστούν ταυτόχρονα και θα δημιουργηθούν 30 διεργασίες.

Μπορείτε να ορίσετε την ιδιότητα `maxInstances` παγκοσμίως για να ορίσετε το χαρακτηριστικό για όλους τους περιηγητές.

Εάν εκτελείτε το δικό σας πλέγμα WebDriver, μπορεί (για παράδειγμα) να έχετε μεγαλύτερη χωρητικότητα για έναν περιηγητή από έναν άλλο. Σε αυτήν την περίπτωση, μπορείτε να _περιορίσετε_ το `maxInstances` στο αντικείμενο των δυνατοτήτων σας:

```js
// wdio.conf.js
export const config = {
    // ...
    // set maxInstance for all browser
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances can get overwritten per capability. So if you have an in-house WebDriver
        // grid with only 5 firefox instance available you can make sure that not more than
        // 5 instance gets started at a time.
        browserName: 'chrome'
    }],
    // ...
}
```

## Inherit From Main Config File

If you run your test suite in multiple environments (e.g., dev and integration) it may help to use multiple configuration files to keep things manageable.

Similar to the [page object concept](pageobjects), the first thing you'll need is a main config file. It contains all configurations you share across environments.

Then create another config file for each environment, and supplement the the main config with the environment-specific ones:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// have main config file as default but overwrite environment specific information
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // more caps defined here
        // ...
    ],

    // run tests on sauce instead locally
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// add an additional reporter
config.reporters.push('allure')
```

## Grouping Test Specs In Suites

Μπορείτε να ομαδοποιήσετε τις προδιαγραφές δοκιμών σε σουίτες και να εκτελέσετε συγκεκριμένες μεμονωμένες σουίτες αντί όλων.

Πρώτα, ορίστε τις σουίτες σας στη διαμόρφωση WDIO:

```js
// wdio.conf.js
export const config = {
    // define all tests
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // define specific suites
    suites: {
        login: [
            './test/specs/login.success.spec.js',
            './test/specs/login.failure.spec.js'
        ],
        otherFeature: [
            // ...
        ]
    },
    // ...
}
```

Τώρα, αν θέλετε να εκτελέσετε μόνο μία σουίτα, μπορείτε να περάσετε το όνομα της σουίτας ως όρισμα CLI:

```sh
wdio wdio.conf.js --suite login
```

Ή, εκτελέστε πολλαπλές σουίτες ταυτόχρονα:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Grouping Test Specs To Run Sequentially

Όπως περιγράφεται παραπάνω, υπάρχουν οφέλη στην ταυτόχρονη εκτέλεση των δοκιμών. Ωστόσο, υπάρχουν περιπτώσεις όπου θα ήταν επωφελές να ομαδοποιήσετε τις δοκιμές για να εκτελεστούν διαδοχικά σε μία μόνο περίπτωση. Παραδείγματα αυτού είναι κυρίως όπου υπάρχει ένα μεγάλο κόστος ρύθμισης, π.χ. μεταγλώττιση κώδικα ή προετοιμασία παρουσιών cloud, αλλά υπάρχουν επίσης προηγμένα μοντέλα χρήσης που επωφελούνται από αυτή τη δυνατότητα.

Για να ομαδοποιήσετε δοκιμές ώστε να εκτελούνται σε μία μόνο περίπτωση, ορίστε τις ως πίνακα μέσα στον ορισμό των προδιαγραφών.

```json
    "specs": [
        [
            "./test/specs/test_login.js",
            "./test/specs/test_product_order.js",
            "./test/specs/test_checkout.js"
        ],
        "./test/specs/test_b*.js",
    ],
```
Στο παραπάνω παράδειγμα, οι δοκιμές 'test_login.js', 'test_product_order.js' και 'test_checkout.js' θα εκτελεστούν διαδοχικά σε μία μόνο περίπτωση και καθεμία από τις δοκιμές "test_b*" θα εκτελεστούν ταυτόχρονα σε μεμονωμένες περιπτώσεις.

Είναι επίσης δυνατό να ομαδοποιήσετε προδιαγραφές που ορίζονται σε σουίτες, οπότε μπορείτε τώρα επίσης να ορίσετε σουίτες όπως αυτή:
```json
    "suites": {
        end2end: [
            [
                "./test/specs/test_login.js",
                "./test/specs/test_product_order.js",
                "./test/specs/test_checkout.js"
            ]
        ],
        allb: ["./test/specs/test_b*.js"]
},
```
και σε αυτήν την περίπτωση όλες οι δοκιμές της σουίτας "end2end" θα εκτελεστούν σε μία μόνο περίπτωση.

Όταν εκτελείτε δοκιμές διαδοχικά χρησιμοποιώντας ένα μοτίβο, θα εκτελέσει τα αρχεία προδιαγραφών σε αλφαβητική σειρά

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

Αυτό θα εκτελέσει τα αρχεία που ταιριάζουν με το παραπάνω μοτίβο με την ακόλουθη σειρά:

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## Run Selected Tests

Σε ορισμένες περιπτώσεις, μπορεί να θέλετε να εκτελέσετε μόνο μία δοκιμή (ή ένα υποσύνολο δοκιμών) από τις σουίτες σας.

Με την παράμετρο `--spec`, μπορείτε να καθορίσετε ποια _σουίτα_ (Mocha, Jasmine) ή _χαρακτηριστικό_ (Cucumber) θα πρέπει να εκτελεστεί. Η διαδρομή επιλύεται σχετικά από τον τρέχοντα κατάλογο εργασίας σας.

Για παράδειγμα, για να εκτελέσετε μόνο τη δοκιμή σύνδεσής σας:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Ή εκτελέστε πολλαπλές προδιαγραφές ταυτόχρονα:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Εάν η τιμή `--spec` δεν δείχνει σε ένα συγκεκριμένο αρχείο προδιαγραφών, χρησιμοποιείται αντί αυτού για το φιλτράρισμα των ονομάτων αρχείων προδιαγραφών που ορίζονται στη διαμόρφωσή σας.

Για να εκτελέσετε όλες τις προδιαγραφές με τη λέξη "dialog" στα ονόματα αρχείων προδιαγραφών, θα μπορούσατε να χρησιμοποιήσετε:

```sh
wdio wdio.conf.js --spec dialog
```

Σημειώστε ότι κάθε αρχείο δοκιμής εκτελείται σε μια μεμονωμένη διεργασία εκτέλεσης δοκιμών. Εφόσον δεν σαρώνουμε αρχεία εκ των προτέρων (δείτε την επόμενη ενότητα για πληροφορίες σχετικά με τη διοχέτευση ονομάτων αρχείων στο `wdio`), _δεν μπορείτε_ να χρησιμοποιήσετε (για παράδειγμα) το `describe.only` στην κορυφή του αρχείου προδιαγραφών σας για να δώσετε οδηγίες στη Mocha να εκτελέσει μόνο αυτή τη σουίτα.

Αυτή η λειτουργία θα σας βοηθήσει να επιτύχετε τον ίδιο στόχο.

Όταν παρέχεται η επιλογή `--spec`, θα αντικαταστήσει οποιαδήποτε μοτίβα που ορίζονται από την παράμετρο `specs` σε επίπεδο διαμόρφωσης ή δυνατοτήτων.

## Exclude Selected Tests

Όταν χρειάζεται, αν πρέπει να εξαιρέσετε συγκεκριμένα αρχεία προδιαγραφών από μια εκτέλεση, μπορείτε να χρησιμοποιήσετε την παράμετρο `--exclude` (Mocha, Jasmine) ή χαρακτηριστικό (Cucumber).

Για παράδειγμα, για να εξαιρέσετε τη δοκιμή σύνδεσής σας από την εκτέλεση δοκιμής:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Ή, εξαιρέστε πολλαπλά αρχεία προδιαγραφών:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Ή, εξαιρέστε ένα αρχείο προδιαγραφών κατά το φιλτράρισμα χρησιμοποιώντας μια σουίτα:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Εάν η τιμή `--exclude` δεν δείχνει σε ένα συγκεκριμένο αρχείο προδιαγραφών, χρησιμοποιείται αντί αυτού για το φιλτράρισμα των ονομάτων αρχείων προδιαγραφών που ορίζονται στη διαμόρφωσή σας.

Για να εξαιρέσετε όλες τις προδιαγραφές με τη λέξη "dialog" στα ονόματα αρχείων προδιαγραφών, θα μπορούσατε να χρησιμοποιήσετε:

```sh
wdio wdio.conf.js --exclude dialog
```

Όταν παρέχεται η επιλογή `--exclude`, θα αντικαταστήσει οποιαδήποτε μοτίβα που ορίζονται από την παράμετρο `exclude` σε επίπεδο διαμόρφωσης ή δυνατοτήτων.

## Run Suites and Test Specs

Εκτελέστε μια ολόκληρη σουίτα μαζί με μεμονωμένες προδιαγραφές.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Run Multiple, Specific Test Specs

Είναι μερικές φορές απαραίτητο&mdash;στο πλαίσιο της συνεχούς ενσωμάτωσης και αλλού&mdash;να καθορίσετε πολλαπλά σύνολα προδιαγραφών για εκτέλεση. Το βοηθητικό πρόγραμμα γραμμής εντολών `wdio` του WebdriverIO δέχεται ονόματα αρχείων που διοχετεύονται (από το `find`, `grep` ή άλλα).

Τα ονόματα αρχείων που διοχετεύονται αντικαθιστούν τη λίστα των glob ή των ονομάτων αρχείων που καθορίζονται στη λίστα `spec` της διαμόρφωσης.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Σημείωση:** Αυτό_ δεν _θα αντικαταστήσει τη σημαία `--spec` για την εκτέλεση μιας μόνο προδιαγραφής._

## Running Specific Tests with MochaOpts

Μπορείτε επίσης να φιλτράρετε ποια συγκεκριμένη `suite|describe` και/ή `it|test` θέλετε να εκτελέσετε περνώντας ένα συγκεκριμένο όρισμα της mocha: `--mochaOpts.grep` στο CLI wdio.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Σημείωση:** Η Mocha θα φιλτράρει τις δοκιμές αφού ο εκτελεστής δοκιμών WDIO δημιουργήσει τις περιπτώσεις, οπότε μπορεί να δείτε αρκετές περιπτώσεις να δημιουργούνται αλλά να μην εκτελούνται πραγματικά._

## Exclude Specific Tests with MochaOpts

Μπορείτε επίσης να φιλτράρετε ποια συγκεκριμένη `suite|describe` και/ή `it|test` θέλετε να εξαιρέσετε περνώντας ένα συγκεκριμένο όρισμα της mocha: `--mochaOpts.invert` στο CLI wdio. Το `--mochaOpts.invert` εκτελεί το αντίθετο του `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Σημείωση:** Η Mocha θα φιλτράρει τις δοκιμές αφού ο εκτελεστής δοκιμών WDIO δημιουργήσει τις περιπτώσεις, οπότε μπορεί να δείτε αρκετές περιπτώσεις να δημιουργούνται αλλά να μην εκτελούνται πραγματικά._

## Stop testing after failure

Με την επιλογή `bail`, μπορείτε να πείτε στο WebdriverIO να σταματήσει τις δοκιμές μετά από οποιαδήποτε αποτυχία δοκιμής.

Αυτό είναι χρήσιμο με μεγάλες σουίτες δοκιμών όταν ήδη γνωρίζετε ότι η κατασκευή σας θα αποτύχει, αλλά θέλετε να αποφύγετε τη μακρά αναμονή μιας πλήρους εκτέλεσης δοκιμών.

Η επιλογή `bail` αναμένει έναν αριθμό, ο οποίος καθορίζει πόσες αποτυχίες δοκιμών μπορούν να συμβούν πριν το WebDriver σταματήσει ολόκληρη την εκτέλεση δοκιμών. Η προεπιλογή είναι `0`, που σημαίνει ότι πάντα εκτελεί όλες τις προδιαγραφές δοκιμών που μπορεί να βρει.

Παρακαλώ δείτε την [Σελίδα Επιλογών](configuration) για πρόσθετες πληροφορίες σχετικά με τη διαμόρφωση bail.
## Run options hierarchy

Όταν δηλώνετε ποιες προδιαγραφές θα εκτελεστούν, υπάρχει μια συγκεκριμένη ιεραρχία που καθορίζει ποιο μοτίβο θα έχει προτεραιότητα. Προς το παρόν, έτσι λειτουργεί, από την υψηλότερη προτεραιότητα στη χαμηλότερη:

> Όρισμα CLI `--spec` > μοτίβο `specs` δυνατοτήτων > μοτίβο `specs` διαμόρφωσης
> Όρισμα CLI `--exclude` > μοτίβο `exclude` διαμόρφωσης > μοτίβο `exclude` δυνατοτήτων

Εάν δίνεται μόνο η παράμετρος διαμόρφωσης, θα χρησιμοποιηθεί για όλες τις δυνατότητες. Ωστόσο, αν ορίζετε το μοτίβο σε επίπεδο δυνατοτήτων, θα χρησιμοποιηθεί αντί για το μοτίβο διαμόρφωσης. Τέλος, οποιοδήποτε μοτίβο προδιαγραφών ορίζεται στη γραμμή εντολών θα αντικαταστήσει όλα τα άλλα μοτίβα που δίνονται.

### Using capability-defined spec patterns

Όταν ορίζετε ένα μοτίβο προδιαγραφών σε επίπεδο δυνατοτήτων, θα αντικαταστήσει οποιαδήποτε μοτίβα που ορίζονται σε επίπεδο διαμόρφωσης. Αυτό είναι χρήσιμο όταν χρειάζεται να διαχωρίσετε τις δοκιμές βάσει διαφορετικών δυνατοτήτων συσκευών. Σε τέτοιες περιπτώσεις, είναι πιο χρήσιμο να χρησιμοποιείτε ένα γενικό μοτίβο προδιαγραφών σε επίπεδο διαμόρφωσης και πιο συγκεκριμένα μοτίβα σε επίπεδο δυνατοτήτων.

Για παράδειγμα, ας πούμε ότι είχατε δύο καταλόγους, έναν για δοκιμές Android και έναν για δοκιμές iOS.

Το αρχείο διαμόρφωσής σας μπορεί να ορίζει το μοτίβο ως εξής, για μη ειδικές δοκιμές συσκευών:

```js
{
    specs: ['tests/general/**/*.js']
}
```

αλλά στη συνέχεια, θα έχετε διαφορετικές δυνατότητες για τις συσκευές Android και iOS σας, όπου τα μοτίβα θα μπορούσαν να μοιάζουν ως εξής:

```json
{
  "platformName": "Android",
  "specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "specs": [
    "tests/ios/**/*.js"
  ]
}
```

Εάν απαιτείτε και τις δύο αυτές δυνατότητες στο αρχείο διαμόρφωσής σας, τότε η συσκευή Android θα εκτελέσει μόνο τις δοκιμές κάτω από το χώρο ονομάτων "android" και οι δοκιμές iOS θα εκτελέσουν μόνο τις δοκιμές κάτω από το χώρο ονομάτων "ios"!

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            specs: ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            specs: ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //config level specs will be used
        }
    ]
}
```