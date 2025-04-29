---
id: wdio-reportportal-service
title: خدمة بوابة التقارير
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-service/edit/master/README.md
---


> wdio-reportportal-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى زيارة [GitHub](https://github.com/borisosipov/wdio-reportportal-service) | [npm](https://www.npmjs.com/package/wdio-reportportal-service)

## التثبيت
الطريقة الأسهل هي الاحتفاظ بـ `wdio-reportportal-service` كتبعية تطوير (devDependency) في ملف `package.json` الخاص بك.
```json
{
  "devDependencies": {
    "wdio-reportportal-service": "^7.3.0"
  }
}
```
يمكنك القيام بذلك من خلال:

```bash
npm install wdio-reportportal-reporter --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا](https://webdriver.io/docs/gettingstarted).

## التكوين
قم بتكوين دليل الإخراج في ملف wdio.conf.js الخاص بك:
```js
const RpService = require('wdio-reportportal-service');

exports.config = {
  // ...
  services: [[RpService, {}]],
  // ...
}
```

## الترخيص

هذا المشروع مرخص بموجب ترخيص MIT - راجع ملف [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-service/blob/master/LICENSE) للحصول على التفاصيل