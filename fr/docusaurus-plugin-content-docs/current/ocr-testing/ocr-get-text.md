---
id: ocr-get-text
title: ocrGetText
description: "Lisez le texte affiché à l'écran ou dans une zone spécifique avec ocrGetText du service OCR."
---

Obtenir le texte d'une image.

### Utilisation

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## Sortie

### Résultat

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### Journaux

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## Options

### `contrast`

<Option type="number" default="0.25" required="no">

Plus le contraste est élevé, plus l'image est sombre, et inversement. Cela peut aider à trouver du texte dans une image. Il accepte des valeurs comprises entre `-1` et `1`.

</Option>
#### Exemple

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Il s'agit de la zone de recherche à l'écran dans laquelle l'OCR doit chercher du texte. Cela peut être un élément ou un rectangle contenant `x`, `y`, `width` et `height`

</Option>
#### Exemple

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// OU
await browser.ocrGetText({ haystack: await $("elementSelector") });

// OU
await browser.ocrGetText({
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
await browser.ocrGetText({
    // Utiliser le néerlandais comme langue
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```