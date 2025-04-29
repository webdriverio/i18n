---
id: gmangiapelo-wdio-azure-devops-service
title: Servizio Azure DevOps Test Plans
custom_edit_url: https://github.com/gianlucamangiapelo/wdio-azure-devops-service/edit/main/README.md
---


> @gmangiapelo/wdio-azure-devops-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/gianlucamangiapelo/wdio-azure-devops-service) | [npm](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

[![version](https://img.shields.io/npm/v/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)
[![downloads](https://img.shields.io/npm/dt/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

Pubblica i risultati di [WebdriverIO](https://webdriver.io/) su Azure DevOps Test Plans.

Funzionalità principali:

* Supporto per i framework runtime Jasmine/Jest/Mocha e Cucumber
* I risultati dei test sono aggregati sotto la stessa sessione di test se si eseguono più file di spec (test) e appartengono alla stessa suite
* I risultati vengono riportati immediatamente dopo l'esecuzione di un singolo test (reportistica in tempo reale)
* La sessione di test viene chiusa dopo che l'ultimo file di spec (test) è stato terminato
* Supporto per più suite


## Installazione

Installa questo modulo localmente con il seguente comando da utilizzare come dipendenza (di sviluppo):

```shell
npm install --save @gmangiapelo/wdio-azure-devops-service
npm install --save-dev @gmangiapelo/wdio-azure-devops-service
```

Le istruzioni su come installare `WebdriverIO` si trovano [qui.](https://webdriver.io/docs/gettingstarted)

## Utilizzo

> _wdio-azure-devops-service_ supporta **NodeJS 8 o versioni successive**

> _wdio-azure-devops-service_ supporta **commonjs** ed **esm**

### Configurazione

Poiché `@gmangiapelo/wdio-azure-devops-service` è un servizio, puoi configurarlo nel tuo file `wdio.conf.js` come segue

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

### Configurazione del caso di test

I tuoi test WDIO dovrebbero includere l'ID del tuo caso di test Azure. Assicurati che gli ID dei tuoi casi di test siano distinti dai titoli dei test:

**Stile Mocha:**
```Javascript
// Corretto:
it("C123 Can authenticate a valid user", ...

// Errato:
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid user C123", ...
```

**Stile Cucumber:**
```Gherkin
## Corretto:
@C123
Scenario Can authenticate a valid user
@c123
Scenario Can authenticate a valid user,

## Errato:
@c123stringTest
Scenario Can authenticate a valid user
```

### Esempio di report Azure DevOps

Questo è un esempio dei risultati pubblicati su AZ Test Plans durante una sessione di test
![Esempio AzureDevops Test Plans](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/./img/AZ-DevOps-example.png)

<br />

## Opzioni del servizio

### pat

Il Personal Access Token generato in Azure DevOps con i permessi API impostati.

Esempio: `"3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn"`

Tipo: `string`

Obbligatorio: `true`

### organizationUrl

L'URL base della tua istanza Azure DevOps.

Esempio: `"https://dev.azure.com/gianlucamangiapelo"`

Tipo: `string`

Obbligatorio: `true`

### projectId

L'ID del progetto in Azure DevOps.

Per trovare il projectId usa `GET {organizationUrl}/_apis/projects?api-version=6.0` e copia l'`id` appropriato.

Esempio: `"3cf7dbc9-cb1e-4240-93f2-9a5960ab3945"`

Tipo: `string`

Obbligatorio: `true`

### planId

L'ID del test plan che puoi recuperare nella sezione Azure DevOps Test Plan.

Esempio: `124`

Tipo: `integer`

Obbligatorio: `true`

### suiteId

L'ID della suite che puoi recuperare nella sezione Azure DevOps Test Plan, in caso di suite annidate, ottieni l'ID della suite principale, il servizio itera su tutte le suite figlie.

Esempio: `21`

Tipo: `integer`

Obbligatorio: `true`

### runName

Un nome descrittivo per la sessione di test.

Esempio: `"FE regression tests run"`

Tipo: `string`

Obbligatorio: `true`

### caseIdRegex

Espressione regolare personalizzata per abbinare il testCaseId dal tag o dal titolo del caso di test.

Tipo: `string`

Predefinito: `"@?[cC](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\d+)"`

Obbligatorio: `false`

## Autore
Gianluca Mangiapelo - [github](https://github.com/gianlucamangiapelo)