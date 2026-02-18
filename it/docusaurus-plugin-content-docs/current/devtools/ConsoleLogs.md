---
id: console-logs
title: Log della Console
---

Cattura e ispeziona tutto l'output della console del browser durante l'esecuzione dei test. DevTools registra i messaggi della console dalla tua applicazione (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`) così come i log del framework WebDriverIO in base al `logLevel` configurato nel tuo `wdio.conf.ts`.

**Funzionalità:**
- Cattura in tempo reale dei messaggi della console durante l'esecuzione dei test
- Log della console del browser (log, warn, error, info, debug)
- Log del framework WebDriverIO filtrati dal `logLevel` configurato (trace, debug, info, warn, error, silent)
- Timestamp che mostrano esattamente quando ogni messaggio è stato registrato
- Log della console visualizzati insieme ai passaggi del test e agli screenshot del browser per contesto

**Configurazione:**
```js
// wdio.conf.ts
export const config = {
    // Livello di verbosità del logging: trace | debug | info | warn | error | silent
    logLevel: 'info', // Controlla quali log del framework vengono catturati
    // ...
};
```

Questo rende facile il debug degli errori JavaScript, tenere traccia del comportamento dell'applicazione e vedere le operazioni interne di WebDriverIO durante l'esecuzione dei test.

## Demo

### >_ Log della Console
![Console Logs](./demo/console-logs.gif)