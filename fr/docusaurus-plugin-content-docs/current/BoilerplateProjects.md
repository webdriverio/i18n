---
id: boilerplates
title: Projets de base
---

Au fil du temps, notre communauté a développé plusieurs projets que vous pouvez utiliser comme inspiration pour configurer votre propre suite de tests.

# Projets de base v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Notre propre boilerplate pour les suites de tests Cucumber. Nous avons créé plus de 150 définitions d'étapes prédéfinies pour vous, afin que vous puissiez commencer à écrire des fichiers de fonctionnalités dans votre projet immédiatement.

- Framework:
    - Cucumber
    - WebdriverIO
- Caractéristiques:
    - Plus de 150 étapes prédéfinies qui couvrent presque tout ce dont vous avez besoin
    - Intègre la fonctionnalité Multiremote de WebdriverIO
    - Application de démonstration propre

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Projet de base pour exécuter des tests WebdriverIO avec Jasmine en utilisant les fonctionnalités Babel et le modèle de page objects.

- Frameworks
    - WebdriverIO
    - Jasmine
- Caractéristiques
    - Modèle Page Object
    - Intégration avec Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Projet de base pour exécuter des tests WebdriverIO sur une application Electron minimale.

- Frameworks
    - WebdriverIO
    - Mocha
- Caractéristiques
    - Simulation de l'API Electron

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Générez automatiquement des classes Page Object WebdriverIO et des spécifications de test Mocha à partir de fichiers .feature Gherkin — réduisant l'effort manuel, améliorant la cohérence et accélérant l'automatisation QA. Ce projet produit non seulement du code compatible avec webdriver.io, mais améliore également toutes les fonctionnalités de webdriver.io. Nous avons créé deux versions, une pour les utilisateurs JavaScript et l'autre pour les utilisateurs TypeScript. Mais les deux projets fonctionnent de la même manière.

***Comment ça marche ?***
- Le processus suit une automatisation en deux étapes :
- Étape 1 : Gherkin vers stepMap (Génération de fichiers stepMap.json)
  - Génération de fichiers stepMap.json :
    - Analyse les fichiers .feature écrits en syntaxe Gherkin.
    - Extrait les scénarios et les étapes.
    - Produit un fichier .stepMap.json structuré contenant :
      - action à effectuer (par exemple, click, setText, assertVisible)
      - selectorName pour le mappage logique
      - selector pour l'élément DOM
      - note pour les valeurs ou assertions
- Étape 2 : stepMap vers Code (Génération de code WebdriverIO).
  Utilise stepMap.json pour générer :
  - Génère une classe page.js de base avec des méthodes partagées et la configuration browser.url().
  - Génère des classes Page Object Model (POM) compatibles WebdriverIO par fonctionnalité dans test/pageobjects/.
  - Génère des spécifications de test basées sur Mocha.
