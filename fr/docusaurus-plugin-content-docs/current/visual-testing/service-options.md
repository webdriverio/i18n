---
id: service-options
title: Options de Service
---

Les options de service sont les options qui peuvent être définies lors de l'instanciation du service et seront utilisées pour chaque appel de méthode.

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
                // The options
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
-   **Contextes d'application pris en charge:** Web

Le rembourrage doit être ajouté à la barre d'adresse sur iOS et Android pour faire une découpe correcte de la fenêtre d'affichage.

### `autoElementScroll`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `true`
-   **Contextes d'application pris en charge:** Web, Application hybride (Webview)

Cette option vous permet de désactiver le défilement automatique de l'élément dans la vue lorsqu'une capture d'écran d'élément est créée.

### `addIOSBezelCorners`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `false`
-   **Contextes d'application pris en charge:** Web, Application hybride (Webview), Application native

Ajoutez des coins de lunette et une encoche/île dynamique à la capture d'écran pour les appareils iOS.

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
-   **Contextes d'application pris en charge:** Web, Application hybride (Webview), Application native

Si aucune image de référence n'est trouvée pendant la comparaison, l'image est automatiquement copiée dans le dossier de référence.

### `baselineFolder`

-   **Type:** `string|()=> string`
-   **Obligatoire:** Non
-   **Défaut:** `.path/to/testfile/__snapshots__/`
-   **Contextes d'application pris en charge:** Web, Application hybride (Webview), Application native

