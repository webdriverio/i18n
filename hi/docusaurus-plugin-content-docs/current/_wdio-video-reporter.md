---
id: wdio-video-reporter
title: वीडियो रिपोर्टर
custom_edit_url: https://github.com/presidenten/wdio-video-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-video-reporter एक तीसरे पक्ष का पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/presidenten/wdio-video-reporter) | [npm](https://www.npmjs.com/package/wdio-video-reporter)

![Logo](https://raw.githubusercontent.com/presidenten/wdio-video-reporter-example-report/master/wdio-video-reporter.png)

यह [Webdriver IO v6 और उससे ऊपर](https://webdriver.io/) के लिए एक रिपोर्टर है जो आपके wdio टेस्ट एक्जीक्यूशन के वीडियो बनाता है। अगर आप allure का उपयोग करते हैं, तो टेस्ट केस स्वचालित रूप से वीडियो के साथ सजाए जाते हैं। (Webdriver IO v5 के लिए, कृपया wdio-video-reporter संस्करण ^2.0.0 का उपयोग करें।)

वीडियो `wdio.config.outputDir` में जाते हैं

विफल टेस्टों पर वीडियो के साथ उदाहरण Allure रिपोर्ट यहां देखें:
https://presidenten.github.io/wdio-video-reporter-example-report/

![example-allure-report](https://media.giphy.com/media/7Fgle7bHGrxR3zY6Gw/giphy.gif)

फायदे:
- आपकी allure रिपोर्ट में अच्छे वीडियो
- अच्छी मानव गति के वीडियो, भले ही टेस्ट तेज़ हों
- Selenium ग्रिड के साथ काम करता है
- सभी वेबड्राइवरों के साथ काम करता है जो `saveScreenshot` का समर्थन करते हैं
- Selenium 3.141.59 का उपयोग करके निम्नलिखित डेस्कटॉप ब्राउज़रों पर सत्यापित:
  - Chrome
  - Firefox
  - Safari
  - Internet Explorer 11
  - Microsoft Edge
- [Appium](http://appium.io/docs/en/about-appium/getting-started/) 1.13.0-beta3 के साथ निम्नलिखित ios और android उपकरणों पर सत्यापित:
  - Iphone 8
  - Ipad Gen 6
  - Samsung galaxy S9
  - Samsung galaxy tab A10

नुकसान:
- "क्रियाओं" के बाद स्क्रीनशॉट लेकर काम करता है, जिससे टेस्ट थोड़ा धीमा हो जाता है। इसे सावधानीपूर्वक चुनकर कम किया जाता है कि कौन से [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) संदेश स्क्रीनशॉट का परिणाम देंगे
- Selenium ड्राइवर्स स्क्रीनशॉट में अलर्ट-बॉक्स और पॉपअप शामिल नहीं करते हैं, इसलिए वे वीडियो में दिखाई नहीं देते हैं


त्वरित प्रारंभ
===========

तेजी से शुरू करने के लिए [wdio-template](https://github.com/presidenten/wdio-template) पर सरल टेम्पलेट देखें।

रिपॉजिटरी को क्लोन करें और `yarn` या `npm install` के साथ निर्भरताओं को इंस्टॉल करें। फिर डेमो डायरेक्टरी में `yarn e2e` या `npm run e2e` चलाएं और अंत में allure रिपोर्ट देखने के लिए `yarn report` या `npm run report` चलाएं।


इंस्टॉलेशन
============

रिपोर्टर इंस्टॉल करें
--------------------

`yarn add wdio-video-reporter`
या
`npm install wdio-video-reporter`


कॉन्फिग में रिपोर्टर जोड़ें
--------------------------

`wdio.conf.js`-फ़ाइल के शीर्ष पर, लाइब्रेरी को रिक्वायर करें:
```
const video = require('wdio-video-reporter');
```

फिर रिपोर्टर्स प्रॉपर्टी में वीडियो रिपोर्टर को कॉन्फिगरेशन में जोड़ें:

```
 reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
  ],
```


Allure के साथ उपयोग
-----------------

Allure रिपोर्टर को भी जोड़ने से, रिपोर्ट स्वचालित रूप से वीडियो के साथ अपडेट हो जाती हैं बिना किसी कॉन्फिगरेशन की आवश्यकता के :-)

```
 reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
```


कॉन्फिगरेशन
=============

सामान्य कॉन्फिगरेशन पैरामीटर
-------------------------------

अधिकांश उपयोगकर्ता इन्हें सेट करना चाह सकते हैं

- `saveAllVideos` पास होने वाले टेस्ट के लिए वीडियो सहेजने के लिए true पर सेट करें। `डिफ़ॉल्ट: false`
- `videoSlowdownMultiplier` 1-100 के बीच पूर्णांक। बढ़ाएं अगर वीडियो बहुत तेज़ी से चल रहे हैं। `डिफ़ॉल्ट: 3`
- `videoRenderTimeout` वीडियो रेंडर होने के लिए प्रतीक्षा करने के लिए अधिकतम सेकंड। `डिफ़ॉल्ट: 5`
- `outputDir` अगर यह सेट नहीं है, तो यह wdio.config.outputDir का उपयोग करता है। `डिफ़ॉल्ट: undefined`
- `outputDir` अगर यह सेट नहीं है, तो यह wdio.config.outputDir का उपयोग करता है। `डिफ़ॉल्ट: undefined`
- `maxTestNameCharacters` टेस्ट नाम की अधिकतम लंबाई। `डिफ़ॉल्ट: 250`

उन्नत कॉन्फिगरेशन पैरामीटर
---------------------------------

उन्नत उपयोगकर्ता जो यह बदलना चाहते हैं कि इंजन कब स्क्रीनग्रैब करता है, वे इन्हें संपादित कर सकते हैं। इन सरणियों को [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) संदेश के अंतिम शब्द से भरा जा सकता है, जैसे /session/:sessionId/`buttondown`।

- `addExcludedActions` ऐसे क्रियाएँ जोड़ें जहां स्क्रीनशॉट अनावश्यक हैं। `डिफ़ॉल्ट: []`
- `addJsonWireActions` ऐसे क्रियाएँ जोड़ें जहां स्क्रीनशॉट गायब हैं। `डिफ़ॉल्ट: []`
- `recordAllActions` फ़िल्टरिंग को छोड़ें और सब कुछ स्क्रीनशॉट करें। (अनुशंसित नहीं) `डिफ़ॉल्ट: false`

संसाधित संदेशों को देखने के लिए, `wdio.config.logLevel: 'debug'` सेट करें और `outputDir/wdio-X-Y-Video-reporter.log` देखें। यह स्क्रीनशॉट आउटपुट डायरेक्टरी को समीक्षा के लिए भी बरकरार रखेगा

अतिरिक्त लॉगिंग से पूरी तरह बचने के लिए और केवल वीडियो फ़ाइलें प्राप्त करने के लिए, `wdio.config.logLevel: 'silent'` सेट करें।

Cucumber समर्थन
----------------

यदि आप Allure रिपोर्टर का उपयोग कर रहे हैं, तो आपको निम्नलिखित कार्य करना होगा:

- अंतर्निहित node assertions के बजाय `chai` का उपयोग करें अन्यथा विफल परीक्षण आपके स्टेप परिभाषाओं में टूटे हुए के रूप में रिपोर्ट किए जाते हैं
- `wdio.conf.js` फ़ाइल में Allure विकल्प में `useCucumberStepReporter: true` जोड़ें, एक विशिष्ट कॉन्फिगरेशन इस प्रकार दिखाई देगी:
```
  reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }],
  ],
```
एक पूर्ण उदाहरण के लिए, [wdio-template](https://github.com/presidenten/wdio-template/tree/cucumber) पर cucumber ब्रांच देखें


Appium सेटअप
------------

`wdio-video-reporter` v1.2.4 से डेस्कटॉप और डिवाइसों पर safari और chrome ब्राउज़रों के बीच अंतर करने में Allure की मदद करने के लिए समर्थन है।
रिपोर्टर विभिन्न उपकरणों की पहचान करने के लिए कस्टम प्रॉपर्टी `deviceType` का उपयोग करता है।
अनुशंसित मान `phone` और `tablet` हैं।
डेस्कटॉप Chrome ब्राउज़रों के रूप में समान Selenium ग्रिड में डिवाइसों का उपयोग करते समय Chrome वेबड्राइवर में एक बग से बचने के लिए _सभी_ ब्राउज़रों के लिए `browserVersion` को शामिल करना भी अनुशंसित है।

जनरेट होने वाली वीडियो फ़ाइलों में ब्राउज़र नाम के साथ `deviceType` भी जोड़ दिया जाएगा।

उदाहरण appium कॉन्फिगरेशन:
```
  "capabilities": [
    {
      ...
      "deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    }
  ],
```

और `wdio-config.json`:
```
  "capabilities": [
    {
      ...
      "appium:deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    },
  ],
```


योगदान
============

फोर्क करें, परिवर्तन करें, कुछ टेस्ट लिखें, लिंट करें, टेस्ट चलाएं, बिल्ड करें, और डेमो में सत्यापित करें कि परिवर्तन जैसा होना चाहिए वैसे काम करते हैं, फिर PR बनाएं।

डेमो फ़ोल्डर लाइब्रेरी के बिल्ड संस्करण के साथ काम करता है, इसलिए यदि आपने नई सुविधाएं जोड़ी हैं और उन्हें आज़माना चाहते हैं तो बिल्ड करना सुनिश्चित करें।


धन्यवाद
======

[Johnson E](https://github.com/jonn-set) को Cucumber समर्थन को ठीक करने के लिए धन्यवाद जिसके लिए बहुत से उपयोगकर्ताओं ने पूछा है।