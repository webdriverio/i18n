---
id: testmuai
title: تست دسترس‌پذیری TestMu AI (با نام قبلی LambdaTest)
description: "تست دسترس‌پذیری TestMu AI (با نام قبلی LambdaTest) را در مجموعه تست WebdriverIO خود فعال کنید، گزینه‌های اسکن را پیکربندی کنید و گزارش‌های دسترس‌پذیری را مشاهده کنید."
---

# تست دسترس‌پذیری TestMu AI

شما می‌توانید با استفاده از [تست دسترس‌پذیری TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/) به‌راحتی تست‌های دسترس‌پذیری را در مجموعه تست‌های WebdriverIO خود ادغام کنید.

## مزایای تست دسترس‌پذیری TestMu AI

تست دسترس‌پذیری TestMu AI به شما کمک می‌کند تا مشکلات دسترس‌پذیری را در برنامه‌های وب خود شناسایی و برطرف کنید. مزایای کلیدی آن عبارتند از:

* ادغام یکپارچه با اتوماسیون تست WebdriverIO موجود شما.
* اسکن خودکار دسترس‌پذیری در حین اجرای تست.
* گزارش‌دهی جامع انطباق با WCAG.
* ردیابی دقیق مشکلات همراه با راهنمایی برای رفع آن‌ها.
* پشتیبانی از چندین استاندارد WCAG (WCAG 2.0، WCAG 2.1، WCAG 2.2).
* بینش‌های لحظه‌ای دسترس‌پذیری در داشبورد TestMu AI.

## شروع کار با تست دسترس‌پذیری TestMu AI

برای ادغام مجموعه تست‌های WebdriverIO خود با تست دسترس‌پذیری TestMu AI، این مراحل را دنبال کنید:

1. پکیج سرویس TestMu AI WebdriverIO را نصب کنید.

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
            accessibility: true, // فعال‌سازی تست دسترس‌پذیری
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // نسخه WCAG (wcag20, wcag21a, wcag21aa, wcag22aa)
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

3. تست‌های خود را طبق معمول اجرا کنید. TestMu AI به‌طور خودکار در حین اجرای تست، مشکلات دسترس‌پذیری را اسکن می‌کند.

```bash
npx wdio run wdio.conf.js
```

## گزینه‌های پیکربندی

شیء `accessibilityOptions` از پارامترهای زیر پشتیبانی می‌کند:

* **wcagVersion**: نسخه استاندارد WCAG را که می‌خواهید بر اساس آن تست کنید مشخص کنید
  - `wcag20` - WCAG 2.0 سطح A
  - `wcag21a` - WCAG 2.1 سطح A
  - `wcag21aa` - WCAG 2.1 سطح AA (پیش‌فرض)
  - `wcag22aa` - WCAG 2.2 سطح AA

* **bestPractice**: شامل کردن توصیه‌های بهترین روش‌ها (پیش‌فرض: `false`)

* **needsReview**: شامل کردن مشکلاتی که نیاز به بررسی دستی دارند (پیش‌فرض: `true`)

## مشاهده گزارش‌های دسترس‌پذیری

پس از اتمام تست‌ها، می‌توانید گزارش‌های دقیق دسترس‌پذیری را در [داشبورد TestMu AI](https://automation.lambdatest.com/) مشاهده کنید:

1. به اجرای تست خود بروید
2. روی تب "Accessibility" کلیک کنید
3. مشکلات شناسایی‌شده را همراه با سطوح شدت آن‌ها بررسی کنید
4. برای هر مشکل راهنمایی رفع آن را دریافت کنید

برای اطلاعات بیشتر، به [مستندات اتوماسیون دسترس‌پذیری TestMu AI](https://www.testmuai.com/support/docs/accessibility-automation-settings/) مراجعه کنید.