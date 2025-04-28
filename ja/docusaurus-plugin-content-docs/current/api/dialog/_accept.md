---
id: accept
title: 受け入れる
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
description: ダイアログが受け入れられたときに返します。
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
      <td>プロンプトに入力するテキスト。ダイアログのタイプがプロンプトでない場合は効果がありません。</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```
```