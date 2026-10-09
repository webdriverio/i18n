---
id: selectors
title: Επιλογείς
description: "Βρείτε στοιχεία με CSS, κείμενο, XPath, προσβάσιμο όνομα, ρόλο ARIA και άλλες στρατηγικές επιλογέων, και μάθετε ποιες είναι οι πιο ανθεκτικές."
---

Το [WebDriver Protocol](https://w3c.github.io/webdriver/) παρέχει διάφορες στρατηγικές επιλογέων για την αναζήτηση ενός στοιχείου. Το WebdriverIO τις απλοποιεί ώστε η επιλογή στοιχείων να παραμένει απλή. Σημειώστε ότι, παρόλο που οι εντολές για την αναζήτηση στοιχείων ονομάζονται `$` και `$$`, δεν έχουν καμία σχέση με το jQuery ή τη [Sizzle Selector Engine](https://github.com/jquery/sizzle).

Παρόλο που υπάρχουν πάρα πολλοί διαφορετικοί επιλογείς, μόνο λίγοι από αυτούς παρέχουν έναν ανθεκτικό τρόπο για να βρείτε το σωστό στοιχείο. Για παράδειγμα, δεδομένου του παρακάτω κουμπιού:

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

__Συνιστούμε__ και __δεν συνιστούμε__ τους παρακάτω επιλογείς:

| Επιλογέας | Συνιστάται | Σημειώσεις |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 Ποτέ | Χειρότερος - υπερβολικά γενικός, χωρίς πλαίσιο. |
| `$('.btn.btn-large')` | 🚨 Ποτέ | Κακός. Συνδεδεμένος με το styling. Πολύ πιθανό να αλλάξει. |
| `$('#main')` | ⚠️ Με φειδώ | Καλύτερος. Αλλά εξακολουθεί να συνδέεται με το styling ή με JS event listeners. |
| `$(() => document.queryElement('button'))` | ⚠️ Με φειδώ | Αποτελεσματική αναζήτηση, πολύπλοκη στη συγγραφή. |
| `$('button[name="submission"]')` | ⚠️ Με φειδώ | Συνδεδεμένος με το χαρακτηριστικό `name`, το οποίο έχει σημασιολογία HTML. |
| `$('button[data-testid="submit"]')` | ✅ Καλός | Απαιτεί επιπλέον χαρακτηριστικό, δεν συνδέεται με την προσβασιμότητα (a11y). |
| `$('aria/Submit')` | ✅ Καλός | Καλός. Μοιάζει με τον τρόπο που ο χρήστης αλληλεπιδρά με τη σελίδα. Συνιστάται η χρήση αρχείων μεταφράσεων, ώστε τα tests σας να μη σπάνε όταν ενημερώνονται οι μεταφράσεις. Σε συνεδρίες WebDriver BiDi χρησιμοποιεί το δέντρο προσβασιμότητας του browser. Σε συνεδρίες Classic επιστρέφει σε XPath και μπορεί να είναι πιο αργός σε μεγάλες σελίδες. |
| `$('button=Submit')` | ✅ Πάντα | Βέλτιστος. Μοιάζει με τον τρόπο που ο χρήστης αλληλεπιδρά με τη σελίδα και είναι γρήγορος. Συνιστάται η χρήση αρχείων μεταφράσεων, ώστε τα tests σας να μη σπάνε όταν ενημερώνονται οι μεταφράσεις. |

## Αυστηρή λειτουργία

Από την v10, η εντολή [`$`](/docs/api/browser/$) είναι __αυστηρή__: αντιπροσωπεύει ακριβώς ένα στοιχείο. Αν ο επιλογέας ταιριάζει με περισσότερα από ένα στοιχεία, η εντολή ρίχνει ένα `StrictSelectorError` αντί να επιλέξει σιωπηλά την πρώτη αντιστοιχία:

```js
// υπάρχουν 12 κουμπιά στη σελίδα
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
```

Αυτή είναι η ίδια συμπεριφορά με τους [Playwright locators](https://playwright.dev/docs/locators#strictness). Το Cypress διαφέρει: οι αναζητήσεις του μπορεί να επιστρέψουν πολλά στοιχεία, και είναι οι εντολές ενεργειών, όπως η [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn), που απορρίπτουν από προεπιλογή ένα υποκείμενο με πολλά στοιχεία. Η αυστηρή λειτουργία αναδεικνύει επιλογείς που είναι υπερβολικά ευρείς, οι οποίοι διαφορετικά θα αλληλεπιδρούσαν σιωπηλά με λάθος στοιχείο μόλις η σελίδα μεγαλώσει.

Ο κανόνας ισχύει για κάθε βήμα μιας [αλυσίδας](#chain-selectors) και για κάθε τύπο επιλογέα που δέχεται η `$` — επιλογείς συμβολοσειράς (συμπεριλαμβανομένων όσων διαπερνούν το shadow DOM), [JS συναρτήσεις](#js-function), [mobile επιλογείς](#mobile-selectors) και αναφορές σε [προσαρμοσμένες στρατηγικές](#custom-selector-strategies).

### Τι δεν επηρεάζεται

- Η `$$` συνεχίζει να επιστρέφει μηδέν ή πολλά στοιχεία, ως [`ElementArray`](/docs/api/browser/$$). Κάντε await τη λίστα (ή το `.length` της) πριν διαβάσετε το πλήθος ή χρησιμοποιήσετε `for...of`. Το `for await` λειτουργεί απευθείας πάνω στη λίστα.
- Οι αποκλειστικές βοηθητικές εντολές `custom$`, `shadow$` και `react$` δεν είναι αυστηρές — εξακολουθούν να επιστρέφουν την πρώτη αντιστοιχία τους, όπως και οι αντίστοιχες `$$`.
- Ένας επιλογέας που δεν ταιριάζει με τίποτα εξακολουθεί να επιστρέφει ένα στοιχείο που επιλύεται τεμπέλικα (lazily), οπότε η [`waitForExist`](/docs/api/element/waitForExist) και η συμπεριφορά [αυτόματης αναμονής](/docs/autowait) παραμένουν αμετάβλητες.
- Η μεταβίβαση μιας αναφοράς στοιχείου, π.χ. `$(await browser.getActiveElement())`, αναφέρεται πάντα σε έναν μόνο κόμβο και δεν ελέγχεται ποτέ.

:::info Μετάβαση στην v10

Για το πώς να ελέγξετε τη σουίτα σας για παραβιάσεις της αυστηρής λειτουργίας, να περιορίσετε ή να εξαιρέσετε μεμονωμένες αναζητήσεις και να απενεργοποιήσετε την αυστηρή λειτουργία σε όλο το project, δείτε τον [οδηγό μετάβασης στην v10](/docs/v10-migration).

:::

## CSS Query Selector

Αν δεν δηλωθεί διαφορετικά, το WebdriverIO θα αναζητήσει στοιχεία χρησιμοποιώντας το μοτίβο [επιλογέα CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), π.χ.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## Κείμενο συνδέσμου

Για να λάβετε ένα στοιχείο anchor με συγκεκριμένο κείμενο, αναζητήστε το κείμενο ξεκινώντας με το σύμβολο ίσον (`=`).

Για παράδειγμα:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

Μπορείτε να αναζητήσετε αυτό το στοιχείο καλώντας:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## Μερικό κείμενο συνδέσμου

Για να βρείτε ένα στοιχείο anchor του οποίου το ορατό κείμενο ταιριάζει μερικώς με την τιμή αναζήτησης,
αναζητήστε το χρησιμοποιώντας `*=` μπροστά από τη συμβολοσειρά αναζήτησης (π.χ. `*=driver`).

Μπορείτε επίσης να αναζητήσετε το στοιχείο από το παραπάνω παράδειγμα καλώντας:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__Σημείωση:__ Δεν μπορείτε να συνδυάσετε πολλές στρατηγικές επιλογέων σε έναν επιλογέα. Χρησιμοποιήστε πολλαπλές αλυσιδωτές αναζητήσεις στοιχείων για να πετύχετε τον ίδιο στόχο, π.χ.:

```js
const elem = await $('header h1*=Welcome') // δεν λειτουργεί!!!
// χρησιμοποιήστε αντί αυτού
const elem = await $('header').$('*=driver')
```

## Στοιχείο με συγκεκριμένο κείμενο

Η ίδια τεχνική μπορεί να εφαρμοστεί και σε στοιχεία. Επιπλέον, είναι επίσης δυνατή η αντιστοίχιση χωρίς διάκριση πεζών-κεφαλαίων χρησιμοποιώντας `.=` ή `.*=` μέσα στην αναζήτηση.

Για παράδειγμα, ακολουθεί μια αναζήτηση για μια επικεφαλίδα επιπέδου 1 με το κείμενο "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

Μπορείτε να αναζητήσετε αυτό το στοιχείο καλώντας:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

Ή χρησιμοποιώντας αναζήτηση μερικού κειμένου:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

Το ίδιο λειτουργεί και για ονόματα `id` και `class`:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

Μπορείτε να αναζητήσετε αυτό το στοιχείο καλώντας:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__Σημείωση:__ Δεν μπορείτε να συνδυάσετε πολλές στρατηγικές επιλογέων σε έναν επιλογέα. Χρησιμοποιήστε πολλαπλές αλυσιδωτές αναζητήσεις στοιχείων για να πετύχετε τον ίδιο στόχο, π.χ.:

```js
const elem = await $('header h1*=Welcome') // δεν λειτουργεί!!!
// χρησιμοποιήστε αντί αυτού
const elem = await $('header').$('h1*=Welcome')
```

## Όνομα ετικέτας

Για να αναζητήσετε ένα στοιχείο με συγκεκριμένο όνομα ετικέτας, χρησιμοποιήστε `<tag>` ή `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

Μπορείτε να αναζητήσετε αυτό το στοιχείο καλώντας:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## Χαρακτηριστικό name

Για την αναζήτηση στοιχείων με συγκεκριμένο χαρακτηριστικό name, χρησιμοποιήστε έναν επιλογέα CSS όπως `[name="some-name"]`. Σε μια mobile συνεδρία, η ίδια συντομογραφία αποστέλλεται με τη στρατηγική εντοπισμού `name` του Appium:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__Σημείωση:__ Η στρατηγική εντοπισμού `name` είναι locator του Appium. Οι desktop συνεδρίες διατηρούν το `[name="some-name"]` στη στρατηγική CSS.

## xPath

Είναι επίσης δυνατή η αναζήτηση στοιχείων μέσω ενός συγκεκριμένου [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath).

Ένας επιλογέας xPath έχει μορφή όπως `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

Μπορείτε να αναζητήσετε τη δεύτερη παράγραφο καλώντας:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

Μπορείτε επίσης να χρησιμοποιήσετε xPath για να κινηθείτε πάνω και κάτω στο δέντρο DOM:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## Επιλογέας προσβάσιμου ονόματος

Αναζητήστε στοιχεία με βάση το προσβάσιμο όνομά τους (accessible name). Το προσβάσιμο όνομα είναι αυτό που ανακοινώνεται από έναν αναγνώστη οθόνης όταν το στοιχείο λάβει την εστίαση. Η τιμή του προσβάσιμου ονόματος μπορεί να είναι είτε οπτικό περιεχόμενο είτε κρυφές εναλλακτικές κειμένου.

Σε συνεδρίες [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) (Chrome, Edge, Firefox και άλλοι browsers με υποστήριξη BiDi), το WebdriverIO χρησιμοποιεί πρώτα το [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) με έναν locator προσβασιμότητας. Αυτό αναζητά απευθείας στο δέντρο προσβασιμότητας του browser και είναι συνήθως πολύ πιο γρήγορο από την προσέγγιση μέσω XPath. Αν ο locator προσβασιμότητας δεν βρει τίποτα, το WebdriverIO επιστρέφει στην ευρετική μέθοδο XPath του Classic, ώστε οι υπάρχουσες αναζητήσεις `aria/` να συνεχίσουν να ταιριάζουν.

:::info

Μπορείτε να διαβάσετε περισσότερα για αυτόν τον επιλογέα στο [blog post της έκδοσης](/blog/2022/09/05/accessibility-selector)

:::

### Ανάκτηση μέσω `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### Ανάκτηση μέσω `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### Ανάκτηση μέσω περιεχομένου

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### Ανάκτηση μέσω τίτλου

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### Ανάκτηση μέσω της ιδιότητας `alt`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## Επιλογέας ρόλου

Αναζητήστε στοιχεία με βάση τον ρόλο ARIA και το προσβάσιμο όνομά τους, με τον τρόπο που τα περιγράφει ένας αναγνώστης οθόνης: «το κουμπί *Add to cart*». Ένας ρόλος μαζί με ένα όνομα συνεχίζει να ταιριάζει όταν αλλάζουν τα ονόματα κλάσεων, τα test ids ή η δομή του DOM.

```js
await $('role/button[name="Add to cart"]').click()
await expect($('role/heading[name="Order summary"]')).toBeDisplayed()

// μόνο ρόλος
const rows = await $$('role/row')

// περιορισμένο σε ένα γονικό στοιχείο
const dialog = $('role/dialog[name="Checkout"]')
await dialog.$('role/button[name="Pay now"]').click()
```

Η σύνταξη είναι `role/<role>` ή `role/<role>[name="<accessible name>"]`. Λειτουργούν και τα μονά εισαγωγικά, ενώ ένα εισαγωγικό μέσα στο όνομα γίνεται escape με ανάποδη κάθετο: `role/button[name="Say \"hi\""]`.

- Το όνομα πρέπει να ταιριάζει με ολόκληρο το προσβάσιμο όνομα.
- Ο ρόλος πρέπει να είναι ρόλος ARIA. Ένα τυπογραφικό λάθος αποτυγχάνει με τον πλησιέστερο έγκυρο ρόλο, για παράδειγμα `"buton" is not an ARIA role. Did you mean "button"?`.
- Το `img` και το όνομά του στο ARIA 1.3, `image`, είναι ο ίδιος ρόλος.
- Ο επιλογέας ακολουθεί την [αυστηρή λειτουργία](#strict-mode) της `$`, όπως κάθε άλλος επιλογέας.

Σε μια συνεδρία [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/), το WebdriverIO μεταβιβάζει τον ρόλο και το όνομα στο [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes). Ο browser υπολογίζει και τα δύο μόνος του, με τον ίδιο τρόπο που βλέπει τη σελίδα η υποστηρικτική τεχνολογία. Βρίσκονται στοιχεία μέσα σε ανοιχτά shadow roots και μέσα σε frames, συμπεριλαμβανομένων frames από άλλο origin. Αν ο browser δεν βρει κανένα στοιχείο, δεν υπάρχει επιστροφή σε ευρετική μέθοδο. Σημειώστε ότι τον ρόλο τον αποφασίζει ο browser: για παράδειγμα, ένα `<table>` χωρίς κεφαλίδες ή λεζάντα μπορεί να είναι πίνακας διάταξης, και τότε οι γραμμές του δεν έχουν ρόλο `row`.

Σε μια συνεδρία WebDriver Classic, καθώς και όταν ένας browser δεν υποστηρίζει τον locator ρόλου, το WebdriverIO υπολογίζει τον ρόλο και το προσβάσιμο όνομα μέσα στη σελίδα με το [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api), την υλοποίηση που χρησιμοποιεί το Testing Library. Ένα πεδίο κειμένου χωρίς ετικέτα λαμβάνει όνομα από το `placeholder` του, όπως κάνουν οι browsers. Ο επιλογέας ρόλου δεν είναι διαθέσιμος σε πλαίσιο native mobile εφαρμογής. Εκεί χρησιμοποιήστε ένα [accessibility id](#accessibility-id).

## ARIA - Χαρακτηριστικό role

Για την αναζήτηση στοιχείων με βάση [ρόλους ARIA](https://www.w3.org/TR/html-aria/#docconformance), μπορείτε να καθορίσετε απευθείας τον ρόλο του στοιχείου, όπως `[role=button]`, ως παράμετρο επιλογέα. Αυτός ο επιλογέας προσεγγίζει τον ρόλο από το όνομα και τα χαρακτηριστικά του στοιχείου. Προτιμήστε τον [επιλογέα ρόλου](#role-selector), ο οποίος χρησιμοποιεί τον ρόλο που υπολογίζει ο browser και μπορεί επίσης να ταιριάξει το προσβάσιμο όνομα:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## Χαρακτηριστικό ID

Η στρατηγική εντοπισμού "id" δεν υποστηρίζεται στο πρωτόκολλο WebDriver· θα πρέπει να χρησιμοποιείτε είτε στρατηγικές επιλογέων CSS είτε xPath για να βρείτε στοιχεία μέσω ID.

Ωστόσο, ορισμένοι drivers (π.χ. [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) ενδέχεται να εξακολουθούν να [υποστηρίζουν](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) αυτόν τον επιλογέα.

Οι τρέχουσες υποστηριζόμενες συντάξεις επιλογέων για ID είναι:

```js
//locator css
const button = await $('#someid')
//locator xpath
const button = await $('//*[@id="someid"]')
//στρατηγική id
// Σημείωση: λειτουργεί μόνο στο Appium ή σε παρόμοια frameworks που υποστηρίζουν τη στρατηγική εντοπισμού "ID"
const button = await $('id=resource-id/iosname')
```

## JS συνάρτηση

Μπορείτε επίσης να χρησιμοποιήσετε συναρτήσεις JavaScript για να ανακτήσετε στοιχεία χρησιμοποιώντας εγγενή web APIs. Φυσικά, αυτό μπορείτε να το κάνετε μόνο μέσα σε web πλαίσιο (π.χ. `browser` ή web πλαίσιο σε mobile).

Δεδομένης της παρακάτω δομής HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

Μπορείτε να αναζητήσετε το αδελφό στοιχείο του `#elem` ως εξής:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## Deep επιλογείς

:::warning

Από την `v9` του WebdriverIO δεν υπάρχει ανάγκη για αυτόν τον ειδικό επιλογέα, καθώς το WebdriverIO διαπερνά αυτόματα το Shadow DOM για εσάς. Συνιστάται να σταματήσετε να χρησιμοποιείτε αυτόν τον επιλογέα αφαιρώντας το `>>>` από μπροστά του.

:::

Πολλές frontend εφαρμογές βασίζονται σε μεγάλο βαθμό σε στοιχεία με [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Είναι τεχνικά αδύνατο να αναζητήσετε στοιχεία μέσα στο shadow DOM χωρίς παρακάμψεις. Οι [`shadow$`](https://webdriver.io/docs/api/element/shadow$) και [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) ήταν τέτοιες παρακάμψεις, οι οποίες είχαν τους [περιορισμούς](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow) τους. Με τον deep επιλογέα μπορείτε πλέον να αναζητήσετε όλα τα στοιχεία μέσα σε οποιοδήποτε shadow DOM χρησιμοποιώντας την κοινή εντολή αναζήτησης.

Ας υποθέσουμε ότι έχουμε μια εφαρμογή με την παρακάτω δομή:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

Με αυτόν τον επιλογέα μπορείτε να αναζητήσετε το στοιχείο `<button />` που είναι ενσωματωμένο μέσα σε ένα άλλο shadow DOM, π.χ.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## Mobile επιλογείς

Για υβριδικό mobile testing, είναι σημαντικό ο automation server να βρίσκεται στο σωστό *πλαίσιο* (context) πριν από την εκτέλεση εντολών. Για την αυτοματοποίηση χειρονομιών, ο driver ιδανικά θα πρέπει να είναι ρυθμισμένος σε native πλαίσιο. Όμως, για την επιλογή στοιχείων από το DOM, ο driver θα πρέπει να είναι ρυθμισμένος στο webview πλαίσιο της πλατφόρμας. Μόνο *τότε* μπορούν να χρησιμοποιηθούν οι μέθοδοι που αναφέρθηκαν παραπάνω.

Για native mobile testing, δεν υπάρχει εναλλαγή μεταξύ πλαισίων, καθώς πρέπει να χρησιμοποιήσετε mobile στρατηγικές και να χρησιμοποιήσετε απευθείας την υποκείμενη τεχνολογία αυτοματοποίησης της συσκευής. Αυτό είναι ιδιαίτερα χρήσιμο όταν ένα test χρειάζεται λεπτομερή έλεγχο στην εύρεση στοιχείων.

### Android UiAutomator

Το framework UI Automator του Android παρέχει διάφορους τρόπους εύρεσης στοιχείων. Μπορείτε να χρησιμοποιήσετε το [UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis), και ειδικότερα την [κλάση UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector), για να εντοπίσετε στοιχεία. Στο Appium στέλνετε τον κώδικα Java, ως συμβολοσειρά, στον server, ο οποίος τον εκτελεί στο περιβάλλον της εφαρμογής και επιστρέφει το στοιχείο ή τα στοιχεία.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher και ViewMatcher (μόνο Espresso)

Η στρατηγική DataMatcher του Android παρέχει έναν τρόπο εύρεσης στοιχείων μέσω [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

Και παρομοίως μέσω [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (μόνο Espresso)

Η στρατηγική view tag παρέχει έναν βολικό τρόπο εύρεσης στοιχείων μέσω του [tag](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29) τους.

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

Κατά την αυτοματοποίηση μιας εφαρμογής iOS, μπορεί να χρησιμοποιηθεί το [UI Automation framework](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) της Apple για την εύρεση στοιχείων.

Αυτό το JavaScript [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) διαθέτει μεθόδους πρόσβασης στο view και σε οτιδήποτε βρίσκεται σε αυτό.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

Μπορείτε επίσης να χρησιμοποιήσετε αναζήτηση με predicates μέσα στο iOS UI Automation στο Appium, για να βελτιώσετε ακόμη περισσότερο την επιλογή στοιχείων. Δείτε [εδώ](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) για λεπτομέρειες.

### iOS XCUITest predicate strings και class chains

Με iOS 10 και νεότερες εκδόσεις (χρησιμοποιώντας τον driver `XCUITest`), μπορείτε να χρησιμοποιήσετε [predicate strings](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules):

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

Και [class chains](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

Η στρατηγική εντοπισμού `accessibility id` έχει σχεδιαστεί για να διαβάζει ένα μοναδικό αναγνωριστικό για ένα στοιχείο UI. Αυτό έχει το πλεονέκτημα ότι δεν αλλάζει κατά την τοπικοποίηση ή οποιαδήποτε άλλη διαδικασία που μπορεί να αλλάξει το κείμενο. Επιπλέον, μπορεί να βοηθήσει στη δημιουργία cross-platform tests, εφόσον στοιχεία που είναι λειτουργικά ίδια έχουν το ίδιο accessibility id.

- Για το iOS, αυτό είναι το `accessibility identifier` όπως ορίζεται από την Apple [εδώ](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- Για το Android, το `accessibility id` αντιστοιχεί στο `content-description` του στοιχείου, όπως περιγράφεται [εδώ](https://developer.android.com/training/accessibility/accessible-app.html).

Και για τις δύο πλατφόρμες, η λήψη ενός στοιχείου (ή πολλαπλών στοιχείων) μέσω του `accessibility id` τους είναι συνήθως η καλύτερη μέθοδος. Είναι επίσης ο προτιμώμενος τρόπος σε σχέση με την καταργημένη στρατηγική `name`.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Class Name

Η στρατηγική `class name` είναι ένα `string` που αντιπροσωπεύει ένα στοιχείο UI στο τρέχον view.

- Για το iOS, είναι το πλήρες όνομα μιας [κλάσης UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) και ξεκινά με `UIA-`, όπως `UIATextField` για ένα πεδίο κειμένου. Πλήρης αναφορά υπάρχει [εδώ](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- Για το Android, είναι το πλήρως προσδιορισμένο όνομα μιας [κλάσης](https://developer.android.com/reference/android/widget/package-summary.html) του [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator), όπως `android.widget.EditText` για ένα πεδίο κειμένου. Πλήρης αναφορά υπάρχει [εδώ](https://developer.android.com/reference/android/widget/package-summary.html).
- Για το Youi.tv, είναι το πλήρες όνομα μιας κλάσης Youi.tv και ξεκινά με `CYI-`, όπως `CYIPushButtonView` για ένα στοιχείο push button. Πλήρης αναφορά υπάρχει στη [σελίδα GitHub του You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// Παράδειγμα iOS
await $('UIATextField').click()
// Παράδειγμα Android
await $('android.widget.DatePicker').click()
// Παράδειγμα Youi.tv
await $('CYIPushButtonView').click()
```

## Αλυσιδωτοί επιλογείς

Αν θέλετε να είστε πιο συγκεκριμένοι στην αναζήτησή σας, μπορείτε να συνδέσετε αλυσιδωτά επιλογείς μέχρι να βρείτε το σωστό
στοιχείο. Αν καλέσετε το `element` πριν από την πραγματική σας εντολή, το WebdriverIO ξεκινά την αναζήτηση από εκείνο το στοιχείο.

Για παράδειγμα, αν έχετε μια δομή DOM όπως:

```html
<div class="row">
  <div class="entry">
    <label>Product A</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product B</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product C</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
</div>
```

Και θέλετε να προσθέσετε το προϊόν B στο καλάθι, θα ήταν δύσκολο να το κάνετε αυτό μόνο με τον επιλογέα CSS.

Με τη σύνδεση επιλογέων σε αλυσίδα, είναι πολύ πιο εύκολο. Απλώς περιορίστε σταδιακά το επιθυμητό στοιχείο βήμα προς βήμα:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### Επιλογέας εικόνας Appium

Χρησιμοποιώντας τη στρατηγική εντοπισμού `-image`, είναι δυνατό να στείλετε στο Appium ένα αρχείο εικόνας που αντιπροσωπεύει ένα στοιχείο στο οποίο θέλετε να έχετε πρόσβαση.

Υποστηριζόμενες μορφές αρχείων `jpg,png,gif,bmp,svg`

Πλήρης αναφορά υπάρχει [εδώ](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**Σημείωση**: Ο τρόπος με τον οποίο το Appium λειτουργεί με αυτόν τον επιλογέα είναι ότι θα πάρει εσωτερικά ένα (app)screenshot και θα χρησιμοποιήσει τον παρεχόμενο επιλογέα εικόνας
για να επαληθεύσει αν το στοιχείο μπορεί να βρεθεί σε αυτό το (app)screenshot.

Να έχετε υπόψη ότι το Appium μπορεί να αλλάξει το μέγεθος του (app)screenshot που λήφθηκε ώστε να ταιριάζει με το CSS-μέγεθος της (app)οθόνης σας (αυτό θα συμβεί
σε iPhones αλλά και σε υπολογιστές Mac με οθόνη Retina, επειδή το DPR είναι μεγαλύτερο από 1). Αυτό θα έχει ως αποτέλεσμα να μη βρεθεί αντιστοιχία, επειδή
ο παρεχόμενος επιλογέας εικόνας μπορεί να έχει ληφθεί από το αρχικό screenshot.
Μπορείτε να το διορθώσετε ενημερώνοντας τις ρυθμίσεις του Appium Server· δείτε την [τεκμηρίωση του Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)
για τις ρυθμίσεις και [αυτό το σχόλιο](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) για λεπτομερή εξήγηση.

## React επιλογείς

Το WebdriverIO παρέχει έναν τρόπο επιλογής React components με βάση το όνομα του component. Για να το κάνετε αυτό, έχετε στη διάθεσή σας δύο εντολές: `react$` και `react$$`.

Αυτές οι εντολές σάς επιτρέπουν να επιλέγετε components από το [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) και επιστρέφουν είτε ένα μεμονωμένο WebdriverIO Element είτε έναν πίνακα στοιχείων (ανάλογα με τη συνάρτηση που χρησιμοποιείται).

**Σημείωση**: Οι εντολές `react$` και `react$$` είναι παρόμοιες ως προς τη λειτουργικότητα, με τη διαφορά ότι η `react$$` θα επιστρέψει *όλα* τα αντίστοιχα instances ως πίνακα στοιχείων WebdriverIO, ενώ η `react$` θα επιστρέψει το πρώτο instance που βρέθηκε.

Οι εντολές λειτουργούν με React 16 έως 19, για μια εφαρμογή που ξεκινά με `createRoot` ή με `ReactDOM.render`. Διαβάζουν τα components του τρέχοντος render, οπότε βρίσκουν επίσης components που προστέθηκαν από μια αλλαγή state. Αν το React δεν έχει κάνει ακόμη render ενός root της σελίδας, περιμένουν έως 5 δευτερόλεπτα για αυτό.

#### Βασικό παράδειγμα

```jsx
// index.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'

function MyComponent() {
    return (
        <div>
            MyComponent
        </div>
    )
}

function App() {
    return (<MyComponent />)
}

createRoot(document.querySelector('#root')).render(<App />)
```

Στον παραπάνω κώδικα υπάρχει ένα απλό instance του `MyComponent` μέσα στην εφαρμογή, το οποίο το React κάνει render μέσα σε ένα στοιχείο HTML με `id="root"`.

Με την εντολή `browser.react$`, μπορείτε να επιλέξετε ένα instance του `MyComponent`:

```js
const myCmp = await browser.react$('MyComponent')
```

Τώρα που έχετε το στοιχείο WebdriverIO αποθηκευμένο στη μεταβλητή `myCmp`, μπορείτε να εκτελέσετε εντολές στοιχείων πάνω του.

#### Φιλτράρισμα components

Μπορείτε να φιλτράρετε την επιλογή σας με βάση τα props ή/και το state του component. Για να το κάνετε αυτό, περάστε `props` ή/και `state` στο δεύτερο όρισμα της εντολής.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
    return (
        <div>
            Hello { props.name || 'World' }!
        </div>
    )
}

function App() {
    return (
        <div>
            <MyComponent name="WebdriverIO" />
            <MyComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Αν θέλετε να επιλέξετε το instance του `MyComponent` που έχει prop `name` με τιμή `WebdriverIO`, μπορείτε να εκτελέσετε την εντολή ως εξής:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

Αν θέλατε να φιλτράρετε την επιλογή μας με βάση το state, η εντολή `browser` θα έμοιαζε κάπως έτσι:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

Ένα φίλτρο ταιριάζει όταν ταιριάζει κάθε κλειδί του που έχει και το component. Ένα κλειδί που δεν έχει το component αγνοείται. Ένα εμφωλευμένο αντικείμενο ταιριάζει με τον ίδιο τρόπο, και ένας πίνακας ταιριάζει όταν έχει μία κοινή τιμή με τον πίνακα του component. Τα `null`, `false` και `0` ταιριάζουν με την ίδια τιμή. Για ένα function component με hooks, το state είναι το state του πρώτου hook (`useState` ή `useReducer`): αν το πρώτο hook είναι κάποιο άλλο hook, για παράδειγμα `useRef`, το φίλτρο state δεν ταιριάζει. Με `props` και `state` μαζί, ένα component πρέπει να ταιριάζει και με τα δύο.

#### Κανόνες επιλογέα

- Το `*` ταιριάζει με έναν ή περισσότερους χαρακτήρες: το `browser.react$$('My*')` βρίσκει τα `MyComponent` και `MyOtherComponent`.
- Ονόματα που χωρίζονται με κενά βρίσκουν ένα component μέσα σε ένα άλλο: το `browser.react$$('List Item')` βρίσκει κάθε `Item` μέσα σε ένα `List`.
- Το όνομα ενός component είναι το `displayName` του, ή διαφορετικά το όνομα της συνάρτησης ή της κλάσης του. Ένα component του `React.memo` έχει το όνομα της συνάρτησής του (το development build του React 17 του δίνει επίσης το `displayName` του αντικειμένου memo). Ένα component του `React.forwardRef` δεν έχει όνομα, εκτός αν έχει `displayName`.
- Για ένα higher-order component με όνομα όπως `withRouter(MyComponent)`, χρησιμοποιείται το όνομα μέσα στις παρενθέσεις: `MyComponent`.
- Χωρίς εμβέλεια στοιχείου, οι εντολές αναζητούν σε όλα τα React roots της σελίδας, με τη σειρά του εγγράφου, καθώς και σε roots μέσα σε άλλα roots και σε roots μέσα σε ανοιχτά shadow roots. Η `react$` δίνει την πρώτη αντιστοιχία. Για να αναζητήσετε σε ένα μόνο root, καλέστε την εντολή στον container του ή σε ένα στοιχείο αυτού του root: `$('#other-root').react$$('MyComponent')`.
- Τα αποτελέσματα έρχονται root προς root. Μέσα σε ένα root, έρχονται με τη σειρά του δέντρου components, επίπεδο προς επίπεδο, όχι με τη σειρά του εγγράφου. Η `react$$` δίνει κάθε κόμβο DOM μία φορά.
- Για μια εφαρμογή μέσα σε frame, καλέστε την εντολή στο browsing context του frame ή σε ένα στοιχείο του frame: `(await page.frame({ selector: 'iframe' })).react$$('MyComponent')`.

Γνωστοί περιορισμοί:

- Ένα component που κάνει render μόνο κείμενο δίνει έναν κόμβο κειμένου. Με το WebDriver Classic, ένας κόμβος κειμένου δεν μπορεί να επιστραφεί, και η εντολή αποτυγχάνει με `javascript error: circular reference`.
- Όσο το React κάνει hydrate ένα όριο `Suspense` μιας σελίδας που έχει γίνει render στον server, τα components μέσα σε αυτό δεν υπάρχουν ακόμη. Περιμένετε μέχρι η σελίδα να ολοκληρώσει το hydration.

#### Διαχείριση του `React.Fragment`

Όταν χρησιμοποιείτε την εντολή `react$` για να επιλέξετε React [fragments](https://reactjs.org/docs/fragments.html), το WebdriverIO θα επιστρέψει το πρώτο παιδί αυτού του component ως τον κόμβο του component. Αν χρησιμοποιήσετε την `react$$`, θα λάβετε έναν πίνακα που περιέχει όλους τους κόμβους HTML μέσα στα fragments που ταιριάζουν με τον επιλογέα.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <React.Fragment>
            <div>
                MyComponent
            </div>
            <div>
                MyComponent
            </div>
        </React.Fragment>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Με βάση το παραπάνω παράδειγμα, οι εντολές θα λειτουργούσαν ως εξής:

```js
await browser.react$('MyComponent') // επιστρέφει το WebdriverIO Element για το πρώτο <div />
await browser.react$$('MyComponent') // επιστρέφει τα WebdriverIO Elements για τον πίνακα [<div />, <div />]
```

**Σημείωση:** Αν έχετε πολλαπλά instances του `MyComponent` και χρησιμοποιήσετε την `react$$` για να επιλέξετε αυτά τα fragment components, θα σας επιστραφεί ένας μονοδιάστατος πίνακας με όλους τους κόμβους. Με άλλα λόγια, αν έχετε 3 instances του `<MyComponent />`, θα σας επιστραφεί ένας πίνακας με έξι στοιχεία WebdriverIO.

## Προσαρμοσμένες στρατηγικές επιλογέων


Αν η εφαρμογή σας απαιτεί έναν συγκεκριμένο τρόπο ανάκτησης στοιχείων, μπορείτε να ορίσετε μόνοι σας μια προσαρμοσμένη στρατηγική επιλογέα, την οποία μπορείτε να χρησιμοποιήσετε με τις `custom$` και `custom$$`. Για τον σκοπό αυτό, καταχωρίστε τη στρατηγική σας μία φορά στην αρχή του test, π.χ. σε ένα `before` hook:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

Δεδομένου του παρακάτω αποσπάσματος HTML:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

Στη συνέχεια, χρησιμοποιήστε τη καλώντας:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**Σημείωση:** αυτό λειτουργεί μόνο σε web περιβάλλον στο οποίο μπορεί να εκτελεστεί η εντολή [`execute`](/docs/api/browser/execute).