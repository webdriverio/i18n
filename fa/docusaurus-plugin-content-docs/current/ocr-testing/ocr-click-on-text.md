---
id: ocr-click-on-text
title: ocrClickOnText (کلیک بر روی متن با OCR)
---

کلیک بر روی یک عنصر بر اساس متن‌های ارائه شده. این دستور متن ارائه شده را جستجو کرده و تلاش می‌کند مطابقتی را براساس منطق فازی از [Fuse.js](https://fusejs.io/) پیدا کند. این بدان معنی است که اگر یک انتخابگر با اشتباه تایپی ارائه دهید، یا متن یافت شده مطابقت ۱۰۰٪ نباشد، همچنان سعی می‌کند عنصری را به شما برگرداند. لاگ‌های زیر را ببینید.

## استفاده

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## خروجی

### لاگ‌ها

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### تصویر

یک تصویر در (پیش‌فرض) [`imagesFolder`](./getting-started#imagesfolder) خود پیدا خواهید کرد که هدفی را نشان می‌دهد که ماژول روی آن کلیک کرده است.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## گزینه‌ها

### `text`

-   **نوع:** `string`
-   **اجباری:** بله

متنی که می‌خواهید برای کلیک کردن جستجو کنید.

#### مثال

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** `500` میلی‌ثانیه

این مدت زمان کلیک است. اگر بخواهید می‌توانید با افزایش زمان، یک "کلیک طولانی" هم ایجاد کنید.

#### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // این ۳ ثانیه است
});
```

### `contrast`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** `0.25`

هرچه کنتراست بالاتر باشد، تصویر تاریک‌تر می‌شود و برعکس. این می‌تواند به پیدا کردن متن در تصویر کمک کند. مقادیر بین `-1` و `1` را می‌پذیرد.

#### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **نوع:** `number`
-   **اجباری:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

این منطقه جستجو در صفحه است که OCR باید در آن به دنبال متن بگردد. این می‌تواند یک عنصر یا یک مستطیل شامل `x`، `y`، `width` و `height` باشد.

#### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// یا
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// یا
await browser.ocrClickOnText({
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

زبانی که Tesseract تشخیص خواهد داد. اطلاعات بیشتر را می‌توان [اینجا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) یافت و زبان‌های پشتیبانی شده را می‌توان [اینجا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) مشاهده کرد.

#### مثال

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // استفاده از هلندی به عنوان زبان
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **نوع:** `object`
-   **اجباری:** خیر

شما می‌توانید نسبت به عنصر مطابق، در صفحه کلیک کنید. این کار می‌تواند بر اساس پیکسل‌های نسبی `above` (بالا)، `right` (راست)، `below` (پایین) یا `left` (چپ) از عنصر مطابق انجام شود.

:::note

ترکیب‌های زیر مجاز هستند

-   ویژگی‌های تکی
-   `above` + `left` یا `above` + `right`
-   `below` + `left` یا `below` + `right`

ترکیب‌های زیر مجاز **نیستند**

-   `above` به علاوه `below`
-   `left` به علاوه `right`

:::

#### `relativePosition.above`

-   **نوع:** `number`
-   **اجباری:** خیر

x پیکسل `بالای` عنصر مطابق کلیک کنید.

##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **نوع:** `number`
-   **اجباری:** خیر

x پیکسل `راست` از عنصر مطابق کلیک کنید.

##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **نوع:** `number`
-   **اجباری:** خیر

x پیکسل `پایین` عنصر مطابق کلیک کنید.

##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **نوع:** `number`
-   **اجباری:** خیر

x پیکسل `چپ` از عنصر مطابق کلیک کنید.

##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

شما می‌توانید منطق فازی برای یافتن متن را با گزینه‌های زیر تغییر دهید. این ممکن است به یافتن تطبیق بهتر کمک کند.

#### `fuzzyFindOptions.distance`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 100

تعیین می‌کند که مطابقت باید چقدر به مکان فازی (مشخص شده توسط location) نزدیک باشد. یک تطابق دقیق حرف که به اندازه مشخص شده کاراکتر از مکان فازی دور باشد، به عنوان عدم مطابقت کامل امتیاز می‌گیرد. فاصله 0 نیاز به تطابق در مکان دقیق مشخص شده دارد. فاصله 1000 نیاز به تطابق کامل در محدوده 800 کاراکتر از مکان با آستانه 0.8 دارد.

##### مثال

```js
await browser.ocrClickOnText({
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

تعیین می‌کند که الگو تقریباً کجا در متن باید یافت شود.

##### مثال

```js
await browser.ocrClickOnText({
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

در چه نقطه‌ای الگوریتم تطبیق تسلیم می‌شود. آستانه 0 به تطابق کامل (هم از نظر حروف و هم مکان) نیاز دارد، آستانه 1.0 با هر چیزی مطابقت خواهد داشت.

##### مثال

```js
await browser.ocrClickOnText({
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
await browser.ocrClickOnText({
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

فقط تطابق‌هایی که طول آنها از این مقدار بیشتر باشد برگردانده می‌شوند. (به عنوان مثال، اگر می‌خواهید تطابق‌های تک کاراکتری را در نتیجه نادیده بگیرید، آن را روی 2 تنظیم کنید)

##### مثال

```js
await browser.ocrClickOnText({
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
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```