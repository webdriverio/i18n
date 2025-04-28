---
id: accept
title: accept（承認）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

ダイアログが承認されたときに返されます。

##### 使用方法

```js
await dialog.accept(promptText)
```

##### パラメーター

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
      <td>プロンプトに入力するテキスト。ダイアログのタイプがプロンプトでない場合は、何の効果も生じません。</td>
    </tr>
  </tbody>
</table>

##### 例

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```