---
id: preserve-and-rerun
title: Preserve & Rerun (Vergleichen)
description: "Erstellen Sie einen Snapshot eines fehlgeschlagenen Laufs und führen Sie den Test mit Preserve & Rerun per Klick erneut aus. Vergleichen Sie anschließend beide Läufe, um herauszufinden, was sich geändert hat."
---

Wenn ein Test fehlschlägt, sieht der übliche Debugging-Ablauf so aus: Test erneut ausführen und dann zwei endlose Log-Ausgaben vergleichen, um herauszufinden, was sich geändert hat. Preserve & Rerun reduziert das auf einen einzigen Klick. Es **erstellt einen Snapshot des fehlgeschlagenen Laufs und führt den Test in einem Schritt erneut aus**. Anschließend werden beide Läufe nebeneinander in einer **Compare**-Ansicht angezeigt, Befehl für Befehl ausgerichtet. So sehen Sie genau, wo die beiden Läufe voneinander abweichen, ohne irgendetwas erneut lesen zu müssen.

Dies ist der schnellste Weg, einen Flaky Test zu diagnostizieren: Der Befehl, der sich zwischen dem erfolgreichen und dem fehlgeschlagenen Lauf unterschiedlich verhalten hat, wird für Sie hervorgehoben, zusammen mit der fehlgeschlagenen Assertion.

Verfügbar für alle drei Adapter – **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** und **[Nightwatch.js](/docs/devtools/nightwatch)**.

## Demo

![Preserve & Rerun Demo](/img/devtools/preserve-rerun.gif)

## Funktionsweise

1. Führen Sie Ihre Tests wie gewohnt aus. Wenn ein Test im Status **failed** endet, bewegen Sie den Mauszeiger über seine Zeile in der Seitenleiste.
2. Neben der regulären ▶-Schaltfläche zum erneuten Ausführen erscheint ein Bug-Play-Symbol (🐞▶). Es wird nur in Zeilen fehlgeschlagener Tests/Suites angezeigt, und zwar überall dort, wo ein einfaches erneutes Ausführen bereits unterstützt wird (z. B. Cucumber-Szenarien in der Szenariozeile, Mocha/Jasmine-Tests in der Test- oder Suite-Zeile).
3. Klicken Sie darauf. DevTools erstellt einen Snapshot des fehlgeschlagenen Laufs und startet anschließend nur diesen Test neu.
4. Der Tab **Compare** öffnet sich mit den beiden Läufen, nach Befehlen ausgerichtet. Der Punkt der Abweichung und der Assertion-Fehler (**Expected vs Received**) werden hervorgehoben.

## Hauptfunktionen

- **Snapshot + Rerun mit einem Klick** – Bewahren Sie den fehlgeschlagenen Lauf auf und führen Sie ihn in einem einzigen Schritt erneut aus, ohne Codeänderungen oder Neustart der gesamten Suite.
- **Ausrichtung Befehl für Befehl** – Beide Läufe werden nebeneinander dargestellt und nach Befehlen ausgerichtet, sodass Unterschiede sofort ins Auge fallen.
- **Hervorgehobener Fehlerpunkt** – Springt direkt zu dem Befehl, an dem die beiden Läufe voneinander abweichen.
- **Assertion-Diff** – Zeigt die fehlgeschlagene Assertion mit Expected vs Received nebeneinander an.
- **Pop-out-Fenster** – Öffnen Sie den Vergleich in einem separaten, thematisch angepassten Fenster für eine großzügigere Ansicht.
- **Triage von Flaky Tests** – Erkennen Sie, welcher Befehl sich zwischen einem erfolgreichen und einem fehlgeschlagenen Lauf unterschieden hat, ohne Logs erneut lesen zu müssen.

## Einschränkungen

- **Cucumber**: Das erneute Ausführen einzelner Steps ist deaktiviert, da der `--name`-Filter von Cucumber auf Szenarien abzielt, nicht auf einzelne Gherkin-Steps. Preserve & Rerun auf Szenarioebene funktioniert weiterhin.