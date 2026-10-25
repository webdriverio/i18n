---
id: multi-framework-support
title: Supporto Multi-Framework
description: "Usa il servizio DevTools con Mocha, Jasmine o Cucumber senza configurazioni specifiche per il framework."
---

DevTools funziona automaticamente con Mocha, Jasmine e Cucumber senza richiedere alcuna configurazione specifica per il framework. Ti basta aggiungere il servizio alla configurazione di WebDriverIO e tutte le funzionalità funzioneranno senza problemi, indipendentemente dal framework di test che stai utilizzando.

**Framework supportati:**
- **Mocha** - Esecuzione a livello di test e di suite con filtraggio tramite grep
- **Jasmine** - Integrazione completa con filtraggio basato su grep
- **Cucumber** - Esecuzione a livello di scenario e di esempio con targeting tramite feature:line

La stessa interfaccia di debug, la riesecuzione dei test e le funzionalità di visualizzazione funzionano in modo coerente con tutti i framework.

## Configurazione

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // oppure 'jasmine' o 'cucumber'
    services: ['devtools'],
    // ...
};
```