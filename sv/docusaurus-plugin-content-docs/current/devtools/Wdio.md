---
id: wdio
title: WebDriverIO DevTools
description: "Installera och konfigurera WebdriverIO DevTools-tjänsten för att felsöka tester med DOM-uppspelning, skärmdumpar, nätverks- och konsolinsamling samt skärminspelningar."
---

En WebdriverIO-tjänst som tillhandahåller ett utvecklarverktygsgränssnitt för att köra, felsöka och inspektera tester för webbläsarautomatisering. Funktionerna inkluderar uppspelning av DOM-mutationer, skärmdumpar per kommando, inspektion av nätverksförfrågningar, insamling av konsolloggar och skärminspelning av sessioner.

## Installation

```sh
npm install @wdio/devtools-service --save-dev
```

## Användning

### Testkörare

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

### Fristående

```ts
import { remote } from 'webdriverio'
import { setupForDevtools } from '@wdio/devtools-service'

const browser = await remote(setupForDevtools({
  capabilities: { browserName: 'chrome' }
}))
await browser.url('https://example.com')
await browser.deleteSession()
```

## Tjänstealternativ

```ts
services: [['devtools', options]]
```

| Alternativ | Typ | Standard | Beskrivning |
|---|---|---|---|
| `port` | `number` | slumpmässig | Port som DevTools UI-servern lyssnar på |
| `hostname` | `string` | `'localhost'` | Värdnamn som DevTools UI-servern binder till |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600x1200 | Capabilities som används för att öppna DevTools UI-fönstret |
| `screencast` | `ScreencastOptions` | - | Videoinspelning av sessionen ([se Screencast](/docs/devtools/wdio/screencast)) |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` öppnar DevTools-gränssnittet; `trace` hoppar över det och skriver istället en portabel artefakt ([se Trace Mode](/docs/devtools/wdio/trace-mode)) |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Layout för trace-artefakten — ett enda arkiv eller en uppackad katalog. Gäller endast när `mode: 'trace'` |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | En trace per session / spec-fil / test. `'test'` skriver var och en till `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Gäller endast när `mode: 'trace'` ([se Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Vilka traces som ska behållas. Används tillsammans med `traceGranularity: 'test'`. Gäller endast när `mode: 'trace'` |
| `filmstrip` | `boolean` | `true` | Spelar in en tät, kontinuerlig filmremsa av skärminspelningen *i* tracen för smidig, skrubbningsbar uppspelning i spelaren — täta bildrutor vid sidan av bildrutorna per åtgärd, glesade och innehållsadresserade vid export. Gäller endast när `mode: 'trace'` |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Skärmdump per test, bifogad inline i Allure (`image/png`). Kräver `mode: 'trace'` + `traceGranularity: 'test'` |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Skärminspelningsvideo per test, behållen enligt angiven policy och bifogad inline i Allure (`video/webm`). Kräver `mode: 'trace'` + `traceGranularity: 'test'` |
| `emitArtifactsManifest` | `boolean` | `false` | Skriver `devtools-artifacts-<sessionId>.json` — ett generiskt index över varje producerad artefakt samt varje tests status, för rapportörer/CI. Aktiveras automatiskt när `@wdio/allure-reporter` finns i konfigurationen. Gäller endast när `mode: 'trace'` |
| `captureAssertions` | `boolean` | `true` | Fånga assertions som åtgärdsrader i tracen — `node:assert` samt godkända/misslyckade `expect(...)`-matchare. Ange `false` för att avstå |

## Kom igång

1. Kör dina WebdriverIO-tester
2. DevTools-gränssnittet öppnas automatiskt i ett externt webbläsarfönster
3. Testerna börjar köras omedelbart med visualisering i realtid
4. Se live-förhandsvisning av webbläsaren, testförlopp och kommandokörning
5. När den första körningen är klar kan du använda uppspelningsknapparna för att köra om enskilda tester eller sviter
6. Klicka på stoppknappen när som helst för att avbryta pågående tester
7. Utforska åtgärder, metadata, konsolloggar och källkod i flikarna i arbetsytan

## Funktioner

Utforska funktionerna i WebDriverIO DevTools i detalj:

- **[Interaktiv omkörning och visualisering av tester](/docs/devtools/wdio/interactive-test-rerunning)** - Förhandsvisningar av webbläsaren i realtid med omkörning av tester
- **[Bevara och kör om (Jämför)](/docs/devtools/wdio/preserve-and-rerun)** - Ta en ögonblicksbild av ett misslyckat test, kör om det och jämför de två körningarna sida vid sida
- **[Stöd för flera ramverk](/docs/devtools/wdio/multi-framework-support)** - Fungerar med Mocha, Jasmine och Cucumber
- **[Konsolloggar](/docs/devtools/wdio/console-logs)** - Fånga och inspektera webbläsarens konsolutdata
- **[Nätverksloggar](/docs/devtools/wdio/network-logs)** - Övervaka API-anrop och nätverksaktivitet
- **[Metadata](/docs/devtools/wdio/metadata)** - Sessionens capabilities, miljö och tidsåtgång per webbläsarsession
- **[TestLens](/docs/devtools/wdio/testlens)** - Navigera till källkoden med intelligent kodnavigering
- **[Skärminspelning av sessioner](/docs/devtools/wdio/screencast)** - Automatisk videoinspelning av webbläsarsessioner
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Headless insamlingsväg som producerar en portabel `trace.zip`-artefakt (inget UI-fönster); stöder utdataformaten `zip` och `ndjson-directory`, granularitet per session/spec/test, retry-medvetna lagringspolicyer och en valfri tät `filmstrip`, allt visningsbart i förstapartsspelaren `show-trace`

## Trace-spelare

En trace som spelats in med `mode: 'trace'` öppnas i förstapartsspelaren `show-trace` (`npx show-trace path/to/trace.zip`) — tidsresor i DOM:en, fliken A11y och elementöverlägget för att välja locatorer, fliken Transcript med Copy-for-LLM, flikarna Errors / Console / Network / Source samt en skrubbningsbar tidslinje (tät filmremsa, Cucumber-nästling Feature → Scenario → Step).

Se sidan **[Trace-spelare](/docs/devtools/trace-player)** för en fullständig genomgång och andra kompatibla visare.

## Allure-rapportering

Med `@wdio/allure-reporter` i konfigurationen bifogas trace-artefakter (trace-zip-filen samt skärmdumpen och videon per test vid `traceGranularity: 'test'`) automatiskt i Allure-rapporten, och `emitArtifactsManifest` aktiveras automatiskt.

Se **[Allure-integration](/docs/devtools/allure)** för detaljer om bilagorna och rapportörens alternativ för att tysta steg.