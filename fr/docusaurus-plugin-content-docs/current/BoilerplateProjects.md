---
id: boilerplates
title: Projets Boilerplate
description: "Parcourez les projets boilerplate de la communauté pour WebdriverIO avec Mocha, Jasmine, Cucumber, Electron et des configurations mobiles pour démarrer votre propre suite de tests."
---

Au fil du temps, notre communauté a développé plusieurs projets dont vous pouvez vous inspirer pour mettre en place votre propre suite de tests.

# Projets Boilerplate v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Notre propre boilerplate pour les suites de tests Cucumber. Nous avons créé plus de 150 définitions d'étapes prédéfinies pour vous, afin que vous puissiez commencer à écrire des fichiers de fonctionnalités dans votre projet immédiatement.

- Framework :
    - Cucumber
    - WebdriverIO
- Fonctionnalités :
    - Plus de 150 étapes prédéfinies qui couvrent presque tout ce dont vous avez besoin
    - Intègre la fonctionnalité multi-remote de WebdriverIO
    - Application de démonstration dédiée

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Projet boilerplate pour exécuter des tests WebdriverIO avec Jasmine en utilisant les fonctionnalités de Babel et le pattern page objects.

- Frameworks
    - WebdriverIO
    - Jasmine
- Fonctionnalités
    - Pattern Page Object
    - Intégration Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Projet boilerplate pour exécuter des tests WebdriverIO sur une application Electron minimale.

- Frameworks
    - WebdriverIO
    - Mocha
- Fonctionnalités
    - Mocking de l'API Electron

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Ce projet boilerplate contient des tests mobiles WebdriverIO 9 avec Cucumber, TypeScript et Appium pour les plateformes Android et iOS, suivant le pattern Page Object Model. Il propose une journalisation complète, des rapports, des gestes mobiles, la navigation de l'application vers le web et une intégration CI/CD.

- Frameworks :
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Fonctionnalités :
    - Support multi-plateforme
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Gestes mobiles
      - Défilement
      - Balayage
      - Appui long
      - Masquer le clavier
    - Navigation de l'application vers le web
      - Changement de contexte
      - Support des WebView
      - Automatisation du navigateur (Chrome/Safari)
    - État de l'application réinitialisé
      - Réinitialisation automatique de l'application entre les scénarios
      - Comportement de réinitialisation configurable (noReset, fullReset)
    - Configuration des appareils
      - Gestion centralisée des appareils
      - Changement de plateforme facile
    - Exemple de structure de répertoires pour JavaScript / TypeScript. Ci-dessous pour la version JS, la version TS a également la même structure.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Générez automatiquement des classes Page Object WebdriverIO et des spécifications de test Mocha à partir de fichiers Gherkin .feature — réduisant l'effort manuel, améliorant la cohérence et accélérant l'automatisation QA. Ce projet produit non seulement du code compatible avec webdriver.io, mais améliore également toutes les fonctionnalités de webdriver.io. Nous avons créé deux variantes, l'une pour les utilisateurs de JavaScript et l'autre pour les utilisateurs de TypeScript. Mais les deux projets fonctionnent de la même manière.

***Comment ça marche ?***
- Le processus suit une automatisation en deux étapes :
- Étape 1 : Gherkin vers stepMap (Générer les fichiers stepMap.json)
  - Générer les fichiers stepMap.json :
    - Analyse les fichiers .feature écrits en syntaxe Gherkin.
    - Extrait les scénarios et les étapes.
    - Produit un fichier .stepMap.json structuré contenant :
      - action à effectuer (par ex. click, setText, assertVisible)
      - selectorName pour le mappage logique
      - selector pour l'élément DOM
      - note pour les valeurs ou les assertions
- Étape 2 : stepMap vers code (Générer le code WebdriverIO).
  Utilise stepMap.json pour générer :
  - Générer une classe de base page.js avec des méthodes partagées et la configuration browser.url().
  - Générer des classes Page Object Model (POM) compatibles WebdriverIO par fonctionnalité dans test/pageobjects/.
  - Générer des spécifications de test basées sur Mocha.
