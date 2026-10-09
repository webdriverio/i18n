---
id: ocr-set-value
title: ocrSetValue
description: "Wpisuj tekst w pole wejściowe zlokalizowane na podstawie widocznego tekstu za pomocą ocrSetValue, które znajduje pole przy użyciu OCR i dopasowania rozmytego."
---

Wysyła sekwencję naciśnięć klawiszy do elementu. Polecenie:

-   automatycznie wykryje element
-   ustawi fokus na polu, klikając w nie
-   ustawi wartość w polu

Polecenie wyszuka podany tekst i spróbuje znaleźć dopasowanie na podstawie logiki rozmytej (Fuzzy Logic) z [Fuse.js](https://fusejs.io/). Oznacza to, że nawet jeśli podasz selektor z literówką lub znaleziony tekst nie będzie w 100% zgodny, polecenie i tak spróbuje zwrócić element. Zobacz [logi](#logs) poniżej.

## Użycie

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## Wynik

### Logi

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## Opcje

### `text`

<Option type="string" required="yes">

Tekst, który chcesz wyszukać, aby w niego kliknąć.

</Option>
#### Przykład

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

<Option type="string" required="yes">

Wartość do dodania.

</Option>
#### Przykład

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

<Option type="boolean" default="false" required="no">

Określa, czy wartość ma również zostać zatwierdzona w polu wejściowym. Oznacza to, że na końcu ciągu znaków zostanie wysłany klawisz "ENTER".

</Option>
#### Przykład

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

Jest to czas trwania kliknięcia. Jeśli chcesz, możesz również wykonać "długie kliknięcie", zwiększając ten czas.

</Option>
#### Przykład

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // To są 3 sekundy
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Im wyższy kontrast, tym ciemniejszy obraz i odwrotnie. Może to pomóc w znalezieniu tekstu na obrazie. Akceptuje wartości od `-1` do `1`.

</Option>
#### Przykład

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Jest to obszar wyszukiwania na ekranie, w którym OCR ma szukać tekstu. Może to być element lub prostokąt zawierający `x`, `y`, `width` i `height`

</Option>
#### Przykład

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// LUB
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// LUB
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

Język, który będzie rozpoznawany przez Tesseract. Więcej informacji można znaleźć [tutaj](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), a obsługiwane języki [tutaj](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Przykład

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Użyj języka niderlandzkiego
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

Możesz kliknąć na ekranie względem dopasowanego elementu. Można to zrobić na podstawie względnej liczby pikseli `above` (powyżej), `right` (w prawo), `below` (poniżej) lub `left` (w lewo) od dopasowanego elementu

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

Kliknij x pikseli `above` (powyżej) dopasowanego elementu.

</Option>
##### Przykład

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

Kliknij x pikseli `right` (w prawo) od dopasowanego elementu.

</Option>
##### Przykład

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

Kliknij x pikseli `below` (poniżej) dopasowanego elementu.

</Option>
##### Przykład

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

Kliknij x pikseli `left` (w lewo) od dopasowanego elementu.

</Option>
##### Przykład

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

Możesz zmienić logikę rozmytą służącą do wyszukiwania tekstu za pomocą poniższych opcji. Może to pomóc w znalezieniu lepszego dopasowania

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Określa, jak blisko lokalizacji rozmytej (określonej przez location) musi znajdować się dopasowanie. Dokładne dopasowanie litery, które znajduje się w odległości distance znaków od lokalizacji rozmytej, zostanie ocenione jako całkowity brak dopasowania. Wartość distance równa 0 wymaga, aby dopasowanie znajdowało się dokładnie w określonej lokalizacji. Wartość distance równa 1000 wymagałaby, aby idealne dopasowanie znajdowało się w obrębie 800 znaków od lokalizacji, aby zostało znalezione przy progu (threshold) 0.8.

</Option>
##### Przykład

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

Określa, mniej więcej w którym miejscu tekstu oczekuje się znalezienia wzorca.

</Option>
##### Przykład

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

W którym momencie algorytm dopasowania się poddaje. Próg (threshold) równy 0 wymaga idealnego dopasowania (zarówno liter, jak i lokalizacji), a próg równy 1.0 dopasuje cokolwiek.

</Option>
##### Przykład

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

Określa, czy wyszukiwanie ma uwzględniać wielkość liter.

</Option>
##### Przykład

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

Zwracane będą tylko te dopasowania, których długość przekracza tę wartość. (Na przykład, jeśli chcesz zignorować w wynikach dopasowania jednoznakowe, ustaw ją na 2)

</Option>
##### Przykład

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

Gdy ustawione na `true`, funkcja dopasowująca będzie kontynuować do końca wzorca wyszukiwania, nawet jeśli w ciągu znaków zostało już znalezione idealne dopasowanie.

</Option>
##### Przykład

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```