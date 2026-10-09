---
id: trace-player
title: Trace Player
description: "Öffnen Sie Trace-Mode-Artefakte im show-trace-Player zur Offline-Wiedergabe und Überprüfung oder laden Sie sie in andere Trace-Viewer."
---

Der `show-trace`-Player öffnet jeden im [Trace Mode](/docs/devtools/wdio/trace-mode) erzeugten Trace direkt in der WebdriverIO DevTools UI — ein dedizierter, schreibgeschützter **Player**-Modus für Offline-Wiedergabe, Überprüfung und Diffing durch KI-Agenten.

## Demo

![Trace Player Demo](/img/devtools/trace-player.gif)

## `show-trace` — der hauseigene Player

Einen Trace in der DevTools UI öffnen:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
pnpm show-trace trace-<sessionId>.zip     # from the devtools monorepo
```

Das `show-trace`-Bin wird mit jedem Adapter (`@wdio/devtools-service`, `@wdio/nightwatch-devtools`, `@wdio/selenium-devtools`) ausgeliefert und ist daher in jedem Projekt verfügbar, das einen davon installiert — ohne zusätzliche Abhängigkeit. Es startet dieselbe DevTools UI in einem dedizierten **Player**-Modus und öffnet sie in Ihrem Browser:

- **Aktionsliste** (links) — die aufgezeichneten Befehle, daneben ein **Metadata**-Tab.
- **Browser-Bereich** (Mitte) — die rekonstruierte Seite für die ausgewählte Aktion (siehe [DOM-Zeitreise](#trace-player-features) unten). Enthält der Trace einen Filmstreifen/ein Video, wechselt ein **Snapshot / Screencast**-Umschalter zum aufgezeichneten Video.
- **Zeitleiste** (oben) — ein Filmstreifen aus Miniaturansichten an ihren Echtzeitpositionen sowie eine Scrub-Leiste mit verschiebbarem Abspielkopf. Klicken Sie auf eine Miniaturansicht oder ziehen Sie an eine beliebige Stelle, um dorthin zu springen.
- **Steuerleiste** — Wiedergabe/Pause, Einzelschritt und Geschwindigkeit.
- **Dock-Tabs** (unten) — **Source**, **Log**, **Console**, **Network**, **Errors** (jeweils mit einem Zähler-Badge) sowie die nur im Player verfügbaren Tabs **A11y** und **Transcript**. Klicken Sie auf eine **Network**-Zeile, um die Anfragedetails (Header, Timing, Status) anzuzeigen.
- **Tastenkürzel** — `Space` Wiedergabe/Pause, `←`/`→` zwischen Aktionen wechseln, `Home`/`End` zur ersten/letzten springen, `,`/`.` Geschwindigkeit ändern, `/` Filter fokussieren, `?` alle Tastenkürzel anzeigen.

> Akzeptiert nur eine `.zip`-Datei. Dieselben Tastenkürzel funktionieren auch im Live-Dashboard (`←`/`→` durchlaufen die Befehlsliste, `?` zeigt die Hilfe an).

### Trace player features

Über das schrittweise Durchgehen statischer Frames hinaus rekonstruiert der Player den Lauf und verknüpft dessen Daten miteinander:

- **DOM-Zeitreise** — der Browser-Bereich spielt den aufgezeichneten DOM-Mutationsstrom (und den Zustand von Formularfeldern — `value` von Inputs, `checked` von Checkboxen, einschließlich wieder geleerter Felder) erneut ab, um das *tatsächliche* DOM zum Zeitpunkt der ausgewählten Aktion wiederherzustellen, nicht nur einen Screenshot. Zeitpunkte ohne aufgezeichneten Frame (Assertions, statische Wartezeiten) zeigen dennoch den echten Seitenzustand.
- **A11y-Tab + Element-Overlay („pick locator“)** — der **A11y**-Tab zeigt den Accessibility-Baum (Rollen + zugängliche Namen), der für den ausgewählten Befehl aufgezeichnet wurde. Schalten Sie das Element-Overlay in der Browser-Leiste ein, um jedes Element zu umranden, mit dem der Test interagiert hat; **fahren** Sie mit der Maus über einen Rahmen, um die zugehörige Zeile im A11y-Baum hervorzuheben, und **klicken** Sie, um einen robusten Locator zu kopieren. Die Verknüpfung funktioniert in beide Richtungen — das Überfahren einer Baumzeile hebt das Element wiederum im Snapshot hervor.
- **Transcript-Tab + Copy-for-LLM** — der **Transcript**-Tab rendert die `transcript.md` des Laufs (eine für Menschen und LLMs lesbare Zusammenfassung in Ausführungsreihenfolge). Ein Klick auf **Copy** bündelt das Transkript mit allen Fehlern fehlgeschlagener Befehle als direkt einfügbaren Kontext für ein LLM.
- **Eingabemarkierungen in der Zeitleiste** — jede Aktion wird auf der Scrub-Leiste nach Art markiert: Tastaturaktionen als grüner Balken, Zeigeraktionen (die einen Trefferpunkt enthalten) als blauer Punkt, alle anderen als einfacher Strich — so erkennen Sie den Interaktionsrhythmus auf einen Blick.
- **Cucumber-Verschachtelung** — Cucumber-Läufe werden im Aktionsbaum als Feature → Scenario → Step verschachtelt, sodass Steps unter ihrem Scenario und Feature stehen.
- **Dichtes Filmstreifen-Scrubbing** — mit aktiviertem [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) bündelt die Zeitleiste die dichten Frames für flüssiges Scrubbing statt Sprüngen von einem Frame pro Aktion.

## Andere Trace-Viewer

Da das Artefakt ein portables, standardisiertes Trace-Viewer-Dateiformat verwendet, lässt sich dieselbe `.zip`-Datei (bzw. dasselbe Verzeichnis) auch in kompatiblen **eigenständigen Trace-Viewern** öffnen und — da dieses Format geteilt wird — im **eingebetteten Trace-Viewer eines Allure-Reports** (Allure ≥ 2.35). Diese zeigen:
- Zeitleiste der Aktionen mit Timings
- Screenshots pro Aktion
- Element-Snapshots
- Netzwerk-Wasserfall
- Konsolenereignisse

Für die Verarbeitung durch LLMs / Agenten lesen Sie `transcript.md` direkt — es ist eine kompakte Markdown-Darstellung der Aktionen mit Selektoren und Werten.

Die Trace-Pipeline (Action-Mapping, Snapshot-Serialisierer, NDJSON-Writer, Zip-/Verzeichnis-Writer) wird über [`@wdio/devtools-core`](https://github.com/webdriverio/devtools/tree/main/packages/core) von allen Adaptern gemeinsam genutzt, sodass die Struktur des Artefakts identisch ist, unabhängig davon, welcher Adapter es erzeugt hat — siehe [Cross-Framework Support](/docs/devtools/cross-framework).