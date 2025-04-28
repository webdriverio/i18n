---
id: ocr-get-element-position-by-text
title: دریافت موقعیت عنصر با متن توسط OCR
---

دریافت موقعیت یک متن روی صفحه. این دستور متن ارائه شده را جستجو کرده و سعی می‌کند تطابقی بر اساس منطق فازی از [Fuse.js](https://fusejs.io/) پیدا کند. این بدان معناست که اگر شما گزینشگری با اشتباه تایپی ارائه دهید، یا متن یافت شده تطابق ۱۰۰٪ نداشته باشد، همچنان سعی می‌کند یک عنصر را به شما برگرداند. به [لاگ‌ها](#logs) در زیر نگاه کنید.

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
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## گزینه‌ها

### `text`

-   **نوع:** `string`
-   **اجباری:** بله

متنی که می‌خواهید برای کلیک کردن جستجو کنید.

#### مثال

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** `0.25`

هرچه کنتراست بالاتر باشد، تصویر تیره‌تر و برعکس. این می‌تواند به یافتن متن در تصویر کمک کند. مقادیر بین `-1` و `1` را می‌پذیرد.

#### مثال

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **نوع:** `number`
-   **اجباری:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

این ناحیه جستجو در صفحه است که OCR باید در آن به دنبال متن بگردد. این می‌تواند یک عنصر یا یک مستطیل شامل `x`، `y`، `width` و `height` باشد.

#### مثال

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// یا
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// یا
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

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `eng`

زبانی که Tesseract تشخیص خواهد داد. اطلاعات بیشتر را می‌توانید [اینجا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) پیدا کنید و زبان‌های پشتیبانی شده را می‌توانید [اینجا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) بیابید.

#### مثال

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // استفاده از هلندی به عنوان زبان
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

شما می‌توانید منطق فازی برای یافتن متن را با گزینه‌های زیر تغییر دهید. این ممکن است به یافتن تطابق بهتر کمک کند.

#### `fuzzyFindOptions.distance`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 100

تعیین می‌کند که تطابق چقدر باید به موقعیت فازی (مشخص شده توسط location) نزدیک باشد. یک تطابق دقیق حرف که در فاصله distance کاراکتر از موقعیت فازی باشد، به عنوان عدم تطابق کامل امتیازدهی می‌شود. فاصله 0 نیاز به تطابق در موقعیت دقیق مشخص شده دارد. فاصله 1000 به یک تطابق کامل نیاز دارد که در محدوده 800 کاراکتر از موقعیت باشد تا با آستانه 0.8 پیدا شود.

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

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 0

تقریباً تعیین می‌کند که الگو در کجای متن مورد انتظار است.

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

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 0.6

در چه نقطه‌ای الگوریتم تطبیق تسلیم می‌شود. آستانه 0 به یک تطابق کامل (هم حروف و هم موقعیت) نیاز دارد، آستانه 1.0 هر چیزی را تطبیق می‌دهد.

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

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** false

آیا جستجو باید به بزرگی و کوچکی حروف حساس باشد.

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

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 2

فقط تطابق‌هایی که طول آنها از این مقدار بیشتر است برگردانده می‌شوند. (به عنوان مثال، اگر می‌خواهید تطابق‌های تک کاراکتری را در نتیجه نادیده بگیرید، آن را روی 2 تنظیم کنید)

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

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** false

وقتی `true` است، تابع تطبیق حتی اگر یک تطابق کامل قبلاً در رشته پیدا شده باشد، تا انتهای الگوی جستجو ادامه می‌دهد.

##### مثال

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```