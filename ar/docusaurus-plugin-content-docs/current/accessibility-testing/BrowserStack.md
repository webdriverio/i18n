---
id: browserstack
title: اختبار إمكانية الوصول باستخدام BrowserStack
description: "أضف عمليات فحص آلية لإمكانية الوصول إلى اختبارات WebdriverIO التي تعمل على BrowserStack Automate، وراجع المشكلات المكتشفة في تقارير BrowserStack."
---

# اختبار إمكانية الوصول باستخدام BrowserStack

يمكنك بسهولة دمج اختبارات إمكانية الوصول في مجموعات اختبارات WebdriverIO الخاصة بك باستخدام [ميزة الاختبارات الآلية في BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## مزايا الاختبارات الآلية في BrowserStack Accessibility Testing

لاستخدام الاختبارات الآلية في BrowserStack Accessibility Testing، يجب أن تعمل اختباراتك على BrowserStack Automate.

فيما يلي مزايا الاختبارات الآلية:

* تتكامل بسلاسة مع مجموعة اختبارات الأتمتة الموجودة لديك مسبقًا.
* لا تتطلب أي تغييرات في الكود ضمن حالات الاختبار.
* لا تتطلب أي صيانة إضافية لاختبار إمكانية الوصول.
* تتيح لك فهم الاتجاهات التاريخية والحصول على رؤى حول حالات الاختبار.

## البدء مع BrowserStack Accessibility Testing

اتبع الخطوات التالية لدمج مجموعات اختبارات WebdriverIO الخاصة بك مع BrowserStack Accessibility Testing:

1. ثبّت حزمة npm ‏`@wdio/browserstack-service`.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. حدّث ملف الإعدادات `wdio.conf.js`.

```javascript
exports.config = {
    //...
    user: '<browserstack_username>' || process.env.BROWSERSTACK_USERNAME,
    key: '<browserstack_access_key>' || process.env.BROWSERSTACK_ACCESS_KEY,
    commonCapabilities: {
      'bstack:options': {
        projectName: "Your static project name goes here",
        buildName: "Your static build/job name goes here"
      }
    },
    services: [
      ['browserstack', {
        accessibility: true,
        // خيارات إعداد اختيارية
        accessibilityOptions: {
          'wcagVersion': 'wcag21a',
          'includeIssueType': {
            'bestPractice': false,
            'needsReview': true
          },
          'includeTagsInTestingScope': ['Specify tags of test cases to be included'],
          'excludeTagsInTestingScope': ['Specify tags of test cases to be excluded']
        },
      }]
    ],
    //...
  };
```

يمكنك الاطلاع على التعليمات المفصلة [هنا](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).