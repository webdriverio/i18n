---
id: boilerplates
title: Boilerplate-Projekte
description: "Durchsuchen Sie Community-Boilerplate-Projekte für WebdriverIO mit Mocha, Jasmine, Cucumber, Electron und mobilen Setups, um Ihre eigene Testsuite aufzusetzen."
---

Im Laufe der Zeit hat unsere Community mehrere Projekte entwickelt, die Sie als Inspiration nutzen können, um Ihre eigene Testsuite aufzusetzen.

# v9 Boilerplate-Projekte

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Unser eigenes Boilerplate für Cucumber-Testsuiten. Wir haben über 150 vordefinierte Step-Definitionen für Sie erstellt, sodass Sie sofort mit dem Schreiben von Feature-Dateien in Ihrem Projekt beginnen können.

- Framework:
    - Cucumber
    - WebdriverIO
- Features:
    - Über 150 vordefinierte Steps, die fast alles abdecken, was Sie benötigen
    - Integriert die Multiremote-Funktionalität von WebdriverIO
    - Eigene Demo-App

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Boilerplate-Projekt zum Ausführen von WebdriverIO-Tests mit Jasmine unter Verwendung von Babel-Features und dem Page-Objects-Pattern.

- Frameworks
    - WebdriverIO
    - Jasmine
- Features
    - Page Object Pattern
    - Sauce Labs-Integration

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Boilerplate-Projekt zum Ausführen von WebdriverIO-Tests auf einer minimalen Electron-Anwendung.

- Frameworks
    - WebdriverIO
    - Mocha
- Features
    - Mocking der Electron-API

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Dieses Boilerplate-Projekt enthält mobile WebdriverIO 9-Tests mit Cucumber, TypeScript und Appium für Android- und iOS-Plattformen und folgt dem Page Object Model-Pattern. Es bietet umfassendes Logging, Reporting, mobile Gesten, App-zu-Web-Navigation und CI/CD-Integration.

- Frameworks:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Features:
    - Multi-Plattform-Unterstützung
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Mobile Gesten
      - Scrollen
      - Wischen
      - Langes Drücken
      - Tastatur ausblenden
    - App-zu-Web-Navigation
      - Kontextwechsel
      - WebView-Unterstützung
      - Browser-Automatisierung (Chrome/Safari)
    - Frischer App-Zustand
      - Automatisches Zurücksetzen der App zwischen Szenarien
      - Konfigurierbares Reset-Verhalten (noReset, fullReset)
    - Gerätekonfiguration
      - Zentralisierte Geräteverwaltung
      - Einfacher Plattformwechsel
    - Beispiel einer Verzeichnisstruktur für JavaScript / TypeScript. Die folgende gilt für die JS-Version, die TS-Version hat ebenfalls dieselbe Struktur.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Generiert automatisch WebdriverIO Page Object-Klassen und Mocha-Testspezifikationen aus Gherkin-.feature-Dateien – reduziert den manuellen Aufwand, verbessert die Konsistenz und beschleunigt die QA-Automatisierung. Dieses Projekt erzeugt nicht nur mit webdriver.io kompatiblen Code, sondern erweitert auch alle Funktionalitäten von webdriver.io. Wir haben zwei Varianten erstellt, eine für JavaScript-Nutzer und eine für TypeScript-Nutzer. Beide Projekte funktionieren jedoch auf die gleiche Weise.

***Wie funktioniert es?***
- Der Prozess folgt einer zweistufigen Automatisierung:
- Schritt 1: Gherkin zu stepMap (stepMap.json-Dateien generieren)
  - stepMap.json-Dateien generieren:
    - Parst .feature-Dateien, die in Gherkin-Syntax geschrieben sind.
    - Extrahiert Szenarien und Steps.
    - Erzeugt eine strukturierte .stepMap.json-Datei, die Folgendes enthält:
      - action, die ausgeführt werden soll (z. B. click, setText, assertVisible)
      - selectorName für das logische Mapping
      - selector für das DOM-Element
      - note für Werte oder Assertions
- Schritt 2: stepMap zu Code (WebdriverIO-Code generieren).
  Verwendet stepMap.json, um Folgendes zu generieren:
  - Generiert eine Basisklasse page.js mit gemeinsamen Methoden und browser.url()-Setup.
  - Generiert WebdriverIO-kompatible Page Object Model (POM)-Klassen pro Feature in test/pageobjects/.
  - Generiert Mocha-basierte Testspezifikationen.
