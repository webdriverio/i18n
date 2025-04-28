---
id: savePDF
title: savePDF
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/savePDF.ts
---

Drukuje stronę bieżącego kontekstu przeglądania do pliku PDF na Twoim systemie operacyjnym.

##### Użycie

```js
browser.savePDF(filepath, { orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges })
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>ścieżka do wygenerowanego pliku pdf (wymagane rozszerzenie `.pdf`) względem katalogu wykonania</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`PDFPrintOptions`</td>
      <td>Opcje drukowania PDF</td>
    </tr>
    <tr>
      <td><code><var>options.orientation</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`String`</td>
      <td>Orientacja strony PDF</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Skala strony PDF</td>
    </tr>
    <tr>
      <td><code><var>options.background</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`boolean`</td>
      <td>Dołącz tło strony PDF</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Szerokość strony PDF</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Wysokość strony PDF</td>
    </tr>
    <tr>
      <td><code><var>options.top</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Górny margines strony PDF</td>
    </tr>
    <tr>
      <td><code><var>options.bottom</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Dolny margines strony PDF</td>
    </tr>
    <tr>
      <td><code><var>options.left</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Lewy margines strony PDF</td>
    </tr>
    <tr>
      <td><code><var>options.right</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`number`</td>
      <td>Prawy margines strony PDF</td>
    </tr>
    <tr>
      <td><code><var>options.shrinkToFit</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`boolean`</td>
      <td>Dopasowanie strony do rozmiaru</td>
    </tr>
    <tr>
      <td><code><var>options.pageRanges</var></code></td>
      <td>`object[]`</td>
      <td>Zakres stron do uwzględnienia w PDF</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="savePDF.js"
it('should save a PDF screenshot of the browser view', function () {
    await browser.savePDF('./some/path/screenshot.pdf');
});
```

##### Zwraca

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**    bufor zrzutu ekranu