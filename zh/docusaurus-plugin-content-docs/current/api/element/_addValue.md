---
id: addValue
title: 添加值
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/addValue.ts
---

向通过给定选择器找到的输入框或文本区域元素添加值。

:::info

如果您想使用特殊字符，例如从一个输入框复制并粘贴值到另一个输入框，请使用
[`keys`](/docs/api/browser/keys) 命令。

:::

##### 用法

```js
$(selector).addValue(value)
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

```js title="addValue.js"
it('should demonstrate the addValue command', async () => {
    let input = await $('.input')
    await input.addValue('test')
    await input.addValue(123)

    value = await input.getValue()
    assert(value === 'test123') // true
})
```