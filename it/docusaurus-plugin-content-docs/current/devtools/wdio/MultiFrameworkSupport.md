---
id: multi-framework-support
title: Supporto Multi-Framework
description: "Usa il servizio DevTools con Mocha, Jasmine o Cucumber senza configurazioni specifiche per il framework."
---

DevTools funziona automaticamente con Mocha, Jasmine e Cucumber senza richiedere alcuna configurazione specifica per il framework. Basta aggiungere il servizio alla configurazione di WebDriverIO e tutte le funzionalità funzioneranno senza problemi, indipendentemente dal framework di test utilizzato.

**Framework Supportati:**
- **Mocha** - Esecuzione a livello di test e di suite con filtro grep
- **Jasmine** - Integrazione completa con filtro basato su grep
- **Cucumber** - Esecuzione a livello di scenario e di esempio con targeting feature:line

La stessa interfaccia di debug, la riesecuzione dei test e le funzionalità di visualizzazione funzionano in modo coerente su tutti i framework.

## Configurazione

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // oppure 'jasmine' o 'cucumber'
    services: ['devtools'],
    // ...
};
```