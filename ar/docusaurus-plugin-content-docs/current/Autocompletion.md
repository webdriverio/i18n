---
id: autocompletion
title: الإكمال التلقائي
---

## IntelliJ

يعمل الإكمال التلقائي بشكل مباشر في IDEA وWebStorm.

إذا كنت تكتب رمز البرنامج لفترة من الوقت، فمن المحتمل أنك تفضل الإكمال التلقائي. الإكمال التلقائي متاح مباشرة في العديد من محررات الكود.

![Autocompletion](/img/autocompletion/0.png)

تستخدم تعريفات الأنواع استنادًا إلى [JSDoc](http://usejsdoc.org/) لتوثيق الكود. يساعد ذلك في رؤية المزيد من التفاصيل الإضافية حول المعلمات وأنواعها.

![Autocompletion](/img/autocompletion/1.png)

استخدم الاختصارات القياسية <kbd>⇧ + ⌥ + SPACE</kbd> على منصة IntelliJ لرؤية الوثائق المتاحة:

![Autocompletion](/img/autocompletion/2.png)

## Visual Studio Code (VSCode)

عادة ما يحتوي Visual Studio Code على دعم الأنواع مدمجًا تلقائيًا ولا يلزم اتخاذ أي إجراء.

![Autocompletion](/img/autocompletion/14.png)

إذا كنت تستخدم JavaScript العادية وتريد الحصول على دعم نوع مناسب، فيجب عليك إنشاء ملف `jsconfig.json` في جذر مشروعك والإشارة إلى حزم wdio المستخدمة، على سبيل المثال:

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