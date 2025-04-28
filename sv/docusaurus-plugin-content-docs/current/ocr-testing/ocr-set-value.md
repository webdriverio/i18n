---
id: ocr-set-value
title: ocrSetValue
---

Skicka en sekvens av tangenttryckningar till ett element. Det kommer att:

-   automatiskt upptäcka elementet
-   fokusera på fältet genom att klicka på det
-   ange värdet i fältet

Kommandot kommer att söka efter den tillhandahållna texten och försöka hitta en träff baserat på Fuzzy Logic från [Fuse.js](https://fusejs.io/). Detta betyder att om du skulle ange en väljare med ett stavfel, eller om den hittade texten inte är en 100% träff, kommer den ändå att försöka ge dig tillbaka ett element. Se [loggarna](#logs) nedan.

## Usage

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## Output

### Logs

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## Options

### `text`

-   **Type:** `string`
-   **Mandatory:** yes

Texten du vill söka efter för att klicka på.

#### Example

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **Type:** `string`
-   **Mandatory:** yes

Värdet som ska läggas till.

#### Example

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **Type:** `boolean`
-   **Mandatory:** no
-   **Default:** `false`

Om värdet också behöver skickas in i inmatningsfältet. Detta innebär att en "ENTER" kommer att skickas i slutet av strängen.

#### Example

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** `500` milliseconds

Detta är klickets varaktighet. Om du vill kan du också skapa ett "långt klick" genom att öka tiden.

#### Example

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // This is 3 seconds
});
```

### `contrast`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** `0.25`

Ju högre kontrast, desto mörkare blir bilden och vice versa. Detta kan hjälpa till att hitta text i en bild. Den accepterar värden mellan `-1` och `1`.

#### Example

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **Type:** `number`
-   **Mandatory:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Detta är sökområdet på skärmen där OCR behöver leta efter text. Detta kan vara ett element eller en rektangel som innehåller `x`, `y`, `width` och `height`

#### Example

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// OR
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

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `eng`

Språket som Tesseract ska känna igen. Mer information finns [här](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) och de språk som stöds finns [här](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Example

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Type:** `object`
-   **Mandatory:** no

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

#### `relativePosition.above`

-   **Type:** `number`
-   **Mandatory:** no

Klicka x pixlar `above` det matchande elementet.

##### Example

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

-   **Type:** `number`
-   **Mandatory:** no

Klicka x pixlar `right` från det matchande elementet.

##### Example

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

-   **Type:** `number`
-   **Mandatory:** no

Klicka x pixlar `below` det matchande elementet.

##### Example

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

-   **Type:** `number`
-   **Mandatory:** no

Klicka x pixlar `left` från det matchande elementet.

##### Example

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

Du kan ändra fuzzy-logiken för att hitta text med följande alternativ. Detta kan hjälpa till att hitta en bättre träff

#### `fuzzyFindOptions.distance`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 100

Bestämmer hur nära träffen måste vara den ungefärliga platsen (anges av location). En exakt bokstavsmatchning som är distance-tecken bort från den ungefärliga platsen skulle betraktas som en fullständig felmatchning. Ett avstånd på 0 kräver att träffen finns på den exakta angivna platsen. Ett avstånd på 1000 skulle kräva en perfekt träff inom 800 tecken från platsen för att hittas med ett tröskelvärde på 0,8.

##### Example

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

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 0

Bestämmer ungefär var i texten mönstret förväntas hittas.

##### Example

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

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 0.6

Vid vilken punkt ger matchningsalgoritmen upp. Ett tröskelvärde på 0 kräver en perfekt match (av både bokstäver och plats), ett tröskelvärde på 1.0 skulle matcha vad som helst.

##### Example

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

-   **Type:** `boolean`
-   **Mandatory:** no
-   **Default:** false

Om sökningen ska vara skiftlägeskänslig.

##### Example

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

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 2

Endast träffar vars längd överstiger detta värde kommer att returneras. (Till exempel, om du vill ignorera matchningar med enstaka tecken i resultatet, ställ in det till 2)

##### Example

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

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** false

När `true`, kommer matchningsfunktionen att fortsätta till slutet av sökmönstret även om en perfekt match redan har hittats i strängen.

##### Example

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```