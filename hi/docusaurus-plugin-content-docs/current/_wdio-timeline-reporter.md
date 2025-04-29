---
id: wdio-timeline-reporter
title: टाइमलाइन रिपोर्टर
custom_edit_url: https://github.com/QualityOps/wdio-timeline-reporter/edit/master/README.md
---


> wdio-timeline-reporter is a 3rd party package, for more information please see [GitHub](https://github.com/QualityOps/wdio-timeline-reporter) | [npm](https://www.npmjs.com/package/wdio-timeline-reporter)


> आपके टेस्ट परिणामों के एकीकृत विज़ुअलाइज़ेशन के लिए एक वन स्टॉप शॉप WebdriverIO रिपोर्टर क्योंकि "देखना ही विश्वास करना है"

![example.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/example.png)

## क्यों

क्योंकि हम फेल हो रहे टेस्ट को डीबग करने में बहुत समय बिताते हैं, टर्मिनल आउटपुट से लेकर एरर स्क्रीनशॉट देखने तक। यह रिपोर्टर सभी सामान्य जानकारी को एक रिपोर्ट में एकत्रित करता है जिसकी आपको आवश्यकता होगी। टेस्ट चलाएं और घटनाओं की एक अच्छी टाइमलाइन पाएं जिसे आप वापस देख सकते हैं और आगे सत्यापित कर सकते हैं कि सब कुछ ठीक लगता है।

#### विशेषताओं में शामिल हैं:

- Mocha और Jasmine फ्रेमवर्क के साथ बहुत अच्छा काम करता है। Cucumber के साथ भी काम करता है लेकिन हर स्टेप को एक टेस्ट के रूप में रिपोर्ट किया जाएगा
- टेस्ट परिणामों का स्पष्ट सारांश।
- प्रत्येक टेस्ट रन का विवरण, जिसमें टेस्ट एक्जीक्यूशन के दौरान कैप्चर किए गए सभी स्क्रीनशॉट शामिल हैं।
- टेस्ट परिणाम फ़िल्टरिंग। फेल हुए टेस्ट पर फोकस करने के लिए बेहतरीन
- टेस्ट से जुड़ा एरर स्टैक ट्रेस।
- रनटाइम पर टेस्ट में अतिरिक्त जानकारी जोड़ने की क्षमता।
- पोस्ट प्रोसेसिंग की आवश्यकता नहीं है। wdio टेस्ट प्रोसेस के पूरा होने पर, एक स्टैटिक html रिपोर्ट फ़ाइल जेनरेट हो जाएगी।
- इमेज के रीसाइज़िंग सहित स्क्रीनशॉट लेने के प्रबंधन के लिए टाइमलाइन सर्विस।

एक उदाहरण html रिपोर्ट [यहां](http://htmlpreview.github.io/?https://github.com/QualityOps/wdio-timeline-reporter/blob/master/images/example-timeline-report.html) पाई जा सकती है

`WebdriverIO` को इंस्टॉल करने के निर्देश [यहां](http://webdriver.io/guide/getstarted/install.html) पाए जा सकते हैं।

## इंस्टालेशन

**WEBDRIVERIO V4 के साथ संगत वर्जन के लिए [यहां](https://github.com/QualityOps/wdio-timeline-reporter/tree/v4) देखें**

```shell
npm install --save wdio-timeline-reporter
```

आपके `package.json` में एक डिपेंडेंसी जोड़ी जाएगी

```json
{
  "dependencies": {
    "wdio-timeline-reporter": "^5.1.0"
  }
}
```

### उपयोग

अपने wdio कॉन्फिग फाइल में रिपोर्टर्स ऐरे में `timeline` जोड़ें।

साथ ही wdio-timeline-reporter से `TimelineService` को इम्पोर्ट करें और जोड़ें।

सर्विस अनिवार्य है ताकि रिपोर्ट्स को कम्बाइन किया जा सके और html बनाई जा सके क्योंकि webdriverio 5 में रिपोर्टर्स अब प्रति रनर इंस्टेंस पर इनिशियलाइज़ किए जाते हैं। [webdriverio पर खुली चर्चा देखें](https://github.com/webdriverio/webdriverio/issues/3780)

TimelineService टेस्ट एक्जीक्यूशन के दौरान स्क्रीनशॉट लेने का प्रबंधन भी कर सकती है। आपके पास इमेज के आकार और गुणवत्ता को कम करने का विकल्प है और इमेज को base64 के रूप में रिपोर्ट में एम्बेड करने का विकल्प है। ये [रिपोर्टर विकल्पों](#reporter-options) का उपयोग करके कॉन्फिगर किए जा सकते हैं।

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

यदि आप डिफॉल्ट रिपोर्टर कॉन्फिगरेशन को ओवरराइड करना चाहते हैं, तो नीचे दिखाए अनुसार रिपोर्टर्स के तहत टाइमलाइन ऐरे में reporterOptions ऑब्जेक्ट लिटरल जोड़ें।

![reporter-options.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/reporter-options.png)

| index | description                                                                                                                                                                                            |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1.    | डायरेक्टरी जहां html फाइल और स्क्रीनशॉट बनाए जाएंगे। अनिवार्य विकल्प                                                                                                                                   |
| 2.    | रिपोर्ट html फाइल का नाम। डिफॉल्ट मान `timeline-report.html` है                                                                                                                                         |
| 3.    | इमेज को html फाइल में base64 के रूप में एम्बेड करें। डिफॉल्ट मान `false` है                                                                                                                               |
| 4.    | इमेज मैनिपुलेशन के लिए ऑब्जेक्ट विकल्प                                                                                                                                                                   |
| 5.    | JPEG क्वालिटी सेट करें। केवल तभी प्रासंगिक है जब `resize` विकल्प `true` है। जितना छोटा मान, उतना छोटा इमेज साइज और क्वालिटी होगी। डिफॉल्ट मान `70` है। अधिकतम अनुमत मान `100` है                         |
| 6.    | इमेज रीसाइज करें। डिफॉल्ट मान `false` है                                                                                                                                                                |
| 7.    | पिक्सल की कुल संख्या को कम करने के लिए मान। केवल तभी प्रासंगिक है जब `resize` विकल्प true है। डिफॉल्ट `1` है वैध मान `1 - 5`                                                                              |
| 8.    | कितनी बार स्क्रीनशॉट लेना है। समर्थित मान `on:error`, `before:click`, `none` हैं। डिफॉल्ट `none` है। `before:click` टेस्ट के तहत ऐप के स्क्रीनशॉट की टाइमलाइन बनाने के लिए एक बेहतरीन विकल्प है।        |

### टेस्ट कॉन्टेक्स्ट में अतिरिक्त जानकारी जोड़ें

`addContext` स्टैटिक मेथड का उपयोग करके टेस्ट में अतिरिक्त जानकारी जोड़ना संभव है। यह महत्वपूर्ण जानकारी जोड़ने के लिए उपयोगी हो सकता है जो फेल हुए टेस्ट को डीबग करने में मदद कर सकती है, उदाहरण के लिए टेस्ट रन के दौरान डायनामिक यूजरनेम के साथ बनाया गया एक यूजर

#### बेसिक उपयोग

`TimelineReporter.addContext` स्टैटिक मेथड या तो एक स्ट्रिंग पैरामीटर या दो प्रॉपर्टीज़ `title` और `value` के साथ एक ऑब्जेक्ट लिटरल स्वीकार करता है, जैसे

```js
{ title: 'sessionId', value: 'b59bb9ec-ab15-475e-9ce6-de8a14ca0cd3' }
```

value एक लिंक भी हो सकता है

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

## आभार

[wdio-json-reporter](https://github.com/fijijavis/wdio-json-reporter) के लेखकों और रखरखावकर्ताओं को शाउट आउट देना चाहूंगा। उनके v5 सॉल्यूशन को देखने से मेरा काम तेज़ी से आगे बढ़ा