---
id: setViewport
title: setViewport
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setViewport.ts
---

Zmienia rozmiar przeglądarki w przeglądarce. W przeciwieństwie do `setWindowSize`,
ta komenda zmienia rozmiar viewportu, a nie rozmiar okna.

##### Użycie

```js
browser.setViewport({ width, height, devicePixelRatio })
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SetViewportOptions`</td>
      <td>argumenty komendy</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code></td>
      <td>`number`</td>
      <td>szerokość viewportu w pikselach</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code></td>
      <td>`number`</td>
      <td>wysokość viewportu w pikselach</td>
    </tr>
    <tr>
      <td><code><var>options.devicePixelRatio</var></code></td>
      <td>`number`</td>
      <td>współczynnik pikseli viewportu</td>
    </tr>
  </tbody>
</table>

##### Zwraca

- **&lt;`Promise<void>`&gt;**