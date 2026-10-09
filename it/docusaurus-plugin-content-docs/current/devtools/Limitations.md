---
id: limitations
title: Limitazioni della modalità trace
description: "Scopri cosa la modalità trace di DevTools deliberatamente non acquisisce e le limitazioni note degli adapter WebdriverIO, Selenium e Nightwatch."
---

Cosa la [modalità trace](/docs/devtools/wdio/trace-mode) salta deliberatamente, oltre alle lacune note tra i vari adapter.

## Cosa salta la modalità trace

- **Finestra dell'interfaccia DevTools** — non viene aperta alcuna istanza di Chrome per la dashboard.
- **Binding della porta del backend** — non viene riservata alcuna porta localhost (comportamento uniforme tra tutti e tre gli adapter a partire dalla v1.2+).
- **`screencast.enabled`** — la registrazione continua `.webm` della modalità live viene ignorata in modalità trace (viene registrato un avviso nel log). La modalità trace registra invece nell'archivio un [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) denso **per impostazione predefinita** (imposta `filmstrip: false` per ottenere un frame per azione), oltre a segmenti [`video`](/docs/devtools/wdio/trace-mode#per-test-screenshot--video--screenshot--video) per singolo test quando abilitati. I campi di **ottimizzazione** dello screencast (`quality`, `maxWidth`, `pollIntervalMs`, …) si applicano comunque a qualunque registratore sia in esecuzione.
- **Dump `wdio-trace-<sessionId>.json`** — rimosso completamente. Il JSON monolitico legacy che la modalità live di WDIO scriveva in passato non esiste più; la modalità live ora invia i dati in streaming alla dashboard e non scrive nulla su disco, e il `trace.zip` è l'unico artefatto di trace.

## Limitazioni note

- **Nightwatch BDD `describe/it`** — `traceGranularity: 'test'` si riduce a un **unico segmento con ambito di sessione**: Nightwatch esegue i singoli `it` internamente senza un hook per test visibile al plugin, quindi il segmento viene associato al primo test. L'acquisizione dei metadati (stato per singolo testcase nel manifest) non è interessata, ma l'associazione di trace/screenshot/video per singolo `it` e la conservazione sensibile ai retry degradano all'ambito di sessione per questa interfaccia. Le interfacce **exports-object** e **Cucumber** di Nightwatch espongono hook per scenario/per test e ottengono una vera segmentazione per test. (WebdriverIO mocha/cucumber e Selenium mocha non sono interessati.)
- **Conservazione sensibile ai retry in Nightwatch** — funziona solo `retain-on-failure`; le altre policy sensibili ai retry degradano perché Nightwatch riesegue internamente un testcase con `--retries` senza riattivare gli hook per test. Vedi [Conservazione](/docs/devtools/wdio/trace-mode#retention--tracepolicy).
- **Allegati Allure in Nightwatch** — `screenshot`/`video` per singolo test vengono solo prodotti (file + manifest), non allegati inline; vedi [Integrazione con Allure](/docs/devtools/allure).
- **Video/filmstrip su browser diversi da Chrome** — sui browser privi di un canale push CDP il registratore interroga periodicamente `takeScreenshot`, il che aggiunge round-trip WebDriver e (con Allure) inonda il log degli step; abbinalo alle opzioni del reporter per silenziare gli step.