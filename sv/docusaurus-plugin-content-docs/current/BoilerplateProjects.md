---
id: boilerplates
title: Boilerplate-projekt
description: "Bläddra bland communityns boilerplate-projekt för WebdriverIO med Mocha, Jasmine, Cucumber, Electron och mobila uppsättningar för att komma igång med din egen testsvit."
---

Med tiden har vår community utvecklat flera projekt som du kan använda som inspiration för att sätta upp din egen testsvit.

# v9 Boilerplate-projekt

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Vår alldeles egna boilerplate för Cucumber-testsviter. Vi har skapat över 150 fördefinierade stegdefinitioner åt dig, så att du direkt kan börja skriva feature-filer i ditt projekt.

- Ramverk:
    - Cucumber
    - WebdriverIO
- Funktioner:
    - Över 150 fördefinierade steg som täcker nästan allt du behöver
    - Integrerar WebdriverIO:s multi-remote-funktionalitet
    - Egen demoapp

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Boilerplate-projekt för att köra WebdriverIO-tester med Jasmine med hjälp av Babel-funktioner och page objects-mönstret.

- Ramverk
    - WebdriverIO
    - Jasmine
- Funktioner
    - Page Object Pattern
    - Sauce Labs-integration

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Boilerplate-projekt för att köra WebdriverIO-tester på en minimal Electron-applikation.

- Ramverk
    - WebdriverIO
    - Mocha
- Funktioner
    - Mockning av Electron API

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Detta boilerplate-projekt innehåller mobila WebdriverIO 9-tester med Cucumber, TypeScript och Appium för Android- och iOS-plattformar, enligt Page Object Model-mönstret. Innehåller omfattande loggning, rapportering, mobila gester, navigering från app till webb samt CI/CD-integration.

- Ramverk:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Funktioner:
    - Stöd för flera plattformar
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Mobila gester
      - Scrolla
      - Svepa
      - Långt tryck
      - Dölja tangentbordet
    - Navigering från app till webb
      - Kontextväxling
      - Stöd för WebView
      - Webbläsarautomatisering (Chrome/Safari)
    - Nytt apptillstånd
      - Automatisk återställning av appen mellan scenarier
      - Konfigurerbart återställningsbeteende (noReset, fullReset)
    - Enhetskonfiguration
      - Centraliserad enhetshantering
      - Enkelt byte av plattform
    - Exempel på katalogstruktur för JavaScript / TypeScript. Nedan gäller JS-versionen, TS-versionen har samma struktur.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Generera automatiskt WebdriverIO Page Object-klasser och Mocha-testspecifikationer från Gherkin .feature-filer — vilket minskar manuellt arbete, förbättrar konsekvensen och snabbar upp QA-automatiseringen. Detta projekt producerar inte bara kod som är kompatibel med webdriver.io utan förbättrar också alla funktioner i webdriver.io. Vi har skapat två varianter, en för JavaScript-användare och en för TypeScript-användare. Båda projekten fungerar dock på samma sätt.

***Hur fungerar det?***
- Processen följer en automatisering i två steg:
- Steg 1: Gherkin till stepMap (generera stepMap.json-filer)
  - Generera stepMap.json-filer:
    - Tolkar .feature-filer skrivna med Gherkin-syntax.
    - Extraherar scenarier och steg.
    - Producerar en strukturerad .stepMap.json-fil som innehåller:
      - action som ska utföras (t.ex. click, setText, assertVisible)
      - selectorName för logisk mappning
      - selector för DOM-elementet
      - note för värden eller assertion
- Steg 2: stepMap till kod (generera WebdriverIO-kod).
  Använder stepMap.json för att generera:
  - Generera en bas-klass page.js med delade metoder och browser.url()-uppsättning.
  - Generera WebdriverIO-kompatibla Page Object Model (POM)-klasser per feature i test/pageobjects/.
  - Generera Mocha-baserade testspecifikationer.
