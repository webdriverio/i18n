---
id: wdio-timeline-reporter
title: टाइमलाइन रिपोर्टर
custom_edit_url: https://github.com/QualityOps/wdio-timeline-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-timeline-reporter is a 3rd party package, for more information please see [GitHub](https://github.com/QualityOps/wdio-timeline-reporter) | [npm](https://www.npmjs.com/package/wdio-timeline-reporter)


> आपके टेस्ट परिणामों के एकीकृत विज़ुअलाइज़ेशन के लिए एक वन स्टॉप शॉप WebdriverIO रिपोर्टर क्योंकि "देखना विश्वास करना है"

![example.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/example.png)

## क्यों

क्योंकि हम फेल हुए टेस्ट को डीबग करने में बहुत समय बिताते हैं, टर्मिनल आउटपुट से एरर स्क्रीनशॉट देखने में स्विचिंग करना आदि। यह रिपोर्टर सभी सामान्य जानकारी को एक रिपोर्ट में एकत्रित करता है जिसकी आपको आवश्यकता होगी। टेस्ट चलाएं और घटनाओं की एक अच्छी टाइमलाइन देखें जिसे आप बाद में देख सकते हैं ताकि सब कुछ ठीक दिखे।

#### विशेषताओं में शामिल हैं:

- Mocha और Jasmine फ्रेमवर्क के साथ बहुत अच्छा काम करता है। Cucumber के साथ भी काम करता है लेकिन हर स्टेप को एक टेस्ट के रूप में रिपोर्ट किया जाएगा
- टेस्ट परिणामों का स्पष्ट सारांश।
- प्रत्येक टेस्ट रन का विवरण, जिसमें टेस्ट एक्जीक्यूशन के दौरान कैप्चर किए गए सभी स्क्रीनशॉट शामिल हैं।
- टेस्ट परिणाम फ़िल्टरिंग। फेल हुए टेस्ट पर ध्यान केंद्रित करने के लिए बढ़िया
- टेस्ट से जुड़ा एरर स्टैक ट्रेस।
- रनटाइम पर टेस्ट में अतिरिक्त जानकारी जोड़ने की क्षमता।
- पोस्ट प्रोसेसिंग की आवश्यकता नहीं। wdio टेस्ट प्रोसेस पूरा होने पर, एक स्टैटिक HTML रिपोर्ट फाइल जनरेट होगी।
- टाइमलाइन सर्विस छवियों के रीसाइज़िंग सहित स्क्रीनशॉट लेने का प्रबंधन करती है।

