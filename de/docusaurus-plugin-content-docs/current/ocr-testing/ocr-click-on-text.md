---
id: ocr-click-on-text
title: ocrClickOnText
---

Klickt auf ein Element basierend auf den bereitgestellten Texten. Der Befehl sucht nach dem bereitgestellten Text und versucht, eine Übereinstimmung basierend auf Fuzzy Logic von [Fuse.js](https://fusejs.io/) zu finden. Das bedeutet, dass selbst wenn Sie einen Selektor mit einem Tippfehler angeben oder der gefundene Text keine 100%ige Übereinstimmung ist, wird trotzdem versucht, ein Element zurückzugeben. Siehe die [Logs](#logs) unten.

## Verwendung

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Ausgabe

### Logs

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Bild

Sie finden ein Bild in Ihrem (Standard)[`imagesFolder`](./getting-started#imagesfolder) mit einem Ziel, das Ihnen zeigt, wo das Modul geklickt hat.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Optionen

### `text`

-   **Typ:** `string`
-   **Pflichtfeld:** ja

Der Text, nach dem Sie suchen möchten, um darauf zu klicken.

#### Beispiel

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** `500` Millisekunden

Dies ist die Dauer des Klicks. Wenn Sie möchten, können Sie auch einen "langen Klick" erstellen, indem Sie die Zeit erhöhen.

#### Beispiel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // Das sind 3 Sekunden
});
```

### `contrast`

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** `0.25`

Je höher der Kontrast, desto dunkler das Bild und umgekehrt. Dies kann helfen, Text in einem Bild zu finden. Es akzeptiert Werte zwischen `-1` und `1`.

#### Beispiel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Typ:** `number`
-   **Pflichtfeld:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Dies ist der Suchbereich auf dem Bildschirm, in dem die OCR nach Text suchen soll. Dies kann ein Element oder ein Rechteck sein, das `x`, `y`, `width` und `height` enthält.

#### Beispiel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// ODER
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// ODER
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

-   **Typ:** `string`
-   **Pflichtfeld:** Nein
-   **Standard:** `eng`

Die Sprache, die Tesseract erkennen wird. Weitere Informationen finden Sie [hier](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) und die unterstützten Sprachen finden Sie [hier](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Beispiel

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Niederländisch als Sprache verwenden
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Typ:** `object`
-   **Pflichtfeld:** nein

Sie können relativ zum übereinstimmenden Element auf den Bildschirm klicken. Dies kann basierend auf relativen Pixeln `above`, `right`, `below` oder `left` vom übereinstimmenden Element erfolgen.

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

-   **Typ:** `number`
-   **Pflichtfeld:** nein

Klickt x Pixel `above` (über) dem übereinstimmenden Element.

##### Beispiel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **Typ:** `number`
-   **Pflichtfeld:** nein

Klickt x Pixel `right` (rechts) vom übereinstimmenden Element.

##### Beispiel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **Typ:** `number`
-   **Pflichtfeld:** nein

Klickt x Pixel `below` (unter) dem übereinstimmenden Element.

##### Beispiel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **Typ:** `number`
-   **Pflichtfeld:** nein

Klickt x Pixel `left` (links) vom übereinstimmenden Element.

##### Beispiel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Sie können die Fuzzy-Logik zum Finden von Text mit den folgenden Optionen ändern. Dies kann helfen, eine bessere Übereinstimmung zu finden.

#### `fuzzyFindOptions.distance`

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** 100

Bestimmt, wie nahe die Übereinstimmung an der Fuzzy-Position (angegeben durch location) sein muss. Eine exakte Buchstabenübereinstimmung, die distance Zeichen von der Fuzzy-Position entfernt ist, würde als vollständige Nichtübereinstimmung gewertet werden. Eine Distanz von 0 erfordert, dass die Übereinstimmung an der exakt angegebenen Position liegt. Eine Distanz von 1000 würde erfordern, dass eine perfekte Übereinstimmung innerhalb von 800 Zeichen von der Position entfernt ist, um mit einem Schwellenwert von 0,8 gefunden zu werden.

##### Beispiel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** 0

Bestimmt ungefähr, wo im Text das Muster voraussichtlich gefunden wird.

##### Beispiel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** 0.6

An welchem Punkt gibt der Matching-Algorithmus auf. Ein Schwellenwert von 0 erfordert eine perfekte Übereinstimmung (sowohl von Buchstaben als auch von Position), ein Schwellenwert von 1.0 würde alles übereinstimmen.

##### Beispiel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Typ:** `boolean`
-   **Pflichtfeld:** nein
-   **Standard:** false

Ob die Suche Groß- und Kleinschreibung berücksichtigen soll.

##### Beispiel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** 2

Nur die Übereinstimmungen, deren Länge diesen Wert überschreitet, werden zurückgegeben. (Wenn Sie beispielsweise einzelne Zeichenübereinstimmungen im Ergebnis ignorieren möchten, setzen Sie es auf 2)

##### Beispiel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** false

Wenn `true`, wird die Matching-Funktion bis zum Ende eines Suchmusters fortgesetzt, auch wenn bereits eine perfekte Übereinstimmung in der Zeichenfolge gefunden wurde.

##### Beispiel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```