- Exempel på katalogstruktur för JavaScript / TypeScript. Nedan gäller JS-versionen, TS-versionen har samma struktur.
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
# v8 Boilerplate-projekt

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Ramverk: WDIO-V8 med Cucumber (V8x).
- Funktioner:
    - Page Objects Model med klassbaserat tillvägagångssätt i ES6/ES7-stil och TypeScript-stöd
    - Exempel på multi-selector-alternativ för att hämta element med mer än en selektor åt gången
    - Exempel på körning i flera webbläsare och headless-webbläsare med Chrome och Firefox
    - Molntestintegration med BrowserStack, Sauce Labs, TestMu AI (tidigare LambdaTest)
    - Exempel på läsning/skrivning av data från MS-Excel för enkel hantering av testdata från externa datakällor, med exempel
    - Databasstöd för valfri RDBMS (Oracle, MySql, TeraData, Vertica etc.), körning av valfria frågor / hämtning av resultatmängder etc. med exempel för E2E-testning
    - Flera rapporter (Spec, Xunit/Junit, Allure, JSON) och hosting av Allure- och Xunit/Junit-rapporter på en webbserver.
    - Exempel med demoapparna https://search.yahoo.com/  och http://the-internet.herokuapp.com.
    - BrowserStack-, Sauce Labs-, TestMu AI (tidigare LambdaTest)- och Appium-specifik `.config`-fil (för uppspelning på mobil enhet). För Appium-uppsättning med ett klick på lokal maskin för iOS och Android, se [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Ramverk: WDIO-V8 med Mocha (V10x).
- Funktioner:
    -  Page Objects Model med klassbaserat tillvägagångssätt i ES6/ES7-stil och TypeScript-stöd
    -  Exempel med demoapparna https://search.yahoo.com  och http://the-internet.herokuapp.com
    -  Exempel på körning i flera webbläsare och headless-webbläsare med Chrome och Firefox
    -  Molntestintegration med BrowserStack, Sauce Labs, TestMu AI (tidigare LambdaTest)
    -  Flera rapporter (Spec, Xunit/Junit, Allure, JSON) och hosting av Allure- och Xunit/Junit-rapporter på en webbserver.
    -  Exempel på läsning/skrivning av data från MS-Excel för enkel hantering av testdata från externa datakällor, med exempel
    -  Exempel på databasanslutning till valfri RDBMS (Oracle, MySql, TeraData, Vertica etc.), körning av valfria frågor / hämtning av resultatmängder etc. med exempel för E2E-testning
    -  BrowserStack-, Sauce Labs-, TestMu AI (tidigare LambdaTest)- och Appium-specifik `.config`-fil (för uppspelning på mobil enhet). För Appium-uppsättning med ett klick på lokal maskin för iOS och Android, se [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Ramverk: WDIO-V8 med Jasmine (V4x).
- Funktioner:
    -  Page Objects Model med klassbaserat tillvägagångssätt i ES6/ES7-stil och TypeScript-stöd
    -  Exempel med demoapparna https://search.yahoo.com  och http://the-internet.herokuapp.com
    -  Exempel på körning i flera webbläsare och headless-webbläsare med Chrome och Firefox
    -  Molntestintegration med BrowserStack, Sauce Labs, TestMu AI (tidigare LambdaTest)
    -  Flera rapporter (Spec, Xunit/Junit, Allure, JSON) och hosting av Allure- och Xunit/Junit-rapporter på en webbserver.
    -  Exempel på läsning/skrivning av data från MS-Excel för enkel hantering av testdata från externa datakällor, med exempel
    -  Exempel på databasanslutning till valfri RDBMS (Oracle, MySql, TeraData, Vertica etc.), körning av valfria frågor / hämtning av resultatmängder etc. med exempel för E2E-testning
    -  BrowserStack-, Sauce Labs-, TestMu AI (tidigare LambdaTest)- och Appium-specifik `.config`-fil (för uppspelning på mobil enhet). För Appium-uppsättning med ett klick på lokal maskin för iOS och Android, se [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Detta boilerplate-projekt innehåller WebdriverIO 8-tester med cucumber och typescript, enligt page objects-mönstret.

- Ramverk:
    - WebdriverIO v8
    - Cucumber v8

- Funktioner:
    - Typescript v5
    - Page Object Pattern
    - Prettier
    - Stöd för flera webbläsare
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Parallell körning i flera webbläsare
    - Appium
    - Molntestintegration med BrowserStack & Sauce Labs
    - Docker-tjänst
    - Tjänst för delning av data
    - Separata konfigurationsfiler för varje tjänst
    - Hantering av testdata & läsning efter användartyp
    - Rapportering
      - Dot
      - Spec
      - Multiple cucumber html report med skärmdumpar vid fel
    - Gitlab-pipelines för Gitlab-repository
    - Github actions för Github-repository
    - Docker compose för att sätta upp docker hub
    - Tillgänglighetstestning med AXE
    - Visuell testning med Applitools
    - Loggningsmekanism


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Ramverk
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funktioner
    - Innehåller exempel på testscenarier i cucumber
    - Integrerade cucumber html-rapporter med inbäddade videor vid fel
    - Integrerade Lambdatest- och CircleCI-tjänster
    - Integrerad visuell testning, tillgänglighetstestning och API-testning
    - Integrerad e-postfunktionalitet
    - Integrerad s3-bucket för lagring och hämtning av testrapporter

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)-mallprojekt som hjälper dig att komma igång med acceptanstestning av dina webbapplikationer med senaste WebdriverIO, Mocha och Serenity/JS.

- Ramverk
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD-rapportering

- Funktioner
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatiska skärmdumpar vid testfel, inbäddade i rapporter
    - Uppsättning för kontinuerlig integration (CI) med [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo av Serenity BDD-rapporter](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicerade på GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io)-mallprojekt som hjälper dig att komma igång med acceptanstestning av dina webbapplikationer med senaste WebdriverIO, Cucumber och Serenity/JS.

- Ramverk
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD-rapportering

- Funktioner
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatiska skärmdumpar vid testfel, inbäddade i rapporter
    - Uppsättning för kontinuerlig integration (CI) med [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo av Serenity BDD-rapporter](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicerade på GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Boilerplate-projekt för att köra WebdriverIO-tester i Headspin Cloud (https://www.headspin.io/) med Cucumber-features och page objects-mönstret.
- Ramverk
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funktioner
    - Molnintegration med [Headspin](https://www.headspin.io/)
    - Stöder Page Object Model
    - Innehåller exempelscenarier skrivna i deklarativ BDD-stil
    - Integrerade cucumber html-rapporter

# v7 Boilerplate-projekt
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Boilerplate-projekt för att köra Appium-tester med WebdriverIO för:

- Native-appar för iOS/Android
- Hybridappar för iOS/Android
- Webbläsarna Android Chrome och iOS Safari

Denna boilerplate innehåller följande:

- Ramverk: Mocha
- Funktioner:
    - Konfigurationer för:
        - iOS- och Android-app
        - iOS- och Android-webbläsare
    - Hjälpfunktioner för:
        - WebView
        - Gester
        - Native-varningar
        - Pickers
     - Testexempel för:
        - WebView
        - Inloggning
        - Formulär
        - Svepning
        - Webbläsare

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
ATDD-webbtester med Mocha, WebdriverIO v6 med PageObject

- Ramverk
  - WebdriverIO (v7)
  - Mocha
- Funktioner
  - [Page Object](pageobjects) Model
  - Sauce Labs-integration med [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Allure-rapport
  - Automatisk skärmdumpstagning för misslyckade tester
  - CircleCI-exempel
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Boilerplate-projekt för att köra E2E-tester med Mocha.

- Ramverk:
    - WebdriverIO (v7)
    - Mocha
- Funktioner:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Visuella regressionstester](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Page Object Pattern
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) och [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actions-exempel
    -   Allure-rapport (skärmdumpar vid fel)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Boilerplate-projekt för att köra **WebdriverIO v7**-tester för följande:

[WDIO 7-skript med TypeScript i Cucumber-ramverket](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7-skript med TypeScript i Mocha-ramverket](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Kör WDIO 7-skript i Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Nätverksloggar](https://github.com/17thSep/MonitorNetworkLogs/)

Boilerplate-projekt för att:

- Fånga nätverksloggar
- Fånga alla GET/POST-anrop eller ett specifikt REST API
- Verifiera request-parametrar
- Verifiera response-parametrar
- Spara alla svar i en separat fil

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Boilerplate-projekt för att köra appium-tester för native-appar och mobila webbläsare med cucumber v7 och wdio v7 enligt page object-mönstret.

- Ramverk
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Funktioner
    - Native-appar för Android och iOS
    - Android Chrome-webbläsare
    - iOS Safari-webbläsare
    - Page Object Model
    - Innehåller exempel på testscenarier i cucumber
    - Integrerat med multiple cucumber html reports

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Detta är ett mallprojekt som visar hur du kan köra webdriverio-tester för webbapplikationer med senaste WebdriverIO och Cucumber-ramverket. Projektet är tänkt att fungera som en grundavbildning som du kan använda för att förstå hur man kör WebdriverIO-tester i docker

Detta projekt innehåller:

- DockerFile
- cucumber-projekt

Läs mer på: [Medium-blogg](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Detta är ett mallprojekt som visar hur du kan köra electronJS-tester med WebdriverIO. Projektet är tänkt att fungera som en grundavbildning som du kan använda för att förstå hur man kör WebdriverIO electronJS-tester.

Detta projekt innehåller:

- Exempel på electronjs-app
- Exempel på cucumber-testskript

Läs mer på: [Medium-blogg](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Detta är ett mallprojekt som visar hur du kan automatisera Windows-applikationer med winappdriver och WebdriverIO. Projektet är tänkt att fungera som en grundavbildning som du kan använda för att förstå hur man kör winappdriver- och WebdriverIO-tester.

Läs mer på: [Medium-blogg](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Detta är ett mallprojekt som visar hur du kan köra webdriverio multi-remote-kapacitet med senaste WebdriverIO och Jasmine-ramverket. Projektet är tänkt att fungera som en grundavbildning som du kan använda för att förstå hur man kör WebdriverIO-tester i docker

Detta projekt använder:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Mallprojekt för att köra appium-tester på riktiga Roku-enheter med mocha enligt page object-mönstret.

- Ramverk
    - WebdriverIO Async v7
    - Appium 3.0
    - Mocha v7
    - Allure-rapportering

- Funktioner
    - Page Object Model
    - Typescript
    - Skärmdump vid fel
    - Exempeltester med en exempel-Roku-kanal

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

PoC-projekt för E2E multi-remote Cucumber-tester samt datadrivna Mocha-tester

- Ramverk:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Funktioner:
    - Cucumber-baserade E2E-tester
    - Mocha-baserade datadrivna tester
    - Endast webbtester - lokalt samt på molnplattformar
    - Endast mobiltester - lokalt samt på fjärranslutna molnemulatorer (eller enheter)
    - Webb- + mobiltester - multi-remote - lokalt samt på molnplattformar
    - Flera integrerade rapporter, inklusive Allure
    - Testdata (JSON / XLSX) hanteras globalt för att kunna skriva data (skapad i farten) till en fil efter testkörning
    - Github-arbetsflöde för att köra testerna och ladda upp allure-rapporten

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Detta är ett boilerplate-projekt som visar hur man kör webdriverio multi-remote med appium och chromedriver-tjänsten med senaste WebdriverIO.

- Ramverk
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Funktioner
  - [Page Object](pageobjects) Model
  - Typescript
  - Webb- + mobiltester - multi-remote
  - Native-appar för Android och iOS
  - Appium
  - Chromedriver
  - ESLint
  - Testexempel för inloggning på http://the-internet.herokuapp.com och [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app)