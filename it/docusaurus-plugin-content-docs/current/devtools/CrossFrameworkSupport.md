---
id: cross-framework
title: Supporto multi-framework
description: "Confronta quanto in modo completo la modalità trace di DevTools cattura le esecuzioni di WebdriverIO, Selenium e Nightwatch, e quali lacune presenta ciascun adapter."
---

Il formato del trace e il player `show-trace` sono identici tra WebdriverIO / Selenium / Nightwatch; questa pagina mostra dove differisce la completezza della cattura. Per il riferimento completo della modalità trace, consulta [Trace Mode](/docs/devtools/wdio/trace-mode).

Le trasformazioni che costruiscono un trace si trovano in [`@wdio/devtools-trace`](https://github.com/webdriverio/devtools/tree/main/packages/trace), un livello al di sotto degli adapter, quindi **il formato del trace e il player `show-trace` sono identici per ogni adapter** — lo stesso `.zip` (o directory) si apre nello stesso player indipendentemente da quale adapter lo abbia prodotto. I tre adapter seguenti condividono inoltre le opzioni principali (`mode`, `traceGranularity`, `tracePolicy`, `traceFormat`, `filmstrip`, `emitArtifactsManifest`, `captureAssertions`).

**La completezza della cattura varia però in base all'adapter** — WebdriverIO è il più completo; Selenium e Nightwatch coprono il flusso principale con le lacune indicate di seguito. La sintassi di attivazione specifica di ciascun framework si trova nella pagina di ogni adapter — consulta [Selenium](/docs/devtools/selenium#trace-mode) e [Nightwatch](/docs/devtools/nightwatch#trace-mode).

L'adapter Python (vedi le schede **Python** nella pagina [Selenium](/docs/devtools/selenium)) scrive lo stesso archivio e si apre nello stesso player, ma non è presente in questa tabella: non esegue JavaScript nel processo di test, quindi è il backend a costruire il trace a partire dallo stream catturato, anziché l'adapter a costruirlo in-process. Granularità e conservazione hanno degli equivalenti in Python — `--devtools-trace-granularity session|test` e `--devtools-trace-policy`, quest'ultimo con i valori sensibili ai retry che degradano a `retain-on-failure` perché nulla su quel canale trasporta un numero di tentativo. Le righe senza equivalente in Python sono quelle relative agli artefatti per singolo test: `screenshot`, `video` e l'allegato inline ad Allure. Ciò che cattura - DOM time-travel, il filmstrip denso, l'albero A11y e l'overlay degli elementi, comandi, console, rete, asserzioni, controlli di esecuzione e Preserve & Rerun - è descritto in una pagina dedicata.

| Funzionalità | WebdriverIO | Selenium | Nightwatch |
|---|---|---|---|
| Modalità trace + player `show-trace` | ✅ | ✅ | ✅ |
| DOM time-travel (cattura delle mutazioni) | ✅ | ✅ ¹ | ✅ |
| Scheda A11y + overlay pick-locator (trace player) | ✅ | ✅ | ✅ |
| Rilevamento della sessione Appium nativa | ✅ | ✅ | ✅ |
| Segue un'app ibrida nella sua webview | ✅ | ⚠️ solo caps di avvio | ⚠️ solo caps di avvio |
| Transcript + Copy-for-LLM | ✅ | ✅ | ✅ |
| `screenshot` / `video` per singolo test | ✅ Allure inline | ✅ Allure inline | ⚠️ solo generazione ² |
| `tracePolicy` sensibile ai retry | ✅ | ✅ | ⚠️ solo `retain-on-failure` ³ |
| `traceGranularity: 'test'` | ✅ | ✅ | ⚠️ Cucumber / exports-object; BDD `describe/it` si riduce a una porzione di sessione |
| Annidamento Cucumber Feature→Scenario→Step | Scenario→Step ⁴ | ✅ completo | Feature→Scenario ⁵ |
| Cattura BiDi (console / rete / eccezioni) | ✅ automatica | ✅ automatica | ⚠️ opt-in (`bidi: true` + `webSocketUrl`) |
| Screencast (filmstrip / video) | CDP push | CDP push | solo polling |
| Schede A11y e Transcript | solo trace player | solo trace player | solo trace player |

¹ Con BiDi, Selenium registra il page collector all'avvio del documento, quindi ogni documento ancora il proprio DOM come avviene in WebdriverIO. Senza BiDi ripiega sull'iniezione del collector dopo ogni navigazione, e in quel caso lo snapshot di una navigazione può essere in ritardo rispetto al comando che l'ha attivata.
² Nightwatch non dispone di un'API per allegare in tempo reale ad Allure, quindi gli artefatti per singolo test vengono scritti nella directory di output del trace ed elencati nel manifest, ma non allegati a un test Allure.
³ Il `--retries` di Nightwatch riesegue un test internamente senza riattivare gli hook per singolo test del plugin, quindi le policy sensibili ai retry (`on-first-retry`, `retain-on-first-failure`, …) degradano a `retain-on-failure`.
⁴ WebdriverIO non trasporta ancora la gerarchia a livello di feature, quindi il suo annidamento Cucumber è Scenario→Step.
⁵ Nightwatch non registra ancora l'annidamento per singolo step (solo Feature→Scenario).