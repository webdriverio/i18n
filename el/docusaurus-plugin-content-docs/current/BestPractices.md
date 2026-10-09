---
id: bestpractices
title: Βέλτιστες Πρακτικές
description: "Γράψτε γρήγορα, ανθεκτικά τεστ με το WebdriverIO χρησιμοποιώντας σταθερούς selectors, λιγότερα ερωτήματα στοιχείων, ενσωματωμένους ισχυρισμούς και χωρίς χειροκίνητες παύσεις."
---

# Βέλτιστες Πρακτικές

Αυτός ο οδηγός στοχεύει να μοιραστεί τις βέλτιστες πρακτικές μας που σας βοηθούν να γράφετε αποδοτικά και ανθεκτικά τεστ.

## Χρησιμοποιήστε ανθεκτικούς selectors

Χρησιμοποιώντας selectors που είναι ανθεκτικοί σε αλλαγές στο DOM, θα έχετε λιγότερα ή ακόμα και καθόλου τεστ που αποτυγχάνουν όταν, για παράδειγμα, αφαιρείται μια κλάση από ένα στοιχείο.

Οι κλάσεις μπορούν να εφαρμοστούν σε πολλαπλά στοιχεία και θα πρέπει να αποφεύγονται αν είναι δυνατόν, εκτός αν θέλετε σκόπιμα να ανακτήσετε όλα τα στοιχεία με αυτή την κλάση.

```js
// 👎
await $('.button')
```

Όλοι αυτοί οι selectors θα πρέπει να επιστρέφουν ένα μόνο στοιχείο.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__Σημείωση:__ Για να μάθετε όλους τους πιθανούς selectors που υποστηρίζει το WebdriverIO, δείτε τη σελίδα μας [Selectors](./Selectors.md).

## Περιορίστε τον αριθμό των ερωτημάτων στοιχείων

