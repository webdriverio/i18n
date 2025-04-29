---
id: wdio-performancetotal-service
title: Servizio PerformanceTotal
custom_edit_url: https://github.com/tzurp/performance-total/edit/master/README.md
---


> wdio-performancetotal-service è un pacchetto di terze parti, per ulteriori informazioni consultare [GitHub](https://github.com/tzurp/performance-total) | [npm](https://www.npmjs.com/package/wdio-performancetotal-service)
Nota:<br/>
Per WebdriverIO v9 utilizza la versione 4.x.x.<br/>
Per WebdriverIO v8 utilizza la versione 3.x.x.<br/>
Per WebdriverIO v7 utilizza la versione 2.x.x.<br/>
Per WebdriverIO v6 utilizza la versione 1.x.x.

---

![chart](https://github.com/tzurp/performance-total/blob/master/resources/chart.png)

Con questo plugin per [webdriver.io](https://webdriver.io/) puoi facilmente aggiungere l'analisi delle prestazioni a qualsiasi flusso nei tuoi test, che si tratti di UI pura, API o una combinazione di entrambi. Questo plugin fornisce un modo semplice ed efficiente per misurare i tempi di risposta di varie procedure e identificare potenziali colli di bottiglia nella tua applicazione. Con queste informazioni, puoi prendere decisioni informate sulle ottimizzazioni e i miglioramenti per migliorare le prestazioni complessive della tua applicazione.

## Installazione

Il modo più semplice per installare questo modulo come dipendenza di sviluppo è utilizzando il seguente comando:

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

Quando impostato su `true`, le nuove esecuzioni di test inizieranno da zero e sovrascriveranno i dati sulle prestazioni esistenti.
Quando impostato su `false` (predefinito), i dati sulle prestazioni verranno aggiunti ai dati esistenti.

> **⚠️ Attenzione:**
>
> Questa azione eliminerà definitivamente tutti i tuoi dati sulle prestazioni. Assicurati di avere un backup prima di procedere.

#### __performanceResultsFileName__

Puoi sovrascrivere il nome del file dei risultati predefinito (`performance-results`).
Un file di risultati appena creato normalmente sovrascrive il vecchio file. Se vuoi mantenere i vecchi file, si consiglia di aggiungere un timestamp al nome del file. Per esempio:

```typescript
...
performanceResultsFileName: `performance-results_${new Date().getTime()}`
...
```

#### __dropResultsFromFailedTest__

Il valore predefinito è `false`. Quando il valore è impostato su `true`, l'analisi delle prestazioni dai test falliti verrebbe esclusa.

#### __recentDays__

Il valore predefinito è `0` (nessun limite). Per impostare il numero di giorni da considerare per l'analisi delle prestazioni, imposta il numero di giorni. Sono supportati anche giorni parziali (es. `recentDays: 0.5`)

#### __performanceResultsDirectory__

Puoi sovrascrivere il percorso predefinito per la directory dei risultati nella directory principale del progetto.
Per esempio:

```typescript
...
performanceResultsDirectory: "results-dir/performance-total-results"
...
```

#### __analyzeByBrowser__

Il valore predefinito è `false`. Se `true`, i dati sulle prestazioni verrebbero analizzati anche in base al tipo di browser.


### Utilizzo nel test

Basta importare __performancetotal__ dove ne hai bisogno, che sia nel tuo file di test o in qualsiasi altra classe. Questo oggetto fornisce metodi per misurare i dati sulle prestazioni nei tuoi test, inclusi sampleStart e sampleEnd per avviare e terminare le misurazioni delle prestazioni.
Ecco un esempio di come potresti utilizzare l'oggetto performancetotal per misurare le prestazioni di avvio di due siti web:

```typescript
// Questo caso di test misura le prestazioni di avvio di Github e SourceForge utilizzando l'oggetto performancetotal.

import { performancetotal } from "wdio-performancetotal-service";

it("should test github and sourceforge startup performance", () => {
    // Avvia una nuova misurazione delle prestazioni per Github
    performancetotal.sampleStart("GH-Startup");

    // Naviga su Github
    browser.url("https://github.com/");

    // Termina la misurazione di Github e salva i risultati
    performancetotal.sampleEnd("GH-Startup");

    // ...

    // Avvia una nuova misurazione delle prestazioni per SourceForge
    performancetotal.sampleStart("SF-Startup");

    // Naviga su SourceForge
    await browser.url("https://sourceforge.net/");

    // Termina la misurazione di SourceForge e salva i risultati
    performancetotal.sampleEnd("SF-Startup");
});

```

Puoi recuperare il tempo impiegato per un singolo campione di prestazioni chiamando performancetotal.getSampleTime(sampleName) nel tuo test. Questo ti consente di verificare le prestazioni di una sezione specifica di codice e assicurarti che soddisfi le tue aspettative.

```typescript
// Ottieni il tempo impiegato per un singolo campione
const sampleTime = performancetotal.getSampleTime(sampleName);

```

## Ottenere i risultati

Quando tutti i test sono completati, viene creata una nuova directory dei risultati nella cartella principale del progetto (il nome della directory predefinita è performance-results). All'interno di questa directory vengono creati due file: performance-results.json e performance-results.csv. Questi file contengono dati analizzati per ogni campione, inclusi il tempo medio, l'errore standard della media (SEM), il numero di campioni, il valore minimo, il valore massimo, l'ora più antica e l'ora più recente. Puoi utilizzare questi dati per identificare eventuali regressioni o miglioramenti delle prestazioni nel tempo.

### Analisi dei dati sulle prestazioni in blocco

Per analizzare i dati sulle prestazioni esistenti in blocco senza generare nuovi test, si consiglia di utilizzare lo strumento [__performancetotal-cli__](https://www.npmjs.com/package/performancetotal-cli).

## Supporto Typescript

Il Typescript è supportato per questo plugin.

## Supporto

Per supporto e suggerimenti, non esitare a contattarmi all'indirizzo [tzur.paldi@outlook.com](https://github.com/tzurp/performance-total/blob/master/mailto:tzur.paldi@outlook.com).