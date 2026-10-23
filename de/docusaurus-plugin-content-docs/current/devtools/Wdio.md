---
id: wdio
title: WebDriverIO DevTools
description: "Installieren und konfigurieren Sie den WebdriverIO DevTools-Service, um Tests mit DOM-Replay, Screenshots, Netzwerk- und Konsolenaufzeichnung sowie Screencasts zu debuggen."
---

Ein WebdriverIO-Service, der eine Entwicklertools-Oberfläche zum Ausführen, Debuggen und Untersuchen von Browser-Automatisierungstests bereitstellt. Zu den Funktionen gehören DOM-Mutations-Replay, Screenshots pro Befehl, Untersuchung von Netzwerkanfragen, Erfassung von Konsolenprotokollen und Screencast-Aufzeichnung von Sessions.

## Installation

```sh
npm install @wdio/devtools-service --save-dev
```

## Verwendung

### Test Runner

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

### Standalone

```ts
import { remote } from 'webdriverio'
import { setupForDevtools } from '@wdio/devtools-service'

const browser = await remote(setupForDevtools({
  capabilities: { browserName: 'chrome' }
}))
await browser.url('https://example.com')
await browser.deleteSession()
```

Erfordert eine Browser-Session mit WebDriver BiDi (Chrome 114+, Firefox 130+), das WebdriverIO automatisch aktiviert. Appium-Sessions überspringen die Seitenerfassung, die darauf angewiesen ist; setzen Sie `'wdio:enforceWebDriverClassic': true` in einem Appium-Capability-Block (siehe [Mobile Testing](/docs/devtools/mobile)).

## Service-Optionen

```ts
services: [['devtools', options]]
```

