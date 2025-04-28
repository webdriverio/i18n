---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

Pobierz pozycję tekstu na ekranie. Komenda przeszuka podany tekst i spróbuje znaleźć dopasowanie w oparciu o logikę rozmytą z [Fuse.js](https://fusejs.io/). Oznacza to, że nawet jeśli podasz selektor z literówką lub znaleziony tekst nie będzie w 100% pasował, nadal spróbuje zwrócić element. Zobacz [logi](#logs) poniżej.

## Użycie

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## Wynik

### Rezultat

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

### Logi

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Opcje

### `text`

-   **Typ:** `string`
-   **Obowiązkowy:** tak

Tekst, który chcesz wyszukać, aby kliknąć.

#### Przykład

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

-   **Typ:** `number`
-   **Obowiązkowy:** nie
-   **Domyślnie:** `0.25`

Im wyższy kontrast, tym ciemniejszy obraz i odwrotnie. Może to pomóc w znalezieniu tekstu na obrazie. Akceptuje wartości między `-1` a `1`.

#### Przykład

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Typ:** `number`
-   **Obowiązkowy:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Jest to obszar wyszukiwania na ekranie, w którym OCR ma szukać tekstu. Może to być element lub prostokąt zawierający `x`, `y`, `width` i `height`

#### Przykład

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// LUB
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// LUB
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
-   **Obowiązkowy:** Nie
-   **Domyślnie:** `eng`

Język, który Tesseract rozpozna. Więcej informacji można znaleźć [tutaj](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), a obsługiwane języki można znaleźć [tutaj](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Przykład

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // Użyj holenderskiego jako języka
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Możesz zmienić logikę rozmytą, aby znaleźć tekst z następującymi opcjami. Może to pomóc w znalezieniu lepszego dopasowania.

#### `fuzzyFindOptions.distance`

-   **Typ:** `number`
-   **Obowiązkowy:** nie
-   **Domyślnie:** 100

Określa, jak blisko dopasowanie musi być do rozmytej lokalizacji (określonej przez lokalizację). Dokładne dopasowanie litery, które znajduje się w odległości znaków od rozmytej lokalizacji, zostałoby ocenione jako całkowity brak dopasowania. Odległość 0 wymaga, aby dopasowanie znajdowało się w dokładnej określonej lokalizacji. Odległość 1000 wymagałaby perfekcyjnego dopasowania w odległości 800 znaków od lokalizacji, aby zostać znalezioną przy progu 0,8.

##### Przykład

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
-   **Obowiązkowy:** nie
-   **Domyślnie:** 0

Określa w przybliżeniu, gdzie w tekście wzorzec powinien zostać znaleziony.

##### Przykład

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
-   **Obowiązkowy:** nie
-   **Domyślnie:** 0.6

W jakim momencie algorytm dopasowania poddaje się. Próg 0 wymaga idealnego dopasowania (zarówno liter, jak i lokalizacji), próg 1.0 pasowałby do czegokolwiek.

##### Przykład

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
-   **Obowiązkowy:** nie
-   **Domyślnie:** false

Czy wyszukiwanie powinno rozróżniać wielkość liter.

##### Przykład

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
-   **Obowiązkowy:** nie
-   **Domyślnie:** 2

Tylko dopasowania, których długość przekracza tę wartość, zostaną zwrócone. (Na przykład, jeśli chcesz zignorować dopasowania pojedynczych znaków w wyniku, ustaw na 2)

##### Przykład

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
-   **Obowiązkowy:** nie
-   **Domyślnie:** false

Gdy `true`, funkcja dopasowania będzie kontynuować do końca wzorca wyszukiwania, nawet jeśli idealne dopasowanie zostało już zlokalizowane w ciągu.

##### Przykład

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```