---
id: saveScreenshot
title: saveScreenshot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveScreenshot.ts
---

Сохраняет скриншот текущего контекста браузера в PNG-файл на вашей ОС. Имейте в виду, что
некоторые драйверы браузера делают скриншоты всего документа (например, Geckodriver с Firefox),
а другие только текущей области просмотра (например, Chromedriver с Chrome).

##### Usage

```js
browser.saveScreenshot(filepath, { fullPage, format, quality, clip })
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
      <td>путь к сгенерированному изображению (требуется суффикс `.png`) относительно каталога выполнения</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`Object`</td>
      <td>опции скриншота</td>
    </tr>
    <tr>
      <td><code><var>options.fullPage=false</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>делать ли скриншот всей страницы или только текущей области просмотра</td>
    </tr>
    <tr>
      <td><code><var>options.format='png'</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>формат скриншота (либо `png`, либо `jpeg`)</td>
    </tr>
    <tr>
      <td><code><var>options.quality=100</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>качество скриншота в случае формата JPEG в диапазоне 0-100 процентов</td>
    </tr>
    <tr>
      <td><code><var>options.clip</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Object`</td>
      <td>обрезка прямоугольной области скриншота</td>
    </tr>
  </tbody>
</table>

##### Examples

```js title="saveScreenshot.js"
it('should save a screenshot of the browser viewport', async () => {
    await browser.saveScreenshot('./some/path/screenshot.png');
});

it('should save a screenshot of the full page', async () => {
    await browser.saveScreenshot('./some/path/screenshot.png', { fullPage: true });
});

it('should save a screenshot of a specific rectangle', async () => {
    await browser.saveScreenshot('./some/path/screenshot.png', { clip: { x: 0, y: 0, width: 100, height: 100 } });
});

it('should save a screenshot of the full page in JPEG format', async () => {
    await browser.saveScreenshot('./some/path/screenshot.jpeg', { fullPage: true, format: 'jpeg' });
});

it('should save a screenshot of the full page in JPEG format with quality 50', async () => {
    await browser.saveScreenshot('./some/path/screenshot.jpeg', { fullPage: true, format: 'jpeg', quality: 50 });
});

 running from a hook, make sure to explicitly define the hook as async:

```

```js title="wdio.conf.js"
afterTest: async function(test) {
    await browser.saveScreenshot('./some/path/screenshot.png');
}
```

##### Returns

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**                             буфер скриншота