---
id: compare-options
title: Jämförelsealternativ
---

Jämförelsealternativ är alternativ som påverkar hur jämförelsen, av [ResembleJS](https://github.com/Huddle/Resemble.js) utförs.

:::info NOTERA
Alla jämförelsealternativ kan användas under tjänstens initiering eller för varje enskild `checkElement`, `checkScreen` och `checkFullPageScreen`. Om ett metodalternativ har samma nyckel som ett alternativ som har ställts in under initieringen av tjänsten, kommer metodens jämförelsealternativ att åsidosätta tjänstens jämförelsealternativvärde.
:::

### `ignoreAlpha`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Jämför bilder och bortser från alfa.

### `blockOutSideBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can only be used for `checkScreen()`. It will override the plugin setting. This is **iPad only**_

Blockerar automatiskt sidofältet för iPads i landskapsläge under jämförelser. Detta förhindrar fel på fliken/privat/bokmärke inbyggda komponenten.

### `blockOutStatusBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting. This is **Mobile only**_

Blockerar automatiskt status- och adressfältet under jämförelser. Detta förhindrar fel på tid, wifi eller batteristatus.

### `blockOutToolBar`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting. This is **Mobile only**_

Blockerar automatiskt verktygsraden.

### `ignoreAntialiasing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Jämför bilder och bortser från kantutjämning.

### `ignoreColors`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Även om bilderna är i färg kommer jämförelsen att jämföra 2 svartvita bilder.

### `ignoreLess`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Jämför bilder och jämför med `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Jämför bilder och jämför med `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `ignoreTransparentPixel`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Jämför bilder och ignorerar alla pixlar som har någon transparens i en av bilderna

### `rawMisMatchPercentage`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Om sant kommer returprocenten att vara som `0.12345678`, standard är `0.12`

### `returnAllCompareData`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Detta kommer att returnera all jämförelsedata, inte bara felprocenten

### `saveAboveTolerance`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Tillåtet värde av `misMatchPercentage` som förhindrar sparande av bilder med skillnader

### `largeImageThreshold`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Att jämföra stora bilder kan leda till prestandaproblem.
När man anger ett antal pixlar här (högre än 0), hoppar jämförelsealgoritmens pixlar när bildbredden eller höjden är större än `largeImageThreshold` pixlar.

### `scaleImagesToSameSize`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Remark:** _Can also be used for `checkElement`, `checkScreen()` and `checkFullPageScreen()`. It will override the plugin setting_

Skalar 2 bilder till samma storlek innan jämförelsen utförs. Starkt rekommenderat att aktivera `ignoreAntialiasing` och `ignoreAlpha`