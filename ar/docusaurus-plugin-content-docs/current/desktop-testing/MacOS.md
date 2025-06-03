---
id: macos
title: نظام ماك أو إس
---

يمكن لـ WebdriverIO أتمتة أي تطبيق ماك أو إس باستخدام [Appium](https://appium.io/). كل ما تحتاجه هو تثبيت [XCode](https://developer.apple.com/xcode/) على نظامك، وتثبيت Appium و[Mac2 Driver](https://github.com/appium/appium-mac2-driver) كاعتمادية، وضبط الإمكانيات الصحيحة.

## البدء

لبدء مشروع WebdriverIO جديد، قم بتشغيل:

```sh
npm create wdio@latest ./
```

سيرشدك معالج التثبيت خلال العملية. تأكد من اختيار _"Desktop Testing - of MacOS Applications"_ عندما يسألك عن نوع الاختبار الذي ترغب في القيام به. بعد ذلك احتفظ بالإعدادات الافتراضية أو قم بتعديلها حسب تفضيلاتك.

سيقوم معالج التكوين بتثبيت جميع حزم Appium المطلوبة وإنشاء ملف `wdio.conf.js` أو `wdio.conf.ts` مع التكوين اللازم للاختبار على نظام ماك أو إس. إذا وافقت على إنشاء بعض ملفات الاختبار تلقائيًا، يمكنك تشغيل أول اختبار لك عبر `npm run wdio`.

<CreateMacOSProjectAnimation />

هذا كل شيء 🎉

## مثال

هكذا يمكن أن يبدو اختبار بسيط يفتح تطبيق الآلة الحاسبة، ويقوم بإجراء عملية حسابية ويتحقق من نتيجتها:

```js
describe('My Login application', () => {
    it('should set a text to a text view', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    });
})
```

__ملاحظة:__ تم فتح تطبيق الآلة الحاسبة تلقائيًا في بداية الجلسة لأنه تم تعريف `'appium:bundleId': 'com.apple.calculator'` كخيار للإمكانيات. يمكنك تبديل التطبيقات خلال الجلسة في أي وقت.

## مزيد من المعلومات

للحصول على معلومات حول خصائص الاختبار على نظام ماك أو إس، نوصي بمراجعة مشروع [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver).