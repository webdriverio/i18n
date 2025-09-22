---
id: method-options
title: Options de Méthode
---

Les options de méthodes sont les options qui peuvent être définies par [méthode](./methods). Si l'option a la même clé qu'une option qui a été définie lors de l'instanciation du plugin, cette option de méthode remplacera la valeur de l'option du plugin.

:::info REMARQUE

-   Toutes les options des [Options de Sauvegarde](#save-options) peuvent être utilisées pour les méthodes de [Comparaison](#compare-check-options)
-   Toutes les options de comparaison peuvent être utilisées pendant l'instanciation du service __ou__ pour chaque méthode de vérification individuelle. Si une option de méthode a la même clé qu'une option qui a été définie lors de l'instanciation du service, alors l'option de comparaison de la méthode remplacera la valeur de l'option de comparaison du service.
- Toutes les options peuvent être utilisées pour les contextes d'application ci-dessous, sauf mention contraire :
    - Web
    - Application Hybride
    - Application Native
- Les exemples ci-dessous utilisent les méthodes `save*`, mais peuvent également être utilisés avec les méthodes `check*`

:::

## Options de Sauvegarde

### `disableBlinkingCursor`

- **Type:** `boolean`
- **Obligatoire:** Non
- **Par défaut:** `false`
- **Utilisé avec:** Toutes les [méthodes](./methods)
- **Contextes d'Application Supportés:** Web, Application Hybride (Webview)

Active/Désactive le clignotement du curseur pour tous les éléments `input`, `textarea`, `[contenteditable]` dans l'application. Si défini à `true`, le curseur sera défini comme `transparent` avant de prendre une capture d'écran et réinitialisé ensuite.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

### `disableCSSAnimation`

- **Type:** `boolean`
- **Obligatoire:** Non
- **Par défaut:** `false`
- **Utilisé avec:** Toutes les [méthodes](./methods)
- **Contextes d'Application Supportés:** Web, Application Hybride (Webview)

Active/Désactive toutes les animations CSS dans l'application. Si défini à `true`, toutes les animations seront désactivées avant de prendre une capture d'écran et réinitialisées ensuite.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

### `enableLegacyScreenshotMethod`

- **Type:** `boolean`
- **Obligatoire:** Non
- **Par défaut:** `false`
- **Utilisé avec:** Toutes les [méthodes](./methods)
- **Contextes d'Application Supportés:** Web, Application Hybride (Webview)

Utilisez cette option pour revenir à l'ancienne méthode de capture d'écran basée sur le protocole W3C-WebDriver. Cela peut être utile si vos tests dépendent d'images de référence existantes ou si vous travaillez dans des environnements qui ne prennent pas entièrement en charge les captures d'écran basées sur BiDi.
Notez que l'activation de cette option peut produire des captures d'écran avec une résolution ou une qualité légèrement différentes.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

### `enableLayoutTesting`

- **Type:** `boolean`
- **Obligatoire:** Non
- **Par défaut:** `false`
- **Utilisé avec:** Toutes les [méthodes](./methods)
- **Contextes d'Application Supportés:** Web, Application Hybride (Webview)

Ceci masquera tout le texte sur une page afin que seule la mise en page soit utilisée pour la comparaison. Le masquage sera effectué en ajoutant le style `'color': 'transparent !important'` à __chaque__ élément.

Pour la sortie, voir [Test Output](./test-output#enablelayouttesting).

:::info
En utilisant ce drapeau, chaque élément contenant du texte (pas seulement `p, h1, h2, h3, h4, h5, h6, span, a, li`, mais aussi `div|button|..`) recevra cette propriété. Il n'y a __pas__ d'option pour personnaliser cela.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

### `hideScrollBars`

- **Type:** `boolean`
- **Obligatoire:** Non
- **Par défaut:** `true`
- **Utilisé avec:** Toutes les [méthodes](./methods)
- **Contextes d'Application Supportés:** Web, Application Hybride (Webview)

Masque les barres de défilement dans l'application. Si défini à true, toutes les barres de défilement seront désactivées avant de prendre une capture d'écran. Par défaut, c'est défini à `true` pour éviter des problèmes supplémentaires.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

### `hideElements`

- **Type:** `array`
- **Obligatoire:** Non
- **Utilisé avec:** Toutes les [méthodes](./methods)
- **Contextes d'Application Supportés:** Web, Application Hybride (Webview)

Cette méthode peut masquer un ou plusieurs éléments en ajoutant la propriété `visibility: hidden` en fournissant un tableau d'éléments.

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

### `removeElements`

- **Type:** `array`
- **Obligatoire:** Non
- **Utilisé avec:** Toutes les [méthodes](./methods)
- **Contextes d'Application Supportés:** Web, Application Hybride (Webview)

Cette méthode peut _supprimer_ un ou plusieurs éléments en ajoutant la propriété `display: none` en fournissant un tableau d'éléments.

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

### `resizeDimensions`

- **Type:** `object`
- **Obligatoire:** Non
- **Par défaut:** `{ top: 0, right: 0, bottom: 0, left: 0}`
- **Utilisé avec:** Uniquement pour [`saveElement`](./methods#saveelement) ou [`checkElement`](./methods#checkelement)
- **Contextes d'Application Supportés:** Web, Application Hybride (Webview), Application Native

Un objet qui doit contenir un nombre de pixels `top`, `right`, `bottom` et `left` qui doivent agrandir la découpe de l'élément.

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

### `userBasedFullPageScreenshot`

- **Type:** `boolean`
- **Obligatoire:** Non
- **Par défaut:** `false`
- **Utilisé avec:** Uniquement pour [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) ou [`checkTabbablePage`](./methods#checktabbablepage)
- **Contextes d'Application Supportés:** Web, Application Hybride (Webview)

Lorsqu'il est défini à `true`, cette option active la **stratégie de défilement et d'assemblage** pour capturer des captures d'écran de page complète.
Au lieu d'utiliser les capacités natives de capture d'écran du navigateur, il fait défiler manuellement la page et assemble plusieurs captures d'écran.
Cette méthode est particulièrement utile pour les pages avec **contenu chargé paresseusement** ou des mises en page complexes qui nécessitent un défilement pour être entièrement rendues.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

### `fullPageScrollTimeout`

- **Type:** `number`
- **Obligatoire:** Non
- **Par défaut:** `1500`
- **Utilisé avec:** Uniquement pour [`saveFullPageScreen`](./methods#savefullpagescreen) ou [`saveTabbablePage`](./methods#savetabbablepage)
- **Contextes d'Application Supportés:** Web, Application Hybride (Webview)

Le délai d'attente en millisecondes après un défilement. Cela peut aider à identifier les pages avec chargement paresseux.

> **REMARQUE:** Cela ne fonctionne que lorsque `userBasedFullPageScreenshot` est défini à `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

### `hideAfterFirstScroll`

- **Type:** `array`
- **Obligatoire:** Non
- **Utilisé avec:** Uniquement pour [`saveFullPageScreen`](./methods#savefullpagescreen) ou [`saveTabbablePage`](./methods#savetabbablepage)
- **Contextes d'Application Supportés:** Web, Application Hybride (Webview)

Cette méthode masquera un ou plusieurs éléments en ajoutant la propriété `visibility: hidden` en fournissant un tableau d'éléments.
Cela sera pratique lorsqu'une page contient par exemple des éléments fixes qui défileront avec la page si celle-ci est défilée mais donneront un effet gênant lorsqu'une capture d'écran de page complète est faite.

> **REMARQUE:** Cela ne fonctionne que lorsque `userBasedFullPageScreenshot` est défini à `true`

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

### `waitForFontsLoaded`

- **Type:** `boolean`
- **Obligatoire:** Non
- **Par défaut:** `true`
- **Utilisé avec:** Toutes les [méthodes](./methods)
- **Contextes d'Application Supportés:** Web, Application Hybride (Webview)

Les polices, y compris les polices tierces, peuvent être chargées de manière synchrone ou asynchrone. Le chargement asynchrone signifie que les polices peuvent se charger après que WebdriverIO ait déterminé qu'une page est entièrement chargée. Pour éviter les problèmes de rendu des polices, ce module attendra par défaut que toutes les polices soient chargées avant de prendre une capture d'écran.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

## Options de Comparaison (Vérification)

Les options de comparaison sont des options qui influencent la façon dont la comparaison, par [ResembleJS](https://github.com/Huddle/Resemble.js), est exécutée.

### `ignoreAlpha`

- **Type:** `boolean`
- **Par défaut:** `false`
- **Obligatoire:** Non
- **Utilisé avec:** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'Application Supportés:** Tous

Compare les images et ignore l'alpha.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

### `blockOutSideBar`

- **Type:** `boolean`
- **Par défaut:** `true`
- **Obligatoire:** Non
- **Utilisé avec:** _Peut être utilisé uniquement avec `checkScreen()`. Ceci est **uniquement pour iPad**_
- **Contextes d'Application Supportés:** Tous

Bloque automatiquement la barre latérale pour les iPads en mode paysage pendant les comparaisons. Cela évite les échecs sur le composant natif onglet/privé/signet.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

### `blockOutStatusBar`

- **Type:** `boolean`
- **Par défaut:** `true`
- **Obligatoire:** Non
- **Utilisé avec:** _Ceci est **uniquement pour Mobile**_
- **Contextes d'Application Supportés:** Hybride (partie native) et Applications Natives

Bloque automatiquement la barre d'état et la barre d'adresse pendant les comparaisons. Cela évite les échecs sur l'heure, le wifi ou l'état de la batterie.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

### `blockOutToolBar`

- **Type:** `boolean`
- **Par défaut:** `true`
- **Obligatoire:** Non
- **Utilisé avec:** _Ceci est **uniquement pour Mobile**_
- **Contextes d'Application Supportés:** Hybride (partie native) et Applications Natives

Bloque automatiquement la barre d'outils.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

### `ignoreAntialiasing`

- **Type:** `boolean`
- **Par défaut:** `false`
- **Obligatoire:** Non
- **Utilisé avec:** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'Application Supportés:** Tous

Compare les images et ignore l'anti-aliasing.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

### `ignoreColors`

- **Type:** `boolean`
- **Par défaut:** `false`
- **Obligatoire:** Non
- **Utilisé avec:** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'Application Supportés:** Tous

Même si les images sont en couleur, la comparaison comparera 2 images en noir et blanc.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

### `ignoreLess`

- **Type:** `boolean`
- **Par défaut:** `false`
- **Obligatoire:** Non
- **Utilisé avec:** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'Application Supportés:** Tous

Compare les images avec `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

### `ignoreNothing`

- **Type:** `boolean`
- **Par défaut:** `false`
- **Obligatoire:** Non
- **Utilisé avec:** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'Application Supportés:** Tous

Compare les images avec `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

### `rawMisMatchPercentage`

- **Type:** `boolean`
- **Par défaut:** `false`
- **Obligatoire:** Non
- **Utilisé avec:** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'Application Supportés:** Tous

Si vrai, le pourcentage de retour sera comme `0.12345678`, par défaut c'est `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

### `returnAllCompareData`

- **Type:** `boolean`
- **Par défaut:** `false`
- **Obligatoire:** Non
- **Utilisé avec:** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'Application Supportés:** Tous

Cela retournera toutes les données de comparaison, pas seulement le pourcentage de non-correspondance, voir aussi [Console Output](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

### `saveAboveTolerance`

- **Type:** `number`
- **Par défaut:** `0`
- **Obligatoire:** Non
- **Utilisé avec:** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'Application Supportés:** Tous

Valeur admissible de `misMatchPercentage` qui empêche la sauvegarde d'images avec des différences

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

### `largeImageThreshold`

- **Type:** `number`
- **Par défaut:** `0`
- **Obligatoire:** Non
- **Utilisé avec:** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'Application Supportés:** Tous

La comparaison de grandes images peut entraîner des problèmes de performance.
Lorsque vous fournissez un nombre pour le nombre de pixels ici (supérieur à 0), l'algorithme de comparaison ignore les pixels lorsque la largeur ou la hauteur de l'image est supérieure à `largeImageThreshold` pixels.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        largeImageThreshold: 1500
    }
)
```

### `scaleImagesToSameSize`

- **Type:** `boolean`
- **Par défaut:** `false`
- **Obligatoire:** Non
- **Utilisé avec:** Toutes les [méthodes de vérification](./methods#check-methods)
- **Contextes d'Application Supportés:** Tous

Redimensionne 2 images à la même taille avant l'exécution de la comparaison. Il est fortement recommandé d'activer `ignoreAntialiasing` et `ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

### `ignore`

- **Type:** `array`
- **Obligatoire:** Non
- **Utilisé avec:** Uniquement avec la méthode `checkScreen`, **PAS** avec la méthode `checkElement`
- **Contextes d'Application Supportés:** Application Native

Cette méthode bloquera automatiquement les éléments ou une zone sur un écran en fonction d'un tableau d'éléments ou d'un objet de `x|y|width|height`.

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

## Options de dossier

Le dossier de référence et les dossiers de captures d'écran (actuels, diff) sont des options qui peuvent être définies lors de l'instanciation du plugin ou de la méthode. Pour définir les options de dossier sur une méthode particulière, passez les options de dossier à l'objet d'options de méthodes. Cela peut être utilisé pour :

- Web
- Application Hybride
- Application Native

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

### `actualFolder`

- **Type:** `string`
- **Obligatoire:** Non
- **Contextes d'Application Supportés:** Tous

Dossier pour la capture d'écran qui a été prise dans le test.

### `baselineFolder`

- **Type:** `string`
- **Obligatoire:** Non
- **Contextes d'Application Supportés:** Tous

Dossier pour l'image de référence qui est utilisée pour la comparaison.

### `diffFolder`

- **Type:** `string`
- **Obligatoire:** Non
- **Contextes d'Application Supportés:** Tous

Dossier pour la différence d'image rendue par ResembleJS.