---
id: file-download
title: Download di File
---

Quando si automatizzano i download di file nei test web, è essenziale gestirli in modo coerente su diversi browser per garantire un'esecuzione affidabile dei test.

Qui, forniamo le migliori pratiche per i download di file e dimostriamo come configurare le directory di download per **Google Chrome**, **Mozilla Firefox** e **Microsoft Edge**.

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

Non implementare adeguate strategie di attesa può portare a condizioni di gara o test inaffidabili, soprattutto per il completamento del download. Implementare strategie di attesa **esplicite** per attendere il completamento dei download dei file, garantendo la sincronizzazione tra i passaggi del test.

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

## Configurazione dei Download del Browser Chromium

Per modificare il percorso di download per i browser __basati su Chromium__ (come Chrome, Edge, Brave, ecc.) utilizzando il metodo `getPuppeteer` di WebDriverIO per accedere a Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Iniziare una sessione CDP:
const cdpSession = await page.target().createCDPSession();
// Impostare il percorso di download:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Gestione di Download Multipli di File

Quando si tratta di scenari che coinvolgono download multipli di file, è essenziale implementare strategie per gestire e validare efficacemente ciascun download. Considerare i seguenti approcci:

__Gestione Sequenziale dei Download:__ Scaricare i file uno per uno e verificare ogni download prima di avviare il successivo per garantire un'esecuzione ordinata e una validazione accurata.

__Gestione Parallela dei Download:__ Utilizzare tecniche di programmazione asincrona per avviare simultaneamente più download di file, ottimizzando il tempo di esecuzione dei test. Implementare meccanismi di validazione robusti per verificare tutti i download al termine.

## Considerazioni sulla Compatibilità Cross-Browser

Mentre WebDriverIO fornisce un'interfaccia unificata per l'automazione del browser, è essenziale tenere conto delle variazioni nel comportamento e nelle capacità del browser. Considera di testare la tua funzionalità di download di file su diversi browser per garantire compatibilità e coerenza.

__Configurazioni Specifiche per Browser:__ Regolare le impostazioni del percorso di download e le strategie di attesa per adattarsi alle differenze nel comportamento e nelle preferenze del browser tra Chrome, Firefox, Edge e altri browser supportati.

__Compatibilità con le Versioni del Browser:__ Aggiornare regolarmente WebDriverIO e le versioni del browser per sfruttare le ultime funzionalità e miglioramenti, garantendo al contempo la compatibilità con la tua suite di test esistente.