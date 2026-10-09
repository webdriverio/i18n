---
id: methods
title: متدها
description: "از متدهای save و check سرویس بصری برای گرفتن اسکرین‌شات و مقایسهٔ صفحه‌ها، المنت‌ها و صفحه‌های کامل با تصاویر مبنا استفاده کنید."
---

متدهای زیر به آبجکت سراسری [`browser`](/docs/api/browser) در WebdriverIO اضافه می‌شوند.

## متدهای ذخیره

:::info نکته
از متدهای ذخیره فقط زمانی استفاده کنید که **نمی‌خواهید** صفحه‌ها را مقایسه کنید و فقط می‌خواهید از یک المنت یا صفحه اسکرین‌شات بگیرید.
:::

### `saveElement`

تصویری از یک المنت را ذخیره می‌کند.

#### نحوهٔ استفاده

```ts
await browser.saveElement(
    // element
    await $('#element-selector'),
    // tag
    'your-reference',
    // saveElementOptions
    {
        // ...
    }
);
```

#### پشتیبانی

- مرورگرهای دسکتاپ
- مرورگرهای موبایل
- اپلیکیشن‌های هیبریدی موبایل
- اپلیکیشن‌های نیتیو موبایل

#### پارامترها

-   **`element`:**
    -   **اجباری:** بله
    -   **نوع:** WebdriverIO Element
-   **`tag`:**
    -   **اجباری:** بله
    -   **نوع:** string
