---
id: method-options
title: Metodalternativ
---

Metodalternativ är de alternativ som kan ställas in per [metod](./methods). Om alternativet har samma nyckel som ett alternativ som har ställts in under instansieringen av plugin-programmet, kommer detta metodalternativ att åsidosätta plugin-alternativets värde.

## Sparalternativ

### `disableBlinkingCursor`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stöds av:** Webb, Hybrid App (Webview)

Aktivera/Inaktivera alla `input`, `textarea`, `[contenteditable]` markörblinkningar i applikationen. Om inställd på `true` kommer markören att ställas in på `transparent` innan skärmdump tas
och återställas när det är klart

### `disableCSSAnimation`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stöds av:** Webb, Hybrid App (Webview)

Aktivera/Inaktivera alla CSS-animationer i applikationen. Om inställd på `true` kommer alla animationer att inaktiveras innan skärmdump tas
och återställas när det är klart

### `enableLegacyScreenshotMethod`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Stöds av:** Webb, Hybrid App (Webview)

Använd detta alternativ för att byta tillbaka till den "äldre" skärmdumpsmetoden baserad på W3C-WebDriver-protokollet. Detta kan vara användbart om dina tester förlitar sig på befintliga referensbilder eller om du kör i miljöer som inte fullt ut stöder de nyare BiDi-baserade skärmdumparna.
Observera att aktivering av detta kan skapa skärmdumpar med något annorlunda upplösning eller kvalitet.

### `enableLayoutTesting`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `false`
-   **Används med:** Alla [metoder](./methods)
-   **Stöds av:** Webb

Detta döljer all text på en sida så att endast layouten används för jämförelse. Dolning görs genom att lägga till stilen `'color': 'transparent !important'` till __varje__ element.

