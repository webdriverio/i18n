---
id: wdio-reportportal-reporter
title: Report Portal Reporter
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-reporter è un pacchetto di terze parti, per ulteriori informazioni si prega di vedere [GitHub](https://github.com/borisosipov/wdio-reportportal-reporter) | [npm](https://www.npmjs.com/package/wdio-reportportal-reporter)


![npm](https://img.shields.io/npm/v/wdio-reportportal-reporter)
![npm](https://img.shields.io/npm/dm/wdio-reportportal-reporter)
> Un plugin reporter di WebdriverIO per riportare i risultati a Report Portal([http://reportportal.io/](http://reportportal.io/)).

## Installazione

Il modo più semplice è mantenere `wdio-reportportal-reporter` e `wdio-reportportal-service` come devDependency nel tuo `package.json`.

```json
{
  "devDependencies": {
    "wdio-reportportal-reporter": "^7.0.0",
    "wdio-reportportal-service": "^7.0.0"
  }
}
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui](https://webdriver.io/docs/gettingstarted.html).

## Configurazione

Configura la directory di output nel tuo file wdio.conf.js:

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

# API Aggiuntiva

I metodi API possono essere accessibili usando:

```js
const reporter = require('wdio-reportportal-reporter')
```

### Descrizione dei metodi

* `reporter.addAttribute({key, value})` – aggiunge un attributo al test corrente.
  * `key` (*string*, opzionale) -  chiave dell'attributo. Deve essere una stringa non vuota.
  * `value` (*string*, richiesto)–  valore dell'attributo. Deve essere una stringa non vuota.
* `reporter.addAttributeToCurrentSuite({key, value})` - aggiunge un attributo alla suite corrente.
  * `key` (*string*, opzionale) -  chiave dell'attributo. Deve essere una stringa non vuota.
  * `value` (*string*, richiesto)–  valore dell'attributo. Deve essere una stringa non vuota.
* `reporter.addDescriptionToCurrentSuite(description)` - aggiunge una stringa alla suite corrente.
  * `description` (*string*) - contenuto della descrizione. Il testo può essere formattato con markdown.
* `reporter.addDescriptionToAllSuites(description)` - aggiunge una stringa a tutte le suite future. (Usalo nell'hook before all, così ogni suite ottiene la stessa descrizione)
  * `description` (*string*) - contenuto della descrizione. Il testo può essere formattato con markdown.
* `reporter.sendLog(level, message)` – invia log all'elemento test/suite corrente.
  * `level` (*string*) - livello di log. Valori ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*)– contenuto del messaggio di log.
* `reporter.sendFile(level, name, content, [type])` – invia file all'elemento test/suite corrente.
  * `level` (*string*) - livello di log. Valori ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*)– nome del file.
  * `content` (*string*) – contenuto dell'allegato
  * `type` (*string*, opzionale) – MIME-type dell'allegato, `image/png` di default
  * `message` (*string*)– contenuto del messaggio di log.
* `reporter.sendLogToTest(test, level, message)` - invia log a un test specifico.
  * `test` (*object*) - oggetto test dall'hook wdio `afterTest\afterStep`
  * `level` (*string*) - livello di log. Valori ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*)– contenuto del messaggio di log.
* `reporter.sendFileToTest(test, level, name, content, [type])` – invia file a un test specifico.
  * `test` (*object*) - oggetto test dall'hook wdio `afterTest\afterStep`
  * `level` (*string*) - livello di log. Valori ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*)– nome del file.
  * `content` (*string*) – contenuto dell'allegato
  * `type` (*string*, opzionale) – MIME-type dell'allegato, `image/png` di default
  * `message` (*string*)– contenuto del messaggio di log.

Presta attenzione: `sendLog`\\`sendFile` invia log all'**elemento di test attualmente in esecuzione**. Ciò significa che se invii un log senza un test attivo (ad esempio dagli hook o a livello di suite) non verrà riportato nell'interfaccia di Report Portal.

I metodi `sendLogToTest`\\`sendFileToTest` sono utili quando è necessario inviare screenshot o log all'elemento di test fallito dall'hook afterTest di wdio.

Esempio Mocha:

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

Esempio Jasmine:

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

Esempio WDIO Cucumber "5.14.3+":

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

## Ottenere il link alla pagina di lancio di Report Portal UI

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    }
...
```

o in modo più complesso

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

## Reporting test a un lancio esistente

Se desideri riportare il test a un lancio attivo esistente, puoi passarlo al reporter tramite la variabile d'ambiente `REPORT_PORTAL_LAUNCH_ID`
Sei responsabile sia della conclusione del lancio che dell'avvio di tale lancio.

```sh
export REPORT_PORTAL_LAUNCH_ID=SomeLaunchId
npm run wdio
```

## Licenza

Questo progetto è concesso in licenza secondo la Licenza MIT - vedi il file [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-reporter/blob/master/LICENSE) per i dettagli