---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
description: "Ottieni la posizione sullo schermo di un testo con ocrGetElementPositionByText, utilizzando l'OCR e la corrispondenza fuzzy per trovarlo."
---

Ottiene la posizione di un testo sullo schermo. Il comando cercherà il testo fornito e proverà a trovare una corrispondenza basata sulla Fuzzy Logic di [Fuse.js](https://fusejs.io/). Questo significa che, anche se fornisci un selettore con un errore di battitura o se il testo trovato non corrisponde al 100%, il comando proverà comunque a restituirti un elemento. Vedi i [log](#logs) qui sotto.

## Utilizzo

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## Output

### Risultato

```logs
result = {
  "dprPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "filePath": ".tmp/ocr/desktop-1716658199410.png",
  "matchedString": "Started",
  "originalPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "score": 85.71,
  "searchValue": "Start3d"
}
```

### Logs

```log
# Trova comunque una corrispondenza anche se abbiamo cercato "Start3d" e il testo trovato era "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Opzioni

### `text`

<Option type="string" required="yes">

Il testo che vuoi cercare su cui fare clic.

</Option>
#### Esempio

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

<Option type="number" default="0.25" required="no">

Più alto è il contrasto, più scura è l'immagine e viceversa. Questo può aiutare a trovare il testo in un'immagine. Accetta valori compresi tra `-1` e `1`.

</Option>
#### Esempio

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Questa è l'area di ricerca sullo schermo in cui l'OCR deve cercare il testo. Può essere un elemento o un rettangolo contenente `x`, `y`, `width` e `height`

</Option>
#### Esempio

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OPPURE
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OPPURE
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // Usa l'olandese come lingua
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Puoi modificare la logica fuzzy per trovare il testo con le seguenti opzioni. Questo potrebbe aiutare a trovare una corrispondenza migliore

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Determina quanto la corrispondenza deve essere vicina alla posizione fuzzy (specificata da location). Una corrispondenza esatta di lettere che si trova a distance caratteri di distanza dalla posizione fuzzy verrebbe valutata come una mancata corrispondenza completa. Una distance di 0 richiede che la corrispondenza si trovi esattamente nella posizione specificata. Una distance di 1000 richiederebbe che una corrispondenza perfetta si trovi entro 800 caratteri dalla posizione per essere trovata utilizzando una threshold di 0.8.

</Option>
##### Esempio

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

<Option type="number" default="0.6" required="no">

Il punto in cui l'algoritmo di corrispondenza si arrende. Una threshold di 0 richiede una corrispondenza perfetta (sia delle lettere che della posizione), una threshold di 1.0 corrisponderebbe a qualsiasi cosa.

</Option>
##### Esempio

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

<Option type="number" default="false" required="no">

Quando è `true`, la funzione di corrispondenza continuerà fino alla fine di un pattern di ricerca anche se è già stata individuata una corrispondenza perfetta nella stringa.

</Option>
##### Esempio

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```