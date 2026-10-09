---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
description: "Warten Sie mit ocrWaitForTextDisplayed aus dem OCR-Service, bis ein bestimmter Text auf dem Bildschirm angezeigt wird."
---

Wartet, bis ein bestimmter Text auf dem Bildschirm angezeigt wird.

## Verwendung

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## Ausgabe

### Logs

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed verwendet intern ocrGetElementPositionByText, deshalb sehen Sie den Befehl ocrGetElementPositionByText in den Logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Optionen

### `text`

<Option type="string" required="yes">

Der Text, nach dem Sie suchen möchten, um darauf zu klicken.

</Option>
#### Beispiel

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

<Option type="number" default="18000 (18 seconds)" required="no">

Zeit in Millisekunden. Beachten Sie, dass der OCR-Prozess einige Zeit in Anspruch nehmen kann, setzen Sie den Wert also nicht zu niedrig.

</Option>
#### Beispiel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // 25 Sekunden warten
});
```

### `timeoutMsg`

<Option type="string" default={`Could not find the text "{selector}" within the requested time.`} required="no">

Überschreibt die Standard-Fehlermeldung.

</Option>
#### Beispiel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Je höher der Kontrast, desto dunkler das Bild und umgekehrt. Dies kann helfen, Text in einem Bild zu finden. Es werden Werte zwischen `-1` und `1` akzeptiert.

</Option>
#### Beispiel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Dies ist der Suchbereich auf dem Bildschirm, in dem die OCR nach Text suchen soll. Dies kann ein Element oder ein Rechteck sein, das `x`, `y`, `width` und `height` enthält.

</Option>
#### Beispiel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// ODER
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// ODER
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

Die Sprache, die Tesseract erkennen soll. Weitere Informationen finden Sie [hier](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) und die unterstützten Sprachen finden Sie [hier](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Beispiel

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // Niederländisch als Sprache verwenden
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Mit den folgenden Optionen können Sie die Fuzzy-Logik zum Finden von Text anpassen. Dies kann helfen, eine bessere Übereinstimmung zu finden.

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Bestimmt, wie nah die Übereinstimmung an der Fuzzy-Position (angegeben durch `location`) liegen muss. Eine exakte Buchstabenübereinstimmung, die `distance` Zeichen von der Fuzzy-Position entfernt ist, würde als vollständige Nichtübereinstimmung gewertet. Eine Distanz von 0 erfordert, dass die Übereinstimmung genau an der angegebenen Position liegt. Eine Distanz von 1000 würde erfordern, dass eine perfekte Übereinstimmung innerhalb von 800 Zeichen von der Position liegt, um bei einem Schwellenwert von 0.8 gefunden zu werden.

</Option>
##### Beispiel

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

Bestimmt ungefähr, an welcher Stelle im Text das Muster erwartet wird.

</Option>
##### Beispiel

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

Ab welchem Punkt der Matching-Algorithmus aufgibt. Ein Schwellenwert von 0 erfordert eine perfekte Übereinstimmung (sowohl der Buchstaben als auch der Position), ein Schwellenwert von 1.0 würde auf alles passen.

</Option>
##### Beispiel

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

Ob bei der Suche zwischen Groß- und Kleinschreibung unterschieden werden soll.

</Option>
##### Beispiel

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

Es werden nur Übereinstimmungen zurückgegeben, deren Länge diesen Wert überschreitet. (Wenn Sie beispielsweise Übereinstimmungen mit nur einem Zeichen im Ergebnis ignorieren möchten, setzen Sie den Wert auf 2)

</Option>
##### Beispiel

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

Bei `true` setzt die Matching-Funktion die Suche bis zum Ende eines Suchmusters fort, auch wenn bereits eine perfekte Übereinstimmung im String gefunden wurde.

</Option>
##### Beispiel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```