---
id: wdio-winappdriver-service
title: خدمة winappdriver
custom_edit_url: https://github.com/licanhua/wdio-winappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-winappdriver-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى زيارة [GitHub](https://github.com/licanhua/wdio-winappdriver-service) | [npm](https://www.npmjs.com/package/wdio-winappdriver-service)

تساعدك هذه الخدمة على تشغيل خادم WinAppDriver بسلاسة عند تشغيل الاختبارات مع [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html). إنها تبدأ [WinAppDriver](https://github.com/Microsoft/WinAppDriver) في عملية فرعية.

## التثبيت

```bash
npm install wdio-winappdriver-service --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا.](https://webdriver.io/docs/gettingstarted.html)

## التكوين

لاستخدام الخدمة تحتاج إلى إضافة `winappdriver` إلى مصفوفة الخدمات الخاصة بك:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['winappdriver'],
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
        ['winappdriver', {
            // WinAppDriver service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath

المسار الذي يجب تخزين جميع سجلات خادم winappdriver فيه.

النوع: `String`

مثال:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

لاستخدام التثبيت الخاص بك من WinAppDriver، على سبيل المثال المثبت عالميًا، حدد الأمر الذي يجب بدؤه.

النوع: `String`

مثال:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            command : 'c:\\Program Files (x86)\\Windows Application Driver\\WinAppDriver.exe'
        }]
    ],
    // ...
}
```

### args

قائمة الوسيطات المرسلة مباشرة إلى `WinAppDriver`.

راجع [الوثائق](https://github.com/Microsoft/WinAppDriver) للوسيطات الممكنة.

النوع: `Array`

الافتراضي: `[]`

مثال:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            args: ['10.0.0.10', '4723/wd/hub']
        }]
    ],
    // ...
}
```