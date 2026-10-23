---
id: reference
title: Konfigurationsreferenz
description: "Alle DevTools-Optionen für den Live-Modus und den Trace-Modus in den Adaptern für WebdriverIO, Selenium und Nightwatch nachschlagen, inklusive Standardwerten."
---

Alle DevTools-Optionen auf einen Blick, für alle drei Adapter. Gemeinsame Optionen haben auf jedem Adapter dieselben **Namen, Typen und Standardwerte**; wo sich Verhalten oder Verfügbarkeit unterscheiden, ist dies vermerkt, und adapterspezifische Optionen werden separat aufgeführt. Der Python-Adapter nimmt kein Optionsobjekt entgegen; siehe die Python-Tabs auf der Seite [Selenium](/docs/devtools/selenium#configuration-options). Die vollständige Erklärung jeder Trace-Option findest du im jeweils verlinkten Abschnitt auf der Seite [Trace Mode](/docs/devtools/wdio/trace-mode).

Übergib die Optionen so, wie der jeweilige Adapter sie erwartet:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## Modus- & Live-Modus-Optionen

| Option | Typ / Werte | Standard | Hinweise |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | `'live'` öffnet das DevTools-UI-Dashboard; `'trace'` überspringt es und schreibt ein portables Artefakt. Beide schließen sich gegenseitig aus. |
| `port` | `number` | `3000` (ist er belegt, wird ein freier Port verwendet) | Port, an den sich die DevTools-UI / das Backend bindet. Nur im Live-Modus. |
| `hostname` | `string` | `'localhost'` | Hostname, an den sich der Server bindet. Nur im Live-Modus. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Fortlaufendes Sitzungsvideo (`.webm`). Nur im Live-Modus — im Trace-Modus `video` verwenden. Enthält `maxBufferFrames` (Standard `2000`), die Obergrenze für im Speicher gehaltene Frames. Siehe [Screencast](/docs/devtools/wdio/screencast). |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | Capabilities, mit denen das DevTools-UI-Fenster geöffnet wird. WebdriverIO, nur im Live-Modus. |

## Trace-Modus-Optionen

Gelten nur bei `mode: 'trace'`.

| Option | Typ / Werte | Standard | Details |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Einzelnes Archiv vs. entpacktes Verzeichnis. [Output format](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Ein Trace pro Sitzung / Spec-Datei / Test. `'test'` ist für Screenshots/Videos pro Test und das Inline-Anhängen an Allure erforderlich. [Trace granularity](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Welche Traces behalten werden. Wird mit `traceGranularity: 'test'` kombiniert. [Retention](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | Dichter, fortlaufender Screencast im Trace für flüssiges Scrubbing; `false` zeichnet einen Frame pro Aktion auf. Wird beim Export ausgedünnt auf Frames im Abstand von mindestens 100 ms, höchstens etwa 600. [Dense filmstrip](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Screenshot pro Test (erfordert `traceGranularity: 'test'`). Wird bei WebdriverIO und Selenium inline an Allure angehängt; bei Nightwatch nur erzeugt. [Per-test screenshot & video](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | Videoausschnitt pro Test (erfordert `traceGranularity: 'test'`; für die Kodierung muss `ffmpeg` im `PATH` sein). Wird bei WebdriverIO und Selenium inline an Allure angehängt; bei Nightwatch nur erzeugt. [Per-test screenshot & video](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | Schreibt `devtools-artifacts-<sessionId>.json`. Wird automatisch aktiviert, wenn ein Allure-Reporter erkannt wird (bei Nightwatch per Opt-in). [Artifacts manifest](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | Erfasst `node:assert` (und, wo unterstützt, `expect`-Matcher des Frameworks) als Trace-Aktionen. [Assertions](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## Nur Selenium (Node.js)

| Option | Typ / Werte | Standard | Hinweise |
|---|---|---|---|
| `openUi` | `boolean` | `true` | Öffnet das Dashboard-Fenster automatisch. Für CI auf `false` setzen. |
| `headless` | `boolean` | `false` | Führt den Testbrowser headless aus (`--headless=old`). Das Dashboard-Fenster ist davon nicht betroffen. |
| `rerunCommand` | `string` | automatisch | Befehlsvorlage für die erneute Ausführung eines einzelnen Tests; `{{testName}}` wird ersetzt. Wird aus den argv des Runners abgeleitet, wenn nicht angegeben. |

## Nur Nightwatch

| Option | Typ / Werte | Standard | Hinweise |
|---|---|---|---|
| `bidi` | `boolean` | `false` | Aktiviert die Erfassung über WebDriver BiDi (Konsole + JS-Exceptions + Netzwerk). Erfordert `webSocketUrl: true` in den Capabilities. Bei WebdriverIO und Selenium wird BiDi automatisch angebunden. Siehe [Nightwatch → BiDi capture](/docs/devtools/nightwatch#bidi-capture-opt-in). |

## Unterschiede zwischen den Adaptern

Einige Trace-Funktionen sind auf bestimmten Adaptern eingeschränkt — das vollständige Bild zeigt die [frameworkübergreifende Support-Matrix](/docs/devtools/cross-framework). Die wichtigsten:

- **Retry-bewusste Aufbewahrung bei Nightwatch** — nur `retain-on-failure` ist zuverlässig; andere `tracePolicy`-Werte fallen darauf zurück.
- **Nightwatch BDD `describe/it`** — `traceGranularity: 'test'` fällt auf einen einzigen sitzungsbezogenen Ausschnitt zusammen.
- **Allure-Anhänge bei Nightwatch** — `screenshot`/`video` pro Test werden nur erzeugt (Dateien + Manifest), aber nicht inline angehängt.