---
id: coverage
title: Kodtäckning
---

WebdriverIOs webbläsarkörning stöder rapportering av kodtäckning med hjälp av [`istanbul`](https://istanbul.js.org/). Testrunner kommer automatiskt att instrumentera din kod och samla in kodtäckning åt dig.

## Konfiguration

För att aktivera rapportering av kodtäckning, aktivera det genom WebdriverIOs webbläsarkörningskonfiguration, t.ex.:

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

Det kan finnas vissa delar av din kodbas som du medvetet vill utesluta från kodtäckning. För att göra detta kan du använda följande tolkningsanvisningar:

- `/* istanbul ignore if */`: ignorera nästa if-sats.
- `/* istanbul ignore else */`: ignorera else-delen av en if-sats.
- `/* istanbul ignore next */`: ignorera nästa sak i källkoden (funktioner, if-satser, klasser, vad som helst).
- `/* istanbul ignore file */`: ignorera en hel källkodsfil (detta bör placeras överst i filen).

:::info

Det rekommenderas att utesluta dina testfiler från kodtäckningsrapporten eftersom det kan orsaka fel, t.ex. när du anropar `execute` eller `executeAsync`-kommandon. Om du vill behålla dem i din rapport, se till att utesluta instrumentering av dem via:

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::