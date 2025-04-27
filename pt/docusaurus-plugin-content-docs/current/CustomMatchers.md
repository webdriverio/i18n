---
id: custommatchers
title: Matchers Personalizados
---

O WebdriverIO usa uma biblioteca de asserção no estilo Jest [`expect`](https://webdriver.io/docs/api/expect-webdriverio) que vem com recursos especiais e matchers personalizados específicos para executar testes web e mobile. Embora a biblioteca de matchers seja grande, ela certamente não se adequa a todas as situações possíveis. Portanto, é possível estender os matchers existentes com outros personalizados definidos por você.

:::warning

Embora atualmente não haja diferença em como os matchers são definidos, sejam específicos para o objeto [`browser`](/docs/api/browser) ou uma instância de [element](/docs/api/element), isso certamente pode mudar no futuro. Fique de olho em [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) para mais informações sobre esse desenvolvimento.

:::

## Matchers Personalizados para o Browser

Para registrar um matcher personalizado para o browser, chame `extend` no objeto `expect` diretamente em seu arquivo de spec ou como parte do hook `before` em seu `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Como mostrado no exemplo, a função matcher recebe o objeto esperado, por exemplo, o objeto browser ou element, como primeiro parâmetro e o valor esperado como segundo. Você pode então usar o matcher da seguinte forma:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Matchers Personalizados para Elementos

Semelhante aos matchers personalizados do browser, os matchers de elementos não diferem. Aqui está um exemplo de como criar um matcher personalizado para verificar o aria-label de um elemento:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Isso permite que você chame a asserção da seguinte forma:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Suporte a TypeScript

Se você estiver usando TypeScript, mais um passo é necessário para garantir a segurança de tipos dos seus matchers personalizados. Ao estender a interface `Matcher` com seus matchers personalizados, todos os problemas de tipo desaparecem:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Se você criou um [matcher assimétrico](https://jestjs.io/docs/expect#expectextendmatchers) personalizado, você pode estender os tipos `expect` de forma semelhante:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```