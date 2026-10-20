---
id: browserstack
title: اختبار إمكانية الوصول من BrowserStack
description: "أضف فحوصات آلية لإمكانية الوصول إلى اختبارات WebdriverIO التي تعمل على BrowserStack Automate، وراجع المشكلات المكتشفة في تقارير BrowserStack."
---

# اختبار إمكانية الوصول من BrowserStack

يمكنك بسهولة دمج اختبارات إمكانية الوصول في مجموعات اختبارات WebdriverIO الخاصة بك باستخدام [ميزة الاختبارات الآلية في اختبار إمكانية الوصول من BrowserStack](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## مزايا الاختبارات الآلية في اختبار إمكانية الوصول من BrowserStack

لاستخدام الاختبارات الآلية في اختبار إمكانية الوصول من BrowserStack، يجب أن تعمل اختباراتك على BrowserStack Automate.

فيما يلي مزايا الاختبارات الآلية:

* تندمج بسلاسة في مجموعة اختبارات الأتمتة الموجودة لديك مسبقًا.
* لا تتطلب أي تغييرات في الكود ضمن حالات الاختبار.
* لا تتطلب أي صيانة إضافية لاختبار إمكانية الوصول.
* تتيح لك فهم الاتجاهات التاريخية واكتساب رؤى حول حالات الاختبار.

## البدء مع اختبار إمكانية الوصول من BrowserStack

اتبع هذه الخطوات لدمج مجموعات اختبارات WebdriverIO الخاصة بك مع اختبار إمكانية الوصول من BrowserStack:

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

يمكنك الاطلاع على التعليمات التفصيلية [هنا](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).