---
id: method-options
title: Options des méthodes
description: "Définissez, pour chaque méthode de test visuel, des options de sauvegarde, de comparaison et de dossiers qui remplacent les options définies au niveau du service."
---

Les options des méthodes sont les options qui peuvent être définies par [méthode](./methods). Si l'option a la même clé qu'une option qui a été définie lors de l'instanciation du plugin, cette option de méthode remplacera la valeur de l'option du plugin.

:::info NOTE

-   Toutes les options des [Options de sauvegarde](#save-options) peuvent être utilisées pour les méthodes de [Comparaison](#compare-check-options)
-   Toutes les options de comparaison peuvent être utilisées lors de l'instanciation du service __ou__ pour chaque méthode de vérification. Si une option de méthode a la même clé qu'une option qui a été définie lors de l'instanciation du service, alors l'option de comparaison de la méthode remplacera la valeur de l'option de comparaison du service.
- Toutes les options peuvent être utilisées pour les contextes d'application ci-dessous, sauf mention contraire :
    - Web
    - Application hybride
    - Application native
- Les exemples ci-dessous utilisent les méthodes `save*`, mais peuvent également être utilisés avec les méthodes `check*`

:::

# Options de sauvegarde

## Affichage et rendu

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No">

- **Utilisé avec :** Toutes les [méthodes](./methods)
- **Contextes d'application pris en charge :** Web, Application hybride (Webview)

Masque la ou les barres de défilement dans l'application. Si la valeur est true, toutes les barres de défilement seront désactivées avant la capture d'écran. La valeur par défaut est `true` pour éviter des problèmes supplémentaires.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No">

- **Utilisé avec :** Toutes les [méthodes](./methods)
- **Contextes d'application pris en charge :** Web, Application hybride (Webview)

Active/désactive le « clignotement » du curseur de tous les éléments `input`, `textarea`, `[contenteditable]` dans l'application. Si la valeur est `true`, le curseur sera défini sur `transparent` avant la capture d'écran
et réinitialisé une fois terminé.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No">

- **Utilisé avec :** Toutes les [méthodes](./methods)
- **Contextes d'application pris en charge :** Web, Application hybride (Webview)

Active/désactive toutes les animations CSS dans l'application. Si la valeur est `true`, toutes les animations seront désactivées avant la capture d'écran
et réinitialisées une fois terminé

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No">

- **Utilisé avec :** Toutes les [méthodes](./methods)
- **Contextes d'application pris en charge :** Web, Application hybride (Webview)

Cette option masque tout le texte d'une page afin que seule la mise en page soit utilisée pour la comparaison. Le masquage est effectué en ajoutant le style `'color': 'transparent !important'` à __chaque__ élément.

Pour le résultat, consultez [Sortie des tests](./test-output#enablelayouttesting).

:::info
En utilisant ce drapeau, chaque élément contenant du texte (donc pas seulement `p, h1, h2, h3, h4, h5, h6, span, a, li`, mais aussi `div|button|..`) recevra cette propriété. Il n'y a __aucune__ option pour personnaliser cela.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

</Option>
### `enableLegacyScreenshotMethod`

<Option type="boolean" default="false" required="No">

- **Utilisé avec :** Toutes les [méthodes](./methods)
- **Contextes d'application pris en charge :** Web, Application hybride (Webview)

Utilisez cette option pour revenir à l'« ancienne » méthode de capture d'écran basée sur le protocole W3C-WebDriver. Cela peut être utile si vos tests reposent sur des images de référence existantes ou si vous travaillez dans des environnements qui ne prennent pas entièrement en charge les nouvelles captures d'écran basées sur BiDi.
Notez que l'activation de cette option peut produire des captures d'écran avec une résolution ou une qualité légèrement différente.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No">

- **Utilisé avec :** Toutes les [méthodes](./methods)
- **Contextes d'application pris en charge :** Web, Application hybride (Webview)

Marge en pixels d'appareil ajoutée de chaque côté des régions ignorées, rendant chaque région plus large et plus haute de 2× cette valeur. Cela permet d'éviter les différences de 1 px aux bordures qui peuvent apparaître sur les écrans à DPR élevé ou avec le protocole de capture d'écran BiDi. Définissez sur `0` pour désactiver.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        ignoreRegionPadding: 0
    }
)
```

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No">

- **Utilisé avec :** Toutes les [méthodes](./methods)
- **Contextes d'application pris en charge :** Web, Application hybride (Webview)

Les polices, y compris les polices tierces, peuvent être chargées de manière synchrone ou asynchrone. Le chargement asynchrone signifie que les polices peuvent se charger après que WebdriverIO a déterminé qu'une page est entièrement chargée. Pour éviter les problèmes de rendu des polices, ce module attendra par défaut que toutes les polices soient chargées avant de prendre une capture d'écran.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

</Option>
## Visibilité des éléments

---

### `hideElements`

<Option type="array" required="No">

- **Utilisé avec :** Toutes les [méthodes](./methods)
- **Contextes d'application pris en charge :** Web, Application hybride (Webview)

Cette méthode peut masquer un ou plusieurs éléments en leur ajoutant la propriété `visibility: hidden`, en fournissant un tableau d'éléments.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

</Option>
### `removeElements`

<Option type="array" required="No">

- **Utilisé avec :** Toutes les [méthodes](./methods)
- **Contextes d'application pris en charge :** Web, Application hybride (Webview)

Cette méthode peut _supprimer_ un ou plusieurs éléments en leur ajoutant la propriété `display: none`, en fournissant un tableau d'éléments.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        removeElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

</Option>
## Spécifique aux éléments

---

### `resizeDimensions`

<Option type="object" default={`{ top: 0, right: 0, bottom: 0, left: 0}`} required="No">

- **Utilisé avec :** Uniquement pour [`saveElement`](./methods#saveelement) ou [`checkElement`](./methods#checkelement)
- **Contextes d'application pris en charge :** Web, Application hybride (Webview), Application native

Un objet qui doit contenir un nombre de pixels `top`, `right`, `bottom` et `left` permettant d'agrandir la découpe de l'élément.

```typescript
await browser.saveElement(
    'sample-tag',
    {
        resizeDimensions: {
            top: 50,
            left: 100,
            right: 10,
            bottom: 90,
        },
    }
)
```

</Option>
### `biDiOrigin`

<Option type="'document' | 'viewport'" default="'document'" required="No">

- **Utilisé avec :** Uniquement pour [`saveElement`](./methods#saveelement) ou [`checkElement`](./methods#checkelement)
- **Contextes d'application pris en charge :** Web, Application hybride (Webview)

Option propre à BiDi qui contrôle l'origine des coordonnées utilisée lors de la capture d'écran d'éléments via le protocole WebDriver BiDi.

- `'document'` _(par défaut)_ : effectue le rendu de la mise en page du document. Fonctionne quelle que soit la position de l'élément, mais ne capture **pas** les calques composités (par ex. barres de défilement, superpositions fixed/sticky, éléments `will-change`).
- `'viewport'` : capture l'image composée telle qu'elle est peinte, y compris les barres de défilement et les superpositions. Nécessite que l'élément soit **entièrement visible** dans la zone d'affichage ; lève une erreur descriptive lorsque l'élément est en dehors de la zone d'affichage ou plus grand qu'elle.

```typescript
await browser.saveElement(
    await $('#my-element'),
    'sample-tag',
    {
        biDiOrigin: 'viewport'
    }
)
```

</Option>
## Spécifique à la page entière

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No">

- **Utilisé avec :** Uniquement pour [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) ou [`checkTabbablePage`](./methods#checktabbablepage)
- **Contextes d'application pris en charge :** Web, Application hybride (Webview)

Lorsque cette option est définie sur `true`, elle active la **stratégie de défilement et d'assemblage** pour capturer des captures d'écran de page entière.
Au lieu d'utiliser les capacités natives de capture d'écran du navigateur, elle fait défiler la page manuellement et assemble plusieurs captures d'écran.
Cette méthode est particulièrement utile pour les pages avec du **contenu chargé paresseusement (lazy-loading)** ou des mises en page complexes qui nécessitent un défilement pour être entièrement rendues.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No">

- **Utilisé avec :** Uniquement pour [`saveFullPageScreen`](./methods#savefullpagescreen) ou [`saveTabbablePage`](./methods#savetabbablepage)
- **Contextes d'application pris en charge :** Web, Application hybride (Webview)

Le délai d'attente en millisecondes après un défilement. Cela peut aider à identifier les pages avec chargement paresseux.

> **NOTE :** Cela ne fonctionne que lorsque `userBasedFullPageScreenshot` est défini sur `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

