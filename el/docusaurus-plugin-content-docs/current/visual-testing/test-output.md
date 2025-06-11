---
id: test-output
title: Έλεγχος Εξόδου
---

:::info

[Αυτός ο ιστότοπος επίδειξης WebdriverIO](https://guinea-pig.webdriver.io/image-compare.html) έχει χρησιμοποιηθεί για το παράδειγμα εξόδου εικόνας.

:::

## `enableLayoutTesting`

Αυτό μπορεί να οριστεί στις [Επιλογές Υπηρεσίας](./service-options#enablelayouttesting) καθώς και σε [επίπεδο Μεθόδου](./method-options).

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

Η έξοδος εικόνας για τις [Επιλογές Υπηρεσίας](./service-options#enablelayouttesting) είναι ίδια με αυτή της [Μεθόδου](./method-options), δείτε παρακάτω.

### Έξοδος Εικόνας

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

### Έξοδος Κονσόλας

Οι μέθοδοι `save(Screen/Element/FullPageScreen)` θα παρέχουν τις ακόλουθες πληροφορίες μετά την εκτέλεση της μεθόδου:

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

### Έξοδος Εικόνας

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

:::info TIP
Οι εκτελέσεις `saveScreen` στο iOS από προεπιλογή δεν έχουν τις γωνίες του πλαισίου της συσκευής. Για να τις έχετε, προσθέστε την επιλογή `addIOSBezelCorners:true` κατά την αρχικοποίηση της υπηρεσίας, δείτε [εδώ](./service-options#addiosbezelcorners)
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

### Έξοδος Κονσόλας

Από προεπιλογή, οι μέθοδοι `check(Screen/Element/FullPageScreen)` θα παρέχουν μόνο ένα ποσοστό αναντιστοιχίας όπως `1.23`, αλλά όταν το πρόσθετο έχει την επιλογή `returnAllCompareData: true` παρέχονται οι ακόλουθες πληροφορίες μετά την εκτέλεση της μεθόδου:

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

### Έξοδος Εικόνας

:::info
Οι παρακάτω εικόνες θα δείχνουν μόνο διαφορές ως αποτέλεσμα της εκτέλεσης των εντολών ελέγχου. Εμφανίζεται μόνο η διαφορά σε ένα πρόγραμμα περιήγησης, αλλά η έξοδος για Android και iOS είναι η ίδια.
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
Το κείμενο του κουμπιού έχει αλλάξει από `Get Started` σε `Getting Started!` και ανιχνεύτηκε ως αλλαγή.
:::

![Button Check Result](/img/visual/button-check.png)
</TabItem>

<TabItem value="checkscreen">

```js
await browser.checkScreen("example-page-tag")
```

:::info
Το κείμενο του κουμπιού έχει αλλάξει από `Get Started` σε `Getting Started!` και ανιχνεύτηκε ως αλλαγή.
:::

![Button Check Result](/img/visual/screen-check.png)

</TabItem>

<TabItem value="checkfullpagescreen">

```js
await browser.checkFullPageScreen("full-page-tag")
```

:::info
Το κείμενο του κουμπιού έχει αλλάξει από `Get Started` σε `Getting Started!` και ανιχνεύτηκε ως αλλαγή.
:::

![Button Check Result](/img/visual/fullpage-check.png)

</TabItem>

</Tabs>

## Block-Outs

Εδώ θα βρείτε ένα παράδειγμα εξόδου για αποκλεισμούς (block-outs) στο Android NativeWebScreenshot και iOS όπου η κατάσταση+διεύθυνση και η γραμμή εργαλείων έχουν αποκλειστεί.

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