---
id: environment
title: Zmienne Środowiskowe
---

WebdriverIO ustawia następujące zmienne środowiskowe w każdym procesie roboczym:

## `NODE_ENV`

Ustawione na `'test'`, jeśli nie zostało już ustawione na coś innego.

## `WDIO_LOG_LEVEL`

Może przyjmować wartości `trace`, `debug`, `info`, `warn`, `error`, `silent`, aby zapisywać logi z odpowiednim poziomem szczegółowości. Ma priorytet nad przekazaną wartością `logLevel`.

## `WDIO_WORKER_ID`

Unikalny identyfikator, który pomaga zidentyfikować proces roboczy. Ma format `{number}-{number}`, gdzie pierwsza liczba identyfikuje funkcjonalność, a druga plik specyfikacji, który ta funkcjonalność uruchamia, np. `0-5` wskazuje na proces roboczy uruchamiający 6. plik specyfikacji dla pierwszej funkcjonalności.