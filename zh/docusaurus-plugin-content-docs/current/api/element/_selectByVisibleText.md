---
id: selectByVisibleText
title: 通过可见文本选择
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/selectByVisibleText.ts
---

选择与参数匹配的显示文本的选项。

##### 用法

```js
$(selector).selectByVisibleText(text)
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
      <td><code><var>text</var></code></td>
      <td>`String, Number`</td>
      <td>要选择的选项元素的文本</td>
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

```js title="selectByVisibleText.js"
it('demonstrate the selectByVisibleText command', async () => {
    const selectBox = await $('#selectbox');
    console.log(await selectBox.getText('option:checked')); // returns "uno"
    await selectBox.selectByVisibleText('cuatro');
    console.log(await selectBox.getText('option:checked')); // returns "cuatro"
})
```