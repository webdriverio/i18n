---
id: environment
title: Variabili d'Ambiente
---

WebdriverIO imposta le seguenti variabili d'ambiente all'interno di ogni worker:

## `NODE_ENV`

Impostato a `'test'` se non è già impostato a qualcos'altro.

## `WDIO_LOG_LEVEL`

Può essere impostato ai valori `trace`, `debug`, `info`, `warn`, `error`, `silent` per scrivere log con i dettagli corrispondenti. Ha priorità sul valore `logLevel` passato.

## `WDIO_WORKER_ID`

Un id unico che aiuta a identificare il processo worker. Ha il formato `{number}-{number}` dove il primo numero identifica la capacità e il secondo il file spec che quella capacità sta eseguendo, ad esempio `0-5` indica un worker che esegue il sesto file spec per la prima capacità.