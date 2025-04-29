---
id: wdio-rerun-service
title: Service de relance
custom_edit_url: https://github.com/jwplayer/wdio-rerun-service/edit/master/README.md
---


> wdio-rerun-service est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/jwplayer/wdio-rerun-service) | [npm](https://www.npmjs.com/package/wdio-rerun-service)

[![wdio-rerun-service CI](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/dm/wdio-rerun-service)
![npm bundle size](https://img.shields.io/bundlephobia/min/wdio-rerun-service)
![GitHub issues](https://img.shields.io/github/issues/webdriverio-community/wdio-rerun-service)

Ce service suit les tests Mocha ou Jasmine défaillants et les scénarios Cucumber exécutés dans le framework de test [WebdriverIO](https://webdriver.io). Il permettra de relancer les tests ou scénarios défaillants ou instables.

_REMARQUE_ : Les utilisateurs du framework Cucumber exécutant les versions WebdriverIO `5.x` et `6.x` doivent utiliser la version `1.6.x`. Si vous utilisez la dernière version majeure `7.x`, utilisez la dernière version `1.7.x` de ce service.

## Re-run vs. Retry

La logique de `retry` intégrée à WebdriverIO pour Cucumber et Mocha/Jasmine est utile pour gérer les étapes instables dans Cucumber et Mocha/Jasmine. Les tentatives dans chaque framework présentent des mises en garde :
* Cucumber : Il ne tient pas compte du fait que certaines étapes peuvent ne pas être en mesure d'être réessayées au milieu d'un test. Exécuter une étape deux fois peut casser le reste du scénario ou ne pas être possible dans le contexte du test.
* Mocha/Jasmine : La logique de `retry` peut être appliquée à un test individuel, cependant, cela se fait toujours en temps réel et ne tient peut-être pas compte des problèmes temporels ou des problèmes de connectivité réseau.

Les principales distinctions du `re-run` :
* Relancera un scénario Cucumber entier et pas seulement une seule étape
* Permet de relancer un fichier spec entier après la fin d'une exécution de test principale
* Peut être copié et exécuté localement (impossible avec `retry`)
* Peut toujours être utilisé conjointement avec les méthodes `retry`
* Ne nécessite aucun changement de code pour appliquer la logique de `retry` aux tests instables ou problématiques

Il est recommandé de prendre le temps d'évaluer les options disponibles. Une solution hybride peut être la meilleure solution pour fournir les meilleurs résultats de test réels et exploitables.

## Installation

La façon la plus simple est d'ajouter `wdio-rerun-service` aux `devDependencies` dans votre `package.json`.

```json
{
    "devDependencies": {
        "wdio-rerun-service": "^1.6.2"
    }
}
```

Il peut être installé en utilisant `npm` :

```bash
npm install wdio-rerun-service
```

Une fois l'installation du package terminée, ajoutez-le au tableau `services` dans `wdio.conf.js` :

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [RerunService, {
        // ...
    }]
};
```

Les instructions sur la façon d'installer `WebdriverIO` peuvent être trouvées [ici.](https://webdriver.io/docs/gettingstarted.html)

## Configuration

Les options suivantes peuvent être ajoutées au fichier wdio.conf.js. Pour définir les options du service, vous devez ajouter le service à la liste `services` de la manière suivante :

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            // Options du service Re-run ici...
        }]
    ],
    // ...
};
```

### rerunDataDir
Répertoire où toutes les données JSON de relance seront conservées pendant l'exécution.

Type : `String`

Par défaut : `./results/rerun`

Exemple :
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunDataDir: './custom-rerun-directory'
        }]
    ],
    // ...
}
```

### rerunScriptPath
Chemin pour écrire le script Bash de relance.

Type : `String`

Par défaut : `./rerun.sh`

Exemple :
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunScriptPath: './custom-path-for-rerun.sh'
        }]
    ],
    // ...
}
```

### ignoredTags
(Cucumber uniquement) Ensemble de tags Cucumber à exclure. Si le scénario contient un tag, le service de relance ignorera l'analyse.

Type : `Array`

Par défaut : `[]`

Exemple :
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            ignoredTags: ['@known_bug']
        }]
    ],
    // ...
}
```

### commandPrefix
Préfixe qui sera ajouté à la commande de relance générée.

Type : `String`

Par défaut : `''`

Exemple :
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            commandPrefix: "VARIABLE=true"
        }]
    ],
    // ...
}
```
----