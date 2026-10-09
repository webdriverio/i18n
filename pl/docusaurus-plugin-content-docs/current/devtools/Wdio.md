---
id: wdio
title: WebDriverIO DevTools
description: "Zainstaluj i skonfiguruj usługę WebdriverIO DevTools, aby debugować testy za pomocą odtwarzania DOM, zrzutów ekranu, przechwytywania ruchu sieciowego i konsoli oraz nagrań ekranu."
---

Usługa WebdriverIO udostępniająca interfejs narzędzi deweloperskich do uruchamiania, debugowania i analizowania testów automatyzacji przeglądarki. Funkcje obejmują odtwarzanie mutacji DOM, zrzuty ekranu dla każdej komendy, inspekcję żądań sieciowych, przechwytywanie logów konsoli oraz nagrywanie sesji (screencast).

## Instalacja

```sh
npm install @wdio/devtools-service --save-dev
```

## Użycie

### Test Runner

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

### Tryb standalone

```ts
import { remote } from 'webdriverio'
import { setupForDevtools } from '@wdio/devtools-service'

const browser = await remote(setupForDevtools({
  capabilities: { browserName: 'chrome' }
}))
await browser.url('https://example.com')
await browser.deleteSession()
```

## Opcje usługi

```ts
services: [['devtools', options]]
```

| Opcja | Typ | Domyślnie | Opis |
|---|---|---|---|
| `port` | `number` | losowy | Port, na którym nasłuchuje serwer interfejsu DevTools |
| `hostname` | `string` | `'localhost'` | Nazwa hosta, do której wiąże się serwer interfejsu DevTools |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600x1200 | Capabilities używane do otwarcia okna interfejsu DevTools |
| `screencast` | `ScreencastOptions` | - | Nagrywanie wideo sesji ([zobacz Screencast](/docs/devtools/wdio/screencast)) |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` otwiera interfejs DevTools; `trace` pomija go i zamiast tego zapisuje przenośny artefakt ([zobacz Trace Mode](/docs/devtools/wdio/trace-mode)) |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Układ artefaktu trace — pojedyncze archiwum lub rozpakowany katalog. Ma zastosowanie tylko przy `mode: 'trace'` |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Jeden trace na sesję / plik spec / test. `'test'` zapisuje każdy do `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Ma zastosowanie tylko przy `mode: 'trace'` ([zobacz Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Które trace'y zachować. Współpracuje z `traceGranularity: 'test'`. Ma zastosowanie tylko przy `mode: 'trace'` |
| `filmstrip` | `boolean` | `true` | Nagrywa gęsty, ciągły filmstrip screencastu *do* trace'a, zapewniając płynne odtwarzanie z możliwością przewijania w odtwarzaczu — gęste klatki obok klatek dla poszczególnych akcji, przerzedzane i adresowane treścią podczas eksportu. Ma zastosowanie tylko przy `mode: 'trace'` |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Zrzut ekranu dla każdego testu, dołączany bezpośrednio do Allure (`image/png`). Wymaga `mode: 'trace'` + `traceGranularity: 'test'` |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Wideo screencastu dla każdego testu, zachowywane zgodnie z podaną polityką i dołączane bezpośrednio do Allure (`video/webm`). Wymaga `mode: 'trace'` + `traceGranularity: 'test'` |
| `emitArtifactsManifest` | `boolean` | `false` | Zapisuje `devtools-artifacts-<sessionId>.json` — ogólny indeks wszystkich wygenerowanych artefaktów wraz ze stanem każdego testu, dla reporterów/CI. Włączane automatycznie, gdy `@wdio/allure-reporter` znajduje się w konfiguracji. Ma zastosowanie tylko przy `mode: 'trace'` |
| `captureAssertions` | `boolean` | `true` | Przechwytuje asercje jako wiersze akcji w trace — `node:assert` oraz przechodzące/nieprzechodzące matchery `expect(...)`. Ustaw `false`, aby zrezygnować |

## Pierwsze kroki

1. Uruchom swoje testy WebdriverIO
2. Interfejs DevTools automatycznie otworzy się w zewnętrznym oknie przeglądarki
3. Testy zaczną się wykonywać natychmiast z wizualizacją w czasie rzeczywistym
4. Obserwuj podgląd przeglądarki na żywo, postęp testów i wykonywanie komend
5. Po zakończeniu pierwszego uruchomienia użyj przycisków odtwarzania, aby ponownie uruchomić poszczególne testy lub zestawy
6. Kliknij przycisk stop w dowolnym momencie, aby przerwać uruchomione testy
7. Przeglądaj akcje, metadane, logi konsoli i kod źródłowy w zakładkach obszaru roboczego

## Funkcje

Poznaj szczegółowo funkcje WebDriverIO DevTools:

- **[Interaktywne ponowne uruchamianie testów i wizualizacja](/docs/devtools/wdio/interactive-test-rerunning)** - Podgląd przeglądarki w czasie rzeczywistym z możliwością ponownego uruchamiania testów
- **[Zachowaj i uruchom ponownie (porównanie)](/docs/devtools/wdio/preserve-and-rerun)** - Zapisz migawkę nieudanego testu, uruchom go ponownie i porównaj oba przebiegi obok siebie
- **[Obsługa wielu frameworków](/docs/devtools/wdio/multi-framework-support)** - Działa z Mocha, Jasmine i Cucumber
- **[Logi konsoli](/docs/devtools/wdio/console-logs)** - Przechwytuj i analizuj wyjście konsoli przeglądarki
- **[Logi sieciowe](/docs/devtools/wdio/network-logs)** - Monitoruj wywołania API i aktywność sieciową
- **[Metadane](/docs/devtools/wdio/metadata)** - Capabilities sesji, środowisko i czasy dla każdej sesji przeglądarki
- **[TestLens](/docs/devtools/wdio/testlens)** - Przechodź do kodu źródłowego dzięki inteligentnej nawigacji po kodzie
- **[Screencast sesji](/docs/devtools/wdio/screencast)** - Automatyczne nagrywanie wideo sesji przeglądarki
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Bezgłowa ścieżka przechwytywania tworząca przenośny artefakt `trace.zip` (bez okna interfejsu); obsługuje formaty wyjściowe `zip` i `ndjson-directory`, granularność na sesję/spec/test, polityki przechowywania uwzględniające ponowienia oraz opcjonalny gęsty `filmstrip`, wszystko do obejrzenia w oficjalnym odtwarzaczu `show-trace`

## Odtwarzacz trace

Trace nagrany z `mode: 'trace'` otwiera się w oficjalnym odtwarzaczu `show-trace` (`npx show-trace path/to/trace.zip`) — podróż w czasie po DOM, zakładka A11y i nakładka elementu pick-locator, zakładka Transcript z funkcją Copy-for-LLM, zakładki Errors / Console / Network / Source oraz przewijalna oś czasu (gęsty filmstrip, zagnieżdżenie Cucumber Feature → Scenario → Step).

Zobacz stronę **[Odtwarzacz trace](/docs/devtools/trace-player)**, aby zapoznać się z pełnym omówieniem i innymi kompatybilnymi przeglądarkami.

## Raportowanie Allure

Gdy `@wdio/allure-reporter` znajduje się w konfiguracji, artefakty trybu trace (plik zip trace'a oraz zrzut ekranu i wideo dla każdego testu przy `traceGranularity: 'test'`) są automatycznie dołączane do raportu Allure, a `emitArtifactsManifest` jest włączane automatycznie.

Zobacz **[Integracja z Allure](/docs/devtools/allure)**, aby poznać szczegóły dotyczące załączników oraz opcje wyciszania kroków reportera.