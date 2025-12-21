---
id: integrate-with-smartui
title: स्मार्टUI
---

LambdaTest [SmartUI](https://www.lambdatest.com/smart-visual-testing) आपके WebdriverIO टेस्ट के लिए AI-संचालित विजुअल रिग्रेशन टेस्टिंग प्रदान करता है। यह स्क्रीनशॉट कैप्चर करता है, उन्हें बेसलाइन के साथ तुलना करता है, और बुद्धिमान तुलना एल्गोरिदम के साथ दृश्य अंतर को हाइलाइट करता है।

## सेटअप

**एक SmartUI प्रोजेक्ट बनाएं**

LambdaTest पर [साइन इन](https://accounts.lambdatest.com/register) करें और एक नया प्रोजेक्ट बनाने के लिए [SmartUI Projects](https://smartui.lambdatest.com/) पर जाएं। प्लेटफॉर्म के रूप में **Web** चुनें और अपना प्रोजेक्ट नाम, अप्रूवर्स और टैग कॉन्फ़िगर करें।

**क्रेडेंशियल्स सेट करें**

LambdaTest डैशबोर्ड से अपना `LT_USERNAME` और `LT_ACCESS_KEY` प्राप्त करें और उन्हें पर्यावरण वेरिएबल के रूप में सेट करें:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**SmartUI SDK इंस्टॉल करें**

```sh
npm install @lambdatest/wdio-driver
```

**WebdriverIO कॉन्फ़िगर करें**

अपने `wdio.conf.js` को अपडेट करें:

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

[SmartUI Dashboard](https://smartui.lambdatest.com/) में परिणाम देखें।

## उन्नत विकल्प

**एलिमेंट्स को इग्नोर करें**

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

**विशिष्ट क्षेत्रों का चयन करें**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## संसाधन

| संसाधन                                                                                           | विवरण                                   |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [आधिकारिक दस्तावेज़ीकरण](https://www.lambdatest.com/support/docs/smart-ui-cypress/)              | SmartUI दस्तावेज़ीकरण                    |
| [SmartUI डैशबोर्ड](https://smartui.lambdatest.com/)                                               | अपने SmartUI प्रोजेक्ट्स और बिल्ड्स तक पहुंचें  |
| [उन्नत सेटिंग्स](https://www.lambdatest.com/support/docs/test-settings-options/)                 | तुलना संवेदनशीलता कॉन्फ़िगर करें           |
| [बिल्ड विकल्प](https://www.lambdatest.com/support/docs/smart-ui-build-options/)                  | उन्नत बिल्ड कॉन्फ़िगरेशन                  |