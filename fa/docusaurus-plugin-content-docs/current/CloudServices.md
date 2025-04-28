---
id: cloudservices
title: استفاده از سرویس‌های ابری
---

استفاده از سرویس‌های پرداخت بر اساس تقاضا مانند Sauce Labs، Browserstack، TestingBot، LambdaTest یا Perfecto با WebdriverIO بسیار ساده است. تنها کاری که باید انجام دهید این است که `user` و `key` سرویس خود را در تنظیمات خود قرار دهید.

به صورت اختیاری، می‌توانید آزمون خود را با تنظیم قابلیت‌های خاص ابری مانند `build` پارامتری کنید. اگر می‌خواهید سرویس‌های ابری را فقط در Travis اجرا کنید، می‌توانید از متغیر محیطی `CI` برای بررسی اینکه آیا در Travis هستید استفاده کرده و پیکربندی را مطابق با آن تغییر دهید.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

می‌توانید آزمون‌های خود را برای اجرای از راه دور در [Sauce Labs](https://saucelabs.com) تنظیم کنید.

تنها نیاز، تنظیم `user` و `key` در پیکربندی شما (که یا توسط `wdio.conf.js` صادر شده یا به `webdriverio.remote(...)` منتقل شده است) به نام کاربری و کلید دسترسی Sauce Labs شما است.

همچنین می‌توانید هر [گزینه پیکربندی آزمون](https://docs.saucelabs.com/dev/test-configuration-options/) اختیاری را به عنوان کلید/مقدار در قابلیت‌های هر مرورگر وارد کنید.

### Sauce Connect

اگر می‌خواهید آزمون‌ها را در برابر سروری که برای اینترنت قابل دسترسی نیست (مانند `localhost`) اجرا کنید، باید از [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy) استفاده کنید.

پشتیبانی از این مورد خارج از محدوده WebdriverIO است، بنابراین باید خودتان آن را راه‌اندازی کنید.

اگر از آزمون‌گر WDIO استفاده می‌کنید، [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) را دانلود کرده و در `wdio.conf.js` خود پیکربندی کنید. این کار به راه‌اندازی Sauce Connect کمک می‌کند و با ویژگی‌های اضافی همراه است که آزمون‌های شما را بهتر در سرویس Sauce ادغام می‌کند.

### با Travis CI

با این حال، Travis CI [پشتیبانی](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) برای شروع Sauce Connect قبل از هر آزمون دارد، بنابراین پیروی از دستورالعمل‌های آنها یک گزینه است.

اگر چنین می‌کنید، باید گزینه پیکربندی آزمون `tunnel-identifier` را در `capabilities` هر مرورگر تنظیم کنید. Travis به طور پیش‌فرض این را به متغیر محیطی `TRAVIS_JOB_NUMBER` تنظیم می‌کند.

همچنین، اگر می‌خواهید Sauce Labs آزمون‌های شما را بر اساس شماره ساخت گروه‌بندی کند، می‌توانید `build` را روی `TRAVIS_BUILD_NUMBER` تنظیم کنید.

در نهایت، اگر `name` را تنظیم کنید، این نام آزمون را در Sauce Labs برای این ساخت تغییر می‌دهد. اگر از آزمون‌گر WDIO همراه با [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) استفاده می‌کنید، WebdriverIO به طور خودکار نام مناسبی برای آزمون تنظیم می‌کند.

مثال `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### زمان‌های انتظار

از آنجا که آزمون‌های خود را از راه دور اجرا می‌کنید، ممکن است نیاز به افزایش برخی زمان‌های انتظار باشد.

می‌توانید [زمان انتظار بیکاری](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) را با ارسال `idle-timeout` به عنوان یک گزینه پیکربندی آزمون تغییر دهید. این کنترل می‌کند که Sauce چه مدت بین دستورات قبل از بستن اتصال منتظر بماند.

## BrowserStack

WebdriverIO همچنین دارای یک ادغام داخلی با [Browserstack](https://www.browserstack.com) است.

تنها نیاز، تنظیم `user` و `key` در پیکربندی شما (که یا توسط `wdio.conf.js` صادر شده یا به `webdriverio.remote(...)` منتقل شده است) به نام کاربری و کلید دسترسی خودکار Browserstack شما است.

همچنین می‌توانید هر [قابلیت پشتیبانی شده](https://www.browserstack.com/automate/capabilities) اختیاری را به عنوان کلید/مقدار در قابلیت‌های هر مرورگر وارد کنید. اگر `browserstack.debug` را `true` تنظیم کنید، یک ضبط صفحه از جلسه را ثبت می‌کند که ممکن است مفید باشد.

### آزمون محلی

اگر می‌خواهید آزمون‌ها را در برابر سروری که برای اینترنت قابل دسترسی نیست (مانند `localhost`) اجرا کنید، باید از [آزمون محلی](https://www.browserstack.com/local-testing#command-line) استفاده کنید.

پشتیبانی از این مورد خارج از محدوده WebdriverIO است، بنابراین باید خودتان آن را راه‌اندازی کنید.

اگر از حالت محلی استفاده می‌کنید، باید `browserstack.local` را در قابلیت‌های خود `true` تنظیم کنید.

اگر از آزمون‌گر WDIO استفاده می‌کنید، [`@wdio/browserstack-service`](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-browserstack-service) را دانلود کرده و در `wdio.conf.js` خود پیکربندی کنید. این کار به راه‌اندازی BrowserStack کمک می‌کند و با ویژگی‌های اضافی همراه است که آزمون‌های شما را بهتر در سرویس BrowserStack ادغام می‌کند.

### با Travis CI

اگر می‌خواهید آزمون محلی را در Travis اضافه کنید، باید خودتان آن را راه‌اندازی کنید.

اسکریپت زیر آن را دانلود کرده و در پس‌زمینه راه‌اندازی می‌کند. باید این را قبل از شروع آزمون‌ها در Travis اجرا کنید.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

همچنین، ممکن است بخواهید `build` را به شماره ساخت Travis تنظیم کنید.

مثال `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

تنها نیاز، تنظیم `user` و `key` در پیکربندی شما (که یا توسط `wdio.conf.js` صادر شده یا به `webdriverio.remote(...)` منتقل شده است) به نام کاربری و کلید مخفی [TestingBot](https://testingbot.com) شما است.

همچنین می‌توانید هر [قابلیت پشتیبانی شده](https://testingbot.com/support/other/test-options) اختیاری را به عنوان کلید/مقدار در قابلیت‌های هر مرورگر وارد کنید.

### آزمون محلی

اگر می‌خواهید آزمون‌ها را در برابر سروری که برای اینترنت قابل دسترسی نیست (مانند `localhost`) اجرا کنید، باید از [آزمون محلی](https://testingbot.com/support/other/tunnel) استفاده کنید. TestingBot یک تونل مبتنی بر جاوا ارائه می‌دهد تا به شما اجازه دهد وب‌سایت‌هایی را آزمایش کنید که از اینترنت قابل دسترسی نیستند.

صفحه پشتیبانی تونل آنها حاوی اطلاعات لازم برای راه‌اندازی این مورد است.

اگر از آزمون‌گر WDIO استفاده می‌کنید، [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) را دانلود کرده و در `wdio.conf.js` خود پیکربندی کنید. این کار به راه‌اندازی TestingBot کمک می‌کند و با ویژگی‌های اضافی همراه است که آزمون‌های شما را بهتر در سرویس TestingBot ادغام می‌کند.

## LambdaTest

ادغام [LambdaTest](https://www.lambdatest.com) نیز داخلی است.

تنها نیاز، تنظیم `user` و `key` در پیکربندی شما (که یا توسط `wdio.conf.js` صادر شده یا به `webdriverio.remote(...)` منتقل شده است) به نام کاربری حساب LambdaTest و کلید دسترسی شما است.

همچنین می‌توانید هر [قابلیت پشتیبانی شده](https://www.lambdatest.com/capabilities-generator/) اختیاری را به عنوان کلید/مقدار در قابلیت‌های هر مرورگر وارد کنید. اگر `visual` را `true` تنظیم کنید، یک ضبط صفحه از جلسه را ثبت می‌کند که ممکن است مفید باشد.

### تونل برای آزمون محلی

اگر می‌خواهید آزمون‌ها را در برابر سروری که برای اینترنت قابل دسترسی نیست (مانند `localhost`) اجرا کنید، باید از [آزمون محلی](https://www.lambdatest.com/support/docs/testing-locally-hosted-pages/) استفاده کنید.

پشتیبانی از این مورد خارج از محدوده WebdriverIO است، بنابراین باید خودتان آن را راه‌اندازی کنید.

اگر از حالت محلی استفاده می‌کنید، باید `tunnel` را در قابلیت‌های خود `true` تنظیم کنید.

اگر از آزمون‌گر WDIO استفاده می‌کنید، [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) را دانلود کرده و در `wdio.conf.js` خود پیکربندی کنید. این کار به راه‌اندازی LambdaTest کمک می‌کند و با ویژگی‌های اضافی همراه است که آزمون‌های شما را بهتر در سرویس LambdaTest ادغام می‌کند.

### با Travis CI

اگر می‌خواهید آزمون محلی را در Travis اضافه کنید، باید خودتان آن را راه‌اندازی کنید.

اسکریپت زیر آن را دانلود کرده و در پس‌زمینه راه‌اندازی می‌کند. باید این را قبل از شروع آزمون‌ها در Travis اجرا کنید.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

همچنین، ممکن است بخواهید `build` را به شماره ساخت Travis تنظیم کنید.

مثال `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

هنگام استفاده از wdio با [`Perfecto`](https://www.perfecto.io)، باید یک توکن امنیتی برای هر کاربر ایجاد کرده و آن را در ساختار قابلیت‌ها (علاوه بر سایر قابلیت‌ها) به شرح زیر اضافه کنید:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

علاوه بر این، باید پیکربندی ابری را به شرح زیر اضافه کنید:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```