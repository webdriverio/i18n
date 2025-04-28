---
id: getAttribute
title: getAttribute（属性取得）
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getAttribute.ts
---

DOM要素から属性名に基づいて属性を取得します。

##### 使用方法

```js
$(selector).getAttribute(attributeName)
```

##### パラメータ

<table>
  <thead>
    <tr>
      <th>名前</th><th>型</th><th>詳細</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>attributeName</var></code></td>
      <td>`string`</td>
      <td>要求する属性</td>
    </tr>
  </tbody>
</table>

##### 例

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

##### 戻り値

- **&lt;String|null&gt;**
            **<code><var>return</var></code>:**  属性の値。要素に設定されていない場合はnullを返します。