---
id: reference
title: Dokumentacja konfiguracji
description: "Sprawdź wszystkie opcje DevTools dla trybu live i trybu trace w adapterach WebdriverIO, Selenium i Nightwatch, wraz z wartościami domyślnymi."
---

Wszystkie opcje DevTools w jednym miejscu, dla wszystkich trzech adapterów. **Nazwy, typy i wartości domyślne** opcji są **identyczne** w każdym adapterze; tam, gdzie zachowanie się różni, zostało to zaznaczone. Pełne objaśnienie każdej opcji trybu trace znajdziesz w podlinkowanej sekcji na stronie [Trace Mode](/docs/devtools/wdio/trace-mode).

Przekazuj opcje w sposób, w jaki przyjmuje je dany adapter:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## Opcje trybu i trybu live

| Opcja | Typ / wartości | Domyślnie | Uwagi |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | `'live'` otwiera panel interfejsu DevTools; `'trace'` go pomija i zapisuje przenośny artefakt. Oba tryby wzajemnie się wykluczają. |
| `port` | `number` | losowy | Port, na którym nasłuchuje interfejs / backend DevTools. Tylko tryb live. |
| `hostname` | `string` | `'localhost'` | Nazwa hosta, na której nasłuchuje serwer. Tylko tryb live. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Ciągłe nagranie wideo sesji (`.webm`). Tylko tryb live — w trybie trace użyj `video`. Zobacz [Screencast](/docs/devtools/wdio/screencast). |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | Capabilities używane do otwarcia okna interfejsu DevTools. WebdriverIO, tylko tryb live. |

## Opcje trybu trace

Mają zastosowanie tylko przy `mode: 'trace'`.

| Opcja | Typ / wartości | Domyślnie | Szczegóły |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Pojedyncze archiwum lub rozpakowany katalog. [Output format](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Jeden trace na sesję / plik spec / test. Wartość `'test'` jest wymagana dla zrzutów ekranu/wideo per test oraz dołączania inline do Allure. [Trace granularity](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Które trace'y zachować. Używane razem z `traceGranularity: 'test'`. [Retention](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | Gęsty, ciągły screencast zapisywany w trace dla płynnego przewijania; `false` rejestruje jedną klatkę na akcję. [Dense filmstrip](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Zrzut ekranu per test (wymaga `traceGranularity: 'test'`). Opcja serwisu WebdriverIO. [Per-test screenshot & video](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | Fragment wideo per test (wymaga `traceGranularity: 'test'`). Opcja serwisu WebdriverIO. [Per-test screenshot & video](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | Zapisuje `devtools-artifacts-<sessionId>.json`. Włączane automatycznie po wykryciu reportera Allure (w Nightwatch wymaga ręcznego włączenia). [Artifacts manifest](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | Rejestruje `node:assert` (oraz matchery `expect` frameworka, jeśli są obsługiwane) jako akcje w trace. [Assertions](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## Tylko Nightwatch

| Opcja | Typ / wartości | Domyślnie | Uwagi |
|---|---|---|---|
| `bidi` | `boolean` | `false` | Włącza przechwytywanie WebDriver BiDi (konsola + wyjątki JS + sieć). Wymaga `webSocketUrl: true` w capabilities. W WebdriverIO i Selenium BiDi jest dołączane automatycznie. Zobacz [Nightwatch → BiDi capture](/docs/devtools/nightwatch#bidi-capture-opt-in). |

## Różnice między adapterami

Niektóre możliwości trybu trace działają w ograniczonym zakresie w niektórych adapterach — pełny obraz znajdziesz w [macierzy wsparcia dla różnych frameworków](/docs/devtools/cross-framework). Najważniejsze z nich:

- **Retencja uwzględniająca ponowienia w Nightwatch** — niezawodnie działa tylko `retain-on-failure`; pozostałe wartości `tracePolicy` są do niej sprowadzane.
- **Nightwatch BDD `describe/it`** — `traceGranularity: 'test'` jest sprowadzane do jednego fragmentu obejmującego całą sesję.
- **Dołączanie do Allure w Nightwatch** — `screenshot`/`video` per test są jedynie generowane (pliki + manifest), a nie dołączane inline.