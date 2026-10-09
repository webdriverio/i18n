---
id: browserstack
title: Test di accessibilità con BrowserStack
description: "Aggiungi scansioni automatizzate dell'accessibilità ai test WebdriverIO eseguiti su BrowserStack Automate ed esamina i problemi rilevati nei report di BrowserStack."
---

# Test di accessibilità con BrowserStack

Puoi integrare facilmente i test di accessibilità nelle tue suite di test WebdriverIO utilizzando la [funzionalità Automated tests di BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## Vantaggi degli Automated tests in BrowserStack Accessibility Testing

Per utilizzare gli Automated tests in BrowserStack Accessibility Testing, i tuoi test devono essere eseguiti su BrowserStack Automate.

Di seguito sono elencati i vantaggi degli Automated tests:

* Si integrano perfettamente nella tua suite di test automatizzati esistente.
* Non è richiesta alcuna modifica al codice dei casi di test.
* Non richiedono alcuna manutenzione aggiuntiva per i test di accessibilità.
* Consentono di comprendere le tendenze storiche e ottenere informazioni approfondite sui casi di test.

## Iniziare con BrowserStack Accessibility Testing

Segui questi passaggi per integrare le tue suite di test WebdriverIO con BrowserStack Accessibility Testing:

1. Installa il pacchetto npm `@wdio/browserstack-service`.

```bash npm2yarn
npm install --save-dev @wdio/browserstack-service
```

2. Aggiorna il file di configurazione `wdio.conf.js`.

```javascript
exports.config = {
    //...
    user: '<browserstack_username>' || process.env.BROWSERSTACK_USERNAME,
    key: '<browserstack_access_key>' || process.env.BROWSERSTACK_ACCESS_KEY,
    commonCapabilities: {
      'bstack:options': {
        projectName: "Your static project name goes here",
        buildName: "Your static build/job name goes here"
      }
    },
    services: [
      ['browserstack', {
        accessibility: true,
        // Opzioni di configurazione facoltative
        accessibilityOptions: {
          'wcagVersion': 'wcag21a',
          'includeIssueType': {
            'bestPractice': false,
            'needsReview': true
          },
          'includeTagsInTestingScope': ['Specify tags of test cases to be included'],
          'excludeTagsInTestingScope': ['Specify tags of test cases to be excluded']
        },
      }]
    ],
    //...
  };
```

Puoi consultare le istruzioni dettagliate [qui](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).