---
id: wdio-performancetotal-service
title: خدمة إجمالي الأداء
custom_edit_url: https://github.com/tzurp/performance-total/edit/master/README.md
---


> wdio-performancetotal-service هي حزمة تابعة لطرف ثالث، لمزيد من المعلومات يرجى زيارة [GitHub](https://github.com/tzurp/performance-total) | [npm](https://www.npmjs.com/package/wdio-performancetotal-service)
ملاحظة:<br/>
لـ WebdriverIO v9 استخدم الإصدار 4.x.x.<br/>
لـ WebdriverIO v8 استخدم الإصدار 3.x.x.<br/>
لـ WebdriverIO v7 استخدم الإصدار 2.x.x.<br/>
لـ WebdriverIO v6 استخدم الإصدار 1.x.x.

---

![chart](https://github.com/tzurp/performance-total/blob/master/resources/chart.png)

مع هذه الإضافة لـ [webdriver.io](https://webdriver.io/) يمكنك بسهولة إضافة تحليل الأداء إلى أي تدفق في اختباراتك، سواء كان واجهة مستخدم بحتة، أو واجهة برمجة تطبيقات، أو مزيجًا من الاثنين. توفر هذه الإضافة طريقة بسيطة وفعالة لقياس أوقات استجابة الإجراءات المختلفة وتحديد الاختناقات المحتملة في تطبيقك. باستخدام هذه المعلومات، يمكنك اتخاذ قرارات مدروسة حول التحسينات لتعزيز الأداء العام لتطبيقك.

## التثبيت

أسهل طريقة لتثبيت هذه الوحدة كتبعية تطوير هي استخدام الأمر التالي:

```
npm install wdio-performancetotal-service --save-dev
```

## الاستخدام

أضف wdio-performancetotal-service إلى ملف `wdio.conf.js` الخاص بك:

```typescript
exports.config = {
  // ...
  services: ['performancetotal']
  // ...
};
```
...أو مع خيارات الخدمة:

```typescript
exports.config = {
  // ...
  services: [
      ['performancetotal',
      // الخيارات (مع القيم الافتراضية)
        {
            disableAppendToExistingFile: false,
            performanceResultsFileName: "performance-results",
            dropResultsFromFailedTest: false,
            performanceResultsDirectory: "performance-results",
            analyzeByBrowser: false,
            recentDays: 0
        }]
      ]
  // ...
};
```

### الخيارات

#### __disableAppendToExistingFile__

عند تعيينها إلى `true`، ستبدأ عمليات الاختبار الجديدة من جديد وستقوم بالكتابة فوق أي بيانات أداء موجودة.
عند تعيينها إلى `false` (الافتراضي)، سيتم إضافة بيانات الأداء إلى البيانات الموجودة.

> **⚠️ تنبيه:**
>
> هذا الإجراء سيحذف جميع بيانات الأداء الخاصة بك نهائيًا. تأكد من أن لديك نسخة احتياطية قبل المتابعة.

#### __performanceResultsFileName__

يمكنك تجاوز اسم ملف النتائج الافتراضي (`performance-results`).
عادة ما يتم استبدال ملف النتائج القديم بملف جديد. إذا كنت ترغب في الاحتفاظ بالملفات القديمة، يوصى بإضافة طابع زمني إلى اسم الملف. على سبيل المثال:

```typescript
...
performanceResultsFileName: `performance-results_${new Date().getTime()}`
...
```

#### __dropResultsFromFailedTest__

الافتراضي هو `false`. عندما يتم تعيين القيمة إلى `true`، سيتم استبعاد تحليل الأداء من الاختبارات الفاشلة.

#### __recentDays__

الافتراضي هو `0` (بلا حدود). لتعيين عدد الأيام التي يجب مراعاتها لتحليل الأداء، قم بتعيين عدد الأيام. يتم دعم الأيام الجزئية أيضًا (على سبيل المثال `recentDays: 0.5`)

#### __performanceResultsDirectory__

يمكنك تجاوز المسار الافتراضي لدليل النتائج في الدليل الجذر للمشروع.
على سبيل المثال:

```typescript
...
performanceResultsDirectory: "results-dir/performance-total-results"
...
```

#### __analyzeByBrowser__

الافتراضي هو `false`. إذا كان `true`، سيتم تحليل بيانات الأداء أيضًا حسب نوع المتصفح.


### الاستخدام في الاختبار

ما عليك سوى استيراد __performancetotal__ حيثما تحتاج إليه، سواء في ملف الاختبار الخاص بك أو أي فئة أخرى. يوفر هذا الكائن طرقًا لقياس بيانات الأداء في اختباراتك، بما في ذلك sampleStart و sampleEnd لبدء وإنهاء قياسات الأداء.
إليك مثال على كيفية استخدام كائن performancetotal لقياس أداء بدء التشغيل لموقعين:

```typescript
// تقيس حالة الاختبار هذه أداء بدء تشغيل Github و SourceForge باستخدام كائن performancetotal.

import { performancetotal } from "wdio-performancetotal-service";

it("should test github and sourceforge startup performance", () => {
    // بدء قياس أداء جديد لـ Github
    performancetotal.sampleStart("GH-Startup");

    // الانتقال إلى Github
    browser.url("https://github.com/");

    // إنهاء قياس Github وحفظ النتائج
    performancetotal.sampleEnd("GH-Startup");

    // ...

    // بدء قياس أداء جديد لـ SourceForge
    performancetotal.sampleStart("SF-Startup");

    // الانتقال إلى SourceForge
    await browser.url("https://sourceforge.net/");

    // إنهاء قياس SourceForge وحفظ النتائج
    performancetotal.sampleEnd("SF-Startup");
});

```

يمكنك استرجاع الوقت المستغرق لعينة أداء واحدة عن طريق استدعاء performancetotal.getSampleTime(sampleName) في اختبارك. هذا يسمح لك بالتحقق من أداء قسم محدد من الكود والتأكد من أنه يلبي توقعاتك.

```typescript
// الحصول على الوقت المستغرق لعينة واحدة
const sampleTime = performancetotal.getSampleTime(sampleName);

```

## الحصول على النتائج

عند اكتمال جميع الاختبارات، يتم إنشاء دليل نتائج جديد في المجلد الجذر للمشروع (اسم الدليل الافتراضي هو performance-results). داخل هذا الدليل، يتم إنشاء ملفين: performance-results.json و performance-results.csv. تحتوي هذه الملفات على بيانات محللة لكل عينة، بما في ذلك متوسط الوقت، والخطأ المعياري للمتوسط (SEM)، وعدد العينات، والقيمة الدنيا، والقيمة القصوى، وأقدم وقت، وأحدث وقت. يمكنك استخدام هذه البيانات لتحديد أي تراجع أو تحسن في الأداء بمرور الوقت.

### تحليل بيانات الأداء بشكل جماعي

لتحليل بيانات الأداء الموجودة بشكل جماعي دون إنشاء اختبارات جديدة، يوصى باستخدام [أداة __performancetotal-cli__](https://www.npmjs.com/package/performancetotal-cli).

## دعم TypeScript

TypeScript مدعوم لهذه الإضافة.

## الدعم

للحصول على الدعم والاقتراحات، لا تتردد في الاتصال بي على [tzur.paldi@outlook.com](https://github.com/tzurp/performance-total/blob/master/mailto:tzur.paldi@outlook.com).