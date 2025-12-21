---
id: integrate-with-smartui
title: ஸ்மார்ட் யூஐ
---

LambdaTest [SmartUI](https://www.lambdatest.com/smart-visual-testing) உங்கள் WebdriverIO சோதனைகளுக்கு AI-சக்தி வாய்ந்த காட்சி பின்னோக்கு சோதனைகளை வழங்குகிறது. இது திரைப்பிடிப்புகளை எடுத்து, அவற்றை அடிப்படை படங்களுடன் ஒப்பிட்டு, புத்திசாலித்தனமான ஒப்பீட்டு அல்காரிதங்களைக் கொண்டு காட்சி வேறுபாடுகளை முன்னிலைப்படுத்துகிறது.

## அமைப்பு

**ஒரு SmartUI திட்டத்தை உருவாக்கவும்**

LambdaTest இல் [பதிவு செய்யவும்](https://accounts.lambdatest.com/register) மற்றும் புதிய திட்டத்தை உருவாக்க [SmartUI Projects](https://smartui.lambdatest.com/) க்குச் செல்லவும். தளமாக **Web** ஐத் தேர்ந்தெடுத்து, உங்கள் திட்டப் பெயர், அங்கீகரிப்பாளர்கள் மற்றும் குறிச்சொற்களை உள்ளமைக்கவும்.

**சான்றுகளை அமைக்கவும்**

LambdaTest டாஷ்போர்டில் இருந்து உங்கள் `LT_USERNAME` மற்றும் `LT_ACCESS_KEY` ஐப் பெற்று, அவற்றை சூழல் மாறிகளாக அமைக்கவும்:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**SmartUI SDK ஐ நிறுவவும்**

```sh
npm install @lambdatest/wdio-driver
```

**WebdriverIO ஐ கட்டமைக்கவும்**

உங்கள் `wdio.conf.js` ஐப் புதுப்பிக்கவும்:

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

## பயன்பாடு

திரைப்பிடிப்புகளை எடுக்க `browser.execute('smartui.takeScreenshot')` ஐப் பயன்படுத்தவும்:

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

**சோதனைகளை இயக்கவும்**

```sh
npx wdio wdio.conf.js
```

[SmartUI Dashboard](https://smartui.lambdatest.com/) இல் முடிவுகளைப் பார்க்கவும்.

## மேம்பட்ட விருப்பங்கள்

**உறுப்புகளைப் புறக்கணிக்கவும்**

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

**குறிப்பிட்ட பகுதிகளைத் தேர்ந்தெடுக்கவும்**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## ஆதாரங்கள்

| ஆதாரம்                                                                                           | விளக்கம்                                  |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [அதிகாரப்பூர்வ ஆவணங்கள்](https://www.lambdatest.com/support/docs/smart-ui-cypress/)              | SmartUI ஆவணங்கள்                         |
| [SmartUI டாஷ்போர்டு](https://smartui.lambdatest.com/)                                              | உங்கள் SmartUI திட்டங்கள் மற்றும் கட்டமைப்புகளை அணுகவும் |
| [மேம்பட்ட அமைப்புகள்](https://www.lambdatest.com/support/docs/test-settings-options/)              | ஒப்பீட்டு உணர்திறனை கட்டமைக்கவும்            |
| [கட்ட விருப்பங்கள்](https://www.lambdatest.com/support/docs/smart-ui-build-options/)                 | மேம்பட்ட கட்ட கட்டமைப்பு                   |