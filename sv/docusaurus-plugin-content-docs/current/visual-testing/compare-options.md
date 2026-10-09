---
id: compare-options
title: Jämförelsealternativ
description: "Justera hur skärmbilder jämförs med visuell känslighet, pixelmatch, blockering av mobila element och rapporteringsalternativ för visual-tjänsten."
---

Jämförelsealternativ är alternativ som påverkar hur jämförelsen utförs.

:::info OBS
Alla jämförelsealternativ kan användas när tjänsten instansieras eller för varje enskild `checkElement`, `checkScreen` och `checkFullPageScreen`. Om ett metodalternativ har samma nyckel som ett alternativ som har angetts när tjänsten instansierades, kommer metodens jämförelsealternativ att åsidosätta tjänstens jämförelsealternativ.
:::

## Visuell känslighet

---

:::info Versionshistorik för `ignore*`-alternativ
`ignore*`-förinställningarna ändrade beteende en gång, som en bakåtinkompatibel ändring, när jämförelsemotorn byttes från ResembleJS till Pixelmatch:

| Version | Motor | Anteckningar |
| --- | --- | --- |
| v9 och tidigare | ResembleJS | Ursprunglig `ignore*`-semantik (RGB-/ljusstyrkebaserad, resembles egen ordning för förinställningar). |
| v10 och senare | Pixelmatch | `ignore*`-förinställningarna mappas till pixelmatchs inställningar för tröskelvärde/AA. Nuvarande standardvärden och beteende dokumenteras per alternativ nedan; nya funktioner/korrigeringar ovanpå detta anges med en "Sedan"-anteckning på det berörda alternativet. |

:::

**Sista vinner-ordning:** när mer än en `ignore*`-flagga är aktiverad samtidigt tillämpas bara en förinställning, enligt denna ordning (senare vinner): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. En varning loggas som anger vilken förinställning som vann.

### `ignoreColors`

<Option type="boolean" default="false" required="no">

-   **Anmärkning:** _Kan även användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det åsidosätter plugin-inställningen_
-   **Sedan:** `v10.1.0`: jämförelse endast av ljusstyrka med resembles luma-vikter (`0.3/0.59/0.11`).

Jämför endast ljusstyrka och ignorerar skillnader i nyans/färg. Förinställning: strikt tröskelvärde (~16/255), kantutjämning förlåts inte.

**Använd detta när** själva färgen förväntas variera (t.ex. temabart UI, bilder som byter färg per miljö) men du ändå vill fånga ändringar i layout eller ljusstyrka.

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="no">

-   **Anmärkning:** _Kan även användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det åsidosätter plugin-inställningen_
-   **Sedan:** `v10.1.0`: tillämpar sin egen regel för tröskelvärde/AA oberoende av andra `ignore*`-flaggor.

Jämför bilder och bortser från skillnader i alfakanalen. Förinställning: strikt tröskelvärde (~16/255), kantutjämning förlåts inte.

**Använd detta när** rendering av transparens/opacitet är instabil (t.ex. överlägg, halvtransparenta element) men de faktiska pixelfärgerna under spelar roll.

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="no">

-   **Anmärkning:** _Kan även användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det åsidosätter plugin-inställningen_
-   **Sedan:** `v10`: standardvärdet ändrat till `true` (var `false` i v9 och tidigare).

Förlåter kantutjämnade pixlar under jämförelsen (avslappnat tröskelvärde ~32/255). Detta är den enda förinställningen som förlåter kantutjämning, och den är aktiverad som standard så att brus från subpixelrendering inte får jämförelser att misslyckas direkt. Sätt till `false` för strikt jämförelse där kantutjämnade pixlar ska räknas som avvikelser.

**Använd detta för att** lösa den vanligaste orsaken till instabila visuella tester: text- och formkanter som renderas med något olika kantutjämning mellan maskiner/webbläsare trots att ingenting faktiskt har ändrats.

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="no">

