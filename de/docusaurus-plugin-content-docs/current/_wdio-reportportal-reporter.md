---
id: wdio-reportportal-reporter
title: Report Portal Reporter
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-reporter ist ein Paket von Drittanbietern, weitere Informationen finden Sie unter [GitHub](https://github.com/borisosipov/wdio-reportportal-reporter) | [npm](https://www.npmjs.com/package/wdio-reportportal-reporter)


![npm](https://img.shields.io/npm/v/wdio-reportportal-reporter)
![npm](https://img.shields.io/npm/dm/wdio-reportportal-reporter)
> Ein WebdriverIO Reporter-Plugin, um Ergebnisse an Report Portal zu melden ([http://reportportal.io/](http://reportportal.io/)).

## Installation

Der einfachste Weg ist, `wdio-reportportal-reporter` und `wdio-reportportal-service` als devDependency in Ihrer `package.json` zu halten.

```json
{
  "devDependencies": {
    "wdio-reportportal-reporter": "^7.0.0",
    "wdio-reportportal-service": "^7.0.0"
  }
}
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier](https://webdriver.io/docs/gettingstarted.html).

## Konfiguration

Konfigurieren Sie das Ausgabeverzeichnis in Ihrer wdio.conf.js-Datei:

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

# Zusätzliche API

Auf API-Methoden kann zugegriffen werden mit:

```js
const reporter = require('wdio-reportportal-reporter')
```

### Methodenbeschreibung

* `reporter.addAttribute({key, value})` – ein Attribut zum aktuellen Test hinzufügen.
  * `key` (*string*, optional) - Attributschlüssel. Es muss eine nicht leere Zeichenfolge sein.
  * `value` (*string*, erforderlich) - Attributwert. Es muss eine nicht leere Zeichenfolge sein.
* `reporter.addAttributeToCurrentSuite({key, value})` - ein Attribut zur aktuellen Suite hinzufügen.
  * `key` (*string*, optional) - Attributschlüssel. Es muss eine nicht leere Zeichenfolge sein.
  * `value` (*string*, erforderlich) - Attributwert. Es muss eine nicht leere Zeichenfolge sein.
* `reporter.addDescriptionToCurrentSuite(description)` - eine Zeichenfolge zur aktuellen Suite hinzufügen.
  * `description` (*string*) - Beschreibungsinhalt. Text kann mit Markdown formatiert werden.
* `reporter.addDescriptionToAllSuites(description)` - eine Zeichenfolge zu allen kommenden Suites hinzufügen. (Verwenden Sie es im before all Hook, damit jede Suite die gleiche Beschreibung erhält)
  * `description` (*string*) - Beschreibungsinhalt. Text kann mit Markdown formatiert werden.
* `reporter.sendLog(level, message)` – Log an die aktuelle Suite\Test-Element senden.
  * `level` (*string*) - Log-Level. Werte ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*)– Log-Nachrichteninhalt.
* `reporter.sendFile(level, name, content, [type])` – Datei an die aktuelle Suite\Test-Element senden.
  * `level` (*string*) - Log-Level. Werte ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*)– Dateiname.
  * `content` (*string*) – Anhangsinhalt
  * `type` (*string*, optional) – Anhang MIME-Typ, standardmäßig `image/png`
  * `message` (*string*)– Log-Nachrichteninhalt.
* `reporter.sendLogToTest(test, level, message)` - Log an einen bestimmten Test senden.
  * `test` (*object*) - Testobjekt vom `afterTest\afterStep` wdio-Hook
  * `level` (*string*) - Log-Level. Werte ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*)– Log-Nachrichteninhalt.
* `reporter.sendFileToTest(test, level, name, content, [type])` – Datei an einen bestimmten Test senden.
  * `test` (*object*) - Testobjekt vom `afterTest\afterStep` wdio-Hook
  * `level` (*string*) - Log-Level. Werte ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*)– Dateiname.
  * `content` (*string*) – Anhangsinhalt
  * `type` (*string*, optional) – Anhang MIME-Typ, standardmäßig `image/png`
  * `message` (*string*)– Log-Nachrichteninhalt.

Beachten Sie: `sendLog`\\`sendFile` sendet Logs an das **aktuell laufende Testelement**. Das bedeutet, wenn Sie ein Log ohne aktiven Test senden (z.B. aus Hooks oder auf Suite-Ebene), wird es nicht in der Report Portal UI angezeigt.

Die Methoden `sendLogToTest`\\`sendFileToTest` sind nützlich, wenn Sie Screenshots oder Logs an das fehlgeschlagene Testelement aus dem wdio afterTest-Hook senden müssen.

Mocha-Beispiel:

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

Jasmine-Beispiel:

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

WDIO Cucumber "5.14.3+" Beispiel:

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

## Link zur Report Portal UI-Startseite erhalten

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    }
...
```

oder ein komplizierterer Weg

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

## Testen eines bestehenden Starts

Wenn Sie einen Test zu einem bestehenden aktiven Start melden möchten, können Sie ihn über die Umgebungsvariable `REPORT_PORTAL_LAUNCH_ID` an den Reporter übergeben.
Sie sind auch dafür verantwortlich, solche Starts zu beenden und zu starten.

```sh
export REPORT_PORTAL_LAUNCH_ID=SomeLaunchId
npm run wdio
```

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - weitere Details finden Sie in der [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-reporter/blob/master/LICENSE)-Datei