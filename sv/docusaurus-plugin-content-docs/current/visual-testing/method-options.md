---
id: method-options
title: Metodalternativ
---

Metodalternativ är de alternativ som kan ställas in per [metod](./methods). Om alternativet har samma nyckel som ett alternativ som har ställts in under instansieringen av tillägget, kommer detta metodalternativ att åsidosätta pluginalternativets värde.

:::info OBS

-   Alla alternativ från [Spara-alternativ](#save-options) kan användas för [Jämförelse](#compare-check-options)-metoderna
-   Alla jämförelsealternativ kan användas under tjänsteinstansiering __eller__ för varje enskild kontrollmetod. Om ett metodalternativ har samma nyckel som ett alternativ som har ställts in under instansieringen av tjänsten, kommer metodens jämförelsealternativ att åsidosätta tjänstens jämförelsealternativ.
- Alla alternativ kan användas för nedanstående applikationskontexter om inget annat anges:
    - Webb
    - Hybrid-app
    - Nativ app
- Nedanstående exempel använder `save*`-metoderna, men kan även användas med `check*`-metoderna

:::

## Save Options

### `disableBlinkingCursor`

- **Typ:** `boolean`
- **Obligatorisk:** Nej
- **Standard:** `false`
- **Används med:** Alla [metoder](./methods)
- **Stödda applikationskontexter:** Webb, Hybrid-app (Webbvy)

Aktivera/inaktivera alla `input`, `textarea`, `[contenteditable]` markörers "blinkande" i applikationen. Om satt till `true` kommer markören att ställas in på `transparent` innan en skärmdump tas
och återställas när det är klart.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

### `disableCSSAnimation`

- **Typ:** `boolean`
- **Obligatorisk:** Nej
- **Standard:** `false`
- **Används med:** Alla [metoder](./methods)
- **Stödda applikationskontexter:** Webb, Hybrid-app (Webbvy)

Aktivera/inaktivera alla CSS-animationer i applikationen. Om satt till `true` kommer alla animationer att inaktiveras innan en skärmdump tas
och återställas när det är klart

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

### `enableLegacyScreenshotMethod`

- **Typ:** `boolean`
- **Obligatorisk:** Nej
- **Standard:** `false`
- **Används med:** Alla [metoder](./methods)
- **Stödda applikationskontexter:** Webb, Hybrid-app (Webbvy)

Använd detta alternativ för att återgå till den "äldre" skärmdumpmetoden baserad på W3C-WebDriver-protokollet. Detta kan vara användbart om dina tester förlitar sig på befintliga baslinjebilder eller om du kör i miljöer som inte fullt stöder de nyare BiDi-baserade skärmdumparna.
Observera att aktivering av detta kan producera skärmdumpar med något annorlunda upplösning eller kvalitet.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

### `enableLayoutTesting`

- **Typ:** `boolean`
- **Obligatorisk:** Nej
- **Standard:** `false`
- **Används med:** Alla [metoder](./methods)
- **Stödda applikationskontexter:** Webb, Hybrid-app (Webbvy)

Detta döljer all text på en sida så att endast layouten används för jämförelse. Döljning görs genom att lägga till stilen `'color': 'transparent !important'` till __varje__ element.

För utdatan se [Testutdata](./test-output#enablelayouttesting).

:::info
Genom att använda denna flagga kommer varje element som innehåller text (alltså inte bara `p, h1, h2, h3, h4, h5, h6, span, a, li`, utan också `div|button|..`) få denna egenskap. Det finns __ingen__ möjlighet att anpassa detta.
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

- **Typ:** `boolean`
- **Obligatorisk:** Nej
- **Standard:** `true`
- **Används med:** Alla [metoder](./methods)
- **Stödda applikationskontexter:** Webb, Hybrid-app (Webbvy)

Dölj rullningslist(er) i applikationen. Om satt till true kommer alla rullningslist(er) att inaktiveras innan en skärmdump tas. Detta är standard `true` för att förhindra extra problem.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

### `hideElements`

- **Typ:** `array`
- **Obligatorisk:** Nej
- **Används med:** Alla [metoder](./methods)
- **Stödda applikationskontexter:** Webb, Hybrid-app (Webbvy)

Denna metod kan dölja 1 eller flera element genom att lägga till egenskapen `visibility: hidden` till dem genom att tillhandahålla en array av element.

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

- **Typ:** `array`
- **Obligatorisk:** Nej
- **Används med:** Alla [metoder](./methods)
- **Stödda applikationskontexter:** Webb, Hybrid-app (Webbvy)

Denna metod kan _ta bort_ 1 eller flera element genom att lägga till egenskapen `display: none` till dem genom att tillhandahålla en array av element.

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

- **Typ:** `object`
- **Obligatorisk:** Nej
- **Standard:** `{ top: 0, right: 0, bottom: 0, left: 0}`
- **Används med:** Endast för [`saveElement`](./methods#saveelement) eller [`checkElement`](./methods#checkelement)
- **Stödda applikationskontexter:** Webb, Hybrid-app (Webbvy), Nativ app

Ett objekt som behöver innehålla ett antal pixlar för `top`, `right`, `bottom` och `left` som behövs för att göra elementutklippet större.

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

- **Typ:** `boolean`
- **Obligatorisk:** Nej
- **Standard:** `false`
- **Används med:** Endast för [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) eller [`checkTabbablePage`](./methods#checktabbablepage)
- **Stödda applikationskontexter:** Webb, Hybrid-app (Webbvy)

När detta är satt till `true`, aktiverar det **rulla-och-klistra-strategin** för att fånga helsidesbilder.
Istället för att använda webbläsarens inbyggda skärmdumpskapacitet, rullar den manuellt genom sidan och syr ihop flera skärmdumpar.
Denna metod är särskilt användbar för sidor med **lat-inladdat innehåll** eller komplexa layouter som kräver rullning för att helt renderas.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

### `fullPageScrollTimeout`

- **Typ:** `number`
- **Obligatorisk:** Nej
- **Standard:** `1500`
- **Används med:** Endast för [`saveFullPageScreen`](./methods#savefullpagescreen) eller [`saveTabbablePage`](./methods#savetabbablepage)
- **Stödda applikationskontexter:** Webb, Hybrid-app (Webbvy)

Timeoutvärdet i millisekunder att vänta efter en rullning. Detta kan hjälpa till att identifiera sidor med lazy loading.

> **OBS:** Detta fungerar endast när `userBasedFullPageScreenshot` är satt till `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

### `hideAfterFirstScroll`

- **Typ:** `array`
- **Obligatorisk:** Nej
- **Används med:** Endast för [`saveFullPageScreen`](./methods#savefullpagescreen) eller [`saveTabbablePage`](./methods#savetabbablepage)
- **Stödda applikationskontexter:** Webb, Hybrid-app (Webbvy)

Denna metod döljer ett eller flera element genom att lägga till egenskapen `visibility: hidden` till dem genom att tillhandahålla en array av element.
Detta är praktiskt när en sida till exempel har klibbiga element som rullar med sidan när sidan rullas men ger en irriterande effekt när en helsidesbilds tas

> **OBS:** Detta fungerar endast när `userBasedFullPageScreenshot` är satt till `true`

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

- **Typ:** `boolean`
- **Obligatorisk:** Nej
- **Standard:** `true`
- **Används med:** Alla [metoder](./methods)
- **Stödda applikationskontexter:** Webb, Hybrid-app (Webbvy)

Teckensnitt, inklusive teckensnitt från tredje part, kan laddas synkront eller asynkront. Asynkron laddning innebär att teckensnitt kan laddas efter att WebdriverIO har bestämt att en sida har laddats klart. För att förhindra problem med teckensnittsrendering kommer denna modul som standard att vänta på att alla teckensnitt laddas innan en skärmdump tas.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

## Compare (Check) Options

Jämförelsealternativ är alternativ som påverkar hur jämförelsen, av [ResembleJS](https://github.com/Huddle/Resemble.js), utförs.

### `ignoreAlpha`

- **Typ:** `boolean`
- **Standard:** `false`
- **Obligatorisk:** Nej
- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Stödda applikationskontexter:** Alla

Jämför bilder och bortse från alfa.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

### `blockOutSideBar`

- **Typ:** `boolean`
- **Standard:** `true`
- **Obligatorisk:** Nej
- **Används med:** _Kan endast användas för `checkScreen()`. Detta är **endast för iPad**_
- **Stödda applikationskontexter:** Alla

Blockerar automatiskt sidofältet för iPads i landskapsläge under jämförelser. Detta förhindrar fel på fliken/privat/bokmärke nativa komponenter.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

### `blockOutStatusBar`

- **Typ:** `boolean`
- **Standard:** `true`
- **Obligatorisk:** Nej
- **Används med:** _Detta är **endast för mobiler**_
- **Stödda applikationskontexter:** Hybrid (nativ del) och nativa appar

Blockerar automatiskt status- och adressfältet under jämförelser. Detta förhindrar fel på tid, wifi eller batteristatus.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

### `blockOutToolBar`

- **Typ:** `boolean`
- **Standard:** `true`
- **Obligatorisk:** Nej
- **Används med:** _Detta är **endast för mobiler**_
- **Stödda applikationskontexter:** Hybrid (nativ del) och nativa appar

Blockerar automatiskt verktygsfältet.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

### `ignoreAntialiasing`

- **Typ:** `boolean`
- **Standard:** `false`
- **Obligatorisk:** Nej
- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Stödda applikationskontexter:** Alla

Jämför bilder och bortse från anti-aliasing.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

### `ignoreColors`

- **Typ:** `boolean`
- **Standard:** `false`
- **Obligatorisk:** Nej
- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Stödda applikationskontexter:** Alla

Även om bilderna är i färg, kommer jämförelsen att jämföra 2 svartvita bilder

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

### `ignoreLess`

- **Typ:** `boolean`
- **Standard:** `false`
- **Obligatorisk:** Nej
- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Stödda applikationskontexter:** Alla

Jämför bilder och jämför med `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

### `ignoreNothing`

- **Typ:** `boolean`
- **Standard:** `false`
- **Obligatorisk:** Nej
- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Stödda applikationskontexter:** Alla

Jämför bilder och jämför med `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

### `rawMisMatchPercentage`

- **Typ:** `boolean`
- **Standard:** `false`
- **Obligatorisk:** Nej
- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Stödda applikationskontexter:** Alla

Om true kommer returprocenten att vara som `0.12345678`, standard är `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

### `returnAllCompareData`

- **Typ:** `boolean`
- **Standard:** `false`
- **Obligatorisk:** Nej
- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Stödda applikationskontexter:** Alla

Detta kommer att returnera all jämförelseinformation, inte bara skillnadsprocenten, se även [Konsolutmatning](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

### `saveAboveTolerance`

- **Typ:** `number`
- **Standard:** `0`
- **Obligatorisk:** Nej
- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Stödda applikationskontexter:** Alla

Tillåtet värde av `misMatchPercentage` som förhindrar att bilder med skillnader sparas

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

### `largeImageThreshold`

- **Typ:** `number`
- **Standard:** `0`
- **Obligatorisk:** Nej
- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Stödda applikationskontexter:** Alla

Jämförelse av stora bilder kan leda till prestandaproblem.
När du anger ett antal pixlar här (högre än 0), hoppar jämförelsealgoritmn över pixlar när bildbredden eller höjden är större än `largeImageThreshold` pixlar.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        largeImageThreshold: 1500
    }
)
```

### `scaleImagesToSameSize`

- **Typ:** `boolean`
- **Standard:** `false`
- **Obligatorisk:** Nej
- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Stödda applikationskontexter:** Alla

Skalar 2 bilder till samma storlek innan jämförelsen utförs. Starkt rekommenderat att aktivera `ignoreAntialiasing` och `ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

### `ignore`

- **Typ:** `array`
- **Obligatorisk:** Nej
- **Används med:** Endast med `checkScreen`-metoden, **INTE** med `checkElement`-metoden
- **Stödda applikationskontexter:** Nativ app

Denna metod blockerar automatiskt element eller ett område på en skärm baserat på en array av element eller ett objekt med `x|y|width|height`.

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

## Mappoptioner

Baslinjemappen och skärmdumpsmapparna (faktisk, diff) är alternativ som kan ställas in under instansieringen av tillägget eller metoden. För att ställa in mappalternativ för en viss metod, skicka in mappalternativ till metodens alternativobjekt. Detta kan användas för:

- Webb
- Hybrid-app
- Nativ app

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

- **Typ:** `string`
- **Obligatorisk:** Nej
- **Stödda applikationskontexter:** Alla

Mapp för den skärmdump som har tagits i testet.

### `baselineFolder`

- **Typ:** `string`
- **Obligatorisk:** Nej
- **Stödda applikationskontexter:** Alla

Mapp för baslinjebilden som används för att jämföra med.

### `diffFolder`

- **Typ:** `string`
- **Obligatorisk:** Nej
- **Stödda applikationskontexter:** Alla

Mapp för bilddifferensen som renderas av ResembleJS.