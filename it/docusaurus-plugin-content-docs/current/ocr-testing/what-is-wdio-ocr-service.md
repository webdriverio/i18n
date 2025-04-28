---
id: ocr-testing
title: Test OCR
---

I test automatizzati su app native mobili e siti desktop possono essere particolarmente difficili quando si tratta di elementi privi di identificatori unici. I [selettori WebdriverIO](https://webdriver.io/docs/selectors) standard potrebbero non essere sempre d'aiuto. Entra nel mondo del `@wdio/ocr-service`, un potente servizio che sfrutta l'OCR ([Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition)) per cercare, attendere e interagire con elementi sullo schermo in base al loro **testo visibile**.

I seguenti comandi personalizzati verranno forniti e aggiunti all'oggetto `browser/driver` in modo da ottenere gli strumenti giusti per svolgere il tuo lavoro.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Come funziona

Questo servizio:

1. crea uno screenshot del tuo schermo/dispositivo. (Se necessario, puoi fornire un haystack, che può essere un elemento o un oggetto rettangolo, per individuare un'area specifica. Vedi la documentazione di ciascun comando.)
1. ottimizza il risultato per OCR trasformando lo screenshot in bianco/nero con uno screenshot ad alto contrasto (l'alto contrasto è necessario per prevenire molto rumore di sfondo dell'immagine. Questo può essere personalizzato per comando.)
1. utilizza [Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition) da [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) per ottenere tutto il testo dallo schermo e evidenziare tutto il testo trovato su un'immagine. Può supportare diverse lingue che possono essere trovate [qui.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. utilizza la Logica Fuzzy da [Fuse.js](https://fusejs.io/) per trovare stringhe che sono _approssimativamente uguali_ a un dato modello (piuttosto che esattamente). Questo significa per esempio che il valore di ricerca `Username` può anche trovare il testo `Usename` o viceversa.
1. Fornisce un wizard da cli (`npx ocr-service`) per validare le tue immagini e recuperare testo attraverso il terminale

Un esempio dei passaggi 1, 2 e 3 può essere trovato in questa immagine

![Passaggi del processo](/img/ocr/processing-steps.jpg)

Funziona con **ZERO** dipendenze di sistema (oltre a ciò che utilizza WebdriverIO), ma se necessario può anche funzionare con un'installazione locale di [Tesseract](https://tesseract-ocr.github.io/tessdoc/) che ridurrà drasticamente il tempo di esecuzione! (Vedi anche [Ottimizzazione dell'Esecuzione dei Test](#test-execution-optimization) su come velocizzare i tuoi test.)

Entusiasta? Inizia a usarlo oggi seguendo la guida [Guida Introduttiva](./getting-started).

:::caution Importante
Ci sono una varietà di motivi per cui potresti non ottenere un output di buona qualità da Tesseract. Uno dei motivi principali che potrebbe essere correlato alla tua app e a questo modulo potrebbe essere il fatto che non c'è una corretta distinzione di colore tra il testo che deve essere trovato e lo sfondo. Ad esempio, il testo bianco su sfondo scuro può _facilmente_ essere trovato, ma il testo chiaro su sfondo bianco o il testo scuro su sfondo scuro può essere difficilmente trovato.

Vedi anche [questa pagina](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) per ulteriori informazioni da Tesseract.

Non dimenticare inoltre di leggere le [FAQ](./ocr-faq).
:::