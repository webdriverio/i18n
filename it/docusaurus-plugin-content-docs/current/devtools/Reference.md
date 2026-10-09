---
id: reference
title: Riferimento di configurazione
description: "Consulta tutte le opzioni di DevTools per la modalità live e la modalità trace negli adapter WebdriverIO, Selenium e Nightwatch, con i relativi valori predefiniti."
---

Tutte le opzioni di DevTools in un colpo d'occhio, per i tre adapter. **Nomi, tipi e valori predefiniti delle opzioni sono identici** su ogni adapter; dove il comportamento differisce, viene segnalato. Per la spiegazione completa di ciascuna opzione trace, consulta la sezione collegata nella pagina [Trace Mode](/docs/devtools/wdio/trace-mode).

Passa le opzioni nel modo previsto da ciascun adapter:

- **WebdriverIO** — `services: [['devtools', { … }]]`
- **Selenium** — `DevTools.configure({ … })`
- **Nightwatch** — `globals: nightwatchDevtools({ … })`

## Opzioni di modalità e della modalità live

| Opzione | Tipo / valori | Predefinito | Note |
|---|---|---|---|
| `mode` | `'live' \| 'trace'` | `'live'` | `'live'` apre la dashboard dell'interfaccia DevTools; `'trace'` la salta e scrive un artefatto portabile. Le due modalità si escludono a vicenda. |
| `port` | `number` | casuale | Porta a cui si collegano l'interfaccia / il backend di DevTools. Solo modalità live. |
| `hostname` | `string` | `'localhost'` | Hostname a cui si collega il server. Solo modalità live. |
| `screencast` | `ScreencastOptions` | `{ enabled: false }` | Video continuo della sessione (`.webm`). Solo modalità live — per la modalità trace usa `video`. Vedi [Screencast](/docs/devtools/wdio/screencast). |
| `devtoolsCapabilities` | `Capabilities` | Chrome 1600×1200 | Capabilities utilizzate per aprire la finestra dell'interfaccia DevTools. WebdriverIO, solo modalità live. |

## Opzioni della modalità trace

Si applicano solo con `mode: 'trace'`.

| Opzione | Tipo / valori | Predefinito | Dettagli |
|---|---|---|---|
| `traceFormat` | `'zip' \| 'ndjson-directory'` | `'zip'` | Archivio singolo oppure directory non compressa. [Output format](/docs/devtools/wdio/trace-mode#output-format--traceformat) |
| `traceGranularity` | `'session' \| 'spec' \| 'test'` | `'session'` | Una trace per sessione / file spec / test. `'test'` è necessario per screenshot/video per singolo test e per l'allegato inline in Allure. [Trace granularity](/docs/devtools/wdio/trace-mode#trace-granularity--tracegranularity) |
| `tracePolicy` | `'on' \| 'retain-on-failure' \| 'retain-on-first-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-failure-and-retries'` | `'on'` | Quali trace conservare. Da usare insieme a `traceGranularity: 'test'`. [Retention](/docs/devtools/wdio/trace-mode#retention--tracepolicy) |
| `filmstrip` | `boolean` | `true` | Screencast denso e continuo all'interno della trace per uno scorrimento fluido; `false` registra un fotogramma per azione. [Dense filmstrip](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) |
| `screenshot` | `'off' \| 'on' \| 'only-on-failure'` | `'off'` | Screenshot per singolo test (richiede `traceGranularity: 'test'`). Opzione del servizio WebdriverIO. [Per-test screenshot & video](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `video` | `'off' \| <tracePolicy value>` | `'off'` | Segmento video per singolo test (richiede `traceGranularity: 'test'`). Opzione del servizio WebdriverIO. [Per-test screenshot & video](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) |
| `emitArtifactsManifest` | `boolean` | `false` | Scrive `devtools-artifacts-<sessionId>.json`. Abilitata automaticamente quando viene rilevato un reporter Allure (opzionale su Nightwatch). [Artifacts manifest](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest) |
| `captureAssertions` | `boolean` | `true` | Cattura `node:assert` (e i matcher `expect` del framework, dove supportati) come azioni della trace. [Assertions](/docs/devtools/wdio/trace-mode#assertions--captureassertions) |

## Solo Nightwatch

| Opzione | Tipo / valori | Predefinito | Note |
|---|---|---|---|
| `bidi` | `boolean` | `false` | Abilita la cattura tramite WebDriver BiDi (console + eccezioni JS + rete). Richiede `webSocketUrl: true` nelle capabilities. Su WebdriverIO e Selenium, BiDi viene collegato automaticamente. Vedi [Nightwatch → BiDi capture](/docs/devtools/nightwatch#bidi-capture-opt-in). |

## Differenze tra adapter

Alcune funzionalità di trace sono limitate su determinati adapter — consulta la [matrice di supporto cross-framework](/docs/devtools/cross-framework) per il quadro completo. Le più rilevanti:

- **Conservazione basata sui retry in Nightwatch** — solo `retain-on-failure` è affidabile; gli altri valori di `tracePolicy` ricadono su di esso.
- **BDD `describe/it` in Nightwatch** — `traceGranularity: 'test'` si riduce a un unico segmento a livello di sessione.
- **Allegati Allure in Nightwatch** — `screenshot`/`video` per singolo test vengono solo prodotti (file + manifest), non allegati inline.