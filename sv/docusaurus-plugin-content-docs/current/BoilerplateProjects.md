---
id: boilerplates
title: Mallprojekt
---

Med tiden har vår gemenskap utvecklat flera projekt som du kan använda som inspiration för att sätta upp din egen testsvit.

# v9 Boilerplate Projects

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Vårt eget mallprojekt för Cucumber-testsviter. Vi har skapat över 150 fördefinierade stegdefinitioner för dig, så att du kan börja skriva funktionsfiler i ditt projekt direkt.

- Framework:
    - Cucumber
    - WebdriverIO
- Funktioner:
    - Över 150 fördefinierade steg som täcker nästan allt du behöver
    - Integrerar WebdriverIOs Multiremote-funktionalitet
    - Egen demo-app

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Mallprojekt för att köra WebdriverIO-tester med Jasmine, med Babel-funktioner och sidobjektsmönstret.

- Frameworks
    - WebdriverIO
    - Jasmine
- Funktioner
    - Sidobjektsmönster
    - Sauce Labs-integration

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Mallprojekt för att köra WebdriverIO-tester på en minimal Electron-applikation.

- Frameworks
    - WebdriverIO
    - Mocha
- Funktioner
    - Electron API-mockning
 
## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Detta mallprojekt har WebdriverIO 9 mobiltester med Cucumber, TypeScript och Appium för Android- och iOS-plattformar, följande Page Object Model-mönstret. Funktioner inkluderar omfattande loggning, rapportering, mobila gester, app-till-webb-navigering och CI/CD-integration.

- Frameworks:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Funktioner:
    - Stöd för flera plattformar
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Mobila gester
      - Scrollning
      - Svepning
      - Långt tryck
      - Dölja tangentbord
    - App-till-webb-navigering
      - Kontextbyte
      - WebView-stöd
      - Webbläsarautomation (Chrome/Safari)
    - Fräscht app-tillstånd
      - Automatisk app-återställning mellan scenarier
      - Konfigurerbart återställningsbeteende (noReset, fullReset)
    - Enhetskonfiguration
      - Centraliserad enhetshantering
      - Enkel plattformsväxling
    - Exempel på katalogstruktur för JavaScript / TypeScript. Nedan är för JS-versionen, TS-versionen har samma struktur.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Generera automatiskt WebdriverIO Page Object-klasser och Mocha-testspecifikationer från Gherkin .feature-filer — reducerar manuellt arbete, förbättrar konsekvens och snabbar upp QA-automatisering. Detta projekt producerar inte bara kod som är kompatibel med webdriver.io, utan förbättrar också alla funktioner i webdriver.io. Vi har skapat två varianter, en för JavaScript-användare och en för TypeScript-användare. Men båda projekten fungerar på samma sätt.

***Hur det fungerar?***
- Processen följer en tvåstegsautomatisering:
- Steg 1: Gherkin till stepMap (Generera stepMap.json-filer)
  - Generera stepMap.json-filer:
    - Analyserar .feature-filer skrivna i Gherkin-syntax.
    - Extraherar scenarier och steg.
    - Producerar en strukturerad .stepMap.json-fil som innehåller:
      - åtgärd att utföra (t.ex. klicka, setText, assertVisible)
      - selectorName för logisk mappning
      - selector för DOM-elementet
      - anteckning för värden eller påstående
- Steg 2: stepMap till kod (generera WebdriverIO-kod).
  Använder stepMap.json för att generera:
  - Generera en base page.js-klass med delade metoder och browser.url()-inställning.
  - Generera WebdriverIO-kompatibla Page Object Model (POM)-klasser per funktion inuti test/pageobjects/.
  - Generera Mocha-baserade testspecifikationer.
