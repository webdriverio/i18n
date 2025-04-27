---
id: ocr-set-value
title: ocrSetValue
---

Надсилає послідовність натискань клавіш елементу. Це:

-   автоматично виявляє елемент
-   встановлює фокус на поле, натискаючи на нього
-   встановлює значення в полі

Команда шукатиме наданий текст і спробує знайти збіг на основі нечіткої логіки від [Fuse.js](https://fusejs.io/). Це означає, що якщо ви вкажете селектор з помилкою, або знайдений текст може не бути 100% збігом, він все одно спробує повернути вам елемент. Дивіться [логи](#logs) нижче.

## Використання

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## Виведення

### Логи

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## Опції

### `text`

-   **Тип:** `string`
-   **Обов'язково:** так

Текст, який ви хочете знайти, щоб клікнути.

#### Приклад

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **Тип:** `string`
-   **Обов'язково:** так

Значення для додавання.

#### Приклад

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **Тип:** `boolean`
-   **Обов'язково:** ні
-   **За замовчуванням:** `false`

Якщо значення також потрібно надіслати в поле введення. Це означає, що в кінці рядка буде надіслано "ENTER".

#### Приклад

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** `500` мілісекунд

Це тривалість кліку. За бажанням ви також можете створити "довгий клік", збільшивши час.

#### Приклад

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // Це 3 секунди
});
```

### `contrast`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** `0.25`

Чим вищий контраст, тим темніше зображення, і навпаки. Це може допомогти знайти текст на зображенні. Приймає значення від `-1` до `1`.

#### Приклад

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **Тип:** `number`
-   **Обов'язково:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Це область пошуку на екрані, де OCR повинен шукати текст. Це може бути елемент або прямокутник, що містить `x`, `y`, `width` і `height`

#### Приклад

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// АБО
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// АБО
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

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `eng`

Мова, яку Tesseract розпізнаватиме. Більше інформації можна знайти [тут](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), а підтримувані мови - [тут](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Приклад

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Використовувати голландську мову
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Тип:** `object`
-   **Обов'язково:** ні

Ви можете клікнути на екрані відносно елемента, що відповідає. Це можна зробити на основі відносних пікселів `above`, `right`, `below` або `left` від елемента, що відповідає

:::note

Допускаються наступні комбінації

-   одиночні властивості
-   `above` + `left` або `above` + `right`
-   `below` + `left` або `below` + `right`

Наступні комбінації **НЕ** допускаються

-   `above` плюс `below`
-   `left` плюс `right`

:::

#### `relativePosition.above`

-   **Тип:** `number`
-   **Обов'язково:** ні

Клікнути x пікселів `вище` відповідного елемента.

##### Приклад

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

-   **Тип:** `number`
-   **Обов'язково:** ні

Клікнути x пікселів `праворуч` від відповідного елемента.

##### Приклад

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

-   **Тип:** `number`
-   **Обов'язково:** ні

Клікнути x пікселів `нижче` відповідного елемента.

##### Приклад

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

-   **Тип:** `number`
-   **Обов'язково:** ні

Клікнути x пікселів `ліворуч` від відповідного елемента.

##### Приклад

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

Ви можете змінити нечітку логіку для пошуку тексту за допомогою наступних опцій. Це може допомогти знайти кращий збіг

#### `fuzzyFindOptions.distance`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** 100

Визначає, наскільки близьким має бути збіг до нечіткого розташування (визначеного розташуванням). Точний збіг літер, який віддалений на вказану кількість символів від нечіткого розташування, буде оцінено як повний незбіг. Відстань 0 вимагає, щоб збіг був точно у вказаному місці. Відстань 1000 вимагатиме, щоб ідеальний збіг був у межах 800 символів від місця розташування, щоб його знайти, використовуючи поріг 0,8.

##### Приклад

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

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** 0

Визначає приблизно, де в тексті очікується знайти шаблон.

##### Приклад

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

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** 0.6

У якій точці алгоритм зіставлення здається. Поріг 0 вимагає ідеального збігу (як літер, так і розташування), поріг 1.0 відповідатиме будь-чому.

##### Приклад

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

-   **Тип:** `boolean`
-   **Обов'язково:** ні
-   **За замовчуванням:** false

Чи повинен пошук бути чутливим до регістру.

##### Приклад

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

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** 2

Повертатимуться лише збіги, довжина яких перевищує це значення. (Наприклад, якщо ви хочете ігнорувати збіги з одним символом у результаті, встановіть його на 2)

##### Приклад

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

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** false

Коли `true`, функція зіставлення продовжуватиме пошук до кінця шаблону пошуку, навіть якщо ідеальний збіг вже знайдено в рядку.

##### Приклад

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```