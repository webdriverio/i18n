---
id: getElement
title: getElement
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElement.ts
---

Greift auf `WebdriverIO.Element` Eigenschaften wie `selector` oder `elementId` aus der Elementreferenz zu.

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