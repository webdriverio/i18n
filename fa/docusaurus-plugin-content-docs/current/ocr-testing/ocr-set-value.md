---
id: ocr-set-value
title: ocrSetValue
description: "با استفاده از ocrSetValue در یک فیلد ورودی که با متن قابل مشاهده‌اش مکان‌یابی شده تایپ کنید؛ این دستور فیلد را با OCR و تطبیق فازی پیدا می‌کند."
---

دنباله‌ای از ضربات کلید را به یک عنصر ارسال می‌کند. این دستور:

-   عنصر را به‌طور خودکار تشخیص می‌دهد
-   با کلیک روی فیلد، آن را در حالت فوکوس قرار می‌دهد
-   مقدار را در فیلد تنظیم می‌کند

این دستور متن ارائه‌شده را جستجو می‌کند و تلاش می‌کند بر اساس منطق فازی (Fuzzy Logic) از [Fuse.js](https://fusejs.io/) یک تطابق پیدا کند. این بدان معناست که اگر سلکتوری با غلط تایپی ارائه دهید، یا متن یافت‌شده ۱۰۰٪ مطابقت نداشته باشد، باز هم تلاش می‌کند یک عنصر به شما برگرداند. [لاگ‌ها](#logs) را در پایین ببینید.

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

اینکه آیا مقدار باید در فیلد ورودی ارسال (submit) نیز شود یا خیر. این بدان معناست که یک "ENTER" در انتهای رشته ارسال خواهد شد.

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
    clickDuration: 3000, // این برابر با ۳ ثانیه است
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

هرچه کنتراست بیشتر باشد، تصویر تیره‌تر می‌شود و برعکس. این می‌تواند به یافتن متن در تصویر کمک کند. این گزینه مقادیری بین `-1` و `1` را می‌پذیرد.

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

این ناحیه جستجو در صفحه است که OCR باید در آن به دنبال متن بگردد. این می‌تواند یک عنصر یا یک مستطیل شامل `x`، `y`، `width` و `height` باشد

</Option>
#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// یا
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// یا
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

زبانی که Tesseract تشخیص خواهد داد. اطلاعات بیشتر را می‌توانید [اینجا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) و زبان‌های پشتیبانی‌شده را [اینجا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) بیابید.

</Option>
#### مثال

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // استفاده از زبان هلندی
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

می‌توانید نسبت به عنصر منطبق، روی صفحه کلیک کنید. این کار می‌تواند بر اساس پیکسل‌های نسبی `above`، `right`، `below` یا `left` از عنصر منطبق انجام شود

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

کلیک به اندازه x پیکسل `above` (بالای) عنصر منطبق.

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

کلیک به اندازه x پیکسل `right` (سمت راست) عنصر منطبق.

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

کلیک به اندازه x پیکسل `below` (پایین) عنصر منطبق.

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

کلیک به اندازه x پیکسل `left` (سمت چپ) عنصر منطبق.

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

می‌توانید منطق فازی برای یافتن متن را با گزینه‌های زیر تغییر دهید. این ممکن است به یافتن تطابق بهتر کمک کند

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

تعیین می‌کند که تطابق چقدر باید به مکان فازی (که توسط location مشخص می‌شود) نزدیک باشد. یک تطابق دقیق حرف که به اندازه distance کاراکتر از مکان فازی فاصله داشته باشد، به‌عنوان عدم تطابق کامل امتیازدهی می‌شود. distance برابر با 0 نیاز دارد که تطابق دقیقاً در مکان مشخص‌شده باشد. distance برابر با 1000 نیاز دارد که یک تطابق کامل در محدوده 800 کاراکتری از مکان باشد تا با استفاده از threshold برابر با 0.8 یافت شود.

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

تعیین می‌کند که الگو تقریباً در کجای متن انتظار می‌رود یافت شود.

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

اینکه الگوریتم تطابق در چه نقطه‌ای دست از تلاش بکشد. threshold برابر با 0 نیازمند تطابق کامل (هم حروف و هم مکان) است، و threshold برابر با 1.0 با هر چیزی تطابق خواهد داشت.

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

فقط تطابق‌هایی که طولشان از این مقدار بیشتر باشد بازگردانده می‌شوند. (به‌عنوان مثال، اگر می‌خواهید تطابق‌های تک‌کاراکتری را در نتیجه نادیده بگیرید، آن را روی 2 تنظیم کنید)

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

وقتی `true` باشد، تابع تطابق تا انتهای الگوی جستجو ادامه می‌دهد، حتی اگر یک تطابق کامل قبلاً در رشته پیدا شده باشد.

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