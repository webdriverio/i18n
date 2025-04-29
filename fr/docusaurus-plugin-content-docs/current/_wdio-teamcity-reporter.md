---
id: wdio-teamcity-reporter
title: Reporter Teamcity Reporter
custom_edit_url: https://github.com/webdriverio-community/wdio-teamcity-reporter/edit/main/README.md
---


> wdio-teamcity-reporter est un package tiers, pour plus d'informations veuillez consulter [GitHub](https://github.com/webdriverio-community/wdio-teamcity-reporter) | [npm](https://www.npmjs.com/package/wdio-teamcity-reporter)

Le reporter Teamcity pour WebdriverIO permet d'afficher les résultats des tests en temps réel et rend les informations des tests disponibles dans l'onglet Tests de la page des résultats de build.


## Installation

```bash
npm install wdio-teamcity-reporter --save-dev
```

Les instructions sur l'installation de WebdriverIO peuvent être trouvées ici : https://webdriver.io/docs/gettingstarted


## Configuration

Ajoutez le reporter dans votre fichier [wdio.conf.js](http://webdriver.io/guide/testrunner/configurationfile.html) :

```javascript
exports.config = {
  // ...
  reporters: [
    [
      'teamcity',
      {
        captureStandardOutput: false, // optionnel
        flowId: true, // optionnel
        message: '[title]', // optionnel
      }
    ]
  ],
  // ...
}
```

### Options

- `captureStandardOutput (boolean)` — si `true`, tous les messages de sortie standard (et d'erreur standard) reçus entre les messages `testStarted` et `testFinished` seront considérés comme la sortie du test. La valeur par défaut est `false` et suppose l'utilisation des messages de service testStdOut et testStdErr pour rapporter la sortie du test. Par défaut `false`.
- `flowId (boolean)` — si `true`, la propriété `flowId` sera ajoutée à tous les messages. Le suivi de flux est nécessaire par exemple pour distinguer des processus séparés s'exécutant en parallèle. Par défaut `true`.
- `message (string)` — possibilité de fournir un format particulier pour la propriété name. Clés possibles : `[browser]`, `[title]`. Exemple, `[browser] / [title]`. Par défaut `[title]`.


## Liens

- Référence à la documentation Teamcity concernant les messages de rapport : https://confluence.jetbrains.com/display/TCD65/Build+Script+Interaction+with+TeamCity
- Essai de Teamcity : https://blog.jetbrains.com/teamcity/2019/08/getting-started-with-teamcity-testdrive/


## Licence

> The MIT License