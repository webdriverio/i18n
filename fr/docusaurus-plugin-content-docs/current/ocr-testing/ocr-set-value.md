---
id: ocr-set-value
title: ocrSetValue
---

Envoie une séquence de frappes de touches à un élément. Cela va :

-   détecter automatiquement l'élément
-   mettre le focus sur le champ en cliquant dessus
-   définir la valeur dans le champ

La commande recherchera le texte fourni et essaiera de trouver une correspondance basée sur la logique floue de [Fuse.js](https://fusejs.io/). Cela signifie que si vous fournissez un sélecteur avec une faute de frappe, ou si le texte trouvé n'est pas une correspondance à 100%, il essaiera quand même de vous renvoyer un élément. Voir les [logs](#logs) ci-dessous.

## Utilisation

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## Sortie

### Logs

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## Options

### `text`

-   **Type:** `string`
-   **Obligatoire:** oui

Le texte que vous souhaitez rechercher pour cliquer dessus.

#### Exemple

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **Type:** `string`
-   **Obligatoire:** oui

Valeur à ajouter.

#### Exemple

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **Type:** `boolean`
-   **Obligatoire:** non
-   **Défaut:** `false`

Si la valeur doit également être soumise dans le champ de saisie. Cela signifie qu'un "ENTER" sera envoyé à la fin de la chaîne.

#### Exemple

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **Type:** `number`
-   **Obligatoire:** non
-   **Défaut:** `500` millisecondes

C'est la durée du clic. Si vous le souhaitez, vous pouvez également créer un "clic long" en augmentant le temps.

#### Exemple

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // Ceci est 3 secondes
});
```

### `contrast`

-   **Type:** `number`
-   **Obligatoire:** non
-   **Défaut:** `0.25`

Plus le contraste est élevé, plus l'image est sombre et vice versa. Cela peut aider à trouver du texte dans une image. Il accepte des valeurs entre `-1` et `1`.

#### Exemple

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **Type:** `number`
-   **Obligatoire:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

C'est la zone de recherche dans l'écran où l'OCR doit chercher du texte. Cela peut être un élément ou un rectangle contenant `x`, `y`, `width` et `height`

#### Exemple

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// OU
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// OU
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

-   **Type:** `string`
-   **Obligatoire:** Non
-   **Défaut:** `eng`

La langue que Tesseract reconnaîtra. Plus d'informations peuvent être trouvées [ici](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) et les langues prises en charge peuvent être trouvées [ici](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Exemple

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Utiliser le néerlandais comme langue
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Type:** `object`
-   **Obligatoire:** non

Vous pouvez cliquer sur l'écran par rapport à l'élément correspondant. Cela peut être fait en fonction des pixels relatifs `above`, `right`, `below` ou `left` de l'élément correspondant

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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        left: 100,
    },
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```