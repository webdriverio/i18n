---
id: file-download
title: Download di file
description: "Configura le directory di download per Chrome, Firefox ed Edge, attendi il completamento dei download e verifica i file scaricati su tutti i browser."
---

Quando si automatizzano i download di file nei test web, è essenziale gestirli in modo coerente tra i diversi browser per garantire un'esecuzione affidabile dei test.

Qui forniamo le best practice per i download di file e mostriamo come configurare le directory di download per **Google Chrome**, **Mozilla Firefox** e **Microsoft Edge**.

## Percorsi di download

L'**hardcoding** dei percorsi di download negli script di test può causare problemi di manutenzione e di portabilità. Utilizza **percorsi relativi** per le directory di download per garantire portabilità e compatibilità tra ambienti diversi.

```javascript
// 👎
// Percorso di download hardcoded
const downloadPath = '/path/to/downloads';

// 👍
// Percorso di download relativo
const downloadPath = path.join(__dirname, 'downloads');
```

## Strategie di attesa

Non implementare strategie di attesa adeguate può portare a race condition o a test inaffidabili, specialmente per quanto riguarda il completamento dei download. Implementa strategie di attesa **esplicite** per attendere il completamento dei download dei file, garantendo la sincronizzazione tra i passaggi del test.

```javascript
// 👎
// Nessuna attesa esplicita per il completamento del download
await browser.pause(5000);

// 👍
// Attendi il completamento del download del file
await waitUntil(async ()=> await fs.existsSync(downloadPath), 5000);
```

## Configurazione delle directory di download

Per sovrascrivere il comportamento di download dei file per **Google Chrome**, **Mozilla Firefox** e **Microsoft Edge**, specifica la directory di download nelle capabilities di WebDriverIO:

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

Per un esempio di implementazione, consulta la [WebdriverIO Test Download Behavior Recipe](https://github.com/webdriverio/example-recipes/tree/main/testDownloadBehavior).

## Configurazione dei download per i browser Chromium

Per modificare il percorso di download per i browser __basati su Chromium__ (come Chrome, Edge, Brave, ecc.) si può utilizzare il metodo `getPuppeteer` di WebDriverIO per accedere ai Chrome DevTools.

```javascript
const page = await browser.getPuppeteer();
// Avvia una sessione CDP:
const cdpSession = await page.target().createCDPSession();
// Imposta il percorso di download:
await cdpSession.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: downloadPath });
```

## Gestione di download multipli

Quando si affrontano scenari che prevedono il download di più file, è essenziale implementare strategie per gestire e validare efficacemente ogni download. Considera i seguenti approcci:

__Gestione sequenziale dei download:__ Scarica i file uno alla volta e verifica ogni download prima di avviare il successivo, per garantire un'esecuzione ordinata e una validazione accurata.

__Gestione parallela dei download:__ Utilizza tecniche di programmazione asincrona per avviare più download di file contemporaneamente, ottimizzando i tempi di esecuzione dei test. Implementa meccanismi di validazione robusti per verificare tutti i download al loro completamento.

## Considerazioni sulla compatibilità cross-browser

Sebbene WebDriverIO fornisca un'interfaccia unificata per l'automazione dei browser, è essenziale tenere conto delle differenze nel comportamento e nelle capacità dei browser. Valuta di testare la funzionalità di download dei file su diversi browser per garantirne compatibilità e coerenza.

__Configurazioni specifiche per browser:__ Adatta le impostazioni del percorso di download e le strategie di attesa per tenere conto delle differenze di comportamento e preferenze tra Chrome, Firefox, Edge e gli altri browser supportati.

__Compatibilità delle versioni dei browser:__ Aggiorna regolarmente le versioni di WebDriverIO e dei browser per sfruttare le funzionalità e i miglioramenti più recenti, garantendo al contempo la compatibilità con la tua suite di test esistente.