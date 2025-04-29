---
id: wdio-performancetotal-service
title: سرویس PerformanceTotal
custom_edit_url: https://github.com/tzurp/performance-total/edit/master/README.md
---


> wdio-performancetotal-service یک بسته شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/tzurp/performance-total) | [npm](https://www.npmjs.com/package/wdio-performancetotal-service) مراجعه کنید
توجه:<br/>
برای WebdriverIO v9 از نسخه 4.x.x استفاده کنید.<br/>
برای WebdriverIO v8 از نسخه 3.x.x استفاده کنید.<br/>
برای WebdriverIO v7 از نسخه 2.x.x استفاده کنید.<br/>
برای WebdriverIO v6 از نسخه 1.x.x استفاده کنید.

---

![chart](https://github.com/tzurp/performance-total/blob/master/resources/chart.png)

با این افزونه برای [webdriver.io](https://webdriver.io/) می‌توانید به راحتی تحلیل عملکرد را به هر جریان در آزمون‌های خود اضافه کنید، خواه رابط کاربری خالص، API، یا ترکیبی از هر دو باشد. این افزونه روشی ساده و کارآمد برای اندازه‌گیری زمان پاسخ‌دهی فرآیندهای مختلف و شناسایی گلوگاه‌های احتمالی در برنامه شما ارائه می‌دهد. با این اطلاعات، می‌توانید تصمیمات آگاهانه‌ای درباره بهینه‌سازی‌ها و بهبودها برای ارتقای عملکرد کلی برنامه‌ی خود بگیرید.

## نصب

ساده‌ترین راه برای نصب این ماژول به عنوان وابستگی توسعه، استفاده از دستور زیر است:

```
npm install wdio-performancetotal-service --save-dev
```

## استفاده

wdio-performancetotal-service را به فایل `wdio.conf.js` خود اضافه کنید:

```typescript
exports.config = {
  // ...
  services: ['performancetotal']
  // ...
};
```
... یا با گزینه‌های سرویس:

```typescript
exports.config = {
  // ...
  services: [
      ['performancetotal',
      // The options (with default values)
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

### گزینه‌ها

#### __disableAppendToExistingFile__

وقتی به `true` تنظیم شود، اجراهای آزمون جدید با داده‌های تازه شروع می‌شوند و داده‌های عملکرد موجود را بازنویسی می‌کنند.
وقتی به `false` تنظیم شود (پیش‌فرض)، داده‌های عملکرد به داده‌های موجود اضافه می‌شوند.

> **⚠️ هشدار:**
>
> این عمل تمام داده‌های عملکرد شما را به طور دائمی حذف می‌کند. قبل از ادامه، مطمئن شوید که از داده‌های خود نسخه پشتیبان دارید.

#### __performanceResultsFileName__

می‌توانید نام پیش‌فرض فایل نتایج (`performance-results`) را تغییر دهید.
یک فایل نتایج تازه ایجاد شده معمولا فایل قدیمی را بازنویسی می‌کند. اگر می‌خواهید فایل‌های قدیمی را نگه دارید، توصیه می‌شود یک برچسب زمانی به نام فایل اضافه کنید. برای مثال:

```typescript
...
performanceResultsFileName: `performance-results_${new Date().getTime()}`
...
```

#### __dropResultsFromFailedTest__

پیش‌فرض `false` است. وقتی مقدار به `true` تنظیم شود، تحلیل عملکرد از آزمون‌های ناموفق حذف می‌شود.

#### __recentDays__

پیش‌فرض `0` است (بدون محدودیت). برای تنظیم تعداد روزهایی که برای تحلیل عملکرد در نظر گرفته می‌شوند، تعداد روزها را تنظیم کنید. روزهای جزئی نیز پشتیبانی می‌شوند (مثلاً `recentDays: 0.5`)

#### __performanceResultsDirectory__

می‌توانید مسیر پیش‌فرض دایرکتوری نتایج در دایرکتوری ریشه پروژه را تغییر دهید.
برای مثال:

```typescript
...
performanceResultsDirectory: "results-dir/performance-total-results"
...
```

#### __analyzeByBrowser__

پیش‌فرض `false` است. اگر `true` باشد، داده‌های عملکرد همچنین بر اساس نوع مرورگر تحلیل می‌شوند.


### استفاده در آزمون

کافی است __performancetotal__ را در هر جایی که به آن نیاز دارید، خواه در فایل آزمون شما یا هر کلاس دیگری، وارد کنید. این شیء روش‌هایی برای اندازه‌گیری داده‌های عملکرد در آزمون‌های شما ارائه می‌دهد، از جمله sampleStart و sampleEnd برای شروع و پایان اندازه‌گیری‌های عملکرد.
در اینجا نمونه‌ای از نحوه استفاده از شیء performancetotal برای اندازه‌گیری عملکرد راه‌اندازی دو وب‌سایت آمده است:

```typescript
// This test case measures the startup performance of Github and SourceForge using the performancetotal object.

import { performancetotal } from "wdio-performancetotal-service";

it("should test github and sourceforge startup performance", () => {
    // Start a new performance measurement for Github
    performancetotal.sampleStart("GH-Startup");

    // Navigate to Github
    browser.url("https://github.com/");

    // End the Github measurement and save the results
    performancetotal.sampleEnd("GH-Startup");

    // ...

    // Start a new performance measurement for SourceForge
    performancetotal.sampleStart("SF-Startup");

    // Navigate to SourceForge
    await browser.url("https://sourceforge.net/");

    // End the SourceForge measurement and save the results
    performancetotal.sampleEnd("SF-Startup");
});

```

می‌توانید زمان صرف شده برای یک نمونه عملکرد را با فراخوانی performancetotal.getSampleTime(sampleName) در آزمون خود بازیابی کنید. این به شما امکان می‌دهد عملکرد بخش خاصی از کد را بررسی کنید و اطمینان حاصل کنید که با انتظارات شما مطابقت دارد.

```typescript
// Get the time taken for a single sample
const sampleTime = performancetotal.getSampleTime(sampleName);

```

## دریافت نتایج

وقتی همه آزمون‌ها کامل شدند، یک دایرکتوری نتایج جدید در پوشه ریشه پروژه شما ایجاد می‌شود (نام پیش‌فرض دایرکتوری performance-results است). داخل این دایرکتوری، دو فایل ایجاد می‌شوند: performance-results.json و performance-results.csv. این فایل‌ها حاوی داده‌های تحلیل شده برای هر نمونه هستند، از جمله زمان میانگین، خطای استاندارد میانگین (SEM)، تعداد نمونه‌ها، حداقل مقدار، حداکثر مقدار، زودترین زمان و آخرین زمان. می‌توانید از این داده‌ها برای شناسایی هرگونه پسرفت یا بهبود عملکرد در طول زمان استفاده کنید.

### تحلیل داده‌های عملکرد به صورت انبوه

برای تحلیل داده‌های عملکرد موجود به صورت انبوه بدون تولید آزمون‌های جدید، توصیه می‌شود از ابزار [__performancetotal-cli__](https://www.npmjs.com/package/performancetotal-cli) استفاده کنید.

## پشتیبانی از Typescript

این افزونه از Typescript پشتیبانی می‌کند.

## پشتیبانی

برای پشتیبانی و پیشنهادات، لطفاً با من در [tzur.paldi@outlook.com](https://github.com/tzurp/performance-total/blob/master/mailto:tzur.paldi@outlook.com) تماس بگیرید.