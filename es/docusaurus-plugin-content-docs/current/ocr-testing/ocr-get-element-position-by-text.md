---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

Obtiene la posición de un texto en la pantalla. El comando buscará el texto proporcionado e intentará encontrar una coincidencia basada en Lógica Difusa de [Fuse.js](https://fusejs.io/). Esto significa que si proporcionas un selector con un error tipográfico, o el texto encontrado no es una coincidencia 100%, aún intentará devolverte un elemento. Consulta los [registros](#logs) a continuación.

## Uso

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## Salida

### Resultado

```logs
result = {
  "dprPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "filePath": ".tmp/ocr/desktop-1716658199410.png",
  "matchedString": "Started",
  "originalPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "score": 85.71,
  "searchValue": "Start3d"
}
```

### Registros

```log
# Aún encuentra una coincidencia aunque buscamos "Start3d" y el texto encontrado fue "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Opciones

### `text`

-   **Tipo:** `string`
-   **Obligatorio:** sí

El texto que deseas buscar para hacer clic.

#### Ejemplo

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Valor predeterminado:** `0.25`

Cuanto mayor sea el contraste, más oscura será la imagen y viceversa. Esto puede ayudar a encontrar texto en una imagen. Acepta valores entre `-1` y `1`.

#### Ejemplo

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Tipo:** `number`
-   **Obligatorio:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Esta es el área de búsqueda en la pantalla donde el OCR debe buscar texto. Puede ser un elemento o un rectángulo que contenga `x`, `y`, `width` y `height`

#### Ejemplo

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// O
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// O
await browser.ocrGetElementPositionByText({
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

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Valor predeterminado:** `eng`

El idioma que Tesseract reconocerá. Más información se puede encontrar [aquí](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) y los idiomas soportados se pueden encontrar [aquí](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Ejemplo

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```