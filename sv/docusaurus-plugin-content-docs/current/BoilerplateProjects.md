---
id: boilerplates
title: Boilerplateprojekt
---

Med tiden har vår gemenskap utvecklat flera projekt som du kan använda som inspiration för att skapa din egen testsvit.

# v8 Boilerplate Projects

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Vår egen boilerplate för Cucumber-testsviter. Vi har skapat över 150 fördefinierade stegdefinitioner för dig, så att du kan börja skriva funktionsfiler i ditt projekt direkt.

- Framework:
    - Cucumber
    - WebdriverIO
- Funktioner:
    - Över 150 fördefinierade steg som täcker nästan allt du behöver
    - Integrerar WebdriverIOs Multiremote-funktionalitet
    - Egen demo-app

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Boilerplate-projekt för att köra WebdriverIO-tester med Jasmine med Babel-funktioner och page objects-mönstret.

- Frameworks
    - WebdriverIO
    - Jasmine
- Funktioner
    - Page Object Pattern
    - Sauce Labs-integration

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Boilerplate-projekt för att köra WebdriverIO-tester på en minimal Electron-applikation.

- Frameworks
    - WebdriverIO
    - Mocha
- Funktioner
    - Electron API-mockning

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Detta boilerplate-projekt har WebdriverIO 8-tester med cucumber och typescript, som följer page objects-mönstret.

