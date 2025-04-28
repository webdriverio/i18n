---
id: ocr-set-value
title: ocrSetValue
---

ارسال یک توالی از کلیدها به یک عنصر. این دستور:

-   به طور خودکار عنصر را تشخیص می‌دهد
-   با کلیک کردن روی آن، فوکوس را روی فیلد قرار می‌دهد
-   مقدار را در فیلد تنظیم می‌کند

این دستور متن ارائه شده را جستجو می‌کند و سعی می‌کند براساس منطق فازی از [Fuse.js](https://fusejs.io/) تطبیقی پیدا کند. این بدان معناست که اگر انتخابگری با اشتباه تایپی ارائه دهید، یا متن پیدا شده ممکن است تطابق ۱۰۰٪ نباشد، همچنان سعی می‌کند عنصری را به شما برگرداند. به [گزارش‌ها](#logs) زیر مراجعه کنید.

## استفاده

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## خروجی

### گزارش‌ها

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## گزینه‌ها

### `text`

-   **نوع:** `string`
-   **اجباری:** بله

متنی که می‌خواهید برای کلیک کردن جستجو کنید.

#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **نوع:** `string`
-   **اجباری:** بله

مقداری که باید اضافه شود.

#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`

اگر مقدار نیز باید در فیلد ورودی ارسال شود. این یعنی در انتهای رشته یک "ENTER" ارسال خواهد شد.

#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** `500` میلی‌ثانیه

این مدت زمان کلیک است. اگر بخواهید می‌توانید با افزایش زمان یک "کلیک طولانی" ایجاد کنید.

#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // این 3 ثانیه است
});
```

### `contrast`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** `0.25`

هرچه کنتراست بالاتر باشد، تصویر تیره‌تر می‌شود و برعکس. این می‌تواند به یافتن متن در تصویر کمک کند. مقادیر بین `-1` و `1` را می‌پذیرد.

#### مثال

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **نوع:** `number`
-   **اجباری:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

این منطقه جستجو در صفحه است که OCR باید در آن به دنبال متن بگردد. این می‌تواند یک عنصر یا یک مستطیل شامل `x`، `y`، `width` و `height` باشد.

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

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `eng`

زبانی که Tesseract تشخیص خواهد داد. اطلاعات بیشتر را می‌توانید [اینجا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) پیدا کنید و زبان‌های پشتیبانی شده را می‌توانید [اینجا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) بیابید.

#### مثال

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // استفاده از هلندی به عنوان زبان
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **نوع:** `object`
-   **اجباری:** خیر

می‌توانید نسبت به عنصر منطبق روی صفحه کلیک کنید. این کار براساس پیکسل‌های نسبی `above` (بالا)، `right` (راست)، `below` (پایین) یا `left` (چپ) از عنصر منطبق انجام می‌شود.

:::note

ترکیب‌های زیر مجاز هستند

-   خصوصیت‌های تکی
-   `above` + `left` یا `above` + `right`
-   `below` + `left` یا `below` + `right`

ترکیب‌های زیر مجاز **نیستند**

-   `above` به همراه `below`
-   `left` به همراه `right`

:::

#### `relativePosition.above`

-   **نوع:** `number`
-   **اجباری:** خیر

x پیکسل `بالای` عنصر منطبق کلیک کنید.

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

-   **نوع:** `number`
-   **اجباری:** خیر

x پیکسل `سمت راست` عنصر منطبق کلیک کنید.

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

-   **نوع:** `number`
-   **اجباری:** خیر

x پیکسل `پایین` عنصر منطبق کلیک کنید.

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

-   **نوع:** `number`
-   **اجباری:** خیر

x پیکسل `سمت چپ` عنصر منطبق کلیک کنید.

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

می‌توانید منطق فازی برای یافتن متن را با گزینه‌های زیر تغییر دهید. این ممکن است به یافتن تطابق بهتر کمک کند.

#### `fuzzyFindOptions.distance`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 100

تعیین می‌کند تطابق چقدر باید به موقعیت فازی (مشخص شده توسط location) نزدیک باشد. یک تطابق دقیق حرف که به فاصله character از موقعیت فازی باشد، به عنوان عدم تطابق کامل امتیازدهی می‌شود. فاصله 0 نیاز دارد که تطابق در مکان دقیق مشخص شده باشد. فاصله 1000 نیاز به تطابق کامل در محدوده 800 کاراکتر از موقعیت برای یافتن با آستانه 0.8 دارد.

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

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 0

تعیین می‌کند تقریباً در کجای متن انتظار می‌رود الگو پیدا شود.

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

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 0.6

در چه نقطه‌ای الگوریتم تطابق تسلیم می‌شود. آستانه 0 نیاز به تطابق کامل (هم حروف و هم موقعیت) دارد، آستانه 1.0 با هر چیزی مطابقت می‌کند.

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

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** false

آیا جستجو باید به بزرگی و کوچکی حروف حساس باشد.

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

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 2

فقط تطابق‌هایی که طول آنها از این مقدار بیشتر است برگردانده می‌شوند. (به عنوان مثال، اگر می‌خواهید تطابق‌های تک کاراکتری را در نتیجه نادیده بگیرید، آن را روی 2 تنظیم کنید)

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

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** false

وقتی `true` باشد، تابع تطبیق حتی اگر یک تطابق کامل قبلاً در رشته یافت شده باشد، تا انتهای الگوی جستجو ادامه خواهد داد.

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