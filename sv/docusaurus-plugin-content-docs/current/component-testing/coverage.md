---
id: coverage
title: Kodtäckning
description: "Samla in kodtäckning för komponenttester med webbläsarkörningen, som instrumenterar din kod med istanbul via Vite."
---

WebdriverIO:s webbläsarkörning (browser runner) stöder rapportering av kodtäckning med hjälp av [`istanbul`](https://istanbul.js.org/). Testkörningen instrumenterar automatiskt din kod med Vite och samlar in kodtäckning åt dig.

## Hur det fungerar

`@wdio/browser-runner` använder Vite för att servera din applikation. När du aktiverar kodtäckning lägger den till ett plugin i Vite-servern som försöker instrumentera din källkod i farten när den begärs av webbläsaren.

:::warning Viktigt
**Navigera inte bort från testkörningen!**

Kodtäckning förutsätter att filerna serveras och instrumenteras av den lokala Vite-server som startas av WebdriverIO.
Om du använder `browser.url('http://...')` eller `browser.url('file://...')` för att navigera till en annan sida lämnar du den instrumenterade miljön. Din kod kommer att köras, men **ingen kodtäckning kommer att samlas in**.

**Korrekt tillvägagångssätt (komponenttestning):**
Rendera din komponent eller importera din modul direkt i testfilen.

```js
import { myFunction } from '../src/utils.js'

it('should cover my function', () => {
    myFunction() // Detta täcks
})
```

**Felaktigt tillvägagångssätt (E2E-stil):**
```js
it('will not have coverage', async () => {
    // ❌ att navigera bort bryter instrumenteringen
    await browser.url('http://localhost:3000')
})
```
:::

## Konfiguration

För att aktivera rapportering av kodtäckning, aktivera den via konfigurationen för WebdriverIO:s webbläsarkörning, t.ex.:

```js title=wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: process.env.WDIO_PRESET,
        coverage: {
            enabled: true
        }
    }],
    // ...
}
```

Kolla in alla [alternativ för kodtäckning](/docs/runner#coverage-options) för att lära dig hur du konfigurerar det korrekt.

:::tip Konfigurationstips
Om du testar filer som inte är standard (som inline-skript i `.html`) eller om dina filer inte plockas upp kan du behöva uttryckligen kontrollera dina `include`- och `extension`-alternativ:

```js
coverage: {
    enabled: true,
    // Ange uttryckligen dina källfiler om standardupplösningen misslyckas
    include: ['src/**/*.js', 'src/**/*.vue'],
    // Lägg till .html om du har inline-skript
    extension: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.html']
}
```
:::

## Ignorera kod

Det kan finnas delar av din kodbas som du avsiktligt vill utesluta från spårning av kodtäckning. För att göra det kan du använda följande tolkningsdirektiv:

- `/* istanbul ignore if */`: ignorera nästa if-sats.
- `/* istanbul ignore else */`: ignorera else-delen av en if-sats.
- `/* istanbul ignore next */`: ignorera nästa sak i källkoden (funktioner, if-satser, klasser, vad som helst).
- `/* istanbul ignore file */`: ignorera en hel källfil (detta bör placeras högst upp i filen).

:::info

Det rekommenderas att utesluta dina testfiler från kodtäckningsrapporteringen eftersom det kan orsaka fel, t.ex. när kommandot `execute` anropas. Om du vill behålla dem i din rapport, se till att du utesluter dem från instrumentering via:

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::