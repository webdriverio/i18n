---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
description: "Espera hasta que un texto específico se muestre en la pantalla con ocrWaitForTextDisplayed del servicio OCR."
---

Espera a que un texto específico se muestre en la pantalla.

## Uso

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## Salida

### Logs

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed usa ocrGetElementPositionByText internamente, por eso ves el comando ocrGetElementPositionByText en los logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Opciones

### `text`

<Option type="string" required="yes">

El texto que quieres buscar para hacer clic en él.

</Option>
#### Ejemplo

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

<Option type="number" default="18000 (18 seconds)" required="no">

Tiempo en milisegundos. Ten en cuenta que el proceso de OCR puede tardar algo de tiempo, así que no lo configures demasiado bajo.

</Option>
#### Ejemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // esperar 25 segundos
});
```

### `timeoutMsg`

<Option type="string" default={`Could not find the text "{selector}" within the requested time.`} required="no">

Sobrescribe el mensaje de error predeterminado.

</Option>
#### Ejemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Cuanto mayor sea el contraste, más oscura será la imagen y viceversa. Esto puede ayudar a encontrar texto en una imagen. Acepta valores entre `-1` y `1`.

</Option>
#### Ejemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Esta es el área de búsqueda en la pantalla donde el OCR debe buscar el texto. Puede ser un elemento o un rectángulo que contenga `x`, `y`, `width` y `height`

</Option>
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

<Option type="string" default="eng" required="No">

El idioma que Tesseract reconocerá. Puedes encontrar más información [aquí](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) y los idiomas compatibles [aquí](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Ejemplo

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // Usar neerlandés como idioma
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Puedes modificar la lógica difusa para encontrar texto con las siguientes opciones. Esto podría ayudar a encontrar una mejor coincidencia

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Determina qué tan cerca debe estar la coincidencia de la ubicación difusa (especificada por location). Una coincidencia exacta de letras que esté a distance caracteres de la ubicación difusa se puntuaría como una falta total de coincidencia. Una distancia de 0 requiere que la coincidencia esté en la ubicación exacta especificada. Una distancia de 1000 requeriría que una coincidencia perfecta esté dentro de 800 caracteres de la ubicación para ser encontrada usando un umbral de 0.8.

</Option>
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

<Option type="number" default="0" required="no">

Determina aproximadamente en qué parte del texto se espera encontrar el patrón.

</Option>
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

<Option type="number" default="0.6" required="no">

En qué punto se rinde el algoritmo de coincidencia. Un umbral de 0 requiere una coincidencia perfecta (tanto de letras como de ubicación), un umbral de 1.0 coincidiría con cualquier cosa.

</Option>
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

<Option type="boolean" default="false" required="no">

Si la búsqueda debe distinguir entre mayúsculas y minúsculas.

</Option>
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

<Option type="number" default="2" required="no">

Solo se devolverán las coincidencias cuya longitud supere este valor. (Por ejemplo, si quieres ignorar las coincidencias de un solo carácter en el resultado, configúralo en 2)

</Option>
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

<Option type="number" default="false" required="no">

Cuando es `true`, la función de coincidencia continuará hasta el final de un patrón de búsqueda incluso si ya se ha encontrado una coincidencia perfecta en la cadena.

</Option>
##### Ejemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```