---
id: addValue
title: addValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/addValue.ts
---

Ajouter une valeur à un élément input ou textarea trouvé par le sélecteur donné.

:::info

Si vous souhaitez utiliser des caractères spéciaux, par exemple pour copier et coller une valeur d'un champ à un autre, utilisez la commande
[`keys`](/docs/api/browser/keys).

:::

##### Utilisation

```js
$(selector).addValue(value)
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
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>valeur à ajouter</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    let input = await $('.input')
    await input.addValue('test')
    await input.addValue(123)

    value = await input.getValue()
    assert(value === 'test123') // true
})
```