---
id: ocr-click-on-text
title: ocrClickOnText
description: "Klicken Sie mit ocrClickOnText auf ein Element anhand seines sichtbaren Textes. Der Befehl findet den Text auf dem Bildschirm mittels OCR und Fuzzy-Matching."
---

Klickt auf ein Element basierend auf den angegebenen Texten. Der Befehl sucht nach dem angegebenen Text und versucht, eine Übereinstimmung basierend auf der Fuzzy-Logik von [Fuse.js](https://fusejs.io/) zu finden. Das bedeutet: Selbst wenn Sie einen Selektor mit einem Tippfehler angeben oder der gefundene Text nicht zu 100 % übereinstimmt, wird trotzdem versucht, Ihnen ein Element zurückzugeben. Siehe die [Logs](#logs) unten.

## Verwendung

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Ausgabe

### Logs

```log
# Es wird trotzdem eine Übereinstimmung gefunden, obwohl wir nach "Start3d" gesucht haben und der gefundene Text "Started" war
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Bild

Sie finden in Ihrem (standardmäßigen)[`imagesFolder`](./getting-started#imagesfolder) ein Bild mit einer Zielmarkierung, die Ihnen zeigt, wo das Modul geklickt hat.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Optionen

### `text`

<Option type="string" required="yes">

Der Text, nach dem gesucht werden soll, um darauf zu klicken.

</Option>
#### Beispiel

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

Dies ist die Dauer des Klicks. Wenn Sie möchten, können Sie durch Erhöhen der Zeit auch einen „langen Klick“ erzeugen.

</Option>
#### Beispiel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // Das sind 3 Sekunden
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Je höher der Kontrast, desto dunkler das Bild und umgekehrt. Dies kann helfen, Text in einem Bild zu finden. Es werden Werte zwischen `-1` und `1` akzeptiert.

</Option>
#### Beispiel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Dies ist der Suchbereich auf dem Bildschirm, in dem die OCR nach Text suchen soll. Dies kann ein Element oder ein Rechteck mit `x`, `y`, `width` und `height` sein.

</Option>
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

<Option type="string" default="eng" required="No">

Die Sprache, die Tesseract erkennen soll. Weitere Informationen finden Sie [hier](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) und die unterstützten Sprachen finden Sie [hier](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
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

<Option type="object" required="no">

Sie können relativ zum gefundenen Element auf den Bildschirm klicken. Dies kann basierend auf relativen Pixeln `above` (oberhalb), `right` (rechts), `below` (unterhalb) oder `left` (links) vom gefundenen Element erfolgen.

:::note

Die folgenden Kombinationen sind erlaubt

-   einzelne Eigenschaften
-   `above` + `left` oder `above` + `right`
-   `below` + `left` oder `below` + `right`

Die folgenden Kombinationen sind **NICHT** erlaubt

-   `above` plus `below`
-   `left` plus `right`

:::

</Option>
#### `relativePosition.above`

<Option type="number" required="no">

Klickt x Pixel `above` (oberhalb) des gefundenen Elements.

</Option>
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

<Option type="number" required="no">

Klickt x Pixel `right` (rechts) vom gefundenen Element.

</Option>
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

<Option type="number" required="no">

Klickt x Pixel `below` (unterhalb) des gefundenen Elements.

</Option>
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

<Option type="number" required="no">

Klickt x Pixel `left` (links) vom gefundenen Element.

</Option>
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

Mit den folgenden Optionen können Sie die Fuzzy-Logik zum Finden von Text anpassen. Dies kann helfen, eine bessere Übereinstimmung zu finden.

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Bestimmt, wie nah die Übereinstimmung an der Fuzzy-Position (angegeben durch location) liegen muss. Eine exakte Buchstabenübereinstimmung, die distance Zeichen von der Fuzzy-Position entfernt ist, würde als vollständige Nichtübereinstimmung bewertet. Eine distance von 0 erfordert, dass die Übereinstimmung genau an der angegebenen Position liegt. Eine distance von 1000 würde erfordern, dass eine perfekte Übereinstimmung innerhalb von 800 Zeichen von der Position liegt, um bei einem threshold von 0.8 gefunden zu werden.

</Option>
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

<Option type="number" default="0" required="no">

Bestimmt ungefähr, an welcher Stelle im Text das Muster erwartet wird.

</Option>
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

<Option type="number" default="0.6" required="no">

Ab welchem Punkt der Matching-Algorithmus aufgibt. Ein threshold von 0 erfordert eine perfekte Übereinstimmung (sowohl der Buchstaben als auch der Position), ein threshold von 1.0 würde auf alles passen.

</Option>
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

<Option type="boolean" default="false" required="no">

Ob bei der Suche zwischen Groß- und Kleinschreibung unterschieden werden soll.

</Option>
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

<Option type="number" default="2" required="no">

Es werden nur Übereinstimmungen zurückgegeben, deren Länge diesen Wert überschreitet. (Wenn Sie beispielsweise Übereinstimmungen mit nur einem Zeichen im Ergebnis ignorieren möchten, setzen Sie den Wert auf 2)

</Option>
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

<Option type="number" default="false" required="no">

Wenn `true`, läuft die Matching-Funktion bis zum Ende eines Suchmusters weiter, selbst wenn bereits eine perfekte Übereinstimmung im String gefunden wurde.

</Option>
##### Beispiel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```