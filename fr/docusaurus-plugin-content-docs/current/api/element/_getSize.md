---
id: getSize
title: getSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getSize.ts
---

Obtenir la largeur et la hauteur d'un élément DOM.

##### Utilisation

```js
$(selector).getSize(prop)
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
      <td><code><var>prop</var></code><br /><span className="label labelWarning">optionnel</span></td>
      <td>`String`</td>
      <td>taille à recevoir [optionnel] ("width" ou "height")</td>
    </tr>
  </tbody>
</table>

##### Exemple

```js title="getSize.js"
it('should demonstrate the getSize command', async () => {
    await browser.url('http://github.com')
    const logo = await $('.octicon-mark-github')

    const size = await logo.getSize()
    console.log(size) // outputs: { width: 32, height: 32 }

    const width = await logo.getSize('width')
    console.log(width) // outputs: 32

    const height = await logo.getSize('height')
    console.log(height) // outputs: 32
})
```

##### Retourne

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**     taille de l'élément demandé (`{ width: <Number>, height: <Number> }`) ou largeur/hauteur réelle sous forme de nombre si le paramètre prop est fourni