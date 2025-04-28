---
id: ocr-click-on-text
title: ocrClickOnText
---

کلیک بر روی یک عنصر بر اساس متن‌های ارائه شده. این دستور متن ارائه شده را جستجو می‌کند و سعی می‌کند یک تطابق را بر اساس منطق فازی از [Fuse.js](https://fusejs.io/) پیدا کند. این بدان معناست که اگر شما یک انتخابگر با اشتباه تایپی ارائه دهید، یا متن یافت شده ممکن است تطابق ۱۰۰٪ نباشد، هنوز سعی خواهد کرد یک عنصر به شما برگرداند. [لاگ‌ها](#logs) را در زیر ببینید.

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

شما یک تصویر در پوشه (پیش‌فرض) [`imagesFolder`](./getting-started#imagesfolder) خود با یک هدف برای نشان دادن جایی که ماژول کلیک کرده است، پیدا خواهید کرد.

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

این مدت زمان کلیک است. اگر می‌خواهید می‌توانید با افزایش زمان یک "کلیک طولانی" نیز ایجاد کنید.

#### مثال

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // این 3 ثانیه است
});
```

### `contrast`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** `0.25`

هر چه کنتراست بالاتر باشد، تصویر تاریک‌تر و برعکس. این می‌تواند به یافتن متن در تصویر کمک کند. مقادیر بین `-1` و `1` را می‌پذیرد.

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

این ناحیه جستجو در صفحه است که OCR باید به دنبال متن بگردد. این می‌تواند یک عنصر یا یک مستطیل شامل `x`، `y`، `width` و `height` باشد.

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

زبانی که Tesseract تشخیص خواهد داد. اطلاعات بیشتر را می‌توانید [اینجا](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) پیدا کنید و زبان‌های پشتیبانی شده را می‌توانید [اینجا](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) پیدا کنید.

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

می‌توانید نسبت به عنصر منطبق در صفحه کلیک کنید. این کار می‌تواند بر اساس پیکسل‌های نسبی `above`، `right`، `below` یا `left` از عنصر منطبق انجام شود.

:::note

ترکیب‌های زیر مجاز هستند

-   خصوصیت‌های تکی
-   `above` + `left` یا `above` + `right`
-   `below` + `left` یا `below` + `right`

ترکیب‌های زیر مجاز **نیستند**

-   `above` به علاوه `below`
-   `left` به علاوه `right`

:::

#### `relativePosition.above`

-   **نوع:** `number`
-   **اجباری:** خیر

x پیکسل `بالای` عنصر منطبق کلیک کنید.

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

x پیکسل `سمت راست` عنصر منطبق کلیک کنید.

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

x پیکسل `زیر` عنصر منطبق کلیک کنید.

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

x پیکسل `سمت چپ` عنصر منطبق کلیک کنید.

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

می‌توانید منطق فازی را برای یافتن متن با گزینه‌های زیر تغییر دهید. این ممکن است به یافتن تطابق بهتر کمک کند.

#### `fuzzyFindOptions.distance`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** 100

تعیین می‌کند که تطابق باید چقدر به محل فازی (مشخص شده توسط location) نزدیک باشد. یک تطابق دقیق حرف که به اندازه distance کاراکتر از محل فازی دور باشد، به عنوان عدم تطابق کامل امتیازدهی می‌شود. فاصله 0 نیاز دارد که تطابق در محل دقیق مشخص شده باشد. فاصله 1000 نیاز به تطابق کامل در فاصله 800 کاراکتری از محل برای یافتن با استفاده از آستانه 0.8 دارد.

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

تعیین می‌کند که الگو تقریباً کجا در متن انتظار می‌رود پیدا شود.

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

در چه نقطه‌ای الگوریتم تطبیق تسلیم می‌شود. آستانه 0 نیاز به تطابق کامل (هم حروف و هم مکان) دارد، آستانه 1.0 با هر چیزی مطابقت خواهد داشت.

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

آیا جستجو باید به حروف بزرگ و کوچک حساس باشد.

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

فقط تطابق‌هایی که طول آنها از این مقدار بیشتر باشد برگردانده می‌شود. (برای مثال، اگر می‌خواهید از تطابق‌های تک کاراکتری در نتیجه صرف نظر کنید، آن را 2 تنظیم کنید)

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