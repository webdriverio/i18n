---
id: boilerplates
title: Projekty typu Boilerplate
---

Z biegiem czasu nasza społeczność opracowała kilka projektów, które możesz wykorzystać jako inspirację do skonfigurowania własnego zestawu testów.

# Projekty Boilerplate dla v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Nasz własny boilerplate dla zestawów testów Cucumber. Utworzyliśmy ponad 150 predefiniowanych definicji kroków, dzięki czemu możesz od razu zacząć pisać pliki funkcji w swoim projekcie.

- Framework:
    - Cucumber
    - WebdriverIO
- Funkcje:
    - Ponad 150 predefiniowanych kroków, które obejmują prawie wszystko, czego potrzebujesz
    - Integruje funkcjonalność Multiremote WebdriverIO
    - Własna aplikacja demonstracyjna

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Projekt typu boilerplate do uruchamiania testów WebdriverIO z Jasmine, wykorzystujący funkcje Babel i wzorzec obiektów stron.

- Frameworki
    - WebdriverIO
    - Jasmine
- Funkcje
    - Wzorzec obiektów stron (Page Object Pattern)
    - Integracja z Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Projekt typu boilerplate do uruchamiania testów WebdriverIO na minimalnej aplikacji Electron.

- Frameworki
    - WebdriverIO
    - Mocha
- Funkcje
    - Mockowanie API Electron

## [amiya-pattnaik/gherkin-to-webdriverIO-test-generator](https://github.com/amiya-pattnaik/gherkin-to-webdriverIO-test-generator)
Automatycznie generuj klasy obiektów stron WebdriverIO i specyfikacje testów Mocha z plików .feature w Gherkin — redukując ręczny wysiłek, poprawiając spójność i przyspieszając automatyzację QA. Ten projekt nie tylko tworzy kod kompatybilny z webdriver.io, ale także rozszerza wszystkie jego funkcjonalności.

***Jak to działa?***
- Proces przebiega w dwóch krokach automatyzacji:
- Krok 1: Gherkin do stepMap (Generowanie plików stepMap.json)
  - Generowanie plików stepMap.json:
    - Analizuje pliki .feature napisane w składni Gherkin.
    - Wyodrębnia scenariusze i kroki.
    - Tworzy ustrukturyzowany plik .stepMap.json zawierający:
      - akcję do wykonania (np. click, setText, assertVisible)
      - selectorName do logicznego mapowania
      - selector dla elementu DOM
      - note dla wartości lub asercji
- Krok 2: stepMap do kodu (Generowanie kodu WebdriverIO).
  Używa stepMap.json do generowania:
  - Generowanie bazowej klasy page.js z wspólnymi metodami i konfiguracją browser.url().
  - Generowanie klas modelu obiektów stron (POM) kompatybilnych z WebdriverIO dla każdej funkcji w test/pageobjects/.
  - Generowanie specyfikacji testów opartych na Mocha.
