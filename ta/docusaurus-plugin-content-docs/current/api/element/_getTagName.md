---
id: getTagName
title: getTagName
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getTagName.ts
---

DOM-எலிமென்ட்டின் டேக் பெயரைப் பெறுங்கள்.

##### பயன்பாடு

```js
$(selector).getTagName()
```

##### உதாரணங்கள்

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

##### திருப்பிக் கொடுப்பவை

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  எலிமென்ட்டின் டேக் பெயர், சிறிய எழுத்துகளில்    