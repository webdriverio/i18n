---
id: ocr-click-on-text
title: ocrClickOnText
---

Fai clic su un elemento in base ai testi forniti. Il comando cercherà il testo fornito e proverà a trovare una corrispondenza basata sulla Logica Fuzzy di [Fuse.js](https://fusejs.io/). Ciò significa che se fornisci un selettore con un errore di battitura, o il testo trovato potrebbe non essere una corrispondenza al 100%, tenterà comunque di restituirti un elemento. Vedi i [log](#logs) di seguito.

## Utilizzo

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Output

### Logs

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Immagine

Troverai un'immagine nella tua cartella (predefinita) [`imagesFolder`](./getting-started#imagesfolder) con un target che mostra dove il modulo ha fatto clic.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Opzioni

### `text`

-   **Tipo:** `string`
-   **Obbligatorio:** sì

Il testo che vuoi cercare per fare clic.

#### Esempio

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** `500` millisecondi

Questa è la durata del clic. Se vuoi puoi anche creare un "clic lungo" aumentando il tempo.

#### Esempio

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // Questo è 3 secondi
});
```

### `contrast`

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** `0.25`

Maggiore è il contrasto, più scura è l'immagine e viceversa. Questo può aiutare a trovare testo in un'immagine. Accetta valori tra `-1` e `1`.

#### Esempio

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Tipo:** `number`
-   **Obbligatorio:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Questa è l'area di ricerca nello schermo dove l'OCR deve cercare il testo. Può essere un elemento o un rettangolo contenente `x`, `y`, `width` e `height`

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

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** `eng`

La lingua che Tesseract riconoscerà. Maggiori informazioni possono essere trovate [qui](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) e le lingue supportate possono essere trovate [qui](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

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

-   **Tipo:** `object`
-   **Obbligatorio:** no

Puoi fare clic sullo schermo in relazione all'elemento corrispondente. Questo può essere fatto in base ai pixel relativi `above`, `right`, `below` o `left` dall'elemento corrispondente.

:::note

Le seguenti combinazioni sono consentite

-   proprietà singole
-   `above` + `left` o `above` + `right`
-   `below` + `left` o `below` + `right`

Le seguenti combinazioni **NON** sono consentite

-   `above` più `below`
-   `left` più `right`

:::

#### `relativePosition.above`

-   **Tipo:** `number`
-   **Obbligatorio:** no

Fai clic su x pixel `sopra` l'elemento corrispondente.

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

-   **Tipo:** `number`
-   **Obbligatorio:** no

Fai clic su x pixel `a destra` dell'elemento corrispondente.

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

-   **Tipo:** `number`
-   **Obbligatorio:** no

Fai clic su x pixel `sotto` l'elemento corrispondente.

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

-   **Tipo:** `number`
-   **Obbligatorio:** no

Fai clic su x pixel `a sinistra` dell'elemento corrispondente.

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

Puoi modificare la logica fuzzy per trovare testo con le seguenti opzioni. Questo potrebbe aiutare a trovare una corrispondenza migliore.

#### `fuzzyFindOptions.distance`

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 100

Determina quanto deve essere vicina la corrispondenza alla posizione fuzzy (specificata da location). Una corrispondenza esatta di lettere che si trova a distanza caratteri dalla posizione fuzzy verrebbe considerata come una mancata corrispondenza completa. Una distanza di 0 richiede che la corrispondenza sia nella posizione esatta specificata. Una distanza di 1000 richiederebbe che una corrispondenza perfetta sia entro 800 caratteri dalla posizione per essere trovata usando una soglia di 0.8.

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

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 0

Determina approssimativamente dove nel testo ci si aspetta di trovare il pattern.

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

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 0.6

A che punto l'algoritmo di corrispondenza si arrende. Una soglia di 0 richiede una corrispondenza perfetta (sia delle lettere che della posizione), una soglia di 1.0 corrisponderebbe a qualsiasi cosa.

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

-   **Tipo:** `boolean`
-   **Obbligatorio:** no
-   **Predefinito:** false

Se la ricerca deve essere sensibile alle maiuscole.

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

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 2

Verranno restituite solo le corrispondenze la cui lunghezza supera questo valore. (Ad esempio, se vuoi ignorare le corrispondenze di un singolo carattere nel risultato, impostalo a 2)

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

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** false

Quando è `true`, la funzione di corrispondenza continuerà fino alla fine di un pattern di ricerca anche se una corrispondenza perfetta è già stata localizzata nella stringa.

##### Esempio

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```