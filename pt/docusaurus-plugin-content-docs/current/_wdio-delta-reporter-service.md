---
id: wdio-delta-reporter-service
title: Serviço de Relatório Delta Reporter
custom_edit_url: https://github.com/delta-reporter/delta-reporter-wdio/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-delta-reporter-service é um pacote de terceiros, para mais informações consulte [GitHub](https://github.com/delta-reporter/delta-reporter-wdio) | [npm](https://www.npmjs.com/package/@delta-reporter/wdio-delta-reporter-service)




> Um plugin de relatório WebdriverIO para criar [relatórios Delta](https://github.com/delta-reporter/delta-reporter)


![Screenshot do Delta reporter](https://raw.githubusercontent.com/delta-reporter/delta-reporter-wdio/master/src/docs/delta-reporter.png)


## Instalação


A maneira mais fácil é manter o `@delta-reporter/wdio-delta-reporter-service` como uma devDependency no seu `package.json`.

```json
{
  "devDependencies": {
    "@delta-reporter/wdio-delta-reporter-service": "^1.1.9",
  }
}
```

Você pode fazer isso simplesmente com:

```bash
npm i @delta-reporter/wdio-delta-reporter-service
```

## Configuração


O plugin WebdriverIO Delta reporter consiste em uma mistura entre um [Serviço WebdriverIO](https://github.com/webdriverio/webdriverio/tree/master/packages/webdriverio) e um [Reporter](https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-reporter), então precisa ser declarado como reporter e como serviço no arquivo de configuração.


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


## Adicionar capturas de tela e vídeos

Capturas de tela podem ser anexadas ao relatório usando o comando `sendFileToTest` no hook afterTest no arquivo de configuração wdio. Os parâmetros são `type`, `file` e `description`:
- `type`: Pode ser `img` ou `video`
- `file`: Caminho para o arquivo a ser carregado
- `description`: Valor opcional que será exibido no contêiner de mídia no Delta Reporter


Como mostrado no exemplo acima, quando essa função é chamada, e o teste está falhando, uma imagem de captura de tela será anexada ao relatório Delta.


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


Abaixo está um exemplo de todas as peças necessárias no arquivo de configuração wdio para usar este plugin junto com o [Video Reporter](https://github.com/presidenten/wdio-video-reporter), de modo que o Delta Reporter está mostrando capturas de tela e vídeos de testes com falha:



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
  host: 'delta_host', // coloque sua URL do Delta Core aqui
  project: 'Project Name', // Nome do seu projeto
  testType: 'Test Type' // ex., End to End, E2E, Frontend Acceptance Tests
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

Para cada execução de teste, o plugin Delta está ouvindo o DELTA_LAUNCH_ID. Existem dois casos principais:

- Execução local: Não é necessário fazer nada, você pode simplesmente executar seu comando wdio (`./node_modules/.bin/wdio ./wdio.conf.js`) e o DELTA_LAUNCH_ID será gerado automaticamente para você, para que seus resultados de teste apareçam no Delta Reporter em tempo real.

- Execução CI: Se for o seu job de testes, você terá que definir DELTA_LAUNCH_ID como um parâmetro. Em seguida, dentro do seu estágio, você precisará inicializá-lo chamando um endpoint `/api/v1/launch`, e depois executando seus testes com `DELTA_LAUNCH_ID=${DELTA_LAUNCH_ID}` prefixado. A inicialização é feita uma vez, então quando você está executando vários tipos de teste na mesma compilação (por exemplo, testes de UI, testes de API, testes unitários), esses testes são reunidos sob um "Launch" no Delta Reporter.

Abaixo está um exemplo de código para arquivo de configuração para job do Jenkins:

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

## Enviando dados extras para o Delta Reporter

É possível enviar dados personalizados para serem exibidos no Delta Reporter usando o recurso SmartLinks.

Para isso, use os comandos `browser.sendDataToTest` ou `sendDataToTestRun`, dependendo do local onde você deseja mostrar essas informações

Esses métodos aceitam um objeto jsonificado como argumento

Exemplo de integração com [Spectre](https://github.com/wearefriday/spectre)

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

Então no Delta Reporter, um SmartLink com `{spectre_test_run_url}` pode ser criado para a execução do teste

Para mais informações sobre Smart Links, consulte a [documentação do Delta Reporter](https://delta-reporter.github.io/delta-reporter/main_features/#smart-links)