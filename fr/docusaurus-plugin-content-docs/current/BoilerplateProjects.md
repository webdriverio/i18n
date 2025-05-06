---
id: boilerplates
title: Projets de base
---

Au fil du temps, notre communauté a développé plusieurs projets que vous pouvez utiliser comme inspiration pour mettre en place votre propre suite de tests.

# Projets de base v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Notre propre projet de base pour les suites de tests Cucumber. Nous avons créé plus de 150 définitions d'étapes prédéfinies pour vous, afin que vous puissiez commencer à écrire des fichiers de fonctionnalités dans votre projet immédiatement.

- Framework:
    - Cucumber
    - WebdriverIO
- Fonctionnalités:
    - Plus de 150 étapes prédéfinies qui couvrent presque tout ce dont vous avez besoin
    - Intègre la fonctionnalité Multiremote de WebdriverIO
    - Application de démonstration propre

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Projet de base pour exécuter des tests WebdriverIO avec Jasmine en utilisant les fonctionnalités de Babel et le modèle de page objects.

- Frameworks
    - WebdriverIO
    - Jasmine
- Fonctionnalités
    - Modèle Page Object
    - Intégration avec Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Projet de base pour exécuter des tests WebdriverIO sur une application Electron minimale.

- Frameworks
    - WebdriverIO
    - Mocha
- Fonctionnalités
    - Simulation de l'API Electron

## [amiya-pattnaik/gherkin-to-webdriverIO-test-generator](https://github.com/amiya-pattnaik/gherkin-to-webdriverIO-test-generator)
Générez automatiquement des classes Page Object WebdriverIO et des spécifications de test Mocha à partir de fichiers .feature Gherkin — réduisant l'effort manuel, améliorant la cohérence et accélérant l'automatisation QA. Ce projet produit non seulement du code compatible avec webdriver.io, mais améliore également toutes les fonctionnalités de webdriver.io.

***Comment ça fonctionne?***
- Le processus suit une automatisation en deux étapes:
- Étape 1: Gherkin vers stepMap (Générer des fichiers stepMap.json)
  - Générer des fichiers stepMap.json:
    - Analyse les fichiers .feature écrits en syntaxe Gherkin.
    - Extrait les scénarios et les étapes.
    - Produit un fichier .stepMap.json structuré contenant:
      - action à exécuter (par exemple, clic, setText, assertVisible)
      - selectorName pour le mappage logique
      - selector pour l'élément DOM
      - note pour les valeurs ou l'assertion
- Étape 2: stepMap vers code (Générer du code WebdriverIO)
  Utilise stepMap.json pour générer:
  - Générer une classe base page.js avec des méthodes partagées et la configuration browser.url().
  - Générer des classes Page Object Model (POM) compatibles WebdriverIO par fonctionnalité dans test/pageobjects/.
  - Générer des spécifications de test basées sur Mocha.
