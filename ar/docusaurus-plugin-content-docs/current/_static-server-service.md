---
id: static-server-service
title: خدمة الخادم الثابت
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-static-server-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

بعض المشاريع هي أصول واجهة أمامية فقط، ولا تعمل على أكثر من خادم ثابت. تساعدك هذه الخدمة على تشغيل خادم ملفات ثابت أثناء الاختبار.

## التثبيت

الطريقة الأسهل هي إضافة `@wdio/static-server-service` كـ `devDependency` في ملف `package.json` الخاص بك، عبر:

```sh
npm install @wdio/static-server-service --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا](https://webdriver.io/docs/gettingstarted).

## التكوين

لاستخدام خدمة الخادم الثابت، أضف `static-server` إلى مصفوفة الخدمات الخاصة بك:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['static-server'],
    // ...
};
```

## الخيارات

### `folders` (مطلوب)

مصفوفة من مسارات المجلدات ونقاط التركيب.

النوع: `Array<Object>`
الخصائص:
 - mount `{String}` - نقطة نهاية URL حيث سيتم تركيب المجلد.
 - path `{String}` - المسار إلى المجلد المراد تركيبه.

``` javascript
 // wdio.conf.js
 export const config = {
    // ...
    services: [
        ['static-server', {
            folders: [
                { mount: '/fixtures', path: './tests/fixtures' },
                { mount: '/dist', path: './dist' },
            ]
        }]
    ],
    // ...
 };
```

### `port`

المنفذ لربط الخادم.

النوع: `Number`

الافتراضي: `4567`

### `middleware`

مصفوفة من كائنات الوسيط. قم بتحميل وإنشاء هذه في التكوين، ومررها للخادم الثابت لاستخدامها.

النوع: `Array<Object>`
الخصائص:
 - mount `{String}` - نقطة نهاية URL حيث سيتم تركيب الوسيط.
 - middleware `<Object>` - دالة رد اتصال الوسيط.

الافتراضي: `[]`

``` javascript
// wdio.conf.js
import middleware from 'middleware-package'

export const config = {
    // ...
    services: [
        ['static-server', {
            middleware: [{
                mount: '/',
                middleware: middleware(/* middleware options */),
            }],
        }]
    ],
    // ...
};
```

----

للمزيد من المعلومات حول WebdriverIO، راجع [الصفحة الرئيسية](http://webdriver.io).