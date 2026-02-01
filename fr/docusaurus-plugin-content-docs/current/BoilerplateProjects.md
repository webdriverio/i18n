---
id: boilerplates
title: Projets de Boilerplate
---

Au fil du temps, notre communauté a développé plusieurs projets que vous pouvez utiliser comme inspiration pour configurer votre propre suite de tests.

# Projets Boilerplate v9

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
    - Mocking de l'API Electron
 
## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Ce projet boilerplate dispose de tests mobiles WebdriverIO 9 avec Cucumber, TypeScript et Appium pour les plateformes Android et iOS, suivant le modèle Page Object. Il comprend des fonctionnalités de journalisation complète, de rapports, de gestes mobiles, de navigation d'application vers web, et d'intégration CI/CD.

- Frameworks:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Fonctionnalités:
    - Support multi-plateforme
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Gestes mobiles
      - Défilement
      - Balayage
      - Appui long
      - Masquer le clavier
    - Navigation de l'application vers le Web
      - Changement de contexte
      - Support WebView
      - Automatisation de navigateur (Chrome/Safari)
    - État d'application frais
      - Réinitialisation automatique de l'application entre les scénarios
      - Comportement de réinitialisation configurable (noReset, fullReset)
    - Configuration de l'appareil
      - Gestion centralisée des appareils
      - Changement facile de plateforme
    - Exemple de structure de répertoire pour JavaScript / TypeScript. Ci-dessous est pour la version JS, la version TS a la même structure.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Générez automatiquement des classes Page Object WebdriverIO et des spécifications de test Mocha à partir de fichiers Gherkin .feature — réduisant l'effort manuel, améliorant la cohérence et accélérant l'automatisation QA. Ce projet produit non seulement du code compatible avec webdriver.io mais améliore également toutes les fonctionnalités de webdriver.io. Nous avons créé deux versions, l'une pour les utilisateurs JavaScript et l'autre pour les utilisateurs TypeScript. Mais les deux projets fonctionnent de la même manière.

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
      - note pour les valeurs ou l'assertion
- Étape 2 : stepMap vers Code (Génération de code WebdriverIO).
  Utilise stepMap.json pour générer :
  - Génération d'une classe page.js de base avec des méthodes partagées et la configuration browser.url().
  - Génération de classes Page Object Model (POM) compatibles WebdriverIO par fonctionnalité dans test/pageobjects/.
  - Génération de spécifications de test basées sur Mocha.
