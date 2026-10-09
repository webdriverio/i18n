---
id: allure
title: Allure-integration
description: "Bifoga DevTools-artefakter från trace-läget, såsom trace-zipfiler, skärmbilder och videor, automatiskt till din Allure-rapport."
---

Artefakter från trace-läget — trace-zipfilen samt varje tests egen skärmbild och video — bifogas automatiskt till en Allure-rapport, så att du kan öppna dem direkt från rapporten. Se [Trace Mode](/docs/devtools/wdio/trace-mode) för hur du aktiverar trace-läget och skapar dessa artefakter.

När en Allure-reporter finns bifogas artefakterna från trace-läget automatiskt till Allure-rapporten — ingen extra konfiguration behövs:

- **`traceGranularity: 'test'`** — varje tests `trace.zip` (`application/zip`, en nedladdning som öppnas i `show-trace`), `screenshot` (`image/png`, inline) och `video` (`video/webm`, inline) bifogas till det testets kort. Det är den här granulariteten du ska använda för en Allure-rapport per test.
- **`traceGranularity: 'session'` / `'spec'`** — en trace som spänner över en session/spec skrivs till disk och listas i [artefaktmanifestet](/docs/devtools/wdio/trace-mode#artifacts-manifest--emitartifactsmanifest), men bifogas **inte** till enskilda testkort: en session-/spec-trace färdigställs först efter att alla dess tester har körts, och vid det laget är deras Allure-kort redan stängda och det finns inget öppet test att bifoga till. Om du ändå vill visa den kan du efterbearbeta manifestet i din egen `onComplete`-hook.

Stöd per adapter:

| Adapter | Bifogningsmekanism |
|---|---|
| **WebdriverIO** | Förstklassigt stöd via `addAttachment` i `@wdio/allure-reporter`. |
| **Selenium** | Via `attachment()` i `allure-js-commons` — oberoende av körmiljö, bifogar under vilken Allure-runner-adapter som helst, förutsatt att en `allure-js-commons`-runtime är aktiv. |
| **Nightwatch** | **Endast generering** — filer och manifest skrivs men bifogas inte inline (inget live-API för bifogning i Allure). |

**Inbäddad trace-visare.** Eftersom arkivet använder ett portabelt, standardiserat diskformat för trace-visare kan en Allure-rapports egen **inbäddade trace-visare** (Allure ≥ 2.35) öppna den bifogade `trace.zip` direkt i rapporten.

**Brus i rapporten.** I trace-läget tar inspelningen en `takeScreenshot` per åtgärd för att bygga tidslinjen; Allure loggar varje WebDriver-kommando som ett steg och en skärmbild per `takeScreenshot`. Tysta det flödet med reporterns egna alternativ — bifogade trace-filer, skärmbilder och videor påverkas inte:

```ts
reporters: [
  ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: true
  }]
]
```