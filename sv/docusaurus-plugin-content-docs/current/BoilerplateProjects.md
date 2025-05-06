---
id: boilerplates
title: Mallprojekt
---

Med tiden har vår gemenskap utvecklat flera projekt som du kan använda som inspiration för att sätta upp din egen testsuite.

# v9 Mallprojekt

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Vårt eget mallprojekt för Cucumber-testsviter. Vi har skapat över 150 fördefinierade stegdefinitioner för dig, så att du kan börja skriva funktionsfiler i ditt projekt direkt.

- Ramverk:
    - Cucumber
    - WebdriverIO
- Funktioner:
    - Över 150 fördefinierade steg som täcker nästan allt du behöver
    - Integrerar WebdriverIOs Multiremote-funktionalitet
    - Egen demo-app

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Mallprojekt för att köra WebdriverIO-tester med Jasmine med Babel-funktioner och sidobjektsmönstret.

- Ramverk
    - WebdriverIO
    - Jasmine
- Funktioner
    - Page Object Pattern
    - Sauce Labs-integration

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Mallprojekt för att köra WebdriverIO-tester på en minimal Electron-applikation.

- Ramverk
    - WebdriverIO
    - Mocha
- Funktioner
    - Electron API mocking

## [amiya-pattnaik/gherkin-to-webdriverIO-test-generator](https://github.com/amiya-pattnaik/gherkin-to-webdriverIO-test-generator)
Generera automatiskt WebdriverIO Page Object-klasser och Mocha-testspecifikationer från Gherkin .feature-filer — minskar manuellt arbete, förbättrar konsekvensen och påskyndar QA-automatisering. Detta projekt producerar inte bara kod som är kompatibel med webdriver.io utan förbättrar också alla funktioner i webdriver.io.

***Hur fungerar det?***
- Processen följer en tvåstegsautomatisering:
- Steg 1: Gherkin till stepMap (Generera stepMap.json-filer)
  - Generera stepMap.json-filer:
    - Analyserar .feature-filer skrivna i Gherkin-syntax.
    - Extraherar scenarier och steg.
    - Producerar en strukturerad .stepMap.json-fil som innehåller:
      - åtgärd att utföra (t.ex. klick, setText, assertVisible)
      - selectorName för logisk mappning
      - selector för DOM-elementet
      - anteckning för värden eller påståenden
- Steg 2: stepMap till kod (Generera WebdriverIO-kod).
  Använder stepMap.json för att generera:
  - Generera en bas page.js-klass med delade metoder och browser.url()-inställning.
  - Generera WebdriverIO-kompatibla Page Object Model (POM)-klasser per funktion inuti test/pageobjects/.
  - Generera Mocha-baserade testspecifikationer.
