---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
description: "Λάβετε τη θέση ενός κειμένου στην οθόνη με το ocrGetElementPositionByText, χρησιμοποιώντας OCR και ασαφή αντιστοίχιση (fuzzy matching) για να το εντοπίσετε."
---

Λάβετε τη θέση ενός κειμένου στην οθόνη. Η εντολή θα αναζητήσει το παρεχόμενο κείμενο και θα προσπαθήσει να βρει μια αντιστοιχία με βάση την Ασαφή Λογική (Fuzzy Logic) από το [Fuse.js](https://fusejs.io/). Αυτό σημαίνει ότι ακόμη κι αν δώσετε έναν selector με τυπογραφικό λάθος, ή το κείμενο που βρέθηκε δεν αντιστοιχεί 100%, θα προσπαθήσει παρ' όλα αυτά να σας επιστρέψει ένα στοιχείο. Δείτε τα [logs](#logs) παρακάτω.

## Χρήση

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## Έξοδος

### Αποτέλεσμα

```logs
result = {
  "dprPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "filePath": ".tmp/ocr/desktop-1716658199410.png",
  "matchedString": "Started",
  "originalPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "score": 85.71,
  "searchValue": "Start3d"
}
```

### Logs

```log
# Εξακολουθεί να βρίσκει αντιστοιχία παρόλο που αναζητήσαμε "Start3d" και το κείμενο που βρέθηκε ήταν "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Επιλογές

### `text`

<Option type="string" required="yes">

Το κείμενο που θέλετε να αναζητήσετε για να κάνετε κλικ σε αυτό.

</Option>
#### Παράδειγμα

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

<Option type="number" default="0.25" required="no">

Όσο υψηλότερη είναι η αντίθεση, τόσο πιο σκοτεινή είναι η εικόνα και αντίστροφα. Αυτό μπορεί να βοηθήσει στην εύρεση κειμένου σε μια εικόνα. Δέχεται τιμές μεταξύ `-1` και `1`.

</Option>
#### Παράδειγμα

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Αυτή είναι η περιοχή αναζήτησης στην οθόνη όπου το OCR πρέπει να αναζητήσει κείμενο. Μπορεί να είναι ένα στοιχείο ή ένα ορθογώνιο που περιέχει `x`, `y`, `width` και `height`

</Option>
#### Παράδειγμα

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OR
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // Χρήση των Ολλανδικών ως γλώσσα
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Μπορείτε να τροποποιήσετε την ασαφή λογική για την εύρεση κειμένου με τις ακόλουθες επιλογές. Αυτό μπορεί να βοηθήσει στην εύρεση καλύτερης αντιστοιχίας

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Καθορίζει πόσο κοντά πρέπει να είναι η αντιστοιχία στην ασαφή θέση (που καθορίζεται από το location). Μια ακριβής αντιστοιχία γράμματος που απέχει distance χαρακτήρες από την ασαφή θέση θα βαθμολογηθεί ως πλήρης αναντιστοιχία. Μια απόσταση 0 απαιτεί η αντιστοιχία να βρίσκεται ακριβώς στη θέση που καθορίστηκε. Μια απόσταση 1000 θα απαιτούσε μια τέλεια αντιστοιχία να βρίσκεται εντός 800 χαρακτήρων από τη θέση για να εντοπιστεί, χρησιμοποιώντας κατώφλι 0.8.

</Option>
##### Παράδειγμα

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

<Option type="number" default="0.6" required="no">

Σε ποιο σημείο ο αλγόριθμος αντιστοίχισης εγκαταλείπει. Ένα κατώφλι 0 απαιτεί τέλεια αντιστοιχία (τόσο γραμμάτων όσο και θέσης), ενώ ένα κατώφλι 1.0 θα αντιστοιχούσε σε οτιδήποτε.

</Option>
##### Παράδειγμα

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

<Option type="boolean" default="false" required="no">

Αν η αναζήτηση πρέπει να κάνει διάκριση πεζών-κεφαλαίων.

</Option>
##### Παράδειγμα

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

<Option type="number" default="2" required="no">

Θα επιστρέφονται μόνο οι αντιστοιχίες των οποίων το μήκος υπερβαίνει αυτή την τιμή. (Για παράδειγμα, αν θέλετε να αγνοήσετε αντιστοιχίες ενός χαρακτήρα στο αποτέλεσμα, ορίστε την σε 2)

</Option>
##### Παράδειγμα

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

<Option type="number" default="false" required="no">

Όταν είναι `true`, η συνάρτηση αντιστοίχισης θα συνεχίσει μέχρι το τέλος ενός μοτίβου αναζήτησης ακόμη κι αν έχει ήδη εντοπιστεί μια τέλεια αντιστοιχία στη συμβολοσειρά.

</Option>
##### Παράδειγμα

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```