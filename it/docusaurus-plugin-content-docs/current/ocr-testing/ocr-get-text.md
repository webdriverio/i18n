---
id: ocr-get-text
title: ocrGetText
---

Ottieni il testo da un'immagine.

### Utilizzo

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## Output

### Risultato

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### Log

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## Opzioni

### `contrast`

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** `0.25`

Maggiore è il contrasto, più scura diventa l'immagine e viceversa. Questo può aiutare a trovare testo in un'immagine. Accetta valori compresi tra `-1` e `1`.

#### Esempio

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

-   **Tipo:** `number`
-   **Obbligatorio:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Questa è l'area di ricerca nello schermo dove l'OCR deve cercare il testo. Può essere un elemento o un rettangolo contenente `x`, `y`, `width` e `height`

#### Esempio

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

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** `eng`

La lingua che Tesseract riconoscerà. Maggiori informazioni possono essere trovate [qui](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) e le lingue supportate possono essere trovate [qui](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Esempio

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```