---
id: setViewport
title: setViewport
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setViewport.ts
---

Ändrar webbläsarens vyportsstorlek inom webbläsaren. Till skillnad från `setWindowSize`,
ändrar detta kommando vyportens storlek, inte fönsterstorleken.

##### Användning

```js
browser.setViewport({ width, height, devicePixelRatio })
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
      <td><code><var>options</var></code></td>
      <td>`SetViewportOptions`</td>
      <td>kommandoargument</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code></td>
      <td>`number`</td>
      <td>vyportens bredd i pixlar</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code></td>
      <td>`number`</td>
      <td>vyportens höjd i pixlar</td>
    </tr>
    <tr>
      <td><code><var>options.devicePixelRatio</var></code></td>
      <td>`number`</td>
      <td>pixelförhållande för vyporten</td>
    </tr>
  </tbody>
</table>

##### Returnerar

- **&lt;`Promise<void>`&gt;**