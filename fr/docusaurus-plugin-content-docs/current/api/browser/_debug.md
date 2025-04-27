---
id: debug
title: debug
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/debug.ts
---

Cette commande vous aide à déboguer vos tests d'intégration. Elle arrête le navigateur en cours d'exécution et vous donne
le temps d'y accéder et de vérifier l'état de votre application (par exemple, en utilisant les outils de développement).
Votre terminal se transforme en interface [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)
qui vous permettra d'essayer certaines commandes, de trouver des éléments et de tester des actions sur
ceux-ci.

[![WebdriverIO REPL](https://webdriver.io/img/repl.gif)](https://webdriver.io/img/repl.gif)

Si vous exécutez le testrunner WDIO, assurez-vous d'augmenter la propriété de délai d'attente du framework de test
que vous utilisez (par exemple Mocha ou Jasmine) afin d'éviter la terminaison du test en raison d'un délai d'attente. 
Évitez également d'exécuter la commande avec plusieurs capacités fonctionnant en même temps.

<iframe width="560" height="315" src="https://www.youtube.com/embed/xWwP-3B_YyE" frameborder="0" allowFullScreen></iframe>

##### Utilisation

```js
browser.debug()
```

##### Exemple

```js title="debug.js"
it('should demonstrate the debug command', async () => {
    await $('#input').setValue('FOO')
    await browser.debug() // jumping into the browser and change value of #input to 'BAR'
    const value = await $('#input').getValue()
    console.log(value) // outputs: "BAR"
})
```