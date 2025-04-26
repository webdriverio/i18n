---
id: ocr-click-on-text
title: ocrClickOnText
---

Haz clic en un elemento basado en los textos proporcionados. El comando buscará el texto proporcionado e intentará encontrar una coincidencia basada en Lógica Difusa de [Fuse.js](https://fusejs.io/). Esto significa que si proporcionas un selector con un error tipográfico, o el texto encontrado no es una coincidencia 100%, aún intentará devolverte un elemento. Mira los [registros](#logs) a continuación.

## Uso

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Salida

### Logs

```log
# Aún encontrando una coincidencia aunque buscamos "Start3d" y el texto encontrado fue "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Imagen

Encontrarás una imagen en tu (predeterminada)[`imagesFolder`](./getting-started#imagesfolder) con un objetivo para mostrarte dónde ha hecho clic el módulo.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Opciones

### `text`

-   **Tipo:** `string`
-   **Obligatorio:** sí

El texto que quieres buscar para hacer clic.

#### Ejemplo

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Predeterminado:** `500` milisegundos

Esta es la duración del clic. Si quieres, también puedes crear un "clic largo" aumentando el tiempo.

#### Ejemplo

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // Esto son 3 segundos
});
```

### `contrast`

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Predeterminado:** `0.25`

Cuanto mayor sea el contraste, más oscura será la imagen y viceversa. Esto puede ayudar a encontrar texto en una imagen. Acepta valores entre `-1` y `1`.

#### Ejemplo

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Tipo:** `number`
-   **Obligatorio:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Esta es el área de búsqueda en la pantalla donde el OCR necesita buscar texto. Puede ser un elemento o un rectángulo que contenga `x`, `y`, `width` y `height`

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

-   **Tipo:** `string`
-   **Obligatorio:** No
-   **Predeterminado:** `eng`

El idioma que Tesseract reconocerá. Más información se puede encontrar [aquí](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) y los idiomas soportados se pueden encontrar [aquí](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Ejemplo

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Usar holandés como idioma
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Tipo:** `object`
-   **Obligatorio:** no

Puedes hacer clic en la pantalla en relación con el elemento coincidente. Esto se puede hacer basándose en píxeles relativos `above`, `right`, `below` o `left` desde el elemento coincidente.

:::note

Las siguientes combinaciones están permitidas

-   propiedades individuales
-   `above` + `left` o `above` + `right`
-   `below` + `left` o `below` + `right`

Las siguientes combinaciones **NO** están permitidas

-   `above` más `below`
-   `left` más `right`

:::

#### `relativePosition.above`

-   **Tipo:** `number`
-   **Obligatorio:** no

Haz clic x píxeles `above` (encima) del elemento coincidente.

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

-   **Tipo:** `number`
-   **Obligatorio:** no

Haz clic x píxeles `right` (a la derecha) del elemento coincidente.

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

-   **Tipo:** `number`
-   **Obligatorio:** no

Haz clic x píxeles `below` (debajo) del elemento coincidente.

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

-   **Tipo:** `number`
-   **Obligatorio:** no

Haz clic x píxeles `left` (a la izquierda) del elemento coincidente.

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

Puedes alterar la lógica difusa para encontrar texto con las siguientes opciones. Esto puede ayudar a encontrar una mejor coincidencia.

#### `fuzzyFindOptions.distance`

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Predeterminado:** 100

Determina qué tan cerca debe estar la coincidencia de la ubicación difusa (especificada por location). Una coincidencia exacta de letra que está a una distancia de caracteres de la ubicación difusa se puntuaría como una falta de coincidencia completa. Una distancia de 0 requiere que la coincidencia esté en la ubicación exacta especificada. Una distancia de 1000 requeriría una coincidencia perfecta para estar dentro de 800 caracteres de la ubicación para ser encontrada usando un umbral de 0.8.

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

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Predeterminado:** 0

Determina aproximadamente dónde en el texto se espera encontrar el patrón.

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

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Predeterminado:** 0.6

En qué punto el algoritmo de coincidencia se rinde. Un umbral de 0 requiere una coincidencia perfecta (tanto de letras como de ubicación), un umbral de 1.0 coincidiría con cualquier cosa.

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

-   **Tipo:** `boolean`
-   **Obligatorio:** no
-   **Predeterminado:** false

Si la búsqueda debe distinguir entre mayúsculas y minúsculas.

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

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Predeterminado:** 2

Solo se devolverán las coincidencias cuya longitud exceda este valor. (Por ejemplo, si quieres ignorar coincidencias de un solo carácter en el resultado, establécelo en 2)

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

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Predeterminado:** false

Cuando es `true`, la función de coincidencia continuará hasta el final de un patrón de búsqueda incluso si ya se ha localizado una coincidencia perfecta en la cadena.

##### Ejemplo

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```