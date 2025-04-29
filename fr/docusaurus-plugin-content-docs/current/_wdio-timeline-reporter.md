---
id: wdio-timeline-reporter
title: Rapporteur Chronologique
custom_edit_url: https://github.com/QualityOps/wdio-timeline-reporter/edit/master/README.md
---


> wdio-timeline-reporter est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/QualityOps/wdio-timeline-reporter) | [npm](https://www.npmjs.com/package/wdio-timeline-reporter)


> Un rapporteur WebdriverIO tout-en-un pour une visualisation agrégée de vos résultats de test car "Voir c'est croire"

![example.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/example.png)

## Pourquoi

Parce que nous passons beaucoup de temps à déboguer des tests défaillants en passant de la sortie du terminal à la visualisation des captures d'écran d'erreur, etc. Ce rapporteur agrège toutes les informations typiques dont vous aurez besoin en un seul rapport. Exécutez des tests et obtenez une belle chronologie des événements que vous pourrez consulter pour vérifier davantage que tout semble correct.

#### Les fonctionnalités incluent :

- Fonctionne parfaitement avec les frameworks Mocha et Jasmine. Fonctionne également avec Cucumber mais chaque étape sera rapportée comme un test
- Résumé clair des résultats des tests.
- Détail de chaque test exécuté incluant toutes les captures d'écran prises pendant l'exécution du test.
- Filtrage des résultats de test. Idéal pour se concentrer sur les tests échoués
- Trace de la pile d'erreurs attachée au test.
- Capacité d'ajouter des informations supplémentaires au test pendant l'exécution.
- Aucun post-traitement requis. À la fin du processus de test wdio, un fichier de rapport html statique sera généré.
- Service de chronologie pour gérer la prise de captures d'écran, y compris le redimensionnement des images.

Un exemple de rapport html peut être trouvé [ici](http://htmlpreview.github.io/?https://github.com/QualityOps/wdio-timeline-reporter/blob/master/images/example-timeline-report.html)

Les instructions sur l'installation de `WebdriverIO` peuvent être trouvées [ici](http://webdriver.io/guide/getstarted/install.html).

## Installation

**POUR LA VERSION COMPATIBLE AVEC WEBDRIVERIO V4 VOIR [ICI](https://github.com/QualityOps/wdio-timeline-reporter/tree/v4)**

```shell
npm install --save wdio-timeline-reporter
```

Une dépendance sera ajoutée à votre `package.json`

```json
{
  "dependencies": {
    "wdio-timeline-reporter": "^5.1.0"
  }
}
```

### Utilisation

Ajoutez `timeline` au tableau des rapporteurs dans votre fichier de configuration wdio.

Importez également et ajoutez `TimelineService` depuis wdio-timeline-reporter.

Le service est obligatoire pour combiner les rapports et créer du html car les rapporteurs sont maintenant initialisés par instance d'exécution dans webdriverio 5. [Voir la discussion ouverte sur webdriverio](https://github.com/webdriverio/webdriverio/issues/3780)

Le TimelineService peut également gérer la prise de captures d'écran pendant l'exécution des tests. Vous avez la possibilité de réduire la taille et la qualité des images et d'intégrer les images dans le rapport en base64. Ceux-ci sont configurables à l'aide des [options du rapporteur.](#reporter-options)

```js
// wdio.conf.js
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
exports.config = {
  // ...
  reporters: [['timeline', { outputDir: './desired_location' }]],
  // ...
  services: [[TimelineService]]
};
```

### Options du rapporteur

Si vous souhaitez remplacer la configuration par défaut du rapporteur, ajoutez un objet literal reporterOptions au tableau timeline sous reporters comme indiqué ci-dessous.

![reporter-options.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/reporter-options.png)

| index | description                                                                                                                                                                                                  |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1.    | Répertoire où le fichier html et les captures d'écran seront créés. Option obligatoire                                                                                                                       |
| 2.    | Nom du fichier html du rapport. La valeur par défaut est `timeline-report.html`                                                                                                                              |
| 3.    | Intégrer des images en base64 dans le fichier html. La valeur par défaut est `false`                                                                                                                         |
| 4.    | Options d'objet pour la manipulation d'image                                                                                                                                                                 |
| 5.    | Définir la qualité JPEG. Pertinent uniquement si l'option `resize` est `true`. Plus la valeur est petite, plus la taille et la qualité de l'image seront petites. La valeur par défaut est `70`. Maximum autorisé est `100` |
| 6.    | Redimensionner l'image. La valeur par défaut est `false`                                                                                                                                                     |
| 7.    | valeur pour diminuer le nombre total de pixels. Pertinent uniquement si l'option `resize` est true. La valeur par défaut est `1` Valeurs valides `1 - 5`                                                     |
| 8.    | à quelle fréquence prendre des captures d'écran. Les valeurs prises en charge sont `on:error`, `before:click`, `none`. Par défaut à `none`. `before:click` est une excellente option pour créer une chronologie des captures d'écran de l'application testée. |

### Ajouter des informations supplémentaires au contexte de test

Il est possible d'ajouter des informations supplémentaires à un test en utilisant la méthode statique `addContext`. Cela peut être utile pour ajouter des informations importantes qui pourraient aider à déboguer les tests échoués, par exemple un utilisateur créé pendant l'exécution du test avec un nom d'utilisateur dynamique

#### Utilisation de base

La méthode statique `TimelineReporter.addContext` accepte soit un paramètre de chaîne, soit un objet literal avec deux propriétés `title` et `value` par exemple

```js
{ title: 'sessionId', value: 'b59bb9ec-ab15-475e-9ce6-de8a14ca0cd3' }
```

value peut également être un lien

##### Exemple Mocha

```js
const TimelineReporter = require('wdio-timeline-reporter').default;

describe('Suite', function() {
  it('Test', function() {
    // paramètre d'objet literal
    TimelineReporter.addContext({
      title: 'Test User',
      value: 'user id created during the test'
    });

    // valeur comme balise d'ancrage
    TimelineReporter.addContext({
      title: 'Dynamic link',
      value: '<a href="">Some important link related to test</a>'
    });

    // paramètre de chaîne
    TimelineReporter.addContext('This test might be flaky');
  });
});
```

## Remerciements

J'aimerais remercier les auteurs et les mainteneurs de [wdio-json-reporter](https://github.com/fijijavis/wdio-json-reporter). Analyser leur solution v5 a aidé à accélérer mon travail