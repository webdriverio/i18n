---
id: boilerplates
title: Projekty Szablonowe
---

Z biegiem czasu nasza społeczność opracowała kilka projektów, które możesz wykorzystać jako inspirację do skonfigurowania własnego zestawu testów.

# Projekty Szablonowe v8

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Nasz własny szablon dla zestawów testowych Cucumber. Stworzyliśmy ponad 150 predefiniowanych definicji kroków, dzięki czemu możesz od razu zacząć pisać pliki funkcji w swoim projekcie.

- Framework:
    - Cucumber
    - WebdriverIO
- Funkcje:
    - Ponad 150 predefiniowanych kroków, które obejmują prawie wszystko, czego potrzebujesz
    - Integruje funkcjonalność Multiremote WebdriverIO
    - Własna aplikacja demonstracyjna

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Projekt szablonowy do uruchamiania testów WebdriverIO z Jasmine, wykorzystujący funkcje Babel i wzorzec obiektów stronowych.

- Frameworki
    - WebdriverIO
    - Jasmine
- Funkcje
    - Wzorzec obiektów stronowych
    - Integracja z Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Projekt szablonowy do uruchamiania testów WebdriverIO na minimalnej aplikacji Electron.

- Frameworki
    - WebdriverIO
    - Mocha
- Funkcje
    - Mockowanie API Electron

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Ten projekt szablonowy zawiera testy WebdriverIO 8 z cucumberem i typescript, zgodnie z wzorcem obiektów stronowych.

- Frameworki:
    - WebdriverIO v8
    - Cucumber v8

