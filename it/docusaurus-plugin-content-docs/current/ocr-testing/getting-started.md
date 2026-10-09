---
id: getting-started
title: Per Iniziare
description: "Installa e configura @wdio/ocr-service, imposta il supporto TypeScript e regola le opzioni di contrasto, cartella delle immagini e lingua."
---

## Installazione

Il modo più semplice è mantenere `@wdio/ocr-service` come dipendenza nel tuo `package.json` tramite:

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` sono disponibili [qui.](../gettingstarted)

:::note
Questo modulo utilizza Tesseract come motore OCR. Per impostazione predefinita, verificherà se hai un'installazione locale di Tesseract sul tuo sistema e, in tal caso, utilizzerà quella. In caso contrario, utilizzerà il modulo [Node.js Tesseract.js](https://github.com/naptha/tesseract.js) che viene installato automaticamente.

Se desideri velocizzare l'elaborazione delle immagini, si consiglia di utilizzare una versione di Tesseract installata localmente. Vedi anche [Tempo di esecuzione dei test](./more-test-optimization#using-a-local-installation-of-tesseract).
:::

Le istruzioni su come installare Tesseract come dipendenza di sistema sul tuo sistema locale sono disponibili [qui](https://tesseract-ocr.github.io/tessdoc/Installation.html).

:::caution
Per domande/errori relativi all'installazione di Tesseract, fai riferimento al progetto
[Tesseract](https://github.com/tesseract-ocr/tesseract).
:::

## Supporto Typescript

Assicurati di aggiungere `@wdio/ocr-service` al tuo file di configurazione `tsconfig.json`.

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## Configurazione

Per utilizzare il servizio devi aggiungere `ocr` all'array dei servizi in `wdio.conf.ts`

```js
// wdio.conf.js
exports.config = {
    //...
    services: [
        // i tuoi altri servizi
        [
            "ocr",
            {
                contrast: 0.25,
                imagesFolder: ".tmp/",
                language: "eng",
            },
        ],
    ],
};
```

### Opzioni di Configurazione

#### `contrast`

<Option type="number" default="0.25" required="No">

Più alto è il contrasto, più scura sarà l'immagine e viceversa. Questo può aiutare a trovare il testo in un'immagine. Accetta valori compresi tra `-1` e `1`.

</Option>
#### `imagesFolder`

<Option type="string" default={`{project-root}/.tmp/ocr`} required="No">

La cartella in cui vengono memorizzati i risultati OCR.

:::note
Se fornisci una `imagesFolder` personalizzata, il servizio aggiungerà automaticamente la sottocartella `ocr`.
:::

</Option>
#### `language`

<Option type="string" default="eng" required="No">

La lingua che Tesseract riconoscerà. Maggiori informazioni sono disponibili [qui](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) e le lingue supportate sono disponibili [qui](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
## Log

Questo modulo aggiungerà automaticamente log aggiuntivi ai log di WebdriverIO. Scrive nei log `INFO` e `WARN` con il nome `@wdio/ocr-service`.
Di seguito puoi trovare alcuni esempi.

```log
...............
[0-0] 2024-05-24T06:55:12.739Z INFO @wdio/ocr-service: Adding commands to global browser
[0-0] 2024-05-24T06:55:12.750Z INFO @wdio/ocr-service: Adding browser command "ocrGetText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrGetElementPositionByText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrWaitForTextDisplayed" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrClickOnText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrSetValue" to browser object
...............
[0-0] 2024-05-24T06:55:13.667Z INFO @wdio/ocr-service:getData: Using system installed version of Tesseract
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: It took '0.351s' to process the image.
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: The following text was found through OCR:
[0-0]
[0-0] IQ Docs API Blog Contribute Community Sponsor Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: OCR Image with found text can be found here:
[0-0]
[0-0] .tmp/ocr/desktop-1716533713585.png
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "Get Started" and found one match "Started" with score "63.64
...............
```