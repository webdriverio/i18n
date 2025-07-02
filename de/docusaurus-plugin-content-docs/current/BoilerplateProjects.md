---
id: boilerplates
title: Vorlage-Projekte
---

Im Laufe der Zeit hat unsere Community mehrere Projekte entwickelt, die Sie als Inspiration für die Einrichtung Ihrer eigenen Testsuite verwenden können.

# v9 Vorlage-Projekte

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Unsere eigene Vorlage für Cucumber-Testsuiten. Wir haben über 150 vordefinierte Step-Definitionen für Sie erstellt, damit Sie sofort mit dem Schreiben von Feature-Dateien in Ihrem Projekt beginnen können.

- Framework:
    - Cucumber
    - WebdriverIO
- Features:
    - Über 150 vordefinierte Schritte, die fast alles abdecken, was Sie benötigen
    - Integriert die Multiremote-Funktionalität von WebdriverIO
    - Eigene Demo-App

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Vorlage-Projekt zur Ausführung von WebdriverIO-Tests mit Jasmine unter Verwendung von Babel-Funktionen und dem Page-Objects-Pattern.

- Frameworks
    - WebdriverIO
    - Jasmine
- Features
    - Page Object Pattern
    - Sauce Labs Integration

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Vorlage-Projekt zur Ausführung von WebdriverIO-Tests auf einer minimalen Electron-Anwendung.

- Frameworks
    - WebdriverIO
    - Mocha
- Features
    - Electron API Mocking

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Automatische Generierung von WebdriverIO Page Object Klassen und Mocha-Testspezifikationen aus Gherkin .feature-Dateien — reduziert manuelle Arbeit, verbessert die Konsistenz und beschleunigt die QA-Automatisierung. Dieses Projekt erzeugt nicht nur Code, der mit webdriver.io kompatibel ist, sondern erweitert auch alle Funktionalitäten von webdriver.io. Wir haben zwei Versionen erstellt, eine für JavaScript-Nutzer und eine für TypeScript-Nutzer. Beide Projekte funktionieren jedoch auf die gleiche Weise.

***Wie es funktioniert?***
- Der Prozess folgt einer zweistufigen Automatisierung:
- Schritt 1: Gherkin zu stepMap (Generierung von stepMap.json-Dateien)
  - Generierung von stepMap.json-Dateien:
    - Analysiert .feature-Dateien, die in Gherkin-Syntax geschrieben sind.
    - Extrahiert Szenarien und Schritte.
    - Erzeugt eine strukturierte .stepMap.json-Datei, die Folgendes enthält:
      - auszuführende Aktion (z.B. click, setText, assertVisible)
      - selectorName für logisches Mapping
      - selector für das DOM-Element
      - note für Werte oder Assertions
- Schritt 2: stepMap zu Code (Generierung von WebdriverIO-Code).
  Verwendet stepMap.json zur Generierung von:
  - Generiert eine base page.js-Klasse mit gemeinsamen Methoden und browser.url()-Setup.
  - Generiert WebdriverIO-kompatible Page Object Model (POM)-Klassen pro Feature innerhalb von test/pageobjects/.
  - Generiert Mocha-basierte Testspezifikationen.
