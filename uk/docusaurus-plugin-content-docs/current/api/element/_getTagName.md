---
id: getTagName
title: getTagName
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getTagName.ts
---

Отримання імені тегу DOM-елемента.

##### Використання

```js
$(selector).getTagName()
```

##### Приклади

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

##### Повертає

- **&lt;String&gt;**
            **<code><var>return</var></code>:** ім'я тегу елемента у вигляді рядка нижнього регістру