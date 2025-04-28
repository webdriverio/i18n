---
id: ocr-get-text
title: ocrGetText
---

Pobierz tekst z obrazu.

### Użycie

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## Wynik

### Rezultat

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### Logi

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## Opcje

### `contrast`

-   **Typ:** `number`
-   **Obowiązkowe:** nie
-   **Domyślnie:** `0.25`

Im wyższy kontrast, tym ciemniejszy obraz i odwrotnie. Może to pomóc w znalezieniu tekstu na obrazie. Przyjmuje wartości między `-1` i `1`.

#### Przykład

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

-   **Typ:** `number`
-   **Obowiązkowe:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Jest to obszar wyszukiwania na ekranie, w którym OCR ma szukać tekstu. Może to być element lub prostokąt zawierający `x`, `y`, `width` i `height`

#### Przykład

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// LUB
await browser.ocrGetText({ haystack: await $("elementSelector") });

// LUB
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
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `eng`

Język, który Tesseract rozpozna. Więcej informacji można znaleźć [tutaj](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), a obsługiwane języki można znaleźć [tutaj](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Przykład

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // Użyj języka holenderskiego
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```