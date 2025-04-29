---
id: wdio-ywinappdriver-service
title: سرویس ywinappdriver
custom_edit_url: https://github.com/licanhua/wdio-ywinappdriver-service/edit/main/README.md
---


> wdio-ywinappdriver-service یک بسته شخص ثالث است، برای اطلاعات بیشتر لطفاً به [GitHub](https://github.com/licanhua/wdio-ywinappdriver-service) | [npm](https://www.npmjs.com/package/wdio-ywinappdriver-service) مراجعه کنید

این سرویس به شما کمک می‌کند تا سرور ywinappdriver را هنگام اجرای تست‌ها با [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html) به صورت بی‌دردسر اجرا کنید. این سرویس [ywinappdriver](https://github.com/licanhua/YWinAppDriver) را در یک پروسه فرزند راه‌اندازی می‌کند.

## نصب

```bash
npm install wdio-ywinappdriver-service --save-dev
```

دستورالعمل نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted.html) پیدا کنید.

## پیکربندی

برای استفاده از این سرویس نیاز دارید `ywinappdriver` را به آرایه سرویس خود اضافه کنید:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['ywinappdriver'],
    // ...
};
```

## گزینه‌ها

گزینه‌های زیر را می‌توان به فایل wdio.conf.js اضافه کرد. برای تعریف گزینه‌های سرویس، باید سرویس را به لیست `services` به شکل زیر اضافه کنید:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            // ywinappdriver service options here
            // ...
        }]
    ],
    // ...
};
```

### logPath

مسیری که همه لاگ‌های سرور ywinappdriver در آن ذخیره می‌شوند.

نوع: `String`

مثال:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

برای استفاده از نصب خودتان از winappdriver، مثلاً نصب شده به صورت جهانی، دستوری را که باید اجرا شود مشخص کنید.

نوع: `String`

مثال:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            command : 'c:\\xx\\ywinappdriver.exe'
        }]
    ],
    // ...
}
```

### args

لیست آرگومان‌هایی که مستقیماً به `ywinappdriver` منتقل می‌شوند.

برای آرگومان‌های ممکن [مستندات](https://github.com/licanhua/ywinappdriver) را ببینید.

نوع: `Array`

پیش‌فرض: `[]`

مثال:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            args: ['--urls' 'http://127.0.0.1:4723' '--basepath' '/wd/hub']
        }]
    ],
    // ...
}
```