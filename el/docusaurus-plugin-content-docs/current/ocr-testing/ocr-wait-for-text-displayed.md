---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
description: "Περιμένετε μέχρι να εμφανιστεί ένα συγκεκριμένο κείμενο στην οθόνη με το ocrWaitForTextDisplayed από την υπηρεσία OCR."
---

Περιμένετε μέχρι να εμφανιστεί ένα συγκεκριμένο κείμενο στην οθόνη.

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
# Το ocrWaitForTextDisplayed χρησιμοποιεί εσωτερικά το ocrGetElementPositionByText, γι' αυτό βλέπετε την εντολή ocrGetElementPositionByText στα αρχεία καταγραφής
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Επιλογές

### `text`

<Option type="string" required="yes">

Το κείμενο που θέλετε να αναζητήσετε για να κάνετε κλικ σε αυτό.

</Option>
#### Παράδειγμα

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

<Option type="number" default="18000 (18 seconds)" required="no">

Χρόνος σε χιλιοστά του δευτερολέπτου. Έχετε υπόψη ότι η διαδικασία OCR μπορεί να διαρκέσει αρκετό χρόνο, οπότε μην τον ορίσετε πολύ χαμηλά.

</Option>
#### Παράδειγμα

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // αναμονή για 25 δευτερόλεπτα
});
```

### `timeoutMsg`

<Option type="string" default={`Could not find the text "{selector}" within the requested time.`} required="no">

Αντικαθιστά το προεπιλεγμένο μήνυμα σφάλματος.

</Option>
#### Παράδειγμα

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Όσο υψηλότερη είναι η αντίθεση, τόσο πιο σκοτεινή είναι η εικόνα και αντίστροφα. Αυτό μπορεί να βοηθήσει στην εύρεση κειμένου σε μια εικόνα. Δέχεται τιμές μεταξύ `-1` και `1`.

</Option>
#### Παράδειγμα

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Αυτή είναι η περιοχή αναζήτησης στην οθόνη όπου το OCR πρέπει να αναζητήσει κείμενο. Μπορεί να είναι ένα στοιχείο ή ένα ορθογώνιο που περιέχει `x`, `y`, `width` και `height`

</Option>
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

<Option type="string" default="eng" required="No">

Η γλώσσα που θα αναγνωρίσει το Tesseract. Περισσότερες πληροφορίες μπορείτε να βρείτε [εδώ](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) και τις υποστηριζόμενες γλώσσες μπορείτε να τις βρείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Παράδειγμα

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // Χρήση των Ολλανδικών ως γλώσσα
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Μπορείτε να τροποποιήσετε την ασαφή λογική (fuzzy logic) για την εύρεση κειμένου με τις ακόλουθες επιλογές. Αυτό μπορεί να βοηθήσει στην εύρεση καλύτερης αντιστοίχισης

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Καθορίζει πόσο κοντά πρέπει να είναι η αντιστοίχιση στην ασαφή θέση (που ορίζεται από το location). Μια ακριβής αντιστοίχιση γραμμάτων που απέχει distance χαρακτήρες από την ασαφή θέση θα βαθμολογηθεί ως πλήρης αναντιστοιχία. Μια απόσταση 0 απαιτεί η αντιστοίχιση να βρίσκεται ακριβώς στη θέση που έχει οριστεί. Μια απόσταση 1000 θα απαιτούσε μια τέλεια αντιστοίχιση να βρίσκεται εντός 800 χαρακτήρων από τη θέση για να εντοπιστεί, χρησιμοποιώντας κατώφλι 0.8.

</Option>
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

<Option type="number" default="0" required="no">

Καθορίζει κατά προσέγγιση πού στο κείμενο αναμένεται να βρεθεί το μοτίβο.

</Option>
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

<Option type="number" default="0.6" required="no">

Σε ποιο σημείο εγκαταλείπει ο αλγόριθμος αντιστοίχισης. Ένα κατώφλι 0 απαιτεί τέλεια αντιστοίχιση (τόσο των γραμμάτων όσο και της θέσης), ενώ ένα κατώφλι 1.0 θα αντιστοιχούσε σε οτιδήποτε.

</Option>
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

<Option type="boolean" default="false" required="no">

Αν η αναζήτηση θα πρέπει να κάνει διάκριση πεζών-κεφαλαίων.

</Option>
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

<Option type="number" default="2" required="no">

Θα επιστρέφονται μόνο οι αντιστοιχίσεις των οποίων το μήκος υπερβαίνει αυτήν την τιμή. (Για παράδειγμα, αν θέλετε να αγνοήσετε αντιστοιχίσεις ενός χαρακτήρα στο αποτέλεσμα, ορίστε την σε 2)

</Option>
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

<Option type="number" default="false" required="no">

Όταν είναι `true`, η συνάρτηση αντιστοίχισης θα συνεχίσει μέχρι το τέλος ενός μοτίβου αναζήτησης ακόμη και αν έχει ήδη εντοπιστεί μια τέλεια αντιστοίχιση στη συμβολοσειρά.

</Option>
##### Παράδειγμα

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```