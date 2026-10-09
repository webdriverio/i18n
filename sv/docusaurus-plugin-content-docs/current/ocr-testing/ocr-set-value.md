---
id: ocr-set-value
title: ocrSetValue
description: "Skriv i ett inmatningsfält som lokaliseras via dess synliga text med ocrSetValue, som hittar fältet med OCR och fuzzy-matchning."
---

Skicka en sekvens av tangenttryckningar till ett element. Kommandot kommer att:

-   automatiskt identifiera elementet
-   sätta fokus på fältet genom att klicka på det
-   sätta värdet i fältet

Kommandot söker efter den angivna texten och försöker hitta en matchning baserad på Fuzzy Logic från [Fuse.js](https://fusejs.io/). Det innebär att om du anger en selektor med ett stavfel, eller om den hittade texten inte är en 100 % matchning, kommer det ändå att försöka ge dig tillbaka ett element. Se [loggarna](#logs) nedan.

## Användning

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## Utdata

### Loggar

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## Alternativ

### `text`

<Option type="string" required="yes">

Texten du vill söka efter för att klicka på.

</Option>
#### Exempel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

<Option type="string" required="yes">

Värde som ska läggas till.

</Option>
#### Exempel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

<Option type="boolean" default="false" required="no">

Om värdet även behöver skickas in i inmatningsfältet. Det innebär att ett "ENTER" skickas i slutet av strängen.

</Option>
#### Exempel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

Detta är klickets varaktighet. Om du vill kan du även skapa ett "långt klick" genom att öka tiden.

</Option>
#### Exempel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // Detta är 3 sekunder
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Ju högre kontrast, desto mörkare bild och vice versa. Detta kan hjälpa till att hitta text i en bild. Det accepterar värden mellan `-1` och `1`.

</Option>
#### Exempel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Detta är sökområdet på skärmen där OCR ska leta efter text. Det kan vara ett element eller en rektangel som innehåller `x`, `y`, `width` och `height`

</Option>
#### Exempel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// ELLER
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// ELLER
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

Språket som Tesseract ska känna igen. Mer information finns [här](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) och de språk som stöds finns [här](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Exempel

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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

Klicka x pixlar `right` (till höger) om det matchande elementet.

</Option>
##### Exempel

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

Klicka x pixlar `below` (nedanför) det matchande elementet.

</Option>
##### Exempel

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

Klicka x pixlar `left` (till vänster) om det matchande elementet.

</Option>
##### Exempel

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

Du kan ändra den fuzzy-logik som används för att hitta text med följande alternativ. Detta kan hjälpa till att hitta en bättre matchning

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Bestämmer hur nära matchningen måste vara den ungefärliga platsen (angiven av location). En exakt bokstavsmatchning som ligger distance tecken bort från den ungefärliga platsen skulle räknas som en fullständig missmatchning. En distance på 0 kräver att matchningen finns på exakt den angivna platsen. En distance på 1000 skulle kräva att en perfekt matchning ligger inom 800 tecken från platsen för att hittas med en threshold på 0.8.

</Option>
##### Exempel

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

Bestämmer ungefär var i texten mönstret förväntas hittas.

</Option>
##### Exempel

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

Vid vilken punkt matchningsalgoritmen ger upp. En threshold på 0 kräver en perfekt matchning (av både bokstäver och plats), en threshold på 1.0 skulle matcha vad som helst.

</Option>
##### Exempel

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

Om sökningen ska vara skiftlägeskänslig.

</Option>
##### Exempel

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

Endast matchningar vars längd överstiger detta värde returneras. (Om du till exempel vill ignorera matchningar med ett enda tecken i resultatet, sätt det till 2)

</Option>
##### Exempel

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

När `true` fortsätter matchningsfunktionen till slutet av ett sökmönster även om en perfekt matchning redan har hittats i strängen.

</Option>
##### Exempel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```