---
id: pageobjects
title: Μοτίβο Page Object
description: "Δομήστε τα τεστ σας με το μοτίβο page object μεταφέροντας τους selectors και τις ενέργειες που αφορούν συγκεκριμένες σελίδες σε επαναχρησιμοποιήσιμες κλάσεις σελίδων."
---

Η έκδοση 5 του WebdriverIO σχεδιάστηκε έχοντας κατά νου την υποστήριξη του Page Object Pattern. Με την εισαγωγή της αρχής των "στοιχείων ως πολιτών πρώτης κατηγορίας", είναι πλέον δυνατή η δημιουργία μεγάλων συνόλων τεστ χρησιμοποιώντας αυτό το μοτίβο.

Δεν απαιτούνται επιπλέον πακέτα για τη δημιουργία page objects. Αποδεικνύεται ότι οι καθαρές, σύγχρονες κλάσεις παρέχουν όλες τις απαραίτητες λειτουργίες που χρειαζόμαστε:

- κληρονομικότητα μεταξύ page objects
- lazy loading των στοιχείων
- ενθυλάκωση μεθόδων και ενεργειών

Ο στόχος της χρήσης page objects είναι η αφαίρεση κάθε πληροφορίας της σελίδας από τα πραγματικά τεστ. Ιδανικά, θα πρέπει να αποθηκεύετε όλους τους selectors ή τις συγκεκριμένες οδηγίες που είναι μοναδικές για μια συγκεκριμένη σελίδα σε ένα page object, ώστε να μπορείτε να εκτελείτε το τεστ σας ακόμα και αφού έχετε επανασχεδιάσει πλήρως τη σελίδα σας.

## Δημιουργία ενός Page Object

Αρχικά, χρειαζόμαστε ένα κύριο page object που το ονομάζουμε `Page.js`. Θα περιέχει γενικούς selectors ή μεθόδους από τις οποίες θα κληρονομούν όλα τα page objects.

```js
// Page.js
export default class Page {
    constructor() {
        this.title = 'My Page'
    }

    async open (path) {
        await browser.url(path)
    }
}
```

Πάντα θα κάνουμε `export` ένα instance ενός page object και ποτέ δεν θα δημιουργούμε αυτό το instance μέσα στο τεστ. Εφόσον γράφουμε end-to-end τεστ, θεωρούμε πάντα τη σελίδα ως μια κατασκευή χωρίς κατάσταση (stateless)&mdash;ακριβώς όπως κάθε αίτημα HTTP είναι μια κατασκευή χωρίς κατάσταση.

Βεβαίως, ο browser μπορεί να μεταφέρει πληροφορίες συνεδρίας και επομένως να εμφανίζει διαφορετικές σελίδες με βάση διαφορετικές συνεδρίες, αλλά αυτό δεν θα πρέπει να αντικατοπτρίζεται μέσα σε ένα page object. Τέτοιου είδους αλλαγές κατάστασης θα πρέπει να βρίσκονται στα πραγματικά σας τεστ.

