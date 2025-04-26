---
id: ocr-get-text
title: ocrGetText
---

Obtener el texto en una imagen.

### Uso

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## Salida

### Resultado

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### Registros

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## Opciones

### `contrast`

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Predeterminado:** `0.25`

Cuanto mayor sea el contraste, más oscura será la imagen y viceversa. Esto puede ayudar a encontrar texto en una imagen. Acepta valores entre `-1` y `1`.

#### Ejemplo

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

-   **Tipo:** `number`
-   **Obligatorio:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Esta es el área de búsqueda en la pantalla donde el OCR necesita buscar texto. Puede ser un elemento o un rectángulo que contenga `x`, `y`, `width` y `height`

#### Ejemplo

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// O
await browser.ocrGetText({ haystack: await $("elementSelector") });

// O
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
-   **Obligatorio:** No
-   **Predeterminado:** `eng`

El idioma que Tesseract reconocerá. Se puede encontrar más información [aquí](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) y los idiomas compatibles se pueden encontrar [aquí](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Ejemplo

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // Usar holandés como idioma
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```