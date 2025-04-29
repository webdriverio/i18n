---
id: wdio-timeline-reporter
title: گزارشگر خط زمانی
custom_edit_url: https://github.com/QualityOps/wdio-timeline-reporter/edit/master/README.md
---


> wdio-timeline-reporter یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/QualityOps/wdio-timeline-reporter) | [npm](https://www.npmjs.com/package/wdio-timeline-reporter) مراجعه کنید


> یک گزارشگر همه‌کاره WebdriverIO برای تجسم تجمیعی نتایج آزمون‌های شما زیرا "دیدن باور کردن است"

![example.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/example.png)

## چرا

زیرا ما زمان زیادی را صرف اشکال‌زدایی آزمون‌های ناموفق می‌کنیم و از خروجی ترمینال به مشاهده تصاویر خطا و غیره می‌پردازیم. این گزارشگر تمام اطلاعات معمولی که نیاز خواهید داشت را در یک گزارش جمع‌آوری می‌کند. آزمون‌ها را اجرا کنید و یک خط زمانی زیبا از رویدادها داشته باشید که می‌توانید به آن نگاه کنید تا بیشتر تأیید کنید همه چیز خوب به نظر می‌رسد.

#### ویژگی‌ها شامل:

- با چارچوب‌های Mocha و Jasmine عالی کار می‌کند. همچنین با Cucumber کار می‌کند اما هر مرحله به عنوان یک آزمون گزارش می‌شود
- خلاصه واضح نتایج آزمون.
- جزئیات هر اجرای آزمون، از جمله تمام تصاویر گرفته شده در طول اجرای آزمون.
- فیلتر کردن نتایج آزمون. عالی برای تمرکز بر آزمون‌های ناموفق
- ردیابی پشته خطا به آزمون متصل شده است.
- توانایی افزودن اطلاعات اضافی به آزمون در زمان اجرا.
- نیازی به پردازش پس از اتمام نیست. پس از اتمام فرآیند آزمون wdio، یک فایل گزارش html استاتیک ایجاد می‌شود.
- سرویس خط زمانی برای مدیریت گرفتن تصاویر شامل تغییر اندازه تصاویر.

یک نمونه گزارش html را می‌توان [اینجا](http://htmlpreview.github.io/?https://github.com/QualityOps/wdio-timeline-reporter/blob/master/images/example-timeline-report.html) پیدا کرد

دستورالعمل‌های نحوه نصب `WebdriverIO` را می‌توان [اینجا](http://webdriver.io/guide/getstarted/install.html) یافت.

## نصب

**برای نسخه سازگار با WEBDRIVERIO V4 به [اینجا](https://github.com/QualityOps/wdio-timeline-reporter/tree/v4) مراجعه کنید**

```shell
npm install --save wdio-timeline-reporter
```

یک وابستگی به `package.json` شما اضافه خواهد شد

```json
{
  "dependencies": {
    "wdio-timeline-reporter": "^5.1.0"
  }
}
```

### استفاده

`timeline` را به آرایه گزارشگران در فایل پیکربندی wdio خود اضافه کنید.

همچنین `TimelineService` را از wdio-timeline-reporter وارد و اضافه کنید.

سرویس برای ترکیب گزارش‌ها و ایجاد html ضروری است زیرا گزارشگرها اکنون به ازای هر نمونه اجرا در webdriverio 5 راه‌اندازی می‌شوند. [بحث باز در مورد webdriverio را ببینید](https://github.com/webdriverio/webdriverio/issues/3780)

TimelineService همچنین می‌تواند گرفتن تصاویر را در طول اجرای آزمون‌ها مدیریت کند. شما گزینه کاهش اندازه و کیفیت تصاویر و همچنین جاسازی تصاویر در گزارش به عنوان base64 را دارید. اینها با استفاده از [گزینه‌های گزارشگر](#reporter-options) قابل تنظیم هستند.

```js
// wdio.conf.js
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
exports.config = {
  // ...
  reporters: [['timeline', { outputDir: './desired_location' }]],
  // ...
  services: [[TimelineService]]
};
```

### گزینه‌های گزارشگر

اگر می‌خواهید پیکربندی پیش‌فرض گزارشگر را تغییر دهید، یک شیء literal از گزینه‌های گزارشگر را به آرایه timeline در زیر reporters اضافه کنید، همانطور که در زیر نشان داده شده است.

![reporter-options.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/reporter-options.png)

| شاخص | توضیحات                                                                                                                                                    |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.    | دایرکتوری که فایل html و تصاویر در آن ایجاد می‌شود. گزینه اجباری                                                                                          |
| 2.    | نام فایل گزارش html. مقدار پیش‌فرض `timeline-report.html` است                                                                                              |
| 3.    | تصاویر را به صورت base64 در فایل html جاسازی کنید. مقدار پیش‌فرض `false` است                                                                              |
| 4.    | گزینه‌های شیء برای دستکاری تصویر                                                                                                                           |
| 5.    | کیفیت JPEG را تنظیم کنید. فقط در صورتی مرتبط است که گزینه `resize` برابر با `true` باشد. هرچه مقدار کمتر باشد، اندازه و کیفیت تصویر کمتر خواهد بود. مقدار پیش‌فرض `70` است. حداکثر مقدار مجاز `100` است |
| 6.    | تغییر اندازه تصویر. مقدار پیش‌فرض `false` است                                                                                                             |
| 7.    | مقدار برای کاهش تعداد کل پیکسل‌ها. فقط در صورتی مرتبط است که گزینه `resize` صحیح باشد. پیش‌فرض `1` است. مقادیر معتبر `1 - 5`                            |
| 8.    | چند وقت یکبار تصاویر گرفته شوند. مقادیر پشتیبانی شده `on:error`، `before:click`، `none` هستند. پیش‌فرض `none` است. `before:click` یک گزینه عالی برای ایجاد یک خط زمانی از تصاویر برنامه تحت آزمون است. |

### افزودن اطلاعات اضافی به زمینه آزمون

امکان افزودن اطلاعات اضافی به یک آزمون با استفاده از متد استاتیک `addContext` وجود دارد. این می‌تواند برای افزودن اطلاعات مهم که می‌تواند به اشکال‌زدایی آزمون‌های ناموفق کمک کند، به عنوان مثال یک کاربر ایجاد شده در طول اجرای آزمون با نام کاربری پویا، مفید باشد

#### استفاده پایه

متد استاتیک `TimelineReporter.addContext` یا یک پارامتر رشته‌ای یا یک شیء literal با دو خاصیت `title` و `value` را می‌پذیرد، به عنوان مثال

```js
{ title: 'sessionId', value: 'b59bb9ec-ab15-475e-9ce6-de8a14ca0cd3' }
```

مقدار می‌تواند همچنین یک لینک باشد

##### مثال Mocha

```js
const TimelineReporter = require('wdio-timeline-reporter').default;

describe('Suite', function() {
  it('Test', function() {
    // object literal parameter
    TimelineReporter.addContext({
      title: 'Test User',
      value: 'user id created during the test'
    });

    // value as anchor tag
    TimelineReporter.addContext({
      title: 'Dynamic link',
      value: '<a href="">Some important link related to test</a>'
    });

    // string parameter
    TimelineReporter.addContext('This test might be flaky');
  });
});
```

## قدردانی

دوست دارم از نویسندگان و نگهدارندگان [wdio-json-reporter](https://github.com/fijijavis/wdio-json-reporter) تشکر کنم. بررسی راه حل نسخه 5 آنها به تسریع کار من کمک کرد