-   **`saveElementOptions`:**
    -   **اجباری:** خیر
    -   **نوع:** آبجکتی از گزینه‌ها، به [گزینه‌های ذخیره](./method-options#save-options) مراجعه کنید

#### خروجی:

به صفحهٔ [خروجی تست](./test-output#savescreenelementfullpagescreen) مراجعه کنید.

### `saveScreen`

تصویری از viewport را ذخیره می‌کند.

#### نحوهٔ استفاده

```ts
await browser.saveScreen(
    // tag
    'your-reference',
    // saveScreenOptions
    {
        // ...
    }
);
```

#### پشتیبانی

- مرورگرهای دسکتاپ
- مرورگرهای موبایل
- اپلیکیشن‌های هیبریدی موبایل
- اپلیکیشن‌های نیتیو موبایل

#### پارامترها
-   **`tag`:**
    -   **اجباری:** بله
    -   **نوع:** string
-   **`saveScreenOptions`:**
    -   **اجباری:** خیر
    -   **نوع:** آبجکتی از گزینه‌ها، به [گزینه‌های ذخیره](./method-options#save-options) مراجعه کنید

#### خروجی:

به صفحهٔ [خروجی تست](./test-output#savescreenelementfullpagescreen) مراجعه کنید.

### `saveFullPageScreen`

#### نحوهٔ استفاده

تصویری از کل صفحه را ذخیره می‌کند.

```ts
await browser.saveFullPageScreen(
    // tag
    'your-reference',
    // saveFullPageScreenOptions
    {
        // ...
    }
);
```

#### پشتیبانی

- مرورگرهای دسکتاپ
- مرورگرهای موبایل

#### پارامترها
-   **`tag`:**
    -   **اجباری:** بله
    -   **نوع:** string
-   **`saveFullPageScreenOptions`:**
    -   **اجباری:** خیر
    -   **نوع:** آبجکتی از گزینه‌ها، به [گزینه‌های ذخیره](./method-options#save-options) مراجعه کنید

#### خروجی:

به صفحهٔ [خروجی تست](./test-output#savescreenelementfullpagescreen) مراجعه کنید.

### `saveTabbablePage`

تصویری از کل صفحه به همراه خطوط و نقاط قابل پیمایش با Tab (tabbable) را ذخیره می‌کند.

#### نحوهٔ استفاده

```ts
await browser.saveTabbablePage(
    // tag
    'your-reference',
    // saveTabbableOptions
    {
        // ...
    }
);
```

#### پشتیبانی

- مرورگرهای دسکتاپ

#### پارامترها
-   **`tag`:**
    -   **اجباری:** بله
    -   **نوع:** string
-   **`saveTabbableOptions`:**
    -   **اجباری:** خیر
    -   **نوع:** آبجکتی از گزینه‌ها، به [گزینه‌های ذخیره](./method-options#save-options) مراجعه کنید

#### خروجی:

به صفحهٔ [خروجی تست](./test-output#savescreenelementfullpagescreen) مراجعه کنید.

## متدهای بررسی

:::info نکته
هنگامی که متدهای `check` برای اولین بار استفاده می‌شوند، هشدار زیر را در لاگ‌ها مشاهده خواهید کرد. این بدان معناست که اگر می‌خواهید تصویر مبنای (baseline) خود را ایجاد کنید، نیازی به ترکیب متدهای `save` و `check` ندارید.

```shell
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/project/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
 If you want the module to auto save a non existing image to the baseline you
 can provide 'autoSaveBaseline: true' to the options.
#####################################################################################
```

:::

### `checkElement`

تصویری از یک المنت را با یک تصویر مبنا مقایسه می‌کند.

#### نحوهٔ استفاده

```ts
await browser.checkElement(
    // element
    '#element-selector',
    // tag
    'your-reference',
    // checkElementOptions
    {
        // ...
    }
);
```

#### پشتیبانی

- مرورگرهای دسکتاپ
- مرورگرهای موبایل
- اپلیکیشن‌های هیبریدی موبایل
- اپلیکیشن‌های نیتیو موبایل

#### پارامترها
-   **`element`:**
    -   **اجباری:** بله
    -   **نوع:** WebdriverIO Element
-   **`tag`:**
    -   **اجباری:** بله
    -   **نوع:** string
-   **`checkElementOptions`:**
    -   **اجباری:** خیر
    -   **نوع:** آبجکتی از گزینه‌ها، به [گزینه‌های مقایسه/بررسی](./method-options#compare-check-options) مراجعه کنید

#### خروجی:

به صفحهٔ [خروجی تست](./test-output#checkscreenelementfullpagescreen) مراجعه کنید.

### `checkScreen`

تصویری از viewport را با یک تصویر مبنا مقایسه می‌کند.

#### نحوهٔ استفاده

```ts
await browser.checkScreen(
    // tag
    'your-reference',
    // checkScreenOptions
    {
        // ...
    }
);
```

#### پشتیبانی

- مرورگرهای دسکتاپ
- مرورگرهای موبایل
- اپلیکیشن‌های هیبریدی موبایل
- اپلیکیشن‌های نیتیو موبایل

#### پارامترها
-   **`tag`:**
    -   **اجباری:** بله
    -   **نوع:** string
-   **`checkScreenOptions`:**
    -   **اجباری:** خیر
    -   **نوع:** آبجکتی از گزینه‌ها، به [گزینه‌های مقایسه/بررسی](./method-options#compare-check-options) مراجعه کنید

#### خروجی:

به صفحهٔ [خروجی تست](./test-output#checkscreenelementfullpagescreen) مراجعه کنید.

### `checkFullPageScreen`

تصویری از کل صفحه را با یک تصویر مبنا مقایسه می‌کند.

#### نحوهٔ استفاده

```ts
await browser.checkFullPageScreen(
    // tag
    'your-reference',
    // checkFullPageOptions
    {
        // ...
    }
);
```

#### پشتیبانی

- مرورگرهای دسکتاپ
- مرورگرهای موبایل

#### پارامترها
-   **`tag`:**
    -   **اجباری:** بله
    -   **نوع:** string
-   **`checkFullPageOptions`:**
    -   **اجباری:** خیر
    -   **نوع:** آبجکتی از گزینه‌ها، به [گزینه‌های مقایسه/بررسی](./method-options#compare-check-options) مراجعه کنید

#### خروجی:

به صفحهٔ [خروجی تست](./test-output#checkscreenelementfullpagescreen) مراجعه کنید.

### `checkTabbablePage`

تصویری از کل صفحه به همراه خطوط و نقاط قابل پیمایش با Tab (tabbable) را با یک تصویر مبنا مقایسه می‌کند.

#### نحوهٔ استفاده

```ts
await browser.checkTabbablePage(
    // tag
    'your-reference',
    // checkTabbableOptions
    {
        // ...
    }
);
```

#### پشتیبانی

- مرورگرهای دسکتاپ

#### پارامترها
-   **`tag`:**
    -   **اجباری:** بله
    -   **نوع:** string
-   **`checkTabbableOptions`:**
    -   **اجباری:** خیر
    -   **نوع:** آبجکتی از گزینه‌ها، به [گزینه‌های مقایسه/بررسی](./method-options#compare-check-options) مراجعه کنید

#### خروجی:

به صفحهٔ [خروجی تست](./test-output#checkscreenelementfullpagescreen) مراجعه کنید.