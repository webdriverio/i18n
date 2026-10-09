---
id: why-webdriverio
title: Warum WebdriverIO?
description: Was WebdriverIO von anderen Testautomatisierungstools unterscheidet – eine API für jede Plattform, Webstandards, offene Governance und erstklassige Unterstützung für Coding Agents.
---

WebdriverIO ist ein Open-Source-Framework zur Testautomatisierung für Node.js. Mit einem Test Runner und einer API können Sie Webbrowser, native und hybride Mobile Apps, Desktop-Apps und Editor-Erweiterungen automatisieren und zusätzlich visuelle Tests, Barrierefreiheitstests und Komponententests durchführen. Es wird von seiner Community unter dem Dach der [OpenJS Foundation](https://openjsf.org/) betrieben.

## Ein Framework für jede Plattform

Die meisten Teams liefern mehr als nur eine Website aus. Mit WebdriverIO können Sie all das mit denselben Selektoren, Assertions, Reportern und demselben CI-Setup testen:

| Plattform | Wie WebdriverIO sie automatisiert | Hier starten |
| --- | --- | --- |
| Webbrowser | WebDriver und WebDriver BiDi in Chrome, Firefox, Safari und Edge | [Web Browsers](/docs/platforms/web) |
| Webkomponenten | Komponententests in einem echten Browser für React, Vue, Svelte, Solid, Preact, Lit und Stencil | [Component Testing](/docs/component-testing) |
| Mobile Apps | Native, hybride und mobile Web-Apps auf iOS und Android über Appium, einschließlich Flutter | [Mobile Apps](/docs/platforms/mobile) |
| Desktop-Apps | Electron-, Tauri- und Dioxus-Apps auf macOS, Windows und Linux, native macOS-Apps über Appium | [Desktop Apps](/docs/platforms/desktop) |
| Editoren und Erweiterungen | VS Code-Erweiterungen und Browser-Erweiterungen | [Extensions & Editors](/docs/platforms/apps-and-extensions) |
| Visuelle Regressionen | Bildschirm-, Element- und Ganzseitenvergleiche für Web und Mobile | [Visual Testing](/docs/visual-testing) |

Derselbe Test kann mit [Multi-Remote](/docs/multiremote) sogar mehrere davon gleichzeitig steuern, z. B. eine Mobile App und ein Web-Dashboard in einem Szenario.

## Auf Webstandards aufgebaut

WebdriverIO automatisiert Browser über [WebDriver](https://w3c.github.io/webdriver/) und [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/), die W3C-Standards, die jeder Browserhersteller implementiert und [testet](https://wpt.fyi/results/webdriver/tests). Ihre Tests laufen gegen dieselben Browser-Builds, die auch Ihre Nutzer verwenden, und Interaktionen wie Klicks und Tastendrücke werden vom Browser selbst ausgelöst, anstatt mit JavaScript emuliert zu werden. WebDriver BiDi ergänzt Network Mocking, Konsolen- und Log-Events und mehr – browserübergreifend, nicht nur in Chromium.

Wenn Sie browserspezifische Funktionen benötigen, bietet Ihnen WebdriverIO über [Puppeteer](/docs/api/browser/getPuppeteer) Zugriff auf das Chrome DevTools Protocol. Mehr dazu erfahren Sie unter [Automation Protocols](/docs/automationProtocols).

## Community-getrieben und offen verwaltet

WebdriverIO ist kein Produkt eines Testanbieters. Das Projekt:

- gehört der [OpenJS Foundation](https://openjsf.org/), einer herstellerneutralen Non-Profit-Organisation, die es rechtlich dazu verpflichtet, den Interessen aller seiner Nutzer zu dienen
- folgt einem öffentlichen [Governance-Modell](https://github.com/webdriverio/webdriverio/blob/main/GOVERNANCE.md): Jeder kann beitragen, und Committer sowie das Technical Steering Committee gehen aus der Community hervor
- hat keine kostenpflichtige Stufe und keine Feature-Beschränkungen; jede Funktion ist kostenlos, und Sie können Ihre Tests überall ausführen, lokal oder bei jedem beliebigen Cloud-Anbieter
- leitet Sponsoring-Gelder über ein [Contributor-Stipendienprogramm](/blog/2024/02/15/new-contributor-stipend-program) an die Menschen zurück, die es entwickeln
- bietet kostenlosen Community-Support auf [Discord](https://discord.webdriver.io) und in den [GitHub Discussions](https://github.com/webdriverio/webdriverio/discussions)

## Bereit für Coding Agents

Die Dokumentation, die Tools und die Test-Artefakte sind so gestaltet, dass Coding Agents selbstständig mit WebdriverIO arbeiten können:

- **Agent-taugliche Dokumentation**: Jede Seite ist als Markdown verfügbar, es gibt eine kuratierte [`llms.txt`](https://webdriver.io/llms.txt) und einen Docs-MCP-Server unter `https://webdriver.io/mcp`.
- **WebdriverIO MCP**: Mit dem [`@wdio/mcp`](/docs/mcp)-Server kann ein Agent Browser und Mobile Apps steuern, um Ihre Benutzeroberfläche zu erkunden und Selektoren zu überprüfen.
- **Traces**: Der [DevTools-Trace-Modus](/docs/devtools/wdio/trace-mode) erstellt für jeden fehlgeschlagenen Test ein Markdown-Protokoll, Screenshots und Accessibility-Snapshots.

Die Einrichtung finden Sie unter [WebdriverIO for Coding Agents](/docs/ai-agents).

## Alles inklusive, einfach erweiterbar

- Ein [Test Runner](/docs/testrunner) mit Unterstützung für Mocha, Jasmine und Cucumber, paralleler Ausführung, [Sharding](/docs/sharding), [Wiederholungen](/docs/retry) und einem [Watch-Modus](/docs/watcher)
- [Automatisches Warten](/docs/autowait) bei jeder Interaktion und eine integrierte [Assertion-Bibliothek](/docs/assertion)
- [Network Mocking](/docs/mocksandspies), [Emulation](/docs/emulation) und [Snapshot-Tests](/docs/snapshot)
- Ein [Debugging-Dashboard und Trace-Viewer](/docs/devtools)
- [Über 70 Services und Reporter](/docs/ecosystem) für Clouds, Frameworks und CI sowie einfache APIs, um eigene [Befehle](/docs/customcommands), [Services](/docs/customservices) und [Reporter](/docs/customreporter) zu schreiben

## Wann Sie sich für etwas anderes entscheiden sollten

WebdriverIO eignet sich gut, wenn Sie mehr als eine Plattform testen, gegen echte Browser und Geräte testen möchten oder Wert auf ein unabhängiges, Community-eigenes Tool legen. Wenn Sie immer nur eine einzelne Web-App in einem einzigen Browser testen und keine Mobile-, Desktop- oder Cloud-Geräte benötigen, fühlt sich ein reines Browser-Tool für den Einstieg möglicherweise leichtgewichtiger an. Wenn Sie unsicher sind, [erstellen Sie ein Projekt](/docs/gettingstarted) mit `npm init wdio@latest` und probieren Sie es aus: Die Einrichtung dauert etwa eine Minute.

## Nächste Schritte

- [Getting Started](/docs/gettingstarted) - ein Projekt erstellen und den ersten Test ausführen
- [Setup Types](/docs/setuptypes) - Test Runner oder Standalone-Modus
- [WebdriverIO for Coding Agents](/docs/ai-agents) - Ihren Agent einrichten