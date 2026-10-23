---
id: browserstack
title: تست دسترسی‌پذیری BrowserStack
description: "اسکن‌های خودکار دسترسی‌پذیری را به تست‌های WebdriverIO که روی BrowserStack Automate اجرا می‌شوند اضافه کنید و مشکلات یافت‌شده را در گزارش‌های BrowserStack بررسی کنید."
---

# تست دسترسی‌پذیری BrowserStack

شما می‌توانید به‌راحتی تست‌های دسترسی‌پذیری را با استفاده از [قابلیت تست‌های خودکار در BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) در مجموعه تست‌های WebdriverIO خود ادغام کنید.

## مزایای تست‌های خودکار در BrowserStack Accessibility Testing

برای استفاده از تست‌های خودکار در BrowserStack Accessibility Testing، تست‌های شما باید روی BrowserStack Automate اجرا شوند.

مزایای تست‌های خودکار به شرح زیر است:

* به‌طور یکپارچه با مجموعه تست‌های خودکار موجود شما ادغام می‌شود.
* هیچ تغییری در کد موارد تست لازم نیست.
* برای تست دسترسی‌پذیری به هیچ نگهداری اضافی نیاز ندارد.
* روندهای تاریخی را درک کنید و بینش‌هایی درباره موارد تست به دست آورید.

## شروع کار با BrowserStack Accessibility Testing

برای ادغام مجموعه تست‌های WebdriverIO خود با BrowserStack Accessibility Testing، این مراحل را دنبال کنید:

1. پکیج npm `@wdio/browserstack-service` را نصب کنید.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. فایل پیکربندی `wdio.conf.js` را به‌روزرسانی کنید.

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
        // گزینه‌های پیکربندی اختیاری
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

می‌توانید دستورالعمل‌های دقیق را [اینجا](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) مشاهده کنید.