---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

Warten, bis ein bestimmter Text auf dem Bildschirm angezeigt wird.

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
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Optionen

### `text`

-   **Typ:** `string`
-   **Pflichtfeld:** ja

Der Text, nach dem Sie suchen möchten, um darauf zu klicken.

#### Beispiel

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** 18000 (18 Sekunden)

Zeit in Millisekunden. Beachten Sie, dass der OCR-Prozess einige Zeit in Anspruch nehmen kann, stellen Sie ihn daher nicht zu niedrig ein.

#### Beispiel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // 25 Sekunden warten
});
```

### `timeoutMsg`

-   **Typ:** `string`
-   **Pflichtfeld:** nein
-   **Standard:** `Could not find the text "{selector}" within the requested time.`

Überschreibt die Standard-Fehlermeldung.

#### Beispiel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** `0.25`

Je höher der Kontrast, desto dunkler das Bild und umgekehrt. Dies kann helfen, Text in einem Bild zu finden. Es akzeptiert Werte zwischen `-1` und `1`.

#### Beispiel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **Typ:** `number`
-   **Pflichtfeld:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Dies ist der Suchbereich auf dem Bildschirm, in dem die OCR nach Text suchen soll. Dies kann ein Element oder ein Rechteck sein, das `x`, `y`, `width` und `height` enthält.

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

-   **Typ:** `string`
-   **Pflichtfeld:** Nein
-   **Standard:** `eng`

Die Sprache, die Tesseract erkennen wird. Weitere Informationen finden Sie [hier](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) und die unterstützten Sprachen finden Sie [hier](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

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

Sie können die Fuzzy-Logik zum Finden von Text mit den folgenden Optionen ändern. Dies kann helfen, eine bessere Übereinstimmung zu finden.

#### `fuzzyFindOptions.distance`

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** 100

Bestimmt, wie nahe die Übereinstimmung an der Fuzzy-Position (angegeben durch location) sein muss. Eine exakte Buchstabenübereinstimmung, die distance Zeichen von der Fuzzy-Position entfernt ist, würde als vollständige Nichtübereinstimmung gewertet werden. Eine Entfernung von 0 erfordert, dass die Übereinstimmung an der exakt angegebenen Position liegt. Eine Entfernung von 1000 würde erfordern, dass eine perfekte Übereinstimmung innerhalb von 800 Zeichen der Position gefunden wird, wenn ein Schwellenwert von 0,8 verwendet wird.

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

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** 0

Bestimmt ungefähr, wo im Text das Muster voraussichtlich gefunden wird.

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

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** 0.6

An welchem Punkt gibt der Matching-Algorithmus auf. Ein Schwellenwert von 0 erfordert eine perfekte Übereinstimmung (sowohl von Buchstaben als auch von Position), ein Schwellenwert von 1.0 würde alles übereinstimmen.

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

-   **Typ:** `boolean`
-   **Pflichtfeld:** nein
-   **Standard:** false

Ob die Suche Groß- und Kleinschreibung berücksichtigen soll.

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

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** 2

Nur Übereinstimmungen, deren Länge diesen Wert überschreitet, werden zurückgegeben. (Wenn Sie beispielsweise einzelne Zeichenübereinstimmungen im Ergebnis ignorieren möchten, setzen Sie es auf 2)

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

-   **Typ:** `number`
-   **Pflichtfeld:** nein
-   **Standard:** false

Wenn `true`, wird die Matching-Funktion bis zum Ende eines Suchmusters fortgesetzt, auch wenn bereits eine perfekte Übereinstimmung in der Zeichenfolge gefunden wurde.

##### Beispiel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```