---
id: console-logs
title: Konsolloggar
description: "Fånga och granska webbläsarens konsolmeddelanden och WebdriverIO-ramverkets loggar som registreras av DevTools under testkörningen."
---

Fånga och granska all konsolutdata från webbläsaren under testkörningen. DevTools registrerar konsolmeddelanden från din applikation (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`) samt loggar från WebDriverIO-ramverket baserat på den `logLevel` som är konfigurerad i din `wdio.conf.ts`.

**Funktioner:**
- Fångst av konsolmeddelanden i realtid under testkörningen
- Webbläsarens konsolloggar (log, warn, error, info, debug)
- WebDriverIO-ramverkets loggar filtrerade efter konfigurerad `logLevel` (trace, debug, info, warn, error, silent)
- Tidsstämplar som visar exakt när varje meddelande loggades
- Konsolloggar visas tillsammans med teststeg och skärmbilder från webbläsaren för sammanhang

**Konfiguration:**
```js
// wdio.conf.ts
export const config = {
    // Detaljnivå för loggning: trace | debug | info | warn | error | silent
    logLevel: 'info', // Styr vilka ramverksloggar som fångas
    // ...
};
```

Detta gör det enkelt att felsöka JavaScript-fel, följa applikationens beteende och se WebDriverIO:s interna operationer under testkörningen.

## Demo

### >_ Konsolloggar
![Console Logs](/img/devtools/console-logs.gif)