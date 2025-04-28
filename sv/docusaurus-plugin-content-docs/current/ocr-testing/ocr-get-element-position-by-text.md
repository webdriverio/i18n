---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

Få positionen för en text på skärmen. Kommandot söker efter den angivna texten och försöker hitta en matchning baserad på Fuzzy Logic från [Fuse.js](https://fusejs.io/). Detta betyder att om du anger en selektor med ett stavfel, eller om den hittade texten kanske inte är en 100% matchning, kommer den ändå försöka ge dig tillbaka ett element. Se [loggarna](#logs) nedan.

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
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Alternativ

### `text`

-   **Typ:** `string`
-   **Obligatorisk:** ja

Texten du vill söka efter för att klicka på.

#### Exempel

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** `0.25`

Ju högre kontrast, desto mörkare blir bilden och vice versa. Detta kan hjälpa till att hitta text i en bild. Den accepterar värden mellan `-1` och `1`.

#### Exempel

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Typ:** `number`
-   **Obligatorisk:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Detta är sökområdet på skärmen där OCR behöver leta efter text. Detta kan vara ett element eller en rektangel som innehåller `x`, `y`, `width` och `height`

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

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** `eng`

Det språk som Tesseract kommer att känna igen. Mer information finns [här](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) och de språk som stöds finns [här](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

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

Du kan ändra fuzzy-logiken för att hitta text med följande alternativ. Detta kan hjälpa till att hitta en bättre matchning

#### `fuzzyFindOptions.distance`

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** 100

Avgör hur nära matchningen måste vara till fuzzy-platsen (specificerad av location). En exakt bokstavsmatchning som är på avstånd tecken från fuzzy-platsen skulle bedömas som en fullständig felmatchning. Ett avstånd på 0 kräver att matchningen är på den exakta angivna platsen. Ett avstånd på 1000 skulle kräva en perfekt matchning inom 800 tecken från platsen för att hittas med en tröskel på 0,8.

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

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** 0

Avgör ungefär var i texten mönstret förväntas hittas.

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

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** 0.6

Vid vilken punkt ger matchningsalgoritmen upp. En tröskel på 0 kräver en perfekt matchning (av både bokstäver och plats), en tröskel på 1.0 skulle matcha vad som helst.

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

-   **Typ:** `boolean`
-   **Obligatorisk:** nej
-   **Standard:** false

Om sökningen ska vara skiftlägeskänslig.

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

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** 2

Endast matchningar vars längd överstiger detta värde kommer att returneras. (Om du till exempel vill ignorera enskilda teckenöverensstämmelser i resultatet, ställ in det till 2)

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

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** false

När `true` kommer matchningsfunktionen att fortsätta till slutet av ett sökmönster även om en perfekt matchning redan har hittats i strängen.

##### Exempel

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```