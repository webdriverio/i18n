---
id: wdio-qunit-service
title: Servizio QUnit
custom_edit_url: https://github.com/mauriciolauffer/wdio-qunit-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-qunit-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/mauriciolauffer/wdio-qunit-service) | [npm](https://www.npmjs.com/package/wdio-qunit-service)

[![npm](https://img.shields.io/npm/v/wdio-qunit-service)](https://www.npmjs.com/package/wdio-qunit-service) [![test](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml/badge.svg)](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml)

[WebdriverIO](https://webdriver.io/) (wdio) servizio per eseguire test basati su browser [QUnit](https://qunitjs.com/) e convertirli dinamicamente in suite di test `wdio`.

## Sostituzione di Karma

`QUnit Service` è un sostituto immediato per chi utilizza [Karma JS](https://karma-runner.github.io/latest/index.html) per eseguire i propri test `QUnit` ([karma-qunit](https://github.com/karma-runner/karma-qunit/), [karma-ui5](https://github.com/SAP/karma-ui5) o qualsiasi altra combinazione di Karma e QUnit). Karma è [deprecato](https://github.com/karma-runner/karma) e le persone dovrebbero passare ad alternative moderne!

Se desideri mantenere i tuoi test QUnit così come sono, senza riscritture e senza refactoring, `QUnit Service` è tutto ciò di cui hai bisogno. Esegue i tuoi file HTML QUnit in un browser e cattura tutti i risultati in formato `wdio`.

Grazie a questo, gli sviluppatori possono utilizzare `QUnit Service` insieme a tutto il resto disponibile nell'ecosistema `wdio`.

Vuoi registrare l'esecuzione del test in un [video](https://webdriver.io/docs/wdio-video-reporter/)? Magari fare uno [screenshot](https://webdriver.io/docs/api/browser/saveScreenshot/) o salvarlo in [PDF](https://webdriver.io/docs/api/browser/savePDF/)? Controllare la [Code coverage](https://www.npmjs.com/package/wdio-monocart-service)? Salvare i risultati dei test in formato [JUnit](https://webdriver.io/docs/junit-reporter)? Vai avanti, `QUnit Service` non ti ostacola.

## Installazione

Dopo aver configurato `WebdriverIO`, installa `wdio-qunit-service` come devDependency nel tuo file `package.json`.

```shell
npm install wdio-qunit-service --save-dev
```

Se non hai ancora configurato `WebdriverIO`, consulta la [documentazione](https://webdriver.io/docs/gettingstarted) ufficiale.

## Configurazione

Per utilizzare `QUnit Service` devi solo aggiungerlo all'elenco `services` nel tuo file `wdio.conf.js`. La documentazione wdio contiene tutte le informazioni relative al [file di configurazione](https://webdriver.io/docs/configurationfile):

```js
// wdio.conf.js
export const config = {
  // ...
  services: ["qunit"],
  // ...
};
```

## Utilizzo

Assicurati che il server web sia attivo e funzionante prima di eseguire i test. `wdio` non avvierà il server web.

### Con file .spec o .test

Nel tuo test WebdriverIO, devi navigare nella pagina di test HTML QUnit, quindi chiamare `browser.getQUnitResults()`.

```js
describe("QUnit test page", () => {
  it("should pass QUnit tests", async () => {
    await browser.url("http://localhost:8080/test/unit/unitTests.qunit.html");
    await browser.getQUnitResults();
  });
});
```

Si consiglia di avere un file di test WebdriverIO per ogni pagina di test HTML QUnit. Questo garantisce che i test vengano eseguiti in parallelo e completamente isolati.

### Solo configurazione, nessun file .spec o .test

Se non vuoi creare file spec/test, puoi passare un elenco di file HTML QUnit alla configurazione e i test verranno generati automaticamente.

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

### Risultati dei test

I risultati dei test potrebbero apparire così:
![QUnit Service test results](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./wdio-qunit-service-results.png?raw=true)

## Esempi

Controlla la cartella [examples](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/) per esempi che utilizzano `javascript`, `typescript` e altro.

### Utilizzo nelle app SAP Fiori / UI5

Un [esempio](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/) diretto utilizzando la ben nota [openui5-sample-app](https://github.com/SAP/openui5-sample-app):

- Crea un file di configurazione: [wdio.conf.js](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/wdio.conf.js)

- Indica a `wdio` dove trovare i file di test QUnit:

- - Includi i file QUnit nella [configurazione del servizio](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app-no-specs/webapp/test/wdio.conf.js)
- - oppure
- - Crea un file di test WebdriverIO per [test unitari](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/unit/unit.test.js) e un altro per [test OPA5](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/integration/opa.test.js)

- Il server web deve essere in esecuzione prima di eseguire i test

- Esegui $ `wdio run webapp/test/wdio.conf.js`

## Autore

Mauricio Lauffer

- LinkedIn: [https://www.linkedin.com/in/mauriciolauffer](https://www.linkedin.com/in/mauriciolauffer)

## Licenza

Questo progetto è concesso in licenza con la Licenza MIT - vedi il file [LICENSE](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/LICENSE) per i dettagli.