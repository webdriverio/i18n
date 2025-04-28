---
id: getTagName
title: getTagName
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getTagName.ts
---

Ottieni il nome del tag di un elemento DOM.

##### Utilizzo

```js
$(selector).getTagName()
```

##### Esempi

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

##### Restituisce

- **&lt;String&gt;**
            **<code><var>return</var></code>:** il nome del tag dell'elemento, come stringa minuscola