- Exemple de structure de répertoire pour JavaScript / TypeScript. Ci-dessous est pour la version JS, la version TS a la même structure.
```
project-root/
├── features/                   # Fichiers Gherkin .feature (entrée utilisateur / fichier source)
├── stepMaps/                   # Fichiers .stepMap.json générés automatiquement
├── test/                 
│   ├── pageobjects/            # Classes Page Object Model WebdriverIO générées automatiquement
│   └── specs/                  # Spécifications de test Mocha générées automatiquement
├── src/
│   ├── cli.js                  # Logique CLI principale
│   ├── generateStepsMap.js     # Générateur feature-to-stepMap
│   ├── generateTestsFromMap.js # Générateur stepMap-to-page/spec
│   ├── utils.js                # Méthodes d'aide
│   └── config.js               # Chemins, sélecteurs de secours, alias
│   └── __tests__/              # Tests unitaires (Vitest)
├── testgen.js                  # Point d'entrée CLI
│── wdio.config.js              # Configuration WebdriverIO
├── package.json                # Scripts et dépendances
├── selector-aliases.json       # Remplacements de sélecteurs définis par l'utilisateur (optionnel) qui remplacent le sélecteur principal
```
---
# Projets Boilerplate v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 avec Cucumber (V8x).
- Fonctionnalités:
    - Modèle Page Objects utilisant une approche de classe basée sur ES6/ES7 et support TypeScript
    - Exemples d'option de sélecteur multiple pour interroger un élément avec plusieurs sélecteurs à la fois
    - Exemples d'exécution multi-navigateurs et de navigateurs sans interface graphique - Chrome et Firefox
    - Intégration avec des tests cloud via BrowserStack, Sauce Labs, LambdaTest
    - Exemples de lecture/écriture de données depuis MS-Excel pour une gestion facile des données de test à partir de sources externes avec exemples
    - Support de base de données pour n'importe quel SGBDR (Oracle, MySql, TeraData, Vertica, etc.), exécution de requêtes/récupération de jeux de résultats, etc. avec des exemples pour les tests E2E
    - Rapports multiples (Spec, Xunit/Junit, Allure, JSON) et hébergement des rapports Allure et Xunit/Junit sur WebServer.
    - Exemples avec l'application de démonstration https://search.yahoo.com/ et http://the-internet.herokuapp.com.
    - Fichier `.config` spécifique à BrowserStack, Sauce Labs, LambdaTest et Appium (pour la lecture sur appareil mobile). Pour une configuration Appium en un clic sur machine locale pour iOS et Android, référez-vous à [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 avec Mocha (V10x).
- Fonctionnalités:
    - Modèle Page Objects utilisant une approche de classe basée sur ES6/ES7 et support TypeScript
    - Exemples avec l'application de démonstration https://search.yahoo.com et http://the-internet.herokuapp.com
    - Exemples d'exécution multi-navigateurs et de navigateurs sans interface graphique - Chrome et Firefox
    - Intégration avec des tests cloud via BrowserStack, Sauce Labs, LambdaTest
    - Rapports multiples (Spec, Xunit/Junit, Allure, JSON) et hébergement des rapports Allure et Xunit/Junit sur WebServer.
    - Exemples de lecture/écriture de données depuis MS-Excel pour une gestion facile des données de test à partir de sources externes avec exemples
    - Exemples de connexion DB à n'importe quel SGBDR (Oracle, MySql, TeraData, Vertica, etc.), exécution de requêtes/récupération de jeux de résultats, etc. avec des exemples pour les tests E2E
    - Fichier `.config` spécifique à BrowserStack, Sauce Labs, LambdaTest et Appium (pour la lecture sur appareil mobile). Pour une configuration Appium en un clic sur machine locale pour iOS et Android, référez-vous à [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 avec Jasmine (V4x).
- Fonctionnalités:
    - Modèle Page Objects utilisant une approche de classe basée sur ES6/ES7 et support TypeScript
    - Exemples avec l'application de démonstration https://search.yahoo.com et http://the-internet.herokuapp.com
    - Exemples d'exécution multi-navigateurs et de navigateurs sans interface graphique - Chrome et Firefox
    - Intégration avec des tests cloud via BrowserStack, Sauce Labs, LambdaTest
    - Rapports multiples (Spec, Xunit/Junit, Allure, JSON) et hébergement des rapports Allure et Xunit/Junit sur WebServer.
    - Exemples de lecture/écriture de données depuis MS-Excel pour une gestion facile des données de test à partir de sources externes avec exemples
    - Exemples de connexion DB à n'importe quel SGBDR (Oracle, MySql, TeraData, Vertica, etc.), exécution de requêtes/récupération de jeux de résultats, etc. avec des exemples pour les tests E2E
    - Fichier `.config` spécifique à BrowserStack, Sauce Labs, LambdaTest et Appium (pour la lecture sur appareil mobile). Pour une configuration Appium en un clic sur machine locale pour iOS et Android, référez-vous à [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Ce projet boilerplate contient des tests WebdriverIO 8 avec cucumber et typescript, suivant le modèle des page objects.

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
    - Exécution parallèle multi-navigateurs
    - Appium
    - Intégration avec des tests cloud via BrowserStack & Sauce Labs
    - Service Docker
    - Service de partage de données
    - Fichiers de configuration distincts pour chaque service
    - Gestion des données de test et lecture par type d'utilisateur
    - Rapports
      - Dot
      - Spec
      - Rapports html cucumber multiples avec captures d'écran en cas d'échec
    - Pipelines Gitlab pour les dépôts Gitlab
    - Actions Github pour les dépôts Github
    - Docker compose pour configurer le hub Docker
    - Tests d'accessibilité utilisant AXE
    - Tests visuels utilisant Applitools
    - Mécanisme de journalisation


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Fonctionnalités
    - Contient des scénarios de test échantillon en cucumber
    - Rapports html cucumber intégrés avec vidéos intégrées en cas d'échec
    - Services Lambdatest et CircleCI intégrés
    - Tests visuels, d'accessibilité et d'API intégrés
    - Fonctionnalité d'email intégrée
    - Bucket s3 intégré pour le stockage et la récupération des rapports de test

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) projet modèle pour vous aider à démarrer avec les tests d'acceptation de vos applications web en utilisant les dernières versions de WebdriverIO, Mocha et Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Rapports Serenity BDD

- Fonctionnalités
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Captures d'écran automatiques en cas d'échec de test, intégrées dans les rapports
    - Configuration d'Intégration Continue (CI) utilisant [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Rapports de démonstration Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publiés sur GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) projet modèle pour vous aider à démarrer avec les tests d'acceptation de vos applications web en utilisant les dernières versions de WebdriverIO, Cucumber et Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Rapports Serenity BDD

- Fonctionnalités
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Captures d'écran automatiques en cas d'échec de test, intégrées dans les rapports
    - Configuration d'Intégration Continue (CI) utilisant [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Rapports de démonstration Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publiés sur GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Projet boilerplate pour exécuter des tests WebdriverIO dans Headspin Cloud (https://www.headspin.io/) en utilisant les fonctionnalités Cucumber et le modèle de page objects.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Fonctionnalités
    - Intégration cloud avec [Headspin](https://www.headspin.io/)
    - Support du modèle Page Object
    - Contient des scénarios échantillons écrits dans un style déclaratif de BDD
    - Rapports html cucumber intégrés

# Projets Boilerplate v7
---

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
    - Assistants pour:
        - WebView
        - Gestes
        - Alertes natives
        - Pickers
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
  - Capture automatique de captures d'écran pour les tests échoués
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

Projet boilerplate pour exécuter des tests **WebdriverIO v7** pour les éléments suivants:

[Scripts WDIO 7 avec TypeScript dans le framework Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Scripts WDIO 7 avec TypeScript dans le framework Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Exécution de script WDIO 7 dans Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Journaux réseau](https://github.com/17thSep/MonitorNetworkLogs/)

Projet boilerplate pour:

- Capturer les journaux réseau
- Capturer tous les appels GET/POST ou une API REST spécifique
- Vérifier les paramètres de requête
- Vérifier les paramètres de réponse
- Stocker toutes les réponses dans un fichier séparé

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Projet boilerplate pour exécuter des tests appium pour des applications natives et des navigateurs mobiles en utilisant cucumber v7 et wdio v7 avec le modèle de page object.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Fonctionnalités
    - Applications natives Android et iOS
    - Navigateur Android Chrome
    - Navigateur iOS Safari
    - Modèle Page Object
    - Contient des scénarios de test échantillons en cucumber
    - Intégré avec plusieurs rapports html cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Ce projet modèle vise à vous montrer comment exécuter des tests webdriverio pour des applications Web en utilisant les derniers WebdriverIO et le framework Cucumber. Ce projet vise à servir d'image de base que vous pouvez utiliser pour comprendre comment exécuter des tests WebdriverIO dans docker.

Ce projet comprend:

- DockerFile
- Projet cucumber

En savoir plus sur: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Ce projet modèle vise à vous montrer comment exécuter des tests electronJS en utilisant WebdriverIO. Ce projet vise à servir d'image de base que vous pouvez utiliser pour comprendre comment exécuter des tests WebdriverIO electronJS.

Ce projet comprend:

- Application electronjs échantillon
- Scripts de test cucumber échantillon

En savoir plus sur: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Ce projet modèle vise à vous montrer comment automatiser une application Windows en utilisant winappdriver et WebdriverIO. Ce projet vise à servir d'image de base que vous pouvez utiliser pour comprendre comment exécuter des tests winappdriver et WebdriverIO.

En savoir plus sur: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Ce projet modèle vise à vous montrer comment exécuter la fonctionnalité multiremote de webdriverio avec les derniers WebdriverIO et le framework Jasmine. Ce projet vise à servir d'image de base que vous pouvez utiliser pour comprendre comment exécuter des tests WebdriverIO dans docker.

Ce projet utilise:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Projet modèle pour exécuter des tests appium sur des appareils Roku réels en utilisant mocha avec un modèle de page object.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Rapports Allure

- Fonctionnalités
    - Modèle Page Object
    - Typescript
    - Capture d'écran en cas d'échec
    - Tests d'exemple utilisant une chaîne Roku d'exemple

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Projet PoC pour des tests Cucumber Multiremote E2E ainsi que des tests Mocha pilotés par données

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Fonctionnalités:
    - Tests E2E basés sur Cucumber
    - Tests pilotés par données basés sur Mocha
    - Tests Web uniquement - en local ainsi que sur des plateformes cloud
    - Tests mobiles uniquement - émulateurs locaux et cloud distants (ou appareils)
    - Tests Web + Mobile - Multiremote - plateformes locales et cloud
    - Multiples rapports intégrés incluant Allure
    - Données de test (JSON / XLSX) gérées globalement afin d'écrire les données (créées à la volée) dans un fichier après l'exécution du test
    - Workflow Github pour exécuter le test et télécharger le rapport allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

C'est un projet boilerplate pour aider à montrer comment exécuter webdriverio multi-remote en utilisant les services appium et chromedriver avec les derniers WebdriverIO.

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
  - Exemples de tests de connexion sur http://the-internet.herokuapp.com et [application de démo native WebdriverIO](https://github.com/webdriverio/native-demo-app)