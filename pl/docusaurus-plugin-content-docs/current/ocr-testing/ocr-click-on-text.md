---
id: ocr-click-on-text
title: ocrClickOnText
description: "Kliknij element na podstawie jego widocznego tekstu za pomocą ocrClickOnText, która odnajduje tekst na ekranie przy użyciu OCR i dopasowania rozmytego."
---

Kliknij element na podstawie podanych tekstów. Polecenie wyszuka podany tekst i spróbuje znaleźć dopasowanie w oparciu o logikę rozmytą (Fuzzy Logic) z [Fuse.js](https://fusejs.io/). Oznacza to, że nawet jeśli podasz selektor z literówką lub znaleziony tekst nie będzie w 100% zgodny, polecenie i tak spróbuje zwrócić element. Zobacz [logi](#logs) poniżej.

## Użycie

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Wynik

### Logi

```log
# Nadal znajduje dopasowanie, mimo że szukaliśmy "Start3d", a znaleziony tekst to "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Obraz

W swoim (domyślnym) [`imagesFolder`](./getting-started#imagesfolder) znajdziesz obraz ze znacznikiem pokazującym, gdzie moduł kliknął.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Opcje

### `text`

<Option type="string" required="yes">

Tekst, który chcesz wyszukać, aby go kliknąć.

</Option>
#### Przykład

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

Czas trwania kliknięcia. Jeśli chcesz, możesz również utworzyć „długie kliknięcie”, zwiększając ten czas.

</Option>
#### Przykład

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // To są 3 sekundy
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Im wyższy kontrast, tym ciemniejszy obraz i odwrotnie. Może to pomóc w znalezieniu tekstu na obrazie. Akceptuje wartości od `-1` do `1`.

</Option>
#### Przykład

```js
await browser.ocrClickOnText({
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
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// LUB
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// LUB
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

Język, który będzie rozpoznawany przez Tesseract. Więcej informacji można znaleźć [tutaj](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), a obsługiwane języki [tutaj](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Przykład

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Użyj języka niderlandzkiego
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

Możesz kliknąć na ekranie względem dopasowanego elementu. Można to zrobić na podstawie względnej liczby pikseli `above`, `right`, `below` lub `left` od dopasowanego elementu

:::note

Dozwolone są następujące kombinacje

-   pojedyncze właściwości
-   `above` + `left` lub `above` + `right`
-   `below` + `left` lub `below` + `right`

Następujące kombinacje są **NIEDOZWOLONE**

-   `above` plus `below`
-   `left` plus `right`

:::

</Option>
#### `relativePosition.above`

<Option type="number" required="no">

Kliknij x pikseli powyżej (`above`) dopasowanego elementu.

</Option>
##### Przykład

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

Kliknij x pikseli na prawo (`right`) od dopasowanego elementu.

</Option>
##### Przykład

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

Kliknij x pikseli poniżej (`below`) dopasowanego elementu.

</Option>
##### Przykład

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

Kliknij x pikseli na lewo (`left`) od dopasowanego elementu.

</Option>
##### Przykład

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Za pomocą poniższych opcji możesz zmienić logikę rozmytą używaną do wyszukiwania tekstu. Może to pomóc w znalezieniu lepszego dopasowania

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Określa, jak blisko lokalizacji rozmytej (określonej przez location) musi znajdować się dopasowanie. Dokładne dopasowanie litery, które znajduje się o distance znaków od lokalizacji rozmytej, zostanie ocenione jako całkowity brak dopasowania. Wartość distance równa 0 wymaga, aby dopasowanie znajdowało się dokładnie w określonej lokalizacji. Wartość distance równa 1000 wymagałaby, aby idealne dopasowanie znajdowało się w odległości do 800 znaków od lokalizacji, aby zostało znalezione przy progu (threshold) 0.8.

</Option>
##### Przykład

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

Określa, w którym mniej więcej miejscu tekstu oczekuje się znalezienia wzorca.

</Option>
##### Przykład

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

W którym momencie algorytm dopasowujący się poddaje. Próg równy 0 wymaga idealnego dopasowania (zarówno liter, jak i lokalizacji), a próg równy 1.0 dopasuje wszystko.

</Option>
##### Przykład

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

Określa, czy wyszukiwanie ma uwzględniać wielkość liter.

</Option>
##### Przykład

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

Zwrócone zostaną tylko te dopasowania, których długość przekracza tę wartość. (Na przykład, jeśli chcesz zignorować w wyniku dopasowania jednoznakowe, ustaw tę wartość na 2)

</Option>
##### Przykład

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

Gdy ustawione na `true`, funkcja dopasowująca będzie kontynuować do końca wzorca wyszukiwania, nawet jeśli idealne dopasowanie zostało już znalezione w ciągu znaków.

</Option>
##### Przykład

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```