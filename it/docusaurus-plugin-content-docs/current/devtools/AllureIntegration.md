---
id: allure
title: Integrazione con Allure
description: "Allega automaticamente al tuo report Allure gli artefatti della modalità trace di DevTools, come gli zip delle trace, gli screenshot e i video."
---

Gli artefatti della modalità trace — lo zip della trace e lo screenshot e il video di ciascun test — vengono allegati automaticamente a un report Allure, così puoi aprirli direttamente dal report. Consulta [Trace Mode](/docs/devtools/wdio/trace-mode) per sapere come abilitare la modalità trace e produrre questi artefatti.

Quando è presente un reporter Allure, gli artefatti della modalità trace vengono allegati automaticamente al report Allure, senza alcuna configurazione aggiuntiva:

- **`traceGranularity: 'test'`** — il `trace.zip` di ciascun test (`application/zip`, un download che si apre in `show-trace`), lo `screenshot` (`image/png`, inline) e il `video` (`video/webm`, inline) vengono allegati alla scheda di quel test. Questa è la granularità da usare per un report Allure per singolo test. La codifica del `video` per singolo test richiede `ffmpeg` nel `PATH`.
- **`traceGranularity: 'session'` / `'spec'`** — una trace che copre l'intera sessione/spec viene scritta su disco ed elencata nel [manifest degli artefatti](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest), ma **non** viene allegata alle schede dei singoli test: una trace di sessione/spec viene finalizzata solo dopo l'esecuzione di tutti i suoi test, momento in cui le relative schede Allure sono già chiuse e non c'è alcun test aperto a cui allegarla. Per renderla comunque visibile, elabora il manifest nel tuo hook `onComplete`.

Supporto per adapter:

| Adapter | Meccanismo di allegato |
|---|---|
| **WebdriverIO** | Nativo tramite `addAttachment` di `@wdio/allure-reporter`. |
| **Selenium** | Tramite `attachment()` di `allure-js-commons` — indipendente dal runtime, allega con qualsiasi adapter runner di Allure, a condizione che sia attivo un runtime `allure-js-commons`. |
| **Nightwatch** | **Solo produzione** — file e manifest vengono scritti ma non allegati inline (nessuna API di allegato Allure in tempo reale). |

**Trace viewer integrato.** Poiché l'archivio utilizza un formato su disco portabile e standard per i trace viewer, il **trace viewer integrato** di un report Allure (Allure ≥ 2.35) può aprire il `trace.zip` allegato direttamente all'interno del report.

**Rumore nel report.** In modalità trace, la cattura esegue un `takeScreenshot` per ogni azione per costruire la timeline; Allure registra ogni comando WebDriver come step e uno screenshot per ogni `takeScreenshot`. Elimina questo flusso con le opzioni del reporter stesso — gli allegati di trace / screenshot / video non ne sono influenzati:

```ts
reporters: [
  ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true
  }]
]
```