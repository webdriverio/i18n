---
id: custommatchers
title: Matchers Personalizados
---

WebdriverIO utiliza una biblioteca de aserciones estilo Jest [`expect`](https://webdriver.io/docs/api/expect-webdriverio) que viene con características especiales y matchers personalizados específicos para ejecutar pruebas web y móviles. Aunque la biblioteca de matchers es grande, ciertamente no se adapta a todas las situaciones posibles. Por lo tanto, es posible extender los matchers existentes con otros personalizados definidos por ti.

:::warning

Aunque actualmente no hay diferencia en cómo se definen los matchers que son específicos para el objeto [`browser`](/docs/api/browser) o una instancia de [element](/docs/api/element), esto ciertamente podría cambiar en el futuro. Mantén un ojo en [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) para más información sobre este desarrollo.

:::

## Matchers Personalizados para el Navegador

Para registrar un matcher personalizado para el navegador, llama a `extend` en el objeto `expect` ya sea directamente en tu archivo de especificación o como parte del hook `before` en tu `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Como se muestra en el ejemplo, la función matcher toma el objeto esperado, por ejemplo, el objeto browser o element, como primer parámetro y el valor esperado como segundo. Luego puedes usar el matcher de la siguiente manera:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Matchers Personalizados para Elementos

Similar a los matchers personalizados del navegador, los matchers de elementos no difieren. Aquí hay un ejemplo de cómo crear un matcher personalizado para afirmar el aria-label de un elemento:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Esto te permite llamar a la aserción de la siguiente manera:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Soporte para TypeScript

Si estás usando TypeScript, se requiere un paso más para garantizar la seguridad de tipos de tus matchers personalizados. Al extender la interfaz `Matcher` con tus matchers personalizados, todos los problemas de tipo desaparecen:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Si creaste un [matcher asimétrico](https://jestjs.io/docs/expect#expectextendmatchers) personalizado, puedes extender los tipos de `expect` de manera similar de la siguiente manera:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```