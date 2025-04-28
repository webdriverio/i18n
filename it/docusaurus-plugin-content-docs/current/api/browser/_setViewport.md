---
id: setViewport
title: setViewport
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setViewport.ts
---

Ridimensiona il viewport del browser all'interno del browser stesso. A differenza di `setWindowSize`,
questo comando cambia la dimensione del viewport, non la dimensione della finestra.

##### Utilizzo

```js
browser.setViewport({ width, height, devicePixelRatio })
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SetViewportOptions`</td>
      <td>argomenti del comando</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code></td>
      <td>`number`</td>
      <td>larghezza del viewport in pixel</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code></td>
      <td>`number`</td>
      <td>altezza del viewport in pixel</td>
    </tr>
    <tr>
      <td><code><var>options.devicePixelRatio</var></code></td>
      <td>`number`</td>
      <td>rapporto di pixel del viewport</td>
    </tr>
  </tbody>
</table>

##### Restituisce

- **&lt;`Promise<void>`&gt;**