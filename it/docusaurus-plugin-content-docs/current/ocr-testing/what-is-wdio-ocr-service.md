---
id: ocr-testing
title: Test OCR
description: "Individua e interagisci con gli elementi tramite il loro testo visibile su app web e mobile con il servizio OCR quando i selettori standard non sono sufficienti."
---

I test automatizzati su app mobile native e siti desktop possono essere particolarmente impegnativi quando si ha a che fare con elementi privi di identificatori univoci. I [selettori standard di WebdriverIO](https://webdriver.io/docs/selectors) potrebbero non essere sempre d'aiuto. Entra nel mondo di `@wdio/ocr-service`, un potente servizio che sfrutta l'OCR ([Riconoscimento Ottico dei Caratteri](https://en.wikipedia.org/wiki/Optical_character_recognition)) per cercare, attendere e interagire con gli elementi sullo schermo in base al loro **testo visibile**.

I seguenti comandi personalizzati verranno forniti e aggiunti all'oggetto `browser/driver`, così avrai a disposizione gli strumenti giusti per svolgere il tuo lavoro.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Come funziona

Questo servizio

1. crea uno screenshot del tuo schermo/dispositivo. (Se necessario, puoi fornire un haystack, che può essere un elemento o un oggetto rettangolo, per individuare un'area specifica. Consulta la documentazione di ciascun comando.)
1. ottimizza il risultato per l'OCR trasformando lo screenshot in bianco e nero con un contrasto elevato (il contrasto elevato è necessario per evitare molto rumore di fondo nell'immagine. Questo può essere personalizzato per ogni comando.)
1. utilizza il [Riconoscimento Ottico dei Caratteri](https://en.wikipedia.org/wiki/Optical_character_recognition) di [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) per ottenere tutto il testo dallo schermo ed evidenziare tutto il testo trovato su un'immagine. Può supportare diverse lingue, che puoi trovare [qui.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. utilizza la Logica Fuzzy di [Fuse.js](https://fusejs.io/) per trovare stringhe che sono _approssimativamente uguali_ a un determinato pattern (invece che esattamente uguali). Ciò significa, ad esempio, che il valore di ricerca `Username` può trovare anche il testo `Usename` o viceversa.
1. fornisce una procedura guidata da cli (`npx ocr-service`) per validare le tue immagini e recuperare il testo tramite il terminale

Un esempio dei passaggi 1, 2 e 3 è visibile in questa immagine

![Process steps](/img/ocr/processing-steps.jpg)

Funziona con **ZERO** dipendenze di sistema (oltre a quelle utilizzate da WebdriverIO), ma se necessario può funzionare anche con un'installazione locale di [Tesseract](https://tesseract-ocr.github.io/tessdoc/), che ridurrà drasticamente il tempo di esecuzione! (Consulta anche la sezione [Test Execution Optimization](#test-execution-optimization) per scoprire come velocizzare i tuoi test.)

Entusiasta? Inizia a usarlo oggi stesso seguendo la guida [Getting Started](./getting-started).

:::caution Importante
Ci sono diversi motivi per cui potresti non ottenere un output di buona qualità da Tesseract. Uno dei motivi principali, che potrebbe riguardare la tua app e questo modulo, è la mancanza di una corretta distinzione cromatica tra il testo da trovare e lo sfondo. Ad esempio, un testo bianco su sfondo scuro può essere trovato _facilmente_, mentre un testo chiaro su sfondo bianco o un testo scuro su sfondo scuro difficilmente può essere trovato.

Consulta anche [questa pagina](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) per maggiori informazioni da parte di Tesseract.

Inoltre, non dimenticare di leggere le [FAQ](./ocr-faq).
:::