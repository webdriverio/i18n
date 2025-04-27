---
id: selectByAttribute
title: 通过属性选择
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/selectByAttribute.ts
---

选择具有特定值的选项。

##### 用法

```js
$(selector).selectByAttribute(attribute, value)
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
      <td><code><var>attribute</var></code></td>
      <td>`string`</td>
      <td>要选择的选项元素的属性</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`String, Number`</td>
      <td>要选择的选项元素的值</td>
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
    <option name="someName5" value="someValue5">seis</option>
</select>
```

```js title="selectByAttribute.js"
it('Should demonstrate the selectByAttribute command', async () => {
    const selectBox = await $('#selectbox');
    const value = await selectBox.getValue();
    console.log(value); // returns "someValue0"

    await selectBox.selectByAttribute('value', 'someValue3');
    console.log(await selectBox.getValue()); // returns "someValue3"

    await selectBox.selectByAttribute('name', 'someName5');
    console.log(await selectBox.getValue()); // returns "someValue5"
});
```