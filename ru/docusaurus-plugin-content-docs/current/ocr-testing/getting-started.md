---
id: getting-started
title: Начало работы
---

## Установка

Самый простой способ — сохранить `@wdio/ocr-service` как зависимость в вашем файле `package.json`.

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь.](../gettingstarted)

:::note
Этот модуль использует Tesseract в качестве OCR-движка. По умолчанию он проверит, установлен ли Tesseract локально в вашей системе, и если да, то будет использовать его. Если нет, то будет использован модуль [Node.js Tesseract.js](https://github.com/naptha/tesseract.js), который устанавливается автоматически.

Если вы хотите ускорить обработку изображений, рекомендуется использовать локально установленную версию Tesseract. См. также [Время выполнения тестов](./more-test-optimization#using-a-local-installation-of-tesseract).
:::

Инструкции по установке Tesseract как системной зависимости на вашу локальную систему можно найти [здесь](https://tesseract-ocr.github.io/tessdoc/Installation.html).

:::caution
По вопросам установки/ошибкам Tesseract обращайтесь к проекту
[Tesseract](https://github.com/tesseract-ocr/tesseract).
:::

## Поддержка Typescript

Убедитесь, что вы добавили `@wdio/ocr-service` в ваш конфигурационный файл `tsconfig.json`.

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## Конфигурация

Для использования сервиса необходимо добавить `ocr` в массив services в файле `wdio.conf.ts`

```js
// wdio.conf.js
exports.config = {
    //...
    services: [
        // your other services
        [
            "ocr",
            {
                contrast: 0.25,
                imagesFolder: ".tmp/",
                language: "eng",
            },
        ],
    ],
};
```

### Параметры конфигурации

#### `contrast`

-   **Тип:** `number`
-   **Обязательный:** Нет
-   **По умолчанию:** `0.25`

Чем выше контраст, тем темнее изображение и наоборот. Это может помочь найти текст на изображении. Принимает значения от `-1` до `1`.

#### `imagesFolder`

-   **Тип:** `string`
-   **Обязательный:** Нет
-   **По умолчанию:** `{project-root}/.tmp/ocr`

Папка, где хранятся результаты OCR.

:::note
Если вы указываете пользовательскую `imagesFolder`, сервис автоматически добавит к ней подпапку `ocr`.
:::

#### `language`

-   **Тип:** `string`
-   **Обязательный:** Нет
-   **По умолчанию:** `eng`

Язык, который Tesseract будет распознавать. Дополнительную информацию можно найти [здесь](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), а поддерживаемые языки можно найти [здесь](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

## Логи

Этот модуль автоматически добавляет дополнительные логи в логи WebdriverIO. Он записывает в логи `INFO` и `WARN` с именем `@wdio/ocr-service`.
Примеры можно найти ниже.

```log
...............
[0-0] 2024-05-24T06:55:12.739Z INFO @wdio/ocr-service: Adding commands to global browser
[0-0] 2024-05-24T06:55:12.750Z INFO @wdio/ocr-service: Adding browser command "ocrGetText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrGetElementPositionByText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrWaitForTextDisplayed" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrClickOnText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrSetValue" to browser object
...............
[0-0] 2024-05-24T06:55:13.667Z INFO @wdio/ocr-service:getData: Using system installed version of Tesseract
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: It took '0.351s' to process the image.
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: The following text was found through OCR:
[0-0]
[0-0] IQ Docs API Blog Contribute Community Sponsor Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: OCR Image with found text can be found here:
[0-0]
[0-0] .tmp/ocr/desktop-1716533713585.png
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "Get Started" and found one match "Started" with score "63.64
...............
```