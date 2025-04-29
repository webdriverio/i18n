---
id: wdio-rerun-service
title: سرویس اجرای مجدد
custom_edit_url: https://github.com/jwplayer/wdio-rerun-service/edit/master/README.md
---


> wdio-rerun-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفاً به [GitHub](https://github.com/jwplayer/wdio-rerun-service) | [npm](https://www.npmjs.com/package/wdio-rerun-service) مراجعه کنید

[![wdio-rerun-service CI](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/dm/wdio-rerun-service)
![npm bundle size](https://img.shields.io/bundlephobia/min/wdio-rerun-service)
![GitHub issues](https://img.shields.io/github/issues/webdriverio-community/wdio-rerun-service)

این سرویس تست‌های ناموفق Mocha یا Jasmine و سناریوهای Cucumber را که در چارچوب تست [WebdriverIO](https://webdriver.io) اجرا شده‌اند، ردیابی می‌کند. این امکان را فراهم می‌کند که تست‌ها یا سناریوهای ناموفق یا ناپایدار مجدداً اجرا شوند.

_نکته_: کاربران چارچوب Cucumber که از نسخه‌های `5.x` و `6.x` WebdriverIO استفاده می‌کنند باید از نسخه `1.6.x` استفاده کنند. اگر از آخرین نسخه اصلی `7.x` استفاده می‌کنید، از آخرین نسخه `1.7.x` این سرویس استفاده کنید.

## Re-run در مقابل Retry

منطق `retry` داخلی WebdriverIO برای Cucumber و Mocha/Jasmine برای رسیدگی به مراحل ناپایدار مفید است. بازنشانی در هر چارچوب معایبی دارد:
* Cucumber: در نظر نمی‌گیرد که برخی از مراحل ممکن است قابل تکرار در میانه یک تست نباشند. اجرای یک مرحله دو بار ممکن است بقیه سناریو را خراب کند یا ممکن است در متن تست امکان‌پذیر نباشد.
* Mocha/Jasmine: منطق `retry` ممکن است برای یک تست منفرد اعمال شود، اما این همچنان در زمان واقعی انجام می‌شود و ممکن است مشکلات زمانی یا مشکلات اتصال شبکه را در نظر نگیرد.

تمایزهای اصلی `re-run`:
* یک سناریوی کامل Cucumber را مجدداً اجرا می‌کند و نه فقط یک مرحله واحد
* امکان اجرای مجدد کل فایل spec را پس از اتمام اجرای تست اصلی فراهم می‌کند
* می‌تواند به صورت محلی کپی و اجرا شود (`retry` نمی‌تواند)
* همچنان می‌تواند در ترکیب با روش‌های `retry` استفاده شود
* برای اعمال منطق `retry` به تست‌های ناپایدار یا مشکل‌دار نیازی به تغییر کد ندارد

توصیه می‌شود برای ارزیابی گزینه‌های موجود زمان بگذارید. یک راه حل ترکیبی ممکن است بهترین راه حل برای ارائه بهترین نتایج تست واقعی و قابل اجرا باشد.

## نصب

ساده‌ترین راه، افزودن `wdio-rerun-service` به `devDependencies` در `package.json` شماست.

```json
{
    "devDependencies": {
        "wdio-rerun-service": "^1.6.2"
    }
}
```

می‌توان آن را با استفاده از `npm` نصب کرد:

```bash
npm install wdio-rerun-service
```

پس از تکمیل نصب بسته، آن را به آرایه `services` در `wdio.conf.js` اضافه کنید:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [RerunService, {
        // ...
    }]
};
```

دستورالعمل‌های نصب `WebdriverIO` را می‌توان [اینجا](https://webdriver.io/docs/gettingstarted.html) یافت.

## پیکربندی

گزینه‌های زیر را می‌توان به فایل wdio.conf.js اضافه کرد. برای تعریف گزینه‌های سرویس، باید سرویس را به لیست `services` به شکل زیر اضافه کنید:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            // گزینه‌های سرویس اجرای مجدد در اینجا...
        }]
    ],
    // ...
};
```

### rerunDataDir
دایرکتوری که تمام داده‌های JSON اجرای مجدد در طول اجرا در آن نگهداری می‌شود.

نوع: `String`

پیش‌فرض: `./results/rerun`

مثال:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunDataDir: './custom-rerun-directory'
        }]
    ],
    // ...
}
```

### rerunScriptPath
مسیر برای نوشتن اسکریپت Bash اجرای مجدد.

نوع: `String`

پیش‌فرض: `./rerun.sh`

مثال:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunScriptPath: './custom-path-for-rerun.sh'
        }]
    ],
    // ...
}
```

### ignoredTags
(فقط Cucumber) مجموعه‌ای از برچسب‌های Cucumber برای استثنا. اگر سناریو شامل یک برچسب باشد، سرویس اجرای مجدد تحلیل را رد می‌کند.

نوع: `Array`

پیش‌فرض: `[]`

مثال:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            ignoredTags: ['@known_bug']
        }]
    ],
    // ...
}
```

### commandPrefix
پیشوندی که به دستور اجرای مجدد تولید شده اضافه می‌شود.

نوع: `String`

پیش‌فرض: `''`

مثال:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            commandPrefix: "VARIABLE=true"
        }]
    ],
    // ...
}
```
----