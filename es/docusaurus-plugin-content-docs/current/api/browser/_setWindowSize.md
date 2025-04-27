---
id: setWindowSize
title: setWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

Redimensiona el tamaño exterior de la ventana del navegador según el ancho y alto proporcionados. Dependiendo de su sistema operativo, algunas ventanas de navegador pueden no permitirle tener un ancho menor de `500px`. Si desea imitar la ventana gráfica de, por ejemplo, un iPhone, debería considerar usar el comando `setViewport`.

##### Uso

```js
browser.setWindowSize(width, height)
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
      <td><code><var>width</var></code></td>
      <td>`number`</td>
      <td>el navegador se redimensionará al ancho proporcionado</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>el navegador se redimensionará a la altura proporcionada</td>
    </tr>
  </tbody>
</table>

##### Devuelve

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:**  Null para navegadores *NO*W3C y Object `{x, y, width, height}` para navegadores W3C