---
id: wdio-delta-reporter-service
title: مراسل Delta Reporter
custom_edit_url: https://github.com/delta-reporter/delta-reporter-wdio/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-delta-reporter-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى مراجعة [GitHub](https://github.com/delta-reporter/delta-reporter-wdio) | [npm](https://www.npmjs.com/package/@delta-reporter/wdio-delta-reporter-service)




> ملحق تقارير WebdriverIO لإنشاء [تقارير Delta](https://github.com/delta-reporter/delta-reporter)


![لقطة شاشة لمراسل Delta](https://raw.githubusercontent.com/delta-reporter/delta-reporter-wdio/master/src/docs/delta-reporter.png)


## التثبيت


الطريقة الأسهل هي الاحتفاظ بـ `@delta-reporter/wdio-delta-reporter-service` كاعتماد تطوير في ملف `package.json` الخاص بك.

```json
{
  "devDependencies": {
    "@delta-reporter/wdio-delta-reporter-service": "^1.1.9",
  }
}
```

يمكنك القيام بذلك ببساطة عن طريق:

```bash
npm i @delta-reporter/wdio-delta-reporter-service
```

## التكوين


يتكون ملحق Delta reporter لـ WebdriverIO من مزيج بين [خدمة WebdriverIO](https://github.com/webdriverio/webdriverio/tree/master/packages/webdriverio) و[مراسل](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-reporter)، لذلك يجب تعريفه كمراسل وكخدمة في ملف التكوين.


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


## إضافة لقطات الشاشة والفيديوهات

يمكن إرفاق لقطات الشاشة بالتقرير باستخدام أمر `sendFileToTest` في خطاف afterTest في ملف تكوين wdio. المعلمات هي `type` و `file` و `description`:
- `type`: يمكن أن يكون `img` أو `video`
- `file`: المسار إلى الملف المراد تحميله
- `description`: قيمة اختيارية ستظهر في حاوية الوسائط في Delta Reporter


كما هو موضح في المثال أعلاه، عند استدعاء هذه الوظيفة، وفشل الاختبار، سيتم إرفاق صورة لقطة الشاشة بتقرير Delta.


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


فيما يلي مثال على جميع الأجزاء المطلوبة في ملف تكوين wdio لاستخدام هذا الملحق إلى جانب [Video Reporter](https://github.com/presidenten/wdio-video-reporter)، بحيث يعرض Delta Reporter لقطات الشاشة ومقاطع الفيديو للاختبارات الفاشلة:



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
  host: 'delta_host', // ضع عنوان URL لـ Delta Core هنا
  project: 'Project Name', // اسم مشروعك
  testType: 'Test Type' // مثلاً، End to End, E2E, Frontend Acceptance Tests
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

## الاستخدام

لكل تشغيل اختبار، يستمع ملحق Delta إلى DELTA_LAUNCH_ID. هناك حالتان رئيسيتان:

- التشغيل المحلي: لا داعي للقيام بأي شيء، يمكنك فقط تشغيل أمر wdio الخاص بك (`./node_modules/.bin/wdio ./wdio.conf.js`) وسيتم إنشاء DELTA_LAUNCH_ID تلقائيًا لك، بحيث تظهر نتائج الاختبار في Delta Reporter في الوقت الفعلي.

- تشغيل CI: إذا كانت مهمة اختباراتك، ستحتاج إلى تعريف DELTA_LAUNCH_ID كمعلمة. ثم داخل المرحلة الخاصة بك، ستحتاج إلى تهيئتها من خلال استدعاء نقطة النهاية `/api/v1/launch`، ثم تشغيل اختباراتك باستخدام `DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID}` مُسبقًا. تتم التهيئة مرة واحدة، لذلك عند تشغيل أنواع اختبار متعددة في نفس البناء (مثل اختبارات واجهة المستخدم واختبارات API واختبارات الوحدة)، يتم تجميع هذه الاختبارات تحت "إطلاق" واحد على Delta Reporter.

فيما يلي مثال على رمز لملف التكوين لوظيفة Jenkins:

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

## إرسال بيانات إضافية إلى Delta Reporter

من الممكن إرسال بيانات مخصصة لعرضها في Delta Reporter باستخدام ميزة SmartLinks.

لهذا استخدم الأوامر `browser.sendDataToTest` أو `sendDataToTestRun`، اعتمادًا على المكان الذي تريد إظهار هذه المعلومات فيه

تقبل هذه الطرق كائن jsonify كوسيطة

مثال على التكامل مع [Spectre](https://github.com/wearefriday/spectre)

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

ثم في Delta Reporter، يمكن إنشاء SmartLink مع `{spectre_test_run_url}` لتشغيل الاختبار

لمزيد من المعلومات حول الروابط الذكية، يرجى مراجعة [وثائق Delta Reporter](https://delta-reporter.github.io/delta-reporter/main_features/#smart-links)