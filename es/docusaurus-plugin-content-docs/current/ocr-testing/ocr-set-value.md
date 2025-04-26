---
id: ocr-set-value
title: ocrSetValue
---

Envía una secuencia de pulsaciones de teclas a un elemento. Esto:

-   detectará automáticamente el elemento
-   pondrá el foco en el campo haciendo clic en él
-   establecerá el valor en el campo

El comando buscará el texto proporcionado e intentará encontrar una coincidencia basada en Lógica Difusa de [Fuse.js](https://fusejs.io/). Esto significa que si proporciona un selector con un error tipográfico, o el texto encontrado puede no ser una coincidencia 100%, aún intentará devolverle un elemento. Vea los [registros](#logs) a continuación.

## Uso

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## Salida

### Logs

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## Opciones

### `text`

-   **Tipo:** `string`
-   **Obligatorio:** sí

El texto que desea buscar para hacer clic.

#### Ejemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **Tipo:** `string`
-   **Obligatorio:** sí

Valor a añadir.

#### Ejemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **Tipo:** `boolean`
-   **Obligatorio:** no
-   **Valor predeterminado:** `false`

Si el valor también necesita ser enviado al campo de entrada. Esto significa que se enviará un "ENTER" al final de la cadena.

#### Ejemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Valor predeterminado:** `500` milisegundos

Esta es la duración del clic. Si lo desea, también puede crear un "clic largo" aumentando el tiempo.

#### Ejemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // Esto son 3 segundos
});
```

### `contrast`

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Valor predeterminado:** `0.25`

Cuanto mayor sea el contraste, más oscura será la imagen y viceversa. Esto puede ayudar a encontrar texto en una imagen. Acepta valores entre `-1` y `1`.

#### Ejemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **Tipo:** `number`
-   **Obligatorio:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Esta es el área de búsqueda en la pantalla donde el OCR necesita buscar texto. Puede ser un elemento o un rectángulo que contenga `x`, `y`, `width` y `height`

#### Ejemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// O
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// O
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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

El idioma que Tesseract reconocerá. Más información puede encontrarse [aquí](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) y los idiomas soportados pueden encontrarse [aquí](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Ejemplo

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Usar holandés como idioma
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Tipo:** `object`
-   **Obligatorio:** no

Puede hacer clic en la pantalla en relación con el elemento coincidente. Esto se puede hacer basándose en píxeles relativos `above`, `right`, `below` o `left` desde el elemento coincidente.

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

Hacer clic x píxeles `above` (encima) del elemento coincidente.

##### Ejemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **Tipo:** `number`
-   **Obligatorio:** no

Hacer clic x píxeles `right` (a la derecha) del elemento coincidente.

##### Ejemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **Tipo:** `number`
-   **Obligatorio:** no

Hacer clic x píxeles `below` (debajo) del elemento coincidente.

##### Ejemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **Tipo:** `number`
-   **Obligatorio:** no

Hacer clic x píxeles `left` (a la izquierda) del elemento coincidente.

##### Ejemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Puede alterar la lógica difusa para encontrar texto con las siguientes opciones. Esto puede ayudar a encontrar una mejor coincidencia.

#### `fuzzyFindOptions.distance`

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Valor predeterminado:** 100

Determina qué tan cerca debe estar la coincidencia de la ubicación difusa (especificada por location). Una coincidencia exacta de letra que está a una distancia de caracteres de la ubicación difusa se puntuaría como una falta de coincidencia completa. Una distancia de 0 requiere que la coincidencia esté en la ubicación exacta especificada. Una distancia de 1000 requeriría una coincidencia perfecta para estar dentro de 800 caracteres de la ubicación para ser encontrada usando un umbral de 0.8.

##### Ejemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Tipo:** `number`
-   **Obligatorio:** no
-   **Valor predeterminado:** 2

Solo se devolverán las coincidencias cuya longitud exceda este valor. (Por ejemplo, si desea ignorar las coincidencias de un solo carácter en el resultado, establézcalo en 2)

##### Ejemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```