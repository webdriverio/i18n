---
id: wdio-delta-reporter-service
title: Delta Reporter Reporter
custom_edit_url: https://github.com/delta-reporter/delta-reporter-wdio/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-delta-reporter-service jest pakietem zewnętrznym, więcej informacji można znaleźć na [GitHub](https://github.com/delta-reporter/delta-reporter-wdio) | [npm](https://www.npmjs.com/package/@delta-reporter/wdio-delta-reporter-service)




> Wtyczka reportera WebdriverIO do tworzenia [raportów Delta](https://github.com/delta-reporter/delta-reporter)


![Zrzut ekranu Delta reporter](https://raw.githubusercontent.com/delta-reporter/delta-reporter-wdio/master/src/docs/delta-reporter.png)


## Instalacja


Najłatwiejszym sposobem jest utrzymanie `@delta-reporter/wdio-delta-reporter-service` jako devDependency w pliku `package.json`.

```json
{
  "devDependencies": {
    "@delta-reporter/wdio-delta-reporter-service": "^1.1.9",
  }
}
```

Możesz to zrobić po prostu przez:

```bash
npm i @delta-reporter/wdio-delta-reporter-service
```

## Konfiguracja


Wtyczka Delta reporter dla WebdriverIO składa się z połączenia [WebdriverIO Service](https://github.com/webdriverio/webdriverio/tree/master/packages/webdriverio) i [Reporter](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-reporter), więc musi być zadeklarowana zarówno jako reporter, jak i usługa w pliku konfiguracyjnym.


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


## Dodawanie zrzutów ekranu i filmów

Zrzuty ekranu mogą być załączone do raportu za pomocą polecenia `sendFileToTest` w hooku afterTest w pliku konfiguracyjnym wdio. Parametry to `type`, `file` i `description`:
- `type`: Może być `img` lub `video`
- `file`: Ścieżka do pliku, który ma być przesłany
- `description`: Opcjonalna wartość, która będzie wyświetlana w kontenerze multimediów w Delta Reporter


Jak pokazano w powyższym przykładzie, gdy ta funkcja jest wywoływana, a test nie powiedzie się, obraz zrzutu ekranu zostanie dołączony do raportu Delta.


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


Poniżej znajduje się przykład wszystkich elementów potrzebnych w pliku konfiguracyjnym wdio do korzystania z tej wtyczki wraz z [Video Reporter](https://github.com/presidenten/wdio-video-reporter), dzięki czemu Delta Reporter pokazuje zrzuty ekranu i filmy z nieudanych testów:



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

## Użycie

Dla każdego uruchomienia testu, wtyczka Delta nasłuchuje na DELTA_LAUNCH_ID. Istnieją dwa główne przypadki:

- Uruchomienie lokalne: Nie musisz robić nic specjalnego, możesz po prostu uruchomić swoje polecenie wdio (`./node_modules/.bin/wdio ./wdio.conf.js`), a DELTA_LAUNCH_ID zostanie wygenerowane automatycznie, dzięki czemu wyniki testów pojawią się w Delta Reporter w czasie rzeczywistym.

- Uruchomienie CI: Jeśli to jest twoje zadanie testowe, musisz zdefiniować DELTA_LAUNCH_ID jako parametr. Następnie wewnątrz twojego etapu będziesz musiał zainicjować go, wywołując punkt końcowy `/api/v1/launch`, a następnie uruchamiając testy z przedrostkiem `DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID}`. Inicjalizacja jest wykonywana raz, więc gdy uruchamiasz wiele typów testów w tym samym buildzie (na przykład testy UI, testy API, testy jednostkowe), te testy są gromadzone pod jednym "Launch" w Delta Reporter.

Poniżej znajduje się przykład kodu dla pliku konfiguracyjnego dla zadania Jenkins:

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

## Wysyłanie dodatkowych danych do Delta Reporter

Możliwe jest wysyłanie niestandardowych danych do wyświetlenia w Delta Reporter za pomocą funkcji SmartLinks.

W tym celu użyj poleceń `browser.sendDataToTest` lub `sendDataToTestRun`, w zależności od miejsca, w którym chcesz pokazać te informacje

Te metody przyjmują obiekt jsonify jako argument

Przykład integracji ze [Spectre](https://github.com/wearefriday/spectre)

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

Następnie w Delta Reporter można utworzyć SmartLink z `{spectre_test_run_url}` dla przebiegu testu

Więcej informacji o Smart Links można znaleźć w [dokumentacji Delta Reporter](https://delta-reporter.github.io/delta-reporter/main_features/#smart-links)