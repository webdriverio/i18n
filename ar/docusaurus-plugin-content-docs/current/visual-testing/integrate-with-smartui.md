---
id: integrate-with-smartui
title: SmartUI
description: "أضف اختبار الانحدار البصري المدعوم بالذكاء الاصطناعي إلى اختبارات WebdriverIO باستخدام SmartUI من TestMu AI (المعروفة سابقًا باسم LambdaTest)، بما في ذلك الإعداد والخيارات."
---

توفر [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) من TestMu AI (المعروفة سابقًا باسم LambdaTest) اختبار انحدار بصري مدعومًا بالذكاء الاصطناعي لاختبارات WebdriverIO الخاصة بك. فهي تلتقط لقطات الشاشة، وتقارنها بالصور المرجعية (baselines)، وتُبرز الاختلافات البصرية باستخدام خوارزميات مقارنة ذكية.

## الإعداد

**إنشاء مشروع SmartUI**

[سجّل الدخول](https://accounts.lambdatest.com/register) إلى TestMu AI (المعروفة سابقًا باسم LambdaTest) وانتقل إلى [مشاريع SmartUI](https://smartui.lambdatest.com/) لإنشاء مشروع جديد. اختر **Web** كمنصة، ثم قم بتهيئة اسم مشروعك والمعتمِدين (approvers) والوسوم (tags).

**إعداد بيانات الاعتماد**

احصل على `LT_USERNAME` و`LT_ACCESS_KEY` من لوحة تحكم TestMu AI (المعروفة سابقًا باسم LambdaTest) وعيّنهما كمتغيرات بيئة:

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**تثبيت SmartUI SDK**

```sh
npm install @lambdatest/wdio-driver
```

**تهيئة WebdriverIO**

حدّث ملف `wdio.conf.js` الخاص بك:

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

اعرض النتائج في [لوحة تحكم SmartUI](https://smartui.lambdatest.com/).

## الخيارات المتقدمة

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

| المورد                                                                                          | الوصف                              |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [التوثيق الرسمي](https://www.testmuai.com/support/docs/smart-ui-cypress/)              | توثيق SmartUI                    |
| [لوحة تحكم SmartUI](https://smartui.lambdatest.com/)                                              | الوصول إلى مشاريع SmartUI وعمليات البناء الخاصة بك  |
| [الإعدادات المتقدمة](https://www.testmuai.com/support/docs/test-settings-options/)              | تهيئة حساسية المقارنة         |
| [خيارات البناء](https://www.testmuai.com/support/docs/smart-ui-build-options/)                 | تهيئة متقدمة لعمليات البناء             |