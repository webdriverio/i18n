---
id: wdio-video-reporter
title: Reporter Wideo
custom_edit_url: https://github.com/presidenten/wdio-video-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-video-reporter jest pakietem zewnętrznym, więcej informacji można znaleźć na [GitHub](https://github.com/presidenten/wdio-video-reporter) | [npm](https://www.npmjs.com/package/wdio-video-reporter)

![Logo](https://raw.githubusercontent.com/presidenten/wdio-video-reporter-example-report/master/wdio-video-reporter.png)

Jest to reporter dla [Webdriver IO v6 i wyższych](https://webdriver.io/), który generuje filmy z wykonania testów wdio. Jeśli używasz allure, przypadki testowe są automatycznie wzbogacane o nagrania wideo. (Dla Webdriver IO v5, proszę używać wdio-video-reporter w wersji ^2.0.0.)

Filmy wideo trafiają do `wdio.config.outputDir`

Sprawdź przykładowy raport Allure z dołączonymi filmami dla nieudanych testów tutaj:
https://presidenten.github.io/wdio-video-reporter-example-report/

![example-allure-report](https://media.giphy.com/media/7Fgle7bHGrxR3zY6Gw/giphy.gif)

Zalety:
- Świetne filmy w raportach allure
- Przyjemne filmy w ludzkiej prędkości, nawet jeśli testy są szybkie
- Działa z Selenium grid
- Działa ze wszystkimi webdriverami, które obsługują `saveScreenshot`
- Zweryfikowano na następujących przeglądarkach desktopowych przy użyciu Selenium 3.141.59:
  - Chrome
  - Firefox
  - Safari
  - Internet Explorer 11
  - Microsoft Edge
- Zweryfikowano na następujących urządzeniach iOS i Android z [Appium](http://appium.io/docs/en/about-appium/getting-started/) 1.13.0-beta3:
  - Iphone 8
  - Ipad Gen 6
  - Samsung galaxy S9
  - Samsung galaxy tab A10

Wady:
- Działa poprzez robienie zrzutów ekranu po "akcjach", co sprawia, że testy są nieco wolniejsze. Jest to łagodzone przez staranny wybór komunikatów [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol), które powinny skutkować zrzutem ekranu
- Sterowniki Selenium nie uwzględniają okien alertów i wyskakujących okienek w zrzutach ekranu, więc nie są one widoczne w filmach


Szybki start
===========

Sprawdź prosty szablon na [wdio-template](https://github.com/presidenten/wdio-template), aby szybko zacząć pracę.

Sklonuj jedno z repozytoriów i zainstaluj zależności za pomocą `yarn` lub `npm install`. Następnie uruchom `yarn e2e` lub `npm run e2e` w katalogu demo, a na końcu `yarn report` lub `npm run report`, aby zobaczyć raport allure.


Instalacja
============

Zainstaluj reporter
--------------------

`yarn add wdio-video-reporter`
lub
`npm install wdio-video-reporter`


Dodaj reporter do konfiguracji
--------------------------

Na górze pliku `wdio.conf.js`, zaimportuj bibliotekę:
```
const video = require('wdio-video-reporter');
```

Następnie dodaj reporter wideo do konfiguracji w właściwości reporters:

```
 reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
  ],
```


Używanie z Allure
-----------------

Dodanie reportera Allure automatycznie aktualizuje raporty o filmy bez potrzeby konfigurowania czegokolwiek :-)

```
 reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
```


Konfiguracja
=============

Normalne parametry konfiguracji
-------------------------------

Większość użytkowników może chcieć ustawić te parametry

- `saveAllVideos` Ustaw na true, aby zapisywać filmy dla testów zakończonych powodzeniem. `Domyślnie: false`
- `videoSlowdownMultiplier` Liczba całkowita z zakresu [1-100]. Zwiększ, jeśli filmy odtwarzają się zbyt szybko. `Domyślnie: 3`
- `videoRenderTimeout` Maksymalna liczba sekund oczekiwania na renderowanie filmu. `Domyślnie: 5`
- `outputDir` Jeśli nie jest ustawiony, używa wdio.config.outputDir. `Domyślnie: undefined`
- `outputDir` Jeśli nie jest ustawiony, używa wdio.config.outputDir. `Domyślnie: undefined`
- `maxTestNameCharacters` Maksymalna długość nazwy testu. `Domyślnie: 250`

Zaawansowane parametry konfiguracji
---------------------------------

Zaawansowani użytkownicy, którzy chcą zmienić moment wykonania zrzutu ekranu przez silnik, mogą edytować te parametry. Tablice te mogą być wypełnione ostatnim słowem komunikatu [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol), np. /session/:sessionId/`buttondown`.

- `addExcludedActions` Dodaj akcje, gdzie zrzuty ekranu są niepotrzebne. `Domyślnie: []`
- `addJsonWireActions` Dodaj akcje, gdzie brakuje zrzutów ekranu. `Domyślnie: []`
- `recordAllActions` Pomiń filtrowanie i rób zrzuty wszystkiego. (Niezalecane) `Domyślnie: false`

Aby zobaczyć przetworzone komunikaty, ustaw `wdio.config.logLevel: 'debug'` i sprawdź `outputDir/wdio-X-Y-Video-reporter.log`. Pozostawi to również nienaruszony katalog wyjściowy zrzutów ekranu do przeglądu.

Aby całkowicie uniknąć dodatkowego logowania i otrzymywać tylko pliki wideo, ustaw `wdio.config.logLevel: 'silent'`.

Wsparcie dla Cucumber
----------------

Jeśli używasz reportera Allure, musisz upewnić się, że wykonasz następujące czynności:

- Używaj `chai` zamiast wbudowanych asercji node, w przeciwnym razie nieudane testy będą raportowane jako uszkodzone w definicjach kroków
- Dodaj `useCucumberStepReporter: true` do opcji Allure w pliku `wdio.conf.js`, typowa konfiguracja będzie wyglądać tak:
```
  reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }],
  ],
```
Aby zobaczyć kompletny przykład, sprawdź gałąź cucumber w [wdio-template](https://github.com/presidenten/wdio-template/tree/cucumber)


Konfiguracja Appium
------------

Od wersji `wdio-video-reporter` v1.2.4 istnieje wsparcie, które pomaga Allure rozróżniać przeglądarki safari i chrome na komputerach stacjonarnych i urządzeniach.
Reporter używa niestandardowej właściwości `deviceType` do identyfikacji różnych urządzeń.
Zalecane wartości to `phone` i `tablet`.
Zaleca się również dołączenie `browserVersion` dla _wszystkich_ przeglądarek, aby uniknąć błędu w Chrome webdriver podczas korzystania z urządzeń w tej samej siatce Selenium co przeglądarki Chrome na komputerach.

Do nazwy przeglądarki w wygenerowanych plikach wideo zostanie również dodany `deviceType`.

Przykładowa konfiguracja appium:
```
  "capabilities": [
    {
      ...
      "deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    }
  ],
```

Oraz `wdio-config.json`:
```
  "capabilities": [
    {
      ...
      "appium:deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    },
  ],
```


Współpraca
============

Forkuj, wprowadzaj zmiany, pisz testy, lintuj, uruchamiaj testy, buduj i weryfikuj w wersji demo, czy zmiany działają tak, jak powinny, a następnie utwórz PR.

Folder demo działa z zbudowaną wersją biblioteki, więc upewnij się, że zbudowałeś ją, jeśli dodałeś nowe funkcje i chcesz je wypróbować.


Podziękowania
======

Dziękuję [Johnson E](https://github.com/jonn-set) za naprawienie wsparcia dla Cucumber, o które pytało wielu użytkowników.