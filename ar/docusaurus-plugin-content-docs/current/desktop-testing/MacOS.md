---
id: macos
title: MacOS
description: "أتمتة تطبيقات macOS الأصلية باستخدام WebdriverIO عبر Appium ومشغل Mac2، بدءًا من معالج إعداد المشروع."
---

يمكن لـ WebdriverIO أتمتة أي تطبيق MacOS باستخدام [Appium](https://appium.io/). كل ما تحتاجه هو تثبيت [XCode](https://developer.apple.com/xcode/) على نظامك، وتثبيت Appium و[مشغل Mac2](https://appium.github.io/appium-mac2-driver/) كاعتماديات، وتعيين الإمكانيات (capabilities) الصحيحة.

## البدء

لبدء مشروع WebdriverIO جديد، قم بتشغيل:

```sh
npm create wdio@latest ./
```

سيرشدك معالج التثبيت خلال العملية. تأكد من اختيار _"Desktop Testing - of MacOS Applications"_ عندما يسألك عن نوع الاختبار الذي ترغب في إجرائه. بعد ذلك، يمكنك الإبقاء على الإعدادات الافتراضية أو تعديلها حسب تفضيلاتك.

سيقوم معالج الإعداد بتثبيت جميع حزم Appium المطلوبة وإنشاء ملف `wdio.conf.js` أو `wdio.conf.ts` يحتوي على الإعدادات اللازمة للاختبار على MacOS. إذا وافقت على الإنشاء التلقائي لبعض ملفات الاختبار، يمكنك تشغيل اختبارك الأول عبر `npm run wdio`.

<CreateMacOSProjectAnimation />

هذا كل شيء 🎉

## مثال

هكذا يمكن أن يبدو اختبار بسيط يفتح تطبيق الآلة الحاسبة، ويجري عملية حسابية، ويتحقق من نتيجتها:

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

__ملاحظة:__ تم فتح تطبيق الآلة الحاسبة تلقائيًا في بداية الجلسة لأنه تم تعريف `'appium:bundleId': 'com.apple.calculator'` كخيار ضمن الإمكانيات (capabilities). يمكنك التبديل بين التطبيقات أثناء الجلسة في أي وقت.

## مزيد من المعلومات

للحصول على معلومات حول تفاصيل الاختبار على MacOS، نوصي بالاطلاع على مشروع [Appium Mac2 Driver](https://appium.github.io/appium-mac2-driver/).