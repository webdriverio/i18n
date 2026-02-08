---
id: testmuai
title: اختبار إمكانية الوصول لـ TestMu AI (سابقًا LambdaTest)
---

# TestMu AI Accessibility Testing

يمكنك بسهولة دمج اختبارات إمكانية الوصول في مجموعات اختبار WebdriverIO الخاصة بك باستخدام [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## مزايا TestMu AI لاختبار إمكانية الوصول

يساعدك TestMu AI Accessibility Testing على تحديد وإصلاح مشكلات إمكانية الوصول في تطبيقات الويب الخاصة بك. فيما يلي المزايا الرئيسية:

* يتكامل بسلاسة مع أتمتة اختبار WebdriverIO الحالية.
* فحص أوتوماتيكي لإمكانية الوصول أثناء تنفيذ الاختبار.
* تقارير شاملة عن الامتثال لمعايير WCAG.
* تتبع تفصيلي للمشكلات مع إرشادات للإصلاح.
* دعم لمعايير WCAG المتعددة (WCAG 2.0، WCAG 2.1، WCAG 2.2).
* رؤى فورية حول إمكانية الوصول في لوحة تحكم TestMu AI.

## ابدأ مع TestMu AI لاختبار إمكانية الوصول

اتبع هذه الخطوات لدمج مجموعات اختبار WebdriverIO الخاصة بك مع اختبار إمكانية الوصول من TestMu AI:

1. قم بتثبيت حزمة خدمة TestMu AI WebdriverIO.

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

3. قم بتشغيل اختباراتك كالمعتاد. سيقوم TestMu AI تلقائيًا بفحص مشكلات إمكانية الوصول أثناء تنفيذ الاختبار.

```bash
npx wdio run wdio.conf.js
```

## خيارات التكوين

يدعم كائن `accessibilityOptions` المعلمات التالية:

* **wcagVersion**: حدد إصدار معيار WCAG للاختبار
  - `wcag20` - WCAG 2.0 المستوى A
  - `wcag21a` - WCAG 2.1 المستوى A
  - `wcag21aa` - WCAG 2.1 المستوى AA (الافتراضي)
  - `wcag22aa` - WCAG 2.2 المستوى AA

* **bestPractice**: تضمين توصيات أفضل الممارسات (الافتراضي: `false`)

* **needsReview**: تضمين المشكلات التي تحتاج إلى مراجعة يدوية (الافتراضي: `true`)

## عرض تقارير إمكانية الوصول

بعد اكتمال اختباراتك، يمكنك عرض تقارير مفصلة عن إمكانية الوصول في [لوحة تحكم TestMu AI](https://automation.lambdatest.com/):

1. انتقل إلى تنفيذ الاختبار الخاص بك
2. انقر على علامة التبويب "Accessibility"
3. راجع المشكلات المحددة مع مستويات الخطورة
4. احصل على إرشادات للإصلاح لكل مشكلة

لمزيد من المعلومات التفصيلية، قم بزيارة [وثائق أتمتة إمكانية الوصول TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/).