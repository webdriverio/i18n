---
id: wdio-gmail-service
title: خدمة جيميل
custom_edit_url: https://github.com/webdriverio-community/wdio-gmail-service/edit/main/README.md
---


> wdio-gmail-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى مراجعة [GitHub](https://github.com/webdriverio-community/wdio-gmail-service) | [npm](https://www.npmjs.com/package/wdio-gmail-service)

إضافة لـ WebdriverIO تسمح بجلب رسائل البريد الإلكتروني من جوجل ميل باستخدام [Gmail Tester](https://github.com/levz0r/gmail-tester).

## التثبيت

أسهل طريقة هي الاحتفاظ بـ `wdio-gmail-service` كـ `devDependency` في ملف package.json الخاص بك.

```json
{
  "devDependencies": {
    "wdio-gmail-service": "^2.0.0"
  }
}
```

يمكنك ببساطة القيام بذلك عن طريق:

```sh
npm install wdio-gmail-service --save-dev
```

## الاستخدام

### مصادقة جيميل

ستحتاج إلى اتباع التعليمات في [Gmail Tester](https://github.com/levz0r/gmail-tester) لإنشاء `credentials.json` (ملف مصادقة OAuth2) و `token.json` (رمز OAuth2).

### التكوين

أضف الخدمة عن طريق إضافة `gmail` إلى قائمة الخدمات، على سبيل المثال:

```js
// wdio.conf.js
import path from 'path'

export const config = {
    // ...
    services: [['gmail', {
        credentialsJsonPath: path.join(process.cwd(), './credentials.json'),
        tokenJsonPath: join(process.cwd(), './token.json'),
        intervalSec: 10,
        timeoutSec: 60
    }]]
    // ...
};
```

## خيارات الخدمة

### credentialsJsonPath
المسار المطلق لملف بيانات الاعتماد JSON.

النوع: `string`

مطلوب: `true`

### tokenJsonPath
المسار المطلق لملف رمز JSON.

النوع: `string`

مطلوب: `true`

### intervalSec
الفاصل الزمني بين عمليات فحص بريد جيميل الوارد.

النوع: `number`

الافتراضي: `10`

مطلوب: `false`

### timeoutSec
الحد الأقصى للوقت المستغرق للانتظار للعثور على البريد الإلكتروني للمرشحات المحددة.

النوع: `number`

الافتراضي: `60`

مطلوب: `false`


## كتابة الاختبارات

في اختبار WebdriverIO الخاص بك، يمكنك الآن التحقق مما إذا تم استلام بريد إلكتروني.

```js
describe('Example', () => {
    it('Should check email', () => {
        // perform some actions that will send an email to setup gmail account
        const emails = await browser.checkInbox({ from: 'AccountSupport@ubi.com', subject: 'Ubisoft Password Change Request' });
        expect(emails[0].body.html).toContain('https://account-uplay.ubi.com/en-GB/action/change-password?genomeid=')
    })
})
```

## معلمات `checkInbox`

تتطلب معلمات الأمر واحدًا على الأقل من `from` أو `to` أو `subject`:

### `from`
التصفية على عنوان البريد الإلكتروني للمرسل.

النوع: `String`

### `to`
التصفية على عنوان البريد الإلكتروني للمستلم.

النوع: `String`

### `subject`
التصفية على موضوع البريد الإلكتروني.

النوع: `String`

### `includeBody`
قم بتعيينه على true لجلب محتويات البريد الإلكتروني المفككة.

النوع: `boolean`

### `includeAttachments`
قم بتعيينه على true لجلب مرفقات البريد الإلكتروني المشفرة بـ base64.

النوع: `boolean`

### `before`
تصفية الرسائل المستلمة قبل التاريخ المحدد.

النوع: `Date`

### `after`
تصفية الرسائل المستلمة بعد التاريخ المحدد.

النوع: `Date`

### `label`
التسمية الافتراضية هي 'INBOX'، ولكن يمكن تغييرها إلى 'SPAM'، 'TRASH' أو تسمية مخصصة. للحصول على قائمة كاملة بالتسميات المدمجة، راجع https://developers.google.com/gmail/api/guides/labels?hl=en

النوع: `String`

---

لمزيد من المعلومات حول WebdriverIO راجع [الصفحة الرئيسية](https://webdriver.io).