</Option>
### `hideAfterFirstScroll`

<Option type="array" required="No">

- **Utilisé avec :** Uniquement pour [`saveFullPageScreen`](./methods#savefullpagescreen) ou [`saveTabbablePage`](./methods#savetabbablepage)
- **Contextes d'application pris en charge :** Web, Application hybride (Webview)

Cette méthode masquera un ou plusieurs éléments en leur ajoutant la propriété `visibility: hidden`, en fournissant un tableau d'éléments.
Cela est pratique lorsqu'une page contient par exemple des éléments sticky qui défilent avec la page lorsque celle-ci défile, mais qui produisent un effet gênant lors d'une capture d'écran de page entière

> **NOTE :** Cela ne fonctionne que lorsque `userBasedFullPageScreenshot` est défini sur `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        hideAfterFirstScroll: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

# Options de comparaison (vérification)

Les options de comparaison sont des options qui influencent la manière dont la comparaison est exécutée.

</Option>
## Sensibilité visuelle

---

:::info Historique des versions des options `ignore*`
Ces préréglages ont changé de comportement une fois, sous forme de changement majeur (breaking change), lorsque le moteur de comparaison est passé de ResembleJS (v9 et antérieures) à Pixelmatch (v10 et ultérieures). Consultez le [tableau de l'historique des versions](./compare-options#visual-sensitivity) sur la page Options de comparaison pour plus de détails. Tout changement depuis la v10.0.0 est signalé par une note « Depuis » sur l'option concernée ci-dessous.
:::

**Ordre « le dernier l'emporte » :** lorsque plusieurs drapeaux `ignore*` sont activés en même temps, un seul préréglage est appliqué, selon cet ordre (le dernier l'emporte) : `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. Depuis la `v10.1.0`, un avertissement est journalisé indiquant quel préréglage l'a emporté.

### `ignoreColors`

<Option type="boolean" default="false" required="No">

- **Utilisé avec :** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'application pris en charge :** Tous
- **Depuis :** `v10.1.0` : comparaison de la luminosité uniquement, utilisant les poids de luminance de resemble (`0.3/0.59/0.11`).

Compare uniquement la luminosité (poids de luminance de resemble `0.3/0.59/0.11`), en ignorant les différences de teinte/couleur. Utilisez cette option lorsque la couleur elle-même est censée varier, mais que vous souhaitez tout de même détecter les changements de mise en page ou de luminosité.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="No">

- **Utilisé avec :** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'application pris en charge :** Tous
- **Depuis :** `v10.1.0` : applique sa propre règle de seuil/anticrénelage indépendamment des autres drapeaux `ignore*`.

Compare les images en ignorant les différences du canal alpha. Utilisez cette option lorsque le rendu de la transparence/opacité est instable, mais que les couleurs des pixels sous-jacents comptent.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="No">

- **Utilisé avec :** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'application pris en charge :** Tous
- **Depuis :** `v10` : la valeur par défaut est passée à `true` (elle était `false` en v9 et antérieures).

Tolère les pixels anticrénelés lors de la comparaison. Définissez sur `false` pour une comparaison stricte où les pixels anticrénelés doivent compter comme des différences. Cela résout la source la plus courante d'instabilité des tests visuels : les bords de texte/formes rendus avec un anticrénelage légèrement différent d'une machine à l'autre, alors que rien n'a changé.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="No">

- **Utilisé avec :** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'application pris en charge :** Tous
- **Depuis :** `v10.1.0` : applique sa propre règle de seuil/anticrénelage indépendamment des autres drapeaux `ignore*`.

Compare les images en utilisant une tolérance RVB assouplie (~16/255 par canal dans l'espace YIQ). L'anticrénelage n'est pas toléré. Utilisez cette option pour disposer d'une petite marge face au bruit de rendu (artefacts de compression, arrondis de couleur) sans tolérer l'anticrénelage.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="No">

- **Utilisé avec :** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'application pris en charge :** Tous
- **Depuis :** `v10.1.0` : applique sa propre règle de seuil/anticrénelage indépendamment des autres drapeaux `ignore*`.

Utilise une tolérance nulle : toute différence de pixel compte comme une différence, y compris l'anticrénelage. Utilisez cette option lorsque vous avez besoin d'une preuve au pixel près que rien n'a changé.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

</Option>
### `pixelmatch`

<Option type="object" default="undefined" required="No">

- **Utilisé avec :** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'application pris en charge :** Tous
- **Ajouté dans :** `v10.1.0`

Remplace le mode de comparaison pour un seul appel `check*` avec des paramètres [pixelmatch](https://github.com/mapbox/pixelmatch) directs (`threshold`, `includeAA`, `diffColor`, `aaColor`, `diffColorAlt`, `alpha`, `diffMask`, `checkerboard`), au lieu d'un préréglage `ignore*`. Utilisez cette option lorsque les préréglages sont trop grossiers pour un test spécifique, par ex. s'il a besoin de sa propre valeur de seuil, ou d'une couleur de différence qui ressort réellement dans votre rapport. Consultez [Contrôle direct de pixelmatch](./compare-options#direct-pixelmatch-control) pour la référence complète des champs et ce que chacun résout.

Ne peut pas être combinée avec les options `ignore*` dans le même objet d'options d'un appel : cela lève une `CompareOptionsConflictError`. Elle peut cependant remplacer une configuration de service qui utilise des préréglages `ignore*` (ou inversement) ; un avertissement est journalisé lorsqu'un appel de méthode change ainsi le mode de comparaison.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        pixelmatch: { threshold: 0.05 }
    }
)
```

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="No">

- **Utilisé avec :** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'application pris en charge :** Tous

Met 2 images à la même échelle avant l'exécution de la comparaison. Il est fortement recommandé d'activer `ignoreAntialiasing` et `ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

</Option>
## Masquage sur mobile

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="No">

- **Utilisé avec :** _Ceci est **uniquement pour mobile**_
- **Contextes d'application pris en charge :** Hybride (partie native) et Applications natives

Masque automatiquement la barre d'état et la barre d'adresse lors des comparaisons. Cela évite les échecs liés à l'heure, au wifi ou à l'état de la batterie.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="No">

- **Utilisé avec :** _Ceci est **uniquement pour mobile**_
- **Contextes d'application pris en charge :** Hybride (partie native) et Applications natives

Masque automatiquement la barre d'outils.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="No">

- **Utilisé avec :** _Ne peut être utilisé que pour `checkScreen()`. Ceci est **uniquement pour iPad**_
- **Contextes d'application pris en charge :** Tous

Masque automatiquement la barre latérale des iPads en mode paysage lors des comparaisons. Cela évite les échecs liés au composant natif onglets/navigation privée/signets.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

</Option>
## Gestion des régions

---

### `blockOut`

<Option type="array" required="No">

- **Utilisé avec :** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'application pris en charge :** Tous

Un tableau de zones rectangulaires à masquer avant la comparaison. Chaque entrée doit être un objet avec des valeurs `x`, `y`, `width` et `height` (en pixels). Les zones masquées sont recouvertes avant le calcul de la différence, ce qui empêche ces régions de contribuer au pourcentage de différence.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOut: [
            { x: 0, y: 0, width: 100, height: 50 },
            { x: 300, y: 200, width: 80, height: 80 },
        ]
    }
)
```

</Option>
### `ignore`

<Option type="array" required="No">

- **Utilisé avec :** Uniquement avec la méthode `checkScreen`, **PAS** avec la méthode `checkElement`
- **Contextes d'application pris en charge :** Application native

Cette méthode masquera automatiquement des éléments ou une zone de l'écran en fonction d'un tableau d'éléments ou d'un objet `x|y|width|height`.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignore: [
            $('~element-1'),
            await $('~element-2'),
            {
                x: 150,
                y: 250,
                width: 100,
                height: 100,
            }
        ]
    }
)
```

