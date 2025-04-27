---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

Очікування відображення конкретного тексту на екрані.

## Використання

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## Вивід

### Логи

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed використовує ocrGetElementPositionByText під капотом, тому ви бачите команду ocrGetElementPositionByText у логах
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Опції

### `text`

-   **Тип:** `string`
-   **Обов'язково:** так

Текст, який ви хочете знайти для кліку.

#### Приклад

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** 18000 (18 секунд)

Час у мілісекундах. Зверніть увагу, що процес OCR може зайняти деякий час, тому не встановлюйте занадто низьке значення.

#### Приклад

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // очікування 25 секунд
});
```

### `timeoutMsg`

-   **Тип:** `string`
-   **Обов'язково:** ні
-   **За замовчуванням:** `Could not find the text "{selector}" within the requested time.`

Перевизначає стандартне повідомлення про помилку.

#### Приклад

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** `0.25`

Чим вищий контраст, тим темніше зображення, і навпаки. Це може допомогти знайти текст на зображенні. Приймає значення від `-1` до `1`.

#### Приклад

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **Тип:** `number`
-   **Обов'язково:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Це область пошуку на екрані, де OCR повинен шукати текст. Це може бути елемент або прямокутник, що містить `x`, `y`, `width` та `height`.

#### Приклад

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// АБО
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// АБО
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

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `eng`

Мова, яку Tesseract буде розпізнавати. Більше інформації можна знайти [тут](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), а підтримувані мови можна знайти [тут](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Приклад

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // Використання голландської мови
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Ви можете змінити нечітку логіку для пошуку тексту за допомогою наступних опцій. Це може допомогти знайти кращий збіг.

#### `fuzzyFindOptions.distance`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** 100

Визначає, наскільки близьким має бути збіг до нечіткого розташування (вказаного параметром location). Точний збіг літер, який знаходиться на відстані символів від нечіткого розташування, оцінюватиметься як повна невідповідність. Відстань 0 вимагає, щоб збіг був у точному вказаному місці. Відстань 1000 буде вимагати ідеального збігу в межах 800 символів від розташування для пошуку з використанням порогу 0.8.

##### Приклад

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** 0

Визначає приблизно, де в тексті очікується знайти шаблон.

##### Приклад

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** 0.6

У якому моменті алгоритм відповідності здається. Поріг 0 вимагає ідеального збігу (як букв, так і розташування), поріг 1.0 буде відповідати чому завгодно.

##### Приклад

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Тип:** `boolean`
-   **Обов'язково:** ні
-   **За замовчуванням:** false

Чи має пошук бути чутливим до регістру.

##### Приклад

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** 2

Будуть повернуті лише збіги, довжина яких перевищує це значення. (Наприклад, якщо ви хочете ігнорувати однолітерні збіги в результаті, встановіть його на 2)

##### Приклад

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** false

Коли `true`, функція відповідності продовжить до кінця шаблону пошуку, навіть якщо ідеальний збіг вже був знайдений у рядку.

##### Приклад

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```