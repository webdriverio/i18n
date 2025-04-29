---
id: wdio-html-nice-reporter
title: Reporter HTML
custom_edit_url: https://github.com/rpii/wdio-html-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-html-nice-reporter è un pacchetto di terze parti, per maggiori informazioni consulta [GitHub](https://github.com/rpii/wdio-html-reporter) | [npm](https://www.npmjs.com/package/wdio-html-nice-reporter)
 # wdio-html-nice-reporter

Un reporter per webdriver.io che genera un bel report HTML.
Il nome è sciocco ma fornisce integrazione con webdriverio

### Novità: non più in versione beta.

### Novità: ripulito e cambiato il logging a wdio-logging. Gli esempi sono aggiornati.
    È necessario rimuovere l'inizializzazione del logger log4Js dalla configurazione

### Novità: riscritto come modulo ES per la compatibilità con webdriverio 8.
    Potrebbero essere necessarie modifiche nella tua app di test

### Bug fix: webdriverio si chiudeva durante la scrittura asincrona del json.

### Bug fix: la scrittura json non era attesa correttamente

### Grande nuovo miglioramento: non più errori di memoria esaurita dovuti a json.stringify

### Grande nuova funzionalità: registrare video di ogni test


## [Changelog](https://github.com/rpii/wdio-html-reporter/blob/master/changes.md)

## Informazioni

Questo progetto è una riscrittura di [@rpii/wdio-html-reporter](https://www.npmjs.com/package/wdio-html-reporter)
È scritto in typescript con molti miglioramenti.



## Configurazione

### WDIO.config.ts

Il seguente codice mostra la configurazione predefinita del test runner wdio. Basta aggiungere un oggetto HtmlReporter come altro reporter all'array dei reporters:

### Un wdio.config.ts funzionante è fornito in [/samples/wdio.config.ts](https://github.com/rpii/wdio-html-reporter/blob/master//samples/wdio.config.ts)

di seguito sono riportati estratti da quel file.

```typescript

// wdio.config.ts
import {ReportGenerator, HtmlReporter} from 'wdio-html-nice-reporter';
let reportAggregator: ReportGenerator;

const BaseConfig: WebdriverIO.Config = {
    
  reporters: ['spec',
        ["html-nice", {
            outputDir: './reports/html-reports/',
            filename: 'report.html',
            reportTitle: 'Test Report Title',
            linkScreenshots: true,
            //to show the report in a browser when done
            showInBrowser: true,
            collapseTests: false,
            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: false
        }
        ]
    ]
    
 
};
```
## Opzioni di configurazione:
  
### Per generare un report master per tutte le suite

webdriver.io chiamerà il reporter per ogni suite di test. Non aggrega i report. Per fare ciò, aggiungi i seguenti gestori di eventi al tuo wdio.config.js

Aggiungi al file di configurazione del browser:
```
let reportAggregator : ReportAggregator;
```
Aggiungi all'oggetto di configurazione del browser:
```javascript
    onPrepare: function(config, capabilities) {

    reportAggregator = new ReportGenerator({
        outputDir: './reports/html-reports/',
        filename: 'master-report.html',
        reportTitle: 'Master Report',
        browserName: capabilities.browserName,
        collapseTests: true
    });
    reportAggregator.clean();
}


onComplete: function (exitCode, config, capabilities, results) {
    (async () => {
        await reportAggregator.createReport();
    })();
}


``` 


  
### Per generare un file pdf da questo report

Richiede un plugin aggiuntivo per mantenere il supporto leggero per coloro che non lo desiderano.
vedi [@rpii/wdio-html-reporter-pdf](https://www.npmjs.com/package/@rpii/wdio-html-reporter-pdf)


## Output di esempio:

![Report Screenshot](https://github.com/rpii/wdio-html-reporter/blob/master/TestReport.png)

## browserName

Questo deve essere impostato manualmente. Non è disponibile al momento della configurazione poiché l'oggetto browser non esiste fino a quando non si avvia una sessione.