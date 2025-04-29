---
id: wdio-qunit-service
title: Service QUnit
custom_edit_url: https://github.com/mauriciolauffer/wdio-qunit-service/edit/main/README.md
---


> wdio-qunit-service est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/mauriciolauffer/wdio-qunit-service) | [npm](https://www.npmjs.com/package/wdio-qunit-service)

[![npm](https://img.shields.io/npm/v/wdio-qunit-service)](https://www.npmjs.com/package/wdio-qunit-service) [![test](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml/badge.svg)](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml)

[WebdriverIO](https://webdriver.io/) (wdio) service pour exécuter des tests [QUnit](https://qunitjs.com/) basés sur navigateur et les convertir dynamiquement en suites de tests `wdio`.

## Remplacement de Karma

`QUnit Service` est un remplaçant direct pour ceux qui utilisent [Karma JS](https://karma-runner.github.io/latest/index.html) pour exécuter leurs tests `QUnit` ([karma-qunit](https://github.com/karma-runner/karma-qunit/), [karma-ui5](https://github.com/SAP/karma-ui5) ou toute autre combinaison de Karma et QUnit). Karma est [déprécié](https://github.com/karma-runner/karma) et les utilisateurs devraient passer à des alternatives modernes !

Si vous souhaitez conserver vos tests QUnit tels quels, sans réécriture ni refactorisation, `QUnit Service` est tout ce dont vous avez besoin. Il exécute vos fichiers HTML QUnit dans un navigateur et capture tous les résultats au format `wdio`.

Grâce à cela, les développeurs peuvent utiliser `QUnit Service` en tandem avec tout ce qui est disponible dans l'écosystème `wdio`.

Vous voulez enregistrer l'exécution du test dans une [vidéo](https://webdriver.io/docs/wdio-video-reporter/) ? Peut-être prendre une [capture d'écran](https://webdriver.io/docs/api/browser/saveScreenshot/) ou l'enregistrer en [PDF](https://webdriver.io/docs/api/browser/savePDF/) ? Vérifier la [couverture de code](https://www.npmjs.com/package/wdio-monocart-service) ? Enregistrer les résultats de test au format [JUnit](https://webdriver.io/docs/junit-reporter) ? Allez-y, `QUnit Service` ne vous bloque pas.

## Installation

Après avoir configuré `WebdriverIO`, installez `wdio-qunit-service` comme devDependency dans votre fichier `package.json`.

```shell
npm install wdio-qunit-service --save-dev
```

Si vous n'avez pas encore configuré `WebdriverIO`, consultez la [documentation](https://webdriver.io/docs/gettingstarted) officielle.

## Configuration

Pour utiliser `QUnit Service`, vous devez simplement l'ajouter à la liste des `services` dans votre fichier `wdio.conf.js`. La documentation wdio contient toutes les informations relatives au [fichier de configuration](https://webdriver.io/docs/configurationfile) :

```js
// wdio.conf.js
export const config = {
  // ...
  services: ["qunit"],
  // ...
};
```

## Utilisation

Assurez-vous que le serveur web est opérationnel avant d'exécuter les tests. `wdio` ne démarrera pas le serveur web.

### Avec des fichiers .spec ou .test

Dans votre test WebdriverIO, vous devez naviguer vers la page de test HTML QUnit, puis appeler `browser.getQUnitResults()`.

```js
describe("QUnit test page", () => {
  it("should pass QUnit tests", async () => {
    await browser.url("http://localhost:8080/test/unit/unitTests.qunit.html");
    await browser.getQUnitResults();
  });
});
```

Il est recommandé d'avoir un fichier de test WebdriverIO par page de test HTML QUnit. Cela garantit que les tests s'exécuteront en parallèle et de manière totalement isolée.

### Configuration uniquement, pas de fichiers .spec ou .test

Si vous ne souhaitez pas créer de fichiers spec/test, vous pouvez passer une liste de fichiers HTML QUnit à la configuration et les tests seront générés automatiquement.

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

### Résultats des tests

Les résultats des tests pourraient ressembler à :
![QUnit Service test results](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./wdio-qunit-service-results.png?raw=true)

## Exemples

Consultez le dossier [examples](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/) pour des exemples utilisant `javascript`, `typescript` et plus.

### Utilisation dans les applications SAP Fiori / UI5

Exemple simple et direct [example](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/) utilisant la célèbre application [openui5-sample-app](https://github.com/SAP/openui5-sample-app) :

- Créez un fichier de configuration : [wdio.conf.js](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/wdio.conf.js)

- Indiquez à `wdio` où trouver les fichiers de test QUnit :

- - Incluez les fichiers QUnit dans la [configuration du service](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app-no-specs/webapp/test/wdio.conf.js)
- - ou
- - Créez un fichier de test WebdriverIO pour les [tests unitaires](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/unit/unit.test.js) et un autre pour les [tests OPA5](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/integration/opa.test.js)

- Le serveur web doit être en cours d'exécution avant d'exécuter les tests

- Exécutez-le $ `wdio run webapp/test/wdio.conf.js`

## Auteur

Mauricio Lauffer

- LinkedIn: [https://www.linkedin.com/in/mauriciolauffer](https://www.linkedin.com/in/mauriciolauffer)

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/LICENSE) pour plus de détails.