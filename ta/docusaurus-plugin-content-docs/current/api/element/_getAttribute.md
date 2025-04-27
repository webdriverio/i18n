---
id: getAttribute
title: getAttribute பெறு
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getAttribute.ts
---

பண்புக்கூறு பெயரின் அடிப்படையில் DOM-உறுப்பிலிருந்து ஒரு பண்புக்கூறை பெறவும்.

##### பயன்பாடு

```js
$(selector).getAttribute(attributeName)
```

##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>attributeName</var></code></td>
      <td>`string`</td>
      <td>கோரப்பட்ட பண்புக்கூறு</td>
    </tr>
  </tbody>
</table>

##### எடுத்துக்காட்டுகள்

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

##### திரும்பப் பெறுகிறது

- **&lt;String|null&gt;**
            **<code><var>return</var></code>:**  பண்புக்கூறின் மதிப்பு, அல்லது அது உறுப்பில் அமைக்கப்படாவிட்டால் null.