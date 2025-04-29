---
id: wdio-html-nice-reporter
title: مُسجل HTML
custom_edit_url: https://github.com/rpii/wdio-html-reporter/edit/master/README.md
---


> wdio-html-nice-reporter هو حزمة من طرف ثالث، لمزيد من المعلومات يرجى مراجعة [GitHub](https://github.com/rpii/wdio-html-reporter) | [npm](https://www.npmjs.com/package/wdio-html-nice-reporter)
 # wdio-html-nice-reporter

مُسجل لـ webdriver.io يقوم بإنشاء تقرير HTML أنيق.  
الاسم قد يبدو سخيفًا ولكنه يوفر تكاملًا مع webdriverio

### جديد: لم يعد في مرحلة تجريبية.

### جديد: تم التنظيف والتحويل إلى wdio-logging. تم تحديث العينات.
    تحتاج إلى إزالة تهيئة log4Js logger من ملف التكوين الخاص بك

### جديد: تمت إعادة كتابته كوحدة ES لتوافق webdriverio 8.
    قد تحتاج إلى إجراء تغييرات في تطبيق الاختبار الخاص بك

### إصلاح خطأ: كان webdriverio يتوقف في منتصف كتابة json الغير متزامنة.

### إصلاح خطأ: لم تتم انتظار كتابة json بشكل صحيح

### تحسين رائع جديد: لا مزيد من أخطاء نفاد الذاكرة بسبب json.stringify

### ميزة جديدة رائعة: التقاط مقاطع فيديو لكل اختبار


## [سجل التغييرات](https://github.com/rpii/wdio-html-reporter/blob/master/changes.md)

## معلومات

هذا المشروع هو إعادة كتابة لـ [@rpii/wdio-html-reporter](https://www.npmjs.com/package/wdio-html-reporter)
تمت كتابته بلغة typescript مع العديد من التحسينات.



## التكوين

### WDIO.config.ts

يوضح الكود التالي تكوين مشغل اختبار wdio الافتراضي. ما عليك سوى إضافة كائن HtmlReporter كمسجل آخر إلى مصفوفة المسجلين:

### يتم توفير ملف wdio.config.ts قابل للتشغيل في [/samples/wdio.config.ts](https://github.com/rpii/wdio-html-reporter/blob/master//samples/wdio.config.ts)

فيما يلي مقتطفات من هذا الملف.

```typescript

// wdio.config.ts
import {ReportGenerator, HtmlReporter} from 'wdio-html-nice-reporter';
let reportAggregator: ReportGenerator;

const BaseConfig: WebdriverIO.Config = {
    
  reporters: ['spec',
        ["html-nice", {
            outputDir: './reports/html-reports/',
            filename: 'report.html',
            reportTitle: 'Test Report Title',
            linkScreenshots: true,
            //to show the report in a browser when done
            showInBrowser: true,
            collapseTests: false,
            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: false
        }
        ]
    ]
    
 
};
```
## خيارات التكوين:
  
### لإنشاء تقرير رئيسي لجميع المجموعات

سيقوم webdriver.io باستدعاء المسجل لكل مجموعة اختبار. إنه لا يجمع التقارير. للقيام بذلك، أضف معالجات الأحداث التالية إلى ملف wdio.config.js الخاص بك

أضف إلى ملف تكوين المتصفح:
```
let reportAggregator : ReportAggregator;
```
أضف إلى كائن تكوين المتصفح:
```javascript
    onPrepare: function(config, capabilities) {

    reportAggregator = new ReportGenerator({
        outputDir: './reports/html-reports/',
        filename: 'master-report.html',
        reportTitle: 'Master Report',
        browserName: capabilities.browserName,
        collapseTests: true
    });
    reportAggregator.clean();
}


onComplete: function (exitCode, config, capabilities, results) {
    (async () => {
        await reportAggregator.createReport();
    })();
}


``` 


  
### لإنشاء ملف pdf من هذا التقرير

يتطلب مكونًا إضافيًا للحفاظ على خفة الدعم لأولئك الذين لا يريدونه.
انظر [@rpii/wdio-html-reporter-pdf](https://www.npmjs.com/package/@rpii/wdio-html-reporter-pdf)


## نموذج للمخرجات:

![لقطة شاشة للتقرير](https://github.com/rpii/wdio-html-reporter/blob/master/TestReport.png)

## browserName

يجب تعيين هذا يدويًا. غير متوفر في وقت التكوين لأن كائن المتصفح لا يوجد حتى تبدأ جلسة.