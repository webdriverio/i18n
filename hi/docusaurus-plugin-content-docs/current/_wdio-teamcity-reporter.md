---
id: wdio-teamcity-reporter
title: टीमसिटी रिपोर्टर रिपोर्टर
custom_edit_url: https://github.com/webdriverio-community/wdio-teamcity-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-teamcity-reporter एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/webdriverio-community/wdio-teamcity-reporter) | [npm](https://www.npmjs.com/package/wdio-teamcity-reporter)

WebdriverIO टीमसिटी रिपोर्टर जो रियल-टाइम में टेस्ट परिणाम प्रदर्शित करना संभव बनाता है, टेस्ट जानकारी को बिल्ड रिजल्ट्स पेज के टेस्ट्स टैब पर उपलब्ध कराता है।


## इंस्टालेशन

```bash
npm install wdio-teamcity-reporter --save-dev
```

WebdriverIO को इंस्टॉल करने के निर्देश यहां पाए जा सकते हैं: https://webdriver.io/docs/gettingstarted


## कॉन्फिगरेशन

अपने [wdio.conf.js](http://webdriver.io/guide/testrunner/configurationfile.html) फाइल में रिपोर्टर जोड़ें:

```javascript
exports.config = {
  // ...
  reporters: [
    [
      'teamcity',
      {
        captureStandardOutput: false, // optional
        flowId: true, // optional
        message: '[title]', // optional
      }
    ]
  ],
  // ...
}
```

### विकल्प

- `captureStandardOutput (boolean)` — यदि `true`, `testStarted` और `testFinished` संदेशों के बीच प्राप्त सभी मानक आउटपुट (और मानक त्रुटि) संदेश टेस्ट आउटपुट माने जाएंगे। डिफ़ॉल्ट मान `false` है और testStdOut और testStdErr सर्विस मैसेज के उपयोग का अनुमान लगाता है टेस्ट आउटपुट की रिपोर्ट करने के लिए। डिफ़ॉल्ट `false`।
- `flowId (boolean)` — यदि `true`, `flowId` प्रॉपर्टी सभी संदेशों में जोड़ी जाएगी। फ्लो ट्रैकिंग उदाहरण के लिए समानांतर में चलने वाली अलग-अलग प्रक्रियाओं को अलग करने के लिए आवश्यक है। डिफ़ॉल्ट `true`।
- `message (string)` — नाम प्रॉपर्टी के लिए विशेष प्रारूप प्रदान करने की संभावना। संभावित कुंजियाँ: `[browser]`, `[title]`। उदाहरण, `[browser] / [title]`। डिफ़ॉल्ट `[title]`।


## लिंक्स

- रिपोर्टिंग मैसेज के बारे में टीमसिटी डॉक्यूमेंटेशन का संदर्भ: https://confluence.jetbrains.com/display/TCD65/Build+Script+Interaction+with+TeamCity
- टीमसिटी टेस्टड्राइव: https://blog.jetbrains.com/teamcity/2019/08/getting-started-with-teamcity-testdrive/


## लाइसेंस

> द MIT लाइसेंस