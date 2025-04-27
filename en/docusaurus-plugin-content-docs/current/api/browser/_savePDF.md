---
id: savePDF
title: savePDF
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/savePDF.ts
---

Prints the page of the current browsing context to a PDF file on your OS.

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
      <td>path to the generated pdf (`.pdf` suffix is required) relative to the execution directory</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`PDFPrintOptions`</td>
      <td>Print PDF Options</td>
    </tr>
    <tr>
      <td><code><var>options.orientation</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Orientation of PDF page</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Scale of PDF page</td>
    </tr>
    <tr>
      <td><code><var>options.background</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>Include background of PDF page</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Width of PDF page</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Height of PDF page</td>
    </tr>
    <tr>
      <td><code><var>options.top</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Top padding of PDF page</td>
    </tr>
    <tr>
      <td><code><var>options.bottom</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Bottom padding of PDF page</td>
    </tr>
    <tr>
      <td><code><var>options.left</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Left padding of PDF page</td>
    </tr>
    <tr>
      <td><code><var>options.right</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Right padding of PDF page</td>
    </tr>
    <tr>
      <td><code><var>options.shrinkToFit</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>Shrink page to fit page</td>
    </tr>
    <tr>
      <td><code><var>options.pageRanges</var></code></td>
      <td>`object[]`</td>
      <td>Range of pages to include in PDF</td>
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

