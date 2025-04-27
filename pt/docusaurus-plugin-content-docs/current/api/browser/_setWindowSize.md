---
id: setWindowSize
title: definirTamanhoJanela
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

Redimensiona o tamanho externo da janela do navegador de acordo com a largura e altura fornecidas. Com base no seu sistema operacional, algumas janelas de navegador podem não permitir que você tenha uma largura menor que `500px`. Se você deseja simular a viewport de, por exemplo, um iPhone, você deve considerar usar o comando `setViewport`.

##### Uso

```js
browser.setWindowSize(width, height)
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
      <td><code><var>width</var></code></td>
      <td>`number`</td>
      <td>o navegador será redimensionado para a largura fornecida</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>o navegador será redimensionado para a altura fornecida</td>
    </tr>
  </tbody>
</table>

##### Retorna

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:** Null para navegadores *NO*W3C e Objeto `{x, y, width, height}` para navegadores W3C