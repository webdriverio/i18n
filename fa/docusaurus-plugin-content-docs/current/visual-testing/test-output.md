---
id: test-output
title: خروجی تست
description: "خروجی و تصاویر تولید شده توسط متدهای save و check در سرویس بصری، از جمله تست طرح‌بندی و پوشاندن نواحی (block-outs) را درک کنید."
---

:::info

سایت نمایشی [این WebdriverIO](https://guinea-pig.webdriver.io/image-compare.html) برای نمونه خروجی تصویر استفاده شده است.

:::

## `enableLayoutTesting`

این گزینه را می‌توان هم در [گزینه‌های سرویس](./service-options#enablelayouttesting) و هم در سطح [متد](./method-options) تنظیم کرد.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            'visual',
            {
                enableLayoutTesting: true
            }
        ]
    ]
    // ...
}
```

خروجی تصویر برای [گزینه‌های سرویس](./service-options#enablelayouttesting) با خروجی [متد](./method-options) یکسان است، به موارد زیر مراجعه کنید.

### خروجی تصویر

<Tabs
    defaultValue="saveelement"
    values={[
        {label: 'saveElement | checkElement', value: 'saveelement'},
        {label: 'saveScreen | checkScreen', value: 'savescreen'},
        {label: 'saveFullPageScreen | checkFullPageScreen', value: 'savefullpagescreen'},
        {label: 'saveTabbablePage | checkTabbablePage', value: 'saveTabbablePage'},
    ]}
>
<TabItem value="saveelement">

```js
await browser.saveElement(".features_vqN4", "example-element-tag", {enableLayoutTesting: true})
// Or
await browser.checkElement(".features_vqN4", "example-element-tag", {enableLayoutTesting: true})
```

![saveElement Desktop](/img/visual/layout-element-local-chrome-latest-1366x768.png)

</TabItem>

<TabItem value="savescreen">

```js
await browser.saveScreen("example-page-tag")
```

![saveScreen Desktop](/img/visual/layout-viewportScreenshot-chrome-latest-1366x768.png)

</TabItem>

<TabItem value="savefullpagescreen">

```js
await browser.saveFullPageScreen("full-page-tag")
// Or
await browser.checkFullPageScreen("full-page-tag", {enableLayoutTesting: true})
```

![saveFullPageScreens Desktop](/img/visual/layout-fullPage-chrome-latest-1366x768.png)

</TabItem>

<TabItem value="saveTabbablePage">

```js
await browser.saveTabbablePage("tabbable-page-tag")
// Or
await browser.checkTabbablePage("tabbable-page-tag", {enableLayoutTesting: true})
```

![saveFullPageScreens Desktop](/img/visual/layout-tabbable-chrome-latest-1366x768.png)

</TabItem>
</Tabs>


## save(Screen/Element/FullPageScreen)

### خروجی کنسول

متدهای `save(Screen/Element/FullPageScreen)` پس از اجرا، اطلاعات زیر را ارائه می‌دهند:

```js
const saveResult = await browser.saveFullPageScreen({ ... })
console.log(saveResults)
/**
 * {
 *   // نسبت پیکسل دستگاه (device pixel ratio) نمونه‌ای که اجرا شده است
 *   devicePixelRatio: 1,
 *   // نام فایل قالب‌بندی شده، این به گزینه‌های `formatImageName` بستگی دارد
 *   fileName: "examplePage-chrome-latest-1366x768.png",
 *   // مسیری که فایل اسکرین‌شات واقعی در آن قرار دارد
 *   path: "/path/to/project/.tmp/actual/desktop_chrome",
 * };
 */
