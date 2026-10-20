---
id: trace-player
title: Trace-Player
description: "Öffnen Sie Trace-Mode-Artefakte im show-trace-Player zur Offline-Wiedergabe und Überprüfung, oder laden Sie sie in andere Trace-Viewer."
---

Der `show-trace`-Player öffnet jeden in [Trace Mode](/docs/devtools/wdio/trace-mode) erzeugten Trace direkt in der WebdriverIO DevTools UI – ein dedizierter, schreibgeschützter **Player**-Modus für Offline-Wiedergabe, Überprüfung und Diffing durch KI-Agenten.

## Demo

![Trace Player Demo](/img/devtools/trace-player.gif)

## `show-trace` — der hauseigene Player

Einen Trace in der DevTools UI öffnen:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
pnpm show-trace trace-<sessionId>.zip     # from the devtools monorepo
```

Das `show-trace`-Bin wird mit jedem Adapter ausgeliefert (`@wdio/devtools-service`, `@wdio/nightwatch-devtools`, `@wdio/selenium-devtools`), sodass es in jedem Projekt verfügbar ist, das einen davon installiert – ohne zusätzliche Abhängigkeit. Es startet dieselbe DevTools UI in einem dedizierten **Player**-Modus und öffnet sie in Ihrem Browser:

- **Aktionsliste** (links) — die aufgezeichneten Befehle, daneben ein **Metadata**-Tab.
- **Browser-Bereich** (Mitte) — die rekonstruierte Seite für die ausgewählte Aktion (siehe [DOM-Zeitreise](#trace-player-features) unten). Wenn der Trace einen Filmstreifen/ein Video enthält, wechselt ein **Snapshot / Screencast**-Umschalter zum aufgezeichneten Video.
- **Timeline-Leiste** (oben) — ein Filmstreifen aus Miniaturansichten an ihren Echtzeit-Positionen sowie eine Scrub-Leiste mit verschiebbarem Abspielkopf. Klicken Sie auf eine Miniaturansicht oder ziehen Sie an eine beliebige Stelle, um zu springen.
- **Steuerleiste** — Wiedergabe/Pause, Schritt und Geschwindigkeit.
- **Dock-Tabs** (unten) — **Source**, **Log**, **Console**, **Network**, **Errors** (jeweils mit einem Zähler-Badge), plus die nur im Player verfügbaren Tabs **A11y** und **Transcript**. Klicken Sie auf eine **Network**-Zeile, um die Request-Details anzuzeigen (Header, Timing, Status).
- **Tastenkürzel** — `Space` Wiedergabe/Pause, `←`/`→` zwischen Aktionen wechseln, `Home`/`End` zur ersten/letzten springen, `,`/`.` Geschwindigkeit ändern, `/` Filter fokussieren, `?` alle Tastenkürzel anzeigen.

> Akzeptiert nur eine `.zip`-Datei. Dieselben Tastenkürzel funktionieren auch im Live-Dashboard (`←`/`→` durchlaufen die Befehlsliste, `?` zeigt die Hilfe an).

### Trace-Player-Funktionen

Über das reine Durchschalten statischer Frames hinaus rekonstruiert der Player den Lauf und verknüpft dessen Daten miteinander:

- **DOM-Zeitreise** — der Browser-Bereich spielt den aufgezeichneten DOM-Mutations-Stream (sowie den Zustand von Formularfeldern – Input-`value`, Checkbox-`checked`, einschließlich wieder geleerter Felder) erneut ab, um das *echte* DOM zum Zeitpunkt der ausgewählten Aktion wiederherzustellen, nicht nur einen Screenshot. Zeitpunkte ohne aufgezeichneten Frame (Assertions, statische Wartezeiten) zeigen trotzdem den tatsächlichen Seitenzustand.
- **A11y-Tab + Element-Overlay („Locator auswählen“)** — der **A11y**-Tab zeigt den für den ausgewählten Befehl erfassten Accessibility-Tree (Rollen + zugängliche Namen). Schalten Sie das Element-Overlay in der Browser-Leiste ein, um jedes Element zu umranden, mit dem der Test interagiert hat; **fahren Sie mit der Maus** über eine Box, um ihre Zeile im A11y-Tree hervorzuheben, **klicken** Sie, um einen robusten Locator zu kopieren. Die Verknüpfung funktioniert in beide Richtungen – das Überfahren einer Baumzeile hebt das Element im Snapshot hervor.
- **Transcript-Tab + Copy-for-LLM** — der **Transcript**-Tab rendert die `transcript.md` des Laufs (eine für Menschen und LLMs lesbare Zusammenfassung in Ausführungsreihenfolge). Ein Klick auf **Copy** bündelt das Transkript mit allen Fehlern fehlgeschlagener Befehle als direkt einfügbaren Kontext für ein LLM.
- **Eingabemarkierungen in der Timeline** — jede Aktion wird auf der Scrub-Leiste nach Art markiert: Tastaturaktionen als grüner Balken, Zeigeraktionen (die einen Trefferpunkt besitzen) als blauer Punkt, andere als einfacher Strich – so erkennen Sie den Interaktionsrhythmus auf einen Blick.
- **Cucumber-Verschachtelung** — Cucumber-Läufe werden im Aktionsbaum als Feature → Scenario → Step verschachtelt, sodass Steps unter ihrem Scenario und Feature angeordnet sind.
- **Dichtes Filmstreifen-Scrubbing** — wenn [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) aktiviert ist, packt die Timeline die dichten Frames für flüssiges Scrubbing anstelle von Sprüngen mit einem Frame pro Aktion.

## Andere Trace-Viewer

Da das Artefakt ein portables, standardisiertes Trace-Viewer-Dateiformat verwendet, lässt sich dieselbe `.zip`-Datei (oder dasselbe Verzeichnis) auch in kompatiblen **eigenständigen Trace-Viewern** öffnen und – da dieses Format geteilt wird – im **eingebetteten Trace-Viewer eines Allure-Reports** (Allure ≥ 2.35). Diese zeigen:
- Timeline der Aktionen mit Zeitangaben
- Screenshots pro Aktion
- Element-Snapshots
- Netzwerk-Wasserfall
- Konsolen-Events

Für die Verarbeitung durch LLMs / Agenten lesen Sie `transcript.md` direkt – es ist eine kompakte Markdown-Darstellung der Aktionen mit Selektoren und Werten.

Die Trace-Pipeline (Action-Mapping, Snapshot-Serializer, NDJSON-Writer, Zip-/Verzeichnis-Writer) wird über [`@wdio/devtools-core`](https://github.com/webdriverio/devtools/tree/main/packages/core) von allen Adaptern gemeinsam genutzt, sodass die Struktur des Artefakts identisch ist, egal welcher Adapter es erzeugt hat – siehe [Cross-Framework Support](/docs/devtools/cross-framework).