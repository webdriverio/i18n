---
id: overwriteCommand
title: overwriteCommand
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/overwriteCommand.ts
---

La méthode du navigateur `overwriteCommand` vous aide à remplacer les commandes natives du navigateur et de l'élément comme `pause` et `click`.

:::info

Vous pouvez consulter plus d'informations à ce sujet dans la section [commande personnalisée](/docs/customcommands#overwriting-native-commands).

:::

##### Utilisation

```js
browser.overwriteCommand(name, callback, elementScope)
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
      <td><code><var>name</var></code></td>
      <td>`string`</td>
      <td>nom de la commande originale</td>
    </tr>
    <tr>
      <td><code><var>callback</var></code></td>
      <td>`Function`</td>
      <td>passe la fonction originale</td>
    </tr>
    <tr>
      <td><code><var>elementScope</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`Boolean`</td>
      <td>étendre l'objet Element au lieu de l'objet Browser</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="execute.js"
// print milliseconds before pause and return its value.
await browser.overwriteCommand('pause', function (origPauseFunction, ms) {
    console.log(`Sleeping for ${ms}`)
    origPauseFunction(ms)
    return ms
})

// usage
it('should use my overwrite command', async () => {
    await browser.url('https://webdriver.io')
    await browser.pause(1000) // outputs "Sleeping for 1000"
})
```