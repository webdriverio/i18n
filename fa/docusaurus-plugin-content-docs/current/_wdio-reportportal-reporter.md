---
id: wdio-reportportal-reporter
title: گزارش‌دهنده پورتال گزارش
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-reporter/edit/master/README.md
---


> wdio-reportportal-reporter یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/borisosipov/wdio-reportportal-reporter) | [npm](https://www.npmjs.com/package/wdio-reportportal-reporter) مراجعه کنید


![npm](https://img.shields.io/npm/v/wdio-reportportal-reporter)
![npm](https://img.shields.io/npm/dm/wdio-reportportal-reporter)
> یک افزونه گزارش‌دهنده WebdriverIO برای ارسال نتایج به Report Portal([http://reportportal.io/](http://reportportal.io/)).

## نصب

ساده‌ترین راه این است که `wdio-reportportal-reporter` و `wdio-reportportal-service` را به عنوان devDependency در `package.json` خود نگه دارید.

```json
{
  "devDependencies": {
    "wdio-reportportal-reporter": "^7.0.0",
    "wdio-reportportal-service": "^7.0.0"
  }
}
```

دستورالعمل‌های نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted.html) پیدا کنید.

## پیکربندی

دایرکتوری خروجی را در فایل wdio.conf.js خود پیکربندی کنید:

```js
const reportportal = require('wdio-reportportal-reporter');
const RpService = require("wdio-reportportal-service");

const conf = {
  reportPortalClientConfig: { // report portal settings
    token: '00000000-0000-0000-0000-00000000000',
    endpoint: 'https://reportportal-url/api/v1',
    launch: 'launch_name',
    project: 'project_name',
    mode: 'DEFAULT',
    debug: false,
    description: "Launch description text",
    attributes: [{key:"tag", value: "foo"}],
    headers: {"foo": "bar"}, // optional headers for internal http client
    restClientConfig: { // axios like http client config - https://github.com/axios/axios#request-config
      proxy: {
        protocol: 'https',
        host: '127.0.0.1',
        port: 9000,
        auth: {
          username: 'mikeymike',
          password: 'rapunz3l'
        }
      },
      timeout: 60000
    }
  },
  reportSeleniumCommands: false, // add selenium commands to log
  seleniumCommandsLogLevel: 'debug', // log level for selenium commands
  autoAttachScreenshots: false, // automatically add screenshots
  screenshotsLogLevel: 'info', // log level for screenshots
  parseTagsFromTestTitle: false, // parse strings like `@foo` from titles and add to Report Portal
  cucumberNestedSteps: false, // report cucumber steps as Report Portal steps
  autoAttachCucumberFeatureToScenario: false, // requires cucumberNestedSteps to be true for use
  sanitizeErrorMessages: true, // strip color ascii characters from error stacktrace
  sauceLabOptions : {
    enabled: true, // automatically add SauseLab ID to rp tags.
    sldc: "US" // automatically add SauseLab region to rp tags.
  }
};

exports.config = {
  // ...
  services: [[RpService, {}]],
  reporters: [[reportportal, conf]],
  // ...
};
```

# API های اضافی

متدهای API را می‌توان با استفاده از زیر دسترسی داشت:

```js
const reporter = require('wdio-reportportal-reporter')
```

### توضیحات متدها

* `reporter.addAttribute({key, value})` – اضافه کردن یک ویژگی به تست فعلی.
  * `key` (*string*, اختیاری) - کلید ویژگی. باید یک رشته غیر خالی باشد.
  * `value` (*string*, الزامی) - مقدار ویژگی. باید یک رشته غیر خالی باشد.
* `reporter.addAttributeToCurrentSuite({key, value})` - اضافه کردن یک ویژگی به سوئیت فعلی.
  * `key` (*string*, اختیاری) - کلید ویژگی. باید یک رشته غیر خالی باشد.
  * `value` (*string*, الزامی) - مقدار ویژگی. باید یک رشته غیر خالی باشد.
* `reporter.addDescriptionToCurrentSuite(description)` - اضافه کردن یک رشته به سوئیت فعلی.
  * `description` (*string*) - محتوای توضیحات. متن می‌تواند با مارک‌داون فرمت‌بندی شود.
* `reporter.addDescriptionToAllSuites(description)` - اضافه کردن یک رشته به تمام سوئیت‌های آینده. (از آن در قلاب before all استفاده کنید، تا هر سوئیت توضیحات یکسانی دریافت کند)
  * `description` (*string*) - محتوای توضیحات. متن می‌تواند با مارک‌داون فرمت‌بندی شود.
* `reporter.sendLog(level, message)` – ارسال لاگ به آیتم تست/سوئیت فعلی.
  * `level` (*string*) - سطح لاگ. مقادیر ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*) – محتوای پیام لاگ.
* `reporter.sendFile(level, name, content, [type])` – ارسال فایل به آیتم تست/سوئیت فعلی.
  * `level` (*string*) - سطح لاگ. مقادیر ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*) – نام فایل.
  * `content` (*string*) – محتوای پیوست
  * `type` (*string*, اختیاری) – نوع MIME پیوست، پیش‌فرض `image/png`
  * `message` (*string*) – محتوای پیام لاگ.
* `reporter.sendLogToTest(test, level, message)` - ارسال لاگ به تست خاص.
  * `test` (*object*) - شیء تست از قلاب wdio `afterTest\afterStep`
  * `level` (*string*) - سطح لاگ. مقادیر ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*) – محتوای پیام لاگ.
* `reporter.sendFileToTest(test, level, name, content, [type])` – ارسال فایل به تست خاص.
  * `test` (*object*) - شیء تست از قلاب wdio `afterTest\afterStep`
  * `level` (*string*) - سطح لاگ. مقادیر ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*) – نام فایل.
  * `content` (*string*) – محتوای پیوست
  * `type` (*string*, اختیاری) – نوع MIME پیوست، پیش‌فرض `image/png`
  * `message` (*string*) – محتوای پیام لاگ.

