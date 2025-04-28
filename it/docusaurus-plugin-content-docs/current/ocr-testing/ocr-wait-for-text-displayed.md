---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

Attendi che un testo specifico venga visualizzato sullo schermo.

## Utilizzo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## Output

### Log

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Opzioni

### `text`

-   **Tipo:** `string`
-   **Obbligatorio:** sì

Il testo che desideri cercare per cliccarci sopra.

#### Esempio

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 18000 (18 secondi)

Tempo in millisecondi. Tieni presente che il processo OCR può richiedere del tempo, quindi non impostarlo troppo basso.

#### Esempio

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // attendi per 25 secondi
});
```

### `timeoutMsg`

-   **Tipo:** `string`
-   **Obbligatorio:** no
-   **Predefinito:** `Could not find the text "{selector}" within the requested time.`

Sovrascrive il messaggio di errore predefinito.

#### Esempio

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** `0.25`

Maggiore è il contrasto, più scura sarà l'immagine e viceversa. Questo può aiutare a trovare il testo in un'immagine. Accetta valori compresi tra `-1` e `1`.

#### Esempio

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **Tipo:** `number`
-   **Obbligatorio:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Questa è l'area di ricerca nello schermo in cui l'OCR deve cercare il testo. Può essere un elemento o un rettangolo contenente `x`, `y`, `width` e `height`

#### Esempio

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// OPPURE
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// OPPURE
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: {
        x: 10,
        y: 50,
        width: 300,
        height: 75,
    },
});
```

### `language`

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** `eng`

La lingua che Tesseract riconoscerà. Maggiori informazioni possono essere trovate [qui](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) e le lingue supportate possono essere trovate [qui](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Esempio

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // Usa l'olandese come lingua
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Puoi modificare la logica fuzzy per trovare testo con le seguenti opzioni. Questo potrebbe aiutare a trovare una corrispondenza migliore

#### `fuzzyFindOptions.distance`

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 100

Determina quanto vicina deve essere la corrispondenza alla posizione fuzzy (specificata dalla location). Una corrispondenza esatta di lettere che si trova a una distanza di caratteri dalla posizione fuzzy verrebbe valutata come un completo mancato riscontro. Una distanza di 0 richiede che la corrispondenza sia nella posizione esatta specificata. Una distanza di 1000 richiederebbe che una corrispondenza perfetta si trovi entro 800 caratteri dalla posizione per essere trovata utilizzando una soglia di 0,8.

##### Esempio

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 0

Determina approssimativamente dove nel testo ci si aspetta di trovare il pattern.

##### Esempio

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 0.6

A che punto l'algoritmo di corrispondenza si arrende. Una soglia di 0 richiede una corrispondenza perfetta (sia di lettere che di posizione), una soglia di 1.0 corrisponderebbe a qualsiasi cosa.

##### Esempio

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Tipo:** `boolean`
-   **Obbligatorio:** no
-   **Predefinito:** false

Se la ricerca deve essere sensibile alle maiuscole.

##### Esempio

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 2

Verranno restituite solo le corrispondenze la cui lunghezza supera questo valore. (Ad esempio, se vuoi ignorare le corrispondenze di un singolo carattere nel risultato, impostalo a 2)

##### Esempio

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** false

Quando è `true`, la funzione di corrispondenza continuerà fino alla fine di un modello di ricerca anche se è già stata individuata una corrispondenza perfetta nella stringa.

##### Esempio

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```