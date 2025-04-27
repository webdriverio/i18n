---
id: getProperty
title: getProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getProperty.ts
---

La commande Get Element Property renvoie le résultat de l'obtention d'une propriété d'un élément.

##### Utilisation

```js
$(selector).getProperty(property)
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
      <td><code><var>property</var></code></td>
      <td>`string`</td>
      <td>nom de la propriété de l'élément</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="getProperty.js"
it('should demonstrate the getProperty command', async () => {
    var elem = await $('body')
    var tag = await elem.getProperty('tagName')
    console.log(tag) // outputs: "BODY"
})
```

##### Retourne

- **&lt;unknown&gt;**
            **<code><var>return</var></code>:** la valeur de la propriété de l'élément sélectionné