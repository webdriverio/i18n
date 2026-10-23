---
id: preserve-and-rerun
title: Preserve & Rerun (Vergleichen)
description: "Erstellen Sie einen Snapshot eines fehlgeschlagenen Laufs und führen Sie den Test mit Preserve & Rerun per Klick erneut aus. Vergleichen Sie anschließend beide Läufe, um herauszufinden, was sich geändert hat."
---

Wenn ein Test fehlschlägt, sieht die übliche Debugging-Schleife so aus: Test erneut ausführen und dann zwei Berge von Logs vergleichen, um herauszufinden, was sich geändert hat. Preserve & Rerun fasst das in einem einzigen Klick zusammen. Es **erstellt einen Snapshot des fehlgeschlagenen Laufs und führt den Test in einem Schritt erneut aus**. Anschließend zeigt es beide Läufe nebeneinander in einer **Compare**-Ansicht an, Befehl für Befehl ausgerichtet – so sehen Sie genau, an welcher Stelle die beiden voneinander abgewichen sind, ohne etwas erneut lesen zu müssen.

Dies ist der schnellste Weg, einen Flaky-Test zu diagnostizieren: Der Befehl, der sich zwischen dem erfolgreichen und dem fehlgeschlagenen Lauf unterschiedlich verhalten hat, wird für Sie hervorgehoben, zusammen mit der fehlgeschlagenen Assertion.

Verfügbar für jeden Adapter – **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** (Node.js und Python) und **[Nightwatch.js](/docs/devtools/nightwatch)**. Der Rerun-Filter unterscheidet sich je nach Framework (WebdriverIO `--spec` plus ein Grep, Selenium `--grep` / `--testNamePattern`, Nightwatch `DEVTOOLS_RERUN_LABEL`, pytest-Node-IDs); das Dashboard ist identisch.

## Demo

![Preserve & Rerun Demo](/img/devtools/preserve-rerun.gif)

## So funktioniert es

1. Führen Sie Ihre Tests wie gewohnt aus. Wenn ein Test im Status **failed** endet, bewegen Sie den Mauszeiger über seine Zeile in der Seitenleiste.
2. Neben der regulären ▶-Rerun-Schaltfläche erscheint ein Bug-Play-Symbol (🐞▶). Es wird nur bei fehlgeschlagenen Test-/Suite-Zeilen angezeigt, und zwar überall dort, wo ein einfacher Rerun bereits unterstützt wird (z. B. Cucumber-Szenarien in der Szenario-Zeile, Mocha/Jasmine-Tests in der Test- oder Suite-Zeile).
3. Klicken Sie darauf. DevTools erstellt einen Snapshot des fehlgeschlagenen Laufs und startet anschließend genau diesen Test neu.
4. Der Tab **Compare** öffnet sich mit den beiden Läufen, nach Befehlen ausgerichtet. Der Punkt der Abweichung und der Assertion-Fehler (**Expected vs Received**) werden hervorgehoben.

## Hauptfunktionen

- **Snapshot + Rerun mit einem Klick** – Bewahren Sie den fehlgeschlagenen Lauf auf und führen Sie ihn in einem einzigen Schritt erneut aus, ohne Codeänderungen oder Neustart der gesamten Suite.
- **Ausrichtung Befehl für Befehl** – Beide Läufe werden nebeneinander dargestellt und nach Befehlen ausgerichtet, sodass Unterschiede sofort ins Auge fallen.
- **Hervorgehobene Fehlerstelle** – Bringt Sie direkt zu dem Befehl, an dem die beiden Läufe voneinander abgewichen sind.
- **Assertion-Diff** – Zeigt die fehlgeschlagene Assertion mit Expected und Received nebeneinander.
- **Pop-out-Fenster** – Öffnen Sie den Vergleich in einem separaten, thematisch gestalteten Fenster für eine großzügigere Ansicht.
- **Triage von Flaky-Tests** – Sehen Sie, welcher Befehl sich zwischen einem erfolgreichen und einem fehlgeschlagenen Lauf unterschieden hat, ohne Logs erneut lesen zu müssen.

## Einschränkungen

- **Cucumber**: Rerun auf Step-Ebene ist deaktiviert, da Cucumbers `--name`-Filter auf Szenarien abzielt, nicht auf einzelne Gherkin-Steps. Preserve & Rerun auf Szenario-Ebene funktioniert weiterhin.