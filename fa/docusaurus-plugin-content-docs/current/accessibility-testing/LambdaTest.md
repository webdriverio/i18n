---
id: lambdatest
title: تست دسترسی‌پذیری LambdaTest
---

# تست دسترسی‌پذیری LambdaTest

شما می‌توانید به راحتی تست‌های دسترسی‌پذیری را در مجموعه تست‌های WebdriverIO خود با استفاده از [تست دسترسی‌پذیری LambdaTest](https://www.lambdatest.com/support/docs/accessibility-automation-settings/) ادغام کنید.

## مزایای تست دسترسی‌پذیری LambdaTest

تست دسترسی‌پذیری LambdaTest به شما کمک می‌کند تا مشکلات دسترسی‌پذیری را در برنامه‌های وب خود شناسایی و رفع کنید. مزایای اصلی عبارتند از:

* ادغام بی‌درنگ با اتوماسیون تست WebdriverIO موجود شما.
* اسکن خودکار دسترسی‌پذیری در حین اجرای تست.
* گزارش‌دهی جامع انطباق با WCAG.
* ردیابی دقیق مشکلات با راهنمایی اصلاحی.
* پشتیبانی از چندین استاندارد WCAG (WCAG 2.0، WCAG 2.1، WCAG 2.2).
* بینش دسترسی‌پذیری در زمان واقعی در داشبورد LambdaTest.

## شروع کار با تست دسترسی‌پذیری LambdaTest

مراحل زیر را برای ادغام مجموعه‌های تست WebdriverIO خود با تست دسترسی‌پذیری LambdaTest دنبال کنید:

1. بسته سرویس WebdriverIO لامبداتست را نصب کنید.

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

3. تست‌های خود را مانند همیشه اجرا کنید. LambdaTest به طور خودکار مشکلات دسترسی‌پذیری را در حین اجرای تست اسکن می‌کند.

```bash
npx wdio run wdio.conf.js
```

## گزینه‌های پیکربندی

شیء `accessibilityOptions` پارامترهای زیر را پشتیبانی می‌کند:

* **wcagVersion**: نسخه استاندارد WCAG برای تست را مشخص کنید
  - `wcag20` - WCAG 2.0 سطح A
  - `wcag21a` - WCAG 2.1 سطح A
  - `wcag21aa` - WCAG 2.1 سطح AA (پیش‌فرض)
  - `wcag22aa` - WCAG 2.2 سطح AA

* **bestPractice**: شامل توصیه‌های بهترین روش (پیش‌فرض: `false`)

* **needsReview**: شامل مشکلاتی که نیاز به بررسی دستی دارند (پیش‌فرض: `true`)

## مشاهده گزارش‌های دسترسی‌پذیری

پس از اتمام تست‌ها، می‌توانید گزارش‌های دقیق دسترسی‌پذیری را در [داشبورد LambdaTest](https://automation.lambdatest.com/) مشاهده کنید:

1. به اجرای تست خود بروید
2. روی تب "Accessibility" کلیک کنید
3. مشکلات شناسایی شده را با سطوح شدت بررسی کنید
4. راهنمای اصلاحی برای هر مشکل دریافت کنید

برای اطلاعات دقیق‌تر، از [مستندات اتوماسیون دسترسی‌پذیری LambdaTest](https://www.lambdatest.com/support/docs/accessibility-automation-settings/) بازدید کنید.