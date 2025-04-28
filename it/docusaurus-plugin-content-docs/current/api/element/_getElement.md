---
id: getElement
title: getElement
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElement.ts
---

Accedi alle proprietà `WebdriverIO.Element` come `selector` o `elementId` dal riferimento dell'elemento.

##### Utilizzo

```js
$(selector).getElement()
```

##### Esempio

```ts title="getElement.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const elem = await $('#elem').getElement();
    console.log(elem.selector); // outputs: '#elem'
});
```

##### Restituisce

- **&lt;WebdriverIO.Element&gt;**