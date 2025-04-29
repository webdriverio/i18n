---
id: wdio-teamcity-reporter
title: टीमसिटी रिपोर्टर रिपोर्टर
custom_edit_url: https://github.com/webdriverio-community/wdio-teamcity-reporter/edit/main/README.md
---


> wdio-teamcity-reporter एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/webdriverio-community/wdio-teamcity-reporter) | [npm](https://www.npmjs.com/package/wdio-teamcity-reporter)

WebdriverIO टीमसिटी रिपोर्टर जो रीयल-टाइम में टेस्ट परिणामों को प्रदर्शित करना संभव बनाता है, बिल्ड रिजल्ट्स पेज के टेस्ट्स टैब पर टेस्ट जानकारी उपलब्ध कराता है।


## इंस्टालेशन

```bash
npm install wdio-teamcity-reporter --save-dev
```

WebdriverIO को कैसे इंस्टॉल करें इसकी जानकारी यहां मिल सकती है: https://webdriver.io/docs/gettingstarted


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

- `captureStandardOutput (boolean)` — यदि `true` है, तो `testStarted` और `testFinished` संदेशों के बीच प्राप्त सभी मानक आउटपुट (और मानक त्रुटि) संदेश टेस्ट आउटपुट माने जाएंगे। डिफ़ॉल्ट मान `false` है और टेस्ट आउटपुट की रिपोर्ट करने के लिए testStdOut और testStdErr सेवा संदेशों के उपयोग की अनुमति देता है। डिफ़ॉल्ट `false`।
- `flowId (boolean)` — यदि `true` है, तो `flowId` प्रॉपर्टी सभी संदेशों में जोड़ी जाएगी। फ्लो ट्रैकिंग उदाहरण के लिए समानांतर चल रहे अलग-अलग प्रक्रियाओं को अलग करने के लिए आवश्यक है। डिफ़ॉल्ट `true`।
- `message (string)` — नाम प्रॉपर्टी के लिए विशेष फॉर्मेट प्रदान करने की संभावना। संभावित कीज़: `[browser]`, `[title]`। उदाहरण, `[browser] / [title]`। डिफ़ॉल्ट `[title]`।


## लिंक्स

- रिपोर्टिंग संदेशों के बारे में टीमसिटी दस्तावेज़ के लिए संदर्भ: https://confluence.jetbrains.com/display/TCD65/Build+Script+Interaction+with+TeamCity
- टीमसिटी टेस्टड्राइव: https://blog.jetbrains.com/teamcity/2019/08/getting-started-with-teamcity-testdrive/


## लाइसेंस

> द MIT लाइसेंस