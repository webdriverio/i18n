---
id: dashboard
title: Das Dashboard
description: "Verfolgen Sie Testläufe live im DevTools-Dashboard, führen Sie einzelne Tests oder Suites erneut aus und konfigurieren Sie das Dashboard-Fenster und das Backend."
---

Der Live-Modus öffnet die DevTools-Oberfläche in einem externen Browserfenster und überträgt Ihren Testlauf in Echtzeit. Er ist das interaktive Gegenstück zum [Trace-Modus](/docs/devtools/wdio/trace-mode), der die Oberfläche überspringt und stattdessen ein portables Offline-Artefakt schreibt. Der Live-Modus ist standardmäßig aktiviert (`mode: 'live'`), sodass das Dashboard einfach durch das Ausführen Ihrer WebdriverIO-Tests gestartet wird.

Wenn Sie Ihre Tests ausführen, öffnet sich die DevTools-Oberfläche automatisch in einem externen Browserfenster, und die Tests beginnen sofort mit der Ausführung inklusive Echtzeit-Visualisierung. Nach Abschluss des ersten Durchlaufs können Sie mit den Play-Buttons einzelne Tests oder Suites erneut ausführen und mit dem Stop-Button laufende Tests jederzeit beenden.

## Was das Dashboard anzeigt

- **Live-Browservorschau** — beobachten Sie den getesteten Browser, während Befehle ausgeführt werden.
- **Testfortschritt** — Suites und Tests werden während der Ausführung aktualisiert.
- **Befehlsausführung** — jede Aktion wird in dem Moment übertragen, in dem sie geschieht.
- **Workbench-Tabs** — erkunden Sie Actions, Console, Network, Metadata und Source für den ausgewählten Test.

## Funktionen des Live-Modus

- **[Interaktives erneutes Ausführen & Visualisierung von Tests](/docs/devtools/wdio/interactive-test-rerunning)** — Browservorschauen in Echtzeit mit erneutem Ausführen von Tests
- **[Preserve & Rerun (Vergleich)](/docs/devtools/wdio/preserve-and-rerun)** — Erstellen Sie einen Snapshot eines fehlschlagenden Tests, führen Sie ihn erneut aus und vergleichen Sie beide Durchläufe nebeneinander
- **[Konsolenlogs](/docs/devtools/wdio/console-logs)** — Erfassen und untersuchen Sie die Ausgabe der Browserkonsole
- **[Netzwerklogs](/docs/devtools/wdio/network-logs)** — Überwachen Sie API-Aufrufe und Netzwerkaktivität
- **[Metadaten](/docs/devtools/wdio/metadata)** — Session-Capabilities, Umgebung und Timing pro Browsersession
- **[TestLens](/docs/devtools/wdio/testlens)** — Navigieren Sie mit intelligenter Code-Navigation zum Quellcode
- **[Unterstützung mehrerer Frameworks](/docs/devtools/wdio/multi-framework-support)** — Funktioniert mit Mocha, Jasmine und Cucumber
- **[Session-Screencast](/docs/devtools/wdio/screencast)** — Automatische Videoaufzeichnung von Browsersessions

## Das Dashboard-Fenster konfigurieren

Die Optionen `port`, `hostname` und `devtoolsCapabilities` steuern den Server der DevTools-Oberfläche und das Fenster, in dem sie geöffnet wird. Details finden Sie in der [Konfigurationsreferenz](/docs/devtools/reference).

## Das Backend eigenständig ausführen

Die Adapter starten den Dashboard-Server im selben Prozess, sodass Sie ihn normalerweise nie anfassen müssen. Er wird außerdem als eigenständiges Binary ausgeliefert. Das ist genau das, was Sie benötigen, wenn das Dashboard einen einzelnen Lauf überdauern soll – oder wenn die Tests nicht in JavaScript geschrieben sind, wie beim Python-Adapter (siehe die Seite [Selenium](/docs/devtools/selenium)).

```bash
npx @wdio/devtools-backend
```

```
Usage: devtools-backend [options]

Options:
  --port <number>     Preferred port; a free one is chosen if it is taken
  --hostname <host>   Host to bind (default: localhost)
  -h, --help          Show this message
```

`--port` ist eine *Präferenz*, kein Versprechen: Ist dieser Port belegt, bindet sich der Server an einen freien Port, anstatt fehlzuschlagen. Er gibt den tatsächlich gebundenen Port aus – diese Zeile sollten Sie lesen, nicht den Port, den Sie angefordert haben:

```
devtools-backend listening at http://localhost:3000
```

Verweisen Sie einen Lauf mit `DEVTOOLS_PORT` (wird von jedem Adapter berücksichtigt) auf einen bereits lauschenden Server, dann verbindet sich der Lauf mit diesem, anstatt einen zweiten zu starten.

Ein zweites Binary, `show-trace`, öffnet ein Trace-Archiv im Offline-Player – siehe [Trace Player](/docs/devtools/trace-player).