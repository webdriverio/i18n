---
id: ocr-click-on-text
title: ocrClickOnText
description: "با ocrClickOnText بر اساس متن قابل مشاهده روی یک عنصر کلیک کنید؛ این دستور متن را با استفاده از OCR و تطبیق فازی روی صفحه پیدا می‌کند."
---

بر اساس متن‌های ارائه‌شده روی یک عنصر کلیک کنید. این دستور متن ارائه‌شده را جستجو می‌کند و تلاش می‌کند بر اساس منطق فازی (Fuzzy Logic) از [Fuse.js](https://fusejs.io/) یک تطابق پیدا کند. این بدان معناست که اگر سلکتوری با غلط املایی ارائه دهید، یا متن یافت‌شده صددرصد مطابق نباشد، باز هم تلاش می‌کند یک عنصر به شما برگرداند. [لاگ‌ها](#logs) را در ادامه ببینید.

## نحوه استفاده

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

در [`imagesFolder`](./getting-started#imagesfolder) (پیش‌فرض) خود تصویری با یک نشانگر هدف خواهید یافت که به شما نشان می‌دهد ماژول کجا کلیک کرده است.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## گزینه‌ها

### `text`

<Option type="string" required="yes">

متنی که می‌خواهید برای کلیک کردن روی آن جستجو کنید.

</Option>
#### مثال

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

این مدت زمان کلیک است. در صورت تمایل می‌توانید با افزایش این زمان یک «کلیک طولانی» نیز ایجاد کنید.

</Option>
#### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // This is 3 seconds
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

هرچه کنتراست بیشتر باشد، تصویر تیره‌تر می‌شود و برعکس. این می‌تواند به یافتن متن در تصویر کمک کند. این گزینه مقادیری بین `-1` و `1` را می‌پذیرد.

</Option>
#### مثال

```js
await browser.ocrClickOnText({
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
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OR
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

<Option type="string" default="eng" required="No">

زبانی که Tesseract تشخیص خواهد داد. اطلاعات بیشتر را می‌توانید [اینجا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) بیابید و زبان‌های پشتیبانی‌شده را می‌توانید [اینجا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) پیدا کنید.

</Option>
#### مثال

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

می‌توانید نسبت به عنصر منطبق روی صفحه کلیک کنید. این کار بر اساس پیکسل‌های نسبی `above`، `right`، `below` یا `left` از عنصر منطبق انجام می‌شود.

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

به اندازه x پیکسل `above` (بالای) عنصر منطبق کلیک می‌کند.

</Option>
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

<Option type="number" required="no">

به اندازه x پیکسل در سمت `right` (راست) عنصر منطبق کلیک می‌کند.

</Option>
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

<Option type="number" required="no">

به اندازه x پیکسل `below` (پایین) عنصر منطبق کلیک می‌کند.

</Option>
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

<Option type="number" required="no">

به اندازه x پیکسل در سمت `left` (چپ) عنصر منطبق کلیک می‌کند.

</Option>
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

با گزینه‌های زیر می‌توانید منطق فازی برای یافتن متن را تغییر دهید. این ممکن است به یافتن تطابق بهتری کمک کند.

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

تعیین می‌کند که تطابق چقدر باید به موقعیت فازی (که توسط location مشخص می‌شود) نزدیک باشد. یک تطابق دقیق حرف که به اندازه distance کاراکتر از موقعیت فازی فاصله داشته باشد، به‌عنوان عدم تطابق کامل امتیاز می‌گیرد. مقدار distance برابر با 0 مستلزم آن است که تطابق دقیقاً در موقعیت مشخص‌شده باشد. مقدار distance برابر با 1000 مستلزم آن است که با استفاده از threshold برابر با 0.8، یک تطابق کامل در فاصله 800 کاراکتری از موقعیت قرار داشته باشد تا یافت شود.

</Option>
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

<Option type="number" default="0" required="no">

تعیین می‌کند که الگو تقریباً در کجای متن انتظار می‌رود یافت شود.

</Option>
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

<Option type="number" default="0.6" required="no">

الگوریتم تطابق در چه نقطه‌ای دست از تلاش می‌کشد. threshold برابر با 0 مستلزم تطابق کامل (هم از نظر حروف و هم موقعیت) است، و threshold برابر با 1.0 با هر چیزی تطابق خواهد داشت.

</Option>
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

<Option type="boolean" default="false" required="no">

اینکه آیا جستجو باید به بزرگی و کوچکی حروف حساس باشد یا خیر.

</Option>
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

<Option type="number" default="2" required="no">

فقط تطابق‌هایی که طول آن‌ها از این مقدار بیشتر باشد برگردانده می‌شوند. (برای مثال، اگر می‌خواهید تطابق‌های تک‌کاراکتری را در نتیجه نادیده بگیرید، آن را روی 2 تنظیم کنید)

</Option>
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

<Option type="number" default="false" required="no">

وقتی `true` باشد، تابع تطابق حتی اگر یک تطابق کامل قبلاً در رشته پیدا شده باشد، تا انتهای الگوی جستجو ادامه می‌دهد.

</Option>
##### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```