---
id: testmuai
title: تست دسترسی‌پذیری TestMu AI (سابقاً LambdaTest)
---

# TestMu AI Accessibility Testing

شما می‌توانید به راحتی تست‌های دسترسی‌پذیری را در مجموعه تست‌های WebdriverIO خود با استفاده از [تست دسترسی‌پذیری TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/) ادغام کنید.

## مزایای تست دسترسی‌پذیری TestMu AI

تست دسترسی‌پذیری TestMu AI به شما کمک می‌کند تا مشکلات دسترسی‌پذیری را در برنامه‌های وب خود شناسایی و رفع کنید. مزایای کلیدی آن عبارتند از:

* ادغام بدون دردسر با اتوماسیون تست WebdriverIO موجود شما.
* اسکن خودکار دسترسی‌پذیری در حین اجرای تست.
* گزارش‌دهی جامع انطباق با WCAG.
* پیگیری دقیق مشکلات با راهنمایی‌های رفع.
* پشتیبانی از استانداردهای مختلف WCAG (WCAG 2.0، WCAG 2.1، WCAG 2.2).
* بینش‌های دسترسی‌پذیری در زمان واقعی در داشبورد TestMu AI.

## شروع کار با تست دسترسی‌پذیری TestMu AI

این مراحل را برای ادغام مجموعه تست‌های WebdriverIO خود با تست دسترسی‌پذیری TestMu AI دنبال کنید:

1. بسته سرویس WebdriverIO از TestMu AI را نصب کنید.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. فایل پیکربندی `wdio.conf.js` خود را به‌روزرسانی کنید.

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

3. تست‌های خود را به صورت معمول اجرا کنید. TestMu AI به طور خودکار مشکلات دسترسی‌پذیری را در حین اجرای تست اسکن می‌کند.

```bash
npx wdio run wdio.conf.js
```

## گزینه‌های پیکربندی

شیء `accessibilityOptions` از پارامترهای زیر پشتیبانی می‌کند:

* **wcagVersion**: نسخه استاندارد WCAG که می‌خواهید در برابر آن تست کنید
  - `wcag20` - WCAG 2.0 سطح A
  - `wcag21a` - WCAG 2.1 سطح A
  - `wcag21aa` - WCAG 2.1 سطح AA (پیش‌فرض)
  - `wcag22aa` - WCAG 2.2 سطح AA

* **bestPractice**: شامل توصیه‌های بهترین روش (پیش‌فرض: `false`)

* **needsReview**: شامل مشکلاتی که نیاز به بررسی دستی دارند (پیش‌فرض: `true`)

## مشاهده گزارش‌های دسترسی‌پذیری

پس از تکمیل تست‌های خود، می‌توانید گزارش‌های دقیق دسترسی‌پذیری را در [داشبورد TestMu AI](https://automation.lambdatest.com/) مشاهده کنید:

1. به اجرای تست خود بروید
2. روی تب "Accessibility" کلیک کنید
3. مشکلات شناسایی شده را با سطوح شدت بررسی کنید
4. برای هر مشکل، راهنمایی‌های رفع را دریافت کنید

برای اطلاعات بیشتر، از [مستندات اتوماسیون دسترسی‌پذیری TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/) بازدید کنید.