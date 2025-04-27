---
id: getTagName
title: getTagName
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getTagName.ts
---

Obtener el nombre de etiqueta de un elemento DOM.

##### Uso

```js
$(selector).getTagName()
```

##### Ejemplos

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

##### Devuelve

- **&lt;String&gt;**
            **<code><var>return</var></code>:** el nombre de etiqueta del elemento, como una cadena en minúsculas