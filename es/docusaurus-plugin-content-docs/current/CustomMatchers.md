---
id: custommatchers
title: Matchers personalizados
description: "Registra matchers personalizados para el navegador y los elementos con expect.extend y añade tipos de TypeScript para ellos."
---

WebdriverIO utiliza una biblioteca de aserciones [`expect`](https://webdriver.io/docs/api/expect-webdriverio) al estilo de Jest que incluye características especiales y matchers personalizados específicos para ejecutar pruebas web y móviles. Aunque la biblioteca de matchers es amplia, ciertamente no cubre todas las situaciones posibles. Por lo tanto, es posible ampliar los matchers existentes con otros personalizados definidos por ti.

:::warning

Aunque actualmente no hay diferencia en cómo se definen los matchers específicos para el objeto [`browser`](/docs/api/browser) o para una instancia de [elemento](/docs/api/element), esto ciertamente podría cambiar en el futuro. Mantente atento a [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) para obtener más información sobre este desarrollo.

:::

:::info Jasmine

Con el framework Jasmine, llama a `expect.extend` en un archivo de especificación o en el hook `before`, antes de que se ejecuten las pruebas. Los matchers se convierten en matchers asíncronos de Jasmine, por lo que debes usar `await` con ellos. Un matcher con el nombre de un matcher síncrono de Jasmine se ejecuta solo para valores de WebdriverIO, al igual que los matchers de WebdriverIO. Los matchers asimétricos personalizados (`expect.myMatcher()`) no están disponibles. También puedes usar `jasmine.addMatchers` para un matcher síncrono o `jasmine.addAsyncMatchers` para un matcher asíncrono; consulta el [tutorial de matchers personalizados de Jasmine](https://jasmine.github.io/tutorials/custom_matchers).

:::

## Matchers personalizados para el navegador

Para registrar un matcher personalizado para el navegador, llama a `extend` en el objeto `expect`, ya sea directamente en tu archivo de especificación o como parte, por ejemplo, del hook `before` en tu `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Como se muestra en el ejemplo, la función del matcher recibe el objeto esperado, por ejemplo, el objeto del navegador o del elemento, como primer parámetro y el valor esperado como segundo. Luego puedes usar el matcher de la siguiente manera:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Matchers personalizados para elementos

De forma similar a los matchers personalizados para el navegador, los matchers para elementos no se diferencian. Aquí tienes un ejemplo de cómo crear un matcher personalizado para comprobar el aria-label de un elemento:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Esto te permite llamar a la aserción de la siguiente manera:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Soporte para TypeScript

Si estás usando TypeScript, se requiere un paso más para garantizar la seguridad de tipos de tus matchers personalizados. Al extender la interfaz `Matcher` con tus matchers personalizados, todos los problemas de tipos desaparecen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Si creaste un [matcher asimétrico](https://jestjs.io/docs/expect#expectextendmatchers) personalizado, puedes extender de manera similar los tipos de `expect` de la siguiente forma:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```