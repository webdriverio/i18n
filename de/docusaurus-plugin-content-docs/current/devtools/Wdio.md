---
id: wdio
title: WebDriverIO DevTools
description: "Installieren und konfigurieren Sie den WebdriverIO DevTools Service, um Tests mit DOM-Replay, Screenshots, Netzwerk- und Konsolenerfassung sowie Screencasts zu debuggen."
---

Ein WebdriverIO-Service, der eine Entwicklertools-Oberfläche zum Ausführen, Debuggen und Untersuchen von Browser-Automatisierungstests bereitstellt. Zu den Funktionen gehören DOM-Mutations-Replay, Screenshots pro Befehl, Untersuchung von Netzwerkanfragen, Erfassung von Konsolenlogs und Aufzeichnung von Session-Screencasts.

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

## Service-Optionen

```ts
services: [['devtools', options]]
```

| Option | Typ | Standard | Beschreibung |
|---|---|---|---|
| `port` | `number` | zufällig | Port, auf dem der DevTools-UI-Server lauscht |
| `hostname` | `string` | `'localhost'` | Hostname, an den sich der DevTools-UI-Server bindet |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600x1200 | Capabilities, die zum Öffnen des DevTools-UI-Fensters verwendet werden |
| `screencast` | `ScreencastOptions` | - | Videoaufzeichnung der Session ([siehe Screencast](/docs/devtools/wdio/screencast)) |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` öffnet die DevTools-UI; `trace` überspringt sie und schreibt stattdessen ein portables Artefakt ([siehe Trace Mode](/docs/devtools/wdio/trace-mode)) |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Aufbau des Trace-Artefakts — einzelnes Archiv vs. entpacktes Verzeichnis. Gilt nur bei `mode: 'trace'` |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Ein Trace pro Session / Spec-Datei / Test. `'test'` schreibt jeden nach `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Gilt nur bei `mode: 'trace'` ([siehe Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Welche Traces behalten werden. Wird mit `traceGranularity: 'test'` kombiniert. Gilt nur bei `mode: 'trace'` |
| `filmstrip` | `boolean` | `true` | Zeichnet einen dichten, kontinuierlichen Screencast-Filmstreifen *in* den Trace auf, für eine flüssige, durchsuchbare Wiedergabe im Player — dichte Frames zusätzlich zu den Frames pro Aktion, beim Export ausgedünnt und inhaltsadressiert. Gilt nur bei `mode: 'trace'` |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Screenshot pro Test, inline an Allure angehängt (`image/png`). Erfordert `mode: 'trace'` + `traceGranularity: 'test'` |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Screencast-Video pro Test, gemäß der angegebenen Richtlinie aufbewahrt und inline an Allure angehängt (`video/webm`). Erfordert `mode: 'trace'` + `traceGranularity: 'test'` |
| `emitArtifactsManifest` | `boolean` | `false` | Schreibt `devtools-artifacts-<sessionId>.json` — einen generischen Index aller erzeugten Artefakte sowie des Status jedes Tests, für Reporter/CI. Wird automatisch aktiviert, wenn `@wdio/allure-reporter` in der Konfiguration enthalten ist. Gilt nur bei `mode: 'trace'` |
| `captureAssertions` | `boolean` | `true` | Erfasst Assertions als Trace-Aktionszeilen — `node:assert` sowie erfolgreiche/fehlgeschlagene `expect(...)`-Matcher. Auf `false` setzen, um dies zu deaktivieren |

## Erste Schritte

1. Führen Sie Ihre WebdriverIO-Tests aus
2. Die DevTools-UI öffnet sich automatisch in einem externen Browserfenster
3. Die Tests beginnen sofort mit der Ausführung und werden in Echtzeit visualisiert
4. Sehen Sie sich die Live-Browservorschau, den Testfortschritt und die Befehlsausführung an
5. Nachdem der erste Durchlauf abgeschlossen ist, verwenden Sie die Play-Buttons, um einzelne Tests oder Suites erneut auszuführen
6. Klicken Sie jederzeit auf den Stopp-Button, um laufende Tests zu beenden
7. Erkunden Sie Aktionen, Metadaten, Konsolenlogs und Quellcode in den Workbench-Tabs

## Funktionen

Erkunden Sie die Funktionen von WebDriverIO DevTools im Detail:

- **[Interaktive erneute Testausführung & Visualisierung](/docs/devtools/wdio/interactive-test-rerunning)** - Browservorschauen in Echtzeit mit erneuter Testausführung
- **[Preserve & Rerun (Vergleichen)](/docs/devtools/wdio/preserve-and-rerun)** - Erstellen Sie einen Snapshot eines fehlschlagenden Tests, führen Sie ihn erneut aus und vergleichen Sie beide Durchläufe nebeneinander
- **[Multi-Framework-Unterstützung](/docs/devtools/wdio/multi-framework-support)** - Funktioniert mit Mocha, Jasmine und Cucumber
- **[Konsolenlogs](/docs/devtools/wdio/console-logs)** - Erfassen und untersuchen Sie die Ausgabe der Browserkonsole
- **[Netzwerklogs](/docs/devtools/wdio/network-logs)** - Überwachen Sie API-Aufrufe und Netzwerkaktivität
- **[Metadaten](/docs/devtools/wdio/metadata)** - Session-Capabilities, Umgebung und Timing pro Browser-Session
- **[TestLens](/docs/devtools/wdio/testlens)** - Navigieren Sie mit intelligenter Code-Navigation zum Quellcode
- **[Session-Screencast](/docs/devtools/wdio/screencast)** - Automatische Videoaufzeichnung von Browser-Sessions
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Headless-Erfassung, die ein portables `trace.zip`-Artefakt erzeugt (kein UI-Fenster); unterstützt die Ausgabeformate `zip` und `ndjson-directory`, Granularität pro Session/Spec/Test, retry-bewusste Aufbewahrungsrichtlinien und einen optionalen dichten `filmstrip`, alles im hauseigenen `show-trace`-Player anzeigbar

## Trace Player

Ein mit `mode: 'trace'` aufgezeichneter Trace wird im hauseigenen `show-trace`-Player geöffnet (`npx show-trace path/to/trace.zip`) — DOM-Zeitreise, der A11y-Tab und das Pick-Locator-Element-Overlay, der Transcript-Tab mit Copy-for-LLM, die Tabs Errors / Console / Network / Source sowie eine durchsuchbare Zeitleiste (dichter Filmstreifen, Cucumber-Verschachtelung Feature → Scenario → Step).

Siehe die Seite **[Trace Player](/docs/devtools/trace-player)** für die vollständige Anleitung und weitere kompatible Viewer.

## Allure-Reporting

Wenn `@wdio/allure-reporter` in der Konfiguration enthalten ist, werden Trace-Mode-Artefakte (das Trace-Zip sowie bei `traceGranularity: 'test'` der Screenshot und das Video pro Test) automatisch an den Allure-Report angehängt, und `emitArtifactsManifest` wird automatisch aktiviert.

Siehe **[Allure-Integration](/docs/devtools/allure)** für Details zu den Anhängen und den Optionen zum Stummschalten von Reporter-Schritten.