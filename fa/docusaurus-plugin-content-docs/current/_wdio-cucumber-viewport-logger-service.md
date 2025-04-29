---
id: wdio-cucumber-viewport-logger-service
title: سرویس ثبت کننده گزارش Cucumber Viewport
custom_edit_url: https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/edit/main/README.md
---


> wdio-cucumber-viewport-logger-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service) | [npm](https://www.npmjs.com/package/wdio-cucumber-viewport-logger-service) مراجعه کنید
## سرویس ثبت کننده گزارش Cucumber Viewport برای WebdriverIO

این سرویس امکان ثبت مراحل Cucumber و سایر اطلاعات دیباگ را مستقیماً در پنجره مرورگر در راه‌حل مبتنی بر WebdriverIO شما اضافه می‌کند. این قابلیت به ویژه در مواردی که از دستگاه‌ها یا ماشین‌های مجازی بدون دسترسی *فیزیکی* مستقیم به آنها و امکان راه‌اندازی یک جلسه تعاملی برای دیباگ عمیق آزمون‌های e2e خود استفاده می‌کنید، بسیار مفید است.

![demo](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/raw/main/img/demo.gif)

### شروع سریع

نصب پکیج:

```bash
npm install wdio-cucumber-viewport-logger-service --save-dev
```

اضافه کردن سرویس به بخش `services` در تنظیمات خود، به عنوان مثال:

```js
  services: [
    //...
    'cucumber-viewport-logger',
    //...
]
```

### گزینه‌های سرویس

| گزینه | توضیحات | نوع | مقدار پیش‌فرض |
| --- | --- | --- | --- |
| `numberOfSteps` | تعداد مراحلی که در viewport نمایش داده می‌شوند | number | 3 |
| `enabled` | فعال/غیرفعال کردن سرویس | boolean | true |
| `styles` | استایل‌های CSS برای wrapper لاگر، *کلمه کلیدی مرحله* و *متن مرحله*، مثال زیر را ببینید | object | {} |

```js
// wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
            numberOfSteps: 5,
            enabled: process.env.VP_LOGGER === '1', // سرویس فقط زمانی فعال می‌شود که متغیر محیطی `VP_LOGGER` را به `1` تنظیم کنید
            // تنظیم استایل‌های CSS سفارشی برای المان‌های خاص
            styles: {
                wrapper: { backgroundColor: 'white' },
                keyword: { color: 'red' },
                text: {
                    fontSize: '30px',
                    color: 'green',
                },
                closeButton: {
                    color: 'red',
                },
            },
        },]
    ]
    // ...
};
```

### API

> `logToViewport(message, styles)` - نمایش پیام سفارشی با استایل CSS سفارشی (اختیاری)، می‌توانید از این در تعاریف مراحل خود استفاده کنید
به عنوان مثال:
>```js
>When(/^I render message: "([^"]*)"$/, { timeout: 120000 }, function (message) {
>    browser.logToViewport(message, { text: { color: 'green' } });
>});
>```


> `removeViewportLogMessage()` - حذف بخش پیام‌های viewport، می‌تواند برای مثال برای آزمون بصری مفید باشد

### pointerEvents: 'none'

به طور پیش‌فرض، تمام رویدادهای ماوس (کلیک، هاور و غیره) از بخش پیام عبور می‌کنند، به عنوان مثال: به جای کلیک روی بخش پیام، کلیک شما به المان بعدی پیام (المان برنامه شما) "منتقل" می‌شود. اگر می‌خواهید این رفتار را تغییر دهید، گزینه استایل wrapper را به 'pointerEvents' با مقدار 'auto' تنظیم کنید، مثلاً:
```js

/ wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
     
            styles: {
                wrapper: { pointerEvents: 'auto' },
            },
        },]
    ]
    // ...
};
```