---
id: firefox-profile-service
title: سرویس پروفایل فایرفاکس
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---


آیا می‌خواهید مرورگر فایرفاکس خود را با افزونه خاصی اجرا کنید یا نیاز دارید چند ترجیح تنظیم کنید؟ سلنیوم به شما امکان می‌دهد از یک پروفایل برای مرورگر فایرفاکس استفاده کنید با ارسال این پروفایل به صورت رشته `base64` به ویژگی `moz:firefoxOptions.profile` در قابلیت‌های مورد نظر خود. این کار نیازمند ساخت آن پروفایل و تبدیل آن به `base64` است. این سرویس برای [wdio testrunner](https://webdriver.io/docs/clioptions) زحمت کامپایل کردن پروفایل را از دست شما خارج می‌کند و به شما اجازه می‌دهد گزینه‌های مورد نظر خود را به راحتی از فایل `wdio.conf.js` تعریف کنید.

برای یافتن تمام گزینه‌های ممکن، صفحه [about:config](about:config) را در مرورگر فایرفاکس خود باز کنید یا به وب‌سایت [mozillaZine](http://kb.mozillazine.org/About:config_entries) بروید تا تمام مستندات درباره هر تنظیم را پیدا کنید. علاوه بر این، می‌توانید افزونه‌های کامپایل شده فایرفاکس (به صورت `*.xpi`) را تعریف کنید که باید قبل از شروع تست نصب شوند.

## نصب

ساده‌ترین راه این است که `@wdio/firefox-profile-service` را به عنوان یک devDependency در `package.json` خود نگه دارید، از طریق:

```sh
npm install @wdio/firefox-profile-service --save-dev
```

دستورالعمل‌های نحوه نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted) پیدا کنید.

## پیکربندی

پروفایل خود را با افزودن سرویس `firefox-profile` به لیست سرویس‌های خود تنظیم کنید. سپس تنظیمات خود را در ویژگی `firefoxProfile` به این صورت تعریف کنید:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['firefox-profile', {
            extensions: [
                '/path/to/extensionA.xpi', // مسیر به فایل .xpi
                '/path/to/extensionB' // یا مسیر به افزونه فایرفاکس باز شده
            ],
            'xpinstall.signatures.required': false,
            'browser.startup.homepage': 'https://webdriver.io',
            legacy: true // فقط برای فایرفاکس <= 55 استفاده کنید
        }]
    ],
    // ...
};
```

اگر یک افزونه سفارشی فایرفاکس ساخته‌اید که می‌خواهید در مرورگر نصب کنید، مطمئن شوید که `'xpinstall.signatures.required': false` را به عنوان یک پرچم پروفایل تنظیم کنید، زیرا افزونه‌های فایرفاکس باید توسط [موزیلا امضا شوند](https://wiki.mozilla.org/Add-ons/Extension_Signing).

برای استفاده از افزونه‌های سفارشی امضا نشده، همچنین باید از [نسخه توسعه‌دهنده فایرفاکس](https://www.mozilla.org/en-GB/firefox/developer/) استفاده کنید، زیرا فایرفاکس معمولی نسخه 48 و جدیدتر [این اجازه را نمی‌دهند](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline).

## گزینه‌ها

شامل تمام تنظیمات به صورت جفت کلید-مقدار است. شما می‌توانید تمام تنظیمات موجود را در صفحه `about:config` پیدا کنید.

### extensions

یک یا چند افزونه را به جلسه مرورگر اضافه کنید. تمام ورودی‌ها می‌توانند یا مسیر مطلق به فایل `.xpi` یا مسیر به دایرکتوری افزونه باز شده فایرفاکس باشند.

نوع: `String[]`<br />
پیش‌فرض: `[]`

### profileDirectory

ایجاد پروفایل فایرفاکس بر اساس یک پروفایل موجود با تنظیم مسیر مطلق به آن پروفایل.

نوع: `String`<br />
پیش‌فرض: `null`

### proxy

تنظیمات پراکسی شبکه را تنظیم کنید. پارامتر `proxy` یک هش است که ساختار آن به مقدار کلید اجباری `proxyType` بستگی دارد، که یکی از مقادیر رشته‌ای زیر را می‌گیرد:

 * `direct` - اتصال مستقیم (بدون پراکسی)
 * `system` - استفاده از تنظیمات پراکسی سیستم عامل
 * `pac` - استفاده از پیکربندی خودکار پراکسی تنظیم شده بر اساس مقدار کلید `autoconfigUrl`
 * `manual` - تنظیمات دستی پراکسی که جداگانه برای پروتکل‌های مختلف با استفاده از مقادیر کلیدهای زیر تعریف شده است: `ftpProxy`، `httpProxy`، `sslProxy`، `socksProxy`

نوع: `Object`<br />
پیش‌فرض: `null`<br />
مثال:

- پراکسی خودکار:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'pac',
                    autoconfigUrl: 'http://myserver/proxy.pac'
                }
            }]
        ],
        // ...
    };
    ```

- پراکسی HTTP دستی:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

- پراکسی HTTP و HTTPS دستی:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080',
                    sslProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

### legacy

لطفاً اگر از فایرفاکس نسخه 55 یا پایین‌تر استفاده می‌کنید، این پرچم را روی `true` تنظیم کنید.

نوع: `Boolean`<br />
پیش‌فرض: `false`

----

برای اطلاعات بیشتر در مورد WebdriverIO به [صفحه اصلی](https://webdriver.io) مراجعه کنید.