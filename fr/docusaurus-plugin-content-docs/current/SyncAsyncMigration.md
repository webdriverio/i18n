---
id: async-migration
title: De Sync à Async
---

En raison des changements dans V8, l'équipe WebdriverIO a [annoncé](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) la dépréciation de l'exécution synchrone des commandes d'ici avril 2023. L'équipe a travaillé dur pour rendre la transition aussi facile que possible. Dans ce guide, nous expliquons comment vous pouvez progressivement migrer votre suite de tests du mode synchrone vers asynchrone. Comme projet d'exemple, nous utilisons le [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), mais l'approche est la même pour tous les autres projets.

## Les Promesses en JavaScript

La raison pour laquelle l'exécution synchrone était populaire dans WebdriverIO est qu'elle élimine la complexité de la gestion des promesses. Particulièrement si vous venez d'autres langages où ce concept n'existe pas de cette façon, cela peut être déroutant au début. Cependant, les Promesses sont un outil très puissant pour gérer le code asynchrone, et le JavaScript d'aujourd'hui rend leur utilisation assez simple. Si vous n'avez jamais travaillé avec des Promesses, nous vous recommandons de consulter le [guide de référence MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), car il serait hors de portée de l'expliquer ici.

## Transition vers l'asynchrone

Le testrunner WebdriverIO peut gérer l'exécution asynchrone et synchrone au sein de la même suite de tests. Cela signifie que vous pouvez migrer progressivement vos tests et PageObjects étape par étape à votre rythme. Par exemple, le Cucumber Boilerplate a défini [un large ensemble de définitions d'étapes](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) que vous pouvez copier dans votre projet. Nous pouvons procéder et migrer une définition d'étape ou un fichier à la fois.

:::tip

WebdriverIO propose un [codemod](https://github.com/webdriverio/codemod) qui permet de transformer votre code synchrone en code asynchrone presque automatiquement. Exécutez le codemod comme décrit dans la documentation d'abord et utilisez ce guide pour la migration manuelle si nécessaire.

:::

Dans de nombreux cas, tout ce qu'il est nécessaire de faire est de rendre la fonction dans laquelle vous appelez les commandes WebdriverIO `async` et d'ajouter un `await` devant chaque commande. En regardant le premier fichier `clearInputField.ts` à transformer dans le projet boilerplate, nous passons de :

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

à :

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

C'est tout. Vous pouvez voir le commit complet avec tous les exemples de réécriture ici :

#### Commits :

- _transformer toutes les définitions d'étapes_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
Cette transition est indépendante de l'utilisation ou non de TypeScript. Si vous utilisez TypeScript, assurez-vous de changer éventuellement la propriété `types` dans votre `tsconfig.json` de `webdriverio/sync` à `@wdio/globals/types`. Assurez-vous également que votre cible de compilation est définie au moins sur `ES2018`.
:::

## Cas particuliers

Il y a bien sûr toujours des cas particuliers où vous devez faire un peu plus attention.

### Boucles ForEach

Si vous avez une boucle `forEach`, par exemple pour itérer sur des éléments, vous devez vous assurer que le callback d'itération est géré correctement de manière asynchrone, par exemple :

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

La fonction que nous passons dans `forEach` est une fonction d'itération. Dans un monde synchrone, elle cliquerait sur tous les éléments avant de passer à la suite. Si nous transformons cela en code asynchrone, nous devons nous assurer d'attendre que chaque fonction d'itération termine son exécution. En ajoutant `async`/`await`, ces fonctions d'itération renverront une promesse que nous devons résoudre. Maintenant, `forEach` n'est plus idéal pour itérer sur les éléments car il ne renvoie pas le résultat de la fonction d'itération, la promesse que nous devons attendre. Par conséquent, nous devons remplacer `forEach` par `map` qui renvoie cette promesse. Le `map` ainsi que toutes les autres méthodes d'itération des tableaux comme `find`, `every`, `reduce` et plus sont implémentés de manière à respecter les promesses dans les fonctions d'itération et sont donc simplifiés pour les utiliser dans un contexte asynchrone. L'exemple ci-dessus transformé ressemble à ceci :

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

Par exemple, pour récupérer tous les éléments `<h3 />` et obtenir leur contenu textuel, vous pouvez exécuter :

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * renvoie :
 * [
 *   'Extendable',
 *   'Compatible',
 *   'Feature Rich',
 *   'Who is using WebdriverIO?',
 *   'Support for Modern Web and Mobile Frameworks',
 *   'Google Lighthouse Integration',
 *   'Watch Talks about WebdriverIO',
 *   'Get Started With WebdriverIO within Minutes'
 * ]
 */
```

Si cela semble trop compliqué, vous pouvez envisager d'utiliser de simples boucles for, par exemple :

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

### Assertions WebdriverIO

Si vous utilisez l'assistant d'assertion WebdriverIO [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio), assurez-vous de mettre un `await` devant chaque appel `expect`, par exemple :

```ts
expect($('input')).toHaveAttributeContaining('class', 'form')
```

doit être transformé en :

```ts
await expect($('input')).toHaveAttributeContaining('class', 'form')
```

### Méthodes PageObject synchrones et tests asynchrones

Si vous avez écrit des PageObjects dans votre suite de tests de manière synchrone, vous ne pourrez plus les utiliser dans des tests asynchrones. Si vous devez utiliser une méthode PageObject à la fois dans des tests synchrones et asynchrones, nous vous recommandons de dupliquer la méthode et de les proposer pour les deux environnements, par exemple :

```js
class MyPageObject extends Page {
    /**
     * définir les éléments
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // code sync
    }

    someMethodAsync () {
        // version async de MyPageObject.someMethod()
    }
}
```

Une fois que vous avez terminé la migration, vous pouvez supprimer les méthodes PageObject synchrones et nettoyer les noms.

Si vous n'aimez pas maintenir deux versions différentes d'une méthode PageObject, vous pouvez également migrer l'ensemble du PageObject vers async et utiliser [`browser.call`](https://webdriver.io/docs/api/browser/call) pour exécuter la méthode dans un environnement synchrone, par exemple :

```js
// avant :
// MyPageObject.someMethod()
// après :
browser.call(() => MyPageObject.someMethod())
```

La commande `call` s'assurera que la méthode asynchrone `someMethod` est résolue avant de passer à la commande suivante.

## Conclusion

Comme vous pouvez le voir dans la [PR de réécriture résultante](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files), la complexité de cette réécriture est assez simple. N'oubliez pas que vous pouvez réécrire une définition d'étape à la fois. WebdriverIO est parfaitement capable de gérer l'exécution synchrone et asynchrone dans un seul framework.