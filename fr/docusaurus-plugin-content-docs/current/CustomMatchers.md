---
id: custommatchers
title: Matchers Personnalisés
---

WebdriverIO utilise une bibliothèque d'assertions de style Jest [`expect`](https://webdriver.io/docs/api/expect-webdriverio) qui offre des fonctionnalités spéciales et des matchers personnalisés spécifiques pour exécuter des tests web et mobiles. Bien que la bibliothèque de matchers soit importante, elle ne convient certainement pas à toutes les situations possibles. Il est donc possible d'étendre les matchers existants avec des matchers personnalisés définis par vous.

:::warning

Bien qu'il n'y ait actuellement aucune différence dans la façon dont les matchers sont définis, qu'ils soient spécifiques à l'objet [`browser`](/docs/api/browser) ou à une instance [element](/docs/api/element), cela pourrait certainement changer à l'avenir. Gardez un œil sur [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) pour plus d'informations sur ce développement.

:::

## Matchers Personnalisés pour le Navigateur

Pour enregistrer un matcher personnalisé pour le navigateur, appelez `extend` sur l'objet `expect` soit directement dans votre fichier spec, soit dans le cadre du hook `before` dans votre `wdio.conf.js` :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

Comme montré dans l'exemple, la fonction matcher prend l'objet attendu, par exemple l'objet navigateur ou élément, comme premier paramètre et la valeur attendue comme second. Vous pouvez ensuite utiliser le matcher comme suit :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## Matchers Personnalisés pour les Éléments

Similaires aux matchers personnalisés pour le navigateur, les matchers d'éléments ne diffèrent pas. Voici un exemple de création d'un matcher personnalisé pour vérifier l'attribut aria-label d'un élément :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

Cela vous permet d'appeler l'assertion comme suit :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## Support TypeScript

Si vous utilisez TypeScript, une étape supplémentaire est nécessaire pour assurer la sécurité de type de vos matchers personnalisés. En étendant l'interface `Matcher` avec vos matchers personnalisés, tous les problèmes de type disparaissent :

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

Si vous avez créé un [matcher asymétrique](https://jestjs.io/docs/expect#expectextendmatchers) personnalisé, vous pouvez de même étendre les types `expect` comme suit :

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```