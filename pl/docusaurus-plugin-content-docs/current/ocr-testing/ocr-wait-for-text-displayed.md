---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

Oczekiwanie na wyświetlenie określonego tekstu na ekranie.

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
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Opcje

### `text`

-   **Typ:** `string`
-   **Obowiązkowe:** tak

Tekst, którego szukasz, aby na niego kliknąć.

#### Przykład

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **Typ:** `number`
-   **Obowiązkowe:** nie
-   **Domyślnie:** 18000 (18 sekund)

Czas w milisekundach. Pamiętaj, że proces OCR może zająć trochę czasu, więc nie ustawiaj zbyt niskiej wartości.

#### Przykład

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // czekaj przez 25 sekund
});
```

### `timeoutMsg`

-   **Typ:** `string`
-   **Obowiązkowe:** nie
-   **Domyślnie:** `Could not find the text "{selector}" within the requested time.`

Zastępuje domyślny komunikat o błędzie.

#### Przykład

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **Typ:** `number`
-   **Obowiązkowe:** nie
-   **Domyślnie:** `0.25`

Im wyższy kontrast, tym ciemniejszy obraz i odwrotnie. Może to pomóc w znalezieniu tekstu na obrazie. Akceptuje wartości między `-1` a `1`.

#### Przykład

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **Typ:** `number`
-   **Obowiązkowe:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

To jest obszar wyszukiwania na ekranie, w którym OCR ma szukać tekstu. Może to być element lub prostokąt zawierający `x`, `y`, `width` i `height`

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

-   **Typ:** `string`
-   **Obowiązkowe:** Nie
-   **Domyślnie:** `eng`

Język, który Tesseract będzie rozpoznawać. Więcej informacji można znaleźć [tutaj](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), a obsługiwane języki można znaleźć [tutaj](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Przykład

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // Użyj holenderskiego jako języka
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Możesz zmienić logikę dopasowania rozmytego (fuzzy) do wyszukiwania tekstu za pomocą następujących opcji. Może to pomóc znaleźć lepsze dopasowanie.

#### `fuzzyFindOptions.distance`

-   **Typ:** `number`
-   **Obowiązkowe:** nie
-   **Domyślnie:** 100

Określa, jak blisko dopasowanie musi być do lokalizacji rozmytej (określonej przez location). Dokładne dopasowanie litery, które jest oddalone o distance znaków od lokalizacji rozmytej, byłoby ocenione jako całkowite niedopasowanie. Odległość 0 wymaga, aby dopasowanie było w dokładnej określonej lokalizacji. Odległość 1000 wymagałaby idealnego dopasowania w obrębie 800 znaków od lokalizacji, aby zostać znalezionym przy progu 0,8.

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

-   **Typ:** `number`
-   **Obowiązkowe:** nie
-   **Domyślnie:** 0

Określa w przybliżeniu, gdzie w tekście oczekuje się znalezienia wzorca.

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

-   **Typ:** `number`
-   **Obowiązkowe:** nie
-   **Domyślnie:** 0.6

W którym momencie algorytm dopasowania poddaje się. Próg 0 wymaga idealnego dopasowania (zarówno liter, jak i lokalizacji), próg 1.0 dopasowałby wszystko.

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

-   **Typ:** `boolean`
-   **Obowiązkowe:** nie
-   **Domyślnie:** false

Czy wyszukiwanie powinno rozróżniać wielkość liter.

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

-   **Typ:** `number`
-   **Obowiązkowe:** nie
-   **Domyślnie:** 2

Tylko dopasowania, których długość przekracza tę wartość, zostaną zwrócone. (Na przykład, jeśli chcesz zignorować jednoelementowe dopasowania w wyniku, ustaw wartość na 2)

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

-   **Typ:** `number`
-   **Obowiązkowe:** nie
-   **Domyślnie:** false

Gdy `true`, funkcja dopasowywania będzie kontynuować do końca wzorca wyszukiwania, nawet jeśli idealne dopasowanie zostało już zlokalizowane w ciągu.

##### Przykład

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```