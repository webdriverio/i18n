---
id: allure
title: Integrazione con Allure
description: "Allega automaticamente al tuo report Allure gli artefatti della modalità trace di DevTools, come archivi zip di trace, screenshot e video."
---

Gli artefatti della modalità trace — lo zip del trace e lo screenshot e il video di ciascun test — vengono allegati automaticamente a un report Allure, così puoi aprirli direttamente dal report. Consulta [Trace Mode](/docs/devtools/wdio/trace-mode) per sapere come abilitare la modalità trace e produrre questi artefatti.

Quando è presente un reporter Allure, gli artefatti della modalità trace vengono allegati automaticamente al report Allure, senza alcuna configurazione aggiuntiva:

- **`traceGranularity: 'test'`** — il `trace.zip` di ciascun test (`application/zip`, un download che si apre in `show-trace`), lo `screenshot` (`image/png`, inline) e il `video` (`video/webm`, inline) vengono allegati alla scheda di quel test. Questa è la granularità da usare per un report Allure per singolo test.
- **`traceGranularity: 'session'` / `'spec'`** — un trace che copre l'intera sessione/spec viene scritto su disco ed elencato nel [manifest degli artefatti](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest), ma **non** viene allegato alle singole schede dei test: un trace di sessione/spec viene finalizzato solo dopo l'esecuzione di tutti i suoi test, momento in cui le relative schede Allure sono già chiuse e non c'è alcun test aperto a cui allegarlo. Per renderlo comunque visibile, elabora il manifest nel tuo hook `onComplete`.

Supporto per adapter:

| Adapter | Meccanismo di allegato |
|---|---|
| **WebdriverIO** | Supporto nativo tramite `addAttachment` di `@wdio/allure-reporter`. |
| **Selenium** | Tramite `attachment()` di `allure-js-commons` — indipendente dal runtime, allega con qualsiasi adapter runner di Allure, a condizione che sia attivo un runtime `allure-js-commons`. |
| **Nightwatch** | **Solo produzione** — file e manifest vengono scritti ma non allegati inline (nessuna API di allegato Allure disponibile in tempo reale). |

**Trace viewer integrato.** Poiché l'archivio utilizza un formato su disco standard e portabile per trace viewer, il **trace viewer integrato** di un report Allure (Allure ≥ 2.35) può aprire il `trace.zip` allegato direttamente all'interno del report.

**Rumore nel report.** In modalità trace, la cattura esegue un `takeScreenshot` per ogni azione per costruire la timeline; Allure registra ogni comando WebDriver come step e uno screenshot per ogni `takeScreenshot`. Elimina questo eccesso con le opzioni del reporter stesso — gli allegati di trace / screenshot / video non ne sono influenzati:

```ts
reporters: [
  ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true
  }]
]
```