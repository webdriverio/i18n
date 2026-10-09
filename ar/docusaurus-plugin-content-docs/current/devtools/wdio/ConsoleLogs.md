---
id: console-logs
title: سجلات وحدة التحكم
description: "التقاط وفحص رسائل وحدة تحكم المتصفح وسجلات إطار عمل WebdriverIO التي تسجلها DevTools أثناء تنفيذ الاختبارات."
---

التقط وافحص جميع مخرجات وحدة تحكم المتصفح أثناء تنفيذ الاختبارات. تسجل DevTools رسائل وحدة التحكم الصادرة من تطبيقك (`console.log()` و`console.warn()` و`console.error()` و`console.info()` و`console.debug()`) بالإضافة إلى سجلات إطار عمل WebDriverIO بناءً على قيمة `logLevel` المُهيأة في ملف `wdio.conf.ts` الخاص بك.

**الميزات:**
- التقاط رسائل وحدة التحكم في الوقت الفعلي أثناء تنفيذ الاختبارات
- سجلات وحدة تحكم المتصفح (log وwarn وerror وinfo وdebug)
- سجلات إطار عمل WebDriverIO مُصفّاة وفقًا لقيمة `logLevel` المُهيأة (trace وdebug وinfo وwarn وerror وsilent)
- طوابع زمنية توضح بدقة متى سُجّلت كل رسالة
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

يسهّل هذا تصحيح أخطاء JavaScript وتتبع سلوك التطبيق ومشاهدة العمليات الداخلية لـ WebDriverIO أثناء تنفيذ الاختبارات.

## عرض توضيحي

### >_ سجلات وحدة التحكم
![Console Logs](/img/devtools/console-logs.gif)