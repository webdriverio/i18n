---
id: console-logs
title: Konsolenprotokolle
description: "Erfassen und untersuchen Sie Browser-Konsolenmeldungen und WebdriverIO-Framework-Logs, die von DevTools während der Testausführung aufgezeichnet werden."
---

Erfassen und untersuchen Sie sämtliche Browser-Konsolenausgaben während der Testausführung. DevTools zeichnet Konsolenmeldungen Ihrer Anwendung (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`) sowie WebDriverIO-Framework-Logs auf, basierend auf dem in Ihrer `wdio.conf.ts` konfigurierten `logLevel`.

**Funktionen:**
- Echtzeit-Erfassung von Konsolenmeldungen während der Testausführung
- Browser-Konsolenlogs (log, warn, error, info, debug)
- WebDriverIO-Framework-Logs, gefiltert nach dem konfigurierten `logLevel` (trace, debug, info, warn, error, silent)
- Zeitstempel, die genau anzeigen, wann jede Meldung protokolliert wurde
- Konsolenlogs werden zusammen mit Testschritten und Browser-Screenshots angezeigt, um den Kontext zu verdeutlichen

**Konfiguration:**
```js
// wdio.conf.ts
export const config = {
    // Ausführlichkeitsstufe der Protokollierung: trace | debug | info | warn | error | silent
    logLevel: 'info', // Steuert, welche Framework-Logs erfasst werden
    // ...
};
```

Dadurch lassen sich JavaScript-Fehler einfach debuggen, das Verhalten der Anwendung nachverfolgen und die internen Vorgänge von WebDriverIO während der Testausführung einsehen.

## Demo

### >_ Konsolenprotokolle
![Console Logs](/img/devtools/console-logs.gif)