---
id: nightwatch
title: Nightwatch DevTools
description: "Fügen Sie die DevTools-Debugging-Oberfläche zu einer Nightwatch-Testsuite hinzu, ohne Tests zu ändern, und konfigurieren Sie Screencasts, BiDi-Erfassung und den Trace-Modus."
---

Nightwatch-Adapter für [WebdriverIO DevTools](https://github.com/webdriverio/devtools) – bringt dieselbe visuelle Debugging-Oberfläche in Ihre Nightwatch-Testsuite, ohne dass Änderungen am Testcode nötig sind.

## Installation

```bash
npm install @wdio/nightwatch-devtools
```

## Einrichtung

### Standard-Nightwatch (Mocha-Stil)

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Erforderlich für die Erfassung von Netzwerkanfragen
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Führen Sie Ihre Tests wie gewohnt aus – die DevTools-Oberfläche öffnet sich automatisch in einem neuen Browserfenster:

```bash
nightwatch
```

> Es sind keine Änderungen an Ihren Testdateien erforderlich.

### Cucumber / BDD

Importieren Sie `cucumberHooksPath` zusätzlich zum Haupt-Export und übergeben Sie es an die Cucumber-Option `require`. Dadurch werden `Before`- / `After`-Szenario-Hooks registriert, die das Verhalten von `beforeScenario` / `afterScenario` des WebdriverIO-Service nachbilden.

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
      require: [cucumberHooksPath] // <-- DevTools-Cucumber-Hooks registrieren
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

## Konfigurationsoptionen

| Option | Typ | Standard | Beschreibung |
|--------|------|---------|-------------|
| `port` | `number` | `3000` | Port für den DevTools-Backend-Server. Wird automatisch erhöht, wenn er bereits belegt ist. |
| `hostname` | `string` | `'localhost'` | Hostname, an den sich der Backend-Server bindet. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | `.webm`-Videoaufzeichnung pro Session. Siehe [Screencast](#screencast) unten. |
| `bidi` | `boolean` | `false` | Aktiviert die WebDriver-BiDi-Erfassung für Browserkonsole, JS-Exceptions und Netzwerk. Erfordert `webSocketUrl: true` in Ihren Capabilities und einen BiDi-fähigen chromedriver. Wenn BiDi verbunden ist, wird der Netzwerkpfad über das Chrome-Performance-Log pro Befehl deaktiviert, damit Anfragen nicht doppelt erscheinen. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` öffnet die DevTools-Oberfläche; `trace` überspringt sie und schreibt stattdessen ein portables Artefakt. Siehe [Trace-Modus](/docs/devtools/wdio/trace-mode). |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Layout des Trace-Artefakts. Gilt nur bei `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Ein Trace pro Session / Spec-Datei / Test. `'test'` schreibt jeden nach `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Gilt nur bei `mode: 'trace'`. Siehe [Trace-Modus](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). **Einschränkung:** Die BDD-Schnittstelle `describe/it` fällt auf einen einzigen sessionbezogenen Abschnitt zurück (siehe [Aufteilung pro Test](#per-test-slicing--the-bdd-describeit-caveat)). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Welche Traces behalten werden. Wird mit `traceGranularity: 'test'` kombiniert. Gilt nur bei `mode: 'trace'`. |
| `filmstrip` | `boolean` | `true` | Zeichnet einen dichten, kontinuierlichen Screencast-Filmstreifen in den Trace auf, der im Trace-Player durchgespult werden kann – nicht nur ein Frame pro Aktion. Führt den Screencast-Recorder (bei Nightwatch im Polling-Modus) für die Session aus. Gilt nur bei `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Screenshot pro Test. Nur im Trace-Modus + `traceGranularity: 'test'`. **Nur Erzeugung** – das PNG wird in das Trace-Ausgabeverzeichnis geschrieben (und bei `emitArtifactsManifest: true` in das Manifest); es wird nicht inline an Allure angehängt (siehe Hinweis unten). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Videoabschnitt pro Test, aufbewahrt gemäß der angegebenen Richtlinie (z. B. `'retain-on-failure'`). Nur im Trace-Modus + `traceGranularity: 'test'`. Ein Wert ungleich `off` startet den Screencast-Recorder selbst – Sie benötigen **nicht** zusätzlich `filmstrip` oder `screencast.enabled`. **Nur Erzeugung** – die `.webm`-Datei wird in das Trace-Ausgabeverzeichnis geschrieben (und bei `emitArtifactsManifest: true` in das Manifest); sie wird nicht inline an Allure angehängt. |
| `emitArtifactsManifest` | `boolean` | `false` | Schreibt das Manifest `devtools-artifacts-<sessionId>.json` (den generischen Index, den Reporter/CI nutzen, um erzeugte Artefakte zu finden) neben den Trace. **Für Nightwatch Opt-in** – es gibt kein Live-Allure-Signal zur automatischen Erkennung, daher wird es anders als bei WDIO/Selenium nie automatisch aktiviert. Gilt nur bei `mode: 'trace'`. |
| `captureAssertions` | `boolean` | `true` | Erfasst Assertions als Aktionszeilen im Trace – `node:assert` sowie natives `browser.assert`/`browser.verify`, einschließlich negierter `.not.*`-Matcher. Setzen Sie `false`, um dies zu deaktivieren. |

> **Inline-Anhänge an Allure werden für Nightwatch nicht unterstützt.** Der offizielle `nightwatch-allure`-Reporter arbeitet nachträglich (keine Live-Attach-API), und `attachment()` aus `allure-js-commons` hat in einem Nightwatch-Lauf keine Wirkung. Daher werden `screenshot`- / `video`-Artefakte im Trace-Ausgabeverzeichnis *erzeugt* (Dateien sowie das Artefakt-Manifest bei `emitArtifactsManifest: true`), aber nicht an einen Allure-Test angehängt. Die Aufteilung pro Test – und damit diese Artefakte – ist für die Cucumber- und Exports-Object-Schnittstellen sinnvoll; die BDD-Schnittstelle `describe/it` fällt auf Session-Granularität zurück, sodass die Pro-Test-Steuerung dort keine Wirkung hat.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## Screencast

Zeichnen Sie ein kontinuierliches `.webm`-Video der Browser-Session auf. Die Aufzeichnung beginnt mit der ersten Session, die das Plugin erkennt, und wird im `after()`-Hook von Nightwatch abgeschlossen.

**Nur Polling-Modus.** Nightwatch bietet keinen stabilen CDP-Zugang, wie es WebdriverIO (`browser.getPuppeteer()`) und Selenium (`driver.createCDPConnection`) tun, daher erfasst der Screencast Frames, indem er `browser.takeScreenshot()` in einem festen Intervall aufruft. Funktioniert mit jedem Browser, den Nightwatch unterstützt.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| Option | Typ | Standard | Hinweise |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | Hauptschalter. |
| `pollIntervalMs` | `number` | `200` | Screenshot-Intervall (ms). Niedriger = flüssigeres Video, mehr WebDriver-Roundtrips. 200 ms ≈ 5 fps. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Pixelformat pro Frame, das vor dem finalen `.webm`-Mux an den ffmpeg-Encoder übergeben wird. Im Polling-Modus werden die Quell-Screenshots immer als PNG erfasst, daher ändert dies **nicht** die Erfassung – nur das Format, das der Encoder pro Frame erhält. |
| `maxWidth` / `maxHeight` / `quality` | - | - | Nur-CDP-Optionen, im Polling-Modus ignoriert. Aus Kompatibilitätsgründen mit den WDIO/Selenium-Adaptern aufgeführt. |

**Voraussetzungen:** `fluent-ffmpeg` (bereits eine Laufzeitabhängigkeit des Pakets) sowie die `ffmpeg`-Binärdatei im PATH. macOS: `brew install ffmpeg`. Linux: `apt install ffmpeg`. Ohne ffmpeg läuft der Recorder trotzdem, aber der Encode-Schritt gibt eine Warnung aus und überspringt das Schreiben der Datei.

**Ausgabe:** Die Videodatei wird neben die gerade ausgeführte Testdatei geschrieben (mit dem Verzeichnis von `nightwatch.conf.*` als Fallback und `process.cwd()` als letzte Option). Der vollständige Pfad erscheint in der Nightwatch-Logzeile `📹 Screencast video: <path>`, und das Video wird außerdem an den Screencast-Tab des Dashboards gestreamt.

Die vollständige Referenz zur Screencast-Funktion (Browserunterstützung, Ausgabepfade für alle drei Adapter) finden Sie auf der [Screencast-Seite](/docs/devtools/wdio/screencast).

## BiDi-Erfassung (Opt-in)

Aktivieren Sie die WebDriver-BiDi-Erfassung für Browser-Konsolenmeldungen, JS-Exceptions und Netzwerkanfragen. Entspricht dem Weg, den selenium-devtools nutzt – beide Adapter teilen sich dieselbe Attach-Logik in `@wdio/devtools-core`.

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

Sie benötigen außerdem `webSocketUrl: true` in Ihren Capabilities, damit chromedriver den BiDi-Kanal tatsächlich bereitstellt:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← aktiviert BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

Wenn BiDi verbunden ist, wird der Netzwerk-Erfassungspfad über das Chrome-Performance-Log pro Befehl deaktiviert, damit Anfragen nicht doppelt im Dashboard erscheinen. Fehlt `webSocketUrl` oder stellt die chromedriver-Version kein BiDi bereit, schlägt das Verbinden stillschweigend fehl, und der Perf-Log-Fallback funktioniert weiterhin.

## Trace-Modus

Headless-Erfassungspfad – es öffnet sich kein DevTools-UI-Fenster. Am Ende der Session schreibt der Adapter eine portable `trace-<sessionId>.zip` (oder ein Verzeichnis) in einen `test-results/`-Ordner (neben dem ermittelten Test- / Konfigurationsverzeichnis), mit derselben Struktur wie das WebdriverIO-Trace-Artefakt.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // optional; Standard 'zip'
})
```

### Granularität und Cucumber

`traceGranularity` legt fest, was ein Artefakt umfasst – `'session'` (Standard), `'spec'` oder `'test'`.

Nightwatch beendet den Browser nach jedem Cucumber-Szenario. Ein `'session'`-Trace umspannt dies: ein Zip für den gesamten Lauf, wobei jedes Szenario unter seinem Feature verschachtelt ist. `'test'` schreibt ein Zip pro Szenario in einen eigenen Ordner, was die Empfehlung für Cucumber ist – kleinere Artefakte und die Granularität, an der sich die `tracePolicy`-Aufbewahrung orientiert.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // ein Trace pro Cucumber-Szenario
})
```

