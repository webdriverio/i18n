---
id: getAttribute
title: getAttribute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getAttribute.ts
---

Obtener un atributo de un elemento DOM basado en el nombre del atributo.

##### Uso

```js
$(selector).getAttribute(attributeName)
```

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>attributeName</var></code></td>
      <td>`string`</td>
      <td>atributo solicitado</td>
    </tr>
  </tbody>
</table>

##### Ejemplos

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

##### Retorna

- **&lt;String|null&gt;**
            **<code><var>return</var></code>:** El valor del atributo, o null si no está establecido en el elemento.