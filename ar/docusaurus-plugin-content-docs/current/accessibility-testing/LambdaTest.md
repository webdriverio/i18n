---
id: lambdatest
title: اختبار إمكانية الوصول LambdaTest
description: 
---

# اختبار إمكانية الوصول LambdaTest

يمكنك بسهولة دمج اختبارات إمكانية الوصول في مجموعات اختبارات WebdriverIO باستخدام [اختبار إمكانية الوصول LambdaTest](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).

## مزايا اختبار إمكانية الوصول LambdaTest

يساعدك اختبار إمكانية الوصول LambdaTest على تحديد وإصلاح مشكلات إمكانية الوصول في تطبيقات الويب الخاصة بك. فيما يلي المزايا الرئيسية:

* يتكامل بسلاسة مع أتمتة اختبارات WebdriverIO الحالية.
* فحص تلقائي لإمكانية الوصول أثناء تنفيذ الاختبار.
* تقارير شاملة عن توافق معايير WCAG.
* تتبع مفصل للمشكلات مع إرشادات للإصلاح.
* دعم لمعايير WCAG المتعددة (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* رؤى فورية حول إمكانية الوصول في لوحة تحكم LambdaTest.

## البدء مع اختبار إمكانية الوصول LambdaTest

اتبع هذه الخطوات لدمج مجموعات اختبارات WebdriverIO الخاصة بك مع اختبار إمكانية الوصول من LambdaTest:

1. قم بتثبيت حزمة خدمة LambdaTest WebdriverIO.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. قم بتحديث ملف التكوين `wdio.conf.js` الخاص بك.

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
            accessibility: true, // Enable accessibility testing
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // WCAG version (wcag20, wcag21a, wcag21aa, wcag22aa)
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

3. قم بتشغيل اختباراتك كالمعتاد. سيقوم LambdaTest تلقائياً بفحص مشكلات إمكانية الوصول أثناء تنفيذ الاختبار.

```bash
npx wdio run wdio.conf.js
```

## خيارات التكوين

يدعم كائن `accessibilityOptions` المعلمات التالية:

* **wcagVersion**: حدد إصدار معيار WCAG للاختبار مقابله
  - `wcag20` - WCAG 2.0 المستوى A
  - `wcag21a` - WCAG 2.1 المستوى A
  - `wcag21aa` - WCAG 2.1 المستوى AA (الافتراضي)
  - `wcag22aa` - WCAG 2.2 المستوى AA

* **bestPractice**: تضمين توصيات أفضل الممارسات (الافتراضي: `false`)

* **needsReview**: تضمين المشكلات التي تحتاج إلى مراجعة يدوية (الافتراضي: `true`)

## عرض تقارير إمكانية الوصول

بعد اكتمال اختباراتك، يمكنك عرض تقارير مفصلة عن إمكانية الوصول في [لوحة تحكم LambdaTest](https://automation.lambdatest.com/):

1. انتقل إلى تنفيذ الاختبار الخاص بك
2. انقر على علامة التبويب "Accessibility"
3. راجع المشكلات المحددة مع مستويات الخطورة
4. احصل على إرشادات الإصلاح لكل مشكلة

لمزيد من المعلومات التفصيلية، قم بزيارة [وثائق أتمتة إمكانية الوصول LambdaTest](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).