توجه داشته باشید: `sendLog`\\`sendFile` لاگ را به **آیتم تست در حال اجرای فعلی** ارسال می‌کند. این بدان معناست که اگر بدون تست فعال (مثلاً از قلاب‌ها یا در سطح سوئیت) لاگ ارسال کنید، در رابط کاربری Report Portal نمایش داده نخواهد شد.

متدهای `sendLogToTest`\\`sendFileToTest` زمانی مفید هستند که می‌خواهید اسکرین‌شات یا لاگ‌ها را به آیتم تست ناموفق از قلاب afterTest wdio ارسال کنید.

مثال Mocha:

```js
const reportportal = require('wdio-reportportal-reporter');
const path = require('path');
const fs = require('fs');

exports.config = {
...
  async afterTest(test) {
    if (test.passed === false) {
      const filename = "screnshot.png";
      const outputFile = path.join(__dirname, filename);
      await browser.saveScreenshot(outputFile);
      reportportal.sendFileToTest(test, 'info', filename, fs.readFileSync(outputFile));
    }
  }
...
```

مثال Jasmine:

```js
const reportportal = require('wdio-reportportal-reporter');
const path = require('path');
const fs = require('fs');

exports.config = {
...
  async afterTest(test) {
    if (test.passed === false) {
      const filename = "screnshot.png";
      const outputFile = path.join(__dirname, filename);
      await browser.saveScreenshot(outputFile);
      //!!
      Object.assign(test, {title: test.description}}
      reportportal.sendFileToTest(test, 'info', filename, fs.readFileSync(outputFile));
    }
  }
...
```

مثال WDIO Cucumber "5.14.3+":

```js
const reportportal = require('wdio-reportportal-reporter');

exports.config = {
...
   afterStep: async function (uri, feature, { error, result, duration, passed }, stepData, context) {
     if (!passed) {
        let failureObject = {};
        failureObject.type = 'afterStep';
        failureObject.error = error;
        failureObject.title = `${stepData.step.keyword}${stepData.step.text}`;
        const screenShot = await global.browser.takeScreenshot();
        let attachment = Buffer.from(screenShot, 'base64');
        reportportal.sendFileToTest(failureObject, 'error', "screnshot.png", attachment);
    }
  }
...
}
```

## دریافت لینک به صفحه اجرا در رابط کاربری Report Portal

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    }
...
```

یا روش پیچیده‌تر

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const protocol = 'http:';
        const hostname = 'example.com';
        const port = ':8080'; // or empty string for default 80/443 ports
        const link = await RpService.getLaunchUrlByParams(protocol, hostname, port, config);
        console.log(`Report portal link ${link}`)
    }
...
```

## گزارش تست به اجرای موجود

اگر می‌خواهید تست را به یک اجرای فعال موجود گزارش دهید، می‌توانید آن را از طریق متغیر محیطی `REPORT_PORTAL_LAUNCH_ID` به گزارش‌دهنده منتقل کنید.
شما مسئول اتمام اجرا و همچنین شروع چنین اجرایی هستید.

```sh
export REPORT_PORTAL_LAUNCH_ID=SomeLaunchId
npm run wdio
```

## مجوز

این پروژه تحت مجوز MIT است - برای جزئیات فایل [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-reporter/blob/master/LICENSE) را ببینید