---
id: wdio-delta-reporter-service
title: டெல்டா ரிப்போர்ட்டர் ரிப்போர்ட்டர்
custom_edit_url: https://github.com/delta-reporter/delta-reporter-wdio/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-delta-reporter-service என்பது ஒரு மூன்றாம் தரப்பு தொகுப்பு, மேலும் தகவலுக்கு [GitHub](https://github.com/delta-reporter/delta-reporter-wdio) | [npm](https://www.npmjs.com/package/@delta-reporter/wdio-delta-reporter-service) ஐப் பார்க்கவும்




> [Delta reports](https://github.com/delta-reporter/delta-reporter) உருவாக்க WebdriverIO ரிப்போர்ட்டர் செருகுநிரல்


![Screenshot of Delta reporter](https://raw.githubusercontent.com/delta-reporter/delta-reporter-wdio/master/src/docs/delta-reporter.png)


## நிறுவல்


எளிதான வழி `@delta-reporter/wdio-delta-reporter-service` ஐ உங்கள் `package.json` இல் devDependency ஆக வைத்திருப்பது.

```json
{
  "devDependencies": {
    "@delta-reporter/wdio-delta-reporter-service": "^1.1.9",
  }
}
```

நீங்கள் எளிதாக இதை செய்யலாம்:

```bash
npm i @delta-reporter/wdio-delta-reporter-service
```

## கட்டமைப்பு


டெல்டா ரிப்போர்ட்டர் WebdriverIO செருகுநிரல் ஒரு [WebdriverIO சேவை](https://github.com/webdriverio/webdriverio/tree/master/packages/webdriverio) மற்றும் [ரிப்போர்ட்டர்](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-reporter) இடையே கலவையாக உள்ளது, எனவே இது கட்டமைப்பு கோப்பில் ஒரு ரிப்போர்ட்டர் மற்றும் சேவையாக அறிவிக்கப்பட வேண்டும்.


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


## ஸ்கிரீன்ஷாட்கள் மற்றும் வீடியோக்களைச் சேர்க்கவும்

ஸ்கிரீன்ஷாட்கள் wdio கட்டமைப்பு கோப்பில் afterTest ஹூக்கில் `sendFileToTest` கட்டளையைப் பயன்படுத்தி அறிக்கைக்கு இணைக்கப்படலாம். அளவுருக்கள் `type`, `file` மற்றும் `description`:
- `type`: `img` அல்லது `video` ஆக இருக்கலாம்
- `file`: பதிவேற்ற வேண்டிய கோப்பின் பாதை
- `description`: டெல்டா ரிப்போர்ட்டரில் மீடியா கொள்கலனில் காட்டப்படும் விருப்ப மதிப்பு


மேலே காட்டப்பட்டுள்ளபடி, இந்த செயல்பாட்டை அழைக்கும்போது, மற்றும் சோதனை தோல்வியடையும்போது, ஒரு ஸ்கிரீன்ஷாட் படம் டெல்டா அறிக்கைக்கு இணைக்கப்படும்.


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


கீழே உள்ளது இந்த செருகுநிரலை [Video Reporter](https://github.com/presidenten/wdio-video-reporter) உடன் இணைத்து பயன்படுத்த wdio கட்டமைப்பு கோப்பில் தேவையான அனைத்து பகுதிகளின் எடுத்துக்காட்டு, இதனால் டெல்டா ரிப்போர்ட்டர் தோல்வியடைந்த சோதனைகளின் ஸ்கிரீன்ஷாட்கள் மற்றும் வீடியோக்களைக் காட்டுகிறது:



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

## பயன்பாடு

ஒவ்வொரு சோதனை இயக்கத்திற்கும், டெல்டா செருகுநிரல் DELTA_LAUNCH_ID ஐக் கேட்டுக்கொண்டிருக்கிறது. இரண்டு முக்கிய சந்தர்ப்பங்கள் உள்ளன:

- உள்ளூர் இயக்கம்: எதுவும் செய்ய தேவையில்லை, நீங்கள் உங்கள் wdio கட்டளையை இயக்கலாம் (`./node_modules/.bin/wdio ./wdio.conf.js`) மற்றும் DELTA_LAUNCH_ID தானாகவே உங்களுக்காக உருவாக்கப்படும், எனவே உங்கள் சோதனை முடிவுகள் டெல்டா ரிப்போர்ட்டரில் நிகழ்நேரத்தில் தோன்றும்.

- CI இயக்கம்: இது உங்கள் சோதனைகள் வேலையாக இருந்தால், DELTA_LAUNCH_ID ஐ ஒரு அளவுருவாக வரையறுக்க வேண்டும். பின்னர் உங்கள் நிலையின் உள்ளே `/api/v1/launch` முனைப்பை அழைப்பதன் மூலம் அதை துவக்க வேண்டும், பின்னர் உங்கள் சோதனைகளை `DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID}` முன்கூட்டியே இணைத்து இயக்க வேண்டும். இந்த துவக்கம் ஒரு முறை மட்டுமே செய்யப்படுகிறது, எனவே நீங்கள் ஒரே கட்டுமானத்தில் பல சோதனை வகைகளை இயக்கும்போது (எ.கா. UI சோதனைகள், API சோதனைகள், யூனிட் சோதனைகள்), அந்த சோதனைகள் டெல்டா ரிப்போர்ட்டரில் ஒரு "Launch" இன் கீழ் சேகரிக்கப்படுகின்றன.

கீழே Jenkins வேலைக்கான கட்டமைப்பு கோப்புக்கான குறியீட்டின் எடுத்துக்காட்டு உள்ளது:

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

## டெல்டா ரிப்போர்ட்டருக்கு கூடுதல் தரவு அனுப்புதல்

SmartLinks அம்சத்தைப் பயன்படுத்தி டெல்டா ரிப்போர்ட்டரில் காட்டப்படும் தனிப்பயன் தரவை அனுப்புவது சாத்தியமாகும்.

இதற்கு `browser.sendDataToTest` அல்லது `sendDataToTestRun` கட்டளைகளைப் பயன்படுத்தவும், இந்த தகவலைக் காட்ட விரும்பும் இடத்தைப் பொறுத்து

இந்த முறைகள் ஒரு jsonify அறிவிப்பை உறுப்பாக ஏற்றுக்கொள்கின்றன

[Spectre](https://github.com/wearefriday/spectre) உடன் ஒருங்கிணைப்பின் எடுத்துக்காட்டு

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

பின்னர் டெல்டா ரிப்போர்ட்டரில், `{spectre_test_run_url}` உடன் ஒரு SmartLink சோதனை இயக்கத்திற்காக உருவாக்கப்படலாம்

ஸ்மார்ட் லிங்க்ஸ் பற்றிய மேலும் தகவலுக்கு, [Delta Reporter docs](https://delta-reporter.github.io/delta-reporter/main_features/#smart-links) ஐப் பார்க்கவும்