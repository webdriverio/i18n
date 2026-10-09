---
id: cloudservices
title: استفاده از سرویس‌های ابری
description: "اجرای تست‌های WebdriverIO روی Sauce Labs، BrowserStack، TestingBot، TestMu AI (که قبلاً LambdaTest نام داشت)، Perfecto و سایر ارائه‌دهندگان ابری."
---

استفاده از سرویس‌های درخواستی (on-demand) مانند Sauce Labs، Browserstack، TestingBot، TestMu AI (که قبلاً LambdaTest نام داشت) یا Perfecto همراه با WebdriverIO بسیار ساده است. تنها کاری که باید انجام دهید این است که `user` و `key` سرویس خود را در تنظیمات (options) خود قرار دهید.

به‌صورت اختیاری، می‌توانید تست خود را با تنظیم قابلیت‌های (capabilities) مخصوص سرویس ابری مانند `build` پارامتری کنید. اگر فقط می‌خواهید سرویس‌های ابری را در Travis اجرا کنید، می‌توانید از متغیر محیطی `CI` برای بررسی اینکه آیا در Travis هستید استفاده کرده و پیکربندی را بر اساس آن تغییر دهید.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

می‌توانید تست‌های خود را طوری تنظیم کنید که از راه دور در [Sauce Labs](https://saucelabs.com) اجرا شوند.

تنها الزام این است که `user` و `key` را در پیکربندی خود (چه از طریق export در `wdio.conf.js` و چه با ارسال به `webdriverio.remote(...)`) برابر با نام کاربری و کلید دسترسی Sauce Labs خود قرار دهید.

همچنین می‌توانید هر [گزینه پیکربندی تست](https://docs.saucelabs.com/dev/test-configuration-options/) اختیاری را به‌صورت کلید/مقدار در capabilities هر مرورگر ارسال کنید.

### Sauce Connect

اگر می‌خواهید تست‌ها را روی سروری اجرا کنید که از اینترنت قابل دسترسی نیست (مانند `localhost`)، باید از [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy) استفاده کنید.

پشتیبانی از این مورد خارج از حیطه WebdriverIO است، بنابراین باید خودتان آن را راه‌اندازی کنید.

اگر از WDIO testrunner استفاده می‌کنید، [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) را دانلود کرده و در `wdio.conf.js` خود پیکربندی کنید. این سرویس به راه‌اندازی Sauce Connect کمک می‌کند و ویژگی‌های اضافی دارد که تست‌های شما را بهتر با سرویس Sauce یکپارچه می‌کند.

### با Travis CI

با این حال، Travis CI برای راه‌اندازی Sauce Connect پیش از هر تست [پشتیبانی دارد](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect)، بنابراین پیروی از دستورالعمل‌های آن‌ها یک گزینه است.

اگر این کار را انجام دهید، باید گزینه پیکربندی تست `tunnel-identifier` را در `capabilities` هر مرورگر تنظیم کنید. Travis به‌طور پیش‌فرض این مقدار را برابر با متغیر محیطی `TRAVIS_JOB_NUMBER` قرار می‌دهد.

همچنین، اگر می‌خواهید Sauce Labs تست‌های شما را بر اساس شماره build گروه‌بندی کند، می‌توانید `build` را برابر با `TRAVIS_BUILD_NUMBER` قرار دهید.

در نهایت، اگر `name` را تنظیم کنید، نام این تست در Sauce Labs برای این build تغییر می‌کند. اگر از WDIO testrunner همراه با [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) استفاده می‌کنید، WebdriverIO به‌طور خودکار نام مناسبی برای تست تعیین می‌کند.

نمونه `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### مهلت‌های زمانی (Timeouts)

از آنجا که تست‌های خود را از راه دور اجرا می‌کنید، ممکن است لازم باشد برخی از مهلت‌های زمانی را افزایش دهید.

می‌توانید [مهلت زمانی بیکاری](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) را با ارسال `idle-timeout` به‌عنوان یک گزینه پیکربندی تست تغییر دهید. این گزینه کنترل می‌کند که Sauce چه مدت بین دستورات منتظر بماند تا اتصال را ببندد.

## BrowserStack

WebdriverIO همچنین یکپارچگی داخلی با [Browserstack](https://www.browserstack.com) دارد.

تنها الزام این است که `user` و `key` را در پیکربندی خود (چه از طریق export در `wdio.conf.js` و چه با ارسال به `webdriverio.remote(...)`) برابر با نام کاربری و کلید دسترسی Browserstack automate خود قرار دهید.

همچنین می‌توانید هر یک از [قابلیت‌های پشتیبانی‌شده](https://www.browserstack.com/automate/capabilities) اختیاری را به‌صورت کلید/مقدار در capabilities هر مرورگر ارسال کنید. اگر `browserstack.debug` را برابر با `true` قرار دهید، یک ویدیوی ضبط‌شده از صفحه (screencast) از جلسه تهیه می‌شود که ممکن است مفید باشد.

### تست محلی (Local Testing)

اگر می‌خواهید تست‌ها را روی سروری اجرا کنید که از اینترنت قابل دسترسی نیست (مانند `localhost`)، باید از [Local Testing](https://www.browserstack.com/local-testing#command-line) استفاده کنید.

پشتیبانی از این مورد خارج از حیطه WebdriverIO است، بنابراین باید خودتان آن را راه‌اندازی کنید.

اگر از حالت محلی استفاده می‌کنید، باید `browserstack.local` را در capabilities خود برابر با `true` قرار دهید.

اگر از WDIO testrunner استفاده می‌کنید، [`@wdio/browserstack-service`](https://github.com/browserstack/wdio-browserstack-service) را دانلود کرده و در `wdio.conf.js` خود پیکربندی کنید. این سرویس به راه‌اندازی BrowserStack کمک می‌کند و ویژگی‌های اضافی دارد که تست‌های شما را بهتر با سرویس BrowserStack یکپارچه می‌کند.

### با Travis CI

اگر می‌خواهید Local Testing را در Travis اضافه کنید، باید خودتان آن را راه‌اندازی کنید.

اسکریپت زیر آن را دانلود کرده و در پس‌زمینه اجرا می‌کند. باید این اسکریپت را پیش از شروع تست‌ها در Travis اجرا کنید.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

همچنین، ممکن است بخواهید `build` را برابر با شماره build در Travis قرار دهید.

نمونه `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

تنها الزام این است که `user` و `key` را در پیکربندی خود (چه از طریق export در `wdio.conf.js` و چه با ارسال به `webdriverio.remote(...)`) برابر با نام کاربری و کلید محرمانه [TestingBot](https://testingbot.com) خود قرار دهید.

همچنین می‌توانید هر یک از [قابلیت‌های پشتیبانی‌شده](https://testingbot.com/support/other/test-options) اختیاری را به‌صورت کلید/مقدار در capabilities هر مرورگر ارسال کنید.

### تست محلی (Local Testing)

اگر می‌خواهید تست‌ها را روی سروری اجرا کنید که از اینترنت قابل دسترسی نیست (مانند `localhost`)، باید از [Local Testing](https://testingbot.com/support/other/tunnel) استفاده کنید. TestingBot یک تونل مبتنی بر Java ارائه می‌دهد که به شما امکان می‌دهد وب‌سایت‌هایی را که از اینترنت قابل دسترسی نیستند تست کنید.

صفحه پشتیبانی تونل آن‌ها حاوی اطلاعات لازم برای راه‌اندازی و اجرای آن است.

اگر از WDIO testrunner استفاده می‌کنید، [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) را دانلود کرده و در `wdio.conf.js` خود پیکربندی کنید. این سرویس به راه‌اندازی TestingBot کمک می‌کند و ویژگی‌های اضافی دارد که تست‌های شما را بهتر با سرویس TestingBot یکپارچه می‌کند.

## TestMu AI (که قبلاً LambdaTest نام داشت)

یکپارچگی با [TestMu AI](https://www.testmuai.com/) نیز به‌صورت داخلی وجود دارد.

تنها الزام این است که `user` و `key` را در پیکربندی خود (چه از طریق export در `wdio.conf.js` و چه با ارسال به `webdriverio.remote(...)`) برابر با نام کاربری و کلید دسترسی حساب TestMu AI خود قرار دهید.

همچنین می‌توانید هر یک از [قابلیت‌های پشتیبانی‌شده](https://www.testmuai.com/capabilities-generator/) اختیاری را به‌صورت کلید/مقدار در capabilities هر مرورگر ارسال کنید. اگر `visual` را برابر با `true` قرار دهید، یک ویدیوی ضبط‌شده از صفحه (screencast) از جلسه تهیه می‌شود که ممکن است مفید باشد.

### تونل برای تست محلی

اگر می‌خواهید تست‌ها را روی سروری اجرا کنید که از اینترنت قابل دسترسی نیست (مانند `localhost`)، باید از [Local Testing](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/) استفاده کنید.

پشتیبانی از این مورد خارج از حیطه WebdriverIO است، بنابراین باید خودتان آن را راه‌اندازی کنید.

اگر از حالت محلی استفاده می‌کنید، باید `tunnel` را در capabilities خود برابر با `true` قرار دهید.

اگر از WDIO testrunner استفاده می‌کنید، [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) را دانلود کرده و در `wdio.conf.js` خود پیکربندی کنید. این سرویس به راه‌اندازی TestMu AI کمک می‌کند و ویژگی‌های اضافی دارد که تست‌های شما را بهتر با سرویس TestMu AI یکپارچه می‌کند.

### با Travis CI

اگر می‌خواهید Local Testing را در Travis اضافه کنید، باید خودتان آن را راه‌اندازی کنید.

اسکریپت زیر آن را دانلود کرده و در پس‌زمینه اجرا می‌کند. باید این اسکریپت را پیش از شروع تست‌ها در Travis اجرا کنید.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

همچنین، ممکن است بخواهید `build` را برابر با شماره build در Travis قرار دهید.

نمونه `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

هنگام استفاده از wdio همراه با [`Perfecto`](https://www.perfecto.io)، باید برای هر کاربر یک توکن امنیتی ایجاد کرده و آن را (علاوه بر سایر capabilities) به ساختار capabilities اضافه کنید، به این صورت:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

علاوه بر این، باید پیکربندی ابری را اضافه کنید، به این صورت:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```

## RobotActions

[RobotActions](https://robotactions.com) دستگاه‌های واقعی Android و iOS را در کنار نودهای مرورگر، پشت یک endpoint واحد ارائه می‌دهد. احراز هویت در آن به‌جای جفت `user` و `key` با یک توکن API انجام می‌شود. توکن را به‌صورت یک هدر bearer ارسال کنید:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

به‌عنوان جایگزین، می‌توانید توکن را به‌صورت پیشوند مسیر (path prefix) ارسال کنید که grid پیش از ارسال درخواست آن را حذف می‌کند:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: `/t/${process.env.RA_API_TOKEN}/`,
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

grid همچنین برای سایر کلاینت‌های WebDriver، اعتبارنامه‌های جاسازی‌شده در URL (`https://user:token@host`) را می‌پذیرد، اما این شکل در WebdriverIO قابل استفاده نیست: WebdriverIO مبتنی بر fetch است و Node.js اعتبارنامه‌های جاسازی‌شده در URL را رد می‌کند.

برای اجرا روی یک دستگاه واقعی، مرورگر را به‌صورت یک capability مربوط به Appium همراه با هر یک از دو روش اتصال بالا ارسال کنید:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    platformName: 'Android',
    'appium:browserName': 'chrome',
    'appium:automationName': 'UiAutomator2'
  }]
}
```