```

### خروجی تصویر

<Tabs
    defaultValue="saveelement"
    values={[
        {label: 'saveElement', value: 'saveelement'},
        {label: 'saveScreen', value: 'savescreen'},
        {label: 'saveFullPageScreen', value: 'savefullpagescreen'},
    ]}
>
<TabItem value="saveelement">

```js
await browser.saveElement(".hero__title-logo", "example-element-tag")
```

<Tabs
    defaultValue="desktop"
    values={[
        {label: 'Desktop', value: 'desktop'},
        {label: 'Android', value: 'android'},
        {label: 'iOS', value: 'ios'},
    ]}
>
<TabItem value="desktop">
![saveElement Desktop](/img/visual/wdioLogo-chrome-latest-1-1366x768.png)
</TabItem>
<TabItem value="android">
![saveElement Mobile Android](/img/visual/wdioLogo-EmulatorAndroidGoogleAPIPortraitNativeWebScreenshot14.0-384x640.png)
</TabItem>
<TabItem value="ios">
![saveElement Mobile iOS](/img/visual/wdioLogo-Iphone12Portrait16-390x844.png)
</TabItem>
</Tabs>
</TabItem>

<TabItem value="savescreen">

```js
await browser.saveScreen("example-page-tag")
```

<Tabs
    defaultValue="desktop"
    values={[
        {label: 'Desktop', value: 'desktop'},
        {label: 'Android ChromeDriver', value: 'android-chromedriver'},
        {label: 'Android nativeWebScreenshot', value: 'android-native'},
        {label: 'iOS', value: 'ios'},
    ]}
>
<TabItem value="desktop">
![saveScreen Desktop](/img/visual/examplePage-chrome-latest-1366x768.png)
</TabItem>
<TabItem value="android-chromedriver">
![saveScreen Mobile Android ChromeDriver](/img/visual/screenshot-EmulatorAndroidGoogleAPIPortraitChromeDriver14.0-384x640.png)
</TabItem>
<TabItem value="android-native">
![saveScreen Mobile Android nativeWebScreenshot](/img/visual/screenshot-EmulatorAndroidGoogleAPIPortraitNativeWebScreenshot14.0-384x640.png)
</TabItem>
<TabItem value="ios">

:::info نکته
اجراهای `saveScreen` در iOS به طور پیش‌فرض شامل گوشه‌های قاب (bezel) دستگاه نیستند. برای داشتن این قابلیت، لطفاً هنگام راه‌اندازی سرویس گزینه `addIOSBezelCorners:true` را اضافه کنید، [این](./service-options#addiosbezelcorners) را ببینید
:::

![saveScreen Mobile iOS](/img/visual/screenshot-Iphone12Portrait15-390x844.png)
</TabItem>
</Tabs>
</TabItem>

<TabItem value="savefullpagescreen">

```js
await browser.saveFullPageScreen("full-page-tag")
```

<Tabs
    defaultValue="desktop"
    values={[
        {label: 'Desktop', value: 'desktop'},
        {label: 'Android', value: 'android'},
        {label: 'iOS', value: 'ios'},
    ]}
>
<TabItem value="desktop">
![saveFullPageScreens Desktop](/img/visual/fullPage-chrome-latest-1366x768.png)
</TabItem>
<TabItem value="android">
![saveFullPageScreens Mobile Android](/img/visual/fullPage-EmulatorAndroidGoogleAPIPortraitChromeDriver14.0-384x640.png)
</TabItem>
<TabItem value="ios">
![saveFullPageScreens Mobile iOS](/img/visual/fullPage-Iphone12Portrait16-390x844.png)
</TabItem>
</Tabs>
</TabItem>
</Tabs>

## check(Screen/Element/FullPageScreen)

### خروجی کنسول

به طور پیش‌فرض، متدهای `check(Screen/Element/FullPageScreen)` فقط یک درصد عدم تطابق مانند `1.23` ارائه می‌دهند، اما هنگامی که افزونه دارای گزینه `returnAllCompareData: true` باشد، اطلاعات زیر پس از اجرای متد ارائه می‌شود:

```js
const checkResult = await browser.checkFullPageScreen({ ... })
console.log(checkResult)
/**
 * {
 *     // نام فایل قالب‌بندی شده، این به گزینه‌های `formatImageName` بستگی دارد
 *     fileName: "examplePage-chrome-headless-latest-1366x768.png",
 *     folders: {
 *         // پوشه واقعی (actual) و نام فایل
 *         actual: "/path/to/project/.tmp/actual/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *         // پوشه مرجع (baseline) و نام فایل
 *         baseline:
 *             "/path/to/project/localBaseline/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *         // پوشه زیر اختیاری است و فقط در صورت وجود عدم تطابق وجود دارد
 *         // پوشه‌ای که تفاوت‌ها (diffs) را نگه می‌دارد و نام فایل
 *         diff: "/path/to/project/.tmp/diff/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *     },
 *     // درصد عدم تطابق
 *     misMatchPercentage: 2.34,
 * };
 */
```

### خروجی تصویر

:::info
تصاویر زیر فقط تفاوت‌های حاصل از اجرای دستورات check را نشان می‌دهند. فقط تفاوت در یک مرورگر نشان داده شده است، اما خروجی برای Android و iOS یکسان است.
:::

<Tabs
    defaultValue="checkelement"
    values={[
        {label: 'checkElement', value: 'checkelement'},
        {label: 'checkScreen', value: 'checkscreen'},
        {label: 'checkFullPageScreen', value: 'checkfullpagescreen'},
    ]}
>
<TabItem value="checkelement">

```js
await browser.checkElement("#__docusaurus_skipToContent_fallback > header > div > div.buttons_pzbO > a:nth-child(1)", "example-element-tag")
```

:::info
متن دکمه از `Get Started` به `Getting Started!` تغییر داده شده و به عنوان یک تغییر شناسایی شده است.
:::

![Button Check Result](/img/visual/button-check.png)
</TabItem>

<TabItem value="checkscreen">

```js
await browser.checkScreen("example-page-tag")
```

:::info
متن دکمه از `Get Started` به `Getting Started!` تغییر داده شده و به عنوان یک تغییر شناسایی شده است.
:::

![Button Check Result](/img/visual/screen-check.png)

</TabItem>

<TabItem value="checkfullpagescreen">

```js
await browser.checkFullPageScreen("full-page-tag")
```

:::info
متن دکمه از `Get Started` به `Getting Started!` تغییر داده شده و به عنوان یک تغییر شناسایی شده است.
:::

![Button Check Result](/img/visual/fullpage-check.png)

</TabItem>

</Tabs>

## پوشاندن نواحی (Block-Outs)

در اینجا نمونه‌ای از خروجی پوشاندن نواحی در Android NativeWebScreenshot و iOS را خواهید یافت که در آن نوار وضعیت + نوار آدرس و نوار ابزار پوشانده شده‌اند.

<Tabs
    defaultValue="nativeWebScreenshot"
    values={[
        {label: 'Android nativeWebScreenshot', value: 'nativeWebScreenshot'},
        {label: 'iOS', value: 'ios'},
    ]}
>
<TabItem value="nativeWebScreenshot">

![Blockouts Android](/img/visual/android.blockouts.png)

</TabItem>

<TabItem value="ios">

![Blockouts iOS](/img/visual/ios.blockouts.png)

</TabItem>

</Tabs>