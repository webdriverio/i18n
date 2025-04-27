---
id: getElements
title: getElements
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElements.ts
---

உறுப்புகள் குறிப்பிலிருந்து `WebdriverIO.ElementArray` பண்புகளான `length` அல்லது `selector` போன்றவற்றை அணுகவும்.

##### பயன்பாடு

```js
$(selector).getElements()
```

##### உதாரணம்

```ts title="getElements.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const divs = await $$('div').getElements();
    console.log(divs.length); // outputs: 43
});
```

##### திருப்பியளிக்கிறது

- **&lt;WebdriverIO.ElementArray&gt;**