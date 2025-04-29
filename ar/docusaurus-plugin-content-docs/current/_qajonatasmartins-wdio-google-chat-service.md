---
id: qajonatasmartins-wdio-google-chat-service
title: خدمة دردشة جوجل
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---


> @qajonatasmartins/wdio-google-chat-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service)

مكتبة Webdriverio لإرسال نتائج الاختبار كإشعار/رسالة إلى مساحات دردشة جوجل.

## التثبيت

`npm install wdio-google-chat-service --save-dev`

أو

`yarn add wdio-google-chat-service`

## الإعدادات

أولاً، قم باستيراد الخدمة إلى ملف تكوين wdio `wdio.conf.js`

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

لاستخدام الخدمة تحتاج إلى الحصول على رابط webhook لدردشة جوجل لإرسال الإشعار وإضافة الرابط في 'webhook'

مثال:

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //إرسال إشعار فقط في حالة فشل الاختبار
        }]
],
```

## الحصول على webhook دردشة جوجل

ملاحظة: دردشة جوجل توفر webhook للحسابات التجارية فقط. إذا كنت تستخدم حسابًا شخصيًا فقد لا يكون لديك خيار webhook.

1. إنشاء مساحة على دردشة جوجل
2. انقر على السهم بجوار اسم مساحة الدردشة
3. انقر على [إدارة Webhooks]
4. أضف واحدًا أو انسخ رابط webhook المعروض.
5. الصق رابط webhook في الخدمة داخل الخيار 'webhookUrl' كما في المثال أعلاه.

## الميزات

- دعم لمشغل mocha
- تفاصيل الأخطاء
- إرسال إشعار فقط في حالة فشل الاختبار

## النتائج

![نجاح وفشل الاختبار](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)