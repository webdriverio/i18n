---
id: wdio-reportportal-reporter
title: مراسل بوابة التقارير
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-reporter هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى زيارة [GitHub](https://github.com/borisosipov/wdio-reportportal-reporter) | [npm](https://www.npmjs.com/package/wdio-reportportal-reporter)


![npm](https://img.shields.io/npm/v/wdio-reportportal-reporter)
![npm](https://img.shields.io/npm/dm/wdio-reportportal-reporter)
> وحدة إضافية لمراسل WebdriverIO لإرسال النتائج إلى Report Portal([http://reportportal.io/](http://reportportal.io/)).

## التثبيت

الطريقة الأسهل هي إبقاء `wdio-reportportal-reporter` و `wdio-reportportal-service` كتبعيات تطوير في ملف `package.json` الخاص بك.

```json
{
  "devDependencies": {
    "wdio-reportportal-reporter": "^7.0.0",
    "wdio-reportportal-service": "^7.0.0"
  }
}
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا](https://webdriver.io/docs/gettingstarted.html).

## التكوين

قم بتكوين دليل الإخراج في ملف wdio.conf.js الخاص بك:

```js
const reportportal = require('wdio-reportportal-reporter');
const RpService = require("wdio-reportportal-service");

const conf = {
  reportPortalClientConfig: { // إعدادات بوابة التقارير
    token: '00000000-0000-0000-0000-00000000000',
    endpoint: 'https://reportportal-url/api/v1',
    launch: 'launch_name',
    project: 'project_name',
    mode: 'DEFAULT',
    debug: false,
    description: "Launch description text",
    attributes: [{key:"tag", value: "foo"}],
    headers: {"foo": "bar"}, // رؤوس اختيارية لعميل http الداخلي
    restClientConfig: { // تكوين عميل http مثل axios - https://github.com/axios/axios#request-config
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
  reportSeleniumCommands: false, // إضافة أوامر سيلينيوم إلى السجل
  seleniumCommandsLogLevel: 'debug', // مستوى السجل لأوامر سيلينيوم
  autoAttachScreenshots: false, // إرفاق لقطات الشاشة تلقائيًا
  screenshotsLogLevel: 'info', // مستوى السجل للقطات الشاشة
  parseTagsFromTestTitle: false, // تحليل السلاسل مثل `@foo` من العناوين وإضافتها إلى Report Portal
  cucumberNestedSteps: false, // تقرير خطوات cucumber كخطوات Report Portal
  autoAttachCucumberFeatureToScenario: false, // يتطلب أن يكون cucumberNestedSteps صحيحًا للاستخدام
  sanitizeErrorMessages: true, // إزالة أحرف ascii الملونة من تتبع الأخطاء
  sauceLabOptions : {
    enabled: true, // إضافة معرف SauseLab إلى علامات rp تلقائيًا.
    sldc: "US" // إضافة منطقة SauseLab إلى علامات rp تلقائيًا.
  }
};

exports.config = {
  // ...
  services: [[RpService, {}]],
  reporters: [[reportportal, conf]],
  // ...
};
```

# واجهة برمجة التطبيقات الإضافية

يمكن الوصول إلى طرق واجهة برمجة التطبيقات باستخدام:

```js
const reporter = require('wdio-reportportal-reporter')
```

### وصف الطرق

* `reporter.addAttribute({key, value})` – إضافة سمة إلى الاختبار الحالي.
  * `key` (*string*, اختياري) - مفتاح السمة. يجب أن تكون سلسلة غير فارغة.
  * `value` (*string*, مطلوب) - قيمة السمة. يجب أن تكون سلسلة غير فارغة.
* `reporter.addAttributeToCurrentSuite({key, value})` - إضافة سمة إلى المجموعة الحالية.
  * `key` (*string*, اختياري) - مفتاح السمة. يجب أن تكون سلسلة غير فارغة.
  * `value` (*string*, مطلوب) - قيمة السمة. يجب أن تكون سلسلة غير فارغة.
* `reporter.addDescriptionToCurrentSuite(description)` - إضافة وصف إلى المجموعة الحالية.
  * `description` (*string*) - محتوى الوصف. يمكن تنسيق النص باستخدام markdown.
* `reporter.addDescriptionToAllSuites(description)` - إضافة وصف إلى جميع المجموعات القادمة. (استخدمه في before all hook، بحيث تحصل كل مجموعة على نفس الوصف)
  * `description` (*string*) - محتوى الوصف. يمكن تنسيق النص باستخدام markdown.
* `reporter.sendLog(level, message)` – إرسال سجل إلى المجموعة الحالية\عنصر الاختبار.
  * `level` (*string*) - مستوى السجل. القيم ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*) – محتوى رسالة السجل.
* `reporter.sendFile(level, name, content, [type])` – إرسال ملف إلى المجموعة الحالية\عنصر الاختبار.
  * `level` (*string*) - مستوى السجل. القيم ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*) – اسم الملف.
  * `content` (*string*) – محتوى المرفق
  * `type` (*string*, اختياري) – نوع MIME للمرفق، الافتراضي هو `image/png`
  * `message` (*string*) – محتوى رسالة السجل.
* `reporter.sendLogToTest(test, level, message)` - إرسال سجل إلى اختبار محدد.
  * `test` (*object*) - كائن الاختبار من hook wdio `afterTest\afterStep`
  * `level` (*string*) - مستوى السجل. القيم ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*) – محتوى رسالة السجل.
* `reporter.sendFileToTest(test, level, name, content, [type])` – إرسال ملف إلى اختبار محدد.
  * `test` (*object*) - كائن الاختبار من hook wdio `afterTest\afterStep`
  * `level` (*string*) - مستوى السجل. القيم ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*) – اسم الملف.
  * `content` (*string*) – محتوى المرفق
  * `type` (*string*, اختياري) – نوع MIME للمرفق، الافتراضي هو `image/png`
  * `message` (*string*) – محتوى رسالة السجل.

انتبه: `sendLog`\\`sendFile` يرسل السجل إلى **عنصر الاختبار النشط حاليًا**. هذا يعني إذا قمت بإرسال سجل بدون اختبار نشط (مثل من الخطافات أو على مستوى المجموعة) فلن يتم عرضه في واجهة مستخدم Report Portal.

الطرق `sendLogToTest`\\`sendFileToTest` مفيدة عندما تحتاج إلى إرسال لقطات شاشة أو سجلات إلى عنصر الاختبار الفاشل من hook wdio afterTest.

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

مثال WDIO Cucumber "5.14.3+" :

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

## الحصول على رابط إلى صفحة إطلاق واجهة مستخدم Report Portal

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    }
...
```

أو بطريقة أكثر تعقيدًا

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const protocol = 'http:';
        const hostname = 'example.com';
        const port = ':8080'; // أو سلسلة فارغة للمنافذ الافتراضية 80/443
        const link = await RpService.getLaunchUrlByParams(protocol, hostname, port, config);
        console.log(`Report portal link ${link}`)
    }
...
```

## الإبلاغ عن الاختبار إلى إطلاق موجود

إذا كنت ترغب في الإبلاغ عن اختبار لإطلاق نشط موجود، يمكنك تمريره إلى المراسل من خلال متغير البيئة `REPORT_PORTAL_LAUNCH_ID`
أنت مسؤول عن إنهاء الإطلاق وكذلك بدء هذا الإطلاق.

```sh
export REPORT_PORTAL_LAUNCH_ID=SomeLaunchId
npm run wdio
```

## الترخيص

هذا المشروع مرخص بموجب ترخيص MIT - راجع ملف [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-reporter/blob/master/LICENSE) للحصول على التفاصيل