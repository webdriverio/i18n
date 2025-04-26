---
id: ocr-set-value
title: ocrSetValue
---

Sende eine Folge von Tastendrücken an ein Element. Es wird:

-   das Element automatisch erkennen
-   den Fokus auf das Feld setzen, indem es darauf klickt
-   den Wert in das Feld setzen

Der Befehl sucht nach dem angegebenen Text und versucht, eine Übereinstimmung basierend auf Fuzzy Logic von [Fuse.js](https://fusejs.io/) zu finden. Das bedeutet, dass selbst wenn du einen Selektor mit einem Tippfehler angibst oder der gefundene Text keine 100%ige Übereinstimmung ist, es trotzdem versuchen wird, dir ein Element zurückzugeben. Siehe die [Logs](#logs) unten.

## Usage

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## Output

### Logs

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## Options

### `text`

-   **Type:** `string`
-   **Mandatory:** yes

Der Text, nach dem du suchen möchtest, um darauf zu klicken.

#### Example

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **Type:** `string`
-   **Mandatory:** yes

Wert, der hinzugefügt werden soll.

#### Example

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **Type:** `boolean`
-   **Mandatory:** no
-   **Default:** `false`

Ob der Wert auch in das Eingabefeld übermittelt werden soll. Das bedeutet, dass am Ende der Zeichenfolge ein "ENTER" gesendet wird.

#### Example

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** `500` milliseconds

Dies ist die Dauer des Klicks. Wenn du möchtest, kannst du auch einen "langen Klick" erstellen, indem du die Zeit erhöhst.

#### Example

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // This is 3 seconds
});
```

### `contrast`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** `0.25`

Je höher der Kontrast, desto dunkler das Bild und umgekehrt. Dies kann helfen, Text in einem Bild zu finden. Es akzeptiert Werte zwischen `-1` und `1`.

#### Example

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **Type:** `number`
-   **Mandatory:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Dies ist der Suchbereich auf dem Bildschirm, in dem die OCR nach Text suchen soll. Dies kann ein Element oder ein Rechteck sein, das `x`, `y`, `width` und `height` enthält.

#### Example

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// OR
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

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `eng`

Die Sprache, die Tesseract erkennen wird. Weitere Informationen findest du [hier](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) und die unterstützten Sprachen findest du [hier](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Example

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Type:** `object`
-   **Mandatory:** no

Du kannst auf dem Bildschirm relativ zum übereinstimmenden Element klicken. Dies kann basierend auf relativen Pixeln `above`, `right`, `below` oder `left` vom übereinstimmenden Element erfolgen.

:::note

Die folgenden Kombinationen sind erlaubt

-   einzelne Eigenschaften
-   `above` + `left` oder `above` + `right`
-   `below` + `left` oder `below` + `right`

Die folgenden Kombinationen sind **NICHT** erlaubt

-   `above` plus `below`
-   `left` plus `right`

:::

#### `relativePosition.above`

-   **Type:** `number`
-   **Mandatory:** no

Klicke x Pixel `above` (über) dem übereinstimmenden Element.

##### Example

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

-   **Type:** `number`
-   **Mandatory:** no

Klicke x Pixel `right` (rechts) vom übereinstimmenden Element.

##### Example

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

-   **Type:** `number`
-   **Mandatory:** no

Klicke x Pixel `below` (unter) dem übereinstimmenden Element.

##### Example

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

-   **Type:** `number`
-   **Mandatory:** no

Klicke x Pixel `left` (links) vom übereinstimmenden Element.

##### Example

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

Du kannst die Fuzzy-Logik zum Finden von Text mit den folgenden Optionen ändern. Dies kann helfen, eine bessere Übereinstimmung zu finden.

#### `fuzzyFindOptions.distance`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 100

Bestimmt, wie nahe die Übereinstimmung an der Fuzzy-Position (angegeben durch location) sein muss. Eine exakte Buchstabenübereinstimmung, die distance Zeichen von der Fuzzy-Position entfernt ist, würde als vollständige Nichtübereinstimmung gewertet werden. Eine Distanz von 0 erfordert, dass die Übereinstimmung an der exakt angegebenen Position liegt. Eine Distanz von 1000 würde erfordern, dass eine perfekte Übereinstimmung innerhalb von 800 Zeichen der Position liegt, um mit einem Schwellenwert von 0,8 gefunden zu werden.

##### Example

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

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 0

Bestimmt ungefähr, wo im Text das Muster voraussichtlich gefunden wird.

##### Example

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

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 0.6

An welchem Punkt gibt der Matching-Algorithmus auf. Ein Schwellenwert von 0 erfordert eine perfekte Übereinstimmung (sowohl von Buchstaben als auch von Position), ein Schwellenwert von 1.0 würde alles übereinstimmen.

##### Example

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

-   **Type:** `boolean`
-   **Mandatory:** no
-   **Default:** false

Ob die Suche Groß- und Kleinschreibung berücksichtigen soll.

##### Example

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

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 2

Nur die Übereinstimmungen, deren Länge diesen Wert überschreitet, werden zurückgegeben. (Wenn du beispielsweise einzelne Zeichenübereinstimmungen im Ergebnis ignorieren möchtest, setze es auf 2)

##### Example

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

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** false

Wenn `true`, wird die Matching-Funktion bis zum Ende eines Suchmusters fortgesetzt, auch wenn bereits eine perfekte Übereinstimmung in der Zeichenfolge gefunden wurde.

##### Example

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```