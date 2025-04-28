---
id: method-options
title: Metodalternativ
---

Metodalternativ är de alternativ som kan ställas in per [metod](./methods). Om alternativet har samma nyckel som ett alternativ som har angetts under instansiering av pluginet, kommer detta metodalternativ att åsidosätta pluginalternativets värde.

## Sparalternativ

### `disableBlinkingCursor`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

Aktivera/inaktivera all "blinkande" markör i `input`, `textarea`, `[contenteditable]` i applikationen. Om inställd på `true` kommer markören att ställas in på `transparent` innan en skärmdump tas
och återställas när det är klart

### `disableCSSAnimation`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

Aktivera/inaktivera alla CSS-animeringar i applikationen. Om inställd på `true` kommer alla animeringar att inaktiveras innan en skärmdump tas
och återställas när det är klart

### `enableLayoutTesting`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Used with:** All [methods](./methods)
-   **Supported:** Web

Detta döljer all text på en sida så att endast layouten används för jämförelse. Döljning görs genom att lägga till stilen `'color': 'transparent !important'` till __varje__ element.

För utmatningen, se [Test Output](./test-output#enablelayouttesting)

:::info
Genom att använda denna flagga kommer varje element som innehåller text (alltså inte bara `p, h1, h2, h3, h4, h5, h6, span, a, li`, utan även `div|button|..`) att få denna egenskap. Det finns __inget__ alternativ för att anpassa detta.
:::

### `hideScrollBars`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Used with:** All [methods](./methods)
-   **Supported:** Web, Hybrid App (Webview)

Dölj rullningslist(er) i applikationen. Om inställd på true kommer alla rullningslist(er) att inaktiveras innan en skärmdump tas. Detta är som standard inställt på `true` för att förhindra extra problem.

### `hideElements`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** All [methods](./methods)
-   **Supported:** Web, Hybrid App (Webview), Native App

Denna metod kan dölja ett eller flera element genom att lägga till egenskapen `visibility: hidden` till dem genom att tillhandahålla en array av element.

### `removeElements`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** All [methods](./methods)
-   **Supported:** Web, Hybrid App (Webview), Native App

Denna metod kan _ta bort_ ett eller flera element genom att lägga till egenskapen `display: none` till dem genom att tillhandahålla en array av element.

### `resizeDimensions`

-   **Type:** `object`
-   **Mandatory:** no
-   **Default:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **Used with:** Only for [`saveElement`](./methods#saveelement) or [`checkElement`](./methods#checkelement)
-   **Supported:** Web, Hybrid App (Webview), Native App

Ett objekt som behöver innehålla ett antal pixlar för `top`, `right`, `bottom` och `left` som behöver göra elementets utskärning större.

### `fullPageScrollTimeout`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `1500`
-   **Used with:** Only for [`saveFullPageScreen`](./methods#savefullpagescreen) or [`saveTabbablePage`](./methods#savetabbablepage)
-   **Supported:** Web

Tidsgränsen i millisekunder att vänta efter en rullning. Detta kan hjälpa till att identifiera sidor med lat laddning.

### `hideAfterFirstScroll`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** Only for [`saveFullPageScreen`](./methods#savefullpagescreen) or [`saveTabbablePage`](./methods#savetabbablepage)
-   **Supported:** Web

Denna metod döljer ett eller flera element genom att lägga till egenskapen `visibility: hidden` till dem genom att tillhandahålla en array av element.
Detta är praktiskt när en sida till exempel innehåller fasta element som rullar med sidan om sidan rullas men ger en irriterande effekt när en fullsideskärmdump görs

### `waitForFontsLoaded`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Used with:** All [methods](./methods)
-   **Supported:** Web, Hybrid App (Webview)

Teckensnitt, inklusive tredjepartsteckensnitt, kan laddas synkront eller asynkront. Asynkron laddning innebär att teckensnitt kan laddas efter att WebdriverIO fastställer att en sida har laddats helt. För att förhindra problem med teckensnittåtergivning väntar denna modul som standard på att alla teckensnitt ska laddas innan en skärmdump tas.

## Jämförelse (Check) alternativ

Jämförelsealternativ är alternativ som påverkar hur jämförelsen, av [ResembleJS](https://github.com/Huddle/Resemble.js) utförs.

:::info OBS

-   Alla alternativ från [Sparalternativ](#save-options) kan användas för jämförelsemetoderna
-   Alla jämförelsealternativ kan användas under tjänstinstansiering __eller__ för varje enskild kontrollmetod. Om ett metodalternativ har samma nyckel som ett alternativ som har angetts under instansiering av tjänsten, kommer metodjämförelsealternativet att åsidosätta tjänstjämförelsealternativets värde.
- Alla alternativ kan användas för:
    - Web
    - Hybrid App
    - Native App

:::

### `ignoreAlpha`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Jämför bilder och kassera alfa.

### `blockOutSideBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _Can only be used for `checkScreen()`. This is **iPad only**_

Blockera automatiskt sidofältet för iPads i landskapsläge under jämförelser. Detta förhindrar misslyckanden på fliken/privat/bokmärke i den inbyggda komponenten.

### `blockOutStatusBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _This is **Mobile only**_

Blockera automatiskt status- och adressfältet under jämförelser. Detta förhindrar misslyckanden på tid, wifi eller batteristatus.

### `blockOutToolBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _This is **Mobile only**_

Blockera automatiskt verktygsfältet.

### `ignoreAntialiasing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Jämför bilder och kassera kantutjämning.

### `ignoreColors`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Även om bilderna är i färg, kommer jämförelsen att jämföra 2 svartvita bilder

### `ignoreLess`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Jämför bilder och jämför med `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Jämför bilder och jämför med `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `rawMisMatchPercentage`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Om true kommer returprocenten att vara som `0.12345678`, standard är `0.12`

### `returnAllCompareData`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Detta kommer att returnera all jämförelsedata, inte bara felmatchningsprocenten

### `saveAboveTolerance`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no

Tillåtet värde för `misMatchPercentage` som förhindrar sparande av bilder med skillnader

### `largeImageThreshold`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no

Jämförelse av stora bilder kan leda till prestandaproblem.
När man anger ett antal pixlar här (högre än 0), hoppar jämförelsealgoritmem över pixlar när bildbredden eller höjden är större än `largeImageThreshold` pixlar.

### `scaleImagesToSameSize`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

Skalar 2 bilder till samma storlek innan jämförelsen utförs. Starkt rekommenderat att aktivera `ignoreAntialiasing` och `ignoreAlpha`

## Mappalternativ

Baslinjeförteckningen och skärmdumpsmapparna (faktisk, diff) är alternativ som kan ställas in under instansiering av pluginet eller metoden. För att ställa in mappalternativen för en viss metod, skicka in mappalternativ till metodens alternativobjekt. Detta kan användas för:

- Web
- Hybrid App
- Native App

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// You can use this for all methods
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

-   **Type:** `string`
-   **Mandatory:** no

Mapp för skärmdumpen som har tagits i testet.

### `baselineFolder`

-   **Type:** `string`
-   **Mandatory:** no

Mapp för baslinjebilden som används för att jämföra mot.

### `diffFolder`

-   **Type:** `string`
-   **Mandatory:** no

Mapp för bildens skillnad som återges av ResembleJS.