---
id: boilerplates
title: Projekty Gotowe
---

Z biegiem czasu nasza społeczność rozwinęła kilka projektów, które możesz wykorzystać jako inspirację do stworzenia własnego zestawu testów.

# Projekty Gotowe v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Nasz własny szablon dla zestawów testowych Cucumber. Stworzyliśmy ponad 150 predefiniowanych definicji kroków, dzięki czemu możesz od razu zacząć pisać pliki funkcji w swoim projekcie.

- Framework:
    - Cucumber
    - WebdriverIO
- Funkcje:
    - Ponad 150 predefiniowanych kroków, które obejmują prawie wszystko, czego potrzebujesz
    - Integracja z funkcjonalnością Multiremote WebdriverIO
    - Własna aplikacja demonstracyjna

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Projekt szablonowy do uruchamiania testów WebdriverIO z Jasmine, wykorzystujący funkcje Babel i wzorzec obiektów stronowych.

- Frameworki
    - WebdriverIO
    - Jasmine
- Funkcje
    - Wzorzec obiektów stronowych (Page Object Pattern)
    - Integracja z Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Projekt szablonowy do uruchamiania testów WebdriverIO na minimalnej aplikacji Electron.

- Frameworki
    - WebdriverIO
    - Mocha
- Funkcje
    - Mockowanie API Electrona
 
## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Ten projekt szablonowy zawiera testy mobilne WebdriverIO 9 z Cucumber, TypeScript i Appium dla platform Android i iOS, zgodnie ze wzorcem Page Object Model. Oferuje kompleksowe logowanie, raportowanie, gesty mobilne, nawigację z aplikacji do przeglądarki i integrację CI/CD.

- Frameworki:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- Funkcje:
    - Obsługa wielu platform
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - Gesty mobilne
      - Przewijanie
      - Przesuwanie
      - Długie naciśnięcie
      - Ukrywanie klawiatury
    - Nawigacja z aplikacji do przeglądarki
      - Przełączanie kontekstu
      - Obsługa WebView
      - Automatyzacja przeglądarki (Chrome/Safari)
    - Świeży stan aplikacji
      - Automatyczny reset aplikacji między scenariuszami
      - Konfigurowalne zachowanie resetowania (noReset, fullReset)
    - Konfiguracja urządzenia
      - Scentralizowane zarządzanie urządzeniami
      - Łatwe przełączanie platform
    - Przykład struktury katalogów dla JavaScript / TypeScript. Poniżej jest dla wersji JS, wersja TS ma taką samą strukturę.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Automatycznie generuj klasy WebdriverIO Page Object i specyfikacje testów Mocha z plików Gherkin .feature — zmniejszając ręczny wysiłek, poprawiając spójność i przyspieszając automatyzację QA. Ten projekt nie tylko tworzy kod kompatybilny z webdriver.io, ale także ulepsza wszystkie funkcjonalności webdriver.io. Stworzyliśmy dwie wersje: jedną dla użytkowników JavaScript, a drugą dla użytkowników TypeScript. Oba projekty działają w ten sam sposób.

***Jak to działa?***
- Proces obejmuje dwuetapową automatyzację:
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
  - Generuje bazową klasę page.js z współdzielonymi metodami i konfiguracją browser.url().
  - Generuje klasy modelu obiektów stronowych (POM) kompatybilne z WebdriverIO dla każdej funkcji wewnątrz test/pageobjects/.
  - Generuje specyfikacje testów oparte na Mocha.
