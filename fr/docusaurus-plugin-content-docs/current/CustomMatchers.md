---
id: custommatchers
title: Matchers personnalisés
description: "Enregistrez des matchers personnalisés pour le navigateur et les éléments avec expect.extend et ajoutez-leur des types TypeScript."
---

WebdriverIO utilise une bibliothèque d'assertions [`expect`](https://webdriver.io/docs/api/expect-webdriverio) de style Jest qui offre des fonctionnalités spéciales et des matchers personnalisés spécifiques à l'exécution de tests web et mobiles. Bien que la bibliothèque de matchers soit vaste, elle ne couvre certainement pas toutes les situations possibles. Il est donc possible d'étendre les matchers existants avec des matchers personnalisés que vous définissez vous-même.

:::warning

Bien qu'il n'y ait actuellement aucune différence dans la manière de définir les matchers spécifiques à l'objet [`browser`](/docs/api/browser) ou à une instance d'[élément](/docs/api/element), cela pourrait certainement changer à l'avenir. Gardez un œil sur [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) pour plus d'informations sur cette évolution.

:::

:::info Jasmine

Avec le framework Jasmine, appelez `expect.extend` dans un fichier de spécification ou dans le hook `before`, avant l'exécution des tests. Les matchers deviennent des matchers asynchrones Jasmine, vous devez donc les utiliser avec `await`. Un matcher portant le nom d'un matcher synchrone Jasmine s'exécute uniquement pour les valeurs WebdriverIO, comme les matchers WebdriverIO. Les matchers asymétriques personnalisés (`expect.myMatcher()`) ne sont pas disponibles. Vous pouvez également utiliser `jasmine.addMatchers` pour un matcher synchrone ou `jasmine.addAsyncMatchers` pour un matcher asynchrone, consultez le [tutoriel Jasmine sur les matchers personnalisés](https://jasmine.github.io/tutorials/custom_matchers).

:::

## Matchers personnalisés pour le navigateur

Pour enregistrer un matcher personnalisé pour le navigateur, appelez `extend` sur l'objet `expect`, soit directement dans votre fichier de spécification, soit par exemple dans le hook `before` de votre `wdio.conf.js` :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Comme le montre l'exemple, la fonction du matcher prend l'objet attendu, par exemple l'objet navigateur ou élément, comme premier paramètre et la valeur attendue comme second. Vous pouvez ensuite utiliser le matcher comme suit :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Matchers personnalisés pour les éléments

Les matchers d'éléments ne diffèrent pas des matchers personnalisés pour le navigateur. Voici un exemple de création d'un matcher personnalisé pour vérifier l'aria-label d'un élément :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Cela vous permet d'appeler l'assertion comme suit :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Prise en charge de TypeScript

Si vous utilisez TypeScript, une étape supplémentaire est nécessaire pour garantir la sécurité de typage de vos matchers personnalisés. En étendant l'interface `Matcher` avec vos matchers personnalisés, tous les problèmes de typage disparaissent :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Si vous avez créé un [matcher asymétrique](https://jestjs.io/docs/expect#expectextendmatchers) personnalisé, vous pouvez de la même manière étendre les types `expect` comme suit :

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```