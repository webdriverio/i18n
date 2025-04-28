---
id: compare-options
title: Jämförelsealternativ
---

Jämförelsealternativ är alternativ som påverkar hur jämförelsen, av [ResembleJS](https://github.com/Huddle/Resemble.js) utförs.

:::info NOTERA
Alla jämförelsealternativ kan användas under tjänstens instansiering eller för varje enskild `checkElement`, `checkScreen` och `checkFullPageScreen`. Om ett metodalternativ har samma nyckel som ett alternativ som har ställts in under instansieringen av tjänsten, kommer metodens jämförelsealternativ att åsidosätta tjänstens jämförelsealternativvärde.
:::

### `ignoreAlpha`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Kan också användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det kommer att åsidosätta plugininställningen_

Jämför bilder och ignorerar alfa.

### `blockOutSideBar`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Kan endast användas för `checkScreen()`. Det kommer att åsidosätta plugininställningen. Detta är **endast för iPad**_

Blockerar automatiskt sidofältet för iPads i landskapsläge under jämförelser. Detta förhindrar fel på fliken/privat/bokmärkeskomponenten.

### `blockOutStatusBar`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Kan också användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det kommer att åsidosätta plugininställningen. Detta är **endast för mobil**_

Blockerar automatiskt status- och adressfältet under jämförelser. Detta förhindrar fel på tid, wifi eller batteristatus.

### `blockOutToolBar`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Kan också användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det kommer att åsidosätta plugininställningen. Detta är **endast för mobil**_

Blockerar automatiskt verktygsfältet.

### `ignoreAntialiasing`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Kan också användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det kommer att åsidosätta plugininställningen_

Jämför bilder och ignorerar kantutjämning.

### `ignoreColors`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Kan också användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det kommer att åsidosätta plugininställningen_

Även om bilderna är i färg, kommer jämförelsen att jämföra 2 svart/vita bilder

### `ignoreLess`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Kan också användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det kommer att åsidosätta plugininställningen_

Jämför bilder med `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Kan också användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det kommer att åsidosätta plugininställningen_

Jämför bilder med `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `ignoreTransparentPixel`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Kan också användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det kommer att åsidosätta plugininställningen_

Jämför bilder och ignorerar alla pixlar som har viss transparens i någon av bilderna

### `rawMisMatchPercentage`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Kan också användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det kommer att åsidosätta plugininställningen_

Om true, kommer returprocenten att vara som `0.12345678`, standard är `0.12`

### `returnAllCompareData`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Kan också användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det kommer att åsidosätta plugininställningen_

Detta kommer att returnera all jämförelsedata, inte bara procentandelen som inte matchar

### `saveAboveTolerance`

-   **Typ:** `number`
-   **Standard:** `0`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Kan också användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det kommer att åsidosätta plugininställningen_

Tillåtet värde av `misMatchPercentage` som förhindrar sparande av bilder med skillnader

### `largeImageThreshold`

-   **Typ:** `number`
-   **Standard:** `0`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Kan också användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det kommer att åsidosätta plugininställningen_

Jämförelse av stora bilder kan leda till prestandaproblem.
När man anger ett antal pixlar här (högre än 0), hoppar jämförelsealgoritmnen över pixlar när bildbredden eller höjden är större än `largeImageThreshold` pixlar.

### `scaleImagesToSameSize`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Kan också användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det kommer att åsidosätta plugininställningen_

Skalar 2 bilder till samma storlek före jämförelsen. Starkt rekommenderat att aktivera `ignoreAntialiasing` och `ignoreAlpha`