---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

Отримання позиції тексту на екрані. Команда шукатиме наданий текст і спробує знайти відповідність на основі нечіткої логіки [Fuse.js](https://fusejs.io/). Це означає, що навіть якщо ви надасте селектор з помилкою, або знайдений текст не відповідає на 100%, команда все одно спробує повернути вам елемент. Дивіться [логи](#logs) нижче.

## Використання

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## Вивід

### Результат

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

### Логи

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Опції

### `text`

-   **Тип:** `string`
-   **Обов'язково:** так

Текст, який ви хочете знайти, щоб клікнути.

#### Приклад

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** `0.25`

Чим вищий контраст, тим темніше зображення і навпаки. Це може допомогти знайти текст на зображенні. Приймає значення від `-1` до `1`.

#### Приклад

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Тип:** `number`
-   **Обов'язково:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Це область пошуку на екрані, де OCR повинен шукати текст. Це може бути елемент або прямокутник, що містить `x`, `y`, `width` та `height`

#### Приклад

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// АБО
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// АБО
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

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `eng`

Мова, яку Tesseract буде розпізнавати. Більше інформації можна знайти [тут](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), а підтримувані мови можна знайти [тут](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Приклад

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // Використовувати голландську мову
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Ви можете змінити нечітку логіку для пошуку тексту за допомогою наступних опцій. Це може допомогти знайти кращу відповідність

#### `fuzzyFindOptions.distance`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** 100

Визначає, наскільки близьким повинно бути збіг до нечіткого місцезнаходження (вказаного параметром location). Точний збіг літер, який знаходиться на відстані символів від нечіткого місцезнаходження, оцінюється як повна невідповідність. Відстань 0 вимагає, щоб збіг був у точному вказаному місці. Відстань 1000 вимагатиме ідеального збігу в межах 800 символів від місцезнаходження, щоб він був знайдений з порогом 0,8.

##### Приклад

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** 0

Визначає приблизно, де в тексті очікується знаходження шаблону.

##### Приклад

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** 0.6

На якому етапі алгоритм зіставлення здається. Поріг 0 вимагає ідеального збігу (як літер, так і місця розташування), поріг 1.0 відповідатиме чому завгодно.

##### Приклад

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Тип:** `boolean`
-   **Обов'язково:** ні
-   **За замовчуванням:** false

Чи повинен пошук враховувати регістр.

##### Приклад

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** 2

Будуть повернуті лише ті збіги, довжина яких перевищує це значення. (Наприклад, якщо ви хочете ігнорувати одиничні символи в результаті, встановіть значення 2)

##### Приклад

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** false

Коли `true`, функція зіставлення продовжуватиме пошук до кінця шаблону пошуку, навіть якщо ідеальний збіг уже був знайдений у рядку.

##### Приклад

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```