---
id: getting-started
title: Per Iniziare
---

## Installazione

Il modo più semplice è mantenere `@wdio/ocr-service` come dipendenza nel tuo `package.json` tramite.

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

Le istruzioni su come installare `WebdriverIO` possono essere trovate [qui.](../gettingstarted)

:::note
Questo modulo utilizza Tesseract come motore OCR. Per impostazione predefinita, verificherà se hai un'installazione locale di Tesseract sul tuo sistema, in tal caso, la utilizzerà. In caso contrario, utilizzerà il modulo [Node.js Tesseract.js](https://github.com/naptha/tesseract.js) che viene installato automaticamente per te.

Se desideri accelerare l'elaborazione delle immagini, il consiglio è di utilizzare una versione di Tesseract installata localmente. Vedi anche [Tempo di esecuzione dei test](./more-test-optimization#using-a-local-installation-of-tesseract).
:::

Le istruzioni su come installare Tesseract come dipendenza di sistema sul tuo sistema locale possono essere trovate [qui](https://tesseract-ocr.github.io/tessdoc/Installation.html).

:::caution
Per domande/errori di installazione con Tesseract, fai riferimento al progetto [Tesseract](https://github.com/tesseract-ocr/tesseract).
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

Per utilizzare il servizio è necessario aggiungere `ocr` all'array dei servizi in `wdio.conf.ts`

```js
// wdio.conf.js
exports.config = {
    //...
    services: [
        // your other services
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

### Opzioni di configurazione

#### `contrast`

-   **Tipo:** `number`
-   **Obbligatorio:** No
-   **Predefinito:** `0.25`

Maggiore è il contrasto, più scura è l'immagine e viceversa. Questo può aiutare a trovare il testo in un'immagine. Accetta valori compresi tra `-1` e `1`.

#### `imagesFolder`

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** `{project-root}/.tmp/ocr`

La cartella in cui vengono memorizzati i risultati OCR.

:::note
Se fornisci una `imagesFolder` personalizzata, il servizio aggiungerà automaticamente la sottocartella `ocr`.
:::

#### `language`

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** `eng`

La lingua che Tesseract riconoscerà. Maggiori informazioni possono essere trovate [qui](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) e le lingue supportate possono essere trovate [qui](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

## Log

Questo modulo aggiungerà automaticamente log extra ai log di WebdriverIO. Scrive nei log `INFO` e `WARN` con il nome `@wdio/ocr-service`.
Gli esempi possono essere trovati di seguito.

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