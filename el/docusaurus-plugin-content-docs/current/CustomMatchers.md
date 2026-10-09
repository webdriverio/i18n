---
id: custommatchers
title: Προσαρμοσμένοι Matchers
description: "Καταχωρήστε προσαρμοσμένους matchers για τον browser και τα στοιχεία με το expect.extend και προσθέστε τύπους TypeScript για αυτούς."
---

Το WebdriverIO χρησιμοποιεί μια βιβλιοθήκη assertions [`expect`](https://webdriver.io/docs/api/expect-webdriverio) σε στυλ Jest, η οποία διαθέτει ειδικά χαρακτηριστικά και προσαρμοσμένους matchers ειδικά σχεδιασμένους για την εκτέλεση δοκιμών web και mobile. Παρόλο που η βιβλιοθήκη των matchers είναι μεγάλη, σίγουρα δεν καλύπτει όλες τις πιθανές περιπτώσεις. Επομένως, είναι δυνατό να επεκτείνετε τους υπάρχοντες matchers με προσαρμοσμένους που ορίζετε εσείς.

:::warning

Παρόλο που προς το παρόν δεν υπάρχει διαφορά στον τρόπο ορισμού των matchers που αφορούν ειδικά το αντικείμενο [`browser`](/docs/api/browser) ή ένα στιγμιότυπο [element](/docs/api/element), αυτό σίγουρα μπορεί να αλλάξει στο μέλλον. Παρακολουθήστε το [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) για περισσότερες πληροφορίες σχετικά με αυτή την εξέλιξη.

:::

:::info Jasmine

Με το framework Jasmine, καλέστε το `expect.extend` σε ένα αρχείο spec ή στο hook `before`, πριν εκτελεστούν οι δοκιμές. Οι matchers γίνονται ασύγχρονοι matchers του Jasmine, οπότε χρησιμοποιήστε `await` σε αυτούς. Ένας matcher με το όνομα ενός σύγχρονου matcher του Jasmine εκτελείται μόνο για τιμές του WebdriverIO, όπως οι matchers του WebdriverIO. Οι προσαρμοσμένοι ασύμμετροι matchers (`expect.myMatcher()`) δεν είναι διαθέσιμοι. Μπορείτε επίσης να χρησιμοποιήσετε το `jasmine.addMatchers` για έναν σύγχρονο matcher ή το `jasmine.addAsyncMatchers` για έναν ασύγχρονο matcher, δείτε τον [οδηγό προσαρμοσμένων matchers του Jasmine](https://jasmine.github.io/tutorials/custom_matchers).

:::

## Προσαρμοσμένοι Matchers για τον Browser

Για να καταχωρήσετε έναν προσαρμοσμένο matcher για τον browser, καλέστε το `extend` στο αντικείμενο `expect` είτε απευθείας στο αρχείο spec είτε ως μέρος, για παράδειγμα, του hook `before` στο `wdio.conf.js` σας:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Όπως φαίνεται στο παράδειγμα, η συνάρτηση του matcher δέχεται το αναμενόμενο αντικείμενο, π.χ. το αντικείμενο browser ή element, ως πρώτη παράμετρο και την αναμενόμενη τιμή ως δεύτερη. Στη συνέχεια μπορείτε να χρησιμοποιήσετε τον matcher ως εξής:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Προσαρμοσμένοι Matchers για Στοιχεία

Παρόμοια με τους προσαρμοσμένους matchers για τον browser, οι matchers για στοιχεία δεν διαφέρουν. Ακολουθεί ένα παράδειγμα για το πώς να δημιουργήσετε έναν προσαρμοσμένο matcher για να ελέγξετε το aria-label ενός στοιχείου:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Αυτό σας επιτρέπει να καλέσετε το assertion ως εξής:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Υποστήριξη TypeScript

Αν χρησιμοποιείτε TypeScript, απαιτείται ένα ακόμη βήμα για να διασφαλιστεί η ασφάλεια τύπων των προσαρμοσμένων matchers σας. Επεκτείνοντας το interface `Matcher` με τους προσαρμοσμένους matchers σας, όλα τα προβλήματα τύπων εξαφανίζονται:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Αν δημιουργήσατε έναν προσαρμοσμένο [ασύμμετρο matcher](https://jestjs.io/docs/expect#expectextendmatchers), μπορείτε παρομοίως να επεκτείνετε τους τύπους του `expect` ως εξής:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```