---
id: wdio-light-reporter
title: مُسجل التقارير الخفيف
custom_edit_url: https://github.com/sarfrajadstreaks/wdio-light-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-light-reporter هو حزمة من طرف ثالث، لمزيد من المعلومات يرجى زيارة [GitHub](https://github.com/sarfrajadstreaks/wdio-light-reporter) | [npm](https://www.npmjs.com/package/wdio-light-reporter)

## مستوحى من HTML و Mochawesome reporter

!فلسفة:

> هذا المُسجل لا يدعم إعادة توليد تقارير Cucumber وتم تطويره مع وضع إطار العمل bdd و mocha في الاعتبار.
> هنا، يتم اعتبار قسم `describe()` كسيناريو اختبار و `it()` كحالة اختبار داخل سيناريوهات الاختبار.

## الميزات

1. إعداد سهل
2. واجهة مستخدم محسنة
3. تضمين لقطات الشاشة في تقرير HTML
4. addLabel() لتضمين خطوات السياق أو الاسم


## الإصدارات
V 0.1.9 - الإصدار الأولي
V 0.2.6 - (الأحدث)
  1. تضمين تشغيلات بيئات متعددة وفصلها على أساس البيئة.
  2. إصلاح الأخطاء
  3. تحسين الأداء.


## أمثلة

![مثال](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_1.png)
![مثال](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_2.png)
![مثال](https://github.com/sarfrajadstreaks/wdio-light-reporter/blob/main/./ReadME/example_3.png)

## التثبيت

NPM

```sh
npm install wdio-light-reporter --save-dev
```

## التكوين

```
reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:`demo${new Date()}`,    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
  }]
],
```

## لقطات الشاشة

المُسجل ليس لديه القدرة على التكوين التلقائي لأخذ لقطات الشاشة، ولكن إذا تم تكوينه يدويًا، فإنه يستمع للحدث ويرفق لقطات الشاشة في تقرير HTML.
**لتضمين لقطات الشاشة في التقرير أضف الرمز أدناه في فك afterTest() في ملف wdio conf.**

```
afterTest: async function (test,context,{ error, result, duration, passed, retries }) {
    if (!passed) {await browser.takeScreenshot()}
},
```

## ملفات النتائج

كل تشغيل يعيد توليد تقرير json لكل ملفات المواصفات، لتوليد ملف json و HTML مدمج، أضف الرمز أدناه في فك **onComplete()** في ملف wdio conf

```
 onComplete: function (exitCode, config, capabilities, results) {
    const mergeResults = require("wdio-light-reporter/src/mergeResults"); //you can add this on top of the file
    mergeResults("./Results");
 },
```

> إذا قمت بتشغيل الاختبار بدون أي خيار --suite فسيتم اعتباره افتراضيًا كمجموعة
> المُسجل لا يعمل إذا قمت بإعطاء معلمات متعددة كمجموعات أثناء التشغيل.
> wdio run `wdio.conf.js --suite firstSuite` - **(يعمل بشكل جيد)** :)  
>  wdio run `wdio.conf.js --suite firstSuite --suite secondSuite` **(لا يعمل)** :(

## إضافة سياق

> يمكنك استخدام `useLabel()` لإضافة سياق إلى أي خطوات أو إضافته لتضمينه كخطوات.

```
const { addLabel } = require("wdio-light-reporter").default;
describe("Show how to use addLabel ", () => {
  it("report will added this a steps/context in report", async () => {
      addLabel("Log Example 1 as step 1")
      console.log("Log Example 1 )
      addLabel("Log Example 2 as step 2")
      console.log("Log Example 2 )
  })
})


```
## التحديثات
```
 reporters: ['dot', ['light',{
      outputDir: './Results',
      outputFile:"demo",    // html report file will be name this 
      addScreenshots: false,   // to add screenshots in report make it as true. Default is false
      //autoClean:false       // removed autoClean and include the same functionality as default in mergeResult function
  }]
],
```
## الترخيص

MIT
**مجاني، نعم بالتأكيد!**