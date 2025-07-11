---
id: bestpractices
title: Βέλτιστες Πρακτικές
---

# Βέλτιστες Πρακτικές

Αυτός ο οδηγός στοχεύει στο να μοιραστεί τις βέλτιστες πρακτικές μας που σας βοηθούν να γράψετε αποδοτικά και ανθεκτικά τεστ.

## Χρησιμοποιείτε ανθεκτικούς επιλογείς

Χρησιμοποιώντας επιλογείς που είναι ανθεκτικοί σε αλλαγές στο DOM, θα έχετε λιγότερα ή ακόμα και καθόλου τεστ που αποτυγχάνουν όταν για παράδειγμα μια κλάση αφαιρείται από ένα στοιχείο.

Οι κλάσεις μπορούν να εφαρμοστούν σε πολλαπλά στοιχεία και θα πρέπει να αποφεύγονται αν είναι δυνατόν, εκτός αν σκόπιμα θέλετε να ανακτήσετε όλα τα στοιχεία με αυτή την κλάση.

```js
// 👎
await $('.button')
```

Όλοι αυτοί οι επιλογείς θα πρέπει να επιστρέφουν ένα μόνο στοιχείο.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__Σημείωση:__ Για να μάθετε όλους τους πιθανούς επιλογείς που υποστηρίζει το WebdriverIO, ελέγξτε τη σελίδα [Selectors](./Selectors.md).

## Περιορίστε τον αριθμό των ερωτημάτων στοιχείων

