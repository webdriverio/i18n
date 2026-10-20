---
id: console-logs
title: سجلات وحدة التحكم
description: "التقاط رسائل وحدة تحكم المتصفح وسجلات إطار عمل WebdriverIO التي تسجلها DevTools أثناء تنفيذ الاختبار وفحصها."
---

التقط جميع مخرجات وحدة تحكم المتصفح وافحصها أثناء تنفيذ الاختبار. تسجل DevTools رسائل وحدة التحكم الصادرة من تطبيقك (`console.log()`، `console.warn()`، `console.error()`، `console.info()`، `console.debug()`) بالإضافة إلى سجلات إطار عمل WebDriverIO بناءً على قيمة `logLevel` المُهيأة في ملف `wdio.conf.ts` الخاص بك.

**الميزات:**
- التقاط رسائل وحدة التحكم في الوقت الفعلي أثناء تنفيذ الاختبار
- سجلات وحدة تحكم المتصفح (log، warn، error، info، debug)
- سجلات إطار عمل WebDriverIO مُصفّاة وفقًا لقيمة `logLevel` المُهيأة (trace، debug، info، warn، error، silent)
- طوابع زمنية توضح بدقة متى سُجلت كل رسالة
- عرض سجلات وحدة التحكم جنبًا إلى جنب مع خطوات الاختبار ولقطات شاشة المتصفح لتوفير السياق

**التهيئة:**
```js
// wdio.conf.ts
export const config = {
    // مستوى تفصيل التسجيل: trace | debug | info | warn | error | silent
    logLevel: 'info', // يتحكم في سجلات إطار العمل التي يتم التقاطها
    // ...
};
```

يُسهّل هذا تصحيح أخطاء JavaScript، وتتبع سلوك التطبيق، والاطلاع على العمليات الداخلية لـ WebDriverIO أثناء تنفيذ الاختبار.

## عرض توضيحي

### >_ سجلات وحدة التحكم
![Console Logs](/img/devtools/console-logs.gif)