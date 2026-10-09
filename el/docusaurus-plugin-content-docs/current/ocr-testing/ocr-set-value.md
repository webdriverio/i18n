---
id: ocr-set-value
title: ocrSetValue
description: "Πληκτρολογήστε σε ένα πεδίο εισαγωγής που εντοπίζεται από το ορατό κείμενό του με το ocrSetValue, το οποίο βρίσκει το πεδίο με OCR και ασαφή αντιστοίχιση."
---

Στέλνει μια ακολουθία πληκτρολογήσεων σε ένα στοιχείο. Θα:

-   εντοπίσει αυτόματα το στοιχείο
-   εστιάσει στο πεδίο κάνοντας κλικ πάνω του
-   ορίσει την τιμή στο πεδίο

Η εντολή θα αναζητήσει το παρεχόμενο κείμενο και θα προσπαθήσει να βρει μια αντιστοιχία με βάση την Ασαφή Λογική (Fuzzy Logic) από το [Fuse.js](https://fusejs.io/). Αυτό σημαίνει ότι αν δώσετε έναν επιλογέα με τυπογραφικό λάθος, ή αν το κείμενο που βρέθηκε δεν είναι 100% αντιστοιχία, θα προσπαθήσει παρ' όλα αυτά να σας επιστρέψει ένα στοιχείο. Δείτε τα [logs](#logs) παρακάτω.

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

<Option type="string" required="yes">

Το κείμενο που θέλετε να αναζητήσετε για να κάνετε κλικ.

</Option>
#### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

<Option type="string" required="yes">

Η τιμή που θα προστεθεί.

</Option>
#### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

<Option type="boolean" default="false" required="no">

Αν η τιμή πρέπει επίσης να υποβληθεί στο πεδίο εισαγωγής. Αυτό σημαίνει ότι θα σταλεί ένα "ENTER" στο τέλος της συμβολοσειράς.

</Option>
#### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

Αυτή είναι η διάρκεια του κλικ. Αν θέλετε, μπορείτε επίσης να δημιουργήσετε ένα "παρατεταμένο κλικ" αυξάνοντας τον χρόνο.

</Option>
#### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // Αυτό είναι 3 δευτερόλεπτα
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Όσο υψηλότερη η αντίθεση, τόσο πιο σκούρα η εικόνα και αντίστροφα. Αυτό μπορεί να βοηθήσει στην εύρεση κειμένου σε μια εικόνα. Δέχεται τιμές μεταξύ `-1` και `1`.

</Option>
#### Παράδειγμα

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Αυτή είναι η περιοχή αναζήτησης στην οθόνη όπου το OCR πρέπει να αναζητήσει κείμενο. Μπορεί να είναι ένα στοιχείο ή ένα ορθογώνιο που περιέχει `x`, `y`, `width` και `height`

</Option>
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

<Option type="string" default="eng" required="No">

Η γλώσσα που θα αναγνωρίσει το Tesseract. Περισσότερες πληροφορίες μπορείτε να βρείτε [εδώ](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) και τις υποστηριζόμενες γλώσσες μπορείτε να τις βρείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Παράδειγμα

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Χρήση των Ολλανδικών ως γλώσσα
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

Μπορείτε να κάνετε κλικ στην οθόνη σε σχέση με το στοιχείο που αντιστοιχεί. Αυτό μπορεί να γίνει με βάση σχετικά pixels `above`, `right`, `below` ή `left` από το στοιχείο που αντιστοιχεί

:::note

Επιτρέπονται οι ακόλουθοι συνδυασμοί

-   μεμονωμένες ιδιότητες
-   `above` + `left` ή `above` + `right`
-   `below` + `left` ή `below` + `right`

Οι ακόλουθοι συνδυασμοί **ΔΕΝ** επιτρέπονται

-   `above` μαζί με `below`
-   `left` μαζί με `right`

:::

</Option>
#### `relativePosition.above`

<Option type="number" required="no">

Κλικ x pixels `above` (πάνω από) το στοιχείο που αντιστοιχεί.

</Option>
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

<Option type="number" required="no">

Κλικ x pixels `right` (δεξιά) από το στοιχείο που αντιστοιχεί.

</Option>
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

<Option type="number" required="no">

Κλικ x pixels `below` (κάτω από) το στοιχείο που αντιστοιχεί.

</Option>
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

<Option type="number" required="no">

Κλικ x pixels `left` (αριστερά) από το στοιχείο που αντιστοιχεί.

</Option>
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

Μπορείτε να τροποποιήσετε την ασαφή λογική για την εύρεση κειμένου με τις ακόλουθες επιλογές. Αυτό μπορεί να βοηθήσει στην εύρεση καλύτερης αντιστοιχίας

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Καθορίζει πόσο κοντά πρέπει να είναι η αντιστοιχία στην ασαφή θέση (που καθορίζεται από το location). Μια ακριβής αντιστοιχία γράμματος που απέχει distance χαρακτήρες από την ασαφή θέση θα βαθμολογηθεί ως πλήρης αναντιστοιχία. Ένα distance 0 απαιτεί η αντιστοιχία να βρίσκεται στην ακριβή καθορισμένη θέση. Ένα distance 1000 θα απαιτούσε μια τέλεια αντιστοιχία να βρίσκεται εντός 800 χαρακτήρων από τη θέση για να βρεθεί, χρησιμοποιώντας threshold 0.8.

</Option>
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

<Option type="number" default="0" required="no">

Καθορίζει κατά προσέγγιση πού στο κείμενο αναμένεται να βρεθεί το μοτίβο.

</Option>
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

<Option type="number" default="0.6" required="no">

Σε ποιο σημείο ο αλγόριθμος αντιστοίχισης εγκαταλείπει. Ένα threshold 0 απαιτεί τέλεια αντιστοιχία (τόσο γραμμάτων όσο και θέσης), ένα threshold 1.0 θα αντιστοιχούσε σε οτιδήποτε.

</Option>
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

<Option type="boolean" default="false" required="no">

Αν η αναζήτηση πρέπει να κάνει διάκριση πεζών-κεφαλαίων.

</Option>
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

<Option type="number" default="2" required="no">

Θα επιστραφούν μόνο οι αντιστοιχίες των οποίων το μήκος υπερβαίνει αυτή την τιμή. (Για παράδειγμα, αν θέλετε να αγνοήσετε αντιστοιχίες ενός χαρακτήρα στο αποτέλεσμα, ορίστε την σε 2)

</Option>
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

<Option type="number" default="false" required="no">

Όταν είναι `true`, η συνάρτηση αντιστοίχισης θα συνεχίσει μέχρι το τέλος ενός μοτίβου αναζήτησης ακόμη κι αν έχει ήδη εντοπιστεί μια τέλεια αντιστοιχία στη συμβολοσειρά.

</Option>
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