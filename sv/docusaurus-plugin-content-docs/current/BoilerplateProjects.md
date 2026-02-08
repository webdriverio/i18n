---
id: boilerplates
title: Boilerplate-projekt
---

Med tiden har vår gemenskap utvecklat flera projekt som du kan använda som inspiration för att sätta upp din egen testsvit.

# v9 Boilerplate-projekt

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Vår egen boilerplate för Cucumber-testsviter. Vi har skapat över 150 fördefinierade stepdefinitioner för dig, så att du kan börja skriva funktionsfiler i ditt projekt direkt.

- Ramverk:
    - Cucumber
    - WebdriverIO
- Funktioner:
    - Över 150 fördefinierade steg som täcker nästan allt du behöver
    - Integrerar WebdriverIO:s Multiremote-funktionalitet
    - Egen demo-app

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Boilerplate-projekt för att köra WebdriverIO-tester med Jasmine med Babel-funktioner och sidobjektsmönster.

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
    - Electron API-mocking

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Detta boilerplate-projekt har WebdriverIO 9 mobiltester med Cucumber, TypeScript och Appium för Android- och iOS-plattformar, enligt Page Object Model-mönstret. Innehåller omfattande loggning, rapportering, mobilgester, app-till-webb-navigering och CI/CD-integration.

- Ramverk:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Funktioner:
    - Stöd för flera plattformar
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Mobilgester
      - Scroll
      - Swipe
      - Långt tryck
      - Dölj tangentbord
    - App-till-webb-navigering
      - Kontextbyte
      - WebView-stöd
      - Webbläsarautomation (Chrome/Safari)
    - Färskt app-tillstånd
      - Automatisk app-återställning mellan scenarier
      - Konfigurerbart återställningsbeteende (noReset, fullReset)
    - Enhetskonfiguration
      - Centraliserad enhetshantering
      - Enkel plattformsväxling
    - Exempel på katalogstruktur för JavaScript / TypeScript. Nedan är för JS-versionen, TS-versionen har samma struktur.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Generera automatiskt WebdriverIO Page Object-klasser och Mocha-testspecifikationer från Gherkin .feature-filer — minskar manuellt arbete, förbättrar konsekvens och snabbar upp QA-automatisering. Detta projekt producerar inte bara kod som är kompatibel med webdriver.io utan förbättrar också alla funktioner i webdriver.io. Vi har skapat två varianter, en för JavaScript-användare och en för TypeScript-användare. Men båda projekten fungerar på samma sätt.

***Hur det fungerar?***
- Processen följer en tvåstegsautomatisering:
- Steg 1: Gherkin till stepMap (Generera stepMap.json-filer)
  - Generera stepMap.json-filer:
    - Analyserar .feature-filer skrivna i Gherkin-syntax.
    - Extraherar scenarier och steg.
    - Producerar en strukturerad .stepMap.json-fil som innehåller:
      - åtgärd att utföra (t.ex. click, setText, assertVisible)
      - selectorName för logisk mappning
      - selector för DOM-elementet
      - note för värden eller bekräftelse
