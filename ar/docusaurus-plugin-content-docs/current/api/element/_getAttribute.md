---
id: getAttribute
title: getAttribute
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getAttribute.ts
---

الحصول على سمة من عنصر DOM بناءً على اسم السمة.

##### الاستخدام

```js
$(selector).getAttribute(attributeName)
```

##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>attributeName</var></code></td>
      <td>`string`</td>
      <td>السمة المطلوبة</td>
    </tr>
  </tbody>
</table>

##### أمثلة

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

##### العائدات

- **&lt;String|null&gt;**
            **<code><var>return</var></code>:** قيمة السمة، أو null إذا لم يتم تعيينها على العنصر.