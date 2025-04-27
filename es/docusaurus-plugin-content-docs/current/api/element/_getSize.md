---
id: getSize
title: getSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getSize.ts
---

Obtener el ancho y alto de un elemento DOM.

##### Uso

```js
$(selector).getSize(prop)
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
      <td><code><var>prop</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>tamaño a recibir [opcional] ("width" o "height")</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

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

##### Devuelve

- **&lt;Object|Number&gt;**
            **<code><var>return</var></code>:**     tamaño del elemento solicitado (`{ width: <Number>, height: <Number> }`) o ancho/alto real como número si se proporciona el parámetro prop