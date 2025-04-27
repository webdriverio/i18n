---
id: getElements
title: getElements
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/getElements.ts
---

Accède aux propriétés `WebdriverIO.ElementArray` comme `length` ou `selector` à partir de la référence des éléments.

##### Utilisation

```js
$(selector).getElements()
```

##### Exemple

```ts title="getElements.ts"
it('should allow me to inspect WebdriverIO.Element properties', async () => {
    const divs = await $$('div').getElements();
    console.log(divs.length); // outputs: 43
});
```

##### Retourne

- **&lt;WebdriverIO.ElementArray&gt;**