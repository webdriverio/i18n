---
id: appium-service
title: خدمة أبيوم
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-appium-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

التعامل مع خادم أبيوم يقع خارج نطاق مشروع WebdriverIO الفعلي. تساعدك هذه الخدمة على تشغيل خادم أبيوم بسلاسة عند تشغيل الاختبارات باستخدام [WDIO testrunner](https://webdriver.io/docs/clioptions). تقوم بتشغيل [خادم أبيوم](https://appium.github.io/appium.io/docs/en/about-appium/getting-started/index.html#starting-appium) في عملية فرعية.

## التثبيت

الطريقة الأسهل هي الاحتفاظ بـ `@wdio/appium-service` كتبعية تطويرية في ملف `package.json` الخاص بك، عبر:

```sh
npm install @wdio/appium-service --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا.](https://webdriver.io/docs/gettingstarted)

## التكوين

لاستخدام الخدمة، تحتاج إلى إضافة `appium` إلى مصفوفة الخدمات الخاصة بك:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // default appium port
    services: ['appium'],
    // ...
};
```

## الخيارات

يمكن إضافة الخيارات التالية إلى ملف wdio.conf.js. لتحديد خيارات للخدمة، تحتاج إلى إضافة الخدمة إلى قائمة `services` بالطريقة التالية:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // default appium port
    services: [
        ['appium', {
            // Appium service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath
المسار الذي يجب تخزين جميع سجلات خادم أبيوم فيه.

النوع: `String`

مثال:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command
لاستخدام تثبيت أبيوم الخاص بك، على سبيل المثال المثبت عالميًا، حدد الأمر الذي يجب بدء تشغيله.

النوع: `String`

مثال:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            command : 'appium'
        }]
    ],
    // ...
}
```

### args
خريطة من الوسائط لخادم أبيوم، تم تمريرها مباشرةً إلى `appium`.

راجع [الوثائق](https://github.com/appium/appium/blob/master/packages/appium/docs/en/cli/args.md) للوسائط الممكنة.
يتم توفير الوسائط في حالة الجمل الصغير. على سبيل المثال، `debugLogSpacing: true` تتحول إلى `--debug-log-spacing`، أو يمكن توفيرها كما هو موضح في وثائق أبيوم.

النوع: `Object`

الافتراضي: `{}`

مثال:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            args: {
                // ...
                debugLogSpacing: true,
                platformName: 'iOS'
                // ...
            }
        }]
    ],
    // ...
}
```
**ملاحظة:** استخدام الأسماء المستعارة غير مستحسن وغير مدعوم. بدلاً من ذلك، يرجى استخدام اسم الخاصية الكامل في حالة الجمل الصغير.

----

لمزيد من المعلومات حول WebdriverIO، راجع [الصفحة الرئيسية](https://webdriver.io).