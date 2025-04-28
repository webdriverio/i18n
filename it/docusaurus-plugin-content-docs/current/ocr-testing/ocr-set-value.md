---
id: ocr-set-value
title: ocrSetValue
---

Invia una sequenza di tasti a un elemento. Farà:

-   rilevare automaticamente l'elemento
-   mettere il focus sul campo cliccandoci sopra
-   impostare il valore nel campo

Il comando cercherà il testo fornito e tenterà di trovare una corrispondenza basata sulla Logica Fuzzy di [Fuse.js](https://fusejs.io/). Questo significa che se potresti fornire un selettore con un errore di battitura, o il testo trovato potrebbe non essere una corrispondenza al 100%, cercherà comunque di restituirti un elemento. Guarda i [log](#logs) qui sotto.

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

-   **Tipo:** `string`
-   **Obbligatorio:** sì

Il testo che vuoi cercare per cliccare sopra.

#### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **Tipo:** `string`
-   **Obbligatorio:** sì

Valore da aggiungere.

#### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **Tipo:** `boolean`
-   **Obbligatorio:** no
-   **Predefinito:** `false`

Se il valore deve essere anche inviato nel campo di input. Ciò significa che un "INVIO" verrà inviato alla fine della stringa.

#### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** `500` millisecondi

Questa è la durata del clic. Se vuoi puoi anche creare un "clic lungo" aumentando il tempo.

#### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // Questi sono 3 secondi
});
```

### `contrast`

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** `0.25`

Maggiore è il contrasto, più scura sarà l'immagine e viceversa. Questo può aiutare a trovare testo in un'immagine. Accetta valori tra `-1` e `1`.

#### Esempio

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **Tipo:** `number`
-   **Obbligatorio:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Questa è l'area di ricerca nello schermo in cui l'OCR deve cercare il testo. Può essere un elemento o un rettangolo contenente `x`, `y`, `width` e `height`

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

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** `eng`

La lingua che Tesseract riconoscerà. Maggiori informazioni possono essere trovate [qui](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) e le lingue supportate possono essere trovate [qui](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

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

-   **Tipo:** `object`
-   **Obbligatorio:** no

Puoi cliccare sullo schermo in relazione all'elemento corrispondente. Questo può essere fatto in base ai pixel relativi `above`, `right`, `below` o `left` dall'elemento corrispondente

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

Clicca x pixel `sopra` l'elemento corrispondente.

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

-   **Tipo:** `number`
-   **Obbligatorio:** no

Clicca x pixel a `destra` dell'elemento corrispondente.

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

-   **Tipo:** `number`
-   **Obbligatorio:** no

Clicca x pixel `sotto` l'elemento corrispondente.

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

-   **Tipo:** `number`
-   **Obbligatorio:** no

Clicca x pixel a `sinistra` dell'elemento corrispondente.

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

Puoi modificare la logica fuzzy per trovare testo con le seguenti opzioni. Questo potrebbe aiutare a trovare una corrispondenza migliore

#### `fuzzyFindOptions.distance`

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 100

Determina quanto vicina deve essere la corrispondenza alla posizione fuzzy (specificata da location). Una corrispondenza di lettera esatta che è lontana di un certo numero di caratteri dalla posizione fuzzy verrebbe considerata come una mancata corrispondenza completa. Una distanza di 0 richiede che la corrispondenza sia nella posizione esatta specificata. Una distanza di 1000 richiederebbe una corrispondenza perfetta entro 800 caratteri dalla posizione da trovare utilizzando una soglia di 0.8.

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

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 0

Determina approssimativamente dove nel testo ci si aspetta di trovare il pattern.

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

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 0.6

A che punto l'algoritmo di corrispondenza si arrende. Una soglia di 0 richiede una corrispondenza perfetta (sia di lettere che di posizione), una soglia di 1.0 corrisponderebbe a qualsiasi cosa.

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

-   **Tipo:** `boolean`
-   **Obbligatorio:** no
-   **Predefinito:** false

Se la ricerca dovrebbe essere sensibile alle maiuscole.

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

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 2

Verranno restituite solo le corrispondenze la cui lunghezza supera questo valore. (Ad esempio, se vuoi ignorare le corrispondenze di un solo carattere nel risultato, impostalo a 2)

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

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** false

Quando è `true`, la funzione di corrispondenza continuerà fino alla fine di un pattern di ricerca anche se è già stata localizzata una corrispondenza perfetta nella stringa.

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