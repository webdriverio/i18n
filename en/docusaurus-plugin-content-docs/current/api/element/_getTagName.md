---
id: getTagName
title: getTagName
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getTagName.ts
---

Get tag name of a DOM-element.

##### Usage

```js
$(selector).getTagName()
```

##### Examples

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

##### Returns

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  the element's tag name, as a lowercase string    