- Przykład struktury katalogów dla JavaScript / TypeScript. Poniżej jest dla wersji JS, wersja TS ma taką samą strukturę.
```
project-root/
├── features/                   # Pliki .feature w Gherkin (dane wejściowe użytkownika / plik źródłowy)
├── stepMaps/                   # Automatycznie generowane pliki .stepMap.json
├── test/                 
│   ├── pageobjects/            # Automatycznie generowane klasy Page Object Model dla testów WebdriverIO
│   └── specs/                  # Automatycznie generowane specyfikacje testów Mocha
├── src/
│   ├── cli.js                  # Główna logika CLI
│   ├── generateStepsMap.js     # Generator Feature-to-stepMap
│   ├── generateTestsFromMap.js # Generator stepMap-to-page/spec
│   ├── utils.js                # Metody pomocnicze
│   └── config.js               # Ścieżki, selektory zastępcze, aliasy
│   └── __tests__/              # Testy jednostkowe (Vitest)
├── testgen.js                  # Punkt wejścia CLI
│── wdio.config.js              # Konfiguracja WebdriverIO
├── package.json                # Skrypty i zależności
├── selector-aliases.json       # Opcjonalne aliasy selektorów zdefiniowane przez użytkownika zastępujące selektor podstawowy
```
---
# Projekty Gotowe v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 z Cucumber (V8x).
- Funkcje:
    - Model obiektów stronowych używający podejścia opartego na klasach w stylu ES6/ES7 z obsługą TypeScript
    - Przykłady opcji wielu selektorów do zapytań o element z więcej niż jednym selektorem jednocześnie
    - Przykłady wykonania wielu przeglądarek i przeglądarek bez interfejsu użytkownika - Chrome i Firefox
    - Integracja testów w chmurze z BrowserStack, Sauce Labs, LambdaTest
    - Przykłady odczytu/zapisu danych z MS-Excel dla łatwego zarządzania danymi testowymi z zewnętrznych źródeł danych z przykładami
    - Obsługa bazy danych dla dowolnego RDBMS (Oracle, MySql, TeraData, Vertica itp.), wykonywanie dowolnych zapytań / pobieranie zestawów wyników itp. z przykładami dla testów E2E
    - Wiele raportów (Spec, Xunit/Junit, Allure, JSON) oraz hosting raportów Allure i Xunit/Junit na serwerze WWW.
    - Przykłady z aplikacją demonstracyjną https://search.yahoo.com/ i http://the-internet.herokuapp.com.
    - Pliki `.config` dla BrowserStack, Sauce Labs, LambdaTest i Appium (do odtwarzania na urządzeniach mobilnych). Aby uzyskać jednoklikową konfigurację Appium na lokalnym komputerze dla iOS i Androida, zapoznaj się z [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 z Mocha (V10x).
- Funkcje:
    -  Model obiektów stronowych używający podejścia opartego na klasach w stylu ES6/ES7 z obsługą TypeScript
    -  Przykłady z aplikacją demonstracyjną https://search.yahoo.com i http://the-internet.herokuapp.com
    -  Przykłady wykonania wielu przeglądarek i przeglądarek bez interfejsu użytkownika - Chrome i Firefox
    -  Integracja testów w chmurze z BrowserStack, Sauce Labs, LambdaTest
    -  Wiele raportów (Spec, Xunit/Junit, Allure, JSON) oraz hosting raportów Allure i Xunit/Junit na serwerze WWW.
    -  Przykłady odczytu/zapisu danych z MS-Excel dla łatwego zarządzania danymi testowymi z zewnętrznych źródeł danych z przykładami
    -  Przykłady połączenia z bazą danych do dowolnego RDBMS (Oracle, MySql, TeraData, Vertica itp.), wykonywania dowolnych zapytań / pobierania zestawów wyników itp. z przykładami dla testów E2E
    -  Pliki `.config` dla BrowserStack, Sauce Labs, LambdaTest i Appium (do odtwarzania na urządzeniach mobilnych). Aby uzyskać jednoklikową konfigurację Appium na lokalnym komputerze dla iOS i Androida, zapoznaj się z [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 z Jasmine (V4x).
- Funkcje:
    -  Model obiektów stronowych używający podejścia opartego na klasach w stylu ES6/ES7 z obsługą TypeScript
    -  Przykłady z aplikacją demonstracyjną https://search.yahoo.com i http://the-internet.herokuapp.com
    -  Przykłady wykonania wielu przeglądarek i przeglądarek bez interfejsu użytkownika - Chrome i Firefox
    -  Integracja testów w chmurze z BrowserStack, Sauce Labs, LambdaTest
    -  Wiele raportów (Spec, Xunit/Junit, Allure, JSON) oraz hosting raportów Allure i Xunit/Junit na serwerze WWW.
    -  Przykłady odczytu/zapisu danych z MS-Excel dla łatwego zarządzania danymi testowymi z zewnętrznych źródeł danych z przykładami
    -  Przykłady połączenia z bazą danych do dowolnego RDBMS (Oracle, MySql, TeraData, Vertica itp.), wykonywania dowolnych zapytań / pobierania zestawów wyników itp. z przykładami dla testów E2E
    -  Pliki `.config` dla BrowserStack, Sauce Labs, LambdaTest i Appium (do odtwarzania na urządzeniach mobilnych). Aby uzyskać jednoklikową konfigurację Appium na lokalnym komputerze dla iOS i Androida, zapoznaj się z [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Ten projekt szablonowy zawiera testy WebdriverIO 8 z cucumber i typescript, zgodnie ze wzorcem obiektów stronowych.

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
    - Równoległe wykonywanie testów na różnych przeglądarkach
    - Appium
    - Integracja testów w chmurze z BrowserStack i Sauce Labs
    - Usługa Docker
    - Usługa udostępniania danych
    - Oddzielne pliki konfiguracyjne dla każdej usługi
    - Zarządzanie danymi testowymi i odczyt według typu użytkownika
    - Raportowanie
      - Dot
      - Spec
      - Wiele raportów html Cucumber ze zrzutami ekranu przy niepowodzeniu
    - Potoki Gitlab dla repozytorium Gitlab
    - Akcje GitHub dla repozytorium GitHub
    - Docker compose do konfiguracji docker hub
    - Testy dostępności za pomocą AXE
    - Testy wizualne za pomocą Applitools
    - Mechanizm logowania


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworki
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funkcje
    - Zawiera przykładowy scenariusz testowy w cucumber
    - Zintegrowane raporty html cucumber z osadzonymi filmami przy niepowodzeniach
    - Zintegrowane usługi Lambdatest i CircleCI
    - Zintegrowane testy wizualne, testy dostępności i testowanie API
    - Zintegrowana funkcjonalność e-mail
    - Zintegrowany bucket s3 do przechowywania i pobierania raportów testowych

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Projekt szablonowy [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) pomoże Ci rozpocząć testowanie akceptacyjne aplikacji internetowych przy użyciu najnowszego WebdriverIO, Mocha i Serenity/JS.

- Frameworki
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Raportowanie Serenity BDD

- Funkcje
    - [Wzorzec Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatyczne zrzuty ekranu przy niepowodzeniu testu, osadzone w raportach
    - Konfiguracja ciągłej integracji (CI) przy użyciu [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Przykładowe raporty Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) opublikowane na GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Projekt szablonowy [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) pomoże Ci rozpocząć testowanie akceptacyjne aplikacji internetowych przy użyciu najnowszego WebdriverIO, Cucumber i Serenity/JS.

- Frameworki
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Raportowanie Serenity BDD

- Funkcje
    - [Wzorzec Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatyczne zrzuty ekranu przy niepowodzeniu testu, osadzone w raportach
    - Konfiguracja ciągłej integracji (CI) przy użyciu [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Przykładowe raporty Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) opublikowane na GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Projekt szablonowy do uruchamiania testów WebdriverIO w chmurze Headspin (https://www.headspin.io/) przy użyciu funkcji Cucumber i wzorca obiektów stronowych.
- Frameworki
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funkcje
    - Integracja z chmurą [Headspin](https://www.headspin.io/)
    - Obsługuje model obiektów stronowych
    - Zawiera przykładowe scenariusze napisane w deklaratywnym stylu BDD
    - Zintegrowane raporty html cucumber

# Projekty Gotowe v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Projekt szablonowy do uruchamiania testów Appium z WebdriverIO dla:

- Aplikacji natywnych iOS/Android
- Aplikacji hybrydowych iOS/Android
- Przeglądarek Android Chrome i iOS Safari

Ten boilerplate zawiera:

- Framework: Mocha
- Funkcje:
    - Konfiguracje dla:
        - Aplikacji iOS i Android
        - Przeglądarek iOS i Android
    - Pomocniki dla:
        - WebView
        - Gestów
        - Natywnych alertów
        - Selektorów
     - Przykłady testów dla:
        - WebView
        - Logowania
        - Formularzy
        - Przesuwania
        - Przeglądarek

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Projekt PoC dla testów ATDD WEB z Mocha, WebdriverIO v6 z PageObject

- Frameworki
  - WebdriverIO (v7)
  - Mocha
- Funkcje
  - Model [Page Object](pageobjects)
  - Integracja z Sauce Labs z [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
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
    -   Przykład GitHub Actions
    -   Raport Allure (zrzuty ekranu przy niepowodzeniu)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Projekt szablonowy do uruchamiania testów **WebdriverIO v7** dla następujących celów:

[Skrypty WDIO 7 z TypeScript w frameworku Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Skrypty WDIO 7 z TypeScript w frameworku Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Uruchamianie skryptu WDIO 7 w Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Logi sieciowe](https://github.com/17thSep/MonitorNetworkLogs/)

Projekt szablonowy dla:

- Przechwytywania logów sieciowych
- Przechwytywania wszystkich wywołań GET/POST lub określonego API REST
- Sprawdzania parametrów żądania
- Sprawdzania parametrów odpowiedzi
- Przechowywania wszystkich odpowiedzi w osobnym pliku

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Projekt szablonowy do uruchamiania testów appium dla natywnych aplikacji i przeglądarek mobilnych przy użyciu cucumber v7 i wdio v7 ze wzorcem obiektów stronowych.

- Frameworki
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Funkcje
    - Natywne aplikacje Android i iOS
    - Przeglądarka Android Chrome
    - Przeglądarka iOS Safari
    - Model obiektów stronowych
    - Zawiera przykładowe scenariusze testowe w cucumber
    - Zintegrowany z wieloma raportami html cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Jest to projekt szablonowy, który pomoże Ci pokazać, jak możesz uruchamiać testy webdriverio z aplikacji webowych przy użyciu najnowszego WebdriverIO i frameworka Cucumber. Ten projekt ma na celu działanie jako bazowy obraz, którego możesz użyć do zrozumienia, jak uruchamiać testy WebdriverIO w Dockerze

Ten projekt zawiera:

- DockerFile
- Projekt Cucumber

Więcej informacji: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Jest to projekt szablonowy, który pomoże Ci pokazać, jak możesz uruchamiać testy electronJS przy użyciu WebdriverIO. Ten projekt ma na celu działanie jako bazowy obraz, którego możesz użyć do zrozumienia, jak uruchamiać testy WebdriverIO dla electronJS.

Ten projekt zawiera:

- Przykładową aplikację electronjs
- Przykładowe skrypty testowe cucumber

Więcej informacji: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Jest to projekt szablonowy, który pomoże Ci pokazać, jak możesz zautomatyzować aplikacje Windows przy użyciu winappdriver i WebdriverIO. Ten projekt ma na celu działanie jako bazowy obraz, którego możesz użyć do zrozumienia, jak uruchamiać testy windappdriver i WebdriverIO.

Więcej informacji: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Jest to projekt szablonowy, który pomoże Ci pokazać, jak możesz uruchamiać funkcję multiremote webdriverio z najnowszym WebdriverIO i frameworkiem Jasmine. Ten projekt ma na celu działanie jako bazowy obraz, którego możesz użyć do zrozumienia, jak uruchamiać testy WebdriverIO w Dockerze

Ten projekt używa:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Projekt szablonowy do uruchamiania testów appium na rzeczywistych urządzeniach Roku przy użyciu mocha ze wzorcem obiektów stronowych.

- Frameworki
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - Raportowanie Allure

- Funkcje
    - Model obiektów stronowych
    - Typescript
    - Zrzut ekranu przy niepowodzeniu
    - Przykładowe testy przy użyciu przykładowego kanału Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Projekt PoC dla testów E2E Multiremote Cucumber, a także testów Mocha opartych na danych

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Funkcje:
    - Testy E2E oparte na Cucumber
    - Testy oparte na danych w Mocha
    - Testy tylko dla Webu - zarówno lokalnie, jak i na platformach chmurowych
    - Testy tylko dla Mobile - lokalne, a także zdalne emulatory w chmurze (lub urządzenia)
    - Testy Web + Mobile - Multiremote - lokalne, a także platformy chmurowe
    - Zintegrowane wiele raportów, w tym Allure
    - Dane testowe (JSON / XLSX) obsługiwane globalnie, aby zapisać dane (utworzone na bieżąco) do pliku po wykonaniu testu
    - Przepływ pracy GitHub do uruchamiania testów i przesyłania raportu allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

To jest projekt szablonowy, który pomoże pokazać, jak uruchamiać webdriverio multi-remote za pomocą usługi appium i chromedriver z najnowszym WebdriverIO.

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
  - Przykłady testów logowania na http://the-internet.herokuapp.com i [aplikacji demonstracyjnej WebdriverIO](https://github.com/webdriverio/native-demo-app)