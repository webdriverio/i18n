---
id: multi-framework-support
title: Supporto Multi-Framework
---

DevTools funziona automaticamente con Mocha, Jasmine e Cucumber senza richiedere alcuna configurazione specifica per framework. Basta aggiungere il servizio alla configurazione WebDriverIO e tutte le funzionalità operano perfettamente indipendentemente dal framework di test che stai utilizzando.

**Framework Supportati:**
- **Mocha** - Esecuzione a livello di test e suite con filtraggio grep
- **Jasmine** - Integrazione completa con filtraggio basato su grep
- **Cucumber** - Esecuzione a livello di scenario ed esempio con targeting feature:line

La stessa interfaccia di debug, la ri-esecuzione dei test e le funzionalità di visualizzazione funzionano in modo coerente su tutti i framework.

## Configurazione

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // o 'jasmine' o 'cucumber'
    services: ['devtools'],
    // ...
};
```