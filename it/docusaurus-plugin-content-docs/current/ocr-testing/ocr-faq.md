---
id: ocr-faq
title: Domande frequenti
description: "Trova le risposte alle domande più comuni su test OCR lenti, testo non trovato e sulla combinazione dei comandi OCR con i selettori standard."
---

## I miei test sono molto lenti

Quando utilizzi `@wdio/ocr-service` non lo fai per velocizzare i tuoi test, ma perché hai difficoltà a individuare gli elementi nella tua app web/mobile e desideri un modo più semplice per trovarli. E speriamo che tutti sappiamo che quando si vuole qualcosa, si perde qualcos'altro. **Ma...**, esiste un modo per far eseguire `@wdio/ocr-service` più velocemente del normale. Ulteriori informazioni al riguardo sono disponibili [qui](./more-test-optimization).

## Posso usare i comandi di questo servizio insieme ai comandi/selettori predefiniti di WebdriverIO?

Sì, puoi combinare i comandi per rendere il tuo script ancora più potente! Il consiglio è di utilizzare il più possibile i comandi/selettori predefiniti di WebdriverIO e di usare questo servizio solo quando non riesci a trovare un selettore univoco o quando il tuo selettore diventerebbe troppo fragile.

## Il mio testo non viene trovato, com'è possibile?

Innanzitutto, è importante capire come funziona il processo OCR in questo modulo, quindi leggi [questa](./ocr-testing) pagina. Se ancora non riesci a trovare il tuo testo, puoi provare le seguenti soluzioni.

### L'area dell'immagine è troppo grande

Quando il modulo deve elaborare un'area estesa dello screenshot, potrebbe non trovare il testo. Puoi fornire un'area più piccola specificando un haystack quando utilizzi un comando. Consulta i [comandi](./ocr-click-on-text) per verificare quali supportano la specifica di un haystack.

### Il contrasto tra il testo e lo sfondo non è corretto

Ciò significa che potresti avere un testo chiaro su uno sfondo bianco o un testo scuro su uno sfondo scuro. Questo può impedire di trovare il testo. Negli esempi seguenti puoi vedere che il testo `Why WebdriverIO?` è bianco e circondato da un pulsante grigio. In questo caso, il testo `Why WebdriverIO?` non verrà trovato. Aumentando il contrasto per il comando specifico, il testo viene trovato ed è possibile cliccarci sopra, come mostrato nella seconda immagine.

```js
await driver.ocrClickOnText({
    haystack: { height: 44, width: 1108, x: 129, y: 590 },
    text: "WebdriverIO?",
    // // Con il contrasto predefinito di 0.25, il testo non viene trovato
    contrast: 1,
});
```

![Contrast issues](/img/ocr/increased-contrast.jpg)

## Perché il mio elemento viene cliccato ma la tastiera sui miei dispositivi mobili non compare mai?

Questo può accadere su alcuni campi di testo in cui il clic viene considerato troppo lungo e interpretato come un tocco prolungato (long tap). Puoi utilizzare l'opzione `clickDuration` su [`ocrClickOnText`](./ocr-click-on-text) e [`ocrSetValue`](./ocr-set-value) per risolvere il problema. Vedi [qui](./ocr-click-on-text#options).

## Questo modulo può restituire più elementi come normalmente fa WebdriverIO?

No, al momento non è possibile. Se il modulo trova più elementi che corrispondono al selettore fornito, troverà automaticamente l'elemento con il punteggio di corrispondenza più alto.

## Posso automatizzare completamente la mia app con i comandi OCR forniti da questo servizio?

Non l'ho mai fatto, ma in teoria dovrebbe essere possibile. Facci sapere se ci riesci ☺️.

## Vedo che viene aggiunto un file aggiuntivo chiamato `{languageCode}.traineddata`, di cosa si tratta?

`{languageCode}.traineddata` è un file di dati linguistici utilizzato da Tesseract. Contiene i dati di addestramento per la lingua selezionata, che includono le informazioni necessarie affinché Tesseract riconosca efficacemente i caratteri e le parole inglesi.

### Contenuto di `{languageCode}.traineddata`

Il file contiene generalmente:

1. **Dati del set di caratteri:** Informazioni sui caratteri della lingua inglese.
1. **Modello linguistico:** Un modello statistico di come i caratteri formano le parole e le parole formano le frasi.
1. **Estrattori di caratteristiche:** Dati su come estrarre le caratteristiche dalle immagini per il riconoscimento dei caratteri.
1. **Dati di addestramento:** Dati derivati dall'addestramento di Tesseract su un ampio insieme di immagini di testo in inglese.

### Perché `{languageCode}.traineddata` è importante?

1. **Riconoscimento della lingua:** Tesseract si basa su questi file di dati addestrati per riconoscere ed elaborare con precisione il testo in una lingua specifica. Senza `{languageCode}.traineddata`, Tesseract non sarebbe in grado di riconoscere il testo in inglese.
1. **Prestazioni:** La qualità e la precisione dell'OCR sono direttamente correlate alla qualità dei dati di addestramento. L'utilizzo del file di dati addestrati corretto garantisce che il processo OCR sia il più accurato possibile.
1. **Compatibilità:** Assicurarsi che il file `{languageCode}.traineddata` sia incluso nel progetto rende più semplice replicare l'ambiente OCR su sistemi diversi o sulle macchine dei membri del team.

### Versionamento di `{languageCode}.traineddata`

Si consiglia di includere `{languageCode}.traineddata` nel sistema di controllo versione per i seguenti motivi:

1. **Coerenza:** Garantisce che tutti i membri del team o gli ambienti di deployment utilizzino esattamente la stessa versione dei dati di addestramento, ottenendo risultati OCR coerenti in ambienti diversi.
1. **Riproducibilità:** Conservare questo file nel controllo versione rende più semplice riprodurre i risultati quando si esegue il processo OCR in un secondo momento o su una macchina diversa.
1. **Gestione delle dipendenze:** Includerlo nel sistema di controllo versione aiuta nella gestione delle dipendenze e garantisce che qualsiasi configurazione dell'ambiente includa i file necessari affinché il progetto funzioni correttamente.

## Esiste un modo semplice per vedere quale testo viene trovato sul mio schermo senza eseguire un test?

Sì, puoi utilizzare il nostro wizard CLI. La documentazione è disponibile [qui](./cli-wizard)