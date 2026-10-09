---
id: ocr-click-on-text
title: ocrClickOnText
description: "Κάντε κλικ σε ένα στοιχείο με βάση το ορατό του κείμενο με το ocrClickOnText, το οποίο εντοπίζει το κείμενο στην οθόνη με OCR και ασαφή αντιστοίχιση."
---

Κάνει κλικ σε ένα στοιχείο με βάση τα παρεχόμενα κείμενα. Η εντολή θα αναζητήσει το παρεχόμενο κείμενο και θα προσπαθήσει να βρει μια αντιστοιχία με βάση την Ασαφή Λογική (Fuzzy Logic) από το [Fuse.js](https://fusejs.io/). Αυτό σημαίνει ότι ακόμη κι αν δώσετε έναν επιλογέα με τυπογραφικό λάθος ή το κείμενο που βρέθηκε δεν αντιστοιχεί 100%, η εντολή θα προσπαθήσει παρ' όλα αυτά να σας επιστρέψει ένα στοιχείο. Δείτε τα [logs](#logs) παρακάτω.

## Χρήση

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Έξοδος

### Logs

```log
# Βρίσκει ακόμα αντιστοιχία παρόλο που αναζητήσαμε "Start3d" και το κείμενο που βρέθηκε ήταν "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Εικόνα

Θα βρείτε μια εικόνα στον (προεπιλεγμένο) [`imagesFolder`](./getting-started#imagesfolder) σας με έναν στόχο που σας δείχνει πού έκανε κλικ η μονάδα.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Επιλογές

### `text`

<Option type="string" required="yes">

Το κείμενο που θέλετε να αναζητήσετε για να κάνετε κλικ σε αυτό.

</Option>
#### Παράδειγμα

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

Αυτή είναι η διάρκεια του κλικ. Αν θέλετε, μπορείτε επίσης να δημιουργήσετε ένα "παρατεταμένο κλικ" αυξάνοντας τον χρόνο.

</Option>
#### Παράδειγμα

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // Αυτό είναι 3 δευτερόλεπτα
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Όσο υψηλότερη είναι η αντίθεση, τόσο πιο σκούρα είναι η εικόνα και αντίστροφα. Αυτό μπορεί να βοηθήσει στην εύρεση κειμένου σε μια εικόνα. Δέχεται τιμές μεταξύ `-1` και `1`.

</Option>
#### Παράδειγμα

```js
await browser.ocrClickOnText({
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

<Option type="string" default="eng" required="No">

Η γλώσσα που θα αναγνωρίσει το Tesseract. Περισσότερες πληροφορίες μπορείτε να βρείτε [εδώ](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) και τις υποστηριζόμενες γλώσσες μπορείτε να τις βρείτε [εδώ](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Παράδειγμα

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Χρήση των Ολλανδικών ως γλώσσα
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

Μπορείτε να κάνετε κλικ στην οθόνη σε σχέση με το στοιχείο που αντιστοιχεί. Αυτό μπορεί να γίνει με βάση σχετικά pixels `above` (πάνω), `right` (δεξιά), `below` (κάτω) ή `left` (αριστερά) από το στοιχείο που αντιστοιχεί

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

Κλικ x pixels πάνω (`above`) από το στοιχείο που αντιστοιχεί.

</Option>
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

<Option type="number" required="no">

Κλικ x pixels δεξιά (`right`) από το στοιχείο που αντιστοιχεί.

</Option>
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

<Option type="number" required="no">

Κλικ x pixels κάτω (`below`) από το στοιχείο που αντιστοιχεί.

</Option>
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

<Option type="number" required="no">

Κλικ x pixels αριστερά (`left`) από το στοιχείο που αντιστοιχεί.

</Option>
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

Μπορείτε να τροποποιήσετε την ασαφή λογική εύρεσης κειμένου με τις ακόλουθες επιλογές. Αυτό μπορεί να βοηθήσει στην εύρεση καλύτερης αντιστοιχίας

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Καθορίζει πόσο κοντά πρέπει να βρίσκεται η αντιστοιχία στην ασαφή θέση (που ορίζεται από το location). Μια ακριβής αντιστοιχία γράμματος που απέχει distance χαρακτήρες από την ασαφή θέση θα βαθμολογηθεί ως πλήρης αναντιστοιχία. Ένα distance ίσο με 0 απαιτεί η αντιστοιχία να βρίσκεται ακριβώς στη θέση που ορίστηκε. Ένα distance ίσο με 1000 θα απαιτούσε μια τέλεια αντιστοιχία να βρίσκεται εντός 800 χαρακτήρων από τη θέση, ώστε να εντοπιστεί χρησιμοποιώντας threshold 0.8.

</Option>
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

<Option type="number" default="0" required="no">

Καθορίζει κατά προσέγγιση πού στο κείμενο αναμένεται να βρεθεί το μοτίβο.

</Option>
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

<Option type="number" default="0.6" required="no">

Σε ποιο σημείο εγκαταλείπει ο αλγόριθμος αντιστοίχισης. Ένα threshold ίσο με 0 απαιτεί τέλεια αντιστοιχία (τόσο των γραμμάτων όσο και της θέσης), ενώ ένα threshold ίσο με 1.0 θα αντιστοιχούσε σε οτιδήποτε.

</Option>
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

<Option type="boolean" default="false" required="no">

Αν η αναζήτηση πρέπει να κάνει διάκριση πεζών-κεφαλαίων.

</Option>
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

<Option type="number" default="2" required="no">

Θα επιστρέφονται μόνο οι αντιστοιχίες των οποίων το μήκος υπερβαίνει αυτή την τιμή. (Για παράδειγμα, αν θέλετε να αγνοήσετε αντιστοιχίες ενός χαρακτήρα στο αποτέλεσμα, ορίστε την σε 2)

</Option>
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

<Option type="number" default="false" required="no">

Όταν είναι `true`, η συνάρτηση αντιστοίχισης θα συνεχίσει μέχρι το τέλος ενός μοτίβου αναζήτησης ακόμη κι αν έχει ήδη εντοπιστεί μια τέλεια αντιστοιχία στη συμβολοσειρά.

</Option>
##### Παράδειγμα

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```