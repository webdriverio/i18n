---
id: trace-mode
title: Modalità Trace
description: "Cattura artefatti di trace headless con la modalità trace di DevTools e configura formato, granularità, conservazione, screenshot, video e asserzioni."
---

Percorso di cattura headless — non si apre alcuna finestra dell'interfaccia DevTools. Al termine della sessione l'adapter scrive gli artefatti di trace in una cartella `test-results/`: sotto l'`outputDir` (o `rootDir`) di WebdriverIO, e per Selenium e Nightwatch accanto al file di test, ripiegando sulla directory di configurazione e poi sulla directory corrente. Per la granularità `session` / `spec` si tratta di un `trace-<sessionId>.zip` (o di una directory `trace-<sessionId>/`); per la granularità `test` ogni test ottiene la propria sottocartella (vedi [Granularità della trace](#trace-granularity--tracegranularity)). L'artefatto è portabile e contiene tutto il necessario per la riproduzione offline, il confronto da parte di agenti AI o qualsiasi consumatore che preferisca un file a un'interfaccia live.

La modalità trace è **mutuamente esclusiva con la modalità live**. Scegline una per sessione: le persone che eseguono il debug in modo interattivo vogliono la modalità live; gli agenti che confrontano esecuzioni o i bot CI che raccolgono artefatti vogliono la modalità trace.

## Abilitazione

```ts
// wdio.conf.ts
services: [
  [
    'devtools',
    {
      mode: 'trace',
      traceFormat: 'zip' // optional; 'zip' (default) | 'ndjson-directory'
    }
  ]
]
```

La modalità trace richiede WebDriver BiDi (Chrome 114+, Firefox 130+), che WebdriverIO abilita automaticamente.

Per provarla, esegui l'esempio mocha in modalità trace con `DEVTOOLS_MODE=trace pnpm demo:wdio:mocha`; aggiungi `DEVTOOLS_TRACE_GRANULARITY=test DEVTOOLS_TRACE_POLICY=retain-on-failure` per la conservazione per singolo test. La configurazione è [`examples/wdio/mocha/wdio.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/mocha/wdio.conf.ts).

Selenium e Nightwatch includono la stessa pipeline di trace — consulta le pagine dei rispettivi adapter per la sintassi di abilitazione specifica del framework: [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode).

## Contenuto dell'artefatto

| File | Contenuto |
|---|---|
| `trace.trace` | NDJSON `context-options` + eventi di azione `before` / `after`; una riga per record |
| `trace.network` | Voci di rete in stile HAR, una per riga; una voce letta dal buffer Resource Timing della pagina (senza BiDi, ad es. Safari o Appium) riporta `_source: "resource-timing"` e `_resourceType` |
| `trace.mutations` | Flusso NDJSON delle mutazioni DOM alla base del time-travel del DOM; omesso quando non è stato catturato nulla |
| `transcript.md` | Riepilogo Markdown leggibile da persone/LLM con tempi, selettori, annotazioni dei valori |
| `resources/page@<id>-<ts>.jpeg` | Screenshot acquisito a ogni azione rivolta all'utente |
| `resources/page@<id>-<ts>-elements.json` | Elenco piatto degli elementi interagibili in quell'azione |
| `resources/page@<id>-<ts>-snapshot.txt` | Snapshot dell'albero di accessibilità con indentazione per profondità (adatto all'AI) |
| `resources/<sha1>.jpeg` | Fotogrammi densi del filmstrip, indirizzati per contenuto |
| `resources/src@<sha1>.txt` | Sorgente del test catturato per la scheda Source |
| `resources/<sha1>` | Corpi delle risposte di rete, indirizzati per contenuto |

### Cosa conta come "azione"

I comandi vengono filtrati tramite una allow-list prima di produrre voci di trace. Esempi che finiscono nella trace:

- `url` / `get` → `Page.navigate`
- `click` → `Element.click`
- `setValue` / `sendKeys` → `Element.fill`
- `submit`, `clear`, `selectByVisibleText`, …

La risoluzione dei locator (`$`, `$$`, `findElement(s)`), il polling di `executeScript` di Selenium e il `clearValue` che `setValue` invoca internamente sono esclusi deliberatamente: non rappresentano un intento rivolto all'utente e aggiungerebbero rumore alla timeline. Le attese esplicite (`waitFor*`, `waitUntil`, `waitForElement*` di Nightwatch), le letture di elementi (`getText`, `isDisplayed`, …) ed `execute` compaiono invece. La allow-list è `ACTION_MAP` in [`packages/shared/src/trace-actions.ts`](https://github.com/webdriverio/devtools/blob/main/packages/shared/src/trace-actions.ts).

