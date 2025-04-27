---
id: ocr-click-on-text
title: ocrClickOnText
---

Клік на елемент на основі наданих текстів. Команда шукатиме наданий текст і спробує знайти відповідність на основі нечіткої логіки від [Fuse.js](https://fusejs.io/). Це означає, що якщо ви вказали селектор з опискою, або знайдений текст може не відповідати на 100%, він все одно спробує повернути вам елемент. Дивіться [логи](#logs) нижче.

## Використання

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Вивід

### Логи

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Зображення

Ви знайдете зображення у вашій (стандартній) [`imagesFolder`](./getting-started#imagesfolder) з мішенню, яка показує вам, де модуль клікнув.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Опції

### `text`

-   **Тип:** `string`
-   **Обов'язково:** так

Текст, який ви хочете знайти для кліку.

#### Приклад

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** `500` мілісекунд

Це тривалість кліку. Якщо хочете, ви також можете створити "довгий клік", збільшивши час.

#### Приклад

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // Це 3 секунди
});
```

### `contrast`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** `0.25`

Чим вищий контраст, тим темніше зображення і навпаки. Це може допомогти знайти текст на зображенні. Приймає значення від `-1` до `1`.

#### Приклад

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Тип:** `number`
-   **Обов'язково:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Це область пошуку на екрані, де OCR повинен шукати текст. Це може бути елемент або прямокутник, що містить `x`, `y`, `width` і `height`

#### Приклад

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// АБО
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// АБО
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

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `eng`

Мова, яку Tesseract розпізнаватиме. Більше інформації можна знайти [тут](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), а підтримувані мови можна знайти [тут](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Приклад

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Використовуйте голландську як мову
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Тип:** `object`
-   **Обов'язково:** ні

Ви можете клікнути на екран відносно відповідного елемента. Це можна зробити на основі відносних пікселів `above`, `right`, `below` або `left` від відповідного елемента

:::note

Дозволені наступні комбінації

-   одиночні властивості
-   `above` + `left` або `above` + `right`
-   `below` + `left` або `below` + `right`

Наступні комбінації **НЕ** дозволені

-   `above` плюс `below`
-   `left` плюс `right`

:::

#### `relativePosition.above`

-   **Тип:** `number`
-   **Обов'язково:** ні

Клікнути x пікселів `вище` відповідного елемента.

##### Приклад

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
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
await browser.ocrClickOnText({
    text: "WebdriverIO",
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
await browser.ocrClickOnText({
    text: "WebdriverIO",
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
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Ви можете змінити нечітку логіку для пошуку тексту з наступними параметрами. Це може допомогти знайти кращу відповідність

#### `fuzzyFindOptions.distance`

-   **Тип:** `number`
-   **Обов'язково:** ні
-   **За замовчуванням:** 100

Визначає, наскільки близько відповідність повинна бути до нечіткого місця розташування (вказаного в location). Точна відповідність літер, яка знаходиться на відстані символів від нечіткого місця розташування, оцінюватиметься як повна невідповідність. Відстань 0 вимагає, щоб відповідність була на точному вказаному місці. Відстань 1000 вимагатиме, щоб ідеальна відповідність була в межах 800 символів від місця розташування, щоб її можна було знайти з порогом 0.8.

##### Приклад

```js
await browser.ocrClickOnText({
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

Визначає приблизно, де в тексті очікується знайти шаблон.

##### Приклад

```js
await browser.ocrClickOnText({
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

На якому етапі алгоритм відповідності здається. Поріг 0 вимагає ідеальної відповідності (як літер, так і місця розташування), поріг 1.0 відповідатиме будь-чому.

##### Приклад

```js
await browser.ocrClickOnText({
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

Чи повинен пошук бути чутливим до регістру.

##### Приклад

```js
await browser.ocrClickOnText({
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

Будуть повернуті лише відповідності, довжина яких перевищує це значення. (Наприклад, якщо ви хочете ігнорувати відповідності одного символу в результаті, встановіть значення 2)

##### Приклад

```js
await browser.ocrClickOnText({
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

Коли `true`, функція пошуку продовжуватиме роботу до кінця шаблону пошуку, навіть якщо ідеальна відповідність вже знайдена в рядку.

##### Приклад

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```