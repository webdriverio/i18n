---
id: dashboard
title: Panel
description: "Obserwuj przebiegi testów na żywo w panelu DevTools, uruchamiaj ponownie pojedyncze testy lub zestawy testów oraz konfiguruj okno panelu i backend."
---

Tryb na żywo otwiera interfejs DevTools w zewnętrznym oknie przeglądarki i przesyła przebieg testów w czasie rzeczywistym. Jest to interaktywny odpowiednik [Trybu śledzenia](/docs/devtools/wdio/trace-mode), który pomija interfejs i zamiast tego zapisuje przenośny artefakt do użytku offline. Tryb na żywo jest domyślnie włączony (`mode: 'live'`), więc samo uruchomienie testów WebdriverIO otwiera panel.

Po uruchomieniu testów interfejs DevTools automatycznie otwiera się w zewnętrznym oknie przeglądarki, a testy natychmiast zaczynają się wykonywać z wizualizacją w czasie rzeczywistym. Po zakończeniu pierwszego przebiegu użyj przycisków odtwarzania, aby ponownie uruchomić poszczególne testy lub zestawy testów, oraz przycisku zatrzymania, aby w dowolnym momencie przerwać działające testy.

## Co pokazuje panel

- **Podgląd przeglądarki na żywo** — obserwuj testowaną przeglądarkę podczas wykonywania poleceń.
- **Postęp testów** — zestawy testów i testy aktualizują się w trakcie działania.
- **Wykonywanie poleceń** — każda akcja pojawia się na bieżąco, gdy tylko zostanie wykonana.
- **Karty obszaru roboczego** — przeglądaj karty Actions, Console, Network, Metadata i Source dla wybranego testu.

## Funkcje trybu na żywo

- **[Interaktywne ponowne uruchamianie i wizualizacja testów](/docs/devtools/wdio/interactive-test-rerunning)** — Podgląd przeglądarki w czasie rzeczywistym z możliwością ponownego uruchamiania testów
- **[Zachowaj i uruchom ponownie (porównanie)](/docs/devtools/wdio/preserve-and-rerun)** — Zapisz migawkę nieudanego testu, uruchom go ponownie i porównaj oba przebiegi obok siebie
- **[Logi konsoli](/docs/devtools/wdio/console-logs)** — Przechwytuj i analizuj dane wyjściowe konsoli przeglądarki
- **[Logi sieciowe](/docs/devtools/wdio/network-logs)** — Monitoruj wywołania API i aktywność sieciową
- **[Metadane](/docs/devtools/wdio/metadata)** — Capabilities sesji, środowisko i czasy dla każdej sesji przeglądarki
- **[TestLens](/docs/devtools/wdio/testlens)** — Przechodź do kodu źródłowego dzięki inteligentnej nawigacji po kodzie
- **[Obsługa wielu frameworków](/docs/devtools/wdio/multi-framework-support)** — Działa z Mocha, Jasmine i Cucumber
- **[Nagrywanie ekranu sesji](/docs/devtools/wdio/screencast)** — Automatyczne nagrywanie wideo sesji przeglądarki

## Konfiguracja okna panelu

Opcje `port`, `hostname` i `devtoolsCapabilities` sterują serwerem interfejsu DevTools oraz oknem, w którym jest on otwierany. Szczegóły znajdziesz w [Dokumentacji konfiguracji](/docs/devtools/reference).

## Samodzielne uruchamianie backendu

Adaptery uruchamiają serwer panelu w ramach tego samego procesu, więc zwykle nie musisz się nim zajmować. Jest on również dostarczany jako samodzielny plik wykonywalny, co przydaje się, gdy panel ma działać dłużej niż pojedynczy przebieg - lub gdy testy nie są napisane w JavaScript, jak w przypadku adaptera dla Pythona (zobacz stronę [Selenium](/docs/devtools/selenium)).

```bash
npx @wdio/devtools-backend
```

```
Usage: devtools-backend [options]

Options:
  --port <number>     Preferred port; a free one is chosen if it is taken
  --hostname <host>   Host to bind (default: localhost)
  -h, --help          Show this message
```

`--port` to *preferencja*, a nie gwarancja: jeśli ten port jest zajęty, serwer zamiast zgłosić błąd, użyje wolnego portu. Wypisuje port, na którym faktycznie nasłuchuje, i to właśnie tę wartość należy odczytać, a nie tę, o którą prosiłeś:

```
devtools-backend listening at http://localhost:3000
```

Wskaż przebiegowi już nasłuchujący serwer za pomocą `DEVTOOLS_PORT` (każdy adapter to respektuje), a przebieg podłączy się do niego zamiast uruchamiać drugi.

Drugi plik wykonywalny, `show-trace`, otwiera archiwum śledzenia w odtwarzaczu offline - zobacz [Odtwarzacz śladów](/docs/devtools/trace-player).