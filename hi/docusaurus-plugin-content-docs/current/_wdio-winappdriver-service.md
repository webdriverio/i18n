---
id: wdio-winappdriver-service
title: विनएपड्राइवर सेवा
custom_edit_url: https://github.com/licanhua/wdio-winappdriver-service/edit/main/README.md
---


> wdio-winappdriver-service एक तीसरी पार्टी पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/licanhua/wdio-winappdriver-service) | [npm](https://www.npmjs.com/package/wdio-winappdriver-service)

यह सेवा आपको [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html) के साथ परीक्षण चलाते समय WinAppDriver सर्वर को निर्बाध रूप से चलाने में मदद करती है। यह [WinAppDriver](https://github.com/Microsoft/WinAppDriver) को एक चाइल्ड प्रोसेस में शुरू करता है।

## इंस्टॉलेशन

```bash
npm install wdio-winappdriver-service --save-dev
```

`WebdriverIO` को इंस्टॉल करने के निर्देश [यहां](https://webdriver.io/docs/gettingstarted.html) मिल सकते हैं।

## कॉन्फ़िगरेशन

सेवा का उपयोग करने के लिए आपको अपनी सेवा सरणी में `winappdriver` जोड़ने की आवश्यकता है:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['winappdriver'],
    // ...
};
```

## विकल्प

निम्नलिखित विकल्प wdio.conf.js फ़ाइल में जोड़े जा सकते हैं। सेवा के लिए विकल्प परिभाषित करने के लिए आपको सेवा को `services` सूची में निम्न तरीके से जोड़ने की आवश्यकता है:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            // WinAppDriver service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath

पथ जहां winappdriver सर्वर से सभी लॉग संग्रहीत किए जाने चाहिए।

प्रकार: `String`

उदाहरण:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

अपने स्वयं के WinAppDriver इंस्टॉलेशन का उपयोग करने के लिए, जैसे ग्लोबली इंस्टॉल किया गया, उस कमांड को निर्दिष्ट करें जिसे शुरू किया जाना चाहिए।

प्रकार: `String`

उदाहरण:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            command : 'c:\\Program Files (x86)\\Windows Application Driver\\WinAppDriver.exe'
        }]
    ],
    // ...
}
```

### args

`WinAppDriver` को सीधे पास किए जाने वाले तर्कों की सूची।

संभावित तर्कों के लिए [दस्तावेज़ीकरण](https://github.com/Microsoft/WinAppDriver) देखें।

प्रकार: `Array`

डिफ़ॉल्ट: `[]`

उदाहरण:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            args: ['10.0.0.10', '4723/wd/hub']
        }]
    ],
    // ...
}
```