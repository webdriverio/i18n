---
id: setViewport
title: setViewport
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setViewport.ts
---

Изменяет размер области просмотра браузера внутри браузера. В отличие от `setWindowSize`,
эта команда изменяет размер области просмотра, а не размер окна.

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
      <td>аргументы команды</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code></td>
      <td>`number`</td>
      <td>ширина области просмотра в пикселях</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code></td>
      <td>`number`</td>
      <td>высота области просмотра в пикселях</td>
    </tr>
    <tr>
      <td><code><var>options.devicePixelRatio</var></code></td>
      <td>`number`</td>
      <td>коэффициент пикселизации области просмотра</td>
    </tr>
  </tbody>
</table>

##### Returns

- **&lt;`Promise<void>`&gt;**