- Katalogstruktur
```
project-root/
├── features/               # Input Gherkin feature files
├── stepMaps/               # Generated step maps (JSON)
├── test/
│   ├── pageobjects/        # Generated base Page class, Page Object classes
│   └── specs/              # Generated test specs
├── generateStepMap.js      # StepMap generator script
├── generateTestsFromMap.js # PageObject + test spec generator script
├── package.json
├── README.md
└── wdio.conf.js
```
---
# v8 Mallprojekt

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Ramverk: WDIO-V8 med Cucumber (V8x).
- Funktioner:
    - Page Objects Model använder ES6/ES7-stil klassbaserat tillvägagångssätt och TypeScript-stöd
    - Exempel på multiselektor-alternativ för att söka element med mer än en selektor samtidigt
    - Exempel på körning med flera webbläsare och headless webbläsare med Chrome och Firefox
    - Molntestning integrerad med BrowserStack, Sauce Labs, LambdaTest
    - Exempel på läs/skriv data från MS-Excel för enkel testdatahantering från externa datakällor med exempel
    - Databasstöd för alla RDBMS (Oracle, MySql, TeraData, Vertica etc.), exekvering av frågor/hämtning av resultatset etc. med exempel för E2E-testning
    - Flera rapporteringsformat (Spec, Xunit/Junit, Allure, JSON) och hosting av Allure och Xunit/Junit-rapportering på WebServer.
    - Exempel med demo-appen https://search.yahoo.com/ och http://the-internet.herokuapp.com.
    - BrowserStack, Sauce Labs, LambdaTest och Appium-specifika `.config`-filer (för uppspelning på mobila enheter). För enklick Appium-installation på lokal maskin för iOS och Android, se [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Ramverk: WDIO-V8 med Mocha (V10x).
- Funktioner:
    -  Page Objects Model använder ES6/ES7-stil klassbaserat tillvägagångssätt och TypeScript-stöd
    -  Exempel med demo-appen https://search.yahoo.com och http://the-internet.herokuapp.com
    -  Exempel på körning med flera webbläsare och headless webbläsare med Chrome och Firefox
    -  Molntestning integrerad med BrowserStack, Sauce Labs, LambdaTest
    -  Flera rapporteringsformat (Spec, Xunit/Junit, Allure, JSON) och hosting av Allure och Xunit/Junit-rapportering på WebServer.
    -  Exempel på läs/skriv data från MS-Excel för enkel testdatahantering från externa datakällor med exempel
    -  Exempel på DB-anslutning till vilken RDBMS som helst (Oracle, MySql, TeraData, Vertica etc.), exekvering av frågor/hämtning av resultatset etc. med exempel för E2E-testning
    -  BrowserStack, Sauce Labs, LambdaTest och Appium-specifika `.config`-filer (för uppspelning på mobila enheter). För enklick Appium-installation på lokal maskin för iOS och Android, se [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Ramverk: WDIO-V8 med Jasmine (V4x).
- Funktioner:
    -  Page Objects Model använder ES6/ES7-stil klassbaserat tillvägagångssätt och TypeScript-stöd
    -  Exempel med demo-appen https://search.yahoo.com och http://the-internet.herokuapp.com
    -  Exempel på körning med flera webbläsare och headless webbläsare med Chrome och Firefox
    -  Molntestning integrerad med BrowserStack, Sauce Labs, LambdaTest
    -  Flera rapporteringsformat (Spec, Xunit/Junit, Allure, JSON) och hosting av Allure och Xunit/Junit-rapportering på WebServer.
    -  Exempel på läs/skriv data från MS-Excel för enkel testdatahantering från externa datakällor med exempel
    -  Exempel på DB-anslutning till vilken RDBMS som helst (Oracle, MySql, TeraData, Vertica etc.), exekvering av frågor/hämtning av resultatset etc. med exempel för E2E-testning
    -  BrowserStack, Sauce Labs, LambdaTest och Appium-specifika `.config`-filer (för uppspelning på mobila enheter). För enklick Appium-installation på lokal maskin för iOS och Android, se [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Detta mallprojekt har WebdriverIO 8-tester med cucumber och typescript, följt av sidobjektsmönstret.

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
    - Parallell körning mellan webbläsare
    - Appium
    - Molntestning integrerad med BrowserStack & Sauce Labs
    - Docker-tjänst
    - Datadelningstjänst
    - Separata konfigurationsfiler för varje tjänst
    - Testdatahantering & läsning efter användartyp
    - Rapportering
      - Dot
      - Spec
      - Multipla cucumber html-rapporter med skärmbilder vid misslyckande
    - Gitlab-pipelines för Gitlab-repository
    - Github-actions för Github-repository
    - Docker compose för att konfigurera docker hub
    - Tillgänglighetstestning med AXE
    - Visuell testning med Applitools
    - Loggmekanism


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Ramverk
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funktioner
    - Innehåller exempel på testscenarier i cucumber
    - Integrerade cucumber html-rapporter med inbäddade videor vid misslyckanden
    - Integrerade Lambdatest och CircleCI-tjänster
    - Integrerade visuella, tillgänglighets- och API-tester
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
    - Automatiska skärmbilder vid testmisslyckande, inbäddade i rapporter
    - Kontinuerlig integration (CI) med [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo Serenity BDD-rapporter](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicerade på GitHub Pages
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
    - Automatiska skärmbilder vid testmisslyckande, inbäddade i rapporter
    - Kontinuerlig integration (CI) med [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo Serenity BDD-rapporter](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicerade på GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Mallprojekt för att köra WebdriverIO-tester i Headspin Cloud (https://www.headspin.io/) med Cucumber-funktioner och sidobjektsmönstret.
- Ramverk
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funktioner
    - Molnintegration med [Headspin](https://www.headspin.io/)
    - Stöder Page Object Model
    - Innehåller exempel på scenarier skrivna i deklarativ BDD-stil
    - Integrerade cucumber html-rapporter

# v7 Mallprojekt
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Mallprojekt för att köra Appium-tester med WebdriverIO för:

- iOS/Android-nativappar
- iOS/Android hybridappar
- Android Chrome och iOS Safari-webbläsare

Detta mallprojekt inkluderar följande:

- Ramverk: Mocha
- Funktioner:
    - Konfigurationer för:
        - iOS- och Android-appar
        - iOS- och Android-webbläsare
    - Hjälpmedel för:
        - WebView
        - Gester
        - Nativa varningar
        - Väljare
     - Testexempel för:
        - WebView
        - Inloggning
        - Formulär
        - Svep
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
  - Automatisk skärmbildstagning för misslyckade tester
  - CircleCI-exempel
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Mallprojekt för att köra E2E-tester med Mocha.

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
    -   Allure-rapport (skärmbilder vid misslyckande)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Mallprojekt för att köra **WebdriverIO v7**-tester för följande:

[WDIO 7-skript med TypeScript i Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7-skript med TypeScript i Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Kör WDIO 7-skript i Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Nätverksloggar](https://github.com/17thSep/MonitorNetworkLogs/)

Mallprojekt för:

- Fånga nätverksloggar
- Fånga alla GET/POST-anrop eller ett specifikt REST API
- Kontrollera förfrågningsparametrar
- Kontrollera svarsparametrar
- Lagra alla svar i en separat fil

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Mallprojekt för att köra appium-tester för nativa och mobila webbläsare med cucumber v7 och wdio v7 med sidobjektsmönstret.

- Ramverk
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Funktioner
    - Nativa Android- och iOS-appar
    - Android Chrome-webbläsare
    - iOS Safari-webbläsare
    - Page Object Model
    - Innehåller exempeltestscenarier i cucumber
    - Integrerad med flera cucumber html-rapporter

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Detta är ett mallprojekt som hjälper dig att visa hur du kan köra webdriverio-tester från webbapplikationer med hjälp av de senaste WebdriverIO och Cucumber-ramverken. Detta projekt är avsett att fungera som en basimage som du kan använda för att förstå hur du kör WebdriverIO-tester i docker

Detta projekt inkluderar:

- DockerFile
- cucumber-projekt

Läs mer på: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Detta är ett mallprojekt som hjälper dig att visa hur du kan köra electronJS-tester med WebdriverIO. Detta projekt är avsett att fungera som en basimage som du kan använda för att förstå hur du kör WebdriverIO electronJS-tester.

Detta projekt inkluderar:

- Exempel electronjs-app
- Exempel cucumber-testskript

Läs mer på: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Detta är ett mallprojekt som hjälper dig att visa hur du kan automatisera Windows-applikationer med winappdriver och WebdriverIO. Detta projekt är avsett att fungera som en basimage som du kan använda för att förstå hur du kör windappdriver och WebdriverIO-tester.

Läs mer på: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Detta är ett mallprojekt som hjälper dig att visa hur du kan köra webdriverio multiremote-funktion med de senaste WebdriverIO och Jasmine-ramverken. Detta projekt är avsett att fungera som en basimage som du kan använda för att förstå hur du kör WebdriverIO-tester i docker

Detta projekt använder:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Mallprojekt för att köra appium-tester på riktiga Roku-enheter med mocha med sidobjektsmönstret.

- Ramverk
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure Reporting

- Funktioner
    - Page Object Model
    - Typescript
    - Skärmbild vid misslyckande
    - Exempeltester med en enkel Roku-kanal

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

PoC-projekt för E2E Multiremote Cucumber-tester såväl som datadrivna Mocha-tester

- Ramverk:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Funktioner:
    - Cucumber-baserade E2E-tester
    - Mocha-baserade datadrivna tester
    - Endast webbtester - lokalt såväl som på molnplattformar
    - Endast mobiltester - lokala såväl som fjärrmolnemulatorer (eller enheter)
    - Webb + mobiltester - Multiremote - lokalt såväl som molnplattformar
    - Flera rapporter integrerade inklusive Allure
    - Testdata (JSON/XLSX) hanteras globalt för att skriva data (skapade under körning) till en fil efter testexekvering
    - Github-arbetsflöde för att köra testet och ladda upp allure-rapporten

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Detta är ett mallprojekt som hjälper till att visa hur man kör webdriverio multi-remote med appium och chromedriver-tjänst med de senaste WebdriverIO.

- Ramverk
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Funktioner
  - [Page Object](pageobjects) Model
  - Typescript
  - Webb + mobiltester - Multiremote
  - Nativa Android- och iOS-appar
  - Appium
  - Chromedriver
  - ESLint
  - Testexempel för inloggning på http://the-internet.herokuapp.com och [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app)