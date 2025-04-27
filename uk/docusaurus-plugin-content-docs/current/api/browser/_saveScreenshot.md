---
id: saveScreenshot
title: saveScreenshot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveScreenshot.ts
---

Збереження знімка екрана поточного контексту перегляду у файл PNG на вашій ОС. Зверніть увагу, що
деякі драйвери браузера роблять знімки всього документа (наприклад, Geckodriver з Firefox),
а інші - лише поточного вікна перегляду (наприклад, Chromedriver з Chrome).

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
      <td>шлях до згенерованого зображення (потрібен суфікс `.png`) відносно директорії виконання</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`Object`</td>
      <td>параметри знімка екрана</td>
    </tr>
    <tr>
      <td><code><var>options.fullPage=false</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>чи робити знімок всієї сторінки або лише поточного вікна перегляду</td>
    </tr>
    <tr>
      <td><code><var>options.format='png'</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>формат знімка екрана (або `png`, або `jpeg`)</td>
    </tr>
    <tr>
      <td><code><var>options.quality=100</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>якість знімка екрана у форматі JPEG в діапазоні 0-100 відсотків</td>
    </tr>
    <tr>
      <td><code><var>options.clip</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Object`</td>
      <td>вирізання прямокутника зі знімка екрана</td>
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
            **<code><var>return</var></code>:**                             буфер знімка екрана