För utdata, se [Testutdata](./test-output#enablelayouttesting)

:::info
Genom att använda denna flagga kommer varje element som innehåller text (alltså inte bara `p, h1, h2, h3, h4, h5, h6, span, a, li`, utan även `div|button|..`) att få denna egenskap. Det finns __inget__ alternativ för att anpassa detta.
:::

### `hideScrollBars`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`
-   **Används med:** Alla [metoder](./methods)
-   **Stöds av:** Webb, Hybrid App (Webview)

Dölj rullningslister i applikationen. Om inställd på true kommer alla rullningslister att inaktiveras innan skärmdump tas. Detta är som standard inställt på `true` för att förhindra extra problem.

### `hideElements`

-   **Typ:** `array`
-   **Obligatorisk:** nej
-   **Används med:** Alla [metoder](./methods)
-   **Stöds av:** Webb, Hybrid App (Webview), Native App

Denna metod kan dölja 1 eller flera element genom att lägga till egenskapen `visibility: hidden` till dem genom att tillhandahålla en array av element.

### `removeElements`

-   **Typ:** `array`
-   **Obligatorisk:** nej
-   **Används med:** Alla [metoder](./methods)
-   **Stöds av:** Webb, Hybrid App (Webview), Native App

Denna metod kan _ta bort_ 1 eller flera element genom att lägga till egenskapen `display: none` till dem genom att tillhandahålla en array av element.

### `resizeDimensions`

-   **Typ:** `object`
-   **Obligatorisk:** nej
-   **Standard:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **Används med:** Endast för [`saveElement`](./methods#saveelement) eller [`checkElement`](./methods#checkelement)
-   **Stöds av:** Webb, Hybrid App (Webview), Native App

Ett objekt som behöver innehålla ett antal pixlar för `top`, `right`, `bottom` och `left` som behöver göra elementklippet större.

### `userBasedFullPageScreenshot`

* **Typ:** `boolean`
* **Obligatorisk:** Nej
* **Standard:** `false`
* **Stöds av:** Webb, Hybrid App (Webview)

När inställd på `true`, aktiverar detta alternativ **rulla-och-sy-strategin** för att ta skärmdumpar av hela sidan.
Istället för att använda webbläsarens inbyggda skärmdumpsfunktioner, rullar den manuellt genom sidan och syr ihop flera skärmdumpar.
Denna metod är särskilt användbar för sidor med **lazy-laddat innehåll** eller komplexa layouter som kräver rullning för att visas fullständigt.

### `fullPageScrollTimeout`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** `1500`
-   **Används med:** Endast för [`saveFullPageScreen`](./methods#savefullpagescreen) eller [`saveTabbablePage`](./methods#savetabbablepage)
-   **Stöds av:** Webb

Timeout i millisekunder att vänta efter en rullning. Detta kan hjälpa till att identifiera sidor med lazy loading.

> **OBS:** Detta fungerar endast när `userBasedFullPageScreenshot` är inställt på `true`

### `hideAfterFirstScroll`

-   **Typ:** `array`
-   **Obligatorisk:** nej
-   **Används med:** Endast för [`saveFullPageScreen`](./methods#savefullpagescreen) eller [`saveTabbablePage`](./methods#savetabbablepage)
-   **Stöds av:** Webb

Denna metod döljer ett eller flera element genom att lägga till egenskapen `visibility: hidden` till dem genom att tillhandahålla en array av element.
Detta är praktiskt när en sida till exempel har klibbiga element som rullar med sidan om sidan rullas men ger en irriterande effekt när en skärmdump av hela sidan tas

> **OBS:** Detta fungerar endast när `userBasedFullPageScreenshot` är inställt på `true`

### `waitForFontsLoaded`

-   **Typ:** `boolean`
-   **Obligatorisk:** Nej
-   **Standard:** `true`
-   **Används med:** Alla [metoder](./methods)
-   **Stöds av:** Webb, Hybrid App (Webview)

Teckensnitt, inklusive tredjepartsteckensnitt, kan laddas synkront eller asynkront. Asynkron laddning innebär att teckensnitt kan laddas efter att WebdriverIO har fastställt att en sida har laddats helt. För att förhindra problem med teckensnittåtergivning kommer denna modul som standard att vänta på att alla teckensnitt ska laddas innan en skärmdump tas.

## Jämförelsealternativ (Check)

Jämförelsealternativ är alternativ som påverkar hur jämförelsen, med [ResembleJS](https://github.com/Huddle/Resemble.js), utförs.

:::info OBS

-   Alla alternativ från [Sparalternativ](#sparalternativ) kan användas för Jämförelsemetoderna
-   Alla jämförelsealternativ kan användas under tjänstinstansiering __eller__ för varje enskild kontrollmetod. Om ett metodalternativ har samma nyckel som ett alternativ som har ställts in under instansiering av tjänsten, kommer metodens jämförelsealternativ att åsidosätta tjänstens jämförelsealternativ.
- Alla alternativ kan användas för:
    - Webb
    - Hybrid App
    - Native App

:::

### `ignoreAlpha`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej

Jämför bilder och bortse från alpha.

### `blockOutSideBar`

-   **Typ:** `boolean`
-   **Standard:** `true`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Kan endast användas för `checkScreen()`. Detta är **endast för iPad**_

Blockera automatiskt sidofältet för iPads i landskapsläge under jämförelser. Detta förhindrar fel på fliken/privat/bokmärke i den infödda komponenten.

### `blockOutStatusBar`

-   **Typ:** `boolean`
-   **Standard:** `true`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Detta är **endast för mobil**_

Blockera automatiskt status- och adressfältet under jämförelser. Detta förhindrar fel på tid, wifi eller batteristatus.

### `blockOutToolBar`

-   **Typ:** `boolean`
-   **Standard:** `true`
-   **Obligatorisk:** nej
-   **Anmärkning:** _Detta är **endast för mobil**_

Blockera automatiskt verktygsfältet.

### `ignoreAntialiasing`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej

Jämför bilder och bortse från kantutjämning.

### `ignoreColors`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej

Även om bilderna är i färg kommer jämförelsen att jämföra 2 svartvita bilder

### `ignoreLess`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej

Jämför bilder och jämför med `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej

Jämför bilder och jämför med `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `rawMisMatchPercentage`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej

Om true kommer returnerad procent att vara som `0.12345678`, standard är `0.12`

### `returnAllCompareData`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej

Detta kommer att returnera all jämförelsedata, inte bara procentandelen skillnad

### `saveAboveTolerance`

-   **Typ:** `number`
-   **Standard:** `0`
-   **Obligatorisk:** nej

Tillåtet värde av `misMatchPercentage` som förhindrar sparande av bilder med skillnader

### `largeImageThreshold`

-   **Typ:** `number`
-   **Standard:** `0`
-   **Obligatorisk:** nej

Att jämföra stora bilder kan leda till prestandaproblem.
När du anger ett antal pixlar här (högre än 0), hoppar jämförelsealgoritmerna över pixlar när bildens bredd eller höjd är större än `largeImageThreshold` pixlar.

### `scaleImagesToSameSize`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Obligatorisk:** nej

Skalar 2 bilder till samma storlek innan jämförelse utförs. Starkt rekommenderat att aktivera `ignoreAntialiasing` och `ignoreAlpha`

## Mappalternativ

Baslinjemappen och skärmdumpsmappar (aktuell, diff) är alternativ som kan ställas in under instansiering av plugin-programmet eller metoden. För att ställa in mappalternativ för en specifik metod, skicka in mappalternativ till metodens alternativobjekt. Detta kan användas för:

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
-   **Obligatorisk:** nej

Mapp för skärmdumpen som har tagits i testet.

### `baselineFolder`

-   **Typ:** `string`
-   **Obligatorisk:** nej

Mapp för baslinjebilden som används för att jämföra mot.

### `diffFolder`

-   **Typ:** `string`
-   **Obligatorisk:** nej

Mapp för bildskillnad som renderas av ResembleJS.