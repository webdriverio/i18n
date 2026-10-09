---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
description: "Vänta tills en specifik text visas på skärmen med ocrWaitForTextDisplayed från OCR-tjänsten."
---

Vänta på att en specifik text ska visas på skärmen.

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
# ocrWaitForTextDisplayed använder ocrGetElementPositionByText under huven, det är därför du ser kommandot ocrGetElementPositionByText i loggarna
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Alternativ

### `text`

<Option type="string" required="yes">

Texten du vill söka efter för att klicka på.

</Option>
#### Exempel

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

<Option type="number" default="18000 (18 seconds)" required="no">

Tid i millisekunder. Var medveten om att OCR-processen kan ta en stund, så sätt inte värdet för lågt.

</Option>
#### Exempel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // vänta i 25 sekunder
});
```

### `timeoutMsg`

<Option type="string" default={`Could not find the text "{selector}" within the requested time.`} required="no">

Det ersätter standardfelmeddelandet.

</Option>
#### Exempel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Ju högre kontrast, desto mörkare bild och vice versa. Detta kan hjälpa till att hitta text i en bild. Det accepterar värden mellan `-1` och `1`.

</Option>
#### Exempel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Detta är sökområdet på skärmen där OCR ska leta efter text. Detta kan vara ett element eller en rektangel som innehåller `x`, `y`, `width` och `height`

</Option>
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

<Option type="string" default="eng" required="No">

Språket som Tesseract ska känna igen. Mer information finns [här](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) och de språk som stöds finns [här](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
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

Du kan ändra den ungefärliga (fuzzy) logiken för att hitta text med följande alternativ. Detta kan hjälpa till att hitta en bättre matchning

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Bestämmer hur nära matchningen måste vara den ungefärliga platsen (angiven av location). En exakt bokstavsmatchning som ligger distance tecken bort från den ungefärliga platsen skulle bedömas som en fullständig felmatchning. Ett avstånd på 0 kräver att matchningen sker på exakt den angivna platsen. Ett avstånd på 1000 skulle kräva att en perfekt matchning ligger inom 800 tecken från platsen för att hittas med ett tröskelvärde på 0.8.

</Option>
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

<Option type="number" default="0" required="no">

Bestämmer ungefär var i texten mönstret förväntas hittas.

</Option>
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

<Option type="number" default="0.6" required="no">

Vid vilken punkt matchningsalgoritmen ger upp. Ett tröskelvärde på 0 kräver en perfekt matchning (av både bokstäver och plats), ett tröskelvärde på 1.0 skulle matcha vad som helst.

</Option>
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

<Option type="boolean" default="false" required="no">

Om sökningen ska vara skiftlägeskänslig.

</Option>
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

<Option type="number" default="2" required="no">

Endast matchningar vars längd överstiger detta värde returneras. (Om du till exempel vill ignorera matchningar med enstaka tecken i resultatet, sätt det till 2)

</Option>
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

<Option type="number" default="false" required="no">

När `true` fortsätter matchningsfunktionen till slutet av ett sökmönster även om en perfekt matchning redan har hittats i strängen.

</Option>
##### Exempel

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```