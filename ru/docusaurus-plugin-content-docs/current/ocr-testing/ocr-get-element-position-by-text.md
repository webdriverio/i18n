---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

Получение позиции текста на экране. Команда будет искать предоставленный текст и пытаться найти совпадение на основе нечеткой логики из [Fuse.js](https://fusejs.io/). Это значит, что если вы предоставите селектор с опечаткой, или найденный текст может не совпадать на 100%, команда все равно попытается вернуть вам элемент. Смотрите [логи](#logs) ниже.

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
# По-прежнему находит совпадение, хотя мы искали "Start3d", а найденный текст был "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Опции

### `text`

-   **Тип:** `string`
-   **Обязательно:** да

Текст, который вы хотите найти для клика.

#### Пример

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** `0.25`

Чем выше контраст, тем темнее изображение и наоборот. Это может помочь найти текст на изображении. Принимает значения от `-1` до `1`.

#### Пример

```js
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// ИЛИ
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// ИЛИ
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
-   **Обязательно:** Нет
-   **По умолчанию:** `eng`

Язык, который Tesseract будет распознавать. Дополнительную информацию можно найти [здесь](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), а поддерживаемые языки можно найти [здесь](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Пример

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // Использовать голландский язык
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Вы можете изменить нечеткую логику для поиска текста с помощью следующих опций. Это может помочь найти лучшее совпадение

#### `fuzzyFindOptions.distance`

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** 100

Определяет, насколько близко совпадение должно быть к нечеткому местоположению (указанному в location). Точное совпадение букв, которое находится на расстоянии символов от нечеткого местоположения, будет считаться полным несоответствием. Расстояние 0 требует, чтобы совпадение было в точном указанном местоположении. Расстояние 1000 потребовало бы, чтобы идеальное совпадение находилось в пределах 800 символов от местоположения, чтобы быть найденным с использованием порога 0.8.

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

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** 0

Определяет примерно, где в тексте ожидается найти шаблон.

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

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** 0.6

В какой момент алгоритм сопоставления отказывается. Порог 0 требует идеального совпадения (как букв, так и местоположения), порог 1.0 будет соответствовать чему угодно.

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

-   **Тип:** `boolean`
-   **Обязательно:** нет
-   **По умолчанию:** false

Должен ли поиск учитывать регистр.

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

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** 2

Будут возвращены только совпадения, длина которых превышает это значение. (Например, если вы хотите игнорировать совпадения из одного символа в результате, установите значение 2)

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

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** false

Если `true`, функция сопоставления будет продолжать до конца шаблона поиска, даже если идеальное совпадение уже найдено в строке.

##### Пример

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```