---
id: timeouts
title: Délais d'attente
description: "Configurez les délais d'attente des sessions WebDriver, les délais d'attente waitfor de WebdriverIO et les délais d'attente des frameworks de test pour garder des tests fiables."
---

Chaque commande dans WebdriverIO est une opération asynchrone. Une requête est envoyée au serveur Selenium (ou à un service cloud comme [Sauce Labs](https://saucelabs.com)), et sa réponse contient le résultat une fois que l'action a réussi ou échoué.

Par conséquent, le temps est un élément crucial de l'ensemble du processus de test. Lorsqu'une action dépend de l'état d'une autre action, vous devez vous assurer qu'elles sont exécutées dans le bon ordre. Les délais d'attente jouent un rôle important pour traiter ces problèmes.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Délais d'attente WebDriver

### Délai d'attente des scripts de session

Une session possède un délai d'attente des scripts de session qui spécifie le temps d'attente pour l'exécution des scripts asynchrones. Sauf indication contraire, il est de 30 secondes. Vous pouvez définir ce délai d'attente comme ceci :

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### Délai d'attente de chargement de page de session

Une session possède un délai d'attente de chargement de page de session qui spécifie le temps d'attente pour que le chargement de la page se termine. Sauf indication contraire, il est de 300 000 millisecondes.

Vous pouvez définir ce délai d'attente comme ceci :

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` est le nom WebDriver des [timeouts](https://www.w3.org/TR/webdriver/#set-timeouts). WebdriverIO v10 accepte uniquement cette clé.

### Délai d'attente implicite de session

Une session possède un délai d'attente implicite de session. Celui-ci spécifie le temps d'attente pour la stratégie de localisation implicite des éléments lors de la recherche d'éléments à l'aide des commandes [`findElement`](/docs/api/webdriver#findelement) ou [`findElements`](/docs/api/webdriver#findelements) ([`$`](/docs/api/browser/$) ou [`$$`](/docs/api/browser/$$), respectivement, lors de l'exécution de WebdriverIO avec ou sans le testrunner WDIO). Sauf indication contraire, il est de 0 milliseconde.

Vous pouvez définir ce délai d'attente via :

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Délais d'attente liés à WebdriverIO

### Délai d'attente `WaitFor*`

WebdriverIO fournit plusieurs commandes pour attendre que des éléments atteignent un certain état (par exemple activé, visible, existant). Ces commandes prennent un argument de sélecteur et un nombre de délai d'attente, qui détermine combien de temps l'instance doit attendre que cet élément atteigne l'état. L'option `waitforTimeout` vous permet de définir le délai d'attente global pour toutes les commandes `waitFor*`, afin que vous n'ayez pas à définir le même délai d'attente encore et encore. _(Notez le `f` en minuscule !)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

Dans vos tests, vous pouvez maintenant faire ceci :

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// you can also overwrite the default timeout if needed
await myElem.waitForDisplayed({ timeout: 10000 })
```

### Un élément que la page a supprimé

Lorsque la page supprime ou affiche à nouveau un élément, WebdriverIO le retrouve à l'aide de son sélecteur et attend jusqu'à `waitforTimeout`. S'il est présent, la commande s'exécute sur celui-ci. Sinon, la commande échoue avec :

- `message` : `Can't call <command> on element with selector "<selector>" because element wasn't found` (un élément de `$$()` : `… "<selector>" at index <n> …` ; un parent supprimé : le message concerne le parent)
- `cause` : l'erreur de référence d'élément obsolète (stale element reference) du driver

`waitUntil` et `waitForEnabled` échouent avec leur propre erreur, qui a cette erreur comme `cause`. `isDisplayed` et `isExisting` de l'élément supprimé n'attendent pas : ils renvoient `false`. Pour un enfant d'un parent supprimé, ils attendent et échouent avec cette erreur.

```ts title="test/specs/removed.e2e.ts"
import { $, browser, expect } from '@wdio/globals'

describe('a removed element', () => {
    it('gives the error of an element that was not found again', async () => {
        await browser.url('https://webdriver.io')
        const title = await $('h1')
        await browser.execute(() => document.querySelectorAll('h1').forEach((h1) => h1.remove()))

        const error = await title.getText().then(() => null, (err: Error) => err)
        expect(error?.message).toContain('because element wasn\'t found')
    })
})
```

## Délais d'attente liés au framework

Le framework de test que vous utilisez avec WebdriverIO doit gérer les délais d'attente, d'autant plus que tout est asynchrone. Il garantit que le processus de test ne reste pas bloqué si quelque chose se passe mal.

Par défaut, le délai d'attente est de 10 secondes, ce qui signifie qu'un seul test ne doit pas durer plus longtemps que cela.

Un seul test dans Mocha ressemble à ceci :

```js
it('should login into the application', async () => {
    await browser.url('/login')

    const form = await $('form')
    const username = await $('#username')
    const password = await $('#password')

    await username.setValue('userXY')
    await password.setValue('******')
    await form.submit()

    expect(await browser.getTitle()).to.be.equal('Admin Area')
})
```

Dans Cucumber, le délai d'attente s'applique à une seule définition d'étape. Cependant, si vous souhaitez augmenter le délai d'attente parce que votre test dure plus longtemps que la valeur par défaut, vous devez le définir dans les options du framework.

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'}
  ]
}>
<TabItem value="mocha">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="jasmine">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="cucumber">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'cucumber',
    cucumberOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
</Tabs>

### Délais d'attente Mocha et hooks WebdriverIO

Un test ou un hook Mocha peut modifier son propre délai d'attente avec `this.timeout(ms)`. Utilisez une `function`, et non une fonction fléchée, pour obtenir `this`. WebdriverIO suit cette modification, y compris `this.timeout(0)`, qui désactive le délai d'attente. Avec `mochaOpts.parallelMode`, seul `mochaOpts.timeout` s'applique : `this.timeout()` dans un test ou un hook lève une erreur, et un délai d'attente d'une suite ou de `it(...).timeout()` est ignoré, avec un avertissement. Voir [Tests parallèles dans un fichier de spécification](./ParallelTests.md#hooks-and-timeouts).

Le délai d'attente d'un test inclut la durée de son hook `beforeTest`, car Mocha démarre le minuteur avant le hook. Avec l'[option de nouvelle tentative](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) de WebdriverIO, toutes les tentatives d'un test partagent un même délai d'attente.

Lorsqu'un test ou un hook dépasse son délai d'attente, WebdriverIO exécute `afterTest` (ou `afterHook`) avant que Mocha ne démarre le test suivant, afin que ce hook ne puisse pas s'exécuter en même temps que le test suivant. Mocha attend ces hooks pendant au plus un délai d'attente supplémentaire du test.