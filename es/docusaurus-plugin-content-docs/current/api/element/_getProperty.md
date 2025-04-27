---
id: getProperty
title: getProperty
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getProperty.ts
---

El comando Get Element Property devolverá el resultado de obtener una propiedad de un
elemento.

##### Uso

```js
$(selector).getProperty(property)
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
      <td><code><var>property</var></code></td>
      <td>`string`</td>
      <td>nombre de la propiedad del elemento</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="getProperty.js"
it('should demonstrate the getProperty command', async () => {
    var elem = await $('body')
    var tag = await elem.getProperty('tagName')
    console.log(tag) // outputs: "BODY"
})
```

##### Retorna

- **&lt;unknown&gt;**
            **<code><var>return</var></code>:** el valor de la propiedad del elemento seleccionado