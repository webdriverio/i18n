---
id: wdio-delta-reporter-service
title: Репортер Delta Reporter
custom_edit_url: https://github.com/delta-reporter/delta-reporter-wdio/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-delta-reporter-service є сторонній пакет, для отримання додаткової інформації перегляньте [GitHub](https://github.com/delta-reporter/delta-reporter-wdio) | [npm](https://www.npmjs.com/package/@delta-reporter/wdio-delta-reporter-service)




> Плагін репортера WebdriverIO для створення [звітів Delta](https://github.com/delta-reporter/delta-reporter)


![Знімок екрана Delta reporter](https://raw.githubusercontent.com/delta-reporter/delta-reporter-wdio/master/src/docs/delta-reporter.png)


## Встановлення


Найпростіший спосіб — зберегти `@delta-reporter/wdio-delta-reporter-service` як devDependency у вашому `package.json`.

```json
{
  "devDependencies": {
    "@delta-reporter/wdio-delta-reporter-service": "^1.1.9",
  }
}
```

Ви можете просто зробити це за допомогою:

```bash
npm i @delta-reporter/wdio-delta-reporter-service
```

## Конфігурація


Плагін Delta reporter для WebdriverIO складається з поєднання [WebdriverIO Service](https://github.com/webdriverio/webdriverio/tree/master/packages/webdriverio) та [Reporter](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-reporter), тому він повинен бути оголошений як репортер і як сервіс у файлі конфігурації.


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


## Додавання знімків екрана та відео

Знімки екрана можна додати до звіту за допомогою команди `sendFileToTest` в хуку afterTest у файлі конфігурації wdio. Параметри: `type`, `file` та `description`:
- `type`: Може бути `img` або `video`
- `file`: Шлях до файлу, який потрібно завантажити
- `description`: Необов'язкове значення, яке буде відображатися в контейнері медіа в Delta Reporter


Як показано в прикладі вище, коли ця функція викликається і тест не проходить, зображення знімку екрана буде додано до звіту Delta.


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


Нижче наведено приклад усіх компонентів, необхідних у файлі конфігурації wdio для використання цього плагіна разом із [Video Reporter](https://github.com/presidenten/wdio-video-reporter), так щоб Delta Reporter показував знімки екрана та відео невдалих тестів:



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

## Використання

Для кожного тестового запуску плагін Delta слухає DELTA_LAUNCH_ID. Є два основні випадки:

- Локальний запуск: Не потрібно нічого робити, ви просто можете запустити вашу команду wdio (`./node_modules/.bin/wdio ./wdio.conf.js`) і DELTA_LAUNCH_ID буде автоматично створено для вас, тому результати ваших тестів з'являться в Delta Reporter в реальному часі.

- Запуск CI: Якщо це задача ваших тестів, вам потрібно буде визначити DELTA_LAUNCH_ID як параметр. Потім всередині вашого етапу вам потрібно ініціалізувати його, викликавши кінцеву точку `/api/v1/launch`, а потім запустити ваші тести з префіксом `DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID}`. Ініціалізація виконується один раз, тому коли ви запускаєте кілька типів тестів в одній збірці (наприклад, UI-тести, API-тести, модульні тести), ці тести збираються під одним "Запуском" на Delta Reporter.

Нижче наведено приклад коду для файла конфігурації для завдання Jenkins:

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

## Надсилання додаткових даних до Delta Reporter

Можливо надіслати користувацькі дані для відображення в Delta Reporter за допомогою функції SmartLinks.

Для цього використовуйте команди `browser.sendDataToTest` або `sendDataToTestRun`, залежно від місця, де ви хочете показати цю інформацію

Ці методи приймають об'єкт у форматі JSON як аргумент

Приклад інтеграції з [Spectre](https://github.com/wearefriday/spectre)

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

Потім у Delta Reporter можна створити SmartLink з `{spectre_test_run_url}` для тестового запуску

Для отримання додаткової інформації про Smart Links, будь ласка, перегляньте [документацію Delta Reporter](https://delta-reporter.github.io/delta-reporter/main_features/#smart-links)