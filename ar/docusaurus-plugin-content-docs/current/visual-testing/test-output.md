---
id: test-output
title: مخرجات الاختبار
description: "افهم المخرجات والصور التي تنتجها دوال الحفظ والتحقق في الخدمة المرئية، بما في ذلك اختبار التخطيط والمناطق المحجوبة."
---

:::info

تم استخدام [موقع WebdriverIO](https://guinea-pig.webdriver.io/image-compare.html) التجريبي هذا لمخرجات الصور في الأمثلة.

:::

## `enableLayoutTesting`

يمكن تعيين هذا الخيار في [خيارات الخدمة](./service-options#enablelayouttesting) وكذلك على مستوى [الدالة](./method-options).

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

مخرجات الصور لـ [خيارات الخدمة](./service-options#enablelayouttesting) مماثلة لمخرجات [الدالة](./method-options)، انظر أدناه.

### مخرجات الصور

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
// أو
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
// أو
await browser.checkFullPageScreen("full-page-tag", {enableLayoutTesting: true})
```

![saveFullPageScreens Desktop](/img/visual/layout-fullPage-chrome-latest-1366x768.png)

</TabItem>

<TabItem value="saveTabbablePage">

```js
await browser.saveTabbablePage("tabbable-page-tag")
// أو
await browser.checkTabbablePage("tabbable-page-tag", {enableLayoutTesting: true})
```

![saveFullPageScreens Desktop](/img/visual/layout-tabbable-chrome-latest-1366x768.png)

</TabItem>
</Tabs>


## save(Screen/Element/FullPageScreen)

### مخرجات وحدة التحكم

ستوفر دوال `save(Screen/Element/FullPageScreen)` المعلومات التالية بعد تنفيذ الدالة:

```js
const saveResult = await browser.saveFullPageScreen({ ... })
console.log(saveResults)
/**
 * {
 *   // نسبة البكسل للجهاز الخاصة بالنسخة التي تم تشغيلها
 *   devicePixelRatio: 1,
 *   // اسم الملف المنسق، يعتمد هذا على الخيار `formatImageName`
 *   fileName: "examplePage-chrome-latest-1366x768.png",
 *   // المسار الذي يمكن العثور فيه على ملف لقطة الشاشة الفعلية
 *   path: "/path/to/project/.tmp/actual/desktop_chrome",
 * };
 */
```

### مخرجات الصور

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

:::info نصيحة
عمليات تنفيذ `saveScreen` على iOS لا تتضمن افتراضيًا زوايا إطار الجهاز. للحصول عليها، يرجى إضافة الخيار `addIOSBezelCorners:true` عند إنشاء الخدمة، انظر [هذا](./service-options#addiosbezelcorners)
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

### مخرجات وحدة التحكم

افتراضيًا، ستوفر دوال `check(Screen/Element/FullPageScreen)` نسبة عدم التطابق فقط مثل `1.23`، ولكن عندما يحتوي المكون الإضافي على الخيار `returnAllCompareData: true` يتم توفير المعلومات التالية بعد تنفيذ الدالة:

```js
const checkResult = await browser.checkFullPageScreen({ ... })
console.log(checkResult)
/**
 * {
 *     // اسم الملف المنسق، يعتمد هذا على الخيار `formatImageName`
 *     fileName: "examplePage-chrome-headless-latest-1366x768.png",
 *     folders: {
 *         // المجلد الفعلي واسم الملف
 *         actual: "/path/to/project/.tmp/actual/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *         // مجلد الصورة المرجعية واسم الملف
 *         baseline:
 *             "/path/to/project/localBaseline/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *         // المجلد التالي اختياري ويظهر فقط في حال وجود عدم تطابق
 *         // المجلد الذي يحتوي على الاختلافات واسم الملف
 *         diff: "/path/to/project/.tmp/diff/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *     },
 *     // نسبة عدم التطابق
 *     misMatchPercentage: 2.34,
 * };
 */
```

### مخرجات الصور

:::info
ستعرض الصور أدناه الاختلافات الناتجة عن تشغيل أوامر التحقق فقط. يتم عرض الاختلاف في المتصفح فقط، لكن المخرجات لنظامي Android وiOS هي نفسها.
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
تم تغيير نص الزر من `Get Started` إلى `Getting Started!` وتم اكتشافه كتغيير.
:::

![Button Check Result](/img/visual/button-check.png)
</TabItem>

<TabItem value="checkscreen">

```js
await browser.checkScreen("example-page-tag")
```

:::info
تم تغيير نص الزر من `Get Started` إلى `Getting Started!` وتم اكتشافه كتغيير.
:::

![Button Check Result](/img/visual/screen-check.png)

</TabItem>

<TabItem value="checkfullpagescreen">

```js
await browser.checkFullPageScreen("full-page-tag")
```

:::info
تم تغيير نص الزر من `Get Started` إلى `Getting Started!` وتم اكتشافه كتغيير.
:::

![Button Check Result](/img/visual/fullpage-check.png)

</TabItem>

</Tabs>

## المناطق المحجوبة

ستجد هنا مثالًا على مخرجات المناطق المحجوبة في Android NativeWebScreenshot وiOS حيث يتم حجب شريط الحالة والعنوان وشريط الأدوات.

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