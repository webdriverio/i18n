---
id: ocr-set-value
title: ocrSetValue
---

Στείλτε μια ακολουθία πλήκτρων σε ένα στοιχείο. Θα:

-   εντοπίσει αυτόματα το στοιχείο
-   εστιάσει στο πεδίο κάνοντας κλικ σε αυτό
-   ορίσει την τιμή στο πεδίο

Η εντολή θα αναζητήσει το παρεχόμενο κείμενο και θα προσπαθήσει να βρει μια αντιστοιχία με βάση τη Ασαφή Λογική από το [Fuse.js](https://fusejs.io/). Αυτό σημαίνει ότι αν παρέχετε έναν επιλογέα με τυπογραφικό λάθος, ή το κείμενο που βρέθηκε μπορεί να μην είναι 100% αντιστοιχία, θα προσπαθήσει και πάλι να σας επιστρέψει ένα στοιχείο. Δείτε τα [αρχεία καταγραφής](#logs) παρακάτω.

## Χρήση

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## Έξοδος

### Logs

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## Επιλογές

### `text`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** ναι

Το κείμενο που θέλετε να αναζητήσετε για να κάνετε κλικ.

#### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** ναι

Τιμή που θα προστεθεί.

#### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** `false`

Εάν η τιμή πρέπει επίσης να υποβληθεί στο πεδίο εισαγωγής. Αυτό σημαίνει ότι θα σταλεί ένα "ENTER" στο τέλος της συμβολοσειράς.

#### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** `500` χιλιοστά του δευτερολέπτου

Αυτή είναι η διάρκεια του κλικ. Αν θέλετε, μπορείτε επίσης να δημιουργήσετε ένα "παρατεταμένο κλικ" αυξάνοντας το χρόνο.

#### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // Αυτό είναι 3 δευτερόλεπτα
});
```

### `contrast`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** `0.25`

Όσο υψηλότερη είναι η αντίθεση, τόσο πιο σκοτεινή είναι η εικόνα και αντίστροφα. Αυτό μπορεί να βοηθήσει στην εύρεση κειμένου σε μια εικόνα. Δέχεται τιμές μεταξύ `-1` και `1`.

#### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Αυτή είναι η περιοχή αναζήτησης στην οθόνη όπου το OCR πρέπει να αναζητήσει κείμενο. Αυτό μπορεί να είναι ένα στοιχείο ή ένα ορθογώνιο που περιέχει `x`, `y`, `width` και `height`

#### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// Ή
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// Ή
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: {
        x: 10,
        y: 50,
        width: 300,
        height: 75,
    },
});
```

### `language`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `eng`

Η γλώσσα που θα αναγνωρίσει το Tesseract. Περισσότερες πληροφορίες μπορείτε να βρείτε [εδώ](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) και οι υποστηριζόμενες γλώσσες μπορούν να βρεθούν [εδώ](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Παράδειγμα

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Χρήση Ολλανδικών ως γλώσσα
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Τύπος:** `object`
-   **Υποχρεωτικό:** όχι

Μπορείτε να κάνετε κλικ στην οθόνη σχετικά με το αντίστοιχο στοιχείο. Αυτό μπορεί να γίνει με βάση τα σχετικά pixel `above`, `right`, `below` ή `left` από το αντίστοιχο στοιχείο

:::note

Οι ακόλουθοι συνδυασμοί επιτρέπονται

-   μεμονωμένες ιδιότητες
-   `above` + `left` ή `above` + `right`
-   `below` + `left` ή `below` + `right`

Οι ακόλουθοι συνδυασμοί **ΔΕΝ** επιτρέπονται

-   `above` συν `below`
-   `left` συν `right`

:::

#### `relativePosition.above`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι

Κάντε κλικ x pixel `πάνω` από το αντίστοιχο στοιχείο.

##### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι

Κάντε κλικ x pixel `δεξιά` από το αντίστοιχο στοιχείο.

##### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι

Κάντε κλικ x pixel `κάτω` από το αντίστοιχο στοιχείο.

##### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι

Κάντε κλικ x pixel `αριστερά` από το αντίστοιχο στοιχείο.

##### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Μπορείτε να αλλάξετε την ασαφή λογική για να βρείτε κείμενο με τις ακόλουθες επιλογές. Αυτό μπορεί να βοηθήσει στην εύρεση καλύτερης αντιστοιχίας

#### `fuzzyFindOptions.distance`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** 100

Καθορίζει πόσο κοντά πρέπει να είναι η αντιστοιχία στην ασαφή θέση (που καθορίζεται από τη θέση). Μια ακριβής αντιστοιχία γράμματος που απέχει απόσταση χαρακτήρων από την ασαφή θέση θα βαθμολογηθεί ως πλήρης αναντιστοιχία. Μια απόσταση 0 απαιτεί η αντιστοιχία να βρίσκεται στην ακριβή θέση που καθορίζεται. Μια απόσταση 1000 θα απαιτούσε μια τέλεια αντιστοιχία να βρίσκεται εντός 800 χαρακτήρων από τη θέση για να βρεθεί χρησιμοποιώντας ένα κατώφλι 0,8.

##### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** 0

Καθορίζει περίπου πού στο κείμενο αναμένεται να βρεθεί το μοτίβο.

##### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** 0.6

Σε ποιο σημείο ο αλγόριθμος αντιστοίχισης τα παρατάει. Ένα κατώφλι 0 απαιτεί τέλεια αντιστοιχία (τόσο των γραμμάτων όσο και της θέσης), ένα κατώφλι 1.0 θα αντιστοιχούσε σε οτιδήποτε.

##### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** false

Εάν η αναζήτηση πρέπει να είναι ευαίσθητη σε πεζά/κεφαλαία.

##### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** 2

Μόνο οι αντιστοιχίες των οποίων το μήκος υπερβαίνει αυτήν την τιμή θα επιστραφούν. (Για παράδειγμα, εάν θέλετε να αγνοήσετε μονούς χαρακτήρες στο αποτέλεσμα, ορίστε το σε 2)

##### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** false

Όταν είναι `true`, η συνάρτηση αντιστοίχισης θα συνεχίσει μέχρι το τέλος ενός μοτίβου αναζήτησης ακόμα και αν έχει ήδη εντοπιστεί μια τέλεια αντιστοιχία στη συμβολοσειρά.

##### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```