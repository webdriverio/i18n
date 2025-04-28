---
id: accept
title: 受け入れ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

ダイアログが受け入れられたときに返されます。

##### 使用法

```js
await dialog.accept(promptText)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>promptText</var></code><br /><span className="label labelWarning">省略可能</span></td>
      <td>`string`</td>
      <td>プロンプトに入力するテキスト。ダイアログのタイプがプロンプトでない場合は効果がありません。</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```