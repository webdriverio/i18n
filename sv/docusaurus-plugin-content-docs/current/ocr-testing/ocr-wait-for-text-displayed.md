---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

Vänta på att en specifik text visas på skärmen.

## Användning

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## Utdata

### Loggar

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Alternativ

### `text`

-   **Typ:** `string`
-   **Obligatorisk:** ja

Texten du vill söka efter för att klicka på.

#### Exempel

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** 18000 (18 sekunder)

Tid i millisekunder. Var medveten om att OCR-processen kan ta lite tid, så ställ inte in den för lågt.

#### Exempel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // vänta i 25 sekunder
});
```

### `timeoutMsg`

-   **Typ:** `string`
-   **Obligatorisk:** nej
-   **Standard:** `Could not find the text "{selector}" within the requested time.`

Den åsidosätter standardfelmeddelandet.

#### Exempel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** `0.25`

Ju högre kontrast, desto mörkare bild och vice versa. Detta kan hjälpa till att hitta text i en bild. Den accepterar värden mellan `-1` och `1`.

#### Exempel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **Typ:** `number`
-   **Obligatorisk:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Detta är sökområdet på skärmen där OCR:en behöver leta efter text. Detta kan vara ett element eller en rektangel som innehåller `x`, `y`, `width` och `height`.

#### Exempel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// ELLER
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// ELLER
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
-   **Obligatorisk:** Nej
-   **Standard:** `eng`

Det språk som Tesseract kommer att känna igen. Mer information finns [här](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) och de språk som stöds finns [här](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Exempel

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // Använd nederländska som språk
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Du kan ändra fuzzy-logiken för att hitta text med följande alternativ. Detta kan hjälpa till att hitta en bättre match.

#### `fuzzyFindOptions.distance`

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** 100

Avgör hur nära matchen måste vara till den ungefärliga platsen (angivet av location). En exakt bokstavsmatch som är på distance-teckens avstånd från den ungefärliga platsen skulle betraktas som en fullständig icke-matchning. Ett avstånd på 0 kräver att matchen ska vara på den exakta platsen som anges. Ett avstånd på 1000 skulle kräva en perfekt matchning för att vara inom 800 tecken från platsen för att hittas med ett tröskelvärde på 0.8.

##### Exempel

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
-   **Obligatorisk:** nej
-   **Standard:** 0

Bestämmer ungefär var i texten som mönstret förväntas hittas.

##### Exempel

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
-   **Obligatorisk:** nej
-   **Standard:** 0.6

Vid vilken punkt ger matchningsalgoritmen upp. En tröskel på 0 kräver en perfekt matchning (av både bokstäver och plats), en tröskel på 1.0 skulle matcha vad som helst.

##### Exempel

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
-   **Obligatorisk:** nej
-   **Standard:** false

Om sökningen ska vara skiftlägeskänslig.

##### Exempel

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
-   **Obligatorisk:** nej
-   **Standard:** 2

Endast matchningar vars längd överstiger detta värde kommer att returneras. (Till exempel, om du vill ignorera matchningar med enstaka tecken i resultatet, ställ in det till 2)

##### Exempel

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
-   **Obligatorisk:** nej
-   **Standard:** false

När `true` kommer matchningsfunktionen att fortsätta till slutet av ett sökmönster även om en perfekt matchning redan har hittats i strängen.

##### Exempel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```