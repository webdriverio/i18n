---
id: gmangiapelo-wdio-azure-devops-service
title: Azure DevOps Test Plans Service
custom_edit_url: https://github.com/gianlucamangiapelo/wdio-azure-devops-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @gmangiapelo/wdio-azure-devops-service är ett tredjepartspaket, för mer information se [GitHub](https://github.com/gianlucamangiapelo/wdio-azure-devops-service) | [npm](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

[![version](https://img.shields.io/npm/v/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)
[![downloads](https://img.shields.io/npm/dt/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

Publicerar [WebdriverIO](https://webdriver.io/) resultat på Azure DevOps Test Plans.

Kärnfunktioner:

* Stöd för Jasmine/Jest/Mocha och Cucumber runtime-ramverk
* Testresultat samlas under samma testkörning om du kör flera spec(test)-filer och de tillhör samma svit
* Resultat rapporteras omedelbart efter enskild testexekvering (rapportering i realtid)
* Testkörningen avslutas efter att den sista spec(test)-filen har avslutats
* Stöd för flera sviter


## Installation

Installera denna modul lokalt med följande kommando för att användas som en (dev-)dependency:

```shell
npm install --save @gmangiapelo/wdio-azure-devops-service
npm install --save-dev @gmangiapelo/wdio-azure-devops-service
```

Instruktioner om hur man installerar `WebdriverIO` finns [här.](https://webdriver.io/docs/gettingstarted)

## Användning

> _wdio-azure-devops-service_ stödjer **NodeJS 8 eller högre**

> _wdio-azure-devops-service_ stödjer **commonjs** och **esm**

### Konfiguration

Eftersom `@gmangiapelo/wdio-azure-devops-service` är en tjänst, kan du konfigurera den i din `wdio.conf.js`-fil enligt följande

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

### Testfallsinställning

Dina WDIO-tester bör inkludera ID för ditt Azure-testfall. Se till att dina testfalls-ID är skilda från dina testtitlar:

**Mocha-stil:**
```Javascript
// Bra:
it("C123 Can authenticate a valid user", ...

// Dåligt:
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid user C123", ...
```

**Cucumber-stil:**
```Gherkin
## Bra:
@C123
Scenario Can authenticate a valid user
@c123
Scenario Can authenticate a valid user,

## Dåligt:
@c123stringTest
Scenario Can authenticate a valid user
```

### Azure DevOps Rapport Exempel

Detta är ett exempel på resultat som skickats till AZ Test Plans under en testkörning
![AzureDevops Test Plans example](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/./img/AZ-DevOps-example.png)

<br />

## Tjänstealternativ

### pat

Den personliga åtkomsttoken som genererats i Azure DevOps med API-behörighet inställd.

Exempel: `"3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn"`

Typ: `string`

Krävs: `true`

### organizationUrl

Bas-URL för din Azure DevOps-instans.

Exempel: `"https://dev.azure.com/gianlucamangiapelo"`

Typ: `string`

Krävs: `true`

### projectId

ID för projektet i Azure DevOps.

För att hitta projectId, använd `GET {organizationUrl}/_apis/projects?api-version=6.0` och kopiera lämplig `id`.

Exempel: `"3cf7dbc9-cb1e-4240-93f2-9a5960ab3945"`

Typ: `string`

Krävs: `true`

### planId

Test planId som du kan hämta i Azure DevOps Test Plan-sektionen.

Exempel: `124`

Typ: `integer`

Krävs: `true`

### suiteId

SuiteId som du kan hämta i Azure DevOps Test Plan-sektionen. Vid nästlade sviter, hämta rot-suiteId, tjänsten itererar över alla undersviter.

Exempel: `21`

Typ: `integer`

Krävs: `true`

### runName

Ett beskrivande namn för testkörningen.

Exempel: `"FE regression tests run"`

Typ: `string`

Krävs: `true`

### caseIdRegex

Anpassat reguljärt uttryck för att matcha testCaseId från tagg eller titeltestfall.

Typ: `string`

Standard: `"@?[cC](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\d+)"`

Krävs: `false`

## Författare
Gianluca Mangiapelo - [github](https://github.com/gianlucamangiapelo)