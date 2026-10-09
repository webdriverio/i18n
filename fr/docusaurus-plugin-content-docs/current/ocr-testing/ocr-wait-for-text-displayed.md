---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
description: "Attendez qu'un texte spécifique s'affiche à l'écran avec ocrWaitForTextDisplayed du service OCR."
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
# ocrWaitForTextDisplayed utilise ocrGetElementPositionByText en interne, c'est pourquoi vous voyez la commande ocrGetElementPositionByText dans les logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Options

### `text`

<Option type="string" required="yes">

Le texte que vous souhaitez rechercher pour cliquer dessus.

</Option>
#### Exemple

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

<Option type="number" default="18000 (18 seconds)" required="no">

Temps en millisecondes. Sachez que le processus OCR peut prendre un certain temps, ne le définissez donc pas trop bas.

</Option>
#### Exemple

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // attendre 25 secondes
});
```

### `timeoutMsg`

<Option type="string" default={`Could not find the text "{selector}" within the requested time.`} required="no">

Remplace le message d'erreur par défaut.

</Option>
#### Exemple

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Plus le contraste est élevé, plus l'image est sombre, et inversement. Cela peut aider à trouver du texte dans une image. Accepte des valeurs comprises entre `-1` et `1`.

</Option>
#### Exemple

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Il s'agit de la zone de recherche à l'écran dans laquelle l'OCR doit chercher du texte. Il peut s'agir d'un élément ou d'un rectangle contenant `x`, `y`, `width` et `height`

</Option>
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

<Option type="string" default="eng" required="No">

La langue que Tesseract reconnaîtra. Plus d'informations sont disponibles [ici](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) et les langues prises en charge sont disponibles [ici](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
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

Vous pouvez modifier la logique floue (fuzzy) de recherche de texte avec les options suivantes. Cela peut aider à trouver une meilleure correspondance

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Détermine à quel point la correspondance doit être proche de l'emplacement flou (spécifié par location). Une correspondance exacte de lettres située à distance caractères de l'emplacement flou serait considérée comme une non-correspondance complète. Une distance de 0 exige que la correspondance se trouve à l'emplacement exact spécifié. Une distance de 1000 exigerait qu'une correspondance parfaite se trouve à moins de 800 caractères de l'emplacement pour être trouvée avec un seuil de 0.8.

</Option>
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

<Option type="number" default="0" required="no">

Détermine approximativement à quel endroit du texte le motif est censé être trouvé.

</Option>
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

<Option type="number" default="0.6" required="no">

À quel moment l'algorithme de correspondance abandonne. Un seuil de 0 exige une correspondance parfaite (des lettres et de l'emplacement), un seuil de 1.0 correspondrait à n'importe quoi.

</Option>
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

<Option type="boolean" default="false" required="no">

Indique si la recherche doit être sensible à la casse.

</Option>
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

<Option type="number" default="2" required="no">

Seules les correspondances dont la longueur dépasse cette valeur seront renvoyées. (Par exemple, si vous souhaitez ignorer les correspondances d'un seul caractère dans le résultat, définissez-la à 2)

</Option>
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

<Option type="number" default="false" required="no">

Lorsque `true`, la fonction de correspondance continuera jusqu'à la fin d'un motif de recherche même si une correspondance parfaite a déjà été trouvée dans la chaîne.

</Option>
##### Exemple

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```