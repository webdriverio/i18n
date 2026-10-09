---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
description: "Hämta positionen för en text på skärmen med ocrGetElementPositionByText, som använder OCR och fuzzy matchning för att hitta den."
---

Hämta positionen för en text på skärmen. Kommandot söker efter den angivna texten och försöker hitta en matchning baserad på Fuzzy Logic från [Fuse.js](https://fusejs.io/). Det innebär att även om du anger en selektor med ett stavfel, eller om den hittade texten inte är en 100-procentig matchning, kommer kommandot ändå att försöka returnera ett element. Se [loggarna](#logs) nedan.

## Användning

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## Utdata

### Resultat

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

### Loggar

```log
# Hittar fortfarande en matchning trots att vi sökte efter "Start3d" och den hittade texten var "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Alternativ

### `text`

<Option type="string" required="yes">

Texten du vill söka efter för att klicka på.

</Option>
#### Exempel

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

<Option type="number" default="0.25" required="no">

Ju högre kontrast, desto mörkare blir bilden och vice versa. Detta kan hjälpa till att hitta text i en bild. Det accepterar värden mellan `-1` och `1`.

</Option>
#### Exempel

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Detta är sökområdet på skärmen där OCR ska leta efter text. Det kan vara ett element eller en rektangel som innehåller `x`, `y`, `width` och `height`

</Option>
#### Exempel

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// ELLER
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// ELLER
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

<Option type="string" default="eng" required="No">

Språket som Tesseract ska känna igen. Mer information finns [här](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) och de språk som stöds finns [här](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Exempel

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // Använd nederländska som språk
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Du kan ändra den fuzzy logik som används för att hitta text med följande alternativ. Detta kan hjälpa till att hitta en bättre matchning

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Avgör hur nära matchningen måste vara den ungefärliga platsen (angiven med location). En exakt bokstavsmatchning som ligger distance tecken bort från den ungefärliga platsen räknas som en fullständig felmatchning. Ett avstånd på 0 kräver att matchningen ligger exakt på den angivna platsen. Ett avstånd på 1000 skulle kräva att en perfekt matchning ligger inom 800 tecken från platsen för att hittas med ett tröskelvärde på 0.8.

</Option>
##### Exempel

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

<Option type="number" default="0" required="no">

Avgör ungefär var i texten mönstret förväntas hittas.

</Option>
##### Exempel

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

<Option type="number" default="2" required="no">

Endast matchningar vars längd överstiger detta värde returneras. (Om du till exempel vill ignorera matchningar med ett enda tecken i resultatet, sätt det till 2)

</Option>
##### Exempel

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```