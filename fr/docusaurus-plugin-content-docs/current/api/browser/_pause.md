---
id: pause
title: pause
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/pause.ts
---

Met en pause l'exécution pendant une durée spécifique. Il est recommandé de ne pas utiliser cette commande pour attendre qu'un élément s'affiche. Afin d'éviter des résultats de tests instables, il est préférable d'utiliser des commandes comme [`waitForExist`](/docs/api/element/waitForExist) ou d'autres commandes waitFor*.

##### Usage

```js
browser.pause(milliseconds)
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
      <td><code><var>milliseconds</var></code></td>
      <td>`number`</td>
      <td>temps en ms</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="pause.js"
it('should pause the execution', async () => {
    const starttime = new Date().getTime()
    await browser.pause(3000)
    const endtime = new Date().getTime()
    console.log(endtime - starttime) // outputs: 3000
});
```