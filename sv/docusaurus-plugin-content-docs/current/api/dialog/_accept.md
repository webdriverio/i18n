---
id: accept
title: accept
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

Returnerar när dialogen har accepterats.

##### Användning

```js
await dialog.accept(promptText)
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
      <td><code><var>promptText</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`string`</td>
      <td>En text att skriva in i prompten. Har ingen effekt om dialogens typ inte är en prompt.</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```