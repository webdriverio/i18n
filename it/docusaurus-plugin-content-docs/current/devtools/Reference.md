---
id: reference
title: Riferimento della configurazione
description: "Consulta tutte le opzioni di DevTools per la modalità live e la modalità trace negli adapter WebdriverIO, Selenium e Nightwatch, con i relativi valori predefiniti."
---

Tutte le opzioni di DevTools in sintesi, per i tre adapter. Le opzioni condivise hanno gli stessi **nomi, tipi e valori predefiniti** su ogni adapter; dove il comportamento o la disponibilità differiscono, è indicato, e le opzioni esclusive di un adapter sono elencate separatamente. L'adapter Python non accetta alcun oggetto di opzioni; consulta le schede Python nella pagina [Selenium](/docs/devtools/selenium#configuration-options). Per la spiegazione completa di ciascuna opzione di trace consulta la sezione collegata nella pagina [Trace Mode](/docs/devtools/wdio/trace-mode).

Passa le opzioni nel modo previsto da ciascun adapter:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## Opzioni della modalità e della modalità live

| Opzione | Tipo / valori | Predefinito | Note |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | `'live'` apre la dashboard dell'interfaccia DevTools; `'trace'` la salta e scrive un artefatto portabile. Le due modalità si escludono a vicenda. |
| `port` | `number` | `3000` (se occupata viene usata una porta libera) | Porta a cui si collegano l'interfaccia / il backend di DevTools. Solo modalità live. |
| `hostname` | `string` | `'localhost'` | Hostname a cui si collega il server. Solo modalità live. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Video continuo della sessione (`.webm`). Solo modalità live — per la modalità trace usa `video`. Include `maxBufferFrames` (predefinito `2000`), il limite di frame mantenuti in memoria. Vedi [Screencast](/docs/devtools/wdio/screencast). |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | Capabilities usate per aprire la finestra dell'interfaccia DevTools. WebdriverIO, solo modalità live. |

## Opzioni della modalità trace

Si applicano solo con `mode: 'trace'`.

| Opzione | Tipo / valori | Predefinito | Dettagli |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Archivio singolo oppure directory non compressa. [Output format](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Un trace per sessione / file spec / test. `'test'` è necessario per screenshot/video per singolo test e per l'allegato inline in Allure. [Trace granularity](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Quali trace conservare. Si abbina a `traceGranularity: 'test'`. [Retention](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | Screencast denso e continuo nel trace per uno scorrimento fluido; `false` registra un frame per azione. Ridotto in fase di esportazione a frame distanziati di almeno 100 ms, circa 600 al massimo. [Dense filmstrip](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Screenshot per singolo test (richiede `traceGranularity: 'test'`). Allegato inline in Allure su WebdriverIO e Selenium; solo prodotto su Nightwatch. [Per-test screenshot & video](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | Segmento video per singolo test (richiede `traceGranularity: 'test'`; la codifica richiede `ffmpeg` nel `PATH`). Allegato inline in Allure su WebdriverIO e Selenium; solo prodotto su Nightwatch. [Per-test screenshot & video](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | Scrive `devtools-artifacts-<sessionId>.json`. Abilitato automaticamente quando viene rilevato un reporter Allure (opt-in su Nightwatch). [Artifacts manifest](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | Cattura `node:assert` (e i matcher `expect` del framework, ove supportati) come azioni del trace. [Assertions](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## Solo Selenium (Node.js)

| Opzione | Tipo / valori | Predefinito | Note |
|---|---|---|---|
| `openUi` | `boolean` | `true` | Apre automaticamente la finestra della dashboard. Imposta `false` per la CI. |
| `headless` | `boolean` | `false` | Esegue il browser di test in modalità headless (`--headless=old`). La finestra della dashboard non è interessata. |
| `rerunCommand` | `string` | auto | Template del comando per rieseguire un singolo test; `{{testName}}` viene sostituito. Se omesso, viene ricavato dagli argv del runner. |

## Solo Nightwatch

| Opzione | Tipo / valori | Predefinito | Note |
|---|---|---|---|
| `bidi` | `boolean` | `false` | Abilita la cattura tramite WebDriver BiDi (console + eccezioni JS + rete). Richiede `webSocketUrl: true` nelle capabilities. Su WebdriverIO e Selenium, BiDi viene collegato automaticamente. Vedi [Nightwatch → BiDi capture](/docs/devtools/nightwatch#bidi-capture-opt-in). |

## Differenze tra adapter

Alcune funzionalità di trace sono ridotte su determinati adapter — consulta la [matrice di supporto cross-framework](/docs/devtools/cross-framework) per il quadro completo. Le più rilevanti:

- **Conservazione basata sui retry in Nightwatch** — solo `retain-on-failure` è affidabile; gli altri valori di `tracePolicy` ricadono su di esso.
- **BDD `describe/it` in Nightwatch** — `traceGranularity: 'test'` si riduce a un unico segmento con ambito di sessione.
- **Allegati Allure in Nightwatch** — `screenshot`/`video` per singolo test vengono solo prodotti (file + manifest), non allegati inline.