---
id: ocr-click-on-text
title: ocrClickOnText
---

Κάντε κλικ σε ένα στοιχείο με βάση τα παρεχόμενα κείμενα. Η εντολή θα αναζητήσει το παρεχόμενο κείμενο και θα προσπαθήσει να βρει μια αντιστοιχία βάσει της Ασαφούς Λογικής από το [Fuse.js](https://fusejs.io/). Αυτό σημαίνει ότι εάν παρέχετε έναν επιλογέα με τυπογραφικό λάθος, ή το κείμενο που βρέθηκε μπορεί να μην ταιριάζει 100%, θα προσπαθήσει να σας επιστρέψει ένα στοιχείο. Δείτε τα [αρχεία καταγραφής](#logs) παρακάτω.

## Χρήση

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Έξοδος

### Logs

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Εικόνα

Θα βρείτε μια εικόνα στον (προεπιλεγμένο)[`imagesFolder`](./getting-started#imagesfolder) σας με έναν στόχο που δείχνει πού έχει κάνει κλικ η μονάδα.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Επιλογές

### `text`

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** ναι

Το κείμενο που θέλετε να αναζητήσετε για να κάνετε κλικ.

#### Παράδειγμα

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** `500` χιλιοστά του δευτερολέπτου

Αυτή είναι η διάρκεια του κλικ. Αν θέλετε, μπορείτε επίσης να δημιουργήσετε ένα "παρατεταμένο κλικ" αυξάνοντας τον χρόνο.

#### Παράδειγμα

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
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
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Αυτή είναι η περιοχή αναζήτησης στην οθόνη όπου το OCR πρέπει να αναζητήσει κείμενο. Αυτό μπορεί να είναι ένα στοιχείο ή ένα ορθογώνιο που περιέχει `x`, `y`, `width` και `height`

#### Παράδειγμα

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// Ή
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// Ή
await browser.ocrClickOnText({
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

-   **Τύπος:** `string`
-   **Υποχρεωτικό:** Όχι
-   **Προεπιλογή:** `eng`

Η γλώσσα που θα αναγνωρίσει το Tesseract. Περισσότερες πληροφορίες μπορείτε να βρείτε [εδώ](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) και οι υποστηριζόμενες γλώσσες μπορούν να βρεθούν [εδώ](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Παράδειγμα

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Χρήση της Ολλανδικής ως γλώσσα
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Τύπος:** `object`
-   **Υποχρεωτικό:** όχι

Μπορείτε να κάνετε κλικ στην οθόνη σχετικά με το αντιστοιχούμενο στοιχείο. Αυτό μπορεί να γίνει με βάση τα σχετικά εικονοστοιχεία `above`, `right`, `below` ή `left` από το αντιστοιχούμενο στοιχείο

:::note

Οι ακόλουθοι συνδυασμοί επιτρέπονται

-   μεμονωμένες ιδιότητες
-   `above` + `left` ή `above` + `right`
-   `below` + `left` ή `below` + `right`

Οι ακόλουθοι συνδυασμοί **ΔΕΝ** επιτρέπονται

-   `above` μαζί με `below`
-   `left` μαζί με `right`

:::

#### `relativePosition.above`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι

Κάντε κλικ x εικονοστοιχεία `πάνω` από το αντιστοιχούμενο στοιχείο.

##### Παράδειγμα

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι

Κάντε κλικ x εικονοστοιχεία `δεξιά` από το αντιστοιχούμενο στοιχείο.

##### Παράδειγμα

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι

Κάντε κλικ x εικονοστοιχεία `κάτω` από το αντιστοιχούμενο στοιχείο.

##### Παράδειγμα

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι

Κάντε κλικ x εικονοστοιχεία `αριστερά` από το αντιστοιχούμενο στοιχείο.

##### Παράδειγμα

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Μπορείτε να αλλάξετε την ασαφή λογική για την εύρεση κειμένου με τις ακόλουθες επιλογές. Αυτό μπορεί να βοηθήσει στην εύρεση καλύτερης αντιστοιχίας

#### `fuzzyFindOptions.distance`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** 100

Καθορίζει πόσο κοντά πρέπει να είναι η αντιστοιχία στην ασαφή θέση (που καθορίζεται από τη θέση). Μια ακριβής αντιστοιχία γράμματος που απέχει distance χαρακτήρες από την ασαφή θέση θα βαθμολογηθεί ως πλήρης αναντιστοιχία. Μια απόσταση 0 απαιτεί η αντιστοιχία να βρίσκεται στην ακριβή θέση που καθορίζεται. Μια απόσταση 1000 θα απαιτούσε μια τέλεια αντιστοιχία να βρίσκεται εντός 800 χαρακτήρων από τη θέση για να βρεθεί χρησιμοποιώντας ένα κατώφλι 0.8.

##### Παράδειγμα

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
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
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** 0.6

Σε ποιο σημείο ο αλγόριθμος αντιστοίχισης εγκαταλείπει. Ένα κατώφλι 0 απαιτεί τέλεια αντιστοιχία (τόσο γραμμάτων όσο και θέσης), ένα κατώφλι 1.0 θα αντιστοιχούσε με οτιδήποτε.

##### Παράδειγμα

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Τύπος:** `boolean`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** false

Εάν η αναζήτηση πρέπει να είναι με διάκριση πεζών-κεφαλαίων.

##### Παράδειγμα

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** 2

Θα επιστραφούν μόνο οι αντιστοιχίες των οποίων το μήκος υπερβαίνει αυτήν την τιμή. (Για παράδειγμα, αν θέλετε να αγνοήσετε τις αντιστοιχίες μονού χαρακτήρα στο αποτέλεσμα, ορίστε το σε 2)

##### Παράδειγμα

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **Τύπος:** `number`
-   **Υποχρεωτικό:** όχι
-   **Προεπιλογή:** false

Όταν είναι `true`, η λειτουργία αντιστοίχισης θα συνεχίσει μέχρι το τέλος ενός μοτίβου αναζήτησης ακόμα και αν έχει ήδη εντοπιστεί μια τέλεια αντιστοιχία στη συμβολοσειρά.

##### Παράδειγμα

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```