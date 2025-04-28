---
id: getElements
title: دریافت المان‌ها
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElements.ts
---

دسترسی به ویژگی‌های `WebdriverIO.ElementArray` مانند `length` یا `selector` از مرجع عناصر.

##### استفاده

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

##### برگشتی

- **&lt;WebdriverIO.ElementArray&gt;**
    