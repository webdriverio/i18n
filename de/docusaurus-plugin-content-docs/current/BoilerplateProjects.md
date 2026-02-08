---
id: boilerplates
title: Boilerplate-Projekte
---

Im Laufe der Zeit hat unsere Community mehrere Projekte entwickelt, die Sie als Inspiration für die Einrichtung Ihrer eigenen Testsuite verwenden können.

# v9 Boilerplate-Projekte

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Unser eigenes Boilerplate für Cucumber-Testsuiten. Wir haben über 150 vordefinierte Schrittdefinitionen für Sie erstellt, damit Sie sofort mit dem Schreiben von Feature-Dateien in Ihrem Projekt beginnen können.

- Framework:
    - Cucumber
    - WebdriverIO
- Funktionen:
    - Über 150 vordefinierte Schritte, die fast alles abdecken, was Sie brauchen
    - Integriert WebdriverIOs Multiremote-Funktionalität
    - Eigene Demo-App

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Boilerplate-Projekt zum Ausführen von WebdriverIO-Tests mit Jasmine unter Verwendung von Babel-Funktionen und dem Page-Objects-Pattern.

- Frameworks
    - WebdriverIO
    - Jasmine
- Funktionen
    - Page Object Pattern
    - Sauce Labs Integration

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Boilerplate-Projekt zum Ausführen von WebdriverIO-Tests in einer minimalen Electron-Anwendung.

- Frameworks
    - WebdriverIO
    - Mocha
- Funktionen
    - Electron API Mocking

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Dieses Boilerplate-Projekt enthält WebdriverIO 9 Mobile-Tests mit Cucumber, TypeScript und Appium für Android- und iOS-Plattformen, nach dem Page Object Model-Muster. Es bietet umfassendes Logging, Reporting, mobile Gesten, App-to-Web-Navigation und CI/CD-Integration.

- Frameworks:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Funktionen:
    - Multi-Plattform-Unterstützung
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Mobile Gesten
      - Scrollen
      - Wischen
      - Lange drücken
      - Tastatur ausblenden
    - App-zu-Web-Navigation
      - Kontextwechsel
      - WebView-Unterstützung
      - Browser-Automation (Chrome/Safari)
    - Frischer App-Zustand
      - Automatisches App-Reset zwischen Szenarien
      - Konfigurierbares Reset-Verhalten (noReset, fullReset)
    - Gerätekonfiguration
      - Zentralisierte Geräteverwaltung
      - Einfaches Wechseln der Plattform
    - Beispiel für Verzeichnisstruktur für JavaScript / TypeScript. Unten ist für die JS-Version, die TS-Version hat die gleiche Struktur.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Automatisches Generieren von WebdriverIO Page Object-Klassen und Mocha-Test-Spezifikationen aus Gherkin .feature-Dateien — reduziert manuellen Aufwand, verbessert Konsistenz und beschleunigt QA-Automatisierung. Dieses Projekt produziert nicht nur webdriver.io-kompatiblen Code, sondern erweitert auch alle Funktionalitäten von webdriver.io. Wir haben zwei Varianten erstellt, eine für JavaScript-Benutzer und eine für TypeScript-Benutzer. Aber beide Projekte funktionieren auf die gleiche Weise.

***Wie funktioniert es?***
- Der Prozess folgt einer zweistufigen Automatisierung:
- Schritt 1: Gherkin zu stepMap (Generiert stepMap.json-Dateien)
  - Generiert stepMap.json-Dateien:
    - Analysiert .feature-Dateien in Gherkin-Syntax.
    - Extrahiert Szenarien und Schritte.
    - Erzeugt eine strukturierte .stepMap.json-Datei mit:
      - auszuführende Aktion (z.B. klicken, setText, assertVisible)
      - selectorName für logisches Mapping
      - Selektor für das DOM-Element
      - Hinweis für Werte oder Assertion
- Schritt 2: stepMap zu Code (Generiert WebdriverIO-Code).
  Verwendet stepMap.json zur Generierung von:
  - Generiert eine base page.js Klasse mit gemeinsamen Methoden und browser.url() Setup.
  - Generiert WebdriverIO-kompatible Page Object Model (POM)-Klassen pro Feature innerhalb von test/pageobjects/.
  - Generiert Mocha-basierte Test-Spezifikationen.
