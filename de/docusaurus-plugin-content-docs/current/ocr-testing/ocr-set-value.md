---
id: ocr-set-value
title: ocrSetValue
description: "Mit ocrSetValue in ein Eingabefeld tippen, das anhand seines sichtbaren Textes gefunden wird – das Feld wird per OCR und Fuzzy-Matching ermittelt."
---

Sendet eine Folge von Tastenanschlägen an ein Element. Der Befehl wird:

-   das Element automatisch erkennen
-   den Fokus auf das Feld setzen, indem er darauf klickt
-   den Wert in das Feld eintragen

Der Befehl sucht nach dem angegebenen Text und versucht, eine Übereinstimmung auf Basis der Fuzzy-Logik von [Fuse.js](https://fusejs.io/) zu finden. Das bedeutet, dass er auch dann versucht, Ihnen ein Element zurückzugeben, wenn Sie einen Selektor mit einem Tippfehler angeben oder der gefundene Text keine 100%ige Übereinstimmung ist. Siehe die [Logs](#logs) unten.

## Verwendung

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## Ausgabe

### Logs

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## Optionen

### `text`

<Option type="string" required="yes">

Der Text, nach dem gesucht werden soll, um darauf zu klicken.

</Option>
#### Beispiel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

<Option type="string" required="yes">

Der Wert, der hinzugefügt werden soll.

</Option>
#### Beispiel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

<Option type="boolean" default="false" required="no">

Gibt an, ob der Wert im Eingabefeld auch abgeschickt werden soll. Das bedeutet, dass am Ende der Zeichenfolge ein "ENTER" gesendet wird.

</Option>
#### Beispiel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

Dies ist die Dauer des Klicks. Wenn Sie möchten, können Sie durch Erhöhen der Zeit auch einen "langen Klick" erzeugen.

</Option>
#### Beispiel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // Das sind 3 Sekunden
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Je höher der Kontrast, desto dunkler das Bild und umgekehrt. Dies kann helfen, Text in einem Bild zu finden. Es werden Werte zwischen `-1` und `1` akzeptiert.

</Option>
#### Beispiel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Dies ist der Suchbereich auf dem Bildschirm, in dem die OCR nach Text suchen soll. Dies kann ein Element oder ein Rechteck mit `x`, `y`, `width` und `height` sein.

</Option>
#### Beispiel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// ODER
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// ODER
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

<Option type="string" default="eng" required="No">

Die Sprache, die Tesseract erkennen soll. Weitere Informationen finden Sie [hier](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) und die unterstützten Sprachen finden Sie [hier](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Beispiel

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Niederländisch als Sprache verwenden
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

Sie können relativ zum gefundenen Element auf den Bildschirm klicken. Dies kann auf Basis relativer Pixel `above`, `right`, `below` oder `left` vom gefundenen Element erfolgen.

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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Mit den folgenden Optionen können Sie die Fuzzy-Logik zum Finden von Text anpassen. Dies kann helfen, eine bessere Übereinstimmung zu finden.

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Bestimmt, wie nah die Übereinstimmung an der Fuzzy-Position (angegeben durch location) liegen muss. Eine exakte Buchstabenübereinstimmung, die distance Zeichen von der Fuzzy-Position entfernt ist, würde als vollständige Nichtübereinstimmung gewertet. Eine distance von 0 erfordert, dass die Übereinstimmung genau an der angegebenen Position liegt. Eine distance von 1000 würde erfordern, dass eine perfekte Übereinstimmung innerhalb von 800 Zeichen von der Position liegt, um bei einem threshold von 0.8 gefunden zu werden.

</Option>
##### Beispiel

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

<Option type="number" default="0" required="no">

Bestimmt ungefähr, an welcher Stelle im Text das Muster erwartet wird.

</Option>
##### Beispiel

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

<Option type="number" default="0.6" required="no">

An welchem Punkt der Matching-Algorithmus aufgibt. Ein threshold von 0 erfordert eine perfekte Übereinstimmung (sowohl der Buchstaben als auch der Position), ein threshold von 1.0 würde auf alles passen.

</Option>
##### Beispiel

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

<Option type="boolean" default="false" required="no">

Gibt an, ob bei der Suche zwischen Groß- und Kleinschreibung unterschieden werden soll.

</Option>
##### Beispiel

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

<Option type="number" default="2" required="no">

Es werden nur Übereinstimmungen zurückgegeben, deren Länge diesen Wert überschreitet. (Wenn Sie beispielsweise Übereinstimmungen mit nur einem Zeichen im Ergebnis ignorieren möchten, setzen Sie den Wert auf 2.)

</Option>
##### Beispiel

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

<Option type="number" default="false" required="no">

Wenn `true`, setzt die Matching-Funktion die Suche bis zum Ende eines Suchmusters fort, auch wenn bereits eine perfekte Übereinstimmung in der Zeichenfolge gefunden wurde.

</Option>
##### Beispiel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```