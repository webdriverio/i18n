---
id: setViewport
title: setViewport
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setViewport.ts
---

Ändrar storlek på webbläsarens viewport inom webbläsaren. Till skillnad från `setWindowSize`,
ändrar detta kommando viewportens storlek, inte fönsterstorleken.

##### Usage

```js
browser.setViewport({ width, height, devicePixelRatio })
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
      <td><code><var>options</var></code></td>
      <td>`SetViewportOptions`</td>
      <td>kommandonargument</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code></td>
      <td>`number`</td>
      <td>viewportens bredd i pixlar</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code></td>
      <td>`number`</td>
      <td>viewportens höjd i pixlar</td>
    </tr>
    <tr>
      <td><code><var>options.devicePixelRatio</var></code></td>
      <td>`number`</td>
      <td>pixelförhållande för viewporten</td>
    </tr>
  </tbody>
</table>

##### Returns

- **&lt;`Promise<void>`&gt;**
    