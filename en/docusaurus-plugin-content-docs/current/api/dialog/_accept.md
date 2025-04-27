---
id: accept
title: accept
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

Returns when the dialog has been accepted.

##### Usage

```js
await dialog.accept(promptText)
```

##### Parameters

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
      <td>A text to enter into prompt. Does not cause any effects if the dialog's type is not prompt.</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```

