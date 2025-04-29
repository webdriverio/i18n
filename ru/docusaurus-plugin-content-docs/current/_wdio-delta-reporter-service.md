---
id: wdio-delta-reporter-service
title: Репортер Delta Reporter
custom_edit_url: https://github.com/delta-reporter/delta-reporter-wdio/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-delta-reporter-service является сторонним пакетом, для получения дополнительной информации, пожалуйста, посетите [GitHub](https://github.com/delta-reporter/delta-reporter-wdio) | [npm](https://www.npmjs.com/package/@delta-reporter/wdio-delta-reporter-service)




> Плагин репортера WebdriverIO для создания [отчетов Delta](https://github.com/delta-reporter/delta-reporter)


![Скриншот Delta репортера](https://raw.githubusercontent.com/delta-reporter/delta-reporter-wdio/master/src/docs/delta-reporter.png)


## Установка


Самый простой способ - держать `@delta-reporter/wdio-delta-reporter-service` как devDependency в вашем `package.json`.

```json
{
  "devDependencies": {
    "@delta-reporter/wdio-delta-reporter-service": "^1.1.9",
  }
}
```

Вы можете просто сделать это с помощью:

```bash
npm i @delta-reporter/wdio-delta-reporter-service
```

## Конфигурация


Плагин Delta reporter для WebdriverIO представляет собой комбинацию [WebdriverIO Service](https://github.com/webdriverio/webdriverio/tree/master/packages/webdriverio) и [Reporter](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-reporter), поэтому он должен быть объявлен как репортер и как сервис в конфигурационном файле.


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


## Добавление скриншотов и видео

Скриншоты могут быть прикреплены к отчету с помощью команды `sendFileToTest` в хуке afterTest в конфигурационном файле wdio. Параметры: `type`, `file` и `description`:
- `type`: Может быть `img` или `video`
- `file`: Путь к файлу для загрузки
- `description`: Необязательное значение, которое будет отображаться в контейнере медиа в Delta Reporter


Как показано в примере выше, когда эта функция вызывается, и тест не проходит, изображение скриншота будет прикреплено к отчету Delta.


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


Ниже приведен пример всех необходимых компонентов в конфигурационном файле wdio для использования этого плагина вместе с [Video Reporter](https://github.com/presidenten/wdio-video-reporter), чтобы Delta Reporter показывал скриншоты и видео неудачных тестов:



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
  host: 'delta_host', // укажите здесь URL вашего Delta Core
  project: 'Project Name', // Название вашего проекта
  testType: 'Test Type' // например, End to End, E2E, Frontend Acceptance Tests
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

## Использование

Для каждого запуска теста плагин Delta слушает DELTA_LAUNCH_ID. Есть два основных случая:

- Локальный запуск: Не нужно ничего делать, просто запустите вашу команду wdio (`./node_modules/.bin/wdio ./wdio.conf.js`), и DELTA_LAUNCH_ID будет автоматически сгенерирован для вас, так что результаты тестов появятся в Delta Reporter в режиме реального времени.

- Запуск в CI: Если это ваша задача с тестами, вам нужно определить DELTA_LAUNCH_ID как параметр. Затем внутри вашего этапа вам нужно инициализировать его, вызвав конечную точку `/api/v1/launch`, а затем запустить ваши тесты с префиксом `DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID}`. Инициализация выполняется один раз, поэтому когда вы запускаете несколько типов тестов в одной сборке (например, UI-тесты, API-тесты, модульные тесты), эти тесты собираются под одним "Launch" на Delta Reporter.

Ниже приведен пример кода для конфигурационного файла для задания Jenkins:

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

## Отправка дополнительных данных в Delta Reporter

Возможно отправлять пользовательские данные для отображения в Delta Reporter с использованием функции SmartLinks.

Для этого используйте команды `browser.sendDataToTest` или `sendDataToTestRun`, в зависимости от места, где вы хотите показать эту информацию

Эти методы принимают объект в формате JSON в качестве аргумента

Пример интеграции с [Spectre](https://github.com/wearefriday/spectre)

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

Затем в Delta Reporter можно создать SmartLink с `{spectre_test_run_url}` для запуска теста

Для получения дополнительной информации о Smart Links, пожалуйста, проверьте [документацию Delta Reporter](https://delta-reporter.github.io/delta-reporter/main_features/#smart-links)