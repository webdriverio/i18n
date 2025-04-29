---
id: wdio-reportportal-reporter
title: Raporty Portal Reporter
custom_edit_url: https://github.com/borisosipov/wdio-reportportal-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-reportportal-reporter jest pakietem zewnętrznym, więcej informacji znajdziesz na [GitHub](https://github.com/borisosipov/wdio-reportportal-reporter) | [npm](https://www.npmjs.com/package/wdio-reportportal-reporter)


![npm](https://img.shields.io/npm/v/wdio-reportportal-reporter)
![npm](https://img.shields.io/npm/dm/wdio-reportportal-reporter)
> Wtyczka reportera WebdriverIO do raportowania wyników do Report Portal([http://reportportal.io/](http://reportportal.io/)).

## Instalacja

Najłatwiejszym sposobem jest zachowanie `wdio-reportportal-reporter` i `wdio-reportportal-service` jako devDependency w Twoim `package.json`.

```json
{
  "devDependencies": {
    "wdio-reportportal-reporter": "^7.0.0",
    "wdio-reportportal-service": "^7.0.0"
  }
}
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj](https://webdriver.io/docs/gettingstarted.html).

## Konfiguracja

Skonfiguruj katalog wyjściowy w pliku wdio.conf.js:

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

# Dodatkowe API

Metody API mogą być dostępne za pomocą:

```js
const reporter = require('wdio-reportportal-reporter')
```

### Opis metod

* `reporter.addAttribute({key, value})` – dodaje atrybut do bieżącego testu.
  * `key` (*string*, opcjonalnie) - klucz atrybutu. Musi być niepustym ciągiem znaków.
  * `value` (*string*, wymagane) - wartość atrybutu. Musi być niepustym ciągiem znaków.
* `reporter.addAttributeToCurrentSuite({key, value})` - dodaje atrybut do bieżącego zestawu testów.
  * `key` (*string*, opcjonalnie) - klucz atrybutu. Musi być niepustym ciągiem znaków.
  * `value` (*string*, wymagane) - wartość atrybutu. Musi być niepustym ciągiem znaków.
* `reporter.addDescriptionToCurrentSuite(description)` - dodaje opis do bieżącego zestawu testów.
  * `description` (*string*) - treść opisu. Tekst może być sformatowany markdown.
* `reporter.addDescriptionToAllSuites(description)` - dodaje opis do wszystkich nadchodzących zestawów testów. (Użyj w hooku before all, aby każdy zestaw testów otrzymał ten sam opis)
  * `description` (*string*) - treść opisu. Tekst może być sformatowany markdown.
* `reporter.sendLog(level, message)` – wysyła log do bieżącego zestawu testów/elementu testu.
  * `level` (*string*) - poziom logowania. Wartości ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*) – treść komunikatu logu.
* `reporter.sendFile(level, name, content, [type])` – wysyła plik do bieżącego zestawu testów/elementu testu.
  * `level` (*string*) - poziom logowania. Wartości ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*) – nazwa pliku.
  * `content` (*string*) – zawartość załącznika
  * `type` (*string*, opcjonalnie) – typ MIME załącznika, domyślnie `image/png`
  * `message` (*string*) – treść komunikatu logu.
* `reporter.sendLogToTest(test, level, message)` - wysyła log do określonego testu.
  * `test` (*object*) - obiekt testu z hooka `afterTest\afterStep` wdio
  * `level` (*string*) - poziom logowania. Wartości ['trace', 'debug', 'info', 'warn', 'error'].
  * `message` (*string*) – treść komunikatu logu.
* `reporter.sendFileToTest(test, level, name, content, [type])` – wysyła plik do określonego testu.
  * `test` (*object*) - obiekt testu z hooka `afterTest\afterStep` wdio
  * `level` (*string*) - poziom logowania. Wartości ['trace', 'debug', 'info', 'warn', 'error'].
  * `name` (*string*) – nazwa pliku.
  * `content` (*string*) – zawartość załącznika
  * `type` (*string*, opcjonalnie) – typ MIME załącznika, domyślnie `image/png`
  * `message` (*string*) – treść komunikatu logu.

Uwaga: `sendLog`\\`sendFile` wysyła logi do **aktualnie uruchomionego elementu testu**. Oznacza to, że jeśli wyślesz log bez aktywnego testu (np. z hooków lub na poziomie zestawu testów), nie zostanie on wyświetlony w interfejsie Report Portal.

Metody `sendLogToTest`\\`sendFileToTest` są przydatne, gdy trzeba wysłać zrzuty ekranu lub logi do nieudanego elementu testu z hooka afterTest wdio.

Przykład Mocha:

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

Przykład Jasmine:

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

Przykład WDIO Cucumber "5.14.3+":

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

## Uzyskiwanie linku do strony uruchomienia w interfejsie Report Portal

```js
const RpService = require("wdio-reportportal-service");
...
    onComplete: async function (_, config) {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`)
    }
...
```

lub bardziej złożony sposób

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

## Raportowanie testu do istniejącego uruchomienia

Jeśli chcesz raportować test do istniejącego aktywnego uruchomienia, możesz przekazać go do reportera za pomocą zmiennej środowiskowej `REPORT_PORTAL_LAUNCH_ID`
Jesteś odpowiedzialny za zakończenie uruchomienia, jak również rozpoczęcie takiego uruchomienia.

```sh
export REPORT_PORTAL_LAUNCH_ID=SomeLaunchId
npm run wdio
```

## Licencja

Ten projekt jest objęty licencją MIT - więcej szczegółów w pliku [LICENSE.md](https://github.com/BorisOsipov/wdio-reportportal-reporter/blob/master/LICENSE)