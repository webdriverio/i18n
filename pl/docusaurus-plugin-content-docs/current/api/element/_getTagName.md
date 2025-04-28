---
id: getTagName
title: getTagName
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getTagName.ts
---

Pobierz nazwę tagu elementu DOM.

##### Użycie

```js
$(selector).getTagName()
```

##### Przykłady

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

##### Zwraca

- **&lt;String&gt;**
            **<code><var>return</var></code>:** nazwa tagu elementu jako ciąg znaków pisanych małymi literami