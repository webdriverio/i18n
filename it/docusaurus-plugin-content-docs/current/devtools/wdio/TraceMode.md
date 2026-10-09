---
id: trace-mode
title: Modalità Trace
description: "Acquisisci artefatti di trace in modalità headless con la modalità trace di DevTools e configura formato, granularità, conservazione, screenshot, video e asserzioni."
---

Percorso di acquisizione headless: non si apre alcuna finestra dell'interfaccia DevTools. Al termine della sessione l'adapter scrive gli artefatti di trace in una cartella `test-results/` accanto alla directory delle spec / della configurazione. Per la granularità `session` / `spec` si tratta di un file `trace-<sessionId>.zip` (o di una directory `trace-<sessionId>/`); per la granularità `test` ogni test ottiene una propria sottocartella (vedi [Granularità del trace](#trace-granularity--tracegranularity)). L'artefatto è portabile e include tutto il necessario per la riproduzione offline, il confronto da parte di agenti AI o qualsiasi consumer che preferisca un file a un'interfaccia live.

La modalità trace è **mutuamente esclusiva con la modalità live**. Scegline una per sessione: gli utenti che eseguono il debug in modo interattivo vogliono la modalità live; gli agenti che confrontano esecuzioni o i bot di CI che raccolgono artefatti vogliono la modalità trace.

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

Una configurazione di riferimento completa, pronta da copiare e incollare, è disponibile in [`examples/wdio/wdio.trace.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.trace.conf.ts).

Selenium e Nightwatch includono la stessa pipeline di trace: consulta le rispettive pagine degli adapter per la sintassi di abilitazione specifica del framework: [Selenium](/docs/devtools/selenium#trace-mode) · [Nightwatch](/docs/devtools/nightwatch#trace-mode).

## Contenuto dell'artefatto

| File | Contenuto |
|---|---|
| `trace.trace` | `context-options` in NDJSON + eventi di azione `before` / `after`; una riga per record |
| `trace.network` | Voci di rete in stile HAR, una per riga |
| `transcript.md` | Riepilogo Markdown leggibile da persone/LLM con tempi, selettori e annotazioni dei valori |
| `resources/page@<id>-<ts>.jpeg` | Screenshot acquisito a ogni azione rivolta all'utente |
| `resources/page@<id>-<ts>-elements.json` | Elenco piatto degli elementi interagibili al momento di quell'azione |
| `resources/page@<id>-<ts>-snapshot.txt` | Snapshot dell'albero di accessibilità con indentazione per profondità (adatto all'AI) |

### Cosa conta come "azione"

I comandi vengono filtrati tramite una allow-list prima di produrre voci nel trace. Esempi che finiscono nel trace:

- `url` / `get` → `Page.navigate`
- `click` → `Element.click`
- `setValue` / `sendKeys` → `Element.fill`
- `submit`, `clear`, `selectByVisibleText`, …

I comandi interni come `findElement`, `waitUntil`, `executeScript` sono deliberatamente esclusi: non rappresentano un'intenzione rivolta all'utente e aggiungerebbero rumore alla timeline. La allow-list completa si trova in [`@wdio/devtools-core/action-mapping.ts`](https://github.com/webdriverio/devtools/blob/main/packages/core/src/action-mapping.ts).

## Formato di output — `traceFormat`

```ts
{
  mode: 'trace',
  traceFormat: 'zip' | 'ndjson-directory'  // default: 'zip'
}
```

- **`zip`** (predefinito) — un singolo archivio in `test-results/trace-<sessionId>.zip`.
- **`ndjson-directory`** — gli stessi file estratti in `test-results/trace-<sessionId>/`. Un passaggio di decompressione in meno per i consumer basati su script o agenti che vogliono usare grep / leggere in streaming direttamente l'NDJSON.

Entrambi i formati si aprono nel [player `show-trace`](/docs/devtools/trace-player) ufficiale e in altri visualizzatori di trace compatibili.

## Granularità del trace — `traceGranularity`

Quanti artefatti di trace produce un'esecuzione:

```ts
{
  mode: 'trace',
  traceGranularity: 'session' | 'spec' | 'test' // default: 'session'
}
```

| Valore | Output |
|---|---|
| `session` (predefinito) | Un trace per worker/sessione — `test-results/trace-<sessionId>.zip`. |
| `spec` | Un trace per file di spec. Più piccolo e più facile da navigare. |
| `test` | Un trace **per test**, ciascuno nella propria cartella: `test-results/<spec>-<title>-<browser>[-retry<N>]/trace.zip`. |

Per la granularità `test` il nome della cartella è composto dal nome base della spec, da uno slug del titolo del test, dal browser e da un suffisso `-retry<N>` per i tentativi ripetuti — ad es. `test-results/login_e2e-logs-in-chrome/trace.zip`, con un primo retry in `test-results/login_e2e-logs-in-chrome-retry1/trace.zip`. I trace per test sono i più navigabili e si abbinano al meglio a una policy di conservazione, in modo che vengano scritti solo i trace che ti interessano.

## Conservazione — `tracePolicy`

Per impostazione predefinita ogni trace viene conservato (`'on'`). Per conservare solo quelli interessanti — ideale con `traceGranularity: 'test'`:

```ts
{
  mode: 'trace',
  traceGranularity: 'test',
  tracePolicy: 'retain-on-failure' // default: 'on'
}
```

| Policy | Conserva il trace quando… |
|---|---|
| `'on'` (predefinito) | Sempre — ogni trace viene scritto. |
| `'retain-on-failure'` | Il tentativo **finale** del test è fallito. Una sequenza di retry fallito-poi-superato termina come `passed`, quindi *non* viene conservata — non conservi inutilmente un test instabile che alla fine è diventato verde. |
| `'retain-on-first-failure'` | Il **tentativo 0** è fallito, indipendentemente dal fatto che un retry successivo sia stato superato. |
| `'on-first-retry'` | Il test è stato ripetuto almeno una volta (esiste un tentativo 1). |
| `'on-all-retries'` | Esiste un qualsiasi tentativo ripetuto (tentativo ≥ 1). |
| `'retain-on-failure-and-retries'` | Il tentativo finale è fallito **oppure** il test è stato ripetuto. |

Per una porzione non conservata la decisione viene presa a priori e non viene mai scritta su disco. Le policy sensibili ai retry si basano su un **registro degli esiti** per tentativo che l'adapter mantiene per ogni id di test stabile tra i retry, così `retain-on-failure` e `retain-on-first-failure` valutano il tentativo corretto. Quando un runner non espone informazioni sui retry per tentativo, ogni policy tranne `retain-on-failure` degrada a `retain-on-failure`; un'esecuzione senza esiti osservati (ad es. un semplice script standalone) fallisce in modo **aperto** e conserva il trace anziché rischiare di scartarne uno che ti serve.

> La conservazione sensibile ai retry è verificata end-to-end per **WebdriverIO** (mocha / cucumber) e **Selenium** (mocha). Per **Nightwatch**, `retain-on-failure` funziona, ma le altre policy sensibili ai retry degradano a quest'ultima perché `--retries` di Nightwatch riesegue un testcase internamente senza riattivare gli hook per test. Anche gli `specFileRetries` cross-process di WDIO esulano dal registro (per worker). Consulta la [pagina dell'adapter Nightwatch](/docs/devtools/nightwatch#trace-mode) per i dettagli.

## Filmstrip denso — `filmstrip`

**Per impostazione predefinita** il trace registra uno screencast **denso e continuo**, così il player offre una riproduzione fluida durante lo scorrimento anziché saltare da un frame all'altro. I frame densi si affiancano ai frame per azione (che contengono gli snapshot del DOM). Imposta `filmstrip: false` per registrare un solo frame per azione — un trace più piccolo senza registratore continuo:

```ts
{
  mode: 'trace',
  filmstrip: false // opt out — one frame per action (default is true)
}
```

- I frame densi vengono aggiunti **accanto** ai frame per azione (che contengono gli snapshot del DOM), quindi nessun dato del DOM va perso — quando sono presenti frame densi, questi sostituiscono il filmstrip sparso per azione durante lo scorrimento.
- I frame vengono diradati in fase di esportazione (distanza ≥100 ms) e indirizzati per contenuto, quindi frame identici (un'attesa statica) si riducono a un'unica risorsa. Il buffer della sessione live è limitato da `screencast.maxBufferFrames` (predefinito 2000).
- La registrazione utilizza il registratore di screencast — push CDP su Chrome/Chromium, polling di screenshot altrove. Sui browser diversi da Chrome il polling invia molti comandi `takeScreenshot`; abbinalo all'opzione di silenziamento degli step del tuo reporter (vedi [Integrazione con Allure](/docs/devtools/allure)).

`filmstrip` è disponibile su tutti e tre gli adapter (WebdriverIO / Selenium / Nightwatch).

## Screenshot e video per test — `screenshot` / `video`

Con `traceGranularity: 'test'` ogni test può produrre anche uno screenshot autonomo e/o una porzione di video per test, rispecchiando la consueta ergonomia di screenshot/video in caso di errore:

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
| `video` | `'off'` (predefinito) · qualsiasi valore di `tracePolicy` | Registra lo screencast in modo continuo e conserva la porzione di ciascun test secondo la stessa semantica di conservazione di `tracePolicy`. WebM. Impostare un valore diverso da `off` avvia autonomamente il registratore — non è necessario impostare anche `filmstrip` o `screencast.enabled`. |

Entrambe sono limitate alla modalità trace + `traceGranularity: 'test'` (l'ambito per test a cui si collegano). Con granularità più ampie non hanno effetto.

- **WebdriverIO** — `screenshot` / `video` sono opzioni del servizio; vengono allegate inline ad Allure quando è presente `@wdio/allure-reporter`.
- **Selenium** — stesse opzioni nel suo `DevToolsOptions`; vengono allegate inline ad Allure tramite `allure-js-commons` quando è attivo un adapter runner di Allure.
- **Nightwatch** — **solo produzione**: i file vengono scritti nella directory di output del trace (ed elencati nel manifest), ma non allegati inline ad Allure — Nightwatch non dispone di un'API di allegato live per Allure. Vedi [Limitazioni della modalità Trace](/docs/devtools/limitations).

> `screencast.enabled` è la registrazione continua `.webm` separata della **modalità live** e viene ignorata in modalità trace. In modalità trace usa `filmstrip` (frame densi nel trace) o `video` per test; i campi di regolazione dello screencast (`quality`, `maxWidth`, `pollIntervalMs`, …) si applicano comunque a qualsiasi registratore in esecuzione.

## Manifest degli artefatti — `emitArtifactsManifest`

Scrive un file `devtools-artifacts-<sessionId>.json` accanto al trace — un indice generico che reporter e CI utilizzano per individuare gli artefatti prodotti (ogni trace / screenshot / video, più lo stato di ciascun test):

```ts
{
  mode: 'trace',
  emitArtifactsManifest: true // default: off; auto-on when Allure is detected
}
```

- **Disattivato per impostazione predefinita.** Si **attiva automaticamente** quando viene rilevato un reporter Allure — `@wdio/allure-reporter` di WebdriverIO nella configurazione, oppure un runtime `allure-js-commons` di Selenium attivo.
- **Per Nightwatch è opt-in**: non dispone di un segnale Allure live da rilevare automaticamente (`nightwatch-allure` opera a posteriori), quindi non si attiva mai automaticamente — impostalo esplicitamente se vuoi il manifest.

## Asserzioni — `captureAssertions`

Le asserzioni compaiono come righe di azione a tutti gli effetti nel trace (attive per impostazione predefinita; imposta `captureAssertions: false` per disattivarle):

- **`node:assert`** — acquisite in tutti e tre gli adapter come righe `assert.<method>`.
- **`expect` di WebdriverIO** — i matcher `expect(...)` superati *e* falliti (`expect($el).toHaveText(...)`, `toBeExisting()`, …) appaiono come righe `expect.<matcher>` che riportano il valore atteso, la posizione nel sorgente dell'elemento e uno snapshot; i comandi di polling interni del matcher vengono soppressi, così viene mostrata solo l'asserzione.
- **`browser.assert.*` / `browser.verify.*` di Nightwatch** — le asserzioni native compaiono come righe `assert.<m>` / `verify.<m>`.

Le asserzioni superate vengono visualizzate in verde; quelle fallite in rosso con il messaggio di errore.

## Test su dispositivi mobili

La modalità trace rileva le sessioni mobili tramite `platformName: 'android' | 'ios'` (senza distinzione tra maiuscole e minuscole) e si adatta:

- **Web mobile** (Chrome su Android, Safari su iOS): stessa pipeline di snapshot basata sul DOM del desktop.
- **Mobile nativo**: gli script DOM iniettati nella pagina vengono disattivati; viene usato `getPageSource()` per ottenere l'albero XML di Appium, che alimenta invece il serializzatore degli snapshot.

Il `context-options` del trace registra `title: 'android — <deviceName>'` / `'ios — <deviceName>'` in modo che il visualizzatore etichetti correttamente i frame. Una configurazione WDIO di riferimento per Chrome su Android tramite Appium è disponibile in [`examples/wdio/wdio.mobile.conf.ts`](https://github.com/webdriverio/devtools/blob/main/examples/wdio/wdio.mobile.conf.ts).

## Visualizzare l'artefatto

Apri un trace nel **[Trace Player](/docs/devtools/trace-player)** ufficiale — l'interfaccia di WebdriverIO DevTools in una modalità player dedicata di sola lettura:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
```

Il player offre il time-travel del DOM, la scheda A11y e l'overlay di selezione dei locator, la scheda Transcript con Copy-for-LLM, le schede Errors / Console / Network / Source nel pannello e una timeline scorrevole. Lo stesso `.zip` portabile si apre anche in altri visualizzatori di trace autonomi e nel visualizzatore integrato di un report Allure. Consulta la pagina **[Trace Player](/docs/devtools/trace-player)** per la guida completa, le funzionalità e le scorciatoie da tastiera.

## Per saperne di più
Il bin `show-trace` fornito da ciascun adapter apre lo stesso archivio nel player di DevTools, che espone inoltre una **scheda A11y**: l'albero di accessibilità acquisito per ogni azione, in cui facendo clic su una riga si copia il locator di quell'elemento.

Questi locator sono scritti nel dialetto proprio del runner che ha effettuato la registrazione, quindi si incollano direttamente nel framework che ha prodotto il trace. Un elemento identificato solo dal suo testo è `a*=Logout` in WebdriverIO e `//a[contains(., "Logout")]` in Selenium — accompagnato dalla chiamata che lo risolve, `By.xpath()`. Nightwatch preferisce un locator CSS nativo come `button[type="submit"]`, perché è l'unico runner che legge una semplice stringa di selettore con una strategia CSS predefinita, e ricorre a XPath (con l'indicazione `useXpath()` / `locateStrategy: 'xpath'`) solo quando non esiste un locator CSS univoco. Tutti gli altri locator sono CSS portabile.

Per l'utilizzo da parte di LLM / agenti, leggi direttamente `transcript.md` — è una resa Markdown compatta delle azioni con selettori e valori.

- **[Trace Player](/docs/devtools/trace-player)** — la guida completa al player `show-trace`, funzionalità e scorciatoie da tastiera.
- **[Integrazione con Allure](/docs/devtools/allure)** — come gli artefatti di trace / screenshot / video vengono allegati a un report Allure.
- **[Supporto cross-framework](/docs/devtools/cross-framework)** — la matrice delle funzionalità per adapter (WebdriverIO / Selenium / Nightwatch).
- **[Limitazioni della modalità Trace](/docs/devtools/limitations)** — cosa tralascia la modalità trace e le lacune note per adapter.
- **[Riferimento di configurazione](/docs/devtools/reference)** — tutte le opzioni a colpo d'occhio.