- Frameworks:
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
    - Crossbrowser parallell körning
    - Appium
    - Molntestning med BrowserStack & Sauce Labs
    - Docker-tjänst
    - Dela data-tjänst
    - Separata konfigurationsfiler för varje tjänst
    - Testdatahantering & läsning efter användartyp
    - Rapportering
      - Dot
      - Spec
      - Flera cucumber html-rapporter med skärmdumpar vid fel
    - Gitlab-pipelines för Gitlab-repository
    - Github actions för Github-repository
    - Docker compose för installation av docker hub
    - Tillgänglighetstestning med AXE
    - Visuell testning med Applitools
    - Loggmekanism

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 med Cucumber (V8x).
- Funktioner:
    - Page Objects Model använder ES6/ES7-klassbaserad metod och TypeScript-stöd
    - Exempel på flera väljare för att söka element med mer än en väljare samtidigt
    - Exempel på körning med flera webbläsare och headless-webbläsare - Chrome och Firefox
    - Molntestningsintegration med BrowserStack, Sauce Labs, LambdaTest
    - Exempel på läsning/skrivning av data från MS-Excel för enkel testdatahantering från externa datakällor med exempel
    - Databasstöd för RDBMS (Oracle, MySql, TeraData, Vertica etc.), körning av frågor / hämtning av resultatset etc. med exempel för E2E-testning
    - Flera rapporter (Spec, Xunit/Junit, Allure, JSON) och publicering av Allure och Xunit/Junit-rapporter på webbserver
    - Exempel med demo-appar https://search.yahoo.com/ och http://the-internet.herokuapp.com.
    - BrowserStack, Sauce Labs, LambdaTest och Appium-specifika `.config`-filer (för körning på mobila enheter). För enkel Appium-installation på lokal maskin för iOS och Android, se [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 med Mocha (V10x).
- Funktioner:
    -  Page Objects Model använder ES6/ES7-klassbaserad metod och TypeScript-stöd
    -  Exempel med demo-appar https://search.yahoo.com och http://the-internet.herokuapp.com
    -  Exempel på körning med flera webbläsare och headless-webbläsare - Chrome och Firefox
    -  Molntestningsintegration med BrowserStack, Sauce Labs, LambdaTest
    -  Flera rapporter (Spec, Xunit/Junit, Allure, JSON) och publicering av Allure och Xunit/Junit-rapporter på webbserver
    -  Exempel på läsning/skrivning av data från MS-Excel för enkel testdatahantering från externa datakällor med exempel
    -  Exempel på DB-anslutning till RDBMS (Oracle, MySql, TeraData, Vertica etc.), körning av frågor / hämtning av resultatset etc. med exempel för E2E-testning
    -  BrowserStack, Sauce Labs, LambdaTest och Appium-specifika `.config`-filer (för körning på mobila enheter). För enkel Appium-installation på lokal maskin för iOS och Android, se [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 med Jasmine (V4x).
- Funktioner:
    -  Page Objects Model använder ES6/ES7-klassbaserad metod och TypeScript-stöd
    -  Exempel med demo-appar https://search.yahoo.com och http://the-internet.herokuapp.com
    -  Exempel på körning med flera webbläsare och headless-webbläsare - Chrome och Firefox
    -  Molntestningsintegration med BrowserStack, Sauce Labs, LambdaTest
    -  Flera rapporter (Spec, Xunit/Junit, Allure, JSON) och publicering av Allure och Xunit/Junit-rapporter på webbserver
    -  Exempel på läsning/skrivning av data från MS-Excel för enkel testdatahantering från externa datakällor med exempel
    -  Exempel på DB-anslutning till RDBMS (Oracle, MySql, TeraData, Vertica etc.), körning av frågor / hämtning av resultatset etc. med exempel för E2E-testning
    -  BrowserStack, Sauce Labs, LambdaTest och Appium-specifika `.config`-filer (för körning på mobila enheter). För enkel Appium-installation på lokal maskin för iOS och Android, se [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funktioner
    - Innehåller exempel på testscenarier i cucumber
    - Integrerade cucumber html-rapporter med inbäddade videor vid fel
    - Integrerade Lambdatest- och CircleCI-tjänster
    - Integrerad visuell, tillgänglighets- och API-testning
    - Integrerad e-postfunktionalitet
    - Integrerad s3-bucket för testrapportlagring och hämtning

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) mallprojekt för att hjälpa dig komma igång med acceptanstestning av dina webbapplikationer med senaste WebdriverIO, Mocha och Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Serenity BDD-rapportering

- Funktioner
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatiska skärmdumpar vid testfel, inbäddade i rapporter
    - Kontinuerlig integration (CI) med [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo Serenity BDD-rapporter](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicerade på GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) mallprojekt för att hjälpa dig komma igång med acceptanstestning av dina webbapplikationer med senaste WebdriverIO, Cucumber och Serenity/JS.

- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Serenity BDD-rapportering

- Funktioner
    - [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatiska skärmdumpar vid testfel, inbäddade i rapporter
    - Kontinuerlig integration (CI) med [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo Serenity BDD-rapporter](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publicerade på GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Boilerplate-projekt för att köra WebdriverIO-tester i Headspin Cloud (https://www.headspin.io/) med Cucumber-funktioner och page objects-mönstret.
- Frameworks
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funktioner
    - Molnintegration med [Headspin](https://www.headspin.io/)
    - Stödjer Page Object Model
    - Innehåller exempelscenarier skrivna i deklarativ BDD-stil
    - Integrerade cucumber html-rapporter

# v7 Boilerplate Projects

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Boilerplate-projekt för att köra Appium-tester med WebdriverIO för:

- iOS/Android Native-appar
- iOS/Android Hybrid-appar
- Android Chrome och iOS Safari webbläsare

Denna boilerplate innehåller följande:

- Framework: Mocha
- Funktioner:
    - Konfigurationer för:
        - iOS- och Android-appar
        - iOS- och Android-webbläsare
    - Hjälpfunktioner för:
        - WebView
        - Gester
        - Native alerts
        - Pickers
     - Testexempel för:
        - WebView
        - Login
        - Formulär
        - Swipe
        - Webbläsare

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
ATDD WEB-tester med Mocha, WebdriverIO v6 med PageObject

- Frameworks
  - WebdriverIO (v7)
  - Mocha
- Funktioner
  - [Page Object](pageobjects) Model
  - Sauce Labs-integration med [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Allure Report
  - Automatisk skärmdumpstagning för misslyckade tester
  - CircleCI-exempel
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Boilerplate-projekt för att köra E2E-tester med Mocha.

- Frameworks:
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

Boilerplate-projekt för:

- Fånga nätverksloggar
- Fånga alla GET/POST-anrop eller en specifik REST API
- Testa Request-parametrar
- Testa Response-parametrar
- Lagra alla svar i en separat fil

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Boilerplate-projekt för att köra appium-tester för nativa och mobila webbläsare med cucumber v7 och wdio v7 med page object-mönster.

- Frameworks
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

Detta är ett mallprojekt för att visa hur du kan köra webdriverio-tester från webbapplikationer med senaste WebdriverIO och Cucumber-ramverket. Detta projekt avser att fungera som en baslinje-image som du kan använda för att förstå hur man kör WebdriverIO-tester i docker

Detta projekt inkluderar:

- DockerFile
- cucumber-projekt

Läs mer på: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Detta är ett mallprojekt för att visa hur du kan köra electronJS-tester med WebdriverIO. Detta projekt avser att fungera som en baslinje-image som du kan använda för att förstå hur man kör WebdriverIO electronJS-tester.

Detta projekt inkluderar:

- Exempel på electronjs-app
- Exempel på cucumber-testskript

Läs mer på: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Detta är ett mallprojekt för att visa hur du kan automatisera Windows-applikationer med winappdriver och WebdriverIO. Detta projekt avser att fungera som en baslinje-image som du kan använda för att förstå hur man kör windappdriver och WebdriverIO-tester.

Läs mer på: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Detta är ett mallprojekt för att visa hur du kan köra webdriverio multiremote-funktioner med senaste WebdriverIO och Jasmine-ramverket. Detta projekt avser att fungera som en baslinje-image som du kan använda för att förstå hur man kör WebdriverIO-tester i docker

Detta projekt använder:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Mallprojekt för att köra appium-tester på riktiga Roku-enheter med mocha med page object-mönster.

- Frameworks
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Allure Reporting

- Funktioner
    - Page Object Model
    - Typescript
    - Skärmdump vid fel
    - Exempeltester med en Roku-exempelkanal

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

PoC-projekt för E2E Multiremote Cucumber-tester samt datadrivna Mocha-tester

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Funktioner:
    - Cucumber-baserade E2E-tester
    - Mocha-baserade datadrivna tester
    - Endast webbtester - lokalt och i molnplattformar
    - Endast mobiltester - lokala och fjärremulator i molnet (eller enheter)
    - Webb + mobil-tester - Multiremote - lokalt och molnplattformar
    - Flera rapporter integrerade inklusive Allure
    - Testdata (JSON/XLSX) hanteras globalt för att skriva data (som skapas dynamiskt) till en fil efter testkörning
    - Github workflow för att köra test och ladda upp allure-rapport

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Detta är ett boilerplate-projekt för att visa hur man kör webdriverio multi-remote med appium och chromedriver-tjänst med senaste WebdriverIO.

- Frameworks
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Funktioner
  - [Page Object](pageobjects) Model
  - Typescript
  - Webb + mobil-tester - Multiremote
  - Nativa Android- och iOS-appar
  - Appium
  - Chromedriver
  - ESLint
  - Testexempel för inloggning på http://the-internet.herokuapp.com och [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app)