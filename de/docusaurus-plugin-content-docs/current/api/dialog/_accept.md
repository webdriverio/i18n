---
id: accept
title: accept
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

Kehrt zurück, wenn der Dialog akzeptiert wurde.

##### Verwendung

```js
await dialog.accept(promptText)
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>promptText</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>Ein Text, der in die Eingabeaufforderung eingegeben werden soll. Hat keine Auswirkungen, wenn der Dialogtyp keine Eingabeaufforderung ist.</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```