---
id: getting-started
title: Початок роботи
---

## Встановлення

Найлегший спосіб - зберігати `@wdio/ocr-service` як залежність у вашому `package.json` через.

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

Інструкції щодо встановлення `WebdriverIO` можна знайти [тут.](../gettingstarted)

:::note
Цей модуль використовує Tesseract як OCR двигун. За замовчуванням, він перевірить, чи маєте ви локальну інсталяцію Tesseract встановлену у вашій системі, якщо так, він використовуватиме її. Якщо ні, він використовуватиме [Node.js Tesseract.js](https://github.com/naptha/tesseract.js) модуль, який автоматично встановлюється для вас.

Якщо ви хочете прискорити обробку зображень, рекомендується використовувати локально встановлену версію Tesseract. Дивіться також [Час виконання тесту](./more-test-optimization#using-a-local-installation-of-tesseract).
:::

Інструкції щодо встановлення Tesseract як системної залежності на вашу локальну систему можна знайти [тут](https://tesseract-ocr.github.io/tessdoc/Installation.html).

:::caution
Для питань/помилок встановлення Tesseract, будь ласка, зверніться до проекту
[Tesseract](https://github.com/tesseract-ocr/tesseract).
:::

## Підтримка Typescript

Переконайтеся, що ви додали `@wdio/ocr-service` до вашого конфігураційного файлу `tsconfig.json`.

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## Конфігурація

Щоб використовувати сервіс, вам потрібно додати `ocr` до вашого масиву сервісів у `wdio.conf.ts`

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

### Опції конфігурації

#### `contrast`

-   **Тип:** `number`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `0.25`

Чим вищий контраст, тим темніше зображення і навпаки. Це може допомогти знайти текст у зображенні. Приймає значення між `-1` та `1`.

#### `imagesFolder`

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `{project-root}/.tmp/ocr`

Папка, в якій зберігаються результати OCR.

:::note
Якщо ви надаєте власну `imagesFolder`, сервіс автоматично додасть до неї підпапку `ocr`.
:::

#### `language`

-   **Тип:** `string`
-   **Обов'язково:** Ні
-   **За замовчуванням:** `eng`

Мова, яку Tesseract буде розпізнавати. Більше інформації можна знайти [тут](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), а підтримувані мови можна знайти [тут](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

## Логи

Цей модуль автоматично додає додаткові логи до логів WebdriverIO. Він пише в логи `INFO` та `WARN` з іменем `@wdio/ocr-service`.
Приклади можна знайти нижче.

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