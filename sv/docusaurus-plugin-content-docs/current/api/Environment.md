---
id: environment
title: Miljövariabler
---

WebdriverIO sätter följande miljövariabler inom varje arbetare:

## `NODE_ENV`

Sätts till `'test'` om den inte redan är inställd på något annat.

## `WDIO_LOG_LEVEL`

Kan ställas in på värdena `trace`, `debug`, `info`, `warn`, `error`, `silent` för att skriva loggar med motsvarande detaljer. Har prioritet över det angivna `logLevel`-värdet.

## `WDIO_WORKER_ID`

Ett unikt id som hjälper till att identifiera arbetarprocessen. Det har formatet `{number}-{number}` där det första numret identifierar kapabiliteten och det andra specifikationsfilen som kapabiliteten kör, t.ex. `0-5` indikerar en arbetare som kör den 6:e specifikationsfilen för den första kapabiliteten.