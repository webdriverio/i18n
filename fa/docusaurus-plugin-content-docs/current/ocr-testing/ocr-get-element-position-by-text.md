---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
description: "موقعیت یک متن روی صفحه را با ocrGetElementPositionByText و با استفاده از OCR و تطبیق فازی برای یافتن آن به دست آورید."
---

موقعیت یک متن را روی صفحه به دست آورید. این دستور متن ارائه‌شده را جستجو می‌کند و تلاش می‌کند بر اساس منطق فازی (Fuzzy Logic) از [Fuse.js](https://fusejs.io/) یک تطابق پیدا کند. این بدان معناست که اگر سلکتوری با غلط تایپی ارائه دهید، یا متن پیدا‌شده ۱۰۰٪ مطابق نباشد، باز هم تلاش می‌کند یک عنصر به شما برگرداند. [لاگ‌ها](#logs) را در پایین ببینید.

## استفاده

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## خروجی

### نتیجه

```logs
result = {
  "dprPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "filePath": ".tmp/ocr/desktop-1716658199410.png",
  "matchedString": "Started",
  "originalPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "score": 85.71,
  "searchValue": "Start3d"
}
```

### لاگ‌ها

```log
# با وجود اینکه "Start3d" را جستجو کردیم و متن پیدا‌شده "Started" بود، همچنان تطابق پیدا می‌شود
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## گزینه‌ها

### `text`

<Option type="string" required="yes">

متنی که می‌خواهید برای کلیک کردن روی آن جستجو کنید.

</Option>
#### مثال

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

<Option type="number" default="0.25" required="no">

هرچه کنتراست بیشتر باشد، تصویر تیره‌تر است و برعکس. این می‌تواند به یافتن متن در تصویر کمک کند. مقادیری بین `-1` و `1` را می‌پذیرد.

</Option>
#### مثال

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

این ناحیه‌ای از صفحه است که OCR باید در آن به دنبال متن بگردد. این می‌تواند یک عنصر یا یک مستطیل شامل `x`، `y`، `width` و `height` باشد.

</Option>
#### مثال

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OR
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // استفاده از زبان هلندی
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

می‌توانید منطق فازی برای یافتن متن را با گزینه‌های زیر تغییر دهید. این ممکن است به یافتن تطابق بهتری کمک کند.

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

تعیین می‌کند که تطابق باید چقدر به موقعیت فازی (که توسط location مشخص می‌شود) نزدیک باشد. یک تطابق دقیق حرف که به اندازه distance کاراکتر از موقعیت فازی فاصله دارد، به عنوان عدم تطابق کامل امتیاز می‌گیرد. distance برابر 0 نیازمند آن است که تطابق دقیقاً در موقعیت مشخص‌شده باشد. distance برابر 1000 نیازمند آن است که یک تطابق کامل در فاصله 800 کاراکتری از موقعیت باشد تا با threshold برابر 0.8 پیدا شود.

</Option>
##### مثال

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

<Option type="number" default="0" required="no">

به طور تقریبی تعیین می‌کند که الگو انتظار می‌رود در کجای متن پیدا شود.

</Option>
##### مثال

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

<Option type="number" default="0.6" required="no">

الگوریتم تطابق در چه نقطه‌ای دست از تلاش می‌کشد. threshold برابر 0 نیازمند تطابق کامل (هم از نظر حروف و هم موقعیت) است، و threshold برابر 1.0 با هر چیزی تطابق خواهد داشت.

</Option>
##### مثال

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

<Option type="boolean" default="false" required="no">

اینکه آیا جستجو باید به بزرگی و کوچکی حروف حساس باشد یا خیر.

</Option>
##### مثال

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

<Option type="number" default="2" required="no">

فقط تطابق‌هایی که طولشان از این مقدار بیشتر است برگردانده می‌شوند. (برای مثال، اگر می‌خواهید تطابق‌های تک‌کاراکتری را در نتیجه نادیده بگیرید، آن را روی 2 تنظیم کنید)

</Option>
##### مثال

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```