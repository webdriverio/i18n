---
id: savePDF
title: savePDF
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/savePDF.ts
---

Друкує сторінку поточного контексту браузера у PDF-файл на вашій операційній системі.

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
      <td>шлях до згенерованого pdf (суфікс `.pdf` обов'язковий) відносно каталогу виконання</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`PDFPrintOptions`</td>
      <td>Налаштування друку PDF</td>
    </tr>
    <tr>
      <td><code><var>options.orientation</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>Орієнтація сторінки PDF</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Масштаб сторінки PDF</td>
    </tr>
    <tr>
      <td><code><var>options.background</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>Включити фон сторінки PDF</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Ширина сторінки PDF</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Висота сторінки PDF</td>
    </tr>
    <tr>
      <td><code><var>options.top</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Верхній відступ сторінки PDF</td>
    </tr>
    <tr>
      <td><code><var>options.bottom</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Нижній відступ сторінки PDF</td>
    </tr>
    <tr>
      <td><code><var>options.left</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Лівий відступ сторінки PDF</td>
    </tr>
    <tr>
      <td><code><var>options.right</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Правий відступ сторінки PDF</td>
    </tr>
    <tr>
      <td><code><var>options.shrinkToFit</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>Зменшити сторінку, щоб вона поміщалася на сторінці</td>
    </tr>
    <tr>
      <td><code><var>options.pageRanges</var></code></td>
      <td>`object[]`</td>
      <td>Діапазон сторінок для включення в PDF</td>
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
            **<code><var>return</var></code>:**    буфер знімка екрану