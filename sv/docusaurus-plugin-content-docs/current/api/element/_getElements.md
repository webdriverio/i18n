---
id: getElements
title: getElements
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElements.ts
---

Kom åt `WebdriverIO.ElementArray` egenskaper som `length` eller `selector` från elementreferensen.

##### Användning

```js
$(selector).getElements()
```

##### Exempel

```ts title="getElements.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const divs = await $$('div').getElements();
    console.log(divs.length); // outputs: 43
});
```

##### Returnerar

- **&lt;WebdriverIO.ElementArray&gt;**