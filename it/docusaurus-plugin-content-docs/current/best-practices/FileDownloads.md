---
id: file-download
title: Download di File
---

Quando si automatizzano i download di file nei test web, è essenziale gestirli in modo coerente tra i diversi browser per garantire un'esecuzione affidabile dei test.

Qui, forniamo le migliori pratiche per il download di file e dimostriamo come configurare le directory di download per **Google Chrome**, **Mozilla Firefox** e **Microsoft Edge**.

## Percorsi di Download

**Hardcoding** dei percorsi di download negli script di test può portare a problemi di manutenzione e portabilità. Utilizzare **percorsi relativi** per le directory di download per garantire la portabilità e la compatibilità tra diversi ambienti.

```javascript
// 👎
// Percorso di download hardcoded
const downloadPath = '/path/to/downloads';

// 👍
// Percorso di download relativo
const downloadPath = path.join(__dirname, 'downloads');
```

## Strategie di Attesa

Non implementare strategie di attesa adeguate può portare a condizioni di gara o test inaffidabili, specialmente per il completamento del download. Implementa strategie di attesa **esplicite** per attendere il completamento dei download dei file, garantendo la sincronizzazione tra i passaggi del test.

```javascript
// 👎
// Nessuna attesa esplicita per il completamento del download
await browser.pause(5000);

// 👍
// Attesa per il completamento del download del file
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Configurazione delle Directory di Download

Per sovrascrivere il comportamento di download dei file per **Google Chrome**, **Mozilla Firefox** e **Microsoft Edge**, fornire la directory di download nelle capabilities di WebDriverIO:

<Tabs
defaultValue="chrome"
values={[
{label: 'Chrome', value: 'chrome'},
{label: 'Firefox', value: 'firefox'},
{label: 'Microsoft Edge', value: 'edge'},
]
}>

<TabItem value='chrome'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L8-L16

```

</TabItem>

<TabItem value='firefox'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L20-L32

```

</TabItem>

<TabItem value='edge'>

```javascript reference title="wdio.conf.js"

https://github.com/webdriverio/example-recipes/blob/84dda93011234d0b2a34ee0cfb3cdfa2a06136a5/testDownloadBehavior/wdio.conf.js#L36-L44

```

</TabItem>

</Tabs>

Per un esempio di implementazione, fare riferimento alla [WebdriverIO Test Download Behavior Recipe](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Configurazione dei Download per Browser Chromium

Per modificare il percorso di download per i browser __basati su Chromium__ (come Chrome, Edge, Brave, ecc.) utilizzando il metodo `getPuppeteer` di WebDriverIO per accedere a Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Inizia una sessione CDP:
const cdpSession = await page.target().createCDPSession();
// Imposta il Percorso di Download:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Gestione di Download Multipli di File

Quando si affrontano scenari che coinvolgono download multipli di file, è essenziale implementare strategie per gestire e convalidare efficacemente ogni download. Considera i seguenti approcci:

__Gestione Sequenziale dei Download:__ Scarica i file uno per uno e verifica ogni download prima di avviare il successivo per garantire un'esecuzione ordinata e una convalida accurata.

__Gestione Parallela dei Download:__ Utilizza tecniche di programmazione asincrona per avviare più download di file contemporaneamente, ottimizzando il tempo di esecuzione del test. Implementa meccanismi di convalida robusti per verificare tutti i download al completamento.

## Considerazioni sulla Compatibilità Cross-Browser

Mentre WebDriverIO fornisce un'interfaccia unificata per l'automazione del browser, è essenziale tenere conto delle variazioni nel comportamento e nelle capacità del browser. Considera di testare la tua funzionalità di download di file su diversi browser per garantire compatibilità e coerenza.

__Configurazioni Specifiche per Browser:__ Regola le impostazioni del percorso di download e le strategie di attesa per adattarsi alle differenze nel comportamento e nelle preferenze del browser tra Chrome, Firefox, Edge e altri browser supportati.

__Compatibilità con la Versione del Browser:__ Aggiorna regolarmente le tue versioni di WebDriverIO e del browser per sfruttare le ultime funzionalità e miglioramenti, garantendo al contempo la compatibilità con la tua suite di test esistente.