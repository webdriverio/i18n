---
id: savePDF
title: savePDF
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/savePDF.ts
---

Druckt die Seite des aktuellen Browsing-Kontexts in eine PDF-Datei auf Ihrem Betriebssystem.

##### Usage

```js
browser.savePDF(filepath, { orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges })
```

##### Parameters

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>Pfad zur generierten PDF-Datei (`.pdf`-Suffix ist erforderlich) relativ zum Ausführungsverzeichnis</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`PDFPrintOptions`</td>
      <td>PDF-Druckoptionen</td>
    </tr>
    <tr>
      <td><code><var>options.orientation</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Ausrichtung der PDF-Seite</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Skalierung der PDF-Seite</td>
    </tr>
    <tr>
      <td><code><var>options.background</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>Hintergrund der PDF-Seite einbeziehen</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Breite der PDF-Seite</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Höhe der PDF-Seite</td>
    </tr>
    <tr>
      <td><code><var>options.top</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Oberer Abstand der PDF-Seite</td>
    </tr>
    <tr>
      <td><code><var>options.bottom</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Unterer Abstand der PDF-Seite</td>
    </tr>
    <tr>
      <td><code><var>options.left</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Linker Abstand der PDF-Seite</td>
    </tr>
    <tr>
      <td><code><var>options.right</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Rechter Abstand der PDF-Seite</td>
    </tr>
    <tr>
      <td><code><var>options.shrinkToFit</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>Seite verkleinern, um auf die Seite zu passen</td>
    </tr>
    <tr>
      <td><code><var>options.pageRanges</var></code></td>
      <td>`object[]`</td>
      <td>Bereich der Seiten, die in PDF einbezogen werden sollen</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="savePDF.js"
it('should save a PDF screenshot of the browser view', function () {
    await browser.savePDF('./some/path/screenshot.pdf');
});
```

##### Returns

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**    screenshot buffer