---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
description: "با استفاده از ocrWaitForTextDisplayed از سرویس OCR، منتظر بمانید تا یک متن خاص روی صفحه نمایش داده شود."
---

منتظر بمانید تا یک متن خاص روی صفحه نمایش داده شود.

## استفاده

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## خروجی

### لاگ‌ها

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## گزینه‌ها

### `text`

<Option type="string" required="yes">

متنی که می‌خواهید برای کلیک کردن روی آن جستجو کنید.

</Option>
#### مثال

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

<Option type="number" default="18000 (18 seconds)" required="no">

زمان بر حسب میلی‌ثانیه. توجه داشته باشید که فرآیند OCR ممکن است مدتی طول بکشد، بنابراین آن را خیلی کم تنظیم نکنید.

</Option>
#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // wait for 25 seconds
});
```

### `timeoutMsg`

<Option type="string" default={`Could not find the text "{selector}" within the requested time.`} required="no">

پیام خطای پیش‌فرض را بازنویسی می‌کند.

</Option>
#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

هر چه کنتراست بیشتر باشد، تصویر تیره‌تر می‌شود و برعکس. این می‌تواند به پیدا کردن متن در تصویر کمک کند. این گزینه مقادیری بین `-1` و `1` را می‌پذیرد.

</Option>
#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

این ناحیه جستجو در صفحه است که OCR باید در آن به دنبال متن بگردد. این می‌تواند یک المنت یا یک مستطیل شامل `x`، `y`، `width` و `height` باشد.

</Option>
#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// OR
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

زبانی که Tesseract تشخیص خواهد داد. اطلاعات بیشتر را می‌توانید [اینجا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) و زبان‌های پشتیبانی‌شده را [اینجا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) پیدا کنید.

</Option>
#### مثال

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // استفاده از زبان هلندی
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

می‌توانید منطق فازی برای پیدا کردن متن را با گزینه‌های زیر تغییر دهید. این ممکن است به پیدا کردن تطابق بهتر کمک کند.

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

تعیین می‌کند که تطابق چقدر باید به موقعیت فازی (مشخص‌شده توسط location) نزدیک باشد. تطابق دقیق حرفی که به اندازه distance کاراکتر از موقعیت فازی فاصله داشته باشد، به عنوان عدم تطابق کامل امتیاز می‌گیرد. فاصله 0 نیازمند آن است که تطابق دقیقاً در موقعیت مشخص‌شده باشد. فاصله 1000 نیازمند آن است که یک تطابق کامل در محدوده 800 کاراکتری از موقعیت قرار داشته باشد تا با آستانه 0.8 پیدا شود.

</Option>
##### مثال

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

تعیین می‌کند که الگو تقریباً در کجای متن انتظار می‌رود پیدا شود.

</Option>
##### مثال

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

اینکه الگوریتم تطابق در چه نقطه‌ای دست از جستجو می‌کشد. آستانه 0 نیازمند تطابق کامل (هم از نظر حروف و هم موقعیت) است، آستانه 1.0 با هر چیزی تطابق خواهد داشت.

</Option>
##### مثال

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

اینکه آیا جستجو باید به بزرگی و کوچکی حروف حساس باشد.

</Option>
##### مثال

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

فقط تطابق‌هایی که طولشان از این مقدار بیشتر باشد برگردانده می‌شوند. (برای مثال، اگر می‌خواهید تطابق‌های تک‌کاراکتری را در نتیجه نادیده بگیرید، آن را روی 2 تنظیم کنید)

</Option>
##### مثال

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

وقتی `true` باشد، تابع تطابق تا انتهای الگوی جستجو ادامه می‌دهد، حتی اگر یک تطابق کامل قبلاً در رشته پیدا شده باشد.

</Option>
##### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```