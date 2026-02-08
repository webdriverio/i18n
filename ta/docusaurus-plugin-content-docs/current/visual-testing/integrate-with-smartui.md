---
id: integrate-with-smartui
title: ஸ்மார்ட்யூஐ
---

TestMu AI (முன்னர் LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) உங்கள் WebdriverIO சோதனைகளுக்கு AI-ஆல் இயக்கப்படும் விஷுவல் ரிகிரெஷன் சோதனையை வழங்குகிறது. இது திரைப்பிடிப்புகளை எடுத்து, அவற்றை அடிப்படை பதிப்புகளுடன் ஒப்பிட்டு, புத்திசாலித்தனமான ஒப்பீட்டு அல்காரிதங்களுடன் காட்சி வேறுபாடுகளை முன்னிலைப்படுத்துகிறது.

## அமைப்பு

**ஒரு SmartUI திட்டத்தை உருவாக்குதல்**

TestMu AI (முன்னர் LambdaTest) இல் [உள்நுழைந்து](https://accounts.lambdatest.com/register) [SmartUI திட்டங்கள்](https://smartui.lambdatest.com/) பக்கத்திற்குச் சென்று புதிய திட்டத்தை உருவாக்கவும். பிளாட்ஃபார்மாக **Web** ஐத் தேர்ந்தெடுத்து, உங்கள் திட்டத்தின் பெயர், அங்கீகரிப்பவர்கள் மற்றும் டேக்குகளை கட்டமைக்கவும்.

**சான்றுகளை அமைத்தல்**

TestMu AI (முன்னர் LambdaTest) டாஷ்போர்டிலிருந்து உங்கள் `LT_USERNAME` மற்றும் `LT_ACCESS_KEY` பெற்று அவற்றை சூழல் மாறிகளாக அமைக்கவும்:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**SmartUI SDK ஐ நிறுவுதல்**

```sh
npm install @lambdatest/wdio-driver
```

**WebdriverIO ஐ கட்டமைத்தல்**

உங்கள் `wdio.conf.js` ஐ புதுப்பிக்கவும்:

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

திரைப்பிடிப்புகளைப் பெற `browser.execute('smartui.takeScreenshot')` ஐப் பயன்படுத்தவும்:

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

[SmartUI டாஷ்போர்டில்](https://smartui.lambdatest.com/) முடிவுகளைப் பார்க்கவும்.

## மேம்பட்ட விருப்பங்கள்

**உறுப்புகளை புறக்கணிக்க**

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

**குறிப்பிட்ட பகுதிகளைத் தேர்ந்தெடுக்க**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## வளங்கள்

| வளம்                                                                                          | விளக்கம்                              |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [அதிகாரப்பூர்வ ஆவணங்கள்](https://www.testmuai.com/support/docs/smart-ui-cypress/)              | SmartUI ஆவணங்கள்                    |
| [SmartUI டாஷ்போர்ட்](https://smartui.lambdatest.com/)                                              | உங்கள் SmartUI திட்டங்கள் மற்றும் கட்டமைப்புகளை அணுகவும்  |
| [மேம்பட்ட அமைப்புகள்](https://www.testmuai.com/support/docs/test-settings-options/)              | ஒப்பீட்டு உணர்திறனை கட்டமைக்கவும்         |
| [கட்டமைப்பு விருப்பங்கள்](https://www.testmuai.com/support/docs/smart-ui-build-options/)                 | மேம்பட்ட கட்டமைப்பு கட்டமைப்பு             |