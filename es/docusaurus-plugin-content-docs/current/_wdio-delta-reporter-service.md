---
id: wdio-delta-reporter-service
title: Servicio Reportador Delta Reporter
custom_edit_url: https://github.com/delta-reporter/delta-reporter-wdio/edit/master/README.md
---


> wdio-delta-reporter-service es un paquete de terceros, para más información por favor visita [GitHub](https://github.com/delta-reporter/delta-reporter-wdio) | [npm](https://www.npmjs.com/package/@delta-reporter/wdio-delta-reporter-service)




> Un plugin reportador de WebdriverIO para crear [informes Delta](https://github.com/delta-reporter/delta-reporter)


![Captura de pantalla de Delta reporter](https://raw.githubusercontent.com/delta-reporter/delta-reporter-wdio/master/src/docs/delta-reporter.png)


## Instalación


La forma más fácil es mantener `@delta-reporter/wdio-delta-reporter-service` como una devDependency en tu `package.json`.

```json
{
  "devDependencies": {
    "@delta-reporter/wdio-delta-reporter-service": "^1.1.9",
  }
}
```

Puedes hacerlo simplemente con:

```bash
npm i @delta-reporter/wdio-delta-reporter-service
```

## Configuración


El plugin WebdriverIO de Delta reporter consiste en una mezcla entre un [Servicio de WebdriverIO](https://github.com/webdriverio/webdriverio/tree/master/packages/webdriverio) y un [Reportador](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-reporter), por lo que debe ser declarado como reportador y como servicio en el archivo de configuración.


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


## Añadir capturas de pantalla y videos

Las capturas de pantalla se pueden adjuntar al informe utilizando el comando `sendFileToTest` en el hook afterTest del archivo de configuración wdio. Los parámetros son `type`, `file` y `description`:
- `type`: Puede ser `img` o `video`
- `file`: Ruta al archivo que se va a cargar
- `description`: Valor opcional que se mostrará en el contenedor multimedia en Delta Reporter


Como se muestra en el ejemplo anterior, cuando se llama a esta función y la prueba está fallando, se adjuntará una imagen de captura de pantalla al informe Delta.


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


A continuación se muestra un ejemplo de todas las piezas necesarias en el archivo de configuración wdio para usar este plugin junto con [Video Reporter](https://github.com/presidenten/wdio-video-reporter), para que Delta Reporter muestre capturas de pantalla y videos de las pruebas fallidas:



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
  host: 'delta_host', // coloca aquí la URL de tu Delta Core
  project: 'Project Name', // Nombre de tu proyecto
  testType: 'Test Type' // ej., End to End, E2E, Frontend Acceptance Tests
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

## Uso

Para cada ejecución de prueba, el plugin Delta está escuchando DELTA_LAUNCH_ID. Hay dos casos principales:

- Ejecución local: No es necesario hacer nada, simplemente puedes ejecutar tu comando wdio (`./node_modules/.bin/wdio ./wdio.conf.js`) y DELTA_LAUNCH_ID se generará automáticamente para ti, por lo que los resultados de tus pruebas aparecerán en Delta Reporter en tiempo real.

- Ejecución en CI: Si se trata de tu trabajo de pruebas, tendrás que definir DELTA_LAUNCH_ID como un parámetro. Luego, dentro de tu etapa, necesitarás inicializarlo llamando al endpoint `/api/v1/launch`, y luego ejecutar tus pruebas con `DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID}` antepuesto. La inicialización se realiza una vez, de modo que cuando estás ejecutando múltiples tipos de pruebas en la misma construcción (por ejemplo, pruebas de UI, pruebas de API, pruebas unitarias), esas pruebas se recopilan bajo un solo "Launch" en Delta Reporter.

A continuación se muestra un ejemplo de código para archivo de configuración para trabajo Jenkins:

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

## Enviando datos extra a Delta Reporter

Es posible enviar datos personalizados para mostrarlos en Delta Reporter utilizando la función SmartLinks.

Para esto, utiliza los comandos `browser.sendDataToTest` o `sendDataToTestRun`, dependiendo del lugar donde quieras mostrar esta información

Estos métodos aceptan un objeto jsonificado como argumento

Ejemplo de integración con [Spectre](https://github.com/wearefriday/spectre)

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

Luego en Delta Reporter, se puede crear un SmartLink con `{spectre_test_run_url}` para la ejecución de la prueba

Para más información sobre Smart Links, consulta [la documentación de Delta Reporter](https://delta-reporter.github.io/delta-reporter/main_features/#smart-links)