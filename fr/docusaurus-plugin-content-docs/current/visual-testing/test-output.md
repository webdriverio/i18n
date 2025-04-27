---
id: test-output
title: Sortie de Test
---

:::info

[Ce site de démonstration WebdriverIO](https://guinea-pig.webdriver.io/image-compare.html) a été utilisé pour l'exemple de sortie d'image.

:::

## `enableLayoutTesting`

Cela peut être défini dans les [Options du Service](./service-options#enablelayouttesting) ainsi qu'au niveau de la [Méthode](./method-options).

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            'visual',
            {
                enableLayoutTesting: true
            }
        ]
    ]
    // ...
}
```

La sortie d'image pour les [Options du Service](./service-options#enablelayouttesting) est identique à celle de la [Méthode](./method-options), voir ci-dessous.

### Sortie d'Image

<Tabs
    defaultValue="saveelement"
    values={[
        {label: 'saveElement | checkElement', value: 'saveelement'},
        {label: 'saveScreen | checkScreen', value: 'savescreen'},
        {label: 'saveFullPageScreen | checkFullPageScreen', value: 'savefullpagescreen'},
        {label: 'saveTabbablePage | checkTabbablePage', value: 'saveTabbablePage'},
    ]}
>
<TabItem value="saveelement">

```js
await browser.saveElement(".features_vqN4", "example-element-tag", {enableLayoutTesting: true})
// Or
await browser.checkElement(".features_vqN4", "example-element-tag", {enableLayoutTesting: true})
```

![saveElement Desktop](/img/visual/layout-element-local-chrome-latest-1366x768.png)

</TabItem>

<TabItem value="savescreen">

```js
await browser.saveScreen("example-page-tag")
```

![saveScreen Desktop](/img/visual/layout-viewportScreenshot-chrome-latest-1366x768.png)

</TabItem>

<TabItem value="savefullpagescreen">

```js
await browser.saveFullPageScreen("full-page-tag")
// Or
await browser.checkFullPageScreen("full-page-tag", {enableLayoutTesting: true})
```

![saveFullPageScreens Desktop](/img/visual/layout-fullPage-chrome-latest-1366x768.png)

</TabItem>

<TabItem value="saveTabbablePage">

```js
await browser.saveTabbablePage("tabbable-page-tag")
// Or
await browser.checkTabbablePage("tabbable-page-tag", {enableLayoutTesting: true})
```

![saveFullPageScreens Desktop](/img/visual/layout-tabbable-chrome-latest-1366x768.png)

</TabItem>
</Tabs>


## save(Screen/Element/FullPageScreen)

### Sortie Console

Les méthodes `save(Screen/Element/FullPageScreen)` fourniront les informations suivantes après l'exécution de la méthode :

```js
const saveResult = await browser.saveFullPageScreen({ ... })
console.log(saveResults)
/**
 * {
 *   // The device pixel ratio of the instance that has run
 *   devicePixelRatio: 1,
 *   // The formatted filename, this depends on the options `formatImageName`
 *   fileName: "examplePage-chrome-latest-1366x768.png",
 *   // The path where the actual screenshot file can be found
 *   path: "/path/to/project/.tmp/actual/desktop_chrome",
 * };
 */
