---
id: saveScreenshot
title: saveScreenshot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/saveScreenshot.ts
---

Spara en skärmdump av nuvarande webbläsarkontext till en PNG-fil på ditt operativsystem. Var medveten om att
vissa webbläsardrivrutiner tar skärmdumpar av hela dokumentet (t.ex. Geckodriver med Firefox)
och andra endast av den aktuella viewporten (t.ex. Chromedriver med Chrome).

##### Användning

```js
browser.saveScreenshot(filepath, { fullPage, format, quality, clip })
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filepath</var></code></td>
      <td>`String`</td>
      <td>sökväg till den genererade bilden (`.png`-suffix krävs) relativt till körningskatalogen</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`Object`</td>
      <td>skärmdumpsalternativ</td>
    </tr>
    <tr>
      <td><code><var>options.fullPage=false</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Boolean`</td>
      <td>om en skärmdump ska tas av hela sidan eller bara den aktuella viewporten</td>
    </tr>
    <tr>
      <td><code><var>options.format='png'</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`String`</td>
      <td>formatet för skärmdumpen (antingen `png` eller `jpeg`)</td>
    </tr>
    <tr>
      <td><code><var>options.quality=100</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Number`</td>
      <td>kvaliteten på skärmdumpen för JPEG-format inom intervallet 0-100 procent</td>
    </tr>
    <tr>
      <td><code><var>options.clip</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Object`</td>
      <td>klippa ut en rektangel av skärmdumpen</td>
    </tr>
  </tbody>
</table>

##### Exempel

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

##### Returnerar

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**                             skärmdumpsbuffer