---
id: saveScreenshot
title: saveScreenshot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/saveScreenshot.ts
---

Salvar uma captura de tela de um elemento em um arquivo PNG no seu sistema operacional.

##### Uso

```js
$(selector).saveScreenshot(filename)
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
      <td><code><var>filename</var></code></td>
      <td>`String`</td>
      <td>caminho para a imagem gerada (sufixo `.png` é necessário) relativo ao diretório de execução</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="saveScreenshot.js"
it('should save a screenshot of the browser view', async () => {
    const elem = await $('#someElem');
    await elem.saveScreenshot('./some/path/elemScreenshot.png');
});
```

##### Retorna

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             buffer da captura de tela