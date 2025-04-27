---
id: getElement
title: getElement பெறுதல்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElement.ts
---

`WebdriverIO.Element` பண்புகளான `selector` அல்லது `elementId` போன்றவற்றை element reference இலிருந்து அணுகவும்.

##### பயன்பாடு

```js
$(selector).getElement()
```

##### உதாரணம்

```ts title="getElement.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const elem = await $('#elem').getElement();
    console.log(elem.selector); // outputs: '#elem'
});
```

##### திரும்பும் மதிப்பு

- **&lt;WebdriverIO.Element&gt;**
    