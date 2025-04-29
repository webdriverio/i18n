---
id: wdio-delta-reporter-service
title: डेल्टा रिपोर्टर रिपोर्टर
custom_edit_url: https://github.com/delta-reporter/delta-reporter-wdio/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-delta-reporter-service एक तृतीय पक्ष पैकेज है, अधिक जानकारी के लिए कृपया देखें [GitHub](https://github.com/delta-reporter/delta-reporter-wdio) | [npm](https://www.npmjs.com/package/@delta-reporter/wdio-delta-reporter-service)




> [Delta reports](https://github.com/delta-reporter/delta-reporter) बनाने के लिए एक WebdriverIO रिपोर्टर प्लगइन


![Screenshot of Delta reporter](https://raw.githubusercontent.com/delta-reporter/delta-reporter-wdio/master/src/docs/delta-reporter.png)


## Installation


सबसे आसान तरीका है `@delta-reporter/wdio-delta-reporter-service` को अपने `package.json` में devDependency के रूप में रखना।

```json
{
  "devDependencies": {
    "@delta-reporter/wdio-delta-reporter-service": "^1.1.9",
  }
}
```

आप इसे आसानी से इस प्रकार कर सकते हैं:

```bash
npm i @delta-reporter/wdio-delta-reporter-service
```

## Configuration


डेल्टा रिपोर्टर WebdriverIO प्लगइन एक [WebdriverIO Service](https://github.com/webdriverio/webdriverio/tree/master/packages/webdriverio) और [Reporter](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-reporter) के मिश्रण से बना है, इसलिए इसे कॉन्फिग फाइल में रिपोर्टर और सेवा के रूप में घोषित किया जाना चाहिए।


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


## Add screenshots and videos

स्क्रीनशॉट को रिपोर्ट से जोड़ा जा सकता है, wdio कॉन्फिग फाइल में afterTest हुक में `sendFileToTest` कमांड का उपयोग करके। पैरामीटर हैं `type`, `file` और `description`:
- `type`: `img` या `video` हो सकता है
- `file`: अपलोड की जाने वाली फ़ाइल का पथ
- `description`: वैकल्पिक मान जो डेल्टा रिपोर्टर में मीडिया कंटेनर में प्रदर्शित होगा


जैसा कि ऊपर दिए गए उदाहरण में दिखाया गया है, जब इस फंक्शन को कॉल किया जाता है, और टेस्ट फेल हो रहा है, तो डेल्टा रिपोर्ट में एक स्क्रीनशॉट इमेज अटैच की जाएगी।


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


नीचे wdio कॉन्फिग फाइल में इस प्लगइन के साथ [Video Reporter](https://github.com/presidenten/wdio-video-reporter) का उपयोग करने के लिए आवश्यक सभी टुकड़ों का एक उदाहरण दिया गया है, ताकि डेल्टा रिपोर्टर असफल परीक्षणों के स्क्रीनशॉट और वीडियो दिखा रहा हो:



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

## Usage

प्रत्येक परीक्षण चलाने के लिए, डेल्टा प्लगइन DELTA_LAUNCH_ID सुन रहा है। दो मुख्य मामले हैं:

- स्थानीय रन: कुछ भी करने की आवश्यकता नहीं है, आप बस अपना wdio कमांड चला सकते हैं (`./node_modules/.bin/wdio ./wdio.conf.js`) और DELTA_LAUNCH_ID आपके लिए स्वचालित रूप से उत्पन्न किया जाएगा, ताकि आपके परीक्षण परिणाम डेल्टा रिपोर्टर में रीयल टाइम में दिखाई दें।

- CI रन: अगर यह आपका टेस्ट जॉब है, तो आपको DELTA_LAUNCH_ID को पैरामीटर के रूप में परिभाषित करना होगा। फिर अपने स्टेज के अंदर आपको `/api/v1/launch` एंडपॉइंट को कॉल करके इसे इनिशियलाइज़ करना होगा, फिर अपने टेस्ट को `DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID}` पूर्व-उपसर्ग के साथ चलाना होगा। इनिशियलाइजेशन एक बार किया जाता है, इसलिए जब आप एक ही बिल्ड में कई टेस्ट प्रकार चला रहे हों (जैसे, UI टेस्ट, API टेस्ट, यूनिट टेस्ट), वे टेस्ट डेल्टा रिपोर्टर पर एक "लॉन्च" के अंतर्गत एकत्रित किए जाते हैं।

नीचे Jenkins जॉब के लिए कॉन्फिग फाइल के कोड का एक उदाहरण दिया गया है:

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

## Sending extra data to Delta Reporter

SmartLinks फीचर का उपयोग करके डेल्टा रिपोर्टर में प्रदर्शित करने के लिए कस्टम डेटा भेजना संभव है।

इसके लिए `browser.sendDataToTest` या `sendDataToTestRun` कमांड का उपयोग करें, जो इस बात पर निर्भर करता है कि आप इस जानकारी को कहां दिखाना चाहते हैं

ये मेथड आर्गुमेंट के रूप में एक jsonify ऑब्जेक्ट स्वीकार करते हैं

[Spectre](https://github.com/wearefriday/spectre) के साथ एकीकरण का उदाहरण

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

फिर डेल्टा रिपोर्टर पर, टेस्ट रन के लिए `{spectre_test_run_url}` के साथ एक SmartLink बनाया जा सकता है

स्मार्ट लिंक्स के बारे में अधिक जानकारी के लिए, कृपया [Delta Reporter docs](https://delta-reporter.github.io/delta-reporter/main_features/#smart-links) देखें