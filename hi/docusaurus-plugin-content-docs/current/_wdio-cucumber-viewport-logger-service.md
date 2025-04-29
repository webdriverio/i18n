---
id: wdio-cucumber-viewport-logger-service
title: कुकुम्बर व्यूपोर्ट लॉगर सर्विस
custom_edit_url: https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/edit/main/README.md
---


> wdio-cucumber-viewport-logger-service is a 3rd party package, for more information please see [GitHub](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service) | [npm](https://www.npmjs.com/package/wdio-cucumber-viewport-logger-service)
## Cucumber Viewport Logger Service for WebdriverIO

यह सेवा आपके WebdriverIO-आधारित समाधान में आपके Cucumber स्टेप्स और अन्य डीबग जानकारी को सीधे आपकी ब्राउज़र विंडो में लॉग करने की संभावना जोड़ती है। यह विशेष रूप से उन मामलों में उपयोगी हो सकता है जहां उपकरणों या वर्चुअल मशीनों का उपयोग किया जाता है जिनमें प्रत्यक्ष *भौतिक* पहुंच नहीं है और आपके e2e परीक्षणों के गहन डीबगिंग के लिए एक इंटरैक्टिव सत्र स्थापित करने की संभावना नहीं है।

![demo](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/raw/main/img/demo.gif)

### Quick Start

पैकेज इंस्टॉल करें:

```bash
npm install wdio-cucumber-viewport-logger-service --save-dev
```

अपने `services` कॉन्फिग सेक्शन में सर्विस जोड़ें, उदाहरण के लिए:

```js
  services: [
    //...
    'cucumber-viewport-logger',
    //...
]
```

### Service options

| Option  | Description | Type |Default value |
| --- | --- | --- | --- |
| `numberOfSteps`  | व्यूपोर्ट पर प्रस्तुत होने वाले स्टेप्स की संख्या  | number |3 |
| `enabled`  | सेवा को सक्षम/अक्षम करें | boolean |true |
| `styles`  | लॉगर रैपर, *स्टेप कीवर्ड* और *स्टेप टेक्स्ट* के लिए CSS स्टाइल, नीचे दिए गए उदाहरण देखें  | object |{} |

```js
// wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
            numberOfSteps: 5,
            enabled: process.env.VP_LOGGER === '1', // service will be enabled only when you set `VP_LOGGER` enviroment variable to `1`
            // set CSS custom styles for particular elements
            styles: {
                wrapper: { backgroundColor: 'white' },
                keyword: { color: 'red' },
                text: {
                    fontSize: '30px',
                    color: 'green',
                },
                closeButton: {
                    color: 'red',
                },
            },
        },]
    ]
    // ...
};
```

### API

> `logToViewport(message, styles)` - कस्टम CSS स्टाइल (अनिवार्य नहीं) के साथ कस्टम संदेश प्रदर्शित करें, आप इसे अपने स्टेप परिभाषाओं में उपयोग कर सकते हैं
उदाहरण के लिए:
>```js
>When(/^I render message: "([^"]*)"$/, { timeout: 120000 }, function (message) {
>    browser.logToViewport(message, { text: { color: 'green' } });
>});
>```


> `removeViewportLogMessage()` - व्यूपोर्ट संदेश अनुभाग हटाएं, उदाहरण के लिए विज़ुअल एसर्शन करने के लिए उपयोगी हो सकता है

### pointerEvents: 'none'

डिफ़ॉल्ट रूप से, सभी माउस इवेंट्स (क्लिकिंग, होवरिंग, आदि) संदेश अनुभाग के माध्यम से जाते हैं, उदाहरण के लिए: संदेश अनुभाग पर क्लिक करने के बजाय आपका क्लिक संदेश के आगे मौजूद एलिमेंट (आपके ऐप एलिमेंट) को "पास" हो जाता है, अगर आप इस व्यवहार को बदलना चाहते हैं तो रैपर स्टाइल 'pointerEvents' विकल्प को 'auto' पर सेट करें, उदाहरण:
```js

/ wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
     
            styles: {
                wrapper: { pointerEvents: 'auto' },
            },
        },]
    ]
    // ...
};
```