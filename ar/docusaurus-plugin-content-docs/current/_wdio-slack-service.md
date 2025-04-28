---
id: wdio-slack-service
title: خدمة سلاك
custom_edit_url: https://github.com/carmenmitru/wdio-slack-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/carmenmitru/wdio-slack-service) | [npm](https://www.npmjs.com/package/wdio-slack-service)
مكتبة Webdriverio لإرسال نتائج الاختبارات كإشعار/رسالة سلاك إلى القنوات

## التثبيت

الطريقة الأسهل هي الاحتفاظ بـ `wdio-slack-service` كتبعية تطوير في ملف `package.json` الخاص بك.

```json
{
  "devDependencies": {
    "wdio-slack-service": "2.0.8"
  }
}
```

يمكنك القيام بذلك ببساطة عن طريق:

```bash
npm install wdio-slack-service --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا.](https://webdriver.io/docs/gettingstarted.html)

## التكوين

في البداية، قم باستيراد الخدمة إلى ملف تكوين wdio `wdio.conf.js`

```js
// wdio.conf.js
const slack = require('wdio-slack-service');
```

لاستخدام الخدمة، تحتاج إلى الحصول على عنوان URL لـ webhook سلاك لإرسال الإشعار، وتحتاج إلى إضافة `slack` إلى مصفوفة `services` الخاصة بك

مثال:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        [slack, {
            webHookUrl: "<SLACK_WEBHOOK_URL>", // يستخدم لنشر إشعار إلى قناة معينة
            notifyOnlyOnFailure: true, // إرسال إشعار فقط عند فشل الاختبار
            messageTitle: "<NOTIFICATION_TITLE>" // اسم الإشعار
        }]
]
```
## الميزات

- إرسال إشعار بغض النظر عن نتائج الاختبار
- إرسال إشعار فقط عند فشل الاختبار
- دعم لـ `mocha` و `jasmine` و `cucumber`
- سيتم تسجيل إعادة المحاولة/إعادة تشغيل الاختبارات مع معلومات إضافية
- معلومات مدة الاختبار
- تفاصيل الخطأ
- تقارير سيناريو/خطوة Cucumber
- معلومات المتصفح والإصدار

## كيف تعمل
بالنسبة لـ `mocha`/`jasmine`، سيتم إرسال الإشعار على مستوى المواصفات، وبالنسبة لـ `cucumber`، سيكون على مستوى الميزة. لنفترض أنه إذا كان لديك 10 ملفات مواصفات/ميزات، فستتلقى 10 إشعارات حيث يتم تشغيلها في خطاف `after`

## الخيارات

لإرسال إشعار، يجب أن يكون لديك عنوان URL لـ webhook سلاك. لمعرفة كيفية إنشاء عنوان URL لـ webhook سلاك، راجع هذه [الصفحة](https://api.slack.com/messaging/webhooks)

### webHookUrl

يستخدم هذا العنوان URL لتحديد/مصادقة الرسالة المنشورة وإرسالها إلى قناة سلاك

النوع: `String` <br/>
اختياري: `لا` <br/>
الافتراضي: `غير متاح`

### notifyOnlyOnFailure

إذا كنت ترغب في تلقي إشعارات سلاك فقط عند فشل الاختبار، فقم بتعيين هذا الخيار على `true`. وإلا، فإنه يرسل إشعارًا لجميع عمليات تنفيذ الاختبار بغض النظر عن النجاح/الفشل

النوع: `Boolean` <br/>
اختياري: `نعم` <br/>
الافتراضي: `false`

### messageTitle

عنوان الإشعار

النوع: `String` <br/>
اختياري: `نعم` <br/>
الافتراضي: `Webdriverio Slack Reporter`

## لقطات الشاشة

### نجاح/فشل Cucumber

![نجاح/فشل Cucumber](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumber.PNG)

### إعادة محاولة Cucumber

![إعادة محاولة Cucumber](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumberretry.PNG)

### الكل ناجح

![الكل ناجح](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/allpass.PNG)

### فشل ناجح

![فشل ناجح](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/failpass.PNG)

### إعادة المحاولة فشلت

![إعادة المحاولة فشلت](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retryfail.PNG)

### إعادة المحاولة نجحت

![إعادة المحاولة نجحت](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retrypassed.PNG)

---

لمزيد من المعلومات حول WebdriverIO، راجع [الصفحة الرئيسية](https://webdriver.io).