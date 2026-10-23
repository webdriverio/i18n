---
id: trace-player
title: Trace Player
description: "Öffnen Sie Trace-Mode-Artefakte im show-trace-Player zur Offline-Wiedergabe und Überprüfung oder laden Sie sie in andere Trace-Viewer."
---

Der `show-trace`-Player öffnet jeden im [Trace Mode](/docs/devtools/wdio/trace-mode) erzeugten Trace direkt in der WebdriverIO DevTools UI – ein dedizierter, schreibgeschützter **Player**-Modus für Offline-Wiedergabe, Überprüfung und Diffing durch KI-Agenten.

## Demo

![Trace Player Demo](/img/devtools/trace-player.gif)

## `show-trace` — der hauseigene Player

Einen Trace in der DevTools UI öffnen:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
pnpm show-trace trace-<sessionId>.zip     # from the devtools monorepo
```

Das `show-trace`-Bin wird mit jedem Adapter ausgeliefert (`@wdio/devtools-service`, `@wdio/nightwatch-devtools`, `@wdio/selenium-devtools`), sodass es in jedem Projekt verfügbar ist, das einen davon installiert – ohne zusätzliche Abhängigkeit. Es ist außerdem ein Bin von `@wdio/devtools-backend` selbst, sodass ein Projekt ohne JavaScript-Adapter (zum Beispiel ein Python-Projekt) `npx -p @wdio/devtools-backend show-trace <trace.zip>` ausführen kann. Es startet dieselbe DevTools UI in einem dedizierten **Player**-Modus und öffnet sie in Ihrem Browser:

- **Aktionsliste** (links) — die aufgezeichneten Befehle, mit einem **Metadata**-Tab daneben.
- **Browser-Bereich** (Mitte) — die rekonstruierte Seite für die ausgewählte Aktion (siehe [DOM-Zeitreise](#trace-player-features) unten). Wenn der Trace einen Filmstreifen/ein Video enthält, wechselt ein **Snapshot / Screencast**-Umschalter zum aufgezeichneten Video.
- **Timeline-Leiste** (oben) — ein Filmstreifen aus Vorschaubildern an ihren Echtzeit-Positionen sowie eine Scrub-Leiste mit verschiebbarem Abspielkopf. Klicken Sie auf ein Vorschaubild oder ziehen Sie an eine beliebige Stelle, um zu springen.
- **Steuerleiste** — Wiedergabe/Pause, Schrittweise und Geschwindigkeit.
- **Dock-Tabs** (unten) — **Source**, **Log**, **Console**, **Network**, **Errors** (jeweils mit Anzahl-Badge) sowie die nur im Player verfügbaren Tabs **A11y** und **Transcript**. Klicken Sie auf eine **Network**-Zeile, um die Request-Details anzuzeigen (Header, Timing, Status).
- **Tastenkürzel** — `Space` Wiedergabe/Pause, `←`/`→` zwischen Aktionen wechseln, `Home`/`End` zur ersten/letzten springen, `,`/`.` Geschwindigkeit ändern, `/` Filter fokussieren, `?` alle Tastenkürzel anzeigen.

> Akzeptiert nur eine `.zip`-Datei; packen Sie einen `ndjson-directory`-Trace zuerst als Zip oder öffnen Sie ihn in einem anderen kompatiblen Viewer. Dieselben Tastenkürzel funktionieren im Live-Dashboard (`←`/`→` durchlaufen die Befehlsliste, `?` zeigt die Hilfe).

### Trace player features

Über das statische Durchschalten von Frames hinaus rekonstruiert der Player den Lauf und verknüpft dessen Daten miteinander:

- **DOM-Zeitreise** — der Browser-Bereich spielt den aufgezeichneten DOM-Mutationsstrom (und den Zustand von Formularfeldern – `value` von Inputs, `checked` von Checkboxen, einschließlich wieder geleerter Felder) erneut ab, um das *echte* DOM zum Zeitpunkt der ausgewählten Aktion wiederherzustellen, nicht nur einen Screenshot. Zeitpunkte ohne aufgezeichneten Frame (Assertions, statische Wartezeiten) zeigen dennoch den tatsächlichen Seitenzustand.
- **A11y-Tab + Element-Overlay („Locator auswählen“)** — der **A11y**-Tab zeigt den Accessibility-Baum (Rollen + zugängliche Namen), der für den ausgewählten Befehl aufgezeichnet wurde. Schalten Sie das Element-Overlay in der Browser-Leiste ein, um jedes Element zu umranden, mit dem der Test interagiert hat; **fahren Sie mit der Maus** über einen Rahmen, um dessen Zeile im A11y-Baum hervorzuheben, **klicken** Sie, um einen robusten Locator zu kopieren. Locators werden im Dialekt des aufzeichnenden Runners geschrieben: `a*=Logout` unter WebdriverIO, `//a[contains(., "Logout")]` mit einer `By.xpath()`-Beschriftung unter Selenium und reines CSS unter Nightwatch mit XPath als Fallback. In einer nativen Appium-Session lauten sie `android=new UiSelector()…` oder `-ios predicate string:…`. Die Verknüpfung ist bidirektional – das Überfahren einer Baumzeile hebt das Element wiederum im Snapshot hervor.
- **Transcript-Tab + Copy-for-LLM** — der **Transcript**-Tab rendert die `transcript.md` des Laufs (eine für Menschen/LLMs lesbare Zusammenfassung in Ausführungsreihenfolge). Ein **Copy** mit einem Klick bündelt das Transkript mit allen Fehlern fehlgeschlagener Befehle als sofort einfügbaren Kontext für ein LLM.
- **Eingabemarkierungen in der Timeline** — jede Aktion wird auf der Scrub-Leiste nach Art markiert: Tastaturaktionen als grüner Balken, Zeigeraktionen (die einen Trefferpunkt enthalten) als blauer Punkt, andere als einfacher Strich – so erfassen Sie den Interaktionsrhythmus auf einen Blick.
- **Cucumber-Verschachtelung** — Cucumber-Läufe werden im Aktionsbaum unter ihrem Szenario verschachtelt. Die Tiefe variiert je nach Adapter (Selenium verschachtelt Feature → Scenario → Step, WebdriverIO Scenario → Step, Nightwatch Feature → Scenario); siehe [Cross-Framework Support](/docs/devtools/cross-framework).
- **Dichtes Filmstreifen-Scrubbing** — mit aktiviertem [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) packt die Timeline die dichten Frames für flüssiges Scrubbing statt Sprüngen von einem Frame pro Aktion.

## Andere Trace-Viewer

Da das Artefakt ein portables, standardmäßiges Trace-Viewer-Dateiformat verwendet, lässt sich dieselbe `.zip`-Datei (bzw. dasselbe Verzeichnis) auch in kompatiblen **eigenständigen Trace-Viewern** öffnen und – da dieses Format geteilt wird – im **eingebetteten Trace-Viewer eines Allure-Reports** (Allure ≥ 2.35). Diese stellen dar:
- Timeline der Aktionen mit Zeitangaben
- Screenshots pro Aktion
- Element-Snapshots
- Network-Waterfall
- Console-Ereignisse

Für die Nutzung durch LLMs / Agenten lesen Sie `transcript.md` direkt – es ist eine kompakte Markdown-Darstellung der Aktionen mit Selektoren und Werten.

Die Trace-Pipeline (Action-Mapping, Snapshot-Serializer, NDJSON-Writer, Zip-/Verzeichnis-Writer) wird über [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace) von allen Adaptern gemeinsam genutzt, sodass die Struktur des Artefakts identisch ist, unabhängig davon, welcher Adapter es erzeugt hat – siehe [Cross-Framework Support](/docs/devtools/cross-framework).