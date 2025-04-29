---
id: wdio-reportportal-reporter
title: Report Portal Reporter
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-reporter is a 3rd party package, for more information please see [GitHub](https://github.com/borisosipov/wdio-reportportal-reporter) | [npm](https://www.npmjs.com/package/wdio-reportportal-reporter)


![npm](https://img.shields.io/npm/v/wdio-reportportal-reporter)
![npm](https://img.shields.io/npm/dm/wdio-reportportal-reporter)
> En WebdriverIO reporter-plugin för att rapportera resultat till Report Portal([http://reportportal.io/](http://reportportal.io/)).

## Installation

Det enklaste sättet är att behålla `wdio-reportportal-reporter` och `wdio-reportportal-service` som en devDependency i din `package.json`.

```json
{
  "devDependencies": {
    "wdio-reportportal-reporter": "^7.0.0",
    "wdio-reportportal-service": "^7.0.0"
  }
}
```

Instruktioner om hur man installerar `WebdriverIO` finns [här](https://webdriver.io/docs/gettingstarted.html).

## Configuration

Konfigurera utdatakatalogen i din wdio.conf.js-fil:

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

# Additional API

API-metoder kan nås med:

```js
const reporter = require('wdio-reportportal-reporter')
```

### Methods description

* `reporter.addAttribute({key, value})` – lägg till ett attribut till aktuellt test.
  * `key` (*string*, valfritt) - attributnyckel. Det måste vara en icke-tom sträng.
  * `value` (*string*, obligatoriskt)– attributvärde. Det måste vara en icke-tom sträng.
* `reporter.addAttributeToCurrentSuite({key, value})` - lägg till ett attribut till aktuell svit.
  * `key` (*string*, valfritt) - attributnyckel. Det måste vara en icke-tom sträng.
  * `value` (*string*, obligatoriskt)– attributvärde. Det måste vara en icke-tom sträng.
* `reporter.addDescriptionToCurrentSuite(description)` - lägg till en sträng till aktuell svit.
  * `description` (*string*) - beskrivningens innehåll. Text kan formateras med markdown.
* `reporter.addDescriptionToAllSuites(description)` - lägg till en sträng till alla kommande sviter. (Använd den i before all hook, så att varje svit får samma beskrivning)
  * `description` (*string*) - beskrivningens innehåll. Text kan formateras med markdown.
* `reporter.sendLog(level, message)` – skicka logg till aktuell svit\test-objekt.
  * `level` (*string*) - loggnivå. Värden ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*)– loggmeddelandets innehåll.
* `reporter.sendFile(level, name, content, [type])` – skicka fil till aktuell svit\test-objekt.
  * `level` (*string*) - loggnivå. Värden ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*)– filnamn.
  * `content` (*string*) – bilagans innehåll
  * `type` (*string*, valfritt) – bilaga MIME-typ, `image/png` som standard
  * `message` (*string*)– loggmeddelandets innehåll.
* `reporter.sendLogToTest(test, level, message)` - skicka logg till specifikt test.
  * `test` (*object*) - testobjekt från `afterTest\afterStep` wdio hook
  * `level` (*string*) - loggnivå. Värden ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*)– loggmeddelandets innehåll.
* `reporter.sendFileToTest(test, level, name, content, [type])` – skicka fil till specifikt test.
  * `test` (*object*) - testobjekt från `afterTest\afterStep` wdio hook
  * `level` (*string*) - loggnivå. Värden ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*)– filnamn.
  * `content` (*string*) – bilagans innehåll
  * `type` (*string*, valfritt) – bilaga MIME-typ, `image/png` som standard
  * `message` (*string*)– loggmeddelandets innehåll.

Observera: `sendLog`\\`sendFile` skickar logg till **aktuellt körande testobjekt**. Det betyder att om du skickar logg utan aktivt test (t.ex. från hooks eller på svitnivå) kommer det inte att rapporteras i Report Portal UI.

Metoderna `sendLogToTest`\\`sendFileToTest` är användbara när du behöver skicka skärmdumpar eller loggar till det misslyckade testobjektet från wdio afterTest hook.

Mocha exempel:

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

Jasmine exempel:

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

WDIO Cucumber "5.14.3+" Exempel:

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

## Getting link to Report Portal UI launch page

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    }
...
```

eller mer komplicerat sätt

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

## Reporting test to existing launch

Om du vill rapportera test till befintlig aktiv lansering kan du skicka den till reporter via miljövariabeln `REPORT_PORTAL_LAUNCH_ID`
Du ansvarar för att avsluta lanseringen samt starta en sådan lansering.

```sh
export REPORT_PORTAL_LAUNCH_ID=SomeLaunchId
npm run wdio
```

## License

Detta projekt är licensierat under MIT-licensen - se [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-reporter/blob/master/LICENSE) filen för detaljer