Κάθε φορά που χρησιμοποιείτε την εντολή [`$`](https://webdriver.io/docs/api/browser/$) ή [`$$`](https://webdriver.io/docs/api/browser/$$) (αυτό περιλαμβάνει και την αλυσιδωτή χρήση τους), το WebdriverIO προσπαθεί να εντοπίσει το στοιχείο στο DOM. Αυτά τα ερωτήματα είναι δαπανηρά, οπότε θα πρέπει να προσπαθείτε να τα περιορίζετε όσο το δυνατόν περισσότερο.

Αναζητά τρία στοιχεία.

```js
// 👎
await $('table').$('tr').$('td')
```

Αναζητά μόνο ένα στοιχείο.

``` js
// 👍
await $('table tr td')
```

Η μόνη περίπτωση που θα πρέπει να χρησιμοποιείτε αλυσιδωτή σύνδεση είναι όταν θέλετε να συνδυάσετε διαφορετικές [στρατηγικές selectors](https://webdriver.io/docs/selectors/#custom-selector-strategies).
Στο παράδειγμα χρησιμοποιούμε τους [Deep Selectors](https://webdriver.io/docs/selectors#deep-selectors), που είναι μια στρατηγική για να εισέλθουμε στο shadow DOM ενός στοιχείου.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### Προτιμήστε τον εντοπισμό ενός μόνο στοιχείου αντί να παίρνετε ένα από μια λίστα

Δεν είναι πάντα δυνατό να γίνει αυτό, αλλά χρησιμοποιώντας CSS pseudo-classes όπως η [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) μπορείτε να ταιριάξετε στοιχεία με βάση τους δείκτες των στοιχείων στη λίστα θυγατρικών στοιχείων των γονέων τους.

Αναζητά όλες τις γραμμές του πίνακα.

```js
// 👎
await $$('table tr')[15]
```

Αναζητά μία μόνο γραμμή του πίνακα.

```js
// 👍
await $('table tr:nth-child(15)')
```

## Χρησιμοποιήστε τους ενσωματωμένους ισχυρισμούς

Μη χρησιμοποιείτε χειροκίνητους ισχυρισμούς που δεν περιμένουν αυτόματα να ταιριάξουν τα αποτελέσματα, καθώς αυτό θα οδηγήσει σε ασταθή (flaky) τεστ.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

Χρησιμοποιώντας τους ενσωματωμένους ισχυρισμούς, το WebdriverIO θα περιμένει αυτόματα το πραγματικό αποτέλεσμα να ταιριάξει με το αναμενόμενο αποτέλεσμα, με αποτέλεσμα ανθεκτικά τεστ.
Αυτό επιτυγχάνεται επαναλαμβάνοντας αυτόματα τον ισχυρισμό μέχρι να επιτύχει ή να λήξει το χρονικό όριο.

```js
// 👍
await expect(button).toBeDisplayed()
```

## Lazy loading και αλυσιδωτή σύνδεση promises

Το WebdriverIO έχει μερικά κόλπα όσον αφορά τη συγγραφή καθαρού κώδικα, καθώς μπορεί να φορτώσει τα στοιχεία με lazy loading, κάτι που σας επιτρέπει να συνδέετε αλυσιδωτά τα promises σας και μειώνει τον αριθμό των `await`. Αυτό σας επιτρέπει επίσης να περνάτε το στοιχείο ως ChainablePromiseElement αντί για Element και διευκολύνει τη χρήση με page objects.

Πότε λοιπόν πρέπει να χρησιμοποιείτε το `await`;
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

## Μην υπερβάλλετε με τις εντολές και τους ισχυρισμούς

Όταν χρησιμοποιείτε το expect.toBeDisplayed, περιμένετε έμμεσα και για την ύπαρξη του στοιχείου. Δεν υπάρχει ανάγκη να χρησιμοποιείτε τις εντολές waitForXXX όταν έχετε ήδη έναν ισχυρισμό που κάνει το ίδιο πράγμα.

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

Δεν χρειάζεται να περιμένετε να υπάρξει ή να εμφανιστεί ένα στοιχείο όταν αλληλεπιδράτε μαζί του ή όταν ελέγχετε κάτι όπως το κείμενό του, εκτός αν το στοιχείο μπορεί ρητά να είναι αόρατο (για παράδειγμα opacity: 0) ή μπορεί ρητά να είναι απενεργοποιημένο (για παράδειγμα με το attribute disabled), οπότε σε αυτή την περίπτωση έχει νόημα να περιμένετε να εμφανιστεί το στοιχείο.

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

Χρησιμοποιήστε μεταβλητές περιβάλλοντος για να αποθηκεύετε δυναμικά δεδομένα τεστ, π.χ. μυστικά διαπιστευτήρια, μέσα στο περιβάλλον σας αντί να τα ενσωματώνετε απευθείας στο τεστ. Μεταβείτε στη σελίδα [Parameterize Tests](parameterize-tests) για περισσότερες πληροφορίες σχετικά με αυτό το θέμα.

## Κάντε lint τον κώδικά σας

Χρησιμοποιώντας το eslint για να κάνετε lint τον κώδικά σας, μπορείτε ενδεχομένως να εντοπίσετε σφάλματα νωρίς. Χρησιμοποιήστε τους [κανόνες linting](https://www.npmjs.com/package/eslint-plugin-wdio) μας για να βεβαιωθείτε ότι ορισμένες από τις βέλτιστες πρακτικές εφαρμόζονται πάντα.

## Μην κάνετε παύσεις

Μπορεί να είναι δελεαστικό να χρησιμοποιήσετε την εντολή pause, αλλά αυτό είναι κακή ιδέα, καθώς δεν είναι ανθεκτική και μακροπρόθεσμα θα προκαλέσει μόνο ασταθή τεστ.

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

Όταν έχετε κάποιον ασύγχρονο κώδικα που θέλετε να επαναλάβετε, είναι σημαντικό να γνωρίζετε ότι δεν μπορούν όλοι οι βρόχοι να το κάνουν αυτό.
Για παράδειγμα, η συνάρτηση forEach του Array δεν επιτρέπει ασύγχρονα callbacks, όπως μπορείτε να διαβάσετε στο [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__Σημείωση:__ Μπορείτε ακόμα να τις χρησιμοποιείτε όταν δεν χρειάζεται η λειτουργία να είναι ασύγχρονη, όπως φαίνεται σε αυτό το παράδειγμα `console.log(await $$('h1').map((h1) => h1.getText()))`.

Παρακάτω υπάρχουν μερικά παραδείγματα του τι σημαίνει αυτό.

Το παρακάτω δεν θα λειτουργήσει, καθώς τα ασύγχρονα callbacks δεν υποστηρίζονται.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

Το παρακάτω θα λειτουργήσει.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## Κρατήστε το απλό

Μερικές φορές βλέπουμε τους χρήστες μας να αντιστοιχίζουν (map) δεδομένα όπως κείμενο ή τιμές. Αυτό συχνά δεν χρειάζεται και συχνά αποτελεί ένδειξη κακού κώδικα (code smell). Δείτε τα παρακάτω παραδείγματα για να καταλάβετε γιατί συμβαίνει αυτό.

```js
// 👎 υπερβολικά πολύπλοκο, σύγχρονος ισχυρισμός, χρησιμοποιήστε τους ενσωματωμένους ισχυρισμούς για να αποφύγετε ασταθή τεστ
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 υπερβολικά πολύπλοκο
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 βρίσκει στοιχεία από το κείμενό τους αλλά δεν λαμβάνει υπόψη τη θέση των στοιχείων
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 χρησιμοποιήστε μοναδικά αναγνωριστικά (συχνά χρησιμοποιούνται για custom elements)
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

## Παράλληλη εκτέλεση κώδικα

Αν δεν σας ενδιαφέρει η σειρά με την οποία εκτελείται κάποιος κώδικας, μπορείτε να χρησιμοποιήσετε το [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) για να επιταχύνετε την εκτέλεση.

__Σημείωση:__ Επειδή αυτό κάνει τον κώδικα πιο δυσανάγνωστο, θα μπορούσατε να τον αφαιρέσετε σε ένα page object ή μια συνάρτηση, αν και θα πρέπει επίσης να αναρωτηθείτε αν το όφελος στην απόδοση αξίζει το κόστος στην αναγνωσιμότητα.

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

Αν γίνει αφαίρεση, θα μπορούσε να μοιάζει με το παρακάτω, όπου η λογική τοποθετείται σε μια μέθοδο που ονομάζεται submitWithDataOf και τα δεδομένα ανακτώνται από την κλάση Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```