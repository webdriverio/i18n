---
id: autocompletion
title: الإكمال التلقائي
description: "احصل على الإكمال التلقائي وتوثيق واجهة برمجة التطبيقات المضمّن لأوامر WebdriverIO في IntelliJ وWebStorm وVisual Studio Code."
---

## IntelliJ

يعمل الإكمال التلقائي مباشرةً دون أي إعداد في IDEA وWebStorm.

إذا كنت تكتب الشيفرات البرمجية منذ فترة، فمن المحتمل أنك تحب الإكمال التلقائي. فهو متاح مباشرةً في العديد من محررات الشيفرات.

![Autocompletion](/img/autocompletion/0.png)

تُستخدم تعريفات الأنواع المستندة إلى [JSDoc](http://usejsdoc.org/) لتوثيق الشيفرة. وهي تساعد على رؤية المزيد من التفاصيل الإضافية حول المعاملات وأنواعها.

![Autocompletion](/img/autocompletion/1.png)

استخدم الاختصارات القياسية <kbd>⇧ + ⌥ + SPACE</kbd> على منصة IntelliJ لعرض التوثيق المتاح:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

عادةً ما يكون دعم الأنواع مدمجًا تلقائيًا في Visual Studio Code ولا حاجة لاتخاذ أي إجراء.

![Autocompletion](/img/autocompletion/14.png)

إذا كنت تستخدم JavaScript العادية وتريد الحصول على دعم صحيح للأنواع، فعليك إنشاء ملف `jsconfig.json` في المجلد الجذر لمشروعك والإشارة إلى حزم wdio المستخدمة، على سبيل المثال:

```json title="jsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework"
        ]
    }
}
```