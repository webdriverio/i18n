---
id: async-migration
title: Du synchrone à l'asynchrone
description: "Migrez pas à pas vos tests WebdriverIO d'une exécution synchrone à une exécution asynchrone des commandes, y compris les boucles forEach, les assertions et les PageObjects synchrones."
---

En raison de changements dans V8, l'équipe WebdriverIO a [annoncé](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) l'abandon de l'exécution synchrone des commandes d'ici avril 2023. L'équipe a travaillé dur pour rendre la transition aussi simple que possible. Dans ce guide, nous expliquons comment migrer progressivement votre suite de tests du synchrone vers l'asynchrone. Comme projet d'exemple, nous utilisons le [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate), mais l'approche est la même pour tous les autres projets.

## Les promesses en JavaScript

La raison pour laquelle l'exécution synchrone était populaire dans WebdriverIO est qu'elle supprime la complexité liée à la gestion des promesses. Surtout si vous venez d'autres langages où ce concept n'existe pas sous cette forme, cela peut être déroutant au début. Cependant, les promesses sont un outil très puissant pour gérer le code asynchrone, et le JavaScript d'aujourd'hui rend leur utilisation en réalité assez simple. Si vous n'avez jamais travaillé avec les promesses, nous vous recommandons de consulter le [guide de référence MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) à ce sujet, car l'expliquer ici dépasserait le cadre de ce guide.

## Transition vers l'asynchrone

Le testrunner WebdriverIO peut gérer l'exécution asynchrone et synchrone au sein d'une même suite de tests. Cela signifie que vous pouvez migrer progressivement vos tests et vos PageObjects, étape par étape, à votre rythme. Par exemple, le Cucumber Boilerplate a défini [un large ensemble de définitions d'étapes](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) que vous pouvez copier dans votre projet. Nous pouvons migrer une définition d'étape ou un fichier à la fois.

:::tip

WebdriverIO propose un [codemod](https://github.com/webdriverio/codemod) qui permet de transformer votre code synchrone en code asynchrone de manière presque entièrement automatique. Exécutez d'abord le codemod comme décrit dans la documentation, puis utilisez ce guide pour une migration manuelle si nécessaire.

:::

Dans de nombreux cas, tout ce qu'il faut faire est de rendre `async` la fonction dans laquelle vous appelez des commandes WebdriverIO et d'ajouter un `await` devant chaque commande. En prenant le premier fichier à transformer dans le projet boilerplate, `clearInputField.ts`, nous passons de :

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

- _transformation de toutes les définitions d'étapes_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
Cette transition est indépendante du fait que vous utilisiez TypeScript ou non. Si vous utilisez TypeScript, assurez-vous simplement de changer à terme la propriété `types` dans votre `tsconfig.json` de `webdriverio/sync` à `@wdio/globals/types`. Assurez-vous également que votre cible de compilation est définie au minimum sur `ES2018`.
:::

## Cas particuliers

Il existe bien sûr toujours des cas particuliers auxquels vous devez prêter un peu plus d'attention.

### Boucles ForEach

Si vous avez une boucle `forEach`, par exemple pour itérer sur des éléments, vous devez vous assurer que le callback de l'itérateur est correctement géré de manière asynchrone, par exemple :

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

La fonction que nous passons à `forEach` est une fonction d'itération. Dans un monde synchrone, elle cliquerait sur tous les éléments avant de continuer. Si nous transformons cela en code asynchrone, nous devons nous assurer d'attendre que chaque fonction d'itération ait terminé son exécution. En ajoutant `async`/`await`, ces fonctions d'itération renverront une promesse que nous devons résoudre. Dès lors, `forEach` n'est plus idéal pour itérer sur les éléments, car il ne renvoie pas le résultat de la fonction d'itération, c'est-à-dire la promesse que nous devons attendre. Nous devons donc remplacer `forEach` par `map`, qui renvoie cette promesse. `map`, ainsi que toutes les autres méthodes d'itération des tableaux comme `find`, `every`, `reduce` et d'autres, sont implémentées de manière à respecter les promesses au sein des fonctions d'itération et sont donc simplifiées pour une utilisation dans un contexte asynchrone. L'exemple ci-dessus, une fois transformé, ressemble à ceci :

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

Si cela vous semble trop compliqué, vous pouvez envisager d'utiliser de simples boucles for, par exemple :

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

`$$` renvoie un [`ElementArray`](/docs/api/browser/$$). Vous pouvez également l'itérer avant d'attendre la liste :

```js
for await (const elem of $$('div')) {
    await elem.click()
}
```

`for (const elem of $$('div'))` lève une erreur tant que la liste n'est pas résolue, car une boucle synchrone ne peut pas attendre la requête. Attendez d'abord la liste, comme dans l'exemple ci-dessus, ou utilisez `for await`.

### Assertions WebdriverIO

Si vous utilisez l'outil d'assertion de WebdriverIO [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio), assurez-vous de placer un `await` devant chaque appel à `expect`, par exemple :

```ts
expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

doit être transformé en :

```ts
await expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

### Méthodes PageObject synchrones et tests asynchrones

Si vous avez écrit les PageObjects de votre suite de tests de manière synchrone, vous ne pourrez plus les utiliser dans des tests asynchrones. Si vous devez utiliser une méthode de PageObject à la fois dans des tests synchrones et asynchrones, nous vous recommandons de dupliquer la méthode et de la proposer pour les deux environnements, par exemple :

```js
class MyPageObject extends Page {
    /**
     * définir les éléments
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // code synchrone
    }

    someMethodAsync () {
        // version asynchrone de MyPageObject.someMethod()
    }
}
```

Une fois la migration terminée, vous pouvez supprimer les méthodes PageObject synchrones et nettoyer le nommage.

Si vous ne souhaitez pas maintenir deux versions différentes d'une méthode de PageObject, vous pouvez également migrer l'ensemble du PageObject vers l'asynchrone et utiliser [`browser.call`](https://webdriver.io/docs/api/browser/call) pour exécuter la méthode dans un environnement synchrone, par exemple :

```js
// avant :
// MyPageObject.someMethod()
// après :
browser.call(() => MyPageObject.someMethod())
```

La commande `call` s'assure que la méthode asynchrone `someMethod` est résolue avant de passer à la commande suivante.

## Conclusion

Comme vous pouvez le voir dans la [PR de réécriture qui en résulte](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files), cette réécriture est relativement simple. N'oubliez pas que vous pouvez réécrire une définition d'étape à la fois. WebdriverIO est parfaitement capable de gérer l'exécution synchrone et asynchrone au sein d'un même framework.