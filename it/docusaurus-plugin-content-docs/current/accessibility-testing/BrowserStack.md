---
id: browserstack
title: Test di Accessibilità BrowserStack
---

# BrowserStack Accessibility Testing

Puoi facilmente integrare test di accessibilità nelle tue suite di test WebdriverIO utilizzando la [funzionalità di test automatizzati di BrowserStack Accessibility Testing](https://www.browserstack.com/docs/accessibility/automated-tests?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).

## Vantaggi dei Test Automatizzati in BrowserStack Accessibility Testing

Per utilizzare i test automatizzati in BrowserStack Accessibility Testing, i tuoi test dovrebbero essere eseguiti su BrowserStack Automate.

I seguenti sono i vantaggi dei test automatizzati:

* Si integra perfettamente nella tua suite di test di automazione preesistente.
* Non sono necessarie modifiche al codice nei casi di test.
* Richiede zero manutenzione aggiuntiva per i test di accessibilità.
* Comprendi le tendenze storiche e ottieni informazioni sui casi di test.

## Inizia con BrowserStack Accessibility Testing

Segui questi passaggi per integrare le tue suite di test WebdriverIO con Accessibility Testing di BrowserStack:

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
        // Optional configuration options
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

Puoi visualizzare istruzioni dettagliate [qui](https://www.browserstack.com/docs/accessibility/automated-tests/get-started/webdriverio?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation).