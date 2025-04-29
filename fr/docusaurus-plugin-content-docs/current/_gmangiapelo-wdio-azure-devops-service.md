---
id: gmangiapelo-wdio-azure-devops-service
title: Service des Plans de Test Azure DevOps
custom_edit_url: https://github.com/gianlucamangiapelo/wdio-azure-devops-service/edit/main/README.md
---


> @gmangiapelo/wdio-azure-devops-service est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/gianlucamangiapelo/wdio-azure-devops-service) | [npm](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

[![version](https://img.shields.io/npm/v/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)
[![downloads](https://img.shields.io/npm/dt/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

Publie les résultats de [WebdriverIO](https://webdriver.io/) sur Azure DevOps Test Plans.

Fonctionnalités principales :

* Prise en charge des frameworks d'exécution Jasmine/Jest/Mocha et Cucumber
* Les résultats des tests sont regroupés sous la même exécution de test si vous exécutez plusieurs fichiers de spécification (test) et qu'ils appartiennent à la même suite
* Les résultats sont rapportés immédiatement après l'exécution de chaque test (rapports en temps réel)
* L'exécution du test est fermée après que le dernier fichier de spécification (test) est terminé
* Prise en charge de suites multiples


## Installation

Installez ce module localement avec la commande suivante pour l'utiliser comme dépendance (de développement) :

```shell
npm install --save @gmangiapelo/wdio-azure-devops-service
npm install --save-dev @gmangiapelo/wdio-azure-devops-service
```

Les instructions sur comment installer `WebdriverIO` peuvent être trouvées [ici.](https://webdriver.io/docs/gettingstarted)

## Utilisation

> _wdio-azure-devops-service_ prend en charge **NodeJS 8 ou supérieur**

> _wdio-azure-devops-service_ prend en charge **commonjs** et **esm**

### Configuration

Comme `@gmangiapelo/wdio-azure-devops-service` est un service, vous pouvez le configurer dans votre fichier `wdio.conf.js` comme suit

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

### Configuration des cas de test

Vos tests WDIO doivent inclure l'ID de votre cas de test Azure. Assurez-vous que vos IDs de cas de test sont distincts de vos titres de test :

**Style Mocha :**
```Javascript
// Bon :
it("C123 Can authenticate a valid user", ...

// Mauvais :
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid user C123", ...
```

**Style Cucumber :**
```Gherkin
## Bon :
@C123
Scenario Can authenticate a valid user
@c123
Scenario Can authenticate a valid user,

## Mauvais :
@c123stringTest
Scenario Can authenticate a valid user
```

### Exemple de rapport Azure DevOps

Voici un exemple des résultats envoyés sur AZ Test Plans, pendant une exécution de test
![Exemple de AZ Test Plans](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/./img/AZ-DevOps-example.png)

<br />

## Options du service

### pat

Le jeton d'accès personnel généré dans Azure DevOps avec les permissions API configurées.

Exemple : `"3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn"`

Type : `string`

Requis : `true`

### organizationUrl

L'URL de base de votre instance Azure DevOps.

Exemple : `"https://dev.azure.com/gianlucamangiapelo"`

Type : `string`

Requis : `true`

### projectId

L'ID du projet dans Azure DevOps.

Pour trouver le projectId, utilisez `GET {organizationUrl}/_apis/projects?api-version=6.0` et copiez l'`id` approprié.

Exemple : `"3cf7dbc9-cb1e-4240-93f2-9a5960ab3945"`

Type : `string`

Requis : `true`

### planId

L'ID du plan de test que vous pouvez récupérer dans la section Test Plan d'Azure DevOps.

Exemple : `124`

Type : `integer`

Requis : `true`

### suiteId

L'ID de la suite que vous pouvez récupérer dans la section Test Plan d'Azure DevOps. Dans le cas de suites imbriquées, obtenez l'ID de la suite racine, le service itère sur toutes les suites enfants.

Exemple : `21`

Type : `integer`

Requis : `true`

### runName

Un nom descriptif pour l'exécution du test.

Exemple : `"FE regression tests run"`

Type : `string`

Requis : `true`

### caseIdRegex

Expression régulière personnalisée pour extraire le testCaseId à partir du tag ou du titre du cas de test.

Type : `string`

Par défaut : `"@?[cC](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\d+)"`

Requis : `false`

## Auteur
Gianluca Mangiapelo - [github](https://github.com/gianlucamangiapelo)