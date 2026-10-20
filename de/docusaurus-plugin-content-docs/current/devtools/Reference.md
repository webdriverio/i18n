---
id: reference
title: Konfigurationsreferenz
description: "Alle DevTools-Optionen für den Live-Modus und den Trace-Modus in den Adaptern für WebdriverIO, Selenium und Nightwatch nachschlagen, inklusive Standardwerten."
---

Alle DevTools-Optionen auf einen Blick, für alle drei Adapter. Option **Namen, Typen und Standardwerte sind identisch** in jedem Adapter; wo sich das Verhalten unterscheidet, ist es vermerkt. Die vollständige Erklärung jeder Trace-Option finden Sie im verlinkten Abschnitt auf der Seite [Trace-Modus](/docs/devtools/wdio/trace-mode).

Übergeben Sie die Optionen so, wie es der jeweilige Adapter erwartet:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## Modus- & Live-Modus-Optionen

| Option | Typ / Werte | Standard | Hinweise |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | `'live'` öffnet das DevTools-UI-Dashboard; `'trace'` überspringt es und schreibt ein portables Artefakt. Beide schließen sich gegenseitig aus. |
| `port` | `number` | zufällig | Port, an den sich die DevTools-UI bzw. das Backend bindet. Nur im Live-Modus. |
| `hostname` | `string` | `'localhost'` | Hostname, an den sich der Server bindet. Nur im Live-Modus. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Fortlaufendes Sitzungsvideo (`.webm`). Nur im Live-Modus — im Trace-Modus verwenden Sie `video`. Siehe [Screencast](/docs/devtools/wdio/screencast). |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | Capabilities, die zum Öffnen des DevTools-UI-Fensters verwendet werden. WebdriverIO, nur im Live-Modus. |

## Trace-Modus-Optionen

Gelten nur bei `mode: 'trace'`.

| Option | Typ / Werte | Standard | Details |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Einzelnes Archiv vs. entpacktes Verzeichnis. [Ausgabeformat](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Ein Trace pro Sitzung / Spec-Datei / Test. `'test'` ist erforderlich für Screenshots/Videos pro Test und das Inline-Anhängen an Allure. [Trace-Granularität](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Welche Traces behalten werden. Wird mit `traceGranularity: 'test'` kombiniert. [Aufbewahrung](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | Dichter, fortlaufender Screencast im Trace für flüssiges Scrubbing; `false` zeichnet einen Frame pro Aktion auf. [Dichter Filmstreifen](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Screenshot pro Test (erfordert `traceGranularity: 'test'`). Service-Option von WebdriverIO. [Screenshot & Video pro Test](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | Videoausschnitt pro Test (erfordert `traceGranularity: 'test'`). Service-Option von WebdriverIO. [Screenshot & Video pro Test](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | Schreibt `devtools-artifacts-<sessionId>.json`. Wird automatisch aktiviert, wenn ein Allure-Reporter erkannt wird (bei Nightwatch per Opt-in). [Artefakt-Manifest](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | Erfasst `node:assert` (und, wo unterstützt, `expect`-Matcher des Frameworks) als Trace-Aktionen. [Assertions](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## Nur Nightwatch

| Option | Typ / Werte | Standard | Hinweise |
|---|---|---|---|
| `bidi` | `boolean` | `false` | Aktiviert die Erfassung über WebDriver BiDi (Konsole + JS-Exceptions + Netzwerk). Erfordert `webSocketUrl: true` in den Capabilities. Bei WebdriverIO und Selenium wird BiDi automatisch angebunden. Siehe [Nightwatch → BiDi-Erfassung](/docs/devtools/nightwatch#bidi-capture-opt-in). |

## Unterschiede zwischen den Adaptern

Einige Trace-Funktionen sind bei bestimmten Adaptern eingeschränkt — das vollständige Bild finden Sie in der [frameworkübergreifenden Support-Matrix](/docs/devtools/cross-framework). Die wichtigsten:

- **Retry-bewusste Aufbewahrung bei Nightwatch** — nur `retain-on-failure` ist zuverlässig; andere `tracePolicy`-Werte fallen darauf zurück.
- **Nightwatch BDD `describe/it`** — `traceGranularity: 'test'` wird zu einem einzigen sitzungsbezogenen Ausschnitt zusammengefasst.
- **Allure-Anhänge bei Nightwatch** — `screenshot`/`video` pro Test werden nur erzeugt (Dateien + Manifest), aber nicht inline angehängt.