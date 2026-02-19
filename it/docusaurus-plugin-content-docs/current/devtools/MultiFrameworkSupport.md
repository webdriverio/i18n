---
id: multi-framework-support
title: Supporto Multi-Framework
---

DevTools funziona automaticamente con Mocha, Jasmine e Cucumber senza richiedere alcuna configurazione specifica per il framework. È sufficiente aggiungere il servizio alla configurazione WebDriverIO e tutte le funzionalità funzionano perfettamente indipendentemente dal framework di test che si sta utilizzando.

**Framework supportati:**
- **Mocha** - Esecuzione a livello di test e suite con filtraggio grep
- **Jasmine** - Integrazione completa con filtraggio basato su grep
- **Cucumber** - Esecuzione a livello di scenario ed esempio con targeting feature:line

La stessa interfaccia di debugging, la riesecuzione dei test e le funzionalità di visualizzazione funzionano in modo coerente su tutti i framework.

## Configurazione

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // o 'jasmine' o 'cucumber'
    services: ['devtools'],
    // ...
};
```