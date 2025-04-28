---
id: ocr-wait-for-text-displayed
title: انتظار برای نمایش متن با تشخیص نوری کاراکترها
---

منتظر می‌ماند تا یک متن خاص روی صفحه نمایش داده شود.

## نحوه استفاده

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## خروجی

### گزارش‌ها

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## گزینه‌ها

### `text`

-   **نوع:** `string`
-   **اجباری:** بله

متنی که می‌خواهید برای کلیک کردن روی آن جستجو کنید.

#### مثال

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 18000 (18 ثانیه)

زمان بر حسب میلی‌ثانیه. توجه داشته باشید که فرآیند OCR ممکن است زمان‌بر باشد، پس آن را خیلی کم تنظیم نکنید.

#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // انتظار برای 25 ثانیه
});
```

### `timeoutMsg`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `Could not find the text "{selector}" within the requested time.`

پیام خطای پیش‌فرض را بازنویسی می‌کند.

#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** `0.25`

هرچه کنتراست بیشتر باشد، تصویر تیره‌تر و برعکس. این می‌تواند به یافتن متن در تصویر کمک کند. مقادیر بین `-1` و `1` را می‌پذیرد.

#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **نوع:** `number`
-   **اجباری:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

این ناحیه جستجو در صفحه است که OCR باید به دنبال متن در آن بگردد. این می‌تواند یک عنصر یا یک مستطیل شامل `x`، `y`، `width` و `height` باشد.

#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// یا
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// یا
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

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `eng`

زبانی که Tesseract تشخیص خواهد داد. اطلاعات بیشتر را می‌توانید [اینجا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) پیدا کنید و زبان‌های پشتیبانی شده را می‌توانید [اینجا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) مشاهده کنید.

#### مثال

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // استفاده از هلندی به عنوان زبان
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

شما می‌توانید منطق فازی برای یافتن متن را با گزینه‌های زیر تغییر دهید. این ممکن است به یافتن تطبیق بهتر کمک کند.

#### `fuzzyFindOptions.distance`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 100

تعیین می‌کند که تطبیق باید چقدر به موقعیت فازی (مشخص شده توسط location) نزدیک باشد. یک تطبیق دقیق حرف که به اندازه distance کاراکتر از موقعیت فازی دور باشد، به عنوان عدم تطبیق کامل امتیازدهی می‌شود. فاصله 0 نیاز دارد که تطبیق در موقعیت دقیق مشخص شده باشد. فاصله 1000 نیاز به تطبیق کامل در محدوده 800 کاراکتر از موقعیت خواهد داشت (با آستانه 0.8).

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

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 0

تعیین می‌کند که الگو تقریباً در کجای متن انتظار می‌رود پیدا شود.

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

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 0.6

در چه نقطه‌ای الگوریتم تطبیق تسلیم می‌شود. آستانه 0 نیاز به تطبیق کامل (هم حروف و هم موقعیت) دارد، آستانه 1.0 با هر چیزی تطبیق می‌یابد.

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

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** false

آیا جستجو باید به بزرگی و کوچکی حروف حساس باشد.

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

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 2

فقط تطابق‌هایی که طول آنها از این مقدار بیشتر باشد برگردانده می‌شوند. (برای مثال، اگر می‌خواهید تطابق‌های تک کاراکتری را در نتیجه نادیده بگیرید، آن را روی 2 تنظیم کنید)

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

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** false

وقتی `true` است، تابع تطبیق حتی اگر یک تطابق کامل قبلاً در رشته پیدا شده باشد، تا انتهای الگوی جستجو ادامه می‌دهد.

##### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```