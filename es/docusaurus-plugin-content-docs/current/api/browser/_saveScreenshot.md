---
id: saveScreenshot
title: saveScreenshot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveScreenshot.ts
---

Guarda una captura de pantalla del contexto de navegación actual en un archivo PNG en tu sistema operativo. Ten en cuenta que
algunos controladores de navegador toman capturas de pantalla de todo el documento (por ejemplo, Geckodriver con Firefox)
y otros solo del viewport actual (por ejemplo, Chromedriver con Chrome).

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
      <td>ruta a la imagen generada (se requiere el sufijo `.png`) relativa al directorio de ejecución</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`Object`</td>
      <td>opciones de captura de pantalla</td>
    </tr>
    <tr>
      <td><code><var>options.fullPage=false</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>si se debe tomar una captura de pantalla de la página completa o solo del viewport actual</td>
    </tr>
    <tr>
      <td><code><var>options.format='png'</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>el formato de la captura de pantalla (ya sea `png` o `jpeg`)</td>
    </tr>
    <tr>
      <td><code><var>options.quality=100</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>la calidad de la captura de pantalla en caso de formato JPEG en un rango de 0-100 por ciento</td>
    </tr>
    <tr>
      <td><code><var>options.clip</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Object`</td>
      <td>recortar un rectángulo de la captura de pantalla</td>
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
            **<code><var>return</var></code>:**                             buffer de la captura de pantalla