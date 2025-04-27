---
id: savePDF
title: PDF சேமிப்பு
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/savePDF.ts
---

தற்போதைய உலாவல் சூழலின் பக்கத்தை உங்கள் OS இல் PDF கோப்பாக அச்சிடுகிறது.

##### பயன்பாடு

```js
browser.savePDF(filepath, { orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges })
```

##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>உருவாக்கப்பட்ட pdf-க்கான பாதை (`.pdf` பின்னொட்டு தேவை) இயக்க அடைவுக்கு தொடர்புடையது</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`PDFPrintOptions`</td>
      <td>PDF அச்சிடல் விருப்பங்கள்</td>
    </tr>
    <tr>
      <td><code><var>options.orientation</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`String`</td>
      <td>PDF பக்கத்தின் திசை</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>PDF பக்கத்தின் அளவு</td>
    </tr>
    <tr>
      <td><code><var>options.background</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`boolean`</td>
      <td>PDF பக்கத்தின் பின்னணியை சேர்க்கவும்</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>PDF பக்கத்தின் அகலம்</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>PDF பக்கத்தின் உயரம்</td>
    </tr>
    <tr>
      <td><code><var>options.top</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>PDF பக்கத்தின் மேல் இடைவெளி</td>
    </tr>
    <tr>
      <td><code><var>options.bottom</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>PDF பக்கத்தின் கீழ் இடைவெளி</td>
    </tr>
    <tr>
      <td><code><var>options.left</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>PDF பக்கத்தின் இடது இடைவெளி</td>
    </tr>
    <tr>
      <td><code><var>options.right</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`number`</td>
      <td>PDF பக்கத்தின் வலது இடைவெளி</td>
    </tr>
    <tr>
      <td><code><var>options.shrinkToFit</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>`boolean`</td>
      <td>பக்கத்தை பொருத்துவதற்கு பக்கத்தை சுருக்குக</td>
    </tr>
    <tr>
      <td><code><var>options.pageRanges</var></code></td>
      <td>`object[]`</td>
      <td>PDF-இல் சேர்க்க வேண்டிய பக்கங்களின் வரம்பு</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்

```js title="savePDF.js"
it('should save a PDF screenshot of the browser view', function () {
    await browser.savePDF('./some/path/screenshot.pdf');
});
```

##### திரும்பப் பெறுகிறது

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**    screenshot buffer