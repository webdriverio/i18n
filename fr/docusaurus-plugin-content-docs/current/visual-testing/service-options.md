---
id: service-options
title: Options du service
description: "Configurez les options par défaut du service visuel, notamment la capture d'écran, les captures d'écran pleine page, les références (baselines), les dossiers et le reporting."
---

Les options du service sont les options qui peuvent être définies lors de l'instanciation du service et qui seront utilisées pour chaque appel de méthode.

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

# Options par défaut

## Capture d'écran

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Masque les barres de défilement dans l'application. Si la valeur est `true`, toutes les barres de défilement seront désactivées avant la prise d'une capture d'écran. La valeur par défaut est `true` afin d'éviter des problèmes supplémentaires.

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Active/désactive le « clignotement » du curseur de tous les éléments `input`, `textarea` et `[contenteditable]` dans l'application. Si la valeur est `true`, le curseur sera défini sur `transparent` avant la prise d'une capture d'écran
et réinitialisé une fois terminé

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Active/désactive toutes les animations CSS dans l'application. Si la valeur est `true`, toutes les animations seront désactivées avant la prise d'une capture d'écran
et réinitialisées une fois terminé

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No" contexts="Web">

Cette option masque tout le texte d'une page afin que seule la mise en page soit utilisée pour la comparaison. Le masquage est effectué en ajoutant le style `'color': 'transparent !important'` à **chaque** élément.

Pour le résultat, voir [Résultat des tests](/docs/visual-testing/test-output#enablelayouttesting)

:::info
En utilisant ce flag, chaque élément contenant du texte (donc pas seulement `p, h1, h2, h3, h4, h5, h6, span, a, li`, mais aussi `div|button|..`) recevra cette propriété. Il n'existe **aucune** option pour personnaliser cela.
:::

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No" contexts="Web, Hybrid App (Webview)">

Marge intérieure en pixels de l'appareil ajoutée de chaque côté des régions ignorées, rendant chaque région 2× cette valeur plus large et plus haute. Cela permet d'éviter les différences de 1 px aux bordures qui peuvent apparaître sur les écrans à DPR élevé ou avec le protocole de capture d'écran BiDi. Définissez la valeur sur `0` pour la désactiver.

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Les polices, y compris les polices tierces, peuvent être chargées de manière synchrone ou asynchrone. Le chargement asynchrone signifie que les polices peuvent se charger après que WebdriverIO a déterminé qu'une page est entièrement chargée. Pour éviter les problèmes de rendu des polices, ce module attendra par défaut que toutes les polices soient chargées avant de prendre une capture d'écran.

</Option>
## Captures d'écran pleine page

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview) **Introduced in visual-service@7.0.0">

Par défaut, les captures d'écran pleine page sur le web desktop sont réalisées à l'aide du protocole WebDriver BiDi, qui permet des captures rapides, stables et cohérentes sans défilement.
Lorsque userBasedFullPageScreenshot est défini sur true, le processus de capture simule un utilisateur réel : il fait défiler la page, prend des captures de la taille du viewport et les assemble. Cette méthode est utile pour les pages avec du contenu chargé de manière différée (lazy loading) ou un rendu dynamique dépendant de la position de défilement.

Utilisez cette option si votre page dépend du chargement de contenu pendant le défilement ou si vous souhaitez conserver le comportement des anciennes méthodes de capture d'écran.

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No" contexts="Web">

Le délai d'attente en millisecondes après un défilement. Cela peut aider à identifier les pages utilisant le lazy loading.

:::info

Cela ne fonctionne que lorsque l'option de service/méthode `userBasedFullPageScreenshot` est définie sur `true`, voir aussi [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedfullpagescreenshot)

:::

</Option>
## Mobile et appareils

---

### `isHybridApp`

<Option type="boolean" default="false" required="No" contexts="Hybrid App (Webview)">

Définissez cette option sur `true` lorsque vous testez une application hybride (une coque native avec une ou plusieurs webviews intégrées). Cela ajuste la façon dont le module gère les découpes de la barre d'état et de la barre d'adresse pour les écrans basés sur des webviews, en revenant à des valeurs par défaut sûres lorsque les données de rectangle natif de l'appareil ne sont pas disponibles.

</Option>
### `addIOSBezelCorners`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Ajoute les coins du cadre (bezel) et l'encoche/Dynamic Island à la capture d'écran pour les appareils iOS.

:::info REMARQUE
Cela n'est possible que lorsque le nom de l'appareil **PEUT** être déterminé automatiquement et correspond à la liste suivante de noms d'appareils normalisés. La normalisation est effectuée par ce module.
**iPhone :**

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
    **iPads :**
-   iPad Mini 6e génération : `ipadmini`
-   iPad Air 4e génération : `ipadair`
-   iPad Air 5e génération : `ipadair`
-   iPad Pro (11 pouces) 1re génération : `ipadpro11`
-   iPad Pro (11 pouces) 2e génération : `ipadpro11`
-   iPad Pro (11 pouces) 3e génération : `ipadpro11`
-   iPad Pro (12,9 pouces) 3e génération : `ipadpro129`
-   iPad Pro (12,9 pouces) 4e génération : `ipadpro129`
-   iPad Pro (12,9 pouces) 5e génération : `ipadpro129`
:::