- Exemple de structure de répertoire pour JavaScript / TypeScript. Ci-dessous pour la version JS, la version TS a la même structure.
```
project-root/
├── features/                   # Gherkin .feature files (user input / source file)
├── stepMaps/                   # Auto-generated .stepMap.json files
├── test/                 
│   ├── pageobjects/            # Auto-generated WebdriverIO tests Page Object Model classes
│   └── specs/                  # Auto-generated Mocha test specs
├── src/
│   ├── cli.js                  # Main CLI logic
│   ├── generateStepsMap.js     # Feature-to-stepMap generator
│   ├── generateTestsFromMap.js # stepMap-to-page/spec generator
│   ├── utils.js                # Helper methods
│   └── config.js               # Paths, fallback selectors, aliases
│   └── __tests__/              # Unit tests (Vitest)
├── testgen.js                  # CLI entry point
│── wdio.config.js              # WebdriverIO configuration
├── package.json                # Scripts and dependencies
├── selector-aliases.json       # Optional user-defined selector overrides the primary selector
```
---
# Projets de base v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework : WDIO-V8 avec Cucumber (V8x).
- Caractéristiques :
    - Modèle Page Objects utilisé avec une approche de classe basée sur ES6/ES7 et support TypeScript
    - Exemples d'option multi-sélecteur pour interroger un élément avec plus d'un sélecteur à la fois
    - Exemples d'exécution multi-navigateurs et navigateurs headless - Chrome et Firefox
    - Intégration avec les services cloud BrowserStack, Sauce Labs, LambdaTest
    - Exemples de lecture/écriture de données depuis MS-Excel pour une gestion facile des données de test à partir de sources externes avec exemples
    - Support de base de données pour tout SGBDR (Oracle, MySql, TeraData, Vertica, etc.), exécution de requêtes / récupération de résultats, etc. avec des exemples pour les tests E2E
    - Rapports multiples (Spec, Xunit/Junit, Allure, JSON) et hébergement des rapports Allure et Xunit/Junit sur WebServer
    - Exemples avec l'application de démonstration https://search.yahoo.com/ et http://the-internet.herokuapp.com
    - Fichiers `.config` spécifiques à BrowserStack, Sauce Labs, LambdaTest et Appium (pour la lecture sur appareil mobile). Pour une configuration Appium en un clic sur une machine locale pour iOS et Android, référez-vous à [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework : WDIO-V8 avec Mocha (V10x).
- Caractéristiques :
    - Modèle Page Objects utilisé avec une approche de classe basée sur ES6/ES7 et support TypeScript
    - Exemples avec l'application de démonstration https://search.yahoo.com et http://the-internet.herokuapp.com
    - Exemples d'exécution multi-navigateurs et navigateurs headless - Chrome et Firefox
    - Intégration avec les services cloud BrowserStack, Sauce Labs, LambdaTest
    - Rapports multiples (Spec, Xunit/Junit, Allure, JSON) et hébergement des rapports Allure et Xunit/Junit sur WebServer
    - Exemples de lecture/écriture de données depuis MS-Excel pour une gestion facile des données de test à partir de sources externes avec exemples
    - Exemples de connexion DB à tout SGBDR (Oracle, MySql, TeraData, Vertica, etc.), exécution de requêtes / récupération de résultats, etc. avec des exemples pour les tests E2E
    - Fichiers `.config` spécifiques à BrowserStack, Sauce Labs, LambdaTest et Appium (pour la lecture sur appareil mobile). Pour une configuration Appium en un clic sur une machine locale pour iOS et Android, référez-vous à [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework : WDIO-V8 avec Jasmine (V4x).
- Caractéristiques :
    - Modèle Page Objects utilisé avec une approche de classe basée sur ES6/ES7 et support TypeScript
    - Exemples avec l'application de démonstration https://search.yahoo.com et http://the-internet.herokuapp.com
    - Exemples d'exécution multi-navigateurs et navigateurs headless - Chrome et Firefox
    - Intégration avec les services cloud BrowserStack, Sauce Labs, LambdaTest
    - Rapports multiples (Spec, Xunit/Junit, Allure, JSON) et hébergement des rapports Allure et Xunit/Junit sur WebServer
    - Exemples de lecture/écriture de données depuis MS-Excel pour une gestion facile des données de test à partir de sources externes avec exemples
    - Exemples de connexion DB à tout SGBDR (Oracle, MySql, TeraData, Vertica, etc.), exécution de requêtes / récupération de résultats, etc. avec des exemples pour les tests E2E
    - Fichiers `.config` spécifiques à BrowserStack, Sauce Labs, LambdaTest et Appium (pour la lecture sur appareil mobile). Pour une configuration Appium en un clic sur une machine locale pour iOS et Android, référez-vous à [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Ce projet de base contient des tests WebdriverIO 8 avec cucumber et typescript, suivant le modèle des objets de page.

- Frameworks :
    - WebdriverIO v8
    - Cucumber v8

- Caractéristiques :
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
    - Intégration cloud testing avec BrowserStack & Sauce Labs
    - Service Docker
    - Service de partage de données
    - Fichiers de configuration séparés pour chaque service
    - Gestion des données de test & lecture par type d'utilisateur
    - Rapports
      - Dot
      - Spec
      - Rapport html cucumber multiple avec captures d'écran des échecs
    - Pipelines Gitlab pour le dépôt Gitlab
    - Actions Github pour le dépôt Github
    - Docker compose pour la configuration du hub docker
    - Tests d'accessibilité avec AXE
    - Tests visuels avec Applitools
    - Mécanisme de journalisation


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Caractéristiques
    - Contient un scénario de test exemple en cucumber
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

- Caractéristiques
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Captures d'écran automatiques en cas d'échec de test, intégrées aux rapports
    - Configuration d'Intégration Continue (CI) avec [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
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

- Caractéristiques
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Captures d'écran automatiques en cas d'échec de test, intégrées aux rapports
    - Configuration d'Intégration Continue (CI) avec [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Rapports de démonstration Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publiés sur GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Projet de base pour exécuter des tests WebdriverIO dans le cloud Headspin (https://www.headspin.io/) en utilisant les fonctionnalités Cucumber et le modèle d'objets de page.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Caractéristiques
    - Intégration cloud avec [Headspin](https://www.headspin.io/)
    - Supporte le modèle Page Object
    - Contient des scénarios exemples écrits dans un style déclaratif de BDD
    - Rapports html cucumber intégrés

# Projets de base v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Projet de base pour exécuter des tests Appium avec WebdriverIO pour :

- Applications natives iOS/Android
- Applications hybrides iOS/Android
- Navigateurs Android Chrome et iOS Safari

Ce boilerplate comprend :

- Framework : Mocha
- Caractéristiques :
    - Configurations pour :
        - Applications iOS et Android
        - Navigateurs iOS et Android
    - Helpers pour :
        - WebView
        - Gestes
        - Alertes natives
        - Pickers
     - Exemples de tests pour :
        - WebView
        - Login
        - Formulaires
        - Swipe
        - Navigateurs

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Tests ATDD WEB avec Mocha, WebdriverIO v6 avec PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Caractéristiques
  - Modèle [Page Object](pageobjects)
  - Intégration Sauce Labs avec [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Rapport Allure
  - Capture automatique de captures d'écran pour les tests qui échouent
  - Exemple CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Projet de base pour exécuter des tests E2E avec Mocha.

- Frameworks :
    - WebdriverIO (v7)
    - Mocha
- Caractéristiques :
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

Projet de base pour exécuter des tests **WebdriverIO v7** pour les éléments suivants :

[Scripts WDIO 7 avec TypeScript dans le framework Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Scripts WDIO 7 avec TypeScript dans le framework Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Exécuter un script WDIO 7 dans Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Journaux réseau](https://github.com/17thSep/MonitorNetworkLogs/)

Projet boilerplate pour :

- Capturer les journaux réseau
- Capturer tous les appels GET/POST ou une API REST spécifique
- Vérifier les paramètres de requête
- Vérifier les paramètres de réponse
- Stocker toutes les réponses dans un fichier séparé

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Projet de base pour exécuter des tests appium pour les applications natives et les navigateurs mobiles en utilisant cucumber v7 et wdio v7 avec le modèle d'objets de page.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Caractéristiques
    - Applications natives Android et iOS
    - Navigateur Android Chrome
    - Navigateur iOS Safari
    - Modèle Page Object
    - Contient des scénarios de test exemples en cucumber
    - Intégré avec plusieurs rapports html cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

C'est un projet modèle pour vous aider à montrer comment vous pouvez exécuter des tests webdriverio à partir d'applications Web en utilisant les dernières versions de WebdriverIO et du framework Cucumber. Ce projet vise à servir d'image de base que vous pouvez utiliser pour comprendre comment exécuter des tests WebdriverIO dans docker.

Ce projet comprend :

- DockerFile
- Projet cucumber

En savoir plus sur : [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

C'est un projet modèle pour vous aider à montrer comment vous pouvez exécuter des tests electronJS en utilisant WebdriverIO. Ce projet vise à servir d'image de base que vous pouvez utiliser pour comprendre comment exécuter des tests WebdriverIO electronJS.

Ce projet comprend :

- Application electronjs exemple
- Scripts de test cucumber exemples

En savoir plus sur : [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

C'est un projet modèle pour vous aider à montrer comment vous pouvez automatiser une application Windows en utilisant winappdriver et WebdriverIO. Ce projet vise à servir d'image de base que vous pouvez utiliser pour comprendre comment exécuter des tests winappdriver et WebdriverIO.

En savoir plus sur : [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


C'est un projet modèle pour vous aider à montrer comment vous pouvez exécuter la capacité multiremote de webdriverio avec les dernières versions de WebdriverIO et du framework Jasmine. Ce projet vise à servir d'image de base que vous pouvez utiliser pour comprendre comment exécuter des tests WebdriverIO dans docker.

Ce projet utilise :
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Projet modèle pour exécuter des tests appium sur de vrais appareils Roku en utilisant mocha avec le modèle d'objets de page.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Rapports Allure

- Caractéristiques
    - Modèle Page Object
    - Typescript
    - Capture d'écran en cas d'échec
    - Tests exemples utilisant une chaîne Roku exemple

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Projet PoC pour les tests Cucumber Multiremote E2E ainsi que les tests Mocha pilotés par les données

- Framework :
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Caractéristiques :
    - Tests E2E basés sur Cucumber
    - Tests pilotés par les données basés sur Mocha
    - Tests Web uniquement - en local et sur des plateformes cloud
    - Tests mobiles uniquement - émulateurs locaux et distants (ou appareils)
    - Tests Web + Mobile - Multiremote - local et plateformes cloud
    - Plusieurs rapports intégrés dont Allure
    - Données de test (JSON / XLSX) gérées globalement pour écrire les données (créées à la volée) dans un fichier après l'exécution du test
    - Workflow Github pour exécuter le test et télécharger le rapport allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

C'est un projet boilerplate pour aider à montrer comment exécuter webdriverio multi-remote en utilisant appium et le service chromedriver avec le dernier WebdriverIO.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Caractéristiques
  - Modèle [Page Object](pageobjects)
  - Typescript
  - Tests Web + Mobile - Multiremote
  - Applications natives Android et iOS
  - Appium
  - Chromedriver
  - ESLint
  - Exemples de tests pour la connexion sur http://the-internet.herokuapp.com et [l'application de démonstration native WebdriverIO](https://github.com/webdriverio/native-demo-app)