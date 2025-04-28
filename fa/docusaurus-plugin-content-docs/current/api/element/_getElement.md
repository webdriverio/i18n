---
id: getElement
title: دریافت المان
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElement.ts
---

دسترسی به خصوصیات `WebdriverIO.Element` مانند `selector` یا `elementId` از مرجع المان.

##### استفاده

```js
$(selector).getElement()
```

##### مثال

```ts title="getElement.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const elem = await $('#elem').getElement();
    console.log(elem.selector); // outputs: '#elem'
});
```

##### مقادیر بازگشتی

- **&lt;WebdriverIO.Element&gt;**