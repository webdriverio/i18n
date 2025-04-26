---
id: boilerplates
title: Boilerplate-Projekte
---

Im Laufe der Zeit hat unsere Community mehrere Projekte entwickelt, die Sie als Inspiration für die Einrichtung Ihrer eigenen Testsuite verwenden können.

# v8 Boilerplate-Projekte

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Unser eigenes Boilerplate für Cucumber-Testsuiten. Wir haben über 150 vordefinierte Schrittdefinitionen für Sie erstellt, damit Sie sofort mit dem Schreiben von Feature-Dateien in Ihrem Projekt beginnen können.

- Framework:
    - Cucumber
    - WebdriverIO
- Funktionen:
    - Über 150 vordefinierte Schritte, die fast alles abdecken, was Sie benötigen
    - Integriert die Multiremote-Funktionalität von WebdriverIO
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
Boilerplate-Projekt zum Ausführen von WebdriverIO-Tests auf einer minimalen Electron-Anwendung.

- Frameworks
    - WebdriverIO
    - Mocha
- Funktionen
    - Electron API Mocking

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Dieses Boilerplate-Projekt enthält WebdriverIO 8-Tests mit Cucumber und Typescript, nach dem Page-Objects-Pattern.

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
    - Crossbrowser parallele Ausführung
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
    - Github-Actions für Github-Repository
    - Docker Compose für die Einrichtung des Docker-Hubs
    - Barrierefreiheitstests mit AXE
    - Visuelles Testen mit Applitools
    - Log-Mechanismus

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 mit Cucumber (V8x).
- Funktionen:
    - Page Objects Model verwendet mit ES6/ES7-Stil klassenbasiertem Ansatz und TypeScript-Unterstützung
    - Beispiele für Multi-Selector-Option zum Abfragen von Elementen mit mehr als einem Selektor gleichzeitig
    - Beispiele für Multi-Browser- und Headless-Browser-Ausführung mit Chrome und Firefox
    - Cloud-Testing-Integration mit BrowserStack, Sauce Labs, LambdaTest
    - Beispiele für Lesen/Schreiben von Daten aus MS-Excel für einfache Testdatenverwaltung aus externen Datenquellen mit Beispielen
    - Datenbankunterstützung für jedes RDBMS (Oracle, MySql, TeraData, Vertica usw.), Ausführung von Abfragen / Abrufen von Ergebnismengen usw. mit Beispielen für E2E-Tests
    - Mehrfache Berichterstattung (Spec, Xunit/Junit, Allure, JSON) und Hosting von Allure- und Xunit/Junit-Berichten auf WebServer.
    - Beispiele mit Demo-App https://search.yahoo.com/ und http://the-internet.herokuapp.com.
    - BrowserStack, Sauce Labs, LambdaTest und Appium-spezifische `.config`-Datei (für die Wiedergabe auf mobilen Geräten). Für die Ein-Klick-Appium-Einrichtung auf lokalen Maschinen für iOS und Android siehe [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 mit Mocha (V10x).
- Funktionen:
    - Page Objects Model verwendet mit ES6/ES7-Stil klassenbasiertem Ansatz und TypeScript-Unterstützung
    - Beispiele mit Demo-App https://search.yahoo.com und http://the-internet.herokuapp.com
    - Beispiele für Multi-Browser- und Headless-Browser-Ausführung mit Chrome und Firefox
    - Cloud-Testing-Integration mit BrowserStack, Sauce Labs, LambdaTest
    - Mehrfache Berichterstattung (Spec, Xunit/Junit, Allure, JSON) und Hosting von Allure- und Xunit/Junit-Berichten auf WebServer.
    - Beispiele für Lesen/Schreiben von Daten aus MS-Excel für einfache Testdatenverwaltung aus externen Datenquellen mit Beispielen
    - Beispiele für DB-Verbindung zu jedem RDBMS (Oracle, MySql, TeraData, Vertica usw.), jede Abfrageausführung / Abrufen von Ergebnismengen usw. mit Beispielen für E2E-Tests
    - BrowserStack, Sauce Labs, LambdaTest und Appium-spezifische `.config`-Datei (für die Wiedergabe auf mobilen Geräten). Für die Ein-Klick-Appium-Einrichtung auf lokalen Maschinen für iOS und Android siehe [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 mit Jasmine (V4x).
- Funktionen:
    - Page Objects Model verwendet mit ES6/ES7-Stil klassenbasiertem Ansatz und TypeScript-Unterstützung
    - Beispiele mit Demo-App https://search.yahoo.com und http://the-internet.herokuapp.com
    - Beispiele für Multi-Browser- und Headless-Browser-Ausführung mit Chrome und Firefox
    - Cloud-Testing-Integration mit BrowserStack, Sauce Labs, LambdaTest
    - Mehrfache Berichterstattung (Spec, Xunit/Junit, Allure, JSON) und Hosting von Allure- und Xunit/Junit-Berichten auf WebServer.
    - Beispiele für Lesen/Schreiben von Daten aus MS-Excel für einfache Testdatenverwaltung aus externen Datenquellen mit Beispielen
    - Beispiele für DB-Verbindung zu jedem RDBMS (Oracle, MySql, TeraData, Vertica usw.), jede Abfrageausführung / Abrufen von Ergebnismengen usw. mit Beispielen für E2E-Tests
    - BrowserStack, Sauce Labs, LambdaTest und Appium-spezifische `.config`-Datei (für die Wiedergabe auf mobilen Geräten). Für die Ein-Klick-Appium-Einrichtung auf lokalen Maschinen für iOS und Android siehe [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

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
    - Integrierter S3-Bucket für Testberichtsspeicherung und -abruf

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) Vorlagenprojekt, um Ihnen den Einstieg in Akzeptanztests Ihrer Webanwendungen mit den neuesten WebdriverIO, Mocha und Serenity/JS zu erleichtern.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD Reporting

- Funktionen
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatische Screenshots bei Testfehlern, eingebettet in Berichte
    - Continuous Integration (CI) Setup mit [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo Serenity BDD Berichte](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) veröffentlicht auf GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) Vorlagenprojekt, um Ihnen den Einstieg in Akzeptanztests Ihrer Webanwendungen mit den neuesten WebdriverIO, Cucumber und Serenity/JS zu erleichtern.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD Reporting

- Funktionen
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatische Screenshots bei Testfehlern, eingebettet in Berichte
    - Continuous Integration (CI) Setup mit [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo Serenity BDD Berichte](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) veröffentlicht auf GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Boilerplate-Projekt zum Ausführen von WebdriverIO-Tests in der Headspin Cloud (https://www.headspin.io/) mit Cucumber-Features und dem Page-Objects-Pattern.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funktionen
    - Cloud-Integration mit [Headspin](https://www.headspin.io/)
    - Unterstützt Page Object Model
    - Enthält Beispielszenarien, die im deklarativen BDD-Stil geschrieben sind
    - Integrierte Cucumber-HTML-Berichte

# v7 Boilerplate-Projekte

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Boilerplate-Projekt zum Ausführen von Appium-Tests mit WebdriverIO für:

- iOS/Android Native Apps
- iOS/Android Hybrid Apps
- Android Chrome und iOS Safari Browser

Dieses Boilerplate enthält Folgendes:

- Framework: Mocha
- Funktionen:
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
        - Swipe
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
  - Automatische Screenshot-Erfassung für fehlgeschlagene Tests
  - CircleCI-Beispiel
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Boilerplate-Projekt zum Ausführen von E2E-Tests mit Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Funktionen:
    - TypeScript
    - [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    - [Visuelle Regressionstests](https://github.com/wswebcreation/wdio-image-comparison-service)
    - Page Object Pattern
    - [Commit lint](https://github.com/conventional-changelog/commitlint) und [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    - ESlint
    -