---
id: visual-reporter
title: Visual Reporter
description: "Genera e consulta il Visual Reporter per esaminare le differenze dei test visivi a partire dall'output JSON di @wdio/visual-service, in locale o in CI."
---

Il Visual Reporter è una nuova funzionalità introdotta in `@wdio/visual-service`, a partire dalla versione [v5.2.0](https://github.com/webdriverio/visual-testing/releases/tag/%40wdio%2Fvisual-service%405.2.0). Questo reporter consente agli utenti di visualizzare i report JSON delle differenze generati dal servizio di Visual Testing e di trasformarli in un formato leggibile. Aiuta i team ad analizzare e gestire meglio i risultati dei test visivi, fornendo un'interfaccia grafica per esaminare l'output.

Per utilizzare questa funzionalità, assicurati di avere la configurazione necessaria per generare il file `output.json`. Questo documento ti guiderà nella configurazione, nell'esecuzione e nella comprensione del Visual Reporter.

# Prerequisiti

Prima di utilizzare il Visual Reporter, assicurati di aver configurato il servizio di Visual Testing per generare i file di report JSON:

```ts
export const config = {
    // ...
    services: [
        [
            "visual",
            {
                createJsonReportFiles: true, // Generates the output.json file
            },
        ],
    ],
};
```

Per istruzioni di configurazione più dettagliate, fai riferimento alla [Documentazione del Visual Testing](./) di WebdriverIO o all'opzione [`createJsonReportFiles`](./service-options.md#createjsonreportfiles-new)

# Installazione

Per installare il Visual Reporter, aggiungilo come dipendenza di sviluppo al tuo progetto utilizzando npm:

```bash
npm install @wdio/visual-reporter --save-dev
```

In questo modo avrai a disposizione i file necessari per generare i report dai tuoi test visivi.

# Utilizzo

## Creazione del Visual Report

Dopo aver eseguito i tuoi test visivi e aver generato il file `output.json`, puoi creare il report visivo utilizzando la CLI oppure i prompt interattivi.

### Utilizzo della CLI

Puoi utilizzare il comando CLI per generare il report eseguendo:

```bash
npx wdio-visual-reporter --jsonOutput=<path-to-output.json> --reportFolder=<path-to-store-report> --logLevel=debug
```

#### Opzioni obbligatorie:

-   `--jsonOutput`: il percorso relativo al file `output.json` generato dal servizio di Visual Testing. Questo percorso è relativo alla directory da cui esegui il comando.
-   `--reportFolder`: la directory relativa in cui verrà salvato il report generato. Anche questo percorso è relativo alla directory da cui esegui il comando.

#### Opzioni facoltative:

-   `--logLevel`: impostalo su `debug` per ottenere un logging dettagliato, particolarmente utile per la risoluzione dei problemi.

#### Esempio

```bash
npx wdio-visual-reporter --jsonOutput=/path/to/output.json --reportFolder=/path/to/report --logLevel=debug
```

Questo genererà il report nella cartella specificata e fornirà un riscontro nella console. Ad esempio:

```bash
✔ Build output copied successfully to "/path/to/report".
⠋ Prepare report assets...
✔ Successfully generated the report assets.
```

#### Visualizzazione del report

:::warning
Aprire `path/to/report/index.html` direttamente in un browser **senza servirlo da un server locale** **NON** funzionerà.
:::

Per visualizzare il report, devi utilizzare un semplice server come [sirv-cli](https://www.npmjs.com/package/sirv-cli). Puoi avviare il server con il seguente comando:

```bash
npx sirv-cli /path/to/report --single
```

Questo produrrà dei log simili all'esempio seguente. Tieni presente che il numero di porta può variare:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Ora puoi visualizzare il report aprendo l'URL indicato nel tuo browser.

### Utilizzo dei prompt interattivi

In alternativa, puoi eseguire il seguente comando e rispondere ai prompt per generare il report:

```bash
npx @wdio/visual-reporter
```

I prompt ti guideranno nell'inserimento dei percorsi e delle opzioni richiesti. Alla fine, il prompt interattivo ti chiederà anche se desideri avviare un server per visualizzare il report. Se scegli di avviare il server, lo strumento avvierà un semplice server e mostrerà un URL nei log. Puoi aprire questo URL nel tuo browser per visualizzare il report.

![Visual Reporter CLI](/img/visual/cli-screen-recording.gif)

![Visual Reporter](/img/visual/visual-reporter.gif)

#### Visualizzazione del report

:::warning
Aprire `path/to/report/index.html` direttamente in un browser **senza servirlo da un server locale** **NON** funzionerà.
:::

Se hai scelto di **non** avviare il server tramite il prompt interattivo, puoi comunque visualizzare il report eseguendo manualmente il seguente comando:

```bash
npx sirv-cli /path/to/report --single
```

Questo produrrà dei log simili all'esempio seguente. Tieni presente che il numero di porta può variare:

```logs
  Your application is ready~! 🚀

  - Local:      http://localhost:8080
  - Network:    Add `--host` to expose

────────────────── LOGS ──────────────────
```

Ora puoi visualizzare il report aprendo l'URL indicato nel tuo browser.

# Demo del report

Per vedere un esempio di come appare il report, visita la nostra [demo su GitHub Pages](https://webdriverio.github.io/visual-testing/).

# Comprendere il Visual Report

Il Visual Reporter offre una vista organizzata dei risultati dei tuoi test visivi. Per ogni esecuzione dei test potrai:

-   Navigare facilmente tra i casi di test e vedere i risultati aggregati.
-   Esaminare metadati come i nomi dei test, i browser utilizzati e i risultati dei confronti.
-   Visualizzare le immagini delle differenze che mostrano dove sono state rilevate differenze visive.

Questa rappresentazione visiva semplifica l'analisi dei risultati dei test, rendendo più facile individuare e risolvere le regressioni visive.

# Integrazioni CI

Stiamo lavorando per supportare diversi strumenti di CI come Jenkins, GitHub Actions e così via. Se desideri aiutarci, contattaci su [Discord - Visual Testing](https://discord.com/channels/1097401827202445382/1186908940286574642).