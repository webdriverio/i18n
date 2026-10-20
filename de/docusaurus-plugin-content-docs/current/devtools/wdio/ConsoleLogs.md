---
id: console-logs
title: Konsolenprotokolle
description: "Erfassen und untersuchen Sie Browser-Konsolenmeldungen und WebdriverIO-Framework-Logs, die von DevTools während der Testausführung aufgezeichnet werden."
---

Erfassen und untersuchen Sie die gesamte Ausgabe der Browser-Konsole während der Testausführung. DevTools zeichnet Konsolenmeldungen Ihrer Anwendung (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`) sowie WebDriverIO-Framework-Logs auf, basierend auf dem in Ihrer `wdio.conf.ts` konfigurierten `logLevel`.

**Funktionen:**
- Erfassung von Konsolenmeldungen in Echtzeit während der Testausführung
- Browser-Konsolenprotokolle (log, warn, error, info, debug)
- WebDriverIO-Framework-Logs, gefiltert nach dem konfigurierten `logLevel` (trace, debug, info, warn, error, silent)
- Zeitstempel, die genau anzeigen, wann jede Meldung protokolliert wurde
- Konsolenprotokolle werden zur besseren Einordnung zusammen mit Testschritten und Browser-Screenshots angezeigt

**Konfiguration:**
```js
// wdio.conf.ts
export const config = {
    // Detailgrad der Protokollierung: trace | debug | info | warn | error | silent
    logLevel: 'info', // Steuert, welche Framework-Logs erfasst werden
    // ...
};
```

Dies erleichtert das Debuggen von JavaScript-Fehlern, das Nachverfolgen des Anwendungsverhaltens und das Einsehen der internen Abläufe von WebDriverIO während der Testausführung.

## Demo

### >_ Konsolenprotokolle
![Console Logs](/img/devtools/console-logs.gif)