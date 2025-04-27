---
id: ocr-click-on-text
title: ocrClickOnText
---

Клик по элементу на основе предоставленных текстов. Команда будет искать предоставленный текст и пытаться найти совпадение на основе нечеткой логики из [Fuse.js](https://fusejs.io/). Это означает, что если вы предоставите селектор с опечаткой, или найденный текст может не совпадать на 100%, он все равно попытается вернуть вам элемент. Смотрите [логи](#logs) ниже.

## Использование

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Вывод

### Логи

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Изображение

Вы найдете изображение в вашей (по умолчанию)[`imagesFolder`](./getting-started#imagesfolder) с целью, показывающей, где модуль кликнул.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Опции

### `text`

-   **Тип:** `string`
-   **Обязательно:** да

Текст, который вы хотите найти для клика.

#### Пример

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** `500` миллисекунд

Это продолжительность клика. При желании вы также можете создать "долгий клик", увеличив время.

#### Пример

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // Это 3 секунды
});
```

### `contrast`

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** `0.25`

Чем выше контраст, тем темнее изображение и наоборот. Это может помочь найти текст на изображении. Принимает значения от `-1` до `1`.

#### Пример

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Тип:** `number`
-   **Обязательно:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Это область поиска на экране, где OCR должен искать текст. Это может быть элемент или прямоугольник, содержащий `x`, `y`, `width` и `height`

#### Пример

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// ИЛИ
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// ИЛИ
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
-   **Обязательно:** Нет
-   **По умолчанию:** `eng`

Язык, который Tesseract будет распознавать. Больше информации можно найти [здесь](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), а поддерживаемые языки можно найти [здесь](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Пример

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Использовать голландский как язык
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Тип:** `object`
-   **Обязательно:** нет

Вы можете кликнуть на экране относительно совпадающего элемента. Это можно сделать на основе относительных пикселей `above`, `right`, `below` или `left` от совпадающего элемента

:::note

Следующие комбинации разрешены

-   одиночные свойства
-   `above` + `left` или `above` + `right`
-   `below` + `left` или `below` + `right`

Следующие комбинации **НЕ** разрешены

-   `above` плюс `below`
-   `left` плюс `right`

:::

#### `relativePosition.above`

-   **Тип:** `number`
-   **Обязательно:** нет

Клик x пикселей `выше` совпадающего элемента.

##### Пример

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
-   **Обязательно:** нет

Клик x пикселей `справа` от совпадающего элемента.

##### Пример

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
-   **Обязательно:** нет

Клик x пикселей `ниже` совпадающего элемента.

##### Пример

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
-   **Обязательно:** нет

Клик x пикселей `слева` от совпадающего элемента.

##### Пример

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Вы можете изменить нечеткую логику для поиска текста со следующими опциями. Это может помочь найти лучшее совпадение

#### `fuzzyFindOptions.distance`

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** 100

Определяет, насколько близким должно быть совпадение к нечеткому местоположению (указанному параметром location). Точное совпадение букв, которое находится на расстоянии "distance" символов от нечеткого местоположения, будет оцениваться как полное несоответствие. Расстояние 0 требует, чтобы совпадение было в точном указанном месте. Расстояние 1000 потребует идеального совпадения в пределах 800 символов от местоположения, чтобы оно было найдено при пороге 0.8.

##### Пример

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
-   **Обязательно:** нет
-   **По умолчанию:** 0

Определяет примерно, где в тексте ожидается найти шаблон.

##### Пример

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
-   **Обязательно:** нет
-   **По умолчанию:** 0.6

В какой момент алгоритм сопоставления сдается. Порог 0 требует идеального совпадения (как букв, так и местоположения), порог 1.0 будет соответствовать чему угодно.

##### Пример

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
-   **Обязательно:** нет
-   **По умолчанию:** false

Должен ли поиск быть чувствительным к регистру.

##### Пример

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
-   **Обязательно:** нет
-   **По умолчанию:** 2

Будут возвращены только совпадения, длина которых превышает это значение. (Например, если вы хотите игнорировать совпадения одиночных символов в результате, установите его на 2)

##### Пример

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
-   **Обязательно:** нет
-   **По умолчанию:** false

Когда `true`, функция сопоставления будет продолжать поиск до конца шаблона поиска, даже если идеальное совпадение уже было найдено в строке.

##### Пример

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```