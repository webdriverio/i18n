---
id: wdio
title: WebDriverIO DevTools
description: "Installa e configura il servizio WebdriverIO DevTools per eseguire il debug dei test con replay del DOM, screenshot, acquisizione di rete e console e screencast."
---

Un servizio WebdriverIO che fornisce un'interfaccia di strumenti per sviluppatori per eseguire, debuggare e ispezionare i test di automazione del browser. Le funzionalità includono il replay delle mutazioni del DOM, screenshot per ogni comando, ispezione delle richieste di rete, acquisizione dei log della console e registrazione screencast della sessione.

## Installazione

```sh
npm install @wdio/devtools-service --save-dev
```

## Utilizzo

### Test Runner

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

### Standalone

```ts
import { remote } from 'webdriverio'
import { setupForDevtools } from '@wdio/devtools-service'

const browser = await remote(setupForDevtools({
  capabilities: { browserName: 'chrome' }
}))
await browser.url('https://example.com')
await browser.deleteSession()
```

Richiede una sessione browser con WebDriver BiDi (Chrome 114+, Firefox 130+), che WebdriverIO abilita automaticamente. Le sessioni Appium saltano l'acquisizione della pagina che lo richiede; imposta `'wdio:enforceWebDriverClassic': true` in un blocco di capability Appium (vedi [Mobile Testing](/docs/devtools/mobile)).

## Opzioni del servizio

```ts
services: [['devtools', options]]
```

| Opzione | Tipo | Predefinito | Descrizione |
|---|---|---|---|
| `port` | `number` | `3000` (se occupata viene usata una porta libera) | Porta su cui è in ascolto il server dell'interfaccia DevTools |
| `hostname` | `string` | `'localhost'` | Hostname a cui si collega il server dell'interfaccia DevTools |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600x1200 | Capabilities usate per aprire la finestra dell'interfaccia DevTools |
| `screencast` | `ScreencastOptions` | - | Registrazione video della sessione ([vedi Screencast](/docs/devtools/wdio/screencast)) |
| `mode` | `'live' \| 'trace'` | `'live'` | `live` apre l'interfaccia DevTools; `trace` la salta e scrive invece un artefatto portabile ([vedi Trace Mode](/docs/devtools/wdio/trace-mode)) |
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Struttura dell'artefatto di trace — archivio singolo o directory non compressa. Si applica solo con `mode: 'trace'` |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Una trace per sessione / file spec / test. `'test'` scrive ciascuna in `test-results/<spec>-<title>-<browser>[-retryN]/trace.zip`. Si applica solo con `mode: 'trace'` ([vedi Trace Mode](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity)) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Quali trace conservare. Si abbina a `traceGranularity: 'test'`. Si applica solo con `mode: 'trace'` |
| `filmstrip` | `boolean` | `true` | Registra un filmstrip screencast denso e continuo *all'interno* della trace per una riproduzione fluida e navigabile nel player — frame densi accanto ai frame per azione, sfoltiti e indirizzati per contenuto all'esportazione. Si applica solo con `mode: 'trace'` |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Screenshot per test, allegato inline ad Allure (`image/png`). Richiede `mode: 'trace'` + `traceGranularity: 'test'` |
| `video` | `'off' \| TraceRetentionPolicy` | `'off'` | Video screencast per test, conservato secondo la policy indicata e allegato inline ad Allure (`video/webm`). Richiede `mode: 'trace'` + `traceGranularity: 'test'` |
| `emitArtifactsManifest` | `boolean` | `false` | Scrive `devtools-artifacts-<sessionId>.json` — un indice generico di ogni artefatto prodotto più lo stato di ciascun test, per reporter/CI. Abilitato automaticamente quando `@wdio/allure-reporter` è presente nella configurazione. Si applica solo con `mode: 'trace'` |
| `captureAssertions` | `boolean` | `true` | Acquisisce le asserzioni come righe di azione della trace — `node:assert` più i matcher `expect(...)` riusciti/falliti. Imposta `false` per disattivarlo |

