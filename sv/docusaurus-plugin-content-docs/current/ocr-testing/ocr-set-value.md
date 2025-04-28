---
id: ocr-set-value
title: ocrSetValue
---

Skicka en sekvens av tangenttryckningar till ett element. Det kommer att:

-   automatiskt identifiera elementet
-   fokusera på fältet genom att klicka på det
-   ange värdet i fältet

Kommandot söker efter angiven text och försöker hitta en matchning baserat på Fuzzy Logic från [Fuse.js](https://fusejs.io/). Detta betyder att om du anger en väljare med ett stavfel, eller om den hittade texten inte är en 100% matchning, kommer den ändå att försöka ge dig tillbaka ett element. Se [loggarna](#logs) nedan.

## Användning

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

## Alternativ

### `text`

-   **Typ:** `string`
-   **Obligatorisk:** ja

Texten du vill söka efter för att klicka på.

#### Exempel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **Typ:** `string`
-   **Obligatorisk:** ja

Värdet som ska läggas till.

#### Exempel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **Typ:** `boolean`
-   **Obligatorisk:** nej
-   **Standard:** `false`

Om värdet också behöver skickas in i inmatningsfältet. Detta innebär att en "ENTER" kommer att skickas i slutet av strängen.

#### Exempel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** `500` millisekunder

Detta är klickets varaktighet. Om du vill kan du även skapa ett "långt klick" genom att öka tiden.

#### Exempel

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **Typ:** `number`
-   **Obligatorisk:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Detta är sökområdet på skärmen där OCR behöver leta efter text. Detta kan vara ett element eller en rektangel som innehåller `x`, `y`, `width` och `height`.

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

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** `eng`

Språket som Tesseract kommer att känna igen. Mer information finns [här](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) och de språk som stöds kan hittas [här](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

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

-   **Typ:** `object`
-   **Obligatorisk:** nej

Du kan klicka på skärmen relativt till det matchande elementet. Detta kan göras baserat på relativa pixlar `above`, `right`, `below` eller `left` från det matchande elementet.

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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Du kan ändra den oklara logiken för att hitta text med följande alternativ. Detta kan hjälpa till att hitta en bättre matchning.

#### `fuzzyFindOptions.distance`

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** 100

Bestämmer hur nära matchningen måste vara till den oklara platsen (specificerad av location). En exakt bokstavsmatchning som ligger på avstånd tecken från den oklara platsen skulle bedömas som en fullständig felmatchning. Ett avstånd på 0 kräver att matchningen ska vara på exakt den angivna platsen. Ett avstånd på 1000 skulle kräva en perfekt matchning inom 800 tecken från platsen för att hittas med en tröskel på 0,8.

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

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** 0

Bestämmer ungefär var i texten mönstret förväntas finnas.

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

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** 0.6

Vid vilken punkt ger matchningsalgoritmen upp. En tröskel på 0 kräver en perfekt matchning (av både bokstäver och plats), en tröskel på 1.0 skulle matcha vad som helst.

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

-   **Typ:** `boolean`
-   **Obligatorisk:** nej
-   **Standard:** false

Om sökningen ska vara skiftlägeskänslig.

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

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** 2

Endast matchningar vars längd överstiger detta värde kommer att returneras. (Till exempel, om du vill ignorera enstaka teckenmatchningar i resultatet, ställ in det på 2)

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

-   **Typ:** `number`
-   **Obligatorisk:** nej
-   **Standard:** false

När `true` kommer matchningsfunktionen att fortsätta till slutet av ett sökmönster även om en perfekt matchning redan har hittats i strängen.

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