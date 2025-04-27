---
id: accept
title: принять
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

Возвращается, когда диалоговое окно было принято.

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
      <td>Текст для ввода в окно запроса. Не оказывает никакого эффекта, если тип диалогового окна не является запросом.</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```