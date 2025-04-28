---
id: coverage
title: Täckning
---

WebdriverIOs webbläsarkörning stöder kodtäckningsrapportering med hjälp av [`istanbul`](https://istanbul.js.org/). Testrunnern instrumenterar automatiskt din kod och samlar in kodtäckning för dig.

## Inställning

För att aktivera kodtäckningsrapportering, aktivera det genom WebdriverIOs webbläsarkörningskonfiguration, t.ex.:

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

Kolla in alla [täckningsalternativ](/docs/runner#coverage-options) för att lära dig hur du konfigurerar det korrekt.

## Ignorera kod

Det kan finnas vissa delar av din kodbas som du vill avsiktligt utesluta från täckningsspårning. För att göra detta kan du använda följande tolkningstips:

- `/* istanbul ignore if */`: ignorera nästa if-sats.
- `/* istanbul ignore else */`: ignorera else-delen av en if-sats.
- `/* istanbul ignore next */`: ignorera nästa sak i källkoden (funktioner, if-satser, klasser, vad som helst).
- `/* istanbul ignore file */`: ignorera en hel källkodsfil (detta bör placeras högst upp i filen).

:::info

Det rekommenderas att utesluta dina testfiler från täckningsrapporteringen eftersom det kan orsaka fel, t.ex. när du anropar kommandon som `execute` eller `executeAsync`. Om du vill behålla dem i din rapport, se till att du undviker att instrumentera dem via:

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::