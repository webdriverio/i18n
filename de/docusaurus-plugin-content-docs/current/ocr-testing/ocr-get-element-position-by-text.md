---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

Ermittelt die Position eines Textes auf dem Bildschirm. Der Befehl sucht nach dem angegebenen Text und versucht, eine Übereinstimmung basierend auf Fuzzy Logic von [Fuse.js](https://fusejs.io/) zu finden. Das bedeutet, dass selbst wenn Sie einen Selektor mit einem Tippfehler angeben oder der gefundene Text keine 100%ige Übereinstimmung ist, wird trotzdem versucht, ein Element zurückzugeben. Siehe die [Logs](#logs) unten.

## Verwendung

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## Ausgabe

### Ergebnis

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
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Optionen

### `text`

-   **Typ:** `string`
-   **Pflichtfeld:** ja

Der Text, nach dem Sie suchen möchten.

#### Beispiel

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** `0.25`

Je höher der Kontrast, desto dunkler das Bild und umgekehrt. Dies kann helfen, Text in einem Bild zu finden. Es akzeptiert Werte zwischen `-1` und `1`.

#### Beispiel

```js
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// ODER
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// ODER
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

-   **Typ:** `string`
-   **Pflichtfeld:** Nein
-   **Standard:** `eng`

Die Sprache, die Tesseract erkennen wird. Weitere Informationen finden Sie [hier](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) und die unterstützten Sprachen finden Sie [hier](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Beispiel

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // Niederländisch als Sprache verwenden
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Sie können die Fuzzy-Logik zum Finden von Text mit den folgenden Optionen ändern. Dies kann helfen, eine bessere Übereinstimmung zu finden.

#### `fuzzyFindOptions.distance`

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** 100

Bestimmt, wie nahe die Übereinstimmung an der Fuzzy-Position (angegeben durch location) sein muss. Eine exakte Buchstabenübereinstimmung, die distance Zeichen von der Fuzzy-Position entfernt ist, würde als vollständige Nichtübereinstimmung gewertet werden. Eine Distanz von 0 erfordert, dass die Übereinstimmung an der exakt angegebenen Position liegt. Eine Distanz von 1000 würde erfordern, dass eine perfekte Übereinstimmung innerhalb von 800 Zeichen der Position liegt, um mit einem Schwellenwert von 0,8 gefunden zu werden.

##### Beispiel

```js
await browser.ocrGetElementPositionByText({
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

Bestimmt ungefähr, wo im Text das Muster erwartet wird.

##### Beispiel

```js
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
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

Nur Übereinstimmungen, deren Länge diesen Wert überschreitet, werden zurückgegeben. (Wenn Sie beispielsweise einzelne Zeichenübereinstimmungen im Ergebnis ignorieren möchten, setzen Sie es auf 2)

##### Beispiel

```js
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```