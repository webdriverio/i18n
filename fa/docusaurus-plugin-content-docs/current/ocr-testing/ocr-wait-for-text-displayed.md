---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
description: "با استفاده از ocrWaitForTextDisplayed از سرویس OCR، منتظر بمانید تا یک متن خاص روی صفحه نمایش داده شود."
---

منتظر بمانید تا یک متن خاص روی صفحه نمایش داده شود.

## نحوه استفاده

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

این گزینه پیام خطای پیش‌فرض را بازنویسی می‌کند.

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

هرچه کنتراست بیشتر باشد، تصویر تیره‌تر می‌شود و برعکس. این می‌تواند به یافتن متن در تصویر کمک کند. این گزینه مقادیری بین `-1` و `1` را می‌پذیرد.

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

این ناحیه‌ای از صفحه است که OCR باید در آن به دنبال متن بگردد. این می‌تواند یک المنت یا یک مستطیل شامل `x`، `y`، `width` و `height` باشد.

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

زبانی که Tesseract تشخیص خواهد داد. اطلاعات بیشتر را می‌توانید [اینجا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) و زبان‌های پشتیبانی‌شده را [اینجا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) بیابید.

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

با گزینه‌های زیر می‌توانید منطق فازی یافتن متن را تغییر دهید. این ممکن است به یافتن تطابق بهتر کمک کند.

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

تعیین می‌کند که تطابق چقدر باید به مکان فازی (که توسط location مشخص می‌شود) نزدیک باشد. یک تطابق دقیق حروف که به اندازه distance کاراکتر از مکان فازی فاصله داشته باشد، به‌عنوان عدم تطابق کامل امتیازدهی می‌شود. فاصله 0 نیاز دارد که تطابق دقیقاً در مکان مشخص‌شده باشد. فاصله 1000 نیاز دارد که یک تطابق کامل در محدوده 800 کاراکتری از مکان باشد تا با استفاده از آستانه 0.8 یافت شود.

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

به‌طور تقریبی تعیین می‌کند که الگو انتظار می‌رود در کجای متن یافت شود.

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

تعیین می‌کند الگوریتم تطابق در چه نقطه‌ای دست از جستجو بکشد. آستانه 0 نیاز به تطابق کامل (هم از نظر حروف و هم مکان) دارد، در حالی که آستانه 1.0 با هر چیزی تطابق خواهد داشت.

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

آیا جستجو باید به بزرگی و کوچکی حروف حساس باشد یا خیر.

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

فقط تطابق‌هایی که طول آن‌ها از این مقدار بیشتر باشد بازگردانده می‌شوند. (به‌عنوان مثال، اگر می‌خواهید تطابق‌های تک‌کاراکتری را در نتیجه نادیده بگیرید، آن را روی 2 تنظیم کنید)

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