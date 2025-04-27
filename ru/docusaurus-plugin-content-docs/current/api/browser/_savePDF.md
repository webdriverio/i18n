---
id: savePDF
title: savePDF
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/savePDF.ts
---

Печатает страницу текущего контекста просмотра в PDF-файл на вашей операционной системе.

##### Использование

```js
browser.savePDF(filepath, { orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges })
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>путь к сгенерированному pdf-файлу (требуется суффикс `.pdf`) относительно директории выполнения</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`PDFPrintOptions`</td>
      <td>Опции печати PDF</td>
    </tr>
    <tr>
      <td><code><var>options.orientation</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`String`</td>
      <td>Ориентация страницы PDF</td>
    </tr>
    <tr>
      <td><code><var>options.scale</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Масштаб страницы PDF</td>
    </tr>
    <tr>
      <td><code><var>options.background</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`boolean`</td>
      <td>Включить фон страницы PDF</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Ширина страницы PDF</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Высота страницы PDF</td>
    </tr>
    <tr>
      <td><code><var>options.top</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Верхний отступ страницы PDF</td>
    </tr>
    <tr>
      <td><code><var>options.bottom</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Нижний отступ страницы PDF</td>
    </tr>
    <tr>
      <td><code><var>options.left</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Левый отступ страницы PDF</td>
    </tr>
    <tr>
      <td><code><var>options.right</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`number`</td>
      <td>Правый отступ страницы PDF</td>
    </tr>
    <tr>
      <td><code><var>options.shrinkToFit</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`boolean`</td>
      <td>Уменьшить страницу для подгонки</td>
    </tr>
    <tr>
      <td><code><var>options.pageRanges</var></code></td>
      <td>`object[]`</td>
      <td>Диапазон страниц для включения в PDF</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="savePDF.js"
it('should save a PDF screenshot of the browser view', function () {
    await browser.savePDF('./some/path/screenshot.pdf');
});
```

##### Возвращает

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**    буфер скриншота