---
id: saveScreenshot
title: saveScreenshot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/saveScreenshot.ts
---

Spara en skärmdump av ett element till en PNG-fil på ditt operativsystem.

##### Usage

```js
$(selector).saveScreenshot(filename)
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
      <td><code><var>filename</var></code></td>
      <td>`String`</td>
      <td>sökväg till den genererade bilden (`.png`-suffix krävs) relativt till körningskatalogen</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="saveScreenshot.js"
it('should save a screenshot of the browser view', async () => {
    const elem = await $('#someElem');
    await elem.saveScreenshot('./some/path/elemScreenshot.png');
});
```

##### Returns

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             screenshot buffer    