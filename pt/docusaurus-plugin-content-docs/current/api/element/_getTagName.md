---
id: getTagName
title: getTagName
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getTagName.ts
---

Obter o nome da tag de um elemento DOM.

##### Uso

```js
$(selector).getTagName()
```

##### Exemplos

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

##### Retorna

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  o nome da tag do elemento, como uma string em minúsculas