---
id: method-options
title: Metodalternativ
---

Metodalternativ är de alternativ som kan ställas in per [metod](./methods). Om alternativet har samma nyckel som ett alternativ som har ställts in under instansiering av plugin, kommer detta metodalternativ att åsidosätta plugin-alternativets värde.

## Spara alternativ

### `disableBlinkingCursor`

-   **Typ:** `boolean`
-   **Obligatoriskt:** Nej
-   **Standard:** `false`
-   **Stöds av:** Webb, Hybrid App (Webview)

Aktivera/inaktivera all "blinkande" markör för `input`, `textarea`, `[contenteditable]` i applikationen. Om inställt till `true` kommer markören att ställas in på `transparent` innan en skärmdump tas
och återställas när det är klart

### `disableCSSAnimation`

-   **Typ:** `boolean`
-   **Obligatoriskt:** Nej
-   **Standard:** `false`
-   **Stöds av:** Webb, Hybrid App (Webview)

Aktivera/inaktivera alla CSS-animationer i applikationen. Om inställt till `true` kommer alla animationer att inaktiveras innan en skärmdump tas
och återställas när det är klart

### `enableLayoutTesting`

-   **Typ:** `boolean`
-   **Obligatoriskt:** Nej
-   **Standard:** `false`
-   **Används med:** Alla [metoder](./methods)
-   **Stöds av:** Webb

Detta döljer all text på en sida så att endast layouten används för jämförelse. Döljning görs genom att lägga till stilen `'color': 'transparent !important'` till __varje__ element.

