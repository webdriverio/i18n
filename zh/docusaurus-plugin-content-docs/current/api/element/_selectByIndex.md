---
id: selectByIndex
title: 按索引选择
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/selectByIndex.ts
---

选择具有特定索引的选项。

##### 用法

```js
$(selector).selectByIndex(index)
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
      <td><code><var>index</var></code></td>
      <td>`number`</td>
      <td>选项索引</td>
    </tr>
  </tbody>
</table>

##### 示例

```html title="example.html"
<select id="selectbox">
    <option value="someValue0">uno</option>
    <option value="someValue1">dos</option>
    <option value="someValue2">tres</option>
    <option value="someValue3">cuatro</option>
    <option value="someValue4">cinco</option>
    <option value="someValue5">seis</option>
</select>
```

```js title="selectByIndex.js"
it('Should demonstrate the selectByIndex command', async () => {
    const selectBox = await $('#selectbox');
    console.log(await selectBox.getValue()); // returns "someValue0"
    await selectBox.selectByIndex(4);
    console.log(await selectBox.getValue()); // returns "someValue4"
});
```