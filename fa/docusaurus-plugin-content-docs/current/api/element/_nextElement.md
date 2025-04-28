---
id: nextElement
title: عنصر بعدی
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/nextElement.ts
---

عنصر خواهر و برادری بعدی از عنصر DOM انتخاب شده را برمی‌گرداند.

##### استفاده

```js
$(selector).nextElement()
```

##### مثال‌ها

```html title="index.html"
<div class="parent">
    <p>Sibling One</p>
    <p>Sibling Two</p>
    <p>Sibling Three</p>
</div>
```

```js title="nextElement.js"
it('should get text from next sibling element', async () => {
    const elem = await $$('p');
    const nextElement = await elem[1].nextElement()
    console.log(await nextElement.getText()); // outputs: "Sibling Three"
});
```

##### برمی‌گرداند

- **&lt;WebdriverIO.Element&gt;**