## Formato di output — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // default: 'zip'
}
```

- **`zip`** (predefinito) — un unico archivio in `test-results/trace-<sessionId>.zip`.
- **`ndjson-directory`** — gli stessi file decompressi in `test-results/trace-<sessionId>/`. Un passaggio di decompressione in meno per i consumatori scriptati o agentici che vogliono fare grep / streaming dell'NDJSON direttamente.

Lo `zip` si apre nel [player `show-trace`](/docs/devtools/trace-player) ufficiale; una trace `ndjson-directory` si apre in altri visualizzatori di trace compatibili, oppure va prima compressa in zip per aprirla in `show-trace`.

## Granularità della trace — `traceGranularity`

Quanti artefatti di trace produce un'esecuzione:

```ts
{
  mode: 'trace',
  traceGranularity: 'session' | 'spec' | 'test' // default: 'session'
}
```

| Valore | Output |
|---|---|
| `session` (predefinito) | Una trace per worker/sessione — `test-results/trace-<sessionId>.zip`. |
| `spec` | Una trace per file spec, in `test-results/trace-<spec>-<hash>-<sessionId8>.zip`. Più piccola, più facile da navigare. |
| `test` | Una trace **per test**, ciascuna nella propria cartella: `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`. |

Per la granularità `test` il nome della cartella è composto dal nome base della spec, uno slug del titolo del test, il browser e un suffisso `-retry<N>` nei tentativi ripetuti — ad es. `test-results/login_e2e-logs-in-chrome/trace.zip`, con un primo retry in `test-results/login_e2e-logs-in-chrome-retry1/trace.zip`. Le trace per test sono le più navigabili e si abbinano al meglio a una politica di conservazione, in modo che vengano scritte solo le trace che ti interessano.

## Conservazione — `tracePolicy`

Per impostazione predefinita ogni trace viene conservata (`'on'`). Per conservare solo quelle interessanti — ideale con `traceGranularity: 'test'`:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure' // default: 'on'
}
```

| Politica | Conserva la trace quando… |
|---|---|
| `'on'` (predefinito) | Sempre — ogni trace viene scritta. |
| `'retain-on-failure'` | Il tentativo **finale** del test è fallito. Una sequenza di retry fallito-poi-superato termina con `passed`, quindi *non* viene conservata — non conservi inutilmente un test instabile che alla fine è diventato verde. |
| `'retain-on-first-failure'` | Il **tentativo 0** è fallito, indipendentemente dal fatto che un retry successivo sia stato superato. |
| `'on-first-retry'` | Il test è stato ripetuto almeno una volta (esiste un tentativo 1). |
| `'on-all-retries'` | Esiste un qualsiasi tentativo ripetuto (tentativo ≥ 1). |
| `'retain-on-failure-and-retries'` | Il tentativo finale è fallito **oppure** il test è stato ripetuto. |

Una porzione non conservata viene scartata e non viene mai scritta su disco. Le politiche basate sui retry si basano su un **registro degli esiti** per tentativo che l'adapter mantiene per ogni id di test stabile tra i retry, così `retain-on-failure` e `retain-on-first-failure` valutano il tentativo corretto. Quando un runner non espone informazioni sui retry per tentativo, ogni politica tranne `retain-on-failure` degrada a `retain-on-failure`; un'esecuzione senza esiti osservati (ad es. un semplice script standalone) fallisce in modalità **aperta** e conserva la trace anziché rischiare di scartarne una di cui hai bisogno.

