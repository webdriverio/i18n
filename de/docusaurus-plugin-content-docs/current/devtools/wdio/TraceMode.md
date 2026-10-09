---
id: trace-mode
title: Trace-Modus
description: "Headless-Trace-Artefakte mit dem DevTools-Trace-Modus erfassen und Format, Granularität, Aufbewahrung, Screenshots, Video und Assertions konfigurieren."
---

Headless-Erfassungspfad: Es öffnet sich kein DevTools-UI-Fenster. Am Ende der Session schreibt der Adapter Trace-Artefakte in einen `test-results/`-Ordner neben deinem Spec- bzw. Config-Verzeichnis. Bei der Granularität `session` / `spec` ist das eine `trace-<sessionId>.zip` (oder ein Verzeichnis `trace-<sessionId>/`). Bei der Granularität `test` erhält jeder Test einen eigenen Unterordner (siehe [Trace-Granularität](#trace-granularity--tracegranularity)). Das Artefakt ist portabel und enthält alles, was für Offline-Wiedergabe, Diffing durch KI-Agenten oder jeden anderen Konsumenten nötig ist, der eine Datei einer Live-UI vorzieht.

Der Trace-Modus **schließt den Live-Modus aus**. Wähle einen pro Session: Wer interaktiv debuggt, möchte den Live-Modus. Agenten, die Läufe vergleichen, oder CI-Bots, die Artefakte sammeln, möchten den Trace-Modus.

## Aktivieren

```ts
// wdio.conf.ts
services: [
  [
    'devtools',
    {
      mode: 'trace',
      traceFormat: 'zip' // optional; 'zip' (default) | 'ndjson-directory'
    }
  ]
]
```

Eine vollständige Referenzkonfiguration zum Kopieren und Einfügen findest du unter [`examples/wdio/wdio.trace.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.trace.conf.ts).

Selenium und Nightwatch bringen dieselbe Trace-Pipeline mit. Die frameworkspezifische Syntax zum Aktivieren findest du auf den jeweiligen Adapter-Seiten: [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode).

## Was im Artefakt enthalten ist

| Datei | Inhalt |
|---|---|
| `trace.trace` | NDJSON mit `context-options`- sowie `before`- / `after`-Action-Events; eine Zeile pro Eintrag |
| `trace.network` | Netzwerkeinträge im HAR-Stil, einer pro Zeile |
| `transcript.md` | Für Menschen und LLMs lesbare Markdown-Zusammenfassung mit Zeitangaben, Selektoren und Wert-Annotationen |
| `resources/page@<id>-<ts>.jpeg` | Screenshot, der bei jeder benutzerseitigen Aktion aufgenommen wird |
| `resources/page@<id>-<ts>-elements.json` | Flache Liste der interagierbaren Elemente zum Zeitpunkt dieser Aktion |
| `resources/page@<id>-<ts>-snapshot.txt` | Nach Tiefe eingerückter Snapshot des Accessibility-Baums (KI-freundlich) |

### Was als „Aktion“ zählt

Befehle werden durch eine Allow-List gefiltert, bevor sie Trace-Einträge erzeugen. Beispiele, die im Trace landen:

- `url` / `get` → `Page.navigate`
- `click` → `Element.click`
- `setValue` / `sendKeys` → `Element.fill`
- `submit`, `clear`, `selectByVisibleText`, …

Interne Befehle wie `findElement`, `waitUntil` oder `executeScript` sind bewusst ausgeschlossen. Sie bilden keine benutzerseitige Absicht ab und würden die Timeline nur unübersichtlich machen. Die vollständige Allow-List findest du in [`@wdio/devtools-core/action-mapping.ts`](https://github.com/webdriverio/devtools/blob/main/packages/core/src/action-mapping.ts).

## Ausgabeformat — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // default: 'zip'
}
```

- **`zip`** (Standard): Ein einzelnes Archiv unter `test-results/trace-<sessionId>.zip`.
- **`ndjson-directory`**: Dieselben Dateien, entpackt in `test-results/trace-<sessionId>/`. So entfällt das Entpacken für skriptbasierte oder agentische Konsumenten, die das NDJSON direkt greppen oder streamen möchten.

Beide Formate lassen sich im hauseigenen [`show-trace`-Player](/docs/devtools/trace-player) und in anderen kompatiblen Trace-Viewern öffnen.

## Trace-Granularität — `traceGranularity`

Diese Option legt fest, wie viele Trace-Artefakte ein Lauf erzeugt:

```ts
{
  mode: 'trace',
  traceGranularity: 'session' | 'spec' | 'test' // default: 'session'
}
```

| Wert | Ausgabe |
|---|---|
| `session` (Standard) | Ein Trace pro Worker/Session: `test-results/trace-<sessionId>.zip`. |
| `spec` | Ein Trace pro Spec-Datei. Kleiner und leichter zu navigieren. |
| `test` | Ein Trace **pro Test**, jeweils in einem eigenen Ordner: `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`. |

Bei der Granularität `test` setzt sich der Ordnername aus dem Basisnamen der Spec, einem Slug des Testtitels, dem Browser und bei Wiederholungsversuchen einem Suffix `-retry<N>` zusammen. Ein Beispiel ist `test-results/login_e2e-logs-in-chrome/trace.zip`, der erste Retry liegt dann unter `test-results/login_e2e-logs-in-chrome-retry1/trace.zip`. Traces pro Test lassen sich am besten navigieren. Sie funktionieren am besten zusammen mit einer Aufbewahrungsrichtlinie, sodass nur die Traces geschrieben werden, die dich interessieren.

## Aufbewahrung — `tracePolicy`

Standardmäßig wird jeder Trace behalten (`'on'`). Wenn du nur die interessanten behalten möchtest, kombinierst du das idealerweise mit `traceGranularity: 'test'`:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure' // default: 'on'
}
```

| Richtlinie | Behält den Trace, wenn … |
|---|---|
| `'on'` (Standard) | Immer: Jeder Trace wird geschrieben. |
| `'retain-on-failure'` | Der **letzte** Versuch des Tests fehlgeschlagen ist. Eine Retry-Folge „erst fehlgeschlagen, dann bestanden“ endet mit `passed` und wird daher *nicht* behalten. So bewahrst du keinen Flake auf, der letztlich grün wurde. |
| `'retain-on-first-failure'` | **Versuch 0** fehlgeschlagen ist, unabhängig davon, ob ein späterer Retry bestanden hat. |
| `'on-first-retry'` | Der Test mindestens einmal wiederholt wurde (es existiert ein Versuch 1). |
| `'on-all-retries'` | Irgendein wiederholter Versuch (Versuch ≥ 1) existiert. |
| `'retain-on-failure-and-retries'` | Der letzte Versuch fehlgeschlagen ist **oder** der Test wiederholt wurde. |

Ein nicht behaltener Abschnitt wird verworfen und nie auf die Festplatte geschrieben. Die retry-bewussten Richtlinien stützen sich auf ein **Ergebnis-Ledger** pro Versuch, das der Adapter für jede retry-stabile Test-ID führt. Dadurch werten `retain-on-failure` und `retain-on-first-failure` den richtigen Versuch aus. Stellt ein Runner keine Retry-Informationen pro Versuch bereit, fallen alle Richtlinien außer `retain-on-failure` auf `retain-on-failure` zurück. Ein Lauf ohne beobachtete Ergebnisse (z. B. ein einfaches Standalone-Skript) schlägt **offen** fehl: Der Trace wird behalten, statt zu riskieren, dass einer verloren geht, den du brauchst.

> Retry-bewusste Aufbewahrung ist End-to-End für **WebdriverIO** (mocha / cucumber) und **Selenium** (mocha) verifiziert. Bei **Nightwatch** funktioniert `retain-on-failure`. Die anderen retry-bewussten Richtlinien fallen jedoch darauf zurück, weil Nightwatchs `--retries` einen Testfall intern erneut ausführt, ohne die Hooks pro Test erneut auszulösen. Auch WDIOs prozessübergreifendes `specFileRetries` liegt außerhalb des (pro Worker geführten) Ledgers. Details findest du auf der [Nightwatch-Adapter-Seite](/docs/devtools/nightwatch#trace-mode).

## Dichter Filmstreifen — `filmstrip`

**Standardmäßig** zeichnet der Trace einen **dichten, kontinuierlichen** Screencast auf. So spielt der Player beim Scrubben flüssig ab, statt von Frame zu Frame zu springen. Die dichten Frames liegen neben den Frames pro Aktion, die die DOM-Snapshots enthalten. Mit `filmstrip: false` zeichnest du nur einen Frame pro Aktion auf. Das ergibt einen kleineren Trace ohne kontinuierlichen Recorder:

```ts
{
  mode: 'trace',
  filmstrip: false // opt out — one frame per action (default is true)
}
```

- Dichte Frames werden **zusätzlich** zu den Frames pro Aktion (mit den DOM-Snapshots) hinzugefügt, sodass keine DOM-Daten verloren gehen. Sind dichte Frames vorhanden, ersetzen sie beim Scrubben den spärlichen Filmstreifen pro Aktion.
- Frames werden beim Export ausgedünnt (≥100 ms Abstand) und inhaltsadressiert gespeichert. Identische Frames (etwa bei einem statischen Warten) werden so zu einer einzigen Ressource zusammengefasst. Der Puffer der Live-Session ist durch `screencast.maxBufferFrames` begrenzt (Standard 2000).
- Die Aufzeichnung nutzt den Screencast-Recorder: CDP-Push bei Chrome/Chromium, Screenshot-Polling bei anderen Browsern. Auf Nicht-Chrome-Browsern setzt das Polling viele `takeScreenshot`-Befehle ab. Kombiniere es daher mit der Option deines Reporters zum Unterdrücken von Steps (siehe [Allure-Integration](/docs/devtools/allure)).

`filmstrip` ist in allen drei Adaptern verfügbar (WebdriverIO / Selenium / Nightwatch).

## Screenshot & Video pro Test — `screenshot` / `video`

Bei `traceGranularity: 'test'` kann jeder Test zusätzlich einen eigenständigen Screenshot und/oder einen Videoausschnitt pro Test erzeugen. Das entspricht der bekannten Ergonomie von Screenshot/Video bei Fehlschlag:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  screenshot: 'only-on-failure', // 'off' (default) | 'on' | 'only-on-failure'
  video: 'retain-on-failure'     // 'off' (default) | any tracePolicy value
}
```

| Option | Werte | Verhalten |
|---|---|---|
| `screenshot` | `'off'` (Standard) · `'on'` · `'only-on-failure'` | `'on'` nimmt nach jedem Test auf, `'only-on-failure'` nur nach einem fehlgeschlagenen Test. PNG. |
| `video` | `'off'` (Standard) · jeder `tracePolicy`-Wert | Zeichnet den Screencast kontinuierlich auf und behält den Ausschnitt jedes Tests nach derselben Aufbewahrungssemantik wie `tracePolicy`. WebM. Ein Wert ungleich `off` startet den Recorder selbstständig. `filmstrip` oder `screencast.enabled` brauchst du dafür nicht zusätzlich. |

Beide Optionen setzen den Trace-Modus und `traceGranularity: 'test'` voraus, also den Test-Scope, an den sie angehängt werden. Bei gröberen Granularitäten haben sie keine Wirkung.

- **WebdriverIO**: `screenshot` / `video` sind Service-Optionen. Ist `@wdio/allure-reporter` vorhanden, werden sie inline an Allure angehängt.
- **Selenium**: Dieselben Optionen in den `DevToolsOptions`. Ist ein Allure-Runner-Adapter aktiv, werden sie über `allure-js-commons` inline an Allure angehängt.
- **Nightwatch**: **Nur Erzeugung**. Die Dateien werden in das Trace-Ausgabeverzeichnis geschrieben (und im Manifest aufgeführt), aber nicht inline an Allure angehängt, da Nightwatch keine Live-API zum Anhängen an Allure hat. Siehe [Einschränkungen des Trace-Modus](/docs/devtools/limitations).

> `screencast.enabled` ist die separate kontinuierliche `.webm`-Aufzeichnung des **Live-Modus** und wird im Trace-Modus ignoriert. Im Trace-Modus verwendest du `filmstrip` (dichte Frames im Trace) oder `video` pro Test. Die Feineinstellungen des Screencasts (`quality`, `maxWidth`, `pollIntervalMs`, …) gelten weiterhin für den jeweils laufenden Recorder.

## Artefakt-Manifest — `emitArtifactsManifest`

Schreibt eine `devtools-artifacts-<sessionId>.json` neben den Trace. Das ist ein generischer Index, den Reporter und CI auswerten, um die erzeugten Artefakte zu finden: jeden Trace, jeden Screenshot und jedes Video sowie den Status jedes Tests.

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // default: off; auto-on when Allure is detected
}
```

- **Standardmäßig aus.** Die Option **aktiviert sich automatisch**, wenn ein Allure-Reporter erkannt wird. Das ist WebdriverIOs `@wdio/allure-reporter` in der Konfiguration oder eine aktive Selenium-`allure-js-commons`-Runtime.
- **Bei Nightwatch ist sie Opt-in**: Nightwatch hat kein Live-Allure-Signal, das automatisch erkannt werden könnte (`nightwatch-allure` arbeitet nachträglich). Daher aktiviert sie sich nie automatisch. Setze sie explizit, wenn du das Manifest möchtest.

## Assertions — `captureAssertions`

Assertions erscheinen im Trace als vollwertige Aktionszeilen. Das ist standardmäßig aktiviert, mit `captureAssertions: false` schaltest du es ab.

- **`node:assert`**: Wird in allen drei Adaptern als `assert.<method>`-Zeilen erfasst.
- **WebdriverIO `expect`**: Bestandene *und* fehlgeschlagene `expect(...)`-Matcher (`expect($el).toHaveText(...)`, `toBeExisting()`, …) erscheinen als `expect.<matcher>`-Zeilen. Diese enthalten den erwarteten Wert, die Quellcode-Position des Elements und einen Snapshot. Die internen Polling-Befehle des Matchers werden unterdrückt, sodass nur die Assertion angezeigt wird.
- **Nightwatch `browser.assert.*` / `browser.verify.*`**: Native Assertions erscheinen als `assert.<m>`- / `verify.<m>`-Zeilen.

Bestandene Assertions werden grün dargestellt, fehlgeschlagene rot mit der Fehlermeldung.

## Mobile Tests

Der Trace-Modus erkennt mobile Sessions über `platformName: 'android' | 'ios'` (ohne Beachtung der Groß-/Kleinschreibung) und passt sich an:

- **Mobile Web** (Chrome auf Android, Safari auf iOS): Dieselbe DOM-basierte Snapshot-Pipeline wie auf dem Desktop.
- **Native Mobile**: Die in die Seite injizierten DOM-Skripte werden deaktiviert. Stattdessen holt `getPageSource()` den Appium-XML-Baum, der dann in den Snapshot-Serializer eingespeist wird.

Die `context-options` des Traces enthalten `title: 'android — <deviceName>'` / `'ios — <deviceName>'`, damit der Viewer die Frames korrekt beschriftet. Eine Referenz-WDIO-Konfiguration für Android Chrome über Appium findest du unter [`examples/wdio/wdio.mobile.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.mobile.conf.ts).