Bei der BDD-Schnittstelle `describe/it` fällt `'test'` auf einen einzigen sessionbezogenen Abschnitt zurück: Nightwatch führt jedes `it()` intern aus und löst den Pro-Test-Hook des Plugins nur einmal pro Modul aus. Der Aktionsbaum zeigt jedes `it` dennoch als eigene Gruppe.

Port-Bindung des Backends, UI-Fenster und die Option `screencast` werden im Trace-Modus alle übersprungen. Die vollständige Funktionsreferenz (Artefaktinhalte, Viewer, mobiles Testen, wann `zip` und wann `ndjson-directory` zu wählen ist) finden Sie auf der [Trace-Modus-Seite](/docs/devtools/wdio/trace-mode).

Nightwatch nutzt dieselbe Trace-Pipeline wie die WebdriverIO- und Selenium-Adapter, sodass die Artefaktstruktur identisch ist, unabhängig davon, welcher Adapter sie erzeugt hat. Ein Nightwatch-Trace enthält die vollständige Erfassung pro Aktion – einen Screenshot, den eingerückten Accessibility-Tree-Snapshot, die Liste interagierbarer Elemente und das Markdown-Transkript – und öffnet sich daher im `show-trace`-Player mit DOM/Snapshot-Zeitreise, den Tabs **A11y** und **Transcript**, dem Pick-Locator-Element-Overlay und (für Cucumber) der Verschachtelung **Feature → Scenario → Step**.

