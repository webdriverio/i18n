---
id: shadow$
title: shadow$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$.ts
---

访问给定元素的shadowRoot内部的元素。如果你正在处理大量嵌套的shadow roots，`shadow$`的一个替代方法是使用[深度选择器](https://webdriver.io/docs/selectors#deep-selectors)。

:::info

当使用`$`或`$$`命令时，WebdriverIO会自动穿透shadow roots。
只有在您的自动化环境尚不支持WebDriver Bidi的情况下才需要此命令，例如使用Appium进行移动Web测试。

:::

##### Usage

```js
$(selector).shadow$(selector)
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
      <td><code><var>selector</var></code></td>
      <td>`String, Function`</td>
      <td>选择器或JS函数来获取特定元素</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="shadow$$.js"
it('should return an element inside a shadowRoot', async () => {
    const innerEl = await $('custom-component').shadow$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### Returns

- **&lt;WebdriverIO.Element&gt;**