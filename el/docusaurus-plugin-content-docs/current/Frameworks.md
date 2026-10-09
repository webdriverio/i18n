---
id: frameworks
title: Πλαίσια
description: "Ρυθμίστε το Mocha, το Jasmine ή το Cucumber.js ως πλαίσιο δοκιμών για το WDIO testrunner, ή ενσωματώστε πλαίσια τρίτων, όπως το Serenity/JS."
---

Το WebdriverIO Runner διαθέτει ενσωματωμένη υποστήριξη για [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) και [Cucumber.js](https://cucumber.io/). Μπορείτε επίσης να το ενσωματώσετε με πλαίσια ανοιχτού κώδικα τρίτων, όπως το [Serenity/JS](#using-serenityjs).

:::tip Ενσωμάτωση του WebdriverIO με πλαίσια δοκιμών
Για να ενσωματώσετε το WebdriverIO με ένα πλαίσιο δοκιμών, χρειάζεστε ένα πακέτο προσαρμογέα (adapter) διαθέσιμο στο NPM.
Σημειώστε ότι το πακέτο προσαρμογέα πρέπει να εγκατασταθεί στην ίδια τοποθεσία όπου είναι εγκατεστημένο το WebdriverIO.
Έτσι, αν εγκαταστήσατε το WebdriverIO καθολικά (globally), φροντίστε να εγκαταστήσετε και το πακέτο προσαρμογέα καθολικά.
:::

Η ενσωμάτωση του WebdriverIO με ένα πλαίσιο δοκιμών σάς επιτρέπει να έχετε πρόσβαση στο στιγμιότυπο του WebDriver μέσω της καθολικής μεταβλητής `browser`
στα αρχεία spec ή στους ορισμούς βημάτων (step definitions).
Σημειώστε ότι το WebdriverIO φροντίζει επίσης για τη δημιουργία και τον τερματισμό της συνεδρίας Selenium, ώστε να μη χρειάζεται να το κάνετε
εσείς.

## Χρήση του Mocha

Αρχικά, εγκαταστήστε το πακέτο προσαρμογέα από το NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Από προεπιλογή, το WebdriverIO παρέχει μια ενσωματωμένη [βιβλιοθήκη assertions](assertion) την οποία μπορείτε να χρησιμοποιήσετε αμέσως:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Το WebdriverIO v10 περιλαμβάνει το [Mocha 12](https://mochajs.org/) και υποστηρίζει τις [διεπαφές](https://mochajs.org/#interfaces) `BDD` (προεπιλογή), `TDD` και `QUnit` του Mocha.

Αν θέλετε να γράφετε τα specs σας σε στυλ TDD, ορίστε την ιδιότητα `ui` στη ρύθμιση `mochaOpts` σε `tdd`. Πλέον τα αρχεία δοκιμών σας θα πρέπει να γράφονται ως εξής:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Αν θέλετε να ορίσετε άλλες ρυθμίσεις ειδικές για το Mocha, μπορείτε να το κάνετε με το κλειδί `mochaOpts` στο αρχείο ρυθμίσεών σας. Μια λίστα με όλες τις επιλογές υπάρχει στον [ιστότοπο του έργου Mocha](https://mochajs.org/api/mocha).

__Σημείωση:__ Το WebdriverIO δεν υποστηρίζει την παρωχημένη χρήση των callbacks `done` στο Mocha:

```js
it('should test something', (done) => {
    done() // προκαλεί σφάλμα "done is not a function"
})
```

### Επιλογές Mocha

Οι ακόλουθες επιλογές μπορούν να εφαρμοστούν στο `wdio.conf.js` σας για να ρυθμίσετε το περιβάλλον Mocha. __Σημείωση:__ δεν υποστηρίζονται όλες οι επιλογές του Mocha. Η επιλογή `parallel` εξακολουθεί να αφορά το δικό του worker pool του Mocha και θα προκαλέσει σφάλμα εδώ — το WDIO testrunner ήδη εκτελεί παράλληλα τα specs ανάμεσα σε capabilities και workers. Το CLI του Mocha 12 μετακινήθηκε επίσης από το yargs στο `util.parseArgs` του Node· αυτό επηρεάζει μόνο την άμεση κλήση του `mocha`, όχι τα `mochaOpts` που περνούν μέσω του `wdio`. Μπορείτε να περάσετε αυτές τις επιλογές πλαισίου ως ορίσματα, π.χ.:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Αυτό θα μεταβιβάσει τις ακόλουθες επιλογές Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

Υποστηρίζονται οι ακόλουθες επιλογές Mocha:

#### require

<Option type="string|string[]" default="[]">

Η επιλογή `require` είναι χρήσιμη όταν θέλετε να προσθέσετε ή να επεκτείνετε κάποια βασική λειτουργικότητα (επιλογή πλαισίου WebdriverIO).

</Option>

#### allowUncaught

<Option type="boolean" default="false">

Διάδοση των μη διαχειριζόμενων σφαλμάτων.

</Option>

#### bail

<Option type="boolean" default="false">

Διακοπή μετά την πρώτη αποτυχία δοκιμής.

</Option>

#### checkLeaks

<Option type="boolean" default="false">

Έλεγχος για διαρροές καθολικών μεταβλητών.

</Option>

#### delay

<Option type="boolean" default="false">

Καθυστέρηση εκτέλεσης της ριζικής σουίτας.

</Option>

#### failHookAffectedTests

<Option type="boolean" default="true">

Αναφέρει κάθε δοκιμή που παραλείφθηκε λόγω αποτυχημένου hook `before` ή `beforeEach` ως αποτυχία. Το WebdriverIO ενεργοποιεί αυτήν την επιλογή ώστε ένα χαλασμένο hook προετοιμασίας να είναι ορατό σε κάθε spec που παρέλειψε. Ορίστε την σε `false` για να αναφέρεται μόνο το hook.

</Option>

#### fgrep

<Option type="string" default="null">

Φίλτρο δοκιμών βάσει δοσμένης συμβολοσειράς.

</Option>

#### forbidOnly

<Option type="boolean" default="false">

Οι δοκιμές που έχουν σημειωθεί με `only` προκαλούν αποτυχία της σουίτας.

</Option>

#### forbidPending

<Option type="boolean" default="false">

Οι εκκρεμείς δοκιμές προκαλούν αποτυχία της σουίτας.

</Option>

#### fullTrace

<Option type="boolean" default="false">

Πλήρες stacktrace σε περίπτωση αποτυχίας.

</Option>

#### global

<Option type="string[]" default="[]">

Μεταβλητές που αναμένονται στο καθολικό εύρος (global scope).

</Option>

#### grep

<Option type="RegExp|string" default="null">

Φίλτρο δοκιμών βάσει δοσμένης κανονικής έκφρασης. Το Mocha 12 δέχεται σύγχρονες σημαίες RegExp σε αυτό το φίλτρο (για παράδειγμα `s` ή `d`).

</Option>

#### invert

<Option type="boolean" default="false">

Αντιστροφή των αντιστοιχιών του φίλτρου δοκιμών.

</Option>

#### retries

<Option type="number" default="0">

Αριθμός επαναλήψεων για τις αποτυχημένες δοκιμές.

</Option>

#### timeout

<Option type="number" default="30000">

Τιμή ορίου χρόνου (σε ms).

</Option>

## Χρήση του Jasmine

Αρχικά, εγκαταστήστε το πακέτο προσαρμογέα από το NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Στη συνέχεια μπορείτε να ρυθμίσετε το περιβάλλον Jasmine ορίζοντας την ιδιότητα `jasmineOpts` στη ρύθμισή σας. Μια λίστα με όλες τις επιλογές υπάρχει στον [ιστότοπο του έργου Jasmine](https://jasmine.github.io/api/edge/Configuration.html).

### Επιλογές Jasmine

Οι ακόλουθες επιλογές μπορούν να εφαρμοστούν στο `wdio.conf.js` σας για να ρυθμίσετε το περιβάλλον Jasmine χρησιμοποιώντας την ιδιότητα `jasmineOpts`. Για περισσότερες πληροφορίες σχετικά με αυτές τις επιλογές ρύθμισης, δείτε την [τεκμηρίωση του Jasmine](https://jasmine.github.io/api/edge/Configuration). Μπορείτε να περάσετε αυτές τις επιλογές πλαισίου ως ορίσματα, π.χ.:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Αυτό θα μεταβιβάσει τις ακόλουθες επιλογές Jasmine:

```ts
{
    grep: 'my test',
    failSpecWithNoExpectations: true,
    random: false
}
```

Υποστηρίζονται οι ακόλουθες επιλογές Jasmine:

#### defaultTimeoutInterval

<Option type="number" default="60000">

Προεπιλεγμένο χρονικό όριο για τις λειτουργίες του Jasmine.

</Option>

#### helpers

<Option type="string[]" default="[]">

Πίνακας διαδρομών αρχείων (και globs) σχετικών με το spec_dir που θα συμπεριληφθούν πριν από τα specs του Jasmine.

</Option>

#### requires

<Option type="string[]" default="[]">

Η επιλογή `requires` είναι χρήσιμη όταν θέλετε να προσθέσετε ή να επεκτείνετε κάποια βασική λειτουργικότητα.

</Option>

#### random

<Option type="boolean" default="false">

Αν θα γίνεται τυχαία η σειρά εκτέλεσης των specs. Η προεπιλογή του ίδιου του Jasmine είναι `true`, αλλά το WebdriverIO εκτελεί τα specs με τη σειρά, εκτός αν ορίσετε αυτήν την επιλογή.

</Option>

#### seed

<Option type="Function" default="null">

Seed που χρησιμοποιείται ως βάση για την τυχαιοποίηση. Η τιμή null προκαλεί τον τυχαίο καθορισμό του seed στην αρχή της εκτέλεσης.

</Option>

#### failSpecWithNoExpectations

<Option type="boolean" default="false">

Αν θα αποτυγχάνει το spec όταν δεν εκτέλεσε καμία προσδοκία (expectation). Από προεπιλογή, ένα spec που δεν εκτέλεσε καμία προσδοκία αναφέρεται ως επιτυχές. Ορίζοντας αυτό σε true, ένα τέτοιο spec θα αναφέρεται ως αποτυχία.

</Option>

#### oneFailurePerSpec

<Option type="boolean" default="false">

Διακόπτει ένα spec στην πρώτη αποτυχημένη προσδοκία του. Ένας αποτυχημένος σύγχρονος matcher διακόπτει αμέσως το spec, ενώ ένας ασύγχρονος matcher με await το διακόπτει όταν ολοκληρωθεί το promise του. Τα υπόλοιπα specs συνεχίζουν να εκτελούνται.

</Option>

#### specFilter

<Option type="Function" default="(spec) => true">

Συνάρτηση που χρησιμοποιείται για το φιλτράρισμα των specs.

</Option>

#### grep

<Option type="string|Regexp" default="null">

Εκτελεί μόνο τις δοκιμές που ταιριάζουν με αυτή τη συμβολοσειρά ή κανονική έκφραση. (Ισχύει μόνο αν δεν έχει οριστεί προσαρμοσμένη συνάρτηση `specFilter`)

</Option>

#### invertGrep

<Option type="boolean" default="false">

Αν είναι true, αντιστρέφει τις δοκιμές που ταιριάζουν και εκτελεί μόνο τις δοκιμές που δεν ταιριάζουν με την έκφραση που χρησιμοποιείται στο `grep`. (Ισχύει μόνο αν δεν έχει οριστεί προσαρμοσμένη συνάρτηση `specFilter`)

</Option>

#### stopOnSpecFailure

<Option type="boolean" default="false">

Διακόπτει το αρχείο spec στο πρώτο αποτυχημένο spec του (`it`): τα υπόλοιπα specs του αρχείου δεν εκτελούνται, ακόμη και σε άλλα μπλοκ `describe`. Τα άλλα αρχεία spec εκτελούνται στους δικούς τους workers και συνεχίζουν.

</Option>

#### cleanStack

<Option type="boolean" default="true">

Αφαιρεί τις γραμμές των πακέτων `node_modules` από τα stack traces των αποτυχιών.

</Option>

#### expectationResultHandler

<Option type="Function" default="null">

Καλείται με `(passed, assertion)` για κάθε προσδοκία, για παράδειγμα για τη λήψη στιγμιότυπου οθόνης όταν μια προσδοκία αποτυγχάνει. Αν η συνάρτηση προκαλέσει σφάλμα για μια επιτυχή προσδοκία, η προσδοκία αποτυγχάνει με αυτό το σφάλμα.

</Option>

### Assertions

Με το Jasmine, το καθολικό `expect` συνδυάζει τους matchers του Jasmine και τους [matchers του WebdriverIO](/docs/api/expect-webdriverio):

- Οι matchers του Jasmine (`toBe`, `toEqual`, `toHaveBeenCalled`, …) και οι matchers που προσθέτετε με `jasmine.addMatchers` είναι σύγχρονοι. Επιστρέφουν `undefined`, οπότε δεν χρειάζεστε `await`.
- Οι matchers του WebdriverIO, οι ασύγχρονοι matchers του Jasmine (`toBeResolved`, `toBeRejectedWith`, …) και οι matchers που προσθέτετε με `jasmine.addAsyncMatchers` επιστρέφουν ένα promise. Χρησιμοποιείτε πάντα `await` σε αυτούς.

Χρησιμοποιήστε το `expect()` και για τα δύο είδη: στέλνει κάθε matcher στο `expect` ή στο `expectAsync` του Jasmine για εσάς. Το `await expectAsync($('#logo')).toBeDisplayed()` επίσης λειτουργεί. Για TypeScript, το `@wdio/jasmine-framework` στα `types` παρέχει επίσης στο `expectAsync()` τους matchers του WebdriverIO.

```js
it('checks the page', async () => {
    expect([1, 2]).toHaveSize(2)                                   // Jasmine, σύγχρονο
    await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, ασύγχρονο
    await expect(loadData()).toBeResolved()                        // ασύγχρονος matcher του Jasmine
})
```

Το `toHaveSize` υπάρχει και στις δύο βιβλιοθήκες. Ο matcher του WebdriverIO εκτελείται σε τιμές του WebdriverIO: ένα στοιχείο, έναν πίνακα στοιχείων ή `Element[]` (για παράδειγμα το αποτέλεσμα του `$$().filter()`), ένα στοιχείο multi-remote, ένα browser, ένα browsing context, ένα mock, το wrapper `some()` ή ένα promise όπως ένα αλυσιδωτό `$()`. Ο matcher του Jasmine εκτελείται σε κάθε άλλη τιμή.

Οι ασύμμετροι matchers και των δύο βιβλιοθηκών λειτουργούν, τόσο στους matchers του Jasmine όσο και του WebdriverIO: `jasmine.any()`, `jasmine.objectContaining()`, `jasmine.stringMatching()`, … και `expect.any()`, `expect.stringContaining()`, `expect.oneOf()`, `expect.multiRemote()`, `expect.not.stringContaining()`, …. Για να χρησιμοποιήσετε το `some()`, κάντε το import:

```js
import { some } from 'expect-webdriverio/api'

await expect(some($$('li'))).toHaveAttribute('data-state', 'on')
```

Τα μέρη του `expect` που προέρχονται από το Jest δεν είναι διαθέσιμα με το Jasmine: matchers αποκλειστικά του Jest, όπως `toStrictEqual` ή `toHaveLength`, και το `expect.soft()`. Για να προσθέσετε έναν προσαρμοσμένο matcher, χρησιμοποιήστε το `expect.extend()` σε ένα αρχείο spec ή στο hook `before` (δείτε [Προσαρμοσμένοι Matchers](/docs/custommatchers)), ή το `jasmine.addMatchers` για σύγχρονο matcher και το `jasmine.addAsyncMatchers` για ασύγχρονο matcher.

Για TypeScript, προσθέστε το `jasmine` στα `types`, δείτε [Ρύθμιση TypeScript](/docs/typescript).

## Χρήση του Cucumber

Αρχικά, εγκαταστήστε το πακέτο προσαρμογέα από το NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Αν θέλετε να χρησιμοποιήσετε το Cucumber, ορίστε την ιδιότητα `framework` σε `cucumber` προσθέτοντας `framework: 'cucumber'` στο [αρχείο ρυθμίσεων](configurationfile).

Οι επιλογές για το Cucumber μπορούν να δοθούν στο αρχείο ρυθμίσεων με το `cucumberOpts`. Δείτε ολόκληρη τη λίστα επιλογών [εδώ](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options). Ο προσαρμογέας χρησιμοποιεί το Cucumber 13. Το `tagExpression` έχει αφαιρεθεί· φιλτράρετε με το `tags`. Δείτε τον [οδηγό μετάβασης στην v10](v10-migration#cucumber).

Για να ξεκινήσετε γρήγορα με το Cucumber, ρίξτε μια ματιά στο έργο μας [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate), το οποίο περιλαμβάνει όλους τους ορισμούς βημάτων που χρειάζεστε για να ξεκινήσετε, και θα γράφετε αρχεία feature αμέσως.

### Επιλογές Cucumber

Οι ακόλουθες επιλογές μπορούν να εφαρμοστούν στο `wdio.conf.js` σας για να ρυθμίσετε το περιβάλλον Cucumber χρησιμοποιώντας την ιδιότητα `cucumberOpts`:

:::tip Προσαρμογή επιλογών μέσω της γραμμής εντολών
Τα `cucumberOpts`, όπως προσαρμοσμένα `tags` για το φιλτράρισμα δοκιμών, μπορούν να καθοριστούν μέσω της γραμμής εντολών. Αυτό επιτυγχάνεται με τη μορφή `cucumberOpts.{optionName}="value"`.

Για παράδειγμα, αν θέλετε να εκτελέσετε μόνο τις δοκιμές που έχουν την ετικέτα `@smoke`, μπορείτε να χρησιμοποιήσετε την ακόλουθη εντολή:

```sh
# Όταν θέλετε να εκτελέσετε μόνο δοκιμές που έχουν την ετικέτα "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

Αυτή η εντολή ορίζει την επιλογή `tags` στα `cucumberOpts` σε `@smoke`, εξασφαλίζοντας ότι εκτελούνται μόνο οι δοκιμές με αυτήν την ετικέτα.

:::

#### backtrace

<Option type="Boolean" default="true">

Εμφάνιση πλήρους backtrace για τα σφάλματα.

</Option>

#### requireModule

<Option type="string[]" default="[]">

Φόρτωση modules πριν από τη φόρτωση οποιωνδήποτε αρχείων υποστήριξης.

</Option>
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

<Option type="boolean" default="false">

Ακύρωση της εκτέλεσης στην πρώτη αποτυχία.

</Option>

#### name

<Option type="RegExp[]" default="[]">

Εκτελεί μόνο τα σενάρια των οποίων το όνομα ταιριάζει με την έκφραση (επαναλαμβανόμενη).

</Option>

#### require

<Option type="string[]" default="[]">

Φόρτωση αρχείων που περιέχουν τους ορισμούς βημάτων σας πριν από την εκτέλεση των features. Μπορείτε επίσης να καθορίσετε ένα glob για τους ορισμούς βημάτων σας.

</Option>
Παράδειγμα:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import

<Option type="String[]" default="[]">

Διαδρομές προς το σημείο όπου βρίσκεται ο κώδικας υποστήριξής σας, για ESM.

</Option>
Παράδειγμα:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict

<Option type="boolean" default="false">

Αποτυχία αν υπάρχουν μη ορισμένα ή εκκρεμή βήματα.

</Option>

#### tags

<Option type="String" default="">

Εκτελεί μόνο τα features ή τα σενάρια με ετικέτες που ταιριάζουν με την έκφραση.
Για περισσότερες λεπτομέρειες, δείτε την [τεκμηρίωση του Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions).

</Option>

#### timeout

<Option type="Number" default="30000">

Χρονικό όριο σε χιλιοστά του δευτερολέπτου για τους ορισμούς βημάτων.

</Option>

#### retry

<Option type="Number" default="0">

Καθορίζει πόσες φορές θα επαναληφθούν οι αποτυχημένες περιπτώσεις δοκιμών.

</Option>

#### retryTagFilter

<Option type="RegExp">

Επαναλαμβάνει μόνο τα features ή τα σενάρια με ετικέτες που ταιριάζουν με την έκφραση (επαναλαμβανόμενη). Αυτή η επιλογή απαιτεί να έχει καθοριστεί το '--retry'.

</Option>

#### language

<Option type="String" default="en">

Προεπιλεγμένη γλώσσα για τα αρχεία feature σας

</Option>

#### order

<Option type="String" default="defined">

Εκτέλεση των δοκιμών με καθορισμένη / τυχαία σειρά

</Option>

#### format

<Option type="string[]">

Όνομα και διαδρομή αρχείου εξόδου του formatter που θα χρησιμοποιηθεί.
Το WebdriverIO υποστηρίζει κυρίως μόνο τους [Formatters](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) που γράφουν την έξοδο σε αρχείο.

</Option>

#### formatOptions

<Option type="object">

Επιλογές που θα παρέχονται στους formatters

</Option>

#### tagsInTitle

<Option type="Boolean" default="false">

Προσθήκη των ετικετών cucumber στο όνομα του feature ή του σεναρίου

</Option>
***Σημειώστε ότι αυτή είναι επιλογή ειδική για το @wdio/cucumber-framework και δεν αναγνωρίζεται από το ίδιο το cucumber-js***<br/>

#### ignoreUndefinedDefinitions

<Option type="Boolean" default="false">

Αντιμετώπιση των μη ορισμένων ορισμών ως προειδοποιήσεων.

</Option>
***Σημειώστε ότι αυτή είναι επιλογή ειδική για το @wdio/cucumber-framework και δεν αναγνωρίζεται από το ίδιο το cucumber-js***<br/>

#### failAmbiguousDefinitions

<Option type="Boolean" default="false">

Αντιμετώπιση των αμφίσημων ορισμών ως σφαλμάτων.

</Option>
***Σημειώστε ότι αυτή είναι επιλογή ειδική για το @wdio/cucumber-framework και δεν αναγνωρίζεται από το ίδιο το cucumber-js***<br/>

#### profile

<Option type="string[]" default="[]">

Καθορίζει το προφίλ που θα χρησιμοποιηθεί.

</Option>
***Λάβετε υπόψη ότι μόνο συγκεκριμένες τιμές (worldParameters, name, retryTagFilter) υποστηρίζονται μέσα στα προφίλ, καθώς τα `cucumberOpts` έχουν προτεραιότητα. Επιπλέον, όταν χρησιμοποιείτε ένα προφίλ, βεβαιωθείτε ότι οι αναφερόμενες τιμές δεν δηλώνονται μέσα στα `cucumberOpts`.***

### Παράλειψη δοκιμών στο cucumber

Σημειώστε ότι αν θέλετε να παραλείψετε μια δοκιμή χρησιμοποιώντας τις συνήθεις δυνατότητες φιλτραρίσματος δοκιμών του cucumber που είναι διαθέσιμες στα `cucumberOpts`, θα την παραλείψετε για όλους τους browsers και τις συσκευές που έχουν ρυθμιστεί στα capabilities. Για να μπορείτε να παραλείπετε σενάρια μόνο για συγκεκριμένους συνδυασμούς capabilities χωρίς να ξεκινά συνεδρία όταν δεν είναι απαραίτητο, το webdriverio παρέχει την ακόλουθη ειδική σύνταξη ετικέτας για το cucumber:

`@skip([condition])`

όπου condition είναι ένας προαιρετικός συνδυασμός ιδιοτήτων capabilities με τις τιμές τους, οι οποίες, όταν ταιριάζουν **όλες**, θα προκαλέσουν την παράλειψη του σεναρίου ή του feature που φέρει την ετικέτα. Φυσικά, μπορείτε να προσθέσετε πολλές ετικέτες σε σενάρια και features για να παραλείψετε μια δοκιμή υπό διάφορες συνθήκες.

Μπορείτε επίσης να χρησιμοποιήσετε την επισήμανση '@skip' για να παραλείψετε δοκιμές χωρίς να αλλάξετε τα `tags`. Σε αυτήν την περίπτωση, οι δοκιμές που παραλείφθηκαν θα εμφανίζονται στην αναφορά δοκιμών.

Ακολουθούν μερικά παραδείγματα αυτής της σύνταξης:
- `@skip` ή `@skip()`: θα παραλείπει πάντα το στοιχείο με την ετικέτα
- `@skip(browserName="chrome")`: η δοκιμή δεν θα εκτελεστεί σε browsers chrome.
- `@skip(browserName="firefox";platformName="linux")`: θα παραλείψει τη δοκιμή σε εκτελέσεις firefox σε linux.
- `@skip(browserName=["chrome","firefox"])`: τα στοιχεία με την ετικέτα θα παραλειφθούν και για τους browsers chrome και για firefox.
- `@skip(browserName=/i.*explorer/)`: τα capabilities με browsers που ταιριάζουν με την κανονική έκφραση θα παραλειφθούν (όπως `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Εισαγωγή βοηθών ορισμού βημάτων

Για να χρησιμοποιήσετε βοηθούς ορισμού βημάτων όπως `Given`, `When` ή `Then` ή hooks, πρέπει να τους εισάγετε από το `@cucumber/cucumber`, π.χ. ως εξής:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Αν χρησιμοποιείτε ήδη το Cucumber για άλλους τύπους δοκιμών που δεν σχετίζονται με το WebdriverIO, για τους οποίους χρησιμοποιείτε συγκεκριμένη έκδοση, πρέπει να εισάγετε αυτούς τους βοηθούς στις e2e δοκιμές σας από το πακέτο Cucumber του WebdriverIO, π.χ.:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Αυτό εξασφαλίζει ότι χρησιμοποιείτε τους σωστούς βοηθούς μέσα στο πλαίσιο WebdriverIO και σας επιτρέπει να χρησιμοποιείτε ανεξάρτητη έκδοση του Cucumber για άλλους τύπους δοκιμών.

### Δημοσίευση αναφοράς

Το Cucumber παρέχει μια λειτουργία για τη δημοσίευση των αναφορών εκτέλεσης δοκιμών σας στο `https://reports.cucumber.io/`, η οποία μπορεί να ελεγχθεί είτε ορίζοντας τη σημαία `publish` στα `cucumberOpts` είτε ρυθμίζοντας τη μεταβλητή περιβάλλοντος `CUCUMBER_PUBLISH_TOKEN`. Ωστόσο, όταν χρησιμοποιείτε το `WebdriverIO` για την εκτέλεση δοκιμών, υπάρχει ένας περιορισμός σε αυτήν την προσέγγιση. Ενημερώνει τις αναφορές ξεχωριστά για κάθε αρχείο feature, καθιστώντας δύσκολη την προβολή μιας ενοποιημένης αναφοράς.

Για να ξεπεραστεί αυτός ο περιορισμός, εισαγάγαμε μια μέθοδο βασισμένη σε promise με όνομα `publishCucumberReport` μέσα στο `@wdio/cucumber-framework`. Αυτή η μέθοδος πρέπει να καλείται στο hook `onComplete`, το οποίο είναι το βέλτιστο σημείο για την κλήση της. Το `publishCucumberReport` απαιτεί ως είσοδο τον κατάλογο αναφορών όπου αποθηκεύονται οι αναφορές cucumber message.

Μπορείτε να δημιουργήσετε αναφορές `cucumber message` ρυθμίζοντας την επιλογή `format` στα `cucumberOpts` σας. Συνιστάται ιδιαίτερα να παρέχετε ένα δυναμικό όνομα αρχείου στην επιλογή μορφής `cucumber message` για να αποφύγετε την αντικατάσταση αναφορών και να διασφαλίσετε ότι κάθε εκτέλεση δοκιμών καταγράφεται με ακρίβεια.

Πριν χρησιμοποιήσετε αυτήν τη συνάρτηση, φροντίστε να ορίσετε τις ακόλουθες μεταβλητές περιβάλλοντος:
- CUCUMBER_PUBLISH_REPORT_URL: Η διεύθυνση URL όπου θέλετε να δημοσιεύσετε την αναφορά Cucumber. Αν δεν παρέχεται, θα χρησιμοποιηθεί η προεπιλεγμένη διεύθυνση URL 'https://messages.cucumber.io/api/reports'.
- CUCUMBER_PUBLISH_REPORT_TOKEN: Το διακριτικό εξουσιοδότησης που απαιτείται για τη δημοσίευση της αναφοράς. Αν αυτό το διακριτικό δεν έχει οριστεί, η συνάρτηση θα τερματιστεί χωρίς να δημοσιεύσει την αναφορά.

Ακολουθεί ένα παράδειγμα των απαραίτητων ρυθμίσεων και δειγμάτων κώδικα για την υλοποίηση:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Άλλες επιλογές ρύθμισης
    cucumberOpts: {
        // ... Ρύθμιση επιλογών Cucumber
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

Σημειώστε ότι το `./reports/` είναι ο κατάλογος όπου θα αποθηκεύονται οι αναφορές `cucumber message`.

## Χρήση του Serenity/JS

Το [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) είναι ένα πλαίσιο ανοιχτού κώδικα σχεδιασμένο ώστε οι δοκιμές αποδοχής και παλινδρόμησης σύνθετων συστημάτων λογισμικού να γίνονται ταχύτερα, πιο συνεργατικά και να κλιμακώνονται ευκολότερα.

Για σουίτες δοκιμών WebdriverIO, το Serenity/JS προσφέρει:
- [Βελτιωμένες αναφορές](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Μπορείτε να χρησιμοποιήσετε το Serenity/JS
  ως άμεσο υποκατάστατο οποιουδήποτε ενσωματωμένου πλαισίου του WebdriverIO για να παράγετε αναλυτικές αναφορές εκτέλεσης δοκιμών και ζωντανή τεκμηρίωση του έργου σας.
- [APIs του Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - Για να γίνει ο κώδικας δοκιμών σας φορητός και επαναχρησιμοποιήσιμος σε έργα και ομάδες,
  το Serenity/JS σάς παρέχει ένα προαιρετικό [επίπεδο αφαίρεσης](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) πάνω από τα εγγενή APIs του WebdriverIO.
- [Βιβλιοθήκες ενσωμάτωσης](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Για σουίτες δοκιμών που ακολουθούν το Screenplay Pattern,
  το Serenity/JS παρέχει επίσης προαιρετικές βιβλιοθήκες ενσωμάτωσης που σας βοηθούν να γράφετε [δοκιμές API](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  να [διαχειρίζεστε τοπικούς servers](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), να [εκτελείτε assertions](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io) και πολλά άλλα!

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### Εγκατάσταση του Serenity/JS

Για να προσθέσετε το Serenity/JS σε ένα [υπάρχον έργο WebdriverIO](https://webdriver.io/docs/gettingstarted), εγκαταστήστε τα ακόλουθα modules του Serenity/JS από το NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Μάθετε περισσότερα για τα modules του Serenity/JS:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Ρύθμιση του Serenity/JS

Για να ενεργοποιήσετε την ενσωμάτωση με το Serenity/JS, ρυθμίστε το WebdriverIO ως εξής:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // Ενημερώστε το WebdriverIO να χρησιμοποιεί το πλαίσιο Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Ρύθμιση του Serenity/JS
    serenity: {
        // Ρυθμίστε το Serenity/JS να χρησιμοποιεί τον κατάλληλο προσαρμογέα για τον test runner σας
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Καταχωρίστε τις υπηρεσίες αναφορών του Serenity/JS, γνωστές και ως "stage crew"
        crew: [
            // Προαιρετικό, εκτύπωση των αποτελεσμάτων εκτέλεσης δοκιμών στην τυπική έξοδο
            '@serenity-js/console-reporter',

            // Προαιρετικό, παραγωγή αναφορών Serenity BDD και ζωντανής τεκμηρίωσης (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Προαιρετικό, αυτόματη λήψη στιγμιότυπων οθόνης σε αποτυχία αλληλεπίδρασης
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Ρυθμίστε τον Cucumber runner σας
    cucumberOpts: {
        // δείτε τις επιλογές ρύθμισης του Cucumber παρακάτω
    },

    // ... ή τον Jasmine runner
    jasmineOpts: {
        // δείτε τις επιλογές ρύθμισης του Jasmine παρακάτω
    },

    // ... ή τον Mocha runner
    mochaOpts: {
        // δείτε τις επιλογές ρύθμισης του Mocha παρακάτω
    },

    runner: 'local',

    // Οποιαδήποτε άλλη ρύθμιση του WebdriverIO
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // Ενημερώστε το WebdriverIO να χρησιμοποιεί το πλαίσιο Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Ρύθμιση του Serenity/JS
    serenity: {
        // Ρυθμίστε το Serenity/JS να χρησιμοποιεί τον κατάλληλο προσαρμογέα για τον test runner σας
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Καταχωρίστε τις υπηρεσίες αναφορών του Serenity/JS, γνωστές και ως "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Ρυθμίστε τον Cucumber runner σας
    cucumberOpts: {
        // δείτε τις επιλογές ρύθμισης του Cucumber παρακάτω
    },

    // ... ή τον Jasmine runner
    jasmineOpts: {
        // δείτε τις επιλογές ρύθμισης του Jasmine παρακάτω
    },

    // ... ή τον Mocha runner
    mochaOpts: {
        // δείτε τις επιλογές ρύθμισης του Mocha παρακάτω
    },

    runner: 'local',

    // Οποιαδήποτε άλλη ρύθμιση του WebdriverIO
};
```

</TabItem>
</Tabs>

Μάθετε περισσότερα για:
- [Επιλογές ρύθμισης Cucumber του Serenity/JS](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Επιλογές ρύθμισης Jasmine του Serenity/JS](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Επιλογές ρύθμισης Mocha του Serenity/JS](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Αρχείο ρυθμίσεων WebdriverIO](configurationfile)

### Παραγωγή αναφορών Serenity BDD και ζωντανής τεκμηρίωσης

Οι [αναφορές Serenity BDD και η ζωντανή τεκμηρίωση](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) παράγονται από το [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli),
ένα πρόγραμμα Java που κατεβαίνει και διαχειρίζεται από το module [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

Για να παράγει αναφορές Serenity BDD, η σουίτα δοκιμών σας πρέπει:
- να κατεβάσει το Serenity BDD CLI, καλώντας το `serenity-bdd update`, το οποίο αποθηκεύει τοπικά στην cache το `jar` του CLI
- να παράγει ενδιάμεσες αναφορές Serenity BDD `.json`, καταχωρίζοντας το [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) σύμφωνα με τις [οδηγίες ρύθμισης](#configuring-serenityjs)
- να καλέσει το Serenity BDD CLI όταν θέλετε να παραχθεί η αναφορά, καλώντας το `serenity-bdd run`

Το μοτίβο που χρησιμοποιείται από όλα τα [Πρότυπα Έργων Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) βασίζεται
στη χρήση:
- ενός NPM script [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) για τη λήψη του Serenity BDD CLI
- του [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) για την εκτέλεση της διαδικασίας αναφορών ακόμη και αν η ίδια η σουίτα δοκιμών έχει αποτύχει (που είναι ακριβώς η στιγμή που χρειάζεστε περισσότερο τις αναφορές δοκιμών...).
- του [`rimraf`](https://www.npmjs.com/package/rimraf) ως βολικής μεθόδου για την αφαίρεση τυχόν αναφορών δοκιμών που απέμειναν από την προηγούμενη εκτέλεση

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

Για να μάθετε περισσότερα για το `SerenityBDDReporter`, συμβουλευτείτε:
- τις οδηγίες εγκατάστασης στην [τεκμηρίωση του `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io),
- τα παραδείγματα ρύθμισης στην [τεκμηρίωση API του `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io),
- τα [παραδείγματα Serenity/JS στο GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Χρήση των APIs του Screenplay Pattern του Serenity/JS

Το [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) είναι μια καινοτόμος, ανθρωποκεντρική προσέγγιση για τη συγγραφή υψηλής ποιότητας αυτοματοποιημένων δοκιμών αποδοχής. Σας κατευθύνει προς την αποτελεσματική χρήση επιπέδων αφαίρεσης,
βοηθά τα σενάρια δοκιμών σας να αποτυπώνουν την επιχειρησιακή ορολογία του τομέα σας και ενθαρρύνει καλές συνήθειες δοκιμών και μηχανικής λογισμικού στην ομάδα σας.

Από προεπιλογή, όταν καταχωρίζετε το `@serenity-js/webdriverio` ως το `framework` του WebdriverIO,
το Serenity/JS ρυθμίζει ένα προεπιλεγμένο [cast](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) από [actors](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io),
όπου κάθε actor μπορεί να:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Αυτό θα πρέπει να είναι αρκετό για να ξεκινήσετε να εισάγετε σενάρια δοκιμών που ακολουθούν το Screenplay Pattern ακόμη και σε μια υπάρχουσα σουίτα δοκιμών, για παράδειγμα:

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

Για να μάθετε περισσότερα για το Screenplay Pattern, δείτε:
- [Το Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Δοκιμές web με το Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)