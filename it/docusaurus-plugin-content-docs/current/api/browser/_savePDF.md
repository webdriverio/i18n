---
id: savePDF
title: savePDF
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/savePDF.ts
---

Stampa la pagina del contesto di navigazione corrente in un file PDF sul tuo sistema operativo.

##### Utilizzo

```js
browser.savePDF(filepath, { orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges })
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>percorso del pdf generato (è richiesto il suffisso `.pdf`) relativo alla directory di esecuzione</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`PDFPrintOptions`</td>
      <td>Opzioni di stampa PDF</td>
    </tr>
    <tr>
      <td><code><var>options.orientation</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`String`</td>
      <td>Orientamento della pagina PDF</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Scala della pagina PDF</td>
    </tr>
    <tr>
      <td><code><var>options.background</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`boolean`</td>
      <td>Includere lo sfondo della pagina PDF</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Larghezza della pagina PDF</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Altezza della pagina PDF</td>
    </tr>
    <tr>
      <td><code><var>options.top</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Padding superiore della pagina PDF</td>
    </tr>
    <tr>
      <td><code><var>options.bottom</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Padding inferiore della pagina PDF</td>
    </tr>
    <tr>
      <td><code><var>options.left</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Padding sinistro della pagina PDF</td>
    </tr>
    <tr>
      <td><code><var>options.right</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Padding destro della pagina PDF</td>
    </tr>
    <tr>
      <td><code><var>options.shrinkToFit</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`boolean`</td>
      <td>Ridimensionare la pagina per adattarla</td>
    </tr>
    <tr>
      <td><code><var>options.pageRanges</var></code></td>
      <td>`object[]`</td>
      <td>Intervallo di pagine da includere nel PDF</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="savePDF.js"
it('should save a PDF screenshot of the browser view', function () {
    await browser.savePDF('./some/path/screenshot.pdf');
});
```

##### Restituisce

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**    buffer dello screenshot