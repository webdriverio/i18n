---
id: wdio-video-reporter
title: Rapporteur Vidéo
custom_edit_url: https://github.com/presidenten/wdio-video-reporter/edit/main/README.md
---


> wdio-video-reporter est un package tiers, pour plus d'informations, consultez [GitHub](https://github.com/presidenten/wdio-video-reporter) | [npm](https://www.npmjs.com/package/wdio-video-reporter)

![Logo](https://raw.githubusercontent.com/presidenten/wdio-video-reporter-example-report/master/wdio-video-reporter.png)

Ceci est un rapporteur pour [Webdriver IO v6 et supérieur](https://webdriver.io/) qui génère des vidéos de vos exécutions de tests wdio. Si vous utilisez allure, les cas de test sont automatiquement décorés avec les vidéos également. (Pour Webdriver IO v5, veuillez utiliser wdio-video-reporter version ^2.0.0.)

Les vidéos se retrouvent dans `wdio.config.outputDir`

Consultez un exemple de rapport Allure avec des vidéos incluses sur les tests échoués ici :
https://presidenten.github.io/wdio-video-reporter-example-report/

![example-allure-report](https://media.giphy.com/media/7Fgle7bHGrxR3zY6Gw/giphy.gif)

Avantages :
- Belles vidéos dans vos rapports allure
- Vidéos à vitesse humaine agréables, même si les tests sont rapides
- Fonctionne avec Selenium grid
- Fonctionne avec tous les webdrivers qui supportent `saveScreenshot`
- Vérifié sur les navigateurs de bureau suivants avec Selenium 3.141.59 :
  - Chrome
  - Firefox
  - Safari
  - Internet Explorer 11
  - Microsoft Edge
- Vérifié sur les appareils iOS et Android suivants avec [Appium](http://appium.io/docs/en/about-appium/getting-started/) 1.13.0-beta3 :
  - Iphone 8
  - Ipad Gen 6
  - Samsung galaxy S9
  - Samsung galaxy tab A10

Inconvénients :
- Fonctionne en prenant des captures d'écran après les "actions", ce qui rend les tests un peu plus lents. Ceci est atténué en choisissant soigneusement quels messages [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) doivent entraîner une capture d'écran
- Les pilotes Selenium n'incluent pas les boîtes d'alerte et les popups dans les captures d'écran, donc ils ne sont pas visibles dans les vidéos


Démarrage rapide
===========

Consultez le modèle simple sur [wdio-template](https://github.com/presidenten/wdio-template) pour vous mettre rapidement à niveau.

Clonez l'un des dépôts et installez les dépendances avec `yarn` ou `npm install`. Ensuite, exécutez `yarn e2e` ou `npm run e2e` dans le répertoire de démonstration et enfin `yarn report` ou `npm run report` pour voir le rapport allure.


Installation
============

Installer le rapporteur
--------------------

`yarn add wdio-video-reporter`
ou
`npm install wdio-video-reporter`


Ajouter le rapporteur à la configuration
--------------------------

En haut du fichier `wdio.conf.js`, importez la bibliothèque :
```
const video = require('wdio-video-reporter');
```

Ensuite, ajoutez le rapporteur vidéo à la configuration dans la propriété reporters :

```
 reporters: [
    [video, {
      saveAllVideos: false,       // Si true, sauvegarde également les vidéos pour les cas de test réussis
      videoSlowdownMultiplier: 3, // Plus élevé pour des vidéos plus lentes, plus bas pour des vidéos plus rapides [Valeur 1-100]
    }],
  ],
```


Utilisation avec Allure
-----------------

L'ajout du rapporteur Allure met également à jour automatiquement les rapports avec des vidéos sans besoin de configuration supplémentaire :-)

```
 reporters: [
    [video, {
      saveAllVideos: false,       // Si true, sauvegarde également les vidéos pour les cas de test réussis
      videoSlowdownMultiplier: 3, // Plus élevé pour des vidéos plus lentes, plus bas pour des vidéos plus rapides [Valeur 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
```


Configuration
=============

Paramètres de configuration normaux
-------------------------------

La plupart des utilisateurs voudront peut-être définir ces paramètres

- `saveAllVideos` Définir sur true pour sauvegarder les vidéos des tests réussis. `Par défaut : false`
- `videoSlowdownMultiplier` Entier entre [1-100]. Augmenter si les vidéos sont lues trop rapidement. `Par défaut : 3`
- `videoRenderTimeout` Nombre maximum de secondes d'attente pour le rendu d'une vidéo. `Par défaut : 5`
- `outputDir` S'il n'est pas défini, il utilise wdio.config.outputDir. `Par défaut : undefined`
- `outputDir` S'il n'est pas défini, il utilise wdio.config.outputDir. `Par défaut : undefined`
- `maxTestNameCharacters` Longueur maximale du nom du test. `Par défaut : 250`

Paramètres de configuration avancés
---------------------------------

Les utilisateurs avancés qui souhaitent modifier quand le moteur fait une capture d'écran peuvent modifier ces paramètres. Ces tableaux peuvent être remplis avec le dernier mot d'un message [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol), c'est-à-dire /session/:sessionId/`buttondown`.

- `addExcludedActions` Ajouter des actions où les captures d'écran sont inutiles. `Par défaut : []`
- `addJsonWireActions` Ajouter des actions où les captures d'écran sont manquantes. `Par défaut : []`
- `recordAllActions` Ignorer le filtrage et capturer tout. (Non recommandé) `Par défaut : false`

Pour voir les messages traités, définissez `wdio.config.logLevel: 'debug'` et vérifiez `outputDir/wdio-X-Y-Video-reporter.log`. Cela laissera également le répertoire de sortie des captures d'écran intact pour examen.

Pour éviter complètement toute journalisation supplémentaire et ne récupérer que les fichiers vidéo, définissez `wdio.config.logLevel: 'silent'`.

Support Cucumber
----------------

Si vous utilisez le rapporteur Allure, vous devez vous assurer de faire ce qui suit :

- Utilisez `chai` au lieu d'utiliser les assertions intégrées de node, sinon les tests échoués sont signalés comme cassés dans vos définitions d'étapes
- Ajoutez `useCucumberStepReporter: true` à l'option Allure dans le fichier `wdio.conf.js`, une configuration typique ressemblerait à ceci :
```
  reporters: [
    [video, {
      saveAllVideos: false,       // Si true, sauvegarde également les vidéos pour les cas de test réussis
      videoSlowdownMultiplier: 3, // Plus élevé pour des vidéos plus lentes, plus bas pour des vidéos plus rapides [Valeur 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }],
  ],
```
Pour un exemple complet, consultez la branche cucumber sur [wdio-template](https://github.com/presidenten/wdio-template/tree/cucumber)


Configuration Appium
------------

Depuis `wdio-video-reporter` v1.2.4, il existe un support pour aider Allure à différencier les navigateurs safari et chrome sur les ordinateurs de bureau et les appareils.
Le rapporteur utilise la propriété personnalisée `deviceType` pour identifier les différents appareils.
Les valeurs recommandées sont `phone` et `tablet`.
Il est recommandé d'inclure également `browserVersion` pour _tous_ les navigateurs afin d'éviter un bug dans le webdriver Chrome lors de l'utilisation d'appareils dans la même grille Selenium que les navigateurs Chrome de bureau.

Les fichiers vidéo générés auront également `deviceType` ajouté au nom du navigateur.

Exemple de configuration appium :
```
  "capabilities": [
    {
      ...
      "deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    }
  ],
```

Et `wdio-config.json` :
```
  "capabilities": [
    {
      ...
      "appium:deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    },
  ],
```


Contribution
============

Forkez, apportez des modifications, écrivez des tests, lintez, exécutez les tests, compilez et vérifiez dans la démo que les modifications fonctionnent comme elles le devraient, puis faites une PR.

Le dossier de démonstration fonctionne avec la version compilée de la bibliothèque, alors assurez-vous de compiler si vous avez ajouté de nouvelles fonctionnalités et que vous souhaitez les essayer.


Remerciements
======

Merci à [Johnson E](https://github.com/jonn-set) pour avoir ajouté le support Cucumber que beaucoup d'utilisateurs ont demandé.