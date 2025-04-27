---
id: setViewport
title: setViewport
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setViewport.ts
---

Resizes the browser viewport within the browser. As oppose to `setWindowSize`,
this command changes the viewport size, not the window size.

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
      <td>command arguments</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code></td>
      <td>`number`</td>
      <td>viewport width in pixels</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code></td>
      <td>`number`</td>
      <td>viewport height in pixels</td>
    </tr>
    <tr>
      <td><code><var>options.devicePixelRatio</var></code></td>
      <td>`number`</td>
      <td>pixel ratio of the viewport</td>
    </tr>
  </tbody>
</table>

##### Returns

- **&lt;`Promise<void>`&gt;**
    

