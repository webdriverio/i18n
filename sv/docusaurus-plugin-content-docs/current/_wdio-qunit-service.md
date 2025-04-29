---
id: wdio-qunit-service
title: QUnit Service
custom_edit_url: https://github.com/mauriciolauffer/wdio-qunit-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-qunit-service är ett tredjepartspaket, för mer information se [GitHub](https://github.com/mauriciolauffer/wdio-qunit-service) | [npm](https://www.npmjs.com/package/wdio-qunit-service)

[![npm](https://img.shields.io/npm/v/wdio-qunit-service)](https://www.npmjs.com/package/wdio-qunit-service) [![test](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml/badge.svg)](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml)

[WebdriverIO](https://webdriver.io/) (wdio) tjänst för att köra [QUnit](https://qunitjs.com/) webbläsarbaserade tester och dynamiskt konvertera dem till `wdio` testsviter.

## Ersätter Karma

`QUnit Service` är en direkt ersättning för de som använder [Karma JS](https://karma-runner.github.io/latest/index.html) för att köra sina `QUnit` tester ([karma-qunit](https://github.com/karma-runner/karma-qunit/), [karma-ui5](https://github.com/SAP/karma-ui5) eller någon annan kombination av Karma och QUnit). Karma är [utfasad](https://github.com/karma-runner/karma) och folk bör gå över till moderna alternativ!

Om du vill behålla dina QUnit-tester som de är, utan omskrivning och utan omfaktorisering, är `QUnit Service` allt du behöver. Den kör dina QUnit HTML-filer i en webbläsare och fångar alla resultat i `wdio`-format.

Tack vare detta kan utvecklare använda `QUnit Service` tillsammans med allt annat som finns tillgängligt i `wdio`-ekosystemet.

Vill du spela in testkörningen i en [video](https://webdriver.io/docs/wdio-video-reporter/)? Kanske ta en [skärmdump](https://webdriver.io/docs/api/browser/saveScreenshot/) eller spara den som [PDF](https://webdriver.io/docs/api/browser/savePDF/)? Kontrollera [kodtäckningen](https://www.npmjs.com/package/wdio-monocart-service)? Spara testresultaten i [JUnit](https://webdriver.io/docs/junit-reporter)-format? Kör på, `QUnit Service` står inte i din väg.

## Installation

Efter att ha konfigurerat `WebdriverIO`, installera `wdio-qunit-service` som en devDependency i din `package.json`-fil.

```shell
npm install wdio-qunit-service --save-dev
```

Om du inte har konfigurerat `WebdriverIO` ännu, kolla in den officiella [dokumentationen](https://webdriver.io/docs/gettingstarted).

## Konfiguration

För att använda `QUnit Service` behöver du bara lägga till den i `services`-listan i din `wdio.conf.js`-fil. Wdio-dokumentationen har all information relaterad till [konfigurationsfilen](https://webdriver.io/docs/configurationfile):

```js
// wdio.conf.js
export const config = {
  // ...
  services: ["qunit"],
  // ...
};
```

## Användning

Se till att webbservern är igång och körs innan du kör testerna. `wdio` kommer inte att starta webbservern.

### Med .spec eller .test filer

I ditt WebdriverIO-test behöver du navigera till QUnit HTML-testsidan och sedan anropa `browser.getQUnitResults()`.

```js
describe("QUnit test page", () => {
  it("should pass QUnit tests", async () => {
    await browser.url("http://localhost:8080/test/unit/unitTests.qunit.html");
    await browser.getQUnitResults();
  });
});
```

Det rekommenderas att ha en WebdriverIO-testfil per QUnit HTML-testsida. Detta säkerställer att testerna körs parallellt och helt isolerat.

### Endast konfiguration, inga .spec eller .test filer

Om du inte vill skapa spec/test-filer kan du skicka en lista med QUnit HTML-filer till konfigurationen och testerna kommer att genereras automatiskt.

```js
// wdio.conf.js
export const config = {
  // ...
  baseUrl: 'http://localhost:8080',
  services: [
    ['qunit', {
      paths: [
        'unit-tests.html',
        'integration-tests.html',
        'test/qunit.html'
      ]
    }],
  // ...
};
```

### Testresultat

Testresultat kan se ut så här:
![QUnit Service test results](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./wdio-qunit-service-results.png?raw=true)

## Exempel

Kolla in [examples](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/)-mappen för exempel med `javascript`, `typescript` med mera.

### Användning i SAP Fiori / UI5-appar

Rättfram [exempel](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/) med den välkända [openui5-sample-app](https://github.com/SAP/openui5-sample-app):

- Skapa en konfigurationsfil: [wdio.conf.js](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/wdio.conf.js)

- Berätta för `wdio` var QUnit-testfilerna finns:

- - Inkludera QUnit-filerna i [tjänstkonfigurationen](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app-no-specs/webapp/test/wdio.conf.js)
- - eller
- - Skapa en WebdriverIO-testfil för [enhetstester](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/unit/unit.test.js) och en annan för [OPA5-tester](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/integration/opa.test.js)

- Webbservern måste vara igång innan testerna körs

- Kör med $ `wdio run webapp/test/wdio.conf.js`

## Författare

Mauricio Lauffer

- LinkedIn: [https://www.linkedin.com/in/mauriciolauffer](https://www.linkedin.com/in/mauriciolauffer)

## Licens

Detta projekt är licensierat under MIT-licensen - se [LICENSE](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/LICENSE)-filen för detaljer.