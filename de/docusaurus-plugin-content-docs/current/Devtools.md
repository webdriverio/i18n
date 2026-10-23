---
id: devtools
title: DevTools
description: "Visualisieren, steuern und untersuchen Sie Testläufe in einer browserbasierten Debugging-Oberfläche, die mit WebdriverIO, Nightwatch.js und Selenium WebDriver funktioniert."
---

DevTools ist eine leistungsstarke browserbasierte Debugging-Oberfläche zum Visualisieren, Steuern und Untersuchen Ihrer Testausführungen in Echtzeit. Sie funktioniert mit **WebdriverIO**, **Nightwatch.js**, **Selenium WebDriver** (beliebiger Runner) und **Python Selenium** – gleiches Backend, gleiche Oberfläche, gleiche Erfassungsinfrastruktur.

## Was es bietet

- **Tests gezielt erneut ausführen** - Klicken Sie auf einen beliebigen Testfall oder eine Suite, um sie sofort erneut auszuführen ([Details](/docs/devtools/wdio/interactive-test-rerunning))
- **Preserve & Rerun (Vergleichen)** - Erstellen Sie einen Snapshot eines fehlschlagenden Tests, führen Sie ihn erneut aus und vergleichen Sie beide Läufe nebeneinander, ausgerichtet nach Befehlen ([Details](/docs/devtools/wdio/preserve-and-rerun))
- **Visuell debuggen** - Sehen Sie Live-Browservorschauen mit automatischen Screenshots nach jedem Befehl
- **Ausführung verfolgen** - Zeigen Sie detaillierte Befehlsprotokolle mit Zeitstempeln und Ergebnissen an
- **Netzwerk & Konsole überwachen** - Untersuchen Sie API-Aufrufe und JavaScript-Logs ([Netzwerk](/docs/devtools/wdio/network-logs) · [Konsole](/docs/devtools/wdio/console-logs))
- **Zum Code navigieren** - Springen Sie mit TestLens direkt zu den Testquelldateien ([Details](/docs/devtools/wdio/testlens))
- **Sitzungen aufzeichnen** - Kontinuierliches `.webm`-Video des Browsers, pro Sitzung ([Details](/docs/devtools/wdio/screencast))
- **Mobile** - Appium-Sitzungen (mobiler Browser, native und hybride Apps) im Live- und Trace-Modus ([Details](/docs/devtools/mobile))
- **Trace-Modus** - Headless-Erfassungspfad, der ein portables `trace.zip`-Artefakt für die Offline-Wiedergabe oder die Nutzung durch Agenten erzeugt ([Details](/docs/devtools/wdio/trace-mode))

## Wie es funktioniert

1. Starten Sie Ihre Tests wie gewohnt
2. DevTools öffnet automatisch ein Browserfenster unter `http://localhost:3000`
3. Die Oberfläche zeigt Testhierarchie, Browservorschau, Befehls-Zeitleiste und Logs in Echtzeit an
4. Nach Abschluss der Tests klicken Sie auf einen beliebigen Test, um ihn erneut auszuführen; die erneute Ausführung läuft in einem frischen Testprozess und wird in dasselbe Dashboard-Fenster gestreamt

## Wählen Sie Ihr Framework

- **[WebDriverIO](/docs/devtools/wdio)** - Verwenden Sie `@wdio/devtools-service` mit Mocha, Jasmine oder Cucumber
- **[Nightwatch](/docs/devtools/nightwatch)** - Verwenden Sie `@wdio/nightwatch-devtools` ohne Änderungen am Testcode
- **[Selenium](/docs/devtools/selenium)** - Verwenden Sie `@wdio/selenium-devtools` mit Mocha, Jest, Cucumber oder einfachen Node-Skripten
- **[Python Selenium](/docs/devtools/selenium)** - Verwenden Sie `selenium-devtools-py` unter pytest oder in einem einfachen Skript (siehe die Python-Tabs)