- Steg 2: stepMap till kod (Generera WebdriverIO-kod).
  Använder stepMap.json för att generera:
  - Generera en base page.js-klass med delade metoder och browser.url()-inställning.
  - Generera WebdriverIO-kompatibla Page Object Model (POM)-klasser per funktion i test/pageobjects/.
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
# v8 Boilerplate-projekt

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Ramverk: WDIO-V8 med Cucumber (V8x).
- Funktioner:
    - Page Objects Model använder ES6/ES7-stil klassbaserad metod och TypeScript-stöd
    - Exempel på multi-selektor-alternativ för att söka element med mer än en selektor på en gång
    - Exempel på multibrowser- och headless browser-exekvering med Chrome och Firefox
    - Molntestning Integrering med BrowserStack, Sauce Labs, TestMu AI (tidigare LambdaTest)
    - Exempel på läs/skriv data från MS-Excel för enkel testdatahantering från externa datakällor med exempel
    - Databasstöd för alla RDBMS (Oracle, MySql, TeraData, Vertica etc.), utförande av frågor / hämtning av resultatuppsättningar etc. med exempel för E2E-testning
    - Flera rapporteringsformat (Spec, Xunit/Junit, Allure, JSON) och värdtjänst för Allure och Xunit/Junit-rapportering på WebServer.
    - Exempel med demo-app https://search.yahoo.com/ och http://the-internet.herokuapp.com.
    - BrowserStack, Sauce Labs, TestMu AI (tidigare LambdaTest) och Appium-specifika `.config`-filer (för uppspelning på mobila enheter). För ett-klicks Appium-installation på lokal maskin för iOS och Android, se [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Ramverk: WDIO-V8 med Mocha (V10x).
- Funktioner:
    -  Page Objects Model använder ES6/ES7-stil klassbaserad metod och TypeScript-stöd
    -  Exempel med demo-app https://search.yahoo.com och http://the-internet.herokuapp.com
    -  Exempel på multibrowser- och headless browser-exekvering med Chrome och Firefox
    -  Molntestning Integrering med BrowserStack, Sauce Labs, TestMu AI (tidigare LambdaTest)
    -  Flera rapporteringsformat (Spec, Xunit/Junit, Allure, JSON) och värdtjänst för Allure och Xunit/Junit-rapportering på WebServer.
    -  Exempel på läs/skriv data från MS-Excel för enkel testdatahantering från externa datakällor med exempel
    -  Exempel på DB-anslutning till alla RDBMS (Oracle, MySql, TeraData, Vertica etc.), utförande av frågor / hämtning av resultatuppsättningar etc. med exempel för E2E-testning
    -  BrowserStack, Sauce Labs, TestMu AI (tidigare LambdaTest) och Appium-specifika `.config`-filer (för uppspelning på mobila enheter). För ett-klicks Appium-installation på lokal maskin för iOS och Android, se [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Ramverk: WDIO-V8 med Jasmine (V4x).
- Funktioner:
    -  Page Objects Model använder ES6/ES7-stil klassbaserad metod och TypeScript-stöd
    -  Exempel med demo-app https://search.yahoo.com och http://the-internet.herokuapp.com
    -  Exempel på multibrowser- och headless browser-exekvering med Chrome och Firefox
    -  Molntestning Integrering med BrowserStack, Sauce Labs, TestMu AI (tidigare LambdaTest)
    -  Flera rapporteringsformat (Spec, Xunit/Junit, Allure, JSON) och värdtjänst för Allure och Xunit/Junit-rapportering på WebServer.
    -  Exempel på läs/skriv data från MS-Excel för enkel testdatahantering från externa datakällor med exempel
    -  Exempel på DB-anslutning till alla RDBMS (Oracle, MySql, TeraData, Vertica etc.), utförande av frågor / hämtning av resultatuppsättningar etc. med exempel för E2E-testning
    -  BrowserStack, Sauce Labs, TestMu AI (tidigare LambdaTest) och Appium-specifika `.config`-filer (för uppspelning på mobila enheter). För ett-klicks Appium-installation på lokal maskin för iOS och Android, se [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Detta boilerplate-projekt har WebdriverIO 8-tester med cucumber och typescript, följt av page objects-mönstret.

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
    - Cross-browser parallell exekvering
    - Appium
    - Molntestning Integrering med BrowserStack & Sauce Labs
    - Docker-tjänst
    - Dela datatjänst
    - Separata konfigurationsfiler för varje tjänst
    - Testdatahantering & läsning per användartyp
    - Rapportering
      - Dot
      - Spec
      - Multipla cucumber html-rapporter med skärmdumpar vid fel
    - Gitlab-pipelines för Gitlab-repository
    - Github actions för Github-repository
    - Docker compose för att sätta upp docker hub
    - Tillgänglighetstestning med AXE
    - Visuell testning med Applitools
    - Loggningsmekanismer


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Ramverk
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funktioner
    - Innehåller provtestscenario i cucumber
    - Integrerade cucumber html-rapporter med inbäddade videoklipp vid fel
    - Integrerade Lambdatest och CircleCI-tjänster
    - Integrerad Visuell, Tillgänglighet och API-testning
    - Integrerad e-postfunktionalitet
    - Integrerad s3-bucket för lagring och hämtning av testrapporter

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) mallprojekt för att hjälpa dig komma igång med acceptanstestning av dina webbapplikationer med hjälp av de senaste WebdriverIO, Mocha och Serenity/JS.

- Ramverk
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD-rapportering

- Funktioner
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatiska skärmdumpar vid testfel, inbäddade i rapporter
    - Kontinuerlig integration (CI) med [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo Serenity BDD-rapporter](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicerade till GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) mallprojekt för att hjälpa dig komma igång med acceptanstestning av dina webbapplikationer med hjälp av de senaste WebdriverIO, Cucumber och Serenity/JS.

- Ramverk
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD-rapportering

- Funktioner
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatiska skärmdumpar vid testfel, inbäddade i rapporter
    - Kontinuerlig integration (CI) med [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo Serenity BDD-rapporter](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicerade till GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Boilerplate-projekt för att köra WebdriverIO-tester i Headspin Cloud (https://www.headspin.io/) med hjälp av Cucumber-funktioner och page objects-mönstret.
- Ramverk
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funktioner
    - Molnintegrering med [Headspin](https://www.headspin.io/)
    - Stöd för Page Object Model
    - Innehåller provscenarier skrivna i deklarativ BDD-stil
    - Integrerade cucumber html-rapporter

# v7 Boilerplate-projekt
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Boilerplate-projekt för att köra Appium-tester med WebdriverIO för:

- iOS/Android Native-appar
- iOS/Android Hybrid-appar
- Android Chrome och iOS Safari-webbläsare

Detta boilerplate innehåller följande:

- Ramverk: Mocha
- Funktioner:
    - Konfigurationer för:
        - iOS- och Android-app
        - iOS- och Android-webbläsare
    - Hjälpfunktioner för:
        - WebView
        - Gester
        - Native-varningar
        - Plockare
     - Testexempel för:
        - WebView
        - Login
        - Formulär
        - Svepning
        - Webbläsare

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
ATDD WEB-tester med Mocha, WebdriverIO v6 med PageObject

- Ramverk
  - WebdriverIO (v7)
  - Mocha
- Funktioner
  - [Page Object](pageobjects) Model
  - Sauce Labs-integration med [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Allure Report
  - Automatisk skärmdumptagning för misslyckade tester
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

[WDIO 7-skript med TypeScript i Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7-skript med TypeScript i Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Kör WDIO 7-skript i Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Nätverksloggar](https://github.com/17thSep/MonitorNetworkLogs/)

Boilerplate-projekt för:

- Fånga nätverksloggar
- Fånga alla GET/POST-anrop eller specifika REST API
- Bekräfta förfrågningsparametrar
- Bekräfta svarsparametrar
- Lagra alla svar i en separat fil

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Boilerplate-projekt för att köra appium-tester för native och mobil webbläsare med cucumber v7 och wdio v7 med page object-mönster.

- Ramverk
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Funktioner
    - Native Android- och iOS-appar
    - Android Chrome-webbläsare
    - iOS Safari-webbläsare
    - Page Object Model
    - Innehåller testscenarier i cucumber
    - Integrerat med flera cucumber html-rapporter

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Detta är ett mallprojekt för att hjälpa dig visa hur du kan köra webdriverio-tester från webbapplikationer med hjälp av de senaste WebdriverIO och Cucumber-ramverken. Detta projekt är tänkt att fungera som en baslinjebild som du kan använda för att förstå hur du kör WebdriverIO-tester i docker.

Detta projekt innehåller:

- DockerFile
- cucumber-projekt

Läs mer på: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Detta är ett mallprojekt för att visa hur du kan köra electronJS-tester med WebdriverIO. Detta projekt är tänkt att fungera som en baslinjebild som du kan använda för att förstå hur du kör WebdriverIO electronJS-tester.

Detta projekt innehåller:

- Exempel på electronjs-app
- Exempel på cucumber testskript

Läs mer på: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Detta är ett mallprojekt för att visa hur du kan automatisera Windows-applikationer med winappdriver och WebdriverIO. Detta projekt är tänkt att fungera som en baslinjebild som du kan använda för att förstå hur du kör windappdriver och WebdriverIO-tester.

Läs mer på: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Detta är ett mallprojekt för att visa hur du kan köra webdriverio multiremote-kapacitet med senaste WebdriverIO och Jasmine-ramverket. Detta projekt är tänkt att fungera som en baslinjebild som du kan använda för att förstå hur du kör WebdriverIO-tester i docker.

Detta projekt använder:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Mallprojekt för att köra appium-tester på riktiga Roku-enheter med mocha med page object-mönster.

- Ramverk
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure-rapportering

- Funktioner
    - Page Object Model
    - Typescript
    - Skärmdump vid fel
    - Exempeltester med hjälp av en exempelkanal för Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

PoC-projekt för E2E Multiremote Cucumber-tester samt datadrivna Mocha-tester

- Ramverk:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Funktioner:
    - Cucumber-baserade E2E-tester
    - Mocha-baserade datadrivna tester
    - Endast webbtester - lokalt och på molnplattformar
    - Endast mobiltester - lokala och fjärrmolnemulatorer (eller enheter)
    - Webb + Mobiltester - Multiremote - lokalt samt molnplattformar
    - Flera rapporter integrerade inklusive Allure
    - Testdata (JSON / XLSX) hanteras globalt för att skriva data (skapade on the fly) till en fil efter testexekvering
    - Github-arbetsflöde för att köra testet och ladda upp allure-rapporten

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Detta är ett boilerplate-projekt som hjälper till att visa hur man kör webdriverio multi-remote med appium och chromedriver-tjänst med den senaste WebdriverIO.

- Ramverk
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Funktioner
  - [Page Object](pageobjects) Model
  - Typescript
  - Webb + Mobiltester - Multiremote
  - Native Android och iOS-appar
  - Appium
  - Chromedriver
  - ESLint
  - Testexempel för inloggning på http://the-internet.herokuapp.com och [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app)