---
id: accept
title: accept
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

Restituisce quando la finestra di dialogo è stata accettata.

##### Utilizzo

```js
await dialog.accept(promptText)
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
      <td><code><var>promptText</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`string`</td>
      <td>Un testo da inserire nel prompt. Non produce alcun effetto se il tipo di finestra di dialogo non è prompt.</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```