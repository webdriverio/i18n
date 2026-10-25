---
id: console-logs
title: Log della console
description: "Acquisisci e ispeziona i messaggi della console del browser e i log del framework WebdriverIO registrati da DevTools durante l'esecuzione dei test."
---

Acquisisci e ispeziona tutto l'output della console del browser durante l'esecuzione dei test. DevTools registra i messaggi della console provenienti dalla tua applicazione (`console.log()`, `console.warn()`, `console.error()`, `console.info()`, `console.debug()`) così come i log del framework WebDriverIO in base al `logLevel` configurato nel tuo `wdio.conf.ts`.

**Funzionalità:**
- Acquisizione in tempo reale dei messaggi della console durante l'esecuzione dei test
- Log della console del browser (log, warn, error, info, debug)
- Log del framework WebDriverIO filtrati in base al `logLevel` configurato (trace, debug, info, warn, error, silent)
- Timestamp che mostrano esattamente quando ogni messaggio è stato registrato
- Log della console visualizzati insieme ai passaggi del test e agli screenshot del browser per fornire contesto

**Configurazione:**
```js
// wdio.conf.ts
export const config = {
    // Livello di dettaglio del logging: trace | debug | info | warn | error | silent
    logLevel: 'info', // Controlla quali log del framework vengono acquisiti
    // ...
};
```

Questo rende semplice il debug degli errori JavaScript, il monitoraggio del comportamento dell'applicazione e la visualizzazione delle operazioni interne di WebDriverIO durante l'esecuzione dei test.

## Demo

### >_ Log della console
![Console Logs](/img/devtools/console-logs.gif)