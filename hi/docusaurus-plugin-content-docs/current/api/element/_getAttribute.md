---
id: getAttribute
title: getAttribute प्राप्त करें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getAttribute.ts
---

विशेषता नाम के आधार पर DOM-एलिमेंट से विशेषता प्राप्त करें।

##### उपयोग

```js
$(selector).getAttribute(attributeName)
```

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>attributeName</var></code></td>
      <td>`string`</td>
      <td>अनुरोधित विशेषता</td>
    </tr>
  </tbody>
</table>

##### उदाहरण

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

##### रिटर्न

- **&lt;String|null&gt;**
            **<code><var>return</var></code>:**  विशेषता का मान, या null यदि यह एलिमेंट पर सेट नहीं है।