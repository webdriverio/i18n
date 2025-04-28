---
id: custommatchers
title: Anpassade Matchers
---

WebdriverIO använder ett Jest-liknande [`expect`](https://webdriver.io/docs/api/expect-webdriverio) bekräftelsebibliotek som kommer med speciella funktioner och anpassade matchers specifikt för att köra webb- och mobiltester. Trots att biblioteket med matchers är stort, passar det definitivt inte alla möjliga situationer. Därför är det möjligt att utöka de befintliga matchers med anpassade som definieras av dig.

:::warning

Även om det för närvarande inte finns någon skillnad i hur matchers definieras som är specifika för [`browser`](/docs/api/browser)-objektet eller en [element](/docs/api/element)-instans, kan detta säkerligen förändras i framtiden. Håll ett öga på [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) för ytterligare information om denna utveckling.

:::

## Anpassade Browser Matchers

För att registrera en anpassad browser matcher, anropa `extend` på `expect`-objektet antingen direkt i din spec-fil eller som en del av t.ex. `before`-hooken i din `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Som visas i exemplet tar matcher-funktionen det förväntade objektet, t.ex. browser- eller elementobjektet, som den första parametern och det förväntade värdet som den andra. Du kan sedan använda matchern så här:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Anpassade Element Matchers

Liknande anpassade browser matchers skiljer sig elementmatcher inte åt. Här är ett exempel på hur man skapar en anpassad matcher för att bekräfta aria-label för ett element:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Detta låter dig anropa bekräftelsen så här:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## TypeScript-stöd

Om du använder TypeScript krävs ytterligare ett steg för att säkerställa typsäkerheten för dina anpassade matchers. Genom att utöka `Matcher`-gränssnittet med dina anpassade matchers försvinner alla typproblem:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Om du skapade en anpassad [asymmetrisk matcher](https://jestjs.io/docs/expect#expectextendmatchers) kan du på liknande sätt utöka `expect`-typerna enligt följande:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```