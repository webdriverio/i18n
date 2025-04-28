---
id: getElement
title: getElement
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElement.ts
---

Få åtkomst till `WebdriverIO.Element`-egenskaper som `selector` eller `elementId` från elementreferensen.

##### Användning

```js
$(selector).getElement()
```

##### Exempel

```ts title="getElement.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const elem = await $('#elem').getElement();
    console.log(elem.selector); // outputs: '#elem'
});
```

##### Returnerar

- **&lt;WebdriverIO.Element&gt;**