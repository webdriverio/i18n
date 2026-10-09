---
id: async-migration
title: Από Sync σε Async
description: "Μεταφέρετε τα tests του WebdriverIO από σύγχρονη σε ασύγχρονη εκτέλεση εντολών βήμα προς βήμα, συμπεριλαμβανομένων των βρόχων forEach, των assertions και των σύγχρονων page objects."
---

Λόγω αλλαγών στη V8, η ομάδα του WebdriverIO [ανακοίνωσε](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) την κατάργηση της σύγχρονης εκτέλεσης εντολών έως τον Απρίλιο του 2023. Η ομάδα έχει εργαστεί σκληρά ώστε η μετάβαση να είναι όσο το δυνατόν πιο εύκολη. Σε αυτόν τον οδηγό εξηγούμε πώς μπορείτε να μεταφέρετε σταδιακά τη σουίτα δοκιμών σας από sync σε async. Ως παράδειγμα χρησιμοποιούμε το [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), αλλά η προσέγγιση είναι η ίδια και για όλα τα άλλα projects.

## Promises στη JavaScript

Ο λόγος για τον οποίο η σύγχρονη εκτέλεση ήταν δημοφιλής στο WebdriverIO είναι ότι αφαιρεί την πολυπλοκότητα της διαχείρισης των promises. Ιδιαίτερα αν προέρχεστε από άλλες γλώσσες όπου αυτή η έννοια δεν υπάρχει με αυτόν τον τρόπο, μπορεί να προκαλέσει σύγχυση στην αρχή. Ωστόσο, τα Promises είναι ένα πολύ ισχυρό εργαλείο για τη διαχείριση ασύγχρονου κώδικα και η σημερινή JavaScript κάνει πραγματικά εύκολη τη χρήση τους. Αν δεν έχετε δουλέψει ποτέ με Promises, σας συνιστούμε να συμβουλευτείτε τον [οδηγό αναφοράς του MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), καθώς η εξήγησή τους εδώ θα ήταν εκτός του πλαισίου αυτού του οδηγού.

## Μετάβαση σε Async

Ο testrunner του WebdriverIO μπορεί να χειριστεί ασύγχρονη και σύγχρονη εκτέλεση μέσα στην ίδια σουίτα δοκιμών. Αυτό σημαίνει ότι μπορείτε να μεταφέρετε σταδιακά τα tests και τα PageObjects σας βήμα προς βήμα, με τον δικό σας ρυθμό. Για παράδειγμα, το Cucumber Boilerplate έχει ορίσει [ένα μεγάλο σύνολο step definitions](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) για να τα αντιγράψετε στο project σας. Μπορούμε να προχωρήσουμε και να μεταφέρουμε ένα step definition ή ένα αρχείο τη φορά.

:::tip

