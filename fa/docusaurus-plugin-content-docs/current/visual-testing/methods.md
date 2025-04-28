---
id: methods
title: متدها
---

متدهای زیر به شیء جهانی WebdriverIO [`browser`](/docs/api/browser) اضافه شده‌اند.

## متدهای ذخیره‌سازی

:::info نکته
فقط زمانی از متدهای ذخیره‌سازی استفاده کنید که **نمی‌خواهید** صفحه‌نمایش‌ها را مقایسه کنید، بلکه فقط می‌خواهید یک تصویر از عنصر/صفحه داشته باشید.
:::

### `saveElement`

تصویری از یک عنصر را ذخیره می‌کند.

#### نحوه استفاده

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
- اپلیکیشن‌های هیبرید موبایل
- اپلیکیشن‌های بومی موبایل

#### پارامترها

-   **`element`:**
    -   **اجباری:** بله
    -   **نوع:** عنصر WebdriverIO
-   **`tag`:**
    -   **اجباری:** بله
    -   **نوع:** رشته
-   **`saveElementOptions`:**
    -   **اجباری:** خیر
    -   **نوع:** شیئی از گزینه‌ها، به [گزینه‌های ذخیره‌سازی](./method-options#save-options) مراجعه کنید

#### خروجی:

به صفحه [خروجی تست](./test-output#savescreenelementfullpagescreen) مراجعه کنید.

### `saveScreen`

تصویری از یک نمای قابل مشاهده را ذخیره می‌کند.

#### نحوه استفاده

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
- اپلیکیشن‌های هیبرید موبایل
- اپلیکیشن‌های بومی موبایل

#### پارامترها
-   **`tag`:**
    -   **اجباری:** بله
    -   **نوع:** رشته
-   **`saveScreenOptions`:**
    -   **اجباری:** خیر
    -   **نوع:** شیئی از گزینه‌ها، به [گزینه‌های ذخیره‌سازی](./method-options#save-options) مراجعه کنید

#### خروجی:

به صفحه [خروجی تست](./test-output#savescreenelementfullpagescreen) مراجعه کنید.

### `saveFullPageScreen`

#### نحوه استفاده

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
    -   **نوع:** رشته
-   **`saveFullPageScreenOptions`:**
    -   **اجباری:** خیر
    -   **نوع:** شیئی از گزینه‌ها، به [گزینه‌های ذخیره‌سازی](./method-options#save-options) مراجعه کنید

#### خروجی:

به صفحه [خروجی تست](./test-output#savescreenelementfullpagescreen) مراجعه کنید.

### `saveTabbablePage`

تصویری از کل صفحه همراه با خطوط و نقاط قابل انتقال با کلید Tab را ذخیره می‌کند.

#### نحوه استفاده

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
    -   **نوع:** رشته
-   **`saveTabbableOptions`:**
    -   **اجباری:** خیر
    -   **نوع:** شیئی از گزینه‌ها، به [گزینه‌های ذخیره‌سازی](./method-options#save-options) مراجعه کنید

#### خروجی:

به صفحه [خروجی تست](./test-output#savescreenelementfullpagescreen) مراجعه کنید.

## متدهای بررسی

:::info نکته
وقتی متدهای `check` برای اولین بار استفاده می‌شوند، هشدار زیر را در لاگ‌ها مشاهده خواهید کرد. این بدان معناست که اگر می‌خواهید خط پایه خود را ایجاد کنید، نیازی به ترکیب متدهای `save` و `check` ندارید.

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

تصویر یک عنصر را با یک تصویر پایه مقایسه می‌کند.

#### نحوه استفاده

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
- اپلیکیشن‌های هیبرید موبایل
- اپلیکیشن‌های بومی موبایل

#### پارامترها
-   **`element`:**
    -   **اجباری:** بله
    -   **نوع:** عنصر WebdriverIO
-   **`tag`:**
    -   **اجباری:** بله
    -   **نوع:** رشته
-   **`checkElementOptions`:**
    -   **اجباری:** خیر
    -   **نوع:** شیئی از گزینه‌ها، به [گزینه‌های مقایسه/بررسی](./method-options#compare-check-options) مراجعه کنید

#### خروجی:

به صفحه [خروجی تست](./test-output#checkscreenelementfullpagescreen) مراجعه کنید.

### `checkScreen`

تصویر یک نمای قابل مشاهده را با یک تصویر پایه مقایسه می‌کند.

#### نحوه استفاده

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
- اپلیکیشن‌های هیبرید موبایل
- اپلیکیشن‌های بومی موبایل

#### پارامترها
-   **`tag`:**
    -   **اجباری:** بله
    -   **نوع:** رشته
-   **`checkScreenOptions`:**
    -   **اجباری:** خیر
    -   **نوع:** شیئی از گزینه‌ها، به [گزینه‌های مقایسه/بررسی](./method-options#compare-check-options) مراجعه کنید

#### خروجی:

به صفحه [خروجی تست](./test-output#checkscreenelementfullpagescreen) مراجعه کنید.

### `checkFullPageScreen`

تصویر کل صفحه را با یک تصویر پایه مقایسه می‌کند.

#### نحوه استفاده

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
    -   **نوع:** رشته
-   **`checkFullPageOptions`:**
    -   **اجباری:** خیر
    -   **نوع:** شیئی از گزینه‌ها، به [گزینه‌های مقایسه/بررسی](./method-options#compare-check-options) مراجعه کنید

#### خروجی:

به صفحه [خروجی تست](./test-output#checkscreenelementfullpagescreen) مراجعه کنید.

### `checkTabbablePage`

تصویر کل صفحه همراه با خطوط و نقاط قابل انتقال با کلید Tab را با یک تصویر پایه مقایسه می‌کند.

#### نحوه استفاده

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
    -   **نوع:** رشته
-   **`checkTabbableOptions`:**
    -   **اجباری:** خیر
    -   **نوع:** شیئی از گزینه‌ها، به [گزینه‌های مقایسه/بررسی](./method-options#compare-check-options) مراجعه کنید

#### خروجی:

به صفحه [خروجی تست](./test-output#checkscreenelementfullpagescreen) مراجعه کنید.