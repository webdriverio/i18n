---
id: console-logs
title: Konsolenprotokolle
---

Erfassen und untersuchen Sie alle Browserkonsolen-Ausgaben während der Testausführung. DevTools zeichnet Konsolenmeldungen Ihrer Anwendung (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`) sowie WebDriverIO-Framework-Logs basierend auf dem in Ihrer `wdio.conf.ts` konfigurierten `logLevel` auf.

**Funktionen:**
- Echtzeit-Erfassung von Konsolenmeldungen während der Testausführung
- Browser-Konsolenlogs (log, warn, error, info, debug)
- WebDriverIO-Framework-Logs gefiltert nach konfiguriertem `logLevel` (trace, debug, info, warn, error, silent)
- Zeitstempel, die genau anzeigen, wann jede Nachricht protokolliert wurde
- Konsolenprotokolle werden neben Testschritten und Browser-Screenshots für Kontext angezeigt

**Konfiguration:**
```js
// wdio.conf.ts
export const config = {
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info', // Controls which framework logs are captured
    // ...
};
```

Dies macht es einfach, JavaScript-Fehler zu debuggen, Anwendungsverhalten zu verfolgen und WebDriverIOs interne Operationen während der Testausführung zu sehen.

## Demo

### >_ Konsolenprotokolle
![Console Logs](./demo/console-logs.gif)