---
id: saveScreenshot
title: saveScreenshot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/saveScreenshot.ts
---

Save a screenshot of an element to a PNG file on your OS.

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
      <td>path to the generated image (`.png` suffix is required) relative to the execution directory</td>
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

