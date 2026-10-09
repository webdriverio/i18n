---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
description: "Obtén la posición en pantalla de un texto con ocrGetElementPositionByText, utilizando OCR y coincidencia difusa para encontrarlo."
---

Obtiene la posición de un texto en la pantalla. El comando buscará el texto proporcionado e intentará encontrar una coincidencia basada en la Lógica Difusa de [Fuse.js](https://fusejs.io/). Esto significa que, si proporcionas un selector con un error tipográfico o si el texto encontrado no coincide al 100%, igualmente intentará devolverte un elemento. Consulta los [logs](#logs) a continuación.

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

### Logs

```log
# Aún encuentra una coincidencia aunque buscamos "Start3d" y el texto encontrado fue "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Opciones

### `text`

<Option type="string" required="yes">

El texto que deseas buscar para hacer clic en él.

</Option>
#### Ejemplo

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

<Option type="number" default="0.25" required="no">

Cuanto mayor sea el contraste, más oscura será la imagen y viceversa. Esto puede ayudar a encontrar texto en una imagen. Acepta valores entre `-1` y `1`.

</Option>
#### Ejemplo

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Esta es el área de búsqueda en la pantalla donde el OCR debe buscar texto. Puede ser un elemento o un rectángulo que contenga `x`, `y`, `width` y `height`

</Option>
#### Ejemplo

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OR
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

<Option type="string" default="eng" required="No">

El idioma que Tesseract reconocerá. Puedes encontrar más información [aquí](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) y los idiomas compatibles [aquí](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Ejemplo

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // Usar neerlandés como idioma
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Puedes modificar la lógica difusa para encontrar texto con las siguientes opciones. Esto podría ayudar a encontrar una mejor coincidencia

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Determina qué tan cerca debe estar la coincidencia de la ubicación difusa (especificada por location). Una coincidencia exacta de letras que esté a distance caracteres de la ubicación difusa se puntuaría como una falta total de coincidencia. Una distancia de 0 requiere que la coincidencia esté en la ubicación exacta especificada. Una distancia de 1000 requeriría que una coincidencia perfecta esté dentro de los 800 caracteres de la ubicación para ser encontrada usando un umbral de 0.8.

</Option>
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

<Option type="number" default="0" required="no">

Determina aproximadamente en qué parte del texto se espera encontrar el patrón.

</Option>
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

<Option type="number" default="0.6" required="no">

En qué punto se rinde el algoritmo de coincidencia. Un umbral de 0 requiere una coincidencia perfecta (tanto de letras como de ubicación), un umbral de 1.0 coincidiría con cualquier cosa.

</Option>
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

<Option type="boolean" default="false" required="no">

Indica si la búsqueda debe distinguir entre mayúsculas y minúsculas.

</Option>
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

<Option type="number" default="2" required="no">

Solo se devolverán las coincidencias cuya longitud supere este valor. (Por ejemplo, si deseas ignorar las coincidencias de un solo carácter en el resultado, establécelo en 2)

</Option>
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

<Option type="number" default="false" required="no">

Cuando es `true`, la función de coincidencia continuará hasta el final de un patrón de búsqueda incluso si ya se ha localizado una coincidencia perfecta en la cadena.

</Option>
##### Ejemplo

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```