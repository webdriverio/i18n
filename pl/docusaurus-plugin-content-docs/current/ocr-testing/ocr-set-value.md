---
id: ocr-set-value
title: ocrSetValue
---

Wysyła sekwencję naciśnięć klawiszy do elementu. Funkcja:

-   automatycznie wykrywa element
-   ustawia fokus na polu, klikając na niego
-   ustawia wartość w polu

Komenda wyszuka podany tekst i spróbuje znaleźć dopasowanie oparte na logice rozmytej z [Fuse.js](https://fusejs.io/). Oznacza to, że nawet jeśli podasz selektor z literówką lub znaleziony tekst nie będzie w 100% pasował, nadal spróbuje zwrócić element. Zobacz [logi](#logs) poniżej.

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

-   **Typ:** `string`
-   **Obowiązkowy:** tak

Tekst, którego szukasz, aby kliknąć.

#### Przykład

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **Typ:** `string`
-   **Obowiązkowy:** tak

Wartość do dodania.

#### Przykład

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **Typ:** `boolean`
-   **Obowiązkowy:** nie
-   **Domyślnie:** `false`

Czy wartość również powinna zostać przesłana do pola wprowadzania. Oznacza to, że na końcu ciągu zostanie wysłany klawisz "ENTER".

#### Przykład

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **Typ:** `number`
-   **Obowiązkowy:** nie
-   **Domyślnie:** `500` milisekund

To jest czas trwania kliknięcia. Jeśli chcesz, możesz również stworzyć "długie kliknięcie", zwiększając czas.

#### Przykład

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // To jest 3 sekundy
});
```

### `contrast`

-   **Typ:** `number`
-   **Obowiązkowy:** nie
-   **Domyślnie:** `0.25`

Im wyższy kontrast, tym ciemniejszy obraz i odwrotnie. Może to pomóc w znalezieniu tekstu na obrazie. Akceptuje wartości między `-1` a `1`.

#### Przykład

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **Typ:** `number`
-   **Obowiązkowy:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Jest to obszar wyszukiwania na ekranie, w którym OCR ma szukać tekstu. Może to być element lub prostokąt zawierający `x`, `y`, `width` i `height`.

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

-   **Typ:** `string`
-   **Obowiązkowy:** Nie
-   **Domyślnie:** `eng`

Język, który Tesseract rozpozna. Więcej informacji można znaleźć [tutaj](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), a obsługiwane języki można znaleźć [tutaj](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Przykład

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Użyj holenderskiego jako języka
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Typ:** `object`
-   **Obowiązkowy:** nie

Możesz kliknąć na ekranie względem pasującego elementu. Można to zrobić na podstawie względnych pikseli `above`, `right`, `below` lub `left` od pasującego elementu.

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
-   **Obowiązkowy:** nie

Kliknij x pikseli `above` od pasującego elementu.

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

-   **Typ:** `number`
-   **Obowiązkowy:** nie

Kliknij x pikseli `right` od pasującego elementu.

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

-   **Typ:** `number`
-   **Obowiązkowy:** nie

Kliknij x pikseli `below` od pasującego elementu.

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

-   **Typ:** `number`
-   **Obowiązkowy:** nie

Kliknij x pikseli `left` od pasującego elementu.

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

Możesz zmienić logikę rozmytą do wyszukiwania tekstu za pomocą następujących opcji. Może to pomóc znaleźć lepsze dopasowanie.

#### `fuzzyFindOptions.distance`

-   **Typ:** `number`
-   **Obowiązkowy:** nie
-   **Domyślnie:** 100

Określa, jak blisko dopasowania musi być do rozmytej lokalizacji (określonej przez location). Dokładne dopasowanie litery, które jest oddalone o distance znaków od rozmytej lokalizacji, byłoby oceniane jako całkowite niedopasowanie. Odległość 0 wymaga, aby dopasowanie było w dokładnej określonej lokalizacji. Odległość 1000 wymagałaby idealnego dopasowania w odległości 800 znaków od lokalizacji, aby zostało znalezione przy użyciu progu 0,8.

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

-   **Typ:** `number`
-   **Obowiązkowy:** nie
-   **Domyślnie:** 0

Określa w przybliżeniu, gdzie w tekście ma być znaleziony wzorzec.

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

-   **Typ:** `number`
-   **Obowiązkowy:** nie
-   **Domyślnie:** 0.6

W jakim momencie algorytm dopasowujący się poddaje. Próg 0 wymaga idealnego dopasowania (zarówno liter, jak i lokalizacji), próg 1.0 dopasuje wszystko.

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

-   **Typ:** `boolean`
-   **Obowiązkowy:** nie
-   **Domyślnie:** false

Czy wyszukiwanie powinno rozróżniać wielkość liter.

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

-   **Typ:** `number`
-   **Obowiązkowy:** nie
-   **Domyślnie:** 2

Tylko dopasowania, których długość przekracza tę wartość, zostaną zwrócone. (Na przykład, jeśli chcesz zignorować pojedyncze dopasowania znaków w wyniku, ustaw to na 2)

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

-   **Typ:** `number`
-   **Obowiązkowy:** nie
-   **Domyślnie:** false

Gdy `true`, funkcja dopasowująca będzie kontynuować do końca wzorca wyszukiwania, nawet jeśli idealne dopasowanie zostało już zlokalizowane w ciągu.

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