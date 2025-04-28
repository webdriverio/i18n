---
id: getTagName
title: الحصول على اسم العلامة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getTagName.ts
---

الحصول على اسم علامة عنصر DOM.

##### الاستخدام

```js
$(selector).getTagName()
```

##### أمثلة

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

##### النتيجة

- **&lt;String&gt;**
            **<code><var>return</var></code>:**  اسم علامة العنصر، كسلسلة نصية بأحرف صغيرة