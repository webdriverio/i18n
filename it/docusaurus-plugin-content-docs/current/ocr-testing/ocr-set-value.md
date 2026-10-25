---
id: ocr-set-value
title: ocrSetValue
description: "Digita in un campo di input individuato tramite il suo testo visibile con ocrSetValue, che trova il campo tramite OCR e corrispondenza fuzzy."
---

Invia una sequenza di battiture di tasti a un elemento. Il comando:

-   rileverà automaticamente l'elemento
-   metterà il focus sul campo cliccandoci sopra
-   imposterà il valore nel campo

Il comando cercherà il testo fornito e proverà a trovare una corrispondenza basata sulla logica fuzzy di [Fuse.js](https://fusejs.io/). Ciò significa che, anche se dovessi fornire un selettore con un errore di battitura o se il testo trovato non dovesse corrispondere al 100%, il comando proverà comunque a restituirti un elemento. Vedi i [log](#logs) qui sotto.

## Utilizzo

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## Output

### Logs

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## Opzioni

### `text`

<Option type="string" required="yes">

Il testo da cercare su cui cliccare.

</Option>
#### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

<Option type="string" required="yes">

Il valore da aggiungere.

</Option>
#### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

<Option type="boolean" default="false" required="no">

Indica se il valore deve anche essere inviato nel campo di input. Ciò significa che verrà inviato un "ENTER" alla fine della stringa.

</Option>
#### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

Questa è la durata del clic. Se vuoi, puoi anche creare un "clic prolungato" aumentando il tempo.

</Option>
#### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // Questo corrisponde a 3 secondi
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Più alto è il contrasto, più scura sarà l'immagine e viceversa. Questo può aiutare a trovare il testo in un'immagine. Accetta valori compresi tra `-1` e `1`.

</Option>
#### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Questa è l'area di ricerca nello schermo in cui l'OCR deve cercare il testo. Può essere un elemento o un rettangolo contenente `x`, `y`, `width` e `height`

</Option>
#### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// OPPURE
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// OPPURE
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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

La lingua che Tesseract riconoscerà. Maggiori informazioni sono disponibili [qui](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) e le lingue supportate sono elencate [qui](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Esempio

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Usa l'olandese come lingua
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

Puoi cliccare sullo schermo in una posizione relativa all'elemento corrispondente. Questo può essere fatto in base ai pixel relativi `above`, `right`, `below` o `left` rispetto all'elemento corrispondente

:::note

Le seguenti combinazioni sono consentite

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

Clicca x pixel sopra (`above`) l'elemento corrispondente.

</Option>
##### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

<Option type="number" required="no">

Clicca x pixel a destra (`right`) dell'elemento corrispondente.

</Option>
##### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

<Option type="number" required="no">

Clicca x pixel sotto (`below`) l'elemento corrispondente.

</Option>
##### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

<Option type="number" required="no">

Clicca x pixel a sinistra (`left`) dell'elemento corrispondente.

</Option>
##### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Puoi modificare la logica fuzzy per la ricerca del testo con le seguenti opzioni. Questo potrebbe aiutare a trovare una corrispondenza migliore

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Determina quanto la corrispondenza deve essere vicina alla posizione fuzzy (specificata da location). Una corrispondenza esatta di lettere che si trova a distance caratteri di distanza dalla posizione fuzzy verrebbe valutata come una completa mancata corrispondenza. Una distance pari a 0 richiede che la corrispondenza si trovi esattamente nella posizione specificata. Una distance pari a 1000 richiederebbe che una corrispondenza perfetta si trovi entro 800 caratteri dalla posizione per essere trovata usando un threshold di 0.8.

</Option>
##### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

<Option type="number" default="0.6" required="no">

Il punto in cui l'algoritmo di corrispondenza si arrende. Un threshold pari a 0 richiede una corrispondenza perfetta (sia delle lettere che della posizione), mentre un threshold pari a 1.0 corrisponderebbe a qualsiasi cosa.

</Option>
##### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

<Option type="number" default="2" required="no">

Verranno restituite solo le corrispondenze la cui lunghezza supera questo valore. (Ad esempio, se vuoi ignorare le corrispondenze di un singolo carattere nel risultato, impostalo a 2)

</Option>
##### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

<Option type="number" default="false" required="no">

Quando è `true`, la funzione di corrispondenza proseguirà fino alla fine del pattern di ricerca anche se è già stata trovata una corrispondenza perfetta nella stringa.

</Option>
##### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```