---
id: browserstack
title: اختبار إمكانية الوصول من BrowserStack
---

# اختبار إمكانية الوصول من BrowserStack

يمكنك بسهولة دمج اختبارات إمكانية الوصول في مجموعات اختبار WebdriverIO باستخدام [ميزة الاختبارات الآلية لاختبار إمكانية الوصول من BrowserStack](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## مزايا الاختبارات الآلية في اختبار إمكانية الوصول من BrowserStack

لاستخدام الاختبارات الآلية في اختبار إمكانية الوصول من BrowserStack، يجب أن تكون اختباراتك قيد التشغيل على BrowserStack Automate.

فيما يلي مزايا الاختبارات الآلية:

* تتكامل بسلاسة مع مجموعة اختبارات الأتمتة الموجودة مسبقًا.
* لا تتطلب تغييرات في كود حالات الاختبار.
* لا تتطلب صيانة إضافية لاختبار إمكانية الوصول.
* فهم الاتجاهات التاريخية والحصول على رؤى حول حالات الاختبار.

## البدء مع اختبار إمكانية الوصول من BrowserStack

اتبع هذه الخطوات لدمج مجموعات اختبار WebdriverIO مع اختبار إمكانية الوصول من BrowserStack:

1. قم بتثبيت حزمة npm الخاصة بـ `@wdio/browserstack-service`.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. قم بتحديث ملف الإعدادات `wdio.conf.js`.

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
        // Optional configuration options
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

يمكنك الاطلاع على تعليمات مفصلة [هنا](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).