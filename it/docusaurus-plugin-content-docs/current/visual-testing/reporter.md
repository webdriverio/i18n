---
id: visual-reporter
title: Reporter Visivo
---

Il Reporter Visivo è una nuova funzionalità introdotta nel `@wdio/visual-service`, a partire dalla versione [v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0). Questo reporter consente agli utenti di visualizzare i report di confronto JSON generati dal servizio di Visual Testing e trasformarli in un formato comprensibile. Aiuta i team ad analizzare e gestire meglio i risultati dei test visivi fornendo un'interfaccia grafica per esaminare l'output.

Per utilizzare questa funzionalità, assicurati di avere la configurazione necessaria per generare il file `output.json`. Questo documento ti guiderà attraverso la configurazione, l'esecuzione e la comprensione del Reporter Visivo.

# Prerequisiti

Prima di utilizzare il Reporter Visivo, assicurati di aver configurato il servizio di Visual Testing per generare file di report JSON:

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

Per istruzioni di configurazione più dettagliate, consulta la [Documentazione di Visual Testing](./) di WebdriverIO o [`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)

# Installazione

Per installare il Reporter Visivo, aggiungilo come dipendenza di sviluppo al tuo progetto utilizzando npm:

```bash
npm install @wdio/visual-reporter --save-dev
```

Questo garantirà che i file necessari siano disponibili per generare report dai tuoi test visivi.

# Utilizzo

## Costruzione del Report Visivo

Dopo aver eseguito i tuoi test visivi e generato il file `output.json`, puoi costruire il report visivo utilizzando la CLI o i prompt interattivi.

### Utilizzo della CLI

Puoi utilizzare il comando CLI per generare il report eseguendo:

```bash
npx wdio-visual-reporter --jsonOutput=<percorso-di-output.json> --reportFolder=<percorso-per-salvare-report> --logLevel=debug
```

#### Opzioni richieste:

-   `--jsonOutput`: Il percorso relativo al file `output.json` generato dal servizio di Visual Testing. Questo percorso è relativo alla directory da cui esegui il comando.
-   `--reportFolder`: La directory relativa dove verrà memorizzato il report generato. Questo percorso è anche relativo alla directory da cui esegui il comando.

#### Opzioni facoltative:

-   `--logLevel`: Imposta su `debug` per ottenere un logging dettagliato, particolarmente utile per la risoluzione dei problemi.

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

Per visualizzare il report, è necessario utilizzare un semplice server come [sirv-cli](https://www.npmjs.com/package/sirv-cli). Puoi avviare il server con il seguente comando:

```bash
npx sirv-cli /path/to/report --single
```

Questo produrrà log simili all'esempio seguente. Nota che il numero di porta può variare:

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

I prompt ti guideranno nella fornitura dei percorsi e delle opzioni richieste. Alla fine, il prompt interattivo ti chiederà anche se desideri avviare un server per visualizzare il report. Se scegli di avviare il server, lo strumento lancerà un semplice server e visualizzerà un URL nei log. Puoi aprire questo URL nel tuo browser per visualizzare il report.

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

Questo produrrà log simili all'esempio seguente. Nota che il numero di porta può variare:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Ora puoi visualizzare il report aprendo l'URL fornito nel tuo browser.

# Demo del Report

Per vedere un esempio di come appare il report, visita la nostra [demo su GitHub Pages](https://webdriverio.github.io/visual-testing/).

# Comprendere il Report Visivo

Il Reporter Visivo fornisce una visualizzazione organizzata dei risultati dei tuoi test visivi. Per ogni esecuzione di test, sarai in grado di:

-   Navigare facilmente tra i casi di test e vedere i risultati aggregati.
-   Esaminare i metadati come i nomi dei test, i browser utilizzati e i risultati del confronto.
-   Visualizzare le immagini di differenza che mostrano dove sono state rilevate differenze visive.

Questa rappresentazione visiva semplifica l'analisi dei risultati dei test, rendendo più facile identificare e affrontare le regressioni visive.

# Integrazioni CI

Stiamo lavorando per supportare diversi strumenti CI come Jenkins, GitHub Actions e così via. Se vuoi aiutarci, contattaci su [Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642).