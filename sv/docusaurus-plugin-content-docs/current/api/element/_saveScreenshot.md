---
id: saveScreenshot
title: saveScreenshot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/saveScreenshot.ts
---

Spara en skärmdump av ett element till en PNG-fil på ditt operativsystem.

##### Användning

```js
$(selector).saveScreenshot(filename)
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
      <td><code><var>filename</var></code></td>
      <td>`String`</td>
      <td>sökväg till den genererade bilden (`.png`-suffix krävs) relativt till körningsmappen</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="saveScreenshot.js"
it('should save a screenshot of the browser view', async () => {
    const elem = await $('#someElem');
    await elem.saveScreenshot('./some/path/elemScreenshot.png');
});
```

##### Returnerar

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             skärmdumpsbuffer