> La conservazione basata sui retry è verificata end-to-end per **WebdriverIO** (mocha / cucumber) e **Selenium** (mocha). Per **Nightwatch**, `retain-on-failure` funziona, ma le altre politiche basate sui retry degradano a essa perché `--retries` di Nightwatch riesegue un testcase internamente senza riattivare gli hook per test. Anche gli `specFileRetries` cross-process di WDIO ricadono al di fuori del registro (per worker). Consulta la [pagina dell'adapter Nightwatch](/docs/devtools/nightwatch#trace-mode) per i dettagli.

## Filmstrip denso — `filmstrip`

**Per impostazione predefinita** la trace registra uno screencast **denso e continuo**, così il player offre una riproduzione fluida anziché saltare da un fotogramma all'altro. I fotogrammi densi si affiancano ai fotogrammi per azione (che contengono gli snapshot del DOM). Imposta `filmstrip: false` per registrare un solo fotogramma per azione — una trace più piccola senza registratore continuo:

```ts
{
  mode: 'trace',
  filmstrip: false // opt out — one frame per action (default is true)
}
```

- I fotogrammi densi vengono aggiunti **accanto** ai fotogrammi per azione (che contengono gli snapshot del DOM), quindi nessun dato DOM va perso — quando sono presenti fotogrammi densi, questi sostituiscono il filmstrip sparso per azione durante lo scorrimento.
- I fotogrammi vengono diradati in fase di esportazione (a distanza di ≥100 ms) e indirizzati per contenuto, quindi fotogrammi identici (un'attesa statica) si riducono a un'unica risorsa. Il buffer della sessione live è limitato da `screencast.maxBufferFrames` (predefinito 2000).
- La registrazione utilizza il registratore di screencast — push CDP su Chrome/Chromium, polling di screenshot altrove. Sui browser non Chrome il polling invia molti comandi `takeScreenshot`; abbinalo all'opzione di silenziamento degli step del tuo reporter (vedi [Integrazione con Allure](/docs/devtools/allure)).

`filmstrip` è disponibile su tutti e tre gli adapter (WebdriverIO / Selenium / Nightwatch).

## Screenshot e video per test — `screenshot` / `video`

Con `traceGranularity: 'test'` ogni test può anche produrre uno screenshot autonomo e/o una porzione di video per test, rispecchiando la consueta ergonomia di screenshot/video in caso di fallimento:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  screenshot: 'only-on-failure', // 'off' (default) | 'on' | 'only-on-failure'
  video: 'retain-on-failure'     // 'off' (default) | any tracePolicy value
}
```

| Opzione | Valori | Comportamento |
|---|---|---|
| `screenshot` | `'off'` (predefinito) · `'on'` · `'only-on-failure'` | `'on'` acquisisce dopo ogni test; `'only-on-failure'` solo dopo un test fallito. PNG. |
| `video` | `'off'` (predefinito) · qualsiasi valore di `tracePolicy` | Registra lo screencast in modo continuo e conserva la porzione di ciascun test secondo la stessa semantica di conservazione di `tracePolicy`. WebM; la codifica richiede `ffmpeg` nel `PATH`. Impostare un valore diverso da `off` avvia il registratore autonomamente — non servono anche `filmstrip` o `screencast.enabled`. |

Entrambe sono limitate alla modalità trace + `traceGranularity: 'test'` (l'ambito per test a cui si associano). Con granularità più grossolane non hanno effetto.

- **WebdriverIO** — `screenshot` / `video` sono opzioni del servizio; vengono allegate inline ad Allure quando è presente `@wdio/allure-reporter`.
- **Selenium** — stesse opzioni nel suo `DevToolsOptions`; vengono allegate inline ad Allure tramite `allure-js-commons` quando è attivo un adapter runner di Allure.
- **Nightwatch** — **solo produzione**: i file vengono scritti nella directory di output della trace (ed elencati nel manifest), ma non allegati inline ad Allure — Nightwatch non dispone di un'API di allegato live per Allure. Vedi [Limitazioni della modalità Trace](/docs/devtools/limitations).

> `screencast.enabled` è la registrazione `.webm` continua separata della **modalità live** ed è ignorata in modalità trace. In modalità trace usa `filmstrip` (fotogrammi densi nella trace) o `video` per test; i campi di regolazione dello screencast (`quality`, `maxWidth`, `pollIntervalMs`, …) si applicano comunque a qualsiasi registratore sia in esecuzione.

## Manifest degli artefatti — `emitArtifactsManifest`

Scrive un file `devtools-artifacts-<sessionId>.json` accanto alla trace — un indice generico che reporter e CI utilizzano per individuare gli artefatti prodotti (ogni trace / screenshot / video, più lo stato di ciascun test):

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // default: off; auto-on when Allure is detected
}
```

- **Disattivato per impostazione predefinita.** Si **attiva automaticamente** quando viene rilevato un reporter Allure — `@wdio/allure-reporter` di WebdriverIO nella configurazione, o un runtime `allure-js-commons` di Selenium attivo.
- **Nightwatch è opt-in**: non dispone di un segnale Allure live da rilevare automaticamente (`nightwatch-allure` opera a posteriori), quindi non si attiva mai automaticamente — impostalo esplicitamente se vuoi il manifest.

## Asserzioni — `captureAssertions`

Le asserzioni compaiono come righe di azione a pieno titolo nella trace (attivo per impostazione predefinita; imposta `captureAssertions: false` per disattivarlo):

- **`node:assert`** — catturate su tutti e tre gli adapter come righe `assert.<method>`.
- **`expect` di WebdriverIO** — i matcher `expect(...)` superati *e* falliti (`expect($el).toHaveText(...)`, `toBeExisting()`, …) compaiono come righe `expect.<matcher>` con il valore atteso, la posizione nel sorgente dell'elemento e uno snapshot; i comandi di polling interni del matcher vengono soppressi, così viene mostrata solo l'asserzione.
- **`browser.assert.*` / `browser.verify.*` di Nightwatch** — le asserzioni native compaiono come righe `assert.<m>` / `verify.<m>`.

Le asserzioni superate sono visualizzate in verde; quelle fallite in rosso con il messaggio di errore.

## Test su dispositivi mobili

Le sessioni Appium vengono catturate sia in modalità live sia in modalità trace. Il discriminante è il **nome del browser** nelle capabilities, non il dispositivo:

- **Web mobile** (Chrome su Android, Safari su iOS): stessa pipeline di snapshot basata sul DOM del desktop.
- **App nativa** (nessun `browserName`): gli script DOM iniettati nella pagina vengono disattivati; l'albero XML di Appium alimenta invece il serializzatore degli snapshot.
- **App ibrida**: solo WebdriverIO segue la sessione nella sua webview; gli altri adapter decidono in base alle capabilities di avvio.

Il `context-options` della trace registra la piattaforma, il modello e la versione del sistema operativo, così il visualizzatore etichetta correttamente i fotogrammi. Esegui gli esempi con `pnpm demo:wdio:mobile` (anche `:selenium:mobile`, `:nightwatch:mobile`, `:python:mobile`). Vedi **[Test su dispositivi mobili](/docs/devtools/mobile)** per il riferimento completo.

## Visualizzazione dell'artefatto

Apri una trace nel **[Trace Player](/docs/devtools/trace-player)** ufficiale — l'interfaccia DevTools di WebdriverIO in una modalità player dedicata in sola lettura:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
```

Il player offre time-travel del DOM, la scheda A11y e l'overlay di selezione dei locator, la scheda Transcript con Copy-for-LLM, le schede del dock Errors / Console / Network / Source e una timeline scorrevole. Lo stesso `.zip` portabile si apre anche in altri visualizzatori di trace standalone e all'interno del visualizzatore integrato di un report Allure. Consulta la pagina **[Trace Player](/docs/devtools/trace-player)** per la guida completa, le funzionalità e le scorciatoie da tastiera.

## Locator nella scheda A11y

Il bin `show-trace` fornito da ciascun adapter apre lo stesso archivio nel player DevTools, che espone inoltre una **scheda A11y**: l'albero di accessibilità catturato per ogni azione, dove facendo clic su una riga si copia il locator di quell'elemento.

Questi locator sono scritti nel dialetto del runner che ha effettuato la registrazione, quindi si incollano direttamente nel framework che ha prodotto la trace. Un elemento identificato solo dal suo testo è `a*=Logout` in WebdriverIO e `//a[contains(., "Logout")]` in Selenium — con didascalia della chiamata che lo risolve, `By.xpath()`. Nightwatch preferisce un locator CSS nativo come `button[type="submit"]`, perché è l'unico runner che legge una semplice stringa di selettore con una strategia CSS predefinita, e ripiega su XPath (con didascalia `useXpath()` / `locateStrategy: 'xpath'`) solo quando non esiste un locator CSS univoco. Ogni altro locator è CSS portabile.

Per l'utilizzo da parte di LLM / agenti, leggi direttamente `transcript.md` — è una resa Markdown compatta delle azioni con selettori e valori.

## Per saperne di più

- **[Trace Player](/docs/devtools/trace-player)** — la guida completa al player `show-trace`, funzionalità e scorciatoie da tastiera.
- **[Integrazione con Allure](/docs/devtools/allure)** — come gli artefatti di trace / screenshot / video vengono allegati a un report Allure.
- **[Supporto cross-framework](/docs/devtools/cross-framework)** — la matrice delle funzionalità per adapter (WebdriverIO / Selenium / Nightwatch).
- **[Limitazioni della modalità Trace](/docs/devtools/limitations)** — cosa omette la modalità trace e le lacune note per adapter.
- **[Riferimento di configurazione](/docs/devtools/reference)** — tutte le opzioni a colpo d'occhio.