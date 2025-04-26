---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

Esperar a que un texto específico se muestre en la pantalla.

## Uso

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## Salida

### Registros

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Opciones

### `text`

-   **Tipo:** `string`
-   **Obligatorio:** sí

El texto que deseas buscar para hacer clic.

#### Ejemplo

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Valor predeterminado:** 18000 (18 segundos)

Tiempo en milisegundos. Ten en cuenta que el proceso OCR puede llevar algún tiempo, así que no lo configures demasiado bajo.

#### Ejemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // esperar durante 25 segundos
});
```

### `timeoutMsg`

-   **Tipo:** `string`
-   **Obligatorio:** no
-   **Valor predeterminado:** `Could not find the text "{selector}" within the requested time.`

Reemplaza el mensaje de error predeterminado.

#### Ejemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Valor predeterminado:** `0.25`

Cuanto mayor sea el contraste, más oscura será la imagen y viceversa. Esto puede ayudar a encontrar texto en una imagen. Acepta valores entre `-1` y `1`.

#### Ejemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **Tipo:** `number`
-   **Obligatorio:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Esta es el área de búsqueda en la pantalla donde el OCR debe buscar texto. Puede ser un elemento o un rectángulo que contenga `x`, `y`, `width` y `height`

#### Ejemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// O
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// O
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
-   **Valor predeterminado:** `eng`

El idioma que Tesseract reconocerá. Más información se puede encontrar [aquí](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) y los idiomas compatibles se pueden encontrar [aquí](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Ejemplo

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // Usar holandés como idioma
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Puedes alterar la lógica difusa para encontrar texto con las siguientes opciones. Esto puede ayudar a encontrar una mejor coincidencia

#### `fuzzyFindOptions.distance`

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Valor predeterminado:** 100

Determina qué tan cerca debe estar la coincidencia de la ubicación difusa (especificada por location). Una coincidencia exacta de letra que está a una distancia de caracteres de la ubicación difusa se puntuaría como una falta de coincidencia completa. Una distancia de 0 requiere que la coincidencia esté en la ubicación exacta especificada. Una distancia de 1000 requeriría una coincidencia perfecta para estar dentro de 800 caracteres de la ubicación para ser encontrada usando un umbral de 0.8.

##### Ejemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Valor predeterminado:** 0

Determina aproximadamente dónde en el texto se espera encontrar el patrón.

##### Ejemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Valor predeterminado:** 0.6

En qué punto el algoritmo de coincidencia se rinde. Un umbral de 0 requiere una coincidencia perfecta (tanto de letras como de ubicación), un umbral de 1.0 coincidiría con cualquier cosa.

##### Ejemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Tipo:** `boolean`
-   **Obligatorio:** no
-   **Valor predeterminado:** false

Si la búsqueda debe distinguir entre mayúsculas y minúsculas.

##### Ejemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Valor predeterminado:** 2

Solo se devolverán las coincidencias cuya longitud exceda este valor. (Por ejemplo, si deseas ignorar las coincidencias de un solo carácter en el resultado, configúralo en 2)

##### Ejemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Valor predeterminado:** false

Cuando es `true`, la función de coincidencia continuará hasta el final de un patrón de búsqueda incluso si ya se ha localizado una coincidencia perfecta en la cadena.

##### Ejemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```