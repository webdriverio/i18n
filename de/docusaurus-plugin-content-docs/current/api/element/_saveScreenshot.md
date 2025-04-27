---
id: saveScreenshot
title: saveScreenshot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/saveScreenshot.ts
---

Speichern Sie einen Screenshot eines Elements als PNG-Datei auf Ihrem Betriebssystem.

##### Verwendung

```js
$(selector).saveScreenshot(filename)
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>filename</var></code></td>
      <td>`String`</td>
      <td>Pfad zum generierten Bild (Endung `.png` ist erforderlich) relativ zum Ausführungsverzeichnis</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="saveScreenshot.js"
it('should save a screenshot of the browser view', async () => {
    const elem = await $('#someElem');
    await elem.saveScreenshot('./some/path/elemScreenshot.png');
});
```

##### Rückgabewert

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             Screenshot-Buffer
