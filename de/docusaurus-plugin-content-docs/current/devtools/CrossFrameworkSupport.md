---
id: cross-framework
title: Framework-übergreifende Unterstützung
description: "Vergleichen Sie, wie vollständig der DevTools-Trace-Modus Ausführungen von WebdriverIO, Selenium und Nightwatch erfasst und welche Lücken die einzelnen Adapter aufweisen."
---

Das Trace-Format und der `show-trace`-Player sind für WebdriverIO / Selenium / Nightwatch identisch; diese Seite zeigt, wo sich die Vollständigkeit der Erfassung unterscheidet. Die vollständige Referenz zum Trace-Modus finden Sie unter [Trace Mode](/docs/devtools/wdio/trace-mode).

Die Transformationen, die einen Trace erstellen, befinden sich in [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace), eine Ebene unterhalb der Adapter, daher sind **das Trace-Format und der `show-trace`-Player für jeden Adapter identisch** – dieselbe `.zip`-Datei (oder dasselbe Verzeichnis) wird im selben Player geöffnet, unabhängig davon, welcher Adapter sie erzeugt hat. Die drei unten aufgeführten Adapter teilen sich zusätzlich die Kernoptionen (`mode`, `traceGranularity`, `tracePolicy`, `traceFormat`, `filmstrip`, `emitArtifactsManifest`, `captureAssertions`).

**Die Vollständigkeit der Erfassung variiert jedoch je nach Adapter** – WebdriverIO ist am vollständigsten; Selenium und Nightwatch decken den Kernablauf ab, mit den unten genannten Lücken. Die framework-spezifische Syntax zum Aktivieren finden Sie auf der jeweiligen Adapter-Seite – siehe [Selenium](/docs/devtools/selenium#trace-mode) und [Nightwatch](/docs/devtools/nightwatch#trace-mode).

Der Python-Adapter (siehe die **Python**-Tabs auf der Seite [Selenium](/docs/devtools/selenium)) schreibt dasselbe Archiv und wird im selben Player geöffnet, ist aber nicht in dieser Tabelle enthalten: Er führt kein JavaScript im Testprozess aus, daher erstellt das Backend seinen Trace aus dem erfassten Stream, anstatt dass der Adapter ihn im Prozess erstellt. Für Granularität und Aufbewahrung gibt es Python-Entsprechungen – `--devtools-trace-granularity session|test` und `--devtools-trace-policy`, wobei Letzteres mit seinen retry-bewussten Werten auf `retain-on-failure` zurückfällt, da über diese Verbindung keine Versuchsnummer übertragen wird. Die Zeilen ohne Python-Entsprechung sind diejenigen für testbezogene Artefakte: `screenshot`, `video` und Inline-Allure-Anhänge. Was er erfasst – DOM-Zeitreise, den dichten Filmstreifen, den A11y-Baum und das Element-Overlay, Befehle, Konsole, Netzwerk, Assertions, Ausführungssteuerung sowie Preserve & Rerun – wird auf einer eigenen Seite beschrieben.

| Funktion | WebdriverIO | Selenium | Nightwatch |
|---|---|---|---|
| Trace-Modus + `show-trace`-Player | ✅ | ✅ | ✅ |
| DOM-Zeitreise (Mutationserfassung) | ✅ | ✅ ¹ | ✅ |
| A11y-Tab + Pick-Locator-Overlay (Trace-Player) | ✅ | ✅ | ✅ |
| Transkript + Copy-for-LLM | ✅ | ✅ | ✅ |
| Testbezogene `screenshot` / `video` | ✅ Inline-Allure | ✅ Inline-Allure | ⚠️ nur Erzeugung ² |
| Automatische Erkennung von `emitArtifactsManifest` | ✅ | ✅ | ⚠️ nur Opt-in |
| Retry-bewusste `tracePolicy` | ✅ | ✅ | ⚠️ nur `retain-on-failure` ³ |
| `traceGranularity: 'test'` | ✅ | ✅ | ⚠️ Cucumber / Exports-Objekt; BDD-`describe/it` fällt auf einen Sitzungsausschnitt zusammen |
| Cucumber-Verschachtelung Feature→Scenario→Step | Scenario→Step ⁴ | ✅ vollständig | Feature→Scenario ⁵ |
| BiDi-Erfassung (Konsole / Netzwerk / Exceptions) | ✅ automatisch | ✅ automatisch | ⚠️ Opt-in (`bidi: true` + `webSocketUrl`) |
| Screencast (Filmstreifen / Video) | CDP-Push | CDP-Push | nur Polling |
| A11y-Tab + Overlay im Live-Dashboard | ✅ | nur Trace-Player | nur Trace-Player |

¹ Selenium rekonstruiert das DOM pro Navigation; das Anker-Timing ist ungefähr (der Snapshot einer Navigation kann dem auslösenden Befehl hinterherhinken).
² Nightwatch hat keine Live-Allure-Attach-API, daher werden testbezogene Artefakte in das Trace-Ausgabeverzeichnis geschrieben und im Manifest aufgeführt, aber keinem Allure-Test angehängt.
³ Nightwatchs `--retries` führt einen Test intern erneut aus, ohne die testbezogenen Hooks des Plugins erneut auszulösen, daher fallen die retry-bewussten Richtlinien (`on-first-retry`, `retain-on-first-failure`, …) auf `retain-on-failure` zurück.
⁴ WebdriverIO überträgt noch keine Abstammung auf Feature-Ebene, daher lautet seine Cucumber-Verschachtelung Scenario→Step.
⁵ Nightwatch versieht die Verschachtelung noch nicht pro Step (nur Feature→Scenario).