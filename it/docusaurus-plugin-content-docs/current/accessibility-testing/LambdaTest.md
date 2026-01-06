---
id: lambdatest
title: Test di Accessibilità LambdaTest
---

# Test di Accessibilità LambdaTest

Puoi facilmente integrare i test di accessibilità nelle tue suite di test WebdriverIO utilizzando [LambdaTest Accessibility Testing](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).

## Vantaggi dei Test di Accessibilità LambdaTest

I Test di Accessibilità LambdaTest ti aiutano a identificare e risolvere i problemi di accessibilità nelle tue applicazioni web. I seguenti sono i vantaggi principali:

* Si integra perfettamente con la tua automazione di test WebdriverIO esistente.
* Scansione automatica dell'accessibilità durante l'esecuzione dei test.
* Reporting completo di conformità WCAG.
* Monitoraggio dettagliato dei problemi con guida alla risoluzione.
* Supporto per diversi standard WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Informazioni sull'accessibilità in tempo reale nella dashboard LambdaTest.

## Iniziare con i Test di Accessibilità LambdaTest

Segui questi passaggi per integrare le tue suite di test WebdriverIO con i Test di Accessibilità di LambdaTest:

1. Installa il pacchetto di servizio LambdaTest WebdriverIO.

```bash npm2yarn
npm install --save-dev @lambdatest/wdio-lambdatest-service
```

2. Aggiorna il tuo file di configurazione `wdio.conf.js`.

```javascript
exports.config = {
    //...
    user: process.env.LT_USERNAME || '<lambdatest_username>',
    key: process.env.LT_ACCESS_KEY || '<lambdatest_access_key>',
    
    capabilities: [{
        browserName: 'chrome',
        'LT:Options': {
            platform: 'Windows 10',
            version: 'latest',
            accessibility: true, // Enable accessibility testing
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // WCAG version (wcag20, wcag21a, wcag21aa, wcag22aa)
                bestPractice: false,
                needsReview: true
            }
        }
    }],
    
    services: [
        ['lambdatest', {
            tunnel: false
        }]
    ],
    //...
};
```

3. Esegui i tuoi test come al solito. LambdaTest eseguirà automaticamente la scansione dei problemi di accessibilità durante l'esecuzione del test.

```bash
npx wdio run wdio.conf.js
```

## Opzioni di Configurazione

L'oggetto `accessibilityOptions` supporta i seguenti parametri:

* **wcagVersion**: Specifica la versione dello standard WCAG da testare
  - `wcag20` - WCAG 2.0 Livello A
  - `wcag21a` - WCAG 2.1 Livello A
  - `wcag21aa` - WCAG 2.1 Livello AA (predefinito)
  - `wcag22aa` - WCAG 2.2 Livello AA

* **bestPractice**: Includi raccomandazioni sulle migliori pratiche (predefinito: `false`)

* **needsReview**: Includi problemi che necessitano di revisione manuale (predefinito: `true`)

## Visualizzazione dei Report di Accessibilità

Dopo il completamento dei test, puoi visualizzare report dettagliati sull'accessibilità nella [Dashboard LambdaTest](https://automation.lambdatest.com/):

1. Vai alla tua esecuzione di test
2. Fai clic sulla scheda "Accessibility"
3. Esamina i problemi identificati con i livelli di gravità
4. Ottieni indicazioni per la risoluzione di ciascun problema

Per informazioni più dettagliate, visita la [documentazione sull'automazione dell'accessibilità LambdaTest](https://www.lambdatest.com/support/docs/accessibility-automation-settings/).