- Struktura katalogów
```
project-root/
├── features/               # Wejściowe pliki funkcji Gherkin
├── stepMaps/               # Wygenerowane mapy kroków (JSON)
├── test/
│   ├── pageobjects/        # Wygenerowana bazowa klasa Page, klasy obiektów stron
│   └── specs/              # Wygenerowane specyfikacje testów
├── generateStepMap.js      # Skrypt generatora StepMap
├── generateTestsFromMap.js # Generator obiektów stron + specyfikacji testów
├── package.json
├── README.md
└── wdio.conf.js
```
---
# Projekty Boilerplate dla v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 z Cucumber (V8x).
- Funkcje:
    - Model obiektów stron używany z podejściem opartym na klasach w stylu ES6/ES7 i wsparciem dla TypeScript
    - Przykłady opcji wielu selektorów do zapytań elementów z więcej niż jednym selektorem jednocześnie
    - Przykłady wykonania wielu przeglądarek i przeglądarek bezinterfejsowych - Chrome i Firefox
    - Integracja z testowaniem w chmurze z BrowserStack, Sauce Labs, LambdaTest
    - Przykłady odczytu/zapisu danych z MS-Excel dla łatwego zarządzania danymi testowymi z zewnętrznych źródeł danych z przykładami
    - Wsparcie bazy danych dla dowolnego RDBMS (Oracle, MySql, TeraData, Vertica itp.), wykonywanie dowolnych zapytań / pobieranie zestawów wyników itp. z przykładami dla testów E2E
    - Wielokrotne raportowanie (Spec, Xunit/Junit, Allure, JSON) i hostowanie raportów Allure i Xunit/Junit na WebServer.
    - Przykłady z demo aplikacjami https://search.yahoo.com/ i http://the-internet.herokuapp.com.
    - Specyficzne pliki `.config` dla BrowserStack, Sauce Labs, LambdaTest i Appium (do odtwarzania na urządzeniach mobilnych). Dla jednego kliknięcia konfiguracji Appium na lokalnej maszynie dla iOS i Android, zobacz [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 z Mocha (V10x).
- Funkcje:
    -  Model obiektów stron używany z podejściem opartym na klasach w stylu ES6/ES7 i wsparciem dla TypeScript
    -  Przykłady z demo aplikacjami https://search.yahoo.com i http://the-internet.herokuapp.com
    -  Przykłady wykonania wielu przeglądarek i przeglądarek bezinterfejsowych - Chrome i Firefox
    -  Integracja z testowaniem w chmurze z BrowserStack, Sauce Labs, LambdaTest
    -  Wielokrotne raportowanie (Spec, Xunit/Junit, Allure, JSON) i hostowanie raportów Allure i Xunit/Junit na WebServer.
    -  Przykłady odczytu/zapisu danych z MS-Excel dla łatwego zarządzania danymi testowymi z zewnętrznych źródeł danych z przykładami
    -  Przykłady połączenia do dowolnego RDBMS (Oracle, MySql, TeraData, Vertica itp.), wykonywanie dowolnych zapytań / pobieranie zestawów wyników itp. z przykładami dla testów E2E
    -  Specyficzne pliki `.config` dla BrowserStack, Sauce Labs, LambdaTest i Appium (do odtwarzania na urządzeniach mobilnych). Dla jednego kliknięcia konfiguracji Appium na lokalnej maszynie dla iOS i Android, zobacz [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 z Jasmine (V4x).
- Funkcje:
    -  Model obiektów stron używany z podejściem opartym na klasach w stylu ES6/ES7 i wsparciem dla TypeScript
    -  Przykłady z demo aplikacjami https://search.yahoo.com i http://the-internet.herokuapp.com
    -  Przykłady wykonania wielu przeglądarek i przeglądarek bezinterfejsowych - Chrome i Firefox
    -  Integracja z testowaniem w chmurze z BrowserStack, Sauce Labs, LambdaTest
    -  Wielokrotne raportowanie (Spec, Xunit/Junit, Allure, JSON) i hostowanie raportów Allure i Xunit/Junit na WebServer.
    -  Przykłady odczytu/zapisu danych z MS-Excel dla łatwego zarządzania danymi testowymi z zewnętrznych źródeł danych z przykładami
    -  Przykłady połączenia do dowolnego RDBMS (Oracle, MySql, TeraData, Vertica itp.), wykonywanie dowolnych zapytań / pobieranie zestawów wyników itp. z przykładami dla testów E2E
    -  Specyficzne pliki `.config` dla BrowserStack, Sauce Labs, LambdaTest i Appium (do odtwarzania na urządzeniach mobilnych). Dla jednego kliknięcia konfiguracji Appium na lokalnej maszynie dla iOS i Android, zobacz [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Ten projekt boilerplate zawiera testy WebdriverIO 8 z cucumber i typescript, zgodnie z wzorcem obiektów stron.

- Frameworki:
    - WebdriverIO v8
    - Cucumber v8

- Funkcje:
    - Typescript v5
    - Wzorzec obiektów stron
    - Prettier
    - Obsługa wielu przeglądarek
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Równoległe wykonywanie testów między przeglądarkami
    - Appium
    - Integracja z testowaniem w chmurze z BrowserStack & Sauce Labs
    - Usługa Docker
    - Usługa udostępniania danych
    - Oddzielne pliki konfiguracyjne dla każdej usługi
    - Zarządzanie danymi testowymi i odczyt według typu użytkownika
    - Raportowanie
      - Dot
      - Spec
      - Wielokrotne raporty HTML cucumber ze zrzutami ekranu niepowodzeń
    - Potoki Gitlab dla repozytorium Gitlab
    - Akcje Github dla repozytorium Github
    - Docker compose do konfiguracji centrum Docker
    - Testowanie dostępności za pomocą AXE
    - Testowanie wizualne za pomocą Applitools
    - Mechanizm logowania


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworki
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funkcje
    - Zawiera przykładowy scenariusz testowy w cucumber
    - Zintegrowane raporty HTML cucumber z osadzonymi filmami w przypadku niepowodzeń
    - Zintegrowane usługi Lambdatest i CircleCI
    - Zintegrowane testowanie wizualne, dostępności i API
    - Zintegrowana funkcjonalność e-mail
    - Zintegrowany bucket s3 do przechowywania i pobierania raportów testowych

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Szablon projektu [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io), który pomoże Ci rozpocząć testowanie akceptacyjne aplikacji internetowych przy użyciu najnowszych WebdriverIO, Mocha i Serenity/JS.

- Frameworki
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Raportowanie Serenity BDD

- Funkcje
    - [Wzorzec Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatyczne zrzuty ekranu w przypadku niepowodzenia testu, osadzone w raportach
    - Konfiguracja ciągłej integracji (CI) za pomocą [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo raportów Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) opublikowane na GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Szablon projektu [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io), który pomoże Ci rozpocząć testowanie akceptacyjne aplikacji internetowych przy użyciu najnowszych WebdriverIO, Cucumber i Serenity/JS.

- Frameworki
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Raportowanie Serenity BDD

- Funkcje
    - [Wzorzec Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatyczne zrzuty ekranu w przypadku niepowodzenia testu, osadzone w raportach
    - Konfiguracja ciągłej integracji (CI) za pomocą [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demo raportów Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) opublikowane na GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Projekt typu boilerplate do uruchamiania testów WebdriverIO w chmurze Headspin (https://www.headspin.io/) przy użyciu funkcji Cucumber i wzorca obiektów stron.
- Frameworki
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funkcje
    - Integracja z chmurą [Headspin](https://www.headspin.io/)
    - Wspiera wzorzec obiektów stron
    - Zawiera przykładowe scenariusze napisane w deklaratywnym stylu BDD
    - Zintegrowane raporty HTML cucumber

# Projekty Boilerplate dla v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Projekt typu boilerplate do uruchamiania testów Appium z WebdriverIO dla:

- Natywnych aplikacji iOS/Android
- Aplikacji hybrydowych iOS/Android
- Przeglądarek Android Chrome i iOS Safari

Ten boilerplate zawiera:

- Framework: Mocha
- Funkcje:
    - Konfiguracje dla:
        - Aplikacji iOS i Android
        - Przeglądarek iOS i Android
    - Pomocnicy dla:
        - WebView
        - Gestów
        - Natywnych alertów
        - Pickerów
     - Przykłady testów dla:
        - WebView
        - Logowania
        - Formularzy
        - Przesuwania
        - Przeglądarek

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Testy ATDD WEB z Mocha, WebdriverIO v6 z PageObject

- Frameworki
  - WebdriverIO (v7)
  - Mocha
- Funkcje
  - Model [Page Object](pageobjects)
  - Integracja z Sauce Labs za pomocą [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - Raport Allure
  - Automatyczne przechwytywanie zrzutów ekranu dla nieudanych testów
  - Przykład CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

Projekt typu boilerplate do uruchamiania testów E2E z Mocha.

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
    -   Przykład akcji Github
    -   Raport Allure (zrzuty ekranu w przypadku niepowodzenia)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Projekt typu boilerplate do uruchamiania testów **WebdriverIO v7** dla:

[Skrypty WDIO 7 z TypeScript w frameworku Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Skrypty WDIO 7 z TypeScript w frameworku Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Uruchamianie skryptów WDIO 7 w Dockerze](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Logi sieciowe](https://github.com/17thSep/MonitorNetworkLogs/)

Projekt typu boilerplate do:

- Przechwytywania logów sieciowych
- Przechwytywania wszystkich wywołań GET/POST lub określonego REST API
- Sprawdzania parametrów żądania
- Sprawdzania parametrów odpowiedzi
- Przechowywania wszystkich odpowiedzi w oddzielnym pliku

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Projekt typu boilerplate do uruchamiania testów appium dla natywnych i mobilnych przeglądarek przy użyciu cucumber v7 i wdio v7 z wzorcem obiektów stron.

- Frameworki
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Funkcje
    - Natywne aplikacje Android i iOS
    - Przeglądarka Android Chrome
    - Przeglądarka iOS Safari
    - Wzorzec obiektów stron
    - Zawiera przykładowe scenariusze testowe w cucumber
    - Zintegrowany z wieloma raportami HTML cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

To jest projekt szablonowy, który ma pomóc pokazać, jak możesz uruchamiać testy webdriverio z aplikacji internetowych przy użyciu najnowszego WebdriverIO i frameworka Cucumber. Ten projekt ma służyć jako bazowy obraz, którego można użyć do zrozumienia, jak uruchamiać testy WebdriverIO w dockerze

Ten projekt zawiera:

- DockerFile
- Projekt cucumber

Przeczytaj więcej na: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

To jest projekt szablonowy, który ma pomóc pokazać, jak możesz uruchamiać testy electronJS przy użyciu WebdriverIO. Ten projekt ma służyć jako bazowy obraz, którego można użyć do zrozumienia, jak uruchamiać testy WebdriverIO electronJS.

Ten projekt zawiera:

- Przykładową aplikację electronjs
- Przykładowe skrypty testowe cucumber

Przeczytaj więcej na: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

To jest projekt szablonowy, który ma pomóc pokazać, jak możesz automatyzować aplikacje Windows za pomocą winappdriver i WebdriverIO. Ten projekt ma służyć jako bazowy obraz, którego można użyć do zrozumienia, jak uruchamiać testy winappdriver i WebdriverIO.

Przeczytaj więcej na: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


To jest projekt szablonowy, który ma pomóc pokazać, jak możesz uruchamiać funkcję multiremote webdriverio z najnowszym WebdriverIO i frameworkiem Jasmine. Ten projekt ma służyć jako bazowy obraz, którego można użyć do zrozumienia, jak uruchamiać testy WebdriverIO w dockerze

Ten projekt używa:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Projekt szablonowy do uruchamiania testów appium na rzeczywistych urządzeniach Roku przy użyciu mocha z wzorcem obiektów stron.

- Frameworki
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Raportowanie Allure

- Funkcje
    - Wzorzec obiektów stron
    - Typescript
    - Zrzut ekranu w przypadku niepowodzenia
    - Przykładowe testy wykorzystujące przykładowy kanał Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Projekt PoC dla testów E2E Multiremote Cucumber oraz testów sterowanych danymi Mocha

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Funkcje:
    - Testy E2E oparte na Cucumber
    - Testy sterowane danymi oparte na Mocha
    - Testy tylko dla sieci - zarówno w lokalnych, jak i platformach chmurowych
    - Testy tylko dla urządzeń mobilnych - lokalne oraz zdalne emulatory w chmurze (lub urządzenia)
    - Testy Web + Mobile - Multiremote - zarówno lokalne, jak i platformy chmurowe
    - Zintegrowane różne raporty, w tym Allure
    - Dane testowe (JSON / XLSX) obsługiwane globalnie, aby zapisać dane (tworzone w locie) do pliku po wykonaniu testu
    - Przepływ pracy Github do uruchamiania testów i przesyłania raportu allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

To jest projekt typu boilerplate, który pomaga pokazać, jak uruchamiać webdriverio multi-remote używając usługi appium i chromedriver z najnowszym WebdriverIO.

- Frameworki
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Funkcje
  - Wzorzec [Obiektów Stron](pageobjects)
  - Typescript
  - Testy Web + Mobile - Multiremote
  - Natywne aplikacje Android i iOS
  - Appium
  - Chromedriver
  - ESLint
  - Przykłady testów logowania w http://the-internet.herokuapp.com i [natywnej aplikacji demo WebdriverIO](https://github.com/webdriverio/native-demo-app)