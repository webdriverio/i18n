---
id: wdio-delta-reporter-service
title: Delta Reporter Reporter
custom_edit_url: https://github.com/delta-reporter/delta-reporter-wdio/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-delta-reporter-service är ett paket från tredje part, för mer information se [GitHub](https://github.com/delta-reporter/delta-reporter-wdio) | [npm](https://www.npmjs.com/package/@delta-reporter/wdio-delta-reporter-service)




> En WebdriverIO reporter-plugin för att skapa [Delta rapporter](https://github.com/delta-reporter/delta-reporter)


![Screenshot of Delta reporter](https://raw.githubusercontent.com/delta-reporter/delta-reporter-wdio/master/src/docs/delta-reporter.png)


## Installation


Det enklaste sättet är att behålla `@delta-reporter/wdio-delta-reporter-service` som en devDependency i din `package.json`.

```json
{
  "devDependencies": {
    "@delta-reporter/wdio-delta-reporter-service": "^1.1.9",
  }
}
```

Du kan enkelt göra det genom:

```bash
npm i @delta-reporter/wdio-delta-reporter-service
```

## Configuration


Delta reporter WebdriverIO-plugin består av en blandning mellan en [WebdriverIO Service](https://github.com/webdriverio/webdriverio/tree/master/packages/webdriverio) och [Reporter](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-reporter), så den måste deklareras som både reporter och service i konfigurationsfilen.


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

Skärmbilder kan bifogas till rapporten genom att använda kommandot `sendFileToTest` i afterTest-hook i wdio-konfigurationsfilen. Parametrarna är `type`, `file` och `description`:
- `type`: Kan vara `img` eller `video`
- `file`: Sökväg till filen som ska laddas upp
- `description`: Valfritt värde som kommer att visas i mediacontainern i Delta Reporter


Som visas i exemplet ovan, när den här funktionen anropas och testet misslyckas, kommer en skärmbild att bifogas till Delta-rapporten.


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


Nedan är ett exempel på alla delar som behövs i wdio-konfigurationsfilen för att använda denna plugin tillsammans med [Video Reporter](https://github.com/presidenten/wdio-video-reporter), så att Delta Reporter visar skärmbilder och videor från misslyckade tester:



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

För varje testkörning lyssnar Delta-pluginet efter DELTA_LAUNCH_ID. Det finns två huvudsakliga fall:

- Lokal körning: Du behöver inte göra något, du kan bara köra ditt wdio-kommando (`./node_modules/.bin/wdio ./wdio.conf.js`) och DELTA_LAUNCH_ID genereras automatiskt för dig, så dina testresultat visas i Delta Reporter i realtid.

- CI-körning: Om det är ditt testjobb måste du definiera DELTA_LAUNCH_ID som en parameter. Sedan måste du i din stage initialisera det genom att anropa slutpunkten `/api/v1/launch`, och sedan köra dina tester med `DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID}` före. Initialiseringen görs en gång, så när du kör flera testtyper i samma build (t.ex. UI-tester, API-tester, enhetstester), samlas dessa tester under en "Launch" i Delta Reporter.

Nedan är ett exempel på kod för konfigurationsfil för Jenkins-jobb:

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

Det är möjligt att skicka anpassade data som visas i Delta Reporter med hjälp av SmartLinks-funktionen.

För detta använd kommandona `browser.sendDataToTest` eller `sendDataToTestRun`, beroende på var du vill visa denna information

Dessa metoder accepterar ett jsonify-objekt som argument

Exempel på integration med [Spectre](https://github.com/wearefriday/spectre)

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

Sedan i Delta Reporter kan en SmartLink med `{spectre_test_run_url}` skapas för testkörningen

För mer information om Smart Links, se [Delta Reporter docs](https://delta-reporter.github.io/delta-reporter/main_features/#smart-links)