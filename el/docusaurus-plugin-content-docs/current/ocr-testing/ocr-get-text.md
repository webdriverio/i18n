---
id: ocr-get-text
title: ocrGetText
---

Λάβε το κείμενο από μια εικόνα.

### Usage

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## Output

### Result

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### Logs

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## Options

### `contrast`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** `0.25`

Όσο υψηλότερη είναι η αντίθεση, τόσο πιο σκούρα είναι η εικόνα και αντιστρόφως. Αυτό μπορεί να βοηθήσει στην εύρεση κειμένου σε μια εικόνα. Δέχεται τιμές μεταξύ `-1` και `1`.

#### Example

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

-   **Type:** `number`
-   **Mandatory:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Αυτή είναι η περιοχή αναζήτησης στην οθόνη όπου το OCR πρέπει να αναζητήσει κείμενο. Αυτό μπορεί να είναι ένα στοιχείο ή ένα ορθογώνιο που περιέχει `x`, `y`, `width` και `height`

#### Example

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// OR
await browser.ocrGetText({ haystack: await $("elementSelector") });

// OR
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

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `eng`

Η γλώσσα που θα αναγνωρίσει το Tesseract. Περισσότερες πληροφορίες μπορούν να βρεθούν [εδώ](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) και οι υποστηριζόμενες γλώσσες μπορούν να βρεθούν [εδώ](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Example

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```