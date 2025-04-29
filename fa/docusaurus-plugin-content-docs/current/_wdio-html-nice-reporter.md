---
id: wdio-html-nice-reporter
title: گزارش‌دهنده HTML
custom_edit_url: https://github.com/rpii/wdio-html-reporter/edit/master/README.md
---


> wdio-html-nice-reporter یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفاً به [GitHub](https://github.com/rpii/wdio-html-reporter) | [npm](https://www.npmjs.com/package/wdio-html-nice-reporter) مراجعه کنید
 # wdio-html-nice-reporter

یک گزارش‌دهنده برای webdriver.io که یک گزارش HTML زیبا تولید می‌کند.  
نام آن احمقانه است اما یکپارچگی با webdriverio را فراهم می‌کند

### جدید: دیگر در حالت بتا نیست.

### جدید: پاکسازی شده و لاگینگ به wdio-logging تغییر کرده است. نمونه‌ها به‌روز شده‌اند.
    شما باید مقداردهی اولیه log4Js logger را از پیکربندی خود حذف کنید

### جدید: به عنوان یک ماژول ES برای سازگاری با webdriverio 8 بازنویسی شده است.
    ممکن است به تغییراتی در برنامه تست خود نیاز داشته باشید

### رفع اشکال: webdriverio در وسط نوشتن ناهمگام json خاموش می‌شد.

### رفع اشکال: نوشتن json به درستی منتظر نمی‌ماند

### بهبود بزرگ جدید: دیگر خطاهای کمبود حافظه به دلیل json.stringify وجود ندارد

### ویژگی جدید عالی: گرفتن ویدیو از هر تست


## [تاریخچه تغییرات](https://github.com/rpii/wdio-html-reporter/blob/master/changes.md)

## اطلاعات

این پروژه یک بازنویسی از [@rpii/wdio-html-reporter](https://www.npmjs.com/package/wdio-html-reporter) است
که با تایپ‌اسکریپت نوشته شده و بهبودهای زیادی دارد.



## پیکربندی

### WDIO.config.ts

کد زیر پیکربندی پیش‌فرض اجراکننده تست wdio را نشان می‌دهد. فقط یک شیء HtmlReporter را به عنوان یک گزارش‌دهنده دیگر به آرایه reporters اضافه کنید:

### یک wdio.config.ts کاربردی در [/samples/wdio.config.ts](https://github.com/rpii/wdio-html-reporter/blob/master//samples/wdio.config.ts) ارائه شده است

در زیر بخش‌هایی از آن فایل آمده است.

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
## گزینه‌های پیکربندی:
  
### برای تولید یک گزارش اصلی برای تمام مجموعه‌ها

webdriver.io گزارش‌دهنده را برای هر مجموعه تست فراخوانی می‌کند. این گزارش‌ها را تجمیع نمی‌کند. برای انجام این کار، رویدادهای زیر را به فایل wdio.config.js خود اضافه کنید

به فایل پیکربندی مرورگر اضافه کنید:
```
let reportAggregator : ReportAggregator;
```
به شیء پیکربندی مرورگر اضافه کنید:
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


  
### برای تولید یک فایل pdf از این گزارش

نیاز به افزونه اضافی دارد تا پشتیبانی برای کسانی که نمی‌خواهند سبک‌تر باشد.
به [@rpii/wdio-html-reporter-pdf](https://www.npmjs.com/package/@rpii/wdio-html-reporter-pdf) مراجعه کنید


## نمونه خروجی:

![تصویر گزارش](https://github.com/rpii/wdio-html-reporter/blob/master/TestReport.png)

## browserName

این باید به صورت دستی تنظیم شود. در زمان پیکربندی در دسترس نیست زیرا شیء مرورگر تا زمانی که یک نشست را شروع نکنید وجود ندارد.