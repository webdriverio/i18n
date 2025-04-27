---
id: setViewport
title: setViewport
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setViewport.ts
---

Redimensiona a viewport do navegador dentro do navegador. Ao contrário do `setWindowSize`,
este comando altera o tamanho da viewport, não o tamanho da janela.

##### Uso

```js
browser.setViewport({ width, height, devicePixelRatio })
```

##### Parâmetros

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Detalhes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SetViewportOptions`</td>
      <td>argumentos do comando</td>
    </tr>
    <tr>
      <td><code><var>options.width</var></code></td>
      <td>`number`</td>
      <td>largura da viewport em pixels</td>
    </tr>
    <tr>
      <td><code><var>options.height</var></code></td>
      <td>`number`</td>
      <td>altura da viewport em pixels</td>
    </tr>
    <tr>
      <td><code><var>options.devicePixelRatio</var></code></td>
      <td>`number`</td>
      <td>razão de pixels da viewport</td>
    </tr>
  </tbody>
</table>

##### Retorna

- **&lt;`Promise<void>`&gt;**