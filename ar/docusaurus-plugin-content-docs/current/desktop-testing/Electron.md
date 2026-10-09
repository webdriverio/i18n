---
id: electron
title: Electron
description: "اختبر تطبيقات Electron باستخدام خدمة WebdriverIO Electron، التي تُعِدّ Chromedriver، وتكتشف الملف التنفيذي لتطبيقك، وتتيح لك محاكاة واجهات برمجة تطبيقات Electron."
---

Electron هو إطار عمل لبناء تطبيقات سطح المكتب باستخدام JavaScript وHTML وCSS. من خلال تضمين Chromium وNode.js في ملفه التنفيذي، يتيح لك Electron الحفاظ على قاعدة شيفرة JavaScript واحدة وإنشاء تطبيقات متعددة المنصات تعمل على Windows وmacOS وLinux — دون الحاجة إلى أي خبرة في التطوير الأصلي.

يوفر WebdriverIO خدمة متكاملة تُبسّط التفاعل مع تطبيق Electron الخاص بك وتجعل اختباره سهلاً للغاية. مزايا استخدام WebdriverIO لاختبار تطبيقات Electron هي:

- 🚗 إعداد تلقائي لـ Chromedriver المطلوب
- 📦 اكتشاف تلقائي لمسار تطبيق Electron الخاص بك - يدعم [Electron Forge](https://www.electronforge.io/) و[Electron Builder](https://www.electron.build/)
- 🧩 الوصول إلى واجهات برمجة تطبيقات Electron داخل اختباراتك
- 🕵️ محاكاة واجهات برمجة تطبيقات Electron عبر واجهة برمجية مشابهة لـ Vitest

تحتاج فقط إلى بضع خطوات بسيطة للبدء. شاهد هذا الفيديو التعليمي البسيط خطوة بخطوة للبدء من قناة [WebdriverIO على YouTube](https://www.youtube.com/@webdriverio):

<LiteYouTubeEmbed
    id="iQNxTdWedk0"
    title="Getting Started with ElectronJS Testing in WebdriverIO"
/>

أو اتبع الدليل في القسم التالي.

## البدء

لإنشاء مشروع WebdriverIO جديد، شغّل:

```sh
npm create wdio@latest ./
```

سيرشدك معالج التثبيت خلال العملية. عندما يُطلب منك تحديد نوع الاختبار الذي ترغب في إجرائه، اختر _"Desktop Testing - of Electron, Tauri, or macOS Applications"_، ثم اختر _Electron_ عند سؤالك عن إطار العمل. بعد ذلك قدّم مسار تطبيق Electron المُجمّع الخاص بك، مثل `./dist`، ثم أبقِ على الإعدادات الافتراضية أو عدّلها حسب تفضيلاتك.

سيقوم معالج الإعداد بتثبيت جميع الحزم المطلوبة وإنشاء ملف `wdio.conf.js` أو `wdio.conf.ts` يحتوي على الإعدادات اللازمة لاختبار تطبيقك. إذا وافقت على إنشاء بعض ملفات الاختبار تلقائيًا، يمكنك تشغيل اختبارك الأول عبر `npm run wdio`.

## الإعداد اليدوي

إذا كنت تستخدم WebdriverIO بالفعل في مشروعك، يمكنك تخطي معالج التثبيت وإضافة الاعتماديات التالية فقط:

```sh
npm install --save-dev @wdio/electron-service
```

ثم يمكنك استخدام الإعدادات التالية:

```ts
// wdio.conf.ts
export const config: WebdriverIO.Config = {
    // ...
    services: [['electron', {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: [/** ... */],
    }]]
}
```

هذا كل شيء 🎉

تعرّف على المزيد حول [كيفية إعداد خدمة Electron](/docs/desktop-testing/electron/configuration)، و[كيفية محاكاة واجهات برمجة تطبيقات Electron](/docs/desktop-testing/electron/api-reference)، و[كيفية الوصول إلى واجهات برمجة تطبيقات Electron](/docs/desktop-testing/electron/api).