- Funkcje:
    - Typescript v5
    - Wzorzec obiektów stronowych
    - Prettier
    - Obsługa wielu przeglądarek
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Równoległe wykonywanie w różnych przeglądarkach
    - Appium
    - Integracja z testowaniem w chmurze BrowserStack i Sauce Labs
    - Usługa Docker
    - Usługa udostępniania danych
    - Oddzielne pliki konfiguracyjne dla każdej usługi
    - Zarządzanie danymi testowymi i odczyt według typu użytkownika
    - Raportowanie
      - Dot
      - Spec
      - Wiele raportów HTML cucumber ze zrzutami ekranu niepowodzeń
    - Potoki Gitlab dla repozytorium Gitlab
    - Github actions dla repozytorium Github
    - Docker compose do konfiguracji docker hub
    - Testowanie dostępności za pomocą AXE
    - Testowanie wizualne za pomocą Applitools
    - Mechanizm logowania

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 z Cucumber (V8x).
- Funkcje:
    - Wzorzec obiektów stronowych używany z podejściem klasowym w stylu ES6/ES7 i obsługą TypeScript
    - Przykłady opcji wielu selektorów do zapytań o element z więcej niż jednym selektorem jednocześnie
    - Przykłady wykonywania w wielu przeglądarkach i przeglądarkach headless - Chrome i Firefox
    - Integracja z testowaniem w chmurze BrowserStack, Sauce Labs, LambdaTest
    - Przykłady odczytu/zapisu danych z MS-Excel dla łatwego zarządzania danymi testowymi z zewnętrznych źródeł danych z przykładami
    - Obsługa baz danych dla dowolnego RDBMS (Oracle, MySql, TeraData, Vertica itp.), wykonywanie zapytań / pobieranie zestawów wyników itp. z przykładami dla testów E2E
    - Wiele raportów (Spec, Xunit/Junit, Allure, JSON) i hostowanie raportów Allure i Xunit/Junit na WebServer.
    - Przykłady z aplikacją demo https://search.yahoo.com/ i http://the-internet.herokuapp.com.
    - Specyficzne pliki `.config` dla BrowserStack, Sauce Labs, LambdaTest i Appium (do odtwarzania na urządzeniach mobilnych). Aby zapoznać się z jednoklikową konfiguracją Appium na lokalnym komputerze dla iOS i Androida, sprawdź [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 z Mocha (V10x).
- Funkcje:
    -  Wzorzec obiektów stronowych używany z podejściem klasowym w stylu ES6/ES7 i obsługą TypeScript
    -  Przykłady z aplikacją demo https://search.yahoo.com i http://the-internet.herokuapp.com
    -  Przykłady wykonywania w wielu przeglądarkach i przeglądarkach headless - Chrome i Firefox
    -  Integracja z testowaniem w chmurze BrowserStack, Sauce Labs, LambdaTest
    -  Wiele raportów (Spec, Xunit/Junit, Allure, JSON) i hostowanie raportów Allure i Xunit/Junit na WebServer.
    -  Przykłady odczytu/zapisu danych z MS-Excel dla łatwego zarządzania danymi testowymi z zewnętrznych źródeł danych z przykładami
    -  Przykłady połączenia z DB do dowolnego RDBMS (Oracle, MySql, TeraData, Vertica itp.), wykonywanie dowolnych zapytań / pobieranie zestawów wyników itp. z przykładami dla testów E2E
    -  Specyficzne pliki `.config` dla BrowserStack, Sauce Labs, LambdaTest i Appium (do odtwarzania na urządzeniach mobilnych). Aby zapoznać się z jednoklikową konfiguracją Appium na lokalnym komputerze dla iOS i Androida, sprawdź [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 z Jasmine (V4x).
- Funkcje:
    -  Wzorzec obiektów stronowych używany z podejściem klasowym w stylu ES6/ES7 i obsługą TypeScript
    -  Przykłady z aplikacją demo https://search.yahoo.com i http://the-internet.herokuapp.com
    -  Przykłady wykonywania w wielu przeglądarkach i przeglądarkach headless - Chrome i Firefox
    -  Integracja z testowaniem w chmurze BrowserStack, Sauce Labs, LambdaTest
    -  Wiele raportów (Spec, Xunit/Junit, Allure, JSON) i hostowanie raportów Allure i Xunit/Junit na WebServer.
    -  Przykłady odczytu/zapisu danych z MS-Excel dla łatwego zarządzania danymi testowymi z zewnętrznych źródeł danych z przykładami
    -  Przykłady połączenia z DB do dowolnego RDBMS (Oracle, MySql, TeraData, Vertica itp.), wykonywanie dowolnych zapytań / pobieranie zestawów wyników itp. z przykładami dla testów E2E
    -  Specyficzne pliki `.config` dla BrowserStack, Sauce Labs, LambdaTest i Appium (do odtwarzania na urządzeniach mobilnych). Aby zapoznać się z jednoklikową konfiguracją Appium na lokalnym komputerze dla iOS i Androida, sprawdź [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworki
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funkcje
    - Zawiera przykładowy scenariusz testowy w cucumber
    - Zintegrowane raporty html cucumber z osadzonymi filmami w przypadku niepowodzeń
    - Zintegrowane usługi Lambdatest i CircleCI
    - Zintegrowane testowanie wizualne, dostępności i API
    - Zintegrowana funkcjonalność e-mail
    - Zintegrowany bucket s3 do przechowywania i pobierania raportów testowych

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) szablon projektu, który pomoże Ci rozpocząć testowanie akceptacyjne aplikacji internetowych przy użyciu najnowszych WebdriverIO, Mocha i Serenity/JS.

- Frameworki
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Raportowanie Serenity BDD

- Funkcje
    - [Wzorzec Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatyczne zrzuty ekranu w przypadku niepowodzenia testu, osadzone w raportach
    - Konfiguracja ciągłej integracji (CI) przy użyciu [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo raportów Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) opublikowane na GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) szablon projektu, który pomoże Ci rozpocząć testowanie akceptacyjne aplikacji internetowych przy użyciu najnowszych WebdriverIO, Cucumber i Serenity/JS.

- Frameworki
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Raportowanie Serenity BDD

- Funkcje
    - [Wzorzec Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatyczne zrzuty ekranu w przypadku niepowodzenia testu, osadzone w raportach
    - Konfiguracja ciągłej integracji (CI) przy użyciu [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo raportów Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) opublikowane na GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Projekt szablonowy do uruchamiania testów WebdriverIO w chmurze Headspin (https://www.headspin.io/) przy użyciu funkcji Cucumber i wzorca obiektów stronowych.
- Frameworki
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funkcje
    - Integracja z chmurą [Headspin](https://www.headspin.io/)
    - Obsługuje wzorzec obiektów stronowych
    - Zawiera przykładowe scenariusze napisane w stylu deklaratywnym BDD
    - Zintegrowane raporty html cucumber

# Projekty Szablonowe v7

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Projekt szablonowy do uruchamiania testów Appium z WebdriverIO dla:

- Natywnych aplikacji iOS/Android
- Aplikacji hybrydowych iOS/Android
- Przeglądarek Android Chrome i iOS Safari

Ten szablon zawiera:

- Framework: Mocha
- Funkcje:
    - Konfiguracje dla:
        - Aplikacji iOS i Android
        - Przeglądarek iOS i Android
    - Helpery dla:
        - WebView
        - Gestów
        - Natywnych alertów
        - Pickerów
     - Przykłady testów dla:
        - WebView
        - Logowania
        - Formularzy
        - Przeciągania
        - Przeglądarek

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Testy ATDD dla WEB z Mocha, WebdriverIO v6 z PageObject

- Frameworki
  - WebdriverIO (v7)
  - Mocha
- Funkcje
  - Model [Obiektów Stronowych](pageobjects)
  - Integracja z Sauce Labs za pomocą [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Raport Allure
  - Automatyczne przechwytywanie zrzutów ekranu dla nieudanych testów
  - Przykład CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Projekt szablonowy do uruchamiania testów E2E z Mocha.

- Frameworki:
    - WebdriverIO (v7)
    - Mocha
- Funkcje:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Testy regresji wizualnej](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Wzorzec obiektów stronowych
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) i [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Przykład Github Actions
    -   Raport Allure (zrzuty ekranu w przypadku niepowodzenia)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Projekt szablonowy do uruchamiania testów **WebdriverIO v7** dla:

[Skrypty WDIO 7 z TypeScript w frameworku Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Skrypty WDIO 7 z TypeScript w frameworku Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Uruchamianie skryptów WDIO 7 w Dockerze](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Logi sieciowe](https://github.com/17thSep/MonitorNetworkLogs/)

Projekt szablonowy do:

- Przechwytywania logów sieciowych
- Przechwytywania wszystkich wywołań GET/POST lub określonego REST API
- Asercji parametrów żądania
- Asercji parametrów odpowiedzi
- Przechowywania wszystkich odpowiedzi w osobnym pliku

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Projekt szablonowy do uruchamiania testów appium dla natywnych aplikacji i przeglądarek mobilnych przy użyciu cucumber v7 i wdio v7 z wzorcem obiektów stronowych.

- Frameworki
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Funkcje
    - Natywne aplikacje Android i iOS
    - Przeglądarka Android Chrome
    - Przeglądarka iOS Safari
    - Wzorzec obiektów stronowych
    - Zawiera przykładowe scenariusze testowe w cucumber
    - Zintegrowany z wieloma raportami html cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

To projekt szablonowy, który pomaga pokazać, jak można uruchamiać testy webdriverio dla aplikacji internetowych przy użyciu najnowszego WebdriverIO i frameworka Cucumber. Ten projekt ma służyć jako obraz bazowy, którego możesz użyć do zrozumienia, jak uruchamiać testy WebdriverIO w Dockerze.

Ten projekt zawiera:

- DockerFile
- Projekt cucumber

Przeczytaj więcej na: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

To projekt szablonowy, który pomaga pokazać, jak można uruchamiać testy electronJS przy użyciu WebdriverIO. Ten projekt ma służyć jako obraz bazowy, którego możesz użyć do zrozumienia, jak uruchamiać testy WebdriverIO electronJS.

Ten projekt zawiera:

- Przykładową aplikację electronjs
- Przykładowe skrypty testowe cucumber

Przeczytaj więcej na: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

To projekt szablonowy, który pomaga pokazać, jak można automatyzować aplikacje Windows przy użyciu winappdriver i WebdriverIO. Ten projekt ma służyć jako obraz bazowy, którego możesz użyć do zrozumienia, jak uruchamiać testy winappdriver i WebdriverIO.

Przeczytaj więcej na: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


To projekt szablonowy, który pomaga pokazać, jak można uruchamiać funkcję multiremote webdriverio z najnowszym WebdriverIO i frameworkiem Jasmine. Ten projekt ma służyć jako obraz bazowy, którego możesz użyć do zrozumienia, jak uruchamiać testy WebdriverIO w Dockerze.

Ten projekt wykorzystuje:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Projekt szablonowy do uruchamiania testów appium na rzeczywistych urządzeniach Roku przy użyciu mocha z wzorcem obiektów stronowych.

- Frameworki
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Raportowanie Allure

- Funkcje
    - Wzorzec obiektów stronowych
    - Typescript
    - Zrzut ekranu w przypadku niepowodzenia
    - Przykładowe testy wykorzystujące przykładowy kanał Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Projekt PoC do testów E2E Multiremote Cucumber oraz testów Mocha opartych na danych

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Funkcje:
    - Testy E2E oparte na Cucumber
    - Testy napędzane danymi oparte na Mocha
    - Testy tylko dla aplikacji internetowych - zarówno lokalnie, jak i na platformach chmurowych
    - Testy tylko dla mobilnych - lokalne oraz zdalne emulatory chmurowe (lub urządzenia)
    - Testy Web + Mobile - Multiremote - zarówno lokalnie, jak i na platformach chmurowych
    - Zintegrowane wiele raportów, w tym Allure
    - Dane testowe (JSON / XLSX) obsługiwane globalnie, aby zapisać dane (tworzone na bieżąco) do pliku po wykonaniu testu
    - Github workflow do uruchamiania testów i przesyłania raportu Allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

To projekt szablonowy, który pomaga pokazać, jak uruchamiać webdriverio multi-remote przy użyciu usług appium i chromedriver z najnowszym WebdriverIO.

- Frameworki
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Funkcje
  - Model [Obiektów Stronowych](pageobjects)
  - Typescript
  - Testy Web + Mobile - Multiremote
  - Natywne aplikacje Android i iOS
  - Appium
  - Chromedriver
  - ESLint
  - Przykłady testów logowania w http://the-internet.herokuapp.com i [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app)