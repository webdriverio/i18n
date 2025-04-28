---
id: wdio-teamcity-reporter
title: تقرير مُبلغ Teamcity
custom_edit_url: https://github.com/webdriverio-community/wdio-teamcity-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-teamcity-reporter هو حزمة من طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/webdriverio-community/wdio-teamcity-reporter) | [npm](https://www.npmjs.com/package/wdio-teamcity-reporter)

مُبلغ Teamcity لـ WebdriverIO الذي يجعل من الممكن عرض نتائج الاختبارات في الوقت الفعلي، ويجعل معلومات الاختبار متاحة في علامة التبويب الاختبارات بصفحة نتائج البناء.


## التثبيت

```bash
npm install wdio-teamcity-reporter --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت WebdriverIO هنا: https://webdriver.io/docs/gettingstarted


## التكوين

أضف المُبلغ في ملف [wdio.conf.js](http://webdriver.io/guide/testrunner/configurationfile.html) الخاص بك:

```javascript
exports.config = {
  // ...
  reporters: [
    [
      'teamcity',
      {
        captureStandardOutput: false, // optional
        flowId: true, // optional
        message: '[title]', // optional
      }
    ]
  ],
  // ...
}
```

### الخيارات

- `captureStandardOutput (boolean)` — إذا كانت `true`، فستعتبر جميع رسائل الإخراج القياسية (والخطأ القياسي) المستلمة بين رسائل `testStarted` و `testFinished` هي مخرجات الاختبار. القيمة الافتراضية هي `false` وتفترض استخدام رسائل خدمة testStdOut و testStdErr للإبلاغ عن مخرجات الاختبار. الافتراضي `false`.
- `flowId (boolean)` — إذا كانت `true`، ستتم إضافة خاصية `flowId` إلى جميع الرسائل. تتبع التدفق ضروري على سبيل المثال للتمييز بين العمليات المنفصلة التي تعمل بالتوازي. الافتراضي `true`.
- `message (string)` — إمكانية توفير تنسيق معين لخاصية الاسم. المفاتيح الممكنة: `[browser]`، `[title]`. مثال، `[browser] / [title]`. الافتراضي `[title]`.


## الروابط

- الإشارة إلى وثائق Teamcity حول رسائل الإبلاغ: https://confluence.jetbrains.com/display/TCD65/Build+Script+Interaction+with+TeamCity
- تجربة Teamcity: https://blog.jetbrains.com/teamcity/2019/08/getting-started-with-teamcity-testdrive/


## الترخيص

> ترخيص MIT