Κάθε φορά που χρησιμοποιείτε την εντολή [`$`](https://webdriver.io/docs/api/browser/$) ή [`$$`](https://webdriver.io/docs/api/browser/$$) (αυτό περιλαμβάνει την αλυσιδωτή χρήση τους), το WebdriverIO προσπαθεί να εντοπίσει το στοιχείο στο DOM. Αυτά τα ερωτήματα είναι ακριβά, οπότε θα πρέπει να προσπαθήσετε να τα περιορίσετε όσο το δυνατόν περισσότερο.

Ερωτήματα τριών στοιχείων.

```js
// 👎
await $('table').$('tr').$('td')
```

Ερώτημα μόνο ενός στοιχείου.

``` js
// 👍
await $('table tr td')
```

Η μόνη περίπτωση που θα πρέπει να χρησιμοποιείτε αλυσιδωτή σύνδεση είναι όταν θέλετε να συνδυάσετε διαφορετικές [στρατηγικές επιλογέα](https://webdriver.io/docs/selectors/#custom-selector-strategies).
Στο παράδειγμα χρησιμοποιούμε τους [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors), που είναι μια στρατηγική για να εισέλθετε στο shadow DOM ενός στοιχείου.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Προτιμήστε τον εντοπισμό ενός μεμονωμένου στοιχείου αντί να πάρετε ένα από μια λίστα

Δεν είναι πάντα δυνατό, αλλά χρησιμοποιώντας CSS ψευδο-κλάσεις όπως το [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) μπορείτε να αντιστοιχίσετε στοιχεία με βάση τους δείκτες των στοιχείων στη λίστα παιδιών των γονέων τους.

Ερωτήματα όλων των γραμμών του πίνακα.

```js
// 👎
await $$('table tr')[15]
```

Ερώτημα μιας μόνο γραμμής πίνακα.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Χρησιμοποιείτε τους ενσωματωμένους ισχυρισμούς

Μην χρησιμοποιείτε χειροκίνητους ισχυρισμούς που δεν περιμένουν αυτόματα τα αποτελέσματα να ταιριάξουν, καθώς αυτό θα προκαλέσει ασταθή τεστ.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

Χρησιμοποιώντας τους ενσωματωμένους ισχυρισμούς, το WebdriverIO θα περιμένει αυτόματα το πραγματικό αποτέλεσμα να ταιριάξει με το αναμενόμενο αποτέλεσμα, οδηγώντας σε ανθεκτικά τεστ.
Το επιτυγχάνει αυτό επαναλαμβάνοντας αυτόματα τον ισχυρισμό μέχρι να περάσει ή να λήξει το χρονικό όριο.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Lazy loading και αλυσιδωτές υποσχέσεις

Το WebdriverIO έχει μερικά κόλπα όσον αφορά τη συγγραφή καθαρού κώδικα, καθώς μπορεί να φορτώσει με lazy loading το στοιχείο, γεγονός που σας επιτρέπει να αλυσιδώσετε τις υποσχέσεις σας και να μειώσετε τον αριθμό των `await`. Αυτό σας επιτρέπει επίσης να περάσετε το στοιχείο ως ChainablePromiseElement αντί για Element για ευκολότερη χρήση με αντικείμενα σελίδας.

Πότε πρέπει λοιπόν να χρησιμοποιείτε το `await`;
Θα πρέπει πάντα να χρησιμοποιείτε το `await` με εξαίρεση τις εντολές `$` και `$$`.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// or
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// or
await $('div').$('button').click()
```

## Μην υπερχρησιμοποιείτε εντολές και ισχυρισμούς

Όταν χρησιμοποιείτε το expect.toBeDisplayed περιμένετε σιωπηρά το στοιχείο να υπάρχει. Δεν υπάρχει ανάγκη να χρησιμοποιήσετε τις εντολές waitForXXX όταν έχετε ήδη έναν ισχυρισμό που κάνει το ίδιο πράγμα.

```js
// 👎
await button.waitForExist()
await expect(button).toBeDisplayed()

// 👎
await button.waitForDisplayed()
await expect(button).toBeDisplayed()

// 👍
await expect(button).toBeDisplayed()
```

Δεν χρειάζεται να περιμένετε ένα στοιχείο να υπάρχει ή να εμφανίζεται κατά την αλληλεπίδραση ή όταν ισχυρίζεστε κάτι όπως το κείμενό του, εκτός αν το στοιχείο μπορεί ρητά να είναι αόρατο (opacity: 0 για παράδειγμα) ή μπορεί ρητά να είναι απενεργοποιημένο (χαρακτηριστικό disabled για παράδειγμα), οπότε έχει νόημα να περιμένετε το στοιχείο να εμφανιστεί.

```js
// 👎
await expect(button).toBeExisting()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await button.click()
```

```js
// 👍
await button.click()

// 👍
await expect(button).toHaveText('Submit')
```

## Δυναμικά Τεστ

Χρησιμοποιήστε μεταβλητές περιβάλλοντος για να αποθηκεύσετε δυναμικά δεδομένα δοκιμών, π.χ. μυστικά διαπιστευτήρια, στο περιβάλλον σας αντί να τα κωδικοποιήσετε μέσα στο τεστ. Μεταβείτε στη σελίδα [Parameterize Tests](parameterize-tests) για περισσότερες πληροφορίες σχετικά με αυτό το θέμα.

## Ελέγξτε τον κώδικά σας

Χρησιμοποιώντας το eslint για να ελέγξετε τον κώδικά σας, μπορείτε δυνητικά να εντοπίσετε σφάλματα νωρίς. Χρησιμοποιήστε τους [κανόνες linting](https://www.npmjs.com/package/eslint-plugin-wdio) για να βεβαιωθείτε ότι εφαρμόζονται πάντα ορισμένες από τις βέλτιστες πρακτικές.

## Μην κάνετε παύση

Μπορεί να είναι δελεαστικό να χρησιμοποιήσετε την εντολή παύσης, αλλά η χρήση της είναι κακή ιδέα καθώς δεν είναι ανθεκτική και θα προκαλέσει ασταθή τεστ μακροπρόθεσμα.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // wait for submit button to enable
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## Ασύγχρονοι βρόχοι

Όταν έχετε κάποιον ασύγχρονο κώδικα που θέλετε να επαναλάβετε, είναι σημαντικό να γνωρίζετε ότι δεν μπορούν να το κάνουν όλοι οι βρόχοι.
Για παράδειγμα, η συνάρτηση forEach του Array δεν επιτρέπει ασύγχρονες επανακλήσεις, όπως μπορείτε να διαβάσετε στο [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Σημείωση:__ Μπορείτε ακόμα να τις χρησιμοποιήσετε όταν δεν χρειάζεται η λειτουργία να είναι ασύγχρονη, όπως φαίνεται σε αυτό το παράδειγμα `console.log(await $$('h1').map((h1) => h1.getText()))`.

Παρακάτω είναι μερικά παραδείγματα του τι σημαίνει αυτό.

Το ακόλουθο δεν θα λειτουργήσει καθώς δεν υποστηρίζονται ασύγχρονες επανακλήσεις.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

Το ακόλουθο θα λειτουργήσει.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## Διατηρήστε το απλό

Μερικές φορές βλέπουμε τους χρήστες μας να αντιστοιχίζουν δεδομένα όπως κείμενο ή τιμές. Αυτό συχνά δεν είναι απαραίτητο και συχνά είναι ένα σημάδι κακού κώδικα, ελέγξτε τα παρακάτω παραδείγματα για να δείτε γιατί συμβαίνει αυτό.

```js
// 👎 πολύ περίπλοκο, σύγχρονος ισχυρισμός, χρησιμοποιήστε τους ενσωματωμένους ισχυρισμούς για την αποφυγή ασταθών τεστ
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 πολύ περίπλοκο
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 βρίσκει στοιχεία με βάση το κείμενό τους αλλά δεν λαμβάνει υπόψη τη θέση των στοιχείων
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 χρησιμοποιήστε μοναδικά αναγνωριστικά (συχνά χρησιμοποιούνται για προσαρμοσμένα στοιχεία)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 ονόματα προσβασιμότητας (συχνά χρησιμοποιούνται για εγγενή στοιχεία html)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

Ένα άλλο πράγμα που βλέπουμε μερικές φορές είναι ότι απλά πράγματα έχουν μια υπερβολικά περίπλοκη λύση.

```js
// 👎
class BadExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasValue = (await element.getValue()) === value;
                if (hasValue) {
                    await $(element).click();
                }
                return hasValue;
            });
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasText = (await element.getText()) === text;
                if (hasText) {
                    await $(element).click();
                }
                return hasText;
            });
    }
}
```

```js
// 👍
class BetterExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $(`option[value=${value}]`).click();
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $(`option=${text}]`).click();
    }
}
```

## Εκτέλεση κώδικα παράλληλα

Αν δεν σας ενδιαφέρει η σειρά με την οποία εκτελείται κάποιος κώδικας, μπορείτε να χρησιμοποιήσετε το [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) για να επιταχύνετε την εκτέλεση.

__Σημείωση:__ Εφόσον αυτό κάνει τον κώδικα πιο δύσκολο στην ανάγνωση, θα μπορούσατε να το αφαιρέσετε χρησιμοποιώντας ένα αντικείμενο σελίδας ή μια συνάρτηση, αν και θα πρέπει επίσης να αναρωτηθείτε αν το όφελος στην απόδοση αξίζει το κόστος της αναγνωσιμότητας.

```js
// 👎
await name.setValue('Bob')
await email.setValue('bob@webdriver.io')
await age.setValue('50')
await submitFormButton.waitForEnabled()
await submitFormButton.click()

// 👍
await Promise.all([
    name.setValue('Bob'),
    email.setValue('bob@webdriver.io'),
    age.setValue('50'),
])
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

Εάν αφαιρεθεί, θα μπορούσε να μοιάζει κάπως έτσι, όπου η λογική τοποθετείται σε μια μέθοδο που ονομάζεται submitWithDataOf και τα δεδομένα ανακτώνται από την κλάση Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```