---
id: visual-reporter
title: Reporter Visuale
---

Il Reporter Visuale è una nuova funzionalità introdotta nel `@wdio/visual-service`, a partire dalla versione [v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0). Questo reporter consente agli utenti di visualizzare i report diff JSON generati dal servizio di Visual Testing e trasformarli in un formato leggibile dall'uomo. Aiuta i team ad analizzare e gestire meglio i risultati dei test visivi fornendo un'interfaccia grafica per esaminare l'output.

Per utilizzare questa funzionalità, assicurati di avere la configurazione necessaria per generare il file `output.json` richiesto. Questo documento ti guiderà attraverso la configurazione, l'esecuzione e la comprensione del Reporter Visuale.

# Prerequisiti

Prima di utilizzare il Reporter Visuale, assicurati di aver configurato il servizio di Visual Testing per generare file di report JSON:

```ts
export const config = {
    // ...
    services: [
        [
            "visual",
            {
                createJsonReportFiles: true, // Genera il file output.json
            },
        ],
    ],
};
```

Per istruzioni di configurazione più dettagliate, consulta la [Documentazione di Visual Testing](./) di WebdriverIO o il [`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)

# Installazione

Per installare il Reporter Visuale, aggiungilo come dipendenza di sviluppo al tuo progetto usando npm:

```bash
npm install @wdio/visual-reporter --save-dev
```

Questo garantirà che i file necessari siano disponibili per generare report dai tuoi test visivi.

# Utilizzo

## Creazione del Report Visuale

Una volta eseguiti i test visivi e generato il file `output.json`, puoi creare il report visuale utilizzando la CLI o i prompt interattivi.

### Utilizzo CLI

Puoi utilizzare il comando CLI per generare il report eseguendo:

```bash
npx wdio-visual-reporter --jsonOutput=<path-to-output.json> --reportFolder=<path-to-store-report> --logLevel=debug
```

#### Opzioni richieste:

-   `--jsonOutput`: Il percorso relativo al file `output.json` generato dal servizio di Visual Testing. Questo percorso è relativo alla directory da cui esegui il comando.
-   `--reportFolder`: La directory relativa in cui verrà memorizzato il report generato. Anche questo percorso è relativo alla directory da cui esegui il comando.

#### Opzioni facoltative:

-   `--logLevel`: Imposta su `debug` per ottenere log dettagliati, particolarmente utili per la risoluzione dei problemi.

#### Esempio

```bash
npx wdio-visual-reporter --jsonOutput=/path/to/output.json --reportFolder=/path/to/report --logLevel=debug
```

Questo genererà il report nella cartella specificata e fornirà feedback nella console. Per esempio:

```bash
✔ Build output copied successfully to "/path/to/report".
⠋ Prepare report assets...
✔ Successfully generated the report assets.
```

#### Visualizzazione del Report

:::warning
Aprire `path/to/report/index.html` direttamente in un browser **senza servirlo da un server locale** **NON** funzionerà.
:::

Per visualizzare il report, è necessario utilizzare un server semplice come [sirv-cli](https://www.npmjs.com/package/sirv-cli). Puoi avviare il server con il seguente comando:

```bash
npx sirv-cli /path/to/report --single
```

Questo produrrà log simili all'esempio seguente. Nota che il numero di porta potrebbe variare:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Ora puoi visualizzare il report aprendo l'URL fornito nel tuo browser.

### Utilizzo dei Prompt Interattivi

In alternativa, puoi eseguire il seguente comando e rispondere ai prompt per generare il report:

```bash
npx @wdio/visual-reporter
```

I prompt ti guideranno nel fornire i percorsi e le opzioni richieste. Alla fine, il prompt interattivo ti chiederà anche se vuoi avviare un server per visualizzare il report. Se scegli di avviare il server, lo strumento lancerà un server semplice e mostrerà un URL nei log. Puoi aprire questo URL nel tuo browser per visualizzare il report.

![Visual Reporter CLI](/img/visual/cli-screen-recording.gif)

![Visual Reporter](/img/visual/visual-reporter.gif)

#### Visualizzazione del Report

:::warning
Aprire `path/to/report/index.html` direttamente in un browser **senza servirlo da un server locale** **NON** funzionerà.
:::

Se hai scelto di **non** avviare il server tramite il prompt interattivo, puoi comunque visualizzare il report eseguendo manualmente il seguente comando:

```bash
npx sirv-cli /path/to/report --single
```

Questo produrrà log simili all'esempio seguente. Nota che il numero di porta potrebbe variare:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Ora puoi visualizzare il report aprendo l'URL fornito nel tuo browser.

# Demo del Report

Per vedere un esempio di come appare il report, visita la nostra [demo su GitHub Pages](https://webdriverio.github.io/visual-testing/).

# Comprensione del Report Visuale

Il Reporter Visuale fornisce una visualizzazione organizzata dei risultati dei tuoi test visivi. Per ogni esecuzione di test, sarai in grado di:

-   Navigare facilmente tra i casi di test e vedere i risultati aggregati.
-   Rivedere i metadati come i nomi dei test, i browser utilizzati e i risultati del confronto.
-   Visualizzare le immagini diff che mostrano dove sono state rilevate le differenze visive.

Questa rappresentazione visiva semplifica l'analisi dei risultati dei test, rendendo più facile identificare e affrontare le regressioni visive.

# Integrazioni CI

Stiamo lavorando per supportare diversi strumenti CI come Jenkins, GitHub Actions e così via. Se vuoi aiutarci, contattaci su [Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642).