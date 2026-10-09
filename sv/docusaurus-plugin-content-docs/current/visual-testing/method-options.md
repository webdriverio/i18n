---
id: method-options
title: Metodalternativ
description: "Ange alternativ för sparande, jämförelse och mappar per metod för visuella testmetoder, vilka åsidosätter alternativen på tjänstenivå."
---

Metodalternativ är de alternativ som kan anges per [metod](./methods). Om alternativet har samma nyckel som ett alternativ som har angetts vid instansieringen av pluginet kommer detta metodalternativ att åsidosätta pluginets alternativvärde.

:::info OBS

-   Alla alternativ från [Sparalternativ](#save-options) kan användas för [Jämförelse](#compare-check-options)-metoderna
-   Alla jämförelsealternativ kan användas vid instansieringen av tjänsten __eller__ för varje enskild check-metod. Om ett metodalternativ har samma nyckel som ett alternativ som har angetts vid instansieringen av tjänsten kommer metodens jämförelsealternativ att åsidosätta tjänstens jämförelsealternativvärde.
- Alla alternativ kan användas för nedanstående applikationskontexter om inget annat anges:
    - Webb
    - Hybridapp
    - Native app
- Exemplen nedan använder `save*`-metoderna, men kan även användas med `check*`-metoderna

:::

# Sparalternativ

## Visning och rendering

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No">

- **Används med:** Alla [metoder](./methods)
- **Applikationskontexter som stöds:** Webb, Hybridapp (Webview)

Döljer rullningslister i applikationen. Om satt till true kommer alla rullningslister att inaktiveras innan en skärmbild tas. Detta är som standard satt till `true` för att förhindra extra problem.

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

- **Används med:** Alla [metoder](./methods)
- **Applikationskontexter som stöds:** Webb, Hybridapp (Webview)

Aktivera/inaktivera "blinkande" markör för alla `input`, `textarea`, `[contenteditable]` i applikationen. Om satt till `true` kommer markören att sättas till `transparent` innan en skärmbild tas
och återställas när det är klart.

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

- **Används med:** Alla [metoder](./methods)
- **Applikationskontexter som stöds:** Webb, Hybridapp (Webview)

Aktivera/inaktivera alla CSS-animationer i applikationen. Om satt till `true` kommer alla animationer att inaktiveras innan en skärmbild tas
och återställas när det är klart

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

- **Används med:** Alla [metoder](./methods)
- **Applikationskontexter som stöds:** Webb, Hybridapp (Webview)

Detta döljer all text på en sida så att endast layouten används för jämförelse. Döljningen görs genom att lägga till stilen `'color': 'transparent !important'` på __varje__ element.

För utdata, se [Testutdata](./test-output#enablelayouttesting).

:::info
Genom att använda denna flagga kommer varje element som innehåller text (alltså inte bara `p, h1, h2, h3, h4, h5, h6, span, a, li`, utan även `div|button|..`) att få denna egenskap. Det finns __inget__ alternativ för att anpassa detta.
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

- **Används med:** Alla [metoder](./methods)
- **Applikationskontexter som stöds:** Webb, Hybridapp (Webview)

Använd detta alternativ för att växla tillbaka till den "äldre" skärmbildsmetoden baserad på W3C-WebDriver-protokollet. Detta kan vara användbart om dina tester förlitar sig på befintliga baslinjebilder eller om du kör i miljöer som inte fullt ut stöder de nyare BiDi-baserade skärmbilderna.
Observera att aktivering av detta kan ge skärmbilder med något annorlunda upplösning eller kvalitet.

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

- **Används med:** Alla [metoder](./methods)
- **Applikationskontexter som stöds:** Webb, Hybridapp (Webview)

Utfyllnad i enhetspixlar som läggs till på varje sida av ignorerade regioner, vilket gör varje region 2× detta värde bredare och högre. Detta hjälper till att undvika skillnader på 1 px vid gränserna som kan uppstå på skärmar med hög DPR eller med BiDi-skärmbildsprotokollet. Sätt till `0` för att inaktivera.

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

- **Används med:** Alla [metoder](./methods)
- **Applikationskontexter som stöds:** Webb, Hybridapp (Webview)

Typsnitt, inklusive typsnitt från tredje part, kan laddas synkront eller asynkront. Asynkron laddning innebär att typsnitt kan laddas efter att WebdriverIO har fastställt att en sida har laddats helt. För att förhindra problem med typsnittsrendering kommer denna modul som standard att vänta på att alla typsnitt har laddats innan en skärmbild tas.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

</Option>
## Elementsynlighet

---

### `hideElements`

<Option type="array" required="No">

- **Används med:** Alla [metoder](./methods)
- **Applikationskontexter som stöds:** Webb, Hybridapp (Webview)

Denna metod kan dölja 1 eller flera element genom att lägga till egenskapen `visibility: hidden` på dem, genom att tillhandahålla en array av element.

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

- **Används med:** Alla [metoder](./methods)
- **Applikationskontexter som stöds:** Webb, Hybridapp (Webview)

Denna metod kan _ta bort_ 1 eller flera element genom att lägga till egenskapen `display: none` på dem, genom att tillhandahålla en array av element.

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
## Elementspecifika

---

### `resizeDimensions`

<Option type="object" default={`{ top: 0, right: 0, bottom: 0, left: 0}`} required="No">

- **Används med:** Endast för [`saveElement`](./methods#saveelement) eller [`checkElement`](./methods#checkelement)
- **Applikationskontexter som stöds:** Webb, Hybridapp (Webview), Native app

Ett objekt som måste innehålla ett antal pixlar för `top`, `right`, `bottom` och `left` som ska göra elementutsnittet större.

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

- **Används med:** Endast för [`saveElement`](./methods#saveelement) eller [`checkElement`](./methods#checkelement)
- **Applikationskontexter som stöds:** Webb, Hybridapp (Webview)

Alternativ endast för BiDi som styr vilken koordinatorigo som används vid tagning av elementskärmbilder via WebDriver BiDi-protokollet.

- `'document'` _(standard)_: renderar dokumentlayouten. Fungerar för alla elementpositioner men fångar **inte** sammansatta lager (t.ex. rullningslister, fasta/klistrade överlägg, `will-change`-element).
- `'viewport'`: fångar den sammansatta bildrutan som den målats, inklusive rullningslister och överlägg. Kräver att elementet är **helt synligt** i visningsområdet, och kastar ett beskrivande fel när elementet ligger utanför eller är större än visningsområdet.

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
## Helsidesspecifika

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No">

- **Används med:** Endast för [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) eller [`checkTabbablePage`](./methods#checktabbablepage)
- **Applikationskontexter som stöds:** Webb, Hybridapp (Webview)

När satt till `true` aktiverar detta alternativ **strategin för att rulla och sammanfoga** för att ta helsidesskärmbilder.
Istället för att använda webbläsarens inbyggda skärmbildsfunktioner rullar den manuellt genom sidan och sammanfogar flera skärmbilder.
Denna metod är särskilt användbar för sidor med **lat inläst innehåll** eller komplexa layouter som kräver rullning för att renderas helt.

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

- **Används med:** Endast för [`saveFullPageScreen`](./methods#savefullpagescreen) eller [`saveTabbablePage`](./methods#savetabbablepage)
- **Applikationskontexter som stöds:** Webb, Hybridapp (Webview)

Tidsgränsen i millisekunder att vänta efter en rullning. Detta kan hjälpa till med sidor som använder lat inläsning.

> **OBS:** Detta fungerar endast när `userBasedFullPageScreenshot` är satt till `true`

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

- **Används med:** Endast för [`saveFullPageScreen`](./methods#savefullpagescreen) eller [`saveTabbablePage`](./methods#savetabbablepage)
- **Applikationskontexter som stöds:** Webb, Hybridapp (Webview)

Denna metod döljer ett eller flera element genom att lägga till egenskapen `visibility: hidden` på dem, genom att tillhandahålla en array av element.
Detta är praktiskt när en sida till exempel innehåller klistrade element som rullar med sidan när sidan rullas, men som ger en irriterande effekt när en helsidesskärmbild tas

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

# Jämförelsealternativ (Check)

Jämförelsealternativ är alternativ som påverkar hur jämförelsen utförs.

</Option>
## Visuell känslighet

---

:::info Versionshistorik för `ignore*`-alternativ
Dessa förinställningar ändrade beteende en gång, som en bakåtinkompatibel ändring, när jämförelsemotorn byttes från ResembleJS (v9 och tidigare) till Pixelmatch (v10 och senare). Se [versionshistoriktabellen](./compare-options#visual-sensitivity) på sidan Jämförelsealternativ för detaljer. Allt sedan v10.0.0 anges med en "Sedan"-notering på respektive alternativ nedan.
:::

**Sist vinner-ordning:** när mer än en `ignore*`-flagga är aktiverad samtidigt tillämpas endast en förinställning, enligt denna ordning (senare vinner): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. Från och med `v10.1.0` loggas en varning som anger vilken förinställning som vann.

### `ignoreColors`

<Option type="boolean" default="false" required="No">

- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Applikationskontexter som stöds:** Alla
- **Sedan:** `v10.1.0`: jämförelse av endast ljusstyrka med resembles luma-vikter (`0.3/0.59/0.11`).

Jämför endast ljusstyrka (resembles luma-vikter `0.3/0.59/0.11`) och ignorerar skillnader i nyans/färg. Använd detta när själva färgen förväntas variera men du ändå vill fånga ändringar i layout eller ljusstyrka.

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

- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Applikationskontexter som stöds:** Alla
- **Sedan:** `v10.1.0`: tillämpar sin egen tröskel-/AA-regel oberoende av andra `ignore*`-flaggor.

Jämför bilder och bortser från skillnader i alfakanalen. Använd detta när rendering av transparens/opacitet är instabil men pixelfärgerna under spelar roll.

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

- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Applikationskontexter som stöds:** Alla
- **Sedan:** `v10`: standardvärdet ändrades till `true` (var `false` i v9 och tidigare).

Förlåter kantutjämnade pixlar under jämförelsen. Sätt till `false` för strikt jämförelse där kantutjämnade pixlar ska räknas som avvikelser. Detta löser den vanligaste källan till instabila visuella tester: kanter på text/former som renderas med något olika kantutjämning på olika maskiner trots att inget har ändrats.

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

- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Applikationskontexter som stöds:** Alla
- **Sedan:** `v10.1.0`: tillämpar sin egen tröskel-/AA-regel oberoende av andra `ignore*`-flaggor.

Jämför bilder med en mer tillåtande RGB-tolerans (~16/255 per kanal i YIQ-rymden). Kantutjämning förlåts inte. Använd detta för lite andrum vid renderingsbrus (komprimeringsartefakter, färgavrundning) utan att förlåta kantutjämning.

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

- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Applikationskontexter som stöds:** Alla
- **Sedan:** `v10.1.0`: tillämpar sin egen tröskel-/AA-regel oberoende av andra `ignore*`-flaggor.

Använd noll tolerans: varje pixelskillnad räknas som en avvikelse, inklusive kantutjämning. Använd detta när du behöver pixelperfekt bevis på att ingenting alls har ändrats.

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

- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Applikationskontexter som stöds:** Alla
- **Tillagd i:** `v10.1.0`

Åsidosätter jämförelseläget för ett enskilt `check*`-anrop med direkta [pixelmatch](https://github.com/mapbox/pixelmatch)-inställningar (`threshold`, `includeAA`, `diffColor`, `aaColor`, `diffColorAlt`, `alpha`, `diffMask`, `checkerboard`), istället för en `ignore*`-förinställning. Använd detta när förinställningarna är för grova för ett specifikt test, t.ex. när det behöver ett eget tröskelvärde eller en diff-färg som verkligen sticker ut i din rapport. Se [Direkt pixelmatch-kontroll](./compare-options#direct-pixelmatch-control) för fullständig fältreferens och vad varje fält löser.

Kan inte kombineras med `ignore*`-alternativ i samma anrops alternativobjekt: det kastar `CompareOptionsConflictError`. Det kan dock åsidosätta en tjänstekonfiguration som använder `ignore*`-förinställningar (eller vice versa); en varning loggas när ett metodanrop byter jämförelseläge på detta sätt.

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

- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Applikationskontexter som stöds:** Alla

Skalar 2 bilder till samma storlek innan jämförelsen utförs. Det rekommenderas starkt att aktivera `ignoreAntialiasing` och `ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

</Option>
## Mobila maskeringar

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="No">

- **Används med:** _Detta är **endast för mobil**_
- **Applikationskontexter som stöds:** Hybrid (native-del) och native-appar

Maskerar automatiskt status- och adressfältet under jämförelser. Detta förhindrar fel på grund av tid, wifi- eller batteristatus.

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

- **Används med:** _Detta är **endast för mobil**_
- **Applikationskontexter som stöds:** Hybrid (native-del) och native-appar

Maskerar automatiskt verktygsfältet.

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

- **Används med:** _Kan endast användas för `checkScreen()`. Detta är **endast för iPad**_
- **Applikationskontexter som stöds:** Alla

Maskerar automatiskt sidofältet för iPads i liggande läge under jämförelser. Detta förhindrar fel på grund av den inbyggda komponenten för flikar/privat/bokmärken.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

</Option>
## Regionhantering

---

### `blockOut`

<Option type="array" required="No">

- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Applikationskontexter som stöds:** Alla

En array av rektangulära områden som ska maskeras före jämförelsen. Varje post måste vara ett objekt med värdena `x`, `y`, `width` och `height` (i pixlar). De maskerade områdena målas över innan skillnaden beräknas, vilket förhindrar att dessa regioner bidrar till avvikelseprocenten.

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

- **Används med:** Endast med `checkScreen`-metoden, **INTE** med `checkElement`-metoden
- **Applikationskontexter som stöds:** Native app

Denna metod maskerar automatiskt element eller ett område på en skärm baserat på en array av element eller ett objekt med `x|y|width|height`.

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
## Resultat och rapportering

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="No">

- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Applikationskontexter som stöds:** Alla

Om true kommer den returnerade procentsatsen att se ut som `0.12345678`, standard är `0.12`

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

- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Applikationskontexter som stöds:** Alla

Detta returnerar all jämförelsedata, inte bara avvikelseprocenten, se även [Konsolutdata](./test-output#console-output-1)

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

- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Applikationskontexter som stöds:** Alla

Tillåtet värde för `misMatchPercentage` som förhindrar att bilder med skillnader sparas

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

- **Används med:** Alla [Check-metoder](./methods#check-methods)
- **Applikationskontexter som stöds:** Alla

Pixelnärheten som används för att gruppera diff-pixlar i JSON-rapporter. Högre värden grupperar fler pixlar i färre avgränsningsrutor; lägre värden ger mer exakta men fler rutor. Endast relevant när [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) är aktiverat.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        diffPixelBoundingBoxProximity: 10
    }
)
```

# Mappalternativ

---

Baslinjemappen och skärmbildsmapparna (actual, diff) är alternativ som kan anges vid instansieringen av pluginet eller metoden. För att ange mappalternativen för en viss metod, skicka in mappalternativ i metodens alternativobjekt. Detta kan användas för:

- Webb
- Hybridapp
- Native app

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

</Option>
### `actualFolder`

<Option type="string" required="No" contexts="All">

Mapp för ögonblicksbilden som har tagits i testet.

</Option>
### `baselineFolder`

<Option type="string" required="No" contexts="All">

Mapp för baslinjebilden som används att jämföra mot.

</Option>
### `diffFolder`

<Option type="string" required="No" contexts="All">

Mapp för bildskillnaden som renderas under jämförelsen.

</Option>