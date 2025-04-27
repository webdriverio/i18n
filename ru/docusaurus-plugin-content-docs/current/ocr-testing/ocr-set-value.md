---
id: ocr-set-value
title: ocrSetValue
---

Отправляет последовательность нажатий клавиш элементу. Команда будет:

-   автоматически определять элемент
-   фокусироваться на поле, кликая по нему
-   устанавливать значение в поле

Команда будет искать предоставленный текст и пытаться найти соответствие на основе нечеткой логики из [Fuse.js](https://fusejs.io/). Это означает, что даже если вы предоставите селектор с опечаткой или найденный текст не будет 100% совпадением, он все равно попытается вернуть вам элемент. Смотрите [логи](#logs) ниже.

## Использование

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## Вывод

### Логи

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## Опции

### `text`

-   **Тип:** `string`
-   **Обязательно:** да

Текст, который вы хотите найти для клика.

#### Пример

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **Тип:** `string`
-   **Обязательно:** да

Значение, которое нужно добавить.

#### Пример

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **Тип:** `boolean`
-   **Обязательно:** нет
-   **По умолчанию:** `false`

Если значение также должно быть отправлено в поле ввода. Это означает, что в конце строки будет отправлен "ENTER".

#### Пример

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** `500` миллисекунд

Это продолжительность клика. При желании вы также можете создать "долгий клик", увеличив время.

#### Пример

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **Тип:** `number`
-   **Обязательно:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Это область поиска на экране, где OCR должен искать текст. Это может быть элемент или прямоугольник, содержащий `x`, `y`, `width` и `height`

#### Пример

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// ИЛИ
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// ИЛИ
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
-   **Обязательно:** Нет
-   **По умолчанию:** `eng`

Язык, который будет распознавать Tesseract. Больше информации можно найти [здесь](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), а поддерживаемые языки можно найти [здесь](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Пример

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Использовать голландский язык
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Тип:** `object`
-   **Обязательно:** нет

Вы можете кликнуть на экране относительно совпадающего элемента. Это можно сделать на основе относительных пикселей `above`, `right`, `below` или `left` от совпадающего элемента

:::note

Разрешены следующие комбинации

-   отдельные свойства
-   `above` + `left` или `above` + `right`
-   `below` + `left` или `below` + `right`

Следующие комбинации **НЕ** разрешены

-   `above` плюс `below`
-   `left` плюс `right`

:::

#### `relativePosition.above`

-   **Тип:** `number`
-   **Обязательно:** нет

Клик на x пикселей `выше` совпадающего элемента.

##### Пример

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
-   **Обязательно:** нет

Клик на x пикселей `правее` от совпадающего элемента.

##### Пример

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
-   **Обязательно:** нет

Клик на x пикселей `ниже` совпадающего элемента.

##### Пример

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
-   **Обязательно:** нет

Клик на x пикселей `левее` от совпадающего элемента.

##### Пример

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

Вы можете изменить нечеткую логику для поиска текста с помощью следующих опций. Это может помочь найти лучшее совпадение

#### `fuzzyFindOptions.distance`

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** 100

Определяет, насколько близким должно быть совпадение к нечеткому местоположению (указанному в location). Точное совпадение буквы, которое находится на расстоянии символов от нечеткого местоположения, будет оцениваться как полное несовпадение. Расстояние 0 требует, чтобы совпадение находилось в точном указанном месте. Расстояние 1000 потребует, чтобы идеальное совпадение находилось в пределах 800 символов от местоположения, чтобы быть найденным с использованием порога 0.8.

##### Пример

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
-   **Обязательно:** нет
-   **По умолчанию:** 0

Определяет примерно, где в тексте ожидается найти паттерн.

##### Пример

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
-   **Обязательно:** нет
-   **По умолчанию:** 0.6

На каком этапе алгоритм сопоставления сдается. Порог 0 требует идеального совпадения (как букв, так и местоположения), порог 1.0 будет соответствовать чему угодно.

##### Пример

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
-   **Обязательно:** нет
-   **По умолчанию:** false

Должен ли поиск быть чувствительным к регистру.

##### Пример

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
-   **Обязательно:** нет
-   **По умолчанию:** 2

Будут возвращены только совпадения, длина которых превышает это значение. (Например, если вы хотите игнорировать совпадения из одного символа в результате, установите его на 2)

##### Пример

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
-   **Обязательно:** нет
-   **По умолчанию:** false

Когда `true`, функция сопоставления будет продолжать до конца шаблона поиска, даже если идеальное совпадение уже было найдено в строке.

##### Пример

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```