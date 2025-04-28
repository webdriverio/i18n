---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

Ottieni la posizione di un testo sullo schermo. Il comando cercherà il testo fornito e proverà a trovare una corrispondenza basata sulla Logica Fuzzy di [Fuse.js](https://fusejs.io/). Questo significa che se fornisci un selettore con un errore di battitura, o il testo trovato potrebbe non essere una corrispondenza al 100%, tenterà comunque di restituirti un elemento. Vedi i [log](#logs) qui sotto.

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
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Opzioni

### `text`

-   **Tipo:** `string`
-   **Obbligatorio:** sì

Il testo che desideri cercare per cliccarci sopra.

#### Esempio

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** `0.25`

Più alto è il contrasto, più scura sarà l'immagine e viceversa. Questo può aiutare a trovare il testo in un'immagine. Accetta valori compresi tra `-1` e `1`.

#### Esempio

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Tipo:** `number`
-   **Obbligatorio:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Questa è l'area di ricerca nello schermo in cui l'OCR deve cercare il testo. Può essere un elemento o un rettangolo contenente `x`, `y`, `width` e `height`

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

-   **Tipo:** `string`
-   **Obbligatorio:** No
-   **Predefinito:** `eng`

La lingua che Tesseract riconoscerà. Maggiori informazioni possono essere trovate [qui](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) e le lingue supportate possono essere trovate [qui](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

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

Puoi modificare la logica fuzzy per trovare testo con le seguenti opzioni. Questo potrebbe aiutare a trovare una corrispondenza migliore

#### `fuzzyFindOptions.distance`

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 100

Determina quanto vicina deve essere la corrispondenza alla posizione fuzzy (specificata da location). Una corrispondenza esatta della lettera che si trova a distanza caratteri dalla posizione fuzzy verrebbe considerata come una completa mancata corrispondenza. Una distanza di 0 richiede che la corrispondenza sia nella posizione esatta specificata. Una distanza di 1000 richiederebbe una corrispondenza perfetta entro 800 caratteri dalla posizione per essere trovata usando una soglia di 0.8.

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

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 0

Determina approssimativamente dove nel testo ci si aspetta di trovare il pattern.

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

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 0.6

A quale punto l'algoritmo di corrispondenza si arrende. Una soglia di 0 richiede una corrispondenza perfetta (sia di lettere che di posizione), una soglia di 1.0 corrisponderebbe a qualsiasi cosa.

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

-   **Tipo:** `boolean`
-   **Obbligatorio:** no
-   **Predefinito:** false

Se la ricerca dovrebbe essere sensibile alle maiuscole/minuscole.

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

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** 2

Verranno restituite solo le corrispondenze la cui lunghezza supera questo valore. (Ad esempio, se vuoi ignorare le corrispondenze di singoli caratteri nel risultato, impostalo a 2)

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

-   **Tipo:** `number`
-   **Obbligatorio:** no
-   **Predefinito:** false

Quando `true`, la funzione di corrispondenza continuerà fino alla fine di un pattern di ricerca anche se è già stata trovata una corrispondenza perfetta nella stringa.

##### Esempio

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```