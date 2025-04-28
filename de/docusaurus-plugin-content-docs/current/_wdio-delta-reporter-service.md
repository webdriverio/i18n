---
id: wdio-delta-reporter-service
title: Delta Reporter Reporter
custom_edit_url: https://github.com/delta-reporter/delta-reporter-wdio/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-delta-reporter-service ist ein Paket von Drittanbietern, weitere Informationen finden Sie auf [GitHub](https://github.com/delta-reporter/delta-reporter-wdio) | [npm](https://www.npmjs.com/package/@delta-reporter/wdio-delta-reporter-service)




> Ein WebdriverIO Reporter-Plugin zum Erstellen von [Delta-Reports](https://github.com/delta-reporter/delta-reporter)


![Screenshot of Delta reporter](https://raw.githubusercontent.com/delta-reporter/delta-reporter-wdio/master/src/docs/delta-reporter.png)


## Installation


Am einfachsten ist es, `@delta-reporter/wdio-delta-reporter-service` als devDependency in Ihrer `package.json` zu behalten.

```json
{
  "devDependencies": {
    "@delta-reporter/wdio-delta-reporter-service": "^1.1.9",
  }
}
```

Sie können es einfach tun durch:

```bash
npm i @delta-reporter/wdio-delta-reporter-service
```

## Configuration


Das Delta Reporter WebdriverIO-Plugin besteht aus einer Mischung aus einem [WebdriverIO Service](https://github.com/webdriverio/webdriverio/tree/master/packages/webdriverio) und [Reporter](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-reporter), daher muss es in der Konfigurationsdatei sowohl als Reporter als auch als Service deklariert werden.


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

Screenshots können dem Bericht hinzugefügt werden, indem der Befehl `sendFileToTest` im afterTest-Hook in der wdio-Konfigurationsdatei verwendet wird. Die Parameter sind `type`, `file` und `description`:
- `type`: Kann `img` oder `video` sein
- `file`: Pfad zur hochzuladenden Datei
- `description`: Optionaler Wert, der im Medien-Container in Delta Reporter angezeigt wird


Wie im obigen Beispiel gezeigt, wird bei Aufruf dieser Funktion und einem fehlgeschlagenen Test ein Screenshot-Bild an den Delta-Report angehängt.


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


Nachfolgend ein Beispiel für alle Teile, die in der wdio-Konfigurationsdatei benötigt werden, um dieses Plugin zusammen mit [Video Reporter](https://github.com/presidenten/wdio-video-reporter) zu verwenden, sodass Delta Reporter Screenshots und Videos von fehlgeschlagenen Tests anzeigt:



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

Für jeden Testlauf überwacht das Delta-Plugin DELTA_LAUNCH_ID. Es gibt zwei Hauptfälle:

- Lokaler Lauf: Sie müssen nichts tun, Sie können einfach Ihren wdio-Befehl ausführen (`./node_modules/.bin/wdio ./wdio.conf.js`) und DELTA_LAUNCH_ID wird automatisch für Sie generiert, sodass Ihre Testergebnisse in Echtzeit in Delta Reporter erscheinen.

- CI-Lauf: Wenn es sich um Ihren Testjob handelt, müssen Sie DELTA_LAUNCH_ID als Parameter definieren. Dann müssen Sie es innerhalb Ihrer Stage initialisieren, indem Sie den Endpunkt `/api/v1/launch` aufrufen und dann Ihre Tests mit vorangestelltem `DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID}` ausführen. Die Initialisierung erfolgt einmal, sodass bei der Ausführung mehrerer Testtypen im selben Build (z. B. UI-Tests, API-Tests, Unit-Tests) diese Tests in Delta Reporter unter einem "Launch" zusammengefasst werden.

Hier ist ein Beispielcode für eine Konfigurationsdatei für einen Jenkins-Job:

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

Es ist möglich, benutzerdefinierte Daten zu senden, die in Delta Reporter mit der SmartLinks-Funktion angezeigt werden.

Verwenden Sie dazu die Befehle `browser.sendDataToTest` oder `sendDataToTestRun`, je nachdem, wo Sie diese Informationen anzeigen möchten.

Diese Methoden akzeptieren ein jsonifiziertes Objekt als Argument.

Beispiel für die Integration mit [Spectre](https://github.com/wearefriday/spectre)

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

Dann kann in Delta Reporter ein SmartLink mit `{spectre_test_run_url}` für den Testlauf erstellt werden.

Weitere Informationen zu Smart Links finden Sie in der [Delta Reporter-Dokumentation](https://delta-reporter.github.io/delta-reporter/main_features/#smart-links)