---
id: wdio-json-html-reporter
title: مراسل تقارير JSON HTML
custom_edit_url: https://github.com/aswinchembath/wdio-json-html-reporter/edit/main/README.md
---


> wdio-json-html-reporter هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/aswinchembath/wdio-json-html-reporter) | [npm](https://www.npmjs.com/package/wdio-json-html-reporter)

هذا مراسل مخصص لـ WebDriverIO يقوم بإنشاء تقارير JSON مفصلة أثناء تنفيذ الاختبار ويوفر مولد تقارير HTML محمول لتصور نتائج الاختبار الخاصة بك. يقوم بتسجيل الطوابع الزمنية، وبيانات التنفيذ التعريفية، ويمكنه التقاط لقطات شاشة عند الطلب. تتبع الحزمة اتفاقية WebDriverIO للمراسلين وتم نشرها كحزمة npm تحت اسم `wdio-json-html-reporter`.

## جدول المحتويات

- [نظرة عامة](#overview)
- [الميزات](#features)
- [التثبيت](#installation)
  - [1. تثبيت الحزمة](#1-install-the-package)
  - [2. التحقق من التثبيت](#2-verify-installation)
  - [3. تحديث تكوين WebDriverIO](#3-update-webdriverio-configuration)
  - [4. تشغيل اختباراتك](#4-run-your-tests)
- [استخدام CLI](#cli-usage)
- [خيار التاريخ وإنشاء التاريخ المجمع](#history-option-and-aggregated-history-generation)
- [لقطات الشاشة](#screenshots)

## نظرة عامة

WDIO JSON HTML REPORTER يوفر مكونين رئيسيين:

- **JSONReporter**: مراسل مخصص يمتد واجهة مراسل WebDriverIO لجمع أحداث الاختبار وإنشاء ملف JSON مع بيانات وصفية، ونتائج الاختبار، و(اختياريًا) لقطات الشاشة.
- **HTMLReportGenerator**: أداة لتحويل ملفات تقارير JSON المتعددة إلى تقرير HTML شامل مع رسوم بيانية تفاعلية، وتصفية، ووظيفة التصدير. بالإضافة إلى ذلك، يدعم مولد التقارير الآن ملف التاريخ الاختياري لعرض بيانات التنفيذ التاريخية إذا كانت متوفرة. عندما لا يتم توفير بيانات التاريخ، يحذف التقرير القسم التاريخي ويُظهر فقط الأخطاء الفريدة.

تساعدك هذه الأدوات على اكتساب رؤى واضحة في عمليات تشغيل الاختبار الخاصة بك، وهو أمر ضروري للتصحيح والتكامل المستمر.

## الميزات

- **تقارير JSON**: تقرير مفصل مع الطوابع الزمنية، وأسماء المجموعات، ونتائج الاختبار، والأخطاء، ولقطات الشاشة الاختيارية.
- **تقارير HTML**: تحويل تقارير JSON إلى تقرير HTML محمول مع لوحة قيادة، ورسوم بيانية، وتقرير اختبار مفصل، وقدرات التصفية.
- **تصدير إلى Excel**: يمكن تصدير تقرير الاختبار المفصل إلى ملف Excel.
- **دعم لقطات الشاشة**: التقاط لقطات الشاشة للاختبارات الفاشلة (أو جميع الاختبارات) بناءً على التكوين الخاص بك.
- **بيانات تنفيذ تعريفية**: تسجيل معلومات المتصفح، وأوقات بداية/نهاية التنفيذ، والمدة الإجمالية.
- **تنفيذ تاريخي (اختياري)**: توفير ملف JSON تاريخي لتضمين بيانات التنفيذ التاريخية حسب المجموعة. إذا لم يتم توفير بيانات تاريخية، فسيقوم التقرير تلقائيًا بإخفاء هذا القسم وعرض الأخطاء الفريدة فقط.
- **إنشاء تاريخ مجمع**: يتضمن مراسل JSON الآن ميزة إنشاء تاريخ مجمع. باستخدام الطريقة الثابتة `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`، يمكنك مسح جميع ملفات تقارير JSON (المطابقة للنمط `test-report-*.json`) في دليل التقارير الخاص بك تلقائيًا، وتجميع نتائج الاختبار، وحساب مقارنات العيوب بناءً على البيانات التاريخية. ثم يتم إلحاق سجل التاريخ المجمع بملف التاريخ الخاص بك ويمكن استخدامه بواسطة مولد تقارير HTML لتصور الاتجاهات بمرور الوقت.

## التثبيت

لتثبيت حزمة `wdio-json-html-reporter`، اتبع هذه الخطوات:

### 1. تثبيت الحزمة

قم بتشغيل الأمر التالي لتثبيت الحزمة كتبعية تطوير:

```bash
npm install --save-dev wdio-json-html-reporter
```

### 2. التحقق من التثبيت

تأكد من تثبيت الحزمة بشكل صحيح عن طريق تشغيل:

```bash
npm list wdio-json-html-reporter
```

إذا تم التثبيت بشكل صحيح، فيجب أن ترى مخرجات مشابهة لـ:

```bash
wdio-json-html-reporter@x.x.x
```

### 3. تحديث تكوين WebDriverIO

قم بتعديل ملف `wdio.conf.js` أو `wdio.conf.ts` الخاص بك ليشمل المراسل المخصص:

```javascript
import { JSONReporter, HTMLReportGenerator } from 'wdio-json-html-reporter';

export const config = {
  reporters: [
    [JSONReporter, { outputFile: './reports/test-results.json', screenshotOption: 'OnFailure' }],  // Options: "No", "OnFailure", "Full"
  ],
  onComplete: async function() {
    const outputFilePath = './reports/test-report.html';
    const jsonFolder = './reports'; // Directory where JSON reports are saved

    // If you want to include historical data, specify the history JSON file path here.
    const historyFile = './reports/history.json'; // Optional

    // Optionally, generate aggregated history data before generating the HTML report.
    // JSONReporter.generateAggregateHistory({ reportPaths: jsonFolder, historyPath: historyFile });

    const reportGenerator = new HTMLReportGenerator(outputFilePath, historyFile);
    await reportGenerator.convertJSONFolderToHTML(jsonFolder);
  }
};
```

### 4. تشغيل اختباراتك

قم بتنفيذ مجموعة اختبار WebDriverIO الخاصة بك:

```bash
npx wdio run wdio.conf.js
```

## استخدام CLI

بالإضافة إلى التكامل مع WebDriverIO، يمكنك تشغيل مولد تقارير HTML مباشرة من سطر الأوامر باستخدام CLI المدمج.

**الاستخدام:**

```bash
generate-html <inputFolder> <outputFile> [historyFile]
```

على سبيل المثال، إذا كانت لديك ملفات JSON في مجلد يسمى `test/reports/json-reports` وتريد إنشاء تقرير HTML باسم `test/reports/report.html`، يمكنك تشغيل:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html
```

إذا كان لديك أيضًا ملف تاريخ (مثلاً `test/reports/history.json`)، قم بتضمينه كمعلمة رابعة اختيارية:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html test/reports/history.json
```

**ملاحظة:**  
يتم تشغيل وظائف CLI فقط عندما تمرر أمر `generate-html` كمعلمة أولى. عند التشغيل عبر WebDriverIO (مثلاً مع `wdio run wdio.conf.js`)، يتم تجاوز منطق CLI.

## خيار التاريخ وإنشاء التاريخ المجمع

يدعم مولد تقارير HTML الآن **خيار التاريخ**. يتيح لك ذلك توفير ملف JSON يحتوي على بيانات تنفيذ تاريخية يتم دمجها في التقرير تحت قسم "التنفيذ التاريخي حسب المجموعة". إذا تم توفير ملف التاريخ ويحتوي على بيانات صالحة، سيعرض التقرير الاتجاهات التاريخية جنبًا إلى جنب مع الرسوم البيانية التفاعلية وأكورديون لكل مجموعة. إذا لم يتم تمرير ملف التاريخ أو إذا كان الملف لا يحتوي على أي بيانات للمجموعة، فسيقوم التقرير تلقائيًا بإخفاء القسم التاريخي وعرض نظرة عامة على الأخطاء الفريدة فقط.

بالإضافة إلى ذلك، يتضمن مراسل JSON الآن ميزة **إنشاء تاريخ مجمع**. مع الطريقة الثابتة `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`، يمكنك مسح جميع ملفات تقارير JSON تلقائيًا (المطابقة للنمط `test-report-*.json`) في دليل التقارير الخاص بك، وتجميع نتائج الاختبار (جمع عدد الاختبارات ودمج بيانات المجموعة)، وحساب مقارنات العيوب من خلال المقارنة مع آخر سجل مجمع. يتم بعد ذلك إلحاق سجل التاريخ المنشأ حديثًا بملف التاريخ المحدد. يمكن استخدام بيانات التاريخ المجمعة هذه لاحقًا بواسطة مولد تقارير HTML لتوفير رؤى تنفيذ تاريخية على مدار عمليات اختبار متعددة.

## لقطات الشاشة

### لوحة القيادة  
![لوحة القيادة](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/dashboard.png)

### نتائج الاختبار  
![نتائج الاختبار](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/testdetails.png)

### لقطات الشاشة  
![لقطات الشاشة](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/screesnshots.png)

### المرشحات  
![المرشحات](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/filters.png)

### تصدير إكسل  
![تصدير إكسل](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/exportedfile.png)