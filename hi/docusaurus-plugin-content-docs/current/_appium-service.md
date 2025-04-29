---
id: appium-service
title: Appium सेवा
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-appium-service/README.md
---


Appium सर्वर को संभालना वास्तविक WebdriverIO प्रोजेक्ट के दायरे से बाहर है। यह सेवा आपको [WDIO टेस्टरनर](https://webdriver.io/docs/clioptions) के साथ परीक्षण चलाते समय आसानी से Appium सर्वर चलाने में मदद करती है। यह चाइल्ड प्रोसेस में [Appium सर्वर](https://appium.github.io/appium.io/docs/en/about-appium/getting-started/index.html#starting-appium) शुरू करता है।

## स्थापना

सबसे आसान तरीका है `@wdio/appium-service` को अपने `package.json` में devDependency के रूप में रखना, इसके माध्यम से:

```sh
npm install @wdio/appium-service --save-dev
```

`WebdriverIO` को कैसे स्थापित किया जाए, इस पर निर्देश [यहां](https://webdriver.io/docs/gettingstarted) मिल सकते हैं।

## कॉन्फ़िगरेशन

सेवा का उपयोग करने के लिए आपको अपनी सेवा सरणी में `appium` जोड़ने की आवश्यकता है:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // default appium port
    services: ['appium'],
    // ...
};
```

## विकल्प

निम्नलिखित विकल्प wdio.conf.js फ़ाइल में जोड़े जा सकते हैं। सेवा के लिए विकल्प परिभाषित करने के लिए आपको निम्न तरीके से `services` सूची में सेवा जोड़ने की आवश्यकता है:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // default appium port
    services: [
        ['appium', {
            // Appium service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath
वह पथ जहां Appium सर्वर से सभी लॉग संग्रहीत किए जाने चाहिए।

प्रकार: `String`

उदाहरण:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command
अपने Appium स्थापना का उपयोग करने के लिए, जैसे कि वैश्विक रूप से स्थापित, उस कमांड को निर्दिष्ट करें जिसे शुरू किया जाना चाहिए।

प्रकार: `String`

उदाहरण:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            command : 'appium'
        }]
    ],
    // ...
}
```

### args
Appium सर्वर के लिए तर्कों का मानचित्र, सीधे `appium` को पारित किया जाता है।

संभावित तर्कों के लिए [दस्तावेज़ीकरण](https://github.com/appium/appium/blob/master/packages/appium/docs/en/cli/args.md) देखें।
तर्क लोअर कैमल केस में प्रदान किए जाते हैं। उदाहरण के लिए, `debugLogSpacing: true` `--debug-log-spacing` में परिवर्तित हो जाता है, या वे Appium दस्तावेज़ीकरण में बताए अनुसार प्रदान किए जा सकते हैं।

प्रकार: `Object`

डिफ़ॉल्ट: `{}`

उदाहरण:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            args: {
                // ...
                debugLogSpacing: true,
                platformName: 'iOS'
                // ...
            }
        }]
    ],
    // ...
}
```
**नोट:** उपनामों के उपयोग को हतोत्साहित और असमर्थित किया जाता है। इसके बजाय, कृपया लोअर कैमल केस में पूर्ण प्रॉपर्टी नाम का उपयोग करें।

----

WebdriverIO पर अधिक जानकारी के लिए [होमपेज](https://webdriver.io) देखें।