</Option>
## Résultats et rapports

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="No">

- **Utilisé avec :** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'application pris en charge :** Tous

Si la valeur est true, le pourcentage renvoyé sera du type `0.12345678`, la valeur par défaut est `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="No">

- **Utilisé avec :** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'application pris en charge :** Tous

Cette option renverra toutes les données de comparaison, et pas seulement le pourcentage de différence, voir aussi [Sortie console](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="No">

- **Utilisé avec :** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'application pris en charge :** Tous

Valeur admissible de `misMatchPercentage` qui empêche l'enregistrement des images présentant des différences

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No">

- **Utilisé avec :** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'application pris en charge :** Tous

La proximité en pixels utilisée pour regrouper les pixels de différence dans les rapports JSON. Des valeurs plus élevées regroupent davantage de pixels dans moins de cadres de délimitation ; des valeurs plus faibles produisent des cadres plus précis mais plus nombreux. Pertinent uniquement lorsque [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) est activé.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        diffPixelBoundingBoxProximity: 10
    }
)
```

# Options des dossiers

---

Le dossier de référence (baseline) et les dossiers de captures d'écran (actual, diff) sont des options qui peuvent être définies lors de l'instanciation du plugin ou de la méthode. Pour définir les options de dossiers sur une méthode particulière, passez les options de dossiers dans l'objet d'options de la méthode. Cela peut être utilisé pour :

- Web
- Application hybride
- Application native

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// Vous pouvez utiliser ceci pour toutes les méthodes
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

</Option>
### `actualFolder`

<Option type="string" required="No" contexts="All">

Dossier pour la capture qui a été réalisée pendant le test.

</Option>
### `baselineFolder`

<Option type="string" required="No" contexts="All">

Dossier pour l'image de référence utilisée pour la comparaison.

</Option>
### `diffFolder`

<Option type="string" required="No" contexts="All">

Dossier pour l'image des différences générée lors de la comparaison.

</Option>