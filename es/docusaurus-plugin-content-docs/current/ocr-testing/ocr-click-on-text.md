---
id: ocr-click-on-text
title: ocrClickOnText
description: "Haz clic en un elemento por su texto visible con ocrClickOnText, que encuentra el texto en pantalla mediante OCR y coincidencia difusa."
---

Hace clic en un elemento basándose en los textos proporcionados. El comando buscará el texto proporcionado e intentará encontrar una coincidencia basada en la lógica difusa (Fuzzy Logic) de [Fuse.js](https://fusejs.io/). Esto significa que, si proporcionas un selector con un error tipográfico o si el texto encontrado no coincide al 100 %, igualmente intentará devolverte un elemento. Consulta los [logs](#logs) a continuación.

## Uso

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Salida

### Logs

```log
# Todavía encuentra una coincidencia aunque buscamos "Start3d" y el texto encontrado fue "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Imagen

Encontrarás una imagen en tu [`imagesFolder`](./getting-started#imagesfolder) (predeterminada) con un objetivo que te muestra dónde ha hecho clic el módulo.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Opciones

### `text`

<Option type="string" required="yes">

El texto que quieres buscar para hacer clic en él.

</Option>
#### Ejemplo

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

Es la duración del clic. Si lo deseas, también puedes crear un "clic largo" aumentando el tiempo.

</Option>
#### Ejemplo

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // Esto son 3 segundos
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Cuanto mayor sea el contraste, más oscura será la imagen y viceversa. Esto puede ayudar a encontrar texto en una imagen. Acepta valores entre `-1` y `1`.

</Option>
#### Ejemplo

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Es el área de búsqueda en la pantalla donde el OCR debe buscar el texto. Puede ser un elemento o un rectángulo que contenga `x`, `y`, `width` y `height`

</Option>
#### Ejemplo

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// O
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// O
await browser.ocrClickOnText({
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

El idioma que reconocerá Tesseract. Puedes encontrar más información [aquí](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) y los idiomas compatibles [aquí](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Ejemplo

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Usar neerlandés como idioma
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

Puedes hacer clic en la pantalla de forma relativa al elemento coincidente. Esto se puede hacer en base a píxeles relativos `above`, `right`, `below` o `left` del elemento coincidente

:::note

Se permiten las siguientes combinaciones

-   propiedades individuales
-   `above` + `left` o `above` + `right`
-   `below` + `left` o `below` + `right`

**NO** se permiten las siguientes combinaciones

-   `above` más `below`
-   `left` más `right`

:::

</Option>
#### `relativePosition.above`

<Option type="number" required="no">

Hace clic x píxeles por encima (`above`) del elemento coincidente.

</Option>
##### Ejemplo

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

<Option type="number" required="no">

Hace clic x píxeles a la derecha (`right`) del elemento coincidente.

</Option>
##### Ejemplo

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

<Option type="number" required="no">

Hace clic x píxeles por debajo (`below`) del elemento coincidente.

</Option>
##### Ejemplo

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

<Option type="number" required="no">

Hace clic x píxeles a la izquierda (`left`) del elemento coincidente.

</Option>
##### Ejemplo

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Puedes modificar la lógica difusa para encontrar texto con las siguientes opciones. Esto puede ayudar a encontrar una mejor coincidencia

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Determina qué tan cerca debe estar la coincidencia de la ubicación difusa (especificada por location). Una coincidencia exacta de letras que esté a distance caracteres de la ubicación difusa se puntuaría como una falta de coincidencia total. Una distancia de 0 requiere que la coincidencia esté en la ubicación exacta especificada. Una distancia de 1000 requeriría que una coincidencia perfecta estuviera dentro de los 800 caracteres de la ubicación para ser encontrada usando un umbral de 0.8.

</Option>
##### Ejemplo

```js
await browser.ocrClickOnText({
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
await browser.ocrClickOnText({
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
await browser.ocrClickOnText({
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
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

<Option type="number" default="2" required="no">

Solo se devolverán las coincidencias cuya longitud supere este valor. (Por ejemplo, si quieres ignorar las coincidencias de un solo carácter en el resultado, establécelo en 2)

</Option>
##### Ejemplo

```js
await browser.ocrClickOnText({
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
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```