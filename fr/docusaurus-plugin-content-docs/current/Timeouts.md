---
id: timeouts
title: Délais d'attente
---

Chaque commande dans WebdriverIO est une opération asynchrone. Une requête est envoyée au serveur Selenium (ou à un service cloud comme [Sauce Labs](https://saucelabs.com)), et sa réponse contient le résultat une fois que l'action est terminée ou a échoué.

Par conséquent, le temps est un composant crucial dans l'ensemble du processus de test. Lorsqu'une certaine action dépend de l'état d'une autre action, vous devez vous assurer qu'elles sont exécutées dans le bon ordre. Les délais d'attente jouent un rôle important pour gérer ces problèmes.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Délais d'attente WebDriver

### Délai d'attente de script de session

Une session possède un délai d'attente de script associé qui spécifie un temps d'attente pour l'exécution des scripts asynchrones. Sauf indication contraire, il est de 30 secondes. Vous pouvez définir ce délai comme suit :

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### Délai d'attente de chargement de page de session

Une session possède un délai d'attente de chargement de page associé qui spécifie un temps d'attente pour que le chargement de la page soit terminé. Sauf indication contraire, il est de 300 000 millisecondes.

Vous pouvez définir ce délai comme suit :

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> Le mot-clé `pageLoad` fait partie de la [spécification](https://www.w3.org/TR/webdriver/#set-timeouts) officielle WebDriver, mais pourrait ne pas être [pris en charge](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) pour votre navigateur (le nom précédent est `page load`).

### Délai d'attente implicite de session

Une session possède un délai d'attente implicite associé. Cela spécifie le temps d'attente pour la stratégie de localisation implicite des éléments lors de la recherche d'éléments à l'aide des commandes [`findElement`](/docs/api/webdriver#findelement) ou [`findElements`](/docs/api/webdriver#findelements) ([`$`](/docs/api/browser/$) ou [`$$`](/docs/api/browser/$$), respectivement, lors de l'exécution de WebdriverIO avec ou sans le testrunner WDIO). Sauf indication contraire, il est de 0 milliseconde.

Vous pouvez définir ce délai via :

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Délais d'attente liés à WebdriverIO

### Délai d'attente `WaitFor*`

WebdriverIO fournit plusieurs commandes pour attendre que les éléments atteignent un certain état (par exemple, activé, visible, existant). Ces commandes prennent un argument de sélecteur et un nombre de délai d'attente, qui détermine combien de temps l'instance doit attendre que cet élément atteigne l'état. L'option `waitforTimeout` vous permet de définir le délai global pour toutes les commandes `waitFor*`, afin que vous n'ayez pas à définir le même délai encore et encore. _(Notez le 'f' minuscule !)_

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

// vous pouvez également remplacer le délai par défaut si nécessaire
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Délais d'attente liés au framework

Le framework de test que vous utilisez avec WebdriverIO doit gérer les délais d'attente, d'autant plus que tout est asynchrone. Il garantit que le processus de test ne se bloque pas si quelque chose ne va pas.

Par défaut, le délai est de 10 secondes, ce qui signifie qu'un seul test ne devrait pas prendre plus de temps.

Un test unique dans Mocha ressemble à :

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

Dans Cucumber, le délai s'applique à une seule définition d'étape. Cependant, si vous souhaitez augmenter le délai parce que votre test prend plus de temps que la valeur par défaut, vous devez le définir dans les options du framework.

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