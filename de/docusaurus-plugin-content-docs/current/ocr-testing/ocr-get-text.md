---
id: ocr-get-text
title: ocrGetText
---

Text auf einem Bild erkennen.

### Verwendung

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## Ausgabe

### Ergebnis

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### Logs

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## Optionen

### `contrast`

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** `0.25`

Je höher der Kontrast, desto dunkler das Bild und umgekehrt. Dies kann helfen, Text in einem Bild zu finden. Es akzeptiert Werte zwischen `-1` und `1`.

#### Beispiel

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

-   **Typ:** `number`
-   **Pflichtfeld:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Dies ist der Suchbereich auf dem Bildschirm, in dem die OCR nach Text suchen soll. Dies kann ein Element oder ein Rechteck sein, das `x`, `y`, `width` und `height` enthält.

#### Beispiel

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// ODER
await browser.ocrGetText({ haystack: await $("elementSelector") });

// ODER
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
-   **Pflichtfeld:** Nein
-   **Standard:** `eng`

Die Sprache, die Tesseract erkennen wird. Weitere Informationen finden Sie [hier](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) und die unterstützten Sprachen finden Sie [hier](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Beispiel

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // Niederländisch als Sprache verwenden
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```