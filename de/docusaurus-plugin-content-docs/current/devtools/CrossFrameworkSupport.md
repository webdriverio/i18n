---
id: cross-framework
title: Framework-übergreifende Unterstützung
description: "Vergleichen Sie, wie vollständig der DevTools-Trace-Modus Läufe von WebdriverIO, Selenium und Nightwatch erfasst und welche Lücken jeder Adapter aufweist."
---

Das Trace-Format und der `show-trace`-Player sind für WebdriverIO / Selenium / Nightwatch identisch; diese Seite zeigt, wo sich die Vollständigkeit der Erfassung unterscheidet. Die vollständige Referenz zum Trace-Modus finden Sie unter [Trace Mode](/docs/devtools/wdio/trace-mode).

Die Transformationen, die einen Trace erstellen, befinden sich in [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace), eine Schicht unterhalb der Adapter, sodass **das Trace-Format und der `show-trace`-Player für jeden Adapter identisch sind** – dieselbe `.zip`-Datei (oder dasselbe Verzeichnis) öffnet sich im selben Player, unabhängig davon, welcher Adapter sie erzeugt hat. Die drei unten aufgeführten Adapter teilen sich zusätzlich die Kernoptionen (`mode`, `traceGranularity`, `tracePolicy`, `traceFormat`, `filmstrip`, `emitArtifactsManifest`, `captureAssertions`).

**Die Vollständigkeit der Erfassung variiert jedoch je nach Adapter** – WebdriverIO ist am vollständigsten; Selenium und Nightwatch decken den Kernablauf ab, mit den unten aufgeführten Lücken. Die frameworkspezifische Syntax zum Aktivieren finden Sie auf der jeweiligen Adapter-Seite – siehe [Selenium](/docs/devtools/selenium#trace-mode) und [Nightwatch](/docs/devtools/nightwatch#trace-mode).

Der Python-Adapter (siehe die **Python**-Tabs auf der Seite [Selenium](/docs/devtools/selenium)) schreibt dasselbe Archiv und öffnet sich im selben Player, ist aber nicht in dieser Tabelle enthalten: Er führt im Testprozess kein JavaScript aus, sodass das Backend seinen Trace aus dem erfassten Stream erstellt, anstatt dass der Adapter ihn im Prozess erstellt. Für Granularität und Aufbewahrung gibt es durchaus Python-Entsprechungen – `--devtools-trace-granularity session|test` und `--devtools-trace-policy`, wobei Letzteres mit seinen retry-bewussten Werten auf `retain-on-failure` zurückfällt, da nichts auf dieser Verbindung eine Versuchsnummer überträgt. Die Zeilen ohne Python-Entsprechung sind die Zeilen zu Artefakten pro Test: `screenshot`, `video` und Inline-Allure-Anhänge. Was er tatsächlich erfasst – DOM-Zeitreise, den dichten Filmstreifen, den A11y-Baum und das Element-Overlay, Befehle, Konsole, Netzwerk, Assertions, Laufsteuerung sowie Preserve & Rerun – wird auf einer eigenen Seite beschrieben.

| Funktion | WebdriverIO | Selenium | Nightwatch |
|---|---|---|---|
| Trace-Modus + `show-trace`-Player | ✅ | ✅ | ✅ |
| DOM-Zeitreise (Mutationserfassung) | ✅ | ✅ ¹ | ✅ |
| A11y-Tab + Pick-Locator-Overlay (Trace-Player) | ✅ | ✅ | ✅ |
| Transkript + Copy-for-LLM | ✅ | ✅ | ✅ |
| `screenshot` / `video` pro Test | ✅ Inline-Allure | ✅ Inline-Allure | ⚠️ nur Erzeugung ² |
| Automatische Erkennung von `emitArtifactsManifest` | ✅ | ✅ | ⚠️ nur Opt-in |
| Retry-bewusste `tracePolicy` | ✅ | ✅ | ⚠️ nur `retain-on-failure` ³ |
| `traceGranularity: 'test'` | ✅ | ✅ | ⚠️ Cucumber / Exports-Objekt; BDD `describe/it` wird zu einem Session-Abschnitt zusammengefasst |
| Cucumber-Verschachtelung Feature→Scenario→Step | Scenario→Step ⁴ | ✅ vollständig | Feature→Scenario ⁵ |
| BiDi-Erfassung (Konsole / Netzwerk / Exceptions) | ✅ automatisch | ✅ automatisch | ⚠️ Opt-in (`bidi: true` + `webSocketUrl`) |
| Screencast (Filmstreifen / Video) | CDP-Push | CDP-Push | nur Polling |
| A11y-Tab + Overlay im Live-Dashboard | ✅ | nur Trace-Player | nur Trace-Player |

¹ Selenium rekonstruiert das DOM pro Navigation; das Anker-Timing ist ungefähr (der Snapshot einer Navigation kann dem Befehl, der sie ausgelöst hat, hinterherhinken).
² Nightwatch hat keine Live-API für Allure-Anhänge, daher werden Artefakte pro Test in das Trace-Ausgabeverzeichnis geschrieben und im Manifest aufgeführt, aber nicht an einen Allure-Test angehängt.
³ Nightwatchs `--retries` führt einen Test intern erneut aus, ohne die Per-Test-Hooks des Plugins erneut auszulösen, sodass die retry-bewussten Richtlinien (`on-first-retry`, `retain-on-first-failure`, …) auf `retain-on-failure` zurückfallen.
⁴ WebdriverIO überträgt noch keine Abstammung auf Feature-Ebene, daher ist seine Cucumber-Verschachtelung Scenario→Step.
⁵ Nightwatch kennzeichnet noch keine Verschachtelung pro Step (nur Feature→Scenario).