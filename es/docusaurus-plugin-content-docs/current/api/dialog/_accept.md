---
id: accept
title: aceptar
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

Devuelve cuando el diálogo ha sido aceptado.

##### Uso

```js
await dialog.accept(promptText)
```

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>promptText</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`string`</td>
      <td>Un texto para introducir en el prompt. No causa ningún efecto si el tipo de diálogo no es prompt.</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```