</Option>
### `addressBarShadowPadding`

<Option type="number" default="6" required="No" contexts="Web">

La marge intérieure qui doit être ajoutée à la barre d'adresse sur iOS et Android pour effectuer une découpe correcte du viewport.

</Option>
### `toolBarShadowPadding`

<Option type="number" default={`6 for Android and \`15\` for iOS (\`6\` by default and \`9\` will be added automatically for the possible home bar on iPhones with a notch or iPads that have a home bar)`} required="No" contexts="Web">

La marge intérieure qui doit être ajoutée à la barre d'outils sur iOS et Android pour effectuer une découpe correcte du viewport.

</Option>
## Gestion des fichiers et dossiers

---

### `baselineFolder`

<Option type="string|()=> string" default=".path/to/testfile/__snapshots__/" required="No" contexts="Web, Hybrid App (Webview), Native App">

Le répertoire qui contiendra toutes les images de référence (baseline) utilisées lors de la comparaison. S'il n'est pas défini, la valeur par défaut sera utilisée, ce qui stockera les fichiers dans un dossier `__snapshots__/` à côté de la spec qui exécute les tests visuels. Une fonction qui retourne une `string` peut également être utilisée pour définir la valeur de `baselineFolder` :

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// OR
{
    baselineFolder: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

</Option>
### `screenshotPath`

<Option type="string | () => string" default=".tmp/" required="no" contexts="Web, Hybrid App (Webview), Native App">

Le répertoire qui contiendra toutes les captures d'écran actuelles/de différences. S'il n'est pas défini, la valeur par défaut sera utilisée. Une fonction qui
retourne une chaîne peut également être utilisée pour définir la valeur de screenshotPath :

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// OR
{
    screenshotPath: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

</Option>
### `clearRuntimeFolder`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Supprime le dossier d'exécution (`actual` & `diff) lors de l'initialisation

:::info REMARQUE
Cela ne fonctionne que lorsque [`screenshotPath`](#screenshotpath) est défini via les options du plugin, et **NE FONCTIONNERA PAS** si vous définissez les dossiers dans les méthodes
:::

</Option>
### `savePerInstance`

<Option type="boolean" default="false" required="no" contexts="Web, Hybrid App (Webview), Native App">

Enregistre les images par instance dans un dossier séparé ; par exemple, toutes les captures d'écran Chrome seront enregistrées dans un dossier Chrome comme `desktop_chrome`.

</Option>
### `formatImageName`

<Option type="string" default={`{tag}-{browserName}-{width}x{height}-dpr-{dpr}`} required="No" contexts="Web, Hybrid App (Webview), Native App">

Le nom des images enregistrées peut être personnalisé en passant le paramètre `formatImageName` avec une chaîne de format comme :

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Les variables suivantes peuvent être utilisées pour formater la chaîne et seront automatiquement lues à partir des capabilities de l'instance.
Si elles ne peuvent pas être déterminées, les valeurs par défaut seront utilisées.

-   `browserName` : le nom du navigateur dans les capabilities fournies
-   `browserVersion` : la version du navigateur fournie dans les capabilities
-   `deviceName` : le nom de l'appareil issu des capabilities
-   `dpr` : le ratio de pixels de l'appareil (device pixel ratio)
-   `height` : la hauteur de l'écran
-   `logName` : le logName issu des capabilities
-   `mobile` : ajoute `_app`, ou le nom du navigateur après le `deviceName` pour distinguer les captures d'écran d'application des captures d'écran de navigateur
-   `platformName` : le nom de la plateforme dans les capabilities fournies
-   `platformVersion` : la version de la plateforme fournie dans les capabilities
-   `tag` : le tag fourni dans les méthodes appelées
-   `width` : la largeur de l'écran

:::info

Vous ne pouvez pas fournir de chemins/dossiers personnalisés dans `formatImageName`. Si vous souhaitez modifier le chemin, veuillez consulter les options suivantes :

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) par méthode

:::

</Option>
## Comportement des références et de l'enregistrement

---

### `autoSaveBaseline`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview), Native App">

Si aucune image de référence n'est trouvée lors de la comparaison, l'image est automatiquement copiée dans le dossier des références.

</Option>
### `autoElementScroll`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Cette option permet de désactiver le défilement automatique de l'élément dans la vue lors de la création d'une capture d'écran d'élément.

</Option>
### `alwaysSaveActualImage`

<Option type="boolean" default="true" required="No" contexts="All">

Lorsque cette option est définie sur `false`, elle :

- n'enregistrera pas l'image actuelle lorsqu'il n'y a **aucune** différence
- ne stockera pas le fichier de rapport JSON lorsque `createJsonReportFiles` est défini sur `true`. Un avertissement indiquant que `createJsonReportFiles` est désactivé sera également affiché dans les logs

Cela devrait améliorer les performances, car aucun fichier n'est écrit sur le système, et devrait éviter d'avoir beaucoup de bruit dans le dossier `actual`.

</Option>
## Reporting

---

### `createJsonReportFiles` **(NOUVEAU)**

<Option type="boolean" default="false" required="No">

Vous avez désormais la possibilité d'exporter les résultats de comparaison dans un fichier de rapport JSON. En fournissant l'option `createJsonReportFiles: true`, chaque image comparée créera un rapport stocké dans le dossier `actual`, à côté de chaque résultat d'image `actual`. Le résultat ressemblera à ceci :

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

Lorsque tous les tests sont exécutés, un nouveau fichier JSON contenant l'ensemble des comparaisons sera généré et se trouvera à la racine de votre dossier `actual`. Les données sont regroupées par :

-   `describe` pour Jasmine/Mocha ou `Feature` pour CucumberJS
-   `it` pour Jasmine/Mocha ou `Scenario` pour CucumberJS
    puis triées par :
-   `commandName`, qui correspond aux noms des méthodes de comparaison utilisées pour comparer les images
-   `instanceData`, d'abord le navigateur, puis l'appareil, puis la plateforme
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

Les données du rapport vous permettront de construire votre propre rapport visuel sans avoir à effectuer vous-même toute la magie et la collecte des données.

:::info REMARQUE
Vous devez utiliser `@wdio/visual-testing` en version `5.2.0` ou supérieure
:::

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No" contexts="Web, Hybrid App (Webview), Native App">

La proximité en pixels utilisée pour regrouper les pixels de différence dans le rapport JSON généré par [`createJsonReportFiles`](#createjsonreportfiles). Des valeurs plus élevées regroupent davantage de pixels dans moins de zones de délimitation (bounding boxes) ; des valeurs plus faibles produisent des zones plus précises mais plus nombreuses.

</Option>
## Général

---

### `logLevel`

<Option type="string" default="info" required="No" contexts="Web, Hybrid App (Webview), Native App">

Ajoute des logs supplémentaires, les options sont `debug | info | warn | silent`

Les erreurs sont toujours affichées dans la console.

</Option>
## Options de tabulation (Tabbable)

:::info REMARQUE

Ce module permet également de dessiner la façon dont un utilisateur utiliserait son clavier pour naviguer avec la touche _tab_ sur le site web, en traçant des lignes et des points d'un élément tabulable à un autre.<br/>
Ce travail est inspiré de l'article de blog de [Viv Richards](https://github.com/vivrichards600) intitulé ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
La sélection des éléments tabulables est basée sur le module [tabbable](https://github.com/davidtheclark/tabbable). En cas de problème concernant la tabulation, veuillez consulter le [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) et en particulier la [section More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Les options qui peuvent être modifiées pour les lignes et les points si vous utilisez les méthodes `{save|check}Tabbable`. Les options sont expliquées ci-dessous.

</Option>
#### `tabbableOptions.circle`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Les options pour modifier le cercle.

</Option>
##### `tabbableOptions.circle.backgroundColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

La couleur de fond du cercle.

</Option>
##### `tabbableOptions.circle.borderColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

La couleur de la bordure du cercle.

</Option>
##### `tabbableOptions.circle.borderWidth`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

L'épaisseur de la bordure du cercle.

</Option>
##### `tabbableOptions.circle.fontColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

La couleur de la police du texte dans le cercle. Elle ne sera affichée que si [`showNumber`](./#tabbableoptionscircleshownumber) est défini sur `true`.

</Option>
##### `tabbableOptions.circle.fontFamily`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

La famille de police du texte dans le cercle. Elle ne sera affichée que si [`showNumber`](./#tabbableoptionscircleshownumber) est défini sur `true`.

Assurez-vous de définir des polices prises en charge par les navigateurs.

</Option>
##### `tabbableOptions.circle.fontSize`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

La taille de la police du texte dans le cercle. Elle ne sera affichée que si [`showNumber`](./#tabbableoptionscircleshownumber) est défini sur `true`.

</Option>
##### `tabbableOptions.circle.size`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

La taille du cercle.

</Option>
##### `tabbableOptions.circle.showNumber`

<Option type="showNumber" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Affiche le numéro de séquence de tabulation dans le cercle.

</Option>
#### `tabbableOptions.line`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Les options pour modifier la ligne.

</Option>
##### `tabbableOptions.line.color`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

La couleur de la ligne.

</Option>
##### `tabbableOptions.line.width`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

L'épaisseur de la ligne.

</Option>
## Options de comparaison

### `compareOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) for all default values" required="No" contexts="Web, Hybrid App (Webview), Native App (See [Method Compare options](./method-options#compare-check-options) for more information)">

Les options de comparaison peuvent également être définies comme options du service ; elles sont décrites dans les [options de comparaison des méthodes](/docs/visual-testing/method-options#compare-check-options)

</Option>