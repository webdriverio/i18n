---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

Ожидание отображения определенного текста на экране.

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
# ocrWaitForTextDisplayed использует ocrGetElementPositionByText под капотом, поэтому вы видите команду ocrGetElementPositionByText в логах
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Опции

### `text`

-   **Тип:** `string`
-   **Обязательно:** да

Текст, который вы хотите найти для клика.

#### Пример

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** 18000 (18 секунд)

Время в миллисекундах. Имейте в виду, что процесс OCR может занять некоторое время, поэтому не устанавливайте слишком низкое значение.

#### Пример

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // ожидание 25 секунд
});
```

### `timeoutMsg`

-   **Тип:** `string`
-   **Обязательно:** нет
-   **По умолчанию:** `Could not find the text "{selector}" within the requested time.`

Переопределяет стандартное сообщение об ошибке.

#### Пример

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** `0.25`

Чем выше контраст, тем темнее изображение и наоборот. Это может помочь найти текст на изображении. Принимает значения от `-1` до `1`.

#### Пример

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **Тип:** `number`
-   **Обязательно:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Это область поиска на экране, где OCR должен искать текст. Это может быть элемент или прямоугольник, содержащий `x`, `y`, `width` и `height`.

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

-   **Тип:** `string`
-   **Обязательно:** Нет
-   **По умолчанию:** `eng`

Язык, который будет распознавать Tesseract. Более подробную информацию можно найти [здесь](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), а поддерживаемые языки можно найти [здесь](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Пример

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // Используйте голландский язык
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Вы можете изменить нечеткую логику для поиска текста с помощью следующих опций. Это может помочь найти лучшее соответствие.

#### `fuzzyFindOptions.distance`

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** 100

Определяет, насколько близко соответствие должно быть к нечеткому местоположению (указанному в location). Точное соответствие буквы, которое находится на расстоянии символов от нечеткого местоположения, будет оцениваться как полное несоответствие. Расстояние 0 требует, чтобы соответствие находилось в точно указанном месте. Расстояние 1000 требует идеального соответствия в пределах 800 символов от местоположения, чтобы быть найденным, используя порог 0.8.

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

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** 0

Определяет примерно, где в тексте ожидается найти шаблон.

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

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** 0.6

В какой момент алгоритм сопоставления сдается. Порог 0 требует идеального соответствия (как букв, так и местоположения), порог 1.0 будет соответствовать чему угодно.

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

-   **Тип:** `boolean`
-   **Обязательно:** нет
-   **По умолчанию:** false

Должен ли поиск учитывать регистр.

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

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** 2

Будут возвращены только соответствия, длина которых превышает это значение. (Например, если вы хотите игнорировать совпадения одиночных символов в результате, установите значение 2)

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

-   **Тип:** `number`
-   **Обязательно:** нет
-   **По умолчанию:** false

Когда `true`, функция сопоставления будет продолжаться до конца шаблона поиска, даже если идеальное соответствие уже было найдено в строке.

##### Пример

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```