-   **Anmärkning:** _Kan även användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det åsidosätter plugin-inställningen_
-   **Sedan:** `v10.1.0`: tillämpar sin egen regel för tröskelvärde/AA oberoende av andra `ignore*`-flaggor.

Jämför bilder med en avslappnad RGB-tolerans (~16/255 per kanal i YIQ-rymden). Förinställning: strikt tröskelvärde, kantutjämning förlåts inte.

**Använd detta när** du vill ha lite marginal för mindre renderingsbrus (komprimeringsartefakter i JPEG-stil, lätt färgavrundning) utan att förlåta kantutjämning.

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="no">

-   **Anmärkning:** _Kan även användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det åsidosätter plugin-inställningen_
-   **Sedan:** `v10.1.0`: tillämpar sin egen regel för tröskelvärde/AA oberoende av andra `ignore*`-flaggor.

Använd noll tolerans: varje pixelskillnad räknas som en avvikelse, inklusive kantutjämning.

**Använd detta när** du behöver pixelperfekt bevis på att ingenting alls har ändrats, t.ex. för att verifiera att en korrigering inte införde någon regression, hur liten den än är.

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="no">

-   **Anmärkning:** _Kan även användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det åsidosätter plugin-inställningen_

Skalar 2 bilder till samma storlek innan jämförelsen utförs. Det rekommenderas starkt att aktivera `ignoreAntialiasing` och `ignoreAlpha`

</Option>
## Direkt styrning av pixelmatch

---

:::info Tillagt i v10.1.0
`compareOptions.pixelmatch` har ingen motsvarighet i v9 (ResembleJS). Det är ett helt nytt sätt att styra jämförelsemotorn direkt, i stället för att använda en `ignore*`-förinställning.
:::

### `compareOptions.pixelmatch`

<Option type="object" default="undefined" required="no">

-   **Anmärkning:** _Kan även användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det åsidosätter plugin-inställningen för den specifika metod som används_
-   **Tillagt i:** `v10.1.0`

