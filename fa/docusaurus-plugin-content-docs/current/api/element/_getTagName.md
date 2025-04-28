---
id: getTagName
title: دریافت نام تگ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getTagName.ts
---

دریافت نام تگ یک عنصر DOM.

##### استفاده

```js
$(selector).getTagName()
```

##### مثال‌ها

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

##### برمی‌گرداند

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  نام تگ عنصر، به صورت رشته با حروف کوچک    