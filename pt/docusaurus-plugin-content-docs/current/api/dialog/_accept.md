---
id: accept
title: aceitar
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

Retorna quando o diálogo foi aceito.

##### Uso

```js
await dialog.accept(promptText)
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
      <td><code><var>promptText</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>Um texto para inserir no prompt. Não causa nenhum efeito se o tipo de diálogo não for prompt.</td>
    </tr>
  </tbody>
</table>

##### Exemplo

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```