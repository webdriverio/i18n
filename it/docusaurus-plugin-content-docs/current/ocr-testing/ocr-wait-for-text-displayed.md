---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
description: "Attendi che un testo specifico venga visualizzato sullo schermo con ocrWaitForTextDisplayed del servizio OCR."
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
# ocrWaitForTextDisplayed utilizza ocrGetElementPositionByText internamente, ecco perché vedi il comando ocrGetElementPositionByText nei log
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Opzioni

### `text`

<Option type="string" required="yes">

Il testo che vuoi cercare su cui fare clic.

</Option>
#### Esempio

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

<Option type="number" default="18000 (18 seconds)" required="no">

Tempo in millisecondi. Tieni presente che il processo OCR può richiedere del tempo, quindi non impostarlo troppo basso.

</Option>
#### Esempio

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // attendi 25 secondi
});
```

### `timeoutMsg`

<Option type="string" default={`Could not find the text "{selector}" within the requested time.`} required="no">

Sovrascrive il messaggio di errore predefinito.

</Option>
#### Esempio

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Più alto è il contrasto, più scura è l'immagine e viceversa. Questo può aiutare a trovare il testo in un'immagine. Accetta valori compresi tra `-1` e `1`.

</Option>
#### Esempio

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Questa è l'area di ricerca nello schermo in cui l'OCR deve cercare il testo. Può essere un elemento o un rettangolo contenente `x`, `y`, `width` e `height`

</Option>
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

<Option type="string" default="eng" required="No">

La lingua che Tesseract riconoscerà. Maggiori informazioni sono disponibili [qui](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) e le lingue supportate sono disponibili [qui](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
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

Puoi modificare la logica fuzzy per trovare il testo con le seguenti opzioni. Questo potrebbe aiutare a trovare una corrispondenza migliore

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Determina quanto la corrispondenza deve essere vicina alla posizione fuzzy (specificata da location). Una corrispondenza esatta di lettere che si trova a distance caratteri dalla posizione fuzzy verrebbe valutata come una mancata corrispondenza completa. Una distanza di 0 richiede che la corrispondenza si trovi esattamente nella posizione specificata. Una distanza di 1000 richiederebbe che una corrispondenza perfetta si trovi entro 800 caratteri dalla posizione per essere trovata utilizzando una soglia di 0.8.

</Option>
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

<Option type="number" default="0" required="no">

Determina approssimativamente in quale punto del testo ci si aspetta di trovare il pattern.

</Option>
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

<Option type="number" default="0.6" required="no">

Il punto in cui l'algoritmo di corrispondenza si arrende. Una soglia di 0 richiede una corrispondenza perfetta (sia delle lettere che della posizione), una soglia di 1.0 corrisponderebbe a qualsiasi cosa.

</Option>
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

<Option type="boolean" default="false" required="no">

Indica se la ricerca deve distinguere tra maiuscole e minuscole.

</Option>
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

<Option type="number" default="2" required="no">

Verranno restituite solo le corrispondenze la cui lunghezza supera questo valore. (Ad esempio, se vuoi ignorare le corrispondenze di un solo carattere nel risultato, impostalo a 2)

</Option>
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

<Option type="number" default="false" required="no">

Quando è `true`, la funzione di corrispondenza continuerà fino alla fine del pattern di ricerca anche se è già stata individuata una corrispondenza perfetta nella stringa.

</Option>
##### Esempio

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```