För utdata, se [Testutdata](./test-output#enablelayouttesting)

:::info
Genom att använda denna flagga får varje element som innehåller text (alltså inte bara `p, h1, h2, h3, h4, h5, h6, span, a, li`, utan även `div|button|..`) denna egenskap. Det finns __inget__ alternativ för att anpassa detta.
:::

### `hideScrollBars`

-   **Typ:** `boolean`
-   **Obligatoriskt:** Nej
-   **Standard:** `true`
-   **Används med:** Alla [metoder](./methods)
-   **Stöds av:** Webb, Hybrid App (Webview)

Dölj rullningslist(er) i applikationen. Om inställt till true kommer alla rullningslist(er) att inaktiveras innan en skärmdump tas. Detta är som standard inställt på `true` för att förhindra extra problem.

### `hideElements`

-   **Typ:** `array`
-   **Obligatoriskt:** nej
-   **Används med:** Alla [metoder](./methods)
-   **Stöds av:** Webb, Hybrid App (Webview), Native App

Denna metod kan dölja 1 eller flera element genom att lägga till egenskapen `visibility: hidden` till dem genom att tillhandahålla en array av element.

### `removeElements`

-   **Typ:** `array`
-   **Obligatoriskt:** nej
-   **Används med:** Alla [metoder](./methods)
-   **Stöds av:** Webb, Hybrid App (Webview), Native App

Denna metod kan _ta bort_ 1 eller flera element genom att lägga till egenskapen `display: none` till dem genom att tillhandahålla en array av element.

### `resizeDimensions`

-   **Typ:** `object`
-   **Obligatoriskt:** nej
-   **Standard:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **Används med:** Endast för [`saveElement`](./methods#saveelement) eller [`checkElement`](./methods#checkelement)
-   **Stöds av:** Webb, Hybrid App (Webview), Native App

Ett objekt som måste innehålla ett antal pixlar för `top`, `right`, `bottom` och `left` som behöver göra elementutskärningen större.

### `fullPageScrollTimeout`

-   **Typ:** `number`
-   **Obligatoriskt:** Nej
-   **Standard:** `1500`
-   **Används med:** Endast för [`saveFullPageScreen`](./methods#savefullpagescreen) eller [`saveTabbablePage`](./methods#savetabbablepage)
-   **Stöds av:** Webb

Timeout i millisekunder att vänta efter en rullning. Detta kan hjälpa till att identifiera sidor med lat inläsning.

### `hideAfterFirstScroll`

-   **Typ:** `array`
-   **Obligatoriskt:** nej
-   **Används med:** Endast för [`saveFullPageScreen`](./methods#savefullpagescreen) eller [`saveTabbablePage`](./methods#savetabbablepage)
-   **Stöds av:** Webb

Denna metod döljer ett eller flera element genom att lägga till egenskapen `visibility: hidden` till dem genom att tillhandahålla en array av element.
Detta är praktiskt när en sida till exempel innehåller klibbiga element som rullar med sidan om sidan rullas men ger en irriterande effekt när en fullsidig skärmdump görs

### `waitForFontsLoaded`

-   **Typ:** `boolean`
-   **Obligatoriskt:** Nej
-   **Standard:** `true`
-   **Används med:** Alla [metoder](./methods)
-   **Stöds av:** Webb, Hybrid App (Webview)

Teckensnitt, inklusive tredjepartsteckensnitt, kan laddas synkront eller asynkront. Asynkron laddning innebär att teckensnitt kan laddas efter att WebdriverIO fastställer att en sida har laddats fullständigt. För att förhindra problem med teckensnittrendering kommer denna modul som standard att vänta på att alla teckensnitt laddas innan en skärmdump tas.

## Jämför (Kontroll) alternativ

Jämförelsealternativ är alternativ som påverkar hur jämförelsen, av [ResembleJS](https://github.com/Huddle/Resemble.js) utförs.

:::info OBS

-   Alla alternativ från [Spara alternativ](#spara-alternativ) kan användas för jämförelsemetoderna
-   Alla jämförelsealternativ kan användas under tjänstinstansiering __eller__ för varje enskild kontrollmetod. Om ett metodalternativ har samma nyckel som ett alternativ som har ställts in under instansiering av tjänsten, kommer metodens jämförelsealternativ att åsidosätta tjänstens jämförelsealternativvärde.
- Alla alternativ kan användas för:
    - Webb
    - Hybrid App
    - Native App

:::

### `ignoreAlpha`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatoriskt:** nej

Jämför bilder och ignorera alfa.

### `blockOutSideBar`

-   **Typ:** `boolean`
-   **Standard:** `true`
-   **Obligatoriskt:** nej
-   **Anmärkning:** _Kan endast användas för `checkScreen()`. Detta är **endast för iPad**_

Blockera automatiskt sidofältet för iPads i liggande läge under jämförelser. Detta förhindrar fel på fliken/privat/bokmärke för inbyggda komponenter.

### `blockOutStatusBar`

-   **Typ:** `boolean`
-   **Standard:** `true`
-   **Obligatoriskt:** nej
-   **Anmärkning:** _Detta är **endast för mobil**_

Blockera automatiskt status- och adressfältet under jämförelser. Detta förhindrar fel på tid, wifi eller batteristatus.

### `blockOutToolBar`

-   **Typ:** `boolean`
-   **Standard:** `true`
-   **Obligatoriskt:** nej
-   **Anmärkning:** _Detta är **endast för mobil**_

Blockera automatiskt verktygsfältet.

### `ignoreAntialiasing`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatoriskt:** nej

Jämför bilder och ignorera anti-aliasing.

### `ignoreColors`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatoriskt:** nej

Även om bilderna är i färg kommer jämförelsen att jämföra 2 svartvita bilder

### `ignoreLess`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatoriskt:** nej

Jämför bilder och jämför med `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatoriskt:** nej

Jämför bilder och jämför med `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `rawMisMatchPercentage`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatoriskt:** nej

Om sant kommer returprocenten att vara som `0.12345678`, standard är `0.12`

### `returnAllCompareData`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatoriskt:** nej

Detta returnerar all jämförelsedata, inte bara den procentuella skillnaden

### `saveAboveTolerance`

-   **Typ:** `number`
-   **Standard:** `0`
-   **Obligatoriskt:** nej

Tillåtet värde för `misMatchPercentage` som förhindrar sparande av bilder med skillnader

### `largeImageThreshold`

-   **Typ:** `number`
-   **Standard:** `0`
-   **Obligatoriskt:** nej

Jämförelse av stora bilder kan leda till prestandaproblem.
När du anger ett antal pixlar här (högre än 0) hoppar jämförelsealgoritmens pixlar när bildbredden eller höjden är större än `largeImageThreshold` pixlar.

### `scaleImagesToSameSize`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatoriskt:** nej

Skalar 2 bilder till samma storlek innan jämförelsen utförs. Starkt rekommenderat att aktivera `ignoreAntialiasing` och `ignoreAlpha`

## Mappalternativ

Baslinjemappen och skärmdumpsmapparna (aktuell, diff) är alternativ som kan ställas in under instansiering av plugin eller metod. För att ställa in mappalternativ för en viss metod, skicka in mappalternativ till metodens alternativobjekt. Detta kan användas för:

- Webb
- Hybrid App
- Native App

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// Du kan använda detta för alla metoder
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

-   **Typ:** `string`
-   **Obligatoriskt:** nej

Mapp för ögonblicksbilden som har tagits i testet.

### `baselineFolder`

-   **Typ:** `string`
-   **Obligatoriskt:** nej

Mapp för baslinjebilden som används för att jämföra med.

### `diffFolder`

-   **Typ:** `string`
-   **Obligatoriskt:** nej

Mapp för bildskillnaden som renderas av ResembleJS.