---
id: environment
title: Umgebungsvariablen
---

WebdriverIO setzt die folgenden Umgebungsvariablen innerhalb jedes Workers:

## `NODE_ENV`

Wird auf `'test'` gesetzt, wenn es nicht bereits auf etwas anderes gesetzt ist.

## `WDIO_LOG_LEVEL`

Kann auf die Werte `trace`, `debug`, `info`, `warn`, `error`, `silent` gesetzt werden, um Logs mit entsprechenden Details zu schreiben. Hat Priorität über den übergebenen `logLevel`-Wert.

## `WDIO_WORKER_ID`

Eine eindeutige ID, die hilft, den Worker-Prozess zu identifizieren. Sie hat das Format `{number}-{number}`, wobei die erste Zahl die Capability und die zweite die Spec-Datei identifiziert, die diese Capability ausführt, z.B. bedeutet `0-5` einen Worker, der die 6. Spec-Datei für die erste Capability ausführt.