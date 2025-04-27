---
id: boilerplates
title: Projets Boilerplate
---

Au fil du temps, notre communauté a développé plusieurs projets que vous pouvez utiliser comme inspiration pour configurer votre propre suite de tests.

# Projets Boilerplate v8

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Notre propre boilerplate pour les suites de tests Cucumber. Nous avons créé plus de 150 définitions d'étapes prédéfinies pour vous, afin que vous puissiez commencer à écrire des fichiers de fonctionnalités dans votre projet immédiatement.

- Framework:
    - Cucumber
    - WebdriverIO
- Fonctionnalités:
    - Plus de 150 étapes prédéfinies qui couvrent presque tout ce dont vous avez besoin
    - Intègre la fonctionnalité Multiremote de WebdriverIO
    - Application de démonstration propre

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Projet boilerplate pour exécuter des tests WebdriverIO avec Jasmine en utilisant les fonctionnalités Babel et le modèle de page objects.

- Frameworks
    - WebdriverIO
    - Jasmine
- Fonctionnalités
    - Modèle Page Object
    - Intégration avec Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Projet boilerplate pour exécuter des tests WebdriverIO sur une application Electron minimale.

- Frameworks
    - WebdriverIO
    - Mocha
- Fonctionnalités
    - Simulation de l'API Electron

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Ce projet boilerplate contient des tests WebdriverIO 8 avec cucumber et typescript, suivant le modèle de page objects.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Fonctionnalités:
    - Typescript v5
    - Modèle Page Object
    - Prettier
    - Support multi-navigateurs
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Exécution parallèle cross-browser
    - Appium
    - Intégration de tests cloud avec BrowserStack & Sauce Labs
    - Service Docker
    - Service de partage de données
    - Fichiers de configuration séparés pour chaque service
    - Gestion des données de test & lecture par type d'utilisateur
    - Rapports
      - Dot
      - Spec
      - Rapports html cucumber multiples avec captures d'écran des échecs
    - Pipelines Gitlab pour les dépôts Gitlab
    - Actions Github pour les dépôts Github
    - Docker compose pour configurer le hub docker
    - Tests d'accessibilité avec AXE
    - Tests visuels avec Applitools
    - Mécanisme de journalisation

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 avec Cucumber (V8x).
- Fonctionnalités:
    - Modèle Page Objects utilisant une approche basée sur les classes ES6/ES7 et support TypeScript
    - Exemples d'option multi-sélecteur pour interroger un élément avec plusieurs sélecteurs à la fois
    - Exemples d'exécution multi-navigateurs et navigateurs headless - Chrome et Firefox
    - Intégration de tests cloud avec BrowserStack, Sauce Labs, LambdaTest
    - Exemples de lecture/écriture de données depuis MS-Excel pour une gestion facile des données de test à partir de sources externes
    - Support de base de données pour tout SGBDR (Oracle, MySql, TeraData, Vertica etc.), exécution de requêtes / récupération de résultats etc. avec exemples pour les tests E2E
    - Rapports multiples (Spec, Xunit/Junit, Allure, JSON) et hébergement des rapports Allure et Xunit/Junit sur WebServer
    - Exemples avec les applications de démo https://search.yahoo.com/ et http://the-internet.herokuapp.com
    - Fichiers `.config` spécifiques pour BrowserStack, Sauce Labs, LambdaTest et Appium (pour la lecture sur appareil mobile). Pour une configuration Appium en un clic sur machine locale pour iOS et Android, voir [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 avec Mocha (V10x).
- Fonctionnalités:
    - Modèle Page Objects utilisant une approche basée sur les classes ES6/ES7 et support TypeScript
    - Exemples avec les applications de démo https://search.yahoo.com et http://the-internet.herokuapp.com
    - Exemples d'exécution multi-navigateurs et navigateurs headless - Chrome et Firefox
    - Intégration de tests cloud avec BrowserStack, Sauce Labs, LambdaTest
    - Rapports multiples (Spec, Xunit/Junit, Allure, JSON) et hébergement des rapports Allure et Xunit/Junit sur WebServer
    - Exemples de lecture/écriture de données depuis MS-Excel pour une gestion facile des données de test à partir de sources externes
    - Exemples de connexion à une base de données pour tout SGBDR (Oracle, MySql, TeraData, Vertica etc.), exécution de requêtes / récupération de résultats etc. avec exemples pour les tests E2E
    - Fichiers `.config` spécifiques pour BrowserStack, Sauce Labs, LambdaTest et Appium (pour la lecture sur appareil mobile). Pour une configuration Appium en un clic sur machine locale pour iOS et Android, voir [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 avec Jasmine (V4x).
- Fonctionnalités:
    - Modèle Page Objects utilisant une approche basée sur les classes ES6/ES7 et support TypeScript
    - Exemples avec les applications de démo https://search.yahoo.com et http://the-internet.herokuapp.com
    - Exemples d'exécution multi-navigateurs et navigateurs headless - Chrome et Firefox
    - Intégration de tests cloud avec BrowserStack, Sauce Labs, LambdaTest
    - Rapports multiples (Spec, Xunit/Junit, Allure, JSON) et hébergement des rapports Allure et Xunit/Junit sur WebServer
    - Exemples de lecture/écriture de données depuis MS-Excel pour une gestion facile des données de test à partir de sources externes
    - Exemples de connexion à une base de données pour tout SGBDR (Oracle, MySql, TeraData, Vertica etc.), exécution de requêtes / récupération de résultats etc. avec exemples pour les tests E2E
    - Fichiers `.config` spécifiques pour BrowserStack, Sauce Labs, LambdaTest et Appium (pour la lecture sur appareil mobile). Pour une configuration Appium en un clic sur machine locale pour iOS et Android, voir [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX)

## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Fonctionnalités
    - Contient des scénarios de test d'exemple en cucumber
    - Rapports html cucumber intégrés avec vidéos intégrées en cas d'échec
    - Services Lambdatest et CircleCI intégrés
    - Tests visuels, d'accessibilité et d'API intégrés
    - Fonctionnalité d'email intégrée
    - Bucket s3 intégré pour le stockage et la récupération des rapports de test

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Projet modèle [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) pour vous aider à démarrer avec les tests d'acceptation de vos applications web en utilisant les dernières versions de WebdriverIO, Mocha et Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Rapports Serenity BDD

- Fonctionnalités
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Captures d'écran automatiques en cas d'échec de test, intégrées aux rapports
    - Configuration d'Intégration Continue (CI) utilisant [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Rapports de démonstration Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publiés sur GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Projet modèle [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) pour vous aider à démarrer avec les tests d'acceptation de vos applications web en utilisant les dernières versions de WebdriverIO, Cucumber et Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Rapports Serenity BDD

- Fonctionnalités
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Captures d'écran automatiques en cas d'échec de test, intégrées aux rapports
    - Configuration d'Intégration Continue (CI) utilisant [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Rapports de démonstration Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publiés sur GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Projet boilerplate pour exécuter des tests WebdriverIO dans le cloud Headspin (https://www.headspin.io/) en utilisant les fonctionnalités Cucumber et le modèle de page objects.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Fonctionnalités
    - Intégration cloud avec [Headspin](https://www.headspin.io/)
    - Prend en charge le modèle Page Object
    - Contient des scénarios d'exemple écrits dans un style déclaratif de BDD
    - Rapports html cucumber intégrés

# Projets Boilerplate v7

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Projet boilerplate pour exécuter des tests Appium avec WebdriverIO pour:

- Applications natives iOS/Android
- Applications hybrides iOS/Android
- Navigateurs Android Chrome et iOS Safari

Ce boilerplate comprend:

- Framework: Mocha
- Fonctionnalités:
    - Configurations pour:
        - Applications iOS et Android
        - Navigateurs iOS et Android
    - Helpers pour:
        - WebView
        - Gestes
        - Alertes natives
        - Sélecteurs
     - Exemples de tests pour:
        - WebView
        - Connexion
        - Formulaires
        - Balayage
        - Navigateurs

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Tests ATDD WEB avec Mocha, WebdriverIO v6 avec PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Fonctionnalités
  - Modèle [Page Object](pageobjects)
  - Intégration Sauce Labs avec [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Rapport Allure
  - Capture automatique de captures d'écran pour les tests en échec
  - Exemple CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Projet boilerplate pour exécuter des tests E2E avec Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Fonctionnalités:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Tests de régression visuelle](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Modèle Page Object
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) et [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Exemple d'actions Github
    -   Rapport Allure (captures d'écran en cas d'échec)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Projet boilerplate pour exécuter des tests **WebdriverIO v7** pour:

[Scripts WDIO 7 avec TypeScript dans le framework Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Scripts