Skickar inställningar direkt till [pixelmatch](https://github.com/mapbox/pixelmatch) i stället för att använda en `ignore*`-förinställning. **Använd detta när de fem `ignore*`-förinställningarna är för grova:** du behöver ett specifikt tröskelvärde som förinställningarna inte erbjuder, eller en diff-bild som faktiskt är läsbar i dina rapporter/CI-utdata i stället för standardmarkeringen i magenta.

:::warning Ömsesidigt uteslutande inom samma alternativobjekt
Att lägga en `ignore*`-nyckel och `pixelmatch` i **samma** alternativobjekt kastar `CompareOptionsConflictError`, även när `ignore*`-värdet är `false` (se det ogiltiga exemplet nedan). Välj ett läge per objekt: `ignore*`-förinställningar eller `pixelmatch`, aldrig båda.

Detta gäller endast inom ett objekt. Tjänstkonfigurationen och ett metodanrops alternativ är separata objekt, så ett `check*`-anrop **får** använda ett annat läge än tjänstkonfigurationen, till exempel använder tjänsten `ignore*`-förinställningar men ett anrop skickar `pixelmatch` i stället (eller vice versa). Inget fel i det fallet, bara en loggad varning om att jämförelseläget har bytts.
:::

| Fält | Typ | Standard | Vad det är till för |
| --- | --- | --- | --- |
| `threshold` | `number` | `0.1` | Känslighet från 0 (varje pixelskillnad misslyckas) till 1 (nästan ingenting misslyckas). Använd detta för att ställa in ett exakt känslighetsvärde i stället för att välja den närmaste `ignore*`-förinställningen. |
| `includeAA` | `boolean` | `false` | `true` räknar kantutjämnade kantpixlar som avvikelser; `false` förlåter dem. Stäng av detta om skillnader i rendering av typsnitts-/formkanter orsakar instabila fel. |
| `diffColor` | `[number, number, number]` | `[255, 0, 255]` (magenta) | RGB-färg för avvikande pixlar i diff-bilden. Ändra den om magenta smälter in i ditt UI (t.ex. ett rosa/lila tema) och avvikelser är svåra att upptäcka. |
| `aaColor` | `[number, number, number]` | `[255, 0, 255]` (magenta) | RGB-färg för kantutjämnade pixlar, visuellt åtskild från verkliga avvikelser så att du direkt kan skilja "renderingsbrus" från "faktisk bugg". |
| `diffColorAlt` | `[number, number, number]` | `[255, 0, 255]` (magenta) | RGB-färg för pixlar som har lagts till eller tagits bort (inte bara färgats om), användbart för att skilja layoutförskjutningar från färgändringar. |
| `alpha` | `number` | `0.1` | Opacitet för diff-överlägget ovanpå den faktiska skärmbilden. Höj den för att få skillnader att synas mer i rapporter; sänk den för att fortfarande se det underliggande UI:t tydligt. Inte relaterat till förinställningen `ignoreAlpha`. |
| `diffMask` | `boolean` | `false` | Sätt till `true` för att endast generera den råa diffen (transparent bakgrund) i stället för diffen ritad över din skärmbild, användbart för att bygga din egen anpassade diff-visare/rapport. |
| `checkerboard` | `boolean` | `true` | Styr hur halvtransparenta pixlar renderas i diffen. Stäng av om schackrutemönstret lätt kan förväxlas med verkligt innehåll i dina skärmbilder. |

**Tjänstkonfiguration:**

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['visual', {
            compareOptions: {
                pixelmatch: {
                    threshold: 0.063,
                    includeAA: true,
                },
            },
        }],
    ],
}
```

**Metodåsidosättning när tjänsten använder `ignore*`-förinställningar:**

```js
await browser.checkScreen('homepage', {
    pixelmatch: { threshold: 0.05 },
})
```

**Metodåsidosättning när tjänsten använder `pixelmatch`:**

```js
await browser.checkScreen('homepage', {
    ignoreLess: true,
})
```

**Ogiltigt: kastar `CompareOptionsConflictError`**

```js
compareOptions: {
    ignoreLess: false,
    pixelmatch: { threshold: 0.063 },
}
```

Se [pixelmatch-dokumentationen](https://github.com/mapbox/pixelmatch) för fullständig semantik för alternativen.

</Option>
## Blockering av mobila element

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="no">

-   **Anmärkning:** _Kan även användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det åsidosätter plugin-inställningen. Detta gäller **endast mobil**_

Blockerar automatiskt status- och adressfältet under jämförelser. Detta förhindrar fel på grund av tid, wifi eller batteristatus.

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="no">

-   **Anmärkning:** _Kan även användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det åsidosätter plugin-inställningen. Detta gäller **endast mobil**_

Blockerar automatiskt verktygsfältet.

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="no">

-   **Anmärkning:** _Kan endast användas för `checkScreen()`. Det åsidosätter plugin-inställningen. Detta gäller **endast iPad**_

Blockerar automatiskt sidofältet för iPads i liggande läge under jämförelser. Detta förhindrar fel på den inbyggda komponenten för flikar/privat/bokmärken.

</Option>
## Resultat och rapportering

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="no">

-   **Anmärkning:** _Kan även användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det åsidosätter plugin-inställningen_

Om true blir den returnerade procentsatsen som `0.12345678`, standard är `0.12`

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="no">

-   **Anmärkning:** _Kan även användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det åsidosätter plugin-inställningen_

Detta returnerar all jämförelsedata, inte bara avvikelseprocenten

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="no">

-   **Anmärkning:** _Kan även användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Det åsidosätter plugin-inställningen_

Tillåtet värde för `misMatchPercentage` som förhindrar att bilder med skillnader sparas

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="no">

-   **Anmärkning:** _Kan även användas för `checkElement`, `checkScreen()` och `checkFullPageScreen()`. Endast relevant när [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) är aktiverat._

Pixelnärheten som används för att gruppera diff-pixlar i JSON-rapporter. Högre värden grupperar fler pixlar i färre avgränsningsrutor; lägre värden ger mer exakta men fler rutor.

</Option>