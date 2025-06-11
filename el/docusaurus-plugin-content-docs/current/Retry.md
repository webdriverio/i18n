---
id: retry
title: Επανάληψη Ασταθών Δοκιμών
---

Μπορείτε να επανεκτελέσετε συγκεκριμένες δοκιμές με το testrunner του WebdriverIO που αποδεικνύονται ασταθείς λόγω καταστάσεων όπως ασταθές δίκτυο ή συνθήκες ανταγωνισμού. (Ωστόσο, δεν συνιστάται απλώς να αυξήσετε το ποσοστό επανεκτέλεσης αν οι δοκιμές γίνουν ασταθείς!)

## Επανεκτέλεση σουιτών στο Mocha

Από την έκδοση 3 του Mocha, μπορείτε να επανεκτελέσετε ολόκληρες σουίτες δοκιμών (όλα όσα βρίσκονται μέσα σε ένα μπλοκ `describe`). Εάν χρησιμοποιείτε το Mocha, θα πρέπει να προτιμήσετε αυτόν τον μηχανισμό επανάληψης αντί της υλοποίησης του WebdriverIO που σας επιτρέπει μόνο να επανεκτελέσετε συγκεκριμένα μπλοκ δοκιμών (όλα όσα βρίσκονται μέσα σε ένα μπλοκ `it`). Για να χρησιμοποιήσετε τη μέθοδο `this.retries()`, το μπλοκ σουίτας `describe` πρέπει να χρησιμοποιεί μια μη δεσμευμένη συνάρτηση `function(){}` αντί για μια συνάρτηση βέλους `() => {}`, όπως περιγράφεται στα [έγγραφα του Mocha](https://mochajs.org/#arrow-functions). Χρησιμοποιώντας το Mocha μπορείτε επίσης να ορίσετε έναν αριθμό επαναλήψεων για όλες τις προδιαγραφές χρησιμοποιώντας το `mochaOpts.retries` στο αρχείο `wdio.conf.js`.

Εδώ είναι ένα παράδειγμα:

```js
describe('retries', function () {
    // Retry all tests in this suite up to 4 times
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Specify this test to only retry up to 2 times
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Επανεκτέλεση μεμονωμένων δοκιμών σε Jasmine ή Mocha

Για να επανεκτελέσετε ένα συγκεκριμένο μπλοκ δοκιμής, μπορείτε απλά να εφαρμόσετε τον αριθμό των επανεκτελέσεων ως τελευταία παράμετρο μετά τη συνάρτηση του μπλοκ δοκιμής:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
  ]
}>
<TabItem value="mocha">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, 3)
})
```

Το ίδιο λειτουργεί και για τα hooks:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, 1)

    // ...
})
```

</TabItem>
<TabItem value="jasmine">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

Το ίδιο λειτουργεί και για τα hooks:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Αν χρησιμοποιείτε το Jasmine, η δεύτερη παράμετρος προορίζεται για το timeout. Για να εφαρμόσετε μια παράμετρο επανάληψης, πρέπει να ορίσετε το timeout στην προεπιλεγμένη τιμή του `jasmine.DEFAULT_TIMEOUT_INTERVAL` και στη συνέχεια να εφαρμόσετε τον αριθμό επαναλήψεων.

</TabItem>
</Tabs>

Αυτός ο μηχανισμός επανάληψης επιτρέπει μόνο την επανάληψη μεμονωμένων hooks ή μπλοκ δοκιμών. Εάν η δοκιμή σας συνοδεύεται από ένα hook για τη ρύθμιση της εφαρμογής σας, αυτό το hook δεν εκτελείται. Το [Mocha προσφέρει](https://mochajs.org/#retry-tests) εγγενείς επαναλήψεις δοκιμών που παρέχουν αυτή τη συμπεριφορά, ενώ το Jasmine όχι. Μπορείτε να έχετε πρόσβαση στον αριθμό των εκτελεσμένων επαναλήψεων στο hook `afterTest`.

## Επανεκτέλεση στο Cucumber

### Επανεκτέλεση πλήρων σουιτών στο Cucumber

Για το cucumber >=6 μπορείτε να παρέχετε την επιλογή διαμόρφωσης [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) μαζί με μια προαιρετική παράμετρο `retryTagFilter` για να επιτρέψετε σε όλα ή μερικά από τα αποτυχημένα σενάρια να λάβουν πρόσθετες επαναλήψεις μέχρι να επιτύχουν. Για να λειτουργήσει αυτό το χαρακτηριστικό, πρέπει να ορίσετε το `scenarioLevelReporter` σε `true`.

### Επανεκτέλεση Ορισμών Βημάτων στο Cucumber

Για να ορίσετε ένα ποσοστό επανεκτέλεσης για συγκεκριμένους ορισμούς βημάτων, απλά εφαρμόστε μια επιλογή επανάληψης σε αυτό, όπως:

```js
export default function () {
    /**
     * step definition that runs max 3 times (1 actual run + 2 reruns)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Οι επανεκτελέσεις μπορούν να οριστούν μόνο στο αρχείο ορισμών βημάτων σας, ποτέ στο αρχείο χαρακτηριστικών.

## Προσθήκη επαναλήψεων σε βάση ανά αρχείο specfile

Προηγουμένως, ήταν διαθέσιμες μόνο επαναλήψεις σε επίπεδο δοκιμής και σουίτας, που είναι εντάξει στις περισσότερες περιπτώσεις.

Αλλά σε οποιεσδήποτε δοκιμές που περιλαμβάνουν κατάσταση (όπως σε έναν διακομιστή ή σε μια βάση δεδομένων), η κατάσταση μπορεί να παραμείνει άκυρη μετά την πρώτη αποτυχία της δοκιμής. Οποιεσδήποτε επόμενες επαναλήψεις μπορεί να μην έχουν καμία πιθανότητα επιτυχίας, λόγω της άκυρης κατάστασης με την οποία θα ξεκινήσουν.

Ένα νέο στιγμιότυπο `browser` δημιουργείται για κάθε αρχείο specfile, γεγονός που το καθιστά ιδανικό σημείο για hook και ρύθμιση άλλων καταστάσεων (διακομιστή, βάσεις δεδομένων). Οι επαναλήψεις σε αυτό το επίπεδο σημαίνουν ότι ολόκληρη η διαδικασία ρύθμισης θα επαναληφθεί απλά, ακριβώς όπως θα ήταν για ένα νέο αρχείο specfile.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * The number of times to retry the entire specfile when it fails as a whole
     */
    specFileRetries: 1,
    /**
     * Delay in seconds between the spec file retry attempts
     */
    specFileRetriesDelay: 0,
    /**
     * Retried specfiles are inserted at the beginning of the queue and retried immediately
     */
    specFileRetriesDeferred: false
}
```

## Εκτέλεση μιας συγκεκριμένης δοκιμής πολλές φορές

Αυτό βοηθά στην αποτροπή της εισαγωγής ασταθών δοκιμών σε μια βάση κώδικα. Προσθέτοντας την επιλογή cli `--repeat`, θα εκτελέσει τις καθορισμένες προδιαγραφές ή σουίτες N φορές. Όταν χρησιμοποιείτε αυτή τη σημαία cli, πρέπει επίσης να καθοριστεί η σημαία `--spec` ή `--suite`.

Όταν προσθέτετε νέες δοκιμές σε μια βάση κώδικα, ειδικά μέσω μιας διαδικασίας CI/CD, οι δοκιμές θα μπορούσαν να περάσουν και να συγχωνευθούν, αλλά να γίνουν ασταθείς αργότερα. Αυτή η αστάθεια θα μπορούσε να προέρχεται από διάφορα πράγματα όπως προβλήματα δικτύου, φόρτο διακομιστή, μέγεθος βάσης δεδομένων κλπ. Η χρήση της σημαίας `--repeat` στη διαδικασία CD/CD μπορεί να βοηθήσει στον εντοπισμό αυτών των ασταθών δοκιμών πριν συγχωνευθούν σε μια κύρια βάση κώδικα.

Μια στρατηγική που μπορείτε να χρησιμοποιήσετε είναι να εκτελέσετε τις δοκιμές σας κανονικά στη διαδικασία CI/CD, αλλά αν εισάγετε μια νέα δοκιμή, μπορείτε να εκτελέσετε ένα άλλο σύνολο δοκιμών με τη νέα προδιαγραφή που καθορίζεται στο `--spec` μαζί με το `--repeat` έτσι ώστε να εκτελέσει τη νέα δοκιμή x αριθμό φορών. Εάν η δοκιμή αποτύχει οποιαδήποτε από αυτές τις φορές, τότε η δοκιμή δεν θα συγχωνευθεί και θα πρέπει να εξεταστεί γιατί απέτυχε.

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```