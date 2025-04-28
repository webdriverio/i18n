---
id: getElements
title: getElements
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElements.ts
---

Accedi alle proprietà di `WebdriverIO.ElementArray` come `length` o `selector` dal riferimento degli elementi.

##### Utilizzo

```js
$(selector).getElements()
```

##### Esempio

```ts title="getElements.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const divs = await $$('div').getElements();
    console.log(divs.length); // outputs: 43
});
```

##### Restituisce

- **&lt;WebdriverIO.ElementArray&gt;**
    