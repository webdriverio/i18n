---
id: boilerplates
title: Projekty szablonowe
---

Z biegiem czasu nasza społeczność opracowała kilka projektów, które możesz wykorzystać jako inspirację do ustawienia własnego zestawu testów.

# Projekty szablonowe v9

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
Projekt szablonowy do uruchamiania testów WebdriverIO z Jasmine wykorzystując funkcje Babel i wzorzec obiektów stron.

- Frameworki
    - WebdriverIO
    - Jasmine
- Funkcje
    - Wzorzec obiektów stron
    - Integracja z Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Projekt szablonowy do uruchamiania testów WebdriverIO na minimalnej aplikacji Electron.

- Frameworki
    - WebdriverIO
    - Mocha
- Funkcje
    - Mockowanie API Electron

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Automatycznie generuj klasy WebdriverIO Page Object i specyfikacje testów Mocha z plików .feature Gherkin — zmniejszając ręczny wysiłek, poprawiając spójność i przyspieszając automatyzację QA. Ten projekt nie tylko produkuje kod kompatybilny z webdriver.io, ale także rozszerza wszystkie funkcjonalności webdriver.io. Stworzyliśmy dwie wersje, jedną dla użytkowników JavaScript i drugą dla użytkowników TypeScript. Jednak oba projekty działają w ten sam sposób.

***Jak to działa?***
- Proces działa w dwóch krokach automatyzacji:
- Krok 1: Gherkin do stepMap (Generowanie plików stepMap.json)
  - Generowanie plików stepMap.json:
    - Parsuje pliki .feature napisane w składni Gherkin.
    - Wyodrębnia scenariusze i kroki.
    - Tworzy ustrukturyzowany plik .stepMap.json zawierający:
      - akcję do wykonania (np. click, setText, assertVisible)
      - selectorName dla logicznego mapowania
      - selector dla elementu DOM
      - notatkę dla wartości lub asercji
- Krok 2: stepMap do kodu (Generowanie kodu WebdriverIO).
  Używa stepMap.json do generowania:
  - Generuje bazową klasę page.js z wspólnymi metodami i konfiguracją browser.url().
  - Generuje kompatybilne z WebdriverIO klasy Page Object Model (POM) na funkcję wewnątrz test/pageobjects/.
  - Generuje testy bazujące na Mocha.