| Option | Typ | Standard | Beschreibung |
|---|---|---|---|
| `port` | `number` | `3000` (ein freier Port wird verwendet, falls dieser belegt ist) | Port, auf dem der DevTools-UI-Server lauscht |
| `hostname` | `string` | `'localhost'` | Hostname, an den der DevTools-UI-Server gebunden wird |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600x1200 | Capabilities, die zum Öffnen des DevTools-UI-Fensters verwendet werden |
| `screencast` | `ScreencastOptions` | - | Videoaufzeichnung der Session ([siehe Screencast](/docs/devtools/wdio/screencast)) |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` öffnet die DevTools-UI; `trace` überspringt sie und schreibt stattdessen ein portables Artefakt ([siehe Trace Mode](/docs/devtools/wdio/trace-mode)) |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Aufbau des Trace-Artefakts — einzelnes Archiv vs. entpacktes Verzeichnis. Gilt nur bei `mode: 'trace'` |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Ein Trace pro Session / Spec-Datei / Test. `'test'` schreibt jeden nach `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Gilt nur bei `mode: 'trace'` ([siehe Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Welche Traces behalten werden. Wird mit `traceGranularity: 'test'` kombiniert. Gilt nur bei `mode: 'trace'` |
| `filmstrip` | `boolean` | `true` | Zeichnet einen dichten, kontinuierlichen Screencast-Filmstreifen *in* den Trace auf, um im Player eine flüssige, scrubbare Wiedergabe zu ermöglichen — dichte Frames zusätzlich zu den Frames pro Aktion, beim Export ausgedünnt und inhaltsadressiert. Gilt nur bei `mode: 'trace'` |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Screenshot pro Test, inline an Allure angehängt (`image/png`). Erfordert `mode: 'trace'` + `traceGranularity: 'test'` |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Screencast-Video pro Test, gemäß der angegebenen Richtlinie aufbewahrt und inline an Allure angehängt (`video/webm`). Erfordert `mode: 'trace'` + `traceGranularity: 'test'` |
| `emitArtifactsManifest` | `boolean` | `false` | Schreibt `devtools-artifacts-<sessionId>.json` — einen generischen Index aller erzeugten Artefakte sowie des Zustands jedes Tests, für Reporter/CI. Wird automatisch aktiviert, wenn `@wdio/allure-reporter` in der Konfiguration enthalten ist. Gilt nur bei `mode: 'trace'` |
| `captureAssertions` | `boolean` | `true` | Erfasst Assertions als Trace-Aktionszeilen — `node:assert` sowie erfolgreiche/fehlgeschlagene `expect(...)`-Matcher. Auf `false` setzen, um dies zu deaktivieren |

## Laufzeit-Snapshot

Der Service fügt einen `browser.getSnapshot()`-Befehl hinzu, der einen KI-lesbaren Accessibility-Tree der aktuellen Seite (`text`) sowie eine `elements`-Map von kurzen Refs (`e1`, `e2`, …) auf Selektoren zurückgibt:

```ts
const { text, elements } = await browser.getSnapshot({ inViewportOnly: true })
```

Er liest die Live-Seite direkt aus, ohne den Overhead des Trace-Modus. Seine Locators verwenden immer portables CSS / XPath, sodass ein Text-Locator von dem WebdriverIO-Dialekt-Locator abweichen kann, den der A11y-Tab des Trace-Players anzeigt.

## Erste Schritte

1. Führen Sie Ihre WebdriverIO-Tests aus
2. Die DevTools-UI öffnet sich automatisch in einem externen Browserfenster
3. Die Tests werden sofort mit Echtzeit-Visualisierung ausgeführt
4. Sehen Sie sich die Live-Browservorschau, den Testfortschritt und die Befehlsausführung an
5. Nach Abschluss des ersten Durchlaufs können Sie mit den Play-Buttons einzelne Tests oder Suites erneut ausführen
6. Klicken Sie jederzeit auf den Stopp-Button, um laufende Tests zu beenden
7. Erkunden Sie Aktionen, Metadaten, Konsolenprotokolle und Quellcode in den Workbench-Tabs

## Funktionen

Entdecken Sie die Funktionen der WebDriverIO DevTools im Detail:

- **[Interactive Test Rerunning & Visualization](/docs/devtools/wdio/interactive-test-rerunning)** - Echtzeit-Browservorschauen mit erneuter Testausführung
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - Einen fehlschlagenden Test sichern, erneut ausführen und die beiden Durchläufe nebeneinander vergleichen
- **[Multi-Framework Support](/docs/devtools/wdio/multi-framework-support)** - Funktioniert mit Mocha, Jasmine und Cucumber
- **[Console Logs](/docs/devtools/wdio/console-logs)** - Browser-Konsolenausgaben erfassen und untersuchen
- **[Network Logs](/docs/devtools/wdio/network-logs)** - API-Aufrufe und Netzwerkaktivität überwachen
- **[Metadata](/docs/devtools/wdio/metadata)** - Session-Capabilities, Umgebung und Timing pro Browser-Session
- **[TestLens](/docs/devtools/wdio/testlens)** - Mit intelligenter Code-Navigation zum Quellcode springen
- **[Session Screencast](/docs/devtools/wdio/screencast)** - Automatische Videoaufzeichnung von Browser-Sessions
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Headless-Erfassungspfad, der ein portables `trace.zip`-Artefakt erzeugt (kein UI-Fenster); unterstützt die Ausgabeformate `zip` und `ndjson-directory`, Granularität pro Session/Spec/Test, Retry-bewusste Aufbewahrungsrichtlinien und einen optionalen dichten `filmstrip`, alles im hauseigenen `show-trace`-Player anzeigbar

## Trace Player

Ein mit `mode: 'trace'` aufgezeichneter Trace wird im hauseigenen `show-trace`-Player geöffnet (`npx show-trace path/to/trace.zip`) — DOM-Zeitreise, der A11y-Tab und das Pick-Locator-Element-Overlay, der Transcript-Tab mit Copy-for-LLM, die Tabs Errors / Console / Network / Source und eine scrubbare Zeitleiste (dichter Filmstreifen, Cucumber-Verschachtelung Scenario → Step).

Auf der Seite **[Trace Player](/docs/devtools/trace-player)** finden Sie die vollständige Anleitung sowie weitere kompatible Viewer.

## Allure Reporting

Ist `@wdio/allure-reporter` in der Konfiguration enthalten, werden Trace-Mode-Artefakte (das Trace-Zip sowie bei `traceGranularity: 'test'` der Screenshot und das Video pro Test) automatisch an den Allure-Report angehängt, und `emitArtifactsManifest` wird automatisch aktiviert.

Siehe **[Allure Integration](/docs/devtools/allure)** für Details zu den Anhängen und die Optionen zum Unterdrücken von Reporter-Schritten.