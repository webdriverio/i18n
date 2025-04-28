---
id: ocr-wait-for-text-displayed
title: انتظار برای نمایش متن با تشخیص نوری کاراکتر
---

منتظر نمایش متن خاصی در صفحه باشید.

## استفاده

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

زمان به میلی‌ثانیه. توجه داشته باشید که فرآیند OCR ممکن است زمان زیادی طول بکشد، پس آن را خیلی پایین تنظیم نکنید.

#### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // 25 ثانیه منتظر بماند
});
```

### `timeoutMsg`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `Could not find the text "{selector}" within the requested time.`

پیام خطای پیش‌فرض را جایگزین می‌کند.

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

هر چه کنتراست بالاتر باشد، تصویر تیره‌تر است و برعکس. این می‌تواند به یافتن متن در تصویر کمک کند. مقادیر بین `-1` و `1` را می‌پذیرد.

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

این منطقه‌ای از صفحه است که OCR باید در آن به دنبال متن بگردد. این می‌تواند یک المان یا یک مستطیل حاوی `x`، `y`، `width` و `height` باشد.

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

زبانی که Tesseract تشخیص خواهد داد. اطلاعات بیشتر را می‌توانید [اینجا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) پیدا کنید و زبان‌های پشتیبانی شده را می‌توانید [اینجا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) بیابید.

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

شما می‌توانید منطق فازی برای یافتن متن را با گزینه‌های زیر تغییر دهید. این ممکن است به یافتن تطبیق بهتر کمک کند.

#### `fuzzyFindOptions.distance`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 100

تعیین می‌کند که تطبیق باید چقدر به موقعیت فازی (تعیین‌شده توسط موقعیت) نزدیک باشد. یک تطبیق دقیق حرف که فاصله کاراکتر از موقعیت فازی باشد، به عنوان عدم تطابق کامل امتیاز می‌گیرد. فاصله 0 نیاز دارد که تطبیق در موقعیت دقیق مشخص‌شده باشد. فاصله 1000 نیاز به تطبیق کامل در محدوده 800 کاراکتر از موقعیت دارد تا با آستانه 0.8 پیدا شود.

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

تعیین می‌کند که الگو تقریباً در کجای متن انتظار می‌رود یافت شود.

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

در چه نقطه‌ای الگوریتم تطبیق تسلیم می‌شود. آستانه 0 نیاز به تطبیق کامل (هم حروف و هم موقعیت) دارد، آستانه 1.0 با هر چیزی مطابقت خواهد داشت.

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

فقط تطبیق‌هایی که طول آن‌ها از این مقدار بیشتر باشد برگردانده می‌شوند. (به عنوان مثال، اگر می‌خواهید از تطبیق‌های تک‌کاراکتری در نتیجه صرف‌نظر کنید، آن را 2 تنظیم کنید)

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

وقتی `true` است، تابع تطبیق حتی اگر یک تطبیق کامل در رشته پیدا شده باشد، تا انتهای الگوی جستجو ادامه می‌دهد.

##### مثال

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```