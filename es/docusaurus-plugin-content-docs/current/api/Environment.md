---
id: environment
title: Variables de Entorno
---

WebdriverIO establece las siguientes variables de entorno dentro de cada worker:

## `NODE_ENV`

Se establece como `'test'` si no está ya configurado con otro valor.

## `WDIO_LOG_LEVEL`

Puede establecerse con los valores `trace`, `debug`, `info`, `warn`, `error`, `silent` para escribir logs con los detalles correspondientes. Tiene prioridad sobre el valor `logLevel` pasado.

## `WDIO_WORKER_ID`

Un id único que ayuda a identificar el proceso worker. Tiene el formato `{number}-{number}` donde el primer número identifica la capacidad y el segundo el archivo de especificación que está ejecutando esa capacidad, por ejemplo, `0-5` indica un worker que ejecuta el sexto archivo de especificación para la primera capacidad.