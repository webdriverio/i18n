---
id: getting-started
title: Premiers pas
description: "Installez et configurez @wdio/ocr-service, mettez en place la prise en charge de TypeScript et ajustez les options de contraste, de dossier d'images et de langue."
---

## Installation

Le moyen le plus simple est de conserver `@wdio/ocr-service` comme dépendance dans votre `package.json` via.

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

Les instructions sur la façon d'installer `WebdriverIO` se trouvent [ici.](../gettingstarted)

:::note
Ce module utilise Tesseract comme moteur OCR. Par défaut, il vérifiera si vous disposez d'une installation locale de Tesseract sur votre système ; si c'est le cas, il l'utilisera. Sinon, il utilisera le module [Node.js Tesseract.js](https://github.com/naptha/tesseract.js), qui est automatiquement installé pour vous.

Si vous souhaitez accélérer le traitement des images, il est conseillé d'utiliser une version de Tesseract installée localement. Voir aussi [Temps d'exécution des tests](./more-test-optimization#using-a-local-installation-of-tesseract).
:::

Les instructions sur la façon d'installer Tesseract en tant que dépendance système sur votre système local se trouvent [ici](https://tesseract-ocr.github.io/tessdoc/Installation.html).

:::caution
Pour toute question ou erreur d'installation concernant Tesseract, veuillez vous référer au projet
[Tesseract](https://github.com/tesseract-ocr/tesseract).
:::

## Prise en charge de Typescript

Assurez-vous d'ajouter `@wdio/ocr-service` à votre fichier de configuration `tsconfig.json`.

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## Configuration

Pour utiliser le service, vous devez ajouter `ocr` à votre tableau de services dans `wdio.conf.ts`

```js
// wdio.conf.js
exports.config = {
    //...
    services: [
        // vos autres services
        [
            "ocr",
            {
                contrast: 0.25,
                imagesFolder: ".tmp/",
                language: "eng",
            },
        ],
    ],
};
```

### Options de configuration

#### `contrast`

<Option type="number" default="0.25" required="No">

Plus le contraste est élevé, plus l'image est sombre, et inversement. Cela peut aider à trouver du texte dans une image. Il accepte des valeurs comprises entre `-1` et `1`.

</Option>
#### `imagesFolder`

<Option type="string" default={`{project-root}/.tmp/ocr`} required="No">

Le dossier dans lequel les résultats de l'OCR sont stockés.

:::note
Si vous fournissez un `imagesFolder` personnalisé, le service y ajoutera automatiquement le sous-dossier `ocr`.
:::

</Option>
#### `language`

<Option type="string" default="eng" required="No">

La langue que Tesseract reconnaîtra. Plus d'informations sont disponibles [ici](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) et les langues prises en charge se trouvent [ici](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
## Journaux

Ce module ajoutera automatiquement des journaux supplémentaires aux journaux de WebdriverIO. Il écrit dans les journaux `INFO` et `WARN` sous le nom `@wdio/ocr-service`.
Vous trouverez des exemples ci-dessous.

```log
...............
[0-0] 2024-05-24T06:55:12.739Z INFO @wdio/ocr-service: Adding commands to global browser
[0-0] 2024-05-24T06:55:12.750Z INFO @wdio/ocr-service: Adding browser command "ocrGetText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrGetElementPositionByText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrWaitForTextDisplayed" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrClickOnText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrSetValue" to browser object
...............
[0-0] 2024-05-24T06:55:13.667Z INFO @wdio/ocr-service:getData: Using system installed version of Tesseract
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: It took '0.351s' to process the image.
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: The following text was found through OCR:
[0-0]
[0-0] IQ Docs API Blog Contribute Community Sponsor Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: OCR Image with found text can be found here:
[0-0]
[0-0] .tmp/ocr/desktop-1716533713585.png
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "Get Started" and found one match "Started" with score "63.64
...............
```