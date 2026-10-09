---
id: devtools
title: DevTools
description: "Wizualizuj, kontroluj i analizuj przebiegi testów w opartym na przeglądarce interfejsie do debugowania, który działa z WebdriverIO, Nightwatch.js i Selenium WebDriver."
---

DevTools to potężny, oparty na przeglądarce interfejs do debugowania, służący do wizualizacji, kontrolowania i analizowania wykonywania testów w czasie rzeczywistym. Działa z **WebdriverIO**, **Nightwatch.js** oraz **Selenium WebDriver** (z dowolnym runnerem) — ten sam backend, ten sam interfejs, ta sama infrastruktura przechwytywania.

## Co oferuje

- **Selektywne ponowne uruchamianie testów** - Kliknij dowolny przypadek testowy lub zestaw testów, aby natychmiast go ponownie wykonać ([szczegóły](/docs/devtools/wdio/interactive-test-rerunning))
- **Zachowaj i uruchom ponownie (Porównaj)** - Zapisz migawkę nieudanego testu, uruchom go ponownie i porównaj oba przebiegi obok siebie, wyrównane według poleceń ([szczegóły](/docs/devtools/wdio/preserve-and-rerun))
- **Debugowanie wizualne** - Oglądaj podgląd przeglądarki na żywo z automatycznymi zrzutami ekranu po każdym poleceniu
- **Śledzenie wykonania** - Przeglądaj szczegółowe logi poleceń ze znacznikami czasu i wynikami
- **Monitorowanie sieci i konsoli** - Analizuj wywołania API i logi JavaScript ([sieć](/docs/devtools/wdio/network-logs) · [konsola](/docs/devtools/wdio/console-logs))
- **Nawigacja do kodu** - Przechodź bezpośrednio do plików źródłowych testów za pomocą TestLens ([szczegóły](/docs/devtools/wdio/testlens))
- **Nagrywanie sesji** - Ciągłe nagrywanie wideo przeglądarki w formacie `.webm`, osobno dla każdej sesji ([szczegóły](/docs/devtools/wdio/screencast))
- **Tryb śledzenia (Trace mode)** - Bezgłowa ścieżka przechwytywania tworząca przenośny artefakt `trace.zip` do odtwarzania offline lub wykorzystania przez agentów ([szczegóły](/docs/devtools/wdio/trace-mode))

## Jak to działa

1. Uruchom testy jak zwykle
2. DevTools automatycznie otwiera okno przeglądarki pod adresem `http://localhost:3000`
3. Interfejs wyświetla w czasie rzeczywistym hierarchię testów, podgląd przeglądarki, oś czasu poleceń oraz logi
4. Po zakończeniu testów kliknij dowolny test, aby uruchomić go ponownie osobno w tej samej sesji przeglądarki

## Wybierz swój framework

- **[WebDriverIO](/docs/devtools/wdio)** - Użyj `@wdio/devtools-service` z Mocha, Jasmine lub Cucumber
- **[Nightwatch](/docs/devtools/nightwatch)** - Użyj `@wdio/nightwatch-devtools` bez żadnych zmian w kodzie testów
- **[Selenium](/docs/devtools/selenium)** - Użyj `@wdio/selenium-devtools` z Mocha, Jest, Cucumber lub zwykłymi skryptami Node