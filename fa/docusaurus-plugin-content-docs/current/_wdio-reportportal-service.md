---
id: wdio-reportportal-service
title: سرویس ریپورت پورتال
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-service/edit/master/README.md
---


> wdio-reportportal-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفاً به [GitHub](https://github.com/borisosipov/wdio-reportportal-service) | [npm](https://www.npmjs.com/package/wdio-reportportal-service) مراجعه کنید

## نصب
ساده‌ترین راه این است که `wdio-reportportal-service` را به عنوان devDependency در `package.json` خود نگه دارید.
```json
{
  "devDependencies": {
    "wdio-reportportal-service": "^7.3.0"
  }
}
```
شما می‌توانید این کار را انجام دهید با:

```bash
npm install wdio-reportportal-reporter --save-dev
```

دستورالعمل نحوه نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted) پیدا کنید.

## پیکربندی
دایرکتوری خروجی را در فایل wdio.conf.js خود پیکربندی کنید:
```js
const RpService = require('wdio-reportportal-service');

exports.config = {
  // ...
  services: [[RpService, {}]],
  // ...
}
```

## مجوز

این پروژه تحت مجوز MIT منتشر شده است - برای جزئیات به فایل [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-service/blob/master/LICENSE) مراجعه کنید