---
id: wdio-delta-reporter-service
title: گزارشگر دلتا ریپورتر
custom_edit_url: https://github.com/delta-reporter/delta-reporter-wdio/edit/master/README.md
---


> wdio-delta-reporter-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/delta-reporter/delta-reporter-wdio) | [npm](https://www.npmjs.com/package/@delta-reporter/wdio-delta-reporter-service) مراجعه کنید




> یک افزونه گزارش‌دهنده WebdriverIO برای ایجاد [گزارش‌های دلتا](https://github.com/delta-reporter/delta-reporter)


![Screenshot of Delta reporter](https://raw.githubusercontent.com/delta-reporter/delta-reporter-wdio/master/src/docs/delta-reporter.png)


## نصب


آسان‌ترین راه این است که `@delta-reporter/wdio-delta-reporter-service` را به عنوان یک devDependency در `package.json` خود نگه دارید.

```json
{
  "devDependencies": {
    "@delta-reporter/wdio-delta-reporter-service": "^1.1.9",
  }
}
```

شما می‌توانید به سادگی این کار را انجام دهید:

```bash
npm i @delta-reporter/wdio-delta-reporter-service
```

## پیکربندی


افزونه WebdriverIO دلتا ریپورتر ترکیبی از یک [سرویس WebdriverIO](https://github.com/webdriverio/webdriverio/tree/master/packages/webdriverio) و [گزارش‌دهنده](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-reporter) است، بنابراین باید به عنوان یک گزارش‌دهنده و یک سرویس در فایل پیکربندی اعلام شود.


```js
const DeltaReporter = require('@delta-reporter/wdio-delta-reporter-service/lib/src/reporter');
const DeltaService = require("@delta-reporter/wdio-delta-reporter-service");

let delta_config = {
  enabled: true,
  host: 'delta_host',
  project: 'Project Name',
  testType: 'Test Type'
};

exports.config = {
  // ...
  reporters: [
    [DeltaReporter, delta_config]
  ],
  // ...
  services: [new DeltaService(delta_config)],
  // ...
}
```


## افزودن تصاویر و ویدیوها

تصاویر را می‌توان با استفاده از دستور `sendFileToTest` در رویداد afterTest در فایل پیکربندی wdio به گزارش پیوست کرد. پارامترها عبارتند از `type`، `file` و `description`:
- `type`: می‌تواند `img` یا `video` باشد
- `file`: مسیر فایلی که باید آپلود شود
- `description`: مقدار اختیاری که در محفظه رسانه در دلتا ریپورتر نمایش داده می‌شود


همانطور که در مثال بالا نشان داده شده است، هنگامی که این تابع فراخوانی می‌شود و تست با شکست مواجه می‌شود، یک تصویر صفحه‌نمایش به گزارش دلتا پیوست می‌شود.


```js
 afterTest(test) {
    if (test.passed === false) {
      const file_name = 'screenshot.png';
      const outputFile = path.join(__dirname, file_name);

      browser.saveScreenshot(outputFile);
      browser.sendFileToTest('img', outputFile);
    }
  }
```


در زیر مثالی از تمام قطعات مورد نیاز در فایل پیکربندی wdio برای استفاده از این افزونه همراه با [گزارش‌دهنده ویدیو](https://github.com/presidenten/wdio-video-reporter) آمده است، به طوری که دلتا ریپورتر تصاویر و ویدیوهای تست‌های ناموفق را نشان می‌دهد:



```js
var path = require('path');
const fs = require('fs');
const video = require('wdio-video-reporter');
const DeltaReporter = require('@delta-reporter/wdio-delta-reporter-service/lib/src/reporter');
const DeltaService = require("@delta-reporter/wdio-delta-reporter-service");

// ...

function getLatestFile({ directory, extension }, callback) {
  fs.readdir(directory, (_, dirlist) => {
    const latest = dirlist
      .map(_path => ({ stat: fs.lstatSync(path.join(directory, _path)), dir: _path }))
      .filter(_path => _path.stat.isFile())
      .filter(_path => (extension ? _path.dir.endsWith(`.${extension}`) : 1))
      .sort((a, b) => b.stat.mtime - a.stat.mtime)
      .map(_path => _path.dir);
    callback(directory + '/' + latest[0]);
  });
}

let delta_config = {
  enabled: true,
  host: 'delta_host', // put your Delta Core url here
  project: 'Project Name', // Name of your project
  testType: 'Test Type' // eg., End to End, E2E, Frontend Acceptance Tests
};

// ...

exports.config = {
  // ...
  reporters: [
    [DeltaReporter, delta_config]
  ],
  // ...
  services: [new DeltaService(delta_config)],


  // ...


  afterTest(test) {
    if (test.passed === false) {
      const file_name = 'screenshot.png';
      const outputFile = path.join(__dirname, file_name);

      browser.saveScreenshot(outputFile);
      browser.sendFileToTest('img', outputFile);

      getLatestFile({ directory: browser.options.outputDir + '/_results_', extension: 'mp4' }, (filename = null) => {
        browser.sendFileToTest('video', filename, 'Video captured during test execution');
      });
    }
  }

  // ...

}
```

## استفاده

برای هر اجرای تست، افزونه دلتا به DELTA_LAUNCH_ID گوش می‌دهد. دو حالت اصلی وجود دارد:

- اجرای محلی: نیازی به انجام کاری نیست، می‌توانید به سادگی دستور wdio خود را اجرا کنید (`./node_modules/.bin/wdio ./wdio.conf.js`) و DELTA_LAUNCH_ID به طور خودکار برای شما تولید می‌شود، بنابراین نتایج آزمون شما در دلتا ریپورتر در زمان واقعی ظاهر می‌شود.

- اجرا در CI: اگر کار تست‌های شماست، باید DELTA_LAUNCH_ID را به عنوان یک پارامتر تعریف کنید. سپس داخل مرحله خود، باید آن را با فراخوانی یک نقطه پایانی `/api/v1/launch` مقداردهی اولیه کنید، سپس تست‌های خود را با افزودن `DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID}` در ابتدا اجرا کنید. مقداردهی اولیه یک بار انجام می‌شود، بنابراین وقتی چندین نوع تست را در یک ساخت اجرا می‌کنید (مثلاً، تست‌های UI، تست‌های API، تست‌های واحد)، این تست‌ها تحت یک "راه‌اندازی" در دلتا ریپورتر جمع‌آوری می‌شوند.

در زیر نمونه‌ای از کد برای فایل پیکربندی برای کار Jenkins آمده است:

```groovy
// ...
  parameters {
      string defaultValue: '', description: 'Launch ID sent by a pipeline, leave it blank', name: 'DELTA_LAUNCH_ID', trim: false
  }

// ...

  stage('Run WDIO tests') {
    environment {
      DELTA_LAUNCH_ID = ""
    }
    steps {
      container('jenkins-node-worker') {
        script {
          try {
            DELTA_LAUNCH_ID=sh(script: "curl -s --header \"Content-Type: application/json\" --request POST --data '{\"name\": \"${JOB_NAME} | ${BUILD_NUMBER} | Wdio Tests\", \"project\": \"Your project\"}' https://delta-core-url/api/v1/launch | python -c 'import sys, json; print(json.load(sys.stdin)[\"id\"])';", returnStdout: true)
          } catch (Exception e) {
              echo 'Couldn\'t start launch on Delta Reporter: ' + e
          }
          
          sh "DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID} TEST_TYPE='Frontend Acceptance Tests' ./node_modules/.bin/wdio ./wdio.conf.js"
        }
      }
    }  
  }
```

## ارسال داده‌های اضافی به دلتا ریپورتر

امکان ارسال داده‌های سفارشی برای نمایش در دلتا ریپورتر با استفاده از ویژگی SmartLinks وجود دارد.

برای این کار از دستورات `browser.sendDataToTest` یا `sendDataToTestRun` بسته به محلی که می‌خواهید این اطلاعات را نشان دهید، استفاده کنید

این روش‌ها یک شیء JSON شده را به عنوان آرگومان می‌پذیرند

مثالی از ادغام با [Spectre](https://github.com/wearefriday/spectre)

```ts
  beforeSuite() {
    try {
      let spectreTestRunURL = fs.readFileSync('./.spectre_test_run_url.json');
      let test_run_payload = {
        spectre_test_run_url: spectreTestRunURL.toString()
      };
      browser.sendDataToTestRun(test_run_payload);
    } catch {
      log.info('No Spectre URL found');
    }
  }
```

سپس در دلتا ریپورتر، یک SmartLink با `{spectre_test_run_url}` می‌تواند برای اجرای تست ایجاد شود

برای اطلاعات بیشتر در مورد SmartLinks، لطفاً به [مستندات دلتا ریپورتر](https://delta-reporter.github.io/delta-reporter/main_features/#smart-links) مراجعه کنید