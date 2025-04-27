---
id: getAttribute
title: getAttribute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getAttribute.ts
---

Отримання атрибуту елемента DOM на основі імені атрибуту.

##### Usage

```js
$(selector).getAttribute(attributeName)
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
      <td><code><var>attributeName</var></code></td>
      <td>`string`</td>
      <td>запитуваний атрибут</td>
    </tr>
  </tbody>
</table>

##### Examples

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

##### Returns

- **&lt;String|null&gt;**
            **<code><var>return</var></code>:**  Значення атрибуту або null, якщо він не встановлений для елемента.