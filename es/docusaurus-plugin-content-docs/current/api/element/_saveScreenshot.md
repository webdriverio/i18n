---
id: saveScreenshot
title: saveScreenshot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/saveScreenshot.ts
---

Guarda una captura de pantalla de un elemento en un archivo PNG en tu sistema operativo.

##### Uso

```js
$(selector).saveScreenshot(filename)
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
      <td><code><var>filename</var></code></td>
      <td>`String`</td>
      <td>ruta al archivo de imagen generado (se requiere la extensión `.png`) relativa al directorio de ejecución</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="saveScreenshot.js"
it('should save a screenshot of the browser view', async () => {
    const elem = await $('#someElem');
    await elem.saveScreenshot('./some/path/elemScreenshot.png');
});
```

##### Devuelve

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             buffer de la captura de pantalla