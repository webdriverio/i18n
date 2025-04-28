---
id: ocr-get-text
title: ocrGetText
---

Hämta texten från en bild.

### Användning

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## Utdata

### Resultat

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### Loggar

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## Alternativ

### `contrast`

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** `0.25`

Ju högre kontrast, desto mörkare blir bilden och vice versa. Detta kan hjälpa till att hitta text i en bild. Det accepterar värden mellan `-1` och `1`.

#### Exempel

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

-   **Typ:** `number`
-   **Obligatorisk:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Detta är sökområdet på skärmen där OCR behöver leta efter text. Detta kan vara ett element eller en rektangel som innehåller `x`, `y`, `width` och `height`

#### Exempel

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// ELLER
await browser.ocrGetText({ haystack: await $("elementSelector") });

// ELLER
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

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** `eng`

Språket som Tesseract kommer att känna igen. Mer information finns [här](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) och de språk som stöds kan hittas [här](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Exempel

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // Använd holländska som språk
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```