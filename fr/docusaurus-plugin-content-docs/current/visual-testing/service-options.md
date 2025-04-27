---
id: service-options
title: Options de Service
---

Les options de service sont les options qui peuvent être définies lors de l'instanciation du service et qui seront utilisées pour chaque appel de méthode.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Les options
            },
        ],
    ],
    // ...
};
```

## Options par défaut

### `addressBarShadowPadding`

-   **Type:** `number`
-   **Obligatoire:** Non
-   **Défaut:** `6`
-   **Supporté:** Web

Le rembourrage qui doit être ajouté à la barre d'adresse sur iOS et Android pour effectuer une découpe appropriée de la fenêtre d'affichage.

### `autoElementScroll`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `true`
-   **Supporté:** Web, Application hybride (Webview)

Cette option vous permet de désactiver le défilement automatique de l'élément dans la vue lorsqu'une capture d'écran d'élément est créée.

### `addIOSBezelCorners`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `false`
-   **Supporté:** Web, Application hybride (Webview), Application native

Ajouter des coins de cadre et une encoche/île dynamique à la capture d'écran pour les appareils iOS.

:::info NOTE
Cela ne peut être fait que lorsque le nom de l'appareil **PEUT** être déterminé automatiquement et correspond à la liste suivante de noms d'appareils normalisés. La normalisation sera effectuée par ce module.
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPads:**
-   iPad Mini 6th Generation: `ipadmini`
-   iPad Air 4th Generation: `ipadair`
-   iPad Air 5th Generation: `ipadair`
-   iPad Pro (11-inch) 1st Generation: `ipadpro11`
-   iPad Pro (11-inch) 2nd Generation: `ipadpro11`
-   iPad Pro (11-inch) 3rd Generation: `ipadpro11`
-   iPad Pro (12.9-inch) 3rd Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 4th Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 5th Generation: `ipadpro129`

:::

### `autoSaveBaseline`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `true`
-   **Supporté:** Web, Application hybride (Webview), Application native

Si aucune image de référence n'est trouvée pendant la comparaison, l'image est automatiquement copiée dans le dossier de référence.

### `baselineFolder`

-   **Type:** `string|()=> string`
-   **Obligatoire:** Non
-   **Défaut:** `.path/to/testfile/__snapshots__/`
-   **Supporté:** Web, Application hybride (Webview), Application native

Le répertoire qui contiendra toutes les images de référence utilisées lors de la comparaison. Si non défini, la valeur par défaut sera utilisée, ce qui stockera les fichiers dans un dossier `__snapshots__/` à côté du spec qui exécute les tests visuels. Une fonction qui renvoie une `string` peut également être utilisée pour définir la valeur `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// OU
{
    baselineFolder: () => {
        // Faire de la magie ici
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `false`
-   **Supporté:** Web, Application hybride (Webview), Application native

Supprimer le dossier d'exécution (`actual` & `diff`) lors de l'initialisation

:::info NOTE
Cela ne fonctionnera que lorsque [`screenshotPath`](#screenshotpath) est défini via les options du plugin, et **NE FONCTIONNERA PAS** lorsque vous définissez les dossiers dans les méthodes
:::

### `createJsonReportFiles` **(NOUVEAU)**

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `false`

Vous avez maintenant la possibilité d'exporter les résultats de comparaison dans un fichier de rapport JSON. En fournissant l'option `createJsonReportFiles: true`, chaque image comparée créera un rapport stocké dans le dossier `actual`, à côté de chaque résultat d'image `actual`. La sortie ressemblera à ceci:

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

Lorsque tous les tests sont exécutés, un nouveau fichier JSON avec la collection des comparaisons sera généré et pourra être trouvé à la racine de votre dossier `actual`. Les données sont regroupées par:

-   `describe` pour Jasmine/Mocha ou `Feature` pour CucumberJS
-   `it` pour Jasmine/Mocha ou `Scenario` pour CucumberJS
    puis triées par:
-   `commandName`, qui sont les noms de méthode de comparaison utilisés pour comparer les images
-   `instanceData`, navigateur d'abord, puis appareil, puis plateforme
    cela ressemblera à ceci

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

Les données du rapport vous donneront la possibilité de créer votre propre rapport visuel sans faire toute la magie et la collecte de données vous-même.

:::info NOTE
Vous devez utiliser `@wdio/visual-testing` version `5.2.0` ou supérieure
:::

### `disableBlinkingCursor`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `false`
-   **Supporté:** Web, Application hybride (Webview)

Activer/Désactiver le "clignotement" du curseur dans tous les `input`, `textarea`, `[contenteditable]` de l'application. Si défini sur `true`, le curseur sera défini sur `transparent` avant de prendre une capture d'écran
et réinitialisé une fois terminé

### `disableCSSAnimation`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `false`
-   **Supporté:** Web, Application hybride (Webview)

Activer/Désactiver toutes les animations CSS dans l'application. Si défini sur `true`, toutes les animations seront désactivées avant de prendre une capture d'écran
et réinitialisées une fois terminé

### `enableLayoutTesting`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `false`
-   **Supporté:** Web

Cela masquera tout le texte sur une page afin que seule la mise en page soit utilisée pour la comparaison. Le masquage sera effectué en ajoutant le style `'color': 'transparent !important'` à **chaque** élément.

Pour la sortie, voir [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
En utilisant ce drapeau, chaque élément contenant du texte (donc pas seulement `p, h1, h2, h3, h4, h5, h6, span, a, li`, mais aussi `div|button|..`) recevra cette propriété. Il n'y a **pas** d'option pour personnaliser cela.
:::

### `formatImageName`

-   **Type:** `string`
-   **Obligatoire:** Non
-   **Défaut:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Supporté:** Web, Application hybride (Webview), Application native

Le nom des images sauvegardées peut être personnalisé en passant le paramètre `formatImageName` avec une chaîne de format comme:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Les variables suivantes peuvent être passées pour formater la chaîne et seront automatiquement lues à partir des capacités de l'instance.
Si elles ne peuvent pas être déterminées, les valeurs par défaut seront utilisées.

-   `browserName`: Le nom du navigateur dans les capacités fournies
-   `browserVersion`: La version du navigateur fournie dans les capacités
-   `deviceName`: Le nom de l'appareil à partir des capacités
-   `dpr`: Le rapport de pixels de l'appareil
-   `height`: La hauteur de l'écran
-   `logName`: Le logName des capacités
-   `mobile`: Cela ajoutera `_app`, ou le nom du navigateur après le `deviceName` pour distinguer les captures d'écran d'application des captures d'écran de navigateur
-   `platformName`: Le nom de la plateforme dans les capacités fournies
-   `platformVersion`: La version de la plateforme fournie dans les capacités
-   `tag`: Le tag qui est fourni dans les méthodes qui sont appelées
-   `width`: La largeur de l'écran

:::info

Vous ne pouvez pas fournir de chemins/dossiers personnalisés dans le `formatImageName`. Si vous souhaitez modifier le chemin, veuillez vérifier la modification des options suivantes:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) par méthode

:::

### `fullPageScrollTimeout`

-   **Type:** `number`
-   **Obligatoire:** Non
-   **Défaut:** `1500`
-   **Supporté:** Web

Le délai d'attente en millisecondes après un défilement. Cela peut aider à identifier les pages avec chargement paresseux.

:::info

Cela ne fonctionnera que lorsque l'option de service/méthode `userBasedFullPageScreenshot` est définie sur `true`, voir aussi [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `true`
-   **Supporté:** Web, Application hybride (Webview)

Masquer les barres de défilement dans l'application. Si défini sur true, toutes les barres de défilement seront désactivées avant de prendre une capture d'écran. C'est défini par défaut sur `true` pour éviter des problèmes supplémentaires.

### `logLevel`

-   **Type:** `string`
-   **Obligatoire:** Non
-   **Défaut:** `info`
-   **Supporté:** Web, Application hybride (Webview), Application