```

### Sortie d'Image

<Tabs
    defaultValue="saveelement"
    values={[
        {label: 'saveElement', value: 'saveelement'},
        {label: 'saveScreen', value: 'savescreen'},
        {label: 'saveFullPageScreen', value: 'savefullpagescreen'},
    ]}
>
<TabItem value="saveelement">

```js
await browser.saveElement(".hero__title-logo", "example-element-tag")
```

<Tabs
    defaultValue="desktop"
    values={[
        {label: 'Desktop', value: 'desktop'},
        {label: 'Android', value: 'android'},
        {label: 'iOS', value: 'ios'},
    ]}
>
<TabItem value="desktop">
![saveElement Desktop](/img/visual/wdioLogo-chrome-latest-1-1366x768.png)
</TabItem>
<TabItem value="android">
![saveElement Mobile Android](/img/visual/wdioLogo-EmulatorAndroidGoogleAPIPortraitNativeWebScreenshot14.0-384x640.png)
</TabItem>
<TabItem value="ios">
![saveElement Mobile iOS](/img/visual/wdioLogo-Iphone12Portrait16-390x844.png)
</TabItem>
</Tabs>
</TabItem>

<TabItem value="savescreen">

```js
await browser.saveScreen("example-page-tag")
```

<Tabs
    defaultValue="desktop"
    values={[
        {label: 'Desktop', value: 'desktop'},
        {label: 'Android ChromeDriver', value: 'android-chromedriver'},
        {label: 'Android nativeWebScreenshot', value: 'android-native'},
        {label: 'iOS', value: 'ios'},
    ]}
>
<TabItem value="desktop">
![saveScreen Desktop](/img/visual/examplePage-chrome-latest-1366x768.png)
</TabItem>
<TabItem value="android-chromedriver">
![saveScreen Mobile Android ChromeDriver](/img/visual/screenshot-EmulatorAndroidGoogleAPIPortraitChromeDriver14.0-384x640.png)
</TabItem>
<TabItem value="android-native">
![saveScreen Mobile Android nativeWebScreenshot](/img/visual/screenshot-EmulatorAndroidGoogleAPIPortraitNativeWebScreenshot14.0-384x640.png)
</TabItem>
<TabItem value="ios">

:::info CONSEIL
Les exécutions iOS `saveScreen` ne sont par défaut pas avec les coins de la lunette de l'appareil. Pour avoir cela, veuillez ajouter l'option `addIOSBezelCorners:true` lors de l'instanciation du service, voir [ceci](./service-options#addiosbezelcorners)
:::

![saveScreen Mobile iOS](/img/visual/screenshot-Iphone12Portrait15-390x844.png)
</TabItem>
</Tabs>
</TabItem>

<TabItem value="savefullpagescreen">

```js
await browser.saveFullPageScreen("full-page-tag")
```

<Tabs
    defaultValue="desktop"
    values={[
        {label: 'Desktop', value: 'desktop'},
        {label: 'Android', value: 'android'},
        {label: 'iOS', value: 'ios'},
    ]}
>
<TabItem value="desktop">
![saveFullPageScreens Desktop](/img/visual/fullPage-chrome-latest-1366x768.png)
</TabItem>
<TabItem value="android">
![saveFullPageScreens Mobile Android](/img/visual/fullPage-EmulatorAndroidGoogleAPIPortraitChromeDriver14.0-384x640.png)
</TabItem>
<TabItem value="ios">
![saveFullPageScreens Mobile iOS](/img/visual/fullPage-Iphone12Portrait16-390x844.png)
</TabItem>
</Tabs>
</TabItem>
</Tabs>

## check(Screen/Element/FullPageScreen)

### Sortie Console

Par défaut, les méthodes `check(Screen/Element/FullPageScreen)` ne fourniront qu'un pourcentage de différence comme `1.23`, mais lorsque le plugin a l'option `returnAllCompareData: true`, les informations suivantes sont fournies après l'exécution de la méthode :

```js
const checkResult = await browser.checkFullPageScreen({ ... })
console.log(checkResult)
/**
 * {
 *     // The formatted filename, this depends on the options `formatImageName`
 *     fileName: "examplePage-chrome-headless-latest-1366x768.png",
 *     folders: {
 *         // The actual folder and the file name
 *         actual: "/path/to/project/.tmp/actual/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *         // The baseline folder and the file name
 *         baseline:
 *             "/path/to/project/localBaseline/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *         // This following folder is optional and only if there is a mismatch
 *         // The folder that holds the diffs and the file name
 *         diff: "/path/to/project/.tmp/diff/desktop_chrome/examplePage-chrome-headless-latest-1366x768.png",
 *     },
 *     // The mismatch percentage
 *     misMatchPercentage: 2.34,
 * };
 */
```

### Sortie d'Image

:::info
Les images ci-dessous ne montreront que les différences résultant de l'exécution des commandes de vérification. Seule la différence dans un navigateur est montrée, mais la sortie pour Android et iOS est la même.
:::

<Tabs
    defaultValue="checkelement"
    values={[
        {label: 'checkElement', value: 'checkelement'},
        {label: 'checkScreen', value: 'checkscreen'},
        {label: 'checkFullPageScreen', value: 'checkfullpagescreen'},
    ]}
>
<TabItem value="checkelement">

```js
await browser.checkElement("#__docusaurus_skipToContent_fallback > header > div > div.buttons_pzbO > a:nth-child(1)", "example-element-tag")
```

:::info
Le texte du bouton a été changé de `Get Started` à `Getting Started!` et détecté comme un changement.
:::

![Button Check Result](/img/visual/button-check.png)
</TabItem>

<TabItem value="checkscreen">

```js
await browser.checkScreen("example-page-tag")
```

:::info
Le texte du bouton a été changé de `Get Started` à `Getting Started!` et détecté comme un changement.
:::

![Button Check Result](/img/visual/screen-check.png)

</TabItem>

<TabItem value="checkfullpagescreen">

```js
await browser.checkFullPageScreen("full-page-tag")
```

:::info
Le texte du bouton a été changé de `Get Started` à `Getting Started!` et détecté comme un changement.
:::

![Button Check Result](/img/visual/fullpage-check.png)

</TabItem>

</Tabs>

## Block-Outs

Voici un exemple de sortie pour les block-outs dans Android NativeWebScreenshot et iOS où le statut+adresse et la barre d'outils sont bloqués.

<Tabs
    defaultValue="nativeWebScreenshot"
    values={[
        {label: 'Android nativeWebScreenshot', value: 'nativeWebScreenshot'},
        {label: 'iOS', value: 'ios'},
    ]}
>
<TabItem value="nativeWebScreenshot">

![Blockouts Android](/img/visual/android.blockouts.png)

</TabItem>

<TabItem value="ios">

![Blockouts iOS](/img/visual/ios.blockouts.png)

</TabItem>

</Tabs>