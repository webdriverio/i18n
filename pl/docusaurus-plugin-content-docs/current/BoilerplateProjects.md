---
id: boilerplates
title: Projekty startowe (boilerplate)
description: "Przeglądaj projekty startowe społeczności dla WebdriverIO z konfiguracjami Mocha, Jasmine, Cucumber, Electron i mobilnymi, aby szybko uruchomić własny zestaw testów."
---

Z biegiem czasu nasza społeczność opracowała kilka projektów, które możesz wykorzystać jako inspirację do skonfigurowania własnego zestawu testów.

# Projekty startowe v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

Nasz własny projekt startowy dla zestawów testów Cucumber. Przygotowaliśmy dla Ciebie ponad 150 predefiniowanych definicji kroków, dzięki czemu możesz od razu zacząć pisać pliki feature w swoim projekcie.

- Framework:
    - Cucumber
    - WebdriverIO
- Funkcje:
    - Ponad 150 predefiniowanych kroków, które obejmują niemal wszystko, czego potrzebujesz
    - Integracja z funkcjonalnością multi-remote WebdriverIO
    - Własna aplikacja demonstracyjna

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
Projekt startowy do uruchamiania testów WebdriverIO z Jasmine z wykorzystaniem funkcji Babel i wzorca page objects.

- Frameworki
    - WebdriverIO
    - Jasmine
- Funkcje
    - Wzorzec Page Object
    - Integracja z Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
Projekt startowy do uruchamiania testów WebdriverIO na minimalnej aplikacji Electron.

- Frameworki
    - WebdriverIO
    - Mocha
- Funkcje
    - Mockowanie API Electron

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

Ten projekt startowy zawiera testy mobilne WebdriverIO 9 z Cucumber, TypeScript i Appium dla platform Android i iOS, zgodne ze wzorcem Page Object Model. Oferuje rozbudowane logowanie, raportowanie, gesty mobilne, nawigację z aplikacji do przeglądarki oraz integrację CI/CD.

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
      - Przesuwanie (swipe)
      - Długie naciśnięcie
      - Ukrywanie klawiatury
    - Nawigacja z aplikacji do przeglądarki
      - Przełączanie kontekstu
      - Obsługa WebView
      - Automatyzacja przeglądarki (Chrome/Safari)
    - Świeży stan aplikacji
      - Automatyczne resetowanie aplikacji między scenariuszami
      - Konfigurowalne zachowanie resetu (noReset, fullReset)
    - Konfiguracja urządzeń
      - Scentralizowane zarządzanie urządzeniami
      - Łatwe przełączanie platform
    - Przykład struktury katalogów dla JavaScript / TypeScript. Poniżej znajduje się wersja JS, wersja TS ma taką samą strukturę.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
Automatycznie generuj klasy Page Object WebdriverIO i specyfikacje testów Mocha z plików .feature w Gherkin — zmniejszając nakład pracy ręcznej, poprawiając spójność i przyspieszając automatyzację QA. Ten projekt nie tylko generuje kod kompatybilny z webdriver.io, ale także rozszerza wszystkie funkcjonalności webdriver.io. Stworzyliśmy dwie wersje: jedną dla użytkowników JavaScript, a drugą dla użytkowników TypeScript. Oba projekty działają jednak w ten sam sposób.

***Jak to działa?***
- Proces składa się z dwuetapowej automatyzacji:
- Krok 1: Gherkin do stepMap (generowanie plików stepMap.json)
  - Generowanie plików stepMap.json:
    - Parsuje pliki .feature napisane w składni Gherkin.
    - Wyodrębnia scenariusze i kroki.
    - Tworzy ustrukturyzowany plik .stepMap.json zawierający:
      - action do wykonania (np. click, setText, assertVisible)
      - selectorName do mapowania logicznego
      - selector dla elementu DOM
      - note dla wartości lub asercji
- Krok 2: stepMap do kodu (generowanie kodu WebdriverIO).
  Wykorzystuje stepMap.json do:
  - Wygenerowania bazowej klasy page.js ze współdzielonymi metodami i konfiguracją browser.url().
  - Wygenerowania kompatybilnych z WebdriverIO klas Page Object Model (POM) dla każdego feature w katalogu test/pageobjects/.
  - Wygenerowania specyfikacji testów opartych na Mocha.
