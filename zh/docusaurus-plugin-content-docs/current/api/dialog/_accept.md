---
id: accept
title: 接受
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

当对话框被接受时返回。

##### 用法

```js
await dialog.accept(promptText)
```

##### 参数

<table>
  <thead>
    <tr>
      <th>名称</th><th>类型</th><th>详情</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>promptText</var></code><br /><span className="label labelWarning">可选</span></td>
      <td>`string`</td>
      <td>输入到提示框中的文本。如果对话框类型不是提示框，则不会产生任何效果。</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```