---
id: ocr-click-on-text
title: ocrClickOnText
---

Kliknij na element na podstawie podanych tekstów. Polecenie wyszuka podany tekst i spróbuje znaleźć dopasowanie na podstawie logiki rozmytej (Fuzzy Logic) z [Fuse.js](https://fusejs.io/). Oznacza to, że jeśli podasz selektor z literówką lub znaleziony tekst nie będzie w 100% dopasowany, polecenie nadal spróbuje zwrócić element. Zobacz [logi](#logs) poniżej.

## Użycie

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Wyjście

### Logs

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Obraz

Znajdziesz obraz w swoim (domyślnym) [`imagesFolder`](./getting-started#imagesfolder) z zaznaczonym celem, pokazującym gdzie moduł kliknął.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Opcje

### `text`

-   **Typ:** `string`
-   **Obowiązkowe:** tak

Tekst, którego chcesz szukać, aby kliknąć.

#### Przykład

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **Typ:** `number`
-   **Obowiązkowe:** nie
-   **Domyślnie:** `500` milisekund

Jest to czas trwania kliknięcia. Jeśli chcesz, możesz również utworzyć "długie kliknięcie" zwiększając czas.

#### Przykład

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // To jest 3 sekundy
});
```

### `contrast`

-   **Typ:** `number`
-   **Obowiązkowe:** nie
-   **Domyślnie:** `0.25`

Im wyższy kontrast, tym ciemniejszy obraz i odwrotnie. Może to pomóc w znalezieniu tekstu na obrazie. Akceptuje wartości od `-1` do `1`.

#### Przykład

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Typ:** `number`
-   **Obowiązkowe:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Jest to obszar wyszukiwania na ekranie, gdzie OCR musi szukać tekstu. Może to być element lub prostokąt zawierający `x`, `y`, `width` i `height`

#### Przykład

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OR
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
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `eng`

Język, który Tesseract będzie rozpoznawać. Więcej informacji można znaleźć [tutaj](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), a obsługiwane języki można znaleźć [tutaj](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Przykład

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Użyj holenderskiego jako języka
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Typ:** `object`
-   **Obowiązkowe:** nie

Możesz kliknąć na ekranie względem dopasowanego elementu. Można to zrobić na podstawie względnych pikseli `above`, `right`, `below` lub `left` od dopasowanego elementu.

:::note

Dozwolone są następujące kombinacje:

-   pojedyncze właściwości
-   `above` + `left` lub `above` + `right`
-   `below` + `left` lub `below` + `right`

Następujące kombinacje **NIE** są dozwolone:

-   `above` plus `below`
-   `left` plus `right`

:::

#### `relativePosition.above`

-   **Typ:** `number`
-   **Obowiązkowe:** nie

Kliknij x pikseli `powyżej` dopasowanego elementu.

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

-   **Typ:** `number`
-   **Obowiązkowe:** nie

Kliknij x pikseli `na prawo` od dopasowanego elementu.

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

-   **Typ:** `number`
-   **Obowiązkowe:** nie

Kliknij x pikseli `poniżej` dopasowanego elementu.

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

-   **Typ:** `number`
-   **Obowiązkowe:** nie

Kliknij x pikseli `na lewo` od dopasowanego elementu.

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

Możesz zmienić logikę rozmytą do wyszukiwania tekstu za pomocą następujących opcji. Może to pomóc znaleźć lepsze dopasowanie.

#### `fuzzyFindOptions.distance`

-   **Typ:** `number`
-   **Obowiązkowe:** nie
-   **Domyślnie:** 100

Określa, jak blisko dopasowanie musi być do rozmytej lokalizacji (określonej przez location). Dokładne dopasowanie litery, które jest oddalone o distance znaków od rozmytej lokalizacji, zostałoby ocenione jako całkowite niedopasowanie. Odległość 0 wymaga, aby dopasowanie znajdowało się w dokładnej określonej lokalizacji. Odległość 1000 wymagałaby idealnego dopasowania, aby znaleźć się w obrębie 800 znaków od lokalizacji przy progu 0,8.

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

-   **Typ:** `number`
-   **Obowiązkowe:** nie
-   **Domyślnie:** 0

Określa w przybliżeniu, gdzie w tekście oczekuje się znalezienia wzorca.

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

-   **Typ:** `number`
-   **Obowiązkowe:** nie
-   **Domyślnie:** 0.6

W jakim momencie algorytm dopasowujący rezygnuje. Próg 0 wymaga idealnego dopasowania (zarówno liter, jak i lokalizacji), próg 1.0 dopasowałby wszystko.

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

-   **Typ:** `boolean`
-   **Obowiązkowe:** nie
-   **Domyślnie:** false

Czy wyszukiwanie powinno rozróżniać wielkość liter.

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

-   **Typ:** `number`
-   **Obowiązkowe:** nie
-   **Domyślnie:** 2

Tylko dopasowania, których długość przekracza tę wartość, zostaną zwrócone. (Na przykład, jeśli chcesz zignorować pojedyncze znaki w wyniku, ustaw na 2)

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

-   **Typ:** `number`
-   **Obowiązkowe:** nie
-   **Domyślnie:** false

Gdy `true`, funkcja dopasowująca będzie kontynuować do końca wzorca wyszukiwania, nawet jeśli idealne dopasowanie zostało już zlokalizowane w ciągu.

##### Przykład

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```