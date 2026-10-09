---
id: ocr-click-on-text
title: ocrClickOnText
description: "Клик по элементу по его видимому тексту с помощью ocrClickOnText, который находит текст на экране с помощью OCR и нечёткого сопоставления."
---

Выполняет клик по элементу на основе предоставленного текста. Команда будет искать указанный текст и пытаться найти совпадение на основе нечёткой логики (Fuzzy Logic) из [Fuse.js](https://fusejs.io/). Это означает, что даже если вы укажете селектор с опечаткой или найденный текст не будет совпадать на 100%, команда всё равно попытается вернуть вам элемент. Смотрите [логи](#logs) ниже.

## Использование

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Вывод

### Логи

```log
# Совпадение всё равно найдено, хотя мы искали "Start3d", а найденный текст был "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Изображение

Вы найдёте изображение в вашей (по умолчанию) папке [`imagesFolder`](./getting-started#imagesfolder) с отметкой, показывающей, где модуль выполнил клик.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Опции

### `text`

<Option type="string" required="yes">

Текст, который вы хотите найти, чтобы кликнуть по нему.

</Option>
#### Пример

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

Это продолжительность клика. При желании вы также можете выполнить «долгий клик», увеличив время.

</Option>
#### Пример

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // Это 3 секунды
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Чем выше контрастность, тем темнее изображение, и наоборот. Это может помочь найти текст на изображении. Принимает значения от `-1` до `1`.

</Option>
#### Пример

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Это область поиска на экране, в которой OCR должен искать текст. Это может быть элемент или прямоугольник, содержащий `x`, `y`, `width` и `height`

</Option>
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

<Option type="string" default="eng" required="No">

Язык, который будет распознавать Tesseract. Дополнительную информацию можно найти [здесь](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), а список поддерживаемых языков — [здесь](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Пример

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Использовать голландский язык
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

Вы можете кликнуть по экрану относительно найденного элемента. Это можно сделать на основе относительного смещения в пикселях `above` (выше), `right` (правее), `below` (ниже) или `left` (левее) от найденного элемента

:::note

Допускаются следующие комбинации

-   отдельные свойства
-   `above` + `left` или `above` + `right`
-   `below` + `left` или `below` + `right`

Следующие комбинации **НЕ** допускаются

-   `above` вместе с `below`
-   `left` вместе с `right`

:::

</Option>
#### `relativePosition.above`

<Option type="number" required="no">

Клик на x пикселей выше (`above`) найденного элемента.

</Option>
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

<Option type="number" required="no">

Клик на x пикселей правее (`right`) найденного элемента.

</Option>
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

<Option type="number" required="no">

Клик на x пикселей ниже (`below`) найденного элемента.

</Option>
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

<Option type="number" required="no">

Клик на x пикселей левее (`left`) найденного элемента.

</Option>
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

Вы можете изменить нечёткую логику поиска текста с помощью следующих опций. Это может помочь найти более точное совпадение

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Определяет, насколько близко совпадение должно находиться к нечёткой позиции (заданной параметром location). Точное совпадение букв, находящееся на расстоянии distance символов от нечёткой позиции, будет оценено как полное несовпадение. Значение distance, равное 0, требует, чтобы совпадение находилось точно в указанной позиции. Значение distance, равное 1000, потребует, чтобы идеальное совпадение находилось в пределах 800 символов от позиции, чтобы быть найденным при пороге (threshold) 0.8.

</Option>
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

<Option type="number" default="0" required="no">

Определяет, где примерно в тексте ожидается нахождение шаблона.

</Option>
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

<Option type="number" default="0.6" required="no">

Определяет, в какой момент алгоритм сопоставления прекращает поиск. Порог 0 требует идеального совпадения (как букв, так и позиции), порог 1.0 будет соответствовать чему угодно.

</Option>
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

<Option type="boolean" default="false" required="no">

Должен ли поиск учитывать регистр.

</Option>
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

<Option type="number" default="2" required="no">

Будут возвращены только те совпадения, длина которых превышает это значение. (Например, если вы хотите игнорировать в результатах совпадения из одного символа, установите значение 2)

</Option>
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

<Option type="number" default="false" required="no">

Если `true`, функция сопоставления продолжит работу до конца шаблона поиска, даже если идеальное совпадение уже было найдено в строке.

</Option>
##### Пример

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```