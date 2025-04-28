---
id: nextElement
title: العنصر التالي
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/nextElement.ts
---

يعيد عنصر الأخ التالي للعنصر DOM المحدد.

##### الاستخدام

```js
$(selector).nextElement()
```

##### أمثلة

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

##### العائد

- **&lt;WebdriverIO.Element&gt;**