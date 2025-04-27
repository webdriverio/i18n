---
id: getValue
title: मूल्य प्राप्त करें
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getValue.ts
---

दिए गए सेलेक्टर द्वारा खोजे गए `<textarea>`, `<select>` या टेक्स्ट `<input>` का मूल्य प्राप्त करें।
यदि दिए गए सेलेक्टर के माध्यम से कई तत्व पाए जाते हैं, तो इसके बजाय मूल्यों की एक सरणी वापस की जाती है।
चेकबॉक्स या रेडियो प्रकार के इनपुट के लिए isSelected का उपयोग करें।

##### उपयोग

```js
$(selector).getValue()
```

##### उदाहरण

```html title="index.html"
<input type="text" value="John Doe" id="username">
```

```js title="getValue.js"
it('should demonstrate the getValue command', async () => {
    const inputUser = await $('#username');
    const value = await inputUser.getValue();
    console.log(value); // outputs: "John Doe"
});
```

##### रिटर्न्स

- **&lt;String&gt;**
            **<code><var>return</var></code>:**   अनुरोधित तत्व(ओं) का मूल्य