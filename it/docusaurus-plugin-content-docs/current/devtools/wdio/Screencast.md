---
id: screencast
title: Screencast della sessione
description: "Registra le sessioni del browser come video .webm con lo screencast di DevTools, configura le opzioni di acquisizione e trova i file di output."
---

Registra le sessioni del browser come video `.webm`. I video vengono visualizzati nell'interfaccia di DevTools insieme alle viste degli snapshot e delle mutazioni del DOM.

Disponibile in tutti e tre gli adapter - **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** e **[Nightwatch.js](/docs/devtools/nightwatch#screencast)**. La modalità di acquisizione varia a seconda del framework (push CDP dove possibile, polling negli altri casi - vedi [Supporto dei browser](#browser-support) più sotto).

## Demo

![Screencast Demo](/img/devtools/screencast.gif)

## Configurazione iniziale

La codifica dello screencast richiede il binario **ffmpeg** nel `PATH`. Il wrapper `fluent-ffmpeg` viene installato insieme all'adapter, quindi non c'è nient'altro da aggiungere:

```sh
# Installa ffmpeg - https://ffmpeg.org/download.html
brew install ffmpeg        # macOS
sudo apt install ffmpeg    # Ubuntu/Debian
```

Senza ffmpeg il registratore funziona comunque, ma la fase di codifica registra un avviso nei log e non scrive alcun file.

## Configurazione

```ts
services: [
  [
    'devtools',
    {
      screencast: {
        enabled: true,
        captureFormat: 'jpeg',
        quality: 70,
        maxWidth: 1280,
        maxHeight: 720,
      }
    }
  ]
]
```

## Opzioni

| Opzione | Tipo | Predefinito | Descrizione |
|---|---|---|---|
| `enabled` | `boolean` | `false` | Abilita la registrazione della sessione |
| `captureFormat` | `'jpeg' \| 'png'` | `'jpeg'` | Formato immagine dei frame. **Solo Chrome/Chromium** - controlla il formato che Chrome invia tramite CDP. Ignorato in modalità polling (Firefox, Safari), dove gli screenshot sono sempre PNG. Non influisce sul container del video di output, che è sempre `.webm` |
| `quality` | `number` | `70` | Qualità di compressione JPEG 0-100. Si applica solo in modalità CDP di Chrome/Chromium con `captureFormat: 'jpeg'` |
| `maxWidth` | `number` | `1280` | Larghezza massima del frame in pixel. **Solo Chrome/Chromium** - Chrome ridimensiona i frame prima di inviarli tramite CDP. Ignorato in modalità polling |
| `maxHeight` | `number` | `720` | Altezza massima del frame in pixel. **Solo Chrome/Chromium** - come sopra |
| `pollIntervalMs` | `number` | `200` | Intervallo tra gli screenshot in millisecondi per i browser diversi da Chrome (modalità polling). Valori più bassi = video più fluido ma più round-trip WebDriver durante l'esecuzione dei test |
| `maxBufferFrames` | `number` | `2000` | Limite di frame mantenuti in memoria. Oltre questo limite il buffer viene sfoltito sul posto, mantenendo il primo e l'ultimo frame |

## Supporto dei browser

La registrazione funziona su tutti i principali browser grazie alla selezione automatica della modalità:

| Browser | Modalità | Note |
|---|---|---|
| Chrome / Chromium / Edge | **CDP push** | Chrome invia i frame tramite il DevTools Protocol. Efficiente - nessun impatto sui tempi dei comandi di test |
| Firefox / Safari / altri | **BiDi polling** | Ripiega sulla chiamata a `browser.takeScreenshot()` a intervalli di `pollIntervalMs`. Funziona ovunque siano supportati gli screenshot WebDriver; aggiunge un piccolo overhead proporzionale all'intervallo |

Non è necessaria alcuna modifica alla configurazione per cambiare modalità - il servizio rileva automaticamente le capacità del browser e registra nei log quale modalità è attiva.

## Comportamento

- La registrazione inizia quando si apre la sessione del browser e si interrompe quando si chiude.
- I frame vuoti iniziali (acquisiti prima della prima navigazione verso un URL) vengono rimossi automaticamente, così che i video inizino dalla prima azione significativa sulla pagina.
- Se `browser.reloadSession()` viene chiamato durante l'esecuzione, il servizio finalizza la registrazione corrente e ne avvia una nuova per la nuova sessione. Ogni sessione produce il proprio file `.webm`.
- Quando esistono più registrazioni, l'interfaccia di DevTools mostra un menu a tendina **Recording N** per passare dall'una all'altra.

### Dove vengono salvati i file di output

Ogni adapter scrive in una cartella `test-results/`; la directory di base in cui si trova varia, perché gli adapter condividono un unico resolver ma gli forniscono input diversi:

| Adapter | Percorso di output |
|---|---|
| **WebdriverIO** | `<outputDir>/test-results/` se `outputDir` è impostato esplicitamente in `wdio.conf.ts`, altrimenti `<rootDir>/test-results/` (`rootDir` è la directory che contiene la configurazione). Evita di impostare `outputDir` solo per controllare i percorsi dei video - WDIO reindirizza lì anche i log dei worker. |
| **Selenium** | `test-results/` nella directory del file di test appena eseguito, con fallback su `process.cwd()`. |
| **Nightwatch** | `test-results/` nella directory del file di test, con fallback sulla directory che contiene `nightwatch.conf.*`, quindi su `process.cwd()`. |

Le directory sotto `node_modules/` vengono ignorate nel percorso di Selenium/Nightwatch, così che i workspace con link simbolici non riversino i video in una cartella di dipendenze, e una directory non scrivibile passa al candidato successivo.

## File di output

La modalità live trasmette i dati acquisiti alla dashboard tramite WebSocket e **non scrive alcun file di trace su disco** — per un artefatto portabile, usa la [modalità trace](/docs/devtools/wdio/trace-mode) (`trace.zip`). L'unico file che la modalità live scrive è il video dello screencast, e solo quando `screencast.enabled: true`. I nomi dei file dipendono dall'adapter (il nome del framework compare nel prefisso):

| Adapter | Video dello screencast |
|---|---|
| WebdriverIO | `wdio-video-{sessionId}.webm` |
| Selenium | `selenium-video-{sessionId}.webm` |
| Nightwatch | `nightwatch-video-{sessionId}.webm` |