## Snapshot a runtime

Il servizio aggiunge un comando `browser.getSnapshot()` che restituisce un albero di accessibilità della pagina corrente leggibile dall'AI (`text`) più una mappa `elements` dai riferimenti brevi (`e1`, `e2`, …) ai selettori:

```ts
const { text, elements } = await browser.getSnapshot({ inViewportOnly: true })
```

Legge direttamente la pagina live, senza l'overhead della modalità trace. I suoi locator usano sempre CSS / XPath portabili, quindi un locator di testo può differire da quello nel dialetto WebdriverIO mostrato nella scheda A11y del trace player.

## Per iniziare

1. Esegui i tuoi test WebdriverIO
2. L'interfaccia DevTools si apre automaticamente in una finestra del browser esterna
3. I test iniziano a essere eseguiti immediatamente con visualizzazione in tempo reale
4. Visualizza l'anteprima live del browser, l'avanzamento dei test e l'esecuzione dei comandi
5. Al termine dell'esecuzione iniziale, usa i pulsanti di riproduzione per rieseguire singoli test o suite
6. Fai clic sul pulsante di stop in qualsiasi momento per terminare i test in esecuzione
7. Esplora azioni, metadati, log della console e codice sorgente nelle schede del workbench

## Funzionalità

Esplora in dettaglio le funzionalità di WebDriverIO DevTools:

- **[Riesecuzione interattiva dei test e visualizzazione](/docs/devtools/wdio/interactive-test-rerunning)** - Anteprime del browser in tempo reale con riesecuzione dei test
- **[Preserve & Rerun (Compare)](/docs/devtools/wdio/preserve-and-rerun)** - Acquisisci uno snapshot di un test fallito, rieseguilo e confronta le due esecuzioni affiancate
- **[Supporto multi-framework](/docs/devtools/wdio/multi-framework-support)** - Funziona con Mocha, Jasmine e Cucumber
- **[Log della console](/docs/devtools/wdio/console-logs)** - Acquisisci e ispeziona l'output della console del browser
- **[Log di rete](/docs/devtools/wdio/network-logs)** - Monitora le chiamate API e l'attività di rete
- **[Metadati](/docs/devtools/wdio/metadata)** - Capabilities della sessione, ambiente e tempistiche per ogni sessione del browser
- **[TestLens](/docs/devtools/wdio/testlens)** - Naviga nel codice sorgente con una navigazione del codice intelligente
- **[Screencast della sessione](/docs/devtools/wdio/screencast)** - Registrazione video automatica delle sessioni del browser
- **[Trace Mode](/docs/devtools/wdio/trace-mode)** - Percorso di acquisizione headless che produce un artefatto `trace.zip` portabile (nessuna finestra di interfaccia); supporta i formati di output `zip` e `ndjson-directory`, granularità per sessione/spec/test, policy di conservazione consapevoli dei retry e un `filmstrip` denso opzionale, tutti visualizzabili nel player first-party `show-trace`

## Trace Player

Una trace registrata con `mode: 'trace'` si apre nel player first-party `show-trace` (`npx show-trace path/to/trace.zip`) — time-travel del DOM, la scheda A11y e l'overlay degli elementi pick-locator, la scheda Transcript con Copy-for-LLM, le schede Errors / Console / Network / Source e una timeline navigabile (filmstrip denso, annidamento Scenario → Step di Cucumber).

Consulta la pagina **[Trace Player](/docs/devtools/trace-player)** per la guida completa e altri visualizzatori compatibili.

## Report Allure

Con `@wdio/allure-reporter` nella configurazione, gli artefatti della modalità trace (lo zip della trace, più lo screenshot e il video per test con `traceGranularity: 'test'`) vengono allegati automaticamente al report Allure, e `emitArtifactsManifest` viene abilitato automaticamente.

Consulta **[Integrazione con Allure](/docs/devtools/allure)** per i dettagli sugli allegati e le opzioni per silenziare gli step del reporter.