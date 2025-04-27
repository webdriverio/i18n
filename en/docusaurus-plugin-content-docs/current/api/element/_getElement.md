---
id: getElement
title: getElement
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElement.ts
---

Access `WebdriverIO.Element` properties like `selector` or `elementId` from the element reference.

##### Usage

```js
$(selector).getElement()
```

##### Example

```ts title="getElement.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const elem = await $('#elem').getElement();
    console.log(elem.selector); // outputs: '#elem'
});
```

##### Returns

- **&lt;WebdriverIO.Element&gt;**
    

