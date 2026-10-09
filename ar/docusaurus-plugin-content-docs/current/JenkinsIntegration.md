---
id: jenkins
title: Jenkins
description: "شغّل اختبارات WebdriverIO في Jenkins وانشر نتائج مُبلِّغ JUnit لتصحيح الأخطاء وتتبّع سجل الاختبارات."
---

يوفر WebdriverIO تكاملاً وثيقاً مع أنظمة CI مثل [Jenkins](https://jenkins-ci.org). باستخدام المُبلِّغ `junit`، يمكنك بسهولة تصحيح أخطاء اختباراتك وكذلك تتبّع نتائج اختباراتك. التكامل سهل للغاية.

1. ثبّت مُبلِّغ الاختبارات `junit`: `$ npm install @wdio/junit-reporter --save-dev`)
1. حدّث ملف الإعدادات الخاص بك لحفظ نتائج XUnit في مكان يمكن لـ Jenkins العثور عليها فيه،
    (وحدّد المُبلِّغ `junit`):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './'
        }]
    ],
    // ...
}
```

الأمر متروك لك في اختيار إطار العمل. ستكون التقارير متشابهة.
في هذا الدرس، سنستخدم Jasmine.

بعد أن تكتب بعض الاختبارات، يمكنك إعداد مهمة Jenkins جديدة. أعطها اسماً ووصفاً:

![Name And Description](/img/jenkins/jobname.png "Name And Description")

ثم تأكد من أنها تجلب دائماً أحدث إصدار من مستودعك:

![Jenkins Git Setup](/img/jenkins/gitsetup.png "Jenkins Git Setup")

**الآن الجزء المهم:** أنشئ خطوة `build` لتنفيذ أوامر الصدفة (shell). تحتاج خطوة `build` إلى بناء مشروعك. نظراً لأن هذا المشروع التجريبي يختبر تطبيقاً خارجياً فقط، فلا تحتاج إلى بناء أي شيء. فقط ثبّت اعتماديات node وشغّل الأمر `npm test` (وهو اسم مستعار لـ `node_modules/.bin/wdio test/wdio.conf.js`).

إذا كنت قد ثبّت إضافة مثل AnsiColor، لكن السجلات لا تزال غير ملونة، فشغّل الاختبارات باستخدام متغير البيئة `FORCE_COLOR=1` (مثلاً: `FORCE_COLOR=1 npm test`).

![Build Step](/img/jenkins/runjob.png "Build Step")

بعد الاختبار، ستحتاج إلى أن يتتبّع Jenkins تقرير XUnit الخاص بك. للقيام بذلك، عليك إضافة إجراء ما بعد البناء يُسمى _"Publish JUnit test result report"_.

يمكنك أيضاً تثبيت إضافة XUnit خارجية لتتبّع تقاريرك. تأتي إضافة JUnit مع التثبيت الأساسي لـ Jenkins وهي كافية في الوقت الحالي.

وفقاً لملف الإعدادات، سيتم حفظ تقارير XUnit في المجلد الجذر للمشروع. هذه التقارير عبارة عن ملفات XML. لذا، كل ما عليك فعله لتتبّع التقارير هو توجيه Jenkins إلى جميع ملفات XML في مجلدك الجذر:

![Post-build Action](/img/jenkins/postjob.png "Post-build Action")

هذا كل شيء! لقد قمت الآن بإعداد Jenkins لتشغيل مهام WebdriverIO الخاصة بك. ستوفر مهمتك الآن نتائج اختبار مفصّلة مع مخططات تاريخية، ومعلومات تتبّع المكدس (stacktrace) للمهام الفاشلة، وقائمة بالأوامر مع البيانات (payload) التي استُخدمت في كل اختبار.

![Jenkins Final Integration](/img/jenkins/final.png "Jenkins Final Integration")