---
id: setViewport
title: 设置视口
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setViewport.ts
---

在浏览器中调整浏览器视口大小。与`setWindowSize`不同，此命令更改的是视口大小，而非窗口大小。

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
      <td>命令参数</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code></td>
      <td>`number`</td>
      <td>视口宽度（像素）</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code></td>
      <td>`number`</td>
      <td>视口高度（像素）</td>
    </tr>
    <tr>
      <td><code><var>options.devicePixelRatio</var></code></td>
      <td>`number`</td>
      <td>视口的像素比率</td>
    </tr>
  </tbody>
</table>

##### Returns

- **&lt;`Promise<void>`&gt;**