---
id: preserve-and-rerun
title: Preserve & Rerun (Vergleichen)
description: "Erstellen Sie mit Preserve & Rerun einen Snapshot eines fehlgeschlagenen Laufs und führen Sie den Test mit einem Klick erneut aus. Vergleichen Sie anschließend beide Läufe, um herauszufinden, was sich geändert hat."
---

Wenn ein Test fehlschlägt, sieht der übliche Debugging-Ablauf so aus: Test erneut ausführen und dann zwei endlose Log-Ausgaben vergleichen, um herauszufinden, was sich geändert hat. Preserve & Rerun fasst das in einem einzigen Klick zusammen. Es **erstellt einen Snapshot des fehlgeschlagenen Laufs und führt den Test in einem Schritt erneut aus**. Anschließend zeigt es beide Läufe nebeneinander in einer **Compare**-Ansicht, Befehl für Befehl ausgerichtet – so sehen Sie genau, wo die beiden Läufe voneinander abweichen, ohne etwas erneut lesen zu müssen.

Dies ist der schnellste Weg, einen instabilen (flaky) Test zu diagnostizieren: Der Befehl, der sich zwischen dem erfolgreichen und dem fehlgeschlagenen Lauf unterschiedlich verhalten hat, wird für Sie hervorgehoben – zusammen mit der fehlgeschlagenen Assertion.

Verfügbar für alle drei Adapter – **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** und **[Nightwatch.js](/docs/devtools/nightwatch)**.

## Demo

![Preserve & Rerun Demo](/img/devtools/preserve-rerun.gif)

## Funktionsweise

1. Führen Sie Ihre Tests wie gewohnt aus. Wenn ein Test im Status **fehlgeschlagen** endet, bewegen Sie den Mauszeiger über seine Zeile in der Seitenleiste.
2. Neben der regulären ▶-Schaltfläche zum erneuten Ausführen erscheint ein Bug-Play-Symbol (🐞▶). Es wird nur bei fehlgeschlagenen Test-/Suite-Zeilen angezeigt, und zwar überall dort, wo ein einfaches erneutes Ausführen bereits unterstützt wird (z. B. Cucumber-Szenarien in der Szenariozeile, Mocha/Jasmine-Tests in der Test- oder Suite-Zeile).
3. Klicken Sie darauf. DevTools erstellt einen Snapshot des fehlgeschlagenen Laufs und startet anschließend nur diesen Test erneut.
4. Der Tab **Compare** öffnet sich mit den beiden Läufen, nach Befehlen ausgerichtet. Die Stelle der Abweichung und der Assertion-Fehler (**Expected vs Received**) werden hervorgehoben.

## Hauptfunktionen

- **Snapshot + erneutes Ausführen mit einem Klick** – Bewahren Sie den fehlgeschlagenen Lauf auf und führen Sie ihn in einem einzigen Schritt erneut aus, ohne Codeänderungen oder Neustart der gesamten Suite.
- **Befehlsweise Ausrichtung** – Beide Läufe werden nebeneinander dargestellt und nach Befehlen ausgerichtet, sodass Unterschiede sofort ins Auge fallen.
- **Hervorgehobene Fehlerstelle** – Bringt Sie direkt zu dem Befehl, an dem die beiden Läufe voneinander abweichen.
- **Assertion-Diff** – Zeigt die fehlgeschlagene Assertion mit Expected vs Received nebeneinander.
- **Pop-out-Fenster** – Öffnen Sie den Vergleich in einem separaten, thematisch angepassten Fenster für eine großzügigere Ansicht.
- **Triage instabiler Tests** – Sehen Sie, welcher Befehl sich zwischen einem erfolgreichen und einem fehlgeschlagenen Lauf unterschied, ohne Logs erneut lesen zu müssen.

## Einschränkungen

- **Cucumber**: Das erneute Ausführen einzelner Steps ist deaktiviert, da Cucumbers `--name`-Filter auf Szenarien abzielt, nicht auf einzelne Gherkin-Steps. Preserve & Rerun auf Szenarioebene funktioniert weiterhin.