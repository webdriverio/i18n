---
id: wdio-video-reporter
title: گزارشگر ویدیویی
custom_edit_url: https://github.com/presidenten/wdio-video-reporter/edit/main/README.md
---


> wdio-video-reporter یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/presidenten/wdio-video-reporter) | [npm](https://www.npmjs.com/package/wdio-video-reporter) مراجعه کنید

![Logo](https://raw.githubusercontent.com/presidenten/wdio-video-reporter-example-report/master/wdio-video-reporter.png)

این یک گزارش‌دهنده برای [Webdriver IO v6 و بالاتر](https://webdriver.io/) است که ویدیوهایی از اجرای تست‌های wdio شما تولید می‌کند. اگر از allure استفاده می‌کنید، موارد تست به صورت خودکار با ویدیوها تزئین می‌شوند. (برای Webdriver IO v5، لطفاً از wdio-video-reporter نسخه ^2.0.0 استفاده کنید.)

ویدیوها در `wdio.config.outputDir` قرار می‌گیرند

گزارش Allure نمونه با ویدیوهای گنجانده شده در تست‌های ناموفق را در اینجا مشاهده کنید:
https://presidenten.github.io/wdio-video-reporter-example-report/

![example-allure-report](https://media.giphy.com/media/7Fgle7bHGrxR3zY6Gw/giphy.gif)

مزایا:
- ویدیوهای خوب در گزارش‌های allure شما
- ویدیوهای با سرعت مناسب انسانی، حتی با وجود اینکه تست‌ها سریع هستند
- با Selenium grid کار می‌کند
- با تمام وب‌درایورهایی که از `saveScreenshot` پشتیبانی می‌کنند، کار می‌کند
- در مرورگرهای دسکتاپ زیر با استفاده از Selenium 3.141.59 تأیید شده است:
  - Chrome
  - Firefox
  - Safari
  - Internet Explorer 11
  - Microsoft Edge
- در دستگاه‌های ios و android زیر با [Appium](http://appium.io/docs/en/about-appium/getting-started/) 1.13.0-beta3 تأیید شده است:
  - Iphone 8
  - Ipad Gen 6
  - Samsung galaxy S9
  - Samsung galaxy tab A10

معایب:
- با گرفتن اسکرین‌شات پس از "اقدامات" کار می‌کند، که تست‌ها را کمی کندتر می‌کند. این با انتخاب دقیق پیام‌های [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) که باید منجر به اسکرین‌شات شوند، کاهش می‌یابد
- درایورهای Selenium جعبه‌های هشدار و پنجره‌های پاپ‌آپ را در اسکرین‌شات‌ها نمایش نمی‌دهند، بنابراین آنها در ویدیوها قابل مشاهده نیستند


شروع سریع
===========

قالب ساده را در [wdio-template](https://github.com/presidenten/wdio-template) بررسی کنید تا به سرعت شروع کنید.

یکی از مخازن را کلون کرده و وابستگی‌ها را با `yarn` یا `npm install` نصب کنید. سپس `yarn e2e` یا `npm run e2e` را در دایرکتوری demo اجرا کرده و در نهایت `yarn report` یا `npm run report` را برای مشاهده گزارش allure اجرا کنید.


نصب
============

نصب گزارشگر
--------------------

`yarn add wdio-video-reporter`
یا
`npm install wdio-video-reporter`


افزودن گزارشگر به پیکربندی
--------------------------

در بالای فایل `wdio.conf.js`، کتابخانه را import کنید:
```
const video = require('wdio-video-reporter');
```

سپس گزارشگر ویدیو را به پیکربندی در ویژگی reporters اضافه کنید:

```
 reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
  ],
```


استفاده با Allure
-----------------

افزودن گزارشگر Allure، به طور خودکار گزارش‌ها را با ویدیوها بدون نیاز به پیکربندی اضافی به‌روز می‌کند :-)

```
 reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
```


پیکربندی
=============

پارامترهای پیکربندی معمولی
-------------------------------

اکثر کاربران ممکن است بخواهند این موارد را تنظیم کنند

- `saveAllVideos` برای ذخیره ویدیوها برای تست‌های موفق، روی true تنظیم کنید. `پیش‌فرض: false`
- `videoSlowdownMultiplier` عدد صحیح بین [1-100]. اگر ویدیوها خیلی سریع پخش می‌شوند، افزایش دهید. `پیش‌فرض: 3`
- `videoRenderTimeout` حداکثر ثانیه‌ها برای انتظار رندر ویدیو. `پیش‌فرض: 5`
- `outputDir` اگر تنظیم نشده باشد، از wdio.config.outputDir استفاده می‌کند. `پیش‌فرض: undefined`
- `outputDir` اگر تنظیم نشده باشد، از wdio.config.outputDir استفاده می‌کند. `پیش‌فرض: undefined`
- `maxTestNameCharacters` حداکثر طول نام تست. `پیش‌فرض: 250`

پارامترهای پیکربندی پیشرفته
---------------------------------

کاربران پیشرفته که می‌خواهند زمان‌بندی اسکرین‌گرب موتور را تغییر دهند، می‌توانند این موارد را ویرایش کنند. این آرایه‌ها ممکن است با آخرین کلمه پیام [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) پر شوند، یعنی /session/:sessionId/`buttondown`.

- `addExcludedActions` اقداماتی را اضافه کنید که اسکرین‌شات در آنها غیرضروری است. `پیش‌فرض: []`
- `addJsonWireActions` اقداماتی را اضافه کنید که اسکرین‌شات در آنها وجود ندارد. `پیش‌فرض: []`
- `recordAllActions` فیلتر کردن را نادیده بگیرید و همه چیز را اسکرین‌شات کنید. (توصیه نمی‌شود) `پیش‌فرض: false`

برای مشاهده پیام‌های پردازش شده، `wdio.config.logLevel: 'debug'` را تنظیم کرده و `outputDir/wdio-X-Y-Video-reporter.log` را بررسی کنید. این همچنین دایرکتوری خروجی اسکرین‌شات‌ها را برای بررسی دست نخورده باقی می‌گذارد

برای جلوگیری از لاگ گیری اضافی و دریافت فقط فایل‌های ویدیویی، `wdio.config.logLevel: 'silent'` را تنظیم کنید.

پشتیبانی از Cucumber
----------------

اگر از گزارشگر Allure استفاده می‌کنید، باید اطمینان حاصل کنید که موارد زیر را انجام می‌دهید:

- به جای استفاده از assertions داخلی node از `chai` استفاده کنید، در غیر این صورت تست‌های ناموفق در تعاریف مراحل شما به عنوان خراب گزارش می‌شوند
- `useCucumberStepReporter: true` را به گزینه Allure در فایل `wdio.conf.js` اضافه کنید، یک پیکربندی معمولی به این شکل خواهد بود:
```
  reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }],
  ],
```
برای یک مثال کامل، شاخه cucumber را در [wdio-template](https://github.com/presidenten/wdio-template/tree/cucumber) بررسی کنید


راه‌اندازی Appium
------------

از نسخه v1.2.4 `wdio-video-reporter` پشتیبانی برای کمک به Allure در تمایز بین مرورگرهای سافاری و کروم در دسکتاپ و دستگاه‌ها وجود دارد.
گزارشگر از ویژگی سفارشی `deviceType` برای شناسایی دستگاه‌های مختلف استفاده می‌کند.
مقادیر توصیه شده `phone` و `tablet` هستند.
توصیه می‌شود که `browserVersion` را نیز برای _تمام_ مرورگرها برای جلوگیری از یک اشکال در وب‌درایور Chrome هنگام استفاده از دستگاه‌ها در همان شبکه Selenium grid به عنوان مرورگرهای Chrome دسکتاپ اضافه کنید.

فایل‌های ویدیویی تولید شده نیز `deviceType` را به نام مرورگر اضافه می‌کنند.

مثال پیکربندی appium:
```
  "capabilities": [
    {
      ...
      "deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    }
  ],
```

و `wdio-config.json`:
```
  "capabilities": [
    {
      ...
      "appium:deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    },
  ],
```


مشارکت
============

فورک کنید، تغییرات را ایجاد کنید، برخی تست‌ها را بنویسید، لینت کنید، تست‌ها را اجرا کنید، بسازید و در دمو تأیید کنید که تغییرات به درستی کار می‌کنند، سپس یک PR ایجاد کنید.

پوشه دمو با نسخه ساخته شده کتابخانه کار می‌کند، بنابراین اگر ویژگی‌های جدیدی اضافه کردید و می‌خواهید آنها را امتحان کنید، حتماً آن را بسازید.


تشکر
======

تشکر از [Johnson E](https://github.com/jonn-set) برای اصلاح پشتیبانی Cucumber که بسیاری از کاربران درخواست کرده بودند.