Ας ξεκινήσουμε να τεστάρουμε την πρώτη σελίδα. Για λόγους επίδειξης, χρησιμοποιούμε τον ιστότοπο [The Internet](http://the-internet.herokuapp.com) του [Elemental Selenium](http://elementalselenium.com) ως πειραματόζωο. Ας προσπαθήσουμε να δημιουργήσουμε ένα παράδειγμα page object για τη [σελίδα σύνδεσης](http://the-internet.herokuapp.com/login).

## Χρήση `Get` για τους Selectors σας

Το πρώτο βήμα είναι να γράψουμε όλους τους σημαντικούς selectors που απαιτούνται στο αντικείμενο `login.page` ως συναρτήσεις getter:

```js
// login.page.js
import Page from './page'

class LoginPage extends Page {

    get username () { return $('#username') }
    get password () { return $('#password') }
    get submitBtn () { return $('form button[type="submit"]') }
    get flash () { return $('#flash') }
    get headerLinks () { return $$('#header a') }

    async open () {
        await super.open('login')
    }

    async submit () {
        await this.submitBtn.click()
    }

}

export default new LoginPage()
```

Ο ορισμός των selectors σε συναρτήσεις getter μπορεί να φαίνεται λίγο περίεργος, αλλά είναι πραγματικά χρήσιμος. Αυτές οι συναρτήσεις αξιολογούνται _όταν προσπελαύνετε την ιδιότητα_, όχι όταν δημιουργείτε το αντικείμενο. Έτσι, ζητάτε πάντα το στοιχείο πριν εκτελέσετε κάποια ενέργεια σε αυτό.

## Αλυσιδωτές Εντολές

Το WebdriverIO θυμάται εσωτερικά το τελευταίο αποτέλεσμα μιας εντολής. Αν συνδέσετε αλυσιδωτά μια εντολή στοιχείου με μια εντολή ενέργειας, βρίσκει το στοιχείο από την προηγούμενη εντολή και χρησιμοποιεί το αποτέλεσμα για να εκτελέσει την ενέργεια. Έτσι μπορείτε να αφαιρέσετε τον selector (πρώτη παράμετρο) και η εντολή γίνεται τόσο απλή όσο:

```js
await LoginPage.username.setValue('Max Mustermann')
```

Που είναι ουσιαστικά το ίδιο με:

```js
let elem = await $('#username')
await elem.setValue('Max Mustermann')
```

ή

```js
await $('#username').setValue('Max Mustermann')
```

## Χρήση Page Objects στα Τεστ σας

Αφού ορίσετε τα απαραίτητα στοιχεία και τις μεθόδους για τη σελίδα, μπορείτε να ξεκινήσετε να γράφετε το τεστ για αυτήν. Το μόνο που χρειάζεται να κάνετε για να χρησιμοποιήσετε το page object είναι να το κάνετε `import` (ή `require`). Αυτό είναι όλο!

Εφόσον κάνατε export ένα ήδη δημιουργημένο instance του page object, η εισαγωγή του σας επιτρέπει να αρχίσετε να το χρησιμοποιείτε αμέσως.

Αν χρησιμοποιείτε ένα framework assertions, τα τεστ σας μπορούν να γίνουν ακόμα πιο εκφραστικά:

```js
// login.spec.js
import LoginPage from '../pageobjects/login.page'

describe('login form', () => {
    it('should deny access with wrong creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('foo')
        await LoginPage.password.setValue('bar')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('Your username is invalid!')
    })

    it('should allow access with correct creds', async () => {
        await LoginPage.open()
        await LoginPage.username.setValue('tomsmith')
        await LoginPage.password.setValue('SuperSecretPassword!')
        await LoginPage.submit()

        await expect(LoginPage.flash).toHaveText('You logged into a secure area!')
    })
})
```

Από δομική άποψη, έχει νόημα να διαχωρίζετε τα αρχεία spec και τα page objects σε διαφορετικούς καταλόγους. Επιπλέον, μπορείτε να δώσετε σε κάθε page object την κατάληξη: `.page.js`. Αυτό καθιστά πιο σαφές ότι εισάγετε ένα page object.

## Προχωρώντας Παραπέρα

Αυτή είναι η βασική αρχή για το πώς να γράφετε page objects με το WebdriverIO. Όμως μπορείτε να δημιουργήσετε πολύ πιο σύνθετες δομές page objects από αυτή! Για παράδειγμα, μπορεί να έχετε συγκεκριμένα page objects για modals ή να χωρίσετε ένα τεράστιο page object σε διαφορετικές κλάσεις (καθεμία αντιπροσωπεύει ένα διαφορετικό μέρος της συνολικής ιστοσελίδας) που κληρονομούν από το κύριο page object. Το μοτίβο προσφέρει πραγματικά πολλές δυνατότητες για τον διαχωρισμό των πληροφοριών της σελίδας από τα τεστ σας, κάτι που είναι σημαντικό για να διατηρείτε το σύνολο των τεστ σας δομημένο και σαφές σε περιόδους που το έργο και ο αριθμός των τεστ αυξάνονται.

Μπορείτε να βρείτε αυτό το παράδειγμα (και ακόμα περισσότερα παραδείγματα page objects) στον [φάκελο `example`](https://github.com/webdriverio/webdriverio/tree/main/examples/pageobject) στο GitHub.