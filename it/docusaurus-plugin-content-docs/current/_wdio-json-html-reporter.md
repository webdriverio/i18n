---
id: wdio-json-html-reporter
title: Reporter JSON HTML Reporter
custom_edit_url: https://github.com/aswinchembath/wdio-json-html-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-json-html-reporter è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/aswinchembath/wdio-json-html-reporter) | [npm](https://www.npmjs.com/package/wdio-json-html-reporter)

Questo è un reporter personalizzato per WebDriverIO che genera report JSON dettagliati durante l'esecuzione dei test e fornisce un generatore di report HTML portatile per visualizzare i risultati dei test. Registra timestamp, metadati di esecuzione e può acquisire screenshot su richiesta. Il pacchetto segue la convenzione WebDriverIO per i reporter ed è pubblicato come pacchetto npm con il nome `wdio-json-html-reporter`.

## Indice

- [Panoramica](#overview)
- [Caratteristiche](#features)
- [Installazione](#installation)
  - [1. Installare il pacchetto](#1-install-the-package)
  - [2. Verificare l'installazione](#2-verify-installation)
  - [3. Aggiornare la configurazione WebDriverIO](#3-update-webdriverio-configuration)
  - [4. Eseguire i test](#4-run-your-tests)
- [Utilizzo CLI](#cli-usage)
- [Opzione cronologia e generazione della cronologia aggregata](#history-option-and-aggregated-history-generation)
- [Screenshot](#screenshots)

## Overview

WDIO JSON HTML REPORTER fornisce due componenti principali:

- **JSONReporter**: Un reporter personalizzato che estende l'interfaccia del reporter WebDriverIO per raccogliere eventi di test e generare un file JSON con metadati, risultati dei test e (opzionalmente) screenshot.
- **HTMLReportGenerator**: Un'utilità per convertire più file di report JSON in un report HTML completo con grafici interattivi, filtri e funzionalità di esportazione. Inoltre, il generatore di report ora supporta un file di cronologia opzionale per visualizzare i dati di esecuzione storici, se disponibili. Quando non vengono forniti dati storici, il report omette la sezione storica e mostra solo gli errori unici.

Questi strumenti ti aiutano a ottenere informazioni chiare sulle tue esecuzioni di test, essenziali per il debug e l'integrazione continua.

## Features

- **Report JSON**: Report dettagliato con timestamp, nomi delle suite, risultati dei test, errori e screenshot opzionali.
- **Report HTML**: Converte i report JSON in un report HTML portatile con dashboard, grafici, report dettagliato dei test e capacità di filtraggio.
- **Esportazione in Excel**: Il report dettagliato dei test può essere esportato in un file Excel.
- **Supporto per Screenshot**: Acquisizione di screenshot per i test falliti (o tutti i test) in base alla configurazione.
- **Metadati di esecuzione**: Registra informazioni sul browser, orari di inizio/fine dell'esecuzione e durata complessiva.
- **Esecuzione storica (opzionale)**: Fornire un file JSON di cronologia per includere dati di esecuzione storici per suite. Se non vengono forniti dati storici, il report nasconderà automaticamente questa sezione e mostrerà solo gli errori unici.
- **Generazione della cronologia aggregata**: Il reporter JSON include ora una funzione di generazione della cronologia aggregata. Utilizzando il metodo statico `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`, puoi automaticamente scansionare tutti i file di report JSON (corrispondenti al pattern `test-report-*.json`) nella directory dei report, aggregare i risultati dei test e calcolare i confronti dei difetti basati sui dati storici. Il record di cronologia aggregato viene quindi aggiunto al file di cronologia e può essere utilizzato dal generatore di report HTML per visualizzare le tendenze nel tempo.

## Installation

Per installare il pacchetto `wdio-json-html-reporter`, segui questi passaggi:

### 1. Install the package

Esegui il seguente comando per installare il pacchetto come dipendenza di sviluppo:

```bash
npm install --save-dev wdio-json-html-reporter
```

### 2. Verify installation

Assicurati che il pacchetto sia stato installato correttamente eseguendo:

```bash
npm list wdio-json-html-reporter
```

Se installato correttamente, dovresti vedere un output simile a:

```bash
wdio-json-html-reporter@x.x.x
```

### 3. Update WebDriverIO Configuration

Modifica il tuo file `wdio.conf.js` o `wdio.conf.ts` per includere il reporter personalizzato:

```javascript
import { JSONReporter, HTMLReportGenerator } from 'wdio-json-html-reporter';

export const config = {
  reporters: [
    [JSONReporter, { outputFile: './reports/test-results.json', screenshotOption: 'OnFailure' }],  // Options: "No", "OnFailure", "Full"
  ],
  onComplete: async function() {
    const outputFilePath = './reports/test-report.html';
    const jsonFolder = './reports'; // Directory where JSON reports are saved

    // If you want to include historical data, specify the history JSON file path here.
    const historyFile = './reports/history.json'; // Optional

    // Optionally, generate aggregated history data before generating the HTML report.
    // JSONReporter.generateAggregateHistory({ reportPaths: jsonFolder, historyPath: historyFile });

    const reportGenerator = new HTMLReportGenerator(outputFilePath, historyFile);
    await reportGenerator.convertJSONFolderToHTML(jsonFolder);
  }
};
```

### 4. Run Your Tests

Esegui la tua suite di test WebDriverIO:

```bash
npx wdio run wdio.conf.js
```

## CLI Usage

Oltre all'integrazione con WebDriverIO, puoi eseguire il generatore di report HTML direttamente dalla riga di comando utilizzando la CLI integrata.

**Utilizzo:**

```bash
generate-html <inputFolder> <outputFile> [historyFile]
```

Ad esempio, se hai i tuoi file JSON in una cartella chiamata `test/reports/json-reports` e vuoi generare un report HTML chiamato `test/reports/report.html`, puoi eseguire:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html
```

Se hai anche un file di cronologia (ad es., `test/reports/history.json`), includilo come quarto parametro opzionale:

```bash
npx wdio-json-html-reporter generate-html test/reports/json-reports test/reports/report.html test/reports/history.json
```

**Nota:**  
La funzionalità CLI viene attivata solo quando passi il comando `generate-html` come primo parametro. Quando esegui tramite WebDriverIO (ad es., con `wdio run wdio.conf.js`), la logica CLI viene bypassata.

## History Option and Aggregated History Generation

Il generatore di report HTML ora supporta un'**opzione cronologia**. Questo ti permette di fornire un file JSON contenente dati di esecuzione storici che vengono uniti al report nella sezione "Historical Execution by Suite". Se il file di cronologia viene fornito e contiene dati validi, il report mostrerà tendenze storiche insieme a grafici interattivi e un accordion per ogni suite. Se non viene passato alcun file di cronologia o se il file non contiene dati di suite, il report nasconderà automaticamente la sezione storica e mostrerà solo la panoramica degli errori unici.

Inoltre, il reporter JSON include ora una funzione di **generazione della cronologia aggregata**. Con il metodo statico `JSONReporter.generateAggregateHistory({ reportPaths, historyPath, maxHistory })`, puoi automaticamente scansionare tutti i file di report JSON (corrispondenti al pattern `test-report-*.json`) nella directory dei report, aggregare i risultati dei test (sommando i conteggi dei test e unendo i dati delle suite) e calcolare i confronti dei difetti comparandoli con l'ultimo record aggregato. Il record di cronologia appena generato viene quindi aggiunto al file di cronologia specificato. Questi dati di cronologia aggregati possono essere successivamente utilizzati dal generatore di report HTML per fornire informazioni sull'esecuzione storica su più esecuzioni di test.

## Screenshots

### Dashboard  
![Dashboard](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/dashboard.png)

### Test Results  
![Test Results](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/testdetails.png)

### Screenshots  
![Screenshots](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/screesnshots.png)

### Filters  
![Filters](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/filters.png)

### Excel Export  
![Excel Export](https://github.com/aswinchembath/wdio-json-html-reporter/blob/main/lib/assets/exportedfile.png)