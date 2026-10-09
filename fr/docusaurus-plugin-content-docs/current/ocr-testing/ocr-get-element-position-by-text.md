---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
description: "Obtenez la position à l'écran d'un texte avec ocrGetElementPositionByText, en utilisant l'OCR et la correspondance approximative pour le trouver."
---

Obtenez la position d'un texte à l'écran. La commande recherchera le texte fourni et tentera de trouver une correspondance basée sur la logique floue (Fuzzy Logic) de [Fuse.js](https://fusejs.io/). Cela signifie que même si vous fournissez un sélecteur contenant une faute de frappe, ou si le texte trouvé ne correspond pas à 100 %, la commande essaiera tout de même de vous renvoyer un élément. Consultez les [logs](#logs) ci-dessous.

## Utilisation

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## Sortie

### Résultat

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
# Trouve quand même une correspondance alors que nous avons recherché "Start3d" et que le texte trouvé était "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Options

### `text`

<Option type="string" required="yes">

Le texte que vous souhaitez rechercher pour cliquer dessus.

</Option>
#### Exemple

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

<Option type="number" default="0.25" required="no">

Plus le contraste est élevé, plus l'image est sombre, et inversement. Cela peut aider à trouver du texte dans une image. Les valeurs acceptées sont comprises entre `-1` et `1`.

</Option>
#### Exemple

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Il s'agit de la zone de recherche à l'écran dans laquelle l'OCR doit chercher du texte. Il peut s'agir d'un élément ou d'un rectangle contenant `x`, `y`, `width` et `height`

</Option>
#### Exemple

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OU
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OU
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

La langue que Tesseract reconnaîtra. Plus d'informations sont disponibles [ici](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) et les langues prises en charge sont disponibles [ici](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Exemple

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // Utiliser le néerlandais comme langue
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Vous pouvez modifier la logique floue utilisée pour trouver du texte avec les options suivantes. Cela peut aider à trouver une meilleure correspondance

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Détermine à quel point la correspondance doit être proche de l'emplacement approximatif (spécifié par location). Une correspondance exacte de lettre située à distance caractères de l'emplacement approximatif serait considérée comme une non-correspondance totale. Une distance de 0 exige que la correspondance se trouve exactement à l'emplacement spécifié. Une distance de 1000 exigerait qu'une correspondance parfaite se trouve à moins de 800 caractères de l'emplacement pour être trouvée avec un seuil de 0.8.

</Option>
##### Exemple

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

Détermine approximativement à quel endroit du texte le motif est censé se trouver.

</Option>
##### Exemple

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

À partir de quel moment l'algorithme de correspondance abandonne. Un seuil de 0 exige une correspondance parfaite (à la fois des lettres et de l'emplacement), un seuil de 1.0 correspondrait à n'importe quoi.

</Option>
##### Exemple

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

Indique si la recherche doit être sensible à la casse.

</Option>
##### Exemple

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

Seules les correspondances dont la longueur dépasse cette valeur seront renvoyées. (Par exemple, si vous souhaitez ignorer les correspondances d'un seul caractère dans le résultat, définissez-la à 2)

</Option>
##### Exemple

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

Lorsque la valeur est `true`, la fonction de correspondance continuera jusqu'à la fin d'un motif de recherche, même si une correspondance parfaite a déjà été trouvée dans la chaîne.

</Option>
##### Exemple

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```