- Beispiel für Verzeichnisstruktur für JavaScript / TypeScript. Unten ist für die JS-Version, die TS-Version hat die gleiche Struktur.
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
# v8 Boilerplate-Projekte

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 mit Cucumber (V8x).
- Funktionen:
    - Page Objects Model verwendet ES6/ES7-Klassen-Ansatz und TypeScript-Unterstützung
    - Beispiele für Multi-Selektor-Option zum Abfragen von Elementen mit mehreren Selektoren gleichzeitig
    - Beispiele für Multi-Browser- und Headless-Browser-Ausführung mit Chrome und Firefox
    - Cloud-Testing-Integration mit BrowserStack, Sauce Labs, TestMu AI (früher LambdaTest)
    - Beispiele für Lesen/Schreiben von Daten aus MS-Excel für einfaches Testdatenmanagement aus externen Datenquellen mit Beispielen
    - Datenbankunterstützung für alle RDBMS (Oracle, MySql, TeraData, Vertica usw.), Ausführung von Abfragen / Abrufen von Ergebnismengen usw. mit Beispielen für E2E-Tests
    - Mehrfache Berichterstattung (Spec, Xunit/Junit, Allure, JSON) und Hosting von Allure- und Xunit/Junit-Berichten auf WebServer
    - Beispiele mit Demo-App https://search.yahoo.com/ und http://the-internet.herokuapp.com
    - BrowserStack, Sauce Labs, TestMu AI (früher LambdaTest) und Appium-spezifische `.config`-Datei (für Wiedergabe auf mobilen Geräten). Für eine Ein-Klick-Appium-Einrichtung auf lokalen Maschinen für iOS und Android siehe [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 mit Mocha (V10x).
- Funktionen:
    - Page Objects Model verwendet ES6/ES7-Klassen-Ansatz und TypeScript-Unterstützung
    - Beispiele mit Demo-App https://search.yahoo.com und http://the-internet.herokuapp.com
    - Beispiele für Multi-Browser- und Headless-Browser-Ausführung mit Chrome und Firefox
    - Cloud-Testing-Integration mit BrowserStack, Sauce Labs, TestMu AI (früher LambdaTest)
    - Mehrfache Berichterstattung (Spec, Xunit/Junit, Allure, JSON) und Hosting von Allure- und Xunit/Junit-Berichten auf WebServer
    - Beispiele für Lesen/Schreiben von Daten aus MS-Excel für einfaches Testdatenmanagement aus externen Datenquellen mit Beispielen
    - Beispiele für DB-Verbindung zu jedem RDBMS (Oracle, MySql, TeraData, Vertica usw.), jede Abfrageausführung / Abrufen von Ergebnismengen usw. mit Beispielen für E2E-Tests
    - BrowserStack, Sauce Labs, TestMu AI (früher LambdaTest) und Appium-spezifische `.config`-Datei (für Wiedergabe auf mobilen Geräten). Für eine Ein-Klick-Appium-Einrichtung auf lokalen Maschinen für iOS und Android siehe [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 mit Jasmine (V4x).
- Funktionen:
    - Page Objects Model verwendet ES6/ES7-Klassen-Ansatz und TypeScript-Unterstützung
    - Beispiele mit Demo-App https://search.yahoo.com und http://the-internet.herokuapp.com
    - Beispiele für Multi-Browser- und Headless-Browser-Ausführung mit Chrome und Firefox
    - Cloud-Testing-Integration mit BrowserStack, Sauce Labs, TestMu AI (früher LambdaTest)
    - Mehrfache Berichterstattung (Spec, Xunit/Junit, Allure, JSON) und Hosting von Allure- und Xunit/Junit-Berichten auf WebServer
    - Beispiele für Lesen/Schreiben von Daten aus MS-Excel für einfaches Testdatenmanagement aus externen Datenquellen mit Beispielen
    - Beispiele für DB-Verbindung zu jedem RDBMS (Oracle, MySql, TeraData, Vertica usw.), jede Abfrageausführung / Abrufen von Ergebnismengen usw. mit Beispielen für E2E-Tests
    - BrowserStack, Sauce Labs, TestMu AI (früher LambdaTest) und Appium-spezifische `.config`-Datei (für Wiedergabe auf mobilen Geräten). Für eine Ein-Klick-Appium-Einrichtung auf lokalen Maschinen für iOS und Android siehe [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Dieses Boilerplate-Projekt enthält WebdriverIO 8 Tests mit Cucumber und TypeScript nach dem Page-Objects-Muster.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Funktionen:
    - Typescript v5
    - Page Object Pattern
    - Prettier
    - Multi-Browser-Unterstützung
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Cross-Browser parallele Ausführung
    - Appium
    - Cloud-Testing-Integration mit BrowserStack & Sauce Labs
    - Docker-Service
    - Share-Data-Service
    - Separate Konfigurationsdateien für jeden Service
    - Testdatenverwaltung & Lesen nach Benutzertyp
    - Berichterstattung
      - Dot
      - Spec
      - Multiple Cucumber HTML-Berichte mit Fehler-Screenshots
    - Gitlab-Pipelines für Gitlab-Repository
    - Github Actions für Github-Repository
    - Docker Compose für die Einrichtung des Docker-Hub
    - Barrierefreiheitstests mit AXE
    - Visuelle Tests mit Applitools
    - Log-Mechanismus


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funktionen
    - Enthält Beispiel-Testszenarien in Cucumber
    - Integrierte Cucumber-HTML-Berichte mit eingebetteten Videos bei Fehlern
    - Integrierte Lambdatest- und CircleCI-Dienste
    - Integrierte visuelle, Barrierefreiheits- und API-Tests
    - Integrierte E-Mail-Funktionalität
    - Integrierter S3-Bucket für Testreportspeicherung und -abruf

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) Vorlagenprojekt, das Ihnen hilft, mit Akzeptanztests Ihrer Webanwendungen unter Verwendung der neuesten WebdriverIO, Mocha und Serenity/JS zu beginnen.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD-Berichterstattung

- Funktionen
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatische Screenshots bei Testfehlern, eingebettet in Berichte
    - Continuous Integration (CI)-Setup mit [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo Serenity BDD-Berichte](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) veröffentlicht auf GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) Vorlagenprojekt, das Ihnen hilft, mit Akzeptanztests Ihrer Webanwendungen unter Verwendung der neuesten WebdriverIO, Cucumber und Serenity/JS zu beginnen.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD-Berichterstattung

- Funktionen
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatische Screenshots bei Testfehlern, eingebettet in Berichte
    - Continuous Integration (CI)-Setup mit [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo Serenity BDD-Berichte](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) veröffentlicht auf GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Boilerplate-Projekt zum Ausführen von WebdriverIO-Tests in der Headspin Cloud (https://www.headspin.io/) unter Verwendung von Cucumber-Features und dem Page-Objects-Muster.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funktionen
    - Cloud-Integration mit [Headspin](https://www.headspin.io/)
    - Unterstützt Page Object Model
    - Enthält Beispielszenarien in deklarativem BDD-Stil
    - Integrierte Cucumber-HTML-Berichte

# v7 Boilerplate-Projekte
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Boilerplate-Projekt zum Ausführen von Appium-Tests mit WebdriverIO für:

- iOS/Android Native Apps
- iOS/Android Hybrid Apps
- Android Chrome und iOS Safari Browser

Dieses Boilerplate enthält Folgendes:

- Framework: Mocha
- Funktionen:
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
        - Wischen
        - Browser

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
ATDD WEB-Tests mit Mocha, WebdriverIO v6 mit PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Funktionen
  - [Page Object](pageobjects) Model
  - Sauce Labs Integration mit [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Allure Report
  - Automatische Screenshots-Erfassung für fehlgeschlagene Tests
  - CircleCI-Beispiel
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Boilerplate-Projekt zum Ausführen von E2E-Tests mit Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Funktionen:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Visuelle Regressionstests](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Page Object Pattern
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) und [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actions Beispiel
    -   Allure-Bericht (Screenshots bei Fehlern)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Boilerplate-Projekt zum Ausführen von **WebdriverIO v7** Tests für Folgendes:

[WDIO 7 Skripte mit TypeScript im Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7 Skripte mit TypeScript im Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[WDIO 7 Skript in Docker ausführen](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Netzwerk-Logs](https://github.com/17thSep/MonitorNetworkLogs/)

Boilerplate-Projekt für:

- Erfassung von Netzwerk-Logs
- Erfassung aller GET/POST-Aufrufe oder einer bestimmten REST-API
- Assertion von Anfrageparametern
- Assertion von Antwortparametern
- Speicherung aller Antworten in einer separaten Datei

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Boilerplate-Projekt zum Ausführen von Appium-Tests für native und mobile Browser mit Cucumber v7 und WDIO v7 mit Page-Object-Muster.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Funktionen
    - Native Android- und iOS-Apps
    - Android Chrome Browser
    - iOS Safari Browser
    - Page Object Model
    - Enthält Beispiel-Testszenarien in Cucumber
    - Integration mit mehreren Cucumber-HTML-Berichten

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Dies ist ein Vorlagenprojekt, das Ihnen zeigt, wie Sie WebdriverIO-Tests von Webanwendungen mit dem neuesten WebdriverIO und dem Cucumber-Framework ausführen können. Dieses Projekt soll als Basis-Image dienen, mit dem Sie verstehen können, wie WebdriverIO-Tests in Docker ausgeführt werden.

Dieses Projekt enthält:

- DockerFile
- Cucumber-Projekt

Mehr dazu unter: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Dies ist ein Vorlagenprojekt, das Ihnen zeigt, wie Sie electronJS-Tests mit WebdriverIO ausführen können. Dieses Projekt soll als Basis-Image dienen, mit dem Sie verstehen können, wie WebdriverIO electronJS-Tests ausgeführt werden.

Dieses Projekt enthält:

- Beispiel electronjs App
- Beispiel Cucumber-Testskripte

Mehr dazu unter: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Dies ist ein Vorlagenprojekt, das Ihnen zeigt, wie Sie Windows-Anwendungen mit winappdriver und WebdriverIO automatisieren können. Dieses Projekt soll als Basis-Image dienen, mit dem Sie verstehen können, wie winappdriver und WebdriverIO-Tests ausgeführt werden.

Mehr dazu unter: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Dies ist ein Vorlagenprojekt, das Ihnen zeigt, wie Sie die WebdriverIO-Multiremote-Fähigkeit mit dem neuesten WebdriverIO und dem Jasmine-Framework ausführen können. Dieses Projekt soll als Basis-Image dienen, mit dem Sie verstehen können, wie WebdriverIO-Tests in Docker ausgeführt werden.

Dieses Projekt verwendet:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Vorlagenprojekt zum Ausführen von Appium-Tests auf echten Roku-Geräten mit Mocha und Page-Object-Muster.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure Reporting

- Funktionen
    - Page Object Model
    - Typescript
    - Screenshot bei Fehlern
    - Beispieltests mit einem Roku-Beispielkanal

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

PoC-Projekt für E2E Multiremote Cucumber-Tests sowie datengesteuerte Mocha-Tests

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Funktionen:
    - Cucumber-basierte E2E-Tests
    - Mocha-basierte datengesteuerte Tests
    - Nur Web-Tests - lokal sowie auf Cloud-Plattformen
    - Nur Mobile-Tests - lokale sowie Remote-Cloud-Emulatoren (oder Geräte)
    - Web + Mobile Tests - Multiremote - lokal sowie auf Cloud-Plattformen
    - Mehrere Berichte integriert, einschließlich Allure
    - Testdaten (JSON / XLSX) werden global verwaltet, um die (im Flug erstellten) Daten nach der Testausführung in eine Datei zu schreiben
    - Github-Workflow zum Ausführen des Tests und Hochladen des Allure-Berichts

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Dies ist ein Boilerplate-Projekt, das zeigt, wie man WebdriverIO Multi-Remote mit Appium und Chromedriver-Service mit dem neuesten WebdriverIO ausführt.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Funktionen
  - [Page Object](pageobjects) Model
  - Typescript
  - Web + Mobile Tests - Multiremote
  - Native Android- und iOS-Apps
  - Appium
  - Chromedriver
  - ESLint
  - Testbeispiele für Login in http://the-internet.herokuapp.com und [WebdriverIO native Demo-App](https://github.com/webdriverio/native-demo-app)