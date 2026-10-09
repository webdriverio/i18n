---
id: getting-started
title: Начало работы
description: "Установка и настройка @wdio/ocr-service, настройка поддержки TypeScript и параметров контрастности, папки для изображений и языка."
---

## Установка

Самый простой способ — добавить `@wdio/ocr-service` в качестве зависимости в ваш `package.json`.

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

Инструкции по установке `WebdriverIO` можно найти [здесь.](../gettingstarted)

:::note
Этот модуль использует Tesseract в качестве OCR-движка. По умолчанию он проверяет, установлен ли Tesseract локально в вашей системе, и если да, то использует его. Если нет, будет использован модуль [Node.js Tesseract.js](https://github.com/naptha/tesseract.js), который устанавливается автоматически.

Если вы хотите ускорить обработку изображений, рекомендуется использовать локально установленную версию Tesseract. См. также [Время выполнения тестов](./more-test-optimization#using-a-local-installation-of-tesseract).
:::

Инструкции по установке Tesseract в качестве системной зависимости в вашей локальной системе можно найти [здесь](https://tesseract-ocr.github.io/tessdoc/Installation.html).

:::caution
С вопросами и ошибками, связанными с установкой Tesseract, обращайтесь к проекту
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

Чтобы использовать сервис, необходимо добавить `ocr` в массив services в `wdio.conf.ts`

```js
// wdio.conf.js
exports.config = {
    //...
    services: [
        // ваши другие сервисы
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

<Option type="number" default="0.25" required="No">

Чем выше контрастность, тем темнее изображение, и наоборот. Это может помочь найти текст на изображении. Принимает значения от `-1` до `1`.

</Option>
#### `imagesFolder`

<Option type="string" default={`{project-root}/.tmp/ocr`} required="No">

Папка, в которой сохраняются результаты OCR.

:::note
Если вы укажете собственную папку `imagesFolder`, сервис автоматически добавит в неё подпапку `ocr`.
:::

</Option>
#### `language`

<Option type="string" default="eng" required="No">

Язык, который будет распознавать Tesseract. Дополнительную информацию можно найти [здесь](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), а список поддерживаемых языков — [здесь](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
## Логи

Этот модуль автоматически добавляет дополнительные записи в логи WebdriverIO. Он пишет в логи уровней `INFO` и `WARN` с именем `@wdio/ocr-service`.
Примеры приведены ниже.

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