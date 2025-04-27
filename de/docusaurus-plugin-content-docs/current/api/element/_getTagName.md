Hier ist die übersetzte Version des Markdown-Inhalts von Englisch nach Deutsch:

---
id: getTagName
title: getTagName
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getTagName.ts
---

Tag-Namen eines DOM-Elements abrufen.

##### Verwendung

```js
$(selector).getTagName()
```

##### Beispiele

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

##### Rückgabewert

- **&lt;String&gt;**
            **<code><var>return</var></code>:** der Tag-Name des Elements als Kleinbuchstaben-String