---
id: ocr-get-text
title: ocrGetText
---

Получить текст с изображения.

### Использование

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## Вывод

### Результат

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### Логи

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## Опции

### `contrast`

-   **Тип:** `number`
-   **Обязательный:** нет
-   **По умолчанию:** `0.25`

Чем выше контраст, тем темнее изображение и наоборот. Это может помочь найти текст на изображении. Принимает значения от `-1` до `1`.

#### Пример

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

-   **Тип:** `number`
-   **Обязательный:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Это область поиска на экране, где OCR должен искать текст. Это может быть элемент или прямоугольник, содержащий `x`, `y`, `width` и `height`

#### Пример

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// ИЛИ
await browser.ocrGetText({ haystack: await $("elementSelector") });

// ИЛИ
await browser.ocrGetText({
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
-   **Обязательный:** Нет
-   **По умолчанию:** `eng`

Язык, который Tesseract будет распознавать. Дополнительную информацию можно найти [здесь](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), а поддерживаемые языки можно найти [здесь](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Пример

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // Использовать голландский язык
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```