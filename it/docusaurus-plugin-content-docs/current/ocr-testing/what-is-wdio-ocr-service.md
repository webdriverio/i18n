---
id: ocr-testing
title: Test OCR
---

Il testing automatizzato su app native per dispositivi mobili e siti desktop può essere particolarmente difficile quando si tratta di elementi privi di identificatori univoci. I [selettori WebdriverIO](https://webdriver.io/docs/selectors) standard potrebbero non sempre essere d'aiuto. Entra nel mondo del `@wdio/ocr-service`, un potente servizio che sfrutta l'OCR ([Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition)) per cercare, attendere e interagire con elementi a schermo in base al loro **testo visibile**.

I seguenti comandi personalizzati saranno forniti e aggiunti all'oggetto `browser/driver` in modo da ottenere gli strumenti giusti per svolgere il tuo lavoro.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Come funziona

Questo servizio:

1. crea uno screenshot del tuo schermo/dispositivo. (Se necessario, puoi fornire un haystack, che può essere un elemento o un oggetto rettangolo, per identificare un'area specifica. Consulta la documentazione per ogni comando.)
1. ottimizza il risultato per l'OCR trasformando lo screenshot in bianco/nero con uno screenshot ad alto contrasto (l'alto contrasto è necessario per prevenire molto rumore di fondo nell'immagine. Questo può essere personalizzato per comando.)
1. utilizza il [Riconoscimento Ottico dei Caratteri](https://en.wikipedia.org/wiki/Optical_character_recognition) da [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) per ottenere tutto il testo dallo schermo e evidenziare tutto il testo trovato su un'immagine. Può supportare diverse lingue che possono essere trovate [qui.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. utilizza la Logica Fuzzy da [Fuse.js](https://fusejs.io/) per trovare stringhe che sono _approssimativamente uguali_ a un dato pattern (piuttosto che esattamente). Questo significa, ad esempio, che il valore di ricerca `Username` può anche trovare il testo `Usename` o viceversa.
1. Fornisce un wizard da riga di comando (`npx ocr-service`) per validare le tue immagini e recuperare testo attraverso il tuo terminale

Un esempio dei passaggi 1, 2 e 3 può essere trovato in questa immagine

![Passaggi del processo](/img/ocr/processing-steps.jpg)

Funziona con **ZERO** dipendenze di sistema (oltre a quelle utilizzate da WebdriverIO), ma se necessario può anche funzionare con un'installazione locale di [Tesseract](https://tesseract-ocr.github.io/tessdoc/) che ridurrà drasticamente il tempo di esecuzione! (Vedi anche [Ottimizzazione dell'esecuzione dei test](#test-execution-optimization) su come velocizzare i tuoi test.)

Entusiasta? Inizia a usarlo oggi seguendo la guida [Iniziare](./getting-started).

:::caution Importante
Ci sono una varietà di motivi per cui potresti non ottenere un output di buona qualità da Tesseract. Uno dei motivi più importanti che potrebbero essere correlati alla tua app e a questo modulo potrebbe essere il fatto che non c'è una corretta distinzione di colore tra il testo che deve essere trovato e lo sfondo. Ad esempio, il testo bianco su uno sfondo scuro può essere trovato _facilmente_, ma il testo chiaro su uno sfondo bianco o il testo scuro su uno sfondo scuro può essere difficile da trovare.

Vedi anche [questa pagina](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) per ulteriori informazioni da Tesseract.

Non dimenticare di leggere anche le [FAQ](./ocr-faq).
:::