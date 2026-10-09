---
id: integrate-with-smartui
title: SmartUI
description: "TestMu AI (पूर्व में LambdaTest) SmartUI के साथ WebdriverIO टेस्ट में AI-संचालित विज़ुअल रिग्रेशन टेस्टिंग जोड़ें, जिसमें सेटअप और विकल्प शामिल हैं।"
---

TestMu AI (पूर्व में LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) आपके WebdriverIO टेस्ट के लिए AI-संचालित विज़ुअल रिग्रेशन टेस्टिंग प्रदान करता है। यह स्क्रीनशॉट कैप्चर करता है, उनकी तुलना बेसलाइन से करता है, और इंटेलिजेंट तुलना एल्गोरिदम के साथ विज़ुअल अंतरों को हाइलाइट करता है।

## सेटअप

**SmartUI प्रोजेक्ट बनाएं**

TestMu AI (पूर्व में LambdaTest) में [साइन इन](https://accounts.lambdatest.com/register) करें और नया प्रोजेक्ट बनाने के लिए [SmartUI Projects](https://smartui.lambdatest.com/) पर जाएं। प्लेटफ़ॉर्म के रूप में **Web** चुनें और अपने प्रोजेक्ट का नाम, अप्रूवर्स और टैग कॉन्फ़िगर करें।

**क्रेडेंशियल सेट करें**

TestMu AI (पूर्व में LambdaTest) डैशबोर्ड से अपना `LT_USERNAME` और `LT_ACCESS_KEY` प्राप्त करें और उन्हें एनवायरनमेंट वेरिएबल के रूप में सेट करें:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**SmartUI SDK इंस्टॉल करें**

```sh
npm install @lambdatest/wdio-driver
```

**WebdriverIO कॉन्फ़िगर करें**

अपनी `wdio.conf.js` फ़ाइल अपडेट करें:

```javascript
exports.config = {
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,

  capabilities: [{
    browserName: 'chrome',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      build: 'SmartUI Build',
      name: 'SmartUI Test',
      smartUI.project: '<Your Project Name>',
      smartUI.build: '<Your Build Name>',
      smartUI.baseline: false
    }
  }]
}
```

## उपयोग

स्क्रीनशॉट कैप्चर करने के लिए `browser.execute('smartui.takeScreenshot')` का उपयोग करें:

```javascript
describe('WebdriverIO SmartUI Test', () => {
  it('should capture screenshot for visual testing', async () => {
    await browser.url('https://webdriver.io');

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage Screenshot'
    });

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage with Options',
      ignoreDOM: {
        id: ['dynamic-element-id'],
        class: ['ad-banner']
      }
    });
  });
});
```

**टेस्ट चलाएं**

```sh
npx wdio wdio.conf.js
```

परिणाम [SmartUI Dashboard](https://smartui.lambdatest.com/) में देखें।

## उन्नत विकल्प

**एलिमेंट्स को अनदेखा करें**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Ignore Dynamic Elements',
  ignoreDOM: {
    id: ['element-id'],
    class: ['dynamic-class'],
    xpath: ['//div[@class="ad"]']
  }
});
```

**विशिष्ट क्षेत्र चुनें**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## संसाधन

| संसाधन                                                                                          | विवरण                              |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [आधिकारिक डॉक्यूमेंटेशन](https://www.testmuai.com/support/docs/smart-ui-cypress/)              | SmartUI डॉक्यूमेंटेशन                    |
| [SmartUI Dashboard](https://smartui.lambdatest.com/)                                              | अपने SmartUI प्रोजेक्ट्स और बिल्ड्स तक पहुंचें  |
| [उन्नत सेटिंग्स](https://www.testmuai.com/support/docs/test-settings-options/)              | तुलना संवेदनशीलता कॉन्फ़िगर करें         |
| [बिल्ड विकल्प](https://www.testmuai.com/support/docs/smart-ui-build-options/)                 | उन्नत बिल्ड कॉन्फ़िगरेशन             |