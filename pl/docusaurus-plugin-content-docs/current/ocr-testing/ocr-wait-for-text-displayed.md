---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
description: "Poczekaj, aż określony tekst zostanie wyświetlony na ekranie, używając ocrWaitForTextDisplayed z usługi OCR."
---

Czeka, aż określony tekst zostanie wyświetlony na ekranie.

## Użycie

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## Wynik

### Logi

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed używa wewnętrznie ocrGetElementPositionByText, dlatego w logach widzisz polecenie ocrGetElementPositionByText
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Opcje

### `text`

<Option type="string" required="yes">

Tekst, który chcesz wyszukać, aby go kliknąć.

</Option>
#### Przykład

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

<Option type="number" default="18000 (18 seconds)" required="no">

Czas w milisekundach. Pamiętaj, że proces OCR może zająć trochę czasu, więc nie ustawiaj zbyt niskiej wartości.

</Option>
#### Przykład

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // czekaj 25 sekund
});
```

### `timeoutMsg`

<Option type="string" default={`Could not find the text "{selector}" within the requested time.`} required="no">

Nadpisuje domyślny komunikat błędu.

</Option>
#### Przykład

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Im wyższy kontrast, tym ciemniejszy obraz i odwrotnie. Może to pomóc w znalezieniu tekstu na obrazie. Przyjmuje wartości od `-1` do `1`.

</Option>
#### Przykład

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Jest to obszar wyszukiwania na ekranie, w którym OCR ma szukać tekstu. Może to być element lub prostokąt zawierający `x`, `y`, `width` i `height`

</Option>
#### Przykład

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// LUB
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// LUB
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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

Język, który Tesseract będzie rozpoznawał. Więcej informacji można znaleźć [tutaj](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), a obsługiwane języki można znaleźć [tutaj](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Przykład

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // Użyj języka niderlandzkiego
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Możesz zmienić logikę wyszukiwania rozmytego (fuzzy) tekstu za pomocą poniższych opcji. Może to pomóc w znalezieniu lepszego dopasowania

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Określa, jak blisko lokalizacji rozmytej (określonej przez location) musi znajdować się dopasowanie. Dokładne dopasowanie liter, które znajduje się w odległości distance znaków od lokalizacji rozmytej, zostanie ocenione jako całkowity brak dopasowania. Wartość distance równa 0 wymaga, aby dopasowanie znajdowało się dokładnie we wskazanej lokalizacji. Wartość distance równa 1000 wymagałaby, aby idealne dopasowanie znajdowało się w obrębie 800 znaków od lokalizacji, aby zostało znalezione przy progu (threshold) 0.8.

</Option>
##### Przykład

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

<Option type="number" default="0" required="no">

Określa w przybliżeniu, w którym miejscu tekstu oczekuje się znalezienia wzorca.

</Option>
##### Przykład

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

<Option type="number" default="0.6" required="no">

Określa, w którym momencie algorytm dopasowujący się poddaje. Próg 0 wymaga idealnego dopasowania (zarówno liter, jak i lokalizacji), a próg 1.0 dopasuje wszystko.

</Option>
##### Przykład

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

<Option type="number" default="2" required="no">

Zwrócone zostaną tylko dopasowania, których długość przekracza tę wartość. (Na przykład, jeśli chcesz zignorować w wynikach dopasowania jednoznakowe, ustaw tę wartość na 2)

</Option>
##### Przykład

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```