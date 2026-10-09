---
id: reference
title: Konfigurationsreferens
description: "Slå upp alla DevTools-alternativ för live-läge och trace-läge i adaptrarna för WebdriverIO, Selenium och Nightwatch, med standardvärden."
---

Alla DevTools-alternativ i en överblick, för alla tre adaptrar. Alternativens **namn, typer och standardvärden är identiska** i varje adapter; där beteendet skiljer sig åt anges det. För en fullständig förklaring av varje trace-alternativ, se det länkade avsnittet på sidan [Trace Mode](/docs/devtools/wdio/trace-mode).

Skicka alternativen på det sätt som respektive adapter tar emot dem:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## Läges- och live-lägesalternativ

| Alternativ | Typ / värden | Standard | Anteckningar |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | `'live'` öppnar DevTools UI-dashboarden; `'trace'` hoppar över den och skriver en portabel artefakt. De två utesluter varandra. |
| `port` | `number` | slumpmässig | Port som DevTools UI / backend binder till. Endast live-läge. |
| `hostname` | `string` | `'localhost'` | Värdnamn som servern binder till. Endast live-läge. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Kontinuerlig sessionsvideo (`.webm`). Endast live-läge — för trace-läge, använd `video`. Se [Screencast](/docs/devtools/wdio/screencast). |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | Capabilities som används för att öppna DevTools UI-fönstret. WebdriverIO, endast live-läge. |

## Trace-lägesalternativ

Gäller endast när `mode: 'trace'`.

| Alternativ | Typ / värden | Standard | Detaljer |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Ett enda arkiv eller en uppackad katalog. [Output format](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | En trace per session / spec-fil / test. `'test'` krävs för skärmbild/video per test och inline-bifogning i Allure. [Trace granularity](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Vilka traces som ska behållas. Kombineras med `traceGranularity: 'test'`. [Retention](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | Tät, kontinuerlig screencast i tracen för smidig bläddring; `false` spelar in en bildruta per åtgärd. [Dense filmstrip](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Skärmbild per test (kräver `traceGranularity: 'test'`). Tjänstealternativ i WebdriverIO. [Per-test screenshot & video](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | Videosegment per test (kräver `traceGranularity: 'test'`). Tjänstealternativ i WebdriverIO. [Per-test screenshot & video](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | Skriver `devtools-artifacts-<sessionId>.json`. Aktiveras automatiskt när en Allure-reporter upptäcks (opt-in i Nightwatch). [Artifacts manifest](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | Fångar `node:assert` (och ramverkets `expect`-matchers där det stöds) som trace-åtgärder. [Assertions](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## Endast Nightwatch

| Alternativ | Typ / värden | Standard | Anteckningar |
|---|---|---|---|
| `bidi` | `boolean` | `false` | Aktivera WebDriver BiDi-insamling (konsol + JS-undantag + nätverk). Kräver `webSocketUrl: true` i capabilities. I WebdriverIO och Selenium kopplas BiDi in automatiskt. Se [Nightwatch → BiDi capture](/docs/devtools/nightwatch#bidi-capture-opt-in). |

## Skillnader mellan adaptrar

Vissa trace-funktioner fungerar sämre i vissa adaptrar — se [supportmatrisen för olika ramverk](/docs/devtools/cross-framework) för hela bilden. De viktigaste:

- **Retry-medveten retention i Nightwatch** — endast `retain-on-failure` är tillförlitlig; andra `tracePolicy`-värden faller tillbaka till den.
- **Nightwatch BDD `describe/it`** — `traceGranularity: 'test'` slås ihop till ett enda sessionsomfattande segment.
- **Allure-bifogning i Nightwatch** — `screenshot`/`video` per test produceras endast (filer + manifest) och bifogas inte inline.