## Das Artefakt ansehen

Öffne einen Trace im hauseigenen **[Trace Player](/docs/devtools/trace-player)**. Das ist die WebdriverIO-DevTools-UI in einem dedizierten, schreibgeschützten Player-Modus:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
```

Der Player bietet dir:

- DOM-Zeitreisen
- den A11y-Tab mit Pick-Locator-Overlay
- den Transcript-Tab mit Copy-for-LLM
- die Dock-Tabs Errors / Console / Network / Source
- eine scrubbare Timeline

Dieselbe portable `.zip` lässt sich auch in anderen eigenständigen Trace-Viewern und im eingebetteten Viewer eines Allure-Reports öffnen. Eine vollständige Anleitung mit Funktionen und Tastenkürzeln findest du auf der Seite **[Trace Player](/docs/devtools/trace-player)**.

## Mehr erfahren
Das `show-trace`-Bin, das jeder Adapter mitbringt, öffnet dasselbe Archiv im DevTools-Player. Dieser bietet zusätzlich einen **A11y-Tab**: den pro Aktion erfassten Accessibility-Baum. Ein Klick auf eine Zeile kopiert den Locator des jeweiligen Elements.

Diese Locators sind im Dialekt des aufzeichnenden Runners geschrieben. Du kannst sie daher direkt in das Framework einfügen, das den Trace erzeugt hat.

- **Elemente, die nur über ihren Text identifiziert werden:** Unter WebdriverIO wird daraus `a*=Logout`. Unter Selenium wird daraus `//a[contains(., "Logout")]`, beschriftet mit dem Aufruf, der den Locator auflöst: `By.xpath()`.
- **Nightwatch:** Nightwatch bevorzugt einen nativen CSS-Locator wie `button[type="submit"]`. Es ist der einzige Runner, der einen reinen Selektor-String unter einer Standard-CSS-Strategie liest. Nur wenn kein eindeutiger CSS-Locator existiert, greift es auf XPath zurück (beschriftet mit `useXpath()` / `locateStrategy: 'xpath'`).
- **Alle anderen Locators** sind portables CSS.

Für LLMs und Agenten liest du am besten direkt `transcript.md`. Die Datei ist eine kompakte Markdown-Darstellung der Aktionen mit Selektoren und Werten.

- **[Trace Player](/docs/devtools/trace-player)**: die vollständige Anleitung zum `show-trace`-Player mit Funktionen und Tastenkürzeln.
- **[Allure-Integration](/docs/devtools/allure)**: wie Trace-, Screenshot- und Video-Artefakte an einen Allure-Report angehängt werden.
- **[Framework-übergreifende Unterstützung](/docs/devtools/cross-framework)**: die Fähigkeitsmatrix pro Adapter (WebdriverIO / Selenium / Nightwatch).
- **[Einschränkungen des Trace-Modus](/docs/devtools/limitations)**: was der Trace-Modus auslässt und die bekannten Lücken pro Adapter.
- **[Konfigurationsreferenz](/docs/devtools/reference)**: alle Optionen auf einen Blick.