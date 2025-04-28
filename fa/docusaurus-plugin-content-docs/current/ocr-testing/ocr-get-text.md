---
id: ocr-get-text
title: استخراج متن با OCR
---

دریافت متن موجود در یک تصویر.

### کاربرد

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## خروجی

### نتیجه

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### لاگ‌ها

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## گزینه‌ها

### `contrast`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** `0.25`

هرچه کنتراست بالاتر باشد، تصویر تیره‌تر و بالعکس. این می‌تواند به یافتن متن در تصویر کمک کند. مقادیر بین `-1` و `1` قابل قبول است.

#### مثال

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

-   **نوع:** `number`
-   **اجباری:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

این ناحیه جستجو در صفحه است که OCR باید در آن به دنبال متن بگردد. این می‌تواند یک المان یا یک مستطیل شامل `x`، `y`، `width` و `height` باشد.

#### مثال

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// یا
await browser.ocrGetText({ haystack: await $("elementSelector") });

// یا
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

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `eng`

زبانی که Tesseract تشخیص خواهد داد. اطلاعات بیشتر را می‌توانید در [اینجا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) پیدا کنید و زبان‌های پشتیبانی شده را می‌توانید در [اینجا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) مشاهده کنید.

#### مثال

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // استفاده از زبان هلندی
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```