---
id: integrate-with-smartui
title: SmartUI
---

توفر TestMu AI (سابقاً LambdaTest) [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) اختبارات انحدار بصري مدعومة بالذكاء الاصطناعي لاختبارات WebdriverIO الخاصة بك. تقوم بالتقاط لقطات شاشة، ومقارنتها بالخطوط الأساسية، وتسليط الضوء على الاختلافات البصرية باستخدام خوارزميات مقارنة ذكية.

## الإعداد

**إنشاء مشروع SmartUI**

[قم بتسجيل الدخول](https://accounts.lambdatest.com/register) إلى TestMu AI (سابقاً LambdaTest) وانتقل إلى [مشاريع SmartUI](https://smartui.lambdatest.com/) لإنشاء مشروع جديد. حدد **Web** كمنصة وقم بتكوين اسم مشروعك والموافقين والعلامات.

**إعداد بيانات الاعتماد**

احصل على `LT_USERNAME` و `LT_ACCESS_KEY` من لوحة تحكم TestMu AI (سابقاً LambdaTest) وقم بتعيينهما كمتغيرات بيئية:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**تثبيت SmartUI SDK**

```sh
npm install @lambdatest/wdio-driver
```

**تكوين WebdriverIO**

قم بتحديث ملف `wdio.conf.js` الخاص بك:

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

## الاستخدام

استخدم `browser.execute('smartui.takeScreenshot')` لالتقاط لقطات الشاشة:

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

**تشغيل الاختبارات**

```sh
npx wdio wdio.conf.js
```

عرض النتائج في [لوحة تحكم SmartUI](https://smartui.lambdatest.com/).

## خيارات متقدمة

**تجاهل العناصر**

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

**تحديد مناطق معينة**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## الموارد

| المورد                                                                                            | الوصف                                   |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [الوثائق الرسمية](https://www.testmuai.com/support/docs/smart-ui-cypress/)                     | وثائق SmartUI                            |
| [لوحة تحكم SmartUI](https://smartui.lambdatest.com/)                                              | الوصول إلى مشاريع وإصدارات SmartUI الخاصة بك |
| [الإعدادات المتقدمة](https://www.testmuai.com/support/docs/test-settings-options/)             | تكوين حساسية المقارنة                    |
| [خيارات البناء](https://www.testmuai.com/support/docs/smart-ui-build-options/)                 | تكوين البناء المتقدم                     |