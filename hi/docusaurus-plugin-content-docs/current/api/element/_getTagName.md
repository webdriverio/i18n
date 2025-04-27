---
id: getTagName
title: getTagName
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getTagName.ts
---

DOM-तत्व का टैग नाम प्राप्त करें।

##### उपयोग

```js
$(selector).getTagName()
```

##### उदाहरण

```html title="index.html"
<div id="elem">Lorem ipsum</div>

```

```js title="getTagName.js"
it('should demonstrate the getTagName command', async () => {
    const elem = await $('#elem');

    const tagName = await elem.getTagName();
    console.log(tagName); // outputs: "div"
})
```

##### रिटर्न्स

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  तत्व का टैग नाम, लोअरकेस स्ट्रिंग के रूप में