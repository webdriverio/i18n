---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
description: "Получение позиции текста на экране с помощью ocrGetElementPositionByText, используя OCR и нечёткое сопоставление для его поиска."
---

Получает позицию текста на экране. Команда выполнит поиск указанного текста и попытается найти совпадение на основе нечёткой логики (Fuzzy Logic) из [Fuse.js](https://fusejs.io/). Это означает, что даже если вы укажете селектор с опечаткой или найденный текст не будет совпадать на 100%, команда всё равно попытается вернуть вам элемент. Смотрите [логи](#logs) ниже.

## Использование

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## Вывод

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
# Совпадение всё равно найдено, хотя мы искали "Start3d", а найденный текст был "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Параметры

### `text`

<Option type="string" required="yes">

Текст, который вы хотите найти, чтобы нажать на него.

</Option>
#### Пример

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

<Option type="number" default="0.25" required="no">

Чем выше контрастность, тем темнее изображение, и наоборот. Это может помочь найти текст на изображении. Принимает значения от `-1` до `1`.

</Option>
#### Пример

```js
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OR
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

<Option type="string" default="eng" required="No">

Язык, который будет распознавать Tesseract. Дополнительную информацию можно найти [здесь](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), а список поддерживаемых языков — [здесь](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Пример

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // Использовать нидерландский язык
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Вы можете изменить нечёткую логику поиска текста с помощью следующих параметров. Это может помочь найти более точное совпадение

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Определяет, насколько близко совпадение должно находиться к нечёткой позиции (заданной параметром location). Точное буквенное совпадение, находящееся на расстоянии distance символов от нечёткой позиции, будет оценено как полное несовпадение. Значение distance, равное 0, требует, чтобы совпадение находилось точно в указанной позиции. Значение distance, равное 1000, потребует, чтобы точное совпадение находилось в пределах 800 символов от позиции, чтобы быть найденным при пороге (threshold) 0.8.

</Option>
##### Пример

```js
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

<Option type="number" default="0.6" required="no">

Определяет, в какой момент алгоритм сопоставления прекращает поиск. Порог 0 требует точного совпадения (как букв, так и позиции), порог 1.0 будет соответствовать чему угодно.

</Option>
##### Пример

```js
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

<Option type="number" default="2" required="no">

Будут возвращены только те совпадения, длина которых превышает это значение. (Например, если вы хотите игнорировать в результате совпадения из одного символа, установите значение 2)

</Option>
##### Пример

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

<Option type="number" default="false" required="no">

При значении `true` функция сопоставления продолжит работу до конца шаблона поиска, даже если точное совпадение уже было найдено в строке.

</Option>
##### Пример

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```