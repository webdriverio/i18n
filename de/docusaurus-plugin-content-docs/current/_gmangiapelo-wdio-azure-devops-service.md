---
id: gmangiapelo-wdio-azure-devops-service
title: Azure DevOps Test Plans Service
custom_edit_url: https://github.com/gianlucamangiapelo/wdio-azure-devops-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @gmangiapelo/wdio-azure-devops-service ist ein Drittanbieter-Paket. Weitere Informationen finden Sie auf [GitHub](https://github.com/gianlucamangiapelo/wdio-azure-devops-service) | [npm](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

[![version](https://img.shields.io/npm/v/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)
[![downloads](https://img.shields.io/npm/dt/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

Veröffentlicht [WebdriverIO](https://webdriver.io/) Ergebnisse in Azure DevOps Test Plans.

Hauptfunktionen:

* Unterstützung für Jasmine/Jest/Mocha und Cucumber Runtime-Frameworks
* Testergebnisse werden unter demselben Testlauf zusammengefasst, wenn Sie mehrere Spec(Test)-Dateien ausführen und diese zur selben Suite gehören
* Ergebnisse werden sofort nach der Ausführung eines einzelnen Tests gemeldet (Echtzeit-Reporting)
* Der Testlauf wird nach Beendigung der letzten Spec(Test)-Datei geschlossen
* Unterstützung mehrerer Suites


## Installation

Installieren Sie dieses Modul lokal mit dem folgenden Befehl, um es als (Dev-)Abhängigkeit zu verwenden:

```shell
npm install --save @gmangiapelo/wdio-azure-devops-service
npm install --save-dev @gmangiapelo/wdio-azure-devops-service
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier.](https://webdriver.io/docs/gettingstarted)

## Verwendung

> _wdio-azure-devops-service_ unterstützt **NodeJS 8 oder höher**

> _wdio-azure-devops-service_ unterstützt **commonjs** und **esm**

### Konfiguration

Da `@gmangiapelo/wdio-azure-devops-service` ein Service ist, können Sie ihn in Ihrer `wdio.conf.js`-Datei wie folgt einrichten

```js
import AzureDevopsService from "@gmangiapelo/wdio-azure-devops-service";
// wdio.conf.js
exports.config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
              AzureDevopsService,
              {
                  pat: '3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn',
                  organizationUrl: 'https://dev.azure.com/gianlucamangiapelo',
                  projectId: '8b3c68ac-f69d-41c6-bbad-921d8bae9819',
                  planId: 263072,
                  suiteId: 263073,
                  caseIdRegex: '@?[ref](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\\d+)',
                  runName: 'FE regression tests for TestPlan',
              },
          ],
    ],
    // ...
};
```

### Testfall-Setup

Ihre WDIO-Tests sollten die ID Ihres Azure-Testfalls enthalten. Stellen Sie sicher, dass Ihre Testfall-IDs sich von Ihren Testtiteln unterscheiden:

**Mocha-Stil:**
```Javascript
// Gut:
it("C123 Can authenticate a valid user", ...

// Schlecht:
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid user C123", ...
```

**Cucumber-Stil:**
```Gherkin
## Gut:
@C123
Scenario Can authenticate a valid user
@c123
Scenario Can authenticate a valid user,

## Schlecht:
@c123stringTest
Scenario Can authenticate a valid user
```

### Azure DevOps Berichtsbeispiel

Dies ist ein Beispiel für die Ergebnisse, die während eines Testlaufs in AZ Test Plans übertragen wurden
![AzureDevops Test Plans Beispiel](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/./img/AZ-DevOps-example.png)

<br />

## Service-Optionen

### pat

Das in Azure DevOps generierte Personal Access Token mit gesetzter API-Berechtigung.

Beispiel: `"3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn"`

Typ: `string`

Erforderlich: `true`

### organizationUrl

Die Basis-URL Ihrer Azure DevOps-Instanz.

Beispiel: `"https://dev.azure.com/gianlucamangiapelo"`

Typ: `string`

Erforderlich: `true`

### projectId

Die ID des Projekts in Azure DevOps.

Um die projectId zu finden, verwenden Sie `GET {organizationUrl}/_apis/projects?api-version=6.0` und kopieren Sie die entsprechende `id`.

Beispiel: `"3cf7dbc9-cb1e-4240-93f2-9a5960ab3945"`

Typ: `string`

Erforderlich: `true`

### planId

Die Test-plainId, die Sie im Azure DevOps Test Plan-Abschnitt finden können.

Beispiel: `124`

Typ: `integer`

Erforderlich: `true`

### suiteId

Die suiteId, die Sie im Azure DevOps Test Plan-Abschnitt finden können. Bei verschachtelten Suites verwenden Sie die Root-suiteId, der Service iteriert über alle untergeordneten Suites.

Beispiel: `21`

Typ: `integer`

Erforderlich: `true`

### runName

Ein beschreibender Name für den Testlauf.

Beispiel: `"FE regression tests run"`

Typ: `string`

Erforderlich: `true`

### caseIdRegex

Benutzerdefinierter regulärer Ausdruck, um die testCaseId aus Tag oder Titel des Testfalls zu extrahieren.

Typ: `string`

Standard: `"@?[cC](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\d+)"`

Erforderlich: `false`

## Autor
Gianluca Mangiapelo - [github](https://github.com/gianlucamangiapelo)