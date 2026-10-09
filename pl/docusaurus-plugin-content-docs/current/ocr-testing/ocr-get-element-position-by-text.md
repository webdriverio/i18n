---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
description: "Pobierz pozycję tekstu na ekranie za pomocą ocrGetElementPositionByText, wykorzystując OCR i dopasowanie rozmyte do jego odnalezienia."
---

Pobiera pozycję tekstu na ekranie. Polecenie wyszuka podany tekst i spróbuje znaleźć dopasowanie na podstawie logiki rozmytej (Fuzzy Logic) z [Fuse.js](https://fusejs.io/). Oznacza to, że nawet jeśli podasz selektor z literówką lub znaleziony tekst nie będzie w 100% zgodny, polecenie nadal spróbuje zwrócić element. Zobacz [logi](#logs) poniżej.

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
# Nadal znajduje dopasowanie, mimo że szukaliśmy "Start3d", a znaleziony tekst to "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Opcje

### `text`

<Option type="string" required="yes">

Tekst, który chcesz wyszukać, aby go kliknąć.

</Option>
#### Przykład

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

<Option type="number" default="0.25" required="no">

Im wyższy kontrast, tym ciemniejszy obraz i odwrotnie. Może to pomóc w znalezieniu tekstu na obrazie. Akceptuje wartości od `-1` do `1`.

</Option>
#### Przykład

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Jest to obszar wyszukiwania na ekranie, w którym OCR ma szukać tekstu. Może to być element lub prostokąt zawierający `x`, `y`, `width` i `height`

</Option>
#### Przykład

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OR
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

Język, który Tesseract będzie rozpoznawał. Więcej informacji można znaleźć [tutaj](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), a obsługiwane języki [tutaj](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Przykład

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // Użyj języka niderlandzkiego
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Możesz zmienić logikę rozmytą służącą do wyszukiwania tekstu za pomocą poniższych opcji. Może to pomóc w znalezieniu lepszego dopasowania

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Określa, jak blisko lokalizacji rozmytej (określonej przez location) musi znajdować się dopasowanie. Dokładne dopasowanie litery, które znajduje się o distance znaków od lokalizacji rozmytej, zostanie ocenione jako całkowity brak dopasowania. Wartość distance równa 0 wymaga, aby dopasowanie znajdowało się dokładnie w określonej lokalizacji. Wartość distance równa 1000 wymagałaby, aby idealne dopasowanie znajdowało się w odległości do 800 znaków od lokalizacji, aby zostało znalezione przy progu (threshold) 0.8.

</Option>
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

<Option type="number" default="0" required="no">

Określa, w którym miejscu tekstu w przybliżeniu oczekuje się znalezienia wzorca.

</Option>
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

<Option type="number" default="0.6" required="no">

W którym momencie algorytm dopasowujący się poddaje. Próg równy 0 wymaga idealnego dopasowania (zarówno liter, jak i lokalizacji), a próg równy 1.0 dopasuje wszystko.

</Option>
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

<Option type="boolean" default="false" required="no">

Określa, czy wyszukiwanie ma uwzględniać wielkość liter.

</Option>
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

<Option type="number" default="2" required="no">

Zwrócone zostaną tylko dopasowania, których długość przekracza tę wartość. (Na przykład, jeśli chcesz zignorować w wyniku dopasowania jednoznakowe, ustaw tę wartość na 2)

</Option>
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

<Option type="number" default="false" required="no">

Gdy ustawione na `true`, funkcja dopasowująca będzie kontynuować aż do końca wzorca wyszukiwania, nawet jeśli idealne dopasowanie zostało już znalezione w ciągu znaków.

</Option>
##### Przykład

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```