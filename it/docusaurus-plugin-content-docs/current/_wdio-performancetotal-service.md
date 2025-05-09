---
id: wdio-performancetotal-service
title: Servizio PerformanceTotal
custom_edit_url: https://github.com/tzurp/performance-total/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-performancetotal-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/tzurp/performance-total) | [npm](https://www.npmjs.com/package/wdio-performancetotal-service)
Nota:<br/>
Per WebdriverIO v9 usa la versione 4.x.x.<br/>
Per WebdriverIO v8 usa la versione 3.x.x.<br/>
Per WebdriverIO v7 usa la versione 2.x.x.<br/>
Per WebdriverIO v6 usa la versione 1.x.x.

---

![chart](https://github.com/tzurp/performance-total/blob/master/resources/chart.png)

Con questo plugin per [webdriver.io](https://webdriver.io/) puoi facilmente aggiungere analisi delle prestazioni a qualsiasi flusso nei tuoi test, che si tratti di UI pura, API o una combinazione di entrambi. Questo plugin fornisce un modo semplice ed efficiente per misurare i tempi di risposta di varie procedure e identificare potenziali colli di bottiglia nella tua applicazione. Con queste informazioni, puoi prendere decisioni informate riguardo le ottimizzazioni e i miglioramenti per migliorare le prestazioni complessive della tua applicazione.

## Installazione

Il modo più semplice per installare questo modulo come dipendenza di sviluppo è usando il seguente comando:

```
npm install wdio-performancetotal-service --save-dev
```

## Utilizzo

Aggiungi wdio-performancetotal-service al tuo `wdio.conf.js`:

```typescript
exports.config = {
  // ...
  services: ['performancetotal']
  // ...
};
```
...o con le opzioni del servizio:

```typescript
exports.config = {
  // ...
  services: [
      ['performancetotal',
      // Le opzioni (con valori predefiniti)
        {
            disableAppendToExistingFile: false,
            performanceResultsFileName: "performance-results",
            dropResultsFromFailedTest: false,
            performanceResultsDirectory: "performance-results",
            analyzeByBrowser: false,
            recentDays: 0
        }]
      ]
  // ...
};
```

### Opzioni

#### __disableAppendToExistingFile__

Quando impostato su `true`, le nuove esecuzioni dei test inizieranno da zero e sovrascriveranno qualsiasi dato di prestazione esistente.
Quando impostato su `false` (predefinito), i dati di prestazione verranno aggiunti ai dati esistenti.

> **⚠️ Attenzione:**
>
> Questa azione eliminerà permanentemente tutti i dati di prestazione. Assicurati di avere un backup prima di procedere.

#### __performanceResultsFileName__

Puoi sostituire il nome predefinito del file dei risultati (`performance-results`).
Un file di risultati appena creato normalmente sovrascrive il vecchio file. Se vuoi mantenere i vecchi file, si consiglia di aggiungere un timestamp al nome del file. Per esempio:

```typescript
...
performanceResultsFileName: `performance-results_${new Date().getTime()}`
...
```

#### __dropResultsFromFailedTest__

Il valore predefinito è `false`. Quando il valore è impostato su `true`, l'analisi delle prestazioni dei test falliti verrà esclusa.

#### __recentDays__

Il valore predefinito è `0` (nessun limite). Per impostare il numero di giorni da considerare per l'analisi delle prestazioni, imposta il numero di giorni. Sono supportati anche giorni parziali (ad esempio `recentDays: 0.5`)

#### __performanceResultsDirectory__

Puoi sostituire il percorso predefinito per la directory dei risultati nella directory principale del progetto.
Per esempio:

```typescript
...
performanceResultsDirectory: "results-dir/performance-total-results"
...
```

#### __analyzeByBrowser__

Il valore predefinito è `false`. Se `true`, i dati di prestazione verranno analizzati anche per tipo di browser.


### Utilizzo nel test

Importa semplicemente __performancetotal__ dove ne hai bisogno, sia nel tuo file di test che in qualsiasi altra classe. Questo oggetto fornisce metodi per misurare i dati di prestazione nei tuoi test, inclusi sampleStart e sampleEnd per avviare e terminare le misurazioni delle prestazioni.
Ecco un esempio di come potresti utilizzare l'oggetto performancetotal per misurare le prestazioni di avvio di due siti web:

```typescript
// Questo test case misura le prestazioni di avvio di Github e SourceForge utilizzando l'oggetto performancetotal.

import { performancetotal } from "wdio-performancetotal-service";

it("should test github and sourceforge startup performance", () => {
    // Inizia una nuova misurazione delle prestazioni per Github
    performancetotal.sampleStart("GH-Startup");

    // Naviga verso Github
    browser.url("https://github.com/");

    // Termina la misurazione di Github e salva i risultati
    performancetotal.sampleEnd("GH-Startup");

    // ...

    // Inizia una nuova misurazione delle prestazioni per SourceForge
    performancetotal.sampleStart("SF-Startup");

    // Naviga verso SourceForge
    await browser.url("https://sourceforge.net/");

    // Termina la misurazione di SourceForge e salva i risultati
    performancetotal.sampleEnd("SF-Startup");
});

```

Puoi recuperare il tempo impiegato per un singolo campione di prestazione chiamando performancetotal.getSampleTime(sampleName) nel tuo test. Questo ti permette di controllare le prestazioni di una specifica sezione di codice e assicurarti che soddisfi le tue aspettative.

```typescript
// Ottieni il tempo impiegato per un singolo campione
const sampleTime = performancetotal.getSampleTime(sampleName);

```

## Ottenere i risultati

Quando tutti i test sono completati, una nuova directory di risultati viene creata nella cartella principale del tuo progetto (il nome predefinito della directory è performance-results). All'interno di questa directory, vengono creati due file: performance-results.json e performance-results.csv. Questi file contengono dati analizzati per ogni campione, inclusi il tempo medio, l'errore standard della media (SEM), il numero di campioni, il valore minimo, il valore massimo, il primo tempo e l'ultimo tempo. Puoi utilizzare questi dati per identificare eventuali regressioni o miglioramenti delle prestazioni nel tempo.

### Analizzare i dati di prestazione in blocco

Per analizzare i dati di prestazione esistenti in blocco senza generare nuovi test, si consiglia di utilizzare lo strumento [__performancetotal-cli__](https://www.npmjs.com/package/performancetotal-cli).

## Supporto Typescript

Typescript è supportato per questo plugin.

## Supporto

Per supporto e suggerimenti, sentiti libero di contattarmi all'indirizzo [tzur.paldi@outlook.com](https://github.com/tzurp/performance-total/blob/master/mailto:tzur.paldi@outlook.com).