---
id: wdio-reportportal-reporter
title: Relator de Portal de Relatórios
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-reporter é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/borisosipov/wdio-reportportal-reporter) | [npm](https://www.npmjs.com/package/wdio-reportportal-reporter)


![npm](https://img.shields.io/npm/v/wdio-reportportal-reporter)
![npm](https://img.shields.io/npm/dm/wdio-reportportal-reporter)
> Um plugin de relator do WebdriverIO para reportar resultados ao Report Portal([http://reportportal.io/](http://reportportal.io/)).

## Instalação

A maneira mais fácil é manter `wdio-reportportal-reporter` e `wdio-reportportal-service` como devDependency no seu `package.json`.

```json
{
  "devDependencies": {
    "wdio-reportportal-reporter": "^7.0.0",
    "wdio-reportportal-service": "^7.0.0"
  }
}
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui](https://webdriver.io/docs/gettingstarted.html).

## Configuração

Configure o diretório de saída em seu arquivo wdio.conf.js:

```js
const reportportal = require('wdio-reportportal-reporter');
const RpService = require("wdio-reportportal-service");

const conf = {
  reportPortalClientConfig: { // report portal settings
    token: '00000000-0000-0000-0000-00000000000',
    endpoint: 'https://reportportal-url/api/v1',
    launch: 'launch_name',
    project: 'project_name',
    mode: 'DEFAULT',
    debug: false,
    description: "Launch description text",
    attributes: [{key:"tag", value: "foo"}],
    headers: {"foo": "bar"}, // optional headers for internal http client
    restClientConfig: { // axios like http client config - https://github.com/axios/axios#request-config
      proxy: {
        protocol: 'https',
        host: '127.0.0.1',
        port: 9000,
        auth: {
          username: 'mikeymike',
          password: 'rapunz3l'
        }
      },
      timeout: 60000
    }
  },
  reportSeleniumCommands: false, // add selenium commands to log
  seleniumCommandsLogLevel: 'debug', // log level for selenium commands
  autoAttachScreenshots: false, // automatically add screenshots
  screenshotsLogLevel: 'info', // log level for screenshots
  parseTagsFromTestTitle: false, // parse strings like `@foo` from titles and add to Report Portal
  cucumberNestedSteps: false, // report cucumber steps as Report Portal steps
  autoAttachCucumberFeatureToScenario: false, // requires cucumberNestedSteps to be true for use
  sanitizeErrorMessages: true, // strip color ascii characters from error stacktrace
  sauceLabOptions : {
    enabled: true, // automatically add SauseLab ID to rp tags.
    sldc: "US" // automatically add SauseLab region to rp tags.
  }
};

exports.config = {
  // ...
  services: [[RpService, {}]],
  reporters: [[reportportal, conf]],
  // ...
};
```

# API Adicional

Os métodos da API podem ser acessados usando:

```js
const reporter = require('wdio-reportportal-reporter')
```

### Descrição dos métodos

* `reporter.addAttribute({key, value})` – adicionar um atributo ao teste atual.
  * `key` (*string*, opcional) - chave do atributo. Deve ser uma string não vazia.
  * `value` (*string*, obrigatório) – valor do atributo. Deve ser uma string não vazia.
* `reporter.addAttributeToCurrentSuite({key, value})` - adicionar um atributo à suíte atual.
  * `key` (*string*, opcional) - chave do atributo. Deve ser uma string não vazia.
  * `value` (*string*, obrigatório) – valor do atributo. Deve ser uma string não vazia.
* `reporter.addDescriptionToCurrentSuite(description)` - adicionar uma string à suíte atual.
  * `description` (*string*) - conteúdo da descrição. O texto pode ser formatado com markdown.
* `reporter.addDescriptionToAllSuites(description)` - adicionar uma string a todas as suítes futuras. (Use-o no hook before all, para que cada suíte obtenha a mesma descrição)
  * `description` (*string*) - conteúdo da descrição. O texto pode ser formatado com markdown.
* `reporter.sendLog(level, message)` – enviar log para o item de suíte/teste atual.
  * `level` (*string*) - nível de log. Valores ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*) – conteúdo da mensagem de log.
* `reporter.sendFile(level, name, content, [type])` – enviar arquivo para o item de suíte/teste atual.
  * `level` (*string*) - nível de log. Valores ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*) – nome do arquivo.
  * `content` (*string*) – conteúdo do anexo
  * `type` (*string*, opcional) – MIME-type do anexo, `image/png` por padrão
  * `message` (*string*) – conteúdo da mensagem de log.
* `reporter.sendLogToTest(test, level, message)` - enviar log para um teste específico.
  * `test` (*object*) - objeto de teste do hook wdio `afterTest\afterStep`
  * `level` (*string*) - nível de log. Valores ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*) – conteúdo da mensagem de log.
* `reporter.sendFileToTest(test, level, name, content, [type])` – enviar arquivo para um teste específico.
  * `test` (*object*) - objeto de teste do hook wdio `afterTest\afterStep`
  * `level` (*string*) - nível de log. Valores ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*) – nome do arquivo.
  * `content` (*string*) – conteúdo do anexo
  * `type` (*string*, opcional) – MIME-type do anexo, `image/png` por padrão
  * `message` (*string*) – conteúdo da mensagem de log.

Atenção: `sendLog`\\`sendFile` envia log para o **item de teste em execução atual**. Isso significa que, se você enviar log sem um teste ativo (por exemplo, de hooks ou no nível da suíte), ele não será reportado na interface do Report Portal.

Os métodos `sendLogToTest`\\`sendFileToTest` são úteis quando você precisa enviar capturas de tela ou logs para o item de teste com falha a partir do hook afterTest do wdio.

Exemplo Mocha:

```js
const reportportal = require('wdio-reportportal-reporter');
const path = require('path');
const fs = require('fs');

exports.config = {
...
  async afterTest(test) {
    if (test.passed === false) {
      const filename = "screnshot.png";
      const outputFile = path.join(__dirname, filename);
      await browser.saveScreenshot(outputFile);
      reportportal.sendFileToTest(test, 'info', filename, fs.readFileSync(outputFile));
    }
  }
...
```

Exemplo Jasmine:

```js
const reportportal = require('wdio-reportportal-reporter');
const path = require('path');
const fs = require('fs');

exports.config = {
...
  async afterTest(test) {
    if (test.passed === false) {
      const filename = "screnshot.png";
      const outputFile = path.join(__dirname, filename);
      await browser.saveScreenshot(outputFile);
      //!!
      Object.assign(test, {title: test.description}}
      reportportal.sendFileToTest(test, 'info', filename, fs.readFileSync(outputFile));
    }
  }
...
```

Exemplo WDIO Cucumber "5.14.3+":

```js
const reportportal = require('wdio-reportportal-reporter');

exports.config = {
...
   afterStep: async function (uri, feature, { error, result, duration, passed }, stepData, context) {
     if (!passed) {
        let failureObject = {};
        failureObject.type = 'afterStep';
        failureObject.error = error;
        failureObject.title = `${stepData.step.keyword}${stepData.step.text}`;
        const screenShot = await global.browser.takeScreenshot();
        let attachment = Buffer.from(screenShot, 'base64');
        reportportal.sendFileToTest(failureObject, 'error', "screnshot.png", attachment);
    }
  }
...
}
```

## Obtendo link para a página de lançamento na interface do Report Portal

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    }
...
```

ou de uma forma mais complicada

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const protocol = 'http:';
        const hostname = 'example.com';
        const port = ':8080'; // or empty string for default 80/443 ports
        const link = await RpService.getLaunchUrlByParams(protocol, hostname, port, config);
        console.log(`Report portal link ${link}`)
    }
...
```

## Relatando teste para um lançamento existente

Se você quiser relatar um teste para um lançamento ativo existente, pode passá-lo para o relator pela variável de ambiente `REPORT_PORTAL_LAUNCH_ID`
Você é responsável por finalizar o lançamento, bem como iniciar tal lançamento.

```sh
export REPORT_PORTAL_LAUNCH_ID=SomeLaunchId
npm run wdio
```

## Licença

Este projeto é licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-reporter/blob/master/LICENSE) para detalhes