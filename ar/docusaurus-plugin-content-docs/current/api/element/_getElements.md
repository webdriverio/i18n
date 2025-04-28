---
id: getElements
title: getElements
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElements.ts
---

الوصول إلى خصائص `WebdriverIO.ElementArray` مثل `length` أو `selector` من مرجع العناصر.

##### الاستخدام

```js
$(selector).getElements()
```

##### مثال

```ts title="getElements.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const divs = await $$('div').getElements();
    console.log(divs.length); // outputs: 43
});
```

##### يعيد

- **&lt;WebdriverIO.ElementArray&gt;**