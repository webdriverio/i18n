---
id: wdio-delta-reporter-service
title: Delta Reporter Reporter
custom_edit_url: https://github.com/delta-reporter/delta-reporter-wdio/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-delta-reporter-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/delta-reporter/delta-reporter-wdio) | [npm](https://www.npmjs.com/package/@delta-reporter/wdio-delta-reporter-service)




> Un plugin reporter di WebdriverIO per creare [rapporti Delta](https://github.com/delta-reporter/delta-reporter)


![Screenshot di Delta reporter](https://raw.githubusercontent.com/delta-reporter/delta-reporter-wdio/master/src/docs/delta-reporter.png)


## Installazione


Il modo più semplice è mantenere `@delta-reporter/wdio-delta-reporter-service` come devDependency nel tuo `package.json`.

```json
{
  "devDependencies": {
    "@delta-reporter/wdio-delta-reporter-service": "^1.1.9",
  }
}
```

Puoi farlo semplicemente con:

```bash
npm i @delta-reporter/wdio-delta-reporter-service
```

## Configurazione


Il plugin WebdriverIO di Delta reporter consiste in un mix tra un [WebdriverIO Service](https://github.com/webdriverio/webdriverio/tree/master/packages/webdriverio) e un [Reporter](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-reporter), quindi deve essere dichiarato sia come reporter che come servizio nel file di configurazione.


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


## Aggiungere screenshot e video

Gli screenshot possono essere allegati al report utilizzando il comando `sendFileToTest` nell'hook afterTest nel file di configurazione wdio. I parametri sono `type`, `file` e `description`:
- `type`: Può essere `img` o `video`
- `file`: Percorso del file da caricare
- `description`: Valore opzionale che verrà visualizzato nel contenitore multimediale in Delta Reporter


Come mostrato nell'esempio sopra, quando questa funzione viene chiamata e il test fallisce, un'immagine screenshot verrà allegata al report Delta.


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


Di seguito è riportato un esempio di tutti i pezzi necessari nel file di configurazione wdio per utilizzare questo plugin insieme a [Video Reporter](https://github.com/presidenten/wdio-video-reporter), in modo che Delta Reporter mostri screenshot e video dei test falliti:



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
  host: 'delta_host', // inserisci qui l'URL di Delta Core 
  project: 'Project Name', // Nome del tuo progetto
  testType: 'Test Type' // es., End to End, E2E, Frontend Acceptance Tests
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

## Utilizzo

Per ogni esecuzione di test, il plugin Delta ascolta DELTA_LAUNCH_ID. Ci sono due casi principali:

- Esecuzione locale: Non è necessario fare nulla, puoi semplicemente eseguire il tuo comando wdio (`./node_modules/.bin/wdio ./wdio.conf.js`) e DELTA_LAUNCH_ID verrà generato automaticamente per te, quindi i risultati dei test appariranno in Delta Reporter in tempo reale.

- Esecuzione CI: Se si tratta del tuo job di test, dovrai definire DELTA_LAUNCH_ID come parametro. Quindi all'interno del tuo stage dovrai inizializzarlo chiamando un endpoint `/api/v1/launch`, quindi eseguire i tuoi test con `DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID}` all'inizio. L'inizializzazione viene eseguita una sola volta, quindi quando si eseguono più tipi di test nella stessa build (ad esempio, test UI, test API, test unitari), questi test vengono raccolti sotto un unico "Launch" su Delta Reporter.

Di seguito è riportato un esempio di codice per il file di configurazione per il job Jenkins:

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

## Invio di dati aggiuntivi a Delta Reporter

È possibile inviare dati personalizzati da visualizzare in Delta Reporter utilizzando la funzionalità SmartLinks.

Per questo, utilizza i comandi `browser.sendDataToTest` o `sendDataToTestRun`, a seconda del luogo in cui vuoi mostrare queste informazioni

Questi metodi accettano un oggetto jsonify come argomento

Esempio di integrazione con [Spectre](https://github.com/wearefriday/spectre)

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

Quindi su Delta Reporter, è possibile creare uno SmartLink con `{spectre_test_run_url}` per l'esecuzione del test

Per maggiori informazioni su Smart Links, consultare [Delta Reporter docs](https://delta-reporter.github.io/delta-reporter/main_features/#smart-links)