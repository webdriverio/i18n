---
id: ocr-get-text
title: ocrGetText
---

Obtenir le texte sur une image.

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
-   **Mandatory:** non
-   **Default:** `0.25`

Plus le contraste est élevé, plus l'image est sombre et vice versa. Cela peut aider à trouver du texte dans une image. Il accepte des valeurs entre `-1` et `1`.

#### Example

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

-   **Type:** `number`
-   **Mandatory:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

C'est la zone de recherche sur l'écran où l'OCR doit chercher du texte. Cela peut être un élément ou un rectangle contenant `x`, `y`, `width` et `height`

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
-   **Mandatory:** Non
-   **Default:** `eng`

La langue que Tesseract reconnaîtra. Plus d'informations peuvent être trouvées [here](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) et les langues prises en charge peuvent être trouvées [here](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Example

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```