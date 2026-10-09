---
id: testmuai
title: اختبار إمكانية الوصول باستخدام TestMu AI (المعروفة سابقًا باسم LambdaTest)
description: "فعّل اختبار إمكانية الوصول من TestMu AI (المعروفة سابقًا باسم LambdaTest) في مجموعة اختبارات WebdriverIO الخاصة بك، واضبط خيارات الفحص، واطّلع على تقارير إمكانية الوصول."
---

# اختبار إمكانية الوصول باستخدام TestMu AI

يمكنك بسهولة دمج اختبارات إمكانية الوصول في مجموعات اختبارات WebdriverIO الخاصة بك باستخدام [اختبار إمكانية الوصول من TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## مزايا اختبار إمكانية الوصول باستخدام TestMu AI

يساعدك اختبار إمكانية الوصول من TestMu AI على تحديد مشكلات إمكانية الوصول في تطبيقات الويب الخاصة بك وإصلاحها. فيما يلي أبرز المزايا:

* يتكامل بسلاسة مع أتمتة اختبارات WebdriverIO الحالية لديك.
* فحص آلي لإمكانية الوصول أثناء تنفيذ الاختبارات.
* تقارير شاملة عن الامتثال لمعايير WCAG.
* تتبع تفصيلي للمشكلات مع إرشادات للمعالجة.
* دعم لمعايير WCAG متعددة (WCAG 2.0 وWCAG 2.1 وWCAG 2.2).
* رؤى فورية حول إمكانية الوصول في لوحة تحكم TestMu AI.

## البدء باختبار إمكانية الوصول باستخدام TestMu AI

اتبع هذه الخطوات لدمج مجموعات اختبارات WebdriverIO الخاصة بك مع اختبار إمكانية الوصول من TestMu AI:

1. ثبّت حزمة خدمة TestMu AI الخاصة بـ WebdriverIO.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. حدّث ملف الإعدادات `wdio.conf.js` الخاص بك.

```javascript
exports.config = {
    //...
    user: process.env.LT_USERNAME || '<lambdatest_username>',
    key: process.env.LT_ACCESS_KEY || '<lambdatest_access_key>',

    capabilities: [{
        browserName: 'chrome',
        'LT:Options': {
            platform: 'Windows 10',
            version: 'latest',
            accessibility: true, // تفعيل اختبار إمكانية الوصول
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // إصدار WCAG (wcag20, wcag21a, wcag21aa, wcag22aa)
                bestPractice: false,
                needsReview: true
            }
        }
    }],

    services: [
        ['lambdatest', {
            tunnel: false
        }]
    ],
    //...
};
```

3. شغّل اختباراتك كالمعتاد. ستفحص TestMu AI مشكلات إمكانية الوصول تلقائيًا أثناء تنفيذ الاختبارات.

```bash
npx wdio run wdio.conf.js
```

## خيارات الإعداد

يدعم الكائن `accessibilityOptions` المعاملات التالية:

* **wcagVersion**: حدّد إصدار معيار WCAG الذي سيتم الاختبار وفقًا له
  - `wcag20` - WCAG 2.0 المستوى A
  - `wcag21a` - WCAG 2.1 المستوى A
  - `wcag21aa` - WCAG 2.1 المستوى AA (الافتراضي)
  - `wcag22aa` - WCAG 2.2 المستوى AA

* **bestPractice**: تضمين توصيات أفضل الممارسات (الافتراضي: `false`)

* **needsReview**: تضمين المشكلات التي تحتاج إلى مراجعة يدوية (الافتراضي: `true`)

## عرض تقارير إمكانية الوصول

بعد اكتمال اختباراتك، يمكنك عرض تقارير تفصيلية عن إمكانية الوصول في [لوحة تحكم TestMu AI](https://automation.lambdatest.com/):

1. انتقل إلى عملية تنفيذ الاختبار الخاصة بك
2. انقر على علامة التبويب "Accessibility"
3. راجع المشكلات المحددة مع مستويات خطورتها
4. احصل على إرشادات المعالجة لكل مشكلة

لمزيد من المعلومات التفصيلية، تفضل بزيارة [توثيق أتمتة إمكانية الوصول من TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/).