---
id: wdio-qunit-service
title: QUnit Service
custom_edit_url: https://github.com/mauriciolauffer/wdio-qunit-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-qunit-service ist ein Paket von Drittanbietern. Weitere Informationen finden Sie auf [GitHub](https://github.com/mauriciolauffer/wdio-qunit-service) | [npm](https://www.npmjs.com/package/wdio-qunit-service)

[![npm](https://img.shields.io/npm/v/wdio-qunit-service)](https://www.npmjs.com/package/wdio-qunit-service) [![test](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml/badge.svg)](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml)

[WebdriverIO](https://webdriver.io/) (wdio) Service für die Ausführung von Browser-basierten [QUnit](https://qunitjs.com/) Tests und deren dynamische Konvertierung in `wdio` Test-Suites.

## Ersatz für Karma

`QUnit Service` ist ein direkter Ersatz für diejenigen, die [Karma JS](https://karma-runner.github.io/latest/index.html) verwenden, um ihre `QUnit` Tests auszuführen ([karma-qunit](https://github.com/karma-runner/karma-qunit/), [karma-ui5](https://github.com/SAP/karma-ui5) oder jede andere Kombination aus Karma und QUnit). Karma ist [veraltet](https://github.com/karma-runner/karma) und Entwickler sollten zu modernen Alternativen wechseln!

Wenn Sie Ihre QUnit-Tests so beibehalten möchten, wie sie sind, ohne Umschreiben und ohne Refactoring, ist `QUnit Service` alles, was Sie brauchen. Es führt Ihre QUnit-HTML-Dateien in einem Browser aus und erfasst alle Ergebnisse im `wdio`-Format.

Dadurch können Entwickler `QUnit Service` in Verbindung mit allem verwenden, was im `wdio`-Ökosystem verfügbar ist.

Möchten Sie den Testlauf als [Video](https://webdriver.io/docs/wdio-video-reporter/) aufzeichnen? Vielleicht einen [Screenshot](https://webdriver.io/docs/api/browser/saveScreenshot/) erstellen oder als [PDF](https://webdriver.io/docs/api/browser/savePDF/) speichern? Die [Code-Abdeckung](https://www.npmjs.com/package/wdio-monocart-service) überprüfen? Die Testergebnisse im [JUnit](https://webdriver.io/docs/junit-reporter)-Format speichern? Nur zu, `QUnit Service` steht Ihnen nicht im Weg.

## Installation

Nach der Konfiguration von `WebdriverIO` installieren Sie `wdio-qunit-service` als devDependency in Ihrer `package.json` Datei.

```shell
npm install wdio-qunit-service --save-dev
```

Wenn Sie `WebdriverIO` noch nicht konfiguriert haben, sehen Sie sich die offizielle [Dokumentation](https://webdriver.io/docs/gettingstarted) an.

## Konfiguration

Um `QUnit Service` zu verwenden, müssen Sie es nur zur `services`-Liste in Ihrer `wdio.conf.js`-Datei hinzufügen. Die wdio-Dokumentation enthält alle Informationen zur [Konfigurationsdatei](https://webdriver.io/docs/configurationfile):

```js
// wdio.conf.js
export const config = {
  // ...
  services: ["qunit"],
  // ...
};
```

## Verwendung

Stellen Sie sicher, dass der Webserver läuft, bevor Sie die Tests ausführen. `wdio` startet den Webserver nicht.

### Mit .spec oder .test Dateien

In Ihrem WebdriverIO-Test müssen Sie zur QUnit-HTML-Testseite navigieren und dann `browser.getQUnitResults()` aufrufen.

```js
describe("QUnit test page", () => {
  it("should pass QUnit tests", async () => {
    await browser.url("http://localhost:8080/test/unit/unitTests.qunit.html");
    await browser.getQUnitResults();
  });
});
```

Es wird empfohlen, für jede QUnit-HTML-Testseite eine WebdriverIO-Testdatei zu haben. Dies stellt sicher, dass die Tests parallel und vollständig isoliert ausgeführt werden.

### Nur Konfiguration, keine .spec oder .test Dateien

Wenn Sie keine spec/test-Dateien erstellen möchten, können Sie eine Liste von QUnit-HTML-Dateien an die Konfiguration übergeben, und die Tests werden automatisch generiert.

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

### Testergebnisse

Testergebnisse könnten so aussehen:
![QUnit Service test results](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./wdio-qunit-service-results.png?raw=true)

## Beispiele

Schauen Sie sich den Ordner [examples](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/) für Beispiele mit `javascript`, `typescript` und mehr an.

### Verwendung in SAP Fiori / UI5 Apps

Einfaches [Beispiel](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/) mit der bekannten [openui5-sample-app](https://github.com/SAP/openui5-sample-app):

- Erstellen Sie eine Konfigurationsdatei: [wdio.conf.js](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/wdio.conf.js)

- Teilen Sie `wdio` mit, wo die QUnit-Testdateien zu finden sind:

- - Fügen Sie die QUnit-Dateien zur [Service-Konfiguration](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app-no-specs/webapp/test/wdio.conf.js) hinzu
- - oder
- - Erstellen Sie eine WebdriverIO-Testdatei für [Unit-Tests](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/unit/unit.test.js) und eine weitere für [OPA5-Tests](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/integration/opa.test.js)

- Der Webserver muss vor der Ausführung der Tests laufen

- Führen Sie es aus $ `wdio run webapp/test/wdio.conf.js`

## Autor

Mauricio Lauffer

- LinkedIn: [https://www.linkedin.com/in/mauriciolauffer](https://www.linkedin.com/in/mauriciolauffer)

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/LICENSE) Datei für Details.