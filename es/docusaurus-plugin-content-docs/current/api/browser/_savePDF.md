---
id: savePDF
title: savePDF
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/savePDF.ts
---

Imprime la página del contexto de navegación actual en un archivo PDF en su sistema operativo.

##### Uso

```js
browser.savePDF(filepath, { orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges })
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
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>ruta al PDF generado (se requiere el sufijo `.pdf`) relativa al directorio de ejecución</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`PDFPrintOptions`</td>
      <td>Opciones de impresión PDF</td>
    </tr>
    <tr>
      <td><code><var>options.orientation</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`String`</td>
      <td>Orientación de la página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Escala de la página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.background</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`boolean`</td>
      <td>Incluir fondo de la página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Ancho de la página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Altura de la página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.top</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Relleno superior de la página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.bottom</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Relleno inferior de la página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.left</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Relleno izquierdo de la página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.right</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`number`</td>
      <td>Relleno derecho de la página PDF</td>
    </tr>
    <tr>
      <td><code><var>options.shrinkToFit</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`boolean`</td>
      <td>Reducir página para que se ajuste</td>
    </tr>
    <tr>
      <td><code><var>options.pageRanges</var></code></td>
      <td>`object[]`</td>
      <td>Rango de páginas a incluir en el PDF</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="savePDF.js"
it('should save a PDF screenshot of the browser view', function () {
    await browser.savePDF('./some/path/screenshot.pdf');
});
```

##### Devuelve

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**    búfer de captura de pantalla