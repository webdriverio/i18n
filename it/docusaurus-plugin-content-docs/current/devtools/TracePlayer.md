---
id: trace-player
title: Trace Player
description: "Apri gli artefatti della modalità trace nel player show-trace per la riproduzione e la revisione offline, oppure caricali in altri visualizzatori di trace."
---

Il player `show-trace` apre qualsiasi trace prodotta in [Trace Mode](/docs/devtools/wdio/trace-mode) direttamente nell'interfaccia di WebdriverIO DevTools — una modalità **player** dedicata e di sola lettura per la riproduzione offline, la revisione e il confronto (diffing) da parte di agenti AI.

## Demo

![Trace Player Demo](/img/devtools/trace-player.gif)

## `show-trace` — il player ufficiale

Apri una trace nell'interfaccia DevTools:

```sh
show-trace trace-<sessionId>.zip          # bin on PATH after install
npx show-trace trace-<sessionId>.zip      # or via npx
pnpm show-trace trace-<sessionId>.zip     # from the devtools monorepo
```

Il bin `show-trace` è incluso in ciascun adapter (`@wdio/devtools-service`, `@wdio/nightwatch-devtools`, `@wdio/selenium-devtools`), quindi è disponibile in qualsiasi progetto che ne installi uno — nessuna dipendenza aggiuntiva. Avvia la stessa interfaccia DevTools in una modalità **player** dedicata e la apre nel tuo browser:

- **Elenco delle azioni** (a sinistra) — i comandi catturati, con una scheda **Metadata** accanto.
- **Pannello del browser** (al centro) — la pagina ricostruita per l'azione selezionata (vedi [DOM time-travel](#trace-player-features) più avanti). Quando la trace contiene un filmstrip/video, un interruttore **Snapshot / Screencast** passa al video registrato.
- **Striscia della timeline** (in alto) — un filmstrip di miniature nelle rispettive posizioni temporali reali, più una barra di scorrimento con una testina di riproduzione trascinabile. Fai clic su una miniatura o trascina in qualsiasi punto per spostarti.
- **Barra dei controlli** — riproduci/pausa, avanzamento passo-passo e velocità.
- **Schede del dock** (in basso) — **Source**, **Log**, **Console**, **Network**, **Errors** (ciascuna con un badge che ne indica il conteggio), più le schede **A11y** e **Transcript** esclusive del player. Fai clic su una riga di **Network** per visualizzare i dettagli della richiesta (header, tempi, stato).
- **Scorciatoie da tastiera** — `Space` riproduci/pausa, `←`/`→` passa da un'azione all'altra, `Home`/`End` salta alla prima/ultima, `,`/`.` cambia velocità, `/` mette a fuoco il filtro, `?` mostra tutte le scorciatoie.

> Accetta solo file `.zip`. Le stesse scorciatoie funzionano nella dashboard live (`←`/`→` scorrono l'elenco dei comandi, `?` mostra l'aiuto).

### Funzionalità del trace player

Oltre al semplice avanzamento tra fotogrammi statici, il player ricostruisce l'esecuzione e ne collega i dati:

- **DOM time-travel** — il pannello del browser riproduce il flusso delle mutazioni del DOM catturate (e lo stato dei campi dei form — `value` degli input, `checked` delle checkbox, inclusi i campi riportati a vuoto) per ricostruire il DOM *reale* al momento dell'azione selezionata, non solo uno screenshot. Anche i punti privi di un fotogramma catturato (asserzioni, attese statiche) mostrano il vero stato della pagina.
- **Scheda A11y + overlay degli elementi ("pick locator")** — la scheda **A11y** mostra l'albero di accessibilità (ruoli + nomi accessibili) catturato per il comando selezionato. Attiva l'overlay degli elementi nella barra del browser per evidenziare il contorno di ogni elemento con cui il test ha interagito; **passa il mouse** su un riquadro per evidenziarne la riga nell'albero A11y, **fai clic** per copiare un locator robusto. Il collegamento è bidirezionale — passando il mouse su una riga dell'albero, l'elemento viene evidenziato nello snapshot.
- **Scheda Transcript + Copy-for-LLM** — la scheda **Transcript** visualizza il file `transcript.md` dell'esecuzione (un riepilogo leggibile da persone e LLM, in ordine di esecuzione). Con un solo clic, **Copy** raggruppa il transcript con gli eventuali errori dei comandi falliti come contesto pronto da incollare in un LLM.
- **Marcatori di input nella timeline** — ogni azione è indicata sulla barra di scorrimento in base al tipo: le azioni da tastiera come una barra verde, le azioni del puntatore (che hanno un punto di contatto) come un punto blu, le altre come un semplice segno — così puoi leggere il ritmo delle interazioni a colpo d'occhio.
- **Annidamento Cucumber** — le esecuzioni Cucumber vengono annidate come Feature → Scenario → Step nell'albero delle azioni, in modo che gli step si trovino sotto il relativo scenario e feature.
- **Scorrimento con filmstrip denso** — con [`filmstrip`](/docs/devtools/wdio/trace-mode#dense-filmstrip--filmstrip) abilitato, la timeline include i fotogrammi densi per uno scorrimento fluido, invece di salti di un fotogramma per azione.

## Altri visualizzatori di trace

Poiché l'artefatto utilizza un formato su disco portabile e standard per i visualizzatori di trace, lo stesso `.zip` (o directory) può essere aperto anche in **visualizzatori di trace standalone** compatibili e — condividendo lo stesso formato — all'interno del **visualizzatore di trace integrato in un report Allure** (Allure ≥ 2.35). Questi mostrano:
- Timeline delle azioni con i relativi tempi
- Screenshot per ogni azione
- Snapshot degli elementi
- Waterfall di rete
- Eventi della console

Per l'utilizzo da parte di LLM / agenti, leggi direttamente `transcript.md` — è una resa Markdown compatta delle azioni con selettori e valori.

La pipeline delle trace (mappatura delle azioni, serializzatori degli snapshot, writer NDJSON, writer zip / directory) è condivisa tra gli adapter tramite [`@wdio/devtools-core`](https://github.com/webdriverio/devtools/tree/main/packages/core), quindi la struttura dell'artefatto è identica indipendentemente dall'adapter che l'ha prodotto — vedi [Cross-Framework Support](/docs/devtools/cross-framework).