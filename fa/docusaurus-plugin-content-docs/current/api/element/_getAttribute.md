---
id: getAttribute
title: getAttribute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getAttribute.ts
---

دریافت یک ویژگی از یک عنصر DOM بر اساس نام ویژگی.

##### استفاده

```js
$(selector).getAttribute(attributeName)
```

##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>attributeName</var></code></td>
      <td>`string`</td>
      <td>ویژگی درخواست شده</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

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

##### مقادیر بازگشتی

- **&lt;String|null&gt;**
            **<code><var>return</var></code>:** مقدار ویژگی، یا null اگر در عنصر تنظیم نشده باشد.