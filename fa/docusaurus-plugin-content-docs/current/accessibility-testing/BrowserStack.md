---
id: browserstack
title: تست دسترسی‌پذیری BrowserStack
---

# تست دسترسی‌پذیری BrowserStack

شما می‌توانید به راحتی تست‌های دسترسی‌پذیری را در مجموعه تست‌های WebdriverIO خود با استفاده از [ویژگی تست‌های خودکار BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) ادغام کنید.

## مزایای تست‌های خودکار در تست دسترسی‌پذیری BrowserStack

برای استفاده از تست‌های خودکار در تست دسترسی‌پذیری BrowserStack، تست‌های شما باید روی BrowserStack Automate اجرا شوند.

مزایای زیر برای تست‌های خودکار وجود دارد:

* به طور یکپارچه در مجموعه تست‌های خودکار موجود شما ادغام می‌شود.
* هیچ تغییری در کد تست‌ها نیاز نیست.
* برای تست دسترسی‌پذیری به هیچ نگهداری اضافی نیاز ندارد.
* روند‌های تاریخی را درک کنید و بینش‌های موردی تست‌ها را به دست آورید.

## شروع کار با تست دسترسی‌پذیری BrowserStack

برای ادغام مجموعه تست‌های WebdriverIO خود با تست دسترسی‌پذیری BrowserStack، این مراحل را دنبال کنید:

1. بسته `@wdio/browserstack-service` را نصب کنید.

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

شما می‌توانید دستورالعمل‌های مفصل را [اینجا](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) مشاهده کنید.