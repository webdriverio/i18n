---
id: frameworks
title: Πλαίσια
---

WebdriverIO Runner έχει ενσωματωμένη υποστήριξη για [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/), και [Cucumber.js](https://cucumber.io/). Μπορείτε επίσης να το ενσωματώσετε με πλαίσια ανοιχτού κώδικα τρίτων, όπως το [Serenity/JS](#using-serenityjs).

:::tip Ενσωμάτωση του WebdriverIO με πλαίσια δοκιμών
Για να ενσωματώσετε το WebdriverIO με ένα πλαίσιο δοκιμών, χρειάζεστε ένα πακέτο προσαρμογέα διαθέσιμο στο NPM.
Σημειώστε ότι το πακέτο προσαρμογέα πρέπει να εγκατασταθεί στην ίδια τοποθεσία όπου είναι εγκατεστημένο το WebdriverIO.
Επομένως, αν εγκαταστήσατε το WebdriverIO παγκοσμίως, βεβαιωθείτε ότι εγκαταστήσατε και το πακέτο προσαρμογέα παγκοσμίως.
:::

Η ενσωμάτωση του WebdriverIO με ένα πλαίσιο δοκιμών σάς επιτρέπει να έχετε πρόσβαση στην περίπτωση WebDriver χρησιμοποιώντας τη μεταβλητή `browser`
στα αρχεία προδιαγραφών σας ή στους ορισμούς βημάτων.
Σημειώστε ότι το WebdriverIO θα φροντίσει επίσης για την εκκίνηση και τον τερματισμό της συνεδρίας Selenium, οπότε δεν χρειάζεται να το κάνετε
εσείς οι ίδιοι.

## Χρήση του Mocha

Πρώτα, εγκαταστήστε το πακέτο προσαρμογέα από το NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Από προεπιλογή, το WebdriverIO παρέχει μια [βιβλιοθήκη ισχυρισμών](assertion) που είναι ενσωματωμένη και μπορείτε να ξεκινήσετε αμέσως:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Το WebdriverIO υποστηρίζει τις διεπαφές `BDD` (προεπιλογή), `TDD` και `QUnit` του Mocha [interfaces](https://mochajs.org/#interfaces).

Αν θέλετε να γράψετε τις προδιαγραφές σας σε στυλ TDD, ορίστε την ιδιότητα `ui` στο αρχείο ρυθμίσεων `mochaOpts` σε `tdd`. Τώρα τα αρχεία δοκιμών σας πρέπει να γράφονται ως εξής:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Αν θέλετε να ορίσετε άλλες ρυθμίσεις συγκεκριμένες για το Mocha, μπορείτε να το κάνετε με το κλειδί `mochaOpts` στο αρχείο ρυθμίσεων σας. Μια λίστα με όλες τις επιλογές μπορεί να βρεθεί στον [ιστότοπο του έργου Mocha](https://mochajs.org/api/mocha).

__Σημείωση:__ Το WebdriverIO δεν υποστηρίζει τη μη συνιστώμενη χρήση επιστροφών κλήσης `done` στο Mocha:

```js
it('should test something', (done) => {
    done() // ρίχνει "done is not a function"
})
```

### Επιλογές Mocha

Οι ακόλουθες επιλογές μπορούν να εφαρμοστούν στο αρχείο `wdio.conf.js` για να ρυθμίσετε το περιβάλλον Mocha. __Σημείωση:__ δεν υποστηρίζονται όλες οι επιλογές, π.χ. η εφαρμογή της επιλογής `parallel` θα προκαλέσει σφάλμα καθώς ο δοκιμαστής WDIO έχει τον δικό του τρόπο εκτέλεσης δοκιμών παράλληλα. Μπορείτε να περάσετε αυτές τις επιλογές πλαισίου ως ορίσματα, π.χ.:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Αυτό θα περάσει τις ακόλουθες επιλογές Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Υποστηρίζονται οι ακόλουθες επιλογές Mocha:

#### require
Η επιλογή `require` είναι χρήσιμη όταν θέλετε να προσθέσετε ή να επεκτείνετε κάποια βασική λειτουργικότητα (επιλογή πλαισίου WebdriverIO).

Τύπος: `string|string[]`<br />
Προεπιλογή: `[]`

#### compilers
Χρησιμοποιήστε το δεδομένο άρθρωμα(τα) για να συντάξετε αρχεία. Οι μεταγλωττιστές θα συμπεριληφθούν πριν από τις απαιτήσεις (επιλογή πλαισίου WebdriverIO).

Τύπος: `string[]`<br />
Προεπιλογή: `[]`

#### allowUncaught
Διάδοση μη εντοπισμένων σφαλμάτων.

Τύπος: `boolean`<br />
Προεπιλογή: `false`

#### bail
Διακοπή μετά την πρώτη αποτυχία δοκιμής.

Τύπος: `boolean`<br />
Προεπιλογή: `false`

#### checkLeaks
Έλεγχος για διαρροές παγκόσμιων μεταβλητών.

Τύπος: `boolean`<br />
Προεπιλογή: `false`

#### delay
Καθυστέρηση εκτέλεσης ρίζας.

Τύπος: `boolean`<br />
Προεπιλογή: `false`

#### fgrep
Φίλτρο δοκιμής με δεδομένη συμβολοσειρά.

Τύπος: `string`<br />
Προεπιλογή: `null`

#### forbidOnly
Οι δοκιμές με την ένδειξη `only` αποτυγχάνουν στη σουίτα.

Τύπος: `boolean`<br />
Προεπιλογή: `false`

#### forbidPending
Οι εκκρεμείς δοκιμές αποτυγχάνουν στη σουίτα.

Τύπος: `boolean`<br />
Προεπιλογή: `false`

#### fullTrace
Πλήρης ιχνηλάτηση σε περίπτωση αποτυχίας.

Τύπος: `boolean`<br />
Προεπιλογή: `false`

#### global
Μεταβλητές που αναμένονται στο παγκόσμιο πεδίο.

Τύπος: `string[]`<br />
Προεπιλογή: `[]`

#### grep
Φίλτρο δοκιμής με δεδομένη κανονική έκφραση.

Τύπος: `RegExp|string`<br />
Προεπιλογή: `null`

#### invert
Αντιστροφή αντιστοιχιών φίλτρου δοκιμών.

Τύπος: `boolean`<br />
Προεπιλογή: `false`

#### retries
Αριθμός επαναλήψεων αποτυχημένων δοκιμών.

Τύπος: `number`<br />
Προεπιλογή: `0`

#### timeout
Τιμή ορίου χρονικού ορίου (σε ms).

Τύπος: `number`<br />
Προεπιλογή: `30000`

## Χρήση του Jasmine

Πρώτα, εγκαταστήστε το πακέτο προσαρμογέα από το NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Μπορείτε να διαμορφώσετε το περιβάλλον Jasmine ορίζοντας μια ιδιότητα `jasmineOpts` στο αρχείο ρυθμίσεων σας. Μια λίστα με όλες τις επιλογές μπορεί να βρεθεί στον [ιστότοπο του έργου Jasmine](https://jasmine.github.io/api/3.5/Configuration.html).

### Επιλογές Jasmine

Οι ακόλουθες επιλογές μπορούν να εφαρμοστούν στο αρχείο `wdio.conf.js` για να ρυθμίσετε το περιβάλλον Jasmine χρησιμοποιώντας την ιδιότητα `jasmineOpts`. Για περισσότερες πληροφορίες σχετικά με αυτές τις επιλογές διαμόρφωσης, ελέγξτε τα [έγγραφα Jasmine](https://jasmine.github.io/api/edge/Configuration). Μπορείτε να περάσετε αυτές τις επιλογές πλαισίου ως ορίσματα, π.χ.:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Αυτό θα περάσει τις ακόλουθες επιλογές Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Υποστηρίζονται οι ακόλουθες επιλογές Jasmine:

#### defaultTimeoutInterval
Προεπιλεγμένο διάστημα χρονικού ορίου για λειτουργίες Jasmine.

Τύπος: `number`<br />
Προεπιλογή: `60000`

#### helpers
Πίνακας διαδρομών αρχείων (και μοτίβων) σχετικά με το spec_dir για να συμπεριληφθούν πριν από τις προδιαγραφές jasmine.

Τύπος: `string[]`<br />
Προεπιλογή: `[]`

#### requires
Η επιλογή `requires` είναι χρήσιμη όταν θέλετε να προσθέσετε ή να επεκτείνετε κάποια βασική λειτουργικότητα.

Τύπος: `string[]`<br />
Προεπιλογή: `[]`

#### random
Εάν θα τυχαιοποιηθεί η σειρά εκτέλεσης προδιαγραφών.

Τύπος: `boolean`<br />
Προεπιλογή: `true`

#### seed
Σπόρος που θα χρησιμοποιηθεί ως βάση τυχαιοποίησης. Η τιμή null προκαλεί τον τυχαίο καθορισμό του σπόρου κατά την έναρξη της εκτέλεσης.

Τύπος: `Function`<br />
Προεπιλογή: `null`

#### failSpecWithNoExpectations
Εάν θα αποτύχει η προδιαγραφή εάν δεν εκτέλεσε καμία προσδοκία. Από προεπιλογή, μια προδιαγραφή που δεν εκτέλεσε προσδοκίες αναφέρεται ως επιτυχημένη. Η ρύθμιση αυτής της επιλογής σε true θα αναφέρει τέτοιες προδιαγραφές ως αποτυχημένες.

Τύπος: `boolean`<br />
Προεπιλογή: `false`

#### oneFailurePerSpec
Εάν οι προδιαγραφές θα έχουν μόνο μία αποτυχία προσδοκίας.

Τύπος: `boolean`<br />
Προεπιλογή: `false`

#### specFilter
Συνάρτηση που θα χρησιμοποιηθεί για το φιλτράρισμα προδιαγραφών.

Τύπος: `Function`<br />
Προεπιλογή: `(spec) => true`

#### grep
Εκτέλεση μόνο δοκιμών που αντιστοιχούν σε αυτή τη συμβολοσειρά ή regexp. (Ισχύει μόνο εάν δεν έχει οριστεί προσαρμοσμένη συνάρτηση `specFilter`)

Τύπος: `string|Regexp`<br />
Προεπιλογή: `null`

#### invertGrep
Εάν είναι true, αντιστρέφει τις αντιστοιχίες δοκιμών και εκτελεί μόνο δοκιμές που δεν αντιστοιχούν με την έκφραση που χρησιμοποιείται στο `grep`. (Ισχύει μόνο εάν δεν έχει οριστεί προσαρμοσμένη συνάρτηση `specFilter`)

Τύπος: `boolean`<br />
Προεπιλογή: `false`

## Χρήση του Cucumber

Πρώτα, εγκαταστήστε το πακέτο προσαρμογέα από το NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Αν θέλετε να χρησιμοποιήσετε το Cucumber, ορίστε την ιδιότητα `framework` σε `cucumber` προσθέτοντας `framework: 'cucumber'` στο [αρχείο ρυθμίσεων](configurationfile).

Οι επιλογές για το Cucumber μπορούν να δοθούν στο αρχείο ρυθμίσεων με το `cucumberOpts`. Δείτε την πλήρη λίστα επιλογών [εδώ](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options).

Για να ξεκινήσετε γρήγορα με το Cucumber, ρίξτε μια ματιά στο έργο μας [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) που διαθέτει όλους τους ορισμούς βημάτων που χρειάζεστε για να ξεκινήσετε, και θα γράφετε αρχεία χαρακτηριστικών αμέσως.

### Επιλογές Cucumber

Οι ακόλουθες επιλογές μπορούν να εφαρμοστούν στο αρχείο `wdio.conf.js` για να ρυθμίσετε το περιβάλλον Cucumber χρησιμοποιώντας την ιδιότητα `cucumberOpts`:

:::tip Προσαρμογή επιλογών μέσω της γραμμής εντολών
Τα `cucumberOpts`, όπως προσαρμοσμένες `tags` για το φιλτράρισμα δοκιμών, μπορούν να καθοριστούν μέσω της γραμμής εντολών. Αυτό επιτυγχάνεται χρησιμοποιώντας τη μορφή `cucumberOpts.{optionName}="value"`.

Για παράδειγμα, αν θέλετε να εκτελέσετε μόνο τις δοκιμές που έχουν επισημανθεί με `@smoke`, μπορείτε να χρησιμοποιήσετε την ακόλουθη εντολή:

```sh
# Όταν θέλετε να εκτελέσετε μόνο δοκιμές που έχουν την ετικέτα "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

Αυτή η εντολή ορίζει την επιλογή `tags` στο `cucumberOpts` σε `@smoke`, διασφαλίζοντας ότι εκτελούνται μόνο δοκιμές με αυτήν την ετικέτα.

:::

#### backtrace
Εμφάνιση πλήρους ιχνηλάτησης για σφάλματα.

Τύπος: `Boolean`<br />
Προεπιλογή: `true`

#### requireModule
Απαίτηση αρθρωμάτων πριν από την απαίτηση οποιωνδήποτε αρχείων υποστήριξης.

Τύπος: `string[]`<br />
Προεπιλογή: `[]`<br />
Παράδειγμα:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // ή
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast
Διακοπή της εκτέλεσης μετά την πρώτη αποτυχία.

Τύπος: `boolean`<br />
Προεπιλογή: `false`

#### name
Εκτέλεση μόνο των σεναρίων με όνομα που αντιστοιχεί στην έκφραση (επαναλαμβανόμενη).

Τύπος: `RegExp[]`<br />
Προεπιλογή: `[]`

#### require
Απαίτηση αρχείων που περιέχουν τους ορισμούς βημάτων σας πριν από την εκτέλεση χαρακτηριστικών. Μπορείτε επίσης να καθορίσετε ένα μοτίβο για τους ορισμούς βημάτων σας.

Τύπος: `string[]`<br />
Προεπιλογή: `[]`
Παράδειγμα:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
Διαδρομές προς τον κώδικα υποστήριξής σας, για ESM.

Τύπος: `String[]`<br />
Προεπιλογή: `[]`
Παράδειγμα:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
Αποτυχία εάν υπάρχουν ακαθόριστα ή εκκρεμή βήματα.

Τύπος: `boolean`<br />
Προεπιλογή: `false`

#### tags
Εκτέλεση μόνο των χαρακτηριστικών ή σεναρίων με ετικέτες που ταιριάζουν με την έκφραση.
Παρακαλώ δείτε την [τεκμηρίωση Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) για περισσότερες λεπτομέρειες.

Τύπος: `String`<br />
Προεπιλογή: ``

#### timeout
Χρονικό όριο σε χιλιοστά δευτερολέπτου για ορισμούς βημάτων.

Τύπος: `Number`<br />
Προεπιλογή: `30000`

#### retry
Καθορίστε τον αριθμό των επαναλήψεων για τις αποτυχημένες περιπτώσεις δοκιμών.

Τύπος: `Number`<br />
Προεπιλογή: `0`

#### retryTagFilter
Επανάληψη μόνο των χαρακτηριστικών ή σεναρίων με ετικέτες που ταιριάζουν με την έκφραση (επαναλαμβανόμενη). Αυτή η επιλογή απαιτεί να καθοριστεί το '--retry'.

Τύπος: `RegExp`

#### language
Προεπιλεγμένη γλώσσα για τα αρχεία χαρακτηριστικών σας

Τύπος: `String`<br />
Προεπιλογή: `en`

#### order
Εκτέλεση δοκιμών σε καθορισμένη / τυχαία σειρά

Τύπος: `String`<br />
Προεπιλογή: `defined`

#### format
Όνομα και διαδρομή αρχείου εξόδου του διαμορφωτή που θα χρησιμοποιηθεί.
Το WebdriverIO υποστηρίζει κυρίως μόνο τους [Formatters](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) που γράφουν την έξοδο σε ένα αρχείο.

Τύπος: `string[]`<br />

#### formatOptions
Επιλογές που θα παρέχονται στους διαμορφωτές

Τύπος: `object`<br />

#### tagsInTitle
Προσθήκη ετικετών cucumber στο όνομα χαρακτηριστικού ή σεναρίου

Τύπος: `Boolean`<br />
Προεπιλογή: `false`

***Παρακαλώ σημειώστε ότι αυτή είναι μια συγκεκριμένη επιλογή του @wdio/cucumber-framework και δεν αναγνωρίζεται από το ίδιο το cucumber-js***<br/>

#### ignoreUndefinedDefinitions
Αντιμετώπιση ακαθόριστων ορισμών ως προειδοποιήσεις.

Τύπος: `Boolean`<br />
Προεπιλογή: `false`

***Παρακαλώ σημειώστε ότι αυτή είναι μια συγκεκριμένη επιλογή του @wdio/cucumber-framework και δεν αναγνωρίζεται από το ίδιο το cucumber-js***<br/>

#### failAmbiguousDefinitions
Αντιμετώπιση ασαφών ορισμών ως σφάλματα.

Τύπος: `Boolean`<br />
Προεπιλογή: `false`

***Παρακαλώ σημειώστε ότι αυτή είναι μια συγκεκριμένη επιλογή του @wdio/cucumber-framework και δεν αναγνωρίζεται από το ίδιο το cucumber-js***<br/>

#### tagExpression
Εκτέλεση μόνο των χαρακτηριστικών ή σεναρίων με ετικέτες που ταιριάζουν με την έκφραση.
Παρακαλώ δείτε την [τεκμηρίωση Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) για περισσότερες λεπτομέρειες.

Τύπος: `String`<br />
Προεπιλογή: ``

***Παρακαλώ σημειώστε ότι αυτή η επιλογή θα είναι παρωχημένη στο μέλλον. Χρησιμοποιήστε την ιδιότητα ρύθμισης [`tags`](#tags) αντί αυτού***

#### profile
Καθορίστε το προφίλ που θα χρησιμοποιηθεί.

Τύπος: `string[]`<br />
Προεπιλογή: `[]`

***Παρακαλώ σημειώστε ότι μόνο συγκεκριμένες τιμές (worldParameters, name, retryTagFilter) υποστηρίζονται εντός των προφίλ, καθώς το `cucumberOpts` έχει προτεραιότητα. Επιπλέον, όταν χρησιμοποιείτε ένα προφίλ, βεβαιωθείτε ότι οι αναφερόμενες τιμές δεν δηλώνονται εντός του `cucumberOpts`.***

### Παράλειψη δοκιμών στο cucumber

Σημειώστε ότι αν θέλετε να παραλείψετε μια δοκιμή χρησιμοποιώντας τις κανονικές δυνατότητες φιλτραρίσματος δοκιμών cucumber που είναι διαθέσιμες στο `cucumberOpts`, θα το κάνετε για όλους τους περιηγητές και τις συσκευές που έχουν διαμορφωθεί στις δυνατότητες. Για να μπορέσετε να παραλείψετε σενάρια μόνο για συγκεκριμένους συνδυασμούς δυνατοτήτων χωρίς να ξεκινήσει μια συνεδρία αν δεν είναι απαραίτητο, το webdriverio παρέχει την ακόλουθη συγκεκριμένη σύνταξη ετικετών για το cucumber:

`@skip([condition])`

όπου η συνθήκη είναι ένας προαιρετικός συνδυασμός ιδιοτήτων δυνατοτήτων με τις τιμές τους που όταν **όλες** ταιριάζουν με την αιτία θα παραλείψουν το επισημασμένο σενάριο ή χαρακτηριστικό. Φυσικά, μπορείτε να προσθέσετε πολλές ετικέτες σε σενάρια και χαρακτηριστικά για να παραλείψετε μια δοκιμή κάτω από πολλές διαφορετικές συνθήκες.

Μπορείτε επίσης να χρησιμοποιήσετε την επισήμανση '@skip' για να παραλείψετε δοκιμές χωρίς να αλλάξετε το 'tagExpression'. Σε αυτήν την περίπτωση, οι παραλειφθείσες δοκιμές θα εμφανίζονται στην αναφορά δοκιμών.

Εδώ έχετε μερικά παραδείγματα αυτής της σύνταξης:
- `@skip` ή `@skip()`: θα παραλείπει πάντα το επισημασμένο στοιχείο
- `@skip(browserName="chrome")`: η δοκιμή δεν θα εκτελεστεί σε περιηγητές chrome.
- `@skip(browserName="firefox";platformName="linux")`: θα παραλείψει τη δοκιμή σε εκτελέσεις firefox σε linux.
- `@skip(browserName=["chrome","firefox"])`: τα επισημασμένα στοιχεία θα παραλειφθούν τόσο για τους περιηγητές chrome όσο και για τους περιηγητές firefox.
- `@skip(browserName=/i.*explorer/)`: οι δυνατότητες με περιηγητές που ταιριάζουν με το regexp θα παραλειφθούν (όπως `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Εισαγωγή Βοηθού Ορισμού Βήματος

Για να χρησιμοποιήσετε βοηθούς ορισμού βήματος όπως `Given`, `When` ή `Then` ή hooks, πρέπει να τους εισάγετε από το `@cucumber/cucumber`, π.χ. ως εξής:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Τώρα, αν χρησιμοποιείτε ήδη το Cucumber για άλλους τύπους δοκιμών που δεν σχετίζονται με το WebdriverIO για το οποίο χρησιμοποιείτε μια συγκεκριμένη έκδοση, πρέπει να εισάγετε αυτούς τους βοηθούς στις δοκιμές e2e σας από το πακέτο Cucumber του WebdriverIO, π.χ.:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Αυτό διασφαλίζει ότι χρησιμοποιείτε τους σωστούς βοηθούς εντός του πλαισίου WebdriverIO και σας επιτρέπει να χρησιμοποιήσετε μια ανεξάρτητη έκδοση Cucumber για άλλους τύπους δοκιμών.

### Δημοσίευση Αναφοράς

Το Cucumber παρέχει μια λειτουργία για τη δημοσίευση των αναφορών εκτέλεσης δοκιμών σας στο `https://reports.cucumber.io/`, η οποία μπορεί να ελεγχθεί είτε με τη ρύθμιση της σημαίας `publish` στο `cucumberOpts` είτε με τη διαμόρφωση της μεταβλητής περιβάλλοντος `CUCUMBER_PUBLISH_TOKEN`. Ωστόσο, όταν χρησιμοποιείτε το `WebdriverIO` για την εκτέλεση δοκιμών, υπάρχει ένας περιορισμός με αυτήν την προσέγγιση. Ενημερώνει τις αναφορές ξεχωριστά για κάθε αρχείο χαρακτηριστικών, καθιστώντας δύσκολη την προβολή μιας ενοποιημένης αναφοράς.

Για να ξεπεράσουμε αυτόν τον περιορισμό, έχουμε εισαγάγει μια μέθοδο βασισμένη σε υποσχέσεις που ονομάζεται `publishCucumberReport` εντός του `@wdio/cucumber-framework`. Αυτή η μέθοδος θα πρέπει να καλείται στο hook `onComplete`, το οποίο είναι το βέλτιστο μέρος για να την καλέσετε. Το `publishCucumberReport` απαιτεί την είσοδο του καταλόγου αναφορών όπου αποθηκεύονται οι αναφορές μηνυμάτων cucumber.

Μπορείτε να δημιουργήσετε αναφορές `cucumber message` διαμορφώνοντας την επιλογή `format` στο `cucumberOpts` σας. Συνιστάται ιδιαίτερα να παρέχετε ένα δυναμικό όνομα αρχείου εντός της επιλογής μορφής `cucumber message` για να αποφύγετε την αντικατάσταση αναφορών και να διασφαλίσετε ότι κάθε εκτέλεση δοκιμής καταγράφεται με ακρίβεια.

Πριν χρησιμοποιήσετε αυτήν τη συνάρτηση, βεβαιωθείτε ότι έχετε ορίσει τις ακόλουθες μεταβλητές περιβάλλοντος:
- CUCUMBER_PUBLISH_REPORT_URL: Το URL όπου θέλετε να δημοσιεύσετε την αναφορά Cucumber. Εάν δεν παρέχεται, θα χρησιμοποιηθεί το προεπιλεγμένο URL 'https://messages.cucumber.io/api/reports'.
- CUCUMBER_PUBLISH_REPORT_TOKEN: Το διακριτικό εξουσιοδότησης που απαιτείται για τη δημοσίευση της αναφοράς. Εάν αυτό το διακριτικό δεν έχει οριστεί, η συνάρτηση θα εξέλθει χωρίς να δημοσιεύσει την αναφορά.

Ακολουθεί ένα παράδειγμα των απαραίτητων διαμορφώσεων και δειγμάτων κώδικα για την εφαρμογή:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Άλλες Επιλογές Διαμόρφωσης
    cucumberOpts: {
        // ... Διαμόρφωση Επιλογών Cucumber
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

Σημειώστε ότι το `./reports/` είναι ο κατάλογος όπου θα αποθηκευτούν οι αναφορές `cucumber message`.

## Χρήση του Serenity/JS

Το [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) είναι ένα πλαίσιο ανοιχτού κώδικα σχεδιασμένο για να κάνει τις δοκιμές αποδοχής και παλινδρόμησης πολύπλοκων συστημάτων λογισμικού ταχύτερες, πιο συνεργατικές και ευκολότερες στην κλιμάκωση.

Για σουίτες δοκιμών WebdriverIO, το Serenity/JS προσφέρει:
- [Ενισχυμένη Αναφορά](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Μπορείτε να χρησιμοποιήσετε το Serenity/JS
  ως άμεση αντικατάσταση οποιουδήποτε ενσωματωμένου πλαισίου WebdriverIO για να παράγετε εις βάθος αναφορές εκτέλεσης δοκιμών και ζωντανή τεκμηρίωση του έργου σας.
- [APIs Μοτίβου Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - Για να κάνετε τον κώδικα δοκιμών σας φορητό και επαναχρησιμοποιήσιμο σε έργα και ομάδες,
  το Serenity/JS σας δίνει ένα προαιρετικό [στρώμα αφαίρεσης](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) πάνω από τα εγγενή API του WebdriverIO.
- [Βιβλιοθήκες Ενσωμάτωσης](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Για σουίτες δοκιμών που ακολουθούν το Μοτίβο Screenplay,
  το Serenity/JS παρέχει επίσης προαιρετικές βιβλιοθήκες ενσωμάτωσης για να σας βοηθήσει να γράψετε [δοκιμές API](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  [να διαχειριστείτε τοπικούς διακομιστές](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [να εκτελέσετε ισχυρισμούς](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io), και πολλά άλλα!

![Παράδειγμα Αναφοράς Serenity BDD](/img/serenity-bdd-reporter.png)

### Εγκατάσταση του Serenity/JS

Για να προσθέσετε το Serenity/JS σε ένα [υπάρχον έργο WebdriverIO](https://webdriver.io/docs/gettingstarted), εγκαταστήστε τις ακόλουθες ενότητες Serenity/JS από το NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Μάθετε περισσότερα για τις ενότητες Serenity/JS:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Διαμόρφωση του Serenity/JS

Για να ενεργοποιήσετε την ενσωμάτωση με το Serenity/JS, διαμορφώστε το WebdriverIO ως εξής:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // Πείτε στο WebdriverIO να χρησιμοποιήσει το πλαίσιο Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Διαμόρφωση Serenity/JS
    serenity: {
        // Διαμορφώστε το Serenity/JS για να χρησιμοποιήσει τον κατάλληλο προσαρμογέα για τον εκτελεστή δοκιμών σας
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Καταχωρίστε υπηρεσίες αναφοράς Serenity/JS, γνωστές και ως "stage crew"
        crew: [
            // Προαιρετικό, εκτυπώστε τα αποτελέσματα εκτέλεσης δοκιμών στην τυπική έξοδο
            '@serenity-js/console-reporter',

            // Προαιρετικό, παράγετε αναφορές Serenity BDD και ζωντανή τεκμηρίωση (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Προαιρετικό, αυτόματη λήψη στιγμιότυπων οθόνης σε περίπτωση αποτυχίας αλληλεπίδρασης
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Διαμορφώστε τον εκτελεστή Cucumber σας
    cucumberOpts: {
        // δείτε τις επιλογές διαμόρφωσης Cucumber παρακάτω
    },


    // ... ή τον εκτελεστή Jasmine
    jasmineOpts: {
        // δείτε τις επιλογές διαμόρφωσης Jasmine παρακάτω
    },

    // ... ή τον εκτελεστή Mocha
    mochaOpts: {
        // δείτε τις επιλογές διαμόρφωσης Mocha παρακάτω
    },

    runner: 'local',

    // Οποιαδήποτε άλλη διαμόρφωση WebdriverIO
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // Πείτε στο WebdriverIO να χρησιμοποιήσει το πλαίσιο Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Διαμόρφωση Serenity/JS
    serenity: {
        // Διαμορφώστε το Serenity/JS για να χρησιμοποιήσει τον κατάλληλο προσαρμογέα για τον εκτελεστή δοκιμών σας
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Καταχωρίστε υπηρεσίες αναφοράς Serenity/JS, γνωστές και ως "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Διαμορφώστε τον εκτελεστή Cucumber σας
    cucumberOpts: {
        // δείτε τις επιλογές διαμόρφωσης Cucumber παρακάτω
    },


    // ... ή τον εκτελεστή Jasmine
    jasmineOpts: {
        // δείτε τις επιλογές διαμόρφωσης Jasmine παρακάτω
    },

    // ... ή τον εκτελεστή Mocha
    mochaOpts: {
        // δείτε τις επιλογές διαμόρφωσης Mocha παρακάτω
    },

    runner: 'local',

    // Οποιαδήποτε άλλη διαμόρφωση WebdriverIO
};
```

</TabItem>
</Tabs>

Μάθετε περισσότερα για:
- [Επιλογές διαμόρφωσης Cucumber του Serenity/JS](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Επιλογές διαμόρφωσης Jasmine του Serenity/JS](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Επιλογές διαμόρφωσης Mocha του Serenity/JS](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Αρχείο διαμόρφωσης WebdriverIO](configurationfile)

### Παραγωγή αναφορών Serenity BDD και ζωντανής τεκμηρίωσης

Οι [αναφορές Serenity BDD και η ζωντανή τεκμηρίωση](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) δημιουργούνται από το [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli),
ένα πρόγραμμα Java που λαμβάνεται και διαχειρίζεται από την ενότητα [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

Για να παράγετε αναφορές Serenity BDD, η σουίτα δοκιμών σας πρέπει:
- να κατεβάσει το Serenity BDD CLI, καλώντας το `serenity-bdd update` που αποθηκεύει στην προσωρινή μνήμη το `jar` του CLI τοπικά
- να παράγει ενδιάμεσες αναφορές Serenity BDD `.json`, καταχωρώντας το [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) σύμφωνα με τις [οδηγίες διαμόρφωσης](#configuring-serenityjs)
- να καλέσει το Serenity BDD CLI όταν θέλετε να παράγετε την αναφορά, καλώντας το `serenity-bdd run`

Το μοτίβο που χρησιμοποιείται από όλα τα [Πρότυπα Έργων Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) βασίζεται
στη χρήση:
- ενός σεναρίου NPM [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) για τη λήψη του Serenity BDD CLI
- του [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) για την εκτέλεση της διαδικασίας αναφοράς ακόμα και αν η ίδια η σουίτα δοκιμών έχει αποτύχει (που είναι ακριβώς όταν χρειάζεστε περισσότερο τις αναφορές δοκιμών...)
- του [`rimraf`](https://www.npmjs.com/package/rimraf) ως μέθοδος ευκολίας για την αφαίρεση τυχόν αναφορών δοκιμών που έχουν απομείνει από την προηγούμενη εκτέλεση

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

Για να μάθετε περισσότερα για το `SerenityBDDReporter`, παρακαλώ συμβουλευτείτε:
- τις οδηγίες εγκατάστασης στην [τεκμηρίωση του `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io),
- τα παραδείγματα διαμόρφωσης στα [έγγραφα API του `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io),
- τα [παραδείγματα του Serenity/JS στο GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Χρήση των APIs Μοτίβου Screenplay του Serenity/JS

Το [Μοτίβο Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) είναι μια καινοτόμος, επικεντρωμένη στον χρήστη προσέγγιση για τη συγγραφή δοκιμών αποδοχής υψηλής ποιότητας. Σας κατευθύνει προς μια αποτελεσματική χρήση επιπέδων αφαίρεσης,
βοηθά τα σενάρια δοκιμών σας να συλλάβουν την επιχειρηματική ορολογία του τομέα σας και ενθαρρύνει καλές συνήθειες δοκιμών και τεχνικής λογισμικού στην ομάδα σας.

Από προεπιλογή, όταν καταχωρείτε το `@serenity-js/webdriverio` ως το `framework` σας στο WebdriverIO,
το Serenity/JS διαμορφώνει ένα προεπιλεγμένο [cast](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) [ηθοποιών](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io),
όπου κάθε ηθοποιός μπορεί:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Αυτό θα πρέπει να είναι αρκετό για να σας βοηθήσει να ξεκινήσετε με την εισαγωγή σεναρίων δοκιμών που ακολουθούν το Μοτίβο Screenplay ακόμα και σε μια υπάρχουσα σουίτα δοκιμών, για παράδειγμα:

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Για να μάθετε περισσότερα για το Μοτίβο Screenplay, ελέγξτε:
- [Το Μοτίβο Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Δοκιμές ιστού με το Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)