एक उदाहरण HTML रिपोर्ट [यहां](http://htmlpreview.github.io/?https://github.com/QualityOps/wdio-timeline-reporter/blob/master/images/example-timeline-report.html) मिल सकती है

`WebdriverIO` को कैसे इंस्टॉल करें इसकी जानकारी [यहां](http://webdriver.io/guide/getstarted/install.html) मिल सकती है।

## इंस्टालेशन

**WEBDRIVERIO V4 के साथ संगत संस्करण के लिए [यहां](https://github.com/QualityOps/wdio-timeline-reporter/tree/v4) देखें**

```shell
npm install --save wdio-timeline-reporter
```

आपके `package.json` में एक निर्भरता जोड़ी जाएगी

```json
{
  "dependencies": {
    "wdio-timeline-reporter": "^5.1.0"
  }
}
```

### उपयोग

अपने wdio कॉन्फ़िग फ़ाइल में रिपोर्टर्स ऐरे में `timeline` जोड़ें।

साथ ही wdio-timeline-reporter से `TimelineService` को इम्पोर्ट करें और जोड़ें।

सर्विस अनिवार्य है ताकि रिपोर्ट्स को कंबाइन किया जा सके और HTML बनाया जा सके क्योंकि webdriverio 5 में रिपोर्टर अब प्रति रनर इंस्टेंस में इनिशियलाइज़ किए जाते हैं। [वेबड्राइवरआईओ पर खुली चर्चा देखें](https://github.com/webdriverio/webdriverio/issues/3780)

TimelineService टेस्ट एक्जीक्यूशन के दौरान स्क्रीनशॉट लेने का प्रबंधन भी कर सकती है। आपके पास इमेज के आकार और गुणवत्ता को कम करने और इमेज को base64 के रूप में रिपोर्ट में एम्बेड करने का विकल्प है। ये [रिपोर्टर विकल्पों](#reporter-options) का उपयोग करके कॉन्फ़िगर करने योग्य हैं।

```js
// wdio.conf.js
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
exports.config = {
  // ...
  reporters: [['timeline', { outputDir: './desired_location' }]],
  // ...
  services: [[TimelineService]]
};
```

### रिपोर्टर विकल्प

यदि आप डिफ़ॉल्ट रिपोर्टर कॉन्फ़िगरेशन को ओवरराइड करना चाहते हैं, तो नीचे दिखाए अनुसार रिपोर्टर्स के तहत टाइमलाइन ऐरे में reporterOptions ऑब्जेक्ट लिटरल जोड़ें।

![reporter-options.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/reporter-options.png)

| index | description                                                                                                                                                                                            |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1.    | डायरेक्टरी जहां HTML फाइल और स्क्रीनशॉट बनाए जाएंगे। अनिवार्य विकल्प                                                                                                                        |
| 2.    | रिपोर्ट HTML फाइल का नाम। डिफ़ॉल्ट मान `timeline-report.html` है                                                                                                                                     |
| 3.    | HTML फाइल में base64 के रूप में इमेज एम्बेड करें। डिफ़ॉल्ट मान `false` है                                                                                                                               |
| 4.    | इमेज मैनिपुलेशन के लिए ऑब्जेक्ट विकल्प                                                                                                                                                                |
| 5.    | JPEG क्वालिटी सेट करें। केवल तभी प्रासंगिक है जब `resize` विकल्प `true` है। जितना छोटा मान, उतनी छोटी इमेज साइज और क्वालिटी होगी। डिफ़ॉल्ट मान `70` है। अधिकतम अनुमत मान `100` है               |
| 6.    | इमेज रीसाइज करें। डिफ़ॉल्ट मान `false` है                                                                                                                                                              |
| 7.    | कुल पिक्सेल की संख्या को कम करने के लिए मान। केवल तभी प्रासंगिक है जब `resize` विकल्प true है। डिफ़ॉल्ट `1` वैध मान `1 - 5`                                                                        |
| 8.    | कितनी बार स्क्रीनशॉट लेना है। समर्थित मान हैं `on:error`, `before:click`, `none`। डिफ़ॉल्ट `none` है। `before:click` टेस्ट के तहत ऐप के स्क्रीनशॉट की टाइमलाइन बनाने के लिए एक बढ़िया विकल्प है। |

### टेस्ट कॉन्टेक्स्ट में अतिरिक्त जानकारी जोड़ें

`addContext` स्टैटिक मेथड का उपयोग करके टेस्ट में अतिरिक्त जानकारी जोड़ना संभव है। यह महत्वपूर्ण जानकारी जोड़ने के लिए उपयोगी हो सकता है जो फेल हुए टेस्ट को डीबग करने में मदद कर सकता है, उदाहरण के लिए डायनामिक यूजरनेम के साथ टेस्ट रन के दौरान बनाया गया यूजर

#### बेसिक उपयोग

`TimelineReporter.addContext` स्टैटिक मेथड या तो एक स्ट्रिंग पैरामीटर को स्वीकार करता है या दो प्रॉपर्टीज `title` और `value` के साथ एक ऑब्जेक्ट लिटरल जैसे

```js
{ title: 'sessionId', value: 'b59bb9ec-ab15-475e-9ce6-de8a14ca0cd3' }
```

वैल्यू एक लिंक भी हो सकता है

##### Mocha उदाहरण

```js
const TimelineReporter = require('wdio-timeline-reporter').default;

describe('Suite', function() {
  it('Test', function() {
    // object literal parameter
    TimelineReporter.addContext({
      title: 'Test User',
      value: 'user id created during the test'
    });

    // value as anchor tag
    TimelineReporter.addContext({
      title: 'Dynamic link',
      value: '<a href="">Some important link related to test</a>'
    });

    // string parameter
    TimelineReporter.addContext('This test might be flaky');
  });
});
```

## स्वीकृति

[wdio-json-reporter](https://github.com/fijijavis/wdio-json-reporter) के लेखकों और मेंटेनर्स को एक शाउट आउट देना चाहूंगा। उनके v5 सॉल्युशन को पढ़ने से मेरे काम में तेजी आई