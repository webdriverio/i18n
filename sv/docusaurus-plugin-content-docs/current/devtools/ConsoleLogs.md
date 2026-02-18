---
id: console-logs
title: Konsolloggar
---

Fånga och inspektera all webbläsarkonsolens utdata under testkörning. DevTools registrerar konsolmeddelanden från din applikation (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`) såväl som WebDriverIO-ramverkets loggar baserat på `logLevel` som konfigurerats i din `wdio.conf.ts`.

**Funktioner:**
- Realtidsfångst av konsolmeddelanden under testkörning
- Webbläsarens konsolloggar (log, warn, error, info, debug)
- WebDriverIO-ramverkets loggar filtrerade enligt konfigurerad `logLevel` (trace, debug, info, warn, error, silent)
- Tidsstämplar som visar exakt när varje meddelande loggades
- Konsolloggar visas tillsammans med teststeg och skärmdumpar för kontext

**Konfiguration:**
```js
// wdio.conf.ts
export const config = {
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info', // Controls which framework logs are captured
    // ...
};
```

Detta gör det enkelt att felsöka JavaScript-fel, spåra applikationsbeteende och se WebDriverIO:s interna operationer under testkörning.

## Demo

### >_ Konsolloggar
![Console Logs](./demo/console-logs.gif)