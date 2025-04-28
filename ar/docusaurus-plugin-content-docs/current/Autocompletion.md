---
id: autocompletion
title: الإكمال التلقائي
---

## IntelliJ

يعمل الإكمال التلقائي بشكل تلقائي في IDEA وWebStorm.

إذا كنت تكتب رمز البرنامج لفترة من الوقت، فمن المحتمل أنك تحب الإكمال التلقائي. الإكمال التلقائي متاح بشكل مباشر في العديد من محررات الكود.

![Autocompletion](/img/autocompletion/0.png)

تستخدم تعريفات الأنواع المستندة إلى [JSDoc](http://usejsdoc.org/) لتوثيق الكود. هذا يساعد في رؤية المزيد من التفاصيل الإضافية حول المعلمات وأنواعها.

![Autocompletion](/img/autocompletion/1.png)

استخدم اختصارات قياسية <kbd>⇧ + ⌥ + SPACE</kbd> على منصة IntelliJ لمشاهدة الوثائق المتاحة:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

يحتوي Visual Studio Code عادة على دعم الأنواع المدمج تلقائيًا ولا يلزم اتخاذ أي إجراء.

![Autocompletion](/img/autocompletion/14.png)

إذا كنت تستخدم JavaScript الأساسي وتريد الحصول على دعم مناسب للأنواع، فيجب عليك إنشاء ملف `jsconfig.json` في جذر المشروع والإشارة إلى حزم wdio المستخدمة، على سبيل المثال:

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