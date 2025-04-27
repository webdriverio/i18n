---
id: addInitScript
title: addInitScript
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/addInitScript.ts
---

Ajoute un script qui sera évalué dans l'un des scénarios suivants :

- Chaque fois que la page est naviguée.
- Chaque fois qu'un cadre enfant est attaché ou navigué. Dans ce cas, le script est évalué dans
  le contexte du cadre nouvellement attaché.

Le script est évalué après la création du document mais avant l'exécution de l'un de ses scripts.
Pour supprimer à nouveau le script d'initialisation de la page, appelez la fonction qui a été
retournée par cette fonction.

Cela est utile pour modifier l'environnement JavaScript, par exemple pour initialiser Math.random.

##### Utilisation

```js
browser.addInitScript(script, args)
```

##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>`Function`</td>
      <td>fonction à injecter comme script d'initialisation</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>`number, string, boolean`</td>
      <td>paramètres pour le script</td>
    </tr>
  </tbody>
</table>

##### Exemples

```js title="addInitScript.js"
const script = await browser.addInitScript((seed) => {
    Math.random = () => seed
}, 42)

await browser.url('https://webdriver.io')
console.log(await browser.execute(() => Math.random())) // returns 42

await reset()
await browser.url('https://webdriver.io')
console.log(await browser.execute(() => Math.random())) // returns a random number

hermore you can also use the `emit` function to send data back to the Node.js environment.
 is useful if you want to observe certain events in the browser environment, e.g.:

```

```js title="addInitScriptWithEmit.js"
const script = await browser.addInitScript((emit) => {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      emit(mutation.target.nodeName)
    }
  })
  observer.observe(document, { childList: true, subtree: true })
})

script.on('data', (data) => {
  console.log(data) // prints: BODY, DIV, P, ...
})
```