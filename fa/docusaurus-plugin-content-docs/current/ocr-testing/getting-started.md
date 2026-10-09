---
id: getting-started
title: شروع به کار
description: "نصب و پیکربندی @wdio/ocr-service، راه‌اندازی پشتیبانی از TypeScript و تنظیم گزینه‌های کنتراست، پوشه تصاویر و زبان."
---

## نصب

ساده‌ترین راه این است که `@wdio/ocr-service` را به عنوان یک وابستگی در فایل `package.json` خود نگه دارید.

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

دستورالعمل‌های نصب `WebdriverIO` را می‌توانید [اینجا](../gettingstarted) پیدا کنید.

:::note
این ماژول از Tesseract به عنوان موتور OCR استفاده می‌کند. به طور پیش‌فرض، بررسی می‌کند که آیا Tesseract به صورت محلی روی سیستم شما نصب شده است یا خیر، و در صورت وجود، از آن استفاده خواهد کرد. در غیر این صورت، از ماژول [Node.js Tesseract.js](https://github.com/naptha/tesseract.js) استفاده می‌کند که به طور خودکار برای شما نصب می‌شود.

اگر می‌خواهید سرعت پردازش تصویر را افزایش دهید، توصیه می‌شود از نسخه‌ای از Tesseract که به صورت محلی نصب شده است استفاده کنید. همچنین [زمان اجرای تست](./more-test-optimization#using-a-local-installation-of-tesseract) را ببینید.
:::

دستورالعمل نصب Tesseract به عنوان یک وابستگی سیستمی روی سیستم محلی شما را می‌توانید [اینجا](https://tesseract-ocr.github.io/tessdoc/Installation.html) پیدا کنید.

:::caution
برای سؤالات/خطاهای مربوط به نصب Tesseract لطفاً به پروژه
[Tesseract](https://github.com/tesseract-ocr/tesseract) مراجعه کنید.
:::

## پشتیبانی از Typescript

اطمینان حاصل کنید که `@wdio/ocr-service` را به فایل پیکربندی `tsconfig.json` خود اضافه کرده‌اید.

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## پیکربندی

برای استفاده از این سرویس باید `ocr` را به آرایه services در `wdio.conf.ts` اضافه کنید

```js
// wdio.conf.js
exports.config = {
    //...
    services: [
        // سایر سرویس‌های شما
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

### گزینه‌های پیکربندی

#### `contrast`

<Option type="number" default="0.25" required="No">

هرچه کنتراست بیشتر باشد، تصویر تیره‌تر است و برعکس. این می‌تواند به یافتن متن در یک تصویر کمک کند. این گزینه مقادیری بین `-1` و `1` را می‌پذیرد.

</Option>
#### `imagesFolder`

<Option type="string" default={`{project-root}/.tmp/ocr`} required="No">

پوشه‌ای که نتایج OCR در آن ذخیره می‌شوند.

:::note
اگر یک `imagesFolder` سفارشی ارائه دهید، سرویس به طور خودکار زیرپوشه `ocr` را به آن اضافه خواهد کرد.
:::

</Option>
#### `language`

<Option type="string" default="eng" required="No">

زبانی که Tesseract تشخیص خواهد داد. اطلاعات بیشتر را می‌توانید [اینجا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) پیدا کنید و زبان‌های پشتیبانی‌شده را می‌توانید [اینجا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) ببینید.

</Option>
## لاگ‌ها

این ماژول به طور خودکار لاگ‌های اضافی را به لاگ‌های WebdriverIO اضافه می‌کند. این ماژول در لاگ‌های `INFO` و `WARN` با نام `@wdio/ocr-service` می‌نویسد.
نمونه‌ها را می‌توانید در زیر پیدا کنید.

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