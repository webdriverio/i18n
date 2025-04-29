---
id: static-server-service
title: سرویس سرور استاتیک
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-static-server-service/README.md
---


برخی از پروژه‌ها فقط دارایی‌های فرانت‌اند هستند و بیشتر از یک سرور استاتیک نیازی ندارند. این سرویس به شما کمک می‌کند تا یک سرور فایل استاتیک را در هنگام تست اجرا کنید.

## نصب

ساده‌ترین راه، افزودن `@wdio/static-server-service` به عنوان یک `devDependency` در فایل `package.json` شما است، از طریق:

```sh
npm install @wdio/static-server-service --save-dev
```

دستورالعمل‌های نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted) پیدا کنید.

## پیکربندی

برای استفاده از سرویس سرور استاتیک، `static-server` را به آرایه سرویس‌های خود اضافه کنید:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['static-server'],
    // ...
};
```

## گزینه‌ها

### `folders` (الزامی)

آرایه‌ای از مسیرهای پوشه و نقاط اتصال.

نوع: `Array<Object>`
پارامترها:
 - mount `{String}` - نقطه پایانی URL که پوشه در آن نصب خواهد شد.
 - path `{String}` - مسیر به پوشه‌ای که باید نصب شود.

``` javascript
 // wdio.conf.js
 export const config = {
    // ...
    services: [
        ['static-server', {
            folders: [
                { mount: '/fixtures', path: './tests/fixtures' },
                { mount: '/dist', path: './dist' },
            ]
        }]
    ],
    // ...
 };
```

### `port`

پورتی که سرور به آن متصل می‌شود.

نوع: `Number`

پیش‌فرض: `4567`

### `middleware`

آرایه‌ای از اشیاء میان‌افزار. این‌ها را در پیکربندی بارگذاری و نمونه‌سازی کنید و آن‌ها را برای استفاده سرور استاتیک منتقل کنید.

نوع: `Array<Object>`
پارامترها:
 - mount `{String}` - نقطه پایانی URL که میان‌افزار در آن نصب خواهد شد.
 - middleware `<Object>` - تابع کال‌بک میان‌افزار.

پیش‌فرض: `[]`

``` javascript
// wdio.conf.js
import middleware from 'middleware-package'

export const config = {
    // ...
    services: [
        ['static-server', {
            middleware: [{
                mount: '/',
                middleware: middleware(/* middleware options */),
            }],
        }]
    ],
    // ...
};
```

----

برای اطلاعات بیشتر در مورد WebdriverIO، به [صفحه اصلی](http://webdriver.io) مراجعه کنید.