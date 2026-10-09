---
id: timeouts
title: Délais d'expiration
description: "Configurez les délais d'expiration de session WebDriver, les délais d'expiration waitfor de WebdriverIO et les délais d'expiration du framework de test pour garantir la fiabilité de vos tests."
---

Chaque commande dans WebdriverIO est une opération asynchrone. Une requête est envoyée au serveur Selenium (ou à un service cloud comme [Sauce Labs](https://saucelabs.com)), et sa réponse contient le résultat une fois que l'action a réussi ou échoué.

Par conséquent, le temps est un élément crucial dans l'ensemble du processus de test. Lorsqu'une action dépend de l'état d'une autre action, vous devez vous assurer qu'elles sont exécutées dans le bon ordre. Les délais d'expiration jouent un rôle important pour gérer ces problèmes.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Délais d'expiration WebDriver

### Délai d'expiration des scripts de session

Une session possède un délai d'expiration des scripts de session associé, qui spécifie le temps d'attente pour l'exécution des scripts asynchrones. Sauf indication contraire, il est de 30 secondes. Vous pouvez définir ce délai d'expiration comme suit :

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### Délai d'expiration du chargement de page de session

Une session possède un délai d'expiration du chargement de page associé, qui spécifie le temps d'attente pour que le chargement de la page soit terminé. Sauf indication contraire, il est de 300 000 millisecondes.

Vous pouvez définir ce délai d'expiration comme suit :

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` est le nom défini par les [timeouts](https://www.w3.org/TR/webdriver/#set-timeouts) WebDriver. WebdriverIO v10 accepte uniquement cette clé.

### Délai d'expiration de l'attente implicite de session

Une session possède un délai d'expiration de l'attente implicite associé. Celui-ci spécifie le temps d'attente pour la stratégie de localisation implicite des éléments lors de la recherche d'éléments à l'aide des commandes [`findElement`](/docs/api/webdriver#findelement) ou [`findElements`](/docs/api/webdriver#findelements) ([`$`](/docs/api/browser/$) ou [`$$`](/docs/api/browser/$$), respectivement, lors de l'exécution de WebdriverIO avec ou sans le testrunner WDIO). Sauf indication contraire, il est de 0 millisecondes.

Vous pouvez définir ce délai d'expiration via :

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Délais d'expiration liés à WebdriverIO

### Délai d'expiration `WaitFor*`

WebdriverIO fournit plusieurs commandes pour attendre que des éléments atteignent un certain état (par exemple activé, visible, existant). Ces commandes prennent un argument de sélecteur et un nombre pour le délai d'expiration, qui détermine combien de temps l'instance doit attendre que cet élément atteigne l'état. L'option `waitforTimeout` vous permet de définir le délai d'expiration global pour toutes les commandes `waitFor*`, afin de ne pas avoir à définir le même délai encore et encore. _(Notez le `f` minuscule !)_

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

// vous pouvez également remplacer le délai d'expiration par défaut si nécessaire
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Délais d'expiration liés au framework

Le framework de test que vous utilisez avec WebdriverIO doit gérer les délais d'expiration, d'autant plus que tout est asynchrone. Cela garantit que le processus de test ne reste pas bloqué si quelque chose se passe mal.

Par défaut, le délai d'expiration est de 10 secondes, ce qui signifie qu'un seul test ne doit pas durer plus longtemps.

Un test unique dans Mocha ressemble à ceci :

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

Dans Cucumber, le délai d'expiration s'applique à une seule définition d'étape. Cependant, si vous souhaitez augmenter le délai d'expiration parce que votre test dure plus longtemps que la valeur par défaut, vous devez le définir dans les options du framework.

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