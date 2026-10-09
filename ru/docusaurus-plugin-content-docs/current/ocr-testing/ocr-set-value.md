---
id: ocr-set-value
title: ocrSetValue
description: "Ввод текста в поле ввода, найденное по его видимому тексту, с помощью ocrSetValue, которая находит поле с использованием OCR и нечёткого сопоставления."
---

Отправляет последовательность нажатий клавиш элементу. Команда:

-   автоматически обнаруживает элемент
-   устанавливает фокус на поле, кликая по нему
-   вводит значение в поле

Команда ищет указанный текст и пытается найти совпадение на основе нечёткой логики (Fuzzy Logic) из [Fuse.js](https://fusejs.io/). Это означает, что даже если вы укажете селектор с опечаткой или найденный текст совпадёт не на 100%, команда всё равно попытается вернуть вам элемент. См. [логи](#logs) ниже.

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

## Параметры

### `text`

<Option type="string" required="yes">

Текст, который нужно найти, чтобы кликнуть по нему.

</Option>
#### Пример

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

<Option type="string" required="yes">

Значение, которое нужно ввести.

</Option>
#### Пример

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

<Option type="boolean" default="false" required="no">

Нужно ли также отправить значение в поле ввода. Это означает, что в конце строки будет отправлено нажатие "ENTER".

</Option>
#### Пример

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

Длительность клика. При желании можно выполнить «долгий клик», увеличив это время.

</Option>
#### Пример

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // Это 3 секунды
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Чем выше контрастность, тем темнее изображение, и наоборот. Это может помочь найти текст на изображении. Принимает значения от `-1` до `1`.

</Option>
#### Пример

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Область поиска на экране, в которой OCR должен искать текст. Это может быть элемент или прямоугольник, содержащий `x`, `y`, `width` и `height`

</Option>
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

<Option type="string" default="eng" required="No">

Язык, который будет распознавать Tesseract. Дополнительную информацию можно найти [здесь](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), а список поддерживаемых языков — [здесь](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Пример

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Использовать нидерландский язык
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

Можно кликнуть по экрану относительно найденного элемента. Это делается на основе относительного смещения в пикселях `above` (выше), `right` (правее), `below` (ниже) или `left` (левее) от найденного элемента

:::note

Допустимы следующие комбинации

-   одиночные свойства
-   `above` + `left` или `above` + `right`
-   `below` + `left` или `below` + `right`

Следующие комбинации **НЕ** допускаются

-   `above` вместе с `below`
-   `left` вместе с `right`

:::

</Option>
#### `relativePosition.above`

<Option type="number" required="no">

Кликнуть на x пикселей выше (`above`) найденного элемента.

</Option>
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

<Option type="number" required="no">

Кликнуть на x пикселей правее (`right`) найденного элемента.

</Option>
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

<Option type="number" required="no">

Кликнуть на x пикселей ниже (`below`) найденного элемента.

</Option>
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

<Option type="number" required="no">

Кликнуть на x пикселей левее (`left`) найденного элемента.

</Option>
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

С помощью следующих параметров можно изменить нечёткую логику поиска текста. Это может помочь найти более точное совпадение

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Определяет, насколько близко совпадение должно находиться к предполагаемой позиции (заданной параметром location). Точное совпадение букв, находящееся на расстоянии distance символов от предполагаемой позиции, будет оценено как полное несовпадение. При distance, равном 0, совпадение должно находиться точно в указанной позиции. При distance, равном 1000, для порога (threshold) 0.8 идеальное совпадение должно находиться в пределах 800 символов от позиции.

</Option>
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

<Option type="number" default="0" required="no">

Определяет, где примерно в тексте ожидается найти шаблон.

</Option>
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

<Option type="number" default="0.6" required="no">

В какой момент алгоритм сопоставления прекращает поиск. Порог 0 требует идеального совпадения (как букв, так и позиции), а порог 1.0 совпадёт с чем угодно.

</Option>
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

<Option type="boolean" default="false" required="no">

Должен ли поиск учитывать регистр.

</Option>
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

<Option type="number" default="2" required="no">

Будут возвращены только совпадения, длина которых превышает это значение. (Например, если вы хотите игнорировать в результатах совпадения из одного символа, установите значение 2)

</Option>
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

<Option type="number" default="false" required="no">

Если `true`, функция сопоставления продолжит работу до конца шаблона поиска, даже если идеальное совпадение в строке уже найдено.

</Option>
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