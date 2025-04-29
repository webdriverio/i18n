---
id: wdio-ywinappdriver-service
title: ywinappdriver सेवा
custom_edit_url: https://github.com/licanhua/wdio-ywinappdriver-service/edit/main/README.md
---


> wdio-ywinappdriver-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/licanhua/wdio-ywinappdriver-service) | [npm](https://www.npmjs.com/package/wdio-ywinappdriver-service)

यह सेवा आपको [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html) के साथ परीक्षण चलाते समय यwinappdriver सर्वर को निर्बाध रूप से चलाने में मदद करती है। यह चाइल्ड प्रोसेस में [ywinappdriver](https://github.com/licanhua/YWinAppDriver) को शुरू करता है।

## इंस्टॉलेशन

```bash
npm install wdio-ywinappdriver-service --save-dev
```

`WebdriverIO` कैसे इंस्टॉल करें इसके निर्देश [यहां](https://webdriver.io/docs/gettingstarted.html) पाए जा सकते हैं।

## कॉन्फ़िगरेशन

सेवा का उपयोग करने के लिए आपको अपनी सेवा सरणी में `ywinappdriver` जोड़ने की आवश्यकता है:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['ywinappdriver'],
    // ...
};
```

## विकल्प

निम्नलिखित विकल्प wdio.conf.js फ़ाइल में जोड़े जा सकते हैं। सेवा के लिए विकल्प परिभाषित करने के लिए आपको निम्न तरीके से `services` सूची में सेवा को जोड़ने की आवश्यकता है:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            // ywinappdriver service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath

पथ जहां ywinappdriver सर्वर से सभी लॉग संग्रहीत किए जाने चाहिए।

प्रकार: `String`

उदाहरण:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

अपने स्वयं के winappdriver इंस्टॉलेशन का उपयोग करने के लिए, जैसे वैश्विक रूप से इंस्टॉल किया गया, उस कमांड को निर्दिष्ट करें जिसे शुरू किया जाना चाहिए।

प्रकार: `String`

उदाहरण:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            command : 'c:\\xx\\ywinappdriver.exe'
        }]
    ],
    // ...
}
```

### args

तर्कों की सूची सीधे `ywinappdriver` को भेजी जाती है।

संभावित तर्कों के लिए [दस्तावेज़ीकरण](https://github.com/licanhua/ywinappdriver) देखें।

प्रकार: `Array`

डिफ़ॉल्ट: `[]`

उदाहरण:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            args: ['--urls' 'http://127.0.0.1:4723' '--basepath' '/wd/hub']
        }]
    ],
    // ...
}
```