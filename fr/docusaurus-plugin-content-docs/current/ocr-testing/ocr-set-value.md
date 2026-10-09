---
id: ocr-set-value
title: ocrSetValue
description: "Saisissez du texte dans un champ de saisie repéré par son texte visible avec ocrSetValue, qui trouve le champ grâce à l'OCR et à la correspondance approximative."
---

Envoie une séquence de frappes au clavier à un élément. La commande va :

-   détecter automatiquement l'élément
-   donner le focus au champ en cliquant dessus
-   définir la valeur dans le champ

La commande recherche le texte fourni et tente de trouver une correspondance grâce à la logique floue (Fuzzy Logic) de [Fuse.js](https://fusejs.io/). Cela signifie que même si vous fournissez un sélecteur contenant une faute de frappe, ou si le texte trouvé ne correspond pas à 100 %, elle essaiera tout de même de vous renvoyer un élément. Consultez les [logs](#logs) ci-dessous.

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

<Option type="string" required="yes">

Le texte que vous souhaitez rechercher pour cliquer dessus.

</Option>
#### Exemple

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

<Option type="string" required="yes">

La valeur à ajouter.

</Option>
#### Exemple

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

<Option type="boolean" default="false" required="no">

Indique si la valeur doit également être soumise dans le champ de saisie. Cela signifie qu'un « ENTER » sera envoyé à la fin de la chaîne.

</Option>
#### Exemple

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

Il s'agit de la durée du clic. Si vous le souhaitez, vous pouvez également créer un « clic long » en augmentant cette durée.

</Option>
#### Exemple

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // Cela correspond à 3 secondes
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Plus le contraste est élevé, plus l'image est sombre, et inversement. Cela peut aider à trouver du texte dans une image. Les valeurs acceptées sont comprises entre `-1` et `1`.

</Option>
#### Exemple

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Il s'agit de la zone de recherche de l'écran dans laquelle l'OCR doit chercher du texte. Il peut s'agir d'un élément ou d'un rectangle contenant `x`, `y`, `width` et `height`

</Option>
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

<Option type="string" default="eng" required="No">

La langue que Tesseract va reconnaître. Plus d'informations sont disponibles [ici](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) et les langues prises en charge sont disponibles [ici](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
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

<Option type="object" required="no">

Vous pouvez cliquer sur l'écran par rapport à l'élément correspondant. Cela peut se faire en pixels relatifs `above` (au-dessus), `right` (à droite), `below` (en dessous) ou `left` (à gauche) de l'élément correspondant

:::note

Les combinaisons suivantes sont autorisées

-   propriétés seules
-   `above` + `left` ou `above` + `right`
-   `below` + `left` ou `below` + `right`

Les combinaisons suivantes ne sont **PAS** autorisées

-   `above` plus `below`
-   `left` plus `right`

:::

</Option>
#### `relativePosition.above`

<Option type="number" required="no">

Cliquer x pixels au-dessus (`above`) de l'élément correspondant.

</Option>
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

<Option type="number" required="no">

Cliquer x pixels à droite (`right`) de l'élément correspondant.

</Option>
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

<Option type="number" required="no">

Cliquer x pixels en dessous (`below`) de l'élément correspondant.

</Option>
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

<Option type="number" required="no">

Cliquer x pixels à gauche (`left`) de l'élément correspondant.

</Option>
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

Vous pouvez modifier la logique floue utilisée pour trouver du texte grâce aux options suivantes. Cela peut aider à trouver une meilleure correspondance

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Détermine à quel point la correspondance doit être proche de l'emplacement approximatif (spécifié par location). Une correspondance exacte de lettre située à distance caractères de l'emplacement approximatif serait considérée comme une non-correspondance totale. Une distance de 0 exige que la correspondance se trouve exactement à l'emplacement spécifié. Une distance de 1000 exigerait qu'une correspondance parfaite se trouve à moins de 800 caractères de l'emplacement pour être trouvée avec un seuil (threshold) de 0.8.

</Option>
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

<Option type="number" default="0" required="no">

Détermine approximativement à quel endroit du texte le motif est censé se trouver.

</Option>
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

<Option type="number" default="0.6" required="no">

Le point à partir duquel l'algorithme de correspondance abandonne. Un seuil de 0 exige une correspondance parfaite (à la fois des lettres et de l'emplacement), un seuil de 1.0 correspondrait à n'importe quoi.

</Option>
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

<Option type="boolean" default="false" required="no">

Indique si la recherche doit être sensible à la casse.

</Option>
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

<Option type="number" default="2" required="no">

Seules les correspondances dont la longueur dépasse cette valeur seront renvoyées. (Par exemple, si vous souhaitez ignorer les correspondances d'un seul caractère dans le résultat, définissez-la à 2)

</Option>
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

<Option type="number" default="false" required="no">

Lorsque la valeur est `true`, la fonction de correspondance continue jusqu'à la fin du motif de recherche, même si une correspondance parfaite a déjà été trouvée dans la chaîne.

</Option>
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