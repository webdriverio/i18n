---
id: wdio-testrail-reporter
title: Rapporteur Testrail
custom_edit_url: https://github.com/webdriverio-community/wdio-testrail-reporter/edit/main/README.md
---


> @wdio/testrail-reporter est un package tiers, pour plus d'informations, veuillez consulter [GitHub](https://github.com/webdriverio-community/wdio-testrail-reporter) | [npm](https://www.npmjs.com/package/@wdio/testrail-reporter)

Ce rapporteur crée des rapports TestRail. La première chose dont vous avez besoin est d'activer l'API TestRail afin que le rapport puisse communiquer avec TestRail et transmettre les résultats des tests. Pour ce faire, connectez-vous à votre compte TestRail et allez dans Administration > Paramètres du site > API et assurez-vous de cocher la case près de Activer l'API.

Ajoutez l'ID de cas de test TestRail à la description du test. Par exemple :
```javascript
it("C123456 Page loads correctly", async () => {
```
Cela prend également en charge plusieurs caseIDs. Par exemple :
```javascript
it("C123456 C678910 Page loads correctly", async () => {
```

## Installation

Pour utiliser le rapporteur, ajoutez-le à votre `package.json` :

```sh
npm i --save-dev @wdio/testrail-reporter
```

## Utilisation

Ajoutez le rapporteur à votre fichier de configuration WDIO.

Exemple pour créer une nouvelle série de tests :

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false,
                caseIdTagPrefix: '' // used only for multi-platform Cucumber Scenarios
            }
        ]
    ],
    // ...
}
```

Exemple pour mettre à jour une série de tests existante :

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                existingRunId: 2345,
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```

Exemple lorsque vous avez besoin de différents identifiants de projet et/ou de suite en fonction de la suite de tests à exécuter :

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: process.env.TESTRAIL_PROJECT_NAME == 'PROJECT_A' ? 1 : 2,
                suiteId: process.env.TESTRAIL_SUITE_NAME == 'SUITE_A' ? 10 : 20,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```


## Options

### `projectId`

ID du projet testrail.

Type: `string`

### `suiteId`

ID de la suite, la suite 1 est par défaut.

Type: `string`

### `domain`

Domaine de votre instance testrail, par exemple `your-domain.testrail.io`.

Type: `string`

### `username`

Nom d'utilisateur de votre instance testrail.

Type: `string`

### `apiToken`

Jeton API de votre instance testrail.

Type: `string`

### `runName`

Nom personnalisé pour la série de tests.

Type: `string`

### `existingRunId`

ID d'une série de tests existante à mettre à jour.

Type: `string`

### `oneReport`

Créer une seule série de tests.

Type: `boolean`

### `includeAll`

Inclure tous les tests de la suite dans la série de tests.

Type: `boolean`

### `caseIdTagPrefix`

Préfixe utilisé pour localiser l'ID de cas dans les balises Cucumber, utile pour les exécutions de scénarios Cucumber multi-plateformes.

Type: `string`

### `useCucumber`

Indique si les tests sont écrits en utilisant le framework Cucumber. Par défaut, il est réglé sur `false`.

Type: `boolean`

---

Pour plus d'informations sur WebdriverIO, consultez la [page d'accueil](https://webdriver.io).