Το WebdriverIO προσφέρει ένα [codemod](https://github.com/webdriverio/codemod) που επιτρέπει τη μετατροπή του σύγχρονου κώδικά σας σε ασύγχρονο σχεδόν πλήρως αυτόματα. Εκτελέστε πρώτα το codemod όπως περιγράφεται στην τεκμηρίωση και χρησιμοποιήστε αυτόν τον οδηγό για χειροκίνητη μετάβαση αν χρειαστεί.

:::

Σε πολλές περιπτώσεις, το μόνο που χρειάζεται να κάνετε είναι να κάνετε `async` τη συνάρτηση στην οποία καλείτε εντολές του WebdriverIO και να προσθέσετε ένα `await` μπροστά από κάθε εντολή. Εξετάζοντας το πρώτο αρχείο `clearInputField.ts` προς μετατροπή στο boilerplate project, το μετατρέπουμε από:

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

σε:

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

Αυτό είναι όλο. Μπορείτε να δείτε το πλήρες commit με όλα τα παραδείγματα αναδιατύπωσης εδώ:

#### Commits:

- _μετατροπή όλων των step definitions_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
Αυτή η μετάβαση είναι ανεξάρτητη από το αν χρησιμοποιείτε TypeScript ή όχι. Αν χρησιμοποιείτε TypeScript, απλώς βεβαιωθείτε ότι τελικά θα αλλάξετε την ιδιότητα `types` στο `tsconfig.json` σας από `webdriverio/sync` σε `@wdio/globals/types`. Επίσης, βεβαιωθείτε ότι ο στόχος μεταγλώττισης (compile target) είναι ρυθμισμένος τουλάχιστον σε `ES2018`.
:::

## Ειδικές Περιπτώσεις

Υπάρχουν φυσικά πάντα ειδικές περιπτώσεις όπου πρέπει να δώσετε λίγο περισσότερη προσοχή.

### Βρόχοι ForEach

Αν έχετε έναν βρόχο `forEach`, π.χ. για να διατρέξετε στοιχεία, πρέπει να βεβαιωθείτε ότι το iterator callback αντιμετωπίζεται σωστά με ασύγχρονο τρόπο, π.χ.:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

Η συνάρτηση που περνάμε στο `forEach` είναι μια iterator function. Σε έναν σύγχρονο κόσμο θα έκανε κλικ σε όλα τα στοιχεία πριν προχωρήσει. Αν τη μετατρέψουμε σε ασύγχρονο κώδικα, πρέπει να διασφαλίσουμε ότι περιμένουμε κάθε iterator function να ολοκληρώσει την εκτέλεσή της. Προσθέτοντας `async`/`await`, αυτές οι iterator functions θα επιστρέφουν ένα promise που πρέπει να επιλύσουμε. Πλέον, το `forEach` δεν είναι ιδανικό για να διατρέχουμε τα στοιχεία, επειδή δεν επιστρέφει το αποτέλεσμα της iterator function, δηλαδή το promise που πρέπει να περιμένουμε. Επομένως, πρέπει να αντικαταστήσουμε το `forEach` με το `map`, το οποίο επιστρέφει αυτό το promise. Το `map`, καθώς και όλες οι άλλες μέθοδοι επανάληψης των Arrays όπως `find`, `every`, `reduce` και άλλες, έχουν υλοποιηθεί έτσι ώστε να σέβονται τα promises μέσα στις iterator functions και επομένως είναι απλοποιημένες για χρήση σε ασύγχρονο πλαίσιο. Το παραπάνω παράδειγμα μετά τη μετατροπή μοιάζει ως εξής:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

Για παράδειγμα, για να ανακτήσετε όλα τα στοιχεία `<h3 />` και να πάρετε το περιεχόμενο κειμένου τους, μπορείτε να εκτελέσετε:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * επιστρέφει:
 * [
 *   'Extendable',
 *   'Compatible',
 *   'Feature Rich',
 *   'Who is using WebdriverIO?',
 *   'Support for Modern Web and Mobile Frameworks',
 *   'Google Lighthouse Integration',
 *   'Watch Talks about WebdriverIO',
 *   'Get Started With WebdriverIO within Minutes'
 * ]
 */
```

Αν αυτό φαίνεται πολύ περίπλοκο, ίσως θέλετε να εξετάσετε τη χρήση απλών βρόχων for, π.χ.:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

Το `$$` επιστρέφει ένα [`ElementArray`](/docs/api/browser/$$). Μπορείτε επίσης να το διατρέξετε πριν κάνετε await τη λίστα:

```js
for await (const elem of $$('div')) {
    await elem.click()
}
```

Το `for (const elem of $$('div'))` προκαλεί σφάλμα μέχρι να επιλυθεί η λίστα, επειδή ένας σύγχρονος βρόχος δεν μπορεί να περιμένει το query. Κάντε πρώτα await τη λίστα, όπως στο παραπάνω παράδειγμα, ή χρησιμοποιήστε `for await`.

### WebdriverIO Assertions

Αν χρησιμοποιείτε τον βοηθό assertions του WebdriverIO [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio), βεβαιωθείτε ότι έχετε βάλει ένα `await` μπροστά από κάθε κλήση `expect`, π.χ.:

```ts
expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

πρέπει να μετατραπεί σε:

```ts
await expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

### Σύγχρονες Μέθοδοι PageObject και Ασύγχρονα Tests

Αν γράφατε PageObjects στη σουίτα δοκιμών σας με σύγχρονο τρόπο, δεν θα μπορείτε πλέον να τα χρησιμοποιείτε σε ασύγχρονα tests. Αν χρειάζεται να χρησιμοποιήσετε μια μέθοδο PageObject τόσο σε σύγχρονα όσο και σε ασύγχρονα tests, σας συνιστούμε να αντιγράψετε τη μέθοδο και να την προσφέρετε και για τα δύο περιβάλλοντα, π.χ.:

```js
class MyPageObject extends Page {
    /**
     * ορισμός στοιχείων
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // σύγχρονος κώδικας
    }

    someMethodAsync () {
        // ασύγχρονη έκδοση της MyPageObject.someMethod()
    }
}
```

Μόλις ολοκληρώσετε τη μετάβαση, μπορείτε να αφαιρέσετε τις σύγχρονες μεθόδους PageObject και να τακτοποιήσετε την ονοματολογία.

Αν δεν θέλετε να συντηρείτε δύο διαφορετικές εκδόσεις μιας μεθόδου PageObject, μπορείτε επίσης να μεταφέρετε ολόκληρο το PageObject σε async και να χρησιμοποιήσετε το [`browser.call`](https://webdriver.io/docs/api/browser/call) για να εκτελέσετε τη μέθοδο σε σύγχρονο περιβάλλον, π.χ.:

```js
// πριν:
// MyPageObject.someMethod()
// μετά:
browser.call(() => MyPageObject.someMethod())
```

Η εντολή `call` θα διασφαλίσει ότι η ασύγχρονη `someMethod` θα επιλυθεί πριν προχωρήσει στην επόμενη εντολή.

## Συμπέρασμα

Όπως μπορείτε να δείτε στο [τελικό PR της αναδιατύπωσης](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files), η πολυπλοκότητα αυτής της αναδιατύπωσης είναι αρκετά χαμηλή. Θυμηθείτε ότι μπορείτε να αναδιατυπώνετε ένα step-definition τη φορά. Το WebdriverIO είναι απόλυτα ικανό να χειριστεί σύγχρονη και ασύγχρονη εκτέλεση μέσα σε ένα ενιαίο framework.