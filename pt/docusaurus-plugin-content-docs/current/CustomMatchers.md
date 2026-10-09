---
id: custommatchers
title: Matchers Personalizados
description: "Registre matchers personalizados de navegador e de elemento com expect.extend e adicione tipos TypeScript para eles."
---

O WebdriverIO usa uma biblioteca de asserções [`expect`](https://webdriver.io/docs/api/expect-webdriverio) no estilo Jest que vem com recursos especiais e matchers personalizados específicos para executar testes web e mobile. Embora a biblioteca de matchers seja grande, ela certamente não atende a todas as situações possíveis. Por isso, é possível estender os matchers existentes com matchers personalizados definidos por você.

:::warning

Embora atualmente não haja diferença na forma como são definidos os matchers específicos para o objeto [`browser`](/docs/api/browser) ou para uma instância de [elemento](/docs/api/element), isso certamente pode mudar no futuro. Fique de olho em [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) para mais informações sobre esse desenvolvimento.

:::

:::info Jasmine

Com o framework Jasmine, chame `expect.extend` em um arquivo de spec ou no hook `before`, antes da execução dos testes. Os matchers se tornam matchers assíncronos do Jasmine, portanto use `await` com eles. Um matcher com o nome de um matcher síncrono do Jasmine é executado apenas para valores do WebdriverIO, assim como os matchers do WebdriverIO. Matchers assimétricos personalizados (`expect.myMatcher()`) não estão disponíveis. Você também pode usar `jasmine.addMatchers` para um matcher síncrono ou `jasmine.addAsyncMatchers` para um matcher assíncrono; veja o [tutorial de matchers personalizados do Jasmine](https://jasmine.github.io/tutorials/custom_matchers).

:::

## Matchers Personalizados de Navegador

Para registrar um matcher personalizado de navegador, chame `extend` no objeto `expect` diretamente no seu arquivo de spec ou como parte, por exemplo, do hook `before` no seu `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Como mostrado no exemplo, a função do matcher recebe o objeto esperado, por exemplo, o objeto do navegador ou do elemento, como primeiro parâmetro e o valor esperado como segundo. Você pode então usar o matcher da seguinte forma:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Matchers Personalizados de Elemento

Assim como os matchers personalizados de navegador, os matchers de elemento não são diferentes. Aqui está um exemplo de como criar um matcher personalizado para verificar o aria-label de um elemento:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Isso permite que você chame a asserção da seguinte forma:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Suporte a TypeScript

Se você estiver usando TypeScript, é necessário mais um passo para garantir a segurança de tipos dos seus matchers personalizados. Ao estender a interface `Matcher` com seus matchers personalizados, todos os problemas de tipo desaparecem:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Se você criou um [matcher assimétrico](https://jestjs.io/docs/expect#expectextendmatchers) personalizado, pode estender os tipos do `expect` de forma semelhante, da seguinte maneira:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```