- Exempel på katalogstruktur för JavaScript / TypeScript. Nedan är för JS-versionen, TS-versionen har samma struktur.
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
# v8 Boilerplate Projects

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 med Cucumber (V8x).
- Funktioner:
    - Page Objects Model använder ES6/ES7-klassbaserad approach och TypeScript-stöd
    - Exempel på alternativ för flera väljare för att söka efter element med mer än en väljare samtidigt
    - Exempel på körning av flera webbläsare och headless-webbläsare med Chrome och Firefox
    - Molntestning Integration med BrowserStack, Sauce Labs, LambdaTest
    - Exempel på läsning/skrivning av data från MS-Excel för enkel testdatahantering från externa datakällor med exempel
    - Databasstöd till alla RDBMS (Oracle, MySql, TeraData, Vertica etc.), utföra frågor/hämta resultatset etc. med exempel för E2E-testning
    - Flera rapporteringar (Spec, Xunit/Junit, Allure, JSON) och värdskap för Allure och Xunit/Junit-rapportering på WebServer.
    - Exempel med demo-app https://search.yahoo.com/ och http://the-internet.herokuapp.com.
    - BrowserStack, Sauce Labs, LambdaTest och Appium-specifik `.config`-fil (för uppspelning på mobila enheter). För enklick Appium-installation på lokal maskin för iOS och Android, se [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 med Mocha (V10x).
- Funktioner:
    -  Page Objects Model använder ES6/ES7-klassbaserad approach och TypeScript-stöd
    -  Exempel med demo-app https://search.yahoo.com och http://the-internet.herokuapp.com
    -  Exempel på körning av flera webbläsare och headless-webbläsare med - Chrome och Firefox
    -  Molntestning Integration med BrowserStack, Sauce Labs, LambdaTest
    -  Flera rapporteringar (Spec, Xunit/Junit, Allure, JSON) och värdskap för Allure och Xunit/Junit-rapportering på WebServer.
    -  Exempel på läsning/skrivning av data från MS-Excel för enkel testdatahantering från externa datakällor med exempel
    -  Exempel på DB-anslutning till alla RDBMS (Oracle, MySql, TeraData, Vertica etc.), utföra frågor / hämta resultatset etc. med exempel för E2E-testning
    -  BrowserStack, Sauce Labs, LambdaTest och Appium-specifik `.config`-fil (för uppspelning på mobila enheter). För enklick Appium-installation på lokal maskin för iOS och Android, se [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 med Jasmine (V4x).
- Funktioner:
    -  Page Objects Model använder ES6/ES7-klassbaserad approach och TypeScript-stöd
    -  Exempel med demo-app https://search.yahoo.com och http://the-internet.herokuapp.com
    -  Exempel på körning av flera webbläsare och headless-webbläsare med - Chrome och Firefox
    -  Molntestning Integration med BrowserStack, Sauce Labs, LambdaTest
    -  Flera rapporteringar (Spec, Xunit/Junit, Allure, JSON) och värdskap för Allure och Xunit/Junit-rapportering på WebServer.
    -  Exempel på läsning/skrivning av data från MS-Excel för enkel testdatahantering från externa datakällor med exempel
    -  Exempel på DB-anslutning till alla RDBMS (Oracle, MySql, TeraData, Vertica etc.), utföra frågor / hämta resultatset etc. med exempel för E2E-testning
    -  BrowserStack, Sauce Labs, LambdaTest och Appium-specifik `.config`-fil (för uppspelning på mobila enheter). För enklick Appium-installation på lokal maskin för iOS och Android, se [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Detta mallprojekt har WebdriverIO 8-tester med cucumber och typescript, följt av page objects-mönstret.

- Frameworks:
    - WebdriverIO v8
    - Cucumber v8

- Funktioner:
    - Typescript v5
    - Page Object-mönster
    - Prettier
    - Stöd för flera webbläsare
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Parallell körning för olika webbläsare
    - Appium
    - Molntestning Integration med BrowserStack & Sauce Labs
    - Docker-tjänst
    - Delad datatjänst
    - Separata konfigurationsfiler för varje tjänst
    - Testdatahantering & läsning efter användartyp
    - Rapportering
      - Dot
      - Spec
      - Multipla cucumber html-rapporter med skärmbilder vid misslyckande
    - Gitlab-pipelines för Gitlab-repositorium
    - Github-åtgärder för Github-repositorium
    - Docker compose för att sätta upp docker hub
    - Tillgänglighetstestning med AXE
    - Visuell testning med Applitools
    - Loggmekanism


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funktioner
    - Innehåller exempel på testscenario i cucumber
    - Integrerade cucumber html-rapporter med inbäddade videor vid misslyckanden
    - Integrerade Lambdatest- och CircleCI-tjänster
    - Integrerade visuell-, tillgänglighets- och API-testning
    - Integrerad e-postfunktionalitet
    - Integrerad s3-bucket för lagring och hämtning av testrapporter

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) mallprojekt för att hjälpa dig komma igång med acceptanstestning av dina webbapplikationer med de senaste WebdriverIO, Mocha och Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD-rapportering

- Funktioner
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatiska skärmbilder vid testfel, inbäddade i rapporter
    - Kontinuerlig integration (CI) med [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo Serenity BDD-rapporter](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicerade till GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) mallprojekt för att hjälpa dig komma igång med acceptanstestning av dina webbapplikationer med de senaste WebdriverIO, Cucumber och Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD-rapportering

- Funktioner
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatiska skärmbilder vid testfel, inbäddade i rapporter
    - Kontinuerlig integration (CI) med [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo Serenity BDD-rapporter](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicerade till GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Mallprojekt för att köra WebdriverIO-tester i Headspin Cloud (https://www.headspin.io/) med Cucumber-funktioner och page objects-mönstret.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funktioner
    - Molnintegration med [Headspin](https://www.headspin.io/)
    - Stöder Page Object Model
    - Innehåller scenarioexempel skrivna i deklarativ stil för BDD
    - Integrerade cucumber html-rapporter

# v7 Boilerplate Projects
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Mallprojekt för att köra Appium-tester med WebdriverIO för:

- iOS/Android Native-appar
- iOS/Android Hybrid-appar
- Android Chrome och iOS Safari-webbläsare

Detta mallprojekt inkluderar följande:

- Framework: Mocha
- Funktioner:
    - Konfigurationer för:
        - iOS och Android-app
        - iOS och Android-webbläsare
    - Hjälpfunktioner för:
        - WebView
        - Gester
        - Native-aviseringar
        - Pickers
     - Testexempel för:
        - WebView
        - Inloggning
        - Formulär
        - Svepning
        - Webbläsare

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
ATDD WEB-tester med Mocha, WebdriverIO v6 med PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Funktioner
  - [Page Object](pageobjects)-modell
  - Sauce Labs-integration med [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Allure-rapport
  - Automatisk skärmbildstagning för misslyckade tester
  - CircleCI-exempel
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Mallprojekt för att köra E2E-tester med Mocha.

- Frameworks:
    - WebdriverIO (v7)
    - Mocha
- Funktioner:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Visuella regressionstester](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Page Object-mönster
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) och [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Github Actions-exempel
    -   Allure-rapport (skärmbilder vid fel)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Mallprojekt för att köra **WebdriverIO v7**-tester för följande:

[WDIO 7-skript med TypeScript i Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7-skript med TypeScript i Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Kör WDIO 7-skript i Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Nätverksloggar](https://github.com/17thSep/MonitorNetworkLogs/)

Mallprojekt för:

- Fånga nätverksloggar
- Fånga alla GET/POST-anrop eller ett specifikt REST API
- Bekräfta förfrågningsparametrar
- Bekräfta svarsparametrar
- Lagra alla svar i en separat fil

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Mallprojekt för att köra appium-tester för native- och mobilwebbläsare med cucumber v7 och wdio v7 med page object-mönster.

- Frameworks
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Funktioner
    - Native Android- och iOS-appar
    - Android Chrome-webbläsare
    - iOS Safari-webbläsare
    - Page Object Model
    - Innehåller testscenarioexempel i cucumber
    - Integrerad med flera cucumber html-rapporter

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Detta är ett mallprojekt för att hjälpa dig visa hur du kan köra webdriverio-tester från webbapplikationer med de senaste WebdriverIO och Cucumber-ramverket. Detta projekt är tänkt att fungera som en baslinjeimage som du kan använda för att förstå hur du kör WebdriverIO-tester i docker

Detta projekt inkluderar:

- DockerFile
- cucumber-projekt

Läs mer på: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Detta är ett mallprojekt för att hjälpa dig visa hur du kan köra electronJS-tester med WebdriverIO. Detta projekt är tänkt att fungera som en baslinjeimage som du kan använda för att förstå hur du kör WebdriverIO electronJS-tester.

Detta projekt inkluderar:

- Exempel på electronjs-app
- Exempel på cucumber-testskript

Läs mer på: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Detta är ett mallprojekt för att hjälpa dig visa hur du kan automatisera Windows-applikationer med winappdriver och WebdriverIO. Detta projekt är tänkt att fungera som en baslinjeimage som du kan använda för att förstå hur du kör windappdriver och WebdriverIO-tester.

Läs mer på: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Detta är ett mallprojekt för att hjälpa dig visa hur du kan köra webdriverio multiremote-kapacitet med senaste WebdriverIO och Jasmine-ramverket. Detta projekt är tänkt att fungera som en baslinjeimage som du kan använda för att förstå hur du kör WebdriverIO-tester i docker

Detta projekt använder:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Mallprojekt för att köra appium-tester på verkliga Roku-enheter med mocha och page object-mönster.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure-rapportering

- Funktioner
    - Page Object Model
    - Typescript
    - Skärmbild vid fel
    - Exempeltester med en Roku-kanal

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

PoC-projekt för E2E Multiremote Cucumber-tester samt datadrivna Mocha-tester

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Funktioner:
    - Cucumber-baserade E2E-tester
    - Mocha-baserade datadrivna tester
    - Endast webbtester - lokalt samt på molnplattformar
    - Endast mobiltester - lokala samt fjärrstyrda molnemulatorer (eller enheter)
    - Webb + mobiltester - Multiremote - lokalt samt på molnplattformar
    - Flera rapporter integrerade inklusive Allure
    - Testdata (JSON / XLSX) hanteras globalt för att skriva data (skapad under körning) till en fil efter testutförandet
    - Github-arbetsflöde för att köra testet och ladda upp allure-rapporten

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Detta är ett mallprojekt för att hjälpa visa hur man kör webdriverio multi-remote med appium och chromedriver-tjänst med den senaste WebdriverIO.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Funktioner
  - [Page Object](pageobjects)-modell
  - Typescript
  - Webb + mobiltester - Multiremote
  - Native Android- och iOS-appar
  - Appium
  - Chromedriver
  - ESLint
  - Testexempel för inloggning på http://the-internet.herokuapp.com och [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app)