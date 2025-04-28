---
id: getElement
title: getElement
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElement.ts
---

Dostęp do właściwości `WebdriverIO.Element` takich jak `selector` lub `elementId` z referencji elementu.

##### Użycie

```js
$(selector).getElement()
```

##### Przykład

```ts title="getElement.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const elem = await $('#elem').getElement();
    console.log(elem.selector); // outputs: '#elem'
});
```

##### Zwraca

- **&lt;WebdriverIO.Element&gt;**