- Beispiel einer Verzeichnisstruktur für JavaScript / TypeScript. Die folgende gilt für die JS-Version, die TS-Version hat ebenfalls dieselbe Struktur.
```
project-root/
├── features/                   # Gherkin-.feature-Dateien (Benutzereingabe / Quelldatei)
├── stepMaps/                   # Automatisch generierte .stepMap.json-Dateien
├── test/
│   ├── pageobjects/            # Automatisch generierte Page Object Model-Klassen für WebdriverIO-Tests
│   └── specs/                  # Automatisch generierte Mocha-Testspezifikationen
├── src/
│   ├── cli.js                  # Haupt-CLI-Logik
│   ├── generateStepsMap.js     # Feature-zu-stepMap-Generator
│   ├── generateTestsFromMap.js # stepMap-zu-Page/Spec-Generator
│   ├── utils.js                # Hilfsmethoden
│   └── config.js               # Pfade, Fallback-Selektoren, Aliase
│   └── __tests__/              # Unit-Tests (Vitest)
├── testgen.js                  # CLI-Einstiegspunkt
│── wdio.config.js              # WebdriverIO-Konfiguration
├── package.json                # Skripte und Abhängigkeiten
├── selector-aliases.json       # Optionale benutzerdefinierte Selektoren, die den primären Selektor überschreiben
```
---
# v8 Boilerplate-Projekte

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 mit Cucumber (V8x).
- Features:
    - Page Objects Model mit klassenbasiertem Ansatz im ES6/ES7-Stil und TypeScript-Unterstützung
    - Beispiele für die Multi-Selektor-Option, um ein Element mit mehr als einem Selektor gleichzeitig abzufragen
    - Beispiele für Multi-Browser- und Headless-Browser-Ausführung mit Chrome und Firefox
    - Cloud-Testing-Integration mit BrowserStack, Sauce Labs, TestMu AI (ehemals LambdaTest)
    - Beispiele für das Lesen/Schreiben von Daten aus MS-Excel für eine einfache Testdatenverwaltung aus externen Datenquellen
    - Datenbankunterstützung für beliebige RDBMS (Oracle, MySql, TeraData, Vertica usw.), Ausführen beliebiger Abfragen / Abrufen von Ergebnismengen usw. mit Beispielen für E2E-Tests
    - Mehrere Reports (Spec, Xunit/Junit, Allure, JSON) sowie Hosting von Allure- und Xunit/Junit-Reports auf einem Webserver.
    - Beispiele mit Demo-App https://search.yahoo.com/  und http://the-internet.herokuapp.com.
    - BrowserStack-, Sauce Labs-, TestMu AI (ehemals LambdaTest)- und Appium-spezifische `.config`-Datei (für die Wiedergabe auf einem mobilen Gerät). Für ein Ein-Klick-Appium-Setup auf dem lokalen Rechner für iOS und Android siehe [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 mit Mocha (V10x).
- Features:
    -  Page Objects Model mit klassenbasiertem Ansatz im ES6/ES7-Stil und TypeScript-Unterstützung
    -  Beispiele mit Demo-App https://search.yahoo.com  und http://the-internet.herokuapp.com
    -  Beispiele für Multi-Browser- und Headless-Browser-Ausführung mit Chrome und Firefox
    -  Cloud-Testing-Integration mit BrowserStack, Sauce Labs, TestMu AI (ehemals LambdaTest)
    -  Mehrere Reports (Spec, Xunit/Junit, Allure, JSON) sowie Hosting von Allure- und Xunit/Junit-Reports auf einem Webserver.
    -  Beispiele für das Lesen/Schreiben von Daten aus MS-Excel für eine einfache Testdatenverwaltung aus externen Datenquellen
    -  Beispiele für die DB-Verbindung zu beliebigen RDBMS (Oracle, MySql, TeraData, Vertica usw.), Ausführen beliebiger Abfragen / Abrufen von Ergebnismengen usw. mit Beispielen für E2E-Tests
    -  BrowserStack-, Sauce Labs-, TestMu AI (ehemals LambdaTest)- und Appium-spezifische `.config`-Datei (für die Wiedergabe auf einem mobilen Gerät). Für ein Ein-Klick-Appium-Setup auf dem lokalen Rechner für iOS und Android siehe [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 mit Jasmine (V4x).
- Features:
    -  Page Objects Model mit klassenbasiertem Ansatz im ES6/ES7-Stil und TypeScript-Unterstützung
    -  Beispiele mit Demo-App https://search.yahoo.com  und http://the-internet.herokuapp.com
    -  Beispiele für Multi-Browser- und Headless-Browser-Ausführung mit Chrome und Firefox
    -  Cloud-Testing-Integration mit BrowserStack, Sauce Labs, TestMu AI (ehemals LambdaTest)
    -  Mehrere Reports (Spec, Xunit/Junit, Allure, JSON) sowie Hosting von Allure- und Xunit/Junit-Reports auf einem Webserver.
    -  Beispiele für das Lesen/Schreiben von Daten aus MS-Excel für eine einfache Testdatenverwaltung aus externen Datenquellen
    -  Beispiele für die DB-Verbindung zu beliebigen RDBMS (Oracle, MySql, TeraData, Vertica usw.), Ausführen beliebiger Abfragen / Abrufen von Ergebnismengen usw. mit Beispielen für E2E-Tests
    -  BrowserStack-, Sauce Labs-, TestMu AI (ehemals LambdaTest)- und Appium-spezifische `.config`-Datei (für die Wiedergabe auf einem mobilen Gerät). Für ein Ein-Klick-Appium-Setup auf dem lokalen Rechner für iOS und Android siehe [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Dieses Boilerplate-Projekt enthält WebdriverIO 8-Tests mit Cucumber und TypeScript und folgt dem Page-Objects-Pattern.

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
    - Parallele Cross-Browser-Ausführung
    - Appium
    - Cloud-Testing-Integration mit BrowserStack & Sauce Labs
    - Docker-Service
    - Shared-Data-Service
    - Separate Konfigurationsdateien für jeden Service
    - Testdatenverwaltung & Lesen nach Benutzertyp
    - Reporting
      - Dot
      - Spec
      - Multiple Cucumber HTML-Reports mit Screenshots bei Fehlern
    - Gitlab-Pipelines für Gitlab-Repositories
    - Github Actions für Github-Repositories
    - Docker Compose zum Einrichten des Docker Hubs
    - Barrierefreiheitstests mit AXE
    - Visuelle Tests mit Applitools
    - Logging-Mechanismus


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Features
    - Enthält ein Beispiel-Testszenario in Cucumber
    - Integrierte Cucumber HTML-Reports mit eingebetteten Videos bei Fehlern
    - Integrierte Lambdatest- und CircleCI-Services
    - Integrierte visuelle, Barrierefreiheits- und API-Tests
    - Integrierte E-Mail-Funktionalität
    - Integrierter S3-Bucket für die Speicherung und den Abruf von Testreports

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)-Vorlagenprojekt, das Ihnen den Einstieg in Akzeptanztests Ihrer Webanwendungen mit dem neuesten WebdriverIO, Mocha und Serenity/JS erleichtert.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD-Reporting

- Features
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatische Screenshots bei Testfehlern, eingebettet in Reports
    - Continuous Integration (CI)-Setup mit [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo-Serenity BDD-Reports](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/), veröffentlicht auf GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)-Vorlagenprojekt, das Ihnen den Einstieg in Akzeptanztests Ihrer Webanwendungen mit dem neuesten WebdriverIO, Cucumber und Serenity/JS erleichtert.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD-Reporting

- Features
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatische Screenshots bei Testfehlern, eingebettet in Reports
    - Continuous Integration (CI)-Setup mit [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo-Serenity BDD-Reports](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/), veröffentlicht auf GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Boilerplate-Projekt zum Ausführen von WebdriverIO-Tests in der Headspin Cloud (https://www.headspin.io/) unter Verwendung von Cucumber-Features und dem Page-Objects-Pattern.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Features
    - Cloud-Integration mit [Headspin](https://www.headspin.io/)
    - Unterstützt das Page Object Model
    - Enthält Beispielszenarien, die im deklarativen BDD-Stil geschrieben sind
    - Integrierte Cucumber HTML-Reports

# v7 Boilerplate-Projekte
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Boilerplate-Projekt zum Ausführen von Appium-Tests mit WebdriverIO für:

- Native iOS-/Android-Apps
- Hybride iOS-/Android-Apps
- Android Chrome- und iOS Safari-Browser

Dieses Boilerplate enthält Folgendes:

- Framework: Mocha
- Features:
    - Konfigurationen für:
        - iOS- und Android-App
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
        - Wischen
        - Browser

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
ATDD-Web-Tests mit Mocha, WebdriverIO v6 mit PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Features
  - [Page Object](pageobjects) Model
  - Sauce Labs-Integration mit dem [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Allure Report
  - Automatische Screenshot-Erfassung bei fehlschlagenden Tests
  - CircleCI-Beispiel
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Boilerplate-Projekt zum Ausführen von E2E-Tests mit Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Features:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Visuelle Regressionstests](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Page Object Pattern
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) und [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actions-Beispiel
    -   Allure-Report (Screenshots bei Fehlern)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Boilerplate-Projekt zum Ausführen von **WebdriverIO v7**-Tests für Folgendes:

[WDIO 7-Skripte mit TypeScript im Cucumber-Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7-Skripte mit TypeScript im Mocha-Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[WDIO 7-Skript in Docker ausführen](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Netzwerk-Logs](https://github.com/17thSep/MonitorNetworkLogs/)

Boilerplate-Projekt für:

- Erfassen von Netzwerk-Logs
- Erfassen aller GET/POST-Aufrufe oder einer bestimmten REST-API
- Überprüfen von Request-Parametern
- Überprüfen von Response-Parametern
- Speichern aller Responses in einer separaten Datei

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Boilerplate-Projekt zum Ausführen von Appium-Tests für native Apps und mobile Browser mit Cucumber v7 und WDIO v7 unter Verwendung des Page-Object-Patterns.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Features
    - Native Android- und iOS-Apps
    - Android Chrome-Browser
    - iOS Safari-Browser
    - Page Object Model
    - Enthält Beispiel-Testszenarien in Cucumber
    - Integriert mit Multiple Cucumber HTML-Reports

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Dies ist ein Vorlagenprojekt, das Ihnen zeigt, wie Sie WebdriverIO-Tests für Webanwendungen mit dem neuesten WebdriverIO- und Cucumber-Framework ausführen können. Dieses Projekt soll als Basis-Image dienen, anhand dessen Sie verstehen können, wie WebdriverIO-Tests in Docker ausgeführt werden.

Dieses Projekt enthält:

- DockerFile
- Cucumber-Projekt

Mehr dazu unter: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Dies ist ein Vorlagenprojekt, das Ihnen zeigt, wie Sie ElectronJS-Tests mit WebdriverIO ausführen können. Dieses Projekt soll als Basis-Image dienen, anhand dessen Sie verstehen können, wie WebdriverIO-ElectronJS-Tests ausgeführt werden.

Dieses Projekt enthält:

- Beispiel-ElectronJS-App
- Beispiel-Cucumber-Testskripte

Mehr dazu unter: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Dies ist ein Vorlagenprojekt, das Ihnen zeigt, wie Sie Windows-Anwendungen mit WinAppDriver und WebdriverIO automatisieren können. Dieses Projekt soll als Basis-Image dienen, anhand dessen Sie verstehen können, wie WinAppDriver- und WebdriverIO-Tests ausgeführt werden.

Mehr dazu unter: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Dies ist ein Vorlagenprojekt, das Ihnen zeigt, wie Sie die Multiremote-Fähigkeit von WebdriverIO mit dem neuesten WebdriverIO- und Jasmine-Framework nutzen können. Dieses Projekt soll als Basis-Image dienen, anhand dessen Sie verstehen können, wie WebdriverIO-Tests in Docker ausgeführt werden.

Dieses Projekt verwendet:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Vorlagenprojekt zum Ausführen von Appium-Tests auf echten Roku-Geräten mit Mocha unter Verwendung des Page-Object-Patterns.

- Frameworks
    - WebdriverIO Async v7
    - Appium 3.0
    - Mocha v7
    - Allure Reporting

- Features
    - Page Object Model
    - Typescript
    - Screenshot bei Fehlern
    - Beispieltests mit einem Beispiel-Roku-Channel

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

PoC-Projekt für E2E-Multiremote-Cucumber-Tests sowie datengetriebene Mocha-Tests

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Features:
    - Cucumber-basierte E2E-Tests
    - Mocha-basierte datengetriebene Tests
    - Reine Web-Tests – lokal sowie auf Cloud-Plattformen
    - Reine Mobile-Tests – lokal sowie auf Remote-Cloud-Emulatoren (oder -Geräten)
    - Web- + Mobile-Tests – Multiremote – lokal sowie auf Cloud-Plattformen
    - Mehrere integrierte Reports, einschließlich Allure
    - Testdaten (JSON / XLSX) werden global verwaltet, um die (spontan erstellten) Daten nach der Testausführung in eine Datei zu schreiben
    - Github-Workflow zum Ausführen der Tests und Hochladen des Allure-Reports

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Dies ist ein Boilerplate-Projekt, das zeigt, wie man WebdriverIO-Multiremote mit Appium und dem Chromedriver-Service mit dem neuesten WebdriverIO ausführt.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Features
  - [Page Object](pageobjects) Model
  - Typescript
  - Web- + Mobile-Tests – Multiremote
  - Native Android- und iOS-Apps
  - Appium
  - Chromedriver
  - ESLint
  - Testbeispiele für den Login auf http://the-internet.herokuapp.com und der [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app)