---
id: getAttribute
title: 获取属性
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getAttribute.ts
---

根据属性名称从DOM元素获取属性值。

##### 用法

```js
$(selector).getAttribute(attributeName)
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
      <td><code><var>attributeName</var></code></td>
      <td>`string`</td>
      <td>请求的属性</td>
    </tr>
  </tbody>
</table>

##### 示例

```html title="index.html"
<form action="/submit" method="post" class="loginForm">
    <input type="text" name="name" placeholder="username"></input>
    <input type="text" name="password" placeholder="password"></input>
    <input type="submit" name="submit" value="submit"></input>
</form>
```

```js title="getAttribute.js"
it('should demonstrate the getAttribute command', async () => {
    const form = await $('form')
    const attr = await form.getAttribute('method')
    console.log(attr) // outputs: "post"
})
```

##### 返回值

- **&lt;String|null&gt;**
            **<code><var>return</var></code>:**  属性的值，如果元素上未设置则返回null。