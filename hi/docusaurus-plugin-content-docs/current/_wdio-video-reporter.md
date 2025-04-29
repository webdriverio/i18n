---
id: wdio-video-reporter
title: वीडियो रिपोर्टर
custom_edit_url: https://github.com/presidenten/wdio-video-reporter/edit/main/README.md
---


> wdio-video-reporter एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/presidenten/wdio-video-reporter) | [npm](https://www.npmjs.com/package/wdio-video-reporter)

![Logo](https://raw.githubusercontent.com/presidenten/wdio-video-reporter-example-report/master/wdio-video-reporter.png)

यह [Webdriver IO v6 और उच्चतर](https://webdriver.io/) के लिए एक रिपोर्टर है जो आपके wdio टेस्ट निष्पादन के वीडियो बनाता है। यदि आप allure का उपयोग करते हैं, तो टेस्ट केस स्वचालित रूप से वीडियो के साथ सजाए जाते हैं। (Webdriver IO v5 के लिए, कृपया wdio-video-reporter संस्करण ^2.0.0 का उपयोग करें।)

वीडियो `wdio.config.outputDir` में समाप्त होते हैं

असफल परीक्षणों पर शामिल वीडियो के साथ यहां उदाहरण Allure रिपोर्ट देखें:
https://presidenten.github.io/wdio-video-reporter-example-report/

![example-allure-report](https://media.giphy.com/media/7Fgle7bHGrxR3zY6Gw/giphy.gif)

फायदे:
- आपकी allure रिपोर्ट में अच्छे वीडियो
- अच्छी मानव गति वाले वीडियो, भले ही परीक्षण तेज हों
- Selenium ग्रिड के साथ काम करता है
- सभी webdrivers के साथ काम करता है जो `saveScreenshot` का समर्थन करते हैं
- Selenium 3.141.59 का उपयोग करके निम्नलिखित डेस्कटॉप ब्राउज़रों पर सत्यापित:
  - Chrome
  - Firefox
  - Safari
  - Internet Explorer 11
  - Microsoft Edge
- [Appium](http://appium.io/docs/en/about-appium/getting-started/) 1.13.0-beta3 के साथ निम्नलिखित ios और android डिवाइसों पर सत्यापित:
  - Iphone 8
  - Ipad Gen 6
  - Samsung galaxy S9
  - Samsung galaxy tab A10

नुकसान:
- "क्रियाओं" के बाद स्क्रीनशॉट लेकर काम करता है, जिससे परीक्षण थोड़े धीमे हो जाते हैं। इसे सावधानीपूर्वक चुनकर कम किया जाता है कि कौन से [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) संदेश स्क्रीनशॉट में परिणत होंगे
- Selenium ड्राइवर स्क्रीनशॉट में अलर्ट-बॉक्स और पॉपअप शामिल नहीं करते हैं, इसलिए वे वीडियो में दिखाई नहीं देते हैं


त्वरित आरंभ
===========

जल्दी से शुरू करने के लिए [wdio-template](https://github.com/presidenten/wdio-template) पर सरल टेम्पलेट देखें।

रिपॉजिटरी में से एक को क्लोन करें और निर्भरताओं को `yarn` या `npm install` के साथ इंस्टॉल करें। फिर डेमो डायरेक्टरी में `yarn e2e` या `npm run e2e` चलाएं और अंत में allure रिपोर्ट देखने के लिए `yarn report` या `npm run report` चलाएं।


इंस्टालेशन
============

रिपोर्टर इंस्टॉल करें
--------------------

`yarn add wdio-video-reporter`
या
`npm install wdio-video-reporter`


कॉन्फिग में रिपोर्टर जोड़ें
--------------------------

`wdio.conf.js`-फाइल के शीर्ष पर, लाइब्रेरी की आवश्यकता है:
```
const video = require('wdio-video-reporter');
```

फिर reporters प्रॉपर्टी में वीडियो रिपोर्टर को कॉन्फ़िगरेशन में जोड़ें:

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

Allure रिपोर्टर को भी जोड़ने से, कुछ भी कॉन्फ़िगर करने की आवश्यकता के बिना स्वचालित रूप से रिपोर्ट को वीडियो के साथ अपडेट किया जाता है :-)

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


कॉन्फ़िगरेशन
=============

सामान्य कॉन्फ़िगरेशन पैरामीटर
-------------------------------

अधिकांश उपयोगकर्ता इन्हें सेट करना चाह सकते हैं

- `saveAllVideos` पास होने वाले परीक्षणों के लिए वीडियो सहेजने के लिए true पर सेट करें। `डिफ़ॉल्ट: false`
- `videoSlowdownMultiplier` [1-100] के बीच पूर्णांक। यदि वीडियो बहुत जल्दी चल रहे हैं तो बढ़ाएं। `डिफ़ॉल्ट: 3`
- `videoRenderTimeout` वीडियो को रेंडर करने के लिए प्रतीक्षा करने के लिए अधिकतम सेकंड। `डिफ़ॉल्ट: 5`
- `outputDir` यदि यह सेट नहीं है, तो यह wdio.config.outputDir का उपयोग करता है। `डिफ़ॉल्ट: undefined`
- `outputDir` यदि यह सेट नहीं है, तो यह wdio.config.outputDir का उपयोग करता है। `डिफ़ॉल्ट: undefined`
- `maxTestNameCharacters` परीक्षण नाम की अधिकतम लंबाई। `डिफ़ॉल्ट: 250`

उन्नत कॉन्फ़िगरेशन पैरामीटर
---------------------------------

उन्नत उपयोगकर्ता जो इंजन द्वारा स्क्रीनग्रैब बनाने के समय को बदलना चाहते हैं वे इन्हें संपादित कर सकते हैं। इन ऐरे को [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) संदेश के अंतिम शब्द से भरा जा सकता है, जैसे /session/:sessionId/`buttondown`।

- `addExcludedActions` ऐसी क्रियाएँ जोड़ें जहां स्क्रीनशॉट अनावश्यक हैं। `डिफ़ॉल्ट: []`
- `addJsonWireActions` ऐसी क्रियाएँ जोड़ें जहां स्क्रीनशॉट गायब हैं। `डिफ़ॉल्ट: []`
- `recordAllActions` फ़िल्टरिंग छोड़ें और सब कुछ स्क्रीनशॉट लें। (अनुशंसित नहीं) `डिफ़ॉल्ट: false`

प्रोसेस्ड संदेशों को देखने के लिए, `wdio.config.logLevel: 'debug'` सेट करें और `outputDir/wdio-X-Y-Video-reporter.log` देखें। यह स्क्रीनशॉट आउटपुट डायरेक्टरी को समीक्षा के लिए भी बनाए रखेगा

अतिरिक्त लॉगिंग से पूरी तरह बचने के लिए और केवल वीडियो फ़ाइलें प्राप्त करने के लिए, `wdio.config.logLevel: 'silent'` सेट करें।

Cucumber समर्थन
----------------

यदि आप Allure रिपोर्टर का उपयोग कर रहे हैं, तो आपको यह सुनिश्चित करना होगा कि आप निम्नलिखित करें:

- बिल्ट-इन नोड अस्सर्शन का उपयोग करने के बजाय `chai` का उपयोग करें अन्यथा विफल परीक्षण आपके स्टेप्स डेफिनिशन में टूटे हुए के रूप में रिपोर्ट किए जाते हैं
- `wdio.conf.js` फाइल में Allure विकल्प में `useCucumberStepReporter: true` जोड़ें, एक विशिष्ट कॉन्फ़िगरेशन इस प्रकार दिखेगी:
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
पूर्ण उदाहरण के लिए, [wdio-template](https://github.com/presidenten/wdio-template/tree/cucumber) पर cucumber ब्रांच देखें


Appium सेटअप
------------

`wdio-video-reporter` v1.2.4 से, डेस्कटॉप और डिवाइसों पर safari और chrome ब्राउज़रों के बीच अंतर करने में Allure की मदद करने के लिए समर्थन है।
रिपोर्टर विभिन्न डिवाइसों की आईडी के लिए कस्टम प्रॉपर्टी `deviceType` का उपयोग करता है।
अनुशंसित मान `phone` और `tablet` हैं।
यह अनुशंसित है कि डेस्कटॉप क्रोम ब्राउज़रों के रूप में एक ही सेलेनियम ग्रिड में उपकरणों का उपयोग करते समय क्रोम वेबड्राइवर में एक बग से बचने के लिए _सभी_ ब्राउज़रों के लिए `browserVersion` भी शामिल किया जाए।

उत्पन्न वीडियो फाइलों में ब्राउज़र नाम में `deviceType` भी जोड़ा जाएगा।

appium कॉन्फिगरेशन का उदाहरण:
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

फोर्क करें, परिवर्तन करें, कुछ परीक्षण लिखें, लिंट करें, परीक्षण चलाएं, बिल्ड करें, और डेमो में सत्यापित करें कि परिवर्तन उनके अनुसार काम करते हैं, फिर एक PR बनाएं।

डेमो फोल्डर लाइब्रेरी के बिल्ड वर्जन के साथ काम करता है, इसलिए यदि आपने नई सुविधाएँ जोड़ी हैं और उन्हें आज़माना चाहते हैं तो बिल्ड करना सुनिश्चित करें।


धन्यवाद
======

[Johnson E](https://github.com/jonn-set) को Cucumber समर्थन ठीक करने के लिए धन्यवाद जिसे बहुत से उपयोगकर्ताओं ने मांगा था।