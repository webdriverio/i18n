---
id: screencast
title: Screencast della sessione
description: "Registra le sessioni del browser come video .webm con lo screencast di DevTools, configura le opzioni di acquisizione e trova i file di output."
---

Registra le sessioni del browser come video `.webm`. I video vengono visualizzati nell'interfaccia di DevTools accanto alle viste degli snapshot e delle mutazioni del DOM.

Disponibile in tutti e tre gli adapter - **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** e **[Nightwatch.js](/docs/devtools/nightwatch#screencast)**. La modalità di acquisizione varia a seconda del framework (CDP push dove possibile, altrimenti polling - vedi [Supporto dei browser](#browser-support) più sotto).

## Demo

![Screencast Demo](/img/devtools/screencast.gif)

## Configurazione iniziale

La codifica dello screencast richiede **ffmpeg** nel `PATH` e il pacchetto `fluent-ffmpeg`:

```sh
# Installa ffmpeg - https://ffmpeg.org/download.html
brew install ffmpeg        # macOS
sudo apt install ffmpeg    # Ubuntu/Debian

# Installa fluent-ffmpeg
npm install fluent-ffmpeg
```

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

## Supporto dei browser

La registrazione funziona su tutti i principali browser grazie alla selezione automatica della modalità:

| Browser | Modalità | Note |
|---|---|---|
| Chrome / Chromium / Edge | **CDP push** | Chrome invia i frame tramite il DevTools Protocol. Efficiente - nessun impatto sui tempi dei comandi di test |
| Firefox / Safari / altri | **BiDi polling** | Ripiega sulla chiamata di `browser.takeScreenshot()` a intervalli di `pollIntervalMs`. Funziona ovunque siano supportati gli screenshot WebDriver; aggiunge un piccolo overhead proporzionale all'intervallo |

Non è necessaria alcuna modifica alla configurazione per cambiare modalità - il servizio rileva automaticamente le capacità del browser e registra nei log quale modalità è attiva.

## Comportamento

- La registrazione inizia all'apertura della sessione del browser e si interrompe alla sua chiusura.
- I frame vuoti iniziali (acquisiti prima della prima navigazione verso un URL) vengono rimossi automaticamente, così i video iniziano dalla prima azione significativa sulla pagina.
- Se `browser.reloadSession()` viene chiamato durante l'esecuzione, il servizio finalizza la registrazione corrente e ne avvia una nuova per la nuova sessione. Ogni sessione produce il proprio file `.webm`.
- Quando esistono più registrazioni, l'interfaccia di DevTools mostra un menu a tendina **Recording N** per passare dall'una all'altra.

### Dove vengono salvati i file di output

La directory scelta da ciascun adapter è leggermente diversa - condividono tutti lo stesso resolver in `@wdio/devtools-core`, ma gli forniscono input diversi:

| Adapter | Posizione dell'output |
|---|---|
| **WebdriverIO** | `outputDir` se impostato esplicitamente in `wdio.conf.ts`, altrimenti `rootDir` (la directory che contiene la configurazione). Evita di impostare `outputDir` solo per controllare i percorsi dei video - WDIO reindirizza lì anche i log dei worker. |
| **Selenium** | Directory del file di test appena eseguito, con fallback su `process.cwd()`. |
| **Nightwatch** | Directory del file di test, con fallback sulla directory che contiene `nightwatch.conf.*`, poi su `process.cwd()`. |

Le directory sotto `node_modules/` vengono saltate nel percorso Selenium/Nightwatch, così i workspace con link simbolici non riversano i video in una cartella di dipendenze.

## File di output

La modalità live trasmette i dati acquisiti alla dashboard tramite WebSocket e **non scrive alcun file di trace su disco** — per un artefatto portabile, usa la [modalità trace](/docs/devtools/wdio/trace-mode) (`trace.zip`). L'unico file scritto dalla modalità live è il video dello screencast, e solo quando `screencast.enabled: true`. I nomi dei file sono specifici per adapter (il nome del framework compare nel prefisso):

| Adapter | Video dello screencast |
|---|---|
| WebdriverIO | `wdio-video-{sessionId}.webm` |
| Selenium | `selenium-video-{sessionId}.webm` |
| Nightwatch | `nightwatch-video-{sessionId}.webm` |