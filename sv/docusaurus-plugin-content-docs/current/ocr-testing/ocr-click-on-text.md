---
id: ocr-click-on-text
title: ocrClickOnText
description: "Klicka på ett element utifrån dess synliga text med ocrClickOnText, som hittar texten på skärmen med OCR och fuzzy matchning."
---

Klicka på ett element baserat på de angivna texterna. Kommandot söker efter den angivna texten och försöker hitta en matchning baserad på Fuzzy Logic från [Fuse.js](https://fusejs.io/). Det innebär att även om du anger en selektor med ett stavfel, eller om den hittade texten inte är en 100-procentig matchning, kommer kommandot ändå att försöka returnera ett element. Se [loggarna](#logs) nedan.

## Användning

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Utdata

### Loggar

```log
# Hittar fortfarande en matchning trots att vi sökte efter "Start3d" och den hittade texten var "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Bild

Du hittar en bild i din (standard)[`imagesFolder`](./getting-started#imagesfolder) med en måltavla som visar var modulen har klickat.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Alternativ

### `text`

<Option type="string" required="yes">

Texten du vill söka efter för att klicka på.

</Option>
#### Exempel

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

Detta är klickets varaktighet. Om du vill kan du även skapa ett "långt klick" genom att öka tiden.

</Option>
#### Exempel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // Detta är 3 sekunder
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Ju högre kontrast, desto mörkare bild och vice versa. Detta kan hjälpa till att hitta text i en bild. Det accepterar värden mellan `-1` och `1`.

</Option>
#### Exempel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Detta är sökområdet på skärmen där OCR ska leta efter text. Detta kan vara ett element eller en rektangel som innehåller `x`, `y`, `width` och `height`

</Option>
#### Exempel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// ELLER
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// ELLER
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

Språket som Tesseract ska känna igen. Mer information finns [här](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) och de språk som stöds finns [här](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Exempel

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Använd nederländska som språk
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

Du kan klicka på skärmen relativt till det matchande elementet. Detta kan göras baserat på relativa pixlar `above`, `right`, `below` eller `left` från det matchande elementet

:::note

Följande kombinationer är tillåtna

-   enskilda egenskaper
-   `above` + `left` eller `above` + `right`
-   `below` + `left` eller `below` + `right`

Följande kombinationer är **INTE** tillåtna

-   `above` plus `below`
-   `left` plus `right`

:::

</Option>
#### `relativePosition.above`

<Option type="number" required="no">

Klicka x pixlar `above` (ovanför) det matchande elementet.

</Option>
##### Exempel

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

Klicka x pixlar `right` (till höger) om det matchande elementet.

</Option>
##### Exempel

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

Klicka x pixlar `below` (nedanför) det matchande elementet.

</Option>
##### Exempel

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

Klicka x pixlar `left` (till vänster) om det matchande elementet.

</Option>
##### Exempel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Du kan ändra den fuzzy logiken för att hitta text med följande alternativ. Detta kan hjälpa till att hitta en bättre matchning

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Avgör hur nära matchningen måste vara den fuzzy positionen (angiven av location). En exakt bokstavsmatchning som ligger distance tecken bort från den fuzzy positionen räknas som en fullständig felmatchning. Ett avstånd på 0 kräver att matchningen ligger på exakt den angivna positionen. Ett avstånd på 1000 skulle kräva att en perfekt matchning ligger inom 800 tecken från positionen för att hittas med ett tröskelvärde på 0.8.

</Option>
##### Exempel

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

Avgör ungefär var i texten mönstret förväntas hittas.

</Option>
##### Exempel

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

Vid vilken punkt matchningsalgoritmen ger upp. Ett tröskelvärde på 0 kräver en perfekt matchning (av både bokstäver och position), ett tröskelvärde på 1.0 skulle matcha vad som helst.

</Option>
##### Exempel

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

Om sökningen ska vara skiftlägeskänslig.

</Option>
##### Exempel

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

Endast matchningar vars längd överstiger detta värde returneras. (Om du till exempel vill ignorera matchningar med ett enda tecken i resultatet, sätt det till 2)

</Option>
##### Exempel

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

När `true` fortsätter matchningsfunktionen till slutet av ett sökmönster även om en perfekt matchning redan har hittats i strängen.

</Option>
##### Exempel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```