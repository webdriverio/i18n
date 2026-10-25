---
id: preserve-and-rerun
title: Preserve & Rerun (Confronto)
description: "Cattura uno snapshot di un'esecuzione fallita e riesegui il test con un clic grazie a Preserve & Rerun, poi confronta le due esecuzioni per scoprire cosa è cambiato."
---

Quando un test fallisce, il consueto ciclo di debug è: rieseguirlo, poi confrontare due muri di log per capire cosa è cambiato. Preserve & Rerun riduce tutto questo a un singolo clic. **Cattura uno snapshot dell'esecuzione fallita e riesegue il test con un'unica azione**, poi mostra entrambe le esecuzioni affiancate in una vista **Compare** allineata comando per comando, così puoi vedere esattamente dove le due esecuzioni sono divergenti senza dover rileggere nulla.

Questo è il modo più rapido per diagnosticare un test instabile (flaky): il comando che si è comportato diversamente tra l'esecuzione riuscita e quella fallita viene evidenziato per te, insieme all'asserzione che non è stata soddisfatta.

Disponibile su ogni adapter: **WebdriverIO**, **[Selenium WebDriver](/docs/devtools/selenium)** (Node.js e Python) e **[Nightwatch.js](/docs/devtools/nightwatch)**. Il filtro di riesecuzione varia in base al framework (WebdriverIO `--spec` più un grep, Selenium `--grep` / `--testNamePattern`, Nightwatch `DEVTOOLS_RERUN_LABEL`, node id di pytest); la dashboard è identica.

## Demo

![Preserve & Rerun Demo](/img/devtools/preserve-rerun.gif)

## Come funziona

1. Esegui i tuoi test normalmente. Quando un test termina in stato **failed**, passa il mouse sulla sua riga nella barra laterale.
2. Accanto al normale pulsante di riesecuzione ▶ compare un'icona bug-play (🐞▶). Viene mostrata solo sulle righe di test/suite fallite, ovunque sia già supportata una semplice riesecuzione (ad es. gli scenari Cucumber sulla riga dello scenario, i test Mocha/Jasmine sulla riga del test o della suite).
3. Fai clic su di essa. DevTools cattura uno snapshot dell'esecuzione fallita, poi rilancia solo quel test.
4. Si apre la scheda **Compare** con le due esecuzioni allineate per comando. Il punto di divergenza e l'errore dell'asserzione (**Expected vs Received**) vengono messi in evidenza.

## Funzionalità principali

- **Snapshot + riesecuzione con un clic** - Conserva l'esecuzione fallita e rieseguila con un'unica azione, senza modifiche al codice né riavvio dell'intera suite.
- **Allineamento comando per comando** - Entrambe le esecuzioni vengono disposte affiancate e allineate per comando, così le differenze risaltano immediatamente.
- **Punto di errore evidenziato** - Ti porta direttamente al comando in cui le due esecuzioni sono divergenti.
- **Diff dell'asserzione** - Mostra l'asserzione non soddisfatta con Expected vs Received affiancati.
- **Finestra separata** - Apri il confronto in una finestra separata e con tema dedicato per una visualizzazione più ampia.
- **Analisi dei test instabili** - Scopri quale comando è cambiato tra un'esecuzione riuscita e una fallita senza rileggere i log.

## Limitazioni

- **Cucumber**: la riesecuzione per singolo step è disabilitata perché il filtro `--name` di Cucumber agisce sugli scenari, non sui singoli step Gherkin. Preserve & Rerun a livello di scenario funziona comunque.