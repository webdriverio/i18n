---
id: limitations
title: Ograniczenia trybu śledzenia
description: "Sprawdź, czego tryb śledzenia DevTools celowo nie przechwytuje, oraz poznaj znane ograniczenia adapterów WebdriverIO, Selenium i Nightwatch."
---

Co [tryb śledzenia](/docs/devtools/wdio/trace-mode) celowo pomija, a także znane braki w poszczególnych adapterach.

## Co pomija tryb śledzenia

- **Okno interfejsu DevTools** — dla panelu nie jest otwierana żadna instancja Chrome.
- **Wiązanie portu backendu** — żaden port localhost nie jest rezerwowany (jednakowo we wszystkich trzech adapterach od wersji v1.2+).
- **`screencast.enabled`** — ciągłe nagrywanie `.webm` z trybu na żywo jest w trybie śledzenia ignorowane (w logu pojawia się ostrzeżenie). Zamiast tego tryb śledzenia **domyślnie** zapisuje do archiwum gęsty [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) (ustaw `filmstrip: false`, aby uzyskać jedną klatkę na akcję), a po włączeniu także fragmenty [`video`](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) dla poszczególnych testów. Pola **dostrajania** screencastu (`quality`, `maxWidth`, `pollIntervalMs`, …) nadal mają zastosowanie do tego mechanizmu nagrywania, który jest uruchomiony.
- **Zrzut `wdio-trace-<sessionId>.json`** — całkowicie usunięty. Starszy, monolityczny plik JSON, który zapisywał tryb na żywo WDIO, już nie istnieje; tryb na żywo przesyła teraz dane strumieniowo do panelu i nie zapisuje niczego na dysku, a `trace.zip` jest jedynym artefaktem śledzenia.

## Znane ograniczenia

- **Nightwatch BDD `describe/it`** — `traceGranularity: 'test'` sprowadza się do **jednego fragmentu o zasięgu sesji**: Nightwatch uruchamia poszczególne `it` wewnętrznie, bez hooka na poziomie testu, który wtyczka mogłaby wykryć, więc fragment jest przypisywany do pierwszego testu. Nie wpływa to na przechwytywanie metadanych (stan każdego przypadku testowego w manifeście), ale przypisywanie śladów/zrzutów ekranu/wideo do poszczególnych `it` oraz retencja uwzględniająca ponowienia zostają w tym interfejsie ograniczone do zasięgu sesji. Interfejsy **exports-object** i **Cucumber** w Nightwatch udostępniają hooki dla poszczególnych scenariuszy/testów i zapewniają rzeczywisty podział na testy. (Nie dotyczy to WebdriverIO mocha/cucumber ani Selenium mocha).
- **Retencja uwzględniająca ponowienia w Nightwatch** — działa tylko `retain-on-failure`; pozostałe polityki uwzględniające ponowienia działają w ograniczonym zakresie, ponieważ Nightwatch przy `--retries` ponownie uruchamia przypadek testowy wewnętrznie, bez ponownego wywoływania hooków na poziomie testu. Zobacz [Retencja](/docs/devtools/wdio/trace-mode#retention--tracepolicy).
- **Załączniki Allure w Nightwatch** — `screenshot`/`video` dla poszczególnych testów są jedynie generowane (pliki + manifest), a nie dołączane bezpośrednio do raportu; zobacz [Integracja z Allure](/docs/devtools/allure).
- **Wideo/filmstrip w przeglądarkach innych niż Chrome** — w przeglądarkach bez ścieżki CDP push mechanizm nagrywania odpytuje `takeScreenshot`, co dodaje dodatkowe wywołania WebDrivera i (w przypadku Allure) zalewa log kroków; połącz to z opcjami reportera wyciszającymi kroki.