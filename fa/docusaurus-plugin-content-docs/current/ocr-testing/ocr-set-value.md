---
id: ocr-set-value
title: ocrSetValue
description: "با ocrSetValue در یک فیلد ورودی که بر اساس متن قابل مشاهده‌اش پیدا می‌شود تایپ کنید؛ این دستور فیلد را با استفاده از OCR و تطبیق فازی پیدا می‌کند."
---

دنباله‌ای از ضربات کلید را به یک عنصر ارسال می‌کند. این دستور:

-   به طور خودکار عنصر را تشخیص می‌دهد
-   با کلیک روی فیلد، آن را در حالت فوکوس قرار می‌دهد
-   مقدار را در فیلد تنظیم می‌کند

این دستور متن ارائه‌شده را جستجو می‌کند و تلاش می‌کند بر اساس منطق فازی (Fuzzy Logic) از [Fuse.js](https://fusejs.io/) یک تطابق پیدا کند. این بدان معناست که اگر انتخابگری با غلط تایپی ارائه دهید، یا متن پیدا شده ۱۰۰٪ مطابقت نداشته باشد، باز هم تلاش می‌کند یک عنصر به شما برگرداند. [لاگ‌ها](#logs) را در زیر ببینید.

## نحوه استفاده

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## خروجی

### لاگ‌ها

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## گزینه‌ها

### `text`

<Option type="string" required="yes">

متنی که می‌خواهید برای کلیک کردن روی آن جستجو کنید.

</Option>
#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

<Option type="string" required="yes">

مقداری که باید اضافه شود.

</Option>
#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

<Option type="boolean" default="false" required="no">

اگر مقدار علاوه بر وارد شدن باید در فیلد ورودی ارسال (submit) نیز شود. این بدان معناست که یک "ENTER" در انتهای رشته ارسال خواهد شد.

</Option>
#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

این مدت زمان کلیک است. در صورت تمایل می‌توانید با افزایش زمان، یک «کلیک طولانی» نیز ایجاد کنید.

</Option>
#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // This is 3 seconds
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

هرچه کنتراست بیشتر باشد، تصویر تیره‌تر است و بالعکس. این می‌تواند به یافتن متن در یک تصویر کمک کند. این گزینه مقادیر بین `-1` و `1` را می‌پذیرد.

</Option>
#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

این ناحیه جستجو در صفحه است که OCR باید در آن به دنبال متن بگردد. این می‌تواند یک عنصر یا یک مستطیل شامل `x`، `y`، `width` و `height` باشد.

</Option>
#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// OR
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

می‌توانید نسبت به عنصر منطبق، روی صفحه کلیک کنید. این کار بر اساس پیکسل‌های نسبی `above` (بالا)، `right` (راست)، `below` (پایین) یا `left` (چپ) از عنصر منطبق انجام می‌شود.

:::note

ترکیب‌های زیر مجاز هستند

-   ویژگی‌های تکی
-   `above` + `left` یا `above` + `right`
-   `below` + `left` یا `below` + `right`

ترکیب‌های زیر **مجاز نیستند**

-   `above` به همراه `below`
-   `left` به همراه `right`

:::

</Option>
#### `relativePosition.above`

<Option type="number" required="no">

x پیکسل `above` (بالاتر از) عنصر منطبق کلیک کنید.

</Option>
##### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

<Option type="number" required="no">

x پیکسل `right` (سمت راست) عنصر منطبق کلیک کنید.

</Option>
##### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

<Option type="number" required="no">

x پیکسل `below` (پایین‌تر از) عنصر منطبق کلیک کنید.

</Option>
##### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

<Option type="number" required="no">

x پیکسل `left` (سمت چپ) عنصر منطبق کلیک کنید.

</Option>
##### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

می‌توانید منطق فازی یافتن متن را با گزینه‌های زیر تغییر دهید. این ممکن است به یافتن تطابق بهتر کمک کند.

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

تعیین می‌کند که تطابق چقدر باید به موقعیت فازی (که توسط location مشخص می‌شود) نزدیک باشد. یک تطابق دقیق حرف که به اندازه distance کاراکتر از موقعیت فازی فاصله داشته باشد، به عنوان عدم تطابق کامل امتیازدهی می‌شود. distance برابر با 0 مستلزم آن است که تطابق دقیقاً در موقعیت مشخص‌شده باشد. distance برابر با 1000 مستلزم آن است که یک تطابق کامل در فاصله 800 کاراکتری از موقعیت باشد تا با استفاده از threshold برابر با 0.8 پیدا شود.

</Option>
##### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

<Option type="number" default="0.6" required="no">

الگوریتم تطابق در چه نقطه‌ای دست از جستجو می‌کشد. threshold برابر با 0 مستلزم تطابق کامل (هم از نظر حروف و هم موقعیت) است، threshold برابر با 1.0 با هر چیزی مطابقت خواهد داشت.

</Option>
##### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

<Option type="number" default="2" required="no">

فقط تطابق‌هایی که طول آن‌ها از این مقدار بیشتر باشد برگردانده می‌شوند. (به عنوان مثال، اگر می‌خواهید تطابق‌های تک‌کاراکتری را در نتیجه نادیده بگیرید، آن را روی 2 تنظیم کنید)

</Option>
##### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

<Option type="number" default="false" required="no">

وقتی `true` باشد، تابع تطابق حتی اگر یک تطابق کامل قبلاً در رشته پیدا شده باشد، تا انتهای الگوی جستجو ادامه خواهد داد.

</Option>
##### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```