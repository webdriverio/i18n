---
id: ocr-click-on-text
title: ocrClickOnText
description: "Fai clic su un elemento tramite il suo testo visibile con ocrClickOnText, che trova il testo sullo schermo tramite OCR e corrispondenza fuzzy."
---

Fai clic su un elemento in base ai testi forniti. Il comando cercherà il testo fornito e proverà a trovare una corrispondenza basata sulla Fuzzy Logic di [Fuse.js](https://fusejs.io/). Ciò significa che, anche se fornisci un selettore con un errore di battitura o il testo trovato non corrisponde al 100%, cercherà comunque di restituirti un elemento. Vedi i [log](#logs) qui sotto.

## Utilizzo

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Output

### Logs

```log
# Trova comunque una corrispondenza anche se abbiamo cercato "Start3d" e il testo trovato era "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Immagine

Troverai un'immagine nella tua cartella (predefinita)[`imagesFolder`](./getting-started#imagesfolder) con un bersaglio che mostra dove il modulo ha fatto clic.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Opzioni

### `text`

<Option type="string" required="yes">

Il testo che vuoi cercare per farci clic sopra.

</Option>
#### Esempio

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

Questa è la durata del clic. Se vuoi, puoi anche creare un "clic prolungato" aumentando il tempo.

</Option>
#### Esempio

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // Questo corrisponde a 3 secondi
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Più alto è il contrasto, più scura è l'immagine e viceversa. Questo può aiutare a trovare il testo in un'immagine. Accetta valori compresi tra `-1` e `1`.

</Option>
#### Esempio

```js
await browser.ocrClickOnText({
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
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OPPURE
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OPPURE
await browser.ocrClickOnText({
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
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Usa l'olandese come lingua
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

Puoi fare clic sullo schermo in una posizione relativa all'elemento corrispondente. Questo può essere fatto in base ai pixel relativi `above` (sopra), `right` (a destra), `below` (sotto) o `left` (a sinistra) rispetto all'elemento corrispondente

:::note

Sono consentite le seguenti combinazioni

-   proprietà singole
-   `above` + `left` oppure `above` + `right`
-   `below` + `left` oppure `below` + `right`

Le seguenti combinazioni **NON** sono consentite

-   `above` più `below`
-   `left` più `right`

:::

</Option>
#### `relativePosition.above`

<Option type="number" required="no">

Fai clic x pixel `above` (sopra) l'elemento corrispondente.

</Option>
##### Esempio

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

<Option type="number" required="no">

Fai clic x pixel a `right` (destra) dell'elemento corrispondente.

</Option>
##### Esempio

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

<Option type="number" required="no">

Fai clic x pixel `below` (sotto) l'elemento corrispondente.

</Option>
##### Esempio

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

<Option type="number" required="no">

Fai clic x pixel a `left` (sinistra) dell'elemento corrispondente.

</Option>
##### Esempio

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Puoi modificare la logica fuzzy per trovare il testo con le seguenti opzioni. Questo potrebbe aiutare a trovare una corrispondenza migliore

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Determina quanto la corrispondenza deve essere vicina alla posizione fuzzy (specificata da location). Una corrispondenza esatta di lettere che si trova a distance caratteri di distanza dalla posizione fuzzy verrebbe valutata come una totale mancata corrispondenza. Una distance di 0 richiede che la corrispondenza si trovi esattamente nella posizione specificata. Una distance di 1000 richiederebbe che una corrispondenza perfetta si trovi entro 800 caratteri dalla posizione per essere trovata usando una threshold di 0.8.

</Option>
##### Esempio

```js
await browser.ocrClickOnText({
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
await browser.ocrClickOnText({
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
await browser.ocrClickOnText({
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
await browser.ocrClickOnText({
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
await browser.ocrClickOnText({
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
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```