---
id: ocr-get-text
title: ocrGetText
description: "Διαβάστε το κείμενο που εμφανίζεται στην οθόνη ή σε μια συγκεκριμένη περιοχή με το ocrGetText από την υπηρεσία OCR."
---

Λήψη του κειμένου σε μια εικόνα.

### Χρήση

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## Έξοδος

### Αποτέλεσμα

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### Αρχεία καταγραφής

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## Επιλογές

### `contrast`

<Option type="number" default="0.25" required="no">

Όσο υψηλότερη είναι η αντίθεση, τόσο πιο σκούρα γίνεται η εικόνα και αντίστροφα. Αυτό μπορεί να βοηθήσει στον εντοπισμό κειμένου σε μια εικόνα. Δέχεται τιμές μεταξύ `-1` και `1`.

</Option>
#### Παράδειγμα

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Αυτή είναι η περιοχή αναζήτησης στην οθόνη όπου το OCR πρέπει να αναζητήσει κείμενο. Μπορεί να είναι ένα στοιχείο ή ένα ορθογώνιο που περιέχει `x`, `y`, `width` και `height`

</Option>
#### Παράδειγμα

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// Ή
await browser.ocrGetText({ haystack: await $("elementSelector") });

// Ή
await browser.ocrGetText({
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
await browser.ocrGetText({
    // Χρήση των Ολλανδικών ως γλώσσα
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```