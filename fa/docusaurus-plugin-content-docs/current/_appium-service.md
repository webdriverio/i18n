---
id: appium-service
title: سرویس اپیوم
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-appium-service/README.md
---


مدیریت سرور Appium خارج از حوزه پروژه اصلی WebdriverIO است. این سرویس به شما کمک می‌کند تا سرور Appium را به طور یکپارچه هنگام اجرای تست‌ها با [WDIO testrunner](https://webdriver.io/docs/clioptions) اجرا کنید. این سرویس [سرور Appium](https://appium.github.io/appium.io/docs/en/about-appium/getting-started/index.html#starting-appium) را در یک پروسه فرزند اجرا می‌کند.

## نصب

ساده‌ترین راه، نگه داشتن `@wdio/appium-service` به عنوان یک devDependency در `package.json` شما از طریق:

```sh
npm install @wdio/appium-service --save-dev
```

دستورالعمل‌های نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted) پیدا کنید.

## پیکربندی

برای استفاده از این سرویس باید `appium` را به آرایه سرویس‌های خود اضافه کنید:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // پورت پیش‌فرض appium
    services: ['appium'],
    // ...
};
```

## گزینه‌ها

گزینه‌های زیر را می‌توان به فایل wdio.conf.js اضافه کرد. برای تعریف گزینه‌های سرویس، باید سرویس را به لیست `services` به شکل زیر اضافه کنید:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // پورت پیش‌فرض appium
    services: [
        ['appium', {
            // گزینه‌های سرویس Appium در اینجا
            // ...
        }]
    ],
    // ...
};
```

### logPath
مسیری که تمام لاگ‌های سرور Appium باید در آن ذخیره شوند.

نوع: `String`

مثال:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command
برای استفاده از نصب Appium خود، مثلاً نصب شده به صورت سراسری، دستوری که باید اجرا شود را مشخص کنید.

نوع: `String`

مثال:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            command : 'appium'
        }]
    ],
    // ...
}
```

### args
نقشه آرگومان‌ها برای سرور Appium، که مستقیماً به `appium` منتقل می‌شوند.

برای آرگومان‌های ممکن به [مستندات](https://github.com/appium/appium/blob/master/packages/appium/docs/en/cli/args.md) مراجعه کنید.
آرگومان‌ها در حالت lower camel case تامین می‌شوند. به عنوان مثال، `debugLogSpacing: true` به `--debug-log-spacing` تبدیل می‌شود، یا می‌توانند همانطور که در مستندات Appium توضیح داده شده است، ارائه شوند.

نوع: `Object`

پیش‌فرض: `{}`

مثال:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            args: {
                // ...
                debugLogSpacing: true,
                platformName: 'iOS'
                // ...
            }
        }]
    ],
    // ...
}
```
**توجه:** استفاده از نام‌های مستعار توصیه نمی‌شود و پشتیبانی نمی‌شود. به جای آن، لطفاً از نام کامل خاصیت در حالت lower camel case استفاده کنید.

----

برای اطلاعات بیشتر در مورد WebdriverIO به [صفحه اصلی](https://webdriver.io) مراجعه کنید.