---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

Attendre qu'un texte spécifique s'affiche à l'écran.

## Utilisation

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## Sortie

### Logs

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Options

### `text`

-   **Type:** `string`
-   **Obligatoire:** oui

Le texte que vous souhaitez rechercher pour cliquer dessus.

#### Exemple

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **Type:** `number`
-   **Obligatoire:** non
-   **Défaut:** 18000 (18 secondes)

Temps en millisecondes. Soyez conscient que le processus OCR peut prendre du temps, donc ne le définissez pas trop bas.

#### Exemple

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // attendre pendant 25 secondes
});
```

### `timeoutMsg`

-   **Type:** `string`
-   **Obligatoire:** non
-   **Défaut:** `Could not find the text "{selector}" within the requested time.`

Remplace le message d'erreur par défaut.

#### Exemple

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **Type:** `number`
-   **Obligatoire:** non
-   **Défaut:** `0.25`

Plus le contraste est élevé, plus l'image est sombre et vice versa. Cela peut aider à trouver du texte dans une image. Il accepte des valeurs entre `-1` et `1`.

#### Exemple

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **Type:** `number`
-   **Obligatoire:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

C'est la zone de recherche à l'écran où l'OCR doit chercher du texte. Cela peut être un élément ou un rectangle contenant `x`, `y`, `width` et `height`

#### Exemple

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// OU
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// OU
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Type:** `boolean`
-   **Obligatoire:** non
-   **Défaut:** false

Indique si la recherche doit être sensible à la casse.

##### Exemple

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```