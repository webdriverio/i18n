---
id: trace-mode
title: Trace-Modus
description: "Erfassen Sie Headless-Trace-Artefakte mit dem DevTools-Trace-Modus und konfigurieren Sie Format, Granularität, Aufbewahrung, Screenshots, Video und Assertions."
---

Headless-Erfassung – es öffnet sich kein DevTools-UI-Fenster. Am Ende der Session schreibt der Adapter Trace-Artefakte in einen `test-results/`-Ordner neben Ihrem Spec- bzw. Konfigurationsverzeichnis. Bei der Granularität `session` / `spec` ist das eine `trace-<sessionId>.zip` (oder ein Verzeichnis `trace-<sessionId>/`); bei der Granularität `test` erhält jeder Test seinen eigenen Unterordner (siehe [Trace-Granularität](#trace-granularity--tracegranularity)). Das Artefakt ist portabel und enthält alles, was für die Offline-Wiedergabe, für Diffs durch KI-Agenten oder für jeden Konsumenten benötigt wird, der eine Datei einer Live-UI vorzieht.

Der Trace-Modus **schließt den Live-Modus aus**. Wählen Sie pro Session einen: Menschen, die interaktiv debuggen, wollen den Live-Modus; Agenten, die Läufe vergleichen, oder CI-Bots, die Artefakte sammeln, wollen den Trace-Modus.

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

Eine vollständige Referenzkonfiguration zum Kopieren und Einfügen finden Sie unter [`examples/wdio/wdio.trace.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.trace.conf.ts).

Selenium und Nightwatch liefern dieselbe Trace-Pipeline aus – die frameworkspezifische Syntax zum Aktivieren finden Sie auf den jeweiligen Adapter-Seiten: [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode).

## Was das Artefakt enthält

| Datei | Inhalt |
|---|---|
| `trace.trace` | NDJSON mit `context-options` + `before` / `after`-Action-Events; eine Zeile pro Datensatz |
| `trace.network` | Netzwerkeinträge im HAR-Stil, einer pro Zeile |
| `transcript.md` | Für Menschen/LLMs lesbare Markdown-Zusammenfassung mit Timing, Selektoren und Wert-Annotationen |
| `resources/page@<id>-<ts>.jpeg` | Screenshot, der bei jeder benutzerseitigen Aktion aufgenommen wird |
| `resources/page@<id>-<ts>-elements.json` | Flache Liste der interagierbaren Elemente zum Zeitpunkt dieser Aktion |
| `resources/page@<id>-<ts>-snapshot.txt` | Nach Tiefe eingerückter Snapshot des Accessibility-Trees (KI-freundlich) |

### Was als „Aktion“ zählt

Befehle werden durch eine Allow-List gefiltert, bevor sie Trace-Einträge erzeugen. Beispiele, die im Trace landen:

- `url` / `get` → `Page.navigate`
- `click` → `Element.click`
- `setValue` / `sendKeys` → `Element.fill`
- `submit`, `clear`, `selectByVisibleText`, …

Interne Befehle wie `findElement`, `waitUntil` und `executeScript` werden bewusst ausgeschlossen – sie repräsentieren keine benutzerseitige Absicht und würden die Timeline unnötig füllen. Die vollständige Allow-List befindet sich in [`@wdio/devtools-core/action-mapping.ts`](https://github.com/webdriverio/devtools/blob/main/packages/core/src/action-mapping.ts).

## Ausgabeformat — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // default: 'zip'
}
```

- **`zip`** (Standard) — ein einzelnes Archiv unter `test-results/trace-<sessionId>.zip`.
- **`ndjson-directory`** — dieselben Dateien entpackt in `test-results/trace-<sessionId>/`. Ein Entpackschritt weniger für skriptbasierte oder agentische Konsumenten, die das NDJSON direkt greppen / streamen möchten.

Beide Formate lassen sich im hauseigenen [`show-trace`-Player](/docs/devtools/trace-player) und in anderen kompatiblen Trace-Viewern öffnen.

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
| `spec` | Ein Trace pro Spec-Datei. Kleiner, leichter zu navigieren. |
| `test` | Ein Trace **pro Test**, jeweils in einem eigenen Ordner: `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`. |

Bei der Granularität `test` wird der Ordnername aus dem Basisnamen der Spec, einem Slug des Testtitels, dem Browser und bei wiederholten Versuchen einem Suffix `-retry<N>` gebildet – z. B. `test-results/login_e2e-logs-in-chrome/trace.zip`, mit einem ersten Retry unter `test-results/login_e2e-logs-in-chrome-retry1/trace.zip`. Traces pro Test sind am besten navigierbar und lassen sich am besten mit einer Aufbewahrungsrichtlinie kombinieren, sodass nur die Traces geschrieben werden, die Sie wirklich interessieren.

## Aufbewahrung — `tracePolicy`

Standardmäßig wird jeder Trace behalten (`'on'`). Um nur die interessanten zu behalten – ideal in Kombination mit `traceGranularity: 'test'`:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure' // default: 'on'
}
```

| Richtlinie | Behält den Trace, wenn… |
|---|---|
| `'on'` (Standard) | Immer – jeder Trace wird geschrieben. |
| `'retain-on-failure'` | Der **letzte** Versuch des Tests fehlgeschlagen ist. Eine Retry-Folge aus Fehlschlag und anschließendem Erfolg endet mit `passed` und wird daher *nicht* behalten – so bewahren Sie keinen Flake auf, der am Ende doch grün wurde. |
| `'retain-on-first-failure'` | **Versuch 0** fehlgeschlagen ist, unabhängig davon, ob ein späterer Retry erfolgreich war. |
| `'on-first-retry'` | Der Test mindestens einmal wiederholt wurde (ein Versuch 1 existiert). |
| `'on-all-retries'` | Irgendein wiederholter Versuch (Versuch ≥ 1) existiert. |
| `'retain-on-failure-and-retries'` | Der letzte Versuch fehlgeschlagen ist **oder** der Test wiederholt wurde. |

Über einen nicht aufbewahrten Abschnitt wird negativ entschieden, und er wird nie auf die Festplatte geschrieben. Die Retry-bewussten Richtlinien stützen sich auf ein **Ergebnisprotokoll** pro Versuch, das der Adapter pro retry-stabiler Test-ID führt, sodass `retain-on-failure` und `retain-on-first-failure` den richtigen Versuch auswerten. Wenn ein Runner keine Retry-Informationen pro Versuch bereitstellt, fällt jede Richtlinie außer `retain-on-failure` auf `retain-on-failure` zurück; ein Lauf ohne beobachtete Ergebnisse (z. B. ein einfaches Standalone-Skript) schlägt **offen** fehl und behält den Trace, anstatt zu riskieren, einen benötigten zu verwerfen.

> Die Retry-bewusste Aufbewahrung ist End-to-End für **WebdriverIO** (mocha / cucumber) und **Selenium** (mocha) verifiziert. Bei **Nightwatch** funktioniert `retain-on-failure`, aber die anderen Retry-bewussten Richtlinien fallen darauf zurück, da Nightwatchs `--retries` einen Testfall intern erneut ausführt, ohne die Hooks pro Test erneut auszulösen. Auch WDIOs prozessübergreifendes `specFileRetries` liegt außerhalb des (pro Worker geführten) Protokolls. Details finden Sie auf der [Nightwatch-Adapter-Seite](/docs/devtools/nightwatch#trace-mode).

## Dichter Filmstreifen — `filmstrip`

**Standardmäßig** zeichnet der Trace einen **dichten, kontinuierlichen** Screencast auf, sodass der Player eine flüssige Wiedergabe beim Scrubben bietet, anstatt von Frame zu Frame zu springen. Die dichten Frames liegen neben den Frames pro Aktion (die die DOM-Snapshots enthalten). Setzen Sie `filmstrip: false`, um nur einen Frame pro Aktion aufzuzeichnen – ein kleinerer Trace ohne kontinuierlichen Recorder:

```ts
{
  mode: 'trace',
  filmstrip: false // opt out — one frame per action (default is true)
}
```

- Dichte Frames werden **zusätzlich** zu den Frames pro Aktion (die die DOM-Snapshots enthalten) hinzugefügt, sodass keine DOM-Daten verloren gehen – wenn dichte Frames vorhanden sind, ersetzen sie beim Scrubben den spärlichen Filmstreifen pro Aktion.
- Frames werden beim Export ausgedünnt (≥100 ms Abstand) und inhaltsadressiert, sodass identische Frames (ein statisches Warten) zu einer Ressource zusammenfallen. Der Live-Session-Puffer wird durch `screencast.maxBufferFrames` begrenzt (Standard 2000).
- Die Aufzeichnung verwendet den Screencast-Recorder – CDP-Push unter Chrome/Chromium, Screenshot-Polling anderswo. In Nicht-Chrome-Browsern setzt das Polling viele `takeScreenshot`-Befehle ab; kombinieren Sie es mit der Option Ihres Reporters zum Unterdrücken von Steps (siehe [Allure-Integration](/docs/devtools/allure)).

`filmstrip` ist in allen drei Adaptern verfügbar (WebdriverIO / Selenium / Nightwatch).

## Screenshot & Video pro Test — `screenshot` / `video`

Bei `traceGranularity: 'test'` kann jeder Test zusätzlich einen eigenständigen Screenshot und/oder einen Video-Ausschnitt pro Test erzeugen – analog zur vertrauten Screenshot/Video-bei-Fehlschlag-Ergonomie:

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
| `video` | `'off'` (Standard) · jeder `tracePolicy`-Wert | Zeichnet den Screencast kontinuierlich auf und behält den Ausschnitt jedes Tests gemäß derselben Aufbewahrungssemantik wie `tracePolicy`. WebM. Ein Wert ungleich `off` startet den Recorder eigenständig – Sie benötigen nicht zusätzlich `filmstrip` oder `screencast.enabled`. |

Beide sind auf den Trace-Modus + `traceGranularity: 'test'` beschränkt (den Pro-Test-Bereich, an den sie angehängt werden). Bei gröberen Granularitäten haben sie keine Wirkung.

- **WebdriverIO** — `screenshot` / `video` sind Service-Optionen; sie werden inline an Allure angehängt, wenn `@wdio/allure-reporter` vorhanden ist.
- **Selenium** — dieselben Optionen in den `DevToolsOptions`; sie werden über `allure-js-commons` inline an Allure angehängt, wenn ein Allure-Runner-Adapter aktiv ist.
- **Nightwatch** — **nur Erzeugung**: Die Dateien werden in das Trace-Ausgabeverzeichnis geschrieben (und im Manifest aufgeführt), aber nicht inline an Allure angehängt – Nightwatch hat keine Live-Allure-Attach-API. Siehe [Einschränkungen des Trace-Modus](/docs/devtools/limitations).

> `screencast.enabled` ist die separate kontinuierliche `.webm`-Aufzeichnung des **Live-Modus** und wird im Trace-Modus ignoriert. Verwenden Sie im Trace-Modus `filmstrip` (dichte Frames im Trace) oder `video` pro Test; die Screencast-Tuning-Felder (`quality`, `maxWidth`, `pollIntervalMs`, …) gelten weiterhin für den jeweils laufenden Recorder.

## Artefakt-Manifest — `emitArtifactsManifest`

Schreibt eine `devtools-artifacts-<sessionId>.json` neben den Trace – einen generischen Index, den Reporter und CI nutzen, um die erzeugten Artefakte zu finden (jeden Trace / Screenshot / jedes Video sowie den Status jedes Tests):

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // default: off; auto-on when Allure is detected
}
```

- **Standardmäßig deaktiviert.** Es wird **automatisch aktiviert**, wenn ein Allure-Reporter erkannt wird – WebdriverIOs `@wdio/allure-reporter` in der Konfiguration oder eine aktive Selenium-`allure-js-commons`-Runtime.
- **Bei Nightwatch ist es opt-in**: Es gibt kein Live-Allure-Signal, anhand dessen eine automatische Erkennung möglich wäre (`nightwatch-allure` arbeitet nachträglich), daher wird es nie automatisch aktiviert – setzen Sie es explizit, wenn Sie das Manifest wünschen.

## Assertions — `captureAssertions`

Assertions erscheinen als vollwertige Action-Zeilen im Trace (standardmäßig aktiviert; setzen Sie `captureAssertions: false`, um sie zu deaktivieren):

- **`node:assert`** — in allen drei Adaptern als `assert.<method>`-Zeilen erfasst.
- **WebdriverIO `expect`** — erfolgreiche *und* fehlgeschlagene `expect(...)`-Matcher (`expect($el).toHaveText(...)`, `toBeExisting()`, …) erscheinen als `expect.<matcher>`-Zeilen mit dem erwarteten Wert, der Quellposition des Elements und einem Snapshot; die internen Polling-Befehle des Matchers werden unterdrückt, sodass nur die Assertion angezeigt wird.
- **Nightwatch `browser.assert.*` / `browser.verify.*`** — native Assertions erscheinen als `assert.<m>`- / `verify.<m>`-Zeilen.

Erfolgreiche Assertions werden grün dargestellt; fehlgeschlagene rot mit der Fehlermeldung.

## Mobile Tests

Der Trace-Modus erkennt mobile Sessions über `platformName: 'android' | 'ios'` (ohne Beachtung der Groß-/Kleinschreibung) und passt sich an:

- **Mobile Web** (Chrome unter Android, Safari unter iOS): dieselbe DOM-basierte Snapshot-Pipeline wie auf dem Desktop.
- **Native Mobile**: Die in die Seite injizierten DOM-Skripte werden deaktiviert; stattdessen wird `getPageSource()` verwendet, um den Appium-XML-Baum abzurufen, der dann an den Snapshot-Serializer übergeben wird.

Die `context-options` des Traces enthalten `title: 'android — <deviceName>'` / `'ios — <deviceName>'`, damit der Viewer die Frames korrekt beschriftet. Eine WDIO-Referenzkonfiguration für Android Chrome über Appium finden Sie unter [`examples/wdio/wdio.mobile.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.mobile.conf.ts).

## Das Artefakt ansehen

Öffnen Sie einen Trace im hauseigenen **[Trace Player](/docs/devtools/trace-player)** – der WebdriverIO-DevTools-UI in einem dedizierten, schreibgeschützten Player-Modus:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
```

Der Player bietet Ihnen DOM-Zeitreisen, den A11y-Tab und das Pick-Locator-Overlay, den Transcript-Tab mit Copy-for-LLM, die Dock-Tabs Errors / Console / Network / Source sowie eine scrubbbare Timeline. Dieselbe portable `.zip` lässt sich auch in anderen eigenständigen Trace-Viewern und im eingebetteten Viewer eines Allure-Reports öffnen. Auf der Seite **[Trace Player](/docs/devtools/trace-player)** finden Sie die vollständige Anleitung, Funktionen und Tastenkürzel.

## Mehr erfahren
Das von jedem Adapter mitgelieferte `show-trace`-Bin öffnet dasselbe Archiv im DevTools-Player, der zusätzlich einen **A11y-Tab** bereitstellt: den pro Aktion erfassten Accessibility-Tree, in dem ein Klick auf eine Zeile den Locator dieses Elements kopiert.

Diese Locatoren werden im Dialekt des aufzeichnenden Runners geschrieben, sodass sie sich direkt in das Framework einfügen lassen, das den Trace erzeugt hat. Ein Element, das nur über seinen Text identifiziert wird, ist unter WebdriverIO `a*=Logout` und unter Selenium `//a[contains(., "Logout")]` – beschriftet mit dem Aufruf, der es auflöst, `By.xpath()`. Nightwatch bevorzugt einen nativen CSS-Locator wie `button[type="submit"]`, da es der einzige Runner ist, der einen reinen Selektor-String mit einer Standard-CSS-Strategie liest, und greift nur dann auf XPath zurück (beschriftet mit `useXpath()` / `locateStrategy: 'xpath'`), wenn kein eindeutiger CSS-Locator existiert. Alle anderen Locatoren sind portables CSS.

Für die Nutzung durch LLMs / Agenten lesen Sie `transcript.md` direkt – es ist eine kompakte Markdown-Darstellung der Aktionen mit Selektoren und Werten.

- **[Trace Player](/docs/devtools/trace-player)** — die vollständige Anleitung zum `show-trace`-Player, Funktionen und Tastenkürzel.
- **[Allure-Integration](/docs/devtools/allure)** — wie Trace-, Screenshot- und Video-Artefakte an einen Allure-Report angehängt werden.
- **[Framework-übergreifende Unterstützung](/docs/devtools/cross-framework)** — die Fähigkeitsmatrix pro Adapter (WebdriverIO / Selenium / Nightwatch).
- **[Einschränkungen des Trace-Modus](/docs/devtools/limitations)** — was der Trace-Modus auslässt und die bekannten Lücken pro Adapter.
- **[Konfigurationsreferenz](/docs/devtools/reference)** — alle Optionen auf einen Blick.