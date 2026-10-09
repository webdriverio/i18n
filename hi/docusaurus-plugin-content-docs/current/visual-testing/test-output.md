---
id: test-output
title: टेस्ट आउटपुट
description: "विज़ुअल सर्विस के save और check मेथड्स द्वारा उत्पन्न आउटपुट और इमेजेज़ को समझें, जिसमें लेआउट टेस्टिंग और ब्लॉक-आउट्स शामिल हैं।"
---

:::info

उदाहरण इमेज आउटपुट के लिए [इस WebdriverIO](https://guinea-pig.webdriver.io/image-compare.html) डेमो साइट का उपयोग किया गया है।

:::

## `enableLayoutTesting`

इसे [सर्विस ऑप्शंस](./service-options#enablelayouttesting) के साथ-साथ [मेथड](./method-options) स्तर पर भी सेट किया जा सकता है।

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

[सर्विस ऑप्शंस](./service-options#enablelayouttesting) के लिए इमेज आउटपुट [मेथड](./method-options) के समान है, नीचे देखें।

### इमेज आउटपुट

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
// या
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
// या
await browser.checkFullPageScreen("full-page-tag", {enableLayoutTesting: true})
```

![saveFullPageScreens Desktop](/img/visual/layout-fullPage-chrome-latest-1366x768.png)

</TabItem>

<TabItem value="saveTabbablePage">

```js
await browser.saveTabbablePage("tabbable-page-tag")
// या
await browser.checkTabbablePage("tabbable-page-tag", {enableLayoutTesting: true})
```

![saveFullPageScreens Desktop](/img/visual/layout-tabbable-chrome-latest-1366x768.png)

</TabItem>
</Tabs>


## save(Screen/Element/FullPageScreen)

### कंसोल आउटपुट

`save(Screen/Element/FullPageScreen)` मेथड्स, मेथड के निष्पादित होने के बाद निम्नलिखित जानकारी प्रदान करेंगे:

```js
const saveResult = await browser.saveFullPageScreen({ ... })
console.log(saveResults)
/**
 * {
 *   // उस इंस्टेंस का डिवाइस पिक्सेल रेशियो जो चलाया गया है
 *   devicePixelRatio: 1,
 *   // फॉर्मेट किया गया फ़ाइल नाम, यह `formatImageName` ऑप्शंस पर निर्भर करता है
 *   fileName: "examplePage-chrome-latest-1366x768.png",
 *   // वह पाथ जहाँ वास्तविक स्क्रीनशॉट फ़ाइल पाई जा सकती है
 *   path: "/path/to/project/.tmp/actual/desktop_chrome",
 * };
 */
```

### इमेज आउटपुट

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

:::info TIP
iOS `saveScreen` निष्पादन डिफ़ॉल्ट रूप से डिवाइस बेज़ल कॉर्नर्स के साथ नहीं होते हैं। इसे प्राप्त करने के लिए कृपया सर्विस को इंस्टैंशिएट करते समय `addIOSBezelCorners:true` ऑप्शन जोड़ें, [यह](./service-options#addiosbezelcorners) देखें
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

### कंसोल आउटपुट

डिफ़ॉल्ट रूप से, `check(Screen/Element/FullPageScreen)` मेथड्स केवल `1.23` जैसा मिसमैच प्रतिशत प्रदान करेंगे, लेकिन जब प्लगइन में `returnAllCompareData: true` ऑप्शन होता है, तो मेथड के निष्पादित होने के बाद निम्नलिखित जानकारी प्रदान की जाती है:

```js
const checkResult = await browser.checkFullPageScreen({ ... })
console.log(checkResult)
/**
 * {
 *     // फॉर्मेट किया गया फ़ाइल नाम, यह `formatImageName` ऑप्शंस पर निर्भर करता है
 *     fileName: "examplePage-chrome-headless-latest-1366x768.png",
 *     folders: {
 *         // वास्तविक (actual) फ़ोल्डर और फ़ाइल नाम
 *         actual: "/path/to/project/.tmp/actual/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *         // बेसलाइन फ़ोल्डर और फ़ाइल नाम
 *         baseline:
 *             "/path/to/project/localBaseline/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *         // निम्नलिखित फ़ोल्डर वैकल्पिक है और केवल तभी होता है जब कोई मिसमैच हो
 *         // वह फ़ोल्डर जिसमें डिफ़्स होते हैं और फ़ाइल नाम
 *         diff: "/path/to/project/.tmp/diff/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *     },
 *     // मिसमैच प्रतिशत
 *     misMatchPercentage: 2.34,
 * };
 */
```

### इमेज आउटपुट

:::info
नीचे दी गई इमेजेज़ केवल check कमांड्स चलाने के परिणामस्वरूप अंतर दिखाएंगी। केवल ब्राउज़र में डिफ़ दिखाया गया है, लेकिन Android और iOS के लिए आउटपुट समान है।
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
बटन टेक्स्ट को `Get Started` से `Getting Started!` में बदल दिया गया है और इसे एक बदलाव के रूप में पहचाना गया है।
:::

![Button Check Result](/img/visual/button-check.png)
</TabItem>

<TabItem value="checkscreen">

```js
await browser.checkScreen("example-page-tag")
```

:::info
बटन टेक्स्ट को `Get Started` से `Getting Started!` में बदल दिया गया है और इसे एक बदलाव के रूप में पहचाना गया है।
:::

![Button Check Result](/img/visual/screen-check.png)

</TabItem>

<TabItem value="checkfullpagescreen">

```js
await browser.checkFullPageScreen("full-page-tag")
```

:::info
बटन टेक्स्ट को `Get Started` से `Getting Started!` में बदल दिया गया है और इसे एक बदलाव के रूप में पहचाना गया है।
:::

![Button Check Result](/img/visual/fullpage-check.png)

</TabItem>

</Tabs>

## ब्लॉक-आउट्स

यहाँ आपको Android NativeWebScreenshot और iOS में ब्लॉक-आउट्स के लिए एक उदाहरण आउटपुट मिलेगा, जहाँ स्टेटस+एड्रेस बार और टूलबार को ब्लॉक आउट किया गया है।

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