---
id: ocr-click-on-text
title: ocrClickOnText
---

Klicka på ett element baserat på den angivna texten. Kommandot kommer att söka efter den angivna texten och försöka hitta en matchning baserat på Fuzzy Logic från [Fuse.js](https://fusejs.io/). Detta innebär att om du anger en selektor med ett stavfel, eller om den hittade texten inte är en 100% matchning, kommer det ändå att försöka ge dig tillbaka ett element. Se [loggarna](#logs) nedan.

## Användning

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Output

### Logs

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Image

Du kommer att hitta en bild i din (standard)[`imagesFolder`](./getting-started#imagesfolder) med ett mål som visar var modulen har klickat.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Alternativ

### `text`

-   **Typ:** `string`
-   **Obligatorisk:** ja

Texten du vill söka efter för att klicka på.

#### Exempel

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** `500` millisekunder

Detta är klickets varaktighet. Om du vill kan du även skapa ett "långt klick" genom att öka tiden.

#### Exempel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // Detta är 3 sekunder
});
```

### `contrast`

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** `0.25`

Ju högre kontrast, desto mörkare blir bilden och vice versa. Detta kan hjälpa till att hitta text i en bild. Det accepterar värden mellan `-1` och `1`.

#### Exempel

```js
await browser.ocrClickOnText({
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

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** `eng`

Språket som Tesseract kommer att känna igen. Mer information finns [här](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) och de språk som stöds finns [här](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

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

-   **Typ:** `object`
-   **Obligatorisk:** nej

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

-   **Typ:** `number`
-   **Obligatorisk:** nej

Klicka x pixlar `ovanför` det matchande elementet.

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

-   **Typ:** `number`
-   **Obligatorisk:** nej

Klicka x pixlar `till höger` om det matchande elementet.

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

-   **Typ:** `number`
-   **Obligatorisk:** nej

Klicka x pixlar `nedanför` det matchande elementet.

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

-   **Typ:** `number`
-   **Obligatorisk:** nej

Klicka x pixlar `till vänster` om det matchande elementet.

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

Du kan ändra fuzzy-logiken för att hitta text med följande alternativ. Detta kan hjälpa till att hitta en bättre matchning

#### `fuzzyFindOptions.distance`

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** 100

Avgör hur nära matchningen måste vara till den fuzzy-platsen (specificerad av location). En exakt bokstavsmatchning som är distance tecken borta från fuzzy-platsen skulle poängsättas som en fullständig icke-matchning. Ett avstånd på 0 kräver att matchningen ska vara på den exakta angivna platsen. Ett avstånd på 1000 skulle kräva en perfekt matchning inom 800 tecken från platsen för att hittas med ett tröskelvärde på 0,8.

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

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** 0

Bestämmer ungefär var i texten mönstret förväntas hittas.

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

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** 0.6

Vid vilken punkt ger matchningsalgoritmen upp. En tröskel på 0 kräver en perfekt matchning (både bokstäver och plats), en tröskel på 1.0 skulle matcha vad som helst.

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

-   **Typ:** `boolean`
-   **Obligatorisk:** nej
-   **Standard:** false

Om sökningen ska vara skiftlägeskänslig.

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

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** 2

Endast matchningar vars längd överstiger detta värde kommer att returneras. (Till exempel, om du vill ignorera enbokstavsmatchningar i resultatet, sätt den till 2)

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

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** false

När `true`, kommer matchningsfunktionen att fortsätta till slutet av ett sökmönster även om en perfekt matchning redan har hittats i strängen.

##### Exempel

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```