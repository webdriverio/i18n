---
id: getElement
title: الحصول على العنصر
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElement.ts
---

الوصول إلى خصائص `WebdriverIO.Element` مثل `selector` أو `elementId` من مرجع العنصر.

##### الاستخدام

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

##### النتائج

- **&lt;WebdriverIO.Element&gt;**
    