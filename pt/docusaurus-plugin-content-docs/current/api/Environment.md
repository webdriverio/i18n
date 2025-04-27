---
id: environment
title: Variáveis de Ambiente
---

O WebdriverIO define as seguintes variáveis de ambiente dentro de cada worker:

## `NODE_ENV`

Definido como `'test'` se não estiver já definido como outra coisa.

## `WDIO_LOG_LEVEL`

Pode ser definido com os valores `trace`, `debug`, `info`, `warn`, `error`, `silent` para escrever logs com os detalhes correspondentes. Tem prioridade sobre o valor `logLevel` passado.

## `WDIO_WORKER_ID`

Um id único que ajuda a identificar o processo do worker. Tem o formato `{number}-{number}` onde o primeiro número identifica a capability e o segundo o arquivo de spec que a capability está executando, por exemplo, `0-5` indica um worker que executa o 6º arquivo de spec para a primeira capability.