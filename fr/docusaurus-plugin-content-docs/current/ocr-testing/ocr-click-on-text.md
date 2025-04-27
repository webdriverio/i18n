---
id: ocr-click-on-text
title: ocrClickOnText
---

Cliquez sur un élément basé sur les textes fournis. La commande recherchera le texte fourni et essaiera de trouver une correspondance basée sur la logique floue de [Fuse.js](https://fusejs.io/). Cela signifie que si vous fournissez un sélecteur avec une faute de frappe, ou si le texte trouvé n'est pas une correspondance à 100%, il essaiera quand même de vous renvoyer un élément. Voir les [logs](#logs) ci-dessous.

## Utilisation

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Sortie

### Logs

```log
# Trouve toujours une correspondance même si nous avons cherché "Start3d" et que le texte trouvé était "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Image

Vous trouverez une image dans votre (par défaut)[`imagesFolder`](./getting-started#imagesfolder) avec une cible pour vous montrer où le module a cliqué.

![Étapes du processus](/img/ocr/ocr-click-on-text-target.jpg)

## Options

### `text`

-   **Type:** `string`
-   **Obligatoire:** oui

Le texte que vous souhaitez rechercher pour cliquer dessus.

#### Exemple

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **Type:** `number`
-   **Obligatoire:** non
-   **Par défaut:** `500` millisecondes

C'est la durée du clic. Si vous le souhaitez, vous pouvez également créer un "clic long" en augmentant le temps.

#### Exemple

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // Ceci représente 3 secondes
});
```

### `contrast`

-   **Type:** `number`
-   **Obligatoire:** non
-   **Par défaut:** `0.25`

Plus le contraste est élevé, plus l'image est sombre et vice versa. Cela peut aider à trouver du texte dans une image. Il accepte des valeurs entre `-1` et `1`.

#### Exemple

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Type:** `number`
-   **Obligatoire:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

C'est la zone de recherche dans l'écran où l'OCR doit chercher du texte. Cela peut être un élément ou un rectangle contenant `x`, `y`, `width` et `height`

#### Exemple

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OU
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OU
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

-   **Type:** `string`
-   **Obligatoire:** Non
-   **Par défaut:** `eng`

La langue que Tesseract reconnaîtra. Plus d'informations peuvent être trouvées [ici](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) et les langues prises en charge peuvent être trouvées [ici](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Exemple

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Utiliser le néerlandais comme langue
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Type:** `object`
-   **Obligatoire:** non

Vous pouvez cliquer sur l'écran par rapport à l'élément correspondant. Cela peut être fait en fonction des pixels relatifs `above`, `right`, `below` ou `left` de l'élément correspondant.

:::note

Les combinaisons suivantes sont autorisées

-   propriétés simples
-   `above` + `left` ou `above` + `right`
-   `below` + `left` ou `below` + `right`

Les combinaisons suivantes ne sont **PAS** autorisées

-   `above` plus `below`
-   `left` plus `right`

:::

#### `relativePosition.above`

-   **Type:** `number`
-   **Obligatoire:** non

Cliquez x pixels `au-dessus` de l'élément correspondant.

##### Exemple

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **Type:** `number`
-   **Obligatoire:** non

Cliquez x pixels `à droite` de l'élément correspondant.

##### Exemple

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **Type:** `number`
-   **Obligatoire:** non

Cliquez x pixels `en dessous` de l'élément correspondant.

##### Exemple

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **Type:** `number`
-   **Obligatoire:** non

Cliquez x pixels `à gauche` de l'élément correspondant.

##### Exemple

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Vous pouvez modifier la logique floue pour trouver du texte avec les options suivantes. Cela peut aider à trouver une meilleure correspondance.

#### `fuzzyFindOptions.distance`

-   **Type:** `number`
-   **Obligatoire:** non
-   **Par défaut:** 100

Détermine à quel point la correspondance doit être proche de l'emplacement flou (spécifié par location). Une correspondance exacte de lettre qui est à distance caractères de l'emplacement flou serait considérée comme une non-correspondance complète. Une distance de 0 nécessite que la correspondance soit à l'emplacement exact spécifié. Une distance de 1000 nécessiterait une correspondance parfaite pour être à moins de 800 caractères de l'emplacement pour être trouvée en utilisant un seuil de 0,8.

##### Exemple

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **Type:** `number`
-   **Obligatoire:** non
-   **Par défaut:** 0

Détermine approximativement où dans le texte le modèle est censé être trouvé.

##### Exemple

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **Type:** `number`
-   **Obligatoire:** non
-   **Par défaut:** 0.6

À quel moment l'algorithme de correspondance abandonne. Un seuil de 0 nécessite une correspondance parfaite (à la fois des lettres et de l'emplacement), un seuil de 1.0 correspondrait à n'importe quoi.

##### Exemple

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Type:** `boolean`
-   **Obligatoire:** non
-   **Par défaut:** false

Si la recherche doit être sensible à la casse.

##### Exemple

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Type:** `number`
-   **Obligatoire:** non
-   **Par défaut:** 2

Seules les correspondances dont la longueur dépasse cette valeur seront renvoyées. (Par exemple, si vous voulez ignorer les correspondances de caractères uniques dans le résultat, définissez-le à 2)

##### Exemple

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **Type:** `number`
-   **Obligatoire:** non
-   **Par défaut:** false

Lorsque `true`, la fonction de correspondance continuera jusqu'à la fin d'un modèle de recherche même si une correspondance parfaite a déjà été localisée dans la chaîne.

##### Exemple

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```