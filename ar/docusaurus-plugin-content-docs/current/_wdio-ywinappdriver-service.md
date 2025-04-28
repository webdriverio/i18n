---
id: wdio-ywinappdriver-service
title: خدمة ywinappdriver
custom_edit_url: https://github.com/licanhua/wdio-ywinappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-ywinappdriver-service هي حزمة طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/licanhua/wdio-ywinappdriver-service) | [npm](https://www.npmjs.com/package/wdio-ywinappdriver-service)

تساعدك هذه الخدمة على تشغيل خادم ywinappdriver بسلاسة عند تشغيل الاختبارات مع [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html). يقوم بتشغيل [ywinappdriver](https://github.com/licanhua/YWinAppDriver) في عملية فرعية.

## التثبيت

```bash
npm install wdio-ywinappdriver-service --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا.](https://webdriver.io/docs/gettingstarted.html)

## التكوين

لاستخدام الخدمة تحتاج إلى إضافة `ywinappdriver` إلى مصفوفة الخدمات الخاصة بك:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['ywinappdriver'],
    // ...
};
```

## الخيارات

يمكن إضافة الخيارات التالية إلى ملف wdio.conf.js. لتحديد خيارات للخدمة تحتاج إلى إضافة الخدمة إلى قائمة `services` بالطريقة التالية:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            // ywinappdriver service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath

المسار الذي يجب تخزين جميع سجلات خادم ywinappdriver فيه.

النوع: `String`

مثال:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

لاستخدام تثبيت winappdriver الخاص بك، على سبيل المثال، المثبتة بشكل عام، حدد الأمر الذي يجب بدء تشغيله.

النوع: `String`

مثال:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            command : 'c:\\xx\\ywinappdriver.exe'
        }]
    ],
    // ...
}
```

### args

قائمة بالوسيطات التي يتم تمريرها مباشرة إلى `ywinappdriver`.

راجع [التوثيق](https://github.com/licanhua/ywinappdriver) للحصول على الوسيطات الممكنة.

النوع: `Array`

الافتراضي: `[]`

مثال:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            args: ['--urls' 'http://127.0.0.1:4723' '--basepath' '/wd/hub']
        }]
    ],
    // ...
}
```