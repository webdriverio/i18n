---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

Obtenir la position d'un texte à l'écran. La commande recherchera le texte fourni et essaiera de trouver une correspondance basée sur la logique floue de [Fuse.js](https://fusejs.io/). Cela signifie que si vous fournissez un sélecteur avec une faute de frappe, ou si le texte trouvé n'est pas une correspondance à 100%, il essaiera quand même de vous renvoyer un élément. Voir les [logs](#logs) ci-dessous.

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
# Trouve quand même une correspondance bien que nous ayons cherché "Start3d" et que le texte trouvé était "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Options

### `text`

-   **Type:** `string`
-   **Obligatoire:** oui

Le texte que vous souhaitez rechercher pour cliquer dessus.

#### Exemple

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

-   **Type:** `number`
-   **Obligatoire:** non
-   **Défaut:** `0.25`

Plus le contraste est élevé, plus l'image est sombre et vice versa. Cela peut aider à trouver du texte dans une image. Il accepte des valeurs entre `-1` et `1`.

#### Exemple

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Type:** `number`
-   **Obligatoire:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

C'est la zone de recherche à l'écran où l'OCR doit chercher du texte. Il peut s'agir d'un élément ou d'un rectangle contenant `x`, `y`, `width` et `height`

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

-   **Type:** `string`
-   **Obligatoire:** Non
-   **Défaut:** `eng`

La langue que Tesseract reconnaîtra. Plus d'informations peuvent être trouvées [ici](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) et les langues prises en charge peuvent être trouvées [ici](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

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

Vous pouvez modifier la logique floue pour trouver du texte avec les options suivantes. Cela peut aider à trouver une meilleure correspondance

#### `fuzzyFindOptions.distance`

-   **Type:** `number`
-   **Obligatoire:** non
-   **Défaut:** 100

Détermine à quel point la correspondance doit être proche de l'emplacement flou (spécifié par location). Une correspondance exacte de lettre qui est à distance caractères de l'emplacement flou serait considérée comme une non-correspondance complète. Une distance de 0 nécessite que la correspondance soit à l'emplacement exact spécifié. Une distance de 1000 nécessiterait une correspondance parfaite pour être à moins de 800 caractères de l'emplacement pour être trouvée en utilisant un seuil de 0,8.

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

-   **Type:** `number`
-   **Obligatoire:** non
-   **Défaut:** 0

Détermine approximativement où dans le texte le modèle est censé être trouvé.

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

-   **Type:** `number`
-   **Obligatoire:** non
-   **Défaut:** 0.6

À quel moment l'algorithme de correspondance abandonne. Un seuil de 0 nécessite une correspondance parfaite (à la fois des lettres et de l'emplacement), un seuil de 1.0 correspondrait à n'importe quoi.

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

-   **Type:** `boolean`
-   **Obligatoire:** non
-   **Défaut:** false

Si la recherche doit être sensible à la casse.

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

-   **Type:** `number`
-   **Obligatoire:** non
-   **Défaut:** 2

Seules les correspondances dont la longueur dépasse cette valeur seront renvoyées. (Par exemple, si vous voulez ignorer les correspondances de caractères uniques dans le résultat, définissez-le à 2)

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

-   **Type:** `number`
-   **Obligatoire:** non
-   **Défaut:** false

Lorsque `true`, la fonction de correspondance continuera jusqu'à la fin d'un modèle de recherche même si une correspondance parfaite a déjà été localisée dans la chaîne.

##### Exemple

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```