- Exemple de structure de répertoires pour JavaScript / TypeScript. Ci-dessous pour la version JS, la version TS a également la même structure.
```
project-root/
├── features/                   # Fichiers Gherkin .feature (entrée utilisateur / fichier source)
├── stepMaps/                   # Fichiers .stepMap.json générés automatiquement
├── test/
│   ├── pageobjects/            # Classes Page Object Model des tests WebdriverIO générées automatiquement
│   └── specs/                  # Spécifications de test Mocha générées automatiquement
├── src/
│   ├── cli.js                  # Logique principale de la CLI
│   ├── generateStepsMap.js     # Générateur feature vers stepMap
│   ├── generateTestsFromMap.js # Générateur stepMap vers page/spec
│   ├── utils.js                # Méthodes utilitaires
│   └── config.js               # Chemins, sélecteurs de repli, alias
│   └── __tests__/              # Tests unitaires (Vitest)
├── testgen.js                  # Point d'entrée de la CLI
│── wdio.config.js              # Configuration WebdriverIO
├── package.json                # Scripts et dépendances
├── selector-aliases.json       # Surcharges de sélecteurs optionnelles définies par l'utilisateur, prioritaires sur le sélecteur principal
```
---
# Projets Boilerplate v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework : WDIO-V8 avec Cucumber (V8x).
- Fonctionnalités :
    - Utilisation du Page Objects Model avec une approche basée sur les classes de style ES6 / ES7 et support de TypeScript
    - Exemples d'option multi-sélecteurs pour interroger un élément avec plusieurs sélecteurs à la fois
    - Exemples d'exécution multi-navigateurs et en navigateur headless avec Chrome et Firefox
    - Intégration de tests dans le cloud avec BrowserStack, Sauce Labs, TestMu AI (anciennement LambdaTest)
    - Exemples de lecture/écriture de données depuis MS-Excel pour une gestion facile des données de test à partir de sources de données externes, avec exemples
    - Support de base de données pour tout SGBDR (Oracle, MySql, TeraData, Vertica, etc.), exécution de requêtes / récupération de jeux de résultats, etc. avec exemples pour les tests E2E
    - Rapports multiples (Spec, Xunit/Junit, Allure, JSON) et hébergement des rapports Allure et Xunit/Junit sur un serveur Web.
    - Exemples avec les applications de démonstration https://search.yahoo.com/  et http://the-internet.herokuapp.com.
    - Fichier `.config` spécifique à BrowserStack, Sauce Labs, TestMu AI (anciennement LambdaTest) et Appium (pour l'exécution sur appareil mobile). Pour une configuration d'Appium en un clic sur une machine locale pour iOS et Android, consultez [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework : WDIO-V8 avec Mocha (V10x).
- Fonctionnalités :
    -  Utilisation du Page Objects Model avec une approche basée sur les classes de style ES6 / ES7 et support de TypeScript
    -  Exemples avec les applications de démonstration https://search.yahoo.com  et http://the-internet.herokuapp.com
    -  Exemples d'exécution multi-navigateurs et en navigateur headless avec Chrome et Firefox
    -  Intégration de tests dans le cloud avec BrowserStack, Sauce Labs, TestMu AI (anciennement LambdaTest)
    -  Rapports multiples (Spec, Xunit/Junit, Allure, JSON) et hébergement des rapports Allure et Xunit/Junit sur un serveur Web.
    -  Exemples de lecture/écriture de données depuis MS-Excel pour une gestion facile des données de test à partir de sources de données externes, avec exemples
    -  Exemples de connexion à tout SGBDR (Oracle, MySql, TeraData, Vertica, etc.), exécution de requêtes / récupération de jeux de résultats, etc. avec exemples pour les tests E2E
    -  Fichier `.config` spécifique à BrowserStack, Sauce Labs, TestMu AI (anciennement LambdaTest) et Appium (pour l'exécution sur appareil mobile). Pour une configuration d'Appium en un clic sur une machine locale pour iOS et Android, consultez [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework : WDIO-V8 avec Jasmine (V4x).
- Fonctionnalités :
    -  Utilisation du Page Objects Model avec une approche basée sur les classes de style ES6 / ES7 et support de TypeScript
    -  Exemples avec les applications de démonstration https://search.yahoo.com  et http://the-internet.herokuapp.com
    -  Exemples d'exécution multi-navigateurs et en navigateur headless avec Chrome et Firefox
    -  Intégration de tests dans le cloud avec BrowserStack, Sauce Labs, TestMu AI (anciennement LambdaTest)
    -  Rapports multiples (Spec, Xunit/Junit, Allure, JSON) et hébergement des rapports Allure et Xunit/Junit sur un serveur Web.
    -  Exemples de lecture/écriture de données depuis MS-Excel pour une gestion facile des données de test à partir de sources de données externes, avec exemples
    -  Exemples de connexion à tout SGBDR (Oracle, MySql, TeraData, Vertica, etc.), exécution de requêtes / récupération de jeux de résultats, etc. avec exemples pour les tests E2E
    -  Fichier `.config` spécifique à BrowserStack, Sauce Labs, TestMu AI (anciennement LambdaTest) et Appium (pour l'exécution sur appareil mobile). Pour une configuration d'Appium en un clic sur une machine locale pour iOS et Android, consultez [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Ce projet boilerplate contient des tests WebdriverIO 8 avec Cucumber et TypeScript, suivant le pattern page objects.

- Frameworks :
    - WebdriverIO v8
    - Cucumber v8

- Fonctionnalités :
    - Typescript v5
    - Pattern Page Object
    - Prettier
    - Support multi-navigateurs
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Exécution parallèle multi-navigateurs
    - Appium
    - Intégration de tests dans le cloud avec BrowserStack et Sauce Labs
    - Service Docker
    - Service de partage de données
    - Fichiers de configuration séparés pour chaque service
    - Gestion des données de test et lecture par type d'utilisateur
    - Rapports
      - Dot
      - Spec
      - Rapport HTML multiple cucumber avec captures d'écran des échecs
    - Pipelines Gitlab pour les dépôts Gitlab
    - Github actions pour les dépôts Github
    - Docker compose pour la mise en place du docker hub
    - Tests d'accessibilité avec AXE
    - Tests visuels avec Applitools
    - Mécanisme de journalisation


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Fonctionnalités
    - Contient des exemples de scénarios de test dans cucumber
    - Rapports HTML cucumber intégrés avec vidéos embarquées en cas d'échec
    - Services Lambdatest et CircleCI intégrés
    - Tests visuels, d'accessibilité et d'API intégrés
    - Fonctionnalité d'e-mail intégrée
    - Bucket s3 intégré pour le stockage et la récupération des rapports de test

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Projet modèle [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) pour vous aider à démarrer les tests d'acceptation de vos applications web en utilisant les dernières versions de WebdriverIO, Mocha et Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Rapports Serenity BDD

- Fonctionnalités
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Captures d'écran automatiques en cas d'échec des tests, intégrées dans les rapports
    - Configuration de l'intégration continue (CI) avec [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Rapports Serenity BDD de démonstration](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publiés sur GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Projet modèle [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) pour vous aider à démarrer les tests d'acceptation de vos applications web en utilisant les dernières versions de WebdriverIO, Cucumber et Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Rapports Serenity BDD

- Fonctionnalités
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Captures d'écran automatiques en cas d'échec des tests, intégrées dans les rapports
    - Configuration de l'intégration continue (CI) avec [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Rapports Serenity BDD de démonstration](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publiés sur GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Projet boilerplate pour exécuter des tests WebdriverIO dans le cloud Headspin (https://www.headspin.io/) en utilisant les fonctionnalités de Cucumber et le pattern page objects.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Fonctionnalités
    - Intégration cloud avec [Headspin](https://www.headspin.io/)
    - Supporte le Page Object Model
    - Contient des exemples de scénarios écrits dans le style déclaratif du BDD
    - Rapports HTML cucumber intégrés

# Projets Boilerplate v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Projet boilerplate pour exécuter des tests Appium avec WebdriverIO pour :

- Applications natives iOS/Android
- Applications hybrides iOS/Android
- Navigateurs Chrome Android et Safari iOS

Ce boilerplate inclut les éléments suivants :

- Framework : Mocha
- Fonctionnalités :
    - Configurations pour :
        - Applications iOS et Android
        - Navigateurs iOS et Android
    - Helpers pour :
        - WebView
        - Gestes
        - Alertes natives
        - Sélecteurs (Pickers)
     - Exemples de tests pour :
        - WebView
        - Connexion
        - Formulaires
        - Balayage
        - Navigateurs

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Tests WEB ATDD avec Mocha, WebdriverIO v6 avec PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Fonctionnalités
  - Modèle [Page Object](pageobjects)
  - Intégration Sauce Labs avec le [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Rapport Allure
  - Capture automatique de captures d'écran pour les tests en échec
  - Exemple CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Projet boilerplate pour exécuter des tests E2E avec Mocha.

- Frameworks :
    - WebdriverIO (v7)
    - Mocha
- Fonctionnalités :
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Tests de régression visuelle](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Pattern Page Object
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) et [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Exemple Github Actions
    -   Rapport Allure (captures d'écran en cas d'échec)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Projet boilerplate pour exécuter des tests **WebdriverIO v7** pour les éléments suivants :

[Scripts WDIO 7 avec TypeScript dans le framework Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Scripts WDIO 7 avec TypeScript dans le framework Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Exécuter un script WDIO 7 dans Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Logs réseau](https://github.com/17thSep/MonitorNetworkLogs/)

Projet boilerplate pour :

- Capturer les logs réseau
- Capturer tous les appels GET/POST ou une API REST spécifique
- Vérifier les paramètres de requête
- Vérifier les paramètres de réponse
- Stocker toutes les réponses dans un fichier séparé

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Projet boilerplate pour exécuter des tests appium pour les applications natives et les navigateurs mobiles en utilisant cucumber v7 et wdio v7 avec le pattern page object.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Fonctionnalités
    - Applications natives Android et iOS
    - Navigateur Chrome Android
    - Navigateur Safari iOS
    - Page Object Model
    - Contient des exemples de scénarios de test dans cucumber
    - Intégré avec des rapports HTML multiple cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Il s'agit d'un projet modèle pour vous aider à montrer comment exécuter des tests webdriverio sur des applications web en utilisant les dernières versions de WebdriverIO et du framework Cucumber. Ce projet a pour but de servir d'image de base que vous pouvez utiliser pour comprendre comment exécuter des tests WebdriverIO dans docker

Ce projet inclut :

- DockerFile
- Projet cucumber

En savoir plus sur : [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Il s'agit d'un projet modèle pour vous aider à montrer comment exécuter des tests electronJS avec WebdriverIO. Ce projet a pour but de servir d'image de base que vous pouvez utiliser pour comprendre comment exécuter des tests WebdriverIO electronJS.

Ce projet inclut :

- Exemple d'application electronjs
- Exemples de scripts de test cucumber

En savoir plus sur : [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Il s'agit d'un projet modèle pour vous aider à montrer comment automatiser des applications Windows avec winappdriver et WebdriverIO. Ce projet a pour but de servir d'image de base que vous pouvez utiliser pour comprendre comment exécuter des tests winappdriver et WebdriverIO.

En savoir plus sur : [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Il s'agit d'un projet modèle pour vous aider à montrer comment utiliser la capacité multi-remote de webdriverio avec les dernières versions de WebdriverIO et du framework Jasmine. Ce projet a pour but de servir d'image de base que vous pouvez utiliser pour comprendre comment exécuter des tests WebdriverIO dans docker

Ce projet utilise :
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Projet modèle pour exécuter des tests appium sur de vrais appareils Roku en utilisant mocha avec le pattern page object.

- Frameworks
    - WebdriverIO Async v7
    - Appium 3.0
    - Mocha v7
    - Rapports Allure

- Fonctionnalités
    - Page Object Model
    - Typescript
    - Capture d'écran en cas d'échec
    - Exemples de tests utilisant une chaîne Roku d'exemple

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Projet PoC pour des tests Cucumber E2E multi-remote ainsi que des tests Mocha pilotés par les données

- Framework :
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Fonctionnalités :
    - Tests E2E basés sur Cucumber
    - Tests pilotés par les données basés sur Mocha
    - Tests Web uniquement - en local ainsi que sur des plateformes cloud
    - Tests mobiles uniquement - émulateurs (ou appareils) locaux ainsi que dans le cloud distant
    - Tests Web + Mobile - multi-remote - en local ainsi que sur des plateformes cloud
    - Rapports multiples intégrés, dont Allure
    - Données de test (JSON / XLSX) gérées globalement afin d'écrire les données (créées à la volée) dans un fichier après l'exécution des tests
    - Workflow Github pour exécuter les tests et téléverser le rapport allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Il s'agit d'un projet boilerplate pour aider à montrer comment exécuter webdriverio en multi-remote en utilisant appium et le service chromedriver avec la dernière version de WebdriverIO.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Fonctionnalités
  - Modèle [Page Object](pageobjects)
  - Typescript
  - Tests Web + Mobile - multi-remote
  - Applications natives Android et iOS
  - Appium
  - Chromedriver
  - ESLint
  - Exemples de tests de connexion sur http://the-internet.herokuapp.com et sur l'[application de démonstration native WebdriverIO](https://github.com/webdriverio/native-demo-app)