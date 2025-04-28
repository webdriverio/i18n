---
id: wdio-cucumber-viewport-logger-service
title: خدمة سجل عرض كيوكمبر
custom_edit_url: https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumber-viewport-logger-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service) | [npm](https://www.npmjs.com/package/wdio-cucumber-viewport-logger-service)
## خدمة سجل عرض كيوكمبر لـ WebdriverIO

تضيف هذه الخدمة إمكانية تسجيل خطوات كيوكمبر الخاصة بك ومعلومات تصحيح الأخطاء الأخرى مباشرة إلى نافذة المتصفح في
الحل المستند إلى WebdriverIO. يمكن أن تكون مفيدة بشكل خاص في حالات استخدام الأجهزة أو الأجهزة الافتراضية دون وصول
*فعلي* مباشر إليها وإمكانية إعداد جلسة تفاعلية للتصحيح العميق لاختبارات e2e الخاصة بك.

![demo](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/raw/main/img/demo.gif)

### البدء السريع

قم بتثبيت الحزمة:

```bash
npm install wdio-cucumber-viewport-logger-service --save-dev
```

أضف الخدمة إلى قسم `services` في ملف التكوين الخاص بك، على سبيل المثال:

```js
  services: [
    //...
    'cucumber-viewport-logger',
    //...
]
```

### خيارات الخدمة

| الخيار  | الوصف | النوع | القيمة الافتراضية |
| --- | --- | --- | --- |
| `numberOfSteps`  | عدد الخطوات التي ستظهر في العرض  | number |3 |
| `enabled`  | تمكين/تعطيل الخدمة | boolean |true |
| `styles`  | أنماط CSS لغلاف السجل، *الكلمة الرئيسية للخطوة* و *نص الخطوة*، انظر المثال أدناه  | object |{} |

```js
// wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
            numberOfSteps: 5,
            enabled: process.env.VP_LOGGER === '1', // سيتم تمكين الخدمة فقط عند تعيين متغير البيئة `VP_LOGGER` إلى `1`
            // تعيين أنماط CSS مخصصة لعناصر معينة
            styles: {
                wrapper: { backgroundColor: 'white' },
                keyword: { color: 'red' },
                text: {
                    fontSize: '30px',
                    color: 'green',
                },
                closeButton: {
                    color: 'red',
                },
            },
        },]
    ]
    // ...
};
```

### API

> `logToViewport(message, styles)` - عرض رسالة مخصصة بنمط CSS مخصص (غير إلزامي)، يمكنك استخدام هذا في تعريفات الخطوات الخاصة بك
على سبيل المثال:
>```js
>When(/^I render message: "([^"]*)"$/, { timeout: 120000 }, function (message) {
>    browser.logToViewport(message, { text: { color: 'green' } });
>});
>```


> `removeViewportLogMessage()` - إزالة قسم رسائل العرض، يمكن أن يكون مفيدًا على سبيل المثال للقيام بتأكيد بصري

### pointerEvents: 'none'

بشكل افتراضي، تمر جميع أحداث الماوس (النقر، التحويم، إلخ) عبر قسم الرسائل، على سبيل المثال: بدلاً من النقر على قسم الرسالة، ستمر نقرتك إلى العنصر المجاور للرسالة (عنصر التطبيق الخاص بك)، إذا كنت ترغب في تغيير هذا السلوك، قم بتعيين خيار 'pointerEvents' لنمط الغلاف إلى 'auto'، على سبيل المثال:
```js

/ wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
     
            styles: {
                wrapper: { pointerEvents: 'auto' },
            },
        },]
    ]
    // ...
};
```