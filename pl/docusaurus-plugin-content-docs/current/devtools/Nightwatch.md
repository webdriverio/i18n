---
id: nightwatch
title: Nightwatch DevTools
description: "Dodaj interfejs debugowania DevTools do zestawu testów Nightwatch bez zmieniania testów i skonfiguruj nagrania ekranu (screencast), przechwytywanie BiDi oraz tryb śledzenia (trace)."
---

Adapter Nightwatch dla [WebdriverIO DevTools](https://github.com/webdriverio/devtools) – zapewnia ten sam wizualny interfejs debugowania dla Twojego zestawu testów Nightwatch bez żadnych zmian w kodzie testów.

## Instalacja

```bash
npm install @wdio/nightwatch-devtools
```

## Konfiguracja

### Standardowy Nightwatch (w stylu mocha)

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Wymagane do przechwytywania żądań sieciowych
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Uruchom testy jak zwykle – interfejs DevTools otworzy się automatycznie w nowym oknie przeglądarki:

```bash
nightwatch
```

> Nie są potrzebne żadne zmiany w plikach testów.

### Cucumber / BDD

Zaimportuj `cucumberHooksPath` obok głównego eksportu i przekaż go do opcji `require` Cucumbera. Rejestruje to hooki scenariuszy `Before` / `After`, które odzwierciedlają zachowanie `beforeScenario` / `afterScenario` z usługi WebdriverIO.

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default
const { cucumberHooksPath } = require('@wdio/nightwatch-devtools')

module.exports = {
  src_folders: ['features/step_definitions'],

  test_runner: {
    type: 'cucumber',
    options: {
      feature_path: 'features',
      require: [cucumberHooksPath] // <-- rejestruje hooki Cucumbera dla DevTools
    }
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

## Opcje konfiguracji

| Opcja | Typ | Domyślnie | Opis |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Port serwera backendu DevTools. Automatycznie zwiększany, jeśli jest już zajęty. |
| `hostname` | `string` | `'localhost'` | Nazwa hosta, na której nasłuchuje serwer backendu. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Nagrywanie wideo `.webm` dla każdej sesji. Zobacz [Screencast](#screencast) poniżej. |
| `bidi` | `boolean` | `false` | Włącza przechwytywanie WebDriver BiDi dla konsoli przeglądarki + wyjątków JS + ruchu sieciowego. Wymaga `webSocketUrl: true` w capabilities oraz chromedrivera obsługującego BiDi. Po podłączeniu ścieżka przechwytywania sieci z logów wydajności Chrome (per polecenie) jest wyłączana, aby żądania się nie duplikowały. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` otwiera interfejs DevTools; `trace` go pomija i zamiast tego zapisuje przenośny artefakt. Zobacz [Trace Mode](/docs/devtools/wdio/trace-mode). |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Układ artefaktu śledzenia. Ma zastosowanie tylko przy `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Jeden ślad na sesję / plik spec / test. `'test'` zapisuje każdy do `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Ma zastosowanie tylko przy `mode: 'trace'`. Zobacz [Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). **Zastrzeżenie:** interfejs BDD `describe/it` sprowadza się do jednego wycinka o zasięgu sesji (zobacz [Podział na testy](#per-test-slicing--the-bdd-describeit-caveat)). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Które ślady zachować. Łączy się z `traceGranularity: 'test'`. Ma zastosowanie tylko przy `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Nagrywa gęsty, ciągły pasek klatek (filmstrip) ze screencastu do śladu, umożliwiając płynne przewijanie w odtwarzaczu śladów — a nie tylko jedną klatkę na akcję. Uruchamia rejestrator screencastu (w Nightwatch w trybie odpytywania) dla sesji. Ma zastosowanie tylko przy `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Zrzut ekranu dla każdego testu. Tylko tryb trace + `traceGranularity: 'test'`. **Tylko generowanie** — plik PNG jest zapisywany do katalogu wyjściowego śladu (oraz do manifestu, gdy `emitArtifactsManifest: true`); nie jest dołączany bezpośrednio do Allure (zobacz uwagę poniżej). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Wycinek wideo dla każdego testu, zachowywany zgodnie z podaną polityką (np. `'retain-on-failure'`). Tylko tryb trace + `traceGranularity: 'test'`. Wartość inna niż `off` samodzielnie uruchamia rejestrator screencastu — **nie** potrzebujesz dodatkowo `filmstrip` ani `screencast.enabled`. **Tylko generowanie** — plik `.webm` jest zapisywany do katalogu wyjściowego śladu (oraz do manifestu, gdy `emitArtifactsManifest: true`); nie jest dołączany bezpośrednio do Allure. |
| `emitArtifactsManifest` | `boolean` | `false` | Zapisuje manifest `devtools-artifacts-<sessionId>.json` (ogólny indeks, z którego reportery/CI korzystają, aby odnaleźć wygenerowane artefakty) obok śladu. **W Nightwatch wymaga jawnego włączenia** — nie ma tu sygnału działającego Allure, który można by automatycznie wykryć, więc w przeciwieństwie do WDIO/Selenium nigdy nie włącza się automatycznie. Ma zastosowanie tylko przy `mode: 'trace'`. |
| `captureAssertions` | `boolean` | `true` | Przechwytuje asercje jako wiersze akcji w śladzie — `node:assert` oraz natywne `browser.assert`/`browser.verify`, w tym zanegowane matchery `.not.*`. Ustaw `false`, aby zrezygnować. |

> **Bezpośrednie dołączanie do Allure nie jest obsługiwane w Nightwatch.** Oficjalny reporter `nightwatch-allure` działa po fakcie (brak API do dołączania na żywo), a `attachment()` z `allure-js-commons` nic nie robi podczas uruchomienia Nightwatch. Dlatego artefakty `screenshot` / `video` są *generowane* (pliki oraz manifest artefaktów, gdy `emitArtifactsManifest: true`) w katalogu wyjściowym śladu, ale nie są dołączane do testu w Allure. Podział na testy — a zatem i te artefakty — ma sens dla interfejsów Cucumber i exports-object; interfejs BDD `describe/it` sprowadza się do granulacji sesji, więc bramka per test nic tam nie robi.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## Screencast

Nagrywaj ciągłe wideo `.webm` z sesji przeglądarki. Nagrywanie rozpoczyna się przy pierwszej sesji wykrytej przez wtyczkę i jest finalizowane w hooku `after()` Nightwatch.

**Tylko tryb odpytywania.** Nightwatch nie udostępnia stabilnego dostępu do CDP w taki sposób jak WebdriverIO (`browser.getPuppeteer()`) i Selenium (`driver.createCDPConnection`), dlatego screencast przechwytuje klatki, wywołując `browser.takeScreenshot()` w stałych odstępach czasu. Działa w każdej przeglądarce obsługiwanej przez Nightwatch.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| Opcja | Typ | Domyślnie | Uwagi |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | Główny przełącznik. |
| `pollIntervalMs` | `number` | `200` | Interwał zrzutów ekranu (ms). Niższa wartość = płynniejsze wideo, więcej zapytań do WebDrivera. 200 ms ≈ 5 fps. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Format pikseli każdej klatki przekazywany do enkodera ffmpeg przed finalnym zmultipleksowaniem do `.webm`. W trybie odpytywania źródłowe zrzuty ekranu są zawsze przechwytywane jako PNG, więc ta opcja **nie** zmienia sposobu przechwytywania – jedynie format, który enkoder otrzymuje dla każdej klatki. |
| `maxWidth` / `maxHeight` / `quality` | - | - | Opcje dostępne tylko dla CDP, ignorowane w trybie odpytywania. Wymienione dla zgodności struktury z adapterami WDIO/Selenium. |

**Wymagania wstępne:** `fluent-ffmpeg` (już będący zależnością runtime pakietu) oraz plik binarny `ffmpeg` w PATH. macOS: `brew install ffmpeg`. Linux: `apt install ffmpeg`. Bez ffmpeg rejestrator nadal działa, ale krok kodowania loguje ostrzeżenie i pomija zapis pliku.

**Wynik:** plik wideo jest zapisywany obok właśnie uruchomionego pliku testu (z katalogiem `nightwatch.conf.*` jako rozwiązaniem zapasowym, a w ostateczności `process.cwd()`). Pełna ścieżka pojawia się w linii logu Nightwatch `📹 Screencast video: <path>`, a wideo jest również przesyłane strumieniowo do zakładki Screencast w panelu.

Pełną dokumentację funkcji screencast (obsługa przeglądarek, ścieżki wyjściowe we wszystkich trzech adapterach) znajdziesz na [stronie Screencast](/docs/devtools/wdio/screencast).

## Przechwytywanie BiDi (opcjonalne)

Włącz przechwytywanie WebDriver BiDi dla komunikatów konsoli przeglądarki, wyjątków JS i żądań sieciowych. Odpowiada to ścieżce używanej przez selenium-devtools – oba adaptery współdzielą tę samą logikę podłączania w `@wdio/devtools-core`.

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

Potrzebujesz również `webSocketUrl: true` w capabilities, aby chromedriver faktycznie udostępnił kanał BiDi:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← włącza BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

Gdy BiDi jest podłączone, ścieżka przechwytywania sieci z logów wydajności Chrome (per polecenie) jest wyłączana, aby żądania nie pojawiały się w panelu dwukrotnie. Jeśli brakuje `webSocketUrl` lub wersja chromedrivera nie udostępnia BiDi, podłączenie po cichu się nie powiedzie, a zapasowa ścieżka logów wydajności nadal będzie działać.

## Tryb śledzenia (trace)

Bezgłowa ścieżka przechwytywania — żadne okno interfejsu DevTools się nie otwiera. Na końcu sesji adapter zapisuje przenośny plik `trace-<sessionId>.zip` (lub katalog) do folderu `test-results/` (obok rozwiązanego katalogu testów / konfiguracji), o takiej samej strukturze jak artefakt śledzenia WebdriverIO.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // opcjonalne; domyślnie 'zip'
})
```

### Granulacja i Cucumber

`traceGranularity` określa, co obejmuje jeden artefakt — `'session'` (domyślnie), `'spec'` lub `'test'`.

Nightwatch zamyka przeglądarkę po każdym scenariuszu Cucumbera. Ślad `'session'` to obejmuje: jeden plik zip dla całego uruchomienia, z każdym scenariuszem zagnieżdżonym pod swoją funkcjonalnością (feature). `'test'` zapisuje jeden plik zip na scenariusz w osobnym folderze, co jest zalecane dla Cucumbera — mniejsze artefakty i granulacja, na której opiera się retencja `tracePolicy`.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // jeden ślad na scenariusz Cucumbera
})
```

W interfejsie BDD `describe/it` opcja `'test'` sprowadza się do jednego wycinka o zasięgu sesji: Nightwatch uruchamia każde `it()` wewnętrznie i wywołuje hook per test wtyczki tylko raz na moduł. Drzewo akcji nadal pokazuje każde `it` jako osobną grupę.

Wiązanie portu backendu, okno interfejsu oraz opcja `screencast` są w trybie śledzenia pomijane. Pełną dokumentację funkcji (zawartość artefaktu, przeglądarka, testowanie mobilne, kiedy wybrać `zip`, a kiedy `ndjson-directory`) znajdziesz na [stronie Trace Mode](/docs/devtools/wdio/trace-mode).

Nightwatch współdzieli ten sam potok śledzenia co adaptery WebdriverIO i Selenium, więc struktura artefaktu jest identyczna niezależnie od tego, który adapter go wygenerował. Ślad Nightwatch zawiera pełne przechwycenie dla każdej akcji — zrzut ekranu, migawkę drzewa dostępności z wcięciami według głębokości, listę elementów interaktywnych oraz transkrypcję w Markdown — dzięki czemu otwiera się w odtwarzaczu `show-trace` z podróżą w czasie po DOM/migawkach, zakładkami **A11y** i **Transcript**, nakładką wybierania lokatora elementu oraz (dla Cucumbera) zagnieżdżeniem **Feature → Scenario → Step**.

Otwórz ślad za pomocą polecenia `show-trace`, dostarczanego z `@wdio/nightwatch-devtools` (bez dodatkowych zależności):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # in a project that installs the adapter
pnpm show-trace test-results/trace-<sessionId>.zip  # from the devtools monorepo
```

Zobacz stronę [Trace Player](/docs/devtools/trace-player), aby zapoznać się z pełnym przewodnikiem i skrótami klawiszowymi.

### Podział na testy i zastrzeżenie dotyczące BDD `describe/it`

Opcje per test — `traceGranularity: 'test'` oraz współpracujące z nią `tracePolicy`, `screenshot` i `video` — wymagają hooka per test, aby wyciąć wycinek każdego testu. Interfejs **exports-object (w stylu mocha)** oraz **Cucumber** (hooki per scenariusz) go udostępniają, więc uzyskują rzeczywisty podział na testy. Wyjątkiem jest interfejs **BDD `describe/it`**: Nightwatch uruchamia każde `it()` wewnętrznie i wywołuje hook per test wtyczki tylko raz na moduł, więc `traceGranularity: 'test'` sprowadza się do jednego wycinka **o zasięgu sesji**, przypisanego do pierwszego testu. Manifest artefaktów nadal wymienia każdy przypadek testowy z jego poprawnym stanem; zwija się jedynie przypisanie wycinków/artefaktów do testów. Ślady o granulacji sesji i spec nie są tym dotknięte.

## Przykłady

Działające przykłady znajdują się w katalogu `examples/` na najwyższym poziomie repozytorium. Zbuduj workspace jednorazowo (`pnpm install && pnpm build`), a następnie uruchom z katalogu głównego repozytorium:

| Katalog | Runner | Polecenie |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch w stylu mocha | `pnpm demo:nightwatch` |

## Funkcje

Adapter Nightwatch zapewnia to samo doświadczenie interfejsu DevTools co WebdriverIO. Każda z poniższych funkcji jest przechwytywana automatycznie przy podstawowej konfiguracji `globals: nightwatchDevtools({ port: 3000 })` — bez konfiguracji poszczególnych funkcji (logi sieciowe dodatkowo wymagają `'goog:loggingPrefs': { performance: 'ALL' }`, pokazanego w sekcji [Konfiguracja](#setup)). Linki prowadzą do pełnej dokumentacji każdej funkcji.

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)** - Podglądy przeglądarki na żywo, zrzuty ekranu dla każdego polecenia oraz ponowne uruchamianie testów/zestawów jednym kliknięciem
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - Zapisz migawkę nieudanego testu, uruchom go ponownie i porównaj oba przebiegi obok siebie
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)** - Standardowe runnery (w stylu mocha) oraz Cucumber/BDD
- **[Console Logs](/docs/devtools/wdio/console-logs)** - Przechwytywanie i analiza wyjścia konsoli przeglądarki (w czasie rzeczywistym z `bidi: true`)
- **[Network Logs](/docs/devtools/wdio/network-logs)** - Monitorowanie wywołań API i aktywności sieciowej
- **[Metadata](/docs/devtools/wdio/metadata)** - Capabilities sesji, środowisko i czasy dla każdej sesji przeglądarki
- **[TestLens](/docs/devtools/wdio/testlens)** - Przejście z dowolnego polecenia do linii źródłowej, która je wywołała
- **[Session Screencast](/docs/devtools/wdio/screencast)** - Ciągłe nagrywanie `.webm` sesji przeglądarki
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Bezgłowe przechwytywanie tworzące przenośny plik `trace.zip` (bez okna interfejsu)

Screencast to jedyna funkcja z własnymi opcjami (pełna lista w sekcji [Screencast](#screencast)):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## Ograniczenia

Nightwatch nie zapewnia tak rozbudowanych hooków frameworka jak WebdriverIO, dlatego istnieje kilka różnic w stosunku do usługi WDIO DevTools:

| Ograniczenie | Szczegóły |
|-----------|--------|
| Brak natywnych hooków poleceń | Nightwatch nie ma hooków `beforeCommand` / `afterCommand`. Zamiast tego polecenia są przechwytywane przez wrapper proxy przeglądarki. |
| Ograniczony kontekst testu | `browser.currentTest` dostarcza mniej metadanych niż kontekst runnera WDIO; nazwy testów i ścieżki plików wymagają dodatkowych heurystyk. |
| Płaskie zagnieżdżenie zestawów | Nightwatch natywnie nie obsługuje wielokrotnie zagnieżdżonych bloków `describe`; wtyczka raportuje maksymalnie dwa poziomy. |
| Opóźniona dostępność wyników | Wyniki testów są finalizowane dopiero w `afterEach` i nie są dostępne w trakcie testu. |
| Screencast tylko w trybie odpytywania | W przeciwieństwie do WDIO (push CDP przez `browser.getPuppeteer()`) i Selenium (push CDP przez `driver.createCDPConnection`), Nightwatch nie ma stabilnego dostępu do CDP, więc klatki są przechwytywane przez odpytywanie `browser.takeScreenshot()`. Działa w każdej przeglądarce obsługiwanej przez Nightwatch; niewielki koszt na klatkę, proporcjonalny do interwału odpytywania. |
| Podział śladu na testy (BDD `describe/it`) | Interfejs BDD wywołuje hook per test wtyczki raz na moduł, więc `traceGranularity: 'test'` sprowadza się do jednego wycinka o zasięgu sesji. Interfejsy exports-object (w stylu mocha) i Cucumber uzyskują rzeczywisty podział na testy. Zobacz [Podział na testy](#per-test-slicing--the-bdd-describeit-caveat). |
| Artefakty śledzenia tylko generowane | Pliki `screenshot` / `video` dla każdego testu są zapisywane do katalogu wyjściowego śladu (oraz do manifestu, gdy `emitArtifactsManifest: true`), ale nie są dołączane bezpośrednio do Allure — Nightwatch nie ma API do dołączania na żywo w Allure. |

Ogólna zgodność funkcji z usługą WebdriverIO DevTools wynosi około **80-90%**.