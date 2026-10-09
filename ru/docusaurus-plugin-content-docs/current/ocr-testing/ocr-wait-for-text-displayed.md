---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
description: "Ожидание, пока определённый текст не отобразится на экране, с помощью ocrWaitForTextDisplayed из OCR-сервиса."
---

Ожидание отображения определённого текста на экране.

## Использование

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## Вывод

### Логи

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed под капотом использует ocrGetElementPositionByText, поэтому в логах вы видите команду ocrGetElementPositionByText
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Параметры

### `text`

<Option type="string" required="yes">

Текст, который вы хотите найти, чтобы кликнуть по нему.

</Option>
#### Пример

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

<Option type="number" default="18000 (18 seconds)" required="no">

Время в миллисекундах. Имейте в виду, что процесс OCR может занять некоторое время, поэтому не устанавливайте слишком маленькое значение.

</Option>
#### Пример

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // ждать 25 секунд
});
```

### `timeoutMsg`

<Option type="string" default={`Could not find the text "{selector}" within the requested time.`} required="no">

Переопределяет сообщение об ошибке по умолчанию.

</Option>
#### Пример

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Чем выше контрастность, тем темнее изображение, и наоборот. Это может помочь найти текст на изображении. Принимает значения от `-1` до `1`.

</Option>
#### Пример

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Это область поиска на экране, в которой OCR должен искать текст. Это может быть элемент или прямоугольник, содержащий `x`, `y`, `width` и `height`

</Option>
#### Пример

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// ИЛИ
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// ИЛИ
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

<Option type="string" default="eng" required="No">

Язык, который будет распознавать Tesseract. Дополнительную информацию можно найти [здесь](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), а список поддерживаемых языков — [здесь](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Пример

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // Использовать нидерландский язык
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Вы можете изменить логику нечёткого поиска текста с помощью следующих параметров. Это может помочь найти более точное совпадение

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Определяет, насколько близко совпадение должно находиться к нечёткой позиции (заданной параметром location). Точное совпадение букв, находящееся на расстоянии distance символов от нечёткой позиции, будет оценено как полное несовпадение. Значение distance, равное 0, требует, чтобы совпадение находилось точно в указанной позиции. Значение distance, равное 1000, потребует, чтобы идеальное совпадение находилось в пределах 800 символов от позиции, чтобы оно было найдено при пороге (threshold) 0.8.

</Option>
##### Пример

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

<Option type="number" default="0.6" required="no">

Момент, в который алгоритм сопоставления прекращает поиск. Порог 0 требует идеального совпадения (как букв, так и позиции), порог 1.0 будет соответствовать чему угодно.

</Option>
##### Пример

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```