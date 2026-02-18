---
id: devtools
title: DevTools
---

Der DevTools-Service bietet eine leistungsstarke browserbasierte Debugging-Oberfläche für WebdriverIO-Testausführungen. Es ermöglicht Ihnen, Ihre Tests in Echtzeit durch eine interaktive Webanwendung zu visualisieren, zu debuggen und zu steuern.

## Überblick

Dieser Service ermöglicht Ihnen:

- **Tests selektiv erneut ausführen** - Klicken Sie auf einen beliebigen Testfall oder eine Test-Suite, um ihn sofort erneut auszuführen
- **Visuelles Debugging** - Sehen Sie Live-Browser-Vorschauen mit automatischen Screenshots
- **Ausführung verfolgen** - Detaillierte Befehlsprotokolle mit Zeitstempeln und Ergebnissen anzeigen
- **Netzwerk & Konsole überwachen** - API-Aufrufe und JavaScript-Logs prüfen
- **Zum Code navigieren** - Springen Sie direkt zu Testquelldateien

## Installation

Installieren Sie den Service als Dev-Abhängigkeit:

```sh
npm install --save-dev @wdio/devtools-service
```

## Konfiguration

Fügen Sie den Service zu Ihrer WebDriverIO-Konfiguration hinzu:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['devtools'],
    // ...
};
```

### Service-Optionen

Konfigurieren Sie den DevTools-Service mit diesen Optionen:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['devtools', {
            port: 3000,      // Port für die DevTools-UI (Standard: 3000)
        }]
    ],
    // ...
};
```

#### Optionen

- **port** (Zahl, Standard: `3000`) - Portnummer für den DevTools-UI-Server

## Funktionsweise

Wenn Sie Ihre WebdriverIO-Tests mit aktiviertem DevTools-Service ausführen:

1. Der Service öffnet ein Browserfenster unter `http://localhost:3000` (konfigurierbar)
2. Ihre Tests werden normal ausgeführt, während die DevTools-UI Echtzeit-Updates anzeigt
3. Die UI zeigt die Testhierarchie, Browser-Vorschau, Befehlszeitachse und Logs
4. Nach Abschluss der Tests können Sie auf einen beliebigen Test klicken, um ihn einzeln erneut auszuführen
5. Tests werden in derselben Browsersitzung erneut ausgeführt, um schnelleres Debugging zu ermöglichen

## Funktionen

Entdecken Sie die DevTools-Funktionen im Detail:

- **[Interaktive Testwiederholung & Visualisierung](devtools/interactive-test-rerunning)** - Echtzeit-Browser-Vorschauen mit Testwiederholungen
- **[Multi-Framework-Unterstützung](devtools/multi-framework-support)** - Funktioniert mit Mocha, Jasmine und Cucumber
- **[Konsolenprotokolle](devtools/console-logs)** - Erfassen und Untersuchen der Browser-Konsolenausgabe
- **[Netzwerkprotokolle](devtools/network-logs)** - Überwachen von API-Aufrufen und Netzwerkaktivitäten
- **[TestLens](devtools/testlens)** - Zum Quellcode navigieren mit intelligenter Codenavigation