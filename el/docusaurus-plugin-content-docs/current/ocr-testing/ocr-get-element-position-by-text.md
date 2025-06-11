---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

Λάβετε τη θέση ενός κειμένου στην οθόνη. Η εντολή θα αναζητήσει το παρεχόμενο κείμενο και θα προσπαθήσει να βρει μια αντιστοιχία βάσει της Ασαφούς Λογικής (Fuzzy Logic) από το [Fuse.js](https://fusejs.io/). Αυτό σημαίνει ότι αν παρέχετε έναν επιλογέα με τυπογραφικό λάθος, ή το κείμενο που βρέθηκε μπορεί να μην ταιριάζει 100%, θα προσπαθήσει να σας επιστρέψει ένα στοιχείο. Δείτε τα [αρχεία καταγραφής](#logs) παρακάτω.

## Usage

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## Output

### Result

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
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Options

### `text`

-   **Type:** `string`
-   **Mandatory:** yes

Το κείμενο που θέλετε να αναζητήσετε για να κάνετε κλικ.

#### Example

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** `0.25`

Όσο υψηλότερη είναι η αντίθεση, τόσο πιο σκοτεινή είναι η εικόνα και αντίστροφα. Αυτό μπορεί να βοηθήσει στην εύρεση κειμένου σε μια εικόνα. Δέχεται τιμές μεταξύ `-1` και `1`.

#### Example

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Type:** `number`
-   **Mandatory:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Αυτή είναι η περιοχή αναζήτησης στην οθόνη όπου το OCR πρέπει να αναζητήσει κείμενο. Αυτό μπορεί να είναι ένα στοιχείο ή ένα ορθογώνιο που περιέχει `x`, `y`, `width` και `height`

#### Example

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

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `eng`

Η γλώσσα που το Tesseract θα αναγνωρίσει. Περισσότερες πληροφορίες μπορείτε να βρείτε [εδώ](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) και οι υποστηριζόμενες γλώσσες μπορούν να βρεθούν [εδώ](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Example

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Μπορείτε να αλλάξετε τη λογική ασαφούς αναζήτησης για να βρείτε κείμενο με τις ακόλουθες επιλογές. Αυτό μπορεί να βοηθήσει στην εύρεση καλύτερης αντιστοιχίας

#### `fuzzyFindOptions.distance`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 100

Καθορίζει πόσο κοντά πρέπει να είναι η αντιστοιχία στην ασαφή τοποθεσία (που καθορίζεται από την τοποθεσία). Μια ακριβής αντιστοιχία γράμματος που απέχει απόσταση χαρακτήρων από την ασαφή τοποθεσία θα βαθμολογηθεί ως πλήρης αναντιστοιχία. Μια απόσταση 0 απαιτεί η αντιστοιχία να βρίσκεται στην ακριβή τοποθεσία που καθορίζεται. Μια απόσταση 1000 θα απαιτούσε μια τέλεια αντιστοιχία να βρίσκεται εντός 800 χαρακτήρων από την τοποθεσία για να βρεθεί χρησιμοποιώντας ένα κατώφλι 0,8.

##### Example

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 0

Καθορίζει περίπου πού στο κείμενο αναμένεται να βρεθεί το μοτίβο.

##### Example

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 0.6

Σε ποιο σημείο ο αλγόριθμος αντιστοίχισης εγκαταλείπει. Ένα κατώφλι 0 απαιτεί τέλεια αντιστοιχία (τόσο γραμμάτων όσο και τοποθεσίας), ένα κατώφλι 1.0 θα ταίριαζε με οτιδήποτε.

##### Example

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Type:** `boolean`
-   **Mandatory:** no
-   **Default:** false

Εάν η αναζήτηση πρέπει να διακρίνει πεζά-κεφαλαία.

##### Example

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 2

Μόνο οι αντιστοιχίες των οποίων το μήκος υπερβαίνει αυτήν την τιμή θα επιστραφούν. (Για παράδειγμα, αν θέλετε να αγνοήσετε τις αντιστοιχίες μεμονωμένων χαρακτήρων στο αποτέλεσμα, ορίστε το σε 2)

##### Example

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** false

Όταν είναι `true`, η συνάρτηση αντιστοίχισης θα συνεχίσει μέχρι το τέλος ενός μοτίβου αναζήτησης ακόμα και αν έχει ήδη εντοπιστεί μια τέλεια αντιστοιχία στη συμβολοσειρά.

##### Example

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```