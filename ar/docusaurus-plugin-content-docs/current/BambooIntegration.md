---
id: bamboo
title: Bamboo
description: "شغّل اختبارات WebdriverIO في Atlassian Bamboo وانشر نتائج JUnit لتتمكن من تتبع الاختبارات الناجحة والفاشلة والمُصلَحة في كل عملية بناء."
---

يوفر WebdriverIO تكاملاً وثيقاً مع أنظمة التكامل المستمر (CI) مثل [Bamboo](https://www.atlassian.com/software/bamboo). باستخدام أداة التقارير [JUnit](https://webdriver.io/docs/junit-reporter.html) أو [Allure](https://webdriver.io/docs/allure-reporter.html)، يمكنك بسهولة تصحيح أخطاء اختباراتك بالإضافة إلى تتبع نتائجها. عملية التكامل سهلة للغاية.

1. ثبّت أداة تقارير اختبارات JUnit: `$ npm install @wdio/junit-reporter --save-dev`)
1. حدّث ملف الإعدادات الخاص بك لحفظ نتائج JUnit في مكان يمكن لـ Bamboo العثور عليها فيه، (وحدد أداة التقارير `junit`):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/'
        }]
    ],
    // ...
}
```
ملاحظة: *من الممارسات الجيدة دائماً الاحتفاظ بنتائج الاختبارات في مجلد منفصل بدلاً من المجلد الجذر.*

```js
// wdio.conf.js - For tests running in parallel
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/',
            outputFileFormat: function (options) {
                return `results-${options.cid}.xml`;
            }
        }]
    ],
    // ...
}
```

ستكون التقارير متشابهة في جميع أطر العمل ويمكنك استخدام أي منها: Mocha أو Jasmine أو Cucumber.

نفترض الآن أنك قد كتبت اختباراتك وأن النتائج تُنشأ في المجلد ```./testresults/```، وأن Bamboo يعمل لديك.

## دمج اختباراتك في Bamboo

1. افتح مشروعك في Bamboo
    > أنشئ خطة جديدة، واربط المستودع الخاص بك (تأكد من أنه يشير دائماً إلى أحدث إصدار من مستودعك) وأنشئ المراحل الخاصة بك

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    سأستخدم المرحلة والمهمة الافتراضيتين. أما في حالتك، فيمكنك إنشاء مراحلك ومهامك الخاصة

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. افتح مهمة الاختبار الخاصة بك وأنشئ المهام الفرعية لتشغيل اختباراتك في Bamboo
    >**المهمة 1:** سحب الشيفرة المصدرية (Source Code Checkout)

    >**المهمة 2:** شغّل اختباراتك ```npm i && npm run test```. يمكنك استخدام مهمة *Script* و*Shell Interpreter* لتشغيل الأوامر أعلاه (سيؤدي هذا إلى إنشاء نتائج الاختبارات وحفظها في المجلد ```./testresults/```)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**المهمة: 3** أضف مهمة *jUnit Parser* لتحليل نتائج الاختبارات المحفوظة. يُرجى تحديد مجلد نتائج الاختبارات هنا (يمكنك استخدام أنماط Ant أيضاً)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    ملاحظة: *تأكد من وضع مهمة تحليل النتائج في قسم *Final*، حتى يتم تنفيذها دائماً حتى لو فشلت مهمة الاختبار*

    >**المهمة: 4** (اختيارية) للتأكد من عدم اختلاط نتائج اختباراتك بملفات قديمة، يمكنك إنشاء مهمة لحذف المجلد ```./testresults/``` بعد التحليل الناجح في Bamboo. يمكنك إضافة نص برمجي shell مثل ```rm -f ./testresults/*.xml``` لحذف النتائج أو ```rm -r testresults``` لحذف المجلد بالكامل

بمجرد الانتهاء من *العلم المعقد* أعلاه، يُرجى تفعيل الخطة وتشغيلها. سيكون الناتج النهائي كالتالي:

## اختبار ناجح

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## اختبار فاشل

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## فاشل ثم مُصلَح

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

رائع!! هذا كل شيء. لقد نجحت في دمج اختبارات WebdriverIO الخاصة بك في Bamboo.