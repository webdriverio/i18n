---
id: nightwatch
title: Nightwatch DevTools
description: "Fügen Sie die DevTools-Debugging-Oberfläche zu einer Nightwatch-Testsuite hinzu, ohne Tests zu ändern, und konfigurieren Sie Screencasts, BiDi-Erfassung und Trace-Modus."
---

Nightwatch-Adapter für [WebdriverIO DevTools](https://github.com/webdriverio/devtools). Er bringt dieselbe visuelle Debugging-Oberfläche in Ihre Nightwatch-Testsuite, ohne dass Sie Testcode ändern müssen.

## Installation

```bash
npm install @wdio/nightwatch-devtools
```

Erfordert Nightwatch 3 oder höher. Für Cucumber muss `@cucumber/cucumber` in Ihrem Projekt installiert sein. Der Adapter verwendet Ihre Kopie, anstatt eine eigene mitzuliefern.

## Setup

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
        // Required for network request capture
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Führen Sie Ihre Tests wie gewohnt aus. Die DevTools-Oberfläche öffnet sich automatisch in einem neuen Browserfenster:

```bash
nightwatch
```

> Es sind keine Änderungen an Ihren Testdateien erforderlich.

Im Live-Modus bleibt der Lauf nach Abschluss Ihrer Tests geöffnet, damit Sie die Ergebnisse prüfen können. Schließen Sie das DevTools-Fenster, um ihn zu beenden, oder drücken Sie Strg+C, um ihn zu verlassen und das Fenster geöffnet zu lassen.

### Cucumber / BDD

Importieren Sie `cucumberHooksPath` zusammen mit dem Haupt-Export und übergeben Sie ihn an die Cucumber-Option `require`. Dadurch werden die Szenario-Hooks `Before` / `After` und die Schritt-Hooks `BeforeStep` / `AfterStep` registriert. Sie bilden das Verhalten von `beforeScenario` / `afterScenario` des WebdriverIO-Service nach. Ein `After`-Hook vor dem Beenden schreibt den Trace jedes Szenarios, solange dessen Browsersitzung noch aktiv ist.

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
| `port` | `number` | `3000` | Port für den DevTools-Backend-Server. Wird automatisch erhöht, falls er bereits belegt ist. |
| `hostname` | `string` | `'localhost'` | Hostname, an den sich der Backend-Server bindet. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | `.webm`-Videoaufzeichnung pro Sitzung, nur im Live-Modus. Im Trace-Modus verwenden Sie `filmstrip` / `video`. Siehe [Screencast](#screencast) weiter unten. |
| `bidi` | `boolean` | `false` | Aktiviert die WebDriver-BiDi-Erfassung für Browser-Konsole, JS-Exceptions und Netzwerk. Erfordert `webSocketUrl: true` in Ihren Capabilities und einen BiDi-fähigen Chromedriver. Ist BiDi verbunden, wird der Netzwerkpfad über das Chrome-Performance-Log pro Befehl deaktiviert, damit Requests nicht doppelt erscheinen. |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` öffnet die DevTools-Oberfläche. `trace` überspringt sie und schreibt stattdessen ein portables Artefakt. Siehe [Trace-Modus](/docs/devtools/wdio/trace-mode). |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Aufbau des Trace-Artefakts. Gilt nur bei `mode: 'trace'`. |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Ein Trace pro Sitzung / Spec-Datei / Test. `'test'` schreibt jeden nach `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Gilt nur bei `mode: 'trace'`. Siehe [Trace-Modus](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity). **Einschränkung:** Beim BDD-Interface `describe/it` fällt dies auf einen einzigen sitzungsbezogenen Abschnitt zusammen (siehe [Aufteilung pro Test](#per-test-slicing--the-bdd-describeit-caveat)). |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Welche Traces behalten werden. Wird mit `traceGranularity: 'test'` kombiniert. Gilt nur bei `mode: 'trace'`. Außerhalb des Trace-Modus wird eine Warnung protokolliert. **Einschränkung:** Unter Nightwatch ist nur `'retain-on-failure'` zuverlässig. Die anderen Retry-bezogenen Richtlinien fallen darauf zurück, weil `--retries` einen Testfall intern erneut ausführt, ohne die Per-Test-Hooks des Plugins erneut auszulösen. |
| `filmstrip` | `boolean` | `true` | Zeichnet einen dichten, durchgehenden Screencast-Filmstreifen in den Trace auf. Damit lässt sich die Wiedergabe im Trace-Player stufenlos durchspulen, statt nur ein Bild pro Aktion zu zeigen. Startet für die Sitzung den Screencast-Recorder (unter Nightwatch im Polling-Modus). Gilt nur bei `mode: 'trace'`. |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Screenshot pro Test. Nur im Trace-Modus mit `traceGranularity: 'test'`. **Nur Erzeugung:** Das PNG wird in das Trace-Ausgabeverzeichnis geschrieben (und bei `emitArtifactsManifest: true` ins Manifest aufgenommen). Es wird nicht inline an Allure angehängt (siehe Hinweis unten). |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Videoabschnitt pro Test, aufbewahrt gemäß der angegebenen Richtlinie (z. B. `'retain-on-failure'`). Nur im Trace-Modus mit `traceGranularity: 'test'`. Ein Wert ungleich `off` startet den Screencast-Recorder selbst. Sie benötigen also **nicht** zusätzlich `filmstrip` oder `screencast.enabled`. **Nur Erzeugung:** Die `.webm`-Datei wird in das Trace-Ausgabeverzeichnis geschrieben (und bei `emitArtifactsManifest: true` ins Manifest aufgenommen). Sie wird nicht inline an Allure angehängt. |
| `emitArtifactsManifest` | `boolean` | `false` | Schreibt das Manifest `devtools-artifacts-<sessionId>.json` neben den Trace. Dieser generische Index dient Reportern und CI dazu, die erzeugten Artefakte zu finden. **Für Nightwatch muss es explizit aktiviert werden.** Es gibt kein Live-Allure-Signal, das automatisch erkannt werden könnte, daher wird es anders als bei WDIO/Selenium nie automatisch aktiviert. Gilt nur bei `mode: 'trace'`. |
| `captureAssertions` | `boolean` | `true` | Erfasst Assertions als Aktionszeilen im Trace. Das umfasst `node:assert` sowie die nativen `browser.assert`/`browser.verify`, einschließlich negierter `.not.*`-Matcher. Setzen Sie `false`, um dies zu deaktivieren. |

> **Inline-Anhänge an Allure werden für Nightwatch nicht unterstützt.** Der offizielle Reporter `nightwatch-allure` arbeitet nachträglich (ohne Live-Attach-API), und `attachment()` aus `allure-js-commons` bewirkt in einem Nightwatch-Lauf nichts. Daher werden `screenshot`- / `video`-Artefakte im Trace-Ausgabeverzeichnis *erzeugt* (als Dateien, plus Artefakt-Manifest bei `emitArtifactsManifest: true`), aber nicht an einen Allure-Test angehängt. Die Aufteilung pro Test und damit diese Artefakte sind für die Interfaces Cucumber und Exports-Objekt sinnvoll. Beim BDD-Interface `describe/it` fällt die Granularität auf Sitzungsebene zusammen, sodass die Per-Test-Prüfung dort wirkungslos bleibt.

```js
globals: nightwatchDevtools({
  port: 3000,
  hostname: 'localhost',
  screencast: { enabled: true },
  bidi: true
})
```

## Screencast

Zeichnen Sie ein durchgehendes `.webm`-Video der Browsersitzung auf. Jede WebDriver-Sitzung erhält eine eigene Aufzeichnung. Ein `browser.end()` mitten im Lauf oder das Beenden des Browsers nach jedem Szenario in Cucumber schließt das aktuelle Video ab und startet ein neues für die nächste Sitzung. Die letzte Aufzeichnung wird im `after()`-Hook von Nightwatch abgeschlossen. Jede Aufzeichnung lässt sich im Dropdown des Screencast-Tabs auswählen.

**Nur Polling-Modus.** Nightwatch bietet keinen stabilen CDP-Zugang wie WebdriverIO (`browser.getPuppeteer()`) und Selenium (`driver.createCDPConnection`). Daher erfasst der Screencast Bilder, indem er in festen Abständen einen WebDriver-Screenshot anfordert. Die Anfrage läuft direkt über den WebDriver-HTTP-Transport und umgeht die Befehlswarteschlange von Nightwatch, sodass sie nie hinter den Befehlen Ihres Tests warten muss. Funktioniert in jedem Browser, den Nightwatch unterstützt.

```js
globals: nightwatchDevtools({
  port: 3000,
  screencast: { enabled: true, pollIntervalMs: 200 }
})
```

| Option | Typ | Standard | Hinweise |
|--------|------|---------|-------|
| `enabled` | `boolean` | `false` | Hauptschalter. |
| `pollIntervalMs` | `number` | `200` | Screenshot-Intervall (ms). Niedriger bedeutet ein flüssigeres Video, aber mehr WebDriver-Roundtrips. 200 ms ≈ 5 fps. |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Pixelformat pro Bild, das vor dem finalen `.webm`-Mux an den ffmpeg-Encoder übergeben wird. Im Polling-Modus werden die Quell-Screenshots immer als PNG erfasst. Diese Option ändert also **nicht** die Erfassung, sondern nur das Format, das der Encoder pro Bild erhält. |
| `maxBufferFrames` | `number` | `2000` | Obergrenze für im Speicher gehaltene Bilder. Wird sie überschritten, wird der Puffer an Ort und Stelle ausgedünnt, wobei das erste und das letzte Bild erhalten bleiben. |
| `maxWidth` / `maxHeight` / `quality` | - | - | Nur für CDP, im Polling-Modus ignoriert. Aufgeführt aus Gründen der Kompatibilität mit den WDIO-/Selenium-Adaptern. |

**Voraussetzungen:** `fluent-ffmpeg` (bereits eine Laufzeitabhängigkeit des Pakets) sowie das Binary `ffmpeg` im PATH. macOS: `brew install ffmpeg`. Linux: `apt install ffmpeg`. Ohne ffmpeg läuft der Recorder trotzdem, aber der Kodierschritt protokolliert eine Warnung und schreibt keine Datei.

**Ausgabe:** `nightwatch-video-<sessionId>.webm` wird in einen Ordner `test-results/` neben der gerade ausgeführten Testdatei geschrieben. Ersatzweise wird das Verzeichnis von `nightwatch.conf.*` verwendet, danach `process.cwd()`. Verzeichnisse unter `node_modules/` werden übersprungen. Ist das gewählte Verzeichnis nicht beschreibbar, landet die Datei im temporären Verzeichnis des Betriebssystems. Der vollständige Pfad erscheint in der Nightwatch-Logzeile `📹 Screencast video: <path>`, und das Video wird zusätzlich an den Screencast-Tab des Dashboards gestreamt.

Die vollständige Referenz zur Screencast-Funktion (Browserunterstützung, Ausgabepfade für alle drei Adapter) finden Sie auf der [Screencast-Seite](/docs/devtools/wdio/screencast).

## BiDi-Erfassung (optional)

Aktivieren Sie die WebDriver-BiDi-Erfassung für Browser-Konsolenmeldungen, JS-Exceptions und Netzwerk-Requests. Dies entspricht dem Pfad, den selenium-devtools verwendet. Beide Adapter teilen sich dieselbe Verbindungslogik in `@wdio/devtools-core`.

```js
globals: nightwatchDevtools({
  port: 3000,
  bidi: true
})
```

Sie benötigen außerdem `webSocketUrl: true` in Ihren Capabilities, damit Chromedriver den BiDi-Kanal tatsächlich bereitstellt:

```js
desiredCapabilities: {
  browserName: 'chrome',
  webSocketUrl: true,                           // ← aktiviert BiDi
  'goog:chromeOptions': { /* ... */ }
}
```

Ist BiDi verbunden, wird der Netzwerk-Erfassungspfad über das Chrome-Performance-Log pro Befehl deaktiviert, damit Requests im Dashboard nicht doppelt erscheinen. Fehlt `webSocketUrl` oder stellt die Chromedriver-Version kein BiDi bereit, protokolliert der Verbindungsversuch eine Warnung, und der Performance-Log-Fallback funktioniert weiter.

Auch der injizierte Collector listet jeden Request auf, und zwar aus zwei seiteneigenen Quellen. Ein `fetch`- / `XMLHttpRequest`-Aufruf läuft über dessen Patch und enthält Methode, Header, Status und Body. Jeder andere Ladevorgang stammt aus dem Resource-Timing-Puffer der Seite, mit Timing und Größe. In Chrome ergänzt das Performance-Log diese Resource-Timing-Zeilen anschließend an Ort und Stelle um Header und Status. In Safari oder in jeder von Appium bereitgestellten Sitzung bleiben sie so, wie die Seite sie gesehen hat: ohne Header oder Bodies, in Safari auch ohne Status. Siehe [Netzwerk-Logs](/docs/devtools/wdio/network-logs#without-webdriver-bidi).

**Setzen Sie `webSocketUrl: true` auch ohne `bidi: true`.** Damit registriert der Adapter seinen Seiten-Collector auf jeder Seite schon beim Dokumentstart, sodass die DOM-Zeitreise über Navigationen hinweg genau bleibt. Ohne diese Einstellung injiziert der Adapter den Collector ersatzweise nach jeder Navigation, wodurch die ersten Momente einer neuen Seite verloren gehen können.

## Trace-Modus

Headless-Erfassung, bei der sich kein DevTools-Fenster öffnet. Am Sitzungsende schreibt der Adapter eine portable `trace-<sessionId>.zip` (oder ein Verzeichnis) in einen Ordner `test-results/` neben dem ermittelten Test- bzw. Konfigurationsverzeichnis. Das Artefakt hat denselben Aufbau wie das WebdriverIO-Trace-Artefakt.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceFormat: 'ndjson-directory'  // optional; Standard 'zip'
})
```

### Granularität und Cucumber

`traceGranularity` legt fest, was ein Artefakt umfasst: `'session'` (Standard), `'spec'` oder `'test'`.

Nightwatch beendet den Browser nach jedem Cucumber-Szenario. Ein `'session'`-Trace umfasst dennoch den gesamten Lauf in einer einzigen Zip-Datei, wobei jedes Szenario unter seinem Feature verschachtelt ist. `'test'` schreibt eine Zip-Datei pro Szenario in einen eigenen Ordner. Dies ist die Empfehlung für Cucumber, denn die Artefakte sind kleiner, und die Aufbewahrung über `tracePolicy` richtet sich nach dieser Granularität.

```js
globals: nightwatchDevtools({
  mode: 'trace',
  traceGranularity: 'test'  // ein Trace pro Cucumber-Szenario
})
```

Beim BDD-Interface `describe/it` fällt `'test'` auf einen einzigen sitzungsbezogenen Abschnitt zusammen. Nightwatch führt jedes `it()` intern aus und löst den Per-Test-Hook des Plugins nur einmal pro Modul aus. Der Aktionsbaum zeigt trotzdem jedes `it` als eigene Gruppe.

Im Trace-Modus werden die Port-Bindung des Backends und das UI-Fenster übersprungen, und `screencast.enabled` wird ignoriert. Eine Warnung wird protokolliert, wenn nichts anderes den Recorder benötigt. Stattdessen zeichnet der Trace-Modus standardmäßig den dichten `filmstrip` auf, und die Screencast-Feineinstellungen (`pollIntervalMs`, `captureFormat`, `maxBufferFrames`) gelten weiterhin für diesen Recorder. Die vollständige Funktionsreferenz (Inhalt des Artefakts, Viewer, mobiles Testen, wann `zip` und wann `ndjson-directory` sinnvoll ist) finden Sie auf der [Trace-Modus-Seite](/docs/devtools/wdio/trace-mode).

Nightwatch nutzt dieselbe Trace-Pipeline wie die WebdriverIO- und Selenium-Adapter. Der Aufbau des Artefakts ist daher identisch, egal welcher Adapter es erzeugt hat. Ein Nightwatch-Trace enthält die vollständige Erfassung pro Aktion:

- einen Screenshot
- den eingerückten Snapshot des Barrierefreiheitsbaums
- die Liste interagierbarer Elemente
- das Markdown-Transkript

Er öffnet sich im `show-trace`-Player mit DOM-/Snapshot-Zeitreise, den Tabs **A11y**, **Transcript** und **Errors** (Fehler mit Sprung zur Quelle), dem Element-Overlay zur Locator-Auswahl und (bei Cucumber) der Verschachtelung **Feature → Scenario**. Schritte werden im Live-Dashboard verfolgt, im Trace aber noch nicht als eigene Gruppen verschachtelt.

Kopierte Locators bevorzugen einfaches CSS, das Nightwatch standardmäßig liest. Nur wenn kein eindeutiger CSS-Selektor existiert, liefert der Player XPath, versehen mit dem Hinweis `useXpath()` / `locateStrategy: 'xpath'`.

Öffnen Sie einen Trace mit dem Binary `show-trace`, das mit `@wdio/nightwatch-devtools` ausgeliefert wird (keine zusätzliche Abhängigkeit):

```sh
npx show-trace test-results/trace-<sessionId>.zip   # in a project that installs the adapter
pnpm show-trace test-results/trace-<sessionId>.zip  # from the devtools monorepo
```

Auf der Seite [Trace Player](/docs/devtools/trace-player) finden Sie die vollständige Anleitung und die Tastenkürzel.

### Aufteilung pro Test & die Einschränkung beim BDD-Interface `describe/it` {#per-test-slicing--the-bdd-describeit-caveat}

Die Per-Test-Optionen benötigen einen Per-Test-Hook, um den Abschnitt jedes Tests abzutrennen. Dazu gehören `traceGranularity: 'test'` sowie die damit kombinierten Optionen `tracePolicy`, `screenshot` und `video`.

- Das Interface **Exports-Objekt (Mocha-Stil)** und **Cucumber** (Hooks pro Szenario) stellen einen solchen Hook bereit und erhalten daher eine echte Aufteilung pro Test.
- Das Interface **BDD `describe/it`** ist die Ausnahme. Nightwatch führt jedes `it()` intern aus und löst den Per-Test-Hook des Plugins nur einmal pro Modul aus. Dadurch fällt `traceGranularity: 'test'` auf einen einzigen **sitzungsbezogenen** Abschnitt zusammen, der dem ersten Test zugeordnet ist.

Das Artefakt-Manifest listet trotzdem jeden Testfall mit seinem korrekten Status auf. Nur die Zuordnung von Abschnitten und Artefakten pro Test fällt zusammen. Traces mit Sitzungs- und Spec-Granularität sind nicht betroffen.

## Beispiele

Funktionierende Beispiele befinden sich im Verzeichnis `examples/` auf oberster Ebene des Repos. Bauen Sie den Workspace einmal (`pnpm install && pnpm build`) und führen Sie sie dann vom Repo-Root aus:

| Verzeichnis | Runner | Befehl |
|-----------|--------|---------|
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) | Nightwatch BDD `describe/it` (standardmäßig Trace-Modus; `DEVTOOLS_MODE=live` für die Oberfläche) | `pnpm demo:nightwatch` (`pnpm demo:nightwatch:retry` ergänzt `--retries 1`) |
| [`examples/nightwatch/cucumber/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch/cucumber) | Nightwatch + Cucumber | `pnpm --filter @wdio/nightwatch-devtools example:cucumber` |
| [`examples/nightwatch/`](https://github.com/webdriverio/devtools/tree/main/examples/nightwatch) (`nightwatch.mobile.conf.cjs`) | Appium (Android-Uhr-App; iOS-Einstellungen mit `DEVTOOLS_MOBILE_PLATFORM=ios`) | `pnpm demo:nightwatch:mobile` |

## Mobil (Appium)

Appium-Sitzungen werden im Live- und im Trace-Modus erfasst. So konfigurieren Sie sie:

- Deklarieren Sie Appium unter `selenium` mit `use_appium: true`, `start_process: false` und `default_path_prefix: ''`.
- Setzen Sie für eine native App `browserName: null`. Andernfalls trägt Nightwatch Firefox ein, und der Adapter behandelt die Sitzung so, als hätte sie eine Webseite.
- Lassen Sie `bidi` deaktiviert, da Appium kein BiDi bereitstellt.

Das Netzwerk einer nativen App wird erfasst, wenn `desiredCapabilities` den Wert `'appium:intercept': true` setzt und Appium das Plugin appium-interceptor ausführt. Siehe [Netzwerk nativer Apps](/docs/devtools/mobile#native-app-network).

```js
// nightwatch.mobile.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  selenium: {
    start_process: false,
    use_appium: true,
    host: '127.0.0.1',
    port: 4723,
    default_path_prefix: ''
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: null,
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2'
      },
      globals: nightwatchDevtools({ mode: 'trace', bidi: false })
    }
  }
}
```

Native Sitzungen zeichnen Befehle, Screenshots und Elementdaten aus dem XML-Baum der Plattform auf, ohne DOM. Die Webview einer Hybrid-App wird so erfasst, als wäre sie weiterhin nativ. Probieren Sie es mit `pnpm demo:nightwatch:mobile` aus, ausgeführt vom Root eines gebauten Checkouts des devtools-Repos (Einrichtungsschritte unter [Ein Beispiel ausführen](/docs/devtools/mobile#running-an-example)). Die vollständige Mobil-Referenz finden Sie auf der Seite [Mobiles Testen](/docs/devtools/mobile).

## Funktionen

Der Nightwatch-Adapter bietet dieselbe DevTools-Oberfläche wie WebdriverIO. Jede der folgenden Funktionen wird mit der Basiseinrichtung `globals: nightwatchDevtools({ port: 3000 })` automatisch erfasst, ohne Konfiguration pro Funktion. Für Netzwerk-Logs ist zusätzlich `'goog:loggingPrefs': { performance: 'ALL' }` nötig, wie unter [Setup](#setup) gezeigt. Die Links führen zur vollständigen Referenz der jeweiligen Funktion.

- **[Interaktives erneutes Ausführen & Visualisierung von Tests](/docs/devtools/wdio/interactive-test-rerunning)** – Live-Browservorschauen, Screenshots pro Befehl und erneutes Ausführen von Tests/Suites mit einem Klick
- **[Preserve & Rerun (Vergleich)](/docs/devtools/wdio/preserve-and-rerun)** – Erstellen Sie einen Snapshot eines fehlschlagenden Tests, führen Sie ihn erneut aus und vergleichen Sie beide Läufe nebeneinander. Nightwatch startet Ihre Konfiguration für erneute Läufe mit gesetztem `DEVTOOLS_RERUN_LABEL` neu und filtert auf diesen Test. Dafür muss eine auffindbare `nightwatch.conf.*` vorhanden sein. Fehlt sie, gibt das Plugin eine Warnung aus, und das erneute Ausführen ist nicht verfügbar.
- **[Unterstützung mehrerer Frameworks](/docs/devtools/wdio/multi-framework-support)** – Standard-Runner (Mocha-Stil) und Cucumber/BDD-Runner
- **[Konsolen-Logs](/docs/devtools/wdio/console-logs)** – Browser-Konsolenausgaben erfassen und untersuchen (in Echtzeit mit `bidi: true`)
- **[Netzwerk-Logs](/docs/devtools/wdio/network-logs)** – API-Aufrufe und Netzwerkaktivität überwachen
- **[Metadaten](/docs/devtools/wdio/metadata)** – Sitzungs-Capabilities, Umgebung und Timing pro Browsersitzung
- **[TestLens](/docs/devtools/wdio/testlens)** – Von jedem Befehl zur auslösenden Quellcodezeile springen
- **[Sitzungs-Screencast](/docs/devtools/wdio/screencast)** – Durchgehende `.webm`-Aufzeichnung der Browsersitzung
- **[Trace-Modus](/docs/devtools/wdio/trace-mode)** – Headless-Erfassung, die eine portable `trace.zip` erzeugt (ohne UI-Fenster)

Screencast ist die einzige Funktion mit eigenen Optionen (vollständige Liste unter [Screencast](#screencast)):

```js
globals: nightwatchDevtools({ port: 3000, screencast: { enabled: true, pollIntervalMs: 200 } })
```

## Einschränkungen

Nightwatch stellt nicht dieselbe Tiefe an Framework-Hooks bereit wie WebdriverIO. Daher gibt es einige Unterschiede zum WDIO-DevTools-Service:

| Einschränkung | Detail |
|-----------|--------|
| Keine nativen Befehls-Hooks | Nightwatch hat keinen `beforeCommand`- / `afterCommand`-Hook. Befehle werden stattdessen über einen Browser-Proxy-Wrapper abgefangen. |
| Begrenzter Testkontext | `browser.currentTest` liefert weniger Metadaten als der WDIO-Runner-Kontext. Testnamen und Dateipfade erfordern zusätzliche Heuristiken. |
| Flache Suite-Verschachtelung | Nightwatch unterstützt mehrfach verschachtelte `describe`-Blöcke nicht nativ. Das Plugin meldet maximal zwei Ebenen. |
| Verzögerte Verfügbarkeit der Ergebnisse | Testergebnisse werden erst in `afterEach` finalisiert und sind während des Tests nicht verfügbar. |
| Screencast nur im Polling-Modus | WDIO (CDP-Push über `browser.getPuppeteer()`) und Selenium (CDP-Push über `driver.createCDPConnection`) nutzen CDP. Nightwatch fehlt ein stabiler CDP-Zugang, daher werden Bilder durch Abfragen des WebDriver-Screenshot-Endpunkts erfasst. Funktioniert in jedem Browser, den Nightwatch unterstützt. Die geringen Kosten pro Bild hängen vom Polling-Intervall ab. |
| Trace-Aufteilung pro Test (BDD `describe/it`) | Das BDD-Interface löst den Per-Test-Hook des Plugins einmal pro Modul aus, daher fällt `traceGranularity: 'test'` auf einen sitzungsbezogenen Abschnitt zusammen. Die Interfaces Exports-Objekt (Mocha-Stil) und Cucumber erhalten eine echte Aufteilung pro Test. Siehe [Aufteilung pro Test](#per-test-slicing--the-bdd-describeit-caveat). |
| Retry-bezogene Aufbewahrung | Nur `tracePolicy: 'retain-on-failure'` ist zuverlässig. Die anderen Retry-bezogenen Richtlinien fallen darauf zurück. |
| Trace-Artefakte nur erzeugt | `screenshot`- / `video`-Dateien pro Test werden in das Trace-Ausgabeverzeichnis geschrieben (und bei `emitArtifactsManifest: true` ins Manifest aufgenommen), aber nicht inline an Allure angehängt. Nightwatch hat keine Live-Attach-API für Allure. |

Die Funktionsparität mit dem WebdriverIO-DevTools-Service liegt insgesamt bei etwa **80–90 %**.