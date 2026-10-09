---
id: testmuai
title: Test di accessibilità con TestMu AI (precedentemente LambdaTest)
description: "Abilita i test di accessibilità di TestMu AI (precedentemente LambdaTest) nella tua suite WebdriverIO, configura le opzioni di scansione e visualizza i report di accessibilità."
---

# Test di accessibilità con TestMu AI

Puoi integrare facilmente i test di accessibilità nelle tue suite di test WebdriverIO utilizzando [TestMu AI Accessibility Testing](https://www.testmuai.com/support/docs/accessibility-automation-settings/).

## Vantaggi di TestMu AI Accessibility Testing

TestMu AI Accessibility Testing ti aiuta a identificare e risolvere i problemi di accessibilità nelle tue applicazioni web. Di seguito i principali vantaggi:

* Si integra perfettamente con la tua automazione dei test WebdriverIO esistente.
* Scansione automatizzata dell'accessibilità durante l'esecuzione dei test.
* Report completi sulla conformità WCAG.
* Tracciamento dettagliato dei problemi con indicazioni per la correzione.
* Supporto per più standard WCAG (WCAG 2.0, WCAG 2.1, WCAG 2.2).
* Informazioni sull'accessibilità in tempo reale nella dashboard di TestMu AI.

## Iniziare con TestMu AI Accessibility Testing

Segui questi passaggi per integrare le tue suite di test WebdriverIO con l'Accessibility Testing di TestMu AI:

1. Installa il pacchetto del servizio WebdriverIO di TestMu AI.

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
            accessibility: true, // Abilita i test di accessibilità
            accessibilityOptions: {
                wcagVersion: 'wcag21a', // Versione WCAG (wcag20, wcag21a, wcag21aa, wcag22aa)
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

3. Esegui i tuoi test come di consueto. TestMu AI eseguirà automaticamente la scansione dei problemi di accessibilità durante l'esecuzione dei test.

```bash
npx wdio run wdio.conf.js
```

## Opzioni di configurazione

L'oggetto `accessibilityOptions` supporta i seguenti parametri:

* **wcagVersion**: Specifica la versione dello standard WCAG rispetto a cui eseguire i test
  - `wcag20` - WCAG 2.0 Livello A
  - `wcag21a` - WCAG 2.1 Livello A
  - `wcag21aa` - WCAG 2.1 Livello AA (predefinito)
  - `wcag22aa` - WCAG 2.2 Livello AA

* **bestPractice**: Includi le raccomandazioni sulle best practice (predefinito: `false`)

* **needsReview**: Includi i problemi che richiedono una revisione manuale (predefinito: `true`)

## Visualizzare i report di accessibilità

Al termine dei test, puoi visualizzare report di accessibilità dettagliati nella [Dashboard di TestMu AI](https://automation.lambdatest.com/):

1. Vai all'esecuzione del tuo test
2. Fai clic sulla scheda "Accessibility"
3. Esamina i problemi identificati con i relativi livelli di gravità
4. Ottieni indicazioni per la correzione di ciascun problema

Per informazioni più dettagliate, visita la [documentazione di TestMu AI Accessibility Automation](https://www.testmuai.com/support/docs/accessibility-automation-settings/).