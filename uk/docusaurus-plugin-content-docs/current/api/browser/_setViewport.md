---
id: setViewport
title: setViewport
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setViewport.ts
---

Змінює розмір браузерного вьюпорту в браузері. На відміну від `setWindowSize`,
ця команда змінює розмір вьюпорту, а не розмір вікна.

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
      <td>аргументи команди</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code></td>
      <td>`number`</td>
      <td>ширина вьюпорту в пікселях</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code></td>
      <td>`number`</td>
      <td>висота вьюпорту в пікселях</td>
    </tr>
    <tr>
      <td><code><var>options.devicePixelRatio</var></code></td>
      <td>`number`</td>
      <td>піксельне співвідношення вьюпорту</td>
    </tr>
  </tbody>
</table>

##### Returns

- **&lt;`Promise<void>`&gt;**