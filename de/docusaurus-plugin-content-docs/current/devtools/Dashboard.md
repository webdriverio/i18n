---
id: dashboard
title: Das Dashboard
description: "Verfolgen Sie Testläufe live im DevTools-Dashboard, führen Sie einzelne Tests oder Suites erneut aus und konfigurieren Sie das Dashboard-Fenster und das Backend."
---

Der Live-Modus öffnet die DevTools-Oberfläche in einem externen Browserfenster und überträgt Ihren Testlauf in Echtzeit. Er ist das interaktive Gegenstück zum [Trace Mode](/docs/devtools/wdio/trace-mode), der die Oberfläche überspringt und stattdessen ein portables Offline-Artefakt schreibt. Der Live-Modus ist standardmäßig aktiviert (`mode: 'live'`), sodass das einfache Ausführen Ihrer WebdriverIO-Tests das Dashboard startet.

Wenn Sie Ihre Tests ausführen, öffnet sich die DevTools-Oberfläche automatisch in einem externen Browserfenster, und die Tests werden sofort mit Echtzeit-Visualisierung ausgeführt. Nach Abschluss des ersten Durchlaufs können Sie mit den Play-Buttons einzelne Tests oder Suites erneut ausführen und mit dem Stopp-Button laufende Tests jederzeit beenden.

## Was das Dashboard anzeigt

- **Live-Browservorschau** — beobachten Sie den getesteten Browser, während Befehle ausgeführt werden.
- **Testfortschritt** — Suites und Tests werden während der Ausführung aktualisiert.
- **Befehlsausführung** — jede Aktion wird in dem Moment übertragen, in dem sie stattfindet.
- **Workbench-Tabs** — Actions und Metadata, dazu Source, Log, Console, Network und Errors (jeweils mit einer Anzahl gekennzeichnet) sowie Compare nach einem [Preserve & Rerun](/docs/devtools/wdio/preserve-and-rerun).

## Funktionen des Live-Modus

- **[Interaktives erneutes Ausführen von Tests & Visualisierung](/docs/devtools/wdio/interactive-test-rerunning)** — Browservorschauen in Echtzeit mit erneuter Testausführung
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** — Erstellen Sie einen Snapshot eines fehlschlagenden Tests, führen Sie ihn erneut aus und vergleichen Sie die beiden Durchläufe nebeneinander
- **[Console Logs](/docs/devtools/wdio/console-logs)** — Browser-Konsolenausgaben erfassen und untersuchen
- **[Network Logs](/docs/devtools/wdio/network-logs)** — API-Aufrufe und Netzwerkaktivität überwachen
- **[Metadata](/docs/devtools/wdio/metadata)** — Session-Capabilities, Umgebung und Timing pro Browser-Session
- **[TestLens](/docs/devtools/wdio/testlens)** — Mit intelligenter Code-Navigation zum Quellcode navigieren
- **[Multi-Framework-Unterstützung](/docs/devtools/wdio/multi-framework-support)** — Funktioniert mit Mocha, Jasmine und Cucumber
- **[Session Screencast](/docs/devtools/wdio/screencast)** — Automatische Videoaufzeichnung von Browser-Sessions

## Das Dashboard-Fenster konfigurieren

Die Optionen `port`, `hostname` und `devtoolsCapabilities` steuern den Server der DevTools-Oberfläche und das Fenster, in dem sie geöffnet wird. Details finden Sie in der [Konfigurationsreferenz](/docs/devtools/reference).

## Das Backend eigenständig ausführen

Die Adapter starten den Dashboard-Server im selben Prozess, sodass Sie ihn normalerweise nie anfassen müssen. Er wird außerdem als eigenständiges Binary ausgeliefert. Das ist sinnvoll, wenn das Dashboard über einen einzelnen Durchlauf hinaus bestehen bleiben soll - oder wenn die Tests nicht in JavaScript geschrieben sind, wie beim Python-Adapter (siehe die Seite [Selenium](/docs/devtools/selenium)).

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

Sowohl die Form `--port 8080` als auch `--port=8080` wird akzeptiert. `--port` ist eine *Präferenz*, kein Versprechen: Ist dieser Port belegt, bindet sich der Server an einen freien Port, anstatt fehlzuschlagen. Er gibt den tatsächlich gebundenen Port aus – diese Zeile sollten Sie lesen, nicht den Port, den Sie angefordert haben:

```
devtools-backend listening at http://localhost:3000
```

Der Python-Adapter verbindet sich mit einem bereits lauschenden Server, wenn `DEVTOOLS_PORT` gesetzt ist, anstatt einen zweiten zu starten. Die JavaScript-Adapter starten ihr Backend im selben Prozess; verwenden Sie deren Option `port`, um den Port festzulegen.

Ein zweites Binary, `show-trace`, öffnet ein Trace-Archiv im Offline-Player - siehe [Trace Player](/docs/devtools/trace-player).