- Przykład struktury katalogów dla JavaScript / TypeScript. Poniżej znajduje się wersja JS, wersja TS ma taką samą strukturę.
```
project-root/
├── features/                   # Pliki .feature w Gherkin (dane wejściowe użytkownika / plik źródłowy)
├── stepMaps/                   # Automatycznie generowane pliki .stepMap.json
├── test/
│   ├── pageobjects/            # Automatycznie generowane klasy Page Object Model testów WebdriverIO
│   └── specs/                  # Automatycznie generowane specyfikacje testów Mocha
├── src/
│   ├── cli.js                  # Główna logika CLI
│   ├── generateStepsMap.js     # Generator feature-do-stepMap
│   ├── generateTestsFromMap.js # Generator stepMap-do-page/spec
│   ├── utils.js                # Metody pomocnicze
│   └── config.js               # Ścieżki, selektory zapasowe, aliasy
│   └── __tests__/              # Testy jednostkowe (Vitest)
├── testgen.js                  # Punkt wejścia CLI
│── wdio.config.js              # Konfiguracja WebdriverIO
├── package.json                # Skrypty i zależności
├── selector-aliases.json       # Opcjonalne selektory zdefiniowane przez użytkownika nadpisujące selektor główny
```
---
# Projekty startowe v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- Framework: WDIO-V8 z Cucumber (V8x).
- Funkcje:
    - Model Page Objects oparty na klasach w stylu ES6 / ES7 oraz obsługa TypeScript
    - Przykłady opcji wielu selektorów do wyszukiwania elementu za pomocą więcej niż jednego selektora jednocześnie
    - Przykłady uruchamiania w wielu przeglądarkach i w trybie headless z użyciem Chrome i Firefox
    - Integracja testowania w chmurze z BrowserStack, Sauce Labs, TestMu AI (dawniej LambdaTest)
    - Przykłady odczytu/zapisu danych z MS-Excel dla łatwego zarządzania danymi testowymi z zewnętrznych źródeł danych
    - Obsługa baz danych dowolnego RDBMS (Oracle, MySql, TeraData, Vertica itp.), wykonywanie dowolnych zapytań / pobieranie zestawów wyników itp. wraz z przykładami dla testów E2E
    - Wiele raportów (Spec, Xunit/Junit, Allure, JSON) oraz hostowanie raportów Allure i Xunit/Junit na serwerze WWW.
    - Przykłady z aplikacjami demonstracyjnymi https://search.yahoo.com/  i http://the-internet.herokuapp.com.
    - Pliki `.config` specyficzne dla BrowserStack, Sauce Labs, TestMu AI (dawniej LambdaTest) i Appium (do odtwarzania na urządzeniu mobilnym). Aby skonfigurować Appium jednym kliknięciem na lokalnej maszynie dla iOS i Android, zobacz [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- Framework: WDIO-V8 z Mocha (V10x).
- Funkcje:
    -  Model Page Objects oparty na klasach w stylu ES6 / ES7 oraz obsługa TypeScript
    -  Przykłady z aplikacjami demonstracyjnymi https://search.yahoo.com  i http://the-internet.herokuapp.com
    -  Przykłady uruchamiania w wielu przeglądarkach i w trybie headless z użyciem Chrome i Firefox
    -  Integracja testowania w chmurze z BrowserStack, Sauce Labs, TestMu AI (dawniej LambdaTest)
    -  Wiele raportów (Spec, Xunit/Junit, Allure, JSON) oraz hostowanie raportów Allure i Xunit/Junit na serwerze WWW.
    -  Przykłady odczytu/zapisu danych z MS-Excel dla łatwego zarządzania danymi testowymi z zewnętrznych źródeł danych
    -  Przykłady połączenia z bazą danych dowolnego RDBMS (Oracle, MySql, TeraData, Vertica itp.), wykonywania dowolnych zapytań / pobierania zestawów wyników itp. wraz z przykładami dla testów E2E
    -  Pliki `.config` specyficzne dla BrowserStack, Sauce Labs, TestMu AI (dawniej LambdaTest) i Appium (do odtwarzania na urządzeniu mobilnym). Aby skonfigurować Appium jednym kliknięciem na lokalnej maszynie dla iOS i Android, zobacz [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- Framework: WDIO-V8 z Jasmine (V4x).
- Funkcje:
    -  Model Page Objects oparty na klasach w stylu ES6 / ES7 oraz obsługa TypeScript
    -  Przykłady z aplikacjami demonstracyjnymi https://search.yahoo.com  i http://the-internet.herokuapp.com
    -  Przykłady uruchamiania w wielu przeglądarkach i w trybie headless z użyciem Chrome i Firefox
    -  Integracja testowania w chmurze z BrowserStack, Sauce Labs, TestMu AI (dawniej LambdaTest)
    -  Wiele raportów (Spec, Xunit/Junit, Allure, JSON) oraz hostowanie raportów Allure i Xunit/Junit na serwerze WWW.
    -  Przykłady odczytu/zapisu danych z MS-Excel dla łatwego zarządzania danymi testowymi z zewnętrznych źródeł danych
    -  Przykłady połączenia z bazą danych dowolnego RDBMS (Oracle, MySql, TeraData, Vertica itp.), wykonywania dowolnych zapytań / pobierania zestawów wyników itp. wraz z przykładami dla testów E2E
    -  Pliki `.config` specyficzne dla BrowserStack, Sauce Labs, TestMu AI (dawniej LambdaTest) i Appium (do odtwarzania na urządzeniu mobilnym). Aby skonfigurować Appium jednym kliknięciem na lokalnej maszynie dla iOS i Android, zobacz [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

Ten projekt startowy zawiera testy WebdriverIO 8 z cucumber i typescript, zgodne ze wzorcem page objects.

- Frameworki:
    - WebdriverIO v8
    - Cucumber v8

- Funkcje:
    - Typescript v5
    - Wzorzec Page Object
    - Prettier
    - Obsługa wielu przeglądarek
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - Równoległe wykonywanie w różnych przeglądarkach
    - Appium
    - Integracja testowania w chmurze z BrowserStack i Sauce Labs
    - Usługa Docker
    - Usługa współdzielenia danych
    - Osobne pliki konfiguracyjne dla każdej usługi
    - Zarządzanie danymi testowymi i odczyt według typu użytkownika
    - Raportowanie
      - Dot
      - Spec
      - Multiple cucumber html report ze zrzutami ekranu błędów
    - Potoki Gitlab dla repozytorium Gitlab
    - Github Actions dla repozytorium Github
    - Docker compose do konfiguracji docker hub
    - Testowanie dostępności z użyciem AXE
    - Testowanie wizualne z użyciem Applitools
    - Mechanizm logowania


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- Frameworki
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funkcje
    - Zawiera przykładowy scenariusz testowy w cucumber
    - Zintegrowane raporty cucumber html z osadzonymi nagraniami wideo w przypadku błędów
    - Zintegrowane usługi Lambdatest i CircleCI
    - Zintegrowane testowanie wizualne, dostępności i API
    - Zintegrowana funkcjonalność e-mail
    - Zintegrowany bucket s3 do przechowywania i pobierania raportów testowych

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

Projekt szablonowy [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io), który pomoże Ci rozpocząć testy akceptacyjne aplikacji webowych z użyciem najnowszych wersji WebdriverIO, Mocha i Serenity/JS.

- Frameworki
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - Raportowanie Serenity BDD

- Funkcje
    - [Wzorzec Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatyczne zrzuty ekranu w przypadku niepowodzenia testu, osadzone w raportach
    - Konfiguracja ciągłej integracji (CI) z użyciem [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demonstracyjne raporty Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) opublikowane na GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

Projekt szablonowy [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io), który pomoże Ci rozpocząć testy akceptacyjne aplikacji webowych z użyciem najnowszych wersji WebdriverIO, Cucumber i Serenity/JS.

- Frameworki
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - Raportowanie Serenity BDD

- Funkcje
    - [Wzorzec Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - Automatyczne zrzuty ekranu w przypadku niepowodzenia testu, osadzone w raportach
    - Konfiguracja ciągłej integracji (CI) z użyciem [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [Demonstracyjne raporty Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) opublikowane na GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
Projekt startowy do uruchamiania testów WebdriverIO w chmurze Headspin (https://www.headspin.io/) z wykorzystaniem funkcji Cucumber i wzorca page objects.
- Frameworki
    - WebdriverIO (v8)
    - Cucumber (v8)

- Funkcje
    - Integracja z chmurą [Headspin](https://www.headspin.io/)
    - Obsługa Page Object Model
    - Zawiera przykładowe scenariusze napisane w deklaratywnym stylu BDD
    - Zintegrowane raporty cucumber html

# Projekty startowe v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

Projekt startowy do uruchamiania testów Appium z WebdriverIO dla:

- Natywnych aplikacji iOS/Android
- Hybrydowych aplikacji iOS/Android
- Przeglądarki Chrome na Androidzie i Safari na iOS

Ten projekt startowy zawiera:

- Framework: Mocha
- Funkcje:
    - Konfiguracje dla:
        - Aplikacji iOS i Android
        - Przeglądarek iOS i Android
    - Narzędzia pomocnicze dla:
        - WebView
        - Gestów
        - Natywnych alertów
        - Pickerów
     - Przykłady testów dla:
        - WebView
        - Logowania
        - Formularzy
        - Przesuwania (swipe)
        - Przeglądarek

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
Testy WEB ATDD z Mocha, WebdriverIO v6 z PageObject

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

Projekt startowy do uruchamiania testów E2E z Mocha.

- Frameworki:
    - WebdriverIO (v7)
    - Mocha
- Funkcje:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [Testy regresji wizualnej](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   Wzorzec Page Object
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) i [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   Przykład Github Actions
    -   Raport Allure (zrzuty ekranu w przypadku błędów)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

Projekt startowy do uruchamiania testów **WebdriverIO v7** dla:

[Skrypty WDIO 7 z TypeScript we frameworku Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[Skrypty WDIO 7 z TypeScript we frameworku Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Uruchamianie skryptu WDIO 7 w Dockerze](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Logi sieciowe](https://github.com/17thSep/MonitorNetworkLogs/)

Projekt startowy do:

- Przechwytywania logów sieciowych
- Przechwytywania wszystkich wywołań GET/POST lub konkretnego REST API
- Asercji parametrów żądania
- Asercji parametrów odpowiedzi
- Zapisywania wszystkich odpowiedzi w osobnym pliku

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

Projekt startowy do uruchamiania testów appium dla aplikacji natywnych i przeglądarek mobilnych z użyciem cucumber v7 i wdio v7 ze wzorcem page object.

- Frameworki
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- Funkcje
    - Natywne aplikacje Android i iOS
    - Przeglądarka Chrome na Androidzie
    - Przeglądarka Safari na iOS
    - Page Object Model
    - Zawiera przykładowe scenariusze testowe w cucumber
    - Zintegrowany z multiple cucumber html reports

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

Jest to projekt szablonowy, który pokazuje, jak uruchamiać testy webdriverio aplikacji webowych z użyciem najnowszego WebdriverIO i frameworka Cucumber. Ten projekt ma służyć jako obraz bazowy, który pomoże Ci zrozumieć, jak uruchamiać testy WebdriverIO w Dockerze.

Ten projekt zawiera:

- DockerFile
- Projekt cucumber

Więcej informacji: [Blog na Medium](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

Jest to projekt szablonowy, który pokazuje, jak uruchamiać testy electronJS z użyciem WebdriverIO. Ten projekt ma służyć jako obraz bazowy, który pomoże Ci zrozumieć, jak uruchamiać testy WebdriverIO dla electronJS.

Ten projekt zawiera:

- Przykładową aplikację electronjs
- Przykładowe skrypty testowe cucumber

Więcej informacji: [Blog na Medium](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

Jest to projekt szablonowy, który pokazuje, jak automatyzować aplikacje Windows z użyciem winappdriver i WebdriverIO. Ten projekt ma służyć jako obraz bazowy, który pomoże Ci zrozumieć, jak uruchamiać testy winappdriver i WebdriverIO.

Więcej informacji: [Blog na Medium](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


Jest to projekt szablonowy, który pokazuje, jak korzystać z możliwości multi-remote webdriverio z najnowszym WebdriverIO i frameworkiem Jasmine. Ten projekt ma służyć jako obraz bazowy, który pomoże Ci zrozumieć, jak uruchamiać testy WebdriverIO w Dockerze.

Ten projekt wykorzystuje:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

Projekt szablonowy do uruchamiania testów appium na prawdziwych urządzeniach Roku z użyciem mocha i wzorca page object.

- Frameworki
    - WebdriverIO Async v7
    - Appium 3.0
    - Mocha v7
    - Raportowanie Allure

- Funkcje
    - Page Object Model
    - Typescript
    - Zrzut ekranu w przypadku błędu
    - Przykładowe testy z użyciem przykładowego kanału Roku

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

Projekt PoC dla testów E2E multi-remote w Cucumber oraz testów Mocha sterowanych danymi

- Framework:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- Funkcje:
    - Testy E2E oparte na Cucumber
    - Testy sterowane danymi oparte na Mocha
    - Testy tylko webowe – lokalnie oraz na platformach chmurowych
    - Testy tylko mobilne – lokalne oraz zdalne emulatory chmurowe (lub urządzenia)
    - Testy Web + Mobile – multi-remote – lokalnie oraz na platformach chmurowych
    - Zintegrowane wiele raportów, w tym Allure
    - Dane testowe (JSON / XLSX) obsługiwane globalnie, co pozwala zapisać dane (tworzone w locie) do pliku po wykonaniu testów
    - Workflow Github do uruchamiania testów i przesyłania raportu allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

Jest to projekt startowy, który pokazuje, jak uruchamiać webdriverio w trybie multi-remote z użyciem appium i usługi chromedriver z najnowszym WebdriverIO.

- Frameworki
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- Funkcje
  - Model [Page Object](pageobjects)
  - Typescript
  - Testy Web + Mobile – multi-remote
  - Natywne aplikacje Android i iOS
  - Appium
  - Chromedriver
  - ESLint
  - Przykłady testów logowania na http://the-internet.herokuapp.com oraz w [natywnej aplikacji demonstracyjnej WebdriverIO](https://github.com/webdriverio/native-demo-app)