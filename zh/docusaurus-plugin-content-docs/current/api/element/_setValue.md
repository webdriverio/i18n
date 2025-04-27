---
id: setValue
title: setValue (设置值)
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/setValue.ts
---

在清除输入框内容后，向元素发送一系列按键。如果元素不需要先清除，请使用 [`addValue`](/docs/api/element/addValue)。

:::info

如果您想使用特殊字符，例如从一个输入框复制粘贴值到另一个，请使用 [`keys`](/docs/api/browser/keys) 命令。

:::

##### 用法

```js
$(selector).setValue(value)
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
      <td><code><var>value</var></code></td>
      <td>`string, number`</td>
      <td>要添加的值</td>
    </tr>
  </tbody>
</table>

##### 示例

```js title="setValue.js"
it('should set value for a certain element', async () => {
    const input = await $('.input');
    await input.setValue('test')
    await input.setValue(123)

    console.log(await input.getValue()); // outputs: '123'
});
```