Öffnen Sie einen Trace mit dem `show-trace`-Binary, das mit `@wdio/nightwatch-devtools` ausgeliefert wird (keine zusätzliche Abhängigkeit):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # in einem Projekt, das den Adapter installiert
pnpm show-trace test-results/trace-<sessionId>.zip  # aus dem devtools-Monorepo
```

Auf der Seite [Trace Player](/docs/devtools/trace-player) finden Sie die vollständige Anleitung und Tastenkürzel.

### Aufteilung pro Test & die Einschränkung bei BDD `describe/it`

Die Pro-Test-Optionen – `traceGranularity: 'test'` sowie die damit kombinierten Optionen `tracePolicy`, `screenshot` und `video` – benötigen einen Pro-Test-Hook, um den Abschnitt jedes Tests zu schneiden. Die **Exports-Object-Schnittstelle (Mocha-Stil)** und **Cucumber** (Hooks pro Szenario) stellen einen solchen bereit und erhalten daher eine echte Aufteilung pro Test. Die **BDD-Schnittstelle `describe/it`** ist die Ausnahme: Nightwatch führt jedes `it()` intern aus und löst den Pro-Test-Hook des Plugins nur einmal pro Modul aus, sodass `traceGranularity: 'test'` auf einen einzigen **sessionbezogenen** Abschnitt zurückfällt, der dem ersten Test zugeordnet ist. Das Artefakt-Manifest listet dennoch jeden Testfall mit seinem korrekten Status auf; nur die Zuordnung der Abschnitte/Artefakte pro Test fällt zusammen. Traces mit Session- und Spec-Granularität sind nicht betroffen.

## Beispiele

Funktionierende Beispiele befinden sich im Verzeichnis `examples/` auf oberster Ebene des Repos. Bauen Sie den Workspace einmal (`pnpm install && pnpm build`) und führen Sie dann vom Repo-Root aus:

| Verzeichnis | Runner | Befehl |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch Mocha-Stil | `pnpm demo:nightwatch` |

## Funktionen

Der Nightwatch-Adapter bietet dieselbe DevTools-UI-Erfahrung wie WebdriverIO. Jede der folgenden Funktionen wird mit der Basiskonfiguration `globals: nightwatchDevtools({ port: 3000 })` automatisch erfasst – ohne funktionsspezifische Konfiguration (Netzwerk-Logs benötigen zusätzlich `'goog:loggingPrefs': { performance: 'ALL' }`, siehe [Einrichtung](#setup)). Die Links führen zur vollständigen Referenz der jeweiligen Funktion.

- **[Interaktives erneutes Ausführen & Visualisierung von Tests](/docs/devtools/wdio/interactive-test-rerunning)** – Live-Browservorschauen, Screenshots pro Befehl und erneutes Ausführen von Tests/Suites mit einem Klick
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** – Snapshot eines fehlschlagenden Tests erstellen, ihn erneut ausführen und beide Läufe nebeneinander vergleichen
- **[Multi-Framework-Unterstützung](/docs/devtools/wdio/multi-framework-support)** – Standard- (Mocha-Stil) und Cucumber/BDD-Runner
- **[Konsolen-Logs](/docs/devtools/wdio/console-logs)** – Browser-Konsolenausgaben erfassen und untersuchen (in Echtzeit mit `bidi: true`)
- **[Netzwerk-Logs](/docs/devtools/wdio/network-logs)** – API-Aufrufe und Netzwerkaktivität überwachen
- **[Metadaten](/docs/devtools/wdio/metadata)** – Session-Capabilities, Umgebung und Timing pro Browser-Session
- **[TestLens](/docs/devtools/wdio/testlens)** – Von jedem Befehl zur Quellcodezeile springen, die ihn ausgelöst hat
- **[Session-Screencast](/docs/devtools/wdio/screencast)** – Kontinuierliche `.webm`-Aufzeichnung der Browser-Session
- **[Trace-Modus](/docs/devtools/wdio/trace-mode)** – Headless-Erfassung, die eine portable `trace.zip` erzeugt (kein UI-Fenster)

Screencast ist die einzige Funktion mit eigenen Optionen (vollständige Liste unter [Screencast](#screencast)):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## Einschränkungen

Nightwatch bietet nicht dieselbe Tiefe an Framework-Hooks wie WebdriverIO, daher gibt es einige Unterschiede zum WDIO-DevTools-Service:

| Einschränkung | Detail |
|-----------|--------|
| Keine nativen Befehls-Hooks | Nightwatch hat keinen `beforeCommand`- / `afterCommand`-Hook. Befehle werden stattdessen über einen Browser-Proxy-Wrapper abgefangen. |
| Eingeschränkter Testkontext | `browser.currentTest` liefert weniger Metadaten als der WDIO-Runner-Kontext; Testnamen und Dateipfade erfordern zusätzliche Heuristiken. |
| Flache Suite-Verschachtelung | Nightwatch unterstützt mehrfach verschachtelte `describe`-Blöcke nicht nativ; das Plugin meldet maximal zwei Ebenen. |
| Verzögerte Verfügbarkeit der Ergebnisse | Testergebnisse werden erst in `afterEach` finalisiert und sind während des Tests nicht verfügbar. |
| Screencast nur im Polling-Modus | Anders als WDIO (CDP-Push über `browser.getPuppeteer()`) und Selenium (CDP-Push über `driver.createCDPConnection`) fehlt Nightwatch ein stabiler CDP-Zugang, daher werden Frames durch Polling von `browser.takeScreenshot()` erfasst. Funktioniert mit jedem Browser, den Nightwatch unterstützt; geringe Kosten pro Frame proportional zum Polling-Intervall. |
| Trace-Aufteilung pro Test (BDD `describe/it`) | Die BDD-Schnittstelle löst den Pro-Test-Hook des Plugins einmal pro Modul aus, sodass `traceGranularity: 'test'` auf einen sessionbezogenen Abschnitt zurückfällt. Die Exports-Object- (Mocha-Stil) und Cucumber-Schnittstellen erhalten eine echte Aufteilung pro Test. Siehe [Aufteilung pro Test](#per-test-slicing--the-bdd-describeit-caveat). |
| Trace-Artefakte nur erzeugt | Pro-Test-Dateien für `screenshot` / `video` werden in das Trace-Ausgabeverzeichnis geschrieben (und bei `emitArtifactsManifest: true` in das Manifest), aber nicht inline an Allure angehängt – Nightwatch hat keine Live-Attach-API für Allure. |

Die gesamte Funktionsparität mit dem WebdriverIO-DevTools-Service liegt bei etwa **80–90 %**.