- Beispiel für die Verzeichnisstruktur für JavaScript / TypeScript. Unten ist die JS-Version, die TS-Version hat die gleiche Struktur.
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
# v8 Vorlage-Projekte

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 mit Cucumber (V8x).
- Features:
    - Page Objects Model verwendet den klassenbasierten Ansatz mit ES6/ES7-Stil und TypeScript-Unterstützung
    - Beispiele für Multi-Selector-Option zur Abfrage von Elementen mit mehr als einem Selektor gleichzeitig
    - Beispiele für Multi-Browser- und Headless-Browser-Ausführung mit Chrome und Firefox
    - Cloud-Testing-Integration mit BrowserStack, Sauce Labs, LambdaTest
    - Beispiele für Lesen/Schreiben von Daten aus MS-Excel für einfaches Testdatenmanagement aus externen Datenquellen mit Beispielen
    - Datenbankunterstützung für beliebige RDBMS (Oracle, MySql, TeraData, Vertica usw.), Ausführung von Abfragen / Abrufen von Ergebnissen usw. mit Beispielen für E2E-Tests
    - Mehrfaches Reporting (Spec, Xunit/Junit, Allure, JSON) und Hosting von Allure- und Xunit/Junit-Berichten auf einem WebServer
    - Beispiele mit Demo-App https://search.yahoo.com/ und http://the-internet.herokuapp.com
    - BrowserStack, Sauce Labs, LambdaTest und Appium spezifische `.config`-Dateien (für die Wiedergabe auf mobilen Geräten). Für eine Ein-Klick-Appium-Einrichtung auf lokalen Maschinen für iOS und Android siehe [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 mit Mocha (V10x).
- Features:
    - Page Objects Model verwendet den klassenbasierten Ansatz mit ES6/ES7-Stil und TypeScript-Unterstützung
    - Beispiele mit Demo-App https://search.yahoo.com und http://the-internet.herokuapp.com
    - Beispiele für Multi-Browser- und Headless-Browser-Ausführung mit Chrome und Firefox
    - Cloud-Testing-Integration mit BrowserStack, Sauce Labs, LambdaTest
    - Mehrfaches Reporting (Spec, Xunit/Junit, Allure, JSON) und Hosting von Allure- und Xunit/Junit-Berichten auf einem WebServer
    - Beispiele für Lesen/Schreiben von Daten aus MS-Excel für einfaches Testdatenmanagement aus externen Datenquellen mit Beispielen
    - Beispiele für DB-Verbindungen zu beliebigen RDBMS (Oracle, MySql, TeraData, Vertica usw.), Ausführung von Abfragen / Abrufen von Ergebnissen usw. mit Beispielen für E2E-Tests
    - BrowserStack, Sauce Labs, LambdaTest und Appium spezifische `.config`-Dateien (für die Wiedergabe auf mobilen Geräten). Für eine Ein-Klick-Appium-Einrichtung auf lokalen Maschinen für iOS und Android siehe [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 mit Jasmine (V4x).
- Features:
    - Page Objects Model verwendet den klassenbasierten Ansatz mit ES6/ES7-Stil und TypeScript-Unterstützung
    - Beispiele mit Demo-App https://search.yahoo.com und http://the-internet.herokuapp.com
    - Beispiele für Multi-Browser- und Headless-Browser-Ausführung mit Chrome und Firefox
    - Cloud-Testing-Integration mit BrowserStack, Sauce Labs, LambdaTest
    - Mehrfaches Reporting (Spec, Xunit/Junit, Allure, JSON) und Hosting von Allure- und Xunit/Junit-Berichten auf einem WebServer
    - Beispiele für Lesen/Schreiben von Daten aus MS-Excel für einfaches Testdatenmanagement aus externen Datenquellen mit Beispielen
    - Beispiele für DB-Verbindungen zu beliebigen RDBMS (Oracle, MySql, TeraData, Vertica usw.), Ausführung von Abfragen / Abrufen von Ergebnissen usw. mit Beispielen für E2E-Tests
    - BrowserStack, Sauce Labs, LambdaTest und Appium spezifische `.config`-Dateien (für die Wiedergabe auf mobilen Geräten). Für eine Ein-Klick-Appium-Einrichtung auf lokalen Maschinen für iOS und Android siehe [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Dieses Vorlage-Projekt enthält WebdriverIO 8-Tests mit Cucumber und TypeScript, nach dem Page-Objects-Pattern.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Features:
    - Typescript v5
    - Page Object Pattern
    - Prettier
    - Multi-Browser-Unterstützung
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Crossbrowser parallele Ausführung
    - Appium
    - Cloud-Testing-Integration mit BrowserStack & Sauce Labs
    - Docker-Service
    - Share-Data-Service
    - Separate Konfigurationsdateien für jeden Service
    - Testdatenmanagement & Lesen nach Benutzertyp
    - Reporting
      - Dot
      - Spec
      - Multiple Cucumber HTML-Bericht mit Screenshots bei Fehlern
    - Gitlab-Pipelines für Gitlab-Repository
    - Github-Actions für Github-Repository
    - Docker-Compose für die Einrichtung des Docker-Hubs
    - Barrierefreiheitstests mit AXE
    - Visuelle Tests mit Applitools
    - Log-Mechanismus


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Features
    - Enthält beispielhafte Testszenarien in Cucumber
    - Integrierte Cucumber-HTML-Berichte mit eingebetteten Videos bei Fehlern
    - Integrierte Lambdatest- und CircleCI-Dienste
    - Integrierte visuelle, Barrierefreiheits- und API-Tests
    - Integrierte E-Mail-Funktionalität
    - Integrierter S3-Bucket für Testberichtsspeicherung und -abruf

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) Template-Projekt, um Ihnen den Einstieg in das Akzeptanztesten Ihrer Webanwendungen mit den neuesten WebdriverIO, Mocha und Serenity/JS zu erleichtern.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD Reporting

- Features
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatische Screenshots bei Testfehlern, eingebettet in Berichte
    - Continuous Integration (CI) Setup mit [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo Serenity BDD Berichte](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) veröffentlicht auf GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) Template-Projekt, um Ihnen den Einstieg in das Akzeptanztesten Ihrer Webanwendungen mit den neuesten WebdriverIO, Cucumber und Serenity/JS zu erleichtern.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD Reporting

- Features
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatische Screenshots bei Testfehlern, eingebettet in Berichte
    - Continuous Integration (CI) Setup mit [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo Serenity BDD Berichte](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) veröffentlicht auf GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Vorlage-Projekt zur Ausführung von WebdriverIO-Tests in der Headspin Cloud (https://www.headspin.io/) mit Cucumber-Features und dem Page-Objects-Pattern.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Features
    - Cloud-Integration mit [Headspin](https://www.headspin.io/)
    - Unterstützt das Page Object Model
    - Enthält Beispielszenarien im deklarativen BDD-Stil
    - Integrierte Cucumber-HTML-Berichte

# v7 Vorlage-Projekte
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Vorlage-Projekt zur Ausführung von Appium-Tests mit WebdriverIO für:

- iOS/Android Native Apps
- iOS/Android Hybrid Apps
- Android Chrome und iOS Safari Browser

Diese Vorlage enthält Folgendes:

- Framework: Mocha
- Features:
    - Konfigurationen für:
        - iOS- und Android-Apps
        - iOS- und Android-Browser
    - Helfer für:
        - WebView
        - Gesten
        - Native Alerts
        - Picker
     - Testbeispiele für:
        - WebView
        - Login
        - Formulare
        - Swipe
        - Browser

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
ATDD WEB-Tests mit Mocha, WebdriverIO v6 mit PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Features
  - [Page Object](pageobjects) Model
  - Sauce Labs Integration mit [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Allure Report
  - Automatische Screenshot-Erfassung für fehlgeschlagene Tests
  - CircleCI-Beispiel
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Vorlage-Projekt zur Ausführung von E2E-Tests mit Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Features:
    - TypeScript
    - [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    - [Visual regression tests](https://github.com/wswebcreation/wdio-image-comparison-service)
    - Page Object Pattern
    - [Commit lint](https://github.com/conventional-changelog/commitlint) und [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    - ESlint
    - Prettier
    - Husky
    - Github Actions Beispiel
    - Allure-Bericht (Screenshots bei Fehlern)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Vorlage-Projekt zur Ausführung von **WebdriverIO v7**-Tests für Folgendes:

[WDIO 7 scripts with TypeScript in Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7 scripts with TypeScript in Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Run WDIO 7 script in Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Network logs](https://github.com/17thSep/MonitorNetworkLogs/)

Vorlage-Projekt für:

- Erfassung von Netzwerk-Logs
- Erfassung aller GET/POST-Aufrufe oder einer bestimmten REST-API
- Überprüfung von Anfrageparametern
- Überprüfung von Antwortparametern
- Speicherung aller Antworten in einer separaten Datei

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Vorlage-Projekt zur Ausführung von Appium-Tests für native und mobile Browser mit Cucumber v7 und wdio v7 mit Page-Object-Pattern.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Features
    - Native Android- und iOS-Apps
    - Android Chrome Browser
    - iOS Safari Browser
    - Page Object Model
    - Enthält Beispieltestszenarien in Cucumber
    - Integriert mit mehreren Cucumber-HTML-Berichten

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Dies ist ein Vorlagenprojekt, das Ihnen zeigen soll, wie Sie WebdriverIO-Tests von Webanwendungen mit den neuesten WebdriverIO und dem Cucumber-Framework ausführen können. Dieses Projekt soll als Basisimage dienen, das Sie verwenden können, um zu verstehen, wie WebdriverIO-Tests in Docker ausgeführt werden.

Dieses Projekt umfasst:

- DockerFile
- Cucumber-Projekt

Mehr dazu unter: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Dies ist ein Vorlagenprojekt, das Ihnen zeigen soll, wie Sie ElectronJS-Tests mit WebdriverIO ausführen können. Dieses Projekt soll als Basisimage dienen, das Sie verwenden können, um zu verstehen, wie WebdriverIO ElectronJS-Tests ausgeführt werden.

Dieses Projekt enthält:

- Beispiel-ElectronJS-App
- Beispiel-Cucumber-Testskripte

Mehr dazu unter: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Dies ist ein Vorlagenprojekt, das Ihnen zeigen soll, wie Sie Windows-Anwendungen mit Winappdriver und WebdriverIO automatisieren können. Dieses Projekt soll als Basisimage dienen, das Sie verwenden können, um zu verstehen, wie Windappdriver und WebdriverIO-Tests ausgeführt werden.

Mehr dazu unter: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Dies ist ein Vorlagenprojekt, das Ihnen zeigen soll, wie Sie die Multiremote-Fähigkeit von WebdriverIO mit den neuesten WebdriverIO und dem Jasmine-Framework ausführen können. Dieses Projekt soll als Basisimage dienen, das Sie verwenden können, um zu verstehen, wie WebdriverIO-Tests in Docker ausgeführt werden.

Dieses Projekt verwendet:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Vorlagenprojekt zur Ausführung von Appium-Tests auf echten Roku-Geräten mit Mocha und Page-Object-Pattern.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure-Reporting

- Features
    - Page Object Model
    - Typescript
    - Screenshot bei Fehlern
    - Beispieltests mit einem Beispiel-Roku-Kanal

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

PoC-Projekt für E2E-Multiremote-Cucumber-Tests sowie datengesteuerte Mocha-Tests

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Features:
    - Cucumber-basierte E2E-Tests
    - Mocha-basierte datengesteuerte Tests
    - Nur-Web-Tests - lokal sowie auf Cloud-Plattformen
    - Nur-Mobile-Tests - lokale sowie entfernte Cloud-Emulatoren (oder Geräte)
    - Web + Mobile Tests - Multiremote - lokal sowie Cloud-Plattformen
    - Mehrere Berichte integriert, einschließlich Allure
    - Testdaten (JSON / XLSX) werden global verwaltet, um die (im Flug erstellten) Daten nach der Testausführung in eine Datei zu schreiben
    - Github-Workflow zum Ausführen des Tests und Hochladen des Allure-Berichts

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Dies ist ein Vorlage-Projekt, das zeigen soll, wie man WebdriverIO Multi-Remote mit Appium und Chromedriver-Service mit dem neuesten WebdriverIO ausführt.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Features
  - [Page Object](pageobjects) Model
  - Typescript
  - Web + Mobile Tests - Multiremote
  - Native Android- und iOS-Apps
  - Appium
  - Chromedriver
  - ESLint
  - Testbeispiele für Login in http://the-internet.herokuapp.com und [WebdriverIO native Demo-App](https://github.com/webdriverio/native-demo-app)