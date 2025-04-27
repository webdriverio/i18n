---
id: getAttribute
title: getAttribute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getAttribute.ts
---

Obtenir un attribut d'un élément DOM en fonction du nom de l'attribut.

##### Utilisation

```js
$(selector).getAttribute(attributeName)
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
      <td><code><var>attributeName</var></code></td>
      <td>`string`</td>
      <td>attribut demandé</td>
    </tr>
  </tbody>
</table>

##### Exemples

```html title="index.html"
<form action="/submit" method="post" class="loginForm">
    <input type="text" name="name" placeholder="username"></input>
    <input type="text" name="password" placeholder="password"></input>
    <input type="submit" name="submit" value="submit"></input>
</form>
```

```js title="getAttribute.js"
it('should demonstrate the getAttribute command', async () => {
    const form = await $('form')
    const attr = await form.getAttribute('method')
    console.log(attr) // outputs: "post"
})
```

##### Retourne

- **&lt;String|null&gt;**
            **<code><var>return</var></code>:** La valeur de l'attribut, ou null s'il n'est pas défini sur l'élément.