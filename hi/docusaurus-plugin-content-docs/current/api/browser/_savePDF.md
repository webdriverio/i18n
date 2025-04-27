---
id: savePDF
title: PDF सहेजें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/savePDF.ts
---

वर्तमान ब्राउज़िंग संदर्भ के पृष्ठ को आपके ऑपरेटिंग सिस्टम पर PDF फ़ाइल के रूप में प्रिंट करता है।

##### उपयोग

```js
browser.savePDF(filepath, { orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges })
```

##### पैरामीटर्स

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
      <td>निष्पादन निर्देशिका के सापेक्ष उत्पन्न PDF का पथ (`.pdf` प्रत्यय आवश्यक है)</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`PDFPrintOptions`</td>
      <td>PDF प्रिंट विकल्प</td>
    </tr>
    <tr>
      <td><code><var>options.orientation</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>PDF पृष्ठ का अभिविन्यास</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>PDF पृष्ठ का पैमाना</td>
    </tr>
    <tr>
      <td><code><var>options.background</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>PDF पृष्ठ की पृष्ठभूमि शामिल करें</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>PDF पृष्ठ की चौड़ाई</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>PDF पृष्ठ की ऊंचाई</td>
    </tr>
    <tr>
      <td><code><var>options.top</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>PDF पृष्ठ का शीर्ष पैडिंग</td>
    </tr>
    <tr>
      <td><code><var>options.bottom</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>PDF पृष्ठ का नीचे का पैडिंग</td>
    </tr>
    <tr>
      <td><code><var>options.left</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>PDF पृष्ठ का बायां पैडिंग</td>
    </tr>
    <tr>
      <td><code><var>options.right</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>PDF पृष्ठ का दायां पैडिंग</td>
    </tr>
    <tr>
      <td><code><var>options.shrinkToFit</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`boolean`</td>
      <td>पृष्ठ को फिट करने के लिए सिकोड़ें</td>
    </tr>
    <tr>
      <td><code><var>options.pageRanges</var></code></td>
      <td>`object[]`</td>
      <td>PDF में शामिल करने के लिए पृष्ठों की श्रेणी</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="savePDF.js"
it('should save a PDF screenshot of the browser view', function () {
    await browser.savePDF('./some/path/screenshot.pdf');
});
```

##### रिटर्न

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**    स्क्रीनशॉट बफर