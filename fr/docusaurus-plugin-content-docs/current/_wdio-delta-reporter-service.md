---
id: wdio-delta-reporter-service
title: Service de rapport Delta Reporter
custom_edit_url: https://github.com/delta-reporter/delta-reporter-wdio/edit/master/README.md
---


> wdio-delta-reporter-service est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/delta-reporter/delta-reporter-wdio) | [npm](https://www.npmjs.com/package/@delta-reporter/wdio-delta-reporter-service)




> Un plugin de reporter WebdriverIO pour créer des [rapports Delta](https://github.com/delta-reporter/delta-reporter)


![Capture d'écran de Delta reporter](https://raw.githubusercontent.com/delta-reporter/delta-reporter-wdio/master/src/docs/delta-reporter.png)


## Installation


La façon la plus simple est de garder `@delta-reporter/wdio-delta-reporter-service` comme devDependency dans votre `package.json`.

```json
{
  "devDependencies": {
    "@delta-reporter/wdio-delta-reporter-service": "^1.1.9",
  }
}
```

Vous pouvez simplement le faire par :

```bash
npm i @delta-reporter/wdio-delta-reporter-service
```

## Configuration


Le plugin WebdriverIO de Delta reporter est un mélange entre un [WebdriverIO Service](https://github.com/webdriverio/webdriverio/tree/master/packages/webdriverio) et un [Reporter](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-reporter), il doit donc être déclaré comme reporter et comme service dans le fichier de configuration.


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


## Ajouter des captures d'écran et des vidéos

Les captures d'écran peuvent être jointes au rapport en utilisant la commande `sendFileToTest` dans le hook afterTest du fichier de configuration wdio. Les paramètres sont `type`, `file` et `description` :
- `type` : Peut être `img` ou `video`
- `file` : Chemin vers le fichier à télécharger
- `description` : Valeur optionnelle qui sera affichée dans le conteneur multimédia dans Delta Reporter


Comme indiqué dans l'exemple ci-dessus, lorsque cette fonction est appelée et que le test échoue, une image de capture d'écran sera jointe au rapport Delta.


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


Voici un exemple de tous les éléments nécessaires dans le fichier de configuration wdio pour utiliser ce plugin avec [Video Reporter](https://github.com/presidenten/wdio-video-reporter), afin que Delta Reporter affiche des captures d'écran et des vidéos des tests échoués :



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
  host: 'delta_host', // mettez votre URL Delta Core ici
  project: 'Project Name', // Nom de votre projet
  testType: 'Test Type' // par ex., End to End, E2E, Frontend Acceptance Tests
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

## Utilisation

Pour chaque exécution de test, le plugin Delta écoute DELTA_LAUNCH_ID. Il y a deux cas principaux :

- Exécution locale : Pas besoin de faire quoi que ce soit, vous pouvez simplement exécuter votre commande wdio (`./node_modules/.bin/wdio ./wdio.conf.js`) et DELTA_LAUNCH_ID sera généré automatiquement pour vous, afin que vos résultats de test apparaissent dans Delta Reporter en temps réel.

- Exécution CI : S'il s'agit de votre job de tests, vous devrez définir DELTA_LAUNCH_ID comme paramètre. Ensuite, à l'intérieur de votre étape, vous devrez l'initialiser en appelant un point de terminaison `/api/v1/launch`, puis exécuter vos tests avec `DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID}` en préfixe. L'initialisation est faite une seule fois, donc lorsque vous exécutez plusieurs types de tests dans la même build (par exemple, tests UI, tests API, tests unitaires), ces tests sont rassemblés sous un seul "Launch" sur Delta Reporter.

Voici un exemple de code pour le fichier de configuration d'un job Jenkins :

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

## Envoi de données supplémentaires à Delta Reporter

Il est possible d'envoyer des données personnalisées à afficher dans Delta Reporter en utilisant la fonctionnalité SmartLinks.

Pour cela, utilisez les commandes `browser.sendDataToTest` ou `sendDataToTestRun`, selon l'endroit où vous souhaitez afficher ces informations.

Ces méthodes acceptent un objet JSON comme argument

Exemple d'intégration avec [Spectre](https://github.com/wearefriday/spectre)

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

Ensuite, sur Delta Reporter, un SmartLink avec `{spectre_test_run_url}` peut être créé pour l'exécution du test

Pour plus d'informations sur les Smart Links, veuillez consulter [la documentation de Delta Reporter](https://delta-reporter.github.io/delta-reporter/main_features/#smart-links)