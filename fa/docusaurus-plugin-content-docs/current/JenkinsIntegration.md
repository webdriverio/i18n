---
id: jenkins
title: Jenkins
description: "تست‌های WebdriverIO را در Jenkins اجرا کنید و نتایج گزارشگر JUnit را منتشر کنید تا خطاها را اشکال‌زدایی کرده و تاریخچه تست‌ها را دنبال کنید."
---

WebdriverIO یکپارچگی محکمی با سیستم‌های CI مانند [Jenkins](https://jenkins-ci.org) ارائه می‌دهد. با گزارشگر `junit`، می‌توانید به راحتی تست‌های خود را اشکال‌زدایی کنید و همچنین نتایج تست‌های خود را دنبال کنید. این یکپارچه‌سازی بسیار ساده است.

1. گزارشگر تست `junit` را نصب کنید: `$ npm install @wdio/junit-reporter --save-dev`)
1. پیکربندی خود را به‌روزرسانی کنید تا نتایج XUnit در جایی ذخیره شوند که Jenkins بتواند آن‌ها را پیدا کند،
    (و گزارشگر `junit` را مشخص کنید):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './'
        }]
    ],
    // ...
}
```

انتخاب فریم‌ورک به عهده شماست. گزارش‌ها مشابه خواهند بود.
در این آموزش، از Jasmine استفاده می‌کنیم.

پس از نوشتن چند تست، می‌توانید یک job جدید در Jenkins ایجاد کنید. یک نام و یک توضیح برای آن تعیین کنید:

![Name And Description](/img/jenkins/jobname.png "Name And Description")

سپس مطمئن شوید که همیشه جدیدترین نسخه مخزن شما را دریافت می‌کند:

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**اکنون بخش مهم:** یک مرحله `build` برای اجرای دستورات shell ایجاد کنید. مرحله `build` باید پروژه شما را بسازد. از آنجا که این پروژه نمایشی فقط یک برنامه خارجی را تست می‌کند، نیازی به ساختن چیزی ندارید. فقط وابستگی‌های node را نصب کرده و دستور `npm test` را اجرا کنید (که نام مستعاری برای `node_modules/.bin/wdio test/wdio.conf.js` است).

اگر افزونه‌ای مانند AnsiColor را نصب کرده‌اید، اما لاگ‌ها همچنان رنگی نیستند، تست‌ها را با متغیر محیطی `FORCE_COLOR=1` اجرا کنید (به عنوان مثال، `FORCE_COLOR=1 npm test`).

![Build Step](/img/jenkins/runjob.png "Build Step")

پس از اجرای تست، می‌خواهید Jenkins گزارش XUnit شما را دنبال کند. برای این کار، باید یک اقدام پس از build با نام _"Publish JUnit test result report"_ اضافه کنید.

همچنین می‌توانید یک افزونه خارجی XUnit برای دنبال کردن گزارش‌های خود نصب کنید. افزونه JUnit همراه با نصب پایه Jenkins ارائه می‌شود و فعلاً کافی است.

طبق فایل پیکربندی، گزارش‌های XUnit در دایرکتوری ریشه پروژه ذخیره می‌شوند. این گزارش‌ها فایل‌های XML هستند. بنابراین، تنها کاری که برای دنبال کردن گزارش‌ها باید انجام دهید این است که Jenkins را به تمام فایل‌های XML در دایرکتوری ریشه خود هدایت کنید:

![Post-build Action](/img/jenkins/postjob.png "Post-build Action")

تمام شد! اکنون Jenkins را برای اجرای jobهای WebdriverIO خود راه‌اندازی کرده‌اید. job شما اکنون نتایج تست دقیق همراه با نمودارهای تاریخچه، اطلاعات stacktrace برای jobهای ناموفق، و فهرستی از دستورات همراه با payload استفاده‌شده در هر تست را ارائه می‌دهد.

![Jenkins Final Integration](/img/jenkins/final.png "Jenkins Final Integration")