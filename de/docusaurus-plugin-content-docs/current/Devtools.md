---
id: devtools
title: DevTools
description: "Visualisieren, steuern und untersuchen Sie Testläufe in einer browserbasierten Debugging-Oberfläche, die mit WebdriverIO, Nightwatch.js und Selenium WebDriver funktioniert."
---

DevTools ist eine leistungsstarke browserbasierte Debugging-Oberfläche zum Visualisieren, Steuern und Untersuchen Ihrer Testausführungen in Echtzeit. Es funktioniert mit **WebdriverIO**, **Nightwatch.js** und **Selenium WebDriver** (mit jedem Runner) – gleiches Backend, gleiche Oberfläche, gleiche Capture-Infrastruktur.

## Was es bietet

- **Tests gezielt erneut ausführen** - Klicken Sie auf einen beliebigen Testfall oder eine Suite, um ihn bzw. sie sofort erneut auszuführen ([Details](/docs/devtools/wdio/interactive-test-rerunning))
- **Preserve & Rerun (Vergleich)** - Erstellen Sie einen Snapshot eines fehlschlagenden Tests, führen Sie ihn erneut aus und vergleichen Sie beide Läufe nebeneinander, ausgerichtet nach Befehlen ([Details](/docs/devtools/wdio/preserve-and-rerun))
- **Visuell debuggen** - Sehen Sie Live-Browservorschauen mit automatischen Screenshots nach jedem Befehl
- **Ausführung nachverfolgen** - Zeigen Sie detaillierte Befehlsprotokolle mit Zeitstempeln und Ergebnissen an
- **Netzwerk & Konsole überwachen** - Untersuchen Sie API-Aufrufe und JavaScript-Logs ([Netzwerk](/docs/devtools/wdio/network-logs) · [Konsole](/docs/devtools/wdio/console-logs))
- **Zum Code navigieren** - Springen Sie mit TestLens direkt zu den Quelldateien der Tests ([Details](/docs/devtools/wdio/testlens))
- **Sitzungen aufzeichnen** - Kontinuierliches `.webm`-Video des Browsers pro Sitzung ([Details](/docs/devtools/wdio/screencast))
- **Trace-Modus** - Headless-Capture-Pfad, der ein portables `trace.zip`-Artefakt für die Offline-Wiedergabe oder die Nutzung durch Agenten erzeugt ([Details](/docs/devtools/wdio/trace-mode))

## Wie es funktioniert

1. Starten Sie Ihre Tests wie gewohnt
2. DevTools öffnet automatisch ein Browserfenster unter `http://localhost:3000`
3. Die Oberfläche zeigt Testhierarchie, Browservorschau, Befehls-Timeline und Logs in Echtzeit an
4. Nach Abschluss der Tests klicken Sie auf einen beliebigen Test, um ihn einzeln in derselben Browsersitzung erneut auszuführen

## Wählen Sie Ihr Framework

- **[WebDriverIO](/docs/devtools/wdio)** - Verwenden Sie `@wdio/devtools-service` mit Mocha, Jasmine oder Cucumber
- **[Nightwatch](/docs/devtools/nightwatch)** - Verwenden Sie `@wdio/nightwatch-devtools` ohne Änderungen am Testcode
- **[Selenium](/docs/devtools/selenium)** - Verwenden Sie `@wdio/selenium-devtools` mit Mocha, Jest, Cucumber oder einfachen Node-Skripten