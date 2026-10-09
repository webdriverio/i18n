---
id: custommatchers
title: Anpassade matchers
description: "Registrera anpassade webbläsar- och elementmatchers med expect.extend och lägg till TypeScript-typer för dem."
---

WebdriverIO använder ett [`expect`](https://webdriver.io/docs/api/expect-webdriverio)-assertionsbibliotek i Jest-stil som har särskilda funktioner och anpassade matchers specifikt för att köra webb- och mobiltester. Även om biblioteket med matchers är stort täcker det givetvis inte alla tänkbara situationer. Därför är det möjligt att utöka de befintliga matcherna med egna anpassade matchers som du själv definierar.

:::warning

Även om det för närvarande inte finns någon skillnad i hur matchers definieras som är specifika för [`browser`](/docs/api/browser)-objektet eller en [element](/docs/api/element)-instans, kan detta mycket väl ändras i framtiden. Håll ett öga på [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) för mer information om denna utveckling.

:::

:::info Jasmine

Med Jasmine-ramverket anropar du `expect.extend` i en spec-fil eller i `before`-hooken, innan testerna körs. Matcherna blir asynkrona Jasmine-matchers, så använd `await` med dem. En matcher med samma namn som en synkron Jasmine-matcher körs endast för WebdriverIO-värden, precis som WebdriverIO-matcherna. Anpassade asymmetriska matchers (`expect.myMatcher()`) är inte tillgängliga. Du kan också använda `jasmine.addMatchers` för en synkron matcher eller `jasmine.addAsyncMatchers` för en asynkron matcher, se [Jasmines handledning om anpassade matchers](https://jasmine.github.io/tutorials/custom_matchers).

:::

## Anpassade webbläsarmatchers

För att registrera en anpassad webbläsarmatcher anropar du `extend` på `expect`-objektet, antingen direkt i din spec-fil eller som en del av t.ex. `before`-hooken i din `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Som visas i exemplet tar matcherfunktionen det förväntade objektet, t.ex. browser- eller elementobjektet, som första parameter och det förväntade värdet som andra. Du kan sedan använda matchern på följande sätt:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Anpassade elementmatchers

Elementmatchers skiljer sig inte från anpassade webbläsarmatchers. Här är ett exempel på hur du skapar en anpassad matcher för att verifiera ett elements aria-label:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Detta gör att du kan anropa assertionen på följande sätt:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## TypeScript-stöd

Om du använder TypeScript krävs ytterligare ett steg för att säkerställa typsäkerheten för dina anpassade matchers. Genom att utöka `Matcher`-gränssnittet med dina anpassade matchers försvinner alla typproblem:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Om du har skapat en anpassad [asymmetrisk matcher](https://jestjs.io/docs/expect#expectextendmatchers) kan du på liknande sätt utöka `expect`-typerna så här:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```