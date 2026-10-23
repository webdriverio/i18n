---
id: trace-mode
title: Trace-Modus
description: "Erfassen Sie Headless-Trace-Artefakte mit dem DevTools-Trace-Modus und konfigurieren Sie Format, Granularität, Aufbewahrung, Screenshots, Video und Assertions."
---

Headless-Erfassungspfad — es öffnet sich kein DevTools-UI-Fenster. Am Ende der Session schreibt der Adapter Trace-Artefakte in einen `test-results/`-Ordner: unter WebdriverIOs `outputDir` (oder `rootDir`), und bei Selenium und Nightwatch neben die Testdatei, mit Fallback auf das Konfigurationsverzeichnis und dann auf das aktuelle Verzeichnis. Bei `session`- / `spec`-Granularität ist das eine `trace-<sessionId>.zip` (oder ein `trace-<sessionId>/`-Verzeichnis); bei `test`-Granularität erhält jeder Test einen eigenen Unterordner (siehe [Trace-Granularität](#trace-granularity--tracegranularity)). Das Artefakt ist portabel und enthält alles, was für Offline-Wiedergabe, Diffing durch KI-Agenten oder jeden Konsumenten benötigt wird, der eine Datei einer Live-UI vorzieht.

Der Trace-Modus **schließt den Live-Modus aus**. Wählen Sie einen pro Session: Menschen, die interaktiv debuggen, wollen den Live-Modus; Agenten, die Läufe vergleichen, oder CI-Bots, die Artefakte sammeln, wollen den Trace-Modus.

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

Der Trace-Modus benötigt WebDriver BiDi (Chrome 114+, Firefox 130+), das WebdriverIO automatisch aktiviert.

Zum Ausprobieren führen Sie das Mocha-Beispiel im Trace-Modus mit `DEVTOOLS_MODE=trace pnpm demo:wdio:mocha` aus; fügen Sie `DEVTOOLS_TRACE_GRANULARITY=test DEVTOOLS_TRACE_POLICY=retain-on-failure` für die Aufbewahrung pro Test hinzu. Die Konfiguration ist [`examples/wdio/mocha/wdio.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/mocha/wdio.conf.ts).

Selenium und Nightwatch liefern dieselbe Trace-Pipeline — siehe deren Adapter-Seiten für die frameworkspezifische Aktivierungssyntax: [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode).

## Was im Artefakt enthalten ist

| Datei | Inhalt |
|---|---|
| `trace.trace` | NDJSON-`context-options` + `before`- / `after`-Action-Events; eine Zeile pro Eintrag |
| `trace.network` | Netzwerkeinträge im HAR-Stil, einer pro Zeile; ein aus dem Resource-Timing-Puffer der Seite gelesener Eintrag (kein BiDi, z. B. Safari oder Appium) trägt `_source: "resource-timing"` und `_resourceType` |
| `trace.mutations` | NDJSON-DOM-Mutationsstream hinter der DOM-Zeitreise; entfällt, wenn nichts erfasst wurde |
| `transcript.md` | Für Menschen/LLMs lesbare Markdown-Zusammenfassung mit Timing, Selektoren, Wert-Annotationen |
| `resources/page@<id>-<ts>.jpeg` | Screenshot, der bei jeder nutzerseitigen Aktion aufgenommen wird |
| `resources/page@<id>-<ts>-elements.json` | Flache Liste der interagierbaren Elemente bei dieser Aktion |
| `resources/page@<id>-<ts>-snapshot.txt` | Nach Tiefe eingerückter Snapshot des Accessibility-Baums (KI-freundlich) |
| `resources/<sha1>.jpeg` | Dichte Filmstreifen-Frames, inhaltsadressiert |
| `resources/src@<sha1>.txt` | Erfasster Testquellcode für den Source-Tab |
| `resources/<sha1>` | Netzwerk-Response-Bodies, inhaltsadressiert |

### Was als „Aktion“ zählt

Befehle werden durch eine Allow-List gefiltert, bevor sie Trace-Einträge erzeugen. Beispiele, die im Trace landen:

- `url` / `get` → `Page.navigate`
- `click` → `Element.click`
- `setValue` / `sendKeys` → `Element.fill`
- `submit`, `clear`, `selectByVisibleText`, …

Die Locator-Auflösung (`$`, `$$`, `findElement(s)`), Seleniums `executeScript`-Polling und das `clearValue`, das `setValue` intern auslöst, sind bewusst ausgeschlossen: Sie repräsentieren keine nutzerseitige Absicht und würden die Timeline verrauschen. Explizite Waits (`waitFor*`, `waitUntil`, Nightwatch `waitForElement*`), Element-Lesezugriffe (`getText`, `isDisplayed`, …) und `execute` erscheinen dagegen. Die Allow-List ist `ACTION_MAP` in [`packages/shared/src/trace-actions.ts`](https://github.com/webdriverio/devtools/blob/main/packages/shared/src/trace-actions.ts).

## Ausgabeformat — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // default: 'zip'
}
```

- **`zip`** (Standard) — ein einzelnes Archiv unter `test-results/trace-<sessionId>.zip`.
- **`ndjson-directory`** — dieselben Dateien entpackt in `test-results/trace-<sessionId>/`. Ein Entpack-Schritt weniger für skriptbasierte oder agentische Konsumenten, die das NDJSON direkt greppen / streamen wollen.

Das `zip` öffnet sich im hauseigenen [`show-trace`-Player](/docs/devtools/trace-player); ein `ndjson-directory`-Trace öffnet sich in anderen kompatiblen Trace-Viewern, oder Sie zippen ihn zuerst, um ihn in `show-trace` zu öffnen.

## Trace-Granularität — `traceGranularity`

Wie viele Trace-Artefakte ein Lauf erzeugt:

```ts
{
  mode: 'trace',
  traceGranularity: 'session' | 'spec' | 'test' // default: 'session'
}
```

| Wert | Ausgabe |
|---|---|
| `session` (Standard) | Ein Trace pro Worker/Session — `test-results/trace-<sessionId>.zip`. |
| `spec` | Ein Trace pro Spec-Datei, unter `test-results/trace-<spec>-<hash>-<sessionId8>.zip`. Kleiner, leichter zu navigieren. |
| `test` | Ein Trace **pro Test**, jeweils in einem eigenen Ordner: `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`. |

Bei `test`-Granularität wird der Ordnername aus dem Basisnamen der Spec, einem Slug des Testtitels, dem Browser und einem `-retry<N>`-Suffix bei wiederholten Versuchen gebildet — z. B. `test-results/login_e2e-logs-in-chrome/trace.zip`, mit einem ersten Retry unter `test-results/login_e2e-logs-in-chrome-retry1/trace.zip`. Traces pro Test sind am besten navigierbar und lassen sich am besten mit einer Aufbewahrungsrichtlinie kombinieren, sodass nur die Traces geschrieben werden, die Sie interessieren.

## Aufbewahrung — `tracePolicy`

Standardmäßig wird jeder Trace behalten (`'on'`). Um nur die interessanten zu behalten — ideal mit `traceGranularity: 'test'`:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure' // default: 'on'
}
```

| Richtlinie | Behält den Trace, wenn… |
|---|---|
| `'on'` (Standard) | Immer — jeder Trace wird geschrieben. |
| `'retain-on-failure'` | Der **letzte** Versuch des Tests fehlgeschlagen ist. Eine Retry-Sequenz aus Fehlschlag und anschließendem Erfolg endet mit `passed` und wird daher *nicht* behalten — Sie bewahren keinen Flake übermäßig auf, der letztlich grün wurde. |
| `'retain-on-first-failure'` | **Versuch 0** fehlgeschlagen ist, unabhängig davon, ob ein späterer Retry erfolgreich war. |
| `'on-first-retry'` | Der Test mindestens einmal wiederholt wurde (ein Versuch 1 existiert). |
| `'on-all-retries'` | Irgendein wiederholter Versuch (Versuch ≥ 1) existiert. |
| `'retain-on-failure-and-retries'` | Der letzte Versuch fehlgeschlagen ist **oder** der Test wiederholt wurde. |

Gegen einen nicht aufbewahrten Abschnitt wird entschieden, und er wird nie auf die Festplatte geschrieben. Die retry-bewussten Richtlinien stützen sich auf ein **Ergebnis-Ledger** pro Versuch, das der Adapter pro retry-stabiler Test-ID führt, sodass `retain-on-failure` und `retain-on-first-failure` den richtigen Versuch auswerten. Wo ein Runner keine Retry-Informationen pro Versuch bereitstellt, fällt jede Richtlinie außer `retain-on-failure` auf `retain-on-failure` zurück; ein Lauf ohne beobachtete Ergebnisse (z. B. ein einfaches eigenständiges Skript) schlägt **offen** fehl und behält den Trace, statt zu riskieren, einen benötigten zu verwerfen.

> Die retry-bewusste Aufbewahrung ist End-to-End für **WebdriverIO** (Mocha / Cucumber) und **Selenium** (Mocha) verifiziert. Bei **Nightwatch** funktioniert `retain-on-failure`, aber die anderen retry-bewussten Richtlinien fallen darauf zurück, weil Nightwatchs `--retries` einen Testfall intern erneut ausführt, ohne die Hooks pro Test erneut auszulösen. WDIOs prozessübergreifende `specFileRetries` liegen ebenfalls außerhalb des (pro Worker geführten) Ledgers. Details finden Sie auf der [Nightwatch-Adapter-Seite](/docs/devtools/nightwatch#trace-mode).

## Dichter Filmstreifen — `filmstrip`

**Standardmäßig** zeichnet der Trace einen **dichten, kontinuierlichen** Screencast auf, sodass der Player flüssig abspielt, statt von Frame zu Frame zu springen. Die dichten Frames liegen neben den Frames pro Aktion (die die DOM-Snapshots enthalten). Setzen Sie `filmstrip: false`, um nur einen Frame pro Aktion aufzuzeichnen — ein kleinerer Trace ohne kontinuierlichen Recorder:

```ts
{
  mode: 'trace',
  filmstrip: false // opt out — one frame per action (default is true)
}
```

- Dichte Frames werden **zusätzlich** zu den Frames pro Aktion (die die DOM-Snapshots enthalten) hinzugefügt, sodass keine DOM-Daten verloren gehen — wenn dichte Frames vorhanden sind, ersetzen sie beim Scrubben den spärlichen Filmstreifen pro Aktion.
- Frames werden beim Export ausgedünnt (≥100 ms Abstand) und inhaltsadressiert, sodass identische Frames (ein statisches Warten) zu einer Ressource zusammenfallen. Der Live-Session-Puffer wird durch `screencast.maxBufferFrames` begrenzt (Standard 2000).
- Die Aufzeichnung verwendet den Screencast-Recorder — CDP-Push unter Chrome/Chromium, Screenshot-Polling anderswo. In Nicht-Chrome-Browsern erzeugt das Polling viele `takeScreenshot`-Befehle; kombinieren Sie dies mit der Option Ihres Reporters zum Stummschalten von Schritten (siehe [Allure-Integration](/docs/devtools/allure)).

`filmstrip` ist in allen drei Adaptern (WebdriverIO / Selenium / Nightwatch) verfügbar.

## Screenshot & Video pro Test — `screenshot` / `video`

Bei `traceGranularity: 'test'` kann jeder Test zusätzlich einen eigenständigen Screenshot und/oder einen Videoausschnitt pro Test erzeugen, angelehnt an die vertraute Ergonomie von Screenshot/Video bei Fehlschlag:

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
| `screenshot` | `'off'` (Standard) · `'on'` · `'only-on-failure'` | `'on'` erfasst nach jedem Test; `'only-on-failure'` nur nach einem fehlgeschlagenen Test. PNG. |
| `video` | `'off'` (Standard) · jeder `tracePolicy`-Wert | Zeichnet den Screencast kontinuierlich auf und behält den Ausschnitt jedes Tests nach derselben Aufbewahrungssemantik wie `tracePolicy`. WebM; die Kodierung benötigt `ffmpeg` im `PATH`. Ein Wert ungleich `off` startet den Recorder eigenständig — Sie benötigen nicht zusätzlich `filmstrip` oder `screencast.enabled`. |

Beide sind auf den Trace-Modus + `traceGranularity: 'test'` beschränkt (den Pro-Test-Bereich, an den sie angehängt werden). Bei gröberen Granularitäten bewirken sie nichts.

- **WebdriverIO** — `screenshot` / `video` sind Service-Optionen; sie werden inline an Allure angehängt, wenn `@wdio/allure-reporter` vorhanden ist.
- **Selenium** — dieselben Optionen in seinen `DevToolsOptions`; sie werden über `allure-js-commons` inline an Allure angehängt, wenn ein Allure-Runner-Adapter aktiv ist.
- **Nightwatch** — **nur Erzeugung**: Die Dateien werden in das Trace-Ausgabeverzeichnis geschrieben (und im Manifest aufgeführt), aber nicht inline an Allure angehängt — Nightwatch hat keine Live-Allure-Attach-API. Siehe [Einschränkungen des Trace-Modus](/docs/devtools/limitations).

> `screencast.enabled` ist die separate kontinuierliche `.webm`-Aufzeichnung des **Live-Modus** und wird im Trace-Modus ignoriert. Verwenden Sie im Trace-Modus `filmstrip` (dichte Frames im Trace) oder `video` pro Test; die Screencast-Tuning-Felder (`quality`, `maxWidth`, `pollIntervalMs`, …) gelten weiterhin für den jeweils laufenden Recorder.

## Artefakt-Manifest — `emitArtifactsManifest`

Schreibt eine `devtools-artifacts-<sessionId>.json` neben den Trace — einen generischen Index, den Reporter und CI nutzen, um die erzeugten Artefakte zu finden (jeden Trace / Screenshot / jedes Video sowie den Status jedes Tests):

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // default: off; auto-on when Allure is detected
}
```

- **Standardmäßig aus.** Es wird **automatisch aktiviert**, wenn ein Allure-Reporter erkannt wird — WebdriverIOs `@wdio/allure-reporter` in der Konfiguration oder eine aktive Selenium-`allure-js-commons`-Runtime.
- **Nightwatch ist Opt-in**: Es gibt kein Live-Allure-Signal zur automatischen Erkennung (`nightwatch-allure` arbeitet nachträglich), daher wird es nie automatisch aktiviert — setzen Sie es explizit, wenn Sie das Manifest wünschen.

## Assertions — `captureAssertions`

Assertions erscheinen als vollwertige Aktionszeilen im Trace (standardmäßig aktiviert; setzen Sie `captureAssertions: false` zum Deaktivieren):

- **`node:assert`** — in allen drei Adaptern als `assert.<method>`-Zeilen erfasst.
- **WebdriverIO `expect`** — erfolgreiche *und* fehlschlagende `expect(...)`-Matcher (`expect($el).toHaveText(...)`, `toBeExisting()`, …) erscheinen als `expect.<matcher>`-Zeilen mit dem erwarteten Wert, der Quellposition des Elements und einem Snapshot; die internen Polling-Befehle des Matchers werden unterdrückt, sodass nur die Assertion angezeigt wird.
- **Nightwatch `browser.assert.*` / `browser.verify.*`** — native Assertions erscheinen als `assert.<m>`- / `verify.<m>`-Zeilen.

Erfolgreiche Assertions werden grün dargestellt; fehlgeschlagene rot mit der Fehlermeldung.

## Mobile Testing

Appium-Sessions werden im Live- und im Trace-Modus erfasst. Das Unterscheidungsmerkmal ist der **Browsername** in den Capabilities, nicht das Gerät:

- **Mobile Web** (Chrome auf Android, Safari auf iOS): dieselbe DOM-basierte Snapshot-Pipeline wie auf dem Desktop.
- **Native App** (kein `browserName`): Die in die Seite injizierten DOM-Skripte werden deaktiviert; stattdessen speist der Appium-XML-Baum den Snapshot-Serializer.
- **Hybrid-App**: Nur WebdriverIO folgt der Session in ihre Webview; die anderen Adapter entscheiden anhand der Start-Capabilities.

Die `context-options` des Traces erfassen Plattform, Modell und Betriebssystemversion, damit der Viewer die Frames korrekt beschriftet. Führen Sie die Beispiele mit `pnpm demo:wdio:mobile` aus (außerdem `:selenium:mobile`, `:nightwatch:mobile`, `:python:mobile`). Siehe **[Mobile Testing](/docs/devtools/mobile)** für die vollständige Referenz.

## Das Artefakt ansehen

Öffnen Sie einen Trace im hauseigenen **[Trace Player](/docs/devtools/trace-player)** — der WebdriverIO-DevTools-UI in einem dedizierten schreibgeschützten Player-Modus:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
```

Der Player bietet Ihnen DOM-Zeitreise, den A11y-Tab und das Pick-Locator-Overlay, den Transcript-Tab mit Copy-for-LLM, die Dock-Tabs Errors / Console / Network / Source sowie eine scrubbare Timeline. Dieselbe portable `.zip` öffnet sich auch in anderen eigenständigen Trace-Viewern und im eingebetteten Viewer eines Allure-Reports. Siehe die Seite **[Trace Player](/docs/devtools/trace-player)** für die vollständige Anleitung, Funktionen und Tastenkürzel.

## Locators im A11y-Tab

Das von jedem Adapter mitgelieferte `show-trace`-Bin öffnet dasselbe Archiv im DevTools-Player, der zusätzlich einen **A11y-Tab** bereitstellt: den pro Aktion erfassten Accessibility-Baum, in dem ein Klick auf eine Zeile den Locator des Elements kopiert.

Diese Locators werden im Dialekt des aufzeichnenden Runners geschrieben, sodass sie sich direkt in das Framework einfügen lassen, das den Trace erzeugt hat. Ein Element, das nur über seinen Text identifiziert wird, ist unter WebdriverIO `a*=Logout` und unter Selenium `//a[contains(., "Logout")]` — beschriftet mit dem Aufruf, der ihn auflöst, `By.xpath()`. Nightwatch bevorzugt einen nativen CSS-Locator wie `button[type="submit"]`, da es der einzige Runner ist, der einen bloßen Selektor-String mit einer Standard-CSS-Strategie liest, und greift nur dann auf XPath zurück (beschriftet mit `useXpath()` / `locateStrategy: 'xpath'`), wenn kein eindeutiger CSS-Locator existiert. Alle anderen Locators sind portables CSS.

Für die Nutzung durch LLMs / Agenten lesen Sie `transcript.md` direkt — es ist eine kompakte Markdown-Darstellung der Aktionen mit Selektoren und Werten.

## Mehr erfahren

- **[Trace Player](/docs/devtools/trace-player)** — die vollständige Anleitung zum `show-trace`-Player, Funktionen und Tastenkürzel.
- **[Allure-Integration](/docs/devtools/allure)** — wie Trace- / Screenshot- / Video-Artefakte an einen Allure-Report angehängt werden.
- **[Framework-übergreifende Unterstützung](/docs/devtools/cross-framework)** — die Fähigkeitsmatrix pro Adapter (WebdriverIO / Selenium / Nightwatch).
- **[Einschränkungen des Trace-Modus](/docs/devtools/limitations)** — was der Trace-Modus auslässt und die bekannten Lücken pro Adapter.
- **[Konfigurationsreferenz](/docs/devtools/reference)** — alle Optionen auf einen Blick.