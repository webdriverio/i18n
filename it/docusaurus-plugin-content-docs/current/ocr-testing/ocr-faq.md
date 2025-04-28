---
id: ocr-faq
title: Domande Frequenti
---

## I miei test sono molto lenti

Quando utilizzi questo `@wdio/ocr-service` non lo stai utilizzando per velocizzare i tuoi test, lo usi perché hai difficoltà a localizzare elementi nella tua app web/mobile e vuoi un modo più semplice per localizzarli. E tutti speriamo di sapere che quando vuoi qualcosa, perdi qualcos'altro. **Ma....**, c'è un modo per far eseguire il `@wdio/ocr-service` più velocemente del normale. Maggiori informazioni su questo si possono trovare [qui](./more-test-optimization).

## Posso usare i comandi di questo servizio con i comandi/selettori predefiniti di WebdriverIO?

Sì, puoi combinare i comandi per rendere il tuo script ancora più potente! Il consiglio è di utilizzare i comandi/selettori predefiniti di WebdriverIO il più possibile e utilizzare questo servizio solo quando non riesci a trovare un selettore univoco o il tuo selettore diventerebbe troppo fragile.

## Il mio testo non viene trovato, come è possibile?

Prima di tutto, è importante capire come funziona il processo OCR in questo modulo, quindi leggi [questa](./ocr-testing) pagina. Se ancora non riesci a trovare il tuo testo, potresti provare le seguenti cose.

### L'area dell'immagine è troppo grande

Quando il modulo deve elaborare un'area grande dello screenshot potrebbe non trovare il testo. Puoi fornire un'area più piccola fornendo un haystack quando usi un comando. Controlla i [comandi](./ocr-click-on-text) per vedere quali comandi supportano la fornitura di un haystack.

### Il contrasto tra il testo e lo sfondo non è corretto

Questo significa che potresti avere testo chiaro su sfondo bianco o testo scuro su sfondo scuro. Questo può comportare l'impossibilità di trovare il testo. Negli esempi seguenti puoi vedere che il testo `Why WebdriverIO?` è bianco e circondato da un pulsante grigio. In questo caso, ciò comporterà il mancato ritrovamento del testo `Why WebdriverIO?`. Aumentando il contrasto per il comando specifico trova il testo e può cliccarlo, vedi la seconda immagine.

```js
await driver.ocrClickOnText({
    haystack: { height: 44, width: 1108, x: 129, y: 590 },
    text: "WebdriverIO?",
    // // Con il contrasto predefinito di 0.25, il testo non viene trovato
    contrast: 1,
});
```

![Problemi di contrasto](/img/ocr/increased-contrast.jpg)

## Perché il mio elemento viene cliccato ma la tastiera sui miei dispositivi mobili non compare mai?

Questo può accadere su alcuni campi di testo dove il clic è determinato troppo lungo e considerato un tocco prolungato. Puoi utilizzare l'opzione `clickDuration` su [`ocrClickOnText`](./ocr-click-on-text) e [`ocrSetValue`](./ocr-set-value) per alleviare questo problema. Vedi [qui](./ocr-click-on-text#options).

## Questo modulo può restituire più elementi come normalmente può fare WebdriverIO?

No, attualmente questo non è possibile. Se il modulo trova più elementi che corrispondono al selettore fornito, troverà automaticamente l'elemento che ha il punteggio di corrispondenza più alto.

## Posso automatizzare completamente la mia app con i comandi OCR forniti da questo servizio?

Non l'ho mai fatto, ma in teoria dovrebbe essere possibile. Facci sapere se ci riesci ☺️.

## Vedo un file aggiuntivo chiamato `{languageCode}.traineddata` essere aggiunto, cos'è?

`{languageCode}.traineddata` è un file di dati linguistici utilizzato da Tesseract. Contiene i dati di addestramento per la lingua selezionata, che include le informazioni necessarie affinché Tesseract riconosca efficacemente caratteri e parole inglesi.

### Contenuti di `{languageCode}.traineddata`

Il file generalmente contiene:

1. **Dati del set di caratteri:** Informazioni sui caratteri nella lingua inglese.
1. **Modello linguistico:** Un modello statistico di come i caratteri formano parole e le parole formano frasi.
1. **Estrattori di funzionalità:** Dati su come estrarre caratteristiche dalle immagini per il riconoscimento dei caratteri.
1. **Dati di addestramento:** Dati derivati dall'addestramento di Tesseract su un ampio set di immagini di testo inglese.

### Perché `{languageCode}.traineddata` è importante?

1. **Riconoscimento della lingua:** Tesseract si basa su questi file di dati addestrati per riconoscere e elaborare accuratamente il testo in una lingua specifica. Senza `{languageCode}.traineddata`, Tesseract non sarebbe in grado di riconoscere il testo inglese.
1. **Prestazioni:** La qualità e l'accuratezza dell'OCR sono direttamente correlate alla qualità dei dati di addestramento. L'utilizzo del file di dati addestrato corretto garantisce che il processo OCR sia il più accurato possibile.
1. **Compatibilità:** Assicurarsi che il file `{languageCode}.traineddata` sia incluso nel tuo progetto rende più facile replicare l'ambiente OCR su diversi sistemi o macchine dei membri del team.

### Versionamento di `{languageCode}.traineddata`

L'inclusione di `{languageCode}.traineddata` nel tuo sistema di controllo delle versioni è consigliata per i seguenti motivi:

1. **Coerenza:** Garantisce che tutti i membri del team o gli ambienti di distribuzione utilizzino esattamente la stessa versione dei dati di addestramento, portando a risultati OCR coerenti in diversi ambienti.
1. **Riproducibilità:** Memorizzare questo file nel controllo delle versioni rende più facile riprodurre i risultati quando si esegue il processo OCR in un momento successivo o su una macchina diversa.
1. **Gestione delle dipendenze:** Includerlo nel sistema di controllo delle versioni aiuta nella gestione delle dipendenze e garantisce che qualsiasi configurazione o ambiente includa i file necessari per il corretto funzionamento del progetto.

## C'è un modo semplice per vedere quale testo viene trovato sul mio schermo senza eseguire un test?

Sì, puoi usare il nostro wizard CLI per questo. La documentazione può essere trovata [qui](./cli-wizard)