Le répertoire qui contiendra toutes les images de référence utilisées lors de la comparaison. Si non défini, la valeur par défaut sera utilisée, ce qui stockera les fichiers dans un dossier `__snapshots__/` à côté de la spécification qui exécute les tests visuels. Une fonction qui renvoie une `string` peut également être utilisée pour définir la valeur `baselineFolder` :

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// OU
{
    baselineFolder: () => {
        // Faites de la magie ici
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `false`
-   **Contextes d'application pris en charge:** Web, Application hybride (Webview), Application native

Supprimez le dossier d'exécution (`actual` et `diff`) lors de l'initialisation

:::info NOTE
Cela ne fonctionnera que lorsque le [`screenshotPath`](#screenshotpath) est défini via les options du plugin, et **NE FONCTIONNERA PAS** lorsque vous définissez les dossiers dans les méthodes
:::

### `createJsonReportFiles` **(NOUVEAU)**

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `false`

Vous avez maintenant la possibilité d'exporter les résultats de comparaison dans un fichier de rapport JSON. En fournissant l'option `createJsonReportFiles: true`, chaque image comparée créera un rapport stocké dans le dossier `actual`, à côté de chaque résultat d'image `actual`. La sortie ressemblera à ceci :

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

Lorsque tous les tests sont exécutés, un nouveau fichier JSON contenant la collection des comparaisons sera généré et pourra être trouvé à la racine de votre dossier `actual`. Les données sont regroupées par :

-   `describe` pour Jasmine/Mocha ou `Feature` pour CucumberJS
-   `it` pour Jasmine/Mocha ou `Scenario` pour CucumberJS
    puis triées par :
-   `commandName`, qui sont les noms de méthodes de comparaison utilisés pour comparer les images
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

Les données du rapport vous donneront l'opportunité de construire votre propre rapport visuel sans faire toute la magie et la collecte de données vous-même.

:::info NOTE
Vous devez utiliser `@wdio/visual-testing` version `5.2.0` ou supérieure
:::

### `disableBlinkingCursor`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `false`
-   **Contextes d'application pris en charge:** Web, Application hybride (Webview)

Activer/Désactiver le "clignotement" du curseur dans tous les `input`, `textarea`, `[contenteditable]` de l'application. Si défini sur `true`, le curseur sera défini sur `transparent` avant de prendre une capture d'écran
et réinitialisé une fois terminé

### `disableCSSAnimation`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `false`
-   **Contextes d'application pris en charge:** Web, Application hybride (Webview)

Activer/Désactiver toutes les animations CSS dans l'application. Si défini sur `true`, toutes les animations seront désactivées avant de prendre une capture d'écran
et réinitialisées une fois terminé

### `enableLayoutTesting`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `false`
-   **Contextes d'application pris en charge:** Web

Cela masquera tout le texte sur une page afin que seule la mise en page soit utilisée pour la comparaison. Le masquage sera effectué en ajoutant le style `'color': 'transparent !important'` à **chaque** élément.

Pour la sortie, voir [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
En utilisant ce drapeau, chaque élément qui contient du texte (donc pas seulement `p, h1, h2, h3, h4, h5, h6, span, a, li`, mais aussi `div|button|..`) recevra cette propriété. Il n'y a **pas** d'option pour personnaliser cela.
:::

### `formatImageName`

-   **Type:** `string`
-   **Obligatoire:** Non
-   **Défaut:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Contextes d'application pris en charge:** Web, Application hybride (Webview), Application native

Le nom des images enregistrées peut être personnalisé en passant le paramètre `formatImageName` avec une chaîne de format comme :

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
-   `tag`: Le tag fourni dans les méthodes qui sont appelées
-   `width`: La largeur de l'écran

:::info

Vous ne pouvez pas fournir de chemins/dossiers personnalisés dans le `formatImageName`. Si vous souhaitez modifier le chemin, veuillez vérifier la modification des options suivantes :

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) par méthode

:::

### `fullPageScrollTimeout`

-   **Type:** `number`
-   **Obligatoire:** Non
-   **Défaut:** `1500`
-   **Contextes d'application pris en charge:** Web

Le délai d'attente en millisecondes après un défilement. Cela peut aider à identifier les pages avec chargement paresseux.

:::info

Cela ne fonctionnera que lorsque l'option de service/méthode `userBasedFullPageScreenshot` est définie sur `true`, voir aussi [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `true`
-   **Contextes d'application pris en charge:** Web, Application hybride (Webview)

Masquer les barres de défilement dans l'application. Si défini sur true, toutes les barres de défilement seront désactivées avant de prendre une capture d'écran. C'est défini par défaut sur `true` pour éviter des problèmes supplémentaires.

### `logLevel`

-   **Type:** `string`
-   **Obligatoire:** Non
-   **Défaut:** `info`
-   **Contextes d'application pris en charge:** Web, Application hybride (Webview), Application native

Ajoute des logs supplémentaires, les options sont `debug | info | warn | silent`

Les erreurs sont toujours enregistrées dans la console.

### `savePerInstance`

-   **Type:** `boolean`
-   **Défaut:** `false`
-   **Obligatoire:** non
-   **Contextes d'application pris en charge:** Web, Application hybride (Webview), Application native

Enregistrez les images par instance dans un dossier séparé, donc par exemple toutes les captures d'écran Chrome seront enregistrées dans un dossier Chrome comme `desktop_chrome`.

### `screenshotPath`

-   **Type:** `string | () => string`
-   **Défaut:** `.tmp/`
-   **Obligatoire:** non
-   **Contextes d'application pris en charge:** Web, Application hybride (Webview), Application native

Le répertoire qui contiendra toutes les captures d'écran réelles/différentes. Si non défini, la valeur par défaut sera utilisée. Une fonction qui
renvoie une chaîne peut également être utilisée pour définir la valeur screenshotPath :

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// OU
{
    screenshotPath: () => {
        // Faites de la magie ici
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Type:** `number`
-   **Obligatoire:** Non
-   **Défaut:** `6` pour Android et `15` pour iOS (`6` par défaut et `9` seront ajoutés automatiquement pour la barre d'accueil possible sur les iPhones avec une encoche ou les iPads qui ont une barre d'accueil)
-   **Contextes d'application pris en charge:** Web

Le rembourrage qui doit être ajouté à la barre d'outils sur iOS et Android pour faire une découpe correcte de la fenêtre d'affichage.

### `userBasedFullPageScreenshot`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `false`
-   **Contextes d'application pris en charge:** Web, Application hybride (Webview) **Introduit dans visual-service@7.0.0**

Par défaut, les captures d'écran pleine page sur le web de bureau sont capturées à l'aide du protocole WebDriver BiDi, qui permet des captures d'écran rapides, stables et cohérentes sans défilement.
Lorsque userBasedFullPageScreenshot est défini sur true, le processus de capture d'écran simule un utilisateur réel : défilement de la page, capture de captures d'écran de taille de fenêtre et assemblage. Cette méthode est utile pour les pages avec du contenu chargé paresseusement ou un rendu dynamique qui dépend de la position de défilement.

Utilisez cette option si votre page dépend du chargement de contenu pendant le défilement ou si vous souhaitez conserver le comportement des méthodes de capture d'écran plus anciennes.

### `waitForFontsLoaded`

-   **Type:** `boolean`
-   **Obligatoire:** Non
-   **Défaut:** `true`
-   **Contextes d'application pris en charge:** Web, Application hybride (Webview)

Les polices, y compris les polices tierces, peuvent être chargées de manière synchrone ou asynchrone. Le chargement asynchrone signifie que les polices peuvent se charger après que WebdriverIO ait déterminé qu'une page est complètement chargée. Pour éviter les problèmes de rendu de police, ce module attendra par défaut que toutes les polices soient chargées avant de prendre une capture d'écran.

## Options de tabulation

:::info NOTE

Ce module prend également en charge le dessin de la façon dont un utilisateur utiliserait son clavier pour _tabulation_ à travers le site Web en dessinant des lignes et des points d'élément tabulable à élément tabulable.<br/>
Le travail est inspiré par le billet de blog de [Viv Richards](https://github.com/vivrichards600) sur ["AUTOMATISATION DE LA TABULABILITÉ DE LA PAGE (EST-CE UN MOT ?) AVEC DES TESTS VISUELS"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
La façon dont les éléments tabulables sont sélectionnés est basée sur le module [tabbable](https://github.com/davidtheclark/tabbable). S'il y a des problèmes concernant la tabulation, veuillez consulter le [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) et surtout la [section Plus de détails](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Type:** `object`
-   **Obligatoire:** Non
-   **Défaut:** Voir [ici](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) pour toutes les valeurs par défaut
-   **Contextes d'application pris en charge:** Web

Les options qui peuvent être modifiées pour les lignes et les points si vous utilisez les méthodes `{save|check}Tabbable`. Les options sont expliquées ci-dessous.

#### `tabbableOptions.circle`

-   **Type:** `object`
-   **Obligatoire:** Non
-   **Défaut:** Voir [ici](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) pour toutes les valeurs par défaut
-   **Contextes d'application pris en charge:** Web

Les options pour modifier le cercle.

##### `tabbableOptions.circle.backgroundColor`

-   **Type:** `string`
-   **Obligatoire:** Non
-   **Défaut:** Voir [ici](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) pour toutes les valeurs par défaut
-   **Contextes d'application pris en charge:** Web

La couleur de fond du cercle.

##### `tabbableOptions.circle.borderColor`

-   **Type:** `string`
-   **Obligatoire:** Non
-   **Défaut:** Voir [ici](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) pour toutes les valeurs par défaut
-   **Contextes d'application pris en charge:** Web

La couleur de bordure du cercle.

##### `tabbableOptions.circle.borderWidth`

-   **Type:** `number`
-   **Obligatoire:** Non
-   **Défaut:** Voir [ici](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) pour toutes les valeurs par défaut
-   **Contextes d'application pris en charge:** Web

La largeur de bordure du cercle.

##### `tabbableOptions.circle.fontColor`

-   **Type:** `string`
-   **Obligatoire:** Non
-   **Défaut:** Voir [ici](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) pour toutes les valeurs par défaut
-   **Contextes d'application pris en charge:** Web

La couleur de la police du texte dans le cercle. Cela ne sera affiché que si [`showNumber`](./#tabbableoptionscircleshownumber) est défini sur `true`.

##### `tabbableOptions.circle.fontFamily`

-   **Type:** `string`
-   **Obligatoire:** Non
-   **Défaut:** Voir [ici](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) pour toutes les valeurs par défaut
-   **Contextes d'application pris en charge:** Web

La famille de la police du texte dans le cercle. Cela ne sera affiché que si [`showNumber`](./#tabbableoptionscircleshownumber) est défini sur `true`.

Assurez-vous de définir des polices prises en charge par les navigateurs.

##### `tabbableOptions.circle.fontSize`

-   **Type:** `number`
-   **Obligatoire:** Non
-   **Défaut:** Voir [ici](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) pour toutes les valeurs par défaut
-   **Contextes d'application pris en charge:** Web

La taille de la police du texte dans le cercle. Cela ne sera affiché que si [`showNumber`](./#tabbableoptionscircleshownumber) est défini sur `true`.

##### `tabbableOptions.circle.size`

-   **Type:** `number`
-   **Obligatoire:** Non
-   **Défaut:** Voir [ici](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) pour toutes les valeurs par défaut
-   **Contextes d'application pris en charge:** Web

La taille du cercle.

##### `tabbableOptions.circle.showNumber`

-   **Type:** `showNumber`
-   **Obligatoire:** Non
-   **Défaut:** Voir [ici](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) pour toutes les valeurs par défaut
-   **Contextes d'application pris en charge:** Web

Afficher le numéro de séquence de tabulation dans le cercle.

#### `tabbableOptions.line`

-   **Type:** `object`
-   **Obligatoire:** Non
-   **Défaut:** Voir [ici](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) pour toutes les valeurs par défaut
-   **Contextes d'application pris en charge:** Web

Les options pour modifier la ligne.

##### `tabbableOptions.line.color`

-   **Type:** `string`
-   **Obligatoire:** Non
-   **Défaut:** Voir [ici](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) pour toutes les valeurs par défaut
-   **Contextes d'application pris en charge:** Web

La couleur de la ligne.

##### `tabbableOptions.line.width`

-   **Type:** `number`
-   **Obligatoire:** Non
-   **Défaut:** Voir [ici](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) pour toutes les valeurs par défaut
-   **Contextes d'application pris en charge:** Web

La largeur de la ligne.

## Options de comparaison

### `compareOptions`

-   **Type:** `object`
-   **Obligatoire:** Non
-   **Défaut:** Voir [ici](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) pour toutes les valeurs par défaut
-   **Contextes d'application pris en charge:** Web, Application hybride (Webview), Application native (Voir [Options de comparaison de méthode](./method-options#compare-check-options) pour plus d'informations)

Les options de comparaison peuvent également être définies comme options de service, elles sont décrites dans les [Options de comparaison de méthode](/docs/visual-testing/method-options#compare-check-options)