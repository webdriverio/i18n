---
id: parentElement
title: عنصر والد
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/parentElement.ts
---

عنصر والد عنصر DOM انتخاب شده را برمی‌گرداند.

##### استفاده

```js
$(selector).parentElement()
```

##### مثال‌ها

```html title="index.html"
<div class="parent">
    <p>Sibling One</p>
    <p>Sibling Two</p>
    <p>Sibling Three</p>
</div>
```

```js title="parentElement.js"
it('should get class from parent element', async () => {
    const elem = await $$('p');
    const parent = await elem[2].parentElement()
    console.log(await parent.getAttribute('class')); // outputs: "parent"
});
```

##### بازگشت

- **&lt;WebdriverIO.Element&gt;**