---
id: getTagName
title: getTagName
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getTagName.ts
---

Hämta taggnamnet på ett DOM-element.

##### Användning

```js
$(selector).getTagName()
```

##### Exempel

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

##### Returnerar

- **&lt;String&gt;**
            **<code><var>return</var></code>:** elementets taggnamn, som en gemener sträng