- Przykład struktury katalogów dla JavaScript / TypeScript. Poniżej dla wersji JS, wersja TS ma taką samą strukturę.
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
# Projekty szablonowe v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 z Cucumber (V8x).
- Funkcje:
    - Model obiektów stron używa podejścia opartego na klasach ES6/ES7 i wsparcia TypeScript
    - Przykłady opcji wielu selektorów do zapytania elementu z więcej niż jednym selektorem naraz
    - Przykłady wykonania wielu przeglądarek i przeglądarek bez interfejsu graficznego - Chrome i Firefox
    - Integracja testów w chmurze z BrowserStack, Sauce Labs, LambdaTest
    - Przykłady odczytu/zapisu danych z MS-Excel dla łatwego zarządzania danymi testowymi z zewnętrznych źródeł danych z przykładami
    - Wsparcie bazy danych dla dowolnego RDBMS (Oracle, MySql, TeraData, Vertica itp.), wykonywanie dowolnych zapytań / pobieranie zestawów wyników itp. z przykładami dla testów E2E
    - Wiele raportów (Spec, Xunit/Junit, Allure, JSON) i hostowanie raportów Allure oraz Xunit/Junit na WebServerze.
    - Przykłady z aplikacją demo https://search.yahoo.com/ i http://the-internet.herokuapp.com.
    - Pliki `.config` specyficzne dla BrowserStack, Sauce Labs, LambdaTest i Appium (do odtwarzania na urządzeniach mobilnych). W celu jednorazowej konfiguracji Appium na lokalnej maszynie dla iOS i Android, zapoznaj się z [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 z Mocha (V10x).
- Funkcje:
    -  Model obiektów stron używa podejścia opartego na klasach ES6/ES7 i wsparcia TypeScript
    -  Przykłady z aplikacją demo https://search.yahoo.com i http://the-internet.herokuapp.com
    -  Przykłady wykonania wielu przeglądarek i przeglądarek bez interfejsu graficznego - Chrome i Firefox
    -  Integracja testów w chmurze z BrowserStack, Sauce Labs, LambdaTest
    -  Wiele raportów (Spec, Xunit/Junit, Allure, JSON) i hostowanie raportów Allure oraz Xunit/Junit na WebServerze.
    -  Przykłady odczytu/zapisu danych z MS-Excel dla łatwego zarządzania danymi testowymi z zewnętrznych źródeł danych z przykładami
    -  Przykłady połączenia z bazą danych do dowolnego RDBMS (Oracle, MySql, TeraData, Vertica itp.), wykonywania dowolnych zapytań / pobierania zestawów wyników itp. z przykładami dla testów E2E
    -  Pliki `.config` specyficzne dla BrowserStack, Sauce Labs, LambdaTest i Appium (do odtwarzania na urządzeniach mobilnych). W celu jednorazowej konfiguracji Appium na lokalnej maszynie dla iOS i Android, zapoznaj się z [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 z Jasmine (V4x).
- Funkcje:
    -  Model obiektów stron używa podejścia opartego na klasach ES6/ES7 i wsparcia TypeScript
    -  Przykłady z aplikacją demo https://search.yahoo.com i http://the-internet.herokuapp.com
    -  Przykłady wykonania wielu przeglądarek i przeglądarek bez interfejsu graficznego - Chrome i Firefox
    -  Integracja testów w chmurze z BrowserStack, Sauce Labs, LambdaTest
    -  Wiele raportów (Spec, Xunit/Junit, Allure, JSON) i hostowanie raportów Allure oraz Xunit/Junit na WebServerze.
    -  Przykłady odczytu/zapisu danych z MS-Excel dla łatwego zarządzania danymi testowymi z zewnętrznych źródeł danych z przykładami
    -  Przykłady połączenia z bazą danych do dowolnego RDBMS (Oracle, MySql, TeraData, Vertica itp.), wykonywania dowolnych zapytań / pobierania zestawów wyników itp. z przykładami dla testów E2E
    -  Pliki `.config` specyficzne dla BrowserStack, Sauce Labs, LambdaTest i Appium (do odtwarzania na urządzeniach mobilnych). W celu jednorazowej konfiguracji Appium na lokalnej maszynie dla iOS i Android, zapoznaj się z [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Ten projekt szablonowy zawiera testy WebdriverIO 8 z cucumber i typescript, wykorzystując wzorzec obiektów stron.

- Frameworki:
    - WebdriverIO v8
    - Cucumber v8

- Funkcje:
    - Typescript v5
    - Wzorzec obiektów stron
    - Prettier
    - Wsparcie dla wielu przeglądarek
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Równoległe wykonanie na różnych przeglądarkach
    - Appium
    - Integracja testów w chmurze z BrowserStack i Sauce Labs
    - Usługa Docker
    - Usługa udostępniania danych
    - Oddzielne pliki konfiguracyjne dla każdej usługi
    - Zarządzanie danymi testowymi i odczyt według typu użytkownika
    - Raportowanie
      - Dot
      - Spec
      - Wiele raportów html cucumber z zrzutami ekranu niepowodzeń
    - Pipelines Gitlab dla repozytorium Gitlab
    - Github actions dla repozytorium Github
    - Docker compose do konfiguracji docker hub
    - Testy dostępności przy użyciu AXE
    - Testy wizualne przy użyciu Applitools
    - Mechanizm logowania


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworki
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funkcje
    - Zawiera przykładowy scenariusz testowy w cucumber
    - Zintegrowane raporty html cucumber z osadzonymi filmami przy niepowodzeniach
    - Zintegrowane usługi Lambdatest i CircleCI
    - Zintegrowane testy wizualne, dostępności i API
    - Zintegrowana funkcjonalność Email
    - Zintegrowany bucket s3 do przechowywania i pobierania raportów testowych

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Szablon projektu [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io), który pomoże Ci rozpocząć testy akceptacyjne aplikacji internetowych przy użyciu najnowszych WebdriverIO, Mocha i Serenity/JS.

- Frameworki
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Raportowanie Serenity BDD

- Funkcje
    - [Wzorzec Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatyczne zrzuty ekranu przy niepowodzeniu testu, osadzone w raportach
    - Konfiguracja Continuous Integration (CI) przy użyciu [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo raportów Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publikowane na GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Szablon projektu [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io), który pomoże Ci rozpocząć testy akceptacyjne aplikacji internetowych przy użyciu najnowszych WebdriverIO, Cucumber i Serenity/JS.

- Frameworki
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Raportowanie Serenity BDD

- Funkcje
    - [Wzorzec Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatyczne zrzuty ekranu przy niepowodzeniu testu, osadzone w raportach
    - Konfiguracja Continuous Integration (CI) przy użyciu [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo raportów Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) publikowane na GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Projekt szablonowy do uruchamiania testów WebdriverIO w chmurze Headspin (https://www.headspin.io/) przy użyciu funkcji Cucumber i wzorca obiektów stron.
- Frameworki
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funkcje
    - Integracja z chmurą [Headspin](https://www.headspin.io/)
    - Obsługuje model obiektów stron
    - Zawiera przykładowe scenariusze napisane w deklaratywnym stylu BDD
    - Zintegrowane raporty html cucumber

# Projekty szablonowe v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Projekt szablonowy do uruchamiania testów Appium z WebdriverIO dla:

- Natywnych aplikacji iOS/Android
- Aplikacji hybrydowych iOS/Android
- Przeglądarek Android Chrome i iOS Safari

Ten szablon zawiera następujące elementy:

- Framework: Mocha
- Funkcje:
    - Konfiguracje dla:
        - Aplikacji iOS i Android
        - Przeglądarek iOS i Android
    - Pomocniki dla:
        - WebView
        - Gestów
        - Natywnych alertów
        - Pickerów
     - Przykłady testów dla:
        - WebView
        - Logowania
        - Formularzy
        - Przewijania
        - Przeglądarek

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Testy ATDD WEB z Mocha, WebdriverIO v6 z PageObject

- Frameworki
  - WebdriverIO (v7)
  - Mocha
- Funkcje
  - Model [obiektów stron](pageobjects)
  - Integracja z Sauce Labs przy użyciu [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
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
    -   Wzorzec obiektów stron
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) i [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Przykład Github Actions
    -   Raport Allure (zrzuty ekranu przy niepowodzeniu)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Projekt szablonowy do uruchamiania testów **WebdriverIO v7** dla następujących:

[Skrypty WDIO 7 z TypeScript w frameworku Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Skrypty WDIO 7 z TypeScript w frameworku Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Uruchamianie skryptów WDIO 7 w Dockerze](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Logi sieciowe](https://github.com/17thSep/MonitorNetworkLogs/)

Projekt szablonowy dla:

- Przechwytywania logów sieciowych
- Przechwytywania wszystkich wywołań GET/POST lub określonego API REST
- Asercji parametrów żądania
- Asercji parametrów odpowiedzi
- Przechowywania wszystkich odpowiedzi w osobnym pliku

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Projekt szablonowy do uruchamiania testów appium dla natywnych aplikacji i przeglądarek mobilnych przy użyciu cucumber v7 i wdio v7 z wzorcem obiektów stron.

- Frameworki
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Funkcje
    - Natywne aplikacje Android i iOS
    - Przeglądarka Android Chrome
    - Przeglądarka iOS Safari
    - Model obiektów stron
    - Zawiera przykładowe scenariusze testowe w cucumber
    - Zintegrowany z wieloma raportami html cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Jest to projekt szablonowy, który ma pomóc pokazać, jak uruchamiać testy webdriverio z aplikacji internetowych przy użyciu najnowszego WebdriverIO i frameworka Cucumber. Ten projekt ma służyć jako bazowy obraz, którego możesz użyć do zrozumienia, jak uruchamiać testy WebdriverIO w dockerze

Ten projekt zawiera:

- DockerFile
- Projekt cucumber

Czytaj więcej na: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Jest to projekt szablonowy, który ma pomóc pokazać, jak uruchamiać testy electronJS przy użyciu WebdriverIO. Ten projekt ma służyć jako bazowy obraz, którego możesz użyć do zrozumienia, jak uruchamiać testy WebdriverIO electronJS.

Ten projekt zawiera:

- Przykładową aplikację electronjs
- Przykładowe skrypty testowe cucumber

Czytaj więcej na: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Jest to projekt szablonowy, który ma pomóc pokazać, jak automatyzować aplikacje Windows przy użyciu winappdriver i WebdriverIO. Ten projekt ma służyć jako bazowy obraz, którego możesz użyć do zrozumienia, jak uruchamiać testy windappdriver i WebdriverIO.

Czytaj więcej na: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Jest to projekt szablonowy, który ma pomóc pokazać, jak uruchamiać funkcję multiremote webdriverio z najnowszym WebdriverIO i frameworkiem Jasmine. Ten projekt ma służyć jako bazowy obraz, którego możesz użyć do zrozumienia, jak uruchamiać testy WebdriverIO w dockerze

Ten projekt używa:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Szablon projektu do uruchamiania testów appium na prawdziwych urządzeniach Roku przy użyciu mocha z wzorcem obiektów stron.

- Frameworki
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Raportowanie Allure

- Funkcje
    - Model obiektów stron
    - Typescript
    - Zrzut ekranu przy niepowodzeniu
    - Przykładowe testy wykorzystujące przykładowy kanał Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Projekt PoC dla testów E2E Multiremote Cucumber, a także testów Mocha opartych na danych

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Funkcje:
    - Testy E2E oparte na Cucumber
    - Testy Mocha oparte na danych
    - Testy tylko internetowe - zarówno lokalnie, jak i na platformach chmurowych
    - Testy tylko mobilne - lokalne oraz zdalne emulatory w chmurze (lub urządzenia)
    - Testy Web + Mobile - Multiremote - zarówno lokalnie, jak i na platformach chmurowych
    - Zintegrowane wiele raportów, w tym Allure
    - Dane testowe (JSON / XLSX) obsługiwane globalnie, aby zapisać dane (tworzone na bieżąco) do pliku po wykonaniu testu
    - Workflow GitHub do uruchamiania testów i przesyłania raportu allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Jest to projekt szablonowy, który ma pomóc pokazać, jak uruchamiać webdriverio multi-remote przy użyciu usługi appium i chromedriver z najnowszym WebdriverIO.

- Frameworki
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Funkcje
  - Model [obiektów stron](pageobjects)
  - Typescript
  - Testy Web + Mobile - Multiremote
  - Natywne aplikacje Android i iOS
  - Appium
  - Chromedriver
  - ESLint
  - Przykłady testów logowania w http://the-internet.herokuapp.com i [natywnej aplikacji demonstracyjnej WebdriverIO](https://github.com/webdriverio/native-demo-app)