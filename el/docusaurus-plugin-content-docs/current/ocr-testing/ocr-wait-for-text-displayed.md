---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

Αναμονή για την εμφάνιση συγκεκριμένου κειμένου στην οθόνη.

## Χρήση

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## Έξοδος

### Αρχεία καταγραφής

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Επιλογές

### `text`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** ναι

Το κείμενο που θέλετε να αναζητήσετε για να κάνετε κλικ.

#### Παράδειγμα

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** 18000 (18 δευτερόλεπτα)

Χρόνος σε χιλιοστά του δευτερολέπτου. Έχετε υπόψη ότι η διαδικασία OCR μπορεί να διαρκέσει αρκετό χρόνο, οπότε μην το ορίσετε πολύ χαμηλά.

#### Παράδειγμα

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // αναμονή για 25 δευτερόλεπτα
});
```

### `timeoutMsg`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** `Could not find the text "{selector}" within the requested time.`

Αντικαθιστά το προεπιλεγμένο μήνυμα σφάλματος.

#### Παράδειγμα

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** `0.25`

Όσο υψηλότερη η αντίθεση, τόσο πιο σκοτεινή η εικόνα και αντίστροφα. Αυτό μπορεί να βοηθήσει στην εύρεση κειμένου σε μια εικόνα. Δέχεται τιμές μεταξύ `-1` και `1`.

#### Παράδειγμα

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Αυτή είναι η περιοχή αναζήτησης στην οθόνη όπου το OCR πρέπει να αναζητήσει κείμενο. Αυτό μπορεί να είναι ένα στοιχείο ή ένα ορθογώνιο που περιέχει `x`, `y`, `width` και `height`

#### Παράδειγμα

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// Ή
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// Ή
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // Χρήση Ολλανδικών ως γλώσσα
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Μπορείτε να αλλάξετε τη λογική ασαφούς αναζήτησης για την εύρεση κειμένου με τις ακόλουθες επιλογές. Αυτό μπορεί να βοηθήσει στην εύρεση καλύτερης αντιστοιχίας

#### `fuzzyFindOptions.distance`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** 100

Καθορίζει πόσο κοντά πρέπει να είναι η αντιστοιχία στην ασαφή θέση (που καθορίζεται από τη θέση). Μια ακριβής αντιστοιχία γράμματος που απέχει απόσταση χαρακτήρων από την ασαφή θέση θα βαθμολογηθεί ως πλήρης αναντιστοιχία. Μια απόσταση 0 απαιτεί η αντιστοιχία να βρίσκεται στην ακριβή θέση που καθορίζεται. Μια απόσταση 1000 θα απαιτούσε μια τέλεια αντιστοιχία να είναι εντός 800 χαρακτήρων από τη θέση για να βρεθεί χρησιμοποιώντας όριο 0.8.

##### Παράδειγμα

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** 0.6

Σε ποιο σημείο εγκαταλείπει ο αλγόριθμος αντιστοίχισης. Ένα όριο 0 απαιτεί τέλεια αντιστοίχιση (τόσο των γραμμάτων όσο και της θέσης), ένα όριο 1.0 θα αντιστοιχούσε με οτιδήποτε.

##### Παράδειγμα

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** false

Εάν η αναζήτηση πρέπει να είναι ευαίσθητη σε πεζά-κεφαλαία.

##### Παράδειγμα

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** 2

Μόνο οι αντιστοιχίες των οποίων το μήκος υπερβαίνει αυτήν την τιμή θα επιστραφούν. (Για παράδειγμα, αν θέλετε να αγνοήσετε τις αντιστοιχίες μεμονωμένων χαρακτήρων στο αποτέλεσμα, ορίστε το σε 2)

##### Παράδειγμα

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** false

Όταν είναι `true`, η συνάρτηση αντιστοίχισης θα συνεχίσει μέχρι το τέλος ενός μοτίβου αναζήτησης ακόμα και αν έχει ήδη εντοπιστεί μια τέλεια αντιστοίχιση στη συμβολοσειρά.

##### Παράδειγμα

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```