---
id: shadow$$
title: shadow$$
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/shadow$$.ts
---

访问给定元素的 shadowRoot 内部的元素。如果您正在处理大量嵌套的 shadow roots，除了使用 `shadow$$` 外，另一种方法是使用 [deep selector](https://webdriver.io/docs/selectors#deep-selectors)。

:::info

WebdriverIO 在使用 `$` 或 `$$` 命令时会自动穿透 shadow roots。
只有在自动化环境不支持 WebDriver Bidi 的情况下才需要此命令，例如使用 Appium 进行移动网页测试时。

:::

##### Usage

```js
$(selector).shadow$$(selector)
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
      <td>selector or JS Function to fetch a certain element</td>
    </tr>
  </tbody>
</table>

##### Example

```js title="shadow$$.js"
it('should return elements inside a shadowRoot', async () => {
    const innerEl = await $('.input').shadow$$('#innerEl');
    console.log(await innerEl.getValue()); // outputs: 'test123'
});
```

##### Returns

- **&lt;WebdriverIO.ElementArray&gt;**