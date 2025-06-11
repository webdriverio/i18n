---
id: custommatchers
title: Προσαρμοσμένοι Matchers
---

Το WebdriverIO χρησιμοποιεί μια βιβλιοθήκη ισχυρισμών [`expect`](https://webdriver.io/docs/api/expect-webdriverio) σε στυλ Jest που διαθέτει ειδικές λειτουργίες και προσαρμοσμένους matchers ειδικά για την εκτέλεση δοκιμών ιστού και κινητών συσκευών. Ενώ η βιβλιοθήκη των matchers είναι μεγάλη, σίγουρα δεν καλύπτει όλες τις πιθανές καταστάσεις. Επομένως, είναι δυνατό να επεκτείνετε τους υπάρχοντες matchers με προσαρμοσμένους που ορίζονται από εσάς.

:::warning

Παρόλο που επί του παρόντος δεν υπάρχει διαφορά στον τρόπο που ορίζονται οι matchers που είναι συγκεκριμένοι για το αντικείμενο [`browser`](/docs/api/browser) ή μια εμφάνιση [element](/docs/api/element), αυτό σίγουρα μπορεί να αλλάξει στο μέλλον. Κρατήστε ένα μάτι στο [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) για περισσότερες πληροφορίες σχετικά με αυτή την εξέλιξη.

:::

## Προσαρμοσμένοι Matchers Περιηγητή

Για να καταχωρίσετε έναν προσαρμοσμένο matcher περιηγητή, καλέστε το `extend` στο αντικείμενο `expect` είτε απευθείας στο αρχείο προδιαγραφών σας είτε ως μέρος του π.χ. hook `before` στο αρχείο `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Όπως φαίνεται στο παράδειγμα, η συνάρτηση matcher λαμβάνει το αναμενόμενο αντικείμενο, π.χ. το αντικείμενο περιηγητή ή στοιχείου, ως την πρώτη παράμετρο και την αναμενόμενη τιμή ως τη δεύτερη. Μπορείτε στη συνέχεια να χρησιμοποιήσετε τον matcher ως εξής:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Προσαρμοσμένοι Matchers Στοιχείων

Παρόμοια με τους προσαρμοσμένους matchers περιηγητή, οι matchers στοιχείων δεν διαφέρουν. Εδώ είναι ένα παράδειγμα για το πώς να δημιουργήσετε έναν προσαρμοσμένο matcher για να επιβεβαιώσετε το aria-label ενός στοιχείου:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Αυτό σας επιτρέπει να καλέσετε τον ισχυρισμό ως εξής:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Υποστήριξη TypeScript

Εάν χρησιμοποιείτε TypeScript, απαιτείται ένα επιπλέον βήμα για να διασφαλιστεί η ασφάλεια τύπου των προσαρμοσμένων matchers σας. Επεκτείνοντας το interface `Matcher` με τους προσαρμοσμένους matchers σας, όλα τα ζητήματα τύπου εξαφανίζονται:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Εάν δημιουργήσατε έναν προσαρμοσμένο [ασύμμετρο matcher](https://jestjs.io/docs/expect#expectextendmatchers), μπορείτε παρομοίως να επεκτείνετε τους τύπους `expect` ως εξής:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```