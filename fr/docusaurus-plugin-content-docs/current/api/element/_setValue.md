---
id: setValue
title: setValue
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/setValue.ts
---

Envoie une séquence de frappes à un élément après que la saisie ait été effacée. Si l'élément n'a pas besoin
d'être effacé d'abord, utilisez [`addValue`](/docs/api/element/addValue).

:::info

Si vous souhaitez utiliser des caractères spéciaux, par exemple pour copier et coller une valeur d'un champ à un autre, utilisez la
commande [`keys`](/docs/api/browser/keys).

:::

##### Utilisation

```js
$(selector).setValue(value)
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

```js title="setValue.js"
it('should set value for a certain element', async () => {
    const input = await $('.input');
    await input.setValue('test')
    await input.setValue(123)

    console.log(await input.getValue()); // outputs: '123'
});
```