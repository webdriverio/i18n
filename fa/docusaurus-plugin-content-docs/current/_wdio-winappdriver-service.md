---
id: wdio-winappdriver-service
title: سرویس winappdriver
custom_edit_url: https://github.com/licanhua/wdio-winappdriver-service/edit/main/README.md
---


> wdio-winappdriver-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/licanhua/wdio-winappdriver-service) | [npm](https://www.npmjs.com/package/wdio-winappdriver-service) مراجعه کنید

این سرویس به شما کمک می‌کند تا سرور WinAppDriver را هنگام اجرای تست‌ها با [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html) به طور بی‌نقص اجرا کنید. این سرویس [WinAppDriver](https://github.com/Microsoft/WinAppDriver) را در یک پروسه فرزند اجرا می‌کند.

## نصب

```bash
npm install wdio-winappdriver-service --save-dev
```

دستورالعمل‌های نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted.html) پیدا کنید.

## پیکربندی

برای استفاده از این سرویس باید `winappdriver` را به آرایه سرویس خود اضافه کنید:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['winappdriver'],
    // ...
};
```

## گزینه‌ها

گزینه‌های زیر را می‌توان به فایل wdio.conf.js اضافه کرد. برای تعریف گزینه‌های سرویس باید سرویس را به لیست `services` به شکل زیر اضافه کنید:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            // گزینه‌های سرویس WinAppDriver در اینجا
            // ...
        }]
    ],
    // ...
};
```

### logPath

مسیری که تمام لاگ‌های سرور winappdriver باید در آن ذخیره شوند.

نوع: `String`

مثال:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

برای استفاده از نصب خود از WinAppDriver، مثلاً نصب شده به صورت جهانی، دستوری را که باید اجرا شود مشخص کنید.

نوع: `String`

مثال:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            command : 'c:\\Program Files (x86)\\Windows Application Driver\\WinAppDriver.exe'
        }]
    ],
    // ...
}
```

### args

لیست آرگومان‌هایی که مستقیماً به `WinAppDriver` منتقل می‌شوند.

برای آرگومان‌های ممکن [مستندات](https://github.com/Microsoft/WinAppDriver) را ببینید.

نوع: `Array`

پیش‌فرض: `[]`

مثال:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            args: ['10.0.0.10', '4723/wd/hub']
        }]
    ],
    // ...
}
```