- Structure de répertoire
```
project-root/
├── features/               # Fichiers de fonctionnalités Gherkin d'entrée
├── stepMaps/               # Cartes d'étapes générées (JSON)
├── test/
│   ├── pageobjects/        # Classe Page de base générée, classes Page Object
│   └── specs/              # Spécifications de test générées
├── generateStepMap.js      # Script générateur de StepMap
├── generateTestsFromMap.js # Générateur de PageObject + spécification de test
├── package.json
├── README.md
└── wdio.conf.js
```
---
# Projets de base v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 avec Cucumber (V8x).
- Fonctionnalités:
    - Page Objects Model utilise l'approche basée sur les classes de style ES6/ES7 et la prise en charge de TypeScript
    - Exemples d'option de sélecteur multiple pour interroger un élément avec plusieurs sélecteurs à la fois
    - Exemples d'exécution multi-navigateurs et de navigateurs sans interface utilisateur utilisant Chrome et Firefox
    - Intégration de tests cloud avec BrowserStack, Sauce Labs, LambdaTest
    - Exemples de lecture/écriture de données depuis MS-Excel pour une gestion facile des données de test à partir de sources de données externes avec des exemples
    - Support de base de données pour n'importe quel SGBDR (Oracle, MySql, TeraData, Vertica etc.), exécution de requêtes / récupération de jeux de résultats, etc. avec des exemples pour les tests E2E
    - Rapports multiples (Spec, Xunit/Junit, Allure, JSON) et hébergement des rapports Allure et Xunit/Junit sur WebServer.
    - Exemples avec l'application de démonstration https://search.yahoo.com/ et http://the-internet.herokuapp.com.
    - Fichiers `.config` spécifiques à BrowserStack, Sauce Labs, LambdaTest et Appium (pour la lecture sur appareil mobile). Pour une configuration Appium en un clic sur une machine locale pour iOS et Android, référez-vous à [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 avec Mocha (V10x).
- Fonctionnalités:
    -  Page Objects Model utilise l'approche basée sur les classes de style ES6/ES7 et la prise en charge de TypeScript
    -  Exemples avec l'application de démonstration https://search.yahoo.com et http://the-internet.herokuapp.com
    -  Exemples d'exécution multi-navigateurs et de navigateurs sans interface utilisateur utilisant Chrome et Firefox
    -  Intégration de tests cloud avec BrowserStack, Sauce Labs, LambdaTest
    -  Rapports multiples (Spec, Xunit/Junit, Allure, JSON) et hébergement des rapports Allure et Xunit/Junit sur WebServer.
    -  Exemples de lecture/écriture de données depuis MS-Excel pour une gestion facile des données de test à partir de sources de données externes avec des exemples
    -  Exemples de connexion DB à n'importe quel SGBDR (Oracle, MySql, TeraData, Vertica etc.), exécution de requêtes / récupération de jeux de résultats, etc. avec des exemples pour les tests E2E
    -  Fichiers `.config` spécifiques à BrowserStack, Sauce Labs, LambdaTest et Appium (pour la lecture sur appareil mobile). Pour une configuration Appium en un clic sur une machine locale pour iOS et Android, référez-vous à [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 avec Jasmine (V4x).
- Fonctionnalités:
    -  Page Objects Model utilise l'approche basée sur les classes de style ES6/ES7 et la prise en charge de TypeScript
    -  Exemples avec l'application de démonstration https://search.yahoo.com et http://the-internet.herokuapp.com
    -  Exemples d'exécution multi-navigateurs et de navigateurs sans interface utilisateur utilisant Chrome et Firefox
    -  Intégration de tests cloud avec BrowserStack, Sauce Labs, LambdaTest
    -  Rapports multiples (Spec, Xunit/Junit, Allure, JSON) et hébergement des rapports Allure et Xunit/Junit sur WebServer.
    -  Exemples de lecture/écriture de données depuis MS-Excel pour une gestion facile des données de test à partir de sources de données externes avec des exemples
    -  Exemples de connexion DB à n'importe quel SGBDR (Oracle, MySql, TeraData, Vertica etc.), exécution de requêtes / récupération de jeux de résultats, etc. avec des exemples pour les tests E2E
    -  Fichiers `.config` spécifiques à BrowserStack, Sauce Labs, LambdaTest et Appium (pour la lecture sur appareil mobile). Pour une configuration Appium en un clic sur une machine locale pour iOS et Android, référez-vous à [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Ce projet de base contient des tests WebdriverIO 8 avec cucumber et typescript, suivant le modèle des page objects.

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
    - Reporting
      - Dot
      - Spec
      - Rapports html cucumber multiples avec captures d'écran des échecs
    - Pipelines Gitlab pour le dépôt Gitlab
    - Actions Github pour le dépôt Github
    - Docker compose pour configurer le hub docker
    - Tests d'accessibilité utilisant AXE
    - Tests visuels utilisant Applitools
    - Mécanisme de journalisation


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Fonctionnalités
    - Contient un scénario de test exemple dans cucumber
    - Rapports html cucumber intégrés avec vidéos intégrées en cas d'échec
    - Services Lambdatest et CircleCI intégrés
    - Tests visuel, d'accessibilité et API intégrés
    - Fonctionnalité d'email intégrée
    - Bucket s3 intégré pour le stockage et la récupération des rapports de test

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Projet modèle [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) pour vous aider à démarrer avec les tests d'acceptation de vos applications web en utilisant les dernières versions de WebdriverIO, Mocha et Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Reporting Serenity BDD

- Fonctionnalités
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Captures d'écran automatiques en cas d'échec de test, intégrées dans les rapports
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
    - Reporting Serenity BDD

- Fonctionnalités
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Captures d'écran automatiques en cas d'échec de test, intégrées dans les rapports
    - Configuration d'Intégration Continue (CI) utilisant [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Rapports de démonstration Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publiés sur GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Projet de base pour exécuter des tests WebdriverIO dans le cloud Headspin (https://www.headspin.io/) en utilisant les fonctionnalités Cucumber et le modèle de page objects.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Fonctionnalités
    - Intégration cloud avec [Headspin](https://www.headspin.io/)
    - Prend en charge le modèle Page Object
    - Contient des scénarios échantillons écrits dans un style BDD déclaratif
    - Rapports html cucumber intégrés

# Projets de base v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Projet de base pour exécuter des tests Appium avec WebdriverIO pour:

- Applications natives iOS/Android
- Applications hybrides iOS/Android
- Navigateurs Chrome Android et Safari iOS

Ce projet de base comprend les éléments suivants:

- Framework: Mocha
- Fonctionnalités:
    - Configurations pour:
        - Applications iOS et Android
        - Navigateurs iOS et Android
    - Helpers pour:
        - WebView
        - Gestes
        - Alertes natives
        - Pickers
     - Exemples de tests pour:
        - WebView
        - Connexion
        - Formulaires
        - Swipe
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
  - Capture automatique d'écrans pour les tests en échec
  - Exemple CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Projet de base pour exécuter des tests E2E avec Mocha.

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

Projet de base pour exécuter des tests **WebdriverIO v7** pour ce qui suit:

[Scripts WDIO 7 avec TypeScript dans le framework Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Scripts WDIO 7 avec TypeScript dans le framework Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Exécuter le script WDIO 7 dans Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Journaux réseau](https://github.com/17thSep/MonitorNetworkLogs/)

Projet de base pour:

- Capturer les journaux réseau
- Capturer tous les appels GET/POST ou une API REST spécifique
- Vérifier les paramètres de requête
- Vérifier les paramètres de réponse
- Stocker toutes les réponses dans un fichier séparé

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Projet de base pour exécuter des tests appium pour les applications natives et le navigateur mobile utilisant cucumber v7 et wdio v7 avec le modèle de page object.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Fonctionnalités
    - Applications natives Android et iOS
    - Navigateur Chrome Android
    - Navigateur Safari iOS
    - Modèle Page Object
    - Contient des scénarios de test échantillons dans cucumber
    - Intégré avec plusieurs rapports html cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Ceci est un projet modèle pour vous aider à montrer comment vous pouvez exécuter des tests webdriverio à partir d'applications Web en utilisant les dernières versions de WebdriverIO et du framework Cucumber. Ce projet vise à servir d'image de base que vous pouvez utiliser pour comprendre comment exécuter des tests WebdriverIO dans docker

Ce projet comprend:

- DockerFile
- Projet cucumber

En savoir plus: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Ceci est un projet modèle pour vous aider à montrer comment vous pouvez exécuter des tests electronJS en utilisant WebdriverIO. Ce projet vise à servir d'image de base que vous pouvez utiliser pour comprendre comment exécuter des tests WebdriverIO electronJS.

Ce projet comprend:

- Application electronjs échantillon
- Scripts de test cucumber échantillons

En savoir plus: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Ceci est un projet modèle pour vous aider à montrer comment vous pouvez automatiser une application Windows en utilisant winappdriver et WebdriverIO. Ce projet vise à servir d'image de base que vous pouvez utiliser pour comprendre comment exécuter des tests windappdriver et WebdriverIO.

En savoir plus: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Ceci est un projet modèle pour vous aider à montrer comment vous pouvez exécuter la capacité multiremote de webdriverio avec les derniers WebdriverIO et le framework Jasmine. Ce projet vise à servir d'image de base que vous pouvez utiliser pour comprendre comment exécuter des tests WebdriverIO dans docker

Ce projet utilise:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Projet modèle pour exécuter des tests appium sur des appareils Roku réels en utilisant mocha avec le modèle de page object.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Rapports Allure

- Fonctionnalités
    - Modèle Page Object
    - Typescript
    - Capture d'écran en cas d'échec
    - Tests d'exemple utilisant une chaîne Roku échantillon

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Projet PoC pour les tests Cucumber Multiremote E2E ainsi que les tests Mocha pilotés par les données

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Fonctionnalités:
    - Tests E2E basés sur Cucumber
    - Tests pilotés par les données basés sur Mocha
    - Tests Web uniquement - en local et sur des plateformes cloud
    - Tests mobiles uniquement - émulateurs locaux et cloud à distance (ou appareils)
    - Tests Web + Mobile - Multiremote - plateformes locales et cloud
    - Plusieurs rapports intégrés, y compris Allure
    - Données de test (JSON / XLSX) gérées globalement afin d'écrire les données (créées à la volée) dans un fichier après l'exécution du test
    - Workflow Github pour exécuter le test et télécharger le rapport Allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Ceci est un projet de base pour aider à montrer comment exécuter webdriverio multi-remote en utilisant appium et le service chromedriver avec le dernier WebdriverIO.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Fonctionnalités
  - Modèle [Page Object](pageobjects)
  - Typescript
  - Tests Web + Mobile - Multiremote
  - Applications natives Android et iOS
  - Appium
  - Chromedriver
  - ESLint
  - Exemples de tests pour se connecter à http://the-internet.herokuapp.com et à